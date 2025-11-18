import type { BytemdPlugin } from 'bytemd'
//#region src/icons.ts
const HIGHLIGHT_ICON = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"48\" height=\"48\" fill=\"white\" fill-opacity=\"0.01\"></rect><path d=\"M6 44L6 25H12V17H36V25H42V44H6Z\" fill=\"none\" stroke=\"#333\" stroke-width=\"4\" stroke-linejoin=\"round\"></path><path d=\"M17 17V8L31 4V17\" stroke=\"#333\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>";

//#endregion
//#region locales/en.json
var highlightTheme = "Highlight Theme";
var en_default = { highlightTheme };

//#endregion
//#region src/index.ts
/**
* Highlight Theme Plugin
*/
export default function highlightThemePlugin(options:any):BytemdPlugin {
	const styleId = options?.styleId || "__highlight-theme__";
	const locale = {
		...en_default,
		...options?.locale
	};
	const themeMap = options?.highlights;
	if (!themeMap) throw new Error("No highlight theme found, please check your options.");
	const themeList = Object.keys(themeMap);
	const defaultHighlight = options?.defaultHighlight || themeList[0];
	if (!themeList.length) throw new Error("No highlight theme found, please check your options.");
	if (!themeList.includes(defaultHighlight)) throw new Error(`Invalid default highlight theme: ${defaultHighlight}, please check your options.`);
	const info = {
		data: "",
		status: 0,
		position: {
			start: {
				line: 0,
				column: 0,
				offset: 0
			},
			end: {
				line: 0,
				column: 0,
				offset: 0
			}
		}
	};
	const updateStyle = (styleCode) => {
		const d = document.querySelector(`#${styleId}`) || document.createElement("style");
		d.setAttribute("id", styleId);
		document.head.appendChild(d);
		d.innerHTML = styleCode;
	};
	const highlightActionFactory = (highlight) => ({
		title: highlight,
		handler: {
			type: "action",
			click: ({ editor }) => {
				const v = editor.getValue();
				const { start, end } = info.position;
				const frontmatter = v.slice(start.offset, end.offset);
				const newFrontmatter = info.status === 0 ? `---\nhighlight: ${highlight}\n---\n` : info.status === 1 ? frontmatter.replace("---", `---\nhighlight: ${highlight}`) : frontmatter.replace(info.data, highlight);
				editor.setValue(v.replace(frontmatter, newFrontmatter));
				editor.focus();
			}
		}
	});
	return {
		actions: [{
			title: locale.highlightTheme,
			icon: HIGHLIGHT_ICON,
			handler: {
				type: "dropdown",
				actions: [...themeList.map((highlight) => highlightActionFactory(highlight))]
			}
		}],
		remark: (processor) => processor.use(() => (tree, file) => {
			const styleCode = themeMap[defaultHighlight] || "";
			if (!file.frontmatter) {
				updateStyle(styleCode);
				info.status = 0;
				info.position = {
					start: {
						line: 0,
						column: 0,
						offset: 0
					},
					end: {
						line: 0,
						column: 0,
						offset: 0
					}
				};
				return;
			}
			const { start, end } = tree.children[0].position;
			info.position = {
				start,
				end
			};
			const { highlight } = file.frontmatter;
			if (!highlight) {
				updateStyle(styleCode);
				info.status = 1;
				return;
			}
			if (themeList.includes(highlight)) {
				updateStyle(themeMap[highlight]);
				info.data = highlight;
				info.status = 2;
				return;
			}
			throw new Error(`Invalid highlight theme: ${highlight}, please check your options.`);
		})
	};
}