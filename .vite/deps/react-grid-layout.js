import { a as __toCommonJS, n as __esmMin, r as __exportAll, t as __commonJSMin } from "./chunk-CqwQKh_b.js";
import { t as require_react } from "./react.js";
import { t as require_react_dom } from "./react-dom-CtbBIW7I.js";
import { t as require_prop_types } from "./prop-types-DWpwruwU.js";
//#region node_modules/fast-equals/dist/fast-equals.js
var require_fast_equals = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(global, factory) {
		typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global["fast-equals"] = {}));
	})(exports, (function(exports$1) {
		"use strict";
		/**
		* Default equality comparator pass-through, used as the standard `isEqual` creator for
		* use inside the built comparator.
		*/
		function createDefaultIsNestedEqual(comparator) {
			return function isEqual(a, b, _indexOrKeyA, _indexOrKeyB, _parentA, _parentB, meta) {
				return comparator(a, b, meta);
			};
		}
		/**
		* Wrap the provided `areItemsEqual` method to manage the circular cache, allowing
		* for circular references to be safely included in the comparison without creating
		* stack overflows.
		*/
		function createIsCircular(areItemsEqual) {
			return function isCircular(a, b, isEqual, cache) {
				if (!a || !b || typeof a !== "object" || typeof b !== "object") return areItemsEqual(a, b, isEqual, cache);
				var cachedA = cache.get(a);
				var cachedB = cache.get(b);
				if (cachedA && cachedB) return cachedA === b && cachedB === a;
				cache.set(a, b);
				cache.set(b, a);
				var result = areItemsEqual(a, b, isEqual, cache);
				cache.delete(a);
				cache.delete(b);
				return result;
			};
		}
		/**
		* Targeted shallow merge of two objects.
		*
		* @NOTE
		* This exists as a tinier compiled version of the `__assign` helper that
		* `tsc` injects in case of `Object.assign` not being present.
		*/
		function merge(a, b) {
			var merged = {};
			for (var key in a) merged[key] = a[key];
			for (var key in b) merged[key] = b[key];
			return merged;
		}
		/**
		* Whether the value is a plain object.
		*
		* @NOTE
		* This is a same-realm compariosn only.
		*/
		function isPlainObject(value) {
			return value.constructor === Object || value.constructor == null;
		}
		/**
		* When the value is `Promise`-like, aka "then-able".
		*/
		function isPromiseLike(value) {
			return typeof value.then === "function";
		}
		/**
		* Whether the values passed are strictly equal or both NaN.
		*/
		function sameValueZeroEqual(a, b) {
			return a === b || a !== a && b !== b;
		}
		var ARGUMENTS_TAG = "[object Arguments]";
		var BOOLEAN_TAG = "[object Boolean]";
		var DATE_TAG = "[object Date]";
		var REG_EXP_TAG = "[object RegExp]";
		var MAP_TAG = "[object Map]";
		var NUMBER_TAG = "[object Number]";
		var OBJECT_TAG = "[object Object]";
		var SET_TAG = "[object Set]";
		var STRING_TAG = "[object String]";
		var toString = Object.prototype.toString;
		function createComparator(_a) {
			var areArraysEqual = _a.areArraysEqual, areDatesEqual = _a.areDatesEqual, areMapsEqual = _a.areMapsEqual, areObjectsEqual = _a.areObjectsEqual, areRegExpsEqual = _a.areRegExpsEqual, areSetsEqual = _a.areSetsEqual, createIsNestedEqual = _a.createIsNestedEqual;
			var isEqual = createIsNestedEqual(comparator);
			/**
			* compare the value of the two objects and return true if they are equivalent in values
			*/
			function comparator(a, b, meta) {
				if (a === b) return true;
				if (!a || !b || typeof a !== "object" || typeof b !== "object") return a !== a && b !== b;
				if (isPlainObject(a) && isPlainObject(b)) return areObjectsEqual(a, b, isEqual, meta);
				var aArray = Array.isArray(a);
				var bArray = Array.isArray(b);
				if (aArray || bArray) return aArray === bArray && areArraysEqual(a, b, isEqual, meta);
				var aTag = toString.call(a);
				if (aTag !== toString.call(b)) return false;
				if (aTag === DATE_TAG) return areDatesEqual(a, b, isEqual, meta);
				if (aTag === REG_EXP_TAG) return areRegExpsEqual(a, b, isEqual, meta);
				if (aTag === MAP_TAG) return areMapsEqual(a, b, isEqual, meta);
				if (aTag === SET_TAG) return areSetsEqual(a, b, isEqual, meta);
				if (aTag === OBJECT_TAG || aTag === ARGUMENTS_TAG) return isPromiseLike(a) || isPromiseLike(b) ? false : areObjectsEqual(a, b, isEqual, meta);
				if (aTag === BOOLEAN_TAG || aTag === NUMBER_TAG || aTag === STRING_TAG) return sameValueZeroEqual(a.valueOf(), b.valueOf());
				return false;
			}
			return comparator;
		}
		/**
		* Whether the arrays are equal in value.
		*/
		function areArraysEqual(a, b, isEqual, meta) {
			var index = a.length;
			if (b.length !== index) return false;
			while (index-- > 0) if (!isEqual(a[index], b[index], index, index, a, b, meta)) return false;
			return true;
		}
		/**
		* Whether the arrays are equal in value, including circular references.
		*/
		var areArraysEqualCircular = createIsCircular(areArraysEqual);
		/**
		* Whether the dates passed are equal in value.
		*
		* @NOTE
		* This is a standalone function instead of done inline in the comparator
		* to allow for overrides.
		*/
		function areDatesEqual(a, b) {
			return sameValueZeroEqual(a.valueOf(), b.valueOf());
		}
		/**
		* Whether the `Map`s are equal in value.
		*/
		function areMapsEqual(a, b, isEqual, meta) {
			var isValueEqual = a.size === b.size;
			if (!isValueEqual) return false;
			if (!a.size) return true;
			var matchedIndices = {};
			var indexA = 0;
			a.forEach(function(aValue, aKey) {
				if (!isValueEqual) return;
				var hasMatch = false;
				var matchIndexB = 0;
				b.forEach(function(bValue, bKey) {
					if (!hasMatch && !matchedIndices[matchIndexB] && (hasMatch = isEqual(aKey, bKey, indexA, matchIndexB, a, b, meta) && isEqual(aValue, bValue, aKey, bKey, a, b, meta))) matchedIndices[matchIndexB] = true;
					matchIndexB++;
				});
				indexA++;
				isValueEqual = hasMatch;
			});
			return isValueEqual;
		}
		/**
		* Whether the `Map`s are equal in value, including circular references.
		*/
		var areMapsEqualCircular = createIsCircular(areMapsEqual);
		var OWNER = "_owner";
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		/**
		* Whether the objects are equal in value.
		*/
		function areObjectsEqual(a, b, isEqual, meta) {
			var keysA = Object.keys(a);
			var index = keysA.length;
			if (Object.keys(b).length !== index) return false;
			var key;
			while (index-- > 0) {
				key = keysA[index];
				if (key === OWNER) {
					var reactElementA = !!a.$$typeof;
					var reactElementB = !!b.$$typeof;
					if ((reactElementA || reactElementB) && reactElementA !== reactElementB) return false;
				}
				if (!hasOwnProperty.call(b, key) || !isEqual(a[key], b[key], key, key, a, b, meta)) return false;
			}
			return true;
		}
		/**
		* Whether the objects are equal in value, including circular references.
		*/
		var areObjectsEqualCircular = createIsCircular(areObjectsEqual);
		/**
		* Whether the regexps passed are equal in value.
		*
		* @NOTE
		* This is a standalone function instead of done inline in the comparator
		* to allow for overrides. An example of this would be supporting a
		* pre-ES2015 environment where the `flags` property is not available.
		*/
		function areRegExpsEqual(a, b) {
			return a.source === b.source && a.flags === b.flags;
		}
		/**
		* Whether the `Set`s are equal in value.
		*/
		function areSetsEqual(a, b, isEqual, meta) {
			var isValueEqual = a.size === b.size;
			if (!isValueEqual) return false;
			if (!a.size) return true;
			var matchedIndices = {};
			a.forEach(function(aValue, aKey) {
				if (!isValueEqual) return;
				var hasMatch = false;
				var matchIndex = 0;
				b.forEach(function(bValue, bKey) {
					if (!hasMatch && !matchedIndices[matchIndex] && (hasMatch = isEqual(aValue, bValue, aKey, bKey, a, b, meta))) matchedIndices[matchIndex] = true;
					matchIndex++;
				});
				isValueEqual = hasMatch;
			});
			return isValueEqual;
		}
		/**
		* Whether the `Set`s are equal in value, including circular references.
		*/
		var areSetsEqualCircular = createIsCircular(areSetsEqual);
		var DEFAULT_CONFIG = Object.freeze({
			areArraysEqual,
			areDatesEqual,
			areMapsEqual,
			areObjectsEqual,
			areRegExpsEqual,
			areSetsEqual,
			createIsNestedEqual: createDefaultIsNestedEqual
		});
		var DEFAULT_CIRCULAR_CONFIG = Object.freeze({
			areArraysEqual: areArraysEqualCircular,
			areDatesEqual,
			areMapsEqual: areMapsEqualCircular,
			areObjectsEqual: areObjectsEqualCircular,
			areRegExpsEqual,
			areSetsEqual: areSetsEqualCircular,
			createIsNestedEqual: createDefaultIsNestedEqual
		});
		var isDeepEqual = createComparator(DEFAULT_CONFIG);
		/**
		* Whether the items passed are deeply-equal in value.
		*/
		function deepEqual(a, b) {
			return isDeepEqual(a, b, void 0);
		}
		var isShallowEqual = createComparator(merge(DEFAULT_CONFIG, { createIsNestedEqual: function() {
			return sameValueZeroEqual;
		} }));
		/**
		* Whether the items passed are shallowly-equal in value.
		*/
		function shallowEqual(a, b) {
			return isShallowEqual(a, b, void 0);
		}
		var isCircularDeepEqual = createComparator(DEFAULT_CIRCULAR_CONFIG);
		/**
		* Whether the items passed are deeply-equal in value, including circular references.
		*/
		function circularDeepEqual(a, b) {
			return isCircularDeepEqual(a, b, /* @__PURE__ */ new WeakMap());
		}
		var isCircularShallowEqual = createComparator(merge(DEFAULT_CIRCULAR_CONFIG, { createIsNestedEqual: function() {
			return sameValueZeroEqual;
		} }));
		/**
		* Whether the items passed are shallowly-equal in value, including circular references.
		*/
		function circularShallowEqual(a, b) {
			return isCircularShallowEqual(a, b, /* @__PURE__ */ new WeakMap());
		}
		/**
		* Create a custom equality comparison method.
		*
		* This can be done to create very targeted comparisons in extreme hot-path scenarios
		* where the standard methods are not performant enough, but can also be used to provide
		* support for legacy environments that do not support expected features like
		* `RegExp.prototype.flags` out of the box.
		*/
		function createCustomEqual(getComparatorOptions) {
			return createComparator(merge(DEFAULT_CONFIG, getComparatorOptions(DEFAULT_CONFIG)));
		}
		/**
		* Create a custom equality comparison method that handles circular references. This is very
		* similar to `createCustomEqual`, with the only difference being that `meta` expects to be
		* populated with a `WeakMap`-like contract.
		*
		* This can be done to create very targeted comparisons in extreme hot-path scenarios
		* where the standard methods are not performant enough, but can also be used to provide
		* support for legacy environments that do not support expected features like
		* `WeakMap` out of the box.
		*/
		function createCustomCircularEqual(getComparatorOptions) {
			var comparator = createComparator(merge(DEFAULT_CIRCULAR_CONFIG, getComparatorOptions(DEFAULT_CIRCULAR_CONFIG)));
			return (function(a, b, meta) {
				if (meta === void 0) meta = /* @__PURE__ */ new WeakMap();
				return comparator(a, b, meta);
			});
		}
		exports$1.circularDeepEqual = circularDeepEqual;
		exports$1.circularShallowEqual = circularShallowEqual;
		exports$1.createCustomCircularEqual = createCustomCircularEqual;
		exports$1.createCustomEqual = createCustomEqual;
		exports$1.deepEqual = deepEqual;
		exports$1.sameValueZeroEqual = sameValueZeroEqual;
		exports$1.shallowEqual = shallowEqual;
		Object.defineProperty(exports$1, "__esModule", { value: true });
	}));
}));
//#endregion
//#region node_modules/clsx/dist/clsx.js
var require_clsx = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function r(e) {
		var o, t, f = "";
		if ("string" == typeof e || "number" == typeof e) f += e;
		else if ("object" == typeof e) if (Array.isArray(e)) {
			var n = e.length;
			for (o = 0; o < n; o++) e[o] && (t = r(e[o])) && (f && (f += " "), f += t);
		} else for (t in e) e[t] && (f && (f += " "), f += t);
		return f;
	}
	function e() {
		for (var e, o, t = 0, f = "", n = arguments.length; t < n; t++) (e = arguments[t]) && (o = r(e)) && (f && (f += " "), f += o);
		return f;
	}
	module.exports = e, module.exports.clsx = e;
}));
//#endregion
//#region node_modules/react-grid-layout/build/fastRGLPropsEqual.js
var require_fastRGLPropsEqual = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function fastRGLPropsEqual(a, b, isEqualImpl) {
		if (a === b) return true;
		return a.className === b.className && isEqualImpl(a.style, b.style) && a.width === b.width && a.autoSize === b.autoSize && a.cols === b.cols && a.draggableCancel === b.draggableCancel && a.draggableHandle === b.draggableHandle && isEqualImpl(a.verticalCompact, b.verticalCompact) && isEqualImpl(a.compactType, b.compactType) && isEqualImpl(a.layout, b.layout) && isEqualImpl(a.margin, b.margin) && isEqualImpl(a.containerPadding, b.containerPadding) && a.rowHeight === b.rowHeight && a.maxRows === b.maxRows && a.isBounded === b.isBounded && a.isDraggable === b.isDraggable && a.isResizable === b.isResizable && a.allowOverlap === b.allowOverlap && a.preventCollision === b.preventCollision && a.useCSSTransforms === b.useCSSTransforms && a.transformScale === b.transformScale && a.isDroppable === b.isDroppable && isEqualImpl(a.resizeHandles, b.resizeHandles) && isEqualImpl(a.resizeHandle, b.resizeHandle) && a.onLayoutChange === b.onLayoutChange && a.onDragStart === b.onDragStart && a.onDrag === b.onDrag && a.onDragStop === b.onDragStop && a.onResizeStart === b.onResizeStart && a.onResize === b.onResize && a.onResizeStop === b.onResizeStop && a.onDrop === b.onDrop && isEqualImpl(a.droppingItem, b.droppingItem) && isEqualImpl(a.innerRef, b.innerRef);
	};
}));
//#endregion
//#region node_modules/react-grid-layout/build/utils.js
var require_utils$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.bottom = bottom;
	exports.childrenEqual = childrenEqual;
	exports.cloneLayout = cloneLayout;
	exports.cloneLayoutItem = cloneLayoutItem;
	exports.collides = collides;
	exports.compact = compact;
	exports.compactItem = compactItem;
	exports.compactType = compactType;
	exports.correctBounds = correctBounds;
	exports.fastPositionEqual = fastPositionEqual;
	exports.fastRGLPropsEqual = void 0;
	exports.getAllCollisions = getAllCollisions;
	exports.getFirstCollision = getFirstCollision;
	exports.getLayoutItem = getLayoutItem;
	exports.getStatics = getStatics;
	exports.modifyLayout = modifyLayout;
	exports.moveElement = moveElement;
	exports.moveElementAwayFromCollision = moveElementAwayFromCollision;
	exports.noop = void 0;
	exports.perc = perc;
	exports.resizeItemInDirection = resizeItemInDirection;
	exports.setTopLeft = setTopLeft;
	exports.setTransform = setTransform;
	exports.sortLayoutItems = sortLayoutItems;
	exports.sortLayoutItemsByColRow = sortLayoutItemsByColRow;
	exports.sortLayoutItemsByRowCol = sortLayoutItemsByRowCol;
	exports.synchronizeLayoutWithChildren = synchronizeLayoutWithChildren;
	exports.validateLayout = validateLayout;
	exports.withLayoutItem = withLayoutItem;
	var _fastEquals = require_fast_equals();
	var _react = _interopRequireDefault(require_react());
	function _interopRequireDefault(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == typeof i ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != typeof t || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != typeof i) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	/**
	* Return the bottom coordinate of the layout.
	*
	* @param  {Array} layout Layout array.
	* @return {Number}       Bottom coordinate.
	*/
	function bottom(layout) {
		let max = 0, bottomY;
		for (let i = 0, len = layout.length; i < len; i++) {
			bottomY = layout[i].y + layout[i].h;
			if (bottomY > max) max = bottomY;
		}
		return max;
	}
	function cloneLayout(layout) {
		const newLayout = Array(layout.length);
		for (let i = 0, len = layout.length; i < len; i++) newLayout[i] = cloneLayoutItem(layout[i]);
		return newLayout;
	}
	function modifyLayout(layout, layoutItem) {
		const newLayout = Array(layout.length);
		for (let i = 0, len = layout.length; i < len; i++) if (layoutItem.i === layout[i].i) newLayout[i] = layoutItem;
		else newLayout[i] = layout[i];
		return newLayout;
	}
	function withLayoutItem(layout, itemKey, cb) {
		let item = getLayoutItem(layout, itemKey);
		if (!item) return [layout, null];
		item = cb(cloneLayoutItem(item));
		layout = modifyLayout(layout, item);
		return [layout, item];
	}
	function cloneLayoutItem(layoutItem) {
		return {
			w: layoutItem.w,
			h: layoutItem.h,
			x: layoutItem.x,
			y: layoutItem.y,
			i: layoutItem.i,
			minW: layoutItem.minW,
			maxW: layoutItem.maxW,
			minH: layoutItem.minH,
			maxH: layoutItem.maxH,
			moved: Boolean(layoutItem.moved),
			static: Boolean(layoutItem.static),
			isDraggable: layoutItem.isDraggable,
			isResizable: layoutItem.isResizable,
			resizeHandles: layoutItem.resizeHandles,
			isBounded: layoutItem.isBounded
		};
	}
	/**
	* Comparing React `children` is a bit difficult. This is a good way to compare them.
	* This will catch differences in keys, order, and length.
	*/
	function childrenEqual(a, b) {
		return (0, _fastEquals.deepEqual)(_react.default.Children.map(a, (c) => c === null || c === void 0 ? void 0 : c.key), _react.default.Children.map(b, (c) => c === null || c === void 0 ? void 0 : c.key)) && (0, _fastEquals.deepEqual)(_react.default.Children.map(a, (c) => c === null || c === void 0 ? void 0 : c.props["data-grid"]), _react.default.Children.map(b, (c) => c === null || c === void 0 ? void 0 : c.props["data-grid"]));
	}
	exports.fastRGLPropsEqual = require_fastRGLPropsEqual();
	function fastPositionEqual(a, b) {
		return a.left === b.left && a.top === b.top && a.width === b.width && a.height === b.height;
	}
	/**
	* Given two layoutitems, check if they collide.
	*/
	function collides(l1, l2) {
		if (l1.i === l2.i) return false;
		if (l1.x + l1.w <= l2.x) return false;
		if (l1.x >= l2.x + l2.w) return false;
		if (l1.y + l1.h <= l2.y) return false;
		if (l1.y >= l2.y + l2.h) return false;
		return true;
	}
	/**
	* Given a layout, compact it. This involves going down each y coordinate and removing gaps
	* between items.
	*
	* Does not modify layout items (clones). Creates a new layout array.
	*
	* @param  {Array} layout Layout.
	* @param  {Boolean} verticalCompact Whether or not to compact the layout
	*   vertically.
	* @param  {Boolean} allowOverlap When `true`, allows overlapping grid items.
	* @return {Array}       Compacted Layout.
	*/
	function compact(layout, compactType, cols, allowOverlap) {
		const compareWith = getStatics(layout);
		let b = bottom(compareWith);
		const sorted = sortLayoutItems(layout, compactType);
		const out = Array(layout.length);
		for (let i = 0, len = sorted.length; i < len; i++) {
			let l = cloneLayoutItem(sorted[i]);
			if (!l.static) {
				l = compactItem(compareWith, l, compactType, cols, sorted, allowOverlap, b);
				b = Math.max(b, l.y + l.h);
				compareWith.push(l);
			}
			out[layout.indexOf(sorted[i])] = l;
			l.moved = false;
		}
		return out;
	}
	var heightWidth = {
		x: "w",
		y: "h"
	};
	/**
	* Before moving item down, it will check if the movement will cause collisions and move those items down before.
	*/
	function resolveCompactionCollision(layout, item, moveToCoord, axis) {
		const sizeProp = heightWidth[axis];
		item[axis] += 1;
		const itemIndex = layout.map((layoutItem) => {
			return layoutItem.i;
		}).indexOf(item.i);
		for (let i = itemIndex + 1; i < layout.length; i++) {
			const otherItem = layout[i];
			if (otherItem.static) continue;
			if (otherItem.y > item.y + item.h) break;
			if (collides(item, otherItem)) resolveCompactionCollision(layout, otherItem, moveToCoord + item[sizeProp], axis);
		}
		item[axis] = moveToCoord;
	}
	/**
	* Compact an item in the layout.
	*
	* Modifies item.
	*
	*/
	function compactItem(compareWith, l, compactType, cols, fullLayout, allowOverlap, b) {
		const compactV = compactType === "vertical";
		const compactH = compactType === "horizontal";
		if (compactV) {
			if (typeof b === "number") l.y = Math.min(b, l.y);
			else l.y = Math.min(bottom(compareWith), l.y);
			while (l.y > 0 && !getFirstCollision(compareWith, l)) l.y--;
		} else if (compactH) while (l.x > 0 && !getFirstCollision(compareWith, l)) l.x--;
		let collides;
		while ((collides = getFirstCollision(compareWith, l)) && !(compactType === null && allowOverlap)) {
			if (compactH) resolveCompactionCollision(fullLayout, l, collides.x + collides.w, "x");
			else resolveCompactionCollision(fullLayout, l, collides.y + collides.h, "y");
			if (compactH && l.x + l.w > cols) {
				l.x = cols - l.w;
				l.y++;
				while (l.x > 0 && !getFirstCollision(compareWith, l)) l.x--;
			}
		}
		l.y = Math.max(l.y, 0);
		l.x = Math.max(l.x, 0);
		return l;
	}
	/**
	* Given a layout, make sure all elements fit within its bounds.
	*
	* Modifies layout items.
	*
	* @param  {Array} layout Layout array.
	* @param  {Number} bounds Number of columns.
	*/
	function correctBounds(layout, bounds) {
		const collidesWith = getStatics(layout);
		for (let i = 0, len = layout.length; i < len; i++) {
			const l = layout[i];
			if (l.x + l.w > bounds.cols) l.x = bounds.cols - l.w;
			if (l.x < 0) {
				l.x = 0;
				l.w = bounds.cols;
			}
			if (!l.static) collidesWith.push(l);
			else while (getFirstCollision(collidesWith, l)) l.y++;
		}
		return layout;
	}
	/**
	* Get a layout item by ID. Used so we can override later on if necessary.
	*
	* @param  {Array}  layout Layout array.
	* @param  {String} id     ID
	* @return {LayoutItem}    Item at ID.
	*/
	function getLayoutItem(layout, id) {
		for (let i = 0, len = layout.length; i < len; i++) if (layout[i].i === id) return layout[i];
	}
	/**
	* Returns the first item this layout collides with.
	* It doesn't appear to matter which order we approach this from, although
	* perhaps that is the wrong thing to do.
	*
	* @param  {Object} layoutItem Layout item.
	* @return {Object|undefined}  A colliding layout item, or undefined.
	*/
	function getFirstCollision(layout, layoutItem) {
		for (let i = 0, len = layout.length; i < len; i++) if (collides(layout[i], layoutItem)) return layout[i];
	}
	function getAllCollisions(layout, layoutItem) {
		return layout.filter((l) => collides(l, layoutItem));
	}
	/**
	* Get all static elements.
	* @param  {Array} layout Array of layout objects.
	* @return {Array}        Array of static layout items..
	*/
	function getStatics(layout) {
		return layout.filter((l) => l.static);
	}
	/**
	* Move an element. Responsible for doing cascading movements of other elements.
	*
	* Modifies layout items.
	*
	* @param  {Array}      layout            Full layout to modify.
	* @param  {LayoutItem} l                 element to move.
	* @param  {Number}     [x]               X position in grid units.
	* @param  {Number}     [y]               Y position in grid units.
	*/
	function moveElement(layout, l, x, y, isUserAction, preventCollision, compactType, cols, allowOverlap) {
		if (l.static && l.isDraggable !== true) return layout;
		if (l.y === y && l.x === x) return layout;
		"Moving element ".concat(l.i, " to [").concat(String(x), ",").concat(String(y), "] from [").concat(l.x, ",").concat(l.y, "]");
		const oldX = l.x;
		const oldY = l.y;
		if (typeof x === "number") l.x = x;
		if (typeof y === "number") l.y = y;
		l.moved = true;
		let sorted = sortLayoutItems(layout, compactType);
		if (compactType === "vertical" && typeof y === "number" ? oldY >= y : compactType === "horizontal" && typeof x === "number" ? oldX >= x : false) sorted = sorted.reverse();
		const collisions = getAllCollisions(sorted, l);
		const hasCollisions = collisions.length > 0;
		if (hasCollisions && allowOverlap) return cloneLayout(layout);
		else if (hasCollisions && preventCollision) {
			"Collision prevented on ".concat(l.i, ", reverting.");
			l.x = oldX;
			l.y = oldY;
			l.moved = false;
			return layout;
		}
		for (let i = 0, len = collisions.length; i < len; i++) {
			const collision = collisions[i];
			"Resolving collision between ".concat(l.i, " at [").concat(l.x, ",").concat(l.y, "] and ").concat(collision.i, " at [").concat(collision.x, ",").concat(collision.y, "]");
			if (collision.moved) continue;
			if (collision.static) layout = moveElementAwayFromCollision(layout, collision, l, isUserAction, compactType, cols);
			else layout = moveElementAwayFromCollision(layout, l, collision, isUserAction, compactType, cols);
		}
		return layout;
	}
	/**
	* This is where the magic needs to happen - given a collision, move an element away from the collision.
	* We attempt to move it up if there's room, otherwise it goes below.
	*
	* @param  {Array} layout            Full layout to modify.
	* @param  {LayoutItem} collidesWith Layout item we're colliding with.
	* @param  {LayoutItem} itemToMove   Layout item we're moving.
	*/
	function moveElementAwayFromCollision(layout, collidesWith, itemToMove, isUserAction, compactType, cols) {
		const compactH = compactType === "horizontal";
		const compactV = compactType === "vertical";
		const preventCollision = collidesWith.static;
		if (isUserAction) {
			isUserAction = false;
			const fakeItem = {
				x: compactH ? Math.max(collidesWith.x - itemToMove.w, 0) : itemToMove.x,
				y: compactV ? Math.max(collidesWith.y - itemToMove.h, 0) : itemToMove.y,
				w: itemToMove.w,
				h: itemToMove.h,
				i: "-1"
			};
			const firstCollision = getFirstCollision(layout, fakeItem);
			const collisionNorth = firstCollision && firstCollision.y + firstCollision.h > collidesWith.y;
			const collisionWest = firstCollision && collidesWith.x + collidesWith.w > firstCollision.x;
			if (!firstCollision) {
				"Doing reverse collision on ".concat(itemToMove.i, " up to [").concat(fakeItem.x, ",").concat(fakeItem.y, "].");
				return moveElement(layout, itemToMove, compactH ? fakeItem.x : void 0, compactV ? fakeItem.y : void 0, isUserAction, preventCollision, compactType, cols);
			} else if (collisionNorth && compactV) return moveElement(layout, itemToMove, void 0, itemToMove.y + 1, isUserAction, preventCollision, compactType, cols);
			else if (collisionNorth && compactType == null) {
				collidesWith.y = itemToMove.y;
				itemToMove.y = itemToMove.y + itemToMove.h;
				return layout;
			} else if (collisionWest && compactH) return moveElement(layout, collidesWith, itemToMove.x, void 0, isUserAction, preventCollision, compactType, cols);
		}
		const newX = compactH ? itemToMove.x + 1 : void 0;
		const newY = compactV ? itemToMove.y + 1 : void 0;
		if (newX == null && newY == null) return layout;
		return moveElement(layout, itemToMove, compactH ? itemToMove.x + 1 : void 0, compactV ? itemToMove.y + 1 : void 0, isUserAction, preventCollision, compactType, cols);
	}
	/**
	* Helper to convert a number to a percentage string.
	*
	* @param  {Number} num Any number
	* @return {String}     That number as a percentage.
	*/
	function perc(num) {
		return num * 100 + "%";
	}
	/**
	* Helper functions to constrain dimensions of a GridItem
	*/
	var constrainWidth = (left, currentWidth, newWidth, containerWidth) => {
		return left + newWidth > containerWidth ? currentWidth : newWidth;
	};
	var constrainHeight = (top, currentHeight, newHeight) => {
		return top < 0 ? currentHeight : newHeight;
	};
	var constrainLeft = (left) => Math.max(0, left);
	var constrainTop = (top) => Math.max(0, top);
	var resizeNorth = (currentSize, _ref, _containerWidth) => {
		let { left, height, width } = _ref;
		const top = currentSize.top - (height - currentSize.height);
		return {
			left,
			width,
			height: constrainHeight(top, currentSize.height, height),
			top: constrainTop(top)
		};
	};
	var resizeEast = (currentSize, _ref2, containerWidth) => {
		let { top, left, height, width } = _ref2;
		return {
			top,
			height,
			width: constrainWidth(currentSize.left, currentSize.width, width, containerWidth),
			left: constrainLeft(left)
		};
	};
	var resizeWest = (currentSize, _ref3, containerWidth) => {
		let { top, height, width } = _ref3;
		const left = currentSize.left - (width - currentSize.width);
		return {
			height,
			width: left < 0 ? currentSize.width : constrainWidth(currentSize.left, currentSize.width, width, containerWidth),
			top: constrainTop(top),
			left: constrainLeft(left)
		};
	};
	var resizeSouth = (currentSize, _ref4, containerWidth) => {
		let { top, left, height, width } = _ref4;
		return {
			width,
			left,
			height: constrainHeight(top, currentSize.height, height),
			top: constrainTop(top)
		};
	};
	var resizeNorthEast = function() {
		return resizeNorth(arguments.length <= 0 ? void 0 : arguments[0], resizeEast(...arguments), arguments.length <= 2 ? void 0 : arguments[2]);
	};
	var resizeNorthWest = function() {
		return resizeNorth(arguments.length <= 0 ? void 0 : arguments[0], resizeWest(...arguments), arguments.length <= 2 ? void 0 : arguments[2]);
	};
	var resizeSouthEast = function() {
		return resizeSouth(arguments.length <= 0 ? void 0 : arguments[0], resizeEast(...arguments), arguments.length <= 2 ? void 0 : arguments[2]);
	};
	var resizeSouthWest = function() {
		return resizeSouth(arguments.length <= 0 ? void 0 : arguments[0], resizeWest(...arguments), arguments.length <= 2 ? void 0 : arguments[2]);
	};
	var ordinalResizeHandlerMap = {
		n: resizeNorth,
		ne: resizeNorthEast,
		e: resizeEast,
		se: resizeSouthEast,
		s: resizeSouth,
		sw: resizeSouthWest,
		w: resizeWest,
		nw: resizeNorthWest
	};
	/**
	* Helper for clamping width and position when resizing an item.
	*/
	function resizeItemInDirection(direction, currentSize, newSize, containerWidth) {
		const ordinalHandler = ordinalResizeHandlerMap[direction];
		if (!ordinalHandler) return newSize;
		return ordinalHandler(currentSize, _objectSpread(_objectSpread({}, currentSize), newSize), containerWidth);
	}
	function setTransform(_ref5) {
		let { top, left, width, height } = _ref5;
		const translate = "translate(".concat(left, "px,").concat(top, "px)");
		return {
			transform: translate,
			WebkitTransform: translate,
			MozTransform: translate,
			msTransform: translate,
			OTransform: translate,
			width: "".concat(width, "px"),
			height: "".concat(height, "px"),
			position: "absolute"
		};
	}
	function setTopLeft(_ref6) {
		let { top, left, width, height } = _ref6;
		return {
			top: "".concat(top, "px"),
			left: "".concat(left, "px"),
			width: "".concat(width, "px"),
			height: "".concat(height, "px"),
			position: "absolute"
		};
	}
	/**
	* Get layout items sorted from top left to right and down.
	*
	* @return {Array} Array of layout objects.
	* @return {Array}        Layout, sorted static items first.
	*/
	function sortLayoutItems(layout, compactType) {
		if (compactType === "horizontal") return sortLayoutItemsByColRow(layout);
		if (compactType === "vertical") return sortLayoutItemsByRowCol(layout);
		else return layout;
	}
	/**
	* Sort layout items by row ascending and column ascending.
	*
	* Does not modify Layout.
	*/
	function sortLayoutItemsByRowCol(layout) {
		return layout.slice(0).sort(function(a, b) {
			if (a.y > b.y || a.y === b.y && a.x > b.x) return 1;
			else if (a.y === b.y && a.x === b.x) return 0;
			return -1;
		});
	}
	/**
	* Sort layout items by column ascending then row ascending.
	*
	* Does not modify Layout.
	*/
	function sortLayoutItemsByColRow(layout) {
		return layout.slice(0).sort(function(a, b) {
			if (a.x > b.x || a.x === b.x && a.y > b.y) return 1;
			return -1;
		});
	}
	/**
	* Generate a layout using the initialLayout and children as a template.
	* Missing entries will be added, extraneous ones will be truncated.
	*
	* Does not modify initialLayout.
	*
	* @param  {Array}  initialLayout Layout passed in through props.
	* @param  {String} breakpoint    Current responsive breakpoint.
	* @param  {?String} compact      Compaction option.
	* @return {Array}                Working layout.
	*/
	function synchronizeLayoutWithChildren(initialLayout, children, cols, compactType, allowOverlap) {
		initialLayout = initialLayout || [];
		const layout = [];
		_react.default.Children.forEach(children, (child) => {
			if ((child === null || child === void 0 ? void 0 : child.key) == null) return;
			const exists = getLayoutItem(initialLayout, String(child.key));
			const g = child.props["data-grid"];
			if (exists && g == null) layout.push(cloneLayoutItem(exists));
			else if (g) {
				validateLayout([g], "ReactGridLayout.children");
				layout.push(cloneLayoutItem(_objectSpread(_objectSpread({}, g), {}, { i: child.key })));
			} else layout.push(cloneLayoutItem({
				w: 1,
				h: 1,
				x: 0,
				y: bottom(layout),
				i: String(child.key)
			}));
		});
		const correctedLayout = correctBounds(layout, { cols });
		return allowOverlap ? correctedLayout : compact(correctedLayout, compactType, cols);
	}
	/**
	* Validate a layout. Throws errors.
	*
	* @param  {Array}  layout        Array of layout items.
	* @param  {String} [contextName] Context name for errors.
	* @throw  {Error}                Validation error.
	*/
	function validateLayout(layout) {
		let contextName = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Layout";
		const subProps = [
			"x",
			"y",
			"w",
			"h"
		];
		if (!Array.isArray(layout)) throw new Error(contextName + " must be an array!");
		for (let i = 0, len = layout.length; i < len; i++) {
			const item = layout[i];
			for (let j = 0; j < subProps.length; j++) {
				const key = subProps[j];
				const value = item[key];
				if (typeof value !== "number" || Number.isNaN(value)) throw new Error("ReactGridLayout: ".concat(contextName, "[").concat(i, "].").concat(key, " must be a number! Received: ").concat(value, " (").concat(typeof value, ")"));
			}
			if (typeof item.i !== "undefined" && typeof item.i !== "string") throw new Error("ReactGridLayout: ".concat(contextName, "[").concat(i, "].i must be a string! Received: ").concat(item.i, " (").concat(typeof item.i, ")"));
		}
	}
	function compactType(props) {
		const { verticalCompact, compactType } = props || {};
		return verticalCompact === false ? null : compactType;
	}
	var noop = () => {};
	exports.noop = noop;
}));
//#endregion
//#region node_modules/react-grid-layout/build/calculateUtils.js
var require_calculateUtils = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calcGridColWidth = calcGridColWidth;
	exports.calcGridItemPosition = calcGridItemPosition;
	exports.calcGridItemWHPx = calcGridItemWHPx;
	exports.calcWH = calcWH;
	exports.calcXY = calcXY;
	exports.clamp = clamp;
	function calcGridColWidth(positionParams) {
		const { margin, containerPadding, containerWidth, cols } = positionParams;
		return (containerWidth - margin[0] * (cols - 1) - containerPadding[0] * 2) / cols;
	}
	function calcGridItemWHPx(gridUnits, colOrRowSize, marginPx) {
		if (!Number.isFinite(gridUnits)) return gridUnits;
		return Math.round(colOrRowSize * gridUnits + Math.max(0, gridUnits - 1) * marginPx);
	}
	/**
	* Return position on the page given an x, y, w, h.
	* left, top, width, height are all in pixels.
	* @param  {PositionParams} positionParams  Parameters of grid needed for coordinates calculations.
	* @param  {Number}  x                      X coordinate in grid units.
	* @param  {Number}  y                      Y coordinate in grid units.
	* @param  {Number}  w                      W coordinate in grid units.
	* @param  {Number}  h                      H coordinate in grid units.
	* @return {Position}                       Object containing coords.
	*/
	function calcGridItemPosition(positionParams, x, y, w, h, state) {
		const { margin, containerPadding, rowHeight } = positionParams;
		const colWidth = calcGridColWidth(positionParams);
		const out = {};
		if (state && state.resizing) {
			out.width = Math.round(state.resizing.width);
			out.height = Math.round(state.resizing.height);
		} else {
			out.width = calcGridItemWHPx(w, colWidth, margin[0]);
			out.height = calcGridItemWHPx(h, rowHeight, margin[1]);
		}
		if (state && state.dragging) {
			out.top = Math.round(state.dragging.top);
			out.left = Math.round(state.dragging.left);
		} else if (state && state.resizing && typeof state.resizing.top === "number" && typeof state.resizing.left === "number") {
			out.top = Math.round(state.resizing.top);
			out.left = Math.round(state.resizing.left);
		} else {
			out.top = Math.round((rowHeight + margin[1]) * y + containerPadding[1]);
			out.left = Math.round((colWidth + margin[0]) * x + containerPadding[0]);
		}
		return out;
	}
	/**
	* Translate x and y coordinates from pixels to grid units.
	* @param  {PositionParams} positionParams  Parameters of grid needed for coordinates calculations.
	* @param  {Number} top                     Top position (relative to parent) in pixels.
	* @param  {Number} left                    Left position (relative to parent) in pixels.
	* @param  {Number} w                       W coordinate in grid units.
	* @param  {Number} h                       H coordinate in grid units.
	* @return {Object}                         x and y in grid units.
	*/
	function calcXY(positionParams, top, left, w, h) {
		const { margin, containerPadding, cols, rowHeight, maxRows } = positionParams;
		const colWidth = calcGridColWidth(positionParams);
		let x = Math.round((left - containerPadding[0]) / (colWidth + margin[0]));
		let y = Math.round((top - containerPadding[1]) / (rowHeight + margin[1]));
		x = clamp(x, 0, cols - w);
		y = clamp(y, 0, maxRows - h);
		return {
			x,
			y
		};
	}
	/**
	* Given a height and width in pixel values, calculate grid units.
	* @param  {PositionParams} positionParams  Parameters of grid needed for coordinates calcluations.
	* @param  {Number} height                  Height in pixels.
	* @param  {Number} width                   Width in pixels.
	* @param  {Number} x                       X coordinate in grid units.
	* @param  {Number} y                       Y coordinate in grid units.
	* @param {String} handle Resize Handle.
	* @return {Object}                         w, h as grid units.
	*/
	function calcWH(positionParams, width, height, x, y, handle) {
		const { margin, maxRows, cols, rowHeight } = positionParams;
		const colWidth = calcGridColWidth(positionParams);
		let w = Math.round((width + margin[0]) / (colWidth + margin[0]));
		let h = Math.round((height + margin[1]) / (rowHeight + margin[1]));
		let _w = clamp(w, 0, cols - x);
		let _h = clamp(h, 0, maxRows - y);
		if ([
			"sw",
			"w",
			"nw"
		].indexOf(handle) !== -1) _w = clamp(w, 0, cols);
		if ([
			"nw",
			"n",
			"ne"
		].indexOf(handle) !== -1) _h = clamp(h, 0, maxRows);
		return {
			w: _w,
			h: _h
		};
	}
	function clamp(num, lowerBound, upperBound) {
		return Math.max(Math.min(num, upperBound), lowerBound);
	}
}));
//#endregion
//#region node_modules/react-draggable/build/cjs/utils/shims.js
var require_shims = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.dontSetMe = dontSetMe;
	exports.findInArray = findInArray;
	exports.int = int;
	exports.isFunction = isFunction;
	exports.isNum = isNum;
	function findInArray(array, callback) {
		for (let i = 0, length = array.length; i < length; i++) if (callback.apply(callback, [
			array[i],
			i,
			array
		])) return array[i];
	}
	function isFunction(func) {
		return typeof func === "function" || Object.prototype.toString.call(func) === "[object Function]";
	}
	function isNum(num) {
		return typeof num === "number" && !isNaN(num);
	}
	function int(a) {
		return parseInt(a, 10);
	}
	function dontSetMe(props, propName, componentName) {
		if (props[propName]) return /* @__PURE__ */ new Error(`Invalid prop ${propName} passed to ${componentName} - do not set this, set it on the child.`);
	}
}));
//#endregion
//#region node_modules/react-draggable/build/cjs/utils/getPrefix.js
var require_getPrefix = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.browserPrefixToKey = browserPrefixToKey;
	exports.browserPrefixToStyle = browserPrefixToStyle;
	exports.default = void 0;
	exports.getPrefix = getPrefix;
	var prefixes = [
		"Moz",
		"Webkit",
		"O",
		"ms"
	];
	function getPrefix() {
		let prop = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "transform";
		if (typeof window === "undefined") return "";
		const style = window.document?.documentElement?.style;
		if (!style) return "";
		if (prop in style) return "";
		for (let i = 0; i < prefixes.length; i++) if (browserPrefixToKey(prop, prefixes[i]) in style) return prefixes[i];
		return "";
	}
	function browserPrefixToKey(prop, prefix) {
		return prefix ? `${prefix}${kebabToTitleCase(prop)}` : prop;
	}
	function browserPrefixToStyle(prop, prefix) {
		return prefix ? `-${prefix.toLowerCase()}-${prop}` : prop;
	}
	function kebabToTitleCase(str) {
		let out = "";
		let shouldCapitalize = true;
		for (let i = 0; i < str.length; i++) if (shouldCapitalize) {
			out += str[i].toUpperCase();
			shouldCapitalize = false;
		} else if (str[i] === "-") shouldCapitalize = true;
		else out += str[i];
		return out;
	}
	exports.default = getPrefix();
}));
//#endregion
//#region node_modules/react-draggable/build/cjs/utils/domFns.js
var require_domFns = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.addClassName = addClassName;
	exports.addEvent = addEvent;
	exports.addUserSelectStyles = addUserSelectStyles;
	exports.createCSSTransform = createCSSTransform;
	exports.createSVGTransform = createSVGTransform;
	exports.getTouch = getTouch;
	exports.getTouchIdentifier = getTouchIdentifier;
	exports.getTranslation = getTranslation;
	exports.innerHeight = innerHeight;
	exports.innerWidth = innerWidth;
	exports.matchesSelector = matchesSelector;
	exports.matchesSelectorAndParentsTo = matchesSelectorAndParentsTo;
	exports.offsetXYFromParent = offsetXYFromParent;
	exports.outerHeight = outerHeight;
	exports.outerWidth = outerWidth;
	exports.removeClassName = removeClassName;
	exports.removeEvent = removeEvent;
	exports.scheduleRemoveUserSelectStyles = scheduleRemoveUserSelectStyles;
	var _shims = require_shims();
	var _getPrefix = _interopRequireWildcard(require_getPrefix());
	function _interopRequireWildcard(e, t) {
		if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
		return (_interopRequireWildcard = function(e, t) {
			if (!t && e && e.__esModule) return e;
			var o, i, f = {
				__proto__: null,
				default: e
			};
			if (null === e || "object" != typeof e && "function" != typeof e) return f;
			if (o = t ? n : r) {
				if (o.has(e)) return o.get(e);
				o.set(e, f);
			}
			for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]);
			return f;
		})(e, t);
	}
	var matchesSelectorFunc = "";
	function matchesSelector(el, selector) {
		if (!matchesSelectorFunc) matchesSelectorFunc = (0, _shims.findInArray)([
			"matches",
			"webkitMatchesSelector",
			"mozMatchesSelector",
			"msMatchesSelector",
			"oMatchesSelector"
		], function(method) {
			return (0, _shims.isFunction)(el[method]);
		});
		if (!(0, _shims.isFunction)(el[matchesSelectorFunc])) return false;
		return el[matchesSelectorFunc](selector);
	}
	function matchesSelectorAndParentsTo(el, selector, baseNode) {
		let node = el;
		do {
			if (matchesSelector(node, selector)) return true;
			if (node === baseNode) return false;
			node = node.parentNode;
		} while (node);
		return false;
	}
	function addEvent(el, event, handler, inputOptions) {
		if (!el) return;
		const options = {
			capture: true,
			...inputOptions
		};
		if (el.addEventListener) el.addEventListener(event, handler, options);
		else if (el.attachEvent) el.attachEvent("on" + event, handler);
		else el["on" + event] = handler;
	}
	function removeEvent(el, event, handler, inputOptions) {
		if (!el) return;
		const options = {
			capture: true,
			...inputOptions
		};
		if (el.removeEventListener) el.removeEventListener(event, handler, options);
		else if (el.detachEvent) el.detachEvent("on" + event, handler);
		else el["on" + event] = null;
	}
	function outerHeight(node) {
		let height = node.clientHeight;
		const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
		height += (0, _shims.int)(computedStyle.borderTopWidth);
		height += (0, _shims.int)(computedStyle.borderBottomWidth);
		return height;
	}
	function outerWidth(node) {
		let width = node.clientWidth;
		const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
		width += (0, _shims.int)(computedStyle.borderLeftWidth);
		width += (0, _shims.int)(computedStyle.borderRightWidth);
		return width;
	}
	function innerHeight(node) {
		let height = node.clientHeight;
		const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
		height -= (0, _shims.int)(computedStyle.paddingTop);
		height -= (0, _shims.int)(computedStyle.paddingBottom);
		return height;
	}
	function innerWidth(node) {
		let width = node.clientWidth;
		const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
		width -= (0, _shims.int)(computedStyle.paddingLeft);
		width -= (0, _shims.int)(computedStyle.paddingRight);
		return width;
	}
	function offsetXYFromParent(evt, offsetParent, scale) {
		const offsetParentRect = offsetParent === offsetParent.ownerDocument.body ? {
			left: 0,
			top: 0
		} : offsetParent.getBoundingClientRect();
		return {
			x: (evt.clientX + offsetParent.scrollLeft - offsetParentRect.left) / scale,
			y: (evt.clientY + offsetParent.scrollTop - offsetParentRect.top) / scale
		};
	}
	function createCSSTransform(controlPos, positionOffset) {
		const translation = getTranslation(controlPos, positionOffset, "px");
		return { [(0, _getPrefix.browserPrefixToKey)("transform", _getPrefix.default)]: translation };
	}
	function createSVGTransform(controlPos, positionOffset) {
		return getTranslation(controlPos, positionOffset, "");
	}
	function getTranslation(_ref, positionOffset, unitSuffix) {
		let { x, y } = _ref;
		let translation = `translate(${x}${unitSuffix},${y}${unitSuffix})`;
		if (positionOffset) translation = `translate(${`${typeof positionOffset.x === "string" ? positionOffset.x : positionOffset.x + unitSuffix}`}, ${`${typeof positionOffset.y === "string" ? positionOffset.y : positionOffset.y + unitSuffix}`})` + translation;
		return translation;
	}
	function getTouch(e, identifier) {
		return e.targetTouches && (0, _shims.findInArray)(e.targetTouches, (t) => identifier === t.identifier) || e.changedTouches && (0, _shims.findInArray)(e.changedTouches, (t) => identifier === t.identifier);
	}
	function getTouchIdentifier(e) {
		if (e.targetTouches && e.targetTouches[0]) return e.targetTouches[0].identifier;
		if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0].identifier;
	}
	function addUserSelectStyles(doc) {
		if (!doc) return;
		let styleEl = doc.getElementById("react-draggable-style-el");
		if (!styleEl) {
			styleEl = doc.createElement("style");
			styleEl.type = "text/css";
			styleEl.id = "react-draggable-style-el";
			styleEl.innerHTML = ".react-draggable-transparent-selection *::-moz-selection {all: inherit;}\n";
			styleEl.innerHTML += ".react-draggable-transparent-selection *::selection {all: inherit;}\n";
			doc.getElementsByTagName("head")[0].appendChild(styleEl);
		}
		if (doc.body) addClassName(doc.body, "react-draggable-transparent-selection");
	}
	function scheduleRemoveUserSelectStyles(doc) {
		if (window.requestAnimationFrame) window.requestAnimationFrame(() => {
			removeUserSelectStyles(doc);
		});
		else removeUserSelectStyles(doc);
	}
	function removeUserSelectStyles(doc) {
		if (!doc) return;
		try {
			if (doc.body) removeClassName(doc.body, "react-draggable-transparent-selection");
			if (doc.selection) doc.selection.empty();
			else {
				const selection = (doc.defaultView || window).getSelection();
				if (selection && selection.type !== "Caret") selection.removeAllRanges();
			}
		} catch (e) {}
	}
	function addClassName(el, className) {
		if (el.classList) el.classList.add(className);
		else if (!el.className.match(new RegExp(`(?:^|\\s)${className}(?!\\S)`))) el.className += ` ${className}`;
	}
	function removeClassName(el, className) {
		if (el.classList) el.classList.remove(className);
		else el.className = el.className.replace(new RegExp(`(?:^|\\s)${className}(?!\\S)`, "g"), "");
	}
}));
//#endregion
//#region node_modules/react-draggable/build/cjs/utils/positionFns.js
var require_positionFns = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.canDragX = canDragX;
	exports.canDragY = canDragY;
	exports.createCoreData = createCoreData;
	exports.createDraggableData = createDraggableData;
	exports.getBoundPosition = getBoundPosition;
	exports.getControlPosition = getControlPosition;
	exports.snapToGrid = snapToGrid;
	var _shims = require_shims();
	var _domFns = require_domFns();
	function getBoundPosition(draggable, x, y) {
		if (!draggable.props.bounds) return [x, y];
		let { bounds } = draggable.props;
		bounds = typeof bounds === "string" ? bounds : cloneBounds(bounds);
		const node = findDOMNode(draggable);
		if (typeof bounds === "string") {
			const { ownerDocument } = node;
			const ownerWindow = ownerDocument.defaultView;
			let boundNode;
			if (bounds === "parent") boundNode = node.parentNode;
			else boundNode = node.getRootNode().querySelector(bounds);
			if (!(boundNode instanceof ownerWindow.HTMLElement)) throw new Error("Bounds selector \"" + bounds + "\" could not find an element.");
			const boundNodeEl = boundNode;
			const nodeStyle = ownerWindow.getComputedStyle(node);
			const boundNodeStyle = ownerWindow.getComputedStyle(boundNodeEl);
			bounds = {
				left: -node.offsetLeft + (0, _shims.int)(boundNodeStyle.paddingLeft) + (0, _shims.int)(nodeStyle.marginLeft),
				top: -node.offsetTop + (0, _shims.int)(boundNodeStyle.paddingTop) + (0, _shims.int)(nodeStyle.marginTop),
				right: (0, _domFns.innerWidth)(boundNodeEl) - (0, _domFns.outerWidth)(node) - node.offsetLeft + (0, _shims.int)(boundNodeStyle.paddingRight) - (0, _shims.int)(nodeStyle.marginRight),
				bottom: (0, _domFns.innerHeight)(boundNodeEl) - (0, _domFns.outerHeight)(node) - node.offsetTop + (0, _shims.int)(boundNodeStyle.paddingBottom) - (0, _shims.int)(nodeStyle.marginBottom)
			};
		}
		if ((0, _shims.isNum)(bounds.right)) x = Math.min(x, bounds.right);
		if ((0, _shims.isNum)(bounds.bottom)) y = Math.min(y, bounds.bottom);
		if ((0, _shims.isNum)(bounds.left)) x = Math.max(x, bounds.left);
		if ((0, _shims.isNum)(bounds.top)) y = Math.max(y, bounds.top);
		return [x, y];
	}
	function snapToGrid(grid, pendingX, pendingY) {
		return [Math.round(pendingX / grid[0]) * grid[0], Math.round(pendingY / grid[1]) * grid[1]];
	}
	function canDragX(draggable) {
		return draggable.props.axis === "both" || draggable.props.axis === "x";
	}
	function canDragY(draggable) {
		return draggable.props.axis === "both" || draggable.props.axis === "y";
	}
	function getControlPosition(e, touchIdentifier, draggableCore) {
		const touchObj = typeof touchIdentifier === "number" ? (0, _domFns.getTouch)(e, touchIdentifier) : null;
		if (typeof touchIdentifier === "number" && !touchObj) return null;
		const node = findDOMNode(draggableCore);
		const offsetParent = draggableCore.props.offsetParent || node.offsetParent || node.ownerDocument.body;
		return (0, _domFns.offsetXYFromParent)(touchObj || e, offsetParent, draggableCore.props.scale);
	}
	function createCoreData(draggable, x, y) {
		const isStart = !(0, _shims.isNum)(draggable.lastX);
		const node = findDOMNode(draggable);
		if (isStart) return {
			node,
			deltaX: 0,
			deltaY: 0,
			lastX: x,
			lastY: y,
			x,
			y
		};
		else return {
			node,
			deltaX: x - draggable.lastX,
			deltaY: y - draggable.lastY,
			lastX: draggable.lastX,
			lastY: draggable.lastY,
			x,
			y
		};
	}
	function createDraggableData(draggable, coreData) {
		const scale = draggable.props.scale;
		return {
			node: coreData.node,
			x: draggable.state.x + coreData.deltaX / scale,
			y: draggable.state.y + coreData.deltaY / scale,
			deltaX: coreData.deltaX / scale,
			deltaY: coreData.deltaY / scale,
			lastX: draggable.state.x,
			lastY: draggable.state.y
		};
	}
	function cloneBounds(bounds) {
		return {
			left: bounds.left,
			top: bounds.top,
			right: bounds.right,
			bottom: bounds.bottom
		};
	}
	function findDOMNode(draggable) {
		const node = draggable.findDOMNode();
		if (!node) throw new Error("<DraggableCore>: Unmounted during event!");
		return node;
	}
}));
//#endregion
//#region node_modules/react-draggable/build/cjs/utils/log.js
var require_log = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = log;
	function log() {}
}));
//#endregion
//#region node_modules/react-draggable/build/cjs/DraggableCore.js
var require_DraggableCore = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var React = _interopRequireWildcard(require_react());
	var _propTypes = _interopRequireDefault(require_prop_types());
	var _reactDom = _interopRequireDefault(require_react_dom());
	var _domFns = require_domFns();
	var _positionFns = require_positionFns();
	var _shims = require_shims();
	var _log = _interopRequireDefault(require_log());
	function _interopRequireDefault(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function _interopRequireWildcard(e, t) {
		if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
		return (_interopRequireWildcard = function(e, t) {
			if (!t && e && e.__esModule) return e;
			var o, i, f = {
				__proto__: null,
				default: e
			};
			if (null === e || "object" != typeof e && "function" != typeof e) return f;
			if (o = t ? n : r) {
				if (o.has(e)) return o.get(e);
				o.set(e, f);
			}
			for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]);
			return f;
		})(e, t);
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == typeof i ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != typeof t || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != typeof i) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	var eventsFor = {
		touch: {
			start: "touchstart",
			move: "touchmove",
			stop: "touchend"
		},
		mouse: {
			start: "mousedown",
			move: "mousemove",
			stop: "mouseup"
		}
	};
	var dragEventFor = eventsFor.mouse;
	var DraggableCore = class extends React.Component {
		constructor() {
			super(...arguments);
			_defineProperty(this, "dragging", false);
			_defineProperty(this, "lastX", NaN);
			_defineProperty(this, "lastY", NaN);
			_defineProperty(this, "touchIdentifier", null);
			_defineProperty(this, "mounted", false);
			_defineProperty(this, "handleDragStart", (e) => {
				this.props.onMouseDown(e);
				if (!this.props.allowAnyClick && typeof e.button === "number" && e.button !== 0) return false;
				const thisNode = this.findDOMNode();
				if (!thisNode || !thisNode.ownerDocument || !thisNode.ownerDocument.body) throw new Error("<DraggableCore> not mounted on DragStart!");
				const { ownerDocument } = thisNode;
				if (this.props.disabled || !(e.target instanceof ownerDocument.defaultView.Node) || this.props.handle && !(0, _domFns.matchesSelectorAndParentsTo)(e.target, this.props.handle, thisNode) || this.props.cancel && (0, _domFns.matchesSelectorAndParentsTo)(e.target, this.props.cancel, thisNode)) return;
				if (e.type === "touchstart" && !this.props.allowMobileScroll) e.preventDefault();
				const touchIdentifier = (0, _domFns.getTouchIdentifier)(e);
				this.touchIdentifier = touchIdentifier;
				const position = (0, _positionFns.getControlPosition)(e, touchIdentifier, this);
				if (position == null) return;
				const { x, y } = position;
				const coreEvent = (0, _positionFns.createCoreData)(this, x, y);
				(0, _log.default)("DraggableCore: handleDragStart: %j", coreEvent);
				(0, _log.default)("calling", this.props.onStart);
				if (this.props.onStart(e, coreEvent) === false || this.mounted === false) return;
				if (this.props.enableUserSelectHack) (0, _domFns.addUserSelectStyles)(ownerDocument);
				this.dragging = true;
				this.lastX = x;
				this.lastY = y;
				(0, _domFns.addEvent)(ownerDocument, dragEventFor.move, this.handleDrag);
				(0, _domFns.addEvent)(ownerDocument, dragEventFor.stop, this.handleDragStop);
			});
			_defineProperty(this, "handleDrag", (e) => {
				const position = (0, _positionFns.getControlPosition)(e, this.touchIdentifier, this);
				if (position == null) return;
				let { x, y } = position;
				if (Array.isArray(this.props.grid)) {
					let deltaX = x - this.lastX, deltaY = y - this.lastY;
					[deltaX, deltaY] = (0, _positionFns.snapToGrid)(this.props.grid, deltaX, deltaY);
					if (!deltaX && !deltaY) return;
					x = this.lastX + deltaX, y = this.lastY + deltaY;
				}
				const coreEvent = (0, _positionFns.createCoreData)(this, x, y);
				(0, _log.default)("DraggableCore: handleDrag: %j", coreEvent);
				if (this.props.onDrag(e, coreEvent) === false || this.mounted === false) {
					try {
						this.handleDragStop(new MouseEvent("mouseup"));
					} catch (err) {
						const event = document.createEvent("MouseEvents");
						event.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
						this.handleDragStop(event);
					}
					return;
				}
				this.lastX = x;
				this.lastY = y;
			});
			_defineProperty(this, "handleDragStop", (e) => {
				if (!this.dragging) return;
				const position = (0, _positionFns.getControlPosition)(e, this.touchIdentifier, this);
				if (position == null) return;
				let { x, y } = position;
				if (Array.isArray(this.props.grid)) {
					let deltaX = x - this.lastX || 0;
					let deltaY = y - this.lastY || 0;
					[deltaX, deltaY] = (0, _positionFns.snapToGrid)(this.props.grid, deltaX, deltaY);
					x = this.lastX + deltaX, y = this.lastY + deltaY;
				}
				const coreEvent = (0, _positionFns.createCoreData)(this, x, y);
				if (this.props.onStop(e, coreEvent) === false || this.mounted === false) return false;
				const thisNode = this.findDOMNode();
				if (thisNode) {
					if (this.props.enableUserSelectHack) (0, _domFns.scheduleRemoveUserSelectStyles)(thisNode.ownerDocument);
				}
				(0, _log.default)("DraggableCore: handleDragStop: %j", coreEvent);
				this.dragging = false;
				this.lastX = NaN;
				this.lastY = NaN;
				if (thisNode) {
					(0, _log.default)("DraggableCore: Removing handlers");
					(0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.move, this.handleDrag);
					(0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.stop, this.handleDragStop);
				}
			});
			_defineProperty(this, "onMouseDown", (e) => {
				dragEventFor = eventsFor.mouse;
				return this.handleDragStart(e);
			});
			_defineProperty(this, "onMouseUp", (e) => {
				dragEventFor = eventsFor.mouse;
				return this.handleDragStop(e);
			});
			_defineProperty(this, "onTouchStart", (e) => {
				dragEventFor = eventsFor.touch;
				return this.handleDragStart(e);
			});
			_defineProperty(this, "onTouchEnd", (e) => {
				dragEventFor = eventsFor.touch;
				return this.handleDragStop(e);
			});
		}
		componentDidMount() {
			this.mounted = true;
			const thisNode = this.findDOMNode();
			if (thisNode) (0, _domFns.addEvent)(thisNode, eventsFor.touch.start, this.onTouchStart, { passive: false });
		}
		componentWillUnmount() {
			this.mounted = false;
			const thisNode = this.findDOMNode();
			if (thisNode) {
				const { ownerDocument } = thisNode;
				(0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.move, this.handleDrag);
				(0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.move, this.handleDrag);
				(0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.stop, this.handleDragStop);
				(0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.stop, this.handleDragStop);
				(0, _domFns.removeEvent)(thisNode, eventsFor.touch.start, this.onTouchStart, { passive: false });
				if (this.props.enableUserSelectHack) (0, _domFns.scheduleRemoveUserSelectStyles)(ownerDocument);
			}
		}
		findDOMNode() {
			return this.props?.nodeRef ? this.props?.nodeRef?.current : _reactDom.default.findDOMNode(this);
		}
		render() {
			return /* @__PURE__ */ React.cloneElement(React.Children.only(this.props.children), {
				onMouseDown: this.onMouseDown,
				onMouseUp: this.onMouseUp,
				onTouchEnd: this.onTouchEnd
			});
		}
	};
	exports.default = DraggableCore;
	_defineProperty(DraggableCore, "displayName", "DraggableCore");
	_defineProperty(DraggableCore, "propTypes", {
		/**
		* `allowAnyClick` allows dragging using any mouse button.
		* By default, we only accept the left button.
		*
		* Defaults to `false`.
		*/
		allowAnyClick: _propTypes.default.bool,
		/**
		* `allowMobileScroll` turns off cancellation of the 'touchstart' event
		* on mobile devices. Only enable this if you are having trouble with click
		* events. Prefer using 'handle' / 'cancel' instead.
		*
		* Defaults to `false`.
		*/
		allowMobileScroll: _propTypes.default.bool,
		children: _propTypes.default.node.isRequired,
		/**
		* `disabled`, if true, stops the <Draggable> from dragging. All handlers,
		* with the exception of `onMouseDown`, will not fire.
		*/
		disabled: _propTypes.default.bool,
		/**
		* By default, we add 'user-select:none' attributes to the document body
		* to prevent ugly text selection during drag. If this is causing problems
		* for your app, set this to `false`.
		*/
		enableUserSelectHack: _propTypes.default.bool,
		/**
		* `offsetParent`, if set, uses the passed DOM node to compute drag offsets
		* instead of using the parent node.
		*/
		offsetParent: function(props, propName) {
			if (props[propName] && props[propName].nodeType !== 1) throw new Error("Draggable's offsetParent must be a DOM Node.");
		},
		/**
		* `grid` specifies the x and y that dragging should snap to.
		*/
		grid: _propTypes.default.arrayOf(_propTypes.default.number),
		/**
		* `handle` specifies a selector to be used as the handle that initiates drag.
		*
		* Example:
		*
		* ```jsx
		*   let App = React.createClass({
		*       render: function () {
		*         return (
		*            <Draggable handle=".handle">
		*              <div>
		*                  <div className="handle">Click me to drag</div>
		*                  <div>This is some other content</div>
		*              </div>
		*           </Draggable>
		*         );
		*       }
		*   });
		* ```
		*/
		handle: _propTypes.default.string,
		/**
		* `cancel` specifies a selector to be used to prevent drag initialization.
		*
		* Example:
		*
		* ```jsx
		*   let App = React.createClass({
		*       render: function () {
		*           return(
		*               <Draggable cancel=".cancel">
		*                   <div>
		*                     <div className="cancel">You can't drag from here</div>
		*                     <div>Dragging here works fine</div>
		*                   </div>
		*               </Draggable>
		*           );
		*       }
		*   });
		* ```
		*/
		cancel: _propTypes.default.string,
		nodeRef: _propTypes.default.object,
		/**
		* Called when dragging starts.
		* If this function returns the boolean false, dragging will be canceled.
		*/
		onStart: _propTypes.default.func,
		/**
		* Called while dragging.
		* If this function returns the boolean false, dragging will be canceled.
		*/
		onDrag: _propTypes.default.func,
		/**
		* Called when dragging stops.
		* If this function returns the boolean false, the drag will remain active.
		*/
		onStop: _propTypes.default.func,
		/**
		* A workaround option which can be passed if onMouseDown needs to be accessed,
		* since it'll always be blocked (as there is internal use of onMouseDown)
		*/
		onMouseDown: _propTypes.default.func,
		/**
		* `scale`, if set, applies scaling while dragging an element
		*/
		scale: _propTypes.default.number,
		/**
		* These properties should be defined on the child, not here.
		*/
		className: _shims.dontSetMe,
		style: _shims.dontSetMe,
		transform: _shims.dontSetMe
	});
	_defineProperty(DraggableCore, "defaultProps", {
		allowAnyClick: false,
		allowMobileScroll: false,
		disabled: false,
		enableUserSelectHack: true,
		onStart: function() {},
		onDrag: function() {},
		onStop: function() {},
		onMouseDown: function() {},
		scale: 1
	});
}));
//#endregion
//#region node_modules/react-draggable/build/cjs/Draggable.js
var require_Draggable = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "DraggableCore", {
		enumerable: true,
		get: function() {
			return _DraggableCore.default;
		}
	});
	exports.default = void 0;
	var React = _interopRequireWildcard(require_react());
	var _propTypes = _interopRequireDefault(require_prop_types());
	var _reactDom = _interopRequireDefault(require_react_dom());
	var _clsx = require_clsx();
	var _domFns = require_domFns();
	var _positionFns = require_positionFns();
	var _shims = require_shims();
	var _DraggableCore = _interopRequireDefault(require_DraggableCore());
	var _log = _interopRequireDefault(require_log());
	function _interopRequireDefault(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function _interopRequireWildcard(e, t) {
		if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
		return (_interopRequireWildcard = function(e, t) {
			if (!t && e && e.__esModule) return e;
			var o, i, f = {
				__proto__: null,
				default: e
			};
			if (null === e || "object" != typeof e && "function" != typeof e) return f;
			if (o = t ? n : r) {
				if (o.has(e)) return o.get(e);
				o.set(e, f);
			}
			for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]);
			return f;
		})(e, t);
	}
	function _extends() {
		return _extends = Object.assign ? Object.assign.bind() : function(n) {
			for (var e = 1; e < arguments.length; e++) {
				var t = arguments[e];
				for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
			}
			return n;
		}, _extends.apply(null, arguments);
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == typeof i ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != typeof t || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != typeof i) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	var Draggable = class extends React.Component {
		static getDerivedStateFromProps(_ref, _ref2) {
			let { position } = _ref;
			let { prevPropsPosition } = _ref2;
			if (position && (!prevPropsPosition || position.x !== prevPropsPosition.x || position.y !== prevPropsPosition.y)) {
				(0, _log.default)("Draggable: getDerivedStateFromProps %j", {
					position,
					prevPropsPosition
				});
				return {
					x: position.x,
					y: position.y,
					prevPropsPosition: { ...position }
				};
			}
			return null;
		}
		constructor(props) {
			super(props);
			_defineProperty(this, "onDragStart", (e, coreData) => {
				(0, _log.default)("Draggable: onDragStart: %j", coreData);
				if (this.props.onStart(e, (0, _positionFns.createDraggableData)(this, coreData)) === false) return false;
				this.setState({
					dragging: true,
					dragged: true
				});
			});
			_defineProperty(this, "onDrag", (e, coreData) => {
				if (!this.state.dragging) return false;
				(0, _log.default)("Draggable: onDrag: %j", coreData);
				const uiData = (0, _positionFns.createDraggableData)(this, coreData);
				const newState = {
					x: uiData.x,
					y: uiData.y,
					slackX: 0,
					slackY: 0
				};
				if (this.props.bounds) {
					const { x, y } = newState;
					newState.x += this.state.slackX;
					newState.y += this.state.slackY;
					const [newStateX, newStateY] = (0, _positionFns.getBoundPosition)(this, newState.x, newState.y);
					newState.x = newStateX;
					newState.y = newStateY;
					newState.slackX = this.state.slackX + (x - newState.x);
					newState.slackY = this.state.slackY + (y - newState.y);
					uiData.x = newState.x;
					uiData.y = newState.y;
					uiData.deltaX = newState.x - this.state.x;
					uiData.deltaY = newState.y - this.state.y;
				}
				if (this.props.onDrag(e, uiData) === false) return false;
				this.setState(newState);
			});
			_defineProperty(this, "onDragStop", (e, coreData) => {
				if (!this.state.dragging) return false;
				if (this.props.onStop(e, (0, _positionFns.createDraggableData)(this, coreData)) === false) return false;
				(0, _log.default)("Draggable: onDragStop: %j", coreData);
				const newState = {
					dragging: false,
					slackX: 0,
					slackY: 0
				};
				if (Boolean(this.props.position)) {
					const { x, y } = this.props.position;
					newState.x = x;
					newState.y = y;
				}
				this.setState(newState);
			});
			this.state = {
				dragging: false,
				dragged: false,
				x: props.position ? props.position.x : props.defaultPosition.x,
				y: props.position ? props.position.y : props.defaultPosition.y,
				prevPropsPosition: { ...props.position },
				slackX: 0,
				slackY: 0,
				isElementSVG: false
			};
			if (props.position && !(props.onDrag || props.onStop)) console.warn("A `position` was applied to this <Draggable>, without drag handlers. This will make this component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the `position` of this element.");
		}
		componentDidMount() {
			if (typeof window.SVGElement !== "undefined" && this.findDOMNode() instanceof window.SVGElement) this.setState({ isElementSVG: true });
		}
		componentWillUnmount() {
			if (this.state.dragging) this.setState({ dragging: false });
		}
		findDOMNode() {
			return this.props?.nodeRef?.current ?? _reactDom.default.findDOMNode(this);
		}
		render() {
			const { axis, bounds, children, defaultPosition, defaultClassName, defaultClassNameDragging, defaultClassNameDragged, position, positionOffset, scale, ...draggableCoreProps } = this.props;
			let style = {};
			let svgTransform = null;
			const draggable = !Boolean(position) || this.state.dragging;
			const validPosition = position || defaultPosition;
			const transformOpts = {
				x: (0, _positionFns.canDragX)(this) && draggable ? this.state.x : validPosition.x,
				y: (0, _positionFns.canDragY)(this) && draggable ? this.state.y : validPosition.y
			};
			if (this.state.isElementSVG) svgTransform = (0, _domFns.createSVGTransform)(transformOpts, positionOffset);
			else style = (0, _domFns.createCSSTransform)(transformOpts, positionOffset);
			const className = (0, _clsx.clsx)(children.props.className || "", defaultClassName, {
				[defaultClassNameDragging]: this.state.dragging,
				[defaultClassNameDragged]: this.state.dragged
			});
			return /* @__PURE__ */ React.createElement(_DraggableCore.default, _extends({}, draggableCoreProps, {
				onStart: this.onDragStart,
				onDrag: this.onDrag,
				onStop: this.onDragStop
			}), /* @__PURE__ */ React.cloneElement(React.Children.only(children), {
				className,
				style: {
					...children.props.style,
					...style
				},
				transform: svgTransform
			}));
		}
	};
	exports.default = Draggable;
	_defineProperty(Draggable, "displayName", "Draggable");
	_defineProperty(Draggable, "propTypes", {
		..._DraggableCore.default.propTypes,
		/**
		* `axis` determines which axis the draggable can move.
		*
		*  Note that all callbacks will still return data as normal. This only
		*  controls flushing to the DOM.
		*
		* 'both' allows movement horizontally and vertically.
		* 'x' limits movement to horizontal axis.
		* 'y' limits movement to vertical axis.
		* 'none' limits all movement.
		*
		* Defaults to 'both'.
		*/
		axis: _propTypes.default.oneOf([
			"both",
			"x",
			"y",
			"none"
		]),
		/**
		* `bounds` determines the range of movement available to the element.
		* Available values are:
		*
		* 'parent' restricts movement within the Draggable's parent node.
		*
		* Alternatively, pass an object with the following properties, all of which are optional:
		*
		* {left: LEFT_BOUND, right: RIGHT_BOUND, bottom: BOTTOM_BOUND, top: TOP_BOUND}
		*
		* All values are in px.
		*
		* Example:
		*
		* ```jsx
		*   let App = React.createClass({
		*       render: function () {
		*         return (
		*            <Draggable bounds={{right: 300, bottom: 300}}>
		*              <div>Content</div>
		*           </Draggable>
		*         );
		*       }
		*   });
		* ```
		*/
		bounds: _propTypes.default.oneOfType([
			_propTypes.default.shape({
				left: _propTypes.default.number,
				right: _propTypes.default.number,
				top: _propTypes.default.number,
				bottom: _propTypes.default.number
			}),
			_propTypes.default.string,
			_propTypes.default.oneOf([false])
		]),
		defaultClassName: _propTypes.default.string,
		defaultClassNameDragging: _propTypes.default.string,
		defaultClassNameDragged: _propTypes.default.string,
		/**
		* `defaultPosition` specifies the x and y that the dragged item should start at
		*
		* Example:
		*
		* ```jsx
		*      let App = React.createClass({
		*          render: function () {
		*              return (
		*                  <Draggable defaultPosition={{x: 25, y: 25}}>
		*                      <div>I start with transformX: 25px and transformY: 25px;</div>
		*                  </Draggable>
		*              );
		*          }
		*      });
		* ```
		*/
		defaultPosition: _propTypes.default.shape({
			x: _propTypes.default.number,
			y: _propTypes.default.number
		}),
		positionOffset: _propTypes.default.shape({
			x: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
			y: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
		}),
		/**
		* `position`, if present, defines the current position of the element.
		*
		*  This is similar to how form elements in React work - if no `position` is supplied, the component
		*  is uncontrolled.
		*
		* Example:
		*
		* ```jsx
		*      let App = React.createClass({
		*          render: function () {
		*              return (
		*                  <Draggable position={{x: 25, y: 25}}>
		*                      <div>I start with transformX: 25px and transformY: 25px;</div>
		*                  </Draggable>
		*              );
		*          }
		*      });
		* ```
		*/
		position: _propTypes.default.shape({
			x: _propTypes.default.number,
			y: _propTypes.default.number
		}),
		/**
		* These properties should be defined on the child, not here.
		*/
		className: _shims.dontSetMe,
		style: _shims.dontSetMe,
		transform: _shims.dontSetMe
	});
	_defineProperty(Draggable, "defaultProps", {
		..._DraggableCore.default.defaultProps,
		axis: "both",
		bounds: false,
		defaultClassName: "react-draggable",
		defaultClassNameDragging: "react-draggable-dragging",
		defaultClassNameDragged: "react-draggable-dragged",
		defaultPosition: {
			x: 0,
			y: 0
		},
		scale: 1
	});
}));
//#endregion
//#region node_modules/react-draggable/build/cjs/cjs.js
var require_cjs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { default: Draggable, DraggableCore } = require_Draggable();
	module.exports = Draggable;
	module.exports.default = Draggable;
	module.exports.DraggableCore = DraggableCore;
}));
//#endregion
//#region node_modules/react-resizable/build/utils.js
var require_utils = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	exports.cloneElement = cloneElement;
	var _react = _interopRequireDefault(require_react());
	function _interopRequireDefault(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == typeof i ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != typeof t || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != typeof i) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	function cloneElement(element, props) {
		if (props.style && element.props.style) props.style = _objectSpread(_objectSpread({}, element.props.style), props.style);
		if (props.className && element.props.className) props.className = element.props.className + " " + props.className;
		return /* @__PURE__ */ _react.default.cloneElement(element, props);
	}
}));
//#endregion
//#region node_modules/react-resizable/build/propTypes.js
var require_propTypes = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	exports.resizableProps = void 0;
	var _propTypes = _interopRequireDefault(require_prop_types());
	require_cjs();
	function _interopRequireDefault(e) {
		return e && e.__esModule ? e : { default: e };
	}
	exports.resizableProps = {
		axis: _propTypes.default.oneOf([
			"both",
			"x",
			"y",
			"none"
		]),
		className: _propTypes.default.string,
		children: _propTypes.default.element.isRequired,
		draggableOpts: _propTypes.default.shape({
			allowAnyClick: _propTypes.default.bool,
			cancel: _propTypes.default.string,
			children: _propTypes.default.node,
			disabled: _propTypes.default.bool,
			enableUserSelectHack: _propTypes.default.bool,
			offsetParent: typeof Element !== "undefined" ? _propTypes.default.instanceOf(Element) : _propTypes.default.any,
			grid: _propTypes.default.arrayOf(_propTypes.default.number),
			handle: _propTypes.default.string,
			nodeRef: _propTypes.default.object,
			onStart: _propTypes.default.func,
			onDrag: _propTypes.default.func,
			onStop: _propTypes.default.func,
			onMouseDown: _propTypes.default.func,
			scale: _propTypes.default.number
		}),
		height: function() {
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
			const props = args[0];
			if (props.axis === "both" || props.axis === "y") return _propTypes.default.number.isRequired(...args);
			return _propTypes.default.number(...args);
		},
		handle: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
		handleSize: _propTypes.default.arrayOf(_propTypes.default.number),
		lockAspectRatio: _propTypes.default.bool,
		maxConstraints: _propTypes.default.arrayOf(_propTypes.default.number),
		minConstraints: _propTypes.default.arrayOf(_propTypes.default.number),
		onResizeStop: _propTypes.default.func,
		onResizeStart: _propTypes.default.func,
		onResize: _propTypes.default.func,
		resizeHandles: _propTypes.default.arrayOf(_propTypes.default.oneOf([
			"s",
			"w",
			"e",
			"n",
			"sw",
			"nw",
			"se",
			"ne"
		])),
		transformScale: _propTypes.default.number,
		width: function() {
			for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
			const props = args[0];
			if (props.axis === "both" || props.axis === "x") return _propTypes.default.number.isRequired(...args);
			return _propTypes.default.number(...args);
		}
	};
}));
//#endregion
//#region node_modules/react-resizable/build/Resizable.js
var require_Resizable = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	exports.default = void 0;
	var React = _interopRequireWildcard(require_react());
	var _reactDraggable = require_cjs();
	var _utils = require_utils();
	var _propTypes = require_propTypes();
	var _excluded = [
		"children",
		"className",
		"draggableOpts",
		"width",
		"height",
		"handle",
		"handleSize",
		"lockAspectRatio",
		"axis",
		"minConstraints",
		"maxConstraints",
		"onResize",
		"onResizeStop",
		"onResizeStart",
		"resizeHandles",
		"transformScale"
	];
	function _interopRequireWildcard(e, t) {
		if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
		return (_interopRequireWildcard = function(e, t) {
			if (!t && e && e.__esModule) return e;
			var o, i, f = {
				__proto__: null,
				default: e
			};
			if (null === e || "object" != typeof e && "function" != typeof e) return f;
			if (o = t ? n : r) {
				if (o.has(e)) return o.get(e);
				o.set(e, f);
			}
			for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]);
			return f;
		})(e, t);
	}
	function _extends() {
		return _extends = Object.assign ? Object.assign.bind() : function(n) {
			for (var e = 1; e < arguments.length; e++) {
				var t = arguments[e];
				for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
			}
			return n;
		}, _extends.apply(null, arguments);
	}
	function _objectWithoutPropertiesLoose(r, e) {
		if (null == r) return {};
		var t = {};
		for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
			if (-1 !== e.indexOf(n)) continue;
			t[n] = r[n];
		}
		return t;
	}
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == typeof i ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != typeof t || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != typeof i) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	var Resizable = class extends React.Component {
		constructor() {
			super(...arguments);
			this.handleRefs = {};
			this.lastHandleRect = null;
			this.slack = null;
			this.lastSize = null;
		}
		componentWillUnmount() {
			this.resetData();
		}
		resetData() {
			this.lastHandleRect = this.slack = this.lastSize = null;
		}
		runConstraints(width, height) {
			const _this$props = this.props, minConstraints = _this$props.minConstraints, maxConstraints = _this$props.maxConstraints, lockAspectRatio = _this$props.lockAspectRatio;
			if (!minConstraints && !maxConstraints && !lockAspectRatio) return [width, height];
			if (lockAspectRatio) {
				const ratio = this.props.width / this.props.height;
				const deltaW = width - this.props.width;
				const deltaH = height - this.props.height;
				if (Math.abs(deltaW) > Math.abs(deltaH * ratio)) height = width / ratio;
				else width = height * ratio;
			}
			const oldW = width, oldH = height;
			let _ref = this.slack || [0, 0], slackW = _ref[0], slackH = _ref[1];
			width += slackW;
			height += slackH;
			if (minConstraints) {
				width = Math.max(minConstraints[0], width);
				height = Math.max(minConstraints[1], height);
			}
			if (maxConstraints) {
				width = Math.min(maxConstraints[0], width);
				height = Math.min(maxConstraints[1], height);
			}
			this.slack = [slackW + (oldW - width), slackH + (oldH - height)];
			return [width, height];
		}
		/**
		* Wrapper around drag events to provide more useful data.
		*
		* @param  {String} handlerName Handler name to wrap.
		* @return {Function}           Handler function.
		*/
		resizeHandler(handlerName, axis) {
			return (e, _ref2) => {
				var _this$lastSize$width, _this$lastSize, _this$lastSize$height, _this$lastSize2;
				let node = _ref2.node, deltaX = _ref2.deltaX, deltaY = _ref2.deltaY;
				if (handlerName === "onResizeStart") this.resetData();
				const canDragX = (this.props.axis === "both" || this.props.axis === "x") && axis !== "n" && axis !== "s";
				const canDragY = (this.props.axis === "both" || this.props.axis === "y") && axis !== "e" && axis !== "w";
				if (!canDragX && !canDragY) return;
				const axisV = axis[0];
				const axisH = axis[axis.length - 1];
				const handleRect = node.getBoundingClientRect();
				if (this.lastHandleRect != null) {
					if (axisH === "w") {
						const deltaLeftSinceLast = handleRect.left - this.lastHandleRect.left;
						deltaX += deltaLeftSinceLast;
					}
					if (axisV === "n") {
						const deltaTopSinceLast = handleRect.top - this.lastHandleRect.top;
						deltaY += deltaTopSinceLast;
					}
				}
				this.lastHandleRect = handleRect;
				if (axisH === "w") deltaX = -deltaX;
				if (axisV === "n") deltaY = -deltaY;
				const baseWidth = (_this$lastSize$width = (_this$lastSize = this.lastSize) == null ? void 0 : _this$lastSize.width) != null ? _this$lastSize$width : this.props.width;
				const baseHeight = (_this$lastSize$height = (_this$lastSize2 = this.lastSize) == null ? void 0 : _this$lastSize2.height) != null ? _this$lastSize$height : this.props.height;
				let width = baseWidth + (canDragX ? deltaX / this.props.transformScale : 0);
				let height = baseHeight + (canDragY ? deltaY / this.props.transformScale : 0);
				var _this$runConstraints = this.runConstraints(width, height);
				width = _this$runConstraints[0];
				height = _this$runConstraints[1];
				if (handlerName === "onResizeStop" && this.lastSize) {
					var _this$lastSize3 = this.lastSize;
					width = _this$lastSize3.width;
					height = _this$lastSize3.height;
				}
				const dimensionsChanged = width !== baseWidth || height !== baseHeight;
				if (handlerName !== "onResizeStop") this.lastSize = {
					width,
					height
				};
				const cb = typeof this.props[handlerName] === "function" ? this.props[handlerName] : null;
				if (cb && !(handlerName === "onResize" && !dimensionsChanged)) {
					e.persist == null || e.persist();
					cb(e, {
						node,
						size: {
							width,
							height
						},
						handle: axis
					});
				}
				if (handlerName === "onResizeStop") this.resetData();
			};
		}
		renderResizeHandle(handleAxis, ref) {
			const handle = this.props.handle;
			if (!handle) return /* @__PURE__ */ React.createElement("span", {
				className: "react-resizable-handle react-resizable-handle-" + handleAxis,
				ref
			});
			if (typeof handle === "function") return handle(handleAxis, ref);
			const isDOMElement = typeof handle.type === "string";
			const props = _objectSpread({ ref }, isDOMElement ? {} : { handleAxis });
			return /* @__PURE__ */ React.cloneElement(handle, props);
		}
		render() {
			const _this$props2 = this.props, children = _this$props2.children, className = _this$props2.className, draggableOpts = _this$props2.draggableOpts;
			_this$props2.width;
			_this$props2.height;
			_this$props2.handle;
			_this$props2.handleSize;
			_this$props2.lockAspectRatio;
			_this$props2.axis;
			_this$props2.minConstraints;
			_this$props2.maxConstraints;
			_this$props2.onResize;
			_this$props2.onResizeStop;
			_this$props2.onResizeStart;
			const resizeHandles = _this$props2.resizeHandles;
			_this$props2.transformScale;
			const p = _objectWithoutPropertiesLoose(_this$props2, _excluded);
			return (0, _utils.cloneElement)(children, _objectSpread(_objectSpread({}, p), {}, {
				className: (className ? className + " " : "") + "react-resizable",
				children: [...React.Children.toArray(children.props.children), ...resizeHandles.map((handleAxis) => {
					var _this$handleRefs$hand;
					const ref = (_this$handleRefs$hand = this.handleRefs[handleAxis]) != null ? _this$handleRefs$hand : this.handleRefs[handleAxis] = /* @__PURE__ */ React.createRef();
					return /* @__PURE__ */ React.createElement(_reactDraggable.DraggableCore, _extends({}, draggableOpts, {
						nodeRef: ref,
						key: "resizableHandle-" + handleAxis,
						onStop: this.resizeHandler("onResizeStop", handleAxis),
						onStart: this.resizeHandler("onResizeStart", handleAxis),
						onDrag: this.resizeHandler("onResize", handleAxis)
					}), this.renderResizeHandle(handleAxis, ref));
				})]
			}));
		}
	};
	exports.default = Resizable;
	Resizable.propTypes = _propTypes.resizableProps;
	Resizable.defaultProps = {
		axis: "both",
		handleSize: [20, 20],
		lockAspectRatio: false,
		minConstraints: [20, 20],
		maxConstraints: [Infinity, Infinity],
		resizeHandles: ["se"],
		transformScale: 1
	};
}));
//#endregion
//#region node_modules/react-resizable/build/ResizableBox.js
var require_ResizableBox = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	exports.default = void 0;
	var React = _interopRequireWildcard(require_react());
	var _propTypes = _interopRequireDefault(require_prop_types());
	var _Resizable = _interopRequireDefault(require_Resizable());
	var _propTypes2 = require_propTypes();
	var _excluded = [
		"handle",
		"handleSize",
		"onResize",
		"onResizeStart",
		"onResizeStop",
		"draggableOpts",
		"minConstraints",
		"maxConstraints",
		"lockAspectRatio",
		"axis",
		"width",
		"height",
		"resizeHandles",
		"style",
		"transformScale"
	];
	function _interopRequireDefault(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function _interopRequireWildcard(e, t) {
		if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
		return (_interopRequireWildcard = function(e, t) {
			if (!t && e && e.__esModule) return e;
			var o, i, f = {
				__proto__: null,
				default: e
			};
			if (null === e || "object" != typeof e && "function" != typeof e) return f;
			if (o = t ? n : r) {
				if (o.has(e)) return o.get(e);
				o.set(e, f);
			}
			for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]);
			return f;
		})(e, t);
	}
	function _extends() {
		return _extends = Object.assign ? Object.assign.bind() : function(n) {
			for (var e = 1; e < arguments.length; e++) {
				var t = arguments[e];
				for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
			}
			return n;
		}, _extends.apply(null, arguments);
	}
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == typeof i ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != typeof t || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != typeof i) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	function _objectWithoutPropertiesLoose(r, e) {
		if (null == r) return {};
		var t = {};
		for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
			if (-1 !== e.indexOf(n)) continue;
			t[n] = r[n];
		}
		return t;
	}
	var ResizableBox = class extends React.Component {
		constructor() {
			super(...arguments);
			this.state = {
				width: this.props.width,
				height: this.props.height,
				propsWidth: this.props.width,
				propsHeight: this.props.height
			};
			this.onResize = (e, data) => {
				const size = data.size;
				if (this.props.onResize) {
					e.persist == null || e.persist();
					this.setState(size, () => this.props.onResize && this.props.onResize(e, data));
				} else this.setState(size);
			};
		}
		static getDerivedStateFromProps(props, state) {
			if (state.propsWidth !== props.width || state.propsHeight !== props.height) return {
				width: props.width,
				height: props.height,
				propsWidth: props.width,
				propsHeight: props.height
			};
			return null;
		}
		render() {
			const _this$props = this.props, handle = _this$props.handle, handleSize = _this$props.handleSize;
			_this$props.onResize;
			const onResizeStart = _this$props.onResizeStart, onResizeStop = _this$props.onResizeStop, draggableOpts = _this$props.draggableOpts, minConstraints = _this$props.minConstraints, maxConstraints = _this$props.maxConstraints, lockAspectRatio = _this$props.lockAspectRatio, axis = _this$props.axis;
			_this$props.width;
			_this$props.height;
			const resizeHandles = _this$props.resizeHandles, style = _this$props.style, transformScale = _this$props.transformScale, props = _objectWithoutPropertiesLoose(_this$props, _excluded);
			return /* @__PURE__ */ React.createElement(_Resizable.default, {
				axis,
				draggableOpts,
				handle,
				handleSize,
				height: this.state.height,
				lockAspectRatio,
				maxConstraints,
				minConstraints,
				onResizeStart,
				onResize: this.onResize,
				onResizeStop,
				resizeHandles,
				transformScale,
				width: this.state.width
			}, /* @__PURE__ */ React.createElement("div", _extends({}, props, { style: _objectSpread(_objectSpread({}, style), {}, {
				width: this.state.width + "px",
				height: this.state.height + "px"
			}) })));
		}
	};
	exports.default = ResizableBox;
	ResizableBox.propTypes = _objectSpread(_objectSpread({}, _propTypes2.resizableProps), {}, { children: _propTypes.default.element });
}));
//#endregion
//#region node_modules/react-resizable/index.js
var require_react_resizable = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function() {
		throw new Error("Don't instantiate Resizable directly! Use require('react-resizable').Resizable");
	};
	module.exports.Resizable = require_Resizable().default;
	module.exports.ResizableBox = require_ResizableBox().default;
}));
//#endregion
//#region node_modules/react-grid-layout/build/ReactGridLayoutPropTypes.js
var require_ReactGridLayoutPropTypes = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.resizeHandleType = exports.resizeHandleAxesType = exports.default = void 0;
	var _propTypes = _interopRequireDefault(require_prop_types());
	var _react = _interopRequireDefault(require_react());
	function _interopRequireDefault(e) {
		return e && e.__esModule ? e : { default: e };
	}
	var resizeHandleAxesType = exports.resizeHandleAxesType = _propTypes.default.arrayOf(_propTypes.default.oneOf([
		"s",
		"w",
		"e",
		"n",
		"sw",
		"nw",
		"se",
		"ne"
	]));
	var resizeHandleType = exports.resizeHandleType = _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]);
	exports.default = {
		className: _propTypes.default.string,
		style: _propTypes.default.object,
		width: _propTypes.default.number,
		autoSize: _propTypes.default.bool,
		cols: _propTypes.default.number,
		draggableCancel: _propTypes.default.string,
		draggableHandle: _propTypes.default.string,
		verticalCompact: function(props) {
			if (props.verticalCompact === false && true) console.warn("`verticalCompact` on <ReactGridLayout> is deprecated and will be removed soon. Use `compactType`: \"horizontal\" | \"vertical\" | null.");
		},
		compactType: _propTypes.default.oneOf(["vertical", "horizontal"]),
		layout: function(props) {
			var layout = props.layout;
			if (layout === void 0) return;
			require_utils$1().validateLayout(layout, "layout");
		},
		margin: _propTypes.default.arrayOf(_propTypes.default.number),
		containerPadding: _propTypes.default.arrayOf(_propTypes.default.number),
		rowHeight: _propTypes.default.number,
		maxRows: _propTypes.default.number,
		isBounded: _propTypes.default.bool,
		isDraggable: _propTypes.default.bool,
		isResizable: _propTypes.default.bool,
		allowOverlap: _propTypes.default.bool,
		preventCollision: _propTypes.default.bool,
		useCSSTransforms: _propTypes.default.bool,
		transformScale: _propTypes.default.number,
		isDroppable: _propTypes.default.bool,
		resizeHandles: resizeHandleAxesType,
		resizeHandle: resizeHandleType,
		onLayoutChange: _propTypes.default.func,
		onDragStart: _propTypes.default.func,
		onDrag: _propTypes.default.func,
		onDragStop: _propTypes.default.func,
		onResizeStart: _propTypes.default.func,
		onResize: _propTypes.default.func,
		onResizeStop: _propTypes.default.func,
		onDrop: _propTypes.default.func,
		droppingItem: _propTypes.default.shape({
			i: _propTypes.default.string.isRequired,
			w: _propTypes.default.number.isRequired,
			h: _propTypes.default.number.isRequired
		}),
		children: function(props, propName) {
			const children = props[propName];
			const keys = {};
			_react.default.Children.forEach(children, function(child) {
				if ((child === null || child === void 0 ? void 0 : child.key) == null) return;
				if (keys[child.key]) throw new Error("Duplicate child key \"" + child.key + "\" found! This will cause problems in ReactGridLayout.");
				keys[child.key] = true;
			});
		},
		innerRef: _propTypes.default.any
	};
}));
//#endregion
//#region node_modules/react-grid-layout/build/GridItem.js
var require_GridItem = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _react = _interopRequireDefault(require_react());
	var _reactDom = require_react_dom();
	var _propTypes = _interopRequireDefault(require_prop_types());
	var _reactDraggable = require_cjs();
	var _reactResizable = require_react_resizable();
	var _utils = require_utils$1();
	var _calculateUtils = require_calculateUtils();
	var _ReactGridLayoutPropTypes = require_ReactGridLayoutPropTypes();
	var _clsx = _interopRequireDefault(require_clsx());
	function _interopRequireDefault(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == typeof i ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != typeof t || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != typeof i) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	/**
	* An individual item within a ReactGridLayout.
	*/
	var GridItem = class extends _react.default.Component {
		constructor() {
			super(...arguments);
			_defineProperty(this, "state", {
				resizing: null,
				dragging: null,
				className: ""
			});
			_defineProperty(this, "elementRef", /* @__PURE__ */ _react.default.createRef());
			/**
			* onDragStart event handler
			* @param  {Event}  e             event data
			* @param  {Object} callbackData  an object with node, delta and position information
			*/
			_defineProperty(this, "onDragStart", (e, _ref) => {
				let { node } = _ref;
				const { onDragStart, transformScale } = this.props;
				if (!onDragStart) return;
				const newPosition = {
					top: 0,
					left: 0
				};
				const { offsetParent } = node;
				if (!offsetParent) return;
				const parentRect = offsetParent.getBoundingClientRect();
				const clientRect = node.getBoundingClientRect();
				const cLeft = clientRect.left / transformScale;
				const pLeft = parentRect.left / transformScale;
				const cTop = clientRect.top / transformScale;
				const pTop = parentRect.top / transformScale;
				newPosition.left = cLeft - pLeft + offsetParent.scrollLeft;
				newPosition.top = cTop - pTop + offsetParent.scrollTop;
				this.setState({ dragging: newPosition });
				const { x, y } = (0, _calculateUtils.calcXY)(this.getPositionParams(), newPosition.top, newPosition.left, this.props.w, this.props.h);
				return onDragStart.call(this, this.props.i, x, y, {
					e,
					node,
					newPosition
				});
			});
			/**
			* onDrag event handler
			* @param  {Event}  e             event data
			* @param  {Object} callbackData  an object with node, delta and position information
			* @param  {boolean} dontFlush    if true, will not call flushSync
			*/
			_defineProperty(this, "onDrag", (e, _ref2, dontFlush) => {
				let { node, deltaX, deltaY } = _ref2;
				const { onDrag } = this.props;
				if (!onDrag) return;
				if (!this.state.dragging) throw new Error("onDrag called before onDragStart.");
				let top = this.state.dragging.top + deltaY;
				let left = this.state.dragging.left + deltaX;
				const { isBounded, i, w, h, containerWidth } = this.props;
				const positionParams = this.getPositionParams();
				if (isBounded) {
					const { offsetParent } = node;
					if (offsetParent) {
						const { margin, rowHeight } = this.props;
						const bottomBoundary = offsetParent.clientHeight - (0, _calculateUtils.calcGridItemWHPx)(h, rowHeight, margin[1]);
						top = (0, _calculateUtils.clamp)(top, 0, bottomBoundary);
						const colWidth = (0, _calculateUtils.calcGridColWidth)(positionParams);
						const rightBoundary = containerWidth - (0, _calculateUtils.calcGridItemWHPx)(w, colWidth, margin[0]);
						left = (0, _calculateUtils.clamp)(left, 0, rightBoundary);
					}
				}
				const newPosition = {
					top,
					left
				};
				if (dontFlush) this.setState({ dragging: newPosition });
				else (0, _reactDom.flushSync)(() => {
					this.setState({ dragging: newPosition });
				});
				const { x, y } = (0, _calculateUtils.calcXY)(positionParams, top, left, w, h);
				return onDrag.call(this, i, x, y, {
					e,
					node,
					newPosition
				});
			});
			/**
			* onDragStop event handler
			* @param  {Event}  e             event data
			* @param  {Object} callbackData  an object with node, delta and position information
			*/
			_defineProperty(this, "onDragStop", (e, _ref3) => {
				let { node } = _ref3;
				const { onDragStop } = this.props;
				if (!onDragStop) return;
				if (!this.state.dragging) throw new Error("onDragEnd called before onDragStart.");
				const { w, h, i } = this.props;
				const { left, top } = this.state.dragging;
				const newPosition = {
					top,
					left
				};
				this.setState({ dragging: null });
				const { x, y } = (0, _calculateUtils.calcXY)(this.getPositionParams(), top, left, w, h);
				return onDragStop.call(this, i, x, y, {
					e,
					node,
					newPosition
				});
			});
			/**
			* onResizeStop event handler
			* @param  {Event}  e             event data
			* @param  {Object} callbackData  an object with node and size information
			*/
			_defineProperty(this, "onResizeStop", (e, callbackData, position) => this.onResizeHandler(e, callbackData, position, "onResizeStop"));
			_defineProperty(this, "onResizeStart", (e, callbackData, position) => this.onResizeHandler(e, callbackData, position, "onResizeStart"));
			_defineProperty(this, "onResize", (e, callbackData, position) => this.onResizeHandler(e, callbackData, position, "onResize"));
		}
		shouldComponentUpdate(nextProps, nextState) {
			if (this.props.children !== nextProps.children) return true;
			if (this.props.droppingPosition !== nextProps.droppingPosition) return true;
			const oldPosition = (0, _calculateUtils.calcGridItemPosition)(this.getPositionParams(this.props), this.props.x, this.props.y, this.props.w, this.props.h, this.state);
			const newPosition = (0, _calculateUtils.calcGridItemPosition)(this.getPositionParams(nextProps), nextProps.x, nextProps.y, nextProps.w, nextProps.h, nextState);
			return !(0, _utils.fastPositionEqual)(oldPosition, newPosition) || this.props.useCSSTransforms !== nextProps.useCSSTransforms;
		}
		componentDidMount() {
			this.moveDroppingItem({});
		}
		componentDidUpdate(prevProps) {
			this.moveDroppingItem(prevProps);
		}
		moveDroppingItem(prevProps) {
			const { droppingPosition } = this.props;
			if (!droppingPosition) return;
			const node = this.elementRef.current;
			if (!node) return;
			const prevDroppingPosition = prevProps.droppingPosition || {
				left: 0,
				top: 0
			};
			const { dragging } = this.state;
			const shouldDrag = dragging && droppingPosition.left !== prevDroppingPosition.left || droppingPosition.top !== prevDroppingPosition.top;
			if (!dragging) this.onDragStart(droppingPosition.e, {
				node,
				deltaX: droppingPosition.left,
				deltaY: droppingPosition.top
			});
			else if (shouldDrag) {
				const deltaX = droppingPosition.left - dragging.left;
				const deltaY = droppingPosition.top - dragging.top;
				this.onDrag(droppingPosition.e, {
					node,
					deltaX,
					deltaY
				}, true);
			}
		}
		getPositionParams() {
			let props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.props;
			return {
				cols: props.cols,
				containerPadding: props.containerPadding,
				containerWidth: props.containerWidth,
				margin: props.margin,
				maxRows: props.maxRows,
				rowHeight: props.rowHeight
			};
		}
		/**
		* This is where we set the grid item's absolute placement. It gets a little tricky because we want to do it
		* well when server rendering, and the only way to do that properly is to use percentage width/left because
		* we don't know exactly what the browser viewport is.
		* Unfortunately, CSS Transforms, which are great for performance, break in this instance because a percentage
		* left is relative to the item itself, not its container! So we cannot use them on the server rendering pass.
		*
		* @param  {Object} pos Position object with width, height, left, top.
		* @return {Object}     Style object.
		*/
		createStyle(pos) {
			const { usePercentages, containerWidth, useCSSTransforms } = this.props;
			let style;
			if (useCSSTransforms) style = (0, _utils.setTransform)(pos);
			else {
				style = (0, _utils.setTopLeft)(pos);
				if (usePercentages) {
					style.left = (0, _utils.perc)(pos.left / containerWidth);
					style.width = (0, _utils.perc)(pos.width / containerWidth);
				}
			}
			return style;
		}
		/**
		* Mix a Draggable instance into a child.
		* @param  {Element} child    Child element.
		* @return {Element}          Child wrapped in Draggable.
		*/
		mixinDraggable(child, isDraggable) {
			return /* @__PURE__ */ _react.default.createElement(_reactDraggable.DraggableCore, {
				disabled: !isDraggable,
				onStart: this.onDragStart,
				onDrag: this.onDrag,
				onStop: this.onDragStop,
				handle: this.props.handle,
				cancel: ".react-resizable-handle" + (this.props.cancel ? "," + this.props.cancel : ""),
				scale: this.props.transformScale,
				nodeRef: this.elementRef
			}, child);
		}
		/**
		* Utility function to setup callback handler definitions for
		* similarily structured resize events.
		*/
		curryResizeHandler(position, handler) {
			return (e, data) => handler(e, data, position);
		}
		/**
		* Mix a Resizable instance into a child.
		* @param  {Element} child    Child element.
		* @param  {Object} position  Position object (pixel values)
		* @return {Element}          Child wrapped in Resizable.
		*/
		mixinResizable(child, position, isResizable) {
			const { cols, minW, minH, maxW, maxH, transformScale, resizeHandles, resizeHandle } = this.props;
			const positionParams = this.getPositionParams();
			const maxWidth = (0, _calculateUtils.calcGridItemPosition)(positionParams, 0, 0, cols, 0).width;
			const mins = (0, _calculateUtils.calcGridItemPosition)(positionParams, 0, 0, minW, minH);
			const maxes = (0, _calculateUtils.calcGridItemPosition)(positionParams, 0, 0, maxW, maxH);
			const minConstraints = [mins.width, mins.height];
			const maxConstraints = [Math.min(maxes.width, maxWidth), Math.min(maxes.height, Infinity)];
			return /* @__PURE__ */ _react.default.createElement(_reactResizable.Resizable, {
				draggableOpts: { disabled: !isResizable },
				className: isResizable ? void 0 : "react-resizable-hide",
				width: position.width,
				height: position.height,
				minConstraints,
				maxConstraints,
				onResizeStop: this.curryResizeHandler(position, this.onResizeStop),
				onResizeStart: this.curryResizeHandler(position, this.onResizeStart),
				onResize: this.curryResizeHandler(position, this.onResize),
				transformScale,
				resizeHandles,
				handle: resizeHandle
			}, child);
		}
		/**
		* Wrapper around resize events to provide more useful data.
		*/
		onResizeHandler(e, _ref4, position, handlerName) {
			let { node, size, handle } = _ref4;
			const handler = this.props[handlerName];
			if (!handler) return;
			const { x, y, i, maxH, minH, containerWidth } = this.props;
			const { minW, maxW } = this.props;
			let updatedSize = size;
			if (node) {
				updatedSize = (0, _utils.resizeItemInDirection)(handle, position, size, containerWidth);
				(0, _reactDom.flushSync)(() => {
					this.setState({ resizing: handlerName === "onResizeStop" ? null : updatedSize });
				});
			}
			let { w, h } = (0, _calculateUtils.calcWH)(this.getPositionParams(), updatedSize.width, updatedSize.height, x, y, handle);
			w = (0, _calculateUtils.clamp)(w, Math.max(minW, 1), maxW);
			h = (0, _calculateUtils.clamp)(h, minH, maxH);
			handler.call(this, i, w, h, {
				e,
				node,
				size: updatedSize,
				handle
			});
		}
		render() {
			const { x, y, w, h, isDraggable, isResizable, droppingPosition, useCSSTransforms } = this.props;
			const pos = (0, _calculateUtils.calcGridItemPosition)(this.getPositionParams(), x, y, w, h, this.state);
			const child = _react.default.Children.only(this.props.children);
			let newChild = /* @__PURE__ */ _react.default.cloneElement(child, {
				ref: this.elementRef,
				className: (0, _clsx.default)("react-grid-item", child.props.className, this.props.className, {
					static: this.props.static,
					resizing: Boolean(this.state.resizing),
					"react-draggable": isDraggable,
					"react-draggable-dragging": Boolean(this.state.dragging),
					dropping: Boolean(droppingPosition),
					cssTransforms: useCSSTransforms
				}),
				style: _objectSpread(_objectSpread(_objectSpread({}, this.props.style), child.props.style), this.createStyle(pos))
			});
			newChild = this.mixinResizable(newChild, pos, isResizable);
			newChild = this.mixinDraggable(newChild, isDraggable);
			return newChild;
		}
	};
	exports.default = GridItem;
	_defineProperty(GridItem, "propTypes", {
		children: _propTypes.default.element,
		cols: _propTypes.default.number.isRequired,
		containerWidth: _propTypes.default.number.isRequired,
		rowHeight: _propTypes.default.number.isRequired,
		margin: _propTypes.default.array.isRequired,
		maxRows: _propTypes.default.number.isRequired,
		containerPadding: _propTypes.default.array.isRequired,
		x: _propTypes.default.number.isRequired,
		y: _propTypes.default.number.isRequired,
		w: _propTypes.default.number.isRequired,
		h: _propTypes.default.number.isRequired,
		minW: function(props, propName) {
			const value = props[propName];
			if (typeof value !== "number") return /* @__PURE__ */ new Error("minWidth not Number");
			if (value > props.w || value > props.maxW) return /* @__PURE__ */ new Error("minWidth larger than item width/maxWidth");
		},
		maxW: function(props, propName) {
			const value = props[propName];
			if (typeof value !== "number") return /* @__PURE__ */ new Error("maxWidth not Number");
			if (value < props.w || value < props.minW) return /* @__PURE__ */ new Error("maxWidth smaller than item width/minWidth");
		},
		minH: function(props, propName) {
			const value = props[propName];
			if (typeof value !== "number") return /* @__PURE__ */ new Error("minHeight not Number");
			if (value > props.h || value > props.maxH) return /* @__PURE__ */ new Error("minHeight larger than item height/maxHeight");
		},
		maxH: function(props, propName) {
			const value = props[propName];
			if (typeof value !== "number") return /* @__PURE__ */ new Error("maxHeight not Number");
			if (value < props.h || value < props.minH) return /* @__PURE__ */ new Error("maxHeight smaller than item height/minHeight");
		},
		i: _propTypes.default.string.isRequired,
		resizeHandles: _ReactGridLayoutPropTypes.resizeHandleAxesType,
		resizeHandle: _ReactGridLayoutPropTypes.resizeHandleType,
		onDragStop: _propTypes.default.func,
		onDragStart: _propTypes.default.func,
		onDrag: _propTypes.default.func,
		onResizeStop: _propTypes.default.func,
		onResizeStart: _propTypes.default.func,
		onResize: _propTypes.default.func,
		isDraggable: _propTypes.default.bool.isRequired,
		isResizable: _propTypes.default.bool.isRequired,
		isBounded: _propTypes.default.bool.isRequired,
		static: _propTypes.default.bool,
		useCSSTransforms: _propTypes.default.bool.isRequired,
		transformScale: _propTypes.default.number,
		className: _propTypes.default.string,
		handle: _propTypes.default.string,
		cancel: _propTypes.default.string,
		droppingPosition: _propTypes.default.shape({
			e: _propTypes.default.object.isRequired,
			left: _propTypes.default.number.isRequired,
			top: _propTypes.default.number.isRequired
		})
	});
	_defineProperty(GridItem, "defaultProps", {
		className: "",
		cancel: "",
		handle: "",
		minH: 1,
		minW: 1,
		maxH: Infinity,
		maxW: Infinity,
		transformScale: 1
	});
}));
//#endregion
//#region node_modules/react-grid-layout/build/ReactGridLayout.js
var require_ReactGridLayout = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var React = _interopRequireWildcard(require_react());
	var _fastEquals = require_fast_equals();
	var _clsx = _interopRequireDefault(require_clsx());
	var _utils = require_utils$1();
	var _calculateUtils = require_calculateUtils();
	var _GridItem = _interopRequireDefault(require_GridItem());
	var _ReactGridLayoutPropTypes = _interopRequireDefault(require_ReactGridLayoutPropTypes());
	function _interopRequireDefault(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function _interopRequireWildcard(e, t) {
		if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
		return (_interopRequireWildcard = function(e, t) {
			if (!t && e && e.__esModule) return e;
			var o, i, f = {
				__proto__: null,
				default: e
			};
			if (null === e || "object" != typeof e && "function" != typeof e) return f;
			if (o = t ? n : r) {
				if (o.has(e)) return o.get(e);
				o.set(e, f);
			}
			for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]);
			return f;
		})(e, t);
	}
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == typeof i ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != typeof t || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != typeof i) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	var layoutClassName = "react-grid-layout";
	var isFirefox = false;
	try {
		isFirefox = /firefox/i.test(navigator.userAgent);
	} catch (e) {}
	/**
	* A reactive, fluid grid layout with draggable, resizable components.
	*/
	var ReactGridLayout = class extends React.Component {
		constructor() {
			super(...arguments);
			_defineProperty(this, "state", {
				activeDrag: null,
				layout: (0, _utils.synchronizeLayoutWithChildren)(this.props.layout, this.props.children, this.props.cols, (0, _utils.compactType)(this.props), this.props.allowOverlap),
				mounted: false,
				oldDragItem: null,
				oldLayout: null,
				oldResizeItem: null,
				resizing: false,
				droppingDOMNode: null,
				children: []
			});
			_defineProperty(this, "dragEnterCounter", 0);
			/**
			* When dragging starts
			* @param {String} i Id of the child
			* @param {Number} x X position of the move
			* @param {Number} y Y position of the move
			* @param {Event} e The mousedown event
			* @param {Element} node The current dragging DOM element
			*/
			_defineProperty(this, "onDragStart", (i, x, y, _ref) => {
				let { e, node } = _ref;
				const { layout } = this.state;
				const l = (0, _utils.getLayoutItem)(layout, i);
				if (!l) return;
				const placeholder = {
					w: l.w,
					h: l.h,
					x: l.x,
					y: l.y,
					placeholder: true,
					i
				};
				this.setState({
					oldDragItem: (0, _utils.cloneLayoutItem)(l),
					oldLayout: layout,
					activeDrag: placeholder
				});
				return this.props.onDragStart(layout, l, l, null, e, node);
			});
			/**
			* Each drag movement create a new dragelement and move the element to the dragged location
			* @param {String} i Id of the child
			* @param {Number} x X position of the move
			* @param {Number} y Y position of the move
			* @param {Event} e The mousedown event
			* @param {Element} node The current dragging DOM element
			*/
			_defineProperty(this, "onDrag", (i, x, y, _ref2) => {
				let { e, node } = _ref2;
				const { oldDragItem } = this.state;
				let { layout } = this.state;
				const { cols, allowOverlap, preventCollision } = this.props;
				const l = (0, _utils.getLayoutItem)(layout, i);
				if (!l) return;
				const placeholder = {
					w: l.w,
					h: l.h,
					x: l.x,
					y: l.y,
					placeholder: true,
					i
				};
				layout = (0, _utils.moveElement)(layout, l, x, y, true, preventCollision, (0, _utils.compactType)(this.props), cols, allowOverlap);
				this.props.onDrag(layout, oldDragItem, l, placeholder, e, node);
				this.setState({
					layout: allowOverlap ? layout : (0, _utils.compact)(layout, (0, _utils.compactType)(this.props), cols),
					activeDrag: placeholder
				});
			});
			/**
			* When dragging stops, figure out which position the element is closest to and update its x and y.
			* @param  {String} i Index of the child.
			* @param {Number} x X position of the move
			* @param {Number} y Y position of the move
			* @param {Event} e The mousedown event
			* @param {Element} node The current dragging DOM element
			*/
			_defineProperty(this, "onDragStop", (i, x, y, _ref3) => {
				let { e, node } = _ref3;
				if (!this.state.activeDrag) return;
				const { oldDragItem } = this.state;
				let { layout } = this.state;
				const { cols, preventCollision, allowOverlap } = this.props;
				const l = (0, _utils.getLayoutItem)(layout, i);
				if (!l) return;
				layout = (0, _utils.moveElement)(layout, l, x, y, true, preventCollision, (0, _utils.compactType)(this.props), cols, allowOverlap);
				const newLayout = allowOverlap ? layout : (0, _utils.compact)(layout, (0, _utils.compactType)(this.props), cols);
				this.props.onDragStop(newLayout, oldDragItem, l, null, e, node);
				const { oldLayout } = this.state;
				this.setState({
					activeDrag: null,
					layout: newLayout,
					oldDragItem: null,
					oldLayout: null
				});
				this.onLayoutMaybeChanged(newLayout, oldLayout);
			});
			_defineProperty(this, "onResizeStart", (i, w, h, _ref4) => {
				let { e, node } = _ref4;
				const { layout } = this.state;
				const l = (0, _utils.getLayoutItem)(layout, i);
				if (!l) return;
				this.setState({
					oldResizeItem: (0, _utils.cloneLayoutItem)(l),
					oldLayout: this.state.layout,
					resizing: true
				});
				this.props.onResizeStart(layout, l, l, null, e, node);
			});
			_defineProperty(this, "onResize", (i, w, h, _ref5) => {
				let { e, node, size, handle } = _ref5;
				const { oldResizeItem } = this.state;
				const { layout } = this.state;
				const { cols, preventCollision, allowOverlap } = this.props;
				let shouldMoveItem = false;
				let finalLayout;
				let x;
				let y;
				const [newLayout, l] = (0, _utils.withLayoutItem)(layout, i, (l) => {
					let hasCollisions;
					x = l.x;
					y = l.y;
					if ([
						"sw",
						"w",
						"nw",
						"n",
						"ne"
					].indexOf(handle) !== -1) {
						if ([
							"sw",
							"nw",
							"w"
						].indexOf(handle) !== -1) {
							x = l.x + (l.w - w);
							w = l.x !== x && x < 0 ? l.w : w;
							x = x < 0 ? 0 : x;
						}
						if ([
							"ne",
							"n",
							"nw"
						].indexOf(handle) !== -1) {
							y = l.y + (l.h - h);
							h = l.y !== y && y < 0 ? l.h : h;
							y = y < 0 ? 0 : y;
						}
						shouldMoveItem = true;
					}
					if (preventCollision && !allowOverlap) {
						hasCollisions = (0, _utils.getAllCollisions)(layout, _objectSpread(_objectSpread({}, l), {}, {
							w,
							h,
							x,
							y
						})).filter((layoutItem) => layoutItem.i !== l.i).length > 0;
						if (hasCollisions) {
							y = l.y;
							h = l.h;
							x = l.x;
							w = l.w;
							shouldMoveItem = false;
						}
					}
					l.w = w;
					l.h = h;
					return l;
				});
				if (!l) return;
				finalLayout = newLayout;
				if (shouldMoveItem) finalLayout = (0, _utils.moveElement)(newLayout, l, x, y, true, this.props.preventCollision, (0, _utils.compactType)(this.props), cols, allowOverlap);
				const placeholder = {
					w: l.w,
					h: l.h,
					x: l.x,
					y: l.y,
					static: true,
					i
				};
				this.props.onResize(finalLayout, oldResizeItem, l, placeholder, e, node);
				this.setState({
					layout: allowOverlap ? finalLayout : (0, _utils.compact)(finalLayout, (0, _utils.compactType)(this.props), cols),
					activeDrag: placeholder
				});
			});
			_defineProperty(this, "onResizeStop", (i, w, h, _ref6) => {
				let { e, node } = _ref6;
				const { layout, oldResizeItem } = this.state;
				const { cols, allowOverlap } = this.props;
				const l = (0, _utils.getLayoutItem)(layout, i);
				const newLayout = allowOverlap ? layout : (0, _utils.compact)(layout, (0, _utils.compactType)(this.props), cols);
				this.props.onResizeStop(newLayout, oldResizeItem, l, null, e, node);
				const { oldLayout } = this.state;
				this.setState({
					activeDrag: null,
					layout: newLayout,
					oldResizeItem: null,
					oldLayout: null,
					resizing: false
				});
				this.onLayoutMaybeChanged(newLayout, oldLayout);
			});
			_defineProperty(this, "onDragOver", (e) => {
				var _e$nativeEvent$target;
				e.preventDefault();
				e.stopPropagation();
				if (isFirefox && !((_e$nativeEvent$target = e.nativeEvent.target) !== null && _e$nativeEvent$target !== void 0 && _e$nativeEvent$target.classList.contains(layoutClassName))) return false;
				const { droppingItem, onDropDragOver, margin, cols, rowHeight, maxRows, width, containerPadding, transformScale } = this.props;
				const onDragOverResult = onDropDragOver === null || onDropDragOver === void 0 ? void 0 : onDropDragOver(e);
				if (onDragOverResult === false) {
					if (this.state.droppingDOMNode) this.removeDroppingPlaceholder();
					return false;
				}
				const finalDroppingItem = _objectSpread(_objectSpread({}, droppingItem), onDragOverResult);
				const { layout } = this.state;
				const gridRect = e.currentTarget.getBoundingClientRect();
				const layerX = e.clientX - gridRect.left;
				const layerY = e.clientY - gridRect.top;
				const droppingPosition = {
					left: layerX / transformScale,
					top: layerY / transformScale,
					e
				};
				if (!this.state.droppingDOMNode) {
					const positionParams = {
						cols,
						margin,
						maxRows,
						rowHeight,
						containerWidth: width,
						containerPadding: containerPadding || margin
					};
					const calculatedPosition = (0, _calculateUtils.calcXY)(positionParams, layerY, layerX, finalDroppingItem.w, finalDroppingItem.h);
					this.setState({
						droppingDOMNode: /* @__PURE__ */ React.createElement("div", { key: finalDroppingItem.i }),
						droppingPosition,
						layout: [...layout, _objectSpread(_objectSpread({}, finalDroppingItem), {}, {
							x: calculatedPosition.x,
							y: calculatedPosition.y,
							static: false,
							isDraggable: true
						})]
					});
				} else if (this.state.droppingPosition) {
					const { left, top } = this.state.droppingPosition;
					if (left != layerX || top != layerY) this.setState({ droppingPosition });
				}
			});
			_defineProperty(this, "removeDroppingPlaceholder", () => {
				const { droppingItem, cols } = this.props;
				const { layout } = this.state;
				const newLayout = (0, _utils.compact)(layout.filter((l) => l.i !== droppingItem.i), (0, _utils.compactType)(this.props), cols, this.props.allowOverlap);
				this.setState({
					layout: newLayout,
					droppingDOMNode: null,
					activeDrag: null,
					droppingPosition: void 0
				});
			});
			_defineProperty(this, "onDragLeave", (e) => {
				e.preventDefault();
				e.stopPropagation();
				this.dragEnterCounter--;
				if (this.dragEnterCounter === 0) this.removeDroppingPlaceholder();
			});
			_defineProperty(this, "onDragEnter", (e) => {
				e.preventDefault();
				e.stopPropagation();
				this.dragEnterCounter++;
			});
			_defineProperty(this, "onDrop", (e) => {
				e.preventDefault();
				e.stopPropagation();
				const { droppingItem } = this.props;
				const { layout } = this.state;
				const item = layout.find((l) => l.i === droppingItem.i);
				this.dragEnterCounter = 0;
				this.removeDroppingPlaceholder();
				this.props.onDrop(layout, item, e);
			});
		}
		componentDidMount() {
			this.setState({ mounted: true });
			this.onLayoutMaybeChanged(this.state.layout, this.props.layout);
		}
		static getDerivedStateFromProps(nextProps, prevState) {
			let newLayoutBase;
			if (prevState.activeDrag) return null;
			if (!(0, _fastEquals.deepEqual)(nextProps.layout, prevState.propsLayout) || nextProps.compactType !== prevState.compactType) newLayoutBase = nextProps.layout;
			else if (!(0, _utils.childrenEqual)(nextProps.children, prevState.children)) newLayoutBase = prevState.layout;
			if (newLayoutBase) return {
				layout: (0, _utils.synchronizeLayoutWithChildren)(newLayoutBase, nextProps.children, nextProps.cols, (0, _utils.compactType)(nextProps), nextProps.allowOverlap),
				compactType: nextProps.compactType,
				children: nextProps.children,
				propsLayout: nextProps.layout
			};
			return null;
		}
		shouldComponentUpdate(nextProps, nextState) {
			return this.props.children !== nextProps.children || !(0, _utils.fastRGLPropsEqual)(this.props, nextProps, _fastEquals.deepEqual) || this.state.activeDrag !== nextState.activeDrag || this.state.mounted !== nextState.mounted || this.state.droppingPosition !== nextState.droppingPosition;
		}
		componentDidUpdate(prevProps, prevState) {
			if (!this.state.activeDrag) {
				const newLayout = this.state.layout;
				const oldLayout = prevState.layout;
				this.onLayoutMaybeChanged(newLayout, oldLayout);
			}
		}
		/**
		* Calculates a pixel value for the container.
		* @return {String} Container height in pixels.
		*/
		containerHeight() {
			if (!this.props.autoSize) return;
			const nbRow = (0, _utils.bottom)(this.state.layout);
			const containerPaddingY = this.props.containerPadding ? this.props.containerPadding[1] : this.props.margin[1];
			return nbRow * this.props.rowHeight + (nbRow - 1) * this.props.margin[1] + containerPaddingY * 2 + "px";
		}
		onLayoutMaybeChanged(newLayout, oldLayout) {
			if (!oldLayout) oldLayout = this.state.layout;
			if (!(0, _fastEquals.deepEqual)(oldLayout, newLayout)) this.props.onLayoutChange(newLayout);
		}
		/**
		* Create a placeholder object.
		* @return {Element} Placeholder div.
		*/
		placeholder() {
			const { activeDrag } = this.state;
			if (!activeDrag) return null;
			const { width, cols, margin, containerPadding, rowHeight, maxRows, useCSSTransforms, transformScale } = this.props;
			return /* @__PURE__ */ React.createElement(_GridItem.default, {
				w: activeDrag.w,
				h: activeDrag.h,
				x: activeDrag.x,
				y: activeDrag.y,
				i: activeDrag.i,
				className: "react-grid-placeholder ".concat(this.state.resizing ? "placeholder-resizing" : ""),
				containerWidth: width,
				cols,
				margin,
				containerPadding: containerPadding || margin,
				maxRows,
				rowHeight,
				isDraggable: false,
				isResizable: false,
				isBounded: false,
				useCSSTransforms,
				transformScale
			}, /* @__PURE__ */ React.createElement("div", null));
		}
		/**
		* Given a grid item, set its style attributes & surround in a <Draggable>.
		* @param  {Element} child React element.
		* @return {Element}       Element wrapped in draggable and properly placed.
		*/
		processGridItem(child, isDroppingItem) {
			if (!child || !child.key) return;
			const l = (0, _utils.getLayoutItem)(this.state.layout, String(child.key));
			if (!l) return null;
			const { width, cols, margin, containerPadding, rowHeight, maxRows, isDraggable, isResizable, isBounded, useCSSTransforms, transformScale, draggableCancel, draggableHandle, resizeHandles, resizeHandle } = this.props;
			const { mounted, droppingPosition } = this.state;
			const draggable = typeof l.isDraggable === "boolean" ? l.isDraggable : !l.static && isDraggable;
			const resizable = typeof l.isResizable === "boolean" ? l.isResizable : !l.static && isResizable;
			const resizeHandlesOptions = l.resizeHandles || resizeHandles;
			const bounded = draggable && isBounded && l.isBounded !== false;
			return /* @__PURE__ */ React.createElement(_GridItem.default, {
				containerWidth: width,
				cols,
				margin,
				containerPadding: containerPadding || margin,
				maxRows,
				rowHeight,
				cancel: draggableCancel,
				handle: draggableHandle,
				onDragStop: this.onDragStop,
				onDragStart: this.onDragStart,
				onDrag: this.onDrag,
				onResizeStart: this.onResizeStart,
				onResize: this.onResize,
				onResizeStop: this.onResizeStop,
				isDraggable: draggable,
				isResizable: resizable,
				isBounded: bounded,
				useCSSTransforms: useCSSTransforms && mounted,
				usePercentages: !mounted,
				transformScale,
				w: l.w,
				h: l.h,
				x: l.x,
				y: l.y,
				i: l.i,
				minH: l.minH,
				minW: l.minW,
				maxH: l.maxH,
				maxW: l.maxW,
				static: l.static,
				droppingPosition: isDroppingItem ? droppingPosition : void 0,
				resizeHandles: resizeHandlesOptions,
				resizeHandle
			}, child);
		}
		render() {
			const { className, style, isDroppable, innerRef } = this.props;
			const mergedClassName = (0, _clsx.default)(layoutClassName, className);
			const mergedStyle = _objectSpread({ height: this.containerHeight() }, style);
			return /* @__PURE__ */ React.createElement("div", {
				ref: innerRef,
				className: mergedClassName,
				style: mergedStyle,
				onDrop: isDroppable ? this.onDrop : _utils.noop,
				onDragLeave: isDroppable ? this.onDragLeave : _utils.noop,
				onDragEnter: isDroppable ? this.onDragEnter : _utils.noop,
				onDragOver: isDroppable ? this.onDragOver : _utils.noop
			}, React.Children.map(this.props.children, (child) => this.processGridItem(child)), isDroppable && this.state.droppingDOMNode && this.processGridItem(this.state.droppingDOMNode, true), this.placeholder());
		}
	};
	exports.default = ReactGridLayout;
	_defineProperty(ReactGridLayout, "displayName", "ReactGridLayout");
	_defineProperty(ReactGridLayout, "propTypes", _ReactGridLayoutPropTypes.default);
	_defineProperty(ReactGridLayout, "defaultProps", {
		autoSize: true,
		cols: 12,
		className: "",
		style: {},
		draggableHandle: "",
		draggableCancel: "",
		containerPadding: null,
		rowHeight: 150,
		maxRows: Infinity,
		layout: [],
		margin: [10, 10],
		isBounded: false,
		isDraggable: true,
		isResizable: true,
		allowOverlap: false,
		isDroppable: false,
		useCSSTransforms: true,
		transformScale: 1,
		verticalCompact: true,
		compactType: "vertical",
		preventCollision: false,
		droppingItem: {
			i: "__dropping-elem__",
			h: 1,
			w: 1
		},
		resizeHandles: ["se"],
		onLayoutChange: _utils.noop,
		onDragStart: _utils.noop,
		onDrag: _utils.noop,
		onDragStop: _utils.noop,
		onResizeStart: _utils.noop,
		onResize: _utils.noop,
		onResizeStop: _utils.noop,
		onDrop: _utils.noop,
		onDropDragOver: _utils.noop
	});
}));
//#endregion
//#region node_modules/react-grid-layout/build/responsiveUtils.js
var require_responsiveUtils = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.findOrGenerateResponsiveLayout = findOrGenerateResponsiveLayout;
	exports.getBreakpointFromWidth = getBreakpointFromWidth;
	exports.getColsFromBreakpoint = getColsFromBreakpoint;
	exports.sortBreakpoints = sortBreakpoints;
	var _utils = require_utils$1();
	/**
	* Given a width, find the highest breakpoint that matches is valid for it (width > breakpoint).
	*
	* @param  {Object} breakpoints Breakpoints object (e.g. {lg: 1200, md: 960, ...})
	* @param  {Number} width Screen width.
	* @return {String}       Highest breakpoint that is less than width.
	*/
	function getBreakpointFromWidth(breakpoints, width) {
		const sorted = sortBreakpoints(breakpoints);
		let matching = sorted[0];
		for (let i = 1, len = sorted.length; i < len; i++) {
			const breakpointName = sorted[i];
			if (width > breakpoints[breakpointName]) matching = breakpointName;
		}
		return matching;
	}
	/**
	* Given a breakpoint, get the # of cols set for it.
	* @param  {String} breakpoint Breakpoint name.
	* @param  {Object} cols       Map of breakpoints to cols.
	* @return {Number}            Number of cols.
	*/
	function getColsFromBreakpoint(breakpoint, cols) {
		if (!cols[breakpoint]) throw new Error("ResponsiveReactGridLayout: `cols` entry for breakpoint " + breakpoint + " is missing!");
		return cols[breakpoint];
	}
	/**
	* Given existing layouts and a new breakpoint, find or generate a new layout.
	*
	* This finds the layout above the new one and generates from it, if it exists.
	*
	* @param  {Object} layouts     Existing layouts.
	* @param  {Array} breakpoints All breakpoints.
	* @param  {String} breakpoint New breakpoint.
	* @param  {String} breakpoint Last breakpoint (for fallback).
	* @param  {Number} cols       Column count at new breakpoint.
	* @param  {Boolean} verticalCompact Whether or not to compact the layout
	*   vertically.
	* @return {Array}             New layout.
	*/
	function findOrGenerateResponsiveLayout(layouts, breakpoints, breakpoint, lastBreakpoint, cols, compactType) {
		if (layouts[breakpoint]) return (0, _utils.cloneLayout)(layouts[breakpoint]);
		let layout = layouts[lastBreakpoint];
		const breakpointsSorted = sortBreakpoints(breakpoints);
		const breakpointsAbove = breakpointsSorted.slice(breakpointsSorted.indexOf(breakpoint));
		for (let i = 0, len = breakpointsAbove.length; i < len; i++) {
			const b = breakpointsAbove[i];
			if (layouts[b]) {
				layout = layouts[b];
				break;
			}
		}
		layout = (0, _utils.cloneLayout)(layout || []);
		return (0, _utils.compact)((0, _utils.correctBounds)(layout, { cols }), compactType, cols);
	}
	/**
	* Given breakpoints, return an array of breakpoints sorted by width. This is usually
	* e.g. ['xxs', 'xs', 'sm', ...]
	*
	* @param  {Object} breakpoints Key/value pair of breakpoint names to widths.
	* @return {Array}              Sorted breakpoints.
	*/
	function sortBreakpoints(breakpoints) {
		return Object.keys(breakpoints).sort(function(a, b) {
			return breakpoints[a] - breakpoints[b];
		});
	}
}));
//#endregion
//#region node_modules/react-grid-layout/build/ResponsiveReactGridLayout.js
var require_ResponsiveReactGridLayout = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var React = _interopRequireWildcard(require_react());
	var _propTypes = _interopRequireDefault(require_prop_types());
	var _fastEquals = require_fast_equals();
	var _utils = require_utils$1();
	var _responsiveUtils = require_responsiveUtils();
	var _ReactGridLayout = _interopRequireDefault(require_ReactGridLayout());
	var _excluded = [
		"breakpoint",
		"breakpoints",
		"cols",
		"layouts",
		"margin",
		"containerPadding",
		"onBreakpointChange",
		"onLayoutChange",
		"onWidthChange"
	];
	function _interopRequireDefault(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function _interopRequireWildcard(e, t) {
		if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
		return (_interopRequireWildcard = function(e, t) {
			if (!t && e && e.__esModule) return e;
			var o, i, f = {
				__proto__: null,
				default: e
			};
			if (null === e || "object" != typeof e && "function" != typeof e) return f;
			if (o = t ? n : r) {
				if (o.has(e)) return o.get(e);
				o.set(e, f);
			}
			for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]);
			return f;
		})(e, t);
	}
	function _extends() {
		return _extends = Object.assign ? Object.assign.bind() : function(n) {
			for (var e = 1; e < arguments.length; e++) {
				var t = arguments[e];
				for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
			}
			return n;
		}, _extends.apply(null, arguments);
	}
	function _objectWithoutProperties(e, t) {
		if (null == e) return {};
		var o, r, i = _objectWithoutPropertiesLoose(e, t);
		if (Object.getOwnPropertySymbols) {
			var n = Object.getOwnPropertySymbols(e);
			for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
		}
		return i;
	}
	function _objectWithoutPropertiesLoose(r, e) {
		if (null == r) return {};
		var t = {};
		for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
			if (-1 !== e.indexOf(n)) continue;
			t[n] = r[n];
		}
		return t;
	}
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == typeof i ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != typeof t || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != typeof i) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	var type = (obj) => Object.prototype.toString.call(obj);
	/**
	* Get a value of margin or containerPadding.
	*
	* @param  {Array | Object} param Margin | containerPadding, e.g. [10, 10] | {lg: [10, 10], ...}.
	* @param  {String} breakpoint   Breakpoint: lg, md, sm, xs and etc.
	* @return {Array}
	*/
	function getIndentationValue(param, breakpoint) {
		if (param == null) return null;
		return Array.isArray(param) ? param : param[breakpoint];
	}
	var ResponsiveReactGridLayout = class extends React.Component {
		constructor() {
			super(...arguments);
			_defineProperty(this, "state", this.generateInitialState());
			_defineProperty(this, "onLayoutChange", (layout) => {
				this.props.onLayoutChange(layout, _objectSpread(_objectSpread({}, this.props.layouts), {}, { [this.state.breakpoint]: layout }));
			});
		}
		generateInitialState() {
			const { width, breakpoints, layouts, cols } = this.props;
			const breakpoint = (0, _responsiveUtils.getBreakpointFromWidth)(breakpoints, width);
			const colNo = (0, _responsiveUtils.getColsFromBreakpoint)(breakpoint, cols);
			const compactType = this.props.verticalCompact === false ? null : this.props.compactType;
			return {
				layout: (0, _responsiveUtils.findOrGenerateResponsiveLayout)(layouts, breakpoints, breakpoint, breakpoint, colNo, compactType),
				breakpoint,
				cols: colNo
			};
		}
		static getDerivedStateFromProps(nextProps, prevState) {
			if (!(0, _fastEquals.deepEqual)(nextProps.layouts, prevState.layouts)) {
				const { breakpoint, cols } = prevState;
				return {
					layout: (0, _responsiveUtils.findOrGenerateResponsiveLayout)(nextProps.layouts, nextProps.breakpoints, breakpoint, breakpoint, cols, nextProps.compactType),
					layouts: nextProps.layouts
				};
			}
			return null;
		}
		componentDidUpdate(prevProps) {
			if (this.props.width != prevProps.width || this.props.breakpoint !== prevProps.breakpoint || !(0, _fastEquals.deepEqual)(this.props.breakpoints, prevProps.breakpoints) || !(0, _fastEquals.deepEqual)(this.props.cols, prevProps.cols)) this.onWidthChange(prevProps);
		}
		/**
		* When the width changes work through breakpoints and reset state with the new width & breakpoint.
		* Width changes are necessary to figure out the widget widths.
		*/
		onWidthChange(prevProps) {
			const { breakpoints, cols, layouts, compactType } = this.props;
			const newBreakpoint = this.props.breakpoint || (0, _responsiveUtils.getBreakpointFromWidth)(this.props.breakpoints, this.props.width);
			const lastBreakpoint = this.state.breakpoint;
			const newCols = (0, _responsiveUtils.getColsFromBreakpoint)(newBreakpoint, cols);
			const newLayouts = _objectSpread({}, layouts);
			if (lastBreakpoint !== newBreakpoint || prevProps.breakpoints !== breakpoints || prevProps.cols !== cols) {
				if (!(lastBreakpoint in newLayouts)) newLayouts[lastBreakpoint] = (0, _utils.cloneLayout)(this.state.layout);
				let layout = (0, _responsiveUtils.findOrGenerateResponsiveLayout)(newLayouts, breakpoints, newBreakpoint, lastBreakpoint, newCols, compactType);
				layout = (0, _utils.synchronizeLayoutWithChildren)(layout, this.props.children, newCols, compactType, this.props.allowOverlap);
				newLayouts[newBreakpoint] = layout;
				this.props.onBreakpointChange(newBreakpoint, newCols);
				this.props.onLayoutChange(layout, newLayouts);
				this.setState({
					breakpoint: newBreakpoint,
					layout,
					cols: newCols
				});
			}
			const margin = getIndentationValue(this.props.margin, newBreakpoint);
			const containerPadding = getIndentationValue(this.props.containerPadding, newBreakpoint);
			this.props.onWidthChange(this.props.width, margin, newCols, containerPadding);
		}
		render() {
			const _this$props = this.props, { breakpoint, breakpoints, cols, layouts, margin, containerPadding, onBreakpointChange, onLayoutChange, onWidthChange } = _this$props, other = _objectWithoutProperties(_this$props, _excluded);
			return /* @__PURE__ */ React.createElement(_ReactGridLayout.default, _extends({}, other, {
				margin: getIndentationValue(margin, this.state.breakpoint),
				containerPadding: getIndentationValue(containerPadding, this.state.breakpoint),
				onLayoutChange: this.onLayoutChange,
				layout: this.state.layout,
				cols: this.state.cols
			}));
		}
	};
	exports.default = ResponsiveReactGridLayout;
	_defineProperty(ResponsiveReactGridLayout, "propTypes", {
		breakpoint: _propTypes.default.string,
		breakpoints: _propTypes.default.object,
		allowOverlap: _propTypes.default.bool,
		cols: _propTypes.default.object,
		margin: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object]),
		containerPadding: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object]),
		layouts(props, propName) {
			if (type(props[propName]) !== "[object Object]") throw new Error("Layout property must be an object. Received: " + type(props[propName]));
			Object.keys(props[propName]).forEach((key) => {
				if (!(key in props.breakpoints)) throw new Error("Each key in layouts must align with a key in breakpoints.");
				(0, _utils.validateLayout)(props.layouts[key], "layouts." + key);
			});
		},
		width: _propTypes.default.number.isRequired,
		onBreakpointChange: _propTypes.default.func,
		onLayoutChange: _propTypes.default.func,
		onWidthChange: _propTypes.default.func
	});
	_defineProperty(ResponsiveReactGridLayout, "defaultProps", {
		breakpoints: {
			lg: 1200,
			md: 996,
			sm: 768,
			xs: 480,
			xxs: 0
		},
		cols: {
			lg: 12,
			md: 10,
			sm: 6,
			xs: 4,
			xxs: 2
		},
		containerPadding: {
			lg: null,
			md: null,
			sm: null,
			xs: null,
			xxs: null
		},
		layouts: {},
		margin: [10, 10],
		allowOverlap: false,
		onBreakpointChange: _utils.noop,
		onLayoutChange: _utils.noop,
		onWidthChange: _utils.noop
	});
}));
//#endregion
//#region node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js
var ResizeObserver_es_exports = /* @__PURE__ */ __exportAll({ default: () => index });
/**
* Creates a wrapper function which ensures that provided callback will be
* invoked only once during the specified delay period.
*
* @param {Function} callback - Function to be invoked after the delay period.
* @param {number} delay - Delay after which to invoke callback.
* @returns {Function}
*/
function throttle(callback, delay) {
	var leadingCall = false, trailingCall = false, lastCallTime = 0;
	/**
	* Invokes the original callback function and schedules new invocation if
	* the "proxy" was called during current request.
	*
	* @returns {void}
	*/
	function resolvePending() {
		if (leadingCall) {
			leadingCall = false;
			callback();
		}
		if (trailingCall) proxy();
	}
	/**
	* Callback invoked after the specified delay. It will further postpone
	* invocation of the original function delegating it to the
	* requestAnimationFrame.
	*
	* @returns {void}
	*/
	function timeoutCallback() {
		requestAnimationFrame$1(resolvePending);
	}
	/**
	* Schedules invocation of the original function.
	*
	* @returns {void}
	*/
	function proxy() {
		var timeStamp = Date.now();
		if (leadingCall) {
			if (timeStamp - lastCallTime < trailingTimeout) return;
			trailingCall = true;
		} else {
			leadingCall = true;
			trailingCall = false;
			setTimeout(timeoutCallback, delay);
		}
		lastCallTime = timeStamp;
	}
	return proxy;
}
/**
* Converts provided string to a number.
*
* @param {number|string} value
* @returns {number}
*/
function toFloat(value) {
	return parseFloat(value) || 0;
}
/**
* Extracts borders size from provided styles.
*
* @param {CSSStyleDeclaration} styles
* @param {...string} positions - Borders positions (top, right, ...)
* @returns {number}
*/
function getBordersSize(styles) {
	var positions = [];
	for (var _i = 1; _i < arguments.length; _i++) positions[_i - 1] = arguments[_i];
	return positions.reduce(function(size, position) {
		var value = styles["border-" + position + "-width"];
		return size + toFloat(value);
	}, 0);
}
/**
* Extracts paddings sizes from provided styles.
*
* @param {CSSStyleDeclaration} styles
* @returns {Object} Paddings box.
*/
function getPaddings(styles) {
	var positions = [
		"top",
		"right",
		"bottom",
		"left"
	];
	var paddings = {};
	for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
		var position = positions_1[_i];
		var value = styles["padding-" + position];
		paddings[position] = toFloat(value);
	}
	return paddings;
}
/**
* Calculates content rectangle of provided SVG element.
*
* @param {SVGGraphicsElement} target - Element content rectangle of which needs
*      to be calculated.
* @returns {DOMRectInit}
*/
function getSVGContentRect(target) {
	var bbox = target.getBBox();
	return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
* Calculates content rectangle of provided HTMLElement.
*
* @param {HTMLElement} target - Element for which to calculate the content rectangle.
* @returns {DOMRectInit}
*/
function getHTMLElementContentRect(target) {
	var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
	if (!clientWidth && !clientHeight) return emptyRect;
	var styles = getWindowOf(target).getComputedStyle(target);
	var paddings = getPaddings(styles);
	var horizPad = paddings.left + paddings.right;
	var vertPad = paddings.top + paddings.bottom;
	var width = toFloat(styles.width), height = toFloat(styles.height);
	if (styles.boxSizing === "border-box") {
		if (Math.round(width + horizPad) !== clientWidth) width -= getBordersSize(styles, "left", "right") + horizPad;
		if (Math.round(height + vertPad) !== clientHeight) height -= getBordersSize(styles, "top", "bottom") + vertPad;
	}
	if (!isDocumentElement(target)) {
		var vertScrollbar = Math.round(width + horizPad) - clientWidth;
		var horizScrollbar = Math.round(height + vertPad) - clientHeight;
		if (Math.abs(vertScrollbar) !== 1) width -= vertScrollbar;
		if (Math.abs(horizScrollbar) !== 1) height -= horizScrollbar;
	}
	return createRectInit(paddings.left, paddings.top, width, height);
}
/**
* Checks whether provided element is a document element (<html>).
*
* @param {Element} target - Element to be checked.
* @returns {boolean}
*/
function isDocumentElement(target) {
	return target === getWindowOf(target).document.documentElement;
}
/**
* Calculates an appropriate content rectangle for provided html or svg element.
*
* @param {Element} target - Element content rectangle of which needs to be calculated.
* @returns {DOMRectInit}
*/
function getContentRect(target) {
	if (!isBrowser) return emptyRect;
	if (isSVGGraphicsElement(target)) return getSVGContentRect(target);
	return getHTMLElementContentRect(target);
}
/**
* Creates rectangle with an interface of the DOMRectReadOnly.
* Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
*
* @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
* @returns {DOMRectReadOnly}
*/
function createReadOnlyRect(_a) {
	var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
	var rect = Object.create((typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object).prototype);
	defineConfigurable(rect, {
		x,
		y,
		width,
		height,
		top: y,
		right: x + width,
		bottom: height + y,
		left: x
	});
	return rect;
}
/**
* Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
* Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
*
* @param {number} x - X coordinate.
* @param {number} y - Y coordinate.
* @param {number} width - Rectangle's width.
* @param {number} height - Rectangle's height.
* @returns {DOMRectInit}
*/
function createRectInit(x, y, width, height) {
	return {
		x,
		y,
		width,
		height
	};
}
var MapShim, isBrowser, global$1, requestAnimationFrame$1, trailingTimeout, REFRESH_DELAY, transitionKeys, mutationObserverSupported, ResizeObserverController, defineConfigurable, getWindowOf, emptyRect, isSVGGraphicsElement, ResizeObservation, ResizeObserverEntry, ResizeObserverSPI, observers, ResizeObserver, index;
var init_ResizeObserver_es = __esmMin((() => {
	MapShim = (function() {
		if (typeof Map !== "undefined") return Map;
		/**
		* Returns index in provided array that matches the specified key.
		*
		* @param {Array<Array>} arr
		* @param {*} key
		* @returns {number}
		*/
		function getIndex(arr, key) {
			var result = -1;
			arr.some(function(entry, index) {
				if (entry[0] === key) {
					result = index;
					return true;
				}
				return false;
			});
			return result;
		}
		return function() {
			function class_1() {
				this.__entries__ = [];
			}
			Object.defineProperty(class_1.prototype, "size", {
				/**
				* @returns {boolean}
				*/
				get: function() {
					return this.__entries__.length;
				},
				enumerable: true,
				configurable: true
			});
			/**
			* @param {*} key
			* @returns {*}
			*/
			class_1.prototype.get = function(key) {
				var index = getIndex(this.__entries__, key);
				var entry = this.__entries__[index];
				return entry && entry[1];
			};
			/**
			* @param {*} key
			* @param {*} value
			* @returns {void}
			*/
			class_1.prototype.set = function(key, value) {
				var index = getIndex(this.__entries__, key);
				if (~index) this.__entries__[index][1] = value;
				else this.__entries__.push([key, value]);
			};
			/**
			* @param {*} key
			* @returns {void}
			*/
			class_1.prototype.delete = function(key) {
				var entries = this.__entries__;
				var index = getIndex(entries, key);
				if (~index) entries.splice(index, 1);
			};
			/**
			* @param {*} key
			* @returns {void}
			*/
			class_1.prototype.has = function(key) {
				return !!~getIndex(this.__entries__, key);
			};
			/**
			* @returns {void}
			*/
			class_1.prototype.clear = function() {
				this.__entries__.splice(0);
			};
			/**
			* @param {Function} callback
			* @param {*} [ctx=null]
			* @returns {void}
			*/
			class_1.prototype.forEach = function(callback, ctx) {
				if (ctx === void 0) ctx = null;
				for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
					var entry = _a[_i];
					callback.call(ctx, entry[1], entry[0]);
				}
			};
			return class_1;
		}();
	})();
	isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && window.document === document;
	global$1 = (function() {
		if (typeof global !== "undefined" && global.Math === Math) return global;
		if (typeof self !== "undefined" && self.Math === Math) return self;
		if (typeof window !== "undefined" && window.Math === Math) return window;
		return Function("return this")();
	})();
	requestAnimationFrame$1 = (function() {
		if (typeof requestAnimationFrame === "function") return requestAnimationFrame.bind(global$1);
		return function(callback) {
			return setTimeout(function() {
				return callback(Date.now());
			}, 1e3 / 60);
		};
	})();
	trailingTimeout = 2;
	REFRESH_DELAY = 20;
	transitionKeys = [
		"top",
		"right",
		"bottom",
		"left",
		"width",
		"height",
		"size",
		"weight"
	];
	mutationObserverSupported = typeof MutationObserver !== "undefined";
	ResizeObserverController = function() {
		/**
		* Creates a new instance of ResizeObserverController.
		*
		* @private
		*/
		function ResizeObserverController() {
			/**
			* Indicates whether DOM listeners have been added.
			*
			* @private {boolean}
			*/
			this.connected_ = false;
			/**
			* Tells that controller has subscribed for Mutation Events.
			*
			* @private {boolean}
			*/
			this.mutationEventsAdded_ = false;
			/**
			* Keeps reference to the instance of MutationObserver.
			*
			* @private {MutationObserver}
			*/
			this.mutationsObserver_ = null;
			/**
			* A list of connected observers.
			*
			* @private {Array<ResizeObserverSPI>}
			*/
			this.observers_ = [];
			this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
			this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
		}
		/**
		* Adds observer to observers list.
		*
		* @param {ResizeObserverSPI} observer - Observer to be added.
		* @returns {void}
		*/
		ResizeObserverController.prototype.addObserver = function(observer) {
			if (!~this.observers_.indexOf(observer)) this.observers_.push(observer);
			if (!this.connected_) this.connect_();
		};
		/**
		* Removes observer from observers list.
		*
		* @param {ResizeObserverSPI} observer - Observer to be removed.
		* @returns {void}
		*/
		ResizeObserverController.prototype.removeObserver = function(observer) {
			var observers = this.observers_;
			var index = observers.indexOf(observer);
			if (~index) observers.splice(index, 1);
			if (!observers.length && this.connected_) this.disconnect_();
		};
		/**
		* Invokes the update of observers. It will continue running updates insofar
		* it detects changes.
		*
		* @returns {void}
		*/
		ResizeObserverController.prototype.refresh = function() {
			if (this.updateObservers_()) this.refresh();
		};
		/**
		* Updates every observer from observers list and notifies them of queued
		* entries.
		*
		* @private
		* @returns {boolean} Returns "true" if any observer has detected changes in
		*      dimensions of it's elements.
		*/
		ResizeObserverController.prototype.updateObservers_ = function() {
			var activeObservers = this.observers_.filter(function(observer) {
				return observer.gatherActive(), observer.hasActive();
			});
			activeObservers.forEach(function(observer) {
				return observer.broadcastActive();
			});
			return activeObservers.length > 0;
		};
		/**
		* Initializes DOM listeners.
		*
		* @private
		* @returns {void}
		*/
		ResizeObserverController.prototype.connect_ = function() {
			if (!isBrowser || this.connected_) return;
			document.addEventListener("transitionend", this.onTransitionEnd_);
			window.addEventListener("resize", this.refresh);
			if (mutationObserverSupported) {
				this.mutationsObserver_ = new MutationObserver(this.refresh);
				this.mutationsObserver_.observe(document, {
					attributes: true,
					childList: true,
					characterData: true,
					subtree: true
				});
			} else {
				document.addEventListener("DOMSubtreeModified", this.refresh);
				this.mutationEventsAdded_ = true;
			}
			this.connected_ = true;
		};
		/**
		* Removes DOM listeners.
		*
		* @private
		* @returns {void}
		*/
		ResizeObserverController.prototype.disconnect_ = function() {
			if (!isBrowser || !this.connected_) return;
			document.removeEventListener("transitionend", this.onTransitionEnd_);
			window.removeEventListener("resize", this.refresh);
			if (this.mutationsObserver_) this.mutationsObserver_.disconnect();
			if (this.mutationEventsAdded_) document.removeEventListener("DOMSubtreeModified", this.refresh);
			this.mutationsObserver_ = null;
			this.mutationEventsAdded_ = false;
			this.connected_ = false;
		};
		/**
		* "Transitionend" event handler.
		*
		* @private
		* @param {TransitionEvent} event
		* @returns {void}
		*/
		ResizeObserverController.prototype.onTransitionEnd_ = function(_a) {
			var _b = _a.propertyName, propertyName = _b === void 0 ? "" : _b;
			if (transitionKeys.some(function(key) {
				return !!~propertyName.indexOf(key);
			})) this.refresh();
		};
		/**
		* Returns instance of the ResizeObserverController.
		*
		* @returns {ResizeObserverController}
		*/
		ResizeObserverController.getInstance = function() {
			if (!this.instance_) this.instance_ = new ResizeObserverController();
			return this.instance_;
		};
		/**
		* Holds reference to the controller's instance.
		*
		* @private {ResizeObserverController}
		*/
		ResizeObserverController.instance_ = null;
		return ResizeObserverController;
	}();
	defineConfigurable = (function(target, props) {
		for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
			var key = _a[_i];
			Object.defineProperty(target, key, {
				value: props[key],
				enumerable: false,
				writable: false,
				configurable: true
			});
		}
		return target;
	});
	getWindowOf = (function(target) {
		return target && target.ownerDocument && target.ownerDocument.defaultView || global$1;
	});
	emptyRect = createRectInit(0, 0, 0, 0);
	isSVGGraphicsElement = (function() {
		if (typeof SVGGraphicsElement !== "undefined") return function(target) {
			return target instanceof getWindowOf(target).SVGGraphicsElement;
		};
		return function(target) {
			return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === "function";
		};
	})();
	ResizeObservation = function() {
		/**
		* Creates an instance of ResizeObservation.
		*
		* @param {Element} target - Element to be observed.
		*/
		function ResizeObservation(target) {
			/**
			* Broadcasted width of content rectangle.
			*
			* @type {number}
			*/
			this.broadcastWidth = 0;
			/**
			* Broadcasted height of content rectangle.
			*
			* @type {number}
			*/
			this.broadcastHeight = 0;
			/**
			* Reference to the last observed content rectangle.
			*
			* @private {DOMRectInit}
			*/
			this.contentRect_ = createRectInit(0, 0, 0, 0);
			this.target = target;
		}
		/**
		* Updates content rectangle and tells whether it's width or height properties
		* have changed since the last broadcast.
		*
		* @returns {boolean}
		*/
		ResizeObservation.prototype.isActive = function() {
			var rect = getContentRect(this.target);
			this.contentRect_ = rect;
			return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
		};
		/**
		* Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
		* from the corresponding properties of the last observed content rectangle.
		*
		* @returns {DOMRectInit} Last observed content rectangle.
		*/
		ResizeObservation.prototype.broadcastRect = function() {
			var rect = this.contentRect_;
			this.broadcastWidth = rect.width;
			this.broadcastHeight = rect.height;
			return rect;
		};
		return ResizeObservation;
	}();
	ResizeObserverEntry = function() {
		/**
		* Creates an instance of ResizeObserverEntry.
		*
		* @param {Element} target - Element that is being observed.
		* @param {DOMRectInit} rectInit - Data of the element's content rectangle.
		*/
		function ResizeObserverEntry(target, rectInit) {
			var contentRect = createReadOnlyRect(rectInit);
			defineConfigurable(this, {
				target,
				contentRect
			});
		}
		return ResizeObserverEntry;
	}();
	ResizeObserverSPI = function() {
		/**
		* Creates a new instance of ResizeObserver.
		*
		* @param {ResizeObserverCallback} callback - Callback function that is invoked
		*      when one of the observed elements changes it's content dimensions.
		* @param {ResizeObserverController} controller - Controller instance which
		*      is responsible for the updates of observer.
		* @param {ResizeObserver} callbackCtx - Reference to the public
		*      ResizeObserver instance which will be passed to callback function.
		*/
		function ResizeObserverSPI(callback, controller, callbackCtx) {
			/**
			* Collection of resize observations that have detected changes in dimensions
			* of elements.
			*
			* @private {Array<ResizeObservation>}
			*/
			this.activeObservations_ = [];
			/**
			* Registry of the ResizeObservation instances.
			*
			* @private {Map<Element, ResizeObservation>}
			*/
			this.observations_ = new MapShim();
			if (typeof callback !== "function") throw new TypeError("The callback provided as parameter 1 is not a function.");
			this.callback_ = callback;
			this.controller_ = controller;
			this.callbackCtx_ = callbackCtx;
		}
		/**
		* Starts observing provided element.
		*
		* @param {Element} target - Element to be observed.
		* @returns {void}
		*/
		ResizeObserverSPI.prototype.observe = function(target) {
			if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
			if (typeof Element === "undefined" || !(Element instanceof Object)) return;
			if (!(target instanceof getWindowOf(target).Element)) throw new TypeError("parameter 1 is not of type \"Element\".");
			var observations = this.observations_;
			if (observations.has(target)) return;
			observations.set(target, new ResizeObservation(target));
			this.controller_.addObserver(this);
			this.controller_.refresh();
		};
		/**
		* Stops observing provided element.
		*
		* @param {Element} target - Element to stop observing.
		* @returns {void}
		*/
		ResizeObserverSPI.prototype.unobserve = function(target) {
			if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
			if (typeof Element === "undefined" || !(Element instanceof Object)) return;
			if (!(target instanceof getWindowOf(target).Element)) throw new TypeError("parameter 1 is not of type \"Element\".");
			var observations = this.observations_;
			if (!observations.has(target)) return;
			observations.delete(target);
			if (!observations.size) this.controller_.removeObserver(this);
		};
		/**
		* Stops observing all elements.
		*
		* @returns {void}
		*/
		ResizeObserverSPI.prototype.disconnect = function() {
			this.clearActive();
			this.observations_.clear();
			this.controller_.removeObserver(this);
		};
		/**
		* Collects observation instances the associated element of which has changed
		* it's content rectangle.
		*
		* @returns {void}
		*/
		ResizeObserverSPI.prototype.gatherActive = function() {
			var _this = this;
			this.clearActive();
			this.observations_.forEach(function(observation) {
				if (observation.isActive()) _this.activeObservations_.push(observation);
			});
		};
		/**
		* Invokes initial callback function with a list of ResizeObserverEntry
		* instances collected from active resize observations.
		*
		* @returns {void}
		*/
		ResizeObserverSPI.prototype.broadcastActive = function() {
			if (!this.hasActive()) return;
			var ctx = this.callbackCtx_;
			var entries = this.activeObservations_.map(function(observation) {
				return new ResizeObserverEntry(observation.target, observation.broadcastRect());
			});
			this.callback_.call(ctx, entries, ctx);
			this.clearActive();
		};
		/**
		* Clears the collection of active observations.
		*
		* @returns {void}
		*/
		ResizeObserverSPI.prototype.clearActive = function() {
			this.activeObservations_.splice(0);
		};
		/**
		* Tells whether observer has active observations.
		*
		* @returns {boolean}
		*/
		ResizeObserverSPI.prototype.hasActive = function() {
			return this.activeObservations_.length > 0;
		};
		return ResizeObserverSPI;
	}();
	observers = typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : new MapShim();
	ResizeObserver = function() {
		/**
		* Creates a new instance of ResizeObserver.
		*
		* @param {ResizeObserverCallback} callback - Callback that is invoked when
		*      dimensions of the observed elements change.
		*/
		function ResizeObserver(callback) {
			if (!(this instanceof ResizeObserver)) throw new TypeError("Cannot call a class as a function.");
			if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
			var observer = new ResizeObserverSPI(callback, ResizeObserverController.getInstance(), this);
			observers.set(this, observer);
		}
		return ResizeObserver;
	}();
	[
		"observe",
		"unobserve",
		"disconnect"
	].forEach(function(method) {
		ResizeObserver.prototype[method] = function() {
			var _a;
			return (_a = observers.get(this))[method].apply(_a, arguments);
		};
	});
	index = (function() {
		if (typeof global$1.ResizeObserver !== "undefined") return global$1.ResizeObserver;
		return ResizeObserver;
	})();
}));
//#endregion
//#region node_modules/react-grid-layout/build/components/WidthProvider.js
var require_WidthProvider = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = WidthProvideRGL;
	var React = _interopRequireWildcard(require_react());
	var _propTypes = _interopRequireDefault(require_prop_types());
	var _resizeObserverPolyfill = _interopRequireDefault((init_ResizeObserver_es(), __toCommonJS(ResizeObserver_es_exports)));
	var _clsx = _interopRequireDefault(require_clsx());
	var _excluded = ["measureBeforeMount"];
	function _interopRequireDefault(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function _interopRequireWildcard(e, t) {
		if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
		return (_interopRequireWildcard = function(e, t) {
			if (!t && e && e.__esModule) return e;
			var o, i, f = {
				__proto__: null,
				default: e
			};
			if (null === e || "object" != typeof e && "function" != typeof e) return f;
			if (o = t ? n : r) {
				if (o.has(e)) return o.get(e);
				o.set(e, f);
			}
			for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]);
			return f;
		})(e, t);
	}
	function _extends() {
		return _extends = Object.assign ? Object.assign.bind() : function(n) {
			for (var e = 1; e < arguments.length; e++) {
				var t = arguments[e];
				for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
			}
			return n;
		}, _extends.apply(null, arguments);
	}
	function _objectWithoutProperties(e, t) {
		if (null == e) return {};
		var o, r, i = _objectWithoutPropertiesLoose(e, t);
		if (Object.getOwnPropertySymbols) {
			var n = Object.getOwnPropertySymbols(e);
			for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
		}
		return i;
	}
	function _objectWithoutPropertiesLoose(r, e) {
		if (null == r) return {};
		var t = {};
		for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
			if (-1 !== e.indexOf(n)) continue;
			t[n] = r[n];
		}
		return t;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == typeof i ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != typeof t || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != typeof i) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	var layoutClassName = "react-grid-layout";
	function WidthProvideRGL(ComposedComponent) {
		var _WidthProvider;
		return _WidthProvider = class WidthProvider extends React.Component {
			constructor() {
				super(...arguments);
				_defineProperty(this, "state", { width: 1280 });
				_defineProperty(this, "elementRef", /* @__PURE__ */ React.createRef());
				_defineProperty(this, "mounted", false);
				_defineProperty(this, "resizeObserver", void 0);
			}
			componentDidMount() {
				this.mounted = true;
				this.resizeObserver = new _resizeObserverPolyfill.default((entries) => {
					if (this.elementRef.current instanceof HTMLElement) {
						const width = entries[0].contentRect.width;
						this.setState({ width });
					}
				});
				const node = this.elementRef.current;
				if (node instanceof HTMLElement) this.resizeObserver.observe(node);
			}
			componentWillUnmount() {
				this.mounted = false;
				const node = this.elementRef.current;
				if (node instanceof HTMLElement) this.resizeObserver.unobserve(node);
				this.resizeObserver.disconnect();
			}
			render() {
				const _this$props = this.props, { measureBeforeMount } = _this$props, rest = _objectWithoutProperties(_this$props, _excluded);
				if (measureBeforeMount && !this.mounted) return /* @__PURE__ */ React.createElement("div", {
					className: (0, _clsx.default)(this.props.className, layoutClassName),
					style: this.props.style,
					ref: this.elementRef
				});
				return /* @__PURE__ */ React.createElement(ComposedComponent, _extends({ innerRef: this.elementRef }, rest, this.state));
			}
		}, _defineProperty(_WidthProvider, "defaultProps", { measureBeforeMount: false }), _defineProperty(_WidthProvider, "propTypes", { measureBeforeMount: _propTypes.default.bool }), _WidthProvider;
	}
}));
//#endregion
//#region node_modules/react-grid-layout/index.js
var require_react_grid_layout = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_ReactGridLayout().default;
	module.exports.utils = require_utils$1();
	module.exports.calculateUtils = require_calculateUtils();
	module.exports.Responsive = require_ResponsiveReactGridLayout().default;
	module.exports.Responsive.utils = require_responsiveUtils();
	module.exports.WidthProvider = require_WidthProvider().default;
}));
//#endregion
export default require_react_grid_layout();

//# sourceMappingURL=react-grid-layout.js.map