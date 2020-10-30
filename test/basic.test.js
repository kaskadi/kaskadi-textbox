/* eslint-env browser, mocha */
import '../kaskadi-textbox.js'

describe('kaskadi-textbox', () => {
  it('should not render a label and icon if not provided', async () => {
    const elem = await mountComponent()
    elem.shadowRoot.querySelector('#label_text').textContent.should.equal('')
    elem.shadowRoot.querySelector('#icon').textContent.should.equal('')
    await unmountComponent(elem)
  })
  it('should not show a label if using labelHidden attribute', async () => {
    const elem = await mountComponent({ labelHidden: '' })
    const cs = getComputedStyle(elem.shadowRoot.querySelector('#start_label'))
    cs.display.should.equal('none')
    await unmountComponent(elem)
  })
  it('should have a default label text color', async () => {
    const elem = await mountComponent()
    const cs = getComputedStyle(elem.shadowRoot.querySelector('#start_label'))
    cs.color.should.equal('rgb(221, 221, 221)')
    await unmountComponent(elem)
  })
  it('should render the provided label', async () => {
    const elem = await mountComponent({ label: '{"en":"hello","de":"hallo"}' })
    elem.shadowRoot.querySelector('#label_text').textContent.should.equal('hello')
    await unmountComponent(elem)
  })
  it('should render an icon when provided', async () => {
    const elem = await mountComponent({ icon: 'abc' })
    const icon = elem.shadowRoot.querySelector('#icon img')
    icon.should.not.equal(null)
    icon.src.should.equal(`${window.origin}/abc`)
    await unmountComponent(elem)
  })
  it('should sanitize values', async () => {
    const elem = await mountComponent()
    elem.value = 'hallo'
    elem.value.should.equal('hallo')
    elem.value = 'hallo\n'
    elem.value.should.equal('hallo')
    await unmountComponent(elem)
  })
  it('should fire an event with the textbox value on blur', async () => {
    const elem = await mountComponent()
    elem.addEventListener('change', (e) => {
      e.detail.should.equal('')
    })
    elem.focus()
    elem.blur()
    await unmountComponent(elem)
  })
  it('should fire an event with the textbox value on value change', async () => {
    const elem = await mountComponent()
    const value = 'hello'
    elem.addEventListener('change', (e) => {
      e.detail.should.equal(value)
    })
    elem.value = value
    await elem.updateComplete
    await unmountComponent(elem)
  })
  it('should update value and fire an event containing the value when typing a new value', async () => {
    const elem = await mountComponent()
    elem.addEventListener('change', (e) => {
      e.detail.should.equal('ab')
    })
    const txt = elem.shadowRoot.querySelector('#text')
    await testUserEvent(txt, 'keydown', { key: 'a' })
    await testUserEvent(txt, 'keydown', { key: 'b' })
    await testUserEvent(txt, 'keydown', { key: 'Enter' })
    await elem.updateComplete
    elem.value = 'ab'
    await unmountComponent(elem)
  })
  it('should reformat pasted data', async () => {
    const elem = await mountComponent()
    var data = new DataTransfer()
    data.setData('Text', '123\n123')
    elem.paste({
      clipboardData: data,
      preventDefault: () => {}
    })
    elem.value.should.equal('123123')
    await unmountComponent(elem)
  })
})

function testUserEvent (elem, eventName, eventObj) {
  return new Promise((resolve, reject) => {
    elem.addEventListener(eventName, evt => {
      resolve(evt)
    })
    const event = new KeyboardEvent(eventName, eventObj)
    elem.dispatchEvent(event)
  })
}

function mountComponent (attributes = {}) {
  const elem = document.createElement('kaskadi-textbox')
  for (const attribute in attributes) {
    elem.setAttribute(attribute, attributes[attribute])
  }
  document.body.appendChild(elem)
  return elem.updateComplete.then(() => elem)
}

function unmountComponent (elem) {
  document.body.removeChild(elem)
  return elem.updateComplete.then(() => elem)
}
