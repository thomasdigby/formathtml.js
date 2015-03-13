
/*
 * FormatHTML: JS utility to format HTML
 * @thomasdigby
 * Licensed MIT
 */
function formatHtml(htmlString, options) {

	var config = {
		indentCharacterCount: 1,
		indentCharacter: '\t'
	};

	function indentHtml(htmlString) {

		// update config with custom options
		getCustomParams(options);

		// create array from html string
		var htmlArray = createHtmlArray(htmlString),
			indent = '',
			formattedHtml = '';

		// for each line in array
		for (var i = 0; i < htmlArray.length; i++) {

			var currLine = htmlArray[i],
				prevLine = htmlArray[i - 1];

			// only the second line onwards needs indenting
			if (i > 0) {

				// test for opening tag, not closing tag, not comment & not self closing tag
				if (isOpeningTag(prevLine) && !isClosingTag(prevLine) && !isComment(prevLine) && !isSelfClosingTag(prevLine)) {
					// increment tab indent
					indent += repeatString(config.indentCharacter, config.indentCharacterCount);
				}
				// test for closing tag
				if (isClosingTag(currLine)) {
					// decrement tab indent
					indent = indent.slice(0, -config.indentCharacterCount);
				}
			}

			// add formatted output to current output
			formattedHtml += indent + currLine + '\n';
		}

		return formattedHtml.trim();
	}

	// returns html array
	function createHtmlArray(htmlString) {

		// create array split by tag
		var escapedHtml = escapeHtml(htmlString),
			unformattedHtml = removeFormatting(escapedHtml),
			formattedHtml = addFormatting(unformattedHtml),
			arrayHtml = formattedHtml.split('\n');

		// return filtered array
		return arrayHtml.filter(function (item) {
			return item !== '';
		});
	}

	// returns html strings
	function escapeHtml(htmlString) {

		// entities to be escaped
		var entityMap = {
			'&': '&#38;',
			'<': '&#60;',
			'>': '&#62;',
			'"': '&#34;',
			"'": '&#39;',
			'/': '&#47;'
		};

		// return escaped string
		return String(htmlString).replace(/[&<>''\/]/g, function (str) {
			return entityMap[str];
		});
	}
	function removeFormatting(htmlString) {

		// remove tabs, line breaks, empty attribute properties and space between tags
		var string = htmlString
				.replace(/\t/g, '')
				.replace(/\n/g, '')
				.replace(/=""/g, '')
				.replace(/\&#62;[\s]+\&#60;/g, '&#62;&#60;');

		return string;
	}
	function addFormatting(htmlString) {

		var string = htmlString
				// add new line before < if not preceded by > or a line break
				.replace(/(?!&#62;)(?!\n)&#60;/g, '\n&#60;')
				// add new line after > if not followed by < or a line break
				.replace(/&#62;(?!&#60;)(?!\n)/g, '&#62;\n');

		return string;
	}

	// helpers
	function isOpeningTag(string) {
		return string.substring(0, 5) === '&#60;';
	}
	function isClosingTag(string) {
		return string.substring(5, 10) === '&#47;';
	}
	function isSelfClosingTag(string) {

		// set reference to self closing tag
		var selfClosingTags = ['br', 'input', 'link', 'meta', '!doctype', 'basefont', 'base', 'area', 'source', 'hr', 'wbr', 'param', 'img', 'isindex', 'embed'],
			isSelfClosing = false;

		// test if current line contains a self closing tag
		for (var i = 0; i < selfClosingTags.length; i++) {

			var selfClosing = new RegExp('&#60;' + '\\b' + selfClosingTags[i] + '\\b');

			// if line contains self closing tag, break loop
			if (string.match(selfClosing)) {
				isSelfClosing = true;
				break;
			}
		}

		return isSelfClosing;
	}
	function isComment(string) {
		return string.substring(0, 8) === '&#60;!--';
	}
	function getCustomParams(options) {
		// for each custom attribute, overwrite default
		for (var attr in options) {
			if (options.hasOwnProperty(attr)) {
				config[attr] = options[attr];
			}
		}
	}

	// prototype string repeater
	function repeatString(string, num) {
		return new Array(num + 1).join(string);
	}

	// return final formatted html string
	return indentHtml(htmlString);
}
