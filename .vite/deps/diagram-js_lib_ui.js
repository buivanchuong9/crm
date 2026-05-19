import { Component as x, Fragment as k, cloneElement as K, createContext as Q, createElement as _, createRef as b, hydrate as J, isValidElement as t, options as l, render as G, toChildArray as H } from "./preact.js";
import { useCallback as q, useContext as x$1, useDebugValue as P, useEffect as y, useErrorBoundary as b$1, useId as g, useImperativeHandle as F, useLayoutEffect as _$1, useMemo as T, useReducer as h, useRef as A, useState as d } from "./preact_hooks.js";
//#region node_modules/htm/dist/htm.module.js
var n = function(t, s, r, e) {
	var u;
	s[0] = 0;
	for (var h = 1; h < s.length; h++) {
		var p = s[h++], a = s[h] ? (s[0] |= p ? 1 : 2, r[s[h++]]) : s[++h];
		3 === p ? e[0] = a : 4 === p ? e[1] = Object.assign(e[1] || {}, a) : 5 === p ? (e[1] = e[1] || {})[s[++h]] = a : 6 === p ? e[1][s[++h]] += a + "" : p ? (u = t.apply(a, n(t, a, r, ["", null])), e.push(u), a[0] ? s[0] |= 2 : (s[h - 2] = 0, s[h] = u)) : e.push(a);
	}
	return e;
}, t$1 = /* @__PURE__ */ new Map();
function htm_module_default(s) {
	var r = t$1.get(this);
	return r || (r = /* @__PURE__ */ new Map(), t$1.set(this, r)), (r = n(this, r.get(s) || (r.set(s, r = function(n) {
		for (var t, s, r = 1, e = "", u = "", h = [0], p = function(n) {
			1 === r && (n || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? h.push(0, n, e) : 3 === r && (n || e) ? (h.push(3, n, e), r = 2) : 2 === r && "..." === e && n ? h.push(4, n, 0) : 2 === r && e && !n ? h.push(5, 0, !0, e) : r >= 5 && ((e || !n && 5 === r) && (h.push(r, 0, e, s), r = 6), n && (h.push(r, n, 0, s), r = 6)), e = "";
		}, a = 0; a < n.length; a++) {
			a && (1 === r && p(), p(a));
			for (var l = 0; l < n[a].length; l++) t = n[a][l], 1 === r ? "<" === t ? (p(), h = [h], r = 3) : e += t : 4 === r ? "--" === e && ">" === t ? (r = 1, e = "") : e = t + e[0] : u ? t === u ? u = "" : e += t : "\"" === t || "'" === t ? u = t : ">" === t ? (p(), r = 1) : r && ("=" === t ? (r = 5, s = e, e = "") : "/" === t && (r < 5 || ">" === n[a][l + 1]) ? (p(), 3 === r && (h = h[0]), r = h, (h = h[0]).push(2, 0, r), r = 0) : " " === t || "	" === t || "\n" === t || "\r" === t ? (p(), r = 2) : e += t), 3 === r && "!--" === e && (r = 4, h = h[0]);
		}
		return p(), h;
	}(s)), r), arguments, [])).length > 1 ? r : r[0];
}
//#endregion
//#region node_modules/htm/preact/index.module.js
var m = htm_module_default.bind(_);
//#endregion
export { x as Component, k as Fragment, K as cloneElement, Q as createContext, _ as createElement, _ as h, b as createRef, m as html, J as hydrate, t as isValidElement, l as options, G as render, H as toChildArray, q as useCallback, x$1 as useContext, P as useDebugValue, y as useEffect, b$1 as useErrorBoundary, g as useId, F as useImperativeHandle, _$1 as useLayoutEffect, T as useMemo, h as useReducer, A as useRef, d as useState };

//# sourceMappingURL=diagram-js_lib_ui.js.map