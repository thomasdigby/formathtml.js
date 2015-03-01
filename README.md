# formathtml.js

Pass through a string to return formatted html, currently returns tab-indented and will add a line break for each new tag.

```javascript
formatHtml('<div><h2>Title</h2></div>');
```
Returns:
```html
<div>
	<h2>
		Title
	</h2>
</div>
```


___
#####TO DO
* Add option for space indentation
* Add option for non-breaking tags, `<a>`, `<abbr>`, `<mark>` etc.
