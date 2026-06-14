import { t as __commonJSMin } from "./chunk-CqwQKh_b.js";
import { a as _nonIterableRest, c as init_unsupportedIterableToArray, d as _arrayWithHoles, f as init_arrayWithHoles, o as init_nonIterableRest, s as _unsupportedIterableToArray } from "./objectWithoutProperties-DMTD0yPL.js";
import { a as _possibleConstructorReturn, i as init_iterableToArray, l as _getPrototypeOf, o as init_possibleConstructorReturn, r as _iterableToArray, u as init_getPrototypeOf } from "./toConsumableArray-ES8cyR8Y.js";
import { t as _isNativeReflectConstruct } from "./isNativeReflectConstruct-O601XLfQ.js";
//#region node_modules/@babel/runtime/helpers/esm/toArray.js
init_arrayWithHoles();
init_iterableToArray();
init_unsupportedIterableToArray();
init_nonIterableRest();
function _toArray(r) {
	return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest();
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/callSuper.js
init_getPrototypeOf();
init_possibleConstructorReturn();
function _callSuper(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
//#endregion
//#region node_modules/dayjs/plugin/localeData.js
var require_localeData = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(n, e) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (n = "undefined" != typeof globalThis ? globalThis : n || self).dayjs_plugin_localeData = e();
	})(exports, (function() {
		"use strict";
		return function(n, e, t) {
			var r = e.prototype, o = function(n) {
				return n && (n.indexOf ? n : n.s);
			}, u = function(n, e, t, r, u) {
				var i = n.name ? n : n.$locale(), a = o(i[e]), s = o(i[t]), f = a || s.map((function(n) {
					return n.slice(0, r);
				}));
				if (!u) return f;
				var d = i.weekStart;
				return f.map((function(n, e) {
					return f[(e + (d || 0)) % 7];
				}));
			}, i = function() {
				return t.Ls[t.locale()];
			}, a = function(n, e) {
				return n.formats[e] || function(n) {
					return n.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(n, e, t) {
						return e || t.slice(1);
					}));
				}(n.formats[e.toUpperCase()]);
			}, s = function() {
				var n = this;
				return {
					months: function(e) {
						return e ? e.format("MMMM") : u(n, "months");
					},
					monthsShort: function(e) {
						return e ? e.format("MMM") : u(n, "monthsShort", "months", 3);
					},
					firstDayOfWeek: function() {
						return n.$locale().weekStart || 0;
					},
					weekdays: function(e) {
						return e ? e.format("dddd") : u(n, "weekdays");
					},
					weekdaysMin: function(e) {
						return e ? e.format("dd") : u(n, "weekdaysMin", "weekdays", 2);
					},
					weekdaysShort: function(e) {
						return e ? e.format("ddd") : u(n, "weekdaysShort", "weekdays", 3);
					},
					longDateFormat: function(e) {
						return a(n.$locale(), e);
					},
					meridiem: this.$locale().meridiem,
					ordinal: this.$locale().ordinal
				};
			};
			r.localeData = function() {
				return s.bind(this)();
			}, t.localeData = function() {
				var n = i();
				return {
					firstDayOfWeek: function() {
						return n.weekStart || 0;
					},
					weekdays: function() {
						return t.weekdays();
					},
					weekdaysShort: function() {
						return t.weekdaysShort();
					},
					weekdaysMin: function() {
						return t.weekdaysMin();
					},
					months: function() {
						return t.months();
					},
					monthsShort: function() {
						return t.monthsShort();
					},
					longDateFormat: function(e) {
						return a(n, e);
					},
					meridiem: n.meridiem,
					ordinal: n.ordinal
				};
			}, t.months = function() {
				return u(i(), "months");
			}, t.monthsShort = function() {
				return u(i(), "monthsShort", "months", 3);
			}, t.weekdays = function(n) {
				return u(i(), "weekdays", null, null, n);
			}, t.weekdaysShort = function(n) {
				return u(i(), "weekdaysShort", "weekdays", 3, n);
			}, t.weekdaysMin = function(n) {
				return u(i(), "weekdaysMin", "weekdays", 2, n);
			};
		};
	}));
}));
//#endregion
export { _callSuper as n, _toArray as r, require_localeData as t };

//# sourceMappingURL=localeData-BYwGtiCF.js.map