/* eslint-env browser, mocha */
import { translate, KaskadiElement, css, html } from 'https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-element/kaskadi-element.js'

/**
 * Element to provide a styled text input.
 *
 * This offers a highlty customizable text input for any application.
 *
 * This element inherits properties from a base class `KaskadiElement`. To see which properties are available, please refer to [`KaskadiElement` documentation](https://github.com/kaskadi/kaskadi-element).
 *
 * @module kaskadi-textbox
 *
 * @param {Object} label - a localized set of labels that will be displayed for this textbox. Each field in the object references a language (f.e. `en`, `de`, `fr`, etc.).
 * @param {string} [icon] - an icon to display for this textbox. Must be a URL pointing to a public image.
 * @param {boolean} [labelHidden=false] - controls whether the textbox label & icon should be shown.
 * @param {Event} onchange - everytime the value in the textbox changes (either by typing, pasting or changing `.value` programmatically) and also when the element is removed from focus, a `change` event is fired. You can refer to this event via `@change` for example. It contains in its `detail` the new value of the textbox. **Note:** the event won't fire multiple times if the value did not effectively change in between 2 event firing.
 *
 * @example
 *
 * <kaskadi-textbox style="--label-background: palegreen; --border-color: royalblue; --label-color: white" lang="en" label='{"en": "First Name", "de": "Vorname", "fr": "Prénom"}' icon="https://example.com/logo.png"></kaskadi-textbox>
 */

class KaskadiTextbox extends KaskadiElement {
  constructor () {
    super()
    this.labelHidden = false
    this.icon = ''
    this._lastValueFired = ''
  }

  static get properties () {
    return {
      labelHidden: { type: Boolean },
      label: { type: Object },
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
    if (this._lastValueFired !== this.value) {
      const evt = new CustomEvent('change', { detail: this.value })
      this.dispatchEvent(evt)
      this._lastValueFired = this.value
    }
  }

  static get styles () {
    return css`
      :host {
        display: inline-block;
        --text-font: 'Roboto';
        --label-font: 'Roboto';
        --width: 250px;
        --height: 30px;
        --start-label-width: auto;
        --border-width: 1px;
        --border-color: #aaa;
        --border-radius: 8px;
        --border: var(--border-width) solid var(--border-color);
        --padding: 5px;
        --label-color: #ddd;
        --label-background: #fafafa;
      }
      #outer {
        display: flex;
        width: var(--width);
        height: var(--height);
        border: var(--border);
        border-radius: var(--border-radius);
        overflow: hidden;
      }
      #icon img {
        margin-right: 5px;
      }
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
    #text:focus {
      outline:0
    }
    #text {
      font-family: var(--text-font);
      overflow: hidden;
      box-sizing: border-box;
      color: #333;
      min-width: 100px;
      width: 100%;
      white-space: nowrap;
      padding: var(--padding);
    }
  `
}

function startLabelStyles () {
  return css`
    #start_label.hidden {
      display: none;
    }
    #start_label {
      font-family: var(--label-font);
      display: flex;
      justify-content: center;
      user-select: none;
      width: var(--start-label-width);
      box-sizing: border-box;
      color: var(--label-color);
      background: var(--label-background);
      padding: var(--padding);
    }
  `
}

function endLabelStyles () {
  return css`
    #end_label{
      box-sizing: border-box;
      padding: var(--padding);
      min-width: var(--border-radius);
      border-width: var(--border-width) var(--border-width) var(--border-width) 0;
      border-radius: 0 var(--border-radius) var(--border-radius) 0;
    }
  `
}

// force
