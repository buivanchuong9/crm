//#region node_modules/diagram-js/node_modules/min-dom/dist/index.esm.js
function _mergeNamespaces(n, m) {
	m.forEach(function(e) {
		e && typeof e !== "string" && !Array.isArray(e) && Object.keys(e).forEach(function(k) {
			if (k !== "default" && !(k in n)) {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function() {
						return e[k];
					}
				});
			}
		});
	});
	return Object.freeze(n);
}
/**
* Flatten array, one level deep.
*
* @template T
*
* @param {T[][] | T[] | null} [arr]
*
* @return {T[]}
*/
var nativeToString$1 = Object.prototype.toString;
var nativeHasOwnProperty$1 = Object.prototype.hasOwnProperty;
function isUndefined$1(obj) {
	return obj === void 0;
}
function isArray$1(obj) {
	return nativeToString$1.call(obj) === "[object Array]";
}
/**
* Return true, if target owns a property with the given key.
*
* @param {Object} target
* @param {String} key
*
* @return {Boolean}
*/
function has$1(target, key) {
	return nativeHasOwnProperty$1.call(target, key);
}
/**
* Iterate over collection; returning something
* (non-undefined) will stop iteration.
*
* @template T
* @param {Collection<T>} collection
* @param { ((item: T, idx: number) => (boolean|void)) | ((item: T, key: string) => (boolean|void)) } iterator
*
* @return {T} return result that stopped the iteration
*/
function forEach$1(collection, iterator) {
	let val, result;
	if (isUndefined$1(collection)) return;
	const convertKey = isArray$1(collection) ? toNum$1 : identity$1;
	for (let key in collection) if (has$1(collection, key)) {
		val = collection[key];
		result = iterator(val, convertKey(key));
		if (result === false) return val;
	}
}
function identity$1(arg) {
	return arg;
}
function toNum$1(arg) {
	return Number(arg);
}
/**
* Assigns style attributes in a style-src compliant way.
*
* @param {Element} element
* @param {...Object} styleSources
*
* @return {Element} the element
*/
function assign$1(element, ...styleSources) {
	const target = element.style;
	forEach$1(styleSources, function(style) {
		if (!style) return;
		forEach$1(style, function(value, key) {
			target[key] = value;
		});
	});
	return element;
}
/**
* Set attribute `name` to `val`, or get attr `name`.
*
* @param {Element} el
* @param {String} name
* @param {String} [val]
* @api public
*/
function attr(el, name, val) {
	if (arguments.length == 2) return el.getAttribute(name);
	if (val === null) return el.removeAttribute(name);
	el.setAttribute(name, val);
	return el;
}
/**
* Taken from https://github.com/component/classes
*
* Without the component bits.
*/
/**
* toString reference.
*/
var toString = Object.prototype.toString;
/**
* Wrap `el` in a `ClassList`.
*
* @param {Element} el
* @return {ClassList}
* @api public
*/
function classes(el) {
	return new ClassList(el);
}
/**
* Initialize a new ClassList for `el`.
*
* @param {Element} el
* @api private
*/
function ClassList(el) {
	if (!el || !el.nodeType) throw new Error("A DOM element reference is required");
	this.el = el;
	this.list = el.classList;
}
/**
* Add class `name` if not already present.
*
* @param {String} name
* @return {ClassList}
* @api public
*/
ClassList.prototype.add = function(name) {
	this.list.add(name);
	return this;
};
/**
* Remove class `name` when present, or
* pass a regular expression to remove
* any which match.
*
* @param {String|RegExp} name
* @return {ClassList}
* @api public
*/
ClassList.prototype.remove = function(name) {
	if ("[object RegExp]" == toString.call(name)) return this.removeMatching(name);
	this.list.remove(name);
	return this;
};
/**
* Remove all classes matching `re`.
*
* @param {RegExp} re
* @return {ClassList}
* @api private
*/
ClassList.prototype.removeMatching = function(re) {
	const arr = this.array();
	for (let i = 0; i < arr.length; i++) if (re.test(arr[i])) this.remove(arr[i]);
	return this;
};
/**
* Toggle class `name`, can force state via `force`.
*
* For browsers that support classList, but do not support `force` yet,
* the mistake will be detected and corrected.
*
* @param {String} name
* @param {Boolean} force
* @return {ClassList}
* @api public
*/
ClassList.prototype.toggle = function(name, force) {
	if ("undefined" !== typeof force) {
		if (force !== this.list.toggle(name, force)) this.list.toggle(name);
	} else this.list.toggle(name);
	return this;
};
/**
* Return an array of classes.
*
* @return {Array}
* @api public
*/
ClassList.prototype.array = function() {
	return Array.from(this.list);
};
/**
* Check if class `name` is present.
*
* @param {String} name
* @return {ClassList}
* @api public
*/
ClassList.prototype.has = ClassList.prototype.contains = function(name) {
	return this.list.contains(name);
};
/**
* Clear utility
*/
/**
* Removes all children from the given element
*
* @param {Element} element
*
* @return {Element} the element (for chaining)
*/
function clear(element) {
	var child;
	while (child = element.firstChild) element.removeChild(child);
	return element;
}
/**
* Closest
*
* @param {Element} el
* @param {string} selector
* @param {boolean} checkYourSelf (optional)
*/
function closest(element, selector, checkYourSelf) {
	var actualElement = checkYourSelf ? element : element.parentNode;
	return actualElement && typeof actualElement.closest === "function" && actualElement.closest(selector) || null;
}
var componentEvent = {};
var bind$1, unbind$1, prefix;
function detect() {
	bind$1 = window.addEventListener ? "addEventListener" : "attachEvent";
	unbind$1 = window.removeEventListener ? "removeEventListener" : "detachEvent";
	prefix = bind$1 !== "addEventListener" ? "on" : "";
}
var event = /* @__PURE__ */ _mergeNamespaces({
	__proto__: null,
	bind: componentEvent.bind = function(el, type, fn, capture) {
		if (!bind$1) detect();
		el[bind$1](prefix + type, fn, capture || false);
		return fn;
	},
	unbind: componentEvent.unbind = function(el, type, fn, capture) {
		if (!unbind$1) detect();
		el[unbind$1](prefix + type, fn, capture || false);
		return fn;
	},
	"default": componentEvent
}, [componentEvent]);
/**
* Module dependencies.
*/
/**
* Delegate event `type` to `selector`
* and invoke `fn(e)`. A callback function
* is returned which may be passed to `.unbind()`.
*
* @param {Element} el
* @param {String} selector
* @param {String} type
* @param {Function} fn
* @param {Boolean} capture
* @return {Function}
* @api public
*/
var forceCaptureEvents = ["focus", "blur"];
function bind$2(el, selector, type, fn, capture) {
	if (forceCaptureEvents.indexOf(type) !== -1) capture = true;
	return event.bind(el, type, function(e) {
		e.delegateTarget = closest(e.target || e.srcElement, selector, true);
		if (e.delegateTarget) fn.call(el, e);
	}, capture);
}
/**
* Unbind event `type`'s callback `fn`.
*
* @param {Element} el
* @param {String} type
* @param {Function} fn
* @param {Boolean} capture
* @api public
*/
function unbind(el, type, fn, capture) {
	if (forceCaptureEvents.indexOf(type) !== -1) capture = true;
	return event.unbind(el, type, fn, capture);
}
var delegate = {
	bind: bind$2,
	unbind
};
/**
* Expose `parse`.
*/
var domify = parse;
/**
* Tests for browser support.
*/
var innerHTMLBug = false;
var bugTestDiv;
if (typeof document !== "undefined") {
	bugTestDiv = document.createElement("div");
	bugTestDiv.innerHTML = "  <link/><table></table><a href=\"/a\">a</a><input type=\"checkbox\"/>";
	innerHTMLBug = !bugTestDiv.getElementsByTagName("link").length;
	bugTestDiv = void 0;
}
/**
* Wrap map from jquery.
*/
var map$1 = {
	legend: [
		1,
		"<fieldset>",
		"</fieldset>"
	],
	tr: [
		2,
		"<table><tbody>",
		"</tbody></table>"
	],
	col: [
		2,
		"<table><tbody></tbody><colgroup>",
		"</colgroup></table>"
	],
	_default: innerHTMLBug ? [
		1,
		"X<div>",
		"</div>"
	] : [
		0,
		"",
		""
	]
};
map$1.td = map$1.th = [
	3,
	"<table><tbody><tr>",
	"</tr></tbody></table>"
];
map$1.option = map$1.optgroup = [
	1,
	"<select multiple=\"multiple\">",
	"</select>"
];
map$1.thead = map$1.tbody = map$1.colgroup = map$1.caption = map$1.tfoot = [
	1,
	"<table>",
	"</table>"
];
map$1.polyline = map$1.ellipse = map$1.polygon = map$1.circle = map$1.text = map$1.line = map$1.path = map$1.rect = map$1.g = [
	1,
	"<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\">",
	"</svg>"
];
/**
* Parse `html` and return a DOM Node instance, which could be a TextNode,
* HTML DOM Node of some kind (<div> for example), or a DocumentFragment
* instance, depending on the contents of the `html` string.
*
* @param {String} html - HTML string to "domify"
* @param {Document} doc - The `document` instance to create the Node for
* @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
* @api private
*/
function parse(html, doc) {
	if ("string" != typeof html) throw new TypeError("String expected");
	if (!doc) doc = document;
	var m = /<([\w:]+)/.exec(html);
	if (!m) return doc.createTextNode(html);
	html = html.replace(/^\s+|\s+$/g, "");
	var tag = m[1];
	if (tag == "body") {
		var el = doc.createElement("html");
		el.innerHTML = html;
		return el.removeChild(el.lastChild);
	}
	var wrap = Object.prototype.hasOwnProperty.call(map$1, tag) ? map$1[tag] : map$1._default;
	var depth = wrap[0];
	var prefix = wrap[1];
	var suffix = wrap[2];
	var el = doc.createElement("div");
	el.innerHTML = prefix + html + suffix;
	while (depth--) el = el.lastChild;
	if (el.firstChild == el.lastChild) return el.removeChild(el.firstChild);
	var fragment = doc.createDocumentFragment();
	while (el.firstChild) fragment.appendChild(el.removeChild(el.firstChild));
	return fragment;
}
var domify$1 = domify;
/**
* @param { HTMLElement } element
* @param { String } selector
*
* @return { boolean }
*/
function matches(element, selector) {
	return element && typeof element.matches === "function" && element.matches(selector) || false;
}
function query(selector, el) {
	el = el || document;
	return el.querySelector(selector);
}
function all(selector, el) {
	el = el || document;
	return el.querySelectorAll(selector);
}
function remove(el) {
	el.parentNode && el.parentNode.removeChild(el);
}
//#endregion
//#region node_modules/diagram-js/node_modules/min-dash/dist/index.esm.js
var nativeToString = Object.prototype.toString;
var nativeHasOwnProperty = Object.prototype.hasOwnProperty;
function isUndefined(obj) {
	return obj === void 0;
}
function isDefined(obj) {
	return obj !== void 0;
}
function isNil(obj) {
	return obj == null;
}
function isArray(obj) {
	return nativeToString.call(obj) === "[object Array]";
}
function isObject(obj) {
	return nativeToString.call(obj) === "[object Object]";
}
function isNumber(obj) {
	return nativeToString.call(obj) === "[object Number]";
}
/**
* @param {any} obj
*
* @return {boolean}
*/
function isFunction(obj) {
	const tag = nativeToString.call(obj);
	return tag === "[object Function]" || tag === "[object AsyncFunction]" || tag === "[object GeneratorFunction]" || tag === "[object AsyncGeneratorFunction]" || tag === "[object Proxy]";
}
function isString(obj) {
	return nativeToString.call(obj) === "[object String]";
}
/**
* Return true, if target owns a property with the given key.
*
* @param {Object} target
* @param {String} key
*
* @return {Boolean}
*/
function has(target, key) {
	return !isNil(target) && nativeHasOwnProperty.call(target, key);
}
/**
* @template T
* @typedef { (
*   ((e: T) => boolean) |
*   ((e: T, idx: number) => boolean) |
*   ((e: T, key: string) => boolean) |
*   string |
*   number
* ) } Matcher
*/
/**
* @template T
* @template U
*
* @typedef { (
*   ((e: T) => U) | string | number
* ) } Extractor
*/
/**
* @template T
* @typedef { (val: T, key: any) => boolean } MatchFn
*/
/**
* @template T
* @typedef { T[] } ArrayCollection
*/
/**
* @template T
* @typedef { { [key: string]: T } } StringKeyValueCollection
*/
/**
* @template T
* @typedef { { [key: number]: T } } NumberKeyValueCollection
*/
/**
* @template T
* @typedef { StringKeyValueCollection<T> | NumberKeyValueCollection<T> } KeyValueCollection
*/
/**
* @template T
* @typedef { KeyValueCollection<T> | ArrayCollection<T> } Collection
*/
/**
* Find element in collection.
*
* @template T
* @param {Collection<T>} collection
* @param {Matcher<T>} matcher
*
* @return {Object}
*/
function find(collection, matcher) {
	const matchFn = toMatcher(matcher);
	let match;
	forEach(collection, function(val, key) {
		if (matchFn(val, key)) {
			match = val;
			return false;
		}
	});
	return match;
}
/**
* Filter elements in collection.
*
* @template T
* @param {Collection<T>} collection
* @param {Matcher<T>} matcher
*
* @return {T[]} result
*/
function filter(collection, matcher) {
	const matchFn = toMatcher(matcher);
	let result = [];
	forEach(collection, function(val, key) {
		if (matchFn(val, key)) result.push(val);
	});
	return result;
}
/**
* Iterate over collection; returning something
* (non-undefined) will stop iteration.
*
* @template T
* @param {Collection<T>} collection
* @param { ((item: T, idx: number) => (boolean|void)) | ((item: T, key: string) => (boolean|void)) } iterator
*
* @return {T} return result that stopped the iteration
*/
function forEach(collection, iterator) {
	let val, result;
	if (isUndefined(collection)) return;
	const convertKey = isArray(collection) ? toNum : identity;
	for (let key in collection) if (has(collection, key)) {
		val = collection[key];
		result = iterator(val, convertKey(key));
		if (result === false) return val;
	}
}
/**
* Reduce collection, returning a single result.
*
* @template T
* @template V
*
* @param {Collection<T>} collection
* @param {(result: V, entry: T, index: any) => V} iterator
* @param {V} result
*
* @return {V} result returned from last iterator
*/
function reduce(collection, iterator, result) {
	forEach(collection, function(value, idx) {
		result = iterator(result, value, idx);
	});
	return result;
}
/**
* Return true if every element in the collection
* matches the criteria.
*
* @param  {Object|Array} collection
* @param  {Function} matcher
*
* @return {Boolean}
*/
function every(collection, matcher) {
	return !!reduce(collection, function(matches, val, key) {
		return matches && matcher(val, key);
	}, true);
}
/**
* Transform a collection into another collection
* by piping each member through the given fn.
*
* @param  {Object|Array}   collection
* @param  {Function} fn
*
* @return {Array} transformed collection
*/
function map(collection, fn) {
	let result = [];
	forEach(collection, function(val, key) {
		result.push(fn(val, key));
	});
	return result;
}
/**
* Sort collection by criteria.
*
* @template T
*
* @param {Collection<T>} collection
* @param {Extractor<T, number | string>} extractor
*
* @return {Array}
*/
function sortBy(collection, extractor) {
	extractor = toExtractor(extractor);
	let sorted = [];
	forEach(collection, function(value, key) {
		let disc = extractor(value, key);
		let entry = {
			d: disc,
			v: value
		};
		for (var idx = 0; idx < sorted.length; idx++) {
			let { d } = sorted[idx];
			if (disc < d) {
				sorted.splice(idx, 0, entry);
				return;
			}
		}
		sorted.push(entry);
	});
	return map(sorted, (e) => e.v);
}
/**
* Create an object pattern matcher.
*
* @example
*
* ```javascript
* const matcher = matchPattern({ id: 1 });
*
* let element = find(elements, matcher);
* ```
*
* @template T
*
* @param {T} pattern
*
* @return { (el: any) =>  boolean } matcherFn
*/
function matchPattern(pattern) {
	return function(el) {
		return every(pattern, function(val, key) {
			return el[key] === val;
		});
	};
}
/**
* @param {string | ((e: any) => any) } extractor
*
* @return { (e: any) => any }
*/
function toExtractor(extractor) {
	/**
	* @satisfies { (e: any) => any }
	*/
	return isFunction(extractor) ? extractor : (e) => {
		return e[extractor];
	};
}
/**
* @template T
* @param {Matcher<T>} matcher
*
* @return {MatchFn<T>}
*/
function toMatcher(matcher) {
	return isFunction(matcher) ? matcher : (e) => {
		return e === matcher;
	};
}
function identity(arg) {
	return arg;
}
function toNum(arg) {
	return Number(arg);
}
/**
* @typedef { {
*   (...args: any[]): any;
*   flush: () => void;
*   cancel: () => void;
* } } DebouncedFunction
*/
/**
* Debounce fn, calling it only once if the given time
* elapsed between calls.
*
* Lodash-style the function exposes methods to `#clear`
* and `#flush` to control internal behavior.
*
* @param  {Function} fn
* @param  {Number} timeout
*
* @return {DebouncedFunction} debounced function
*/
function debounce(fn, timeout) {
	let timer;
	let lastArgs;
	let lastThis;
	let lastNow;
	function fire(force) {
		let now = Date.now();
		let scheduledDiff = force ? 0 : lastNow + timeout - now;
		if (scheduledDiff > 0) return schedule(scheduledDiff);
		fn.apply(lastThis, lastArgs);
		clear();
	}
	function schedule(timeout) {
		timer = setTimeout(fire, timeout);
	}
	function clear() {
		if (timer) clearTimeout(timer);
		timer = lastNow = lastArgs = lastThis = void 0;
	}
	function flush() {
		if (timer) fire(true);
		clear();
	}
	/**
	* @type { DebouncedFunction }
	*/
	function callback(...args) {
		lastNow = Date.now();
		lastArgs = args;
		lastThis = this;
		if (!timer) schedule(timeout);
	}
	callback.flush = flush;
	callback.cancel = clear;
	return callback;
}
/**
* Bind function against target <this>.
*
* @param  {Function} fn
* @param  {Object}   target
*
* @return {Function} bound function
*/
function bind(fn, target) {
	return fn.bind(target);
}
/**
* Convenience wrapper for `Object.assign`.
*
* @param {Object} target
* @param {...Object} others
*
* @return {Object} the target
*/
function assign(target, ...others) {
	return Object.assign(target, ...others);
}
/**
* Pick all target properties, excluding the given ones.
*
* @template T
* @template {any[]} V
*
* @param {T} target
* @param {V} properties
*
* @return {Omit<T, V>} target
*/
function omit(target, properties) {
	let result = {};
	forEach(Object(target), function(prop, key) {
		if (properties.indexOf(key) === -1) result[key] = prop;
	});
	return result;
}
//#endregion
//#region node_modules/diagram-js/lib/features/keyboard/KeyboardUtil.js
var KEYS_COPY = ["c", "C"];
var KEYS_PASTE = ["v", "V"];
var KEYS_REDO = ["y", "Y"];
var KEYS_UNDO = ["z", "Z"];
/**
* Returns true if event was triggered with any modifier
* @param {KeyboardEvent} event
*/
function hasModifier(event) {
	return event.ctrlKey || event.metaKey || event.shiftKey || event.altKey;
}
/**
* @param {KeyboardEvent} event
* @return {boolean}
*/
function isCmd(event) {
	if (event.altKey) return false;
	return event.ctrlKey || event.metaKey;
}
/**
* Checks if key pressed is one of provided keys.
*
* @param {string|string[]} keys
* @param {KeyboardEvent} event
* @return {boolean}
*/
function isKey(keys, event) {
	keys = isArray(keys) ? keys : [keys];
	return keys.indexOf(event.key) !== -1 || keys.indexOf(event.code) !== -1;
}
/**
* @param {KeyboardEvent} event
*/
function isShift(event) {
	return event.shiftKey;
}
/**
* @param {KeyboardEvent} event
*/
function isCopy(event) {
	return isCmd(event) && isKey(KEYS_COPY, event);
}
/**
* @param {KeyboardEvent} event
*/
function isPaste(event) {
	return isCmd(event) && isKey(KEYS_PASTE, event);
}
/**
* @param {KeyboardEvent} event
*/
function isUndo(event) {
	return isCmd(event) && !isShift(event) && isKey(KEYS_UNDO, event);
}
/**
* @param {KeyboardEvent} event
*/
function isRedo(event) {
	return isCmd(event) && (isKey(KEYS_REDO, event) || isKey(KEYS_UNDO, event) && isShift(event));
}
//#endregion
export { attr as A, map as C, sortBy as D, reduce as E, domify$1 as F, event as I, matches as L, clear as M, closest as N, all as O, delegate as P, query as R, isString as S, omit as T, isArray as _, isPaste as a, isNumber as b, isUndo as c, debounce as d, every as f, has as g, forEach as h, isKey as i, classes as j, assign$1 as k, assign as l, find as m, isCmd as n, isRedo as o, filter as p, isCopy as r, isShift as s, hasModifier as t, bind as u, isDefined as v, matchPattern as w, isObject as x, isFunction as y, remove as z };

//# sourceMappingURL=KeyboardUtil-ClONEu6g.js.map