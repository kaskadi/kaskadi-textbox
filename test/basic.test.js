/* eslint-env browser, mocha */
import '../kaskadi-textbox.js'
describe('kaskadi-textbox', () => {
  it('should render the string "Hello World"', async () => {
    // create kaskadi-textbox element
    var elem = document.createElement('kaskadi-textbox')
    document.body.appendChild(elem)
    elem.setAttribute('label', '{"en":"hello","de":"hallo"}')
    // wait until it's finished rendering
    await elem.updateComplete
    // actual test
    elem.shadowRoot.querySelector('#label_text').textContent.should.equal('hello')
    var cs = getComputedStyle(elem.shadowRoot.querySelector('#start_label'))
    cs.color.should.equal('rgb(221, 221, 221)')

    // keyevents fire but do not change the dom... find a way to test behaviour
    var txt = elem.shadowRoot.querySelector('#text')
    await testUserEvent(txt, 'keydown', { key: 'a' })
    await testUserEvent(txt, 'keydown', { key: 'b' })
    await testUserEvent(txt, 'keydown', { key: 'Enter' })

    // test for css visibility missing!!!!!
    elem.labelHidden = true
    elem.icon = '123'
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
