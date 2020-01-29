/* eslint-env browser, mocha */
import '../kaskadi-textbox.js'
var elem
describe('kaskadi-textbox', () => {
  before(async () => {
    elem = document.createElement('kaskadi-textbox')
    document.body.appendChild(elem)
    elem.setAttribute('label', '{"en":"hello","de":"hallo"}')
    await elem.updateComplete
  })
  it('should render the string "Hello World"', async () => {
    elem.shadowRoot.querySelector('#label_text').textContent.should.equal('hello')
    var cs = getComputedStyle(elem.shadowRoot.querySelector('#start_label'))
    cs.color.should.equal('rgb(221, 221, 221)')

    elem.value = 'hallo'
    elem.value.should.equal('hallo')
    elem.value = 'hallo\n'
    elem.value.should.equal('hallo')

    elem.focus()
    elem.blur()
    // keyevents fire but do not change the dom... find a way to test behaviour
    var txt = elem.shadowRoot.querySelector('#text')
    await testUserEvent(txt, 'keydown', { key: 'a' })
    await testUserEvent(txt, 'keydown', { key: 'b' })
    await testUserEvent(txt, 'keydown', { key: 'Enter' })

    // test for css visibility missing!!!!!
    elem.labelHidden = true
    elem.icon = '123'
  })
  it('should reformat pasted data', () => {
    var data = new DataTransfer()
    data.setData('Text', '123\n123')
    elem.paste({
      clipboardData: data,
      preventDefault: () => {}
    })
    elem.value.should.equal('123123')
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
