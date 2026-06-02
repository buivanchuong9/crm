import { O as all, P as delegate, R as query, _ as isArray$1, b as isNumber$1, g as has$1, h as forEach$1, j as classes$1, l as assign$1, m as find$1, p as filter$1, x as isObject$1, y as isFunction$1 } from "./KeyboardUtil-D6QcCBvb.js";
//#region node_modules/diagram-js/lib/util/Event.js
/**
* @typedef {import('../util/Types').Point} Point
*/
function __stopPropagation(event) {
	if (!event || typeof event.stopPropagation !== "function") return;
	event.stopPropagation();
}
/**
* @param {import('../core/EventBus').Event} event
*
* @return {Event}
*/
function getOriginal(event) {
	return event.originalEvent || event.srcEvent;
}
/**
* @param {Event|import('../core/EventBus').Event} event
*/
function stopPropagation(event) {
	__stopPropagation(event);
	__stopPropagation(getOriginal(event));
}
/**
* @param {Event} event
*
* @return {Point|null}
*/
function toPoint(event) {
	if (event.pointers && event.pointers.length) event = event.pointers[0];
	if (event.touches && event.touches.length) event = event.touches[0];
	return event ? {
		x: event.clientX,
		y: event.clientY
	} : null;
}
//#endregion
//#region node_modules/diagram-js/lib/util/Platform.js
function isMac() {
	return /mac/i.test(navigator.platform);
}
//#endregion
//#region node_modules/diagram-js/lib/util/Mouse.js
/**
* @param {MouseEvent} event
* @param {string} button
*
* @return {boolean}
*/
function isButton(event, button) {
	return (getOriginal(event) || event).button === button;
}
/**
* @param {MouseEvent} event
*
* @return {boolean}
*/
function isPrimaryButton(event) {
	return isButton(event, 0);
}
/**
* @param {MouseEvent} event
*
* @return {boolean}
*/
function isAuxiliaryButton(event) {
	return isButton(event, 1);
}
/**
* @param {MouseEvent} event
*
* @return {boolean}
*/
function hasSecondaryModifier(event) {
	var originalEvent = getOriginal(event) || event;
	return isPrimaryButton(event) && originalEvent.shiftKey;
}
//#endregion
//#region node_modules/tiny-svg/dist/index.esm.js
function ensureImported(element, target) {
	if (element.ownerDocument !== target.ownerDocument) try {
		return target.ownerDocument.importNode(element, true);
	} catch (e) {}
	return element;
}
/**
* appendTo utility
*/
/**
* Append a node to a target element and return the appended node.
*
* @param  {SVGElement} element
* @param  {SVGElement} target
*
* @return {SVGElement} the appended node
*/
function appendTo(element, target) {
	return target.appendChild(ensureImported(element, target));
}
/**
* append utility
*/
/**
* Append a node to an element
*
* @param  {SVGElement} element
* @param  {SVGElement} node
*
* @return {SVGElement} the element
*/
function append(target, node) {
	appendTo(node, target);
	return target;
}
/**
* attribute accessor utility
*/
var LENGTH_ATTR = 2;
var CSS_PROPERTIES = {
	"alignment-baseline": 1,
	"baseline-shift": 1,
	"clip": 1,
	"clip-path": 1,
	"clip-rule": 1,
	"color": 1,
	"color-interpolation": 1,
	"color-interpolation-filters": 1,
	"color-profile": 1,
	"color-rendering": 1,
	"cursor": 1,
	"direction": 1,
	"display": 1,
	"dominant-baseline": 1,
	"enable-background": 1,
	"fill": 1,
	"fill-opacity": 1,
	"fill-rule": 1,
	"filter": 1,
	"flood-color": 1,
	"flood-opacity": 1,
	"font": 1,
	"font-family": 1,
	"font-size": LENGTH_ATTR,
	"font-size-adjust": 1,
	"font-stretch": 1,
	"font-style": 1,
	"font-variant": 1,
	"font-weight": 1,
	"glyph-orientation-horizontal": 1,
	"glyph-orientation-vertical": 1,
	"image-rendering": 1,
	"kerning": 1,
	"letter-spacing": 1,
	"lighting-color": 1,
	"marker": 1,
	"marker-end": 1,
	"marker-mid": 1,
	"marker-start": 1,
	"mask": 1,
	"opacity": 1,
	"overflow": 1,
	"pointer-events": 1,
	"shape-rendering": 1,
	"stop-color": 1,
	"stop-opacity": 1,
	"stroke": 1,
	"stroke-dasharray": 1,
	"stroke-dashoffset": 1,
	"stroke-linecap": 1,
	"stroke-linejoin": 1,
	"stroke-miterlimit": 1,
	"stroke-opacity": 1,
	"stroke-width": LENGTH_ATTR,
	"text-anchor": 1,
	"text-decoration": 1,
	"text-rendering": 1,
	"unicode-bidi": 1,
	"visibility": 1,
	"word-spacing": 1,
	"writing-mode": 1
};
function getAttribute(node, name) {
	if (CSS_PROPERTIES[name]) return node.style[name];
	else return node.getAttributeNS(null, name);
}
function setAttribute(node, name, value) {
	var hyphenated = name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
	var type = CSS_PROPERTIES[hyphenated];
	if (type) {
		if (type === LENGTH_ATTR && typeof value === "number") value = String(value) + "px";
		node.style[hyphenated] = value;
	} else node.setAttributeNS(null, name, value);
}
function setAttributes(node, attrs) {
	var names = Object.keys(attrs), i, name;
	for (i = 0; name = names[i]; i++) setAttribute(node, name, attrs[name]);
}
/**
* Gets or sets raw attributes on a node.
*
* @param  {SVGElement} node
* @param  {Object} [attrs]
* @param  {String} [name]
* @param  {String} [value]
*
* @return {String}
*/
function attr(node, name, value) {
	if (typeof name === "string") if (value !== void 0) setAttribute(node, name, value);
	else return getAttribute(node, name);
	else setAttributes(node, name);
	return node;
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
* @param  {SVGElement} element
* @return {Element} the element (for chaining)
*/
function clear(element) {
	var child;
	while (child = element.firstChild) element.removeChild(child);
	return element;
}
function clone(element) {
	return element.cloneNode(true);
}
var ns = { svg: "http://www.w3.org/2000/svg" };
/**
* DOM parsing utility
*/
var SVG_START = "<svg xmlns=\"" + ns.svg + "\"";
function parse(svg) {
	var unwrap = false;
	if (svg.substring(0, 4) === "<svg") {
		if (svg.indexOf(ns.svg) === -1) svg = SVG_START + svg.substring(4);
	} else {
		svg = SVG_START + ">" + svg + "</svg>";
		unwrap = true;
	}
	var parsed = parseDocument(svg);
	if (!unwrap) return parsed;
	var fragment = document.createDocumentFragment();
	var parent = parsed.firstChild;
	while (parent.firstChild) fragment.appendChild(parent.firstChild);
	return fragment;
}
function parseDocument(svg) {
	var parser = new DOMParser();
	parser.async = false;
	return parser.parseFromString(svg, "text/xml");
}
/**
* Create utility for SVG elements
*/
/**
* Create a specific type from name or SVG markup.
*
* @param {String} name the name or markup of the element
* @param {Object} [attrs] attributes to set on the element
*
* @returns {SVGElement}
*/
function create(name, attrs) {
	var element;
	name = name.trim();
	if (name.charAt(0) === "<") {
		element = parse(name).firstChild;
		element = document.importNode(element, true);
	} else element = document.createElementNS(ns.svg, name);
	if (attrs) attr(element, attrs);
	return element;
}
/**
* Geometry helpers
*/
var node = null;
function getNode() {
	if (node === null) node = create("svg");
	return node;
}
function extend(object, props) {
	var i, k, keys = Object.keys(props);
	for (i = 0; k = keys[i]; i++) object[k] = props[k];
	return object;
}
/**
* Create matrix via args.
*
* @example
*
* createMatrix({ a: 1, b: 1 });
* createMatrix();
* createMatrix(1, 2, 0, 0, 30, 20);
*
* @return {SVGMatrix}
*/
function createMatrix(a, b, c, d, e, f) {
	var matrix = getNode().createSVGMatrix();
	switch (arguments.length) {
		case 0: return matrix;
		case 1: return extend(matrix, a);
		case 6: return extend(matrix, {
			a,
			b,
			c,
			d,
			e,
			f
		});
	}
}
function createTransform(matrix) {
	if (matrix) return getNode().createSVGTransformFromMatrix(matrix);
	else return getNode().createSVGTransform();
}
/**
* Serialization util
*/
var TEXT_ENTITIES = /([&<>]{1})/g;
var ATTR_ENTITIES = /([&<>\n\r"]{1})/g;
var ENTITY_REPLACEMENT = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "'"
};
function escape(str, pattern) {
	function replaceFn(match, entity) {
		return ENTITY_REPLACEMENT[entity] || entity;
	}
	return str.replace(pattern, replaceFn);
}
function serialize(node, output) {
	var i, len, attrMap, attrNode, childNodes;
	switch (node.nodeType) {
		case 3:
			output.push(escape(node.textContent, TEXT_ENTITIES));
			break;
		case 1:
			output.push("<", node.tagName);
			if (node.hasAttributes()) {
				attrMap = node.attributes;
				for (i = 0, len = attrMap.length; i < len; ++i) {
					attrNode = attrMap.item(i);
					output.push(" ", attrNode.name, "=\"", escape(attrNode.value, ATTR_ENTITIES), "\"");
				}
			}
			if (node.hasChildNodes()) {
				output.push(">");
				childNodes = node.childNodes;
				for (i = 0, len = childNodes.length; i < len; ++i) serialize(childNodes.item(i), output);
				output.push("</", node.tagName, ">");
			} else output.push("/>");
			break;
		case 8:
			output.push("<!--", escape(node.nodeValue, TEXT_ENTITIES), "-->");
			break;
		case 4:
			output.push("<![CDATA[", node.nodeValue, "]]>");
			break;
		default: throw new Error("unable to handle node " + node.nodeType);
	}
	return output;
}
/**
* innerHTML like functionality for SVG elements.
* based on innerSVG (https://code.google.com/p/innersvg)
*/
function set$1(element, svg) {
	var parsed = parse(svg);
	clear(element);
	if (!svg) return;
	if (!isFragment(parsed)) parsed = parsed.documentElement;
	var nodes = slice(parsed.childNodes);
	for (var i = 0; i < nodes.length; i++) appendTo(nodes[i], element);
}
function get(element) {
	var child = element.firstChild, output = [];
	while (child) {
		serialize(child, output);
		child = child.nextSibling;
	}
	return output.join("");
}
function isFragment(node) {
	return node.nodeName === "#document-fragment";
}
function innerSVG(element, svg) {
	if (svg !== void 0) {
		try {
			set$1(element, svg);
		} catch (e) {
			throw new Error("error parsing SVG: " + e.message);
		}
		return element;
	} else return get(element);
}
function slice(arr) {
	return Array.prototype.slice.call(arr);
}
function remove(element) {
	var parent = element.parentNode;
	if (parent) parent.removeChild(element);
	return element;
}
/**
* transform accessor utility
*/
function wrapMatrix(transformList, transform) {
	if (transform instanceof SVGMatrix) return transformList.createSVGTransformFromMatrix(transform);
	return transform;
}
function setTransforms(transformList, transforms) {
	var i, t;
	transformList.clear();
	for (i = 0; t = transforms[i]; i++) transformList.appendItem(wrapMatrix(transformList, t));
}
/**
* Get or set the transforms on the given node.
*
* @param {SVGElement} node
* @param  {SVGTransform|SVGMatrix|Array<SVGTransform|SVGMatrix>} [transforms]
*
* @return {SVGTransform} the consolidated transform
*/
function transform$1(node, transforms) {
	var transformList = node.transform.baseVal;
	if (transforms) {
		if (!Array.isArray(transforms)) transforms = [transforms];
		setTransforms(transformList, transforms);
	}
	return transformList.consolidate();
}
//#endregion
//#region node_modules/diagram-js/lib/util/RenderUtil.js
/**
* @typedef {(string|number)[]} Component
*
* @typedef {import('../util/Types').Point} Point
*/
/**
* @param {Component[] | Component[][]} elements
*
* @return {string}
*/
function componentsToPath(elements) {
	return elements.flat().join(",").replace(/,?([A-z]),?/g, "$1");
}
/**
* @param {Point} point
*
* @return {Component[]}
*/
function move(point) {
	return [
		"M",
		point.x,
		point.y
	];
}
/**
* @param {Point} point
*
* @return {Component[]}
*/
function lineTo(point) {
	return [
		"L",
		point.x,
		point.y
	];
}
/**
* @param {Point} p1
* @param {Point} p2
* @param {Point} p3
*
* @return {Component[]}
*/
function curveTo(p1, p2, p3) {
	return [
		"C",
		p1.x,
		p1.y,
		p2.x,
		p2.y,
		p3.x,
		p3.y
	];
}
/**
* @param {Point[]} waypoints
* @param {number} [cornerRadius]
* @return {Component[][]}
*/
function drawPath(waypoints, cornerRadius) {
	const pointCount = waypoints.length;
	const path = [move(waypoints[0])];
	for (let i = 1; i < pointCount; i++) {
		const pointBefore = waypoints[i - 1];
		const point = waypoints[i];
		const pointAfter = waypoints[i + 1];
		if (!pointAfter || !cornerRadius) {
			path.push(lineTo(point));
			continue;
		}
		const effectiveRadius = Math.min(cornerRadius, vectorLength(point.x - pointBefore.x, point.y - pointBefore.y), vectorLength(pointAfter.x - point.x, pointAfter.y - point.y));
		if (!effectiveRadius) {
			path.push(lineTo(point));
			continue;
		}
		const beforePoint = getPointAtLength(point, pointBefore, effectiveRadius);
		const beforePoint2 = getPointAtLength(point, pointBefore, effectiveRadius * .5);
		const afterPoint = getPointAtLength(point, pointAfter, effectiveRadius);
		const afterPoint2 = getPointAtLength(point, pointAfter, effectiveRadius * .5);
		path.push(lineTo(beforePoint));
		path.push(curveTo(beforePoint2, afterPoint2, afterPoint));
	}
	return path;
}
function getPointAtLength(start, end, length) {
	const deltaX = end.x - start.x;
	const deltaY = end.y - start.y;
	const percent = length / vectorLength(deltaX, deltaY);
	return {
		x: start.x + deltaX * percent,
		y: start.y + deltaY * percent
	};
}
function vectorLength(x, y) {
	return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}
/**
* @param {Point[]} points
* @param {number|Object} [attrs]
* @param {number} [radius]
*
* @return {SVGElement}
*/
function createLine(points, attrs, radius) {
	if (isNumber$1(attrs)) {
		radius = attrs;
		attrs = null;
	}
	if (!attrs) attrs = {};
	const line = create("path", attrs);
	if (isNumber$1(radius)) line.dataset.cornerRadius = String(radius);
	return updateLine(line, points);
}
/**
* @param {SVGElement} gfx
* @param {Point[]} points
*
* @return {SVGElement}
*/
function updateLine(gfx, points) {
	attr(gfx, { d: componentsToPath(drawPath(points, parseInt(gfx.dataset.cornerRadius, 10) || 0)) });
	return gfx;
}
//#endregion
//#region node_modules/diagram-js/lib/features/interaction-events/InteractionEvents.js
/**
* @typedef {import('../../model/Types').Element} Element
*
* @typedef {import('../../core/ElementRegistry').default} ElementRegistry
* @typedef {import('../../core/EventBus').default} EventBus
* @typedef {import('../../draw/Styles').default} Styles
*
* @typedef {import('../../util/Types').Point} Point
*/
function allowAll(event) {
	return true;
}
function allowPrimaryAndAuxiliary(event) {
	return isPrimaryButton(event) || isAuxiliaryButton(event);
}
var LOW_PRIORITY$1 = 500;
/**
* A plugin that provides interaction events for diagram elements.
*
* It emits the following events:
*
*   * element.click
*   * element.contextmenu
*   * element.dblclick
*   * element.hover
*   * element.mousedown
*   * element.mousemove
*   * element.mouseup
*   * element.out
*
* Each event is a tuple { element, gfx, originalEvent }.
*
* Canceling the event via Event#preventDefault()
* prevents the original DOM operation.
*
* @param {EventBus} eventBus
* @param {ElementRegistry} elementRegistry
* @param {Styles} styles
*/
function InteractionEvents(eventBus, elementRegistry, styles) {
	var self = this;
	/**
	* Fire an interaction event.
	*
	* @param {string} type local event name, e.g. element.click.
	* @param {MouseEvent|TouchEvent} event native event
	* @param {Element} [element] the diagram element to emit the event on;
	*                                   defaults to the event target
	*/
	function fire(type, event, element) {
		if (isIgnored(type, event)) return;
		var target, gfx, returnValue;
		if (!element) {
			target = event.delegateTarget || event.target;
			if (target) {
				gfx = target;
				element = elementRegistry.get(gfx);
			}
		} else gfx = elementRegistry.getGraphics(element);
		if (!gfx || !element) return;
		returnValue = eventBus.fire(type, {
			element,
			gfx,
			originalEvent: event
		});
		if (returnValue === false) {
			event.stopPropagation();
			event.preventDefault();
		}
	}
	var handlers = {};
	function mouseHandler(localEventName) {
		return handlers[localEventName];
	}
	function isIgnored(localEventName, event) {
		return !(ignoredFilters[localEventName] || isPrimaryButton)(event);
	}
	var bindings = {
		click: "element.click",
		contextmenu: "element.contextmenu",
		dblclick: "element.dblclick",
		mousedown: "element.mousedown",
		mousemove: "element.mousemove",
		mouseover: "element.hover",
		mouseout: "element.out",
		mouseup: "element.mouseup"
	};
	var ignoredFilters = {
		"element.contextmenu": allowAll,
		"element.mousedown": allowPrimaryAndAuxiliary,
		"element.mouseup": allowPrimaryAndAuxiliary,
		"element.click": allowPrimaryAndAuxiliary,
		"element.dblclick": allowPrimaryAndAuxiliary
	};
	/**
	* Trigger an interaction event (based on a native dom event)
	* on the target shape or connection.
	*
	* @param {string} eventName the name of the triggered DOM event
	* @param {MouseEvent|TouchEvent} event
	* @param {Element} targetElement
	*/
	function triggerMouseEvent(eventName, event, targetElement) {
		var localEventName = bindings[eventName];
		if (!localEventName) throw new Error("unmapped DOM event name <" + eventName + ">");
		return fire(localEventName, event, targetElement);
	}
	var ELEMENT_SELECTOR = "svg, .djs-element";
	function registerEvent(node, event, localEvent, ignoredFilter) {
		var handler = handlers[localEvent] = function(event) {
			fire(localEvent, event);
		};
		if (ignoredFilter) ignoredFilters[localEvent] = ignoredFilter;
		handler.$delegate = delegate.bind(node, ELEMENT_SELECTOR, event, handler);
	}
	function unregisterEvent(node, event, localEvent) {
		var handler = mouseHandler(localEvent);
		if (!handler) return;
		delegate.unbind(node, event, handler.$delegate);
	}
	function registerEvents(svg) {
		forEach$1(bindings, function(val, key) {
			registerEvent(svg, key, val);
		});
	}
	function unregisterEvents(svg) {
		forEach$1(bindings, function(val, key) {
			unregisterEvent(svg, key, val);
		});
	}
	eventBus.on("canvas.destroy", function(event) {
		unregisterEvents(event.svg);
	});
	eventBus.on("canvas.init", function(event) {
		registerEvents(event.svg);
	});
	eventBus.on(["shape.added", "connection.added"], function(event) {
		var element = event.element, gfx = event.gfx;
		eventBus.fire("interactionEvents.createHit", {
			element,
			gfx
		});
	});
	eventBus.on(["shape.changed", "connection.changed"], LOW_PRIORITY$1, function(event) {
		var element = event.element, gfx = event.gfx;
		eventBus.fire("interactionEvents.updateHit", {
			element,
			gfx
		});
	});
	eventBus.on("interactionEvents.createHit", LOW_PRIORITY$1, function(event) {
		var element = event.element, gfx = event.gfx;
		self.createDefaultHit(element, gfx);
	});
	eventBus.on("interactionEvents.updateHit", function(event) {
		var element = event.element, gfx = event.gfx;
		self.updateDefaultHit(element, gfx);
	});
	var STROKE_HIT_STYLE = createHitStyle("djs-hit djs-hit-stroke");
	var CLICK_STROKE_HIT_STYLE = createHitStyle("djs-hit djs-hit-click-stroke");
	var HIT_TYPES = {
		"all": createHitStyle("djs-hit djs-hit-all"),
		"click-stroke": CLICK_STROKE_HIT_STYLE,
		"stroke": STROKE_HIT_STYLE,
		"no-move": createHitStyle("djs-hit djs-hit-no-move")
	};
	function createHitStyle(classNames, attrs) {
		attrs = assign$1({
			stroke: "white",
			strokeWidth: 15
		}, attrs || {});
		return styles.cls(classNames, ["no-fill", "no-border"], attrs);
	}
	function applyStyle(hit, type) {
		var attrs = HIT_TYPES[type];
		if (!attrs) throw new Error("invalid hit type <" + type + ">");
		attr(hit, attrs);
		return hit;
	}
	function appendHit(gfx, hit) {
		append(gfx, hit);
	}
	/**
	* Remove hints on the given graphics.
	*
	* @param {SVGElement} gfx
	*/
	this.removeHits = function(gfx) {
		forEach$1(all(".djs-hit", gfx), remove);
	};
	/**
	* Create default hit for the given element.
	*
	* @param {Element} element
	* @param {SVGElement} gfx
	*
	* @return {SVGElement} created hit
	*/
	this.createDefaultHit = function(element, gfx) {
		var waypoints = element.waypoints, isFrame = element.isFrame, boxType;
		if (waypoints) return this.createWaypointsHit(gfx, waypoints);
		else {
			boxType = isFrame ? "stroke" : "all";
			return this.createBoxHit(gfx, boxType, {
				width: element.width,
				height: element.height
			});
		}
	};
	/**
	* Create hits for the given waypoints.
	*
	* @param {SVGElement} gfx
	* @param {Point[]} waypoints
	*
	* @return {SVGElement}
	*/
	this.createWaypointsHit = function(gfx, waypoints) {
		var hit = createLine(waypoints);
		applyStyle(hit, "stroke");
		appendHit(gfx, hit);
		return hit;
	};
	/**
	* Create hits for a box.
	*
	* @param {SVGElement} gfx
	* @param {string} type
	* @param {Object} attrs
	*
	* @return {SVGElement}
	*/
	this.createBoxHit = function(gfx, type, attrs) {
		attrs = assign$1({
			x: 0,
			y: 0
		}, attrs);
		var hit = create("rect");
		applyStyle(hit, type);
		attr(hit, attrs);
		appendHit(gfx, hit);
		return hit;
	};
	/**
	* Update default hit of the element.
	*
	* @param {Element} element
	* @param {SVGElement} gfx
	*
	* @return {SVGElement} updated hit
	*/
	this.updateDefaultHit = function(element, gfx) {
		var hit = query(".djs-hit", gfx);
		if (!hit) return;
		if (element.waypoints) updateLine(hit, element.waypoints);
		else attr(hit, {
			width: element.width,
			height: element.height
		});
		return hit;
	};
	this.fire = fire;
	this.triggerMouseEvent = triggerMouseEvent;
	this.mouseHandler = mouseHandler;
	this.registerEvent = registerEvent;
	this.unregisterEvent = unregisterEvent;
}
InteractionEvents.$inject = [
	"eventBus",
	"elementRegistry",
	"styles"
];
/**
* An event indicating that the mouse hovered over an element
*
* @event element.hover
*
* @type {Object}
* @property {Element} element
* @property {SVGElement} gfx
* @property {Event} originalEvent
*/
/**
* An event indicating that the mouse has left an element
*
* @event element.out
*
* @type {Object}
* @property {Element} element
* @property {SVGElement} gfx
* @property {Event} originalEvent
*/
/**
* An event indicating that the mouse has clicked an element
*
* @event element.click
*
* @type {Object}
* @property {Element} element
* @property {SVGElement} gfx
* @property {Event} originalEvent
*/
/**
* An event indicating that the mouse has double clicked an element
*
* @event element.dblclick
*
* @type {Object}
* @property {Element} element
* @property {SVGElement} gfx
* @property {Event} originalEvent
*/
/**
* An event indicating that the mouse has gone down on an element.
*
* @event element.mousedown
*
* @type {Object}
* @property {Element} element
* @property {SVGElement} gfx
* @property {Event} originalEvent
*/
/**
* An event indicating that the mouse has gone up on an element.
*
* @event element.mouseup
*
* @type {Object}
* @property {Element} element
* @property {SVGElement} gfx
* @property {Event} originalEvent
*/
/**
* An event indicating that the context menu action is triggered
* via mouse or touch controls.
*
* @event element.contextmenu
*
* @type {Object}
* @property {Element} element
* @property {SVGElement} gfx
* @property {Event} originalEvent
*/
//#endregion
//#region node_modules/diagram-js/lib/features/interaction-events/index.js
/**
* @type { import('didi').ModuleDeclaration }
*/
var interaction_events_default = {
	__init__: ["interactionEvents"],
	interactionEvents: ["type", InteractionEvents]
};
//#endregion
//#region node_modules/diagram-js/lib/util/Elements.js
/**
* @typedef {import('../model/Types').Connection} Connection
* @typedef {import('../model/Types').Element} Element
* @typedef {import('../model/Types').Shape} Shape
*
* @typedef {import('../util/Types').Rect} Rect
*
* @typedef { {
*   allShapes: Record<string, Shape>,
*   allConnections: Record<string, Connection>,
*   topLevel: Record<string, Element>,
*   enclosedConnections: Record<string, Connection>,
*   enclosedElements: Record<string, Element>
* } } Closure
*/
/**
* Get parent elements.
*
* @param {Element[]} elements
*
* @return {Element[]}
*/
function getParents(elements) {
	return filter$1(elements, function(element) {
		return !find$1(elements, function(e) {
			return e !== element && getParent(element, e);
		});
	});
}
function getParent(element, parent) {
	if (!parent) return;
	if (element === parent) return parent;
	if (!element.parent) return;
	return getParent(element.parent, parent);
}
/**
* Iterate over each element in a collection, calling the iterator function `fn`
* with (element, index, recursionDepth).
*
* Recurse into all elements that are returned by `fn`.
*
* @param {Element|Element[]} elements
* @param {(element: Element, index: number, depth: number) => Element[] | boolean | undefined} fn
* @param {number} [depth] maximum recursion depth
*/
function eachElement(elements, fn, depth) {
	depth = depth || 0;
	if (!isArray$1(elements)) elements = [elements];
	forEach$1(elements, function(s, i) {
		var filter = fn(s, i, depth);
		if (isArray$1(filter) && filter.length) eachElement(filter, fn, depth + 1);
	});
}
/**
* Returns the surrounding bbox for all elements in
* the array or the element primitive.
*
* @param {Element|Element[]} elements
* @param {boolean} [stopRecursion=false]
*
* @return {Rect}
*/
function getBBox(elements, stopRecursion) {
	stopRecursion = !!stopRecursion;
	if (!isArray$1(elements)) elements = [elements];
	var minX, minY, maxX, maxY;
	forEach$1(elements, function(element) {
		var bbox = element;
		if (element.waypoints && !stopRecursion) bbox = getBBox(element.waypoints, true);
		var x = bbox.x, y = bbox.y, height = bbox.height || 0, width = bbox.width || 0;
		if (x < minX || minX === void 0) minX = x;
		if (y < minY || minY === void 0) minY = y;
		if (x + width > maxX || maxX === void 0) maxX = x + width;
		if (y + height > maxY || maxY === void 0) maxY = y + height;
	});
	return {
		x: minX,
		y: minY,
		height: maxY - minY,
		width: maxX - minX
	};
}
/**
* Get the element's type
*
* @param {Element} element
*
* @return {'connection' | 'shape' | 'root'}
*/
function getType(element) {
	if ("waypoints" in element) return "connection";
	if ("x" in element) return "shape";
	return "root";
}
/**
* @param {Element} element
*
* @return {boolean}
*/
function isFrameElement(element) {
	return !!(element && element.isFrame);
}
//#endregion
//#region node_modules/diagram-js/lib/features/outline/Outline.js
var LOW_PRIORITY = 500;
var DEFAULT_PRIORITY = 1e3;
/**
* @typedef {import('../../model/Types').Element} Element
*
* @typedef {import('./OutlineProvider').default} OutlineProvider
* @typedef {import('../../core/EventBus').default} EventBus
* @typedef {import('../../draw/Styles').default} Styles
*/
/**
* @class
*
* A plugin that adds an outline to shapes and connections that may be activated and styled
* via CSS classes.
*
* @param {EventBus} eventBus
* @param {Styles} styles
*/
function Outline(eventBus, styles) {
	this._eventBus = eventBus;
	this.offset = 5;
	var OUTLINE_STYLE = styles.cls("djs-outline", ["no-fill"]);
	var self = this;
	/**
	* @param {SVGElement} gfx
	*
	* @return {SVGElement} outline
	*/
	function createOutline(gfx) {
		var outline = create("rect");
		attr(outline, assign$1({
			x: 0,
			y: 0,
			rx: 4,
			width: 100,
			height: 100
		}, OUTLINE_STYLE));
		return outline;
	}
	eventBus.on(["shape.added", "shape.changed"], LOW_PRIORITY, function(event) {
		var element = event.element, gfx = event.gfx;
		var outline = query(".djs-outline", gfx);
		if (!outline) {
			outline = self.getOutline(element) || createOutline(gfx);
			append(gfx, outline);
		}
		self.updateShapeOutline(outline, element);
	});
	eventBus.on(["connection.added", "connection.changed"], function(event) {
		var element = event.element, gfx = event.gfx;
		var outline = query(".djs-outline", gfx);
		if (!outline) {
			outline = createOutline(gfx);
			append(gfx, outline);
		}
		self.updateConnectionOutline(outline, element);
	});
}
/**
* Updates the outline of a shape respecting the dimension of the
* element and an outline offset.
*
* @param {SVGElement} outline
* @param {Element} element
*/
Outline.prototype.updateShapeOutline = function(outline, element) {
	var updated = false;
	var providers = this._getProviders();
	if (providers.length) forEach$1(providers, function(provider) {
		updated = updated || provider.updateOutline(element, outline);
	});
	if (!updated) attr(outline, {
		x: -this.offset,
		y: -this.offset,
		width: element.width + this.offset * 2,
		height: element.height + this.offset * 2
	});
};
/**
* Updates the outline of a connection respecting the bounding box of
* the connection and an outline offset.
* Register an outline provider with the given priority.
*
* @param {SVGElement} outline
* @param {Element} connection
*/
Outline.prototype.updateConnectionOutline = function(outline, connection) {
	var bbox = getBBox(connection);
	attr(outline, {
		x: bbox.x - this.offset,
		y: bbox.y - this.offset,
		width: bbox.width + this.offset * 2,
		height: bbox.height + this.offset * 2
	});
};
/**
* Register an outline provider with the given priority.
*
* @param {number} priority
* @param {OutlineProvider} provider
*/
Outline.prototype.registerProvider = function(priority, provider) {
	if (!provider) {
		provider = priority;
		priority = DEFAULT_PRIORITY;
	}
	this._eventBus.on("outline.getProviders", priority, function(event) {
		event.providers.push(provider);
	});
};
/**
* Returns the registered outline providers.
*
* @returns {OutlineProvider[]}
*/
Outline.prototype._getProviders = function() {
	var event = this._eventBus.createEvent({
		type: "outline.getProviders",
		providers: []
	});
	this._eventBus.fire(event);
	return event.providers;
};
/**
* Returns the outline for an element.
*
* @param {Element} element
*/
Outline.prototype.getOutline = function(element) {
	var outline;
	forEach$1(this._getProviders(), function(provider) {
		if (!isFunction$1(provider.getOutline)) return;
		outline = outline || provider.getOutline(element);
	});
	return outline;
};
Outline.$inject = [
	"eventBus",
	"styles",
	"elementRegistry"
];
//#endregion
//#region node_modules/diagram-js/lib/features/outline/index.js
/**
* @type { import('didi').ModuleDeclaration }
*/
var outline_default = {
	__init__: ["outline"],
	outline: ["type", Outline]
};
//#endregion
//#region node_modules/diagram-js/lib/features/selection/Selection.js
/**
* @typedef {import('../../core/Canvas').default} Canvas
* @typedef {import('../../core/EventBus').default} EventBus
*/
/**
* A service that offers the current selection in a diagram.
* Offers the api to control the selection, too.
*
* @param {EventBus} eventBus
* @param {Canvas} canvas
*/
function Selection(eventBus, canvas) {
	this._eventBus = eventBus;
	this._canvas = canvas;
	/**
	* @type {Object[]}
	*/
	this._selectedElements = [];
	var self = this;
	eventBus.on(["shape.remove", "connection.remove"], function(e) {
		var element = e.element;
		self.deselect(element);
	});
	eventBus.on(["diagram.clear", "root.set"], function(e) {
		self.select(null);
	});
}
Selection.$inject = ["eventBus", "canvas"];
/**
* Deselect an element.
*
* @param {Object} element The element to deselect.
*/
Selection.prototype.deselect = function(element) {
	var selectedElements = this._selectedElements;
	var idx = selectedElements.indexOf(element);
	if (idx !== -1) {
		var oldSelection = selectedElements.slice();
		selectedElements.splice(idx, 1);
		this._eventBus.fire("selection.changed", {
			oldSelection,
			newSelection: selectedElements
		});
	}
};
/**
* Get the selected elements.
*
* @return {Object[]} The selected elements.
*/
Selection.prototype.get = function() {
	return this._selectedElements;
};
/**
* Check whether an element is selected.
*
* @param {Object} element The element.
*
* @return {boolean} Whether the element is selected.
*/
Selection.prototype.isSelected = function(element) {
	return this._selectedElements.indexOf(element) !== -1;
};
/**
* Select one or many elements.
*
* @param {Object|Object[]} elements The element(s) to select.
* @param {boolean} [add] Whether to add the element(s) to the selected elements.
* Defaults to `false`.
*/
Selection.prototype.select = function(elements, add) {
	var selectedElements = this._selectedElements, oldSelection = selectedElements.slice();
	if (!isArray$1(elements)) elements = elements ? [elements] : [];
	var canvas = this._canvas;
	var rootElement = canvas.getRootElement();
	elements = elements.filter(function(element) {
		return rootElement === canvas.findRoot(element);
	});
	if (add) forEach$1(elements, function(element) {
		if (selectedElements.indexOf(element) !== -1) return;
		else selectedElements.push(element);
	});
	else this._selectedElements = selectedElements = elements.slice();
	this._eventBus.fire("selection.changed", {
		oldSelection,
		newSelection: selectedElements
	});
};
//#endregion
//#region node_modules/diagram-js/lib/features/selection/SelectionVisuals.js
/**
* @typedef {import('../../core/Canvas').default} Canvas
* @typedef {import('../../core/EventBus').default} EventBus
* @typedef {import('./Selection').default} Selection
*/
var MARKER_HOVER = "hover", MARKER_SELECTED = "selected";
var SELECTION_OUTLINE_PADDING = 6;
/**
* A plugin that adds a visible selection UI to shapes and connections
* by appending the <code>hover</code> and <code>selected</code> classes to them.
*
* @class
*
* Makes elements selectable, too.
*
* @param {Canvas} canvas
* @param {EventBus} eventBus
* @param {Selection} selection
*/
function SelectionVisuals(canvas, eventBus, selection) {
	this._canvas = canvas;
	var self = this;
	this._multiSelectionBox = null;
	function addMarker(e, cls) {
		canvas.addMarker(e, cls);
	}
	function removeMarker(e, cls) {
		canvas.removeMarker(e, cls);
	}
	eventBus.on("element.hover", function(event) {
		addMarker(event.element, MARKER_HOVER);
	});
	eventBus.on("element.out", function(event) {
		removeMarker(event.element, MARKER_HOVER);
	});
	eventBus.on("selection.changed", function(event) {
		function deselect(s) {
			removeMarker(s, MARKER_SELECTED);
		}
		function select(s) {
			addMarker(s, MARKER_SELECTED);
		}
		var oldSelection = event.oldSelection, newSelection = event.newSelection;
		forEach$1(oldSelection, function(e) {
			if (newSelection.indexOf(e) === -1) deselect(e);
		});
		forEach$1(newSelection, function(e) {
			if (oldSelection.indexOf(e) === -1) select(e);
		});
		self._updateSelectionOutline(newSelection);
	});
	eventBus.on("element.changed", function(event) {
		if (selection.isSelected(event.element)) self._updateSelectionOutline(selection.get());
	});
}
SelectionVisuals.$inject = [
	"canvas",
	"eventBus",
	"selection"
];
SelectionVisuals.prototype._updateSelectionOutline = function(selection) {
	var layer = this._canvas.getLayer("selectionOutline");
	clear(layer);
	var enabled = selection.length > 1;
	classes(this._canvas.getContainer())[enabled ? "add" : "remove"]("djs-multi-select");
	if (!enabled) return;
	var bBox = addSelectionOutlinePadding(getBBox(selection));
	var rect = create("rect");
	attr(rect, assign$1({ rx: 3 }, bBox));
	classes(rect).add("djs-selection-outline");
	append(layer, rect);
};
function addSelectionOutlinePadding(bBox) {
	return {
		x: bBox.x - SELECTION_OUTLINE_PADDING,
		y: bBox.y - SELECTION_OUTLINE_PADDING,
		width: bBox.width + SELECTION_OUTLINE_PADDING * 2,
		height: bBox.height + SELECTION_OUTLINE_PADDING * 2
	};
}
//#endregion
//#region node_modules/diagram-js/lib/features/selection/SelectionBehavior.js
/**
* @typedef {import('../../core/Canvas').default} Canvas
* @typedef {import('../../core/ElementRegistry').default} ElementRegistry
* @typedef {import('../../core/EventBus').default} EventBus
* @typedef {import('./Selection').default} Selection
*/
/**
* @param {EventBus} eventBus
* @param {Selection} selection
* @param {Canvas} canvas
* @param {ElementRegistry} elementRegistry
*/
function SelectionBehavior(eventBus, selection, canvas, elementRegistry) {
	eventBus.on("create.end", 500, function(event) {
		var context = event.context, canExecute = context.canExecute, elements = context.elements, autoSelect = (context.hints || {}).autoSelect;
		if (canExecute) {
			if (autoSelect === false) return;
			if (isArray$1(autoSelect)) selection.select(autoSelect);
			else selection.select(elements.filter(isShown));
		}
	});
	eventBus.on("connect.end", 500, function(event) {
		var connection = event.context.connection;
		if (connection) selection.select(connection);
	});
	eventBus.on("shape.move.end", 500, function(event) {
		var previousSelection = event.previousSelection || [];
		var shape = elementRegistry.get(event.context.shape.id);
		if (!find$1(previousSelection, function(selectedShape) {
			return shape.id === selectedShape.id;
		})) selection.select(shape);
	});
	eventBus.on("element.click", function(event) {
		if (!isPrimaryButton(event)) return;
		var element = event.element;
		if (element === canvas.getRootElement()) element = null;
		var isSelected = selection.isSelected(element), isMultiSelect = selection.get().length > 1;
		var add = hasSecondaryModifier(event);
		if (isSelected && isMultiSelect) if (add) return selection.deselect(element);
		else return selection.select(element);
		else if (!isSelected) selection.select(element, add);
		else selection.deselect(element);
	});
}
SelectionBehavior.$inject = [
	"eventBus",
	"selection",
	"canvas",
	"elementRegistry"
];
function isShown(element) {
	return !element.hidden;
}
//#endregion
//#region node_modules/diagram-js/lib/features/selection/index.js
/**
* @type { import('didi').ModuleDeclaration }
*/
var selection_default = {
	__init__: ["selectionVisuals", "selectionBehavior"],
	__depends__: [interaction_events_default, outline_default],
	selection: ["type", Selection],
	selectionVisuals: ["type", SelectionVisuals],
	selectionBehavior: ["type", SelectionBehavior]
};
//#endregion
//#region node_modules/diagram-js/lib/util/Cursor.js
var CURSOR_CLS_PATTERN = /^djs-cursor-.*$/;
/**
* @param {string} mode
*/
function set(mode) {
	var classes = classes$1(document.body);
	classes.removeMatching(CURSOR_CLS_PATTERN);
	if (mode) classes.add("djs-cursor-" + mode);
}
function unset() {
	set(null);
}
//#endregion
//#region node_modules/diagram-js/lib/util/ClickTrap.js
/**
* @typedef {import('../core/EventBus').default} EventBus
*/
var TRAP_PRIORITY = 5e3;
/**
* Installs a click trap that prevents a ghost click following a dragging operation.
*
* @param {EventBus} eventBus
* @param {string} [eventName='element.click']
*
* @return {() => void} a function to immediately remove the installed trap.
*/
function install(eventBus, eventName) {
	eventName = eventName || "element.click";
	function trap() {
		return false;
	}
	eventBus.once(eventName, TRAP_PRIORITY, trap);
	return function() {
		eventBus.off(eventName, trap);
	};
}
//#endregion
//#region node_modules/diagram-js/lib/util/PositionUtil.js
/**
* @param {Point} a
* @param {Point} b
* @return {Point}
*/
function delta(a, b) {
	return {
		x: a.x - b.x,
		y: a.y - b.y
	};
}
//#endregion
//#region node_modules/diagram-js/lib/util/GraphicsUtil.js
/**
* SVGs for elements are generated by the {@link GraphicsFactory}.
*
* This utility gives quick access to the important semantic
* parts of an element.
*/
/**
* Returns the visual part of a diagram element.
*
* @param {SVGElement} gfx
*
* @return {SVGElement}
*/
function getVisual(gfx) {
	return gfx.childNodes[0];
}
/**
* Returns the children for a given diagram element.
*
* @param {SVGElement} gfx
* @return {SVGElement}
*/
function getChildren(gfx) {
	return gfx.parentNode.childNodes[1];
}
//#endregion
//#region node_modules/diagram-js/lib/util/IdGenerator.js
/**
* Util that provides unique IDs.
*
* @class
* @constructor
*
* The ids can be customized via a given prefix and contain a random value to avoid collisions.
*
* @param {string} [prefix] a prefix to prepend to generated ids (for better readability)
*/
function IdGenerator(prefix) {
	this._counter = 0;
	this._prefix = (prefix ? prefix + "-" : "") + Math.floor(Math.random() * 1e9) + "-";
}
/**
* Returns a next unique ID.
*
* @return {string} the id
*/
IdGenerator.prototype.next = function() {
	return this._prefix + ++this._counter;
};
//#endregion
//#region node_modules/diagram-js/lib/util/ModelUtil.js
/**
* Checks whether a value is an instance of Connection.
*
* @param {any} value
*
* @return {boolean}
*/
function isConnection(value) {
	return isObject$1(value) && has$1(value, "waypoints");
}
/**
* Checks whether a value is an instance of Label.
*
* @param {any} value
*
* @return {boolean}
*/
function isLabel(value) {
	return isObject$1(value) && has$1(value, "labelTarget");
}
//#endregion
//#region node_modules/diagram-js/lib/util/SvgTransformUtil.js
/**
* @param {SVGElement} gfx
* @param {number} x
* @param {number} y
* @param {number} [angle]
* @param {number} [amount]
*/
function transform(gfx, x, y, angle, amount) {
	var translate = createTransform();
	translate.setTranslate(x, y);
	var rotate = createTransform();
	rotate.setRotate(angle || 0, 0, 0);
	var scale = createTransform();
	scale.setScale(amount || 1, amount || 1);
	transform$1(gfx, [
		translate,
		rotate,
		scale
	]);
}
/**
* @param {SVGElement} gfx
* @param {number} x
* @param {number} y
*/
function translate(gfx, x, y) {
	var translate = createTransform();
	translate.setTranslate(x, y);
	transform$1(gfx, translate);
}
/**
* @param {SVGElement} gfx
* @param {number} angle
*/
function rotate(gfx, angle) {
	var rotate = createTransform();
	rotate.setRotate(angle, 0, 0);
	transform$1(gfx, rotate);
}
//#endregion
//#region node_modules/bpmn-js/node_modules/min-dash/dist/index.esm.js
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
* Return true if some elements in the collection
* match the criteria.
*
* @param  {Object|Array} collection
* @param  {Function} matcher
*
* @return {Boolean}
*/
function some(collection, matcher) {
	return !!find(collection, matcher);
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
//#region node_modules/bpmn-js/lib/util/ModelUtil.js
/**
* @typedef { import('../model/Types').Element } Element
* @typedef { import('../model/Types').ModdleElement } ModdleElement
*/
/**
* Is an element of the given BPMN type?
*
* @param  {Element|ModdleElement} element
* @param  {string} type
*
* @return {boolean}
*/
function is(element, type) {
	var bo = getBusinessObject(element);
	return bo && typeof bo.$instanceOf === "function" && bo.$instanceOf(type);
}
/**
* Return true if element has any of the given types.
*
* @param {Element|ModdleElement} element
* @param {string[]} types
*
* @return {boolean}
*/
function isAny(element, types) {
	return some(types, function(t) {
		return is(element, t);
	});
}
/**
* Return the business object for a given element.
*
* @param {Element|ModdleElement} element
*
* @return {ModdleElement}
*/
function getBusinessObject(element) {
	return element && element.businessObject || element;
}
/**
* Return the di object for a given element.
*
* @param {Element} element
*
* @return {ModdleElement}
*/
function getDi(element) {
	return element && element.di;
}
//#endregion
//#region node_modules/bpmn-js/lib/util/LabelUtil.js
/**
* @typedef {import('diagram-js/lib/util/Types').Point} Point
* @typedef {import('diagram-js/lib/util/Types').Rect} Rect
*
* @typedef {import('../model/Types').Element} Element
* @typedef {import('../model/Types').ModdleElement} ModdleElement
*/
var DEFAULT_LABEL_SIZE = {
	width: 90,
	height: 20
};
/**
* Return true if the given semantic has an external label.
*
* @param {Element} semantic
*
* @return {boolean}
*/
function isLabelExternal(semantic) {
	return is(semantic, "bpmn:Event") || is(semantic, "bpmn:Gateway") || is(semantic, "bpmn:DataStoreReference") || is(semantic, "bpmn:DataObjectReference") || is(semantic, "bpmn:DataInput") || is(semantic, "bpmn:DataOutput") || is(semantic, "bpmn:SequenceFlow") || is(semantic, "bpmn:MessageFlow") || is(semantic, "bpmn:Group");
}
/**
* Get the position of a sequence flow label.
*
* @param  {Point[]} waypoints
*
* @return {Point}
*/
function getFlowLabelPosition(waypoints) {
	var mid = waypoints.length / 2 - 1;
	var first = waypoints[Math.floor(mid)];
	var second = waypoints[Math.ceil(mid + .01)];
	var position = getWaypointsMid(waypoints);
	var angle = Math.atan((second.y - first.y) / (second.x - first.x));
	var x = position.x, y = position.y;
	if (Math.abs(angle) < Math.PI / 2) y -= 15;
	else x += 15;
	return {
		x,
		y
	};
}
/**
* Get the middle of a number of waypoints.
*
* @param  {Point[]} waypoints
*
* @return {Point}
*/
function getWaypointsMid(waypoints) {
	var mid = waypoints.length / 2 - 1;
	var first = waypoints[Math.floor(mid)];
	var second = waypoints[Math.ceil(mid + .01)];
	return {
		x: first.x + (second.x - first.x) / 2,
		y: first.y + (second.y - first.y) / 2
	};
}
/**
* Get the middle of the external label of an element.
*
* @param {Element} element
*
* @return {Point}
*/
function getExternalLabelMid(element) {
	if (element.waypoints) return getFlowLabelPosition(element.waypoints);
	else if (is(element, "bpmn:Group")) return {
		x: element.x + element.width / 2,
		y: element.y + DEFAULT_LABEL_SIZE.height / 2
	};
	else return {
		x: element.x + element.width / 2,
		y: element.y + element.height + DEFAULT_LABEL_SIZE.height / 2
	};
}
/**
* Return the bounds of an elements label, parsed from the elements DI or
* generated from its bounds.
*
* @param {ModdleElement} di
* @param {Element} element
*
* @return {Rect}
*/
function getExternalLabelBounds(di, element) {
	var mid, size, bounds, label = di.label;
	if (label && label.bounds) {
		bounds = label.bounds;
		size = {
			width: Math.max(DEFAULT_LABEL_SIZE.width, bounds.width),
			height: bounds.height
		};
		mid = {
			x: bounds.x + bounds.width / 2,
			y: bounds.y + bounds.height / 2
		};
	} else {
		mid = getExternalLabelMid(element);
		size = DEFAULT_LABEL_SIZE;
	}
	return assign({
		x: mid.x - size.width / 2,
		y: mid.y - size.height / 2
	}, size);
}
/**
* @param {ModdleElement} semantic
*
* @returns {string}
*/
function getLabelAttr(semantic) {
	if (is(semantic, "bpmn:FlowElement") || is(semantic, "bpmn:Participant") || is(semantic, "bpmn:Lane") || is(semantic, "bpmn:SequenceFlow") || is(semantic, "bpmn:MessageFlow") || is(semantic, "bpmn:DataInput") || is(semantic, "bpmn:DataOutput")) return "name";
	if (is(semantic, "bpmn:TextAnnotation")) return "text";
	if (is(semantic, "bpmn:Group")) return "categoryValueRef";
}
/**
* @param {ModdleElement} semantic
*
* @returns {string}
*/
function getCategoryValue(semantic) {
	var categoryValueRef = semantic["categoryValueRef"];
	if (!categoryValueRef) return "";
	return categoryValueRef.value || "";
}
/**
* @param {Element} element
*
* @return {string}
*/
function getLabel(element) {
	var semantic = element.businessObject, attr = getLabelAttr(semantic);
	if (attr) {
		if (attr === "categoryValueRef") return getCategoryValue(semantic);
		return semantic[attr] || "";
	}
}
//#endregion
export { remove as $, IdGenerator as A, getBBox as B, some as C, translate as D, transform as E, set as F, createLine as G, getType as H, unset as I, classes as J, append as K, selection_default as L, getVisual as M, delta as N, isConnection as O, install as P, innerSVG as Q, outline_default as R, reduce as S, rotate as T, isFrameElement as U, getParents as V, componentsToPath as W, create as X, clone as Y, createMatrix as Z, isObject as _, getDi as a, matchPattern as b, assign as c, forEach as d, transform$1 as et, has as f, isNumber as g, isFunction as h, getBusinessObject as i, toPoint as it, getChildren as j, isLabel as k, filter as l, isDefined as m, getLabel as n, getOriginal as nt, is as o, isArray as p, attr as q, isLabelExternal as r, stopPropagation as rt, isAny as s, getExternalLabelBounds as t, isMac as tt, find as u, isUndefined as v, sortBy as w, omit as x, map as y, eachElement as z };

//# sourceMappingURL=LabelUtil-BAdCYTcE.js.map