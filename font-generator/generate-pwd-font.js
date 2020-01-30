const fs = require('fs')
const svg2ttf = require('svg2ttf')

let glyphs = ''
for (let i=0; i<128; i++) {
  glyphs += `    <glyph unicode="&#${i};" d="M50,500 a 450,450 0 1,0 900,0 a 450,450 0 1,0 -900,0"></glyph>`
  if (i !== 127) {
    glyphs += '\n'
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg">
  <font id="Password" horiz-adv-x="1000">
    <font-face font-family="Password" font-weight="bold" font-style="normal"
        units-per-em="1000" cap-height="1000" x-height="1000"
        ascent="1000" descent="0"
        alphabetic="0" hanging="1000" />
${glyphs}
  </font>
</svg>`

const ttf = svg2ttf(svg, {})
fs.writeFileSync('pwd-font.ttf', Buffer.from(ttf.buffer))
