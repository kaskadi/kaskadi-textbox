/* eslint-env browser, mocha */
// import { css, html } from 'https://cdn.klimapartner.net/modules/lit-element/lit-element.js'
import { translate, KaskadiElement, css, html } from 'https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-element/kaskadi-element.js'

class KaskadiTextbox extends KaskadiElement {
  constructor () {
    super()
    this.labelHidden = false
    this.lang = 'en'
    this.icon = null
  }

  static get styles () {
    return css`
      :host{
        display: inline-block;
      }
      #outer{display: flex; width: var(--width, 250px) }
      .border{border-style: solid; border-color: var(--border-color, #aaa);}
      .height{height: var(--height, 30px);padding: var(--border-radius, 8px);}

      ${textBoxStyles()}
      ${startLabelStyles()}
      ${endLabelStyles()}
    `
  }

  static get properties () {
    return {
      lang: { type: String },
      labelHidden: { type: Boolean },
      label: { type: Array },
      icon: { type: String }
    }
  }

  keydown (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault()
    }
  }

  fireChangeEvent () {
  //  const evt = document.createCustomEvent('chane')
  }

  render () {
    return html`
      <div id="outer">
        <div id="start_label" class="border height ${this.labelHidden ? 'hidden' : ''}" >

          <div id="icon">${this.icon ? html`<img src="${this.icon}" height="100%" style="padding-right:5px"/>` : ''}</div>
          <div id="label_text">${translate(this.label, this.lang)}</div>
          <div></div>
        </div>
        <div id="text" contentEditable="true" class="border height" @keydown="${this.keydown}"></div>
        <div id="end_label" class="border height"></div>
      </div>
    `
  }
}

customElements.define('kaskadi-textbox', KaskadiTextbox)

function textBoxStyles () {
  return css`
    #text:focus{outline:0}
    #text{
      overflow: hidden;
      box-sizing: border-box;
      color: #333;
      min-width: 100px;
      width: 100%;
      white-space: nowrap;
      padding: var(--padding, 5px);
      border-width: var(--border-width, 1px) 0 var(--border-width, 1px) 0;
    }
  `
}

function startLabelStyles () {
  return css`
    .hidden #label_text{display:none}
    .hidden #icon{display:none}
    #start_label.hidden{background: white;}
    #start_label{
      display:flex;
      user-select: none;
      width: var(--start-label-width, auto);
      box-sizing: border-box;
      color: var(--label-color, #ddd);
      background: var(--label-background, #fafafa);
      padding: var(--padding, 5px);
      border-radius: var(--border-radius, 8px) 0 0 var(--border-radius, 8px);
      border-width: var(--border-width, 1px) 0 var(--border-width, 1px) var(--border-width, 1px);
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
