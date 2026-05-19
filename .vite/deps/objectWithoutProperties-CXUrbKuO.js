import { n as __esmMin } from "./chunk-CqwQKh_b.js";
import { n as init_objectWithoutPropertiesLoose, t as _objectWithoutPropertiesLoose } from "./objectWithoutPropertiesLoose-Cv-3q2Zj.js";
//#region node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
var init_arrayLikeToArray = __esmMin((() => {}));
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js
function _arrayWithoutHoles(r) {
	if (Array.isArray(r)) return _arrayLikeToArray(r);
}
var init_arrayWithoutHoles = __esmMin((() => {
	init_arrayLikeToArray();
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(r) {
	if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
var init_iterableToArray = __esmMin((() => {}));
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
function _unsupportedIterableToArray(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
	}
}
var init_unsupportedIterableToArray = __esmMin((() => {
	init_arrayLikeToArray();
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var init_nonIterableSpread = __esmMin((() => {}));
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/toConsumableArray.js
function _toConsumableArray(r) {
	return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
var init_toConsumableArray = __esmMin((() => {
	init_arrayWithoutHoles();
	init_iterableToArray();
	init_unsupportedIterableToArray();
	init_nonIterableSpread();
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(r) {
	if (Array.isArray(r)) return r;
}
var init_arrayWithHoles = __esmMin((() => {}));
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r) {
			o = !0, n = r;
		} finally {
			try {
				if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
var init_iterableToArrayLimit = __esmMin((() => {}));
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var init_nonIterableRest = __esmMin((() => {}));
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/slicedToArray.js
function _slicedToArray(r, e) {
	return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
var init_slicedToArray = __esmMin((() => {
	init_arrayWithHoles();
	init_iterableToArrayLimit();
	init_unsupportedIterableToArray();
	init_nonIterableRest();
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
function _objectWithoutProperties(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
var init_objectWithoutProperties = __esmMin((() => {
	init_objectWithoutPropertiesLoose();
}));
//#endregion
export { _nonIterableRest as a, init_arrayWithHoles as c, _unsupportedIterableToArray as d, init_unsupportedIterableToArray as f, init_slicedToArray as i, _toConsumableArray as l, init_iterableToArray as m, init_objectWithoutProperties as n, init_nonIterableRest as o, _iterableToArray as p, _slicedToArray as r, _arrayWithHoles as s, _objectWithoutProperties as t, init_toConsumableArray as u };

//# sourceMappingURL=objectWithoutProperties-CXUrbKuO.js.map