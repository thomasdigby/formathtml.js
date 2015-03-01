
var formatHtml = function (htmlString) {

	var formattedHtml = indentHtml(htmlString);

	function indentHtml (htmlString) {

		// create array from html string
		var htmlArray = createHtmlArray(htmlString),
			indentString = '',
			htmlString = '';

		// for each line in array
		for (var i = 0; i < htmlArray.length; i++) {

			var currLine = htmlArray[i],
				prevLine = htmlArray[i - 1];

			// only the second line onwards needs indenting
			if (i > 0) {

				// test for opening tag, not closing tag, not comment & not self closing tag
				if (isOpeningTag(prevLine) && !isClosingTag(prevLine) && !isComment(prevLine) && !isSelfClosingTag(prevLine)) {
					// increment tab indent
					indentString += '\t';
				}
				// test for closing tag
				if (isClosingTag(currLine)) {
					// decrement tab indent
					indentString = indentString.slice(0, -1);
				}
			}

			// add formatted output to current output
			htmlString += indentString + currLine + '\n';
		}

		return htmlString.trim();
	};

	// returns html array
	function createHtmlArray (htmlString) {

		// create array split by tag
		var escapedHtml = escapeHtml(htmlString),
			htmlArray = escapedHtml
				// remove tab
				.replace(/\t/g, '')
				// remove line break
				.replace(/\n/g, '')
				// remove space between tags
				.replace(/\&gt;[\s]+\&lt;/g, '&gt;&lt;')
				// add new line before < if not prepended by > or a line break
				.replace(/(?!&gt;)(?!\n)&lt;/g, '\n&lt;')
				// add new line after > if not followed by < or a line break
				.replace(/&gt;(?!&lt;)(?!\n)/g, '&gt;\n')
				// split on each new line
				.split('\n');

		// return filtered array
		return htmlArray.filter(function(item){
			return item !== '';
		});
	};

	// returns escaped string
	function escapeHtml (htmlString) {

		// entities to be escaped
		var entityMap = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;',
			'/': '&#x2F;'
		};

		// return escaped string
		return String(htmlString).replace(/[&<>''\/]/g, function(str) {
			return entityMap[str];
		});
	};

	// helpers
	function isOpeningTag(string) {
		return string.substring(0, 4) === '&lt;';
	};
	function isClosingTag(string) {
		return string.substring(4, 10) === '&#x2F;';
	};
	function isSelfClosingTag(string) {

		// set reference to self closing tag
		var selfClosingTags = ['br','input','link','meta','!doctype','basefont','base','area','source','hr','wbr','param','img','isindex','embed'],
			isSelfClosing = false;

		// test if current line contains a self closing tag
		for (var i = 0; i < selfClosingTags.length; i++) {

			// if line contains self closing tag, break loop
			if (string.match(regexWholeWord(selfClosingTags[i]))) {
				isSelfClosing = true;
				break;
			}
		}

		return isSelfClosing;
	};
	function isComment(string) {
		return string.substring(0, 7) === '&lt;!--'
	};

	// return whole word regex
	function regexWholeWord(string) {
		return new RegExp('&lt;' + '\\b' + string + '\\b');
	}

	// return final formatted html string
	return formattedHtml;
};