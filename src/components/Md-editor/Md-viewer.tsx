import breaks from '@bytemd/plugin-breaks'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import medium from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'
import { Viewer } from '@bytemd/react'
import themes from './plugins/themes.json'
import highlights from './plugins/highlights.json'
import mdThemePlugin from './plugins/plugin-md-theme'
import highlightThemePlugin from './plugins/plugin-highlight-theme'
import React from 'react'
const MdViewer: React.FC<any> = ({ value }) => {
  const plugins = [
    gfm(),
    math(),
    breaks(),
    gemoji(),
    mermaid(),
    highlight(),
    medium(),
    frontmatter(),
    mdThemePlugin({
      themes: themes
    }),
    highlightThemePlugin({
      highlights: highlights
    }),
  ]
  return (
    <Viewer
      value={value}
      plugins={plugins}
    />
  )
}
export default MdViewer;