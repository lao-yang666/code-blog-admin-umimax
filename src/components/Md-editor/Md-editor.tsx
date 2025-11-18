import './Md-editor.less';
import 'bytemd/dist/index.css';

import breaks from '@bytemd/plugin-breaks'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import gfm from '@bytemd/plugin-gfm'
import gfm_zh from '@bytemd/plugin-gfm/locales/zh_Hans.json'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import math_zh from '@bytemd/plugin-math/locales/zh_Hans.json'
import medium from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'
import mermaid_zh from '@bytemd/plugin-mermaid/locales/zh_Hans.json'
import { Editor } from '@bytemd/react'
// import zhHans from 'bytemd/locales/zh_Hans.json'
import React from 'react'
import themes from './plugins/themes.json'
import highlights from './plugins/highlights.json'
import backPlugin from './plugins/plugin-back'
import savePlugin from './plugins/plugin-save'
import mdThemePlugin from './plugins/plugin-md-theme'
import highlightThemePlugin from './plugins/plugin-highlight-theme'
const MdEditor: React.FC<any> = ({ value, onChange, onBack, onSave }) => {
  const plugins = [
    gfm({ locale: gfm_zh }),
    breaks(),
    gemoji(),
    highlight(),
    math({ locale: math_zh }),
    medium(),
    mermaid({ locale: mermaid_zh }),
    frontmatter(),
    mdThemePlugin({
      themes: themes,
      locale: {
        "markdownTheme": "Markdown主题"
      }
    }),
    highlightThemePlugin({
      highlights: highlights,
      locale: {
        "highlightTheme": "代码高亮主题"
      }
    }),
    savePlugin(onSave),
    backPlugin(onBack),
    // Add more plugins here
  ]
  return (
    <Editor
      value={value}
      plugins={plugins}
      onChange={(v) => {
        onChange(v)
      }}
    />
  )
}

export default MdEditor;