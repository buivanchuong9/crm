import { o as __toESM } from "./chunk-CqwQKh_b.js";
import { t as require_react } from "./react.js";
//#region node_modules/react-number-format/dist/react-number-format.es.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function noop() {}
function returnTrue() {
	return true;
}
function charIsNumber(char) {
	return !!(char || "").match(/\d/);
}
function isNil(val) {
	return val === null || val === void 0;
}
function escapeRegExp(str) {
	return str.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
}
function getThousandsGroupRegex(thousandsGroupStyle) {
	switch (thousandsGroupStyle) {
		case "lakh": return /(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;
		case "wan": return /(\d)(?=(\d{4})+(?!\d))/g;
		default: return /(\d)(?=(\d{3})+(?!\d))/g;
	}
}
function applyThousandSeparator(str, thousandSeparator, thousandsGroupStyle) {
	var thousandsGroupRegex = getThousandsGroupRegex(thousandsGroupStyle);
	var index = str.search(/[1-9]/);
	index = index === -1 ? str.length : index;
	return str.substring(0, index) + str.substring(index, str.length).replace(thousandsGroupRegex, "$1" + thousandSeparator);
}
function splitDecimal(numStr, allowNegative) {
	if (allowNegative === void 0) allowNegative = true;
	var hasNagation = numStr[0] === "-";
	var addNegation = hasNagation && allowNegative;
	numStr = numStr.replace("-", "");
	var parts = numStr.split(".");
	return {
		beforeDecimal: parts[0],
		afterDecimal: parts[1] || "",
		hasNagation,
		addNegation
	};
}
function fixLeadingZero(numStr) {
	if (!numStr) return numStr;
	var isNegative = numStr[0] === "-";
	if (isNegative) numStr = numStr.substring(1, numStr.length);
	var parts = numStr.split(".");
	var beforeDecimal = parts[0].replace(/^0+/, "") || "0";
	var afterDecimal = parts[1] || "";
	return (isNegative ? "-" : "") + beforeDecimal + (afterDecimal ? "." + afterDecimal : "");
}
/**
* limit decimal numbers to given scale
* Not used .fixedTo because that will break with big numbers
*/
function limitToScale(numStr, scale, fixedDecimalScale) {
	var str = "";
	var filler = fixedDecimalScale ? "0" : "";
	for (var i = 0; i <= scale - 1; i++) str += numStr[i] || filler;
	return str;
}
function repeat(str, count) {
	return Array(count + 1).join(str);
}
function toNumericString(num) {
	num += "";
	var sign = num[0] === "-" ? "-" : "";
	if (sign) num = num.substring(1);
	var ref = num.split(/[eE]/g);
	var coefficient = ref[0];
	var exponent = ref[1];
	exponent = Number(exponent);
	if (!exponent) return sign + coefficient;
	coefficient = coefficient.replace(".", "");
	/**
	* for scientific notation the current decimal index will be after first number (index 0)
	* So effective decimal index will always be 1 + exponent value
	*/
	var decimalIndex = 1 + exponent;
	var coffiecientLn = coefficient.length;
	if (decimalIndex < 0) coefficient = "0." + repeat("0", Math.abs(decimalIndex)) + coefficient;
	else if (decimalIndex >= coffiecientLn) coefficient = coefficient + repeat("0", decimalIndex - coffiecientLn);
	else coefficient = (coefficient.substring(0, decimalIndex) || "0") + "." + coefficient.substring(decimalIndex);
	return sign + coefficient;
}
/**
* This method is required to round prop value to given scale.
* Not used .round or .fixedTo because that will break with big numbers
*/
function roundToPrecision(numStr, scale, fixedDecimalScale) {
	if (["", "-"].indexOf(numStr) !== -1) return numStr;
	var shoudHaveDecimalSeparator = numStr.indexOf(".") !== -1 && scale;
	var ref = splitDecimal(numStr);
	var beforeDecimal = ref.beforeDecimal;
	var afterDecimal = ref.afterDecimal;
	var hasNagation = ref.hasNagation;
	var floatValue = parseFloat("0." + (afterDecimal || "0"));
	var roundedDecimalParts = (afterDecimal.length <= scale ? "0." + afterDecimal : floatValue.toFixed(scale)).split(".");
	var intPart = beforeDecimal.split("").reverse().reduce(function(roundedStr, current, idx) {
		if (roundedStr.length > idx) return (Number(roundedStr[0]) + Number(current)).toString() + roundedStr.substring(1, roundedStr.length);
		return current + roundedStr;
	}, roundedDecimalParts[0]);
	var decimalPart = limitToScale(roundedDecimalParts[1] || "", Math.min(scale, afterDecimal.length), fixedDecimalScale);
	var negation = hasNagation ? "-" : "";
	var decimalSeparator = shoudHaveDecimalSeparator ? "." : "";
	return "" + negation + intPart + decimalSeparator + decimalPart;
}
/** set the caret positon in an input field **/
function setCaretPosition(el, caretPos) {
	el.value = el.value;
	if (el !== null) {
		if (el.createTextRange) {
			var range = el.createTextRange();
			range.move("character", caretPos);
			range.select();
			return true;
		}
		if (el.selectionStart || el.selectionStart === 0) {
			el.focus();
			el.setSelectionRange(caretPos, caretPos);
			return true;
		}
		el.focus();
		return false;
	}
}
/**
Given previous value and newValue it returns the index
start - end to which values have changed.
This function makes assumption about only consecutive
characters are changed which is correct assumption for caret input.
*/
function findChangedIndex(prevValue, newValue) {
	var i = 0, j = 0;
	var prevLength = prevValue.length;
	var newLength = newValue.length;
	while (prevValue[i] === newValue[i] && i < prevLength) i++;
	while (prevValue[prevLength - 1 - j] === newValue[newLength - 1 - j] && newLength - j > i && prevLength - j > i) j++;
	return {
		start: i,
		end: prevLength - j
	};
}
function clamp(num, min, max) {
	return Math.min(Math.max(num, min), max);
}
function getCurrentCaretPosition(el) {
	return Math.max(el.selectionStart, el.selectionEnd);
}
function addInputMode(format) {
	return format || typeof navigator !== "undefined" && !(navigator.platform && /iPhone|iPod/.test(navigator.platform));
}
function objectWithoutProperties(obj, exclude) {
	var target = {};
	for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k];
	return target;
}
var defaultProps = {
	displayType: "input",
	decimalSeparator: ".",
	thousandsGroupStyle: "thousand",
	fixedDecimalScale: false,
	prefix: "",
	suffix: "",
	allowNegative: true,
	allowEmptyFormatting: false,
	allowLeadingZeros: false,
	isNumericString: false,
	type: "text",
	onValueChange: noop,
	onChange: noop,
	onKeyDown: noop,
	onMouseUp: noop,
	onFocus: noop,
	onBlur: noop,
	isAllowed: returnTrue
};
var NumberFormat = /* @__PURE__ */ function(superclass) {
	function NumberFormat(props) {
		superclass.call(this, props);
		var defaultValue = props.defaultValue;
		this.validateProps();
		var formattedValue = this.formatValueProp(defaultValue);
		this.state = {
			value: formattedValue,
			numAsString: this.removeFormatting(formattedValue),
			mounted: false
		};
		this.selectionBeforeInput = {
			selectionStart: 0,
			selectionEnd: 0
		};
		this.onChange = this.onChange.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}
	if (superclass) NumberFormat.__proto__ = superclass;
	NumberFormat.prototype = Object.create(superclass && superclass.prototype);
	NumberFormat.prototype.constructor = NumberFormat;
	NumberFormat.prototype.componentDidMount = function componentDidMount() {
		this.setState({ mounted: true });
	};
	NumberFormat.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
		this.updateValueIfRequired(prevProps);
	};
	NumberFormat.prototype.componentWillUnmount = function componentWillUnmount() {
		clearTimeout(this.focusTimeout);
		clearTimeout(this.caretPositionTimeout);
	};
	NumberFormat.prototype.updateValueIfRequired = function updateValueIfRequired(prevProps) {
		var ref = this;
		var props = ref.props;
		var state = ref.state;
		var focusedElm = ref.focusedElm;
		var stateValue = state.value;
		var lastNumStr = state.numAsString;
		if (lastNumStr === void 0) lastNumStr = "";
		if (prevProps !== props) {
			this.validateProps();
			var lastValueWithNewFormat = this.formatNumString(lastNumStr);
			var formattedValue = isNil(props.value) ? lastValueWithNewFormat : this.formatValueProp();
			var numAsString = this.removeFormatting(formattedValue);
			var floatValue = parseFloat(numAsString);
			var lastFloatValue = parseFloat(lastNumStr);
			if ((!isNaN(floatValue) || !isNaN(lastFloatValue)) && floatValue !== lastFloatValue || lastValueWithNewFormat !== stateValue || focusedElm === null && formattedValue !== stateValue) this.updateValue({
				formattedValue,
				numAsString,
				input: focusedElm,
				source: "prop",
				event: null
			});
		}
	};
	/** Misc methods **/
	NumberFormat.prototype.getFloatString = function getFloatString(num) {
		if (num === void 0) num = "";
		var decimalScale = this.props.decimalScale;
		var decimalSeparator = this.getSeparators().decimalSeparator;
		var numRegex = this.getNumberRegex(true);
		var hasNegation = num[0] === "-";
		if (hasNegation) num = num.replace("-", "");
		if (decimalSeparator && decimalScale === 0) num = num.split(decimalSeparator)[0];
		num = (num.match(numRegex) || []).join("").replace(decimalSeparator, ".");
		var firstDecimalIndex = num.indexOf(".");
		if (firstDecimalIndex !== -1) num = num.substring(0, firstDecimalIndex) + "." + num.substring(firstDecimalIndex + 1, num.length).replace(new RegExp(escapeRegExp(decimalSeparator), "g"), "");
		if (hasNegation) num = "-" + num;
		return num;
	};
	NumberFormat.prototype.getNumberRegex = function getNumberRegex(g, ignoreDecimalSeparator) {
		var ref = this.props;
		var format = ref.format;
		var decimalScale = ref.decimalScale;
		var customNumerals = ref.customNumerals;
		var decimalSeparator = this.getSeparators().decimalSeparator;
		return new RegExp("[0-9" + (customNumerals ? customNumerals.join("") : "") + "]" + (decimalSeparator && decimalScale !== 0 && !ignoreDecimalSeparator && !format ? "|" + escapeRegExp(decimalSeparator) : ""), g ? "g" : void 0);
	};
	NumberFormat.prototype.getSeparators = function getSeparators() {
		var decimalSeparator = this.props.decimalSeparator;
		var ref$1 = this.props;
		var thousandSeparator = ref$1.thousandSeparator;
		var allowedDecimalSeparators = ref$1.allowedDecimalSeparators;
		if (thousandSeparator === true) thousandSeparator = ",";
		if (!allowedDecimalSeparators) allowedDecimalSeparators = [decimalSeparator, "."];
		return {
			decimalSeparator,
			thousandSeparator,
			allowedDecimalSeparators
		};
	};
	NumberFormat.prototype.getMaskAtIndex = function getMaskAtIndex(index) {
		var mask = this.props.mask;
		if (mask === void 0) mask = " ";
		if (typeof mask === "string") return mask;
		return mask[index] || " ";
	};
	NumberFormat.prototype.getValueObject = function getValueObject(formattedValue, numAsString) {
		var floatValue = parseFloat(numAsString);
		return {
			formattedValue,
			value: numAsString,
			floatValue: isNaN(floatValue) ? void 0 : floatValue
		};
	};
	NumberFormat.prototype.validateProps = function validateProps() {
		var mask = this.props.mask;
		var ref$1 = this.getSeparators();
		var decimalSeparator = ref$1.decimalSeparator;
		var thousandSeparator = ref$1.thousandSeparator;
		if (decimalSeparator === thousandSeparator) throw new Error("\n          Decimal separator can't be same as thousand separator.\n          thousandSeparator: " + thousandSeparator + " (thousandSeparator = {true} is same as thousandSeparator = \",\")\n          decimalSeparator: " + decimalSeparator + " (default value for decimalSeparator is .)\n       ");
		if (mask) {
			if ((mask === "string" ? mask : mask.toString()).match(/\d/g)) throw new Error("\n          Mask " + mask + " should not contain numeric character;\n        ");
		}
	};
	/** Misc methods end **/
	/** caret specific methods **/
	NumberFormat.prototype.setPatchedCaretPosition = function setPatchedCaretPosition(el, caretPos, currentValue) {
		setCaretPosition(el, caretPos);
		this.caretPositionTimeout = setTimeout(function() {
			if (el.value === currentValue) setCaretPosition(el, caretPos);
		}, 0);
	};
	NumberFormat.prototype.correctCaretPosition = function correctCaretPosition(value, caretPos, direction) {
		var ref = this.props;
		var prefix = ref.prefix;
		var suffix = ref.suffix;
		var format = ref.format;
		if (value === "") return 0;
		caretPos = clamp(caretPos, 0, value.length);
		if (!format) {
			var hasNegation = value[0] === "-";
			return clamp(caretPos, prefix.length + (hasNegation ? 1 : 0), value.length - suffix.length);
		}
		if (typeof format === "function") return caretPos;
		if (format[caretPos] === "#" && charIsNumber(value[caretPos])) return caretPos;
		if (format[caretPos - 1] === "#" && charIsNumber(value[caretPos - 1])) return caretPos;
		var firstHashPosition = format.indexOf("#");
		var lastHashPosition = format.lastIndexOf("#");
		caretPos = clamp(caretPos, firstHashPosition, lastHashPosition + 1);
		var nextPos = format.substring(caretPos, format.length).indexOf("#");
		var caretLeftBound = caretPos;
		var caretRightBound = caretPos + (nextPos === -1 ? 0 : nextPos);
		while (caretLeftBound > firstHashPosition && (format[caretLeftBound] !== "#" || !charIsNumber(value[caretLeftBound]))) caretLeftBound -= 1;
		if (!charIsNumber(value[caretRightBound]) || direction === "left" && caretPos !== firstHashPosition || caretPos - caretLeftBound < caretRightBound - caretPos) return charIsNumber(value[caretLeftBound]) ? caretLeftBound + 1 : caretLeftBound;
		return caretRightBound;
	};
	NumberFormat.prototype.getCaretPosition = function getCaretPosition(inputValue, formattedValue, caretPos) {
		var format = this.props.format;
		var stateValue = this.state.value;
		var numRegex = this.getNumberRegex(true);
		var inputNumber = (inputValue.match(numRegex) || []).join("");
		var formattedNumber = (formattedValue.match(numRegex) || []).join("");
		var j = 0, i;
		for (i = 0; i < caretPos; i++) {
			var currentInputChar = inputValue[i] || "";
			var currentFormatChar = formattedValue[j] || "";
			if (!currentInputChar.match(numRegex) && currentInputChar !== currentFormatChar) continue;
			if (currentInputChar === "0" && currentFormatChar.match(numRegex) && currentFormatChar !== "0" && inputNumber.length !== formattedNumber.length) continue;
			while (currentInputChar !== formattedValue[j] && j < formattedValue.length) j++;
			j++;
		}
		if (typeof format === "string" && !stateValue) j = formattedValue.length;
		j = this.correctCaretPosition(formattedValue, j);
		return j;
	};
	/** caret specific methods ends **/
	/** methods to remove formattting **/
	NumberFormat.prototype.removePrefixAndSuffix = function removePrefixAndSuffix(val) {
		var ref = this.props;
		var format = ref.format;
		var prefix = ref.prefix;
		var suffix = ref.suffix;
		if (!format && val) {
			var isNegative = val[0] === "-";
			if (isNegative) val = val.substring(1, val.length);
			val = prefix && val.indexOf(prefix) === 0 ? val.substring(prefix.length, val.length) : val;
			var suffixLastIndex = val.lastIndexOf(suffix);
			val = suffix && suffixLastIndex !== -1 && suffixLastIndex === val.length - suffix.length ? val.substring(0, suffixLastIndex) : val;
			if (isNegative) val = "-" + val;
		}
		return val;
	};
	NumberFormat.prototype.removePatternFormatting = function removePatternFormatting(val) {
		var formatArray = this.props.format.split("#").filter(function(str) {
			return str !== "";
		});
		var start = 0;
		var numStr = "";
		for (var i = 0, ln = formatArray.length; i <= ln; i++) {
			var part = formatArray[i] || "";
			var index = i === ln ? val.length : val.indexOf(part, start);
			if (index === -1) {
				numStr = val;
				break;
			} else {
				numStr += val.substring(start, index);
				start = index + part.length;
			}
		}
		return (numStr.match(this.getNumberRegex(true)) || []).join("");
	};
	NumberFormat.prototype.removeFormatting = function removeFormatting(val) {
		var ref = this.props;
		var format = ref.format;
		var removeFormatting = ref.removeFormatting;
		if (!val) return val;
		if (!format) {
			val = this.removePrefixAndSuffix(val);
			val = this.getFloatString(val);
		} else if (typeof format === "string") val = this.removePatternFormatting(val);
		else if (typeof removeFormatting === "function") val = removeFormatting(val);
		else val = (val.match(this.getNumberRegex(true)) || []).join("");
		return val;
	};
	/** methods to remove formattting end **/
	/*** format specific methods start ***/
	/**
	* Format when # based string is provided
	* @param  {string} numStr Numeric String
	* @return {string}        formatted Value
	*/
	NumberFormat.prototype.formatWithPattern = function formatWithPattern(numStr) {
		var format = this.props.format;
		var hashCount = 0;
		var formattedNumberAry = format.split("");
		for (var i = 0, ln = format.length; i < ln; i++) if (format[i] === "#") {
			formattedNumberAry[i] = numStr[hashCount] || this.getMaskAtIndex(hashCount);
			hashCount += 1;
		}
		return formattedNumberAry.join("");
	};
	/**
	* @param  {string} numStr Numeric string/floatString] It always have decimalSeparator as .
	* @return {string} formatted Value
	*/
	NumberFormat.prototype.formatAsNumber = function formatAsNumber(numStr) {
		var ref = this.props;
		var decimalScale = ref.decimalScale;
		var fixedDecimalScale = ref.fixedDecimalScale;
		var prefix = ref.prefix;
		var suffix = ref.suffix;
		var allowNegative = ref.allowNegative;
		var thousandsGroupStyle = ref.thousandsGroupStyle;
		var ref$1 = this.getSeparators();
		var thousandSeparator = ref$1.thousandSeparator;
		var decimalSeparator = ref$1.decimalSeparator;
		var hasDecimalSeparator = numStr.indexOf(".") !== -1 || decimalScale && fixedDecimalScale;
		var ref$2 = splitDecimal(numStr, allowNegative);
		var beforeDecimal = ref$2.beforeDecimal;
		var afterDecimal = ref$2.afterDecimal;
		var addNegation = ref$2.addNegation;
		if (decimalScale !== void 0) afterDecimal = limitToScale(afterDecimal, decimalScale, fixedDecimalScale);
		if (thousandSeparator) beforeDecimal = applyThousandSeparator(beforeDecimal, thousandSeparator, thousandsGroupStyle);
		if (prefix) beforeDecimal = prefix + beforeDecimal;
		if (suffix) afterDecimal = afterDecimal + suffix;
		if (addNegation) beforeDecimal = "-" + beforeDecimal;
		numStr = beforeDecimal + (hasDecimalSeparator && decimalSeparator || "") + afterDecimal;
		return numStr;
	};
	NumberFormat.prototype.formatNumString = function formatNumString(numStr) {
		if (numStr === void 0) numStr = "";
		var ref = this.props;
		var format = ref.format;
		var allowEmptyFormatting = ref.allowEmptyFormatting;
		var customNumerals = ref.customNumerals;
		var formattedValue = numStr;
		if (customNumerals && customNumerals.length === 10) {
			var customNumeralRegex = new RegExp("[" + customNumerals.join("") + "]", "g");
			formattedValue = numStr.replace(customNumeralRegex, function(digit) {
				return customNumerals.indexOf(digit).toString();
			});
		}
		if (numStr === "" && !allowEmptyFormatting) formattedValue = "";
		else if (numStr === "-" && !format) formattedValue = "-";
		else if (typeof format === "string") formattedValue = this.formatWithPattern(formattedValue);
		else if (typeof format === "function") formattedValue = format(formattedValue);
		else formattedValue = this.formatAsNumber(formattedValue);
		return formattedValue;
	};
	NumberFormat.prototype.formatValueProp = function formatValueProp(defaultValue) {
		var ref = this.props;
		var format = ref.format;
		var decimalScale = ref.decimalScale;
		var fixedDecimalScale = ref.fixedDecimalScale;
		var allowEmptyFormatting = ref.allowEmptyFormatting;
		var ref$1 = this.props;
		var value = ref$1.value;
		var isNumericString = ref$1.isNumericString;
		value = isNil(value) ? defaultValue : value;
		var isNonNumericFalsy = !value && value !== 0;
		if (isNonNumericFalsy && allowEmptyFormatting) value = "";
		if (isNonNumericFalsy && !allowEmptyFormatting) return "";
		if (typeof value === "number") {
			value = toNumericString(value);
			isNumericString = true;
		}
		if (value === "Infinity" && isNumericString) value = "";
		if (isNumericString && !format && typeof decimalScale === "number") value = roundToPrecision(value, decimalScale, fixedDecimalScale);
		return isNumericString ? this.formatNumString(value) : this.formatInput(value);
	};
	NumberFormat.prototype.formatNegation = function formatNegation(value) {
		if (value === void 0) value = "";
		var allowNegative = this.props.allowNegative;
		var negationRegex = /* @__PURE__ */ new RegExp("(-)");
		var doubleNegationRegex = /* @__PURE__ */ new RegExp("(-)(.)*(-)");
		var hasNegation = negationRegex.test(value);
		var removeNegation = doubleNegationRegex.test(value);
		value = value.replace(/-/g, "");
		if (hasNegation && !removeNegation && allowNegative) value = "-" + value;
		return value;
	};
	NumberFormat.prototype.formatInput = function formatInput(value) {
		if (value === void 0) value = "";
		if (!this.props.format) {
			value = this.removePrefixAndSuffix(value);
			value = this.formatNegation(value);
		}
		value = this.removeFormatting(value);
		return this.formatNumString(value);
	};
	/*** format specific methods end ***/
	NumberFormat.prototype.isCharacterAFormat = function isCharacterAFormat(caretPos, value) {
		var ref = this.props;
		var format = ref.format;
		var prefix = ref.prefix;
		var suffix = ref.suffix;
		var decimalScale = ref.decimalScale;
		var fixedDecimalScale = ref.fixedDecimalScale;
		var decimalSeparator = this.getSeparators().decimalSeparator;
		if (typeof format === "string" && format[caretPos] !== "#") return true;
		if (!format && (caretPos < prefix.length || caretPos >= value.length - suffix.length || decimalScale && fixedDecimalScale && value[caretPos] === decimalSeparator)) return true;
		return false;
	};
	/**
	* This will check if any formatting got removed by the delete or backspace and reset the value
	* It will also work as fallback if android chome keyDown handler does not work
	**/
	NumberFormat.prototype.correctInputValue = function correctInputValue(caretPos, lastValue, value) {
		var this$1 = this;
		var ref = this.props;
		var format = ref.format;
		var allowNegative = ref.allowNegative;
		var prefix = ref.prefix;
		var suffix = ref.suffix;
		var decimalScale = ref.decimalScale;
		var ref$1 = this.getSeparators();
		var allowedDecimalSeparators = ref$1.allowedDecimalSeparators;
		var decimalSeparator = ref$1.decimalSeparator;
		var lastNumStr = this.state.numAsString || "";
		var ref$2 = this.selectionBeforeInput;
		var selectionStart = ref$2.selectionStart;
		var selectionEnd = ref$2.selectionEnd;
		var ref$3 = findChangedIndex(lastValue, value);
		var start = ref$3.start;
		var end = ref$3.end;
		/** Check for any allowed decimal separator is added in the numeric format and replace it with decimal separator */
		if (!format && start === end && allowedDecimalSeparators.indexOf(value[selectionStart]) !== -1) {
			var separator = decimalScale === 0 ? "" : decimalSeparator;
			return value.substr(0, selectionStart) + separator + value.substr(selectionStart + 1, value.length);
		}
		var leftBound = !!format ? 0 : prefix.length;
		var rightBound = lastValue.length - (!!format ? 0 : suffix.length);
		if (value.length > lastValue.length || !value.length || start === end || selectionStart === 0 && selectionEnd === lastValue.length || start === 0 && end === lastValue.length || selectionStart === leftBound && selectionEnd === rightBound) return value;
		var deletedValues = lastValue.substr(start, end - start);
		if (!![].concat(deletedValues).find(function(deletedVal, idx) {
			return this$1.isCharacterAFormat(idx + start, lastValue);
		})) {
			var deletedValuePortion = lastValue.substr(start);
			var recordIndexOfFormatCharacters = {};
			var resolvedPortion = [];
			[].concat(deletedValuePortion).forEach(function(currentPortion, idx) {
				if (this$1.isCharacterAFormat(idx + start, lastValue)) recordIndexOfFormatCharacters[idx] = currentPortion;
				else if (idx > deletedValues.length - 1) resolvedPortion.push(currentPortion);
			});
			Object.keys(recordIndexOfFormatCharacters).forEach(function(idx) {
				if (resolvedPortion.length > idx) resolvedPortion.splice(idx, 0, recordIndexOfFormatCharacters[idx]);
				else resolvedPortion.push(recordIndexOfFormatCharacters[idx]);
			});
			value = lastValue.substr(0, start) + resolvedPortion.join("");
		}
		if (!format) {
			var numericString = this.removeFormatting(value);
			var ref$4 = splitDecimal(numericString, allowNegative);
			var beforeDecimal = ref$4.beforeDecimal;
			var afterDecimal = ref$4.afterDecimal;
			var addNegation = ref$4.addNegation;
			var isBeforeDecimalPoint = caretPos < value.indexOf(decimalSeparator) + 1;
			if (numericString.length < lastNumStr.length && isBeforeDecimalPoint && beforeDecimal === "" && !parseFloat(afterDecimal)) return addNegation ? "-" : "";
		}
		return value;
	};
	/** Update value and caret position */
	NumberFormat.prototype.updateValue = function updateValue(params) {
		var formattedValue = params.formattedValue;
		var input = params.input;
		var setCaretPosition = params.setCaretPosition;
		if (setCaretPosition === void 0) setCaretPosition = true;
		var source = params.source;
		var event = params.event;
		var numAsString = params.numAsString;
		var caretPos = params.caretPos;
		var onValueChange = this.props.onValueChange;
		var lastValue = this.state.value;
		if (input) {
			if (caretPos === void 0 && setCaretPosition) {
				var inputValue = params.inputValue || input.value;
				var currentCaretPosition = getCurrentCaretPosition(input);
				/**
				* set the value imperatively, this is required for IE fix
				* This is also required as if new caret position is beyond the previous value.
				* Caret position will not be set correctly
				*/
				input.value = formattedValue;
				caretPos = this.getCaretPosition(inputValue, formattedValue, currentCaretPosition);
			}
			/**
			* set the value imperatively, as we set the caret position as well imperatively.
			* This is to keep value and caret position in sync
			*/
			input.value = formattedValue;
			if (setCaretPosition) this.setPatchedCaretPosition(input, caretPos, formattedValue);
		}
		if (numAsString === void 0) numAsString = this.removeFormatting(formattedValue);
		if (formattedValue !== lastValue) {
			this.setState({
				value: formattedValue,
				numAsString
			});
			onValueChange(this.getValueObject(formattedValue, numAsString), {
				event,
				source
			});
		}
	};
	NumberFormat.prototype.onChange = function onChange(e) {
		var el = e.target;
		var inputValue = el.value;
		var ref = this;
		var state = ref.state;
		var props = ref.props;
		var isAllowed = props.isAllowed;
		var lastValue = state.value || "";
		var currentCaretPosition = getCurrentCaretPosition(el);
		inputValue = this.correctInputValue(currentCaretPosition, lastValue, inputValue);
		var formattedValue = this.formatInput(inputValue) || "";
		var numAsString = this.removeFormatting(formattedValue);
		var isChangeAllowed = isAllowed(this.getValueObject(formattedValue, numAsString));
		if (!isChangeAllowed) formattedValue = lastValue;
		this.updateValue({
			formattedValue,
			numAsString,
			inputValue,
			input: el,
			event: e,
			source: "event"
		});
		if (isChangeAllowed) props.onChange(e);
	};
	NumberFormat.prototype.onBlur = function onBlur(e) {
		var ref = this;
		var props = ref.props;
		var state = ref.state;
		var format = props.format;
		var onBlur = props.onBlur;
		var allowLeadingZeros = props.allowLeadingZeros;
		var numAsString = state.numAsString;
		var lastValue = state.value;
		this.focusedElm = null;
		clearTimeout(this.focusTimeout);
		clearTimeout(this.caretPositionTimeout);
		if (!format) {
			if (isNaN(parseFloat(numAsString))) numAsString = "";
			if (!allowLeadingZeros) numAsString = fixLeadingZero(numAsString);
			var formattedValue = this.formatNumString(numAsString);
			if (formattedValue !== lastValue) {
				this.updateValue({
					formattedValue,
					numAsString,
					input: e.target,
					setCaretPosition: false,
					event: e,
					source: "event"
				});
				onBlur(e);
				return;
			}
		}
		onBlur(e);
	};
	NumberFormat.prototype.onKeyDown = function onKeyDown(e) {
		var el = e.target;
		var key = e.key;
		var selectionStart = el.selectionStart;
		var selectionEnd = el.selectionEnd;
		var value = el.value;
		if (value === void 0) value = "";
		var expectedCaretPosition;
		var ref = this.props;
		var decimalScale = ref.decimalScale;
		var fixedDecimalScale = ref.fixedDecimalScale;
		var prefix = ref.prefix;
		var suffix = ref.suffix;
		var format = ref.format;
		var onKeyDown = ref.onKeyDown;
		var ignoreDecimalSeparator = decimalScale !== void 0 && fixedDecimalScale;
		var numRegex = this.getNumberRegex(false, ignoreDecimalSeparator);
		var negativeRegex = /* @__PURE__ */ new RegExp("-");
		var isPatternFormat = typeof format === "string";
		this.selectionBeforeInput = {
			selectionStart,
			selectionEnd
		};
		if (key === "ArrowLeft" || key === "Backspace") expectedCaretPosition = selectionStart - 1;
		else if (key === "ArrowRight") expectedCaretPosition = selectionStart + 1;
		else if (key === "Delete") expectedCaretPosition = selectionStart;
		if (expectedCaretPosition === void 0 || selectionStart !== selectionEnd) {
			onKeyDown(e);
			return;
		}
		var newCaretPosition = expectedCaretPosition;
		var leftBound = isPatternFormat ? format.indexOf("#") : prefix.length;
		var rightBound = isPatternFormat ? format.lastIndexOf("#") + 1 : value.length - suffix.length;
		if (key === "ArrowLeft" || key === "ArrowRight") {
			var direction = key === "ArrowLeft" ? "left" : "right";
			newCaretPosition = this.correctCaretPosition(value, expectedCaretPosition, direction);
		} else if (key === "Delete" && !numRegex.test(value[expectedCaretPosition]) && !negativeRegex.test(value[expectedCaretPosition])) while (!numRegex.test(value[newCaretPosition]) && newCaretPosition < rightBound) newCaretPosition++;
		else if (key === "Backspace" && !numRegex.test(value[expectedCaretPosition])) {
			if (selectionStart <= leftBound + 1 && value[0] === "-" && typeof format === "undefined") {
				var newValue = value.substring(1);
				this.updateValue({
					formattedValue: newValue,
					caretPos: newCaretPosition,
					input: el,
					event: e,
					source: "event"
				});
			} else if (!negativeRegex.test(value[expectedCaretPosition])) {
				while (!numRegex.test(value[newCaretPosition - 1]) && newCaretPosition > leftBound) newCaretPosition--;
				newCaretPosition = this.correctCaretPosition(value, newCaretPosition, "left");
			}
		}
		if (newCaretPosition !== expectedCaretPosition || expectedCaretPosition < leftBound || expectedCaretPosition > rightBound) {
			e.preventDefault();
			this.setPatchedCaretPosition(el, newCaretPosition, value);
		}
		if (e.isUnitTestRun) this.setPatchedCaretPosition(el, newCaretPosition, value);
		onKeyDown(e);
	};
	/** required to handle the caret position when click anywhere within the input **/
	NumberFormat.prototype.onMouseUp = function onMouseUp(e) {
		var el = e.target;
		/**
		* NOTE: we have to give default value for value as in case when custom input is provided
		* value can come as undefined when nothing is provided on value prop.
		*/
		var selectionStart = el.selectionStart;
		var selectionEnd = el.selectionEnd;
		var value = el.value;
		if (value === void 0) value = "";
		if (selectionStart === selectionEnd) {
			var caretPosition = this.correctCaretPosition(value, selectionStart);
			if (caretPosition !== selectionStart) this.setPatchedCaretPosition(el, caretPosition, value);
		}
		this.props.onMouseUp(e);
	};
	NumberFormat.prototype.onFocus = function onFocus(e) {
		var this$1 = this;
		e.persist();
		this.focusedElm = e.target;
		this.focusTimeout = setTimeout(function() {
			var el = e.target;
			var selectionStart = el.selectionStart;
			var selectionEnd = el.selectionEnd;
			var value = el.value;
			if (value === void 0) value = "";
			var caretPosition = this$1.correctCaretPosition(value, selectionStart);
			if (caretPosition !== selectionStart && !(selectionStart === 0 && selectionEnd === value.length)) this$1.setPatchedCaretPosition(el, caretPosition, value);
			this$1.props.onFocus(e);
		}, 0);
	};
	NumberFormat.prototype.render = function render() {
		var ref = this.props;
		var type = ref.type;
		var displayType = ref.displayType;
		var customInput = ref.customInput;
		var renderText = ref.renderText;
		var getInputRef = ref.getInputRef;
		var format = ref.format;
		ref.thousandSeparator;
		ref.decimalSeparator;
		ref.allowedDecimalSeparators;
		ref.thousandsGroupStyle;
		ref.decimalScale;
		ref.fixedDecimalScale;
		ref.prefix;
		ref.suffix;
		ref.removeFormatting;
		ref.mask;
		ref.defaultValue;
		ref.isNumericString;
		ref.allowNegative;
		ref.allowEmptyFormatting;
		ref.allowLeadingZeros;
		ref.onValueChange;
		ref.isAllowed;
		ref.customNumerals;
		ref.onChange;
		ref.onKeyDown;
		ref.onMouseUp;
		ref.onFocus;
		ref.onBlur;
		ref.value;
		var otherProps = objectWithoutProperties(ref, [
			"type",
			"displayType",
			"customInput",
			"renderText",
			"getInputRef",
			"format",
			"thousandSeparator",
			"decimalSeparator",
			"allowedDecimalSeparators",
			"thousandsGroupStyle",
			"decimalScale",
			"fixedDecimalScale",
			"prefix",
			"suffix",
			"removeFormatting",
			"mask",
			"defaultValue",
			"isNumericString",
			"allowNegative",
			"allowEmptyFormatting",
			"allowLeadingZeros",
			"onValueChange",
			"isAllowed",
			"customNumerals",
			"onChange",
			"onKeyDown",
			"onMouseUp",
			"onFocus",
			"onBlur",
			"value"
		]);
		var ref$1 = this.state;
		var value = ref$1.value;
		var inputMode = ref$1.mounted && addInputMode(format) ? "numeric" : void 0;
		var inputProps = Object.assign({ inputMode }, otherProps, {
			type,
			value,
			onChange: this.onChange,
			onKeyDown: this.onKeyDown,
			onMouseUp: this.onMouseUp,
			onFocus: this.onFocus,
			onBlur: this.onBlur
		});
		if (displayType === "text") return renderText ? renderText(value, otherProps) || null : import_react.createElement("span", Object.assign({}, otherProps, { ref: getInputRef }), value);
		else if (customInput) {
			var CustomInput = customInput;
			return import_react.createElement(CustomInput, Object.assign({}, inputProps, { ref: getInputRef }));
		}
		return import_react.createElement("input", Object.assign({}, inputProps, { ref: getInputRef }));
	};
	return NumberFormat;
}(import_react.Component);
NumberFormat.defaultProps = defaultProps;
//#endregion
export { NumberFormat as default };

//# sourceMappingURL=react-number-format.js.map