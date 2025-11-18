import type { BytemdPlugin } from 'bytemd'
//#region src/icons.ts
const MARKDOWN_THEME_ICON = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6 2H2.66667C2.29848 2 2 2.29848 2 2.66667V6C2 6.36819 2.29848 6.66667 2.66667 6.66667H6C6.36819 6.66667 6.66667 6.36819 6.66667 6V2.66667C6.66667 2.29848 6.36819 2 6 2Z\" stroke=\"#1D2129\" stroke-width=\"1.33\" stroke-linejoin=\"round\"></path><path d=\"M6 9.3335H2.66667C2.29848 9.3335 2 9.63197 2 10.0002V13.3335C2 13.7017 2.29848 14.0002 2.66667 14.0002H6C6.36819 14.0002 6.66667 13.7017 6.66667 13.3335V10.0002C6.66667 9.63197 6.36819 9.3335 6 9.3335Z\" stroke=\"#1D2129\" stroke-width=\"1.33\" stroke-linejoin=\"round\"></path><path d=\"M13.3334 2H10C9.63185 2 9.33337 2.29848 9.33337 2.66667V6C9.33337 6.36819 9.63185 6.66667 10 6.66667H13.3334C13.7016 6.66667 14 6.36819 14 6V2.66667C14 2.29848 13.7016 2 13.3334 2Z\" stroke=\"#1D2129\" stroke-width=\"1.33\" stroke-linejoin=\"round\"></path><path d=\"M13.3334 9.3335H10C9.63185 9.3335 9.33337 9.63197 9.33337 10.0002V13.3335C9.33337 13.7017 9.63185 14.0002 10 14.0002H13.3334C13.7016 14.0002 14 13.7017 14 13.3335V10.0002C14 9.63197 13.7016 9.3335 13.3334 9.3335Z\" stroke=\"#1D2129\" stroke-width=\"1.33\" stroke-linejoin=\"round\"></path></svg>";

//#endregion
//#region locales/en.json
var markdownTheme = "Markdown Theme";
var en_default = { markdownTheme };

//#endregion
//#region src/index.ts
/**
* Markdown Theme Plugin
*/
export default function markdownThemePlugin(options:any):BytemdPlugin {
	const styleId = options?.styleId || "__markdown-theme__";
	const locale = {
		...en_default,
		...options?.locale
	};
	const themeMap = options?.themes;
	if (!themeMap) throw new Error("No markdown theme found, please check your options.");
	const themeList = Object.keys(themeMap);
	const defaultTheme = options?.defaultTheme || themeList[0];
	const defaultDarkTheme = options?.defaultDarkTheme || themeList[0];
	if (!themeList.length) throw new Error("No markdown theme found, please check your options.");
	if (!themeList.includes(defaultTheme)) throw new Error(`Invalid default markdown theme: ${defaultTheme}, please check your options.`);
	const info = {
		data: "",
		status: "no-frontmatter",
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
		const _style = document.querySelector(`#${styleId}`);
		if (_style) {
			_style.innerHTML = styleCode;
			return;
		}
		const style = document.createElement("style");
		style.setAttribute("id", styleId);
		style.setAttribute("type", "text/css");
		style.setAttribute("data-theme-name", info.data);
		document.head.appendChild(style);
		style.innerHTML = styleCode;
	};
	const themeActionFactory = (theme) => ({
		title: theme,
		handler: {
			type: "action",
			click: ({ editor }) => {
				const v = editor.getValue();
				const { start, end } = info.position;
				const frontmatter = v.slice(start.offset, end.offset);
				const newFrontmatter = info.status === "no-frontmatter" ? `---\ntheme: ${theme}\n---\n` : info.status === "no-frontmatter-theme" ? frontmatter.replace("---", `---\ntheme: ${theme}`) : frontmatter.replace(info.data, theme);
				editor.setValue(v.replace(frontmatter, newFrontmatter));
				editor.focus();
			}
		}
	});
	let isDark = document.body.classList.contains("dark");
	const observer = new MutationObserver(() => {
		console.log("dark mode changed");
		const darkMode = document.body.classList.contains("dark");
		if (darkMode !== isDark) {
			isDark = darkMode;
			refreshStyle();
		}
	});
	observer.observe(document.body, {
		attributes: true,
		attributeFilter: ["class"]
	});
	const refreshStyle = () => {
		console.log("refreshStyle", info, isDark);
		if (info.status === "no-frontmatter" || info.status === "no-frontmatter-theme") {
			const styleCode$1 = themeMap[isDark ? defaultDarkTheme : defaultTheme] || "";
			updateStyle(styleCode$1);
			return;
		}
		const styleCode = themeMap[info.data] || "";
		updateStyle(styleCode);
	};
	return {
		actions: [{
			title: locale.markdownTheme,
			icon: MARKDOWN_THEME_ICON,
			handler: {
				type: "dropdown",
				actions: [...themeList.map((theme) => themeActionFactory(theme))]
			}
		}],
		viewerEffect: () => {
			refreshStyle();
		},
		remark: (processor) => processor.use(() => (tree, file) => {
			if (!file.frontmatter) {
				info.status = "no-frontmatter";
				refreshStyle();
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
			const { theme } = file.frontmatter;
			if (!theme) {
				info.status = "no-frontmatter-theme";
				refreshStyle();
				return;
			}
			if (themeList.includes(theme)) {
				info.data = theme;
				info.status = "has-frontmatter-theme";
				refreshStyle();
				return;
			}
			throw new Error(`Invalid markdown theme: ${theme}, please check your options.`);
		})
	};
}
