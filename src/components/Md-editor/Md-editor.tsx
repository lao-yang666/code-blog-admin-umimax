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
import highlightTheme from '@ziuchen/bytemd-plugin-highlight-theme'
import hls from '@ziuchen/bytemd-plugin-highlight-theme/dist/highlights.json'
import highlightTheme_zh from '@ziuchen/bytemd-plugin-highlight-theme/locales/zh_Hans.json'
import markdownTheme from '@ziuchen/bytemd-plugin-markdown-theme'
import themes from '@ziuchen/bytemd-plugin-markdown-theme/dist/themes.json'
import markdownTheme_zh from '@ziuchen/bytemd-plugin-markdown-theme/locales/zh_Hans.json'
import zhHans from 'bytemd/locales/zh_Hans.json'
import React from 'react'

import backPlugin from './plugins/plugin-back'
import savePlugin from './plugins/plugin-save'
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
    markdownTheme({
      themes: themes,
      locale: markdownTheme_zh
    }),
    highlightTheme({
      highlights: hls,
      locale: highlightTheme_zh
    }),
    savePlugin(onSave),
    backPlugin(onBack),
    // Add more plugins here
  ]
  return (
    <Editor
      locale={zhHans}
      value={value}
      plugins={plugins}
      onChange={(v) => {
        onChange(v)
      }}
    />
  )
}

export default MdEditor;