# formathtml.js

Pass through a string to return formatted html, currently returns tab-indented and will add a line break for each new tag.

```javascript
var options = {
	indentCharacter: ' ',
	indentCharacterCount: 2
};
formatHtml('<div><h2>Title</h2></div>', options);
```
Returns:
```html
<div>
  <h2>
    Title
  </h2>
</div>
```
## Options
### indentCharacter
Default is `\t`, requires a `string`
### indentCharacterCount
Default is `1`, requires a `integer`

___
## Releases
* `v1.0.2` Fixed indentation issue
* `v1.0.1` Added indent character configuration
* `v1.0.0` Initial release

### TO DO
* Add option for non-breaking tags, `<a>`, `<abbr>`, `<mark>` etc.
