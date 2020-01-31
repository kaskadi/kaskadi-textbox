/* eslint-env browser, mocha */
// import { css, html } from 'https://cdn.klimapartner.net/modules/lit-element/lit-element.js'
import { translate, KaskadiElement, css, html } from 'https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-element/kaskadi-element.js'

class KaskadiTextbox extends KaskadiElement {
  constructor () {
    super()
    this.labelHidden = false
    this.lang = 'en'
    this.icon = ''
    this.lastValueFired = ''
  }

  static get properties () {
    return {
      lang: { type: String },
      labelHidden: { type: Boolean },
      label: { type: Array },
      icon: { type: String }
    }
  }

  get value () {
    return this.shadowRoot.querySelector('#text').innerText
  }

  set value (s) {
    s = s.replace(/\n/g, '')
    this.shadowRoot.querySelector('#text').innerText = s
    this.fireInputEvent()
  }

  keydown (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault()
      this.fireInputEvent()
    }
  }

  paste (evt) {
    this.value = evt.clipboardData.getData('Text')
    moveCursorToEndOfNode(this.shadowRoot.querySelector('#text'))
    evt.preventDefault()
    this.fireInputEvent()
  }

  blur (evt) {
    this.fireInputEvent()
  }

  fireInputEvent () {
    if (this.lastValueFired !== this.value) {
      const evt = new CustomEvent('change', {
        detail: this.value
      })
      this.dispatchEvent(evt)
      this.lastValueFired = this.value
    }
  }

  static get styles () {
    return css`
      :host{
        display: inline-block;
      }
      #outer{
        display: flex;
        width: var(--width, 250px);
        height: var(--height, 30px);
        border: var(--border, 1px solid var(--border-color, #aaa));
        border-radius: var(--border-radius, 8px);
        overflow: hidden;
      }
      #icon img{margin-right:5px}
      ${textBoxStyles()}
      ${startLabelStyles()}
      ${endLabelStyles()}
    `
  }

  render () {
    return html`
      <div id="outer">
        <div id="start_label" class=" ${this.labelHidden ? 'hidden' : ''}" >
          <div id="icon">${this.icon.length > 0 ? html`<img src="${this.icon}" height="20px" width="20px"/>` : html``}</div>
          <div id="label_text">${this.label ? translate(this.label, this.lang) : ''}</div>
        </div>
        <div id="text" contentEditable="true" @blur="${this.blur}" @paste="${this.paste}" @keydown="${this.keydown}"></div>
        <div id="end_label"></div>
      </div>
    `
  }
}

customElements.define('kaskadi-textbox', KaskadiTextbox)

function moveCursorToEndOfNode (node) {
  const sel = window.getSelection()
  const range = document.createRange()
  range.selectNodeContents(node)
  range.collapse(false)
  sel.removeAllRanges()
  sel.addRange(range)
}

function textBoxStyles () {
  return css`
    #text:focus{outline:0}
    #text{
      font-family: var(--text-font, 'Roboto')
      overflow: hidden;
      box-sizing: border-box;
      color: #333;
      min-width: 100px;
      width: 100%;
      white-space: nowrap;
      padding: var(--padding, 5px);
    }
  `
}

function startLabelStyles () {
  return css`
    #start_label.hidden {display:none}
    #start_label{
      font-family: var(--label-font, 'Roboto')
      display:flex;
      justify-content:center;
      user-select: none;
      width: var(--start-label-width, auto);
      box-sizing: border-box;
      color: var(--label-color, #ddd);
      background: var(--label-background, #fafafa);
      padding: var(--padding, 5px);
    }
  `
}

function endLabelStyles () {
  return css`
    #end_label{
      box-sizing: border-box;
      padding: var(--padding, 5px);
      min-width: var(--border-radius, 8px);
      border-width: var(--border-width, 1px) var(--border-width, 1px) var(--border-width, 1px) 0;
      border-radius: 0 var(--border-radius, 8px) var(--border-radius, 8px) 0;
    }
  `
}
