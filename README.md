![](https://img.shields.io/github/package-json/v/kaskadi/kaskadi-textbox)
![](https://img.shields.io/badge/code--style-standard-blue)
![](https://img.shields.io/github/license/kaskadi/kaskadi-textbox?color=blue)

[![](https://img.shields.io/badge/live-example-orange)](https://cdn.klimapartner.net/modules/%40kaskadi/kaskadi-textbox/example/index.html)

**GitHub Actions workflows status**

[![Build status](https://img.shields.io/github/workflow/status/kaskadi/kaskadi-textbox/build?label=build&logo=mocha)](https://github.com/kaskadi/kaskadi-textbox/actions?query=workflow%3Abuild)
[![BuildFF status](https://img.shields.io/github/workflow/status/kaskadi/kaskadi-textbox/build-on-firefox?label=firefox&logo=Mozilla%20Firefox&logoColor=white)](https://github.com/kaskadi/kaskadi-textbox/actions?query=workflow%3Abuild-on-firefox)
[![BuildChrome status](https://img.shields.io/github/workflow/status/kaskadi/kaskadi-textbox/build-on-chrome?label=chrome&logo=Google%20Chrome&logoColor=white)](https://github.com/kaskadi/kaskadi-textbox/actions?query=workflow%3Abuild-on-chrome)
[![Publish status](https://img.shields.io/github/workflow/status/kaskadi/kaskadi-textbox/publish?label=publish&logo=Amazon%20AWS)](https://github.com/kaskadi/kaskadi-textbox/actions?query=workflow%3Apublish)
[![Docs generation status](https://img.shields.io/github/workflow/status/kaskadi/kaskadi-textbox/generate-docs?label=docs&logo=read-the-docs)](https://github.com/kaskadi/kaskadi-textbox/actions?query=workflow%3Agenerate-docs)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/kaskadi-textbox?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/kaskadi-textbox)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/kaskadi-textbox?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/kaskadi-textbox)
[![](https://img.shields.io/codeclimate/coverage/kaskadi/kaskadi-textbox?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/kaskadi-textbox)

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/kaskadi-textbox?label=code%20quality&logo=LGTM)](https://lgtm.com/projects/g/kaskadi/kaskadi-textbox/?mode=list&logo=LGTM)

<!-- You can add badges inside of this section if you'd like -->

****

<!-- automatically generated documentation will be placed in here -->
# Usage instructions

In another element:
```js
// using the latest version
import 'https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-textbox/kaskadi-textbox.js'
// using a specific version
import 'https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-textbox/release/v1.0.0/kaskadi-textbox.js'
```

In the browser:
```html
<!-- using the latest version -->
<script type="module" src="https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-textbox/kaskadi-textbox.js"></script>
<!-- using a specific version -->
<script type="module" src="https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-textbox/release/v1.0.0/kaskadi-textbox.js"></script>
```

# Custom element documentation

## kaskadi-textbox

Element to provide a styled text input.

This offers a highlty customizable text input for any application.

This element inherits properties from a base class `KaskadiElement`. To see which properties are available, please refer to [`KaskadiElement` documentation].


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| label | `Object` |  | a localized set of labels that will be displayed for this textbox. Each field in the object references a language (f.e. `en`, `de`, `fr`, etc.). |
| \[icon\] | `string` |  | an icon to display for this textbox. Must be a URL pointing to a public image. |
| \[labelHidden\] | `boolean` | `false` | controls whether the textbox label & icon should be shown. |
| onchange | `Event` |  | everytime the value in the textbox changes (either by typing, pasting or changing `.value` programmatically) and also when the element is removed from focus, a `change` event is fired. You can refer to this event via `@change` for example. It contains in its `detail` the new value of the textbox. **Note:** the event won't fire multiple times if the value did not effectively change in between 2 event firing. |

**Example**  
```html
<kaskadi-textbox style="--label-background: palegreen; --border-color: royalblue; --label-color: white" lang="en" label='{"en": "First Name", "de": "Vorname", "fr": "Prénom"}' icon="https://example.com/logo.png"></kaskadi-textbox>
```
<!-- LINKS -->

[`KaskadiElement` documentation]:https://github.com/kaskadi/kaskadi-element

## Custom styles

The following custom CSS properties are available for this element:

| CSS property name   |                     Default                     |
| :------------------ | :---------------------------------------------: |
| --text-font         |                    `'Roboto'`                   |
| --label-font        |                    `'Roboto'`                   |
| --width             |                     `250px`                     |
| --height            |                      `30px`                     |
| --start-label-width |                      `auto`                     |
| --border-width      |                      `1px`                      |
| --border-color      |                      `#aaa`                     |
| --border-radius     |                      `8px`                      |
| --border            | `var(--border-width) solid var(--border-color)` |
| --padding           |                      `5px`                      |
| --label-color       |                      `#ddd`                     |
| --label-background  |                    `#fafafa`                    |
<!-- automatically generated documentation will be placed in here -->

<!-- You can customize this template as you'd like! -->