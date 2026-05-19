import { o as __toESM } from "./chunk-CqwQKh_b.js";
import { n as Ids } from "./dist-B7vrgYhE.js";
import { assign, bind, debounce, forEach, get as get$1, has, isArray, isDefined, isFunction, isNil, isNumber, isObject, isString, reduce, set as set$1, uniqueBy, without } from "./min-dash.js";
import { A as FormFields, At as getSchemaVariables, C as FieldFactory, Cn as indentNodeProp, Ct as createInjector, D as FormContext, E as FormComponent, En as syntaxTree, F as IFrame, G as OPTIONS_SOURCES_DEFAULTS, H as MarkdownRendererModule, Ht as sanitizeImageSource, Jn as EditorState, K as OPTIONS_SOURCES_LABELS, Kn as Compartment, L as Importer, Ln as keymap, M as FormRenderContext, Nt as iconsByType, On as EditorView, Ot as getAncestryList, P as Html, R as Label$3, Rn as lineNumbers, Rt as runRecursively, Sn as foldNodeProp, St as createFormContainer, Tn as syntaxHighlighting, Un as tooltips, W as OPTIONS_SOURCES, Y as PathRegistry, Yn as Facet, Zt as FeelersEditor, _ as ExpressionField, ar as styleTags, at as TEXT_VIEW_DEFAULT_TEXT, bn as foldInside, bt as clone, c as DATETIME_SUBTYPE_PATH, cr as ExternalTokenizer, ct as TIME_SERIALISINGFORMAT_LABELS, dn as snippetCompletion$1, dr as D, dt as TIME_USE24H_PATH, en as linter$1, fn as HighlightStyle, fr as u, ft as Table, gn as continuedIndent, hn as bracketMatching, j as FormLayouter, jt as getScrollContainer, k as FormFieldRegistry$1, kt as getOptionsSource, l as DATE_DISALLOW_PAST_PATH, ln as completeFromList, lr as LRParser, lt as TIME_SERIALISING_FORMATS, m as DocumentPreview, mn as LanguageSupport, mt as Text$1, nn as defaultKeymap, o as DATETIME_SUBTYPES, on as autocompletion, or as tags, ot as TIME_INTERVAL_PATH, pn as LRLanguage, pr as Big, q as OPTIONS_SOURCES_PATHS, s as DATETIME_SUBTYPES_LABELS, sn as closeBrackets, sr as ContextTracker, st as TIME_LABEL_PATH, tn as setDiagnosticsEffect, tt as SECURITY_ATTRIBUTES_DEFINITIONS, u as DATE_LABEL_PATH, ur as $, ut as TIME_SERIALISING_FORMAT_PATH, vn as delimitedIndent, wn as indentOnInput, x as FeelExpressionLanguage, zn as placeholder } from "./index.es-BzGRxDPK.js";
import { t as require_classnames } from "./classnames.js";
import { Fragment as k, createContext as Q, createElement as _, render as G } from "./preact.js";
import { useCallback as q, useContext as x, useEffect as y, useLayoutEffect as _$1, useMemo as T$1, useRef as A, useState as d } from "./preact_hooks.js";
import { c as domify$1, d as query, i as classes, l as event } from "./index.esm-E5VQvuu4.js";
import { a as tabbable, i as isTabbable, n as getTabIndex, r as isFocusable, t as focusable } from "./index.esm-CyuVsgC3.js";
//#region node_modules/@bpmn-io/draggle/dist/draggle.js
var import_classnames = /* @__PURE__ */ __toESM(require_classnames());
function _e(t) {
	return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Ne = function(n, o) {
	return Array.prototype.slice.call(n, o);
}, Be = typeof setImmediate == "function", z;
Be ? z = function(t) {
	setImmediate(t);
} : z = function(t) {
	setTimeout(t, 0);
};
var Xe = z, Ie = function(n, o, l) {
	n && Xe(function() {
		n.apply(l || null, o || []);
	});
}, ee = Ne, Te = Ie, Ye = function(n, o) {
	var l = o || {}, c = {};
	return n === void 0 && (n = {}), n.on = function(d, h) {
		return c[d] ? c[d].push(h) : c[d] = [h], n;
	}, n.once = function(d, h) {
		return h._once = !0, n.on(d, h), n;
	}, n.off = function(d, h) {
		var S = arguments.length;
		if (S === 1) delete c[d];
		else if (S === 0) c = {};
		else {
			var C = c[d];
			if (!C) return n;
			C.splice(C.indexOf(h), 1);
		}
		return n;
	}, n.emit = function() {
		var d = ee(arguments);
		return n.emitterSnapshot(d.shift()).apply(this, d);
	}, n.emitterSnapshot = function(d) {
		var h = (c[d] || []).slice(0);
		return function() {
			var S = ee(arguments), C = this || n;
			if (d === "error" && l.throws !== !1 && !h.length) throw S.length === 1 ? S[0] : S;
			return h.forEach(function(E) {
				l.async ? Te(E, S, C) : E.apply(C, S), E._once && n.off(d, E);
			}), n;
		};
	}, n;
};
var Le = /* @__PURE__ */ _e(Ye), te = {}, xe = "(?:^|\\s)", Re = "(?:\\s|$)";
function le(t) {
	let n = te[t];
	return n ? n.lastIndex = 0 : te[t] = n = new RegExp(xe + t + Re, "g"), n;
}
function Y(t, n) {
	const o = t.className;
	o.length ? le(n).test(o) || (t.className += " " + n) : t.className = n;
}
function L(t, n) {
	t.className = t.className.replace(le(n), " ").trim();
}
var ke = (t, n) => ({
	containers: n,
	moves: () => !0,
	accepts: () => !0,
	invalid: () => !1,
	isContainer: () => !1,
	transformOffset: (o) => o,
	copy: !1,
	copySortSource: !1,
	revertOnSpill: !1,
	removeOnSpill: !1,
	direction: "vertical",
	ignoreInputTextSelection: !0,
	mirrorContainer: document.body,
	...t
});
function ne(t) {
	if (t.touches !== void 0) return t.touches.length;
	if (t.which !== void 0 && t.which !== 0) return t.which;
	if (t.buttons !== void 0) return t.buttons;
	const n = t.button;
	if (n !== void 0) return n & 1 ? 1 : n & 2 ? 3 : n & 4 ? 2 : 0;
}
var Ae = (t) => {
	const n = t.getBoundingClientRect();
	return {
		left: n.left + re("scrollLeft", "pageXOffset"),
		top: n.top + re("scrollTop", "pageYOffset")
	};
}, re = (t, n) => typeof global[n] < "u" ? global[n] : document.documentElement.clientHeight ? document.documentElement[t] : document.body[t], ie = (t = {}, n, o) => {
	const l = t.className || "";
	t.className += " gu-hide";
	const c = document.elementFromPoint(n, o);
	return t.className = l, c;
}, oe = (t) => t.width || t.right - t.left, ce = (t) => t.height || t.bottom - t.top, v = (t) => t.parentNode === document ? null : t.parentNode, ue = (t) => [
	"INPUT",
	"TEXTAREA",
	"SELECT"
].includes(t == null ? void 0 : t.tagName) || se(t), se = (t) => !t || t.contentEditable === "false" ? !1 : t.contentEditable === "true" ? !0 : se(v(t)), T = (t) => {
	const n = () => {
		let o = t;
		do
			o = o.nextSibling;
		while (o && o.nodeType !== 1);
		return o;
	};
	return t.nextElementSibling || n();
};
window.global || (window.global = window);
var fe = document, M = fe.documentElement;
function De(t = [], n = {}) {
	Array.isArray(t) || (n = t, t = []);
	let o, l, c, d, h, S, C, X, E, a, x, N, I;
	const s = ke(n, t), f = Le({
		containers: s.containers,
		start: ve,
		end: G,
		cancel: q,
		remove: W,
		destroy: ae,
		canMove: ge,
		dragging: !1
	});
	return s.removeOnSpill && f.on("over", he).on("out", be), j(), f;
	function R(e) {
		return f.containers.indexOf(e) !== -1 || s.isContainer(e);
	}
	function j(e) {
		const r = e ? "removeEventListener" : "addEventListener";
		M[r]("pointerdown", me, !0), M[r]("pointerup", D, !0);
	}
	function k(e) {
		M[e ? "removeEventListener" : "addEventListener"]("pointermove", pe, !0);
	}
	function H(e) {
		M[e ? "removeEventListener" : "addEventListener"]("click", de, !0);
	}
	function ae() {
		j(!0), D({});
	}
	function de(e) {
		I && e.preventDefault();
	}
	function me(e) {
		if (S = e.clientX, C = e.clientY, ne(e) !== 1 || e.metaKey || e.ctrlKey) return;
		const i = e.target, u = A(i);
		u && (I = u, k(), e.type === "pointerdown" && (ue(i) ? i.focus() : e.preventDefault()));
	}
	function pe(e) {
		if (!I) return;
		if (ne(e) === 0) {
			D({});
			return;
		}
		if (e.clientX !== void 0 && Math.abs(e.clientX - S) <= (s.slideFactorX || 0) && e.clientY !== void 0 && Math.abs(e.clientY - C) <= (s.slideFactorY || 0)) return;
		if (s.ignoreInputTextSelection) {
			const { clientX: O = 0, clientY: m = 0 } = e;
			if (ue(fe.elementFromPoint(O, m))) return;
		}
		const r = I;
		k(!0), H(), G(), K(r);
		const i = Ae(c), u = s.transformOffset(i, e, c), { pageX: g = 0, pageY: p = 0 } = e;
		d = g - u.left, h = p - u.top, Y(a || c, "gu-transit"), ye(), $(e);
	}
	function A(e) {
		if (f.dragging && o || R(e)) return;
		const r = e;
		for (; v(e) && R(v(e)) === !1;) if (s.invalid(e, r) || (e = v(e), !e)) return;
		const i = v(e);
		if (!(!i || s.invalid(e, r) || !s.moves(e, i, r, T(e)))) return {
			item: e,
			source: i
		};
	}
	function ge(e) {
		return !!A(e);
	}
	function ve(e) {
		const r = A(e);
		r && K(r);
	}
	function K(e) {
		Ee(e.item, e.source) && (a = e.item.cloneNode(!0), f.emit("cloned", a, e.item, "copy")), l = e.source, c = e.item, X = E = T(e.item), f.dragging = !0, f.emit("drag", c, l);
	}
	function G() {
		if (!f.dragging) return;
		const e = a || c;
		V(e, v(e));
	}
	function U() {
		I = !1, k(!0), H(!0);
	}
	function D(e) {
		if (U(), !f.dragging) return;
		const r = a || c, { clientX: i = 0, clientY: u = 0 } = e, p = J(ie(o, i, u), i, u);
		p && (a && s.copySortSource || !a || p !== l) ? V(r, p) : s.removeOnSpill ? W() : q();
	}
	function V(e, r) {
		const i = v(e);
		a && s.copySortSource && r === l && i.removeChild(c), P(r) ? f.emit("cancel", e, l, l) : f.emit("drop", e, r, l, E), F();
	}
	function W() {
		if (!f.dragging) return;
		const e = a || c, r = v(e);
		r && r.removeChild(e), f.emit(a ? "cancel" : "remove", e, r, l), F();
	}
	function q(e) {
		if (!f.dragging) return;
		const r = arguments.length > 0 ? e : s.revertOnSpill, i = a || c, u = v(i), g = P(u);
		g === !1 && r && (a ? u && u.removeChild(a) : l.insertBefore(i, X)), g || r ? f.emit("cancel", i, l, l) : f.emit("drop", i, u, l, E), F();
	}
	function F() {
		const e = a || c;
		U(), Se(), e && L(e, "gu-transit"), x && clearTimeout(x), f.dragging = !1, N && f.emit("out", e, N, l), f.emit("dragend", e), l = c = a = X = E = x = N = null;
	}
	function P(e, r) {
		let i;
		return r !== void 0 ? i = r : o ? i = E : i = T(a || c), e === l && i === X;
	}
	function J(e, r, i) {
		let u = e;
		for (; u && !g();) u = v(u);
		return u;
		function g() {
			if (R(u) === !1) return !1;
			const O = Q(u, e), m = Z(u, O, r, i);
			return P(u, m) ? !0 : s.accepts(c, u, l, m);
		}
	}
	function $(e) {
		if (!o) return;
		e.preventDefault();
		const { clientX: r = 0, clientY: i = 0 } = e, u = r - d, g = i - h;
		o.style.left = u + "px", o.style.top = g + "px";
		const p = a || c, O = ie(o, r, i);
		let m = J(O, r, i);
		const w = m !== null && m !== N;
		(w || m === null) && (we(), N = m, Ce());
		const b = v(p);
		if (m === l && a && !s.copySortSource) {
			b && b.removeChild(p);
			return;
		}
		let y;
		const B = Q(m, O);
		if (B !== null) y = Z(m, B, r, i);
		else if (s.revertOnSpill === !0 && !a) y = X, m = l;
		else {
			a && b && b.removeChild(p);
			return;
		}
		(y === null && w || y !== p && y !== T(p)) && (E = y, m.insertBefore(p, y), f.emit("shadow", p, m, l));
		function _(Oe) {
			f.emit(Oe, p, N, l);
		}
		function Ce() {
			w && _("over");
		}
		function we() {
			N && _("out");
		}
	}
	function he(e) {
		L(e, "gu-hide");
	}
	function be(e) {
		f.dragging && Y(e, "gu-hide");
	}
	function ye() {
		if (o) return;
		const e = c.getBoundingClientRect();
		o = c.cloneNode(!0), o.style.width = oe(e) + "px", o.style.height = ce(e) + "px", L(o, "gu-transit"), Y(o, "gu-mirror"), s.mirrorContainer.appendChild(o), M.addEventListener("pointermove", $), Y(s.mirrorContainer, "gu-unselectable"), f.emit("cloned", o, c, "mirror");
	}
	function Se() {
		o && (L(s.mirrorContainer, "gu-unselectable"), M.removeEventListener("pointermove", $), v(o).removeChild(o), o = null);
	}
	function Q(e, r) {
		let i = r;
		for (; i !== e && v(i) !== e;) i = v(i);
		return i === M ? null : i;
	}
	function Z(e, r, i, u) {
		const g = (typeof s.direction == "function" ? s.direction(c, e, l) : s.direction) === "horizontal";
		return r !== e ? m() : O();
		function O() {
			const b = e.children.length;
			let y, B, _;
			for (y = 0; y < b; y++) if (B = e.children[y], _ = B.getBoundingClientRect(), g && _.left + _.width / 2 > i || !g && _.top + _.height / 2 > u) return B;
			return null;
		}
		function m() {
			const b = r.getBoundingClientRect();
			return w(g ? i > b.left + oe(b) / 2 : u > b.top + ce(b) / 2);
		}
		function w(b) {
			return b ? T(r) : r;
		}
	}
	function Ee(e, r) {
		return typeof s.copy == "boolean" ? s.copy : s.copy(e, r);
	}
}
//#endregion
//#region node_modules/array-move/index.js
function arrayMoveMutable(array, fromIndex, toIndex) {
	const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;
	if (startIndex >= 0 && startIndex < array.length) {
		const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;
		const [item] = array.splice(fromIndex, 1);
		array.splice(endIndex, 0, item);
	}
}
//#endregion
//#region node_modules/@bpmn-io/lezer-feel/dist/index.js
var propertyIdentifier = 121, identifier = 122, nameIdentifier = 123, insertSemi = 124, expression0 = 128, ForExpression = 4, forExpressionStart = 131, ForInExpression = 7, Name = 8, Identifier = 9, AdditionalIdentifier = 10, forExpressionBodyStart = 139, IfExpression = 19, ifExpressionStart = 140, QuantifiedExpression = 23, quantifiedExpressionStart = 141, QuantifiedInExpression = 27, PositiveUnaryTest = 37, ArithmeticExpression = 41, arithmeticPlusStart = 145, arithmeticTimesStart = 146, arithmeticExpStart = 147, arithmeticUnaryStart = 148, VariableName = 47, PathExpression = 68, pathExpressionStart = 154, FilterExpression = 70, filterExpressionStart = 155, FunctionInvocation = 72, functionInvocationStart = 156, ParameterName = 76, nil = 161, NumericLiteral = 79, StringLiteral = 80, BooleanLiteral = 81, listStart = 168, List = 89, FunctionDefinition = 90, functionDefinitionStart = 170, Context = 97, contextStart = 172, ContextEntry = 98, PropertyName = 100, PropertyIdentifier = 101;
var LOG_PARSE = typeof process != "undefined" && process.env && /\bfparse(:dbg)?\b/.test(process.env.LOG);
var LOG_PARSE_DEBUG = typeof process != "undefined" && process.env && /\bfparse:dbg\b/.test(process.env.LOG);
var LOG_VARS = typeof process != "undefined" && process.env && /\bcontext\b/.test(process.env.LOG);
var spaceChars = [
	9,
	11,
	12,
	32,
	133,
	160,
	5760,
	8192,
	8193,
	8194,
	8195,
	8196,
	8197,
	8198,
	8199,
	8200,
	8201,
	8202,
	8232,
	8233,
	8239,
	8287,
	12288
];
var newlineChars = chars("\n\r");
var asterix = "*".charCodeAt(0);
var additionalNameChars = chars("'./-+*^");
/**
* @typedef { VariableContext | any } ContextValue
*/
/**
* @param { string } str
* @return { number[] }
*/
function chars(str) {
	return Array.from(str).map((s) => s.charCodeAt(0));
}
/**
* @param { number } ch
* @return { boolean }
*/
function isStartChar(ch) {
	return ch === 63 || ch >= 65 && ch <= 90 || ch === 95 || ch >= 97 && ch <= 122 || ch >= 192 && ch <= 214 || ch >= 216 && ch <= 246 || ch >= 248 && ch <= 767 || ch >= 880 && ch <= 893 || ch >= 895 && ch <= 8191 || ch >= 8204 && ch <= 8205 || ch >= 8304 && ch <= 8591 || ch >= 11264 && ch <= 12271 || ch >= 12289 && ch <= 55295 || ch >= 63744 && ch <= 64975 || ch >= 65008 && ch <= 65533 || ch >= 55296 && ch <= 56319 || ch >= 56320 && ch <= 57343;
}
/**
* @param { number } ch
* @return { boolean }
*/
function isAdditional(ch) {
	return additionalNameChars.includes(ch);
}
/**
* @param { number } ch
* @return { boolean }
*/
function isPartChar(ch) {
	return ch >= 48 && ch <= 57 || ch === 183 || ch >= 768 && ch <= 879 || ch >= 8255 && ch <= 8256;
}
/**
* @param { number } ch
* @return { boolean }
*/
function isSpace(ch) {
	return spaceChars.includes(ch);
}
function indent(str, spaces) {
	return spaces.concat(str.split(/\n/g).join("\n" + spaces));
}
/**
* @param { import('@lezer/lr').InputStream } input
* @param  { number } [offset]
*
* @return { { token: string, offset: number } | null }
*/
function parseAdditionalSymbol(input, offset = 0) {
	const next = input.peek(offset);
	if (next === asterix && input.peek(offset + 1) === asterix) return {
		offset: 2,
		token: "**"
	};
	if (isAdditional(next)) return {
		offset: 1,
		token: String.fromCharCode(next)
	};
	return null;
}
/**
* @param { import('@lezer/lr').InputStream } input
* @param { number } [offset]
* @param { boolean } [namePart]
*
* @return { { token: string, offset: number } | null }
*/
function parseIdentifier(input, offset = 0, namePart = false) {
	for (let inside = false, chars = [], i = 0;; i++) {
		const next = input.peek(offset + i);
		if (isStartChar(next) || (inside || namePart) && isPartChar(next)) {
			if (!inside) inside = true;
			chars.push(next);
		} else {
			if (chars.length) return {
				token: String.fromCharCode(...chars),
				offset: i
			};
			return null;
		}
	}
}
/**
* @param { import('@lezer/lr').InputStream } input
* @param  { number } offset
*
* @return { { token: string, offset: number } | null }
*/
function parseSpaces(input, offset) {
	for (let inside = false, i = 0;; i++) if (isSpace(input.peek(offset + i))) {
		if (!inside) inside = true;
	} else {
		if (inside) return {
			token: " ",
			offset: i
		};
		return null;
	}
}
/**
* Parse a name from the input and return the first match, if any.
*
* @param { import('@lezer/lr').InputStream } input
* @param { Variables } variables
*
* @return { { token: string, offset: number, term: number } | null }
*/
function parseName(input, variables) {
	const contextKeys = variables.contextKeys();
	const start = variables.tokens;
	for (let i = 0, tokens = [], nextMatch = null;;) {
		const namePart = start.length + tokens.length > 0;
		const maybeSpace = tokens.length > 0;
		const match = parseIdentifier(input, i, namePart) || namePart && parseAdditionalSymbol(input, i) || maybeSpace && parseSpaces(input, i);
		if (!match) return nextMatch;
		const { token, offset } = match;
		i += offset;
		if (token === " ") continue;
		tokens = [...tokens, token];
		const name = [...start, ...tokens].join(" ");
		if (contextKeys.some((el) => el === name)) {
			const token = tokens[0];
			nextMatch = {
				token,
				offset: token.length,
				term: nameIdentifier
			};
		}
		if (contextKeys.some((el) => el.startsWith(name))) continue;
		if (dateTimeIdentifiers.some((el) => el === name)) {
			const token = tokens[0];
			nextMatch = {
				token,
				offset: token.length,
				term: identifier
			};
		}
		if (dateTimeIdentifiers.some((el) => el.startsWith(name))) continue;
		return nextMatch;
	}
}
var identifiersMap = {
	[identifier]: "identifier",
	[nameIdentifier]: "nameIdentifier"
};
var identifiers = new ExternalTokenizer((input, stack) => {
	LOG_PARSE_DEBUG && console.log("%s: T <identifier | nameIdentifier>", input.pos);
	const nameMatch = parseName(input, stack.context);
	const start = stack.context.tokens;
	const match = nameMatch || parseIdentifier(input, 0, start.length > 0);
	if (match) {
		input.advance(match.offset);
		input.acceptToken(nameMatch ? nameMatch.term : identifier);
		LOG_PARSE && console.log("%s: MATCH <%s> <%s>", input.pos, nameMatch ? identifiersMap[nameMatch.term] : "identifier", match.token);
	}
}, { contextual: true });
var propertyIdentifiers = new ExternalTokenizer((input, stack) => {
	LOG_PARSE_DEBUG && console.log("%s: T <propertyIdentifier>", input.pos);
	const start = stack.context.tokens;
	const match = parseIdentifier(input, 0, start.length > 0);
	if (match) {
		input.advance(match.offset);
		input.acceptToken(propertyIdentifier);
		LOG_PARSE && console.log("%s: MATCH <propertyIdentifier> <%s>", input.pos, match.token);
	}
});
var insertSemicolon = new ExternalTokenizer((input, stack) => {
	LOG_PARSE_DEBUG && console.log("%s: T <insertSemi>", input.pos);
	let offset;
	let insert = false;
	for (offset = 0;; offset++) {
		const char = input.peek(offset);
		if (spaceChars.includes(char)) continue;
		if (newlineChars.includes(char)) insert = true;
		break;
	}
	if (insert) {
		const identifier = parseIdentifier(input, offset + 1);
		if (parseSpaces(input, offset + 1) || identifier && /^(then|else|return|satisfies)$/.test(identifier.token)) return;
		LOG_PARSE && console.log("%s: MATCH <insertSemi>", input.pos);
		input.acceptToken(insertSemi);
	}
});
var prefixedContextStarts = {
	[functionInvocationStart]: "FunctionInvocation",
	[filterExpressionStart]: "FilterExpression",
	[pathExpressionStart]: "PathExpression"
};
var contextStarts = {
	[contextStart]: "Context",
	[functionDefinitionStart]: "FunctionDefinition",
	[forExpressionStart]: "ForExpression",
	[listStart]: "List",
	[ifExpressionStart]: "IfExpression",
	[quantifiedExpressionStart]: "QuantifiedExpression"
};
var contextEnds = {
	[Context]: "Context",
	[FunctionDefinition]: "FunctionDefinition",
	[ForExpression]: "ForExpression",
	[List]: "List",
	[IfExpression]: "IfExpression",
	[QuantifiedExpression]: "QuantifiedExpression",
	[PathExpression]: "PathExpression",
	[FunctionInvocation]: "FunctionInvocation",
	[FilterExpression]: "FilterExpression",
	[ArithmeticExpression]: "ArithmeticExpression"
};
/**
* A simple producer that retrievs a value from
* a given context. Used to lazily take things.
*/
var ValueProducer = class ValueProducer {
	/**
	* @param { Function } fn
	*/
	constructor(fn) {
		this.fn = fn;
	}
	get(variables) {
		return this.fn(variables);
	}
	/**
	* @param { Function } fn
	*
	* @return { ValueProducer }
	*/
	static of(fn) {
		return new ValueProducer(fn);
	}
};
var dateTimeIdentifiers = Object.keys({
	"date and time": 1,
	"date": 1,
	"time": 1,
	"duration": 1
});
/**
* A basic key-value store to hold context values.
*/
var VariableContext = class {
	/**
	* Creates a new context from a JavaScript object.
	*
	* @param {any} [value]
	*/
	constructor(value = {}) {
		/**
		* @protected
		*/
		this.value = value;
	}
	/**
	* Return all defined keys of the context.
	*
	* @returns {Array<string>} the keys of the context
	*/
	getKeys() {
		return Object.keys(this.value);
	}
	/**
	* Returns the value of the given key.
	*
	* If the value represents a context itself, it should be wrapped in a
	* context class.
	*
	* @param {String} key
	* @returns {VariableContext|ValueProducer|null}
	*/
	get(key) {
		const result = this.value[key];
		const constructor = this.constructor;
		if (constructor.isAtomic(result)) return result;
		return constructor.of(result);
	}
	/**
	* Creates a new context with the given key added.
	*
	* @param {String} key
	* @param {any} value
	*
	* @returns {VariableContext} new context with the given key added
	*/
	set(key, value) {
		return this.constructor.of({
			...this.value,
			[key]: value
		});
	}
	/**
	* Non-destructively merge another context into this one,
	* and return the result.
	*
	* @param {ContextValue} other
	*
	* @return {VariableContext}
	*/
	merge(other) {
		const constructor = this.constructor;
		return new constructor(constructor.__merge(this.value, other));
	}
	/**
	* Wether the given value is atomic. Non-atomic values need to be wrapped in a
	* context Class.
	*
	* @param {any} value
	* @returns {Boolean}
	*/
	static isAtomic(value) {
		return !value || value instanceof this || value instanceof ValueProducer || typeof value !== "object";
	}
	/**
	* Takes any number of Contexts and merges them into a single context.
	*
	* @param { ...VariableContext } contexts
	* @returns { VariableContext }
	*/
	static of(...contexts) {
		return contexts.reduce((context, otherContext) => {
			return context.merge(otherContext);
		}, new this({}));
	}
	/**
	* Returns the raw representation of the given context.
	*
	* @param {VariableContext | any} context
	*
	* @return {any}
	*/
	static __unwrap(context) {
		if (!context) return {};
		if (context instanceof this) return context.value;
		if (typeof context !== "object") return {};
		return { ...context };
	}
	/**
	* Non-destructively merges two contexts (or their values)
	* with each other, returning the result.
	*
	* @param {ContextValue} context
	* @param {ContextValue} other
	*
	* @return {any}
	*/
	static __merge(context, other) {
		return reduce(this.__unwrap(other), (merged, value, key) => {
			if (value instanceof ValueProducer) return {
				...merged,
				[key]: value
			};
			value = this.__unwrap(value);
			if (has(merged, key)) value = this.__merge(this.__unwrap(merged[key]), value);
			return {
				...merged,
				[key]: value
			};
		}, this.__unwrap(context));
	}
};
var Variables = class Variables {
	/**
	* @param { {
	*   name?: string,
	*   tokens?: string[],
	*   children?: Variables[],
	*   parent: Variables | null
	*   context: VariableContext,
	*   value?: any,
	*   raw?: any
	* } } options
	*/
	constructor({ name = "Expressions", tokens = [], children = [], parent = null, context, value, raw }) {
		this.name = name;
		this.tokens = tokens;
		this.children = children;
		this.parent = parent;
		this.context = context;
		this.value = value;
		this.raw = raw;
	}
	enterScope(name) {
		const childScope = this.of({
			name,
			parent: this
		});
		LOG_VARS && console.log("[%s] enter", childScope.path, childScope.context);
		return childScope;
	}
	exitScope(str) {
		if (!this.parent) {
			LOG_VARS && console.log("[%s] NO exit %o\n%s", this.path, this.context, indent(str, "  "));
			return this;
		}
		LOG_VARS && console.log("[%s] exit %o\n%s", this.path, this.context, indent(str, "  "));
		return this.parent.pushChild(this);
	}
	token(part) {
		LOG_VARS && console.log("[%s] token <%s> + <%s>", this.path, this.tokens.join(" "), part);
		return this.assign({ tokens: [...this.tokens, part] });
	}
	literal(value) {
		LOG_VARS && console.log("[%s] literal %o", this.path, value);
		return this.pushChild(this.of({
			name: "Literal",
			value
		}));
	}
	/**
	* Return computed scope value
	*
	* @return {any}
	*/
	computedValue() {
		for (let scope = this;; scope = last(scope.children)) {
			if (!scope) return null;
			if (scope.value) return scope.value;
		}
	}
	contextKeys() {
		return this.context.getKeys().map(normalizeContextKey);
	}
	get path() {
		return this.parent?.path?.concat(" > ", this.name) || this.name;
	}
	/**
	* Return value of variable.
	*
	* @param { string } variable
	* @return { any } value
	*/
	get(variable) {
		const names = [variable, variable && normalizeContextKey(variable)];
		const contextKey = this.context.getKeys().find((key) => names.includes(normalizeContextKey(key)));
		if (typeof contextKey === "undefined") return;
		const val = this.context.get(contextKey);
		if (val instanceof ValueProducer) return val.get(this);
		else return val;
	}
	resolveName() {
		const variable = this.tokens.join(" ");
		const parentScope = this.assign({ tokens: [] });
		const variableScope = this.of({
			name: "VariableName",
			parent: parentScope,
			value: this.get(variable),
			raw: variable
		});
		LOG_VARS && console.log("[%s] resolve name <%s=%s>", variableScope.path, variable, this.get(variable));
		return parentScope.pushChild(variableScope);
	}
	pushChild(child) {
		if (!child) return this;
		const parent = this.assign({ children: [...this.children, child] });
		child.parent = parent;
		return parent;
	}
	pushChildren(children) {
		/**
		* @type {Variables}
		*/
		let parent = this;
		for (const child of children) parent = parent.pushChild(child);
		return parent;
	}
	declareName() {
		if (this.tokens.length === 0) throw Error("no tokens to declare name");
		const variableName = this.tokens.join(" ");
		LOG_VARS && console.log("[%s] declareName <%s>", this.path, variableName);
		return this.assign({ tokens: [] }).pushChild(this.of({
			name: "Name",
			value: variableName
		}));
	}
	define(name, value) {
		if (typeof name !== "string") {
			LOG_VARS && console.log("[%s] no define <%s=%s>", this.path, name, value);
			return this;
		}
		LOG_VARS && console.log("[%s] define <%s=%s>", this.path, name, value);
		const context = this.context.set(name, value);
		return this.assign({ context });
	}
	/**
	* @param { Record<string, any> } [options]
	*
	* @return { Variables }
	*/
	assign(options = {}) {
		return Variables.of({
			...this,
			...options
		});
	}
	/**
	* @param { Record<string, any> } [options]
	*
	* @return { Variables }
	*/
	of(options = {}) {
		const defaultOptions = {
			context: this.context,
			parent: this.parent
		};
		return Variables.of({
			...defaultOptions,
			...options
		});
	}
	/**
	* @param { {
	*   name?: string,
	*   tokens?: string[],
	*   children?: Variables[],
	*   parent?: Variables | null
	*   context: VariableContext,
	*   value?: any,
	*   raw?: any
	* } } options
	*
	* @return {Variables}
	*/
	static of(options) {
		const { name, tokens = [], children = [], parent = null, context, value, raw } = options;
		if (!context) throw new Error("must provide <context>");
		return new Variables({
			name,
			tokens: [...tokens],
			children: [...children],
			context,
			parent,
			value,
			raw
		});
	}
};
/**
* @param { string } name
*
* @return { string } normalizedName
*/
function normalizeContextKey(name) {
	return name.replace(/\s*([./\-'+]|\*\*?)\s*/g, " $1 ").replace(/\s{2,}/g, " ").trim();
}
/**
* Wrap children of variables under the given named child.
*
* @param { Variables } variables
* @param { string } scopeName
* @param { string } code
* @return { Variables }
*/
function wrap(variables, scopeName, code) {
	const parts = variables.children.filter((c) => c.name !== scopeName);
	const children = variables.children.filter((c) => c.name === scopeName);
	const namePart = parts[0];
	const valuePart = parts[Math.max(1, parts.length - 1)];
	const name = namePart?.computedValue();
	const value = valuePart?.computedValue() || null;
	return variables.assign({ children }).enterScope(scopeName).pushChildren(parts).exitScope(code).define(name, value);
}
/**
* @param { ContextValue } [context]
* @param { typeof VariableContext } [Context]
*
* @return { ContextTracker<Variables> }
*/
function trackVariables(context = {}, Context = VariableContext) {
	return new ContextTracker({
		start: Variables.of({ context: Context.of(context) }),
		reduce(variables, term, stack, input) {
			if (term === IfExpression) {
				const [thenPart, elsePart] = variables.children.slice(-2);
				variables = variables.assign({ value: Context.of(thenPart?.computedValue(), elsePart?.computedValue()) });
			}
			if (term === List) variables = variables.assign({ value: Context.of(...variables.children.map((c) => c?.computedValue())) });
			if (term === FilterExpression) {
				const [sourcePart, _] = variables.children.slice(-2);
				variables = variables.assign({ value: sourcePart?.computedValue() });
			}
			if (term === FunctionInvocation) {
				const [name, ...args] = variables.children;
				if (name?.raw === "get value") variables = getContextValue(variables, args);
			}
			const start = contextStarts[term];
			if (start) return variables.enterScope(start);
			const prefixedStart = prefixedContextStarts[term];
			if (prefixedStart) {
				const { children: currentChildren, context: currentContext } = variables;
				const children = currentChildren.slice(0, -1);
				const lastChild = last(currentChildren);
				let newContext = null;
				if (term === pathExpressionStart) newContext = Context.of(lastChild?.computedValue());
				if (term === filterExpressionStart) newContext = Context.of(currentContext, lastChild?.computedValue()).set("item", lastChild?.computedValue());
				return variables.assign({ children }).enterScope(prefixedStart).pushChild(lastChild).assign({ context: newContext || currentContext });
			}
			const code = input.read(input.pos, stack.pos);
			if (contextEnds[term]) return variables.exitScope(code);
			if (term === ContextEntry) {
				const parts = variables.children.filter((c) => c.name !== "ContextEntry");
				const name = parts[0];
				const value = last(parts);
				return wrap(variables, "ContextEntry", code).assign({ value: Context.of(variables.value).set(name?.computedValue(), value?.computedValue()) });
			}
			if (term === ForInExpression || term === QuantifiedInExpression) return wrap(variables, "InExpression", code);
			if (term === forExpressionBodyStart) return variables.define("partial", ValueProducer.of((variables) => {
				return last(variables.children)?.computedValue();
			}));
			if (term === ParameterName) {
				const name = last(variables.children).computedValue();
				return variables.define(name, 1);
			}
			if (term === arithmeticPlusStart || term === arithmeticTimesStart || term === arithmeticExpStart) {
				const children = variables.children.slice(0, -1);
				const lastChild = last(variables.children);
				return variables.assign({ children }).enterScope("ArithmeticExpression").pushChild(lastChild);
			}
			if (term === arithmeticUnaryStart) return variables.enterScope("ArithmeticExpression");
			if (term === Identifier || term === AdditionalIdentifier || term === PropertyIdentifier) return variables.token(code);
			if (term === StringLiteral) return variables.literal(code.replace(/^"|"$/g, ""));
			if (term === BooleanLiteral) return variables.literal(code === "true" ? true : false);
			if (term === NumericLiteral) return variables.literal(parseFloat(code));
			if (term === nil) return variables.literal(null);
			if (term === VariableName) return variables.resolveName();
			if (term === Name || term === PropertyName) return variables.declareName();
			if (term === expression0 || term === PositiveUnaryTest) {
				if (variables.tokens.length > 0) throw new Error("uncleared name");
			}
			if (term === expression0) {
				let parent = variables;
				while (parent.parent) parent = parent.exitScope(code);
				return parent;
			}
			return variables;
		}
	});
}
var variableTracker = trackVariables({});
function getContextValue(variables, args) {
	if (!args.length) return variables.assign({ value: null });
	if (args[0].name === "Name") args = extractNamedArgs(args, ["m", "key"]);
	if (args.length !== 2) return variables.assign({ value: null });
	const [context, key] = args;
	const keyValue = key?.computedValue();
	const contextValue = context?.computedValue();
	if (!contextValue || typeof contextValue !== "object" || typeof keyValue !== "string") return variables.assign({ value: null });
	return variables.assign({ value: [normalizeContextKey(keyValue), keyValue].reduce((value, keyValue) => {
		return contextValue.get(keyValue) || value;
	}, null) });
}
function extractNamedArgs(args, argNames) {
	const context = {};
	for (let i = 0; i < args.length; i += 2) {
		const [name, value] = args.slice(i, i + 2);
		context[name.value] = value;
	}
	return argNames.map((name) => context[name]);
}
function last(arr) {
	return arr[arr.length - 1];
}
var feelHighlighting = styleTags({
	StringLiteral: tags.string,
	NumericLiteral: tags.number,
	BooleanLiteral: tags.bool,
	"AtLiteral!": tags.special(tags.string),
	CompareOp: tags.compareOperator,
	ArithOp: tags.arithmeticOperator,
	"for if then else some every satisfies between return": tags.controlKeyword,
	"in instance of and or": tags.operatorKeyword,
	function: tags.definitionKeyword,
	as: tags.keyword,
	"Type/...": tags.typeName,
	Wildcard: tags.special(tags.variableName),
	null: tags.null,
	LineComment: tags.lineComment,
	BlockComment: tags.blockComment,
	"VariableName! \"?\"": tags.variableName,
	"DateTimeConstructor! SpecialFunctionName!": tags.function(tags.special(tags.variableName)),
	"List Interval": tags.list,
	Context: tags.definition(tags.literal),
	"Name!": tags.definition(tags.variableName),
	"Key/Name! ContextEntryType/Name!": tags.definition(tags.propertyName),
	"PathExpression/VariableName!": tags.function(tags.propertyName),
	"FormalParameter/ParameterName!": tags.function(tags.definition(tags.variableName)),
	"( )": tags.paren,
	"[ ]": tags.squareBracket,
	"{ }": tags.brace,
	".": tags.derefOperator,
	", ;": tags.separator,
	"..": tags.punctuation
});
var spec_identifier = {
	__proto__: null,
	for: 10,
	in: 32,
	return: 36,
	if: 40,
	then: 42,
	else: 44,
	some: 48,
	every: 50,
	satisfies: 56,
	or: 60,
	and: 64,
	between: 72,
	instance: 86,
	of: 89,
	days: 101,
	time: 103,
	duration: 105,
	years: 107,
	months: 109,
	date: 111,
	list: 117,
	context: 123,
	function: 130,
	null: 156,
	true: 332,
	false: 332,
	"?": 170,
	external: 186,
	not: 211
};
var parser = LRParser.deserialize({
	version: 14,
	states: "C|O`QYOOO`QYOOO$yQYOOOOQU'#Ce'#CeO%TQYO'#C`O&^QYO'#FQOOQQ'#Ff'#FfO&hQYO'#FfO`QYO'#DVOOQU'#En'#EnO(_Q^O'#D]OOQU'#D^'#D^OOQU'#D]'#D]OOQO'#Fn'#FnO*[QWO'#DvOOQQ'#D}'#D}OOQQ'#EO'#EOOOQQ'#EP'#EPO*aOWO'#ESO*[QWO'#EQOOQQ'#EQ'#EQOOQQ'#Ft'#FtOOQQ'#Fr'#FrOOQQ'#Fz'#FzOOQQ'#EU'#EUO`QYO'#EWOOQQ'#FS'#FSO*iQ^O'#FSO,`QYO'#EXO,gQWO'#EYOOQP'#GO'#GOO,lQXO'#EaOOQQ'#F{'#F{OOQQ'#FR'#FRQOQWOOOOQQ'#FT'#FTOOQQ'#F^'#F^O`QYO'#CoOOQQ'#F_'#F_O%TQYO'#CsO,zQYO'#DwOOQQ'#Fs'#FsO-PQYO'#EROOQO'#ER'#ERO`QYO'#EVO`QYO'#EUOOQO'#F|'#F|Q-XQWOOO-^QYO'#DRO.TQWO'#FbOOQO'#DT'#DTO.`QYO'#FfO.gQWOOO/^QYO'#CdO/kQYO'#FVOOQQ'#Cc'#CcO/pQYO'#FUOOQQ'#Cb'#CbO/xQYO,58zO`QYO,59iOOQQ'#Fc'#FcOOQQ'#Fd'#FdOOQQ'#Fe'#FeO`QYO,59qO`QYO,59qO`QYO,59qOOQQ'#Fl'#FlO/}QYO,5:^OOQQ'#Fm'#FmO`QYO,5:`O`QYO,59eO`QYO,59gO`QYO,59iO1|QYO,59iO2TQYO,59rOOQQ,5:i,5:iO2YQYO,59qOOQU-E8l-E8lO3|QYO'#FoOOQQ,5:b,5:bOOQQ,5:n,5:nOOQQ,5:l,5:lO4TQYO,5:rOOQQ,5;n,5;nO4_QYO,5:qO4lQWO,5:sO4qQYO,5:tOOQP'#Ee'#EeO5hQXO'#EdOOQO'#Ec'#EcO5oQWO'#EbO5tQWO'#GPO5|QWO,5:{O6RQYO,59ZO/kQYO'#FaOOQQ'#Cw'#CwO6YQYO'#F`OOQQ'#Cv'#CvO6bQYO,59_O6gQYO,5:cO6lQYO,5:mO4WQYO,5:qO6qQYO,5:pO`QYO'#EwQ-XQWOOO`QYO'#EmO7hQWO,5;|O`QYOOOOQR'#Cf'#CfOOQQ'#Ej'#EjO8bQYO,59OO`QYO,5;qOOQQ'#FY'#FYO%TQYO'#EkO8rQYO,5;pO`QYO1G.fOOQQ'#F]'#F]O9iQYO1G/TO<`QYO1G/]O<jQYO1G/]O<tQYO1G/]OOQQ1G/x1G/xO>hQYO1G/zO>oQYO1G/PO?xQYO1G/ROARQYO1G/TO`QYO1G/TOOQQ1G/T1G/TOAiQYO1G/^OBWQ^O'#CdOCjQYO'#FqOOQO'#Dz'#DzOCtQWO'#DyOCyQWO'#FpOOQO'#Dx'#DxOOQO'#D{'#D{ODRQWO,5<ZOOQQ1G0^1G0^O`QYO1G0]O`QYO'#EsODWQWO,5<]OOQQ1G0_1G0_ODcQWO'#E[ODnQWO'#F}OOQO'#EZ'#EZODvQWO1G0`OOQP'#Eu'#EuOD{QXO,5;OO`QYO,5:|OESQXO'#EvOE_QWO,5<kOOQQ1G0g1G0gO`QYO1G.uO`QYO,5;{O%TQYO'#ElOEgQYO,5;zO`QYO1G.yOEoQYO1G/}OOQO1G0X1G0XOOQO,5;c,5;cOOQO-E8u-E8uOOQO,5;X,5;XOOQO-E8k-E8kOEtQWOOOOQQ-E8h-E8hOEyQYO'#CmOOQQ1G1]1G1]OOQQ,5;V,5;VOOQQ-E8i-E8iOFWQYO7+$QOOQQ7+%f7+%fO`QYO7+$oOF}QYO,5:rOG[QWO7+$oOGaQYO'#D[OOQQ'#DZ'#DZOITQYO'#D_OIYQYO'#D_OI_QYO'#D_OIdQ`O'#DgOIiQ`O'#DjOInQ`O'#DnOOQQ7+$x7+$xO`QYO,5:eO%TQYO'#ErOIsQWO,5<[OOQQ1G1u1G1uOJyQYO7+%wOKWQYO,5;_OOQO-E8q-E8qOAiQYO,5:vO%TQYO'#EtOKeQWO,5<iOKmQYO7+%zOOQP-E8s-E8sOKtQYO1G0hOOQO,5;b,5;bOOQO-E8t-E8tOLOQYO7+$aOLVQYO1G1gOOQQ,5;W,5;WOOQQ-E8j-E8jOLaQYO7+$eOOQO7+%i7+%iO`QYO,59XOMWQYO<<HZOOQQ<<HZ<<HZO/}QYO'#EoONaQYO,59vO!!TQYO,59yO!!YQYO,59yO!!_QYO,59yO!!dQYO,5:RO%TQYO,5:UO!#RQbO,5:YO!#YQYO1G0POOQO,5;^,5;^OOQO-E8p-E8pO!#dQYO<<IcOOQQ<<Ic<<IcOOQO1G0b1G0bOOQO,5;`,5;`OOQO-E8r-E8rO!&fQYO'#E^OOQQ<<If<<IfO`QYO<<IfO`QYO<<G{O!']QYO1G.sOOQQ,5;Z,5;ZOOQQ-E8m-E8mO!'gQYO1G/eOOQQ1G/e1G/eO!'lQbO'#D]O!'}Q`O'#D[O!(YQ`O1G/mO!(_QWO'#DmO!(dQ`O'#FhOOQO'#Dl'#DlO!(lQ`O1G/pOOQO'#Dq'#DqO!(qQ`O'#FjOOQO'#Dp'#DpO!(yQ`O1G/tOOQQAN?QAN?QO!)OQYOAN=gOOQQ7+%P7+%PO!)uQ`O,59vOOQQ7+%X7+%XO!!dQYO,5:XO%TQYO'#EpO!*QQ`O,5<SOOQQ7+%[7+%[O!!dQYO'#EqO!*YQ`O,5<UO!*bQ`O7+%`OOQO1G/s1G/sOOQO,5;[,5;[OOQO-E8n-E8nOOQO,5;],5;]OOQO-E8o-E8oOAiQYO<<HzOOQQAN>fAN>fO/}QYO'#EoO!!dQYO<<HzO!*gQ`O7+%`O!*lQ`O1G/tO!#RQbO,5:YO!*qQ`O'#Dn",
	stateData: "!+U~O#rOS#sOSPOSQOS~OTsOZVO[UOdtOhvOivOr}Os}OviO!T{O!U{O!VxO!XzO!c!OO!g|O!igO!pyO!wjO#SnO#nRO#oRO$ZZO$i_O$j`O$k`O$laO$mbO~OTsO[UOdtOhvOivOr}Os}OviO!T{O!U{O!VxO!XzO!c!OO!g|O!igO!pyO!wjO#SnO#nRO#oRO$ZZO$i_O$j`O$k`O$laO$mbO~OZ!TO#]!UO~P#VO#nRO#oRO~OZ!^O[!^O]!_O^!_O_!`O`!kOn!hOp!iOr!]Os!]Ot!jO{!lO!i!fO#z!dOv$bX~O#l#tX$t#tX~P%]O$i!mOT$YXZ$YX[$YXd$YXh$YXi$YXr$YXs$YXv$YX!T$YX!U$YX!V$YX!X$YX!c$YX!g$YX!i$YX!p$YX!w$YX#S$YX#n$YX#o$YX$Z$YX$j$YX$k$YX$l$YX$m$YX~O#nRO#oROZ!PX[!PX]!PX^!PX_!PX`!PXn!PXp!PXr!PXs!PXt!PXv!PX{!PX!i!PX#l!PX#p!PX#z!PX$t!PX$O!PXx!PX#}!PX!g!PXe!PXb!PX#R!PXf!PXl!PX~Ov!pO~O$j`O$k`O~O#p!uOZ#vX[#vX]#vX^#vX_#vX`#vXn#vXp#vXr#vXs#vXt#vXv#vX{#vX!i#vX#l#vX#z#vX$t#vX$O#vXx#vX#}#vX!g#vXe#vXb#vX#R#vXf#vXl#vX~O!g$eP~P`Ov!xO~O#m!yO$j`O$k`O#R$sP~Op#VO~Op#WOv!uX~O$t#ZO~O#luX$OuX$tuXxuX#}uX!guXeuXbuX#RuXfuXluX~P%]O$O#]O#l$UXx$UX~O#l#[X~P&hOv#_O~OZ#`O[#`O]#`O^#`O_#`O#nRO#oRO#z#`O#{#`O$]WX~O`WXxWX$OWX~P.lO`#dO~O$O#eOb#xX~Ob#hO~O#nRO#oRO$ZZO~OTsOZVO[UOdtOhvOivOr}Os}O!T{O!U{O!VxO!XzO!c!OO!g|O!igO!pyO!wjO#SnO#nRO#oRO$ZZO$i_O$j`O$k`O$laO$mbO~Ov#rO~P0YO|#tO~O{!lO!i!fO#z!dOZya[ya]ya^ya_ya`yanyapyaryasyatyav$bX#lya$tya$Oyaxya#}ya!gyaeyabya#Ryafyalya~Ox$eP~P`Ox#}O#}$OO~P%]O#}$OO$O$PO!g$eX~P%]O!g$RO~O#nRO#oROx$qP~OZ#`O[#`O]#`O^#`O_#`O#m!yO#z#`O#{#`O~O$]#WX~P4|O$]$YO~O$O$ZO#R$sX~O#R$]O~Oe$^O~P%]O$O$`Ol$SX~Ol$bO~O!W$cO~O!T$dO~O#l!xa$t!xa$O!xax!xa#}!xa!g!xae!xab!xa#R!xaf!xal!xa~P%]O$O#]O#l$Uax$Ua~OZ#`O[#`O]#`O^#`O_#`O#nRO#oRO#z#`O#{#`O~O`Wa$]WaxWa$OWa~P7sO$O#eOb#xa~OZ!^O[!^O]!_O^!_O_!`O{!lO!i!fO#z!dOv$bX~O`qinqipqirqisqitqi#lqi$tqi$Oqixqi#}qi!gqieqibqi#Rqifqilqi~P8zO_!`O{!lO!i!fO#z!dOZyi[yi`yinyipyiryisyityiv$bX#lyi$tyi$Oyixyi#}yi!gyieyibyi#Ryifyilyi~O]!_O^!_O~P:rO]yi^yi~P:rO{!lO!i!fO#z!dOZyi[yi]yi^yi_yi`yinyipyiryisyityiv$bX#lyi$tyi$Oyixyi#}yi!gyieyibyi#Ryifyilyi~O!g$pO~P%]O`!kOp!iOr!]Os!]Ot!jOnmi#lmi$tmi$Omixmi#}mi!gmiemibmi#Rmifmilmi~P8zO`!kOr!]Os!]Ot!jOnoipoi#loi$toi$Ooixoi#}oi!goieoiboi#Roifoiloi~P8zO`!kOn!hOp$qOr!]Os!]Ot!jO~P8zO!S$vO!V$wO!X$xO![$yO!_$zO!c${O#nRO#oRO$ZZO~OZ#bX[#bX]#bX^#bX_#bX`#bXn#bXp#bXr#bXs#bXt#bXv#bXx#bX{#bX!i#bX#n#bX#o#bX#p#bX#z#bX$O#bX~P.lO$O$POx$eX~P%]O$]$}O~O$O%OOx$dX~Ox%QO~O$O$PO!g$eax$ea~O$]%UOx#OX$O#OX~O$O%VOx$qX~Ox%XO~O$]#Wa~P4|O#m!yO$j`O$k`O~O$O$ZO#R$sa~O$O$`Ol$Sa~O!U%cO~OxrO~O#}%dObaX$OaX~P%]O#lSq$tSq$OSqxSq#}Sq!gSqeSqbSq#RSqfSqlSq~P%]Ox#}O#}$OO$OuX~P%]Ox%fO~O#z%gOZ!OX[!OX]!OX^!OX_!OX`!OXn!OXp!OXr!OXs!OXt!OXv!OX{!OX!i!OX#l!OX$t!OX$O!OXx!OX#}!OX!g!OXe!OXb!OX#R!OXf!OXl!OX~Op%iO~Op%jO~Op%kO~O!]%lO~O!]%mO~O!]%nO~O$O%OOx$da~OZ!^O[!^O]!_O^!_O_!`O`!kOn!hOp!iOr!]Os!]Ot!jO{!lO#z!dOv$bX~Ox%sO!g%sO!i%rO~PI{O!g#ga$O#gax#ga~P%]O$O%VOx$qa~O#P%yO~P`O#R#Ui$O#Ui~P%]Of%zO~P%]Ol$Ti$O$Ti~P%]O#lgq$tgq$Ogqxgq#}gq!ggqegqbgq#Rgqfgqlgq~P%]O`qynqypqyrqysqytqy#lqy$tqy$Oqyxqy#}qy!gqyeqybqy#Rqyfqylqy~P8zO#z%gOZ!Oa[!Oa]!Oa^!Oa_!Oa`!Oan!Oap!Oar!Oas!Oat!Oav!Oa{!Oa!i!Oa#l!Oa$t!Oa$O!Oax!Oa#}!Oa!g!Oae!Oab!Oa#R!Oaf!Oal!Oa~O!T&OO~O!W&OO~O!T&PO~O!S$vO!V$wO!X$xO![$yO!_$zO!c&uO#nRO#oRO$ZZO~O!Y$^P~P!!dOx!mi$O!mi~P%]OT$aXZ$aX[$aX]!yy^!yy_!yy`!yyd$aXh$aXi$aXn!yyp!yyr$aXs$aXt!yyv$aX{!yy!T$aX!U$aX!V$aX!X$aX!c$aX!g$aX!i$aX!p$aX!w$aX#S$aX#l!yy#n$aX#o$aX#z!yy$Z$aX$i$aX$j$aX$k$aX$l$aX$m$aX$t!yy$O!yyx!yy#}!yye!yyb!yy#R!yyf!yyl!yy~O#l#QX$t#QX$O#QXx#QX#}#QX!g#QXe#QXb#QX#R#QXf#QXl#QX~P%]Obai$Oai~P%]O!U&_O~O#nRO#oRO!Y!PX#z!PX$O!PX~O#z&pO!Y!OX$O!OX~O!Y&aO~O$]&bO~O$O&cO!Y$[X~O!Y&eO~O$O&fO!Y$^X~O!Y&hO~O#lc!R$tc!R$Oc!Rxc!R#}c!R!gc!Rec!Rbc!R#Rc!Rfc!Rlc!R~P%]O#z&pO!Y!Oa$O!Oa~O$O&cO!Y$[a~O$O&fO!Y$^a~O$_&nO~O$_&qO~O!Y&rO~O!]&tO~O$Z$j~$j$k_^$i#zQP]Q~",
	goto: "E}$tPPPP$uP%n%q%w&Z'tPPPPPP'}P$uPPP$uPP(Q(TP$uP$uP$uPPP(ZP(fP$u$uPP(o)U)a*n)UPPPPPPP)UPP)UP+s+v)UP+|,S$uP$uP$u,Z-S-V-]-SP-e.^-e-e/^0VP$u1O$u1w1w2p2sP2yPP1w3P3V/Y3ZPP3cP3f3m3s3y4P5[5f5l5r5x6P6V6]6cPPPPPPPP6i6r8y9r:k:nPP:rPP:x:{;t<m<p<t<y=h>W>wP?pP?sP?w@jA]BUB[B_$uBeBePPPPPC^8yDVEOEREz!mjOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Z#]#_#c#g#r$O$P$Y$^$_$b$q$}%X%d%y%zR![SQ!YSR$m#eS!WS#eS#Qw$`W#w!p!x%O%VT&T%m&c#WXOPQWYilu|}!]!a!b!c!e!g!h!i!j!k#Z#]#_#c#g#r#t$O$P$Y$^$_$b$q$}%U%X%d%g%l%n%y%z&Q&b&f&n&p&q&tb!VSw!x#e$`%O%V%m&cU#a!V#b#uR#u!pU#a!V#b#uT$W!z$XR$l#cR#UwQ#SwR%`$`U!RQ#_#rQ#s!kR$g#]QrQQ$i#_R$s#rQ$|#tQ%t%UQ&S%lU&X%n&f&tQ&i&bT&o&n&qc$u#t%U%l%n&b&f&n&q&t!lkOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Z#]#_#c#g#r$O$P$Y$^$_$b$q$}%X%d%y%zQ#m!eU$t#t%U&nS%|%g&p]&R%l%n&b&f&q&t#V[OPQWilu|}!]!a!b!c!e!g!h!i!j!k!p#Z#]#_#c#g#r#t$O$P$Y$^$_$b$q$}%U%X%d%g%l%n%y%z&b&f&n&p&q&tR&W%mQ&U%mR&j&cQ&[%nR&s&tS&Y%n&tR&l&f!m]OPQWilu|}!]!a!b!c!g!h!i!j!k!p#Z#]#_#c#g#r$O$P$Y$^$_$b$q$}%X%d%y%zR#|!pQ#y!pR%p%OS#x!p%OT$S!x%V!meOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Z#]#_#c#g#r$O$P$Y$^$_$b$q$}%X%d%y%z!leOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Z#]#_#c#g#r$O$P$Y$^$_$b$q$}%X%d%y%zQ!rbT!{o$Z!mcOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Z#]#_#c#g#r$O$P$Y$^$_$b$q$}%X%d%y%z!mdOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Z#]#_#c#g#r$O$P$Y$^$_$b$q$}%X%d%y%z!mhOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Z#]#_#c#g#r$O$P$Y$^$_$b$q$}%X%d%y%z!mpOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Z#]#_#c#g#r$O$P$Y$^$_$b$q$}%X%d%y%zR$V!xQ$T!xR%u%VQ%x%XR&]%yQ!}oR%[$ZT!|o$ZS!zo$ZT$W!z$XRrQS#b!V#uR$j#bQ#f!YR$n#fQ$a#SR%a$aQ#^!RR$h#^!vYOPQWilu|}!]!a!b!c!e!g!h!i!j!k!p#Z#]#_#c#g#r#t$O$P$Y$^$_$b$q$}%U%X%d%g%y%z&nS!oY&Q_&Q%l%n&b&f&p&q&tQ%h$tS%}%h&`R&`&RQ&d&UR&k&dQ&g&YR&m&gQ%P#yR%q%PS$Q!v#vR%T$QQ%W$TR%v%WQ$X!zR%Y$XQ$[!}R%]$[Q#[!PR$f#[QrOQ!PPR$e#ZUTOP#ZW!QQ!k#]#_Q!nWQ!tiQ!vlQ#PuQ#X|Q#Y}Q#i!]Q#j!aQ#k!bQ#l!cQ#n!gQ#o!hQ#p!iQ#q!jQ#v!pQ$k#cQ$o#gQ$r#rQ%R$OQ%S$PQ%Z$YQ%^$^Q%_$_Q%b$bQ%e$qQ%o$}S%w%X%yQ%{%dR&^%z!mqOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Z#]#_#c#g#r$O$P$Y$^$_$b$q$}%X%d%y%z!mSOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Z#]#_#c#g#r$O$P$Y$^$_$b$q$}%X%d%y%zR!ZST!XS#eQ#c!WR$_#QR#g![!muOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Z#]#_#c#g#r$O$P$Y$^$_$b$q$}%X%d%y%z!mwOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Z#]#_#c#g#r$O$P$Y$^$_$b$q$}%X%d%y%zR#TwT#Rw$`V!SQ#_#r!X!aT!Q!t!v#P#X#Y#i#n#o#p#q#v$k$o$r%R%S%Z%^%_%b%e%o%w%{&^!Z!bT!Q!t!v#P#X#Y#i#j#n#o#p#q#v$k$o$r%R%S%Z%^%_%b%e%o%w%{&^!]!cT!Q!t!v#P#X#Y#i#j#k#n#o#p#q#v$k$o$r%R%S%Z%^%_%b%e%o%w%{&^!mWOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Z#]#_#c#g#r$O$P$Y$^$_$b$q$}%X%d%y%zR&V%mT&Z%n&t!a!eT!Q!n!t!v#P#X#Y#i#j#k#l#n#o#p#q#v$k$o$r%R%S%Z%^%_%b%e%o%w%{&^!a!gT!Q!n!t!v#P#X#Y#i#j#k#l#n#o#p#q#v$k$o$r%R%S%Z%^%_%b%e%o%w%{&^!m^OPQWilu|}!]!a!b!c!g!h!i!j!k!p#Z#]#_#c#g#r$O$P$Y$^$_$b$q$}%X%d%y%zQ!q^R!scR#z!pQ!wlR#{!p!mfOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Z#]#_#c#g#r$O$P$Y$^$_$b$q$}%X%d%y%z!mlOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Z#]#_#c#g#r$O$P$Y$^$_$b$q$}%X%d%y%z!mmOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Z#]#_#c#g#r$O$P$Y$^$_$b$q$}%X%d%y%zR$U!x!moOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Z#]#_#c#g#r$O$P$Y$^$_$b$q$}%X%d%y%zR#Oo",
	nodeNames: "⚠ LineComment BlockComment Expression ForExpression for InExpressions InExpression Name Identifier Identifier ArithOp ArithOp ArithOp ArithOp ArithOp in IterationContext return IfExpression if then else QuantifiedExpression some every InExpressions InExpression satisfies Disjunction or Conjunction and Comparison CompareOp CompareOp between PositiveUnaryTest ( PositiveUnaryTests ) ArithmeticExpression InstanceOfExpression instance of Type QualifiedName VariableName BacktickIdentifier SpecialType days time duration years months date > ListType list < ContextType context ContextEntryTypes ContextEntryType FunctionType function ArgumentTypes ArgumentType PathExpression ] FilterExpression [ FunctionInvocation SpecialFunctionName NamedParameters NamedParameter ParameterName PositionalParameters null NumericLiteral StringLiteral BooleanLiteral DateTimeLiteral DateTimeConstructor AtLiteral ? SimplePositiveUnaryTest Interval ParenthesizedExpression List FunctionDefinition FormalParameters FormalParameter external FunctionBody } { Context ContextEntry Key Name Identifier Expressions UnaryTests Wildcard not",
	maxTerm: 174,
	context: variableTracker,
	nodeProps: [
		[
			"group",
			-17,
			4,
			19,
			23,
			29,
			31,
			33,
			41,
			42,
			68,
			70,
			72,
			85,
			86,
			88,
			89,
			90,
			97,
			"Expr",
			47,
			"Expr Expr",
			-5,
			78,
			79,
			80,
			81,
			82,
			"Expr Literal"
		],
		[
			"closedBy",
			38,
			")",
			71,
			"]",
			96,
			"}"
		],
		[
			"openedBy",
			40,
			"(",
			69,
			"[",
			95,
			"{"
		]
	],
	propSources: [feelHighlighting],
	skippedNodes: [
		0,
		1,
		2
	],
	repeatNodeCount: 14,
	tokenData: "2t~RvXY#iYZ$^Z[#i]^$^pq#iqr$crs$nwx*[xy*ayz*fz{*k{|*x|}*}}!O+S!O!P+a!P!Q,k!Q![.f![!].}!]!^/S!^!_/X!_!`$i!`!a/h!b!c/r!}#O/w#P#Q/|#Q#R*s#S#T0R#o#p2j#q#r2o$f$g#i#BY#BZ#i$IS$I_#i$I|$I}$^$I}$JO$^$JT$JU#i$KV$KW#i&FU&FV#i?HT?HU#i~#nY#r~XY#iZ[#ipq#i$f$g#i#BY#BZ#i$IS$I_#i$JT$JU#i$KV$KW#i&FU&FV#i?HT?HU#i~$cO#s~~$fP!_!`$i~$nOr~~$qXOY$nYZ%^Zr$nrs'us#O$n#O#P'|#P;'S$n;'S;=`)c<%lO$n~%aVOr%^rs%vs#O%^#O#P%{#P;'S%^;'S;=`'S<%lO%^~%{O$j~~&OWOr%^rs&hs#O%^#O#P%{#P;'S%^;'S;=`'Y;=`<%l%^<%lO%^~&mV$j~Or%^rs%vs#O%^#O#P%{#P;'S%^;'S;=`'S<%lO%^~'VP;=`<%l%^~']WOr%^rs%vs#O%^#O#P%{#P;'S%^;'S;=`'S;=`<%l%^<%lO%^~'|O$j~$k~~(PYOY$nYZ$nZr$nrs(os#O$n#O#P'|#P;'S$n;'S;=`)i;=`<%l$n<%lO$n~(vX$j~$k~OY$nYZ%^Zr$nrs'us#O$n#O#P'|#P;'S$n;'S;=`)c<%lO$n~)fP;=`<%l$n~)lYOY$nYZ%^Zr$nrs'us#O$n#O#P'|#P;'S$n;'S;=`)c;=`<%l$n<%lO$n~*aO#{~~*fOv~~*kOx~~*pP^~z{*s~*xO_~~*}O[~~+SO$O~R+XPZP!`!a+[Q+aO$_Q~+fQ#z~!O!P+l!Q![+q~+qO#}~~+vR$i~!Q![+q!g!h,P#X#Y,P~,SR{|,]}!O,]!Q![,c~,`P!Q![,c~,hP$i~!Q![,c~,pQ]~z{,v!P!Q-}~,yTOz,vz{-Y{;'S,v;'S;=`-w<%lO,v~-]VOz,vz{-Y{!P,v!P!Q-r!Q;'S,v;'S;=`-w<%lO,v~-wOQ~~-zP;=`<%l,v~.SSP~OY-}Z;'S-};'S;=`.`<%lO-}~.cP;=`<%l-}~.kS$i~!O!P.w!Q![.f!g!h,P#X#Y,P~.zP!Q![+q~/SO$]~~/XO$t~R/`P!]QsP!_!`/cP/hOsPR/oP!YQsP!_!`/c~/wO$m~~/|O!i~~0RO!g~~0UVO#O0R#O#P0k#P#S0R#S#T1r#T;'S0R;'S;=`1w<%lO0R~0nWO#O0R#O#P0k#P#S0R#S#T1W#T;'S0R;'S;=`1};=`<%l0R<%lO0R~1]V$Z~O#O0R#O#P0k#P#S0R#S#T1r#T;'S0R;'S;=`1w<%lO0R~1wO$Z~~1zP;=`<%l0R~2QWO#O0R#O#P0k#P#S0R#S#T1r#T;'S0R;'S;=`1w;=`<%l0R<%lO0R~2oO#S~~2tO#R~",
	tokenizers: [
		propertyIdentifiers,
		identifiers,
		insertSemicolon,
		0,
		1
	],
	topRules: {
		"Expression": [0, 3],
		"Expressions": [1, 102],
		"UnaryTests": [2, 103]
	},
	dialects: { camunda: 2568 },
	dynamicPrecedences: {
		"31": -1,
		"68": 1,
		"72": -1,
		"74": -1
	},
	specialized: [{
		term: 122,
		get: (value) => spec_identifier[value] || -1
	}],
	tokenPrec: 2571
});
//#endregion
//#region node_modules/@bpmn-io/feel-lint/dist/index.esm.js
/**
* @typedef {import('@lezer/common').Tree} Tree
* @typedef {import('@codemirror/lint').Diagnostic} LintMessage
*/
/**
* Create an array of syntax errors in the given tree.
*
* @param {Tree} syntaxTree
* @returns {LintMessage[]} array of syntax errors
*/
function lintSyntax(syntaxTree) {
	const lintMessages = [];
	syntaxTree.iterate({ enter: (ref) => {
		const node = ref.node;
		if (!node.type.isError) return;
		const parent = node.parent;
		const next = getNextNode(node);
		const message = {
			from: node.from,
			to: node.to,
			severity: "error",
			type: "Syntax Error"
		};
		if (node.from !== node.to) message.message = `Unrecognized token in <${parent.name}>`;
		else if (next) {
			message.message = `Unrecognized token <${next.name}> in <${parent.name}>`;
			message.to = next.to;
		} else message.message = `Incomplete <${(parent.enterUnfinishedNodesBefore(node.to) || parent).name}>`;
		lintMessages.push(message);
	} });
	return lintMessages;
}
function getNextNode(node) {
	if (!node) return null;
	return node.nextSibling || getNextNode(node.parent);
}
/**
* @typedef {object} Context
* @property {function} report
* @property {(from: number, to: number) => string} readContent
* @property {(from: number, to: number, content: string) => void} updateContent
*/
var RULE_NAME = "first-item";
var firstItem = { create(context) {
	return { enter(node) {
		if (node.name !== "FilterExpression") return;
		const content = context.readContent(node.from, node.to);
		if (zeroIndexPattern().test(content)) {
			const { from, to } = node;
			context.report({
				from,
				to,
				message: "First item is accessed via [1]",
				severity: "warning",
				type: RULE_NAME,
				actions: [{
					name: "fix",
					apply(_, start = from, end = to) {
						context.updateContent(start, end, content.replace(zeroIndexPattern(), "[1]"));
					}
				}]
			});
		}
	} };
} };
function zeroIndexPattern() {
	return /\[\s*0\s*\]$/;
}
/**
* @typedef {import('@lezer/common').Tree} Tree
* @typedef {import('@codemirror/lint').Diagnostic} LintMessage
* @typedef {import('./index').LintAllContext} LintAllContext
*/
var RULES = [firstItem];
/**
* Create an array of messages reported from rules in the given tree.
*
* @param {LintAllContext} context
* @returns {LintMessage[]} array of syntax errors
*/
function lintRules(context) {
	const { readContent, syntaxTree, updateContent } = context;
	const lintMessages = [];
	const ruleContext = {
		readContent,
		report: (message) => {
			lintMessages.push(message);
		},
		updateContent
	};
	const rules = RULES.map((rule) => rule.create(ruleContext));
	syntaxTree.iterate({
		enter: (ref) => {
			for (const rule of rules) rule.enter && rule.enter(ref);
		},
		leave: (ref) => {
			for (const rule of rules) rule.leave && rule.leave(ref);
		}
	});
	return lintMessages;
}
/**
* @typedef {import('@lezer/common').Tree} Tree
* @typedef {import('@codemirror/lint').Diagnostic} LintMessage
*/
/**
* @typedef {object} LintAllContext
* @property {Tree} syntaxTree
* @property {(from: number, to: number) => string} readContent
* @property {(from: number, to: number, content: string) => void} updateContent
*/
/**
* Generates lint messages for the given context.
*
* @param {LintAllContext} context
* @returns {LintMessage[]} array of all lint messages
*/
function lintAll(context) {
	return [...lintSyntax(context.syntaxTree), ...lintRules(context)];
}
/**
* CodeMirror extension that provides linting for FEEL expressions.
*
* @returns {import('@codemirror/lint').LintSource} CodeMirror linting source
*/
var cmFeelLinter = () => (editorView) => {
	if (editorView.state.doc.length === 0) return [];
	return lintAll({
		syntaxTree: syntaxTree(editorView.state),
		readContent: (from, to) => editorView.state.sliceDoc(from, to),
		updateContent: (from, to, content) => editorView.dispatch({ changes: {
			from,
			to,
			insert: content
		} })
	}).map((message) => ({
		...message,
		source: message.type
	}));
};
//#endregion
//#region node_modules/@bpmn-io/lang-feel/dist/index.js
/**
* A collection of FEEL-related [snippets](#autocomplete.snippet).
*/
var snippets = [
	snippetCompletion$1("function(${params}) ${body}", {
		label: "function",
		detail: "definition",
		type: "keyword"
	}),
	snippetCompletion$1("for ${var} in ${collection} return ${value}", {
		label: "for",
		detail: "expression",
		type: "keyword"
	}),
	snippetCompletion$1("every ${var} in ${collection} satisfies ${condition}", {
		label: "every",
		detail: "quantified expression",
		type: "keyword"
	}),
	snippetCompletion$1("some ${var} in ${collection} satisfies ${condition}", {
		label: "some",
		detail: "quantified expression",
		type: "keyword"
	}),
	snippetCompletion$1("if ${condition} then ${value} else ${other value}", {
		label: "if",
		detail: "block",
		type: "keyword"
	}),
	snippetCompletion$1("{ ${key}: ${value} }", {
		label: "context",
		detail: "block",
		type: "keyword"
	}),
	snippetCompletion$1("null", {
		label: "null",
		detail: "literal",
		type: "keyword"
	}),
	snippetCompletion$1("true", {
		label: "true",
		detail: "literal",
		type: "keyword"
	}),
	snippetCompletion$1("false", {
		label: "false",
		detail: "literal",
		type: "keyword"
	})
];
function _extends$6() {
	_extends$6 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$6.apply(this, arguments);
}
function contextualKeyword(options) {
	const { context: nodes, after, before, keyword } = options;
	return ifInside({
		nodes,
		before,
		after,
		keyword
	}, completeFromList([{
		label: keyword,
		type: "keyword",
		boost: 10
	}]));
}
var keywordCompletions = [
	contextualKeyword({
		context: "InExpression",
		keyword: "in"
	}),
	contextualKeyword({
		context: "IfExpression",
		keyword: "then",
		after: "if",
		before: "else"
	}),
	contextualKeyword({
		context: "IfExpression",
		keyword: "else",
		after: "then"
	}),
	contextualKeyword({
		context: "QuantifiedExpression",
		keyword: "satisfies"
	}),
	contextualKeyword({
		context: "ForExpression",
		after: "InExpressions",
		keyword: "return"
	})
];
var dontComplete = [
	"StringLiteral",
	"Identifier",
	"LineComment",
	"BlockComment",
	"PathExpression",
	"Context",
	"Key",
	"ParameterName"
];
var doComplete = ["Expr", "ContextEntry"];
function ifExpression(completionSource) {
	const allNodes = [...dontComplete, ...doComplete];
	return (context) => {
		const { state, pos } = context;
		const match = matchUp(syntaxTree(state).resolveInner(pos, -1), allNodes);
		if (match) {
			const [_, name] = match;
			if (dontComplete.includes(name)) return null;
		}
		return completionSource(context);
	};
}
function snippetCompletion(snippets) {
	return ifExpression(completeFromList(snippets.map((s) => _extends$6({}, s, { type: "text" }))));
}
function matchLeft(node, position, nodes) {
	return matchChildren(node, position, nodes, -1);
}
function matchRight(node, position, nodes) {
	return matchChildren(node, position, nodes, 1);
}
function matchChildren(node, position, nodes, direction) {
	let child = node[direction > 0 ? "childAfter" : "childBefore"](position);
	while (child) {
		if (nodes.includes(child.name)) return child;
		if (child.type.isError && child.firstChild) {
			if (nodes.includes(child.firstChild.name)) return child.firstChild;
		}
		child = child[direction > 0 ? "nextSibling" : "prevSibling"];
	}
	return null;
}
function matchUp(node, nodeNames) {
	if (!Array.isArray(nodeNames)) nodeNames = [nodeNames];
	for (; node; node = node.parent) {
		const nodeType = node.type;
		const matchedName = nodeNames.find((name) => name && nodeType.is(name));
		if (matchedName) return [node, matchedName];
		if (nodeType.isTop) break;
	}
	return null;
}
function ifInside(options, source) {
	const { nodes, before, after, keyword } = options;
	return (context) => {
		const { state, pos } = context;
		const match = matchUp(syntaxTree(state).resolveInner(pos, -1), nodes);
		if (!match) return null;
		const [node] = match;
		if (matchLeft(node, pos, [keyword, before])) return null;
		if (matchRight(node, pos, [keyword, after])) return null;
		if (after && !matchLeft(node, pos, [after])) return null;
		return source(context);
	};
}
/**
* A FEEL language provider based on the
* [Lezer FEEL parser](https://github.com/nikku/lezer-feel),
* extended with highlighting and indentation information.
*/
var feelLanguage = LRLanguage.define({
	parser: parser.configure({ props: [indentNodeProp.add({
		"Context": delimitedIndent({ closing: "}" }),
		"List FilterExpression": delimitedIndent({ closing: "]" }),
		"ParenthesizedExpression FunctionInvocation": continuedIndent({ except: /^\s*\)/ }),
		"ForExpression QuantifiedExpression IfExpression": continuedIndent({ except: /^\s*(then|else|return|satisfies)\b/ }),
		"FunctionDefinition": continuedIndent({ except: /^\s*(\(|\))/ })
	}), foldNodeProp.add({
		Context: foldInside,
		List: foldInside,
		ParenthesizedExpression: foldInside,
		FunctionDefinition(node) {
			const last = node.getChild(")");
			if (!last) return null;
			return {
				from: last.to,
				to: node.to
			};
		}
	})] }),
	languageData: {
		indentOnInput: /^\s*(\)|\}|\]|then|else|return|satisfies)$/,
		commentTokens: {
			line: "//",
			block: {
				open: "/*",
				close: "*/"
			}
		}
	}
});
/**
* A language provider for FEEL Unary Tests
*/
var unaryTestsLanguage = feelLanguage.configure({ top: "UnaryTests" }, "FEEL unary tests");
/**
* Language provider for FEEL Expression
*/
var expressionLanguage = feelLanguage.configure({ top: "Expression" }, "FEEL expression");
/**
* Feel language support for CodeMirror.
*
* Includes [snippet](#lang-feel.snippets)
*/
function feel(config = {}) {
	const language = config.dialect === "unaryTests" ? unaryTestsLanguage : expressionLanguage;
	const dialect = config.parserDialect;
	const contextTracker = trackVariables(config.context);
	const contextualLang = language.configure({
		contextTracker,
		dialect
	});
	return new LanguageSupport(contextualLang, [...(config.completions || [snippetCompletion(snippets), keywordCompletions].flat()).map((autocomplete) => contextualLang.data.of({ autocomplete }))]);
}
//#endregion
//#region node_modules/@camunda/feel-builtins/dist/index.js
/**
* WARNING
*
* The lib file is auto-generated by the `compile:builtins` (or `update:builtins`) task.
*
* Make sure you edit the template file `tasks/camundaBuiltins.template.js` and run `compile:builtins` (or `update:builtins`) to update the file in lib.
*/
/**
* @typedef { {
*   name: string,
*   info: string,
*   type?: 'function',
*   params?: Array<{
*     name: string;
*   }>
* } } Builtin
*/
/**
* FEEL built-ins available with Camunda / feel-scala.
*
* @type { Builtin[] }
*/
var camundaBuiltins = [
	{
		"name": "not",
		"type": "function",
		"params": [{ "name": "negand" }],
		"info": "<p>Returns the logical negation of the given value.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">not(negand: boolean): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">not(true)\n// false\n\nnot(null)\n// null\n</code></pre>\n"
	},
	{
		"name": "is defined",
		"type": "function",
		"params": [{ "name": "value" }],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Checks if a given value is not <code>null</code>. If the value is <code>null</code> then the function returns <code>false</code>.\nOtherwise, the function returns <code>true</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">is defined(value: Any): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">is defined(1)\n// true\n\nis defined(null)\n// false\n\nis defined(x)\n// false - if no variable &quot;x&quot; exists\n\nis defined(x.y)\n// false - if no variable &quot;x&quot; exists or it doesn&#39;t have a property &quot;y&quot;\n</code></pre>\n<p>:::caution Breaking change</p>\n<p>This function worked differently in previous versions. It returned <code>true</code> if the value was <code>null</code>.\nSince this version, the function returns <code>false</code> if the value is <code>null</code>.</p>\n<p>:::</p>\n"
	},
	{
		"name": "get or else",
		"type": "function",
		"params": [{ "name": "value" }, { "name": "default" }],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Return the provided value parameter if not <code>null</code>, otherwise return the default parameter</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">get or else(value: Any, default: Any): Any\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">get or else(&quot;this&quot;, &quot;default&quot;)\n// &quot;this&quot;\n\nget or else(null, &quot;default&quot;)\n// &quot;default&quot;\n\nget or else(null, null)\n// null\n</code></pre>\n"
	},
	{
		"name": "assert",
		"type": "function",
		"params": [{ "name": "value" }, { "name": "condition" }],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Verify that the given condition is met. If the condition is <code>true</code>, the function returns the value.\nOtherwise, the evaluation fails with an error.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">assert(value: Any, condition: Any)\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">assert(x, x != null)\n// &quot;value&quot; - if x is &quot;value&quot;\n// error - if x is null or doesn&#39;t exist\n\nassert(x, x &gt;= 0)\n// 4 - if x is 4\n// error - if x is less than zero\n</code></pre>\n"
	},
	{
		"name": "assert",
		"type": "function",
		"params": [
			{ "name": "value" },
			{ "name": "condition" },
			{ "name": "cause" }
		],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Verify that the given condition is met. If the condition is <code>true</code>, the function returns the value.\nOtherwise, the evaluation fails with an error containing the given message.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">assert(value: Any, condition: Any, cause: String)\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">assert(x, x != null, &quot;&#39;x&#39; should not be null&quot;)\n// &quot;value&quot; - if x is &quot;value&quot;\n// error(&#39;x&#39; should not be null) - if x is null or doesn&#39;t exist\n\nassert(x, x &gt;= 0, &quot;&#39;x&#39; should be positive&quot;)\n// 4 - if x is 4\n// error(&#39;x&#39; should be positive) - if x is less than zero\n</code></pre>\n"
	},
	{
		"name": "get value",
		"type": "function",
		"params": [{ "name": "context" }, { "name": "key" }],
		"info": "<p>Returns the value of the context entry with the given key.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">get value(context: context, key: string): Any\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">get value({foo: 123}, &quot;foo&quot;)\n// 123\n\nget value({a: 1}, &quot;b&quot;)\n// null\n</code></pre>\n"
	},
	{
		"name": "get value",
		"type": "function",
		"params": [{ "name": "context" }, { "name": "keys" }],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Returns the value of the context entry for a context path defined by the given keys.</p>\n<p>If <code>keys</code> contains the keys <code>[k1, k2]</code> then it returns the value at the nested entry <code>k1.k2</code> of the context.</p>\n<p>If <code>keys</code> are empty or the nested entry defined by the keys doesn&#39;t exist in the context, it returns <code>null</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">get value(context: context, keys: list&lt;string&gt;): Any\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">get value({x:1, y: {z:0}}, [&quot;y&quot;, &quot;z&quot;])\n// 0\n\nget value({x: {y: {z:0}}}, [&quot;x&quot;, &quot;y&quot;])\n// {z:0}\n\nget value({a: {b: 3}}, [&quot;b&quot;])\n// null\n</code></pre>\n"
	},
	{
		"name": "get entries",
		"type": "function",
		"params": [{ "name": "context" }],
		"info": "<p>Returns the entries of the context as a list of key-value-pairs.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">get entries(context: context): list&lt;context&gt;\n</code></pre>\n<p>The return value is a list of contexts. Each context contains two entries for &quot;key&quot; and &quot;value&quot;.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">get entries({foo: 123})\n// [{key: &quot;foo&quot;, value: 123}]\n</code></pre>\n"
	},
	{
		"name": "context put",
		"type": "function",
		"params": [
			{ "name": "context" },
			{ "name": "key" },
			{ "name": "value" }
		],
		"info": "<p>Adds a new entry with the given key and value to the context. Returns a new context that includes the entry.</p>\n<p>If an entry for the same key already exists in the context, it overrides the value.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">context put(context: context, key: string, value: Any): context\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">context put({x:1}, &quot;y&quot;, 2)\n// {x:1, y:2}\n</code></pre>\n<p>:::info\nThe function <code>context put()</code> replaced the previous function <code>put()</code> (Camunda Extension). The\nprevious function is deprecated and should not be used anymore.\n:::</p>\n"
	},
	{
		"name": "context put",
		"type": "function",
		"params": [
			{ "name": "context" },
			{ "name": "keys" },
			{ "name": "value" }
		],
		"info": "<p>Adds a new entry with the given value to the context. The path of the entry is defined by the keys. Returns a new context that includes the entry.</p>\n<p>If <code>keys</code> contains the keys <code>[k1, k2]</code> then it adds the nested entry <code>k1.k2 = value</code> to the context.</p>\n<p>If an entry for the same keys already exists in the context, it overrides the value.</p>\n<p>If <code>keys</code> are empty, it returns <code>null</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">context put(context: context, keys: list&lt;string&gt;, value: Any): context\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">context put({x:1}, [&quot;y&quot;], 2)\n// {x:1, y:2}\n\ncontext put({x:1, y: {z:0}}, [&quot;y&quot;, &quot;z&quot;], 2)\n// {x:1, y: {z:2}}\n\ncontext put({x:1}, [&quot;y&quot;, &quot;z&quot;], 2)\n// {x:1, y: {z:2}}\n</code></pre>\n"
	},
	{
		"name": "context merge",
		"type": "function",
		"params": [{ "name": "contexts" }],
		"info": "<p>Union the given contexts. Returns a new context that includes all entries of the given contexts.</p>\n<p>If an entry for the same key already exists in a context, it overrides the value. The entries are overridden in the same order as in the list of contexts.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">context merge(contexts: list&lt;context&gt;): context\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">context merge([{x:1}, {y:2}])\n// {x:1, y:2}\n\ncontext merge([{x:1, y: 0}, {y:2}])\n// {x:1, y:2}\n</code></pre>\n<p>:::info\nThe function <code>context merge()</code> replaced the previous function <code>put all()</code> (Camunda Extension). The\nprevious function is deprecated and should not be used anymore.\n:::</p>\n"
	},
	{
		"name": "string",
		"type": "function",
		"params": [{ "name": "from" }],
		"info": "<p>Returns the given value as a string representation.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">string(from: Any): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">string(1.1)\n// &quot;1.1&quot;\n\nstring(date(&quot;2012-12-25&quot;))\n// &quot;2012-12-25&quot;\n</code></pre>\n"
	},
	{
		"name": "number",
		"type": "function",
		"params": [{ "name": "from" }],
		"info": "<p>Parses the given string to a number.</p>\n<p>Returns <code>null</code> if the string is not a number.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">number(from: string): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">number(&quot;1500.5&quot;)\n// 1500.5\n</code></pre>\n"
	},
	{
		"name": "context",
		"type": "function",
		"params": [{ "name": "entries" }],
		"info": "<p>Constructs a context of the given list of key-value pairs. It is the reverse function to <a href=\"feel-built-in-functions-context.md#get-entriescontext\">get entries()</a>.</p>\n<p>Each key-value pair must be a context with two entries: <code>key</code> and <code>value</code>. The entry with name <code>key</code> must have a value of the type <code>string</code>.</p>\n<p>It might override context entries if the keys are equal. The entries are overridden in the same order as the contexts in the given list.</p>\n<p>Returns <code>null</code> if one of the entries is not a context or if a context doesn&#39;t contain the required entries.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">context(entries: list&lt;context&gt;): context\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">context([{&quot;key&quot;:&quot;a&quot;, &quot;value&quot;:1}, {&quot;key&quot;:&quot;b&quot;, &quot;value&quot;:2}])\n// {a:1, b:2}\n</code></pre>\n"
	},
	{
		"name": "date",
		"type": "function",
		"params": [{ "name": "from" }],
		"info": "<p>Returns a date from the given value.</p>\n<p>Returns <code>null</code> if the string is not a valid calendar date. For example, <code>&quot;2024-06-31&quot;</code> is invalid because June has\nonly 30 days.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">date(from: string): date\n</code></pre>\n<p>Parses the given string into a date.</p>\n<pre><code class=\"language-feel\">date(from: date and time): date\n</code></pre>\n<p>Extracts the date component from the given date and time.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">date(&quot;2018-04-29&quot;)\n// date(&quot;2018-04-29&quot;)\n\ndate(date and time(&quot;2012-12-25T11:00:00&quot;))\n// date(&quot;2012-12-25&quot;)\n</code></pre>\n"
	},
	{
		"name": "date",
		"type": "function",
		"params": [
			{ "name": "year" },
			{ "name": "month" },
			{ "name": "day" }
		],
		"info": "<p>Returns a date from the given components.</p>\n<p>Returns <code>null</code> if the components don&#39;t represent a valid calendar date. For example, <code>2024,6,31</code> is invalid because\nJune has only 30 days.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">date(year: number, month: number, day: number): date\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">date(2012, 12, 25)\n// date(&quot;2012-12-25&quot;)\n</code></pre>\n"
	},
	{
		"name": "time",
		"type": "function",
		"params": [{ "name": "from" }],
		"info": "<p>Returns a time from the given value.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">time(from: string): time\n</code></pre>\n<p>Parses the given string into a time.</p>\n<pre><code class=\"language-feel\">time(from: date and time): time\n</code></pre>\n<p>Extracts the time component from the given date and time.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">time(&quot;12:00:00&quot;)\n// time(&quot;12:00:00&quot;)\n\ntime(date and time(&quot;2012-12-25T11:00:00&quot;))\n// time(&quot;11:00:00&quot;)\n</code></pre>\n"
	},
	{
		"name": "time",
		"type": "function",
		"params": [
			{ "name": "hour" },
			{ "name": "minute" },
			{ "name": "second" }
		],
		"info": "<p>Returns a time from the given components.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">time(hour: number, minute: number, second: number): time\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">time(23, 59, 0)\n// time(&quot;23:59:00&quot;)\n</code></pre>\n"
	},
	{
		"name": "time",
		"type": "function",
		"params": [
			{ "name": "hour" },
			{ "name": "minute" },
			{ "name": "second" },
			{ "name": "offset" }
		],
		"info": "<p>Returns a time from the given components, including a timezone offset.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">time(hour: number, minute: number, second: number, offset: days and time duration): time\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">time(14, 30, 0, duration(&quot;PT1H&quot;))\n// time(&quot;14:30:00+01:00&quot;)\n</code></pre>\n"
	},
	{
		"name": "date and time",
		"type": "function",
		"params": [{ "name": "from" }],
		"info": "<p>Parses the given string into a date and time.</p>\n<p>Returns <code>null</code> if the string is not a valid calendar date. For example, <code>&quot;2024-06-31T10:00:00&quot;</code> is invalid because\nJune has only 30 days.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">date and time(from: string): date and time\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">date and time(&quot;2018-04-29T09:30:00&quot;)\n// date and time(&quot;2018-04-29T09:30:00&quot;)\n</code></pre>\n"
	},
	{
		"name": "date and time",
		"type": "function",
		"params": [{ "name": "date" }, { "name": "time" }],
		"info": "<p>Returns a date and time from the given components.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">date and time(date: date, time: time): date and time\n</code></pre>\n<pre><code class=\"language-feel\">date and time(date: date and time, time: time): date and time\n</code></pre>\n<p>Returns a date and time value that consists of the date component of <code>date</code> combined with <code>time</code>.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">date and time(date(&quot;2012-12-24&quot;),time(&quot;T23:59:00&quot;))\n// date and time(&quot;2012-12-24T23:59:00&quot;)\n\ndate and time(date and time(&quot;2012-12-25T11:00:00&quot;),time(&quot;T23:59:00&quot;))\n// date and time(&quot;2012-12-25T23:59:00&quot;)\n</code></pre>\n"
	},
	{
		"name": "date and time",
		"type": "function",
		"params": [{ "name": "date" }, { "name": "timezone" }],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Returns the given date and time value at the given timezone.</p>\n<p>If <code>date</code> has a different timezone than <code>timezone</code> then it adjusts the time to match the local time of <code>timezone</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">date and time(date: date and time, timezone: string): date and time\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">date and time(@&quot;2020-07-31T14:27:30@Europe/Berlin&quot;, &quot;America/Los_Angeles&quot;)\n// date and time(&quot;2020-07-31T05:27:30@America/Los_Angeles&quot;)\n\ndate and time(@&quot;2020-07-31T14:27:30&quot;, &quot;Z&quot;)\n// date and time(&quot;2020-07-31T12:27:30Z&quot;)\n</code></pre>\n"
	},
	{
		"name": "duration",
		"type": "function",
		"params": [{ "name": "from" }],
		"info": "<p>Parses the given string into a duration. The duration is either a days and time duration or a years and months duration.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">duration(from: string): days and time duration\n</code></pre>\n<pre><code class=\"language-feel\">duration(from: string): years and months duration\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">duration(&quot;P5D&quot;)\n// duration(&quot;P5D&quot;)\n\nduration(&quot;P32Y&quot;)\n// duration(&quot;P32Y&quot;)\n</code></pre>\n"
	},
	{
		"name": "years and months duration",
		"type": "function",
		"params": [{ "name": "from" }, { "name": "to" }],
		"info": "<p>Returns the years and months duration between <code>from</code> and <code>to</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">years and months duration(from: date, to: date): years and months duration\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">years and months duration(date(&quot;2011-12-22&quot;), date(&quot;2013-08-24&quot;))\n// duration(&quot;P1Y8M&quot;)\n</code></pre>\n"
	},
	{
		"name": "list contains",
		"type": "function",
		"params": [{ "name": "list" }, { "name": "element" }],
		"info": "<p>Returns <code>true</code> if the given list contains the element. Otherwise, returns <code>false</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">list contains(list: list, element: Any): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">list contains([1,2,3], 2)\n// true\n</code></pre>\n"
	},
	{
		"name": "count",
		"type": "function",
		"params": [{ "name": "list" }],
		"info": "<p>Returns the number of elements of the given list.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">count(list: list): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">count([1,2,3])\n// 3\n</code></pre>\n"
	},
	{
		"name": "min",
		"type": "function",
		"params": [{ "name": "list" }],
		"info": "<p>Returns the minimum of the given list.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">min(list: list): Any\n</code></pre>\n<p>All elements in <code>list</code> should have the same type and be comparable.</p>\n<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">min([1,2,3])\n// 1\n\nmin(1,2,3)\n// 1\n</code></pre>\n"
	},
	{
		"name": "max",
		"type": "function",
		"params": [{ "name": "list" }],
		"info": "<p>Returns the maximum of the given list.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">max(list: list): Any\n</code></pre>\n<p>All elements in <code>list</code> should have the same type and be comparable.</p>\n<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">max([1,2,3])\n// 3\n\nmax(1,2,3)\n// 3\n</code></pre>\n"
	},
	{
		"name": "sum",
		"type": "function",
		"params": [{ "name": "list" }],
		"info": "<p>Returns the sum of the given list of numbers.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">sum(list: list&lt;number&gt;): number\n</code></pre>\n<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">sum([1,2,3])\n// 6\n\nsum(1,2,3)\n// 6\n</code></pre>\n"
	},
	{
		"name": "product",
		"type": "function",
		"params": [{ "name": "list" }],
		"info": "<p>Returns the product of the given list of numbers.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">product(list: list&lt;number&gt;): number\n</code></pre>\n<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">product([2, 3, 4])\n// 24\n\nproduct(2, 3, 4)\n// 24\n</code></pre>\n"
	},
	{
		"name": "mean",
		"type": "function",
		"params": [{ "name": "list" }],
		"info": "<p>Returns the arithmetic mean (i.e. average) of the given list of numbers.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">mean(list: list&lt;number&gt;): number\n</code></pre>\n<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">mean([1,2,3])\n// 2\n\nmean(1,2,3)\n// 2\n</code></pre>\n"
	},
	{
		"name": "median",
		"type": "function",
		"params": [{ "name": "list" }],
		"info": "<p>Returns the median element of the given list of numbers.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">median(list: list&lt;number&gt;): number\n</code></pre>\n<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">median(8, 2, 5, 3, 4)\n// 4\n\nmedian([6, 1, 2, 3])\n// 2.5\n</code></pre>\n"
	},
	{
		"name": "stddev",
		"type": "function",
		"params": [{ "name": "list" }],
		"info": "<p>Returns the standard deviation of the given list of numbers.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">stddev(list: list&lt;number&gt;): number\n</code></pre>\n<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">stddev(2, 4, 7, 5)\n// 2.0816659994661326\n\nstddev([2, 4, 7, 5])\n// 2.0816659994661326\n</code></pre>\n"
	},
	{
		"name": "mode",
		"type": "function",
		"params": [{ "name": "list" }],
		"info": "<p>Returns the mode of the given list of numbers.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">mode(list: list&lt;number&gt;): number\n</code></pre>\n<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">mode(6, 3, 9, 6, 6)\n// [6]\n\nmode([6, 1, 9, 6, 1])\n// [1, 6]\n</code></pre>\n"
	},
	{
		"name": "all",
		"type": "function",
		"params": [{ "name": "list" }],
		"info": "<p>Returns <code>false</code> if any element of the given list is <code>false</code>. Otherwise, returns <code>true</code>.</p>\n<p>If the given list is empty, it returns <code>true</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">all(list: list&lt;boolean&gt;): boolean\n</code></pre>\n<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">all([true,false])\n// false\n\nall(false,null,true)\n// false\n</code></pre>\n<p>:::info\nThe function <code>all()</code> replaced the previous function <code>and()</code>. The previous function is deprecated and\nshould not be used anymore.\n:::</p>\n"
	},
	{
		"name": "any",
		"type": "function",
		"params": [{ "name": "list" }],
		"info": "<p>Returns <code>true</code> if any element of the given list is <code>true</code>. Otherwise, returns <code>false</code>.</p>\n<p>If the given list is empty, it returns <code>false</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">any(list: list&lt;boolean&gt;): boolean\n</code></pre>\n<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">any([false,true])\n// true\n\nany(false,null,true)\n// true\n</code></pre>\n<p>:::info\nThe function <code>any()</code> replaced the previous function <code>or()</code>. The previous function is deprecated and\nshould not be used anymore.\n:::</p>\n"
	},
	{
		"name": "sublist",
		"type": "function",
		"params": [{ "name": "list" }, { "name": "start position" }],
		"info": "<p>Returns a partial list of the given value starting at <code>start position</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">sublist(list: list, start position: number): list\n</code></pre>\n<p>The <code>start position</code> starts at the index <code>1</code>. The last position is <code>-1</code>.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">sublist([1,2,3], 2)\n// [2,3]\n</code></pre>\n"
	},
	{
		"name": "sublist",
		"type": "function",
		"params": [
			{ "name": "list" },
			{ "name": "start position" },
			{ "name": "length" }
		],
		"info": "<p>Returns a partial list of the given value starting at <code>start position</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">sublist(list: list, start position: number, length: number): list\n</code></pre>\n<p>The <code>start position</code> starts at the index <code>1</code>. The last position is <code>-1</code>.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">sublist([1,2,3], 1, 2)\n// [1,2]\n</code></pre>\n"
	},
	{
		"name": "append",
		"type": "function",
		"params": [{ "name": "list" }, { "name": "items" }],
		"info": "<p>Returns the given list with all <code>items</code> appended.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">append(list: list, items: Any): list\n</code></pre>\n<p>The parameter <code>items</code> can be a single element or a sequence of elements.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">append([1], 2, 3)\n// [1,2,3]\n</code></pre>\n"
	},
	{
		"name": "concatenate",
		"type": "function",
		"params": [{ "name": "lists" }],
		"info": "<p>Returns a list that includes all elements of the given lists.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">concatenate(lists: list): list\n</code></pre>\n<p>The parameter <code>lists</code> is a sequence of lists.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">concatenate([1,2],[3])\n// [1,2,3]\n\nconcatenate([1],[2],[3])\n// [1,2,3]\n</code></pre>\n"
	},
	{
		"name": "insert before",
		"type": "function",
		"params": [
			{ "name": "list" },
			{ "name": "position" },
			{ "name": "newItem" }
		],
		"info": "<p>Returns the given list with <code>newItem</code> inserted at <code>position</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">insert before(list: list, position: number, newItem: Any): list\n</code></pre>\n<p>The <code>position</code> starts at the index <code>1</code>. The last position is <code>-1</code>.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">insert before([1,3],1,2)\n// [2,1,3]\n</code></pre>\n"
	},
	{
		"name": "remove",
		"type": "function",
		"params": [{ "name": "list" }, { "name": "position" }],
		"info": "<p>Returns the given list without the element at <code>position</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">remove(list: list, position: number): list\n</code></pre>\n<p>The <code>position</code> starts at the index <code>1</code>. The last position is <code>-1</code>.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">remove([1,2,3], 2)\n// [1,3]\n</code></pre>\n"
	},
	{
		"name": "reverse",
		"type": "function",
		"params": [{ "name": "list" }],
		"info": "<p>Returns the given list in revered order.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">reverse(list: list): list\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">reverse([1,2,3])\n// [3,2,1]\n</code></pre>\n"
	},
	{
		"name": "index of",
		"type": "function",
		"params": [{ "name": "list" }, { "name": "match" }],
		"info": "<p>Returns an ascending list of positions containing <code>match</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">index of(list: list, match: Any): list&lt;number&gt;\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">index of([1,2,3,2],2)\n// [2,4]\n</code></pre>\n"
	},
	{
		"name": "union",
		"type": "function",
		"params": [{ "name": "list" }],
		"info": "<p>Returns a list that includes all elements of the given lists without duplicates.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">union(list: list): list\n</code></pre>\n<p>The parameter <code>list</code> is a sequence of lists.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">union([1,2],[2,3])\n// [1,2,3]\n</code></pre>\n"
	},
	{
		"name": "distinct values",
		"type": "function",
		"params": [{ "name": "list" }],
		"info": "<p>Returns the given list without duplicates.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">distinct values(list: list): list\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">distinct values([1,2,3,2,1])\n// [1,2,3]\n</code></pre>\n"
	},
	{
		"name": "duplicate values",
		"type": "function",
		"params": [{ "name": "list" }],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Returns all duplicate values of the given list.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">duplicate values(list: list): list\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">duplicate values([1,2,3,2,1])\n// [1,2]\n</code></pre>\n"
	},
	{
		"name": "flatten",
		"type": "function",
		"params": [{ "name": "list" }],
		"info": "<p>Returns a list that includes all elements of the given list without nested lists.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">flatten(list: list): list\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">flatten([[1,2],[[3]], 4])\n// [1,2,3,4]\n</code></pre>\n"
	},
	{
		"name": "sort",
		"type": "function",
		"params": [{ "name": "list" }, { "name": "precedes" }],
		"info": "<p>Returns the given list sorted by the <code>precedes</code> function.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">sort(list: list, precedes: function&lt;(Any, Any) -&gt; boolean&gt;): list\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">sort(list: [3,1,4,5,2], precedes: function(x,y) x &lt; y)\n// [1,2,3,4,5]\n</code></pre>\n"
	},
	{
		"name": "string join",
		"type": "function",
		"params": [{ "name": "list" }],
		"info": "<p>Joins a list of strings into a single string. This is similar to\nJava&#39;s <a href=\"https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/stream/Collectors.html#joining(java.lang.CharSequence,java.lang.CharSequence,java.lang.CharSequence)\">joining</a>\nfunction.</p>\n<p>If an item of the list is <code>null</code>, the item is ignored for the result string. If an item is\nneither a string nor <code>null</code>, the function returns <code>null</code> instead of a string.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">string join(list: list&lt;string&gt;): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">string join([&quot;a&quot;,&quot;b&quot;,&quot;c&quot;])\n// &quot;abc&quot;\n\nstring join([&quot;a&quot;,null,&quot;c&quot;])\n// &quot;ac&quot;\n\nstring join([])\n// &quot;&quot;\n</code></pre>\n"
	},
	{
		"name": "string join",
		"type": "function",
		"params": [{ "name": "list" }, { "name": "delimiter" }],
		"info": "<p>Joins a list of strings into a single string. This is similar to\nJava&#39;s <a href=\"https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/stream/Collectors.html#joining(java.lang.CharSequence,java.lang.CharSequence,java.lang.CharSequence)\">joining</a>\nfunction.</p>\n<p>If an item of the list is <code>null</code>, the item is ignored for the result string. If an item is\nneither a string nor <code>null</code>, the function returns <code>null</code> instead of a string.</p>\n<p>The resulting string contains a <code>delimiter</code> between each element.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">string join(list: list&lt;string&gt;, delimiter: string): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">string join([&quot;a&quot;], &quot;X&quot;)\n// &quot;a&quot;\n\nstring join([&quot;a&quot;,&quot;b&quot;,&quot;c&quot;], &quot;, &quot;)\n// &quot;a, b, c&quot;\n</code></pre>\n"
	},
	{
		"name": "string join",
		"type": "function",
		"params": [
			{ "name": "list" },
			{ "name": "delimiter" },
			{ "name": "prefix" },
			{ "name": "suffix" }
		],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Joins a list of strings into a single string. This is similar to\nJava&#39;s <a href=\"https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/stream/Collectors.html#joining(java.lang.CharSequence,java.lang.CharSequence,java.lang.CharSequence)\">joining</a>\nfunction.</p>\n<p>If an item of the list is <code>null</code>, the item is ignored for the result string. If an item is\nneither a string nor <code>null</code>, the function returns <code>null</code> instead of a string.</p>\n<p>The resulting string starts with <code>prefix</code>, contains a <code>delimiter</code> between each element, and ends\nwith <code>suffix</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">string join(list: list&lt;string&gt;, delimiter: string, prefix: string, suffix: string): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">string join([&quot;a&quot;,&quot;b&quot;,&quot;c&quot;], &quot;, &quot;, &quot;[&quot;, &quot;]&quot;)\n// &quot;[a, b, c]&quot;\n</code></pre>\n"
	},
	{
		"name": "is empty",
		"type": "function",
		"params": [{ "name": "list" }],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Returns <code>true</code> if the given list is empty. Otherwise, returns <code>false</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">is empty(list: list): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">is empty([])\n// true\n\nis empty([1,2,3])\n// false\n</code></pre>\n"
	},
	{
		"name": "partition",
		"type": "function",
		"params": [{ "name": "list" }, { "name": "size" }],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Returns consecutive sublists of a list, each of the same size (the final list may be smaller).</p>\n<p>If <code>size</code> is less than <code>0</code>, it returns <code>null</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">partition(list: list, size: number): list\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">partition([1,2,3,4,5], 2)\n// [[1,2], [3,4], [5]]\n\npartition([], 2)\n// []\n\npartition([1,2], 0)\n// null\n</code></pre>\n"
	},
	{
		"name": "fromAi",
		"type": "function",
		"params": [{ "name": "value" }],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Returns the unmodified <code>value</code> parameter.</p>\n<ul>\n<li>The purpose of this function is solely to tag the value as being generated by an AI integration.</li>\n<li>The actual handling is not performed by the FEEL engine, but by a custom integration such as a connector or a job worker.</li>\n</ul>\n<p>The main use case of this function is to be used in combination with\nthe <a href=\"../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent.md\">AI Agent connector</a>.</p>\n<p>See the following function overloads for additional function parameters.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">fromAi(value: Any): Any\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">fromAi(toolCall.searchQuery)\n// toolCall.searchQuery contents\n\nfromAi(toolCall.userId)\n// toolCall.userId contents\n\nfromAi(&quot;A&quot;)\n// &quot;A&quot; - does not make much sense and might be flagged as an error by the integration consuming the definition\n</code></pre>\n"
	},
	{
		"name": "fromAi",
		"type": "function",
		"params": [{ "name": "value" }, { "name": "description" }],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Returns the unmodified <code>value</code> parameter.</p>\n<p>In addition to the previous overload, it also accepts an optional <code>description</code> parameter to provide a textual description of the value.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">fromAi(value: Any, description: string): Any\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">fromAi(toolCall.searchQuery, &quot;The search query used to find the best match.&quot;)\n// toolCall.searchQuery contents\n\nfromAi(toolCall.searchQuery, null)\n// toolCall.searchQuery contents\n</code></pre>\n"
	},
	{
		"name": "fromAi",
		"type": "function",
		"params": [
			{ "name": "value" },
			{ "name": "description" },
			{ "name": "type" }
		],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Returns the unmodified <code>value</code> parameter.</p>\n<p>In addition to the previous overload, it also accepts an optional <code>type</code> parameter to provide type information about the value.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">fromAi(value: Any, description: string, type: string): Any\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">fromAi(toolCall.searchQuery, &quot;The search query used to find the best match.&quot;, &quot;string&quot;)\n// toolCall.searchQuery contents\n\nfromAi(toolCall.userId, &quot;The user&#39;s ID&quot;, &quot;number&quot;)\n// toolCall.userId contents\n\nfromAi(toolCall.userId, null, &quot;number&quot;)\n// toolCall.userId contents\n\nfromAi(value: toolCall.userId, type: &quot;number&quot;)\n// toolCall.userId contents\n</code></pre>\n"
	},
	{
		"name": "fromAi",
		"type": "function",
		"params": [
			{ "name": "value" },
			{ "name": "description" },
			{ "name": "type" },
			{ "name": "schema" }
		],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Returns the unmodified <code>value</code> parameter.</p>\n<p>In addition to the previous overload, it also accepts an optional <code>schema</code> parameter to provide a (partial) <a href=\"https://json-schema.org/\">JSON schema</a> for the value.</p>\n<ul>\n<li>The schema is not validated by the FEEL engine but might be by a custom integration consuming the information.</li>\n<li>From the engine side it is possible to specify both a <code>type</code> and a <code>schema</code>, and it depends on the integration as to which value takes precedence.</li>\n</ul>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">fromAi(value: Any, description: string, type: string, schema: context): Any\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">fromAi(toolCall.documentType, &quot;The document type to provide&quot;, &quot;string&quot;, {\n  enum: [&quot;invoice&quot;, &quot;receipt&quot;, &quot;contract&quot;]\n})\n// toolCall.documentType contents\n\nfromAi(value: toolCall.documentType, description: &quot;The document type to provide&quot;, schema: {\n  type: &quot;string&quot;,\n  enum: [&quot;invoice&quot;, &quot;receipt&quot;, &quot;contract&quot;]\n})\n// toolCall.documentType contents\n\nfromAi(toolCall.tags, &quot;Tags to apply to the blog post&quot;, &quot;array&quot;, {\n  items: {\n    type: &quot;string&quot;\n  }\n})\n// toolCall.tags contents\n</code></pre>\n"
	},
	{
		"name": "fromAi",
		"type": "function",
		"params": [
			{ "name": "value" },
			{ "name": "description" },
			{ "name": "type" },
			{ "name": "schema" },
			{ "name": "options" }
		],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Returns the unmodified <code>value</code> parameter.</p>\n<p>In addition to the previous overload, it also accepts an optional <code>options</code> parameter to provide additional options for the integration handling the value definition.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">fromAi(value: Any, description: string, type: string, schema: context, options: context): Any\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">fromAi(toolCall.documentType, &quot;The document type to provide&quot;, &quot;string&quot;, null, {\n  strict: true,\n  required: false\n})\n// toolCall.documentType contents\n\nfromAi(value: toolCall.documentType, options: {\n  strict: true,\n  required: false\n})\n// toolCall.documentType contents\n</code></pre>\n"
	},
	{
		"name": "decimal",
		"type": "function",
		"params": [{ "name": "n" }, { "name": "scale" }],
		"info": "<p>Rounds the given value at the given scale.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">decimal(n: number, scale: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">decimal(1/3, 2)\n// .33\n\ndecimal(1.5, 0)\n// 2\n</code></pre>\n"
	},
	{
		"name": "floor",
		"type": "function",
		"params": [{ "name": "n" }],
		"info": "<p>Rounds the given value with rounding mode flooring.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">floor(n: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">floor(1.5)\n// 1\n\nfloor(-1.5)\n// -2\n</code></pre>\n"
	},
	{
		"name": "floor",
		"type": "function",
		"params": [{ "name": "n" }, { "name": "scale" }],
		"info": "<p>Rounds the given value with rounding mode flooring at the given scale.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">floor(n: number, scale: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">floor(-1.56, 1)\n// -1.6\n</code></pre>\n"
	},
	{
		"name": "ceiling",
		"type": "function",
		"params": [{ "name": "n" }],
		"info": "<p>Rounds the given value with rounding mode ceiling.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">ceiling(n: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">ceiling(1.5)\n// 2\n\nceiling(-1.5)\n// -1\n</code></pre>\n"
	},
	{
		"name": "ceiling",
		"type": "function",
		"params": [{ "name": "n" }, { "name": "scale" }],
		"info": "<p>Rounds the given value with rounding mode ceiling at the given scale.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">ceiling(n: number, scale: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">ceiling(-1.56, 1)\n// -1.5\n</code></pre>\n"
	},
	{
		"name": "round up",
		"type": "function",
		"params": [{ "name": "n" }, { "name": "scale" }],
		"info": "<p>Rounds the given value with the rounding mode round-up at the given scale.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">round up(n: number, scale: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">round up(5.5)\n// 6\n\nround up(-5.5)\n// -6\n\nround up(1.121, 2)\n// 1.13\n\nround up(-1.126, 2)\n// -1.13\n</code></pre>\n"
	},
	{
		"name": "round down",
		"type": "function",
		"params": [{ "name": "n" }, { "name": "scale" }],
		"info": "<p>Rounds the given value with the rounding mode round-down at the given scale.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">round down(n: number, scale: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">round down(5.5, 0)\n// 5\n\nround down (-5.5, 0)\n// -5\n\nround down (1.121, 2)\n// 1.12\n\nround down (-1.126, 2)\n// -1.12\n</code></pre>\n"
	},
	{
		"name": "round half up",
		"type": "function",
		"params": [{ "name": "n" }, { "name": "scale" }],
		"info": "<p>Rounds the given value with the rounding mode round-half-up at the given scale.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">round half up(n: number, scale: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">round half up(5.5, 0)\n// 6\n\nround half up(-5.5, 0)\n// -6\n\nround half up(1.121, 2)\n// 1.12\n\nround half up(-1.126, 2)\n// -1.13\n</code></pre>\n"
	},
	{
		"name": "round half down",
		"type": "function",
		"params": [{ "name": "n" }, { "name": "scale" }],
		"info": "<p>Rounds the given value with the rounding mode round-half-down at the given scale.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">round half down(n: number, scale: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">round half down (5.5, 0)\n// 5\n\nround half down (-5.5, 0)\n// -5\n\nround half down (1.121, 2)\n// 1.12\n\nround half down (-1.126, 2)\n// -1.13\n</code></pre>\n"
	},
	{
		"name": "abs",
		"type": "function",
		"params": [{ "name": "number" }],
		"info": "<p>Returns the absolute value of the given numeric value.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">abs(number: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">abs(10)\n// 10\n\nabs(-10)\n// 10\n</code></pre>\n"
	},
	{
		"name": "modulo",
		"type": "function",
		"params": [{ "name": "dividend" }, { "name": "divisor" }],
		"info": "<p>Returns the remainder of the division of dividend by divisor.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">modulo(dividend: number, divisor: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">modulo(12, 5)\n// 2\n</code></pre>\n"
	},
	{
		"name": "sqrt",
		"type": "function",
		"params": [{ "name": "number" }],
		"info": "<p>Returns the square root of the given value.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">sqrt(number: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">sqrt(16)\n// 4\n</code></pre>\n"
	},
	{
		"name": "log",
		"type": "function",
		"params": [{ "name": "number" }],
		"info": "<p>Returns the natural logarithm (base e) of the given value.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">log(number: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">log(10)\n// 2.302585092994046\n</code></pre>\n"
	},
	{
		"name": "exp",
		"type": "function",
		"params": [{ "name": "number" }],
		"info": "<p>Returns the Euler’s number e raised to the power of the given number .</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">exp(number: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">exp(5)\n// 148.4131591025766\n</code></pre>\n"
	},
	{
		"name": "odd",
		"type": "function",
		"params": [{ "name": "number" }],
		"info": "<p>Returns <code>true</code> if the given value is odd. Otherwise, returns <code>false</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">odd(number: number): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">odd(5)\n// true\n\nodd(2)\n// false\n</code></pre>\n"
	},
	{
		"name": "even",
		"type": "function",
		"params": [{ "name": "number" }],
		"info": "<p>Returns <code>true</code> if the given is even. Otherwise, returns <code>false</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">even(number: number): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">even(5)\n// false\n\neven(2)\n// true\n</code></pre>\n"
	},
	{
		"name": "random number",
		"type": "function",
		"params": [],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Returns a random number between <code>0</code> and <code>1</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">random number(): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">random number()\n// 0.9701618132579795\n</code></pre>\n"
	},
	{
		"name": "before",
		"type": "function",
		"params": [{ "name": "point1" }, { "name": "point2" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">before(point1: Any, point2: Any): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">before(1, 10)\n// true\n\nbefore(10, 1)\n// false\n</code></pre>\n"
	},
	{
		"name": "before",
		"type": "function",
		"params": [{ "name": "range" }, { "name": "point" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">before(range: range, point: Any): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">before([1..5], 10)\n// true\n</code></pre>\n"
	},
	{
		"name": "before",
		"type": "function",
		"params": [{ "name": "point" }, { "name": "range" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">before(point: Any, range: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">before(1, [2..5])\n// true\n</code></pre>\n"
	},
	{
		"name": "before",
		"type": "function",
		"params": [{ "name": "range1" }, { "name": "range2" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">before(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">before([1..5], [6..10])\n// true\n\nbefore([1..5),[5..10])\n// true\n</code></pre>\n"
	},
	{
		"name": "after",
		"type": "function",
		"params": [{ "name": "point1" }, { "name": "point2" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">after(point1: Any, point2: Any): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">after(10, 1)\n// true\n\nafter(1, 10)\n// false\n</code></pre>\n"
	},
	{
		"name": "after",
		"type": "function",
		"params": [{ "name": "range" }, { "name": "point" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">after(range: range, point: Any): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">after([1..5], 10)\n// false\n</code></pre>\n"
	},
	{
		"name": "after",
		"type": "function",
		"params": [{ "name": "point" }, { "name": "range" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">after(point: Any, range: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">after(12, [2..5])\n// true\n</code></pre>\n"
	},
	{
		"name": "after",
		"type": "function",
		"params": [{ "name": "range1" }, { "name": "range2" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">after(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">after([6..10], [1..5])\n// true\n\nafter([5..10], [1..5))\n// true\n</code></pre>\n"
	},
	{
		"name": "meets",
		"type": "function",
		"params": [{ "name": "range1" }, { "name": "range2" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">meets(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">meets([1..5], [5..10])\n// true\n\nmeets([1..3], [4..6])\n// false\n\nmeets([1..3], [3..5])\n// true\n\nmeets([1..5], (5..8])\n// false\n</code></pre>\n"
	},
	{
		"name": "met by",
		"type": "function",
		"params": [{ "name": "range1" }, { "name": "range2" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">met by(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">met by([5..10], [1..5])\n// true\n\nmet by([3..4], [1..2])\n// false\n\nmet by([3..5], [1..3])\n// true\n\nmet by((5..8], [1..5))\n// false\n\nmet by([5..10], [1..5))\n// false\n</code></pre>\n"
	},
	{
		"name": "overlaps",
		"type": "function",
		"params": [{ "name": "range1" }, { "name": "range2" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">overlaps(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">overlaps([5..10], [1..6])\n// true\n\noverlaps((3..7], [1..4])\n// true\n\noverlaps([1..3], (3..6])\n// false\n\noverlaps((5..8], [1..5))\n// false\n\noverlaps([4..10], [1..5))\n// true\n</code></pre>\n"
	},
	{
		"name": "overlaps before",
		"type": "function",
		"params": [{ "name": "range1" }, { "name": "range2" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">overlaps before(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">overlaps before([1..5], [4..10])\n// true\n\noverlaps before([3..4], [1..2])\n// false\n\noverlaps before([1..3], (3..5])\n// false\n\noverlaps before([1..5), (3..8])\n// true\n\noverlaps before([1..5), [5..10])\n// false\n</code></pre>\n"
	},
	{
		"name": "overlaps after",
		"type": "function",
		"params": [{ "name": "range1" }, { "name": "range2" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">overlaps after(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">overlaps after([4..10], [1..5])\n// true\n\noverlaps after([3..4], [1..2])\n// false\n\noverlaps after([3..5], [1..3))\n// false\n\noverlaps after((5..8], [1..5))\n// false\n\noverlaps after([4..10], [1..5))\n// true\n</code></pre>\n"
	},
	{
		"name": "finishes",
		"type": "function",
		"params": [{ "name": "point" }, { "name": "range" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">finishes(point: Any, range: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">finishes(5, [1..5])\n// true\n\nfinishes(10, [1..7])\n// false\n</code></pre>\n"
	},
	{
		"name": "finishes",
		"type": "function",
		"params": [{ "name": "range1" }, { "name": "range2" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">finishes(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">finishes([3..5], [1..5])\n// true\n\nfinishes((1..5], [1..5))\n// false\n\nfinishes([5..10], [1..10))\n// false\n</code></pre>\n"
	},
	{
		"name": "finished by",
		"type": "function",
		"params": [{ "name": "range" }, { "name": "point" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">finished by(range: range, point: Any): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">finished by([5..10], 10)\n// true\n\nfinished by([3..4], 2)\n// false\n</code></pre>\n"
	},
	{
		"name": "finished by",
		"type": "function",
		"params": [{ "name": "range1" }, { "name": "range2" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">finished by(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">finished by([1..5], [3..5])\n// true\n\nfinished by((5..8], [1..5))\n// false\n\nfinished by([5..10], (1..10))\n// false\n</code></pre>\n"
	},
	{
		"name": "includes",
		"type": "function",
		"params": [{ "name": "range" }, { "name": "point" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">includes(range: range, point: Any): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">includes([5..10], 6)\n// true\n\nincludes([3..4], 5)\n// false\n</code></pre>\n"
	},
	{
		"name": "includes",
		"type": "function",
		"params": [{ "name": "range1" }, { "name": "range2" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">includes(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">includes([1..10], [4..6])\n// true\n\nincludes((5..8], [1..5))\n// false\n\nincludes([1..10], [1..5))\n// true\n</code></pre>\n"
	},
	{
		"name": "during",
		"type": "function",
		"params": [{ "name": "point" }, { "name": "range" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">during(point: Any, range: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">during(5, [1..10])\n// true\n\nduring(12, [1..10])\n// false\n\nduring(1, (1..10])\n// false\n</code></pre>\n"
	},
	{
		"name": "during",
		"type": "function",
		"params": [{ "name": "range1" }, { "name": "range2" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">during(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">during([4..6], [1..10))\n// true\n\nduring((1..5], (1..10])\n// true\n</code></pre>\n"
	},
	{
		"name": "starts",
		"type": "function",
		"params": [{ "name": "point" }, { "name": "range" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">starts(point: Any, range: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">starts(1, [1..5])\n// true\n\nstarts(1, (1..8])\n// false\n</code></pre>\n"
	},
	{
		"name": "starts",
		"type": "function",
		"params": [{ "name": "range1" }, { "name": "range2" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">starts(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">starts((1..5], [1..5])\n// false\n\nstarts([1..10], [1..5])\n// false\n\nstarts((1..5), (1..10))\n// true\n</code></pre>\n"
	},
	{
		"name": "started by",
		"type": "function",
		"params": [{ "name": "range" }, { "name": "point" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">started by(range: range, point: Any): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">started by([1..10], 1)\n// true\n\nstarted by((1..10], 1)\n// false\n</code></pre>\n"
	},
	{
		"name": "started by",
		"type": "function",
		"params": [{ "name": "range1" }, { "name": "range2" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">started by(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">started by([1..10], [1..5])\n// true\n\nstarted by((1..10], [1..5))\n// false\n\nstarted by([1..10], [1..10))\n// true\n</code></pre>\n"
	},
	{
		"name": "coincides",
		"type": "function",
		"params": [{ "name": "point1" }, { "name": "point2" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">coincides(point1: Any, point2: Any): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">coincides(5, 5)\n// true\n\ncoincides(3, 4)\n// false\n</code></pre>\n"
	},
	{
		"name": "coincides",
		"type": "function",
		"params": [{ "name": "range1" }, { "name": "range2" }],
		"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">coincides(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">coincides([1..5], [1..5])\n// true\n\ncoincides((1..5], [1..5))\n// false\n\ncoincides([1..5], [2..6])\n// false\n</code></pre>\n"
	},
	{
		"name": "substring",
		"type": "function",
		"params": [{ "name": "string" }, { "name": "start position" }],
		"info": "<p>Returns a substring of the given value starting at <code>start position</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">substring(string: string, start position: number): string\n</code></pre>\n<p>The <code>start position</code> starts at the index <code>1</code>. The last position is <code>-1</code>.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">substring(&quot;foobar&quot;, 3)\n// &quot;obar&quot;\n\nsubstring(&quot;foobar&quot;, -2)\n// &quot;ar&quot;\n</code></pre>\n"
	},
	{
		"name": "substring",
		"type": "function",
		"params": [
			{ "name": "string" },
			{ "name": "start position" },
			{ "name": "length" }
		],
		"info": "<p>Returns a substring of the given value, starting at <code>start position</code> with the given <code>length</code>. If <code>length</code> is greater than\nthe remaining characters of the value, it returns all characters from <code>start position</code> until the end.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">substring(string: string, start position: number, length: number): string\n</code></pre>\n<p>The <code>start position</code> starts at the index <code>1</code>. The last position is <code>-1</code>.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">substring(&quot;foobar&quot;, 3, 3)\n// &quot;oba&quot;\n\nsubstring(&quot;foobar&quot;, -3, 2)\n// &quot;ba&quot;\n\nsubstring(&quot;foobar&quot;, 3, 10)\n// &quot;obar&quot;\n</code></pre>\n"
	},
	{
		"name": "string length",
		"type": "function",
		"params": [{ "name": "string" }],
		"info": "<p>Returns the number of characters in the given value.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">string length(string: string): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">string length(&quot;foo&quot;)\n// 3\n</code></pre>\n"
	},
	{
		"name": "upper case",
		"type": "function",
		"params": [{ "name": "string" }],
		"info": "<p>Returns the given value with all characters are uppercase.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">upper case(string: string): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">upper case(&quot;aBc4&quot;)\n// &quot;ABC4&quot;\n</code></pre>\n"
	},
	{
		"name": "lower case",
		"type": "function",
		"params": [{ "name": "string" }],
		"info": "<p>Returns the given value with all characters are lowercase.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">lower case(string: string): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">lower case(&quot;aBc4&quot;)\n// &quot;abc4&quot;\n</code></pre>\n"
	},
	{
		"name": "substring before",
		"type": "function",
		"params": [{ "name": "string" }, { "name": "match" }],
		"info": "<p>Returns a substring of the given value that contains all characters before <code>match</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">substring before(string: string, match: string): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">substring before(&quot;foobar&quot;, &quot;bar&quot;)\n// &quot;foo&quot;\n</code></pre>\n"
	},
	{
		"name": "substring after",
		"type": "function",
		"params": [{ "name": "string" }, { "name": "match" }],
		"info": "<p>Returns a substring of the given value that contains all characters after <code>match</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">substring after(string: string, match: string): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">substring after(&quot;foobar&quot;, &quot;ob&quot;)\n// &quot;ar&quot;\n</code></pre>\n"
	},
	{
		"name": "contains",
		"type": "function",
		"params": [{ "name": "string" }, { "name": "match" }],
		"info": "<p>Returns <code>true</code> if the given value contains the substring <code>match</code>. Otherwise, returns <code>false</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">contains(string: string, match: string): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">contains(&quot;foobar&quot;, &quot;of&quot;)\n// false\n</code></pre>\n"
	},
	{
		"name": "starts with",
		"type": "function",
		"params": [{ "name": "string" }, { "name": "match" }],
		"info": "<p>Returns <code>true</code> if the given value starts with the substring <code>match</code>. Otherwise, returns <code>false</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">starts with(string: string, match: string): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">starts with(&quot;foobar&quot;, &quot;fo&quot;)\n// true\n</code></pre>\n"
	},
	{
		"name": "ends with",
		"type": "function",
		"params": [{ "name": "string" }, { "name": "match" }],
		"info": "<p>Returns <code>true</code> if the given value ends with the substring <code>match</code>. Otherwise, returns <code>false</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">ends with(string: string, match: string): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">ends with(&quot;foobar&quot;, &quot;r&quot;)\n// true\n</code></pre>\n"
	},
	{
		"name": "matches",
		"type": "function",
		"params": [{ "name": "input" }, { "name": "pattern" }],
		"info": "<p>Returns <code>true</code> if the given value matches the <code>pattern</code>. Otherwise, returns <code>false</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">matches(input: string, pattern: string): boolean\n</code></pre>\n<p>The <code>pattern</code> is a string that contains a regular expression.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">matches(&quot;foobar&quot;, &quot;^fo*bar&quot;)\n// true\n</code></pre>\n"
	},
	{
		"name": "matches",
		"type": "function",
		"params": [
			{ "name": "input" },
			{ "name": "pattern" },
			{ "name": "flags" }
		],
		"info": "<p>Returns <code>true</code> if the given value matches the <code>pattern</code>. Otherwise, returns <code>false</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">matches(input: string, pattern: string, flags: string): boolean\n</code></pre>\n<p>The <code>pattern</code> is a string that contains a regular expression.</p>\n<p>The <code>flags</code> can contain one or more of the following characters:</p>\n<ul>\n<li><code>s</code> (dot-all)</li>\n<li><code>m</code> (multi-line)</li>\n<li><code>i</code> (case insensitive)</li>\n<li><code>x</code> (comments)</li>\n</ul>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">matches(&quot;FooBar&quot;, &quot;foo&quot;, &quot;i&quot;)\n// true\n</code></pre>\n"
	},
	{
		"name": "replace",
		"type": "function",
		"params": [
			{ "name": "input" },
			{ "name": "pattern" },
			{ "name": "replacement" }
		],
		"info": "<p>Returns the resulting string after replacing all occurrences of <code>pattern</code> with <code>replacement</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">replace(input: string, pattern: string, replacement: string): string\n</code></pre>\n<p>The <code>pattern</code> is a string that contains a regular expression.</p>\n<p>The <code>replacement</code> can access the match groups by using <code>$</code> and the number of the group, for example,\n<code>$1</code> to access the first group.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">replace(&quot;abcd&quot;, &quot;(ab)|(a)&quot;, &quot;[1=$1][2=$2]&quot;)\n// &quot;[1=ab][2=]cd&quot;\n\nreplace(&quot;0123456789&quot;, &quot;(\\d{3})(\\d{3})(\\d{4})&quot;, &quot;($1) $2-$3&quot;)\n// &quot;(012) 345-6789&quot;\n</code></pre>\n"
	},
	{
		"name": "replace",
		"type": "function",
		"params": [
			{ "name": "input" },
			{ "name": "pattern" },
			{ "name": "replacement" },
			{ "name": "flags" }
		],
		"info": "<p>Returns the resulting string after replacing all occurrences of <code>pattern</code> with <code>replacement</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">replace(input: string, pattern: string, replacement: string, flags: string): string\n</code></pre>\n<p>The <code>pattern</code> is a string that contains a regular expression.</p>\n<p>The <code>replacement</code> can access the match groups by using <code>$</code> and the number of the group, for example,\n<code>$1</code> to access the first group.</p>\n<p>The <code>flags</code> can contain one or more of the following characters:</p>\n<ul>\n<li><code>s</code> (dot-all)</li>\n<li><code>m</code> (multi-line)</li>\n<li><code>i</code> (case insensitive)</li>\n<li><code>x</code> (comments)</li>\n</ul>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">replace(&quot;How do you feel?&quot;, &quot;Feel&quot;, &quot;FEEL&quot;, &quot;i&quot;)\n// &quot;How do you FEEL?&quot;\n</code></pre>\n"
	},
	{
		"name": "split",
		"type": "function",
		"params": [{ "name": "string" }, { "name": "delimiter" }],
		"info": "<p>Splits the given value into a list of substrings, breaking at each occurrence of the <code>delimiter</code> pattern.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">split(string: string, delimiter: string): list&lt;string&gt;\n</code></pre>\n<p>The <code>delimiter</code> is a string that contains a regular expression.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">split(&quot;John Doe&quot;, &quot;\\s&quot; )\n// [&quot;John&quot;, &quot;Doe&quot;]\n\nsplit(&quot;a;b;c;;&quot;, &quot;;&quot;)\n// [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;&quot;, &quot;&quot;]\n</code></pre>\n"
	},
	{
		"name": "extract",
		"type": "function",
		"params": [{ "name": "string" }, { "name": "pattern" }],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Returns all matches of the pattern in the given string. Returns an empty list if the pattern doesn&#39;t\nmatch.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">extract(string: string, pattern: string): list&lt;string&gt;\n</code></pre>\n<p>The <code>pattern</code> is a string that contains a regular expression.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">extract(&quot;references are 1234, 1256, 1378&quot;, &quot;12[0-9]*&quot;)\n// [&quot;1234&quot;,&quot;1256&quot;]\n</code></pre>\n"
	},
	{
		"name": "trim",
		"type": "function",
		"params": [{ "name": "string" }],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Returns the given string without leading and trailing spaces.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">trim(string: string): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">trim(&quot;  hello world  &quot;)\n// &quot;hello world&quot;\n\ntrim(&quot;hello   world &quot;)\n// &quot;hello   world&quot;\n</code></pre>\n"
	},
	{
		"name": "uuid",
		"type": "function",
		"params": [],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Returns a UUID (Universally Unique Identifier) with 36 characters.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">uuid(): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">uuid()\n// &quot;7793aab1-d761-4d38-916b-b7270e309894&quot;\n</code></pre>\n"
	},
	{
		"name": "to base64",
		"type": "function",
		"params": [{ "name": "value" }],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Returns the given string encoded in Base64 format.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">to base64(value: string): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">to base64(&quot;FEEL&quot;)\n// &quot;RkVFTA==&quot;\n</code></pre>\n"
	},
	{
		"name": "is blank",
		"type": "function",
		"params": [{ "name": "string" }],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Returns <code>true</code> if the given string is blank (empty or contains only whitespaces).</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">is blank(string: string): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">is blank(&quot;&quot;)\n// true\n\nis blank(&quot; &quot;)\n// true\n\nis blank(&quot;hello world&quot;)\n// false\n</code></pre>\n"
	},
	{
		"name": "now",
		"type": "function",
		"params": [],
		"info": "<p>Returns the current date and time including the timezone.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">now(): date and time\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">now()\n// date and time(&quot;2020-07-31T14:27:30@Europe/Berlin&quot;)\n</code></pre>\n"
	},
	{
		"name": "today",
		"type": "function",
		"params": [],
		"info": "<p>Returns the current date.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">today(): date\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">today()\n// date(&quot;2020-07-31&quot;)\n</code></pre>\n"
	},
	{
		"name": "day of week",
		"type": "function",
		"params": [{ "name": "date" }],
		"info": "<p>Returns the day of the week according to the Gregorian calendar. Note that it always returns the English name of the day.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">day of week(date: date): string\n</code></pre>\n<pre><code class=\"language-feel\">day of week(date: date and time): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">day of week(date(&quot;2019-09-17&quot;))\n// &quot;Tuesday&quot;\n\nday of week(date and time(&quot;2019-09-17T12:00:00&quot;))\n// &quot;Tuesday&quot;\n</code></pre>\n"
	},
	{
		"name": "day of year",
		"type": "function",
		"params": [{ "name": "date" }],
		"info": "<p>Returns the Gregorian number of the day within the year.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">day of year(date: date): number\n</code></pre>\n<pre><code class=\"language-feel\">day of year(date: date and time): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">day of year(date(&quot;2019-09-17&quot;))\n// 260\n\nday of year(date and time(&quot;2019-09-17T12:00:00&quot;))\n// 260\n</code></pre>\n"
	},
	{
		"name": "week of year",
		"type": "function",
		"params": [{ "name": "date" }],
		"info": "<p>Returns the Gregorian number of the week within the year, according to ISO 8601.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">week of year(date: date): number\n</code></pre>\n<pre><code class=\"language-feel\">week of year(date: date and time): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">week of year(date(&quot;2019-09-17&quot;))\n// 38\n\nweek of year(date and time(&quot;2019-09-17T12:00:00&quot;))\n// 38\n</code></pre>\n"
	},
	{
		"name": "month of year",
		"type": "function",
		"params": [{ "name": "date" }],
		"info": "<p>Returns the month of the year according to the Gregorian calendar. Note that it always returns the English name of the month.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">month of year(date: date): string\n</code></pre>\n<pre><code class=\"language-feel\">month of year(date: date and time): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">month of year(date(&quot;2019-09-17&quot;))\n// &quot;September&quot;\n\nmonth of year(date and time(&quot;2019-09-17T12:00:00&quot;))\n// &quot;September&quot;\n</code></pre>\n"
	},
	{
		"name": "abs",
		"type": "function",
		"params": [{ "name": "n" }],
		"info": "<p>Returns the absolute value of a given duration.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">abs(n: days and time duration): days and time duration\n</code></pre>\n<pre><code class=\"language-feel\">abs(n: years and months duration): years and months duration\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">abs(duration(&quot;-PT5H&quot;))\n// &quot;duration(&quot;PT5H&quot;)&quot;\n\nabs(duration(&quot;PT5H&quot;))\n// &quot;duration(&quot;PT5H&quot;)&quot;\n\nabs(duration(&quot;-P2M&quot;))\n// duration(&quot;P2M&quot;)\n</code></pre>\n"
	},
	{
		"name": "last day of month",
		"type": "function",
		"params": [{ "name": "date" }],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Takes the month of the given date or date-time value and returns the last day of this month.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">last day of month(date: date): date\n</code></pre>\n<pre><code class=\"language-feel\">last day of month(date: date and time): date\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">last day of month(date(&quot;2022-10-01&quot;))\n// date(&quot;2022-10-31&quot;))\n\nlast day of month(date and time(&quot;2022-10-16T12:00:00&quot;))\n// date(&quot;2022-10-31&quot;))\n</code></pre>\n"
	}
];
//#endregion
//#region node_modules/@bpmn-io/feel-editor/dist/index.es.js
var linter = [linter$1(cmFeelLinter())];
var theme = [
	EditorView.theme({
		"& .cm-content": { padding: "0px" },
		"& .cm-line": { padding: "0px" },
		"&.cm-editor.cm-focused": { outline: "none" },
		"& .cm-completionInfo": {
			whiteSpace: "pre-wrap",
			overflow: "hidden",
			textOverflow: "ellipsis"
		},
		"&.cm-editor": { height: "100%" },
		"& .cm-completionInfo > *": { whiteSpace: "normal" },
		"& .cm-completionInfo ul": {
			margin: 0,
			paddingLeft: "15px"
		},
		"& .cm-completionInfo pre": {
			marginBottom: 0,
			whiteSpace: "pre-wrap"
		},
		"& .cm-completionInfo p": { marginTop: 0 },
		"& .cm-completionInfo p:not(:last-of-type)": { marginBottom: 0 }
	}),
	EditorView.baseTheme({
		"& .variableName": { color: "#10f" },
		"& .number": { color: "#164" },
		"& .string": { color: "#a11" },
		"& .bool": { color: "#219" },
		"& .function": {
			color: "#aa3731",
			fontWeight: "bold"
		},
		"& .control": { color: "#708" }
	}),
	syntaxHighlighting(HighlightStyle.define([
		{
			tag: tags.variableName,
			class: "variableName"
		},
		{
			tag: tags.name,
			class: "variableName"
		},
		{
			tag: tags.number,
			class: "number"
		},
		{
			tag: tags.string,
			class: "string"
		},
		{
			tag: tags.bool,
			class: "bool"
		},
		{
			tag: tags.function(tags.variableName),
			class: "function"
		},
		{
			tag: tags.function(tags.special(tags.variableName)),
			class: "function"
		},
		{
			tag: tags.controlKeyword,
			class: "control"
		},
		{
			tag: tags.operatorKeyword,
			class: "control"
		}
	]))
];
function _isEmpty(node) {
	return node && node.from === node.to;
}
/**
* @param {any} node
* @param {number} pos
*
* @return {boolean}
*/
function isEmpty(node, pos) {
	const nextNode = node.nextSibling;
	return _isEmpty(node) || nextNode && nextNode.from === pos && _isEmpty(nextNode);
}
function isVariableName(node) {
	return node && node.parent && node.parent.name === "VariableName";
}
function isPathExpression(node) {
	if (!node) return false;
	if (node.name === "PathExpression") return true;
	return isPathExpression(node.parent);
}
/**
* @typedef { import('../core').Variable } Variable
* @typedef { import('@codemirror/autocomplete').CompletionSource } CompletionSource
*/
/**
* @param { {
*   variables?: Variable[],
* } } options
*
* @return { CompletionSource }
*/
function pathExpressionCompletion({ variables }) {
	return (context) => {
		const nodeBefore = syntaxTree(context.state).resolve(context.pos, -1);
		if (!isPathExpression(nodeBefore)) return;
		const expression = findPathExpression(nodeBefore);
		const from = nodeBefore === expression ? context.pos : nodeBefore.from;
		const path = getPath(expression, context);
		let options = variables;
		for (var i = 0; i < path.length - 1; i++) {
			var childVar = options.find((val) => val.name === path[i].name);
			if (!childVar) return null;
			if (childVar.isList !== "optional" && !!childVar.isList !== path[i].isList) return;
			options = childVar.entries;
		}
		if (!options) return;
		options = options.map((v) => ({
			label: v.name,
			type: "variable",
			info: v.info,
			detail: v.detail
		}));
		return {
			from,
			options
		};
	};
}
function findPathExpression(node) {
	while (node) {
		if (node.name === "PathExpression") return node;
		node = node.parent;
	}
}
function getPath(node, context) {
	let path = [];
	for (let child = node.firstChild; child; child = child.nextSibling) if (child.name === "PathExpression") path.push(...getPath(child, context));
	else if (child.name === "FilterExpression") path.push(...getFilter(child, context));
	else path.push({
		name: getNodeContent(child, context),
		isList: false
	});
	return path;
}
function getFilter(node, context) {
	const list = node.firstChild;
	if (list.name === "PathExpression") {
		const path = getPath(list, context);
		const last = path[path.length - 1];
		last.isList = true;
		return path;
	}
	return [{
		name: getNodeContent(list, context),
		isList: true
	}];
}
function getNodeContent(node, context) {
	return context.state.sliceDoc(node.from, node.to);
}
/**
* @typedef { import('../core').Variable } Variable
* @typedef { import('@codemirror/autocomplete').CompletionSource } CompletionSource
*/
/**
* @param { {
*   variables?: Variable[],
*   builtins?: Variable[]
* } } options
*
* @return { CompletionSource }
*/
function variableCompletion({ variables = [], builtins = [] }) {
	const options = getVariableSuggestions(variables, builtins);
	if (!options.length) return (context) => null;
	return (context) => {
		const { pos, state } = context;
		const nodeBefore = syntaxTree(state).resolve(pos, -1);
		if (isEmpty(nodeBefore, pos)) return context.explicit ? {
			from: pos,
			options
		} : null;
		if (!isVariableName(nodeBefore) || isPathExpression(nodeBefore)) return null;
		return {
			from: nodeBefore.from,
			options
		};
	};
}
/**
* @param { Variable[] } variables
* @param { Variable[] } builtins
*
* @returns {import('@codemirror/autocomplete').Completion[]}
*/
function getVariableSuggestions(variables, builtins) {
	return [].concat(variables.map((v) => createVariableSuggestion(v)), builtins.map((b) => createVariableSuggestion(b)));
}
/**
* @param {import('..').Variable} variable
* @param {number} boost

* @returns {import('@codemirror/autocomplete').Completion}
*/
function createVariableSuggestion(variable, boost) {
	if (variable.type === "function") return createFunctionVariable(variable, boost);
	return {
		label: variable.name,
		type: "variable",
		info: variable.info,
		detail: variable.detail,
		boost
	};
}
/**
* @param {import('..').Variable} variable
* @param {number} boost
*
* @returns {import('@codemirror/autocomplete').Completion}
*/
function createFunctionVariable(variable, boost) {
	const { name, info, detail, params = [] } = variable;
	const paramsWithNames = params.map(({ name, type }, index) => ({
		name: name || `param ${index + 1}`,
		type
	}));
	return snippetCompletion$1(`${name}(${paramsWithNames.map((p) => "${" + p.name + "}").join(", ")})`, {
		label: `${name}(${paramsWithNames.map(({ name, type }) => type ? `${name}: ${type}` : name).join(", ")})`,
		type: "function",
		info,
		detail,
		boost
	});
}
/**
* @typedef { import('../core').Variable } Variable
* @typedef { import('@codemirror/autocomplete').CompletionSource } CompletionSource
*/
/**
* @param { {
*   variables?: Variable[],
*   builtins?: Variable[]
* } } options
*
* @return { CompletionSource[] }
*/
function completions({ variables = [], builtins = [] }) {
	return [
		pathExpressionCompletion({ variables }),
		variableCompletion({
			variables,
			builtins
		}),
		snippets,
		...keywordCompletions
	];
}
/**
* @typedef { 'expression' | 'unaryTests' } Dialect
*/
/**
* @typedef { 'camunda' | undefined } ParserDialect
*/
/**
* @param { {
*   dialect?: Dialect,
*   parserDialect?: ParserDialect,
*   context?: Record<string, any>,
*   completions?: import('@codemirror/autocomplete').CompletionSource[]
* } } options
*
* @return { import('@codemirror/language').LanguageSupport }
*/
function language(options) {
	return feel(options);
}
/**
* @param { import('../core').Variable[] } variables
*
* @return {Record<string, any>}
*/
function createContext(variables) {
	return variables.slice().reverse().reduce((context, builtin) => {
		context[builtin.name] = () => {};
		return context;
	}, {});
}
/**
* @typedef { import('../language').Dialect } Dialect
* @typedef { import('../language').ParserDialect } ParserDialect
* @typedef { import('..').Variable } Variable
*/
/**
* @type {Facet<Variable[]>}
*/
var builtinsFacet = Facet.define();
/**
* @type {Facet<Variable[]>}
*/
var variablesFacet = Facet.define();
/**
* @type {Facet<Dialect>}
*/
var dialectFacet = Facet.define();
/**
* @type {Facet<ParserDialect>}
*/
var parserDialectFacet = Facet.define();
/**
* @typedef {object} Variable
* @property {string} name name or key of the variable
* @property {string} [info] short information about the variable, e.g. type
* @property {string} [detail] longer description of the variable content
* @property {boolean} [isList] whether the variable is a list
* @property {Array<Variable>} [schema] array of child variables if the variable is a context or list
* @property {'function'|'variable'} [type] type of the variable
* @property {Array<{name: string, type: string}>} [params] function parameters
*/
/**
* @typedef { {
*   dialect?: import('../language').Dialect,
*   parserDialect?: import('../language').ParserDialect,
*   variables?: Variable[],
*   builtins?: Variable[]
* } } CoreConfig
*
* @typedef { import('@codemirror/autocomplete').CompletionSource } CompletionSource
* @typedef { import('@codemirror/state').Extension } Extension
*/
/**
* @param { CoreConfig & { completions?: CompletionSource[] } } config
*
* @return { Extension  }
*/
function configure({ dialect = "expression", parserDialect, variables = [], builtins = [], completions: completions$1 = completions({
	builtins,
	variables
}) }) {
	const context = createContext([...variables, ...builtins]);
	return [
		dialectFacet.of(dialect),
		builtinsFacet.of(builtins),
		variablesFacet.of(variables),
		parserDialectFacet.of(parserDialect),
		language({
			dialect,
			parserDialect,
			context,
			completions: completions$1
		})
	];
}
/**
* @param {import('@codemirror/state').EditorState } state
*
* @return { CoreConfig }
*/
function get(state) {
	return {
		builtins: state.facet(builtinsFacet)[0],
		variables: state.facet(variablesFacet)[0],
		dialect: state.facet(dialectFacet)[0],
		parserDialect: state.facet(parserDialectFacet)[0]
	};
}
var domifiedBuiltins = camundaBuiltins.map((builtin) => ({
	...builtin,
	info: () => domify$1(builtin.info)
}));
/**
* @typedef { import('./core').Variable } Variable
*/
/**
* @typedef { import('./language').Dialect } Dialect
* @typedef { import('./language').ParserDialect } ParserDialect
*/
var coreConf = new Compartment();
var placeholderConf = new Compartment();
/**
* Creates a FEEL editor in the supplied container
*
* @param {Object} config
* @param {DOMNode} config.container
* @param {Extension[]} [config.extensions]
* @param {Dialect} [config.dialect='expression']
* @param {ParserDialect} [config.parserDialect]
* @param {DOMNode|String} [config.tooltipContainer]
* @param {Function} [config.onChange]
* @param {Function} [config.onKeyDown]
* @param {Function} [config.onLint]
* @param {Boolean} [config.readOnly]
* @param {String} [config.value]
* @param {Variable[]} [config.variables]
* @param {Variable[]} [config.builtins]
*/
function FeelEditor$1({ extensions: editorExtensions = [], dialect = "expression", parserDialect, container, contentAttributes = {}, tooltipContainer, onChange = () => {}, onKeyDown = () => {}, onLint = () => {}, placeholder: placeholder$1 = "", readOnly = false, value = "", builtins = domifiedBuiltins, variables = [] }) {
	const changeHandler = EditorView.updateListener.of((update) => {
		if (update.docChanged) onChange(update.state.doc.toString());
	});
	const lintHandler = EditorView.updateListener.of((update) => {
		const diagnosticEffects = update.transactions.flatMap((t) => t.effects).filter((effect) => effect.is(setDiagnosticsEffect));
		if (!diagnosticEffects.length) return;
		onLint(diagnosticEffects.flatMap((effect) => effect.value));
	});
	const keyHandler = EditorView.domEventHandlers({ keydown: onKeyDown });
	if (typeof tooltipContainer === "string") tooltipContainer = document.querySelector(tooltipContainer);
	const tooltipLayout = tooltipContainer ? tooltips({ tooltipSpace: function() {
		return tooltipContainer.getBoundingClientRect();
	} }) : [];
	const extensions = [
		autocompletion(),
		coreConf.of(configure({
			dialect,
			builtins,
			variables,
			parserDialect
		})),
		bracketMatching(),
		indentOnInput(),
		closeBrackets(),
		EditorView.contentAttributes.of(contentAttributes),
		changeHandler,
		keyHandler,
		keymap.of([...defaultKeymap]),
		linter,
		lintHandler,
		tooltipLayout,
		placeholderConf.of(placeholder(placeholder$1)),
		theme,
		...editorExtensions
	];
	if (readOnly) extensions.push(EditorView.editable.of(false));
	this._cmEditor = new EditorView({
		state: EditorState.create({
			doc: value,
			extensions
		}),
		parent: container
	});
	return this;
}
/**
* Replaces the content of the Editor
*
* @param {String} value
*/
FeelEditor$1.prototype.setValue = function(value) {
	this._cmEditor.dispatch({ changes: {
		from: 0,
		to: this._cmEditor.state.doc.length,
		insert: value
	} });
};
/**
* Sets the focus in the editor.
*/
FeelEditor$1.prototype.focus = function(position) {
	const cmEditor = this._cmEditor;
	cmEditor.contentDOM.focus();
	cmEditor.focus();
	if (typeof position === "number") {
		const end = cmEditor.state.doc.length;
		cmEditor.dispatch({ selection: { anchor: position <= end ? position : end } });
	}
};
/**
* Returns the current selection ranges. If no text is selected, a single
* range with the start and end index at the cursor position will be returned.
*
* @returns {Object} selection
* @returns {Array} selection.ranges
*/
FeelEditor$1.prototype.getSelection = function() {
	return this._cmEditor.state.selection;
};
/**
* Set variables to be used for autocompletion.
*
* @param {Variable[]} variables
*/
FeelEditor$1.prototype.setVariables = function(variables) {
	const config = get(this._cmEditor.state);
	this._cmEditor.dispatch({ effects: [coreConf.reconfigure(configure({
		...config,
		variables
	}))] });
};
/**
* Update placeholder text.
*
* @param {string} placeholder
*/
FeelEditor$1.prototype.setPlaceholder = function(placeholder$1) {
	this._cmEditor.dispatch({ effects: placeholderConf.reconfigure(placeholder(placeholder$1)) });
};
//#endregion
//#region node_modules/focus-trap/dist/focus-trap.esm.js
/*!
* focus-trap 7.6.6
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function _arrayLikeToArray(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
function _arrayWithoutHoles(r) {
	if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _defineProperty(e, r, t) {
	return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: true,
		configurable: true,
		writable: true
	}) : e[r] = t, e;
}
function _iterableToArray(r) {
	if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _nonIterableSpread() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
function _objectSpread2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), true).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _toConsumableArray(r) {
	return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r);
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
	}
}
var activeFocusTraps = {
	activateTrap: function activateTrap(trapStack, trap) {
		if (trapStack.length > 0) {
			var activeTrap = trapStack[trapStack.length - 1];
			if (activeTrap !== trap) activeTrap._setPausedState(true);
		}
		var trapIndex = trapStack.indexOf(trap);
		if (trapIndex === -1) trapStack.push(trap);
		else {
			trapStack.splice(trapIndex, 1);
			trapStack.push(trap);
		}
	},
	deactivateTrap: function deactivateTrap(trapStack, trap) {
		var trapIndex = trapStack.indexOf(trap);
		if (trapIndex !== -1) trapStack.splice(trapIndex, 1);
		if (trapStack.length > 0 && !trapStack[trapStack.length - 1]._isManuallyPaused()) trapStack[trapStack.length - 1]._setPausedState(false);
	}
};
var isSelectableInput = function isSelectableInput(node) {
	return node.tagName && node.tagName.toLowerCase() === "input" && typeof node.select === "function";
};
var isEscapeEvent = function isEscapeEvent(e) {
	return (e === null || e === void 0 ? void 0 : e.key) === "Escape" || (e === null || e === void 0 ? void 0 : e.key) === "Esc" || (e === null || e === void 0 ? void 0 : e.keyCode) === 27;
};
var isTabEvent = function isTabEvent(e) {
	return (e === null || e === void 0 ? void 0 : e.key) === "Tab" || (e === null || e === void 0 ? void 0 : e.keyCode) === 9;
};
var isKeyForward = function isKeyForward(e) {
	return isTabEvent(e) && !e.shiftKey;
};
var isKeyBackward = function isKeyBackward(e) {
	return isTabEvent(e) && e.shiftKey;
};
var delay = function delay(fn) {
	return setTimeout(fn, 0);
};
/**
* Get an option's value when it could be a plain value, or a handler that provides
*  the value.
* @param {*} value Option's value to check.
* @param {...*} [params] Any parameters to pass to the handler, if `value` is a function.
* @returns {*} The `value`, or the handler's returned value.
*/
var valueOrHandler = function valueOrHandler(value) {
	for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) params[_key - 1] = arguments[_key];
	return typeof value === "function" ? value.apply(void 0, params) : value;
};
var getActualTarget = function getActualTarget(event) {
	return event.target.shadowRoot && typeof event.composedPath === "function" ? event.composedPath()[0] : event.target;
};
var internalTrapStack = [];
var createFocusTrap = function createFocusTrap(elements, userOptions) {
	var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;
	var trapStack = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.trapStack) || internalTrapStack;
	var config = _objectSpread2({
		returnFocusOnDeactivate: true,
		escapeDeactivates: true,
		delayInitialFocus: true,
		isKeyForward,
		isKeyBackward
	}, userOptions);
	var state = {
		containers: [],
		containerGroups: [],
		tabbableGroups: [],
		nodeFocusedBeforeActivation: null,
		mostRecentlyFocusedNode: null,
		active: false,
		paused: false,
		manuallyPaused: false,
		delayInitialFocusTimer: void 0,
		recentNavEvent: void 0
	};
	var trap;
	/**
	* Gets a configuration option value.
	* @param {Object|undefined} configOverrideOptions If true, and option is defined in this set,
	*  value will be taken from this object. Otherwise, value will be taken from base configuration.
	* @param {string} optionName Name of the option whose value is sought.
	* @param {string|undefined} [configOptionName] Name of option to use __instead of__ `optionName`
	*  IIF `configOverrideOptions` is not defined. Otherwise, `optionName` is used.
	*/
	var getOption = function getOption(configOverrideOptions, optionName, configOptionName) {
		return configOverrideOptions && configOverrideOptions[optionName] !== void 0 ? configOverrideOptions[optionName] : config[configOptionName || optionName];
	};
	/**
	* Finds the index of the container that contains the element.
	* @param {HTMLElement} element
	* @param {Event} [event] If available, and `element` isn't directly found in any container,
	*  the event's composed path is used to see if includes any known trap containers in the
	*  case where the element is inside a Shadow DOM.
	* @returns {number} Index of the container in either `state.containers` or
	*  `state.containerGroups` (the order/length of these lists are the same); -1
	*  if the element isn't found.
	*/
	var findContainerIndex = function findContainerIndex(element, event) {
		var composedPath = typeof (event === null || event === void 0 ? void 0 : event.composedPath) === "function" ? event.composedPath() : void 0;
		return state.containerGroups.findIndex(function(_ref) {
			var container = _ref.container, tabbableNodes = _ref.tabbableNodes;
			return container.contains(element) || (composedPath === null || composedPath === void 0 ? void 0 : composedPath.includes(container)) || tabbableNodes.find(function(node) {
				return node === element;
			});
		});
	};
	/**
	* Gets the node for the given option, which is expected to be an option that
	*  can be either a DOM node, a string that is a selector to get a node, `false`
	*  (if a node is explicitly NOT given), or a function that returns any of these
	*  values.
	* @param {string} optionName
	* @param {Object} options
	* @param {boolean} [options.hasFallback] True if the option could be a selector string
	*  and the option allows for a fallback scenario in the case where the selector is
	*  valid but does not match a node (i.e. the queried node doesn't exist in the DOM).
	* @param {Array} [options.params] Params to pass to the option if it's a function.
	* @returns {undefined | null | false | HTMLElement | SVGElement} Returns
	*  `undefined` if the option is not specified; `null` if the option didn't resolve
	*  to a node but `options.hasFallback=true`, `false` if the option resolved to `false`
	*  (node explicitly not given); otherwise, the resolved DOM node.
	* @throws {Error} If the option is set, not `false`, and is not, or does not
	*  resolve to a node, unless the option is a selector string and `options.hasFallback=true`.
	*/
	var getNodeForOption = function getNodeForOption(optionName) {
		var _ref2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref2$hasFallback = _ref2.hasFallback, hasFallback = _ref2$hasFallback === void 0 ? false : _ref2$hasFallback, _ref2$params = _ref2.params, params = _ref2$params === void 0 ? [] : _ref2$params;
		var optionValue = config[optionName];
		if (typeof optionValue === "function") optionValue = optionValue.apply(void 0, _toConsumableArray(params));
		if (optionValue === true) optionValue = void 0;
		if (!optionValue) {
			if (optionValue === void 0 || optionValue === false) return optionValue;
			throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
		}
		var node = optionValue;
		if (typeof optionValue === "string") {
			try {
				node = doc.querySelector(optionValue);
			} catch (err) {
				throw new Error("`".concat(optionName, "` appears to be an invalid selector; error=\"").concat(err.message, "\""));
			}
			if (!node) {
				if (!hasFallback) throw new Error("`".concat(optionName, "` as selector refers to no known node"));
			}
		}
		return node;
	};
	var getInitialFocusNode = function getInitialFocusNode() {
		var node = getNodeForOption("initialFocus", { hasFallback: true });
		if (node === false) return false;
		if (node === void 0 || node && !isFocusable(node, config.tabbableOptions)) if (findContainerIndex(doc.activeElement) >= 0) node = doc.activeElement;
		else {
			var firstTabbableGroup = state.tabbableGroups[0];
			node = firstTabbableGroup && firstTabbableGroup.firstTabbableNode || getNodeForOption("fallbackFocus");
		}
		else if (node === null) node = getNodeForOption("fallbackFocus");
		if (!node) throw new Error("Your focus-trap needs to have at least one focusable element");
		return node;
	};
	var updateTabbableNodes = function updateTabbableNodes() {
		state.containerGroups = state.containers.map(function(container) {
			var tabbableNodes = tabbable(container, config.tabbableOptions);
			var focusableNodes = focusable(container, config.tabbableOptions);
			var firstTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[0] : void 0;
			var lastTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : void 0;
			var firstDomTabbableNode = focusableNodes.find(function(node) {
				return isTabbable(node);
			});
			var lastDomTabbableNode = focusableNodes.slice().reverse().find(function(node) {
				return isTabbable(node);
			});
			return {
				container,
				tabbableNodes,
				focusableNodes,
				/** True if at least one node with positive `tabindex` was found in this container. */
				posTabIndexesFound: !!tabbableNodes.find(function(node) {
					return getTabIndex(node) > 0;
				}),
				/** First tabbable node in container, __tabindex__ order; `undefined` if none. */
				firstTabbableNode,
				/** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
				lastTabbableNode,
				/** First tabbable node in container, __DOM__ order; `undefined` if none. */
				firstDomTabbableNode,
				/** Last tabbable node in container, __DOM__ order; `undefined` if none. */
				lastDomTabbableNode,
				/**
				* Finds the __tabbable__ node that follows the given node in the specified direction,
				*  in this container, if any.
				* @param {HTMLElement} node
				* @param {boolean} [forward] True if going in forward tab order; false if going
				*  in reverse.
				* @returns {HTMLElement|undefined} The next tabbable node, if any.
				*/
				nextTabbableNode: function nextTabbableNode(node) {
					var forward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
					var nodeIdx = tabbableNodes.indexOf(node);
					if (nodeIdx < 0) {
						if (forward) return focusableNodes.slice(focusableNodes.indexOf(node) + 1).find(function(el) {
							return isTabbable(el);
						});
						return focusableNodes.slice(0, focusableNodes.indexOf(node)).reverse().find(function(el) {
							return isTabbable(el);
						});
					}
					return tabbableNodes[nodeIdx + (forward ? 1 : -1)];
				}
			};
		});
		state.tabbableGroups = state.containerGroups.filter(function(group) {
			return group.tabbableNodes.length > 0;
		});
		if (state.tabbableGroups.length <= 0 && !getNodeForOption("fallbackFocus")) throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
		if (state.containerGroups.find(function(g) {
			return g.posTabIndexesFound;
		}) && state.containerGroups.length > 1) throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
	};
	/**
	* Gets the current activeElement. If it's a web-component and has open shadow-root
	* it will recursively search inside shadow roots for the "true" activeElement.
	*
	* @param {Document | ShadowRoot} el
	*
	* @returns {HTMLElement} The element that currently has the focus
	**/
	var _getActiveElement = function getActiveElement(el) {
		var activeElement = el.activeElement;
		if (!activeElement) return;
		if (activeElement.shadowRoot && activeElement.shadowRoot.activeElement !== null) return _getActiveElement(activeElement.shadowRoot);
		return activeElement;
	};
	var _tryFocus = function tryFocus(node) {
		if (node === false) return;
		if (node === _getActiveElement(document)) return;
		if (!node || !node.focus) {
			_tryFocus(getInitialFocusNode());
			return;
		}
		node.focus({ preventScroll: !!config.preventScroll });
		state.mostRecentlyFocusedNode = node;
		if (isSelectableInput(node)) node.select();
	};
	var getReturnFocusNode = function getReturnFocusNode(previousActiveElement) {
		var node = getNodeForOption("setReturnFocus", { params: [previousActiveElement] });
		return node ? node : node === false ? false : previousActiveElement;
	};
	/**
	* Finds the next node (in either direction) where focus should move according to a
	*  keyboard focus-in event.
	* @param {Object} params
	* @param {Node} [params.target] Known target __from which__ to navigate, if any.
	* @param {KeyboardEvent|FocusEvent} [params.event] Event to use if `target` isn't known (event
	*  will be used to determine the `target`). Ignored if `target` is specified.
	* @param {boolean} [params.isBackward] True if focus should move backward.
	* @returns {Node|undefined} The next node, or `undefined` if a next node couldn't be
	*  determined given the current state of the trap.
	*/
	var findNextNavNode = function findNextNavNode(_ref3) {
		var target = _ref3.target, event = _ref3.event, _ref3$isBackward = _ref3.isBackward, isBackward = _ref3$isBackward === void 0 ? false : _ref3$isBackward;
		target = target || getActualTarget(event);
		updateTabbableNodes();
		var destinationNode = null;
		if (state.tabbableGroups.length > 0) {
			var containerIndex = findContainerIndex(target, event);
			var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : void 0;
			if (containerIndex < 0) if (isBackward) destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
			else destinationNode = state.tabbableGroups[0].firstTabbableNode;
			else if (isBackward) {
				var startOfGroupIndex = state.tabbableGroups.findIndex(function(_ref4) {
					var firstTabbableNode = _ref4.firstTabbableNode;
					return target === firstTabbableNode;
				});
				if (startOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) startOfGroupIndex = containerIndex;
				if (startOfGroupIndex >= 0) {
					var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
					var destinationGroup = state.tabbableGroups[destinationGroupIndex];
					destinationNode = getTabIndex(target) >= 0 ? destinationGroup.lastTabbableNode : destinationGroup.lastDomTabbableNode;
				} else if (!isTabEvent(event)) destinationNode = containerGroup.nextTabbableNode(target, false);
			} else {
				var lastOfGroupIndex = state.tabbableGroups.findIndex(function(_ref5) {
					var lastTabbableNode = _ref5.lastTabbableNode;
					return target === lastTabbableNode;
				});
				if (lastOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) lastOfGroupIndex = containerIndex;
				if (lastOfGroupIndex >= 0) {
					var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;
					var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
					destinationNode = getTabIndex(target) >= 0 ? _destinationGroup.firstTabbableNode : _destinationGroup.firstDomTabbableNode;
				} else if (!isTabEvent(event)) destinationNode = containerGroup.nextTabbableNode(target);
			}
		} else destinationNode = getNodeForOption("fallbackFocus");
		return destinationNode;
	};
	var checkPointerDown = function checkPointerDown(e) {
		if (findContainerIndex(getActualTarget(e), e) >= 0) return;
		if (valueOrHandler(config.clickOutsideDeactivates, e)) {
			trap.deactivate({ returnFocus: config.returnFocusOnDeactivate });
			return;
		}
		if (valueOrHandler(config.allowOutsideClick, e)) return;
		e.preventDefault();
	};
	var checkFocusIn = function checkFocusIn(event) {
		var target = getActualTarget(event);
		var targetContained = findContainerIndex(target, event) >= 0;
		if (targetContained || target instanceof Document) {
			if (targetContained) state.mostRecentlyFocusedNode = target;
		} else {
			event.stopImmediatePropagation();
			var nextNode;
			var navAcrossContainers = true;
			if (state.mostRecentlyFocusedNode) {
				if (getTabIndex(state.mostRecentlyFocusedNode) > 0) {
					var mruContainerIdx = findContainerIndex(state.mostRecentlyFocusedNode);
					var tabbableNodes = state.containerGroups[mruContainerIdx].tabbableNodes;
					if (tabbableNodes.length > 0) {
						var mruTabIdx = tabbableNodes.findIndex(function(node) {
							return node === state.mostRecentlyFocusedNode;
						});
						if (mruTabIdx >= 0) {
							if (config.isKeyForward(state.recentNavEvent)) {
								if (mruTabIdx + 1 < tabbableNodes.length) {
									nextNode = tabbableNodes[mruTabIdx + 1];
									navAcrossContainers = false;
								}
							} else if (mruTabIdx - 1 >= 0) {
								nextNode = tabbableNodes[mruTabIdx - 1];
								navAcrossContainers = false;
							}
						}
					}
				} else if (!state.containerGroups.some(function(g) {
					return g.tabbableNodes.some(function(n) {
						return getTabIndex(n) > 0;
					});
				})) navAcrossContainers = false;
			} else navAcrossContainers = false;
			if (navAcrossContainers) nextNode = findNextNavNode({
				target: state.mostRecentlyFocusedNode,
				isBackward: config.isKeyBackward(state.recentNavEvent)
			});
			if (nextNode) _tryFocus(nextNode);
			else _tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
		}
		state.recentNavEvent = void 0;
	};
	var checkKeyNav = function checkKeyNav(event) {
		var isBackward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
		state.recentNavEvent = event;
		var destinationNode = findNextNavNode({
			event,
			isBackward
		});
		if (destinationNode) {
			if (isTabEvent(event)) event.preventDefault();
			_tryFocus(destinationNode);
		}
	};
	var checkTabKey = function checkTabKey(event) {
		if (config.isKeyForward(event) || config.isKeyBackward(event)) checkKeyNav(event, config.isKeyBackward(event));
	};
	var checkEscapeKey = function checkEscapeKey(event) {
		if (isEscapeEvent(event) && valueOrHandler(config.escapeDeactivates, event) !== false) {
			event.preventDefault();
			trap.deactivate();
		}
	};
	var checkClick = function checkClick(e) {
		if (findContainerIndex(getActualTarget(e), e) >= 0) return;
		if (valueOrHandler(config.clickOutsideDeactivates, e)) return;
		if (valueOrHandler(config.allowOutsideClick, e)) return;
		e.preventDefault();
		e.stopImmediatePropagation();
	};
	var addListeners = function addListeners() {
		if (!state.active) return;
		activeFocusTraps.activateTrap(trapStack, trap);
		state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function() {
			_tryFocus(getInitialFocusNode());
		}) : _tryFocus(getInitialFocusNode());
		doc.addEventListener("focusin", checkFocusIn, true);
		doc.addEventListener("mousedown", checkPointerDown, {
			capture: true,
			passive: false
		});
		doc.addEventListener("touchstart", checkPointerDown, {
			capture: true,
			passive: false
		});
		doc.addEventListener("click", checkClick, {
			capture: true,
			passive: false
		});
		doc.addEventListener("keydown", checkTabKey, {
			capture: true,
			passive: false
		});
		doc.addEventListener("keydown", checkEscapeKey);
		return trap;
	};
	var removeListeners = function removeListeners() {
		if (!state.active) return;
		doc.removeEventListener("focusin", checkFocusIn, true);
		doc.removeEventListener("mousedown", checkPointerDown, true);
		doc.removeEventListener("touchstart", checkPointerDown, true);
		doc.removeEventListener("click", checkClick, true);
		doc.removeEventListener("keydown", checkTabKey, true);
		doc.removeEventListener("keydown", checkEscapeKey);
		return trap;
	};
	var mutationObserver = typeof window !== "undefined" && "MutationObserver" in window ? new MutationObserver(function checkDomRemoval(mutations) {
		if (mutations.some(function(mutation) {
			return Array.from(mutation.removedNodes).some(function(node) {
				return node === state.mostRecentlyFocusedNode;
			});
		})) _tryFocus(getInitialFocusNode());
	}) : void 0;
	var updateObservedNodes = function updateObservedNodes() {
		if (!mutationObserver) return;
		mutationObserver.disconnect();
		if (state.active && !state.paused) state.containers.map(function(container) {
			mutationObserver.observe(container, {
				subtree: true,
				childList: true
			});
		});
	};
	trap = {
		get active() {
			return state.active;
		},
		get paused() {
			return state.paused;
		},
		activate: function activate(activateOptions) {
			if (state.active) return this;
			var onActivate = getOption(activateOptions, "onActivate");
			var onPostActivate = getOption(activateOptions, "onPostActivate");
			var checkCanFocusTrap = getOption(activateOptions, "checkCanFocusTrap");
			if (!checkCanFocusTrap) updateTabbableNodes();
			state.active = true;
			state.paused = false;
			state.nodeFocusedBeforeActivation = _getActiveElement(doc);
			onActivate === null || onActivate === void 0 || onActivate();
			var finishActivation = function finishActivation() {
				if (checkCanFocusTrap) updateTabbableNodes();
				addListeners();
				updateObservedNodes();
				onPostActivate === null || onPostActivate === void 0 || onPostActivate();
			};
			if (checkCanFocusTrap) {
				checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
				return this;
			}
			finishActivation();
			return this;
		},
		deactivate: function deactivate(deactivateOptions) {
			if (!state.active) return this;
			var options = _objectSpread2({
				onDeactivate: config.onDeactivate,
				onPostDeactivate: config.onPostDeactivate,
				checkCanReturnFocus: config.checkCanReturnFocus
			}, deactivateOptions);
			clearTimeout(state.delayInitialFocusTimer);
			state.delayInitialFocusTimer = void 0;
			removeListeners();
			state.active = false;
			state.paused = false;
			updateObservedNodes();
			activeFocusTraps.deactivateTrap(trapStack, trap);
			var onDeactivate = getOption(options, "onDeactivate");
			var onPostDeactivate = getOption(options, "onPostDeactivate");
			var checkCanReturnFocus = getOption(options, "checkCanReturnFocus");
			var returnFocus = getOption(options, "returnFocus", "returnFocusOnDeactivate");
			onDeactivate === null || onDeactivate === void 0 || onDeactivate();
			var finishDeactivation = function finishDeactivation() {
				delay(function() {
					if (returnFocus) _tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
					onPostDeactivate === null || onPostDeactivate === void 0 || onPostDeactivate();
				});
			};
			if (returnFocus && checkCanReturnFocus) {
				checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
				return this;
			}
			finishDeactivation();
			return this;
		},
		pause: function pause(pauseOptions) {
			if (!state.active) return this;
			state.manuallyPaused = true;
			return this._setPausedState(true, pauseOptions);
		},
		unpause: function unpause(unpauseOptions) {
			if (!state.active) return this;
			state.manuallyPaused = false;
			if (trapStack[trapStack.length - 1] !== this) return this;
			return this._setPausedState(false, unpauseOptions);
		},
		updateContainerElements: function updateContainerElements(containerElements) {
			state.containers = [].concat(containerElements).filter(Boolean).map(function(element) {
				return typeof element === "string" ? doc.querySelector(element) : element;
			});
			if (state.active) updateTabbableNodes();
			updateObservedNodes();
			return this;
		}
	};
	Object.defineProperties(trap, {
		_isManuallyPaused: { value: function value() {
			return state.manuallyPaused;
		} },
		_setPausedState: { value: function value(paused, options) {
			if (state.paused === paused) return this;
			state.paused = paused;
			if (paused) {
				var onPause = getOption(options, "onPause");
				var onPostPause = getOption(options, "onPostPause");
				onPause === null || onPause === void 0 || onPause();
				removeListeners();
				updateObservedNodes();
				onPostPause === null || onPostPause === void 0 || onPostPause();
			} else {
				var onUnpause = getOption(options, "onUnpause");
				var onPostUnpause = getOption(options, "onPostUnpause");
				onUnpause === null || onUnpause === void 0 || onUnpause();
				updateTabbableNodes();
				addListeners();
				updateObservedNodes();
				onPostUnpause === null || onPostUnpause === void 0 || onPostUnpause();
			}
			return this;
		} }
	});
	trap.updateContainerElements(elements);
	return trap;
};
//#endregion
//#region node_modules/@bpmn-io/form-js-editor/dist/index.es.js
var FN_REF = "__fn";
var DEFAULT_PRIORITY$3 = 1e3;
var slice = Array.prototype.slice;
/**
* @typedef { {
*   stopPropagation(): void;
*   preventDefault(): void;
*   cancelBubble: boolean;
*   defaultPrevented: boolean;
*   returnValue: any;
* } } Event
*/
/**
* @template E
*
* @typedef { (event: E & Event, ...any) => any } EventBusEventCallback
*/
/**
* @typedef { {
*  priority: number;
*  next: EventBusListener | null;
*  callback: EventBusEventCallback<any>;
* } } EventBusListener
*/
/**
* A general purpose event bus.
*
* This component is used to communicate across a diagram instance.
* Other parts of a diagram can use it to listen to and broadcast events.
*
*
* ## Registering for Events
*
* The event bus provides the {@link EventBus#on} and {@link EventBus#once}
* methods to register for events. {@link EventBus#off} can be used to
* remove event registrations. Listeners receive an instance of {@link Event}
* as the first argument. It allows them to hook into the event execution.
*
* ```javascript
*
* // listen for event
* eventBus.on('foo', function(event) {
*
*   // access event type
*   event.type; // 'foo'
*
*   // stop propagation to other listeners
*   event.stopPropagation();
*
*   // prevent event default
*   event.preventDefault();
* });
*
* // listen for event with custom payload
* eventBus.on('bar', function(event, payload) {
*   console.log(payload);
* });
*
* // listen for event returning value
* eventBus.on('foobar', function(event) {
*
*   // stop event propagation + prevent default
*   return false;
*
*   // stop event propagation + return custom result
*   return {
*     complex: 'listening result'
*   };
* });
*
*
* // listen with custom priority (default=1000, higher is better)
* eventBus.on('priorityfoo', 1500, function(event) {
*   console.log('invoked first!');
* });
*
*
* // listen for event and pass the context (`this`)
* eventBus.on('foobar', function(event) {
*   this.foo();
* }, this);
* ```
*
*
* ## Emitting Events
*
* Events can be emitted via the event bus using {@link EventBus#fire}.
*
* ```javascript
*
* // false indicates that the default action
* // was prevented by listeners
* if (eventBus.fire('foo') === false) {
*   console.log('default has been prevented!');
* };
*
*
* // custom args + return value listener
* eventBus.on('sum', function(event, a, b) {
*   return a + b;
* });
*
* // you can pass custom arguments + retrieve result values.
* var sum = eventBus.fire('sum', 1, 2);
* console.log(sum); // 3
* ```
*
* @template [EventMap=null]
*/
function EventBus() {
	/**
	* @type { Record<string, EventBusListener> }
	*/
	this._listeners = {};
	this.on("diagram.destroy", 1, this._destroy, this);
}
/**
* @overlord
*
* Register an event listener for events with the given name.
*
* The callback will be invoked with `event, ...additionalArguments`
* that have been passed to {@link EventBus#fire}.
*
* Returning false from a listener will prevent the events default action
* (if any is specified). To stop an event from being processed further in
* other listeners execute {@link Event#stopPropagation}.
*
* Returning anything but `undefined` from a listener will stop the listener propagation.
*
* @template T
*
* @param {string|string[]} events to subscribe to
* @param {number} [priority=1000] listen priority
* @param {EventBusEventCallback<T>} callback
* @param {any} [that] callback context
*/
/**
* Register an event listener for events with the given name.
*
* The callback will be invoked with `event, ...additionalArguments`
* that have been passed to {@link EventBus#fire}.
*
* Returning false from a listener will prevent the events default action
* (if any is specified). To stop an event from being processed further in
* other listeners execute {@link Event#stopPropagation}.
*
* Returning anything but `undefined` from a listener will stop the listener propagation.
*
* @template {keyof EventMap} EventName
*
* @param {EventName} events to subscribe to
* @param {number} [priority=1000] listen priority
* @param {EventBusEventCallback<EventMap[EventName]>} callback
* @param {any} [that] callback context
*/
EventBus.prototype.on = function(events, priority, callback, that) {
	events = isArray(events) ? events : [events];
	if (isFunction(priority)) {
		that = callback;
		callback = priority;
		priority = DEFAULT_PRIORITY$3;
	}
	if (!isNumber(priority)) throw new Error("priority must be a number");
	var actualCallback = callback;
	if (that) {
		actualCallback = bind(callback, that);
		actualCallback[FN_REF] = callback[FN_REF] || callback;
	}
	var self = this;
	events.forEach(function(e) {
		self._addListener(e, {
			priority,
			callback: actualCallback,
			next: null
		});
	});
};
/**
* @overlord
*
* Register an event listener that is called only once.
*
* @template T
*
* @param {string|string[]} events to subscribe to
* @param {number} [priority=1000] the listen priority
* @param {EventBusEventCallback<T>} callback
* @param {any} [that] callback context
*/
/**
* Register an event listener that is called only once.
*
* @template {keyof EventMap} EventName
*
* @param {EventName} events to subscribe to
* @param {number} [priority=1000] listen priority
* @param {EventBusEventCallback<EventMap[EventName]>} callback
* @param {any} [that] callback context
*/
EventBus.prototype.once = function(events, priority, callback, that) {
	var self = this;
	if (isFunction(priority)) {
		that = callback;
		callback = priority;
		priority = DEFAULT_PRIORITY$3;
	}
	if (!isNumber(priority)) throw new Error("priority must be a number");
	function wrappedCallback() {
		wrappedCallback.__isTomb = true;
		var result = callback.apply(that, arguments);
		self.off(events, wrappedCallback);
		return result;
	}
	wrappedCallback[FN_REF] = callback;
	this.on(events, priority, wrappedCallback);
};
/**
* Removes event listeners by event and callback.
*
* If no callback is given, all listeners for a given event name are being removed.
*
* @param {string|string[]} events
* @param {EventBusEventCallback<unknown>} [callback]
*/
EventBus.prototype.off = function(events, callback) {
	events = isArray(events) ? events : [events];
	var self = this;
	events.forEach(function(event) {
		self._removeListener(event, callback);
	});
};
/**
* Create an event recognized be the event bus.
*
* @param {Object} data Event data.
*
* @return {Event} An event that will be recognized by the event bus.
*/
EventBus.prototype.createEvent = function(data) {
	var event = new InternalEvent();
	event.init(data);
	return event;
};
/**
* Fires an event.
*
* @example
*
* ```javascript
* // fire event by name
* events.fire('foo');
*
* // fire event object with nested type
* var event = { type: 'foo' };
* events.fire(event);
*
* // fire event with explicit type
* var event = { x: 10, y: 20 };
* events.fire('element.moved', event);
*
* // pass additional arguments to the event
* events.on('foo', function(event, bar) {
*   alert(bar);
* });
*
* events.fire({ type: 'foo' }, 'I am bar!');
* ```
*
* @param {string} [type] event type
* @param {Object} [data] event or event data
* @param {...any} [args] additional arguments the callback will be called with.
*
* @return {any} The return value. Will be set to `false` if the default was prevented.
*/
EventBus.prototype.fire = function(type, data) {
	var event, firstListener, returnValue, args = slice.call(arguments);
	if (typeof type === "object") {
		data = type;
		type = data.type;
	}
	if (!type) throw new Error("no event type specified");
	firstListener = this._listeners[type];
	if (!firstListener) return;
	if (data instanceof InternalEvent) event = data;
	else event = this.createEvent(data);
	args[0] = event;
	var originalType = event.type;
	if (type !== originalType) event.type = type;
	try {
		returnValue = this._invokeListeners(event, args, firstListener);
	} finally {
		if (type !== originalType) event.type = originalType;
	}
	if (returnValue === void 0 && event.defaultPrevented) returnValue = false;
	return returnValue;
};
/**
* Handle an error by firing an event.
*
* @param {Error} error The error to be handled.
*
* @return {boolean} Whether the error was handled.
*/
EventBus.prototype.handleError = function(error) {
	return this.fire("error", { error }) === false;
};
EventBus.prototype._destroy = function() {
	this._listeners = {};
};
/**
* @param {Event} event
* @param {any[]} args
* @param {EventBusListener} listener
*
* @return {any}
*/
EventBus.prototype._invokeListeners = function(event, args, listener) {
	var returnValue;
	while (listener) {
		if (event.cancelBubble) break;
		returnValue = this._invokeListener(event, args, listener);
		listener = listener.next;
	}
	return returnValue;
};
/**
* @param {Event} event
* @param {any[]} args
* @param {EventBusListener} listener
*
* @return {any}
*/
EventBus.prototype._invokeListener = function(event, args, listener) {
	var returnValue;
	if (listener.callback.__isTomb) return returnValue;
	try {
		returnValue = invokeFunction(listener.callback, args);
		if (returnValue !== void 0) {
			event.returnValue = returnValue;
			event.stopPropagation();
		}
		if (returnValue === false) event.preventDefault();
	} catch (error) {
		if (!this.handleError(error)) {
			console.error("unhandled error in event listener", error);
			throw error;
		}
	}
	return returnValue;
};
/**
* Add new listener with a certain priority to the list
* of listeners (for the given event).
*
* The semantics of listener registration / listener execution are
* first register, first serve: New listeners will always be inserted
* after existing listeners with the same priority.
*
* Example: Inserting two listeners with priority 1000 and 1300
*
*    * before: [ 1500, 1500, 1000, 1000 ]
*    * after: [ 1500, 1500, (new=1300), 1000, 1000, (new=1000) ]
*
* @param {string} event
* @param {EventBusListener} newListener
*/
EventBus.prototype._addListener = function(event, newListener) {
	var listener = this._getListeners(event), previousListener;
	if (!listener) {
		this._setListeners(event, newListener);
		return;
	}
	while (listener) {
		if (listener.priority < newListener.priority) {
			newListener.next = listener;
			if (previousListener) previousListener.next = newListener;
			else this._setListeners(event, newListener);
			return;
		}
		previousListener = listener;
		listener = listener.next;
	}
	previousListener.next = newListener;
};
/**
* @param {string} name
*
* @return {EventBusListener}
*/
EventBus.prototype._getListeners = function(name) {
	return this._listeners[name];
};
/**
* @param {string} name
* @param {EventBusListener} listener
*/
EventBus.prototype._setListeners = function(name, listener) {
	this._listeners[name] = listener;
};
EventBus.prototype._removeListener = function(event, callback) {
	var listener = this._getListeners(event), nextListener, previousListener, listenerCallback;
	if (!callback) {
		this._setListeners(event, null);
		return;
	}
	while (listener) {
		nextListener = listener.next;
		listenerCallback = listener.callback;
		if (listenerCallback === callback || listenerCallback[FN_REF] === callback) if (previousListener) previousListener.next = nextListener;
		else this._setListeners(event, nextListener);
		previousListener = listener;
		listener = nextListener;
	}
};
/**
* A event that is emitted via the event bus.
*/
function InternalEvent() {}
InternalEvent.prototype.stopPropagation = function() {
	this.cancelBubble = true;
};
InternalEvent.prototype.preventDefault = function() {
	this.defaultPrevented = true;
};
InternalEvent.prototype.init = function(data) {
	assign(this, data || {});
};
/**
* Invoke function. Be fast...
*
* @param {Function} fn
* @param {any[]} args
*
* @return {any}
*/
function invokeFunction(fn, args) {
	return fn.apply(null, args);
}
/**
* A factory to create a configurable debouncer.
*
* @param {number|boolean} [config=true]
*/
function DebounceFactory(config = true) {
	const timeout = typeof config === "number" ? config : config ? 300 : 0;
	if (timeout) return (fn) => debounce(fn, timeout);
	else return (fn) => fn;
}
DebounceFactory.$inject = ["config.debounce"];
var FormFieldRegistry = class extends FormFieldRegistry$1 {
	/**
	* Updates a form fields id.
	*
	* @param {Object} formField
	* @param {string} newId
	*/
	updateId(formField, newId) {
		this._validateId(newId);
		this._eventBus.fire("formField.updateId", {
			formField,
			newId
		});
		this.remove(formField);
		formField.id = newId;
		this.add(formField);
		if ("components" in formField) for (const component of formField.components) component._parent = newId;
	}
	/**
	* Validate the suitability of the given id and signals a problem
	* with an exception.
	*
	* @param {string} id
	*
	* @throws {Error} if id is empty or already assigned
	*/
	_validateId(id) {
		if (!id) throw new Error("formField must have an id");
		if (this.get(id)) throw new Error("formField with id " + id + " already added");
	}
};
var MAX_COLUMNS_PER_ROW = 16;
var MAX_COLUMNS = 16;
var MIN_COLUMNS = 2;
var MAX_FIELDS_PER_ROW = 4;
var FormLayoutValidator = class {
	/**
	* @constructor
	*
	* @param { import('./FormLayouter').FormLayouter } formLayouter
	* @param { import('./FormFieldRegistry').FormFieldRegistry } formFieldRegistry
	*/
	constructor(formLayouter, formFieldRegistry) {
		this._formLayouter = formLayouter;
		this._formFieldRegistry = formFieldRegistry;
	}
	validateField(field = {}, columns, row) {
		if (Number.isInteger(columns)) {
			if (columns < MIN_COLUMNS) return `Minimum ${MIN_COLUMNS} columns are allowed`;
			if (columns > MAX_COLUMNS) return `Maximum ${MAX_COLUMNS} columns are allowed`;
		}
		if (!row) row = this._formLayouter.getRowForField(field);
		let sumColumns = parseInt(columns) || 0;
		let sumFields = 1;
		let sumAutoCols = columns ? 0 : 1;
		row.components.forEach((id) => {
			if (field.id === id) return;
			const cols = (this._formFieldRegistry.get(id).layout || {}).columns;
			if (!cols) sumAutoCols++;
			sumColumns += parseInt(cols) || 0;
			sumFields++;
		});
		if (sumColumns > MAX_COLUMNS_PER_ROW || sumAutoCols > 0 && sumColumns > calculateMaxColumnsWithAuto(sumAutoCols) || columns === MAX_COLUMNS_PER_ROW && sumFields > 1) return `New value exceeds the maximum of ${MAX_COLUMNS_PER_ROW} columns per row`;
		if (sumFields > MAX_FIELDS_PER_ROW) return `Maximum ${MAX_FIELDS_PER_ROW} fields per row are allowed`;
		return null;
	}
};
FormLayoutValidator.$inject = ["formLayouter", "formFieldRegistry"];
function calculateMaxColumnsWithAuto(autoCols) {
	return MAX_COLUMNS_PER_ROW - autoCols * 2;
}
var emptyImage = createEmptyImage();
function editorFormFieldClasses(type, { disabled = false } = {}) {
	if (!type) throw new Error("type required");
	return (0, import_classnames.default)("fjs-form-field", `fjs-form-field-${type}`, { "fjs-disabled": disabled });
}
/**
* Add a dragger that calls back the passed function with
* { event, delta } on drag.
*
* @example
*
* function dragMove(event, delta) {
*   // we are dragging (!!)
* }
*
* domElement.addEventListener('dragstart', dragger(dragMove));
*
* @param {Function} fn
*
* @return {Function} drag start callback function
*/
function createDragger$1(fn) {
	let self;
	let startX, startY;
	/** drag start */
	function onDragStart(event) {
		self = this;
		startX = event.clientX;
		startY = event.clientY;
		if (event.dataTransfer) event.dataTransfer.setDragImage(emptyImage, 0, 0);
		document.addEventListener("dragover", onDrag);
		document.addEventListener("dragend", onEnd);
		document.addEventListener("drop", preventDefault$1);
	}
	function onDrag(event) {
		const delta = {
			x: event.clientX - startX,
			y: event.clientY - startY
		};
		return fn.call(self, event, delta);
	}
	function onEnd() {
		document.removeEventListener("dragover", onDrag);
		document.removeEventListener("dragend", onEnd);
		document.removeEventListener("drop", preventDefault$1);
	}
	return onDragStart;
}
/**
* Throttle function call according UI update cycle.
*
* @param  {Function} fn
*
* @return {Function} throttled fn
*/
function throttle(fn) {
	let active = false;
	let lastArgs = [];
	let lastThis = void 0;
	return function(...args) {
		lastArgs = args;
		lastThis = this;
		if (active) return;
		active = true;
		fn.apply(lastThis, lastArgs);
		window.requestAnimationFrame(function() {
			lastArgs = lastThis = active = void 0;
		});
	};
}
function preventDefault$1(event) {
	event.preventDefault();
	event.stopPropagation();
}
function createEmptyImage() {
	const img = new Image();
	img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
	return img;
}
function EditorIFrame(props) {
	const { field, domId } = props;
	const { label } = field;
	const Icon = iconsByType(field.type);
	return u("div", {
		class: editorFormFieldClasses(field.type),
		children: [u(Label$3, {
			id: domId,
			label
		}), u("div", {
			class: "fjs-iframe-placeholder",
			id: domId,
			children: u("p", {
				class: "fjs-iframe-placeholder-text",
				children: [u(Icon, {
					width: "32",
					height: "24",
					viewBox: "0 0 56 56"
				}), "iFrame"]
			})
		})]
	});
}
EditorIFrame.config = IFrame.config;
var DragAndDropContext = Q({ drake: null });
/**
* @param {string} type
* @param {boolean} [strict]
*
* @returns {any}
*/
function getService$1(type, strict) {}
var FormEditorContext = Q({ getService: getService$1 });
function useService$1(type, strict) {
	const { getService } = x(FormEditorContext);
	return getService(type, strict);
}
function usePrevious$1(value, defaultValue = null) {
	const ref = A(defaultValue);
	y(() => ref.current = value, [value]);
	return ref.current;
}
/**
* @param {Function} fn - function to debounce
*/
function useDebounce$1(fn) {
	const debounce = useService$1("debounce");
	const callback = T$1(() => {
		return debounce(fn);
	}, [debounce, fn]);
	y(() => {
		return () => {
			typeof callback.flush === "function" && callback.flush();
		};
	}, [callback]);
	return callback;
}
var _path$5;
function _extends$5() {
	return _extends$5 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$5.apply(null, arguments);
}
var SvgClose = function SvgClose(props) {
	return /* @__PURE__ */ _("svg", _extends$5({
		xmlns: "http://www.w3.org/2000/svg",
		width: 16,
		height: 16,
		fill: "currentColor"
	}, props), _path$5 || (_path$5 = /* @__PURE__ */ _("path", {
		fillRule: "evenodd",
		d: "m12 4.7-.7-.7L8 7.3 4.7 4l-.7.7L7.3 8 4 11.3l.7.7L8 8.7l3.3 3.3.7-.7L8.7 8z",
		clipRule: "evenodd"
	})));
};
var _path$4, _path2$1;
function _extends$4() {
	return _extends$4 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$4.apply(null, arguments);
}
var SvgDelete = function SvgDelete(props) {
	return /* @__PURE__ */ _("svg", _extends$4({
		xmlns: "http://www.w3.org/2000/svg",
		width: 16,
		height: 16,
		fill: "none"
	}, props), /* @__PURE__ */ _("rect", {
		width: 16,
		height: 16,
		x: .536,
		fill: "#fff",
		rx: 3,
		style: { mixBlendMode: "multiply" }
	}), /* @__PURE__ */ _("path", {
		fill: "#fff",
		d: "M0 0h16v16H0z",
		style: { mixBlendMode: "multiply" },
		transform: "translate(.536)"
	}), _path$4 || (_path$4 = /* @__PURE__ */ _("path", {
		fill: "currentcolor",
		d: "M7.536 6h-1v6h1zm3 0h-1v6h1z"
	})), _path2$1 || (_path2$1 = /* @__PURE__ */ _("path", {
		fill: "currentcolor",
		d: "M2.536 3v1h1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4h1V3zm2 11V4h8v10zm6-13h-4v1h4z"
	})));
};
var _path$3;
function _extends$3() {
	return _extends$3 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$3.apply(null, arguments);
}
var SvgDraggable = function SvgDraggable(props) {
	return /* @__PURE__ */ _("svg", _extends$3({
		xmlns: "http://www.w3.org/2000/svg",
		xmlSpace: "preserve",
		width: 16,
		height: 16,
		fill: "currentcolor",
		viewBox: "0 0 32 32"
	}, props), _path$3 || (_path$3 = /* @__PURE__ */ _("path", { d: "M10 6h4v4h-4zm8 0h4v4h-4zm-8 8h4v4h-4zm8 0h4v4h-4zm-8 8h4v4h-4zm8 0h4v4h-4z" })), /* @__PURE__ */ _("path", {
		d: "M0 0h32v32H0z",
		style: { fill: "none" }
	}));
};
var _path$2;
function _extends$2() {
	return _extends$2 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$2.apply(null, arguments);
}
var SvgSearch = function SvgSearch(props) {
	return /* @__PURE__ */ _("svg", _extends$2({
		xmlns: "http://www.w3.org/2000/svg",
		width: 15,
		height: 15,
		fill: "none"
	}, props), _path$2 || (_path$2 = /* @__PURE__ */ _("path", {
		fill: "currentColor",
		d: "m14.5 13.793-3.776-3.776a5.508 5.508 0 1 0-.707.707l3.776 3.776zM2 6.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0"
	})));
};
var _path$1, _rect, _mask, _path2, _path3, _path4, _path5, _path6;
function _extends$1() {
	return _extends$1 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$1.apply(null, arguments);
}
var SvgEmptyForm = function SvgEmptyForm(props) {
	return /* @__PURE__ */ _("svg", _extends$1({
		xmlns: "http://www.w3.org/2000/svg",
		width: 126,
		height: 96,
		fill: "none"
	}, props), _path$1 || (_path$1 = /* @__PURE__ */ _("path", {
		fill: "#FF832B",
		fillRule: "evenodd",
		d: "M70 78v8a3 3 0 0 1-3 3h-8v-5h6v-6zm0-16h-5V46h5zm0-32h-5v-6h-6v-5h8a3 3 0 0 1 3 3zM43 19v5H27v-5zm-32 0v5H5v6H0v-8a3 3 0 0 1 3-3zM0 46h5v16H0zm0 32h5v6h6v5H3a3 3 0 0 1-3-3zm27 11v-5h16v5z",
		clipRule: "evenodd"
	})), _rect || (_rect = /* @__PURE__ */ _("rect", {
		width: 70,
		height: 70,
		fill: "#E5E5E5",
		rx: 3,
		transform: "matrix(-1 0 0 1 94 0)"
	})), _mask || (_mask = /* @__PURE__ */ _("mask", {
		id: "EmptyForm_svg__a",
		fill: "#fff"
	}, /* @__PURE__ */ _("path", {
		fillRule: "evenodd",
		d: "M87.085 88.684 75.43 45.185l43.499 11.656-11.044 8.072 8.557 8.556-12.728 12.728-8.557-8.556z",
		clipRule: "evenodd"
	}))), _path2 || (_path2 = /* @__PURE__ */ _("path", {
		fill: "#393939",
		fillRule: "evenodd",
		d: "M87.085 88.684 75.43 45.185l43.499 11.656-11.044 8.072 8.557 8.556-12.728 12.728-8.557-8.556z",
		clipRule: "evenodd"
	})), _path3 || (_path3 = /* @__PURE__ */ _("path", {
		fill: "#393939",
		d: "M75.43 45.185 70.6 46.48l-2.241-8.365 8.365 2.242zm11.655 43.499 4.037 2.95-6.163 8.432-2.704-10.088zm31.844-31.843 1.294-4.83 10.088 2.703-8.432 6.163zm-11.044 8.072-3.535 3.535-4.128-4.127 4.713-3.445zm8.557 8.556 3.535-3.535 3.536 3.535-3.536 3.536zm-12.728 12.728 3.536 3.536-3.536 3.535-3.536-3.535zm-8.557-8.556-4.036-2.951 3.444-4.713 4.128 4.128zM80.26 43.89 91.915 87.39l-9.66 2.588L70.6 46.48zm37.375 17.78L74.136 50.014l2.588-9.66 43.499 11.656zm-12.699-.795 11.043-8.072 5.901 8.073-11.043 8.072zm7.971 16.129-8.556-8.557 7.071-7.07 8.556 8.556zm-12.728 5.657 12.728-12.728 7.071 7.07-12.727 12.729zm-1.485-8.557 8.557 8.557-7.072 7.07-8.556-8.556zM83.049 85.733 91.12 74.69l8.073 5.901-8.072 11.044z",
		mask: "url(#EmptyForm_svg__a)"
	})), _path4 || (_path4 = /* @__PURE__ */ _("path", {
		stroke: "#000",
		strokeLinecap: "round",
		strokeWidth: 3,
		d: "m69.431 39.163-9.192-9.192"
	})), _path5 || (_path5 = /* @__PURE__ */ _("path", {
		stroke: "#000",
		strokeLinecap: "round",
		strokeWidth: 3,
		d: "M1.5-1.5h8",
		transform: "matrix(-1 0 0 1 68.213 50.123)"
	})), _path6 || (_path6 = /* @__PURE__ */ _("path", {
		stroke: "#000",
		strokeLinecap: "round",
		strokeWidth: 3,
		d: "M78.969 36.367v-8"
	})));
};
function EditorText(props) {
	const { type, text = "" } = props.field;
	const Icon = iconsByType("text");
	const templating = useService$1("templating");
	const expressionLanguage = useService$1("expressionLanguage");
	if (!text || !text.trim()) return u("div", {
		class: editorFormFieldClasses(type),
		children: u("div", {
			class: "fjs-form-field-placeholder",
			children: [u(Icon, { viewBox: "0 0 54 54" }), "Text view is empty"]
		})
	});
	if (expressionLanguage.isExpression(text)) return u("div", {
		class: editorFormFieldClasses(type),
		children: u("div", {
			class: "fjs-form-field-placeholder",
			children: [u(Icon, { viewBox: "0 0 54 54" }), "Text view is populated by an expression"]
		})
	});
	if (templating.isTemplate(text)) return u("div", {
		class: editorFormFieldClasses(type),
		children: u("div", {
			class: "fjs-form-field-placeholder",
			children: [u(Icon, { viewBox: "0 0 54 54" }), "Text view is templated"]
		})
	});
	return u(Text$1, {
		...props,
		disableLinks: true
	});
}
EditorText.config = Text$1.config;
function EditorHtml(props) {
	const { type, content = "" } = props.field;
	const Icon = iconsByType(type);
	const templating = useService$1("templating");
	const expressionLanguage = useService$1("expressionLanguage");
	if (!content || !content.trim()) return u("div", {
		class: editorFormFieldClasses(type),
		children: u("div", {
			class: "fjs-form-field-placeholder",
			children: [u(Icon, { viewBox: "0 0 54 54" }), "Html view is empty"]
		})
	});
	if (expressionLanguage.isExpression(content)) return u("div", {
		class: editorFormFieldClasses(type),
		children: u("div", {
			class: "fjs-form-field-placeholder",
			children: [u(Icon, { viewBox: "0 0 54 54" }), "Html view is populated by an expression"]
		})
	});
	if (templating.isTemplate(content)) return u("div", {
		class: editorFormFieldClasses(type),
		children: u("div", {
			class: "fjs-form-field-placeholder",
			children: [u(Icon, { viewBox: "0 0 54 54" }), "Html view is templated"]
		})
	});
	return u(Html, {
		...props,
		disableLinks: true
	});
}
EditorHtml.config = Html.config;
function EditorTable(props) {
	const { columnsExpression, columns, id, label } = props.field;
	const editorColumns = typeof columnsExpression === "string" && columnsExpression.length > 0 || Array.isArray(columns) && columns.length === 0 ? [
		{
			key: "1",
			label: "Column 1"
		},
		{
			key: "2",
			label: "Column 2"
		},
		{
			key: "3",
			label: "Column 3"
		}
	] : columns;
	const prefixId = `fjs-form-${id}`;
	return u("div", {
		class: editorFormFieldClasses("table", { disabled: true }),
		children: [u(Label$3, {
			id: prefixId,
			label
		}), u("div", {
			class: "fjs-table-middle-container",
			children: u("div", {
				class: "fjs-table-inner-container",
				children: u("table", {
					class: (0, import_classnames.default)("fjs-table", "fjs-disabled"),
					id: prefixId,
					children: [u("thead", {
						class: "fjs-table-head",
						children: u("tr", {
							class: "fjs-table-tr",
							children: editorColumns.map(({ key, label }) => u("th", {
								class: "fjs-table-th",
								children: label
							}, key))
						})
					}), u("tbody", {
						class: "fjs-table-body",
						children: u("tr", {
							class: "fjs-table-tr",
							children: editorColumns.map(({ key }) => u("td", {
								class: "fjs-table-td",
								children: "Content"
							}, key))
						})
					})]
				})
			})
		})]
	});
}
EditorTable.config = Table.config;
var type = "expression";
function EditorExpressionField(props) {
	const { field } = props;
	const { expression = "", key } = field;
	const Icon = iconsByType("expression");
	const expressionLanguage = useService$1("expressionLanguage");
	let placeholderContent = "Expression is empty";
	if (expression.trim() && expressionLanguage.isExpression(expression)) placeholderContent = `Expression for '${key}'`;
	return u("div", {
		class: editorFormFieldClasses(type),
		children: u("div", {
			class: "fjs-form-field-placeholder",
			children: [u(Icon, { viewBox: "0 0 54 54" }), placeholderContent]
		})
	});
}
EditorExpressionField.config = {
	...ExpressionField.config,
	escapeGridRender: false
};
function EditorDocumentPreview(props) {
	const { field, domId } = props;
	const { label } = field;
	const Icon = iconsByType(field.type);
	return u("div", {
		class: editorFormFieldClasses(field.type),
		children: [u(Label$3, {
			id: domId,
			label
		}), u("div", {
			class: "fjs-documentPreview-placeholder",
			id: domId,
			children: u("p", {
				class: "fjs-documentPreview-placeholder-text",
				children: [u(Icon, {
					width: "32",
					height: "24",
					viewBox: "0 0 56 56"
				}), "Document preview"]
			})
		})]
	});
}
EditorDocumentPreview.config = DocumentPreview.config;
var editorFormFields = [
	EditorIFrame,
	EditorText,
	EditorHtml,
	EditorTable,
	EditorExpressionField,
	EditorDocumentPreview
];
var EditorFormFields = class extends FormFields {
	constructor() {
		super();
		editorFormFields.forEach((formField) => {
			this.register(formField.config.type, formField);
		});
	}
};
var ModularSection = (props) => {
	const { rootClass, RootElement, section, children } = props;
	const eventBus = useService$1("eventBus");
	const sectionConfig = useService$1(`config.${section}`);
	const [parent, setParent] = d(sectionConfig && sectionConfig.parent || null);
	const [shouldRender, setShouldRender] = d(true);
	const ParentElement = T$1(() => {
		if (parent === null) return null;
		if (typeof parent === "string") {
			if (!document.querySelector(parent)) throw new Error(`Target root element with selector '${parent}' not found for section '${section}'`);
			return document.querySelector(parent);
		}
		if (!(parent instanceof Element)) throw new Error(`Target root element for section '${section}' must be a valid selector or DOM element`);
		return parent;
	}, [section, parent]);
	y(() => {
		const onAttach = ({ container }) => {
			setParent(container);
			setShouldRender(true);
		};
		const onDetach = () => {
			setParent(null);
			setShouldRender(false);
		};
		const onReset = () => {
			setParent(null);
			setShouldRender(true);
		};
		eventBus.on(`${section}.attach`, onAttach);
		eventBus.on(`${section}.detach`, onDetach);
		eventBus.on(`${section}.reset`, onReset);
		eventBus.fire(`${section}.section.rendered`);
		return () => {
			eventBus.off(`${section}.attach`, onAttach);
			eventBus.off(`${section}.detach`, onDetach);
			eventBus.off(`${section}.reset`, onReset);
			eventBus.fire(`${section}.section.destroyed`);
		};
	}, [eventBus, section]);
	y(() => {
		if (shouldRender) {
			eventBus.fire(`${section}.rendered`, { element: ParentElement });
			return () => {
				eventBus.fire(`${section}.destroyed`, { element: ParentElement });
			};
		}
	}, [
		eventBus,
		section,
		shouldRender,
		ParentElement
	]);
	const Root = q(({ children }) => RootElement ? u(RootElement, { children }) : u("div", {
		className: rootClass,
		children
	}), [rootClass, RootElement]);
	return shouldRender ? parent ? $(u(Root, { children }), ParentElement) : u(Root, { children }) : null;
};
var FillContext = Q({
	addFill(uid, props) {
		throw new Error("FillContext.addFill() uninitialized");
	},
	removeFill(uid) {
		throw new Error("FillContext.addFill() uninitialized");
	}
});
var Fill = (props) => {
	const uid = A(Symbol("fill_uid"));
	const fillContext = x(FillContext);
	y(() => {
		if (!fillContext) return;
		fillContext.addFill({
			id: uid,
			...props
		});
		return () => {
			fillContext.removeFill(uid);
		};
	}, [fillContext, props]);
	return null;
};
var SlotContext = Q({ fills: [] });
var Slot = (props) => {
	const { name, fillRoot = FillFragment, groupFn = _groupByGroupName, separatorFn = (key) => null, limit } = props;
	const { fills } = x(SlotContext);
	const filtered = T$1(() => fills.filter((fill) => fill.slot === name), [fills, name]);
	const cropped = T$1(() => limit ? filtered.slice(0, limit) : filtered, [filtered, limit]);
	const groups = T$1(() => groupFn(cropped), [cropped, groupFn]);
	return T$1(() => {
		return buildFills(groups, fillRoot, separatorFn);
	}, [
		groups,
		fillRoot,
		separatorFn
	]);
};
/**
* Creates a Fragment for a fill.
*
* @param {Object} fill Fill to be rendered
* @returns {Object} Preact Fragment containing fill's children
*/
var FillFragment = (fill) => u(k, { children: fill.children }, fill.id);
/**
* Creates an array of fills, with separators inserted between groups.
*
* @param {Array} groups Groups of fills
* @param {Function} fillRenderer Function to create a fill
* @param {Function} separatorRenderer Function to create a separator
* @returns {Array} Array of fills and separators
*/
var buildFills = (groups, fillRenderer, separatorRenderer) => {
	const result = [];
	groups.forEach((array, idx) => {
		if (idx !== 0) {
			const separator = separatorRenderer(`__separator_${idx}`);
			if (separator) result.push(separator);
		}
		array.forEach((fill) => {
			result.push(fillRenderer(fill));
		});
	});
	return result;
};
/**
* Groups fills by group name property.
*/
var _groupByGroupName = (fills) => {
	const groups = [];
	const groupsById = {};
	fills.forEach(function(fill) {
		const { group: groupName = "z_default" } = fill;
		let group = groupsById[groupName];
		if (!group) {
			groupsById[groupName] = group = [];
			groups.push(group);
		}
		group.push(fill);
	});
	groups.forEach((group) => group.sort(_comparePriority));
	return Object.keys(groupsById).sort().map((id) => groupsById[id]);
};
/**
* Compares fills by priority.
*/
var _comparePriority = (a, b) => {
	return (b.priority || 0) - (a.priority || 0);
};
var noop$1 = () => {};
var SlotFillRoot = (props) => {
	const [fills, setFills] = d([]);
	const { onSetFill = noop$1, onRemoveFill = noop$1 } = props;
	const fillContext = T$1(() => ({
		addFill: (fill) => {
			setFills((fills) => [...fills.filter((f) => f.id !== fill.id), fill]);
			onSetFill(fill);
		},
		removeFill: (id) => {
			setFills((fills) => fills.filter((f) => f.id !== id));
			onRemoveFill(id);
		}
	}), [onRemoveFill, onSetFill]);
	const slotContext = T$1(() => ({ fills }), [fills]);
	return u(SlotContext.Provider, {
		value: slotContext,
		children: u(FillContext.Provider, {
			value: fillContext,
			children: props.children
		})
	});
};
function PaletteEntry(props) {
	const { type, label, icon, iconUrl, getPaletteIcon } = props;
	const modeling = useService$1("modeling");
	const formEditor = useService$1("formEditor");
	const Icon = getPaletteIcon({
		icon,
		iconUrl,
		label,
		type
	});
	const onKeyDown = (event) => {
		if (event.code === "Enter") {
			const { fieldType: type } = event.target.dataset;
			const { schema } = formEditor._getState();
			modeling.addFormField({ type }, schema, schema.components.length);
		}
	};
	return u("button", {
		type: "button",
		class: "fjs-palette-field fjs-drag-copy fjs-no-drop",
		"data-field-type": type,
		title: `Create ${getIndefiniteArticle(type)} ${label} element`,
		onKeyDown,
		children: [Icon ? u(Icon, {
			class: "fjs-palette-field-icon",
			width: "36",
			height: "36",
			viewBox: "0 0 54 54"
		}) : null, u("span", {
			class: "fjs-palette-field-text",
			children: label
		})]
	});
}
function getIndefiniteArticle(type) {
	if (["image"].includes(type)) return "an";
	return "a";
}
var PALETTE_GROUPS = [
	{
		label: "Input",
		id: "basic-input"
	},
	{
		label: "Selection",
		id: "selection"
	},
	{
		label: "Presentation",
		id: "presentation"
	},
	{
		label: "Containers",
		id: "container"
	},
	{
		label: "Action",
		id: "action"
	}
];
function Palette(props) {
	const initialPaletteEntries = A(collectPaletteEntries(useService$1("formFields")));
	const [paletteEntries, setPaletteEntries] = d(initialPaletteEntries.current);
	const [searchTerm, setSearchTerm] = d("");
	/** @type {import("preact").RefObject<HTMLInputElement>} */
	const inputRef = A();
	const groups = groupEntries(paletteEntries);
	const simplifyString = q((str) => {
		return str.toLowerCase().replace(/\s+/g, "");
	}, []);
	const filter = q((entry) => {
		const simplifiedSearchTerm = simplifyString(searchTerm);
		if (!simplifiedSearchTerm) return true;
		const simplifiedEntryLabel = simplifyString(entry.label);
		const simplifiedEntryType = simplifyString(entry.type);
		return simplifiedEntryLabel.includes(simplifiedSearchTerm) || simplifiedEntryType.includes(simplifiedSearchTerm);
	}, [searchTerm, simplifyString]);
	y(() => {
		setPaletteEntries(initialPaletteEntries.current.filter(filter));
	}, [filter, searchTerm]);
	const handleInput = q((event) => {
		setSearchTerm(() => event.target.value);
	}, [setSearchTerm]);
	const handleClear = q((event) => {
		setSearchTerm("");
		inputRef.current.focus();
	}, [inputRef, setSearchTerm]);
	return u("div", {
		class: "fjs-palette",
		children: [
			u("div", {
				class: "fjs-palette-header",
				title: "Components",
				children: "Components"
			}),
			u("div", {
				class: "fjs-palette-search-container",
				children: [
					u("span", {
						class: "fjs-palette-search-icon",
						children: u(SvgSearch, {})
					}),
					u("input", {
						class: "fjs-palette-search",
						ref: inputRef,
						type: "text",
						placeholder: "Search components",
						value: searchTerm,
						onInput: handleInput
					}),
					searchTerm && u("button", {
						type: "button",
						title: "Clear content",
						class: "fjs-palette-search-clear",
						onClick: handleClear,
						children: u(SvgClose, {})
					})
				]
			}),
			u("div", {
				class: "fjs-palette-entries",
				children: [groups.map(({ label, entries, id }) => u("div", {
					class: "fjs-palette-group",
					"data-group-id": id,
					children: [u("span", {
						class: "fjs-palette-group-title",
						children: label
					}), u("div", {
						class: "fjs-palette-fields fjs-drag-container fjs-no-drop",
						children: entries.map((entry) => {
							return u(PaletteEntry, {
								getPaletteIcon,
								...entry
							}, entry.type);
						})
					})]
				}, id)), groups.length == 0 && u("div", {
					class: "fjs-palette-no-entries",
					children: "No components found."
				})]
			}),
			u("div", {
				class: "fjs-palette-footer",
				children: u(Slot, {
					name: "editor-palette__footer",
					fillRoot: FillRoot
				})
			})
		]
	});
}
var FillRoot = (fill) => u("div", {
	className: "fjs-palette-footer-fill",
	children: fill.children
});
function groupEntries(entries) {
	const groups = PALETTE_GROUPS.map((group) => {
		return {
			...group,
			entries: []
		};
	});
	const getGroup = (id) => groups.find((group) => id === group.id);
	entries.forEach((entry) => {
		const { group } = entry;
		getGroup(group).entries.push(entry);
	});
	return groups.filter((g) => g.entries.length);
}
/**
* Returns a list of palette entries.
*
* @param {FormFields} formFields
* @returns {Array<PaletteEntry>}
*/
function collectPaletteEntries(formFields) {
	return Object.entries(formFields._formFields).map(([type, formField]) => {
		const { config: fieldConfig } = formField;
		return {
			label: fieldConfig.name || fieldConfig.label,
			type,
			group: fieldConfig.group,
			icon: fieldConfig.icon,
			iconUrl: fieldConfig.iconUrl
		};
	}).filter(({ type }) => type !== "default");
}
/**
* There are various options to specify an icon for a palette entry.
*
* a) via `iconUrl` property in a form field config
* b) via `icon` property in a form field config
* c) via statically defined iconsByType (fallback)
*/
function getPaletteIcon(entry) {
	const { icon, iconUrl, type, label } = entry;
	let Icon;
	if (iconUrl) Icon = function Icon() {
		return u("img", {
			class: "fjs-field-icon-image",
			width: 36,
			style: { margin: "auto" },
			alt: label,
			src: sanitizeImageSource(iconUrl)
		});
	};
	else Icon = icon || iconsByType(type);
	return Icon;
}
var InjectedRendersRoot = () => {
	const injectedRenderers = useService$1("renderInjector").fetchRenderers();
	const injectedProps = T$1(() => ({
		useService: useService$1,
		components: {
			Fill,
			Slot
		}
	}), []);
	return u(k, { children: injectedRenderers.map(({ Renderer }, index) => u(Renderer, { ...injectedProps }, index)) });
};
var CURSOR_CLS_PATTERN = /^fjs-cursor-.*$/;
function set(mode) {
	const classes$1 = classes(document.body);
	classes$1.removeMatching(CURSOR_CLS_PATTERN);
	if (mode) classes$1.add("fjs-cursor-" + mode);
}
function unset() {
	set(null);
}
var DRAG_CONTAINER_CLS = "fjs-drag-container";
var DROP_CONTAINER_VERTICAL_CLS = "fjs-drop-container-vertical";
var DROP_CONTAINER_HORIZONTAL_CLS = "fjs-drop-container-horizontal";
var DRAG_MOVE_CLS = "fjs-drag-move";
var DRAG_ROW_MOVE_CLS = "fjs-drag-row-move";
var DRAG_COPY_CLS = "fjs-drag-copy";
var DRAG_NO_DROP_CLS = "fjs-no-drop";
var DRAG_NO_MOVE_CLS = "fjs-no-move";
var ERROR_DROP_CLS = "fjs-error-drop";
/**
* @typedef { { id: String, components: Array<any> } } FormRow
*/
var Dragging = class {
	/**
	* @constructor
	*
	* @param { import('../../core/FormFieldRegistry').FormFieldRegistry } formFieldRegistry
	* @param { import('../../core/FormLayouter').FormLayouter } formLayouter
	* @param { import('../../core/FormLayoutValidator').FormLayoutValidator } formLayoutValidator
	* @param { import('../../core/EventBus').EventBus } eventBus
	* @param { import('../modeling/Modeling').Modeling } modeling
	* @param { import('@bpmn-io/form-js-viewer').PathRegistry } pathRegistry
	*/
	constructor(formFieldRegistry, formLayouter, formLayoutValidator, eventBus, modeling, pathRegistry) {
		this._formFieldRegistry = formFieldRegistry;
		this._formLayouter = formLayouter;
		this._formLayoutValidator = formLayoutValidator;
		this._eventBus = eventBus;
		this._modeling = modeling;
		this._pathRegistry = pathRegistry;
	}
	/**
	* Calculates position in form schema given the dropped place.
	*
	* @param { FormRow } targetRow
	* @param { any } targetFormField
	* @param { HTMLElement } sibling
	* @returns { number }
	*/
	getTargetIndex(targetRow, targetFormField, sibling) {
		/** @type HTMLElement */
		const siblingFormFieldNode = sibling && sibling.querySelector(".fjs-element");
		const siblingFormField = siblingFormFieldNode && this._formFieldRegistry.get(siblingFormFieldNode.dataset.id);
		if (siblingFormField) return getFormFieldIndex$1(targetFormField, siblingFormField);
		if (targetRow) return getFormFieldIndex$1(targetFormField, this._formFieldRegistry.get(targetRow.components[targetRow.components.length - 1])) + 1;
		return targetFormField.components.length;
	}
	validateDrop(element, target) {
		const formFieldNode = element.querySelector(".fjs-element");
		const targetRow = this._formLayouter.getRow(target.dataset.rowId);
		let columns;
		let formField;
		let targetParentId;
		if (formFieldNode) {
			formField = this._formFieldRegistry.get(formFieldNode.dataset.id);
			if (!formField) return "No associated form field in the registry";
			columns = (formField.layout || {}).columns;
			if (isRow(target)) {
				targetParentId = getFormParent(target).dataset.id;
				const rowError = this._formLayoutValidator.validateField(formField, columns, targetRow);
				if (rowError) return rowError;
			} else targetParentId = target.dataset.id;
			if (!targetParentId) return "Drop is not a valid target";
			const targetParentFormField = this._formFieldRegistry.get(targetParentId);
			const currentParentFormField = this._formFieldRegistry.get(formField._parent);
			if (targetParentFormField !== currentParentFormField) {
				const targetParentPath = this._pathRegistry.getValuePath(targetParentFormField);
				const currentParentPath = this._pathRegistry.getValuePath(currentParentFormField);
				if (targetParentPath.join(".") !== currentParentPath.join(".")) {
					if (!this._pathRegistry.executeRecursivelyOnFields(formField, ({ field, isClosed, isRepeatable }) => {
						const options = { cutoffNode: currentParentFormField.id };
						const fieldPath = this._pathRegistry.getValuePath(field, options);
						return this._pathRegistry.canClaimPath([...targetParentPath, ...fieldPath], {
							isClosed,
							isRepeatable,
							knownAncestorIds: getAncestryList(targetParentId, this._formFieldRegistry)
						});
					})) return "Drop not allowed by path registry";
				}
			}
		}
	}
	moveField(element, source, targetRow, targetFormField, targetIndex) {
		const formFieldNode = element.querySelector(".fjs-element");
		const formField = this._formFieldRegistry.get(formFieldNode.dataset.id);
		const sourceParent = getFormParent(source);
		const sourceFormField = this._formFieldRegistry.get(sourceParent.dataset.id);
		const sourceIndex = getFormFieldIndex$1(sourceFormField, formField);
		const sourceRow = this._formLayouter.getRowForField(formField);
		this._modeling.moveFormField(formField, sourceFormField, targetFormField, sourceIndex, targetIndex, sourceRow, targetRow);
	}
	createNewField(element, targetRow, targetFormField, targetIndex) {
		let attrs = { type: element.dataset.fieldType };
		attrs = {
			...attrs,
			_parent: targetFormField.id,
			layout: {
				row: targetRow ? targetRow.id : this._formLayouter.nextRowId(),
				columns: null
			}
		};
		this._modeling.addFormField(attrs, targetFormField, targetIndex);
	}
	handleRowDrop(el, target, source, sibling) {
		const targetFormField = this._formFieldRegistry.get(target.dataset.id);
		const rowNode = el.querySelector(".fjs-layout-row");
		const row = this._formLayouter.getRow(rowNode.dataset.rowId);
		row.components.forEach((id, index) => {
			const formField = this._formFieldRegistry.get(id);
			const sourceParent = getFormParent(source);
			const sourceFormField = this._formFieldRegistry.get(sourceParent.dataset.id);
			const siblingRowNode = sibling && sibling.querySelector(".fjs-layout-row");
			const siblingRow = siblingRowNode && this._formLayouter.getRow(siblingRowNode.dataset.rowId);
			const siblingFormField = sibling && this._formFieldRegistry.get(siblingRow.components[0]);
			const sourceIndex = getFormFieldIndex$1(sourceFormField, formField);
			const targetIndex = (siblingRowNode ? getFormFieldIndex$1(targetFormField, siblingFormField) : targetFormField.components.length) + index;
			this._modeling.moveFormField(formField, sourceFormField, targetFormField, sourceIndex, targetIndex, row, row);
		});
	}
	handleElementDrop(el, target, source, sibling, drake) {
		const targetFormField = this._formFieldRegistry.get(getFormParent(target).dataset.id);
		let targetRow;
		if (isRow(target)) targetRow = this._formLayouter.getRow(target.dataset.rowId);
		if (this.validateDrop(el, target)) return drake.cancel(true);
		drake.remove();
		const targetIndex = this.getTargetIndex(targetRow, targetFormField, sibling);
		if (isPalette(source)) this.createNewField(el, targetRow, targetFormField, targetIndex);
		else this.moveField(el, source, targetRow, targetFormField, targetIndex);
	}
	/**
	* @param { { container: Array<string>, direction: string, mirrorContainer: string } } options
	*/
	createDragulaInstance(options) {
		const { container, mirrorContainer } = options || {};
		const dragulaInstance = De({
			direction: function(el, target) {
				if (isRow(target)) return "horizontal";
				return "vertical";
			},
			mirrorContainer,
			isContainer(el) {
				return container.some((cls) => el.classList.contains(cls));
			},
			moves(el, source, handle) {
				return !handle.classList.contains(DRAG_NO_MOVE_CLS) && (el.classList.contains(DRAG_MOVE_CLS) || el.classList.contains(DRAG_COPY_CLS) || el.classList.contains(DRAG_ROW_MOVE_CLS));
			},
			copy(el) {
				return el.classList.contains(DRAG_COPY_CLS);
			},
			accepts: (el, target) => {
				unsetDropNotAllowed(target);
				if (el.classList.contains(DRAG_ROW_MOVE_CLS)) return !target.classList.contains(DROP_CONTAINER_HORIZONTAL_CLS);
				if (this.validateDrop(el, target)) setDropNotAllowed(target);
				return !target.classList.contains(DRAG_NO_DROP_CLS);
			},
			transformOffset: (offset, event, element) => {
				if (element.classList.contains(DRAG_ROW_MOVE_CLS)) {
					const rowOffset = {
						x: -5,
						y: -60
					};
					return {
						left: event.clientX + rowOffset.x,
						top: event.clientY + rowOffset.y
					};
				}
				if (element.classList.contains(DRAG_MOVE_CLS)) {
					const iconOffset = {
						x: -5,
						y: -15
					};
					return {
						left: event.clientX + iconOffset.x,
						top: event.clientY + iconOffset.y
					};
				}
				return offset;
			},
			slideFactorX: 10,
			slideFactorY: 5
		});
		dragulaInstance.on("drag", (element, source) => {
			this.emit("drag.start", {
				element,
				source
			});
		});
		dragulaInstance.on("dragend", (element) => {
			this.emit("drag.end", { element });
		});
		dragulaInstance.on("drop", (element, target, source, sibling) => {
			this.emit("drag.drop", {
				element,
				target,
				source,
				sibling
			});
		});
		dragulaInstance.on("over", (element, container, source) => {
			this.emit("drag.hover", {
				element,
				container,
				source
			});
		});
		dragulaInstance.on("out", (element, container, source) => {
			this.emit("drag.out", {
				element,
				container,
				source
			});
		});
		dragulaInstance.on("cancel", (element, container, source) => {
			this.emit("drag.cancel", {
				element,
				container,
				source
			});
		});
		dragulaInstance.on("drop", (el, target, source, sibling) => {
			if (!target) {
				dragulaInstance.remove();
				return;
			}
			if (isDragRow(el)) this.handleRowDrop(el, target, source, sibling);
			else this.handleElementDrop(el, target, source, sibling, dragulaInstance);
		});
		this.emit("dragula.created", dragulaInstance);
		return dragulaInstance;
	}
	emit(event, context) {
		this._eventBus.fire(event, context);
	}
};
Dragging.$inject = [
	"formFieldRegistry",
	"formLayouter",
	"formLayoutValidator",
	"eventBus",
	"modeling",
	"pathRegistry"
];
function getFormFieldIndex$1(parent, formField) {
	let fieldFormIndex = parent.components.length;
	parent.components.forEach(({ id }, index) => {
		if (id === formField.id) fieldFormIndex = index;
	});
	return fieldFormIndex;
}
function isRow(node) {
	return node.classList.contains("fjs-layout-row");
}
function isDragRow(node) {
	return node.classList.contains(DRAG_ROW_MOVE_CLS);
}
function isPalette(node) {
	return node.classList.contains("fjs-palette-fields");
}
function getFormParent(node) {
	return node.closest(".fjs-element");
}
function setDropNotAllowed(node) {
	node.classList.add(ERROR_DROP_CLS);
	set("not-allowed");
}
function unsetDropNotAllowed(node) {
	node.classList.remove(ERROR_DROP_CLS);
	set("grabbing");
}
function FieldDragPreview(props) {
	const { class: className, Icon, label } = props;
	return u("div", {
		class: (0, import_classnames.default)("fjs-field-preview", className),
		children: [u(Icon, {
			class: "fjs-field-preview-icon",
			width: "36",
			height: "36",
			viewBox: "0 0 54 54"
		}), u("span", {
			class: "fjs-field-preview-text",
			children: label
		})]
	});
}
var COLUMNS_REGEX = /^cds--col(-lg)?/;
var ELEMENT_RESIZING_CLS = "fjs-element-resizing";
var GRID_OFFSET_PX = 16;
function FieldResizer(props) {
	const { field, position } = props;
	const ref = A(null);
	const formLayoutValidator = useService$1("formLayoutValidator");
	const modeling = useService$1("modeling");
	const context = A({
		startColumns: 0,
		newColumns: 0
	});
	const onResize = throttle((_, delta) => {
		const { x: dx } = delta;
		const { layout = {} } = field;
		const newColumns = calculateNewColumns(ref.current, layout.columns || context.current.startColumns, dx, position);
		if (!formLayoutValidator.validateField(field, newColumns)) {
			context.current.newColumns = newColumns;
			const columnNode = ref.current.closest(".fjs-layout-column");
			removeMatching(columnNode, COLUMNS_REGEX);
			columnNode.classList.add(`cds--col-lg-${newColumns}`);
		}
	});
	const onResizeStart = (event) => {
		const target = getElementNode(field);
		const parent = getParent(target);
		createDragger$1(onResize)(event);
		const startWidth = getColumnNode(target).getBoundingClientRect().width + GRID_OFFSET_PX;
		context.current.startColumns = asColumns(startWidth, parent);
		setResizing(target, position);
	};
	const onResizeEnd = () => {
		const { layout = {} } = field;
		if (context.current.newColumns) modeling.editFormField(field, "layout", {
			...layout,
			columns: context.current.newColumns
		});
		unsetResizing(getElementNode(field), position);
		context.current.newColumns = null;
	};
	if (field.type === "default") return null;
	return u("div", {
		ref,
		class: (0, import_classnames.default)("fjs-field-resize-handle", "fjs-field-resize-handle-" + position, DRAG_NO_MOVE_CLS),
		draggable: true,
		onDragStart: onResizeStart,
		onDragEnd: onResizeEnd
	});
}
function asColumns(width, parent) {
	const oneColumn = 1 / 16 * parent.getBoundingClientRect().width;
	return Math.round(width / oneColumn);
}
function calculateNewColumns(node, currentColumns, deltaX, position) {
	const parent = getParent(node);
	if (position === "left") deltaX = deltaX * -1;
	return currentColumns + asColumns(deltaX, parent);
}
function getParent(node) {
	return node.closest(".fjs-layout-row");
}
function removeMatching(node, regex) {
	return classes(node).removeMatching(regex);
}
function getColumnNode(node) {
	return node.closest(".fjs-layout-column");
}
function getElementNode(field) {
	return query(".fjs-element[data-id=\"" + field.id + "\"]");
}
function setResizing(node, position) {
	classes(node).add(ELEMENT_RESIZING_CLS + "-" + position);
}
function unsetResizing(node, position) {
	classes(node).remove(ELEMENT_RESIZING_CLS + "-" + position);
}
function ContextPad(props) {
	if (!props.children) return null;
	return u("div", {
		class: "fjs-context-pad",
		children: props.children
	});
}
function EmptyGroup() {
	return u("div", {
		class: "fjs-empty-component",
		children: u("span", {
			class: "fjs-empty-component-text",
			children: "Drag and drop components here."
		})
	});
}
function EmptyForm() {
	return u("div", {
		class: "fjs-empty-editor",
		children: u("div", {
			class: "fjs-empty-editor-card",
			children: [
				u(SvgEmptyForm, {}),
				u("h2", { children: "Build your form" }),
				u("span", { children: "Drag and drop components here to start designing." }),
				u("span", { children: "Use the preview window to test your form." })
			]
		})
	});
}
function Empty(props) {
	if (["group", "dynamiclist"].includes(props.field.type)) return u(EmptyGroup, {});
	if (props.field.type === "default") return u(EmptyForm, {});
	return null;
}
function Element$1(props) {
	const eventBus = useService$1("eventBus"), formFieldRegistry = useService$1("formFieldRegistry"), formFields = useService$1("formFields"), modeling = useService$1("modeling"), selection = useService$1("selection");
	const { hoverInfo } = x(FormRenderContext);
	const { field } = props;
	const { id, type, showOutline } = field;
	/** @type {import("preact").RefObject<HTMLDivElement>} */
	const ref = A();
	const [hovered, setHovered] = d(false);
	y(() => {
		function scrollIntoView({ selection }) {
			const scrollContainer = getScrollContainer(ref.current);
			if (!selection || selection.type === "default" || selection.id !== id || !scrollContainer || !ref.current) return;
			const elementBounds = ref.current.getBoundingClientRect();
			const scrollContainerBounds = scrollContainer.getBoundingClientRect();
			const isElementLarger = elementBounds.height > scrollContainerBounds.height;
			if ((elementBounds.bottom > scrollContainerBounds.bottom || elementBounds.top < scrollContainerBounds.top) && !isElementLarger) ref.current.scrollIntoView({
				behavior: "auto",
				block: "nearest"
			});
		}
		eventBus.on("selection.changed", scrollIntoView);
		return () => eventBus.off("selection.changed", scrollIntoView);
	}, [eventBus, id]);
	_$1(() => {
		if (selection.isSelected(field)) ref.current.focus();
	}, [selection, field]);
	const onClick = q((event) => {
		const fieldEl = event.target.closest("[data-id]");
		if (!fieldEl) return;
		if (fieldEl.dataset.id === field.id) selection.toggle(field);
	}, [field, selection]);
	const isSelected = selection.isSelected(field);
	const classString = T$1(() => {
		const classes = [];
		if (props.class) classes.push(...props.class.split(" "));
		if (isSelected) classes.push("fjs-editor-selected");
		if (["group", "dynamiclist"].includes(type)) classes.push(showOutline ? "fjs-outlined" : "fjs-dashed-outlined");
		if (hovered) classes.push("fjs-editor-hovered");
		return classes.join(" ");
	}, [
		hovered,
		isSelected,
		props.class,
		showOutline,
		type
	]);
	const onRemove = (event) => {
		event.stopPropagation();
		const parentField = formFieldRegistry.get(field._parent);
		const index = getFormFieldIndex(parentField, field);
		modeling.removeFormField(field, parentField, index);
	};
	const onKeyPress = (event) => {
		if (event.key === "Enter") {
			event.stopPropagation();
			selection.toggle(field);
		}
	};
	return u("div", {
		class: classString,
		"data-id": id,
		"data-field-type": type,
		tabIndex: type === "default" ? -1 : 0,
		onClick,
		onKeyPress,
		onMouseOver: (e) => {
			if (hoverInfo.cleanup) hoverInfo.cleanup();
			setHovered(true);
			hoverInfo.cleanup = () => setHovered(false);
			e.stopPropagation();
		},
		ref,
		children: [
			u(DebugColumns, { field }),
			u(ContextPad, { children: selection.isSelected(field) && field.type !== "default" ? u("button", {
				type: "button",
				title: getRemoveButtonTitle(field, formFields),
				class: "fjs-context-pad-item",
				onClick: onRemove,
				children: u(SvgDelete, {})
			}) : null }),
			props.children,
			u(FieldResizer, {
				position: "left",
				field
			}),
			u(FieldResizer, {
				position: "right",
				field
			})
		]
	});
}
function DebugColumns(props) {
	const { field } = props;
	if (!useService$1("config.debugColumns") || field.type == "default") return null;
	return u("div", {
		style: "width: fit-content; padding: 2px 6px; height: 16px; background: var(--color-blue-205-100-95); display: flex; justify-content: center; align-items: center; position: absolute; bottom: -2px; z-index: 2; font-size: 10px; right: 3px;",
		class: "fjs-debug-columns",
		children: (field.layout || {}).columns || "auto"
	});
}
function Children(props) {
	const { field } = props;
	const { id } = field;
	const classes = ["fjs-children", DROP_CONTAINER_VERTICAL_CLS];
	if (props.class) classes.push(...props.class.split(" "));
	return u("div", {
		class: classes.join(" "),
		"data-id": id,
		children: props.children
	});
}
function Row(props) {
	const { row } = props;
	const { id } = row;
	const classes = [DROP_CONTAINER_HORIZONTAL_CLS];
	if (props.class) classes.push(...props.class.split(" "));
	return u("div", {
		class: (0, import_classnames.default)(DRAG_ROW_MOVE_CLS),
		children: [u("span", {
			class: "fjs-row-dragger",
			children: u(SvgDraggable, {})
		}), u("div", {
			class: classes.join(" "),
			style: props.style,
			"data-row-id": id,
			children: props.children
		})]
	});
}
function Column(props) {
	const { field } = props;
	const classes = [DRAG_MOVE_CLS];
	if (field.type === "default") return props.children;
	if (props.class) classes.push(...props.class.split(" "));
	return u("div", {
		"data-field-type": field.type,
		class: classes.join(" "),
		children: props.children
	});
}
function FormEditor$1() {
	const dragging = useService$1("dragging"), eventBus = useService$1("eventBus"), formEditor = useService$1("formEditor"), injector = useService$1("injector"), selection = useService$1("selection"), propertiesPanel = useService$1("propertiesPanel"), propertiesPanelConfig = useService$1("config.propertiesPanel");
	const { schema, properties } = formEditor._getState();
	const { ariaLabel } = properties;
	const formContainerRef = A(null);
	const propertiesPanelRef = A(null);
	const [, setSelection] = d(schema);
	const [hasInitialized, setHasInitialized] = d(false);
	y(() => {
		function handleSelectionChanged(event) {
			setSelection(event.selection || schema);
		}
		eventBus.on("selection.changed", handleSelectionChanged);
		return () => {
			eventBus.off("selection.changed", handleSelectionChanged);
		};
	}, [eventBus, schema]);
	y(() => {
		setSelection(selection.get() || schema);
	}, [selection, schema]);
	const [drake, setDrake] = d(null);
	const dragAndDropContext = { drake };
	y(() => {
		let dragulaInstance = dragging.createDragulaInstance({
			container: [
				DRAG_CONTAINER_CLS,
				DROP_CONTAINER_VERTICAL_CLS,
				DROP_CONTAINER_HORIZONTAL_CLS
			],
			mirrorContainer: formContainerRef.current
		});
		setDrake(dragulaInstance);
		const onDetach = () => {
			if (dragulaInstance) {
				dragulaInstance.destroy();
				eventBus.fire("dragula.destroyed");
			}
		};
		const onAttach = () => {
			onDetach();
			dragulaInstance = dragging.createDragulaInstance({
				container: [
					DRAG_CONTAINER_CLS,
					DROP_CONTAINER_VERTICAL_CLS,
					DROP_CONTAINER_HORIZONTAL_CLS
				],
				mirrorContainer: formContainerRef.current
			});
			setDrake(dragulaInstance);
		};
		const onCreate = (drake) => {
			setDrake(drake);
		};
		const onDragStart = () => {
			set("grabbing");
		};
		const onDragEnd = () => {
			unset();
		};
		eventBus.on("attach", onAttach);
		eventBus.on("detach", onDetach);
		eventBus.on("dragula.created", onCreate);
		eventBus.on("drag.start", onDragStart);
		eventBus.on("drag.end", onDragEnd);
		return () => {
			onDetach();
			eventBus.off("attach", onAttach);
			eventBus.off("detach", onDetach);
			eventBus.off("dragula.created", onCreate);
			eventBus.off("drag.start", onDragStart);
			eventBus.off("drag.end", onDragEnd);
		};
	}, [dragging, eventBus]);
	y(() => {
		if (hasInitialized) return;
		setHasInitialized(true);
		eventBus.fire("rendered");
		eventBus.fire("formEditor.rendered");
	}, [eventBus, hasInitialized]);
	const formRenderContext = T$1(() => ({
		Children,
		Column,
		Element: Element$1,
		Empty,
		Row,
		hoverInfo: {}
	}), []);
	const formContext = T$1(() => ({
		getService(type, strict = true) {
			if (type === "form") return { _getState() {
				return {
					data: {},
					errors: {},
					properties: {
						ariaLabel,
						disabled: true
					},
					schema
				};
			} };
			return injector.get(type, strict);
		},
		formId: formEditor._id
	}), [
		ariaLabel,
		formEditor,
		injector,
		schema
	]);
	const onSubmit = q(() => {}, []);
	const onReset = q(() => {}, []);
	const hasDefaultPropertiesPanel = defaultPropertiesPanel(propertiesPanelConfig);
	y(() => {
		if (hasDefaultPropertiesPanel) propertiesPanel.attachTo(propertiesPanelRef.current);
	}, [
		propertiesPanelRef,
		propertiesPanel,
		hasDefaultPropertiesPanel
	]);
	return u("div", {
		class: "fjs-form-editor",
		children: u(SlotFillRoot, { children: [
			u(DragAndDropContext.Provider, {
				value: dragAndDropContext,
				children: [
					u(ModularSection, {
						rootClass: "fjs-palette-container",
						section: "palette",
						children: u(Palette, {})
					}),
					u("div", {
						ref: formContainerRef,
						class: "fjs-form-container",
						children: u(FormContext.Provider, {
							value: formContext,
							children: u(FormRenderContext.Provider, {
								value: formRenderContext,
								children: u(FormComponent, {
									onSubmit,
									onReset
								})
							})
						})
					}),
					u(CreatePreview, {})
				]
			}),
			hasDefaultPropertiesPanel && u("div", {
				class: "fjs-editor-properties-container",
				ref: propertiesPanelRef
			}),
			u(ModularSection, {
				rootClass: "fjs-render-injector-container",
				section: "renderInjector",
				children: u(InjectedRendersRoot, {})
			})
		] })
	});
}
function getFormFieldIndex(parent, formField) {
	let fieldFormIndex = parent.components.length;
	parent.components.forEach(({ id }, index) => {
		if (id === formField.id) fieldFormIndex = index;
	});
	return fieldFormIndex;
}
function CreatePreview(props) {
	const { drake } = x(DragAndDropContext);
	const formFields = useService$1("formFields");
	y(() => {
		if (!drake) return;
		function handleCloned(clone, original, type) {
			const fieldType = clone.dataset.fieldType;
			if (fieldType) {
				const paletteEntry = findPaletteEntry(fieldType, formFields);
				if (!paletteEntry) return;
				const { label } = paletteEntry;
				const Icon = getPaletteIcon(paletteEntry);
				clone.innerHTML = "";
				clone.class = "gu-mirror";
				clone.classList.add("fjs-field-preview-container");
				if (original.classList.contains("fjs-palette-field")) clone.classList.add("cds--col");
				G(u(FieldDragPreview, {
					label,
					Icon
				}), clone);
			} else {
				[
					"fjs-context-pad",
					"fjs-row-dragger",
					"fjs-debug-columns"
				].forEach((cls) => {
					const cloneNode = clone.querySelectorAll("." + cls);
					cloneNode.length && cloneNode.forEach((e) => e.remove());
				});
				clone.classList.add("cds--grid");
				clone.classList.add("cds--grid--condensed");
			}
		}
		drake.on("cloned", handleCloned);
		return () => drake.off("cloned", handleCloned);
	}, [drake, formFields]);
	return null;
}
function findPaletteEntry(type, formFields) {
	return collectPaletteEntries(formFields).find((entry) => entry.type === type);
}
function defaultPropertiesPanel(propertiesPanelConfig) {
	return !(propertiesPanelConfig && propertiesPanelConfig.parent);
}
function getRemoveButtonTitle(formField, formFields) {
	const entry = findPaletteEntry(formField.type, formFields);
	if (!entry) return "Remove form field";
	return `Remove ${entry.label}`;
}
var Renderer = class {
	constructor(renderConfig, eventBus, formEditor, injector) {
		const { container, compact = false } = renderConfig;
		eventBus.on("form.init", function() {
			eventBus.fire("canvas.init", {
				svg: container,
				viewport: null
			});
		});
		container.addEventListener("mouseover", function() {
			if (document.activeElement === document.body) container.focus({ preventScroll: true });
		});
		container.addEventListener("click", function(event) {
			if (!container.contains(document.activeElement)) container.focus({ preventScroll: true });
		});
		const App = () => {
			const [state, setState] = d(formEditor._getState());
			const formEditorContext = { getService(type, strict = true) {
				return injector.get(type, strict);
			} };
			formEditor.on("changed", (newState) => {
				setState(newState);
			});
			const { schema } = state;
			if (!schema) return null;
			return u("div", {
				class: `fjs-container fjs-editor-container ${compact ? "fjs-editor-compact" : ""}`,
				children: u(FormEditorContext.Provider, {
					value: formEditorContext,
					children: u(FormEditor$1, {})
				})
			});
		};
		eventBus.on("form.init", () => {
			G(u(App, {}), container);
		});
		eventBus.on("form.destroy", () => {
			G(null, container);
		});
	}
};
Renderer.$inject = [
	"config.renderer",
	"eventBus",
	"formEditor",
	"injector"
];
var CoreModule = {
	__depends__: [{
		__init__: ["formFields", "renderer"],
		formFields: ["type", EditorFormFields],
		renderer: ["type", Renderer]
	}],
	debounce: ["factory", DebounceFactory],
	eventBus: ["type", EventBus],
	importer: ["type", Importer],
	formFieldRegistry: ["type", FormFieldRegistry],
	pathRegistry: ["type", PathRegistry],
	formLayouter: ["type", FormLayouter],
	formLayoutValidator: ["type", FormLayoutValidator],
	fieldFactory: ["type", FieldFactory]
};
/**
* @typedef {import('didi').Injector} Injector
*
* @typedef {import('../../core/EventBus').default} EventBus
*/
var NOT_REGISTERED_ERROR = "is not a registered action", IS_REGISTERED_ERROR = "is already registered";
/**
* An interface that provides access to modeling actions by decoupling
* the one who requests the action to be triggered and the trigger itself.
*
* It's possible to add new actions by registering them with ´registerAction´
* and likewise unregister existing ones with ´unregisterAction´.
*
*
* ## Life-Cycle and configuration
*
* The editor actions will wait for diagram initialization before
* registering default actions _and_ firing an `editorActions.init` event.
*
* Interested parties may listen to the `editorActions.init` event with
* low priority to check, which actions got registered. Other components
* may use the event to register their own actions via `registerAction`.
*
* @param {EventBus} eventBus
* @param {Injector} injector
*/
function EditorActions(eventBus, injector) {
	this._actions = {};
	var self = this;
	eventBus.on("diagram.init", function() {
		self._registerDefaultActions(injector);
		eventBus.fire("editorActions.init", { editorActions: self });
	});
}
EditorActions.$inject = ["eventBus", "injector"];
/**
* Register default actions.
*
* @param {Injector} injector
*/
EditorActions.prototype._registerDefaultActions = function(injector) {
	var commandStack = injector.get("commandStack", false);
	var modeling = injector.get("modeling", false);
	var selection = injector.get("selection", false);
	var zoomScroll = injector.get("zoomScroll", false);
	var copyPaste = injector.get("copyPaste", false);
	var canvas = injector.get("canvas", false);
	var rules = injector.get("rules", false);
	var keyboardMove = injector.get("keyboardMove", false);
	var keyboardMoveSelection = injector.get("keyboardMoveSelection", false);
	if (commandStack) {
		this.register("undo", function() {
			commandStack.undo();
		});
		this.register("redo", function() {
			commandStack.redo();
		});
	}
	if (copyPaste && selection) this.register("copy", function() {
		var selectedElements = selection.get();
		if (selectedElements.length) return copyPaste.copy(selectedElements);
	});
	if (copyPaste) this.register("paste", function() {
		copyPaste.paste();
	});
	if (zoomScroll) this.register("stepZoom", function(opts) {
		zoomScroll.stepZoom(opts.value);
	});
	if (canvas) this.register("zoom", function(opts) {
		canvas.zoom(opts.value);
	});
	if (modeling && selection && rules) this.register("removeSelection", function() {
		var selectedElements = selection.get();
		if (!selectedElements.length) return;
		var allowed = rules.allowed("elements.delete", { elements: selectedElements }), removableElements;
		if (allowed === false) return;
		else if (isArray(allowed)) removableElements = allowed;
		else removableElements = selectedElements;
		if (removableElements.length) modeling.removeElements(removableElements.slice());
	});
	if (keyboardMove) this.register("moveCanvas", function(opts) {
		keyboardMove.moveCanvas(opts);
	});
	if (keyboardMoveSelection) this.register("moveSelection", function(opts) {
		keyboardMoveSelection.moveSelection(opts.direction, opts.accelerated);
	});
};
/**
* Triggers a registered action
*
* @param {string} action
* @param {Object} opts
*
* @return {unknown} Returns what the registered listener returns
*/
EditorActions.prototype.trigger = function(action, opts) {
	if (!this._actions[action]) throw error(action, NOT_REGISTERED_ERROR);
	return this._actions[action](opts);
};
/**
* Registers a collections of actions.
* The key of the object will be the name of the action.
*
* @example
*
* ```javascript
* var actions = {
*   spaceTool: function() {
*     spaceTool.activateSelection();
*   },
*   lassoTool: function() {
*     lassoTool.activateSelection();
*   }
* ];
*
* editorActions.register(actions);
*
* editorActions.isRegistered('spaceTool'); // true
* ```
*
* @param {Object} actions
*/
EditorActions.prototype.register = function(actions, listener) {
	var self = this;
	if (typeof actions === "string") return this._registerAction(actions, listener);
	forEach(actions, function(listener, action) {
		self._registerAction(action, listener);
	});
};
/**
* Registers a listener to an action key
*
* @param {string} action
* @param {Function} listener
*/
EditorActions.prototype._registerAction = function(action, listener) {
	if (this.isRegistered(action)) throw error(action, IS_REGISTERED_ERROR);
	this._actions[action] = listener;
};
/**
* Unregister an existing action
*
* @param {string} action
*/
EditorActions.prototype.unregister = function(action) {
	if (!this.isRegistered(action)) throw error(action, NOT_REGISTERED_ERROR);
	this._actions[action] = void 0;
};
/**
* Returns the identifiers of all currently registered editor actions
*
* @return {string[]}
*/
EditorActions.prototype.getActions = function() {
	return Object.keys(this._actions);
};
/**
* Checks wether the given action is registered
*
* @param {string} action
*
* @return {boolean}
*/
EditorActions.prototype.isRegistered = function(action) {
	return !!this._actions[action];
};
function error(action, message) {
	return /* @__PURE__ */ new Error(action + " " + message);
}
/**
* @type { import('didi').ModuleDeclaration }
*/
var BaseEditorActionsModule = {
	__init__: ["editorActions"],
	editorActions: ["type", EditorActions]
};
var FormEditorActions = class extends EditorActions {
	constructor(eventBus, injector) {
		super(eventBus, injector);
		eventBus.on("form.init", () => {
			this._registerDefaultActions(injector);
			eventBus.fire("editorActions.init", { editorActions: this });
		});
	}
	_registerDefaultActions(injector) {
		const commandStack = injector.get("commandStack", false), formFieldRegistry = injector.get("formFieldRegistry", false), selection = injector.get("selection", false);
		if (commandStack) {
			this.register("undo", () => {
				commandStack.undo();
			});
			this.register("redo", () => {
				commandStack.redo();
			});
		}
		if (formFieldRegistry && selection) this.register("selectFormField", (options = {}) => {
			const { id } = options;
			if (!id) return;
			const formField = formFieldRegistry.get(id);
			if (formField) selection.set(formField);
		});
	}
};
FormEditorActions.$inject = ["eventBus", "injector"];
var EditorActionsModule = {
	__depends__: [BaseEditorActionsModule],
	editorActions: ["type", FormEditorActions]
};
var EditorTemplating = class {
	isTemplate(value) {
		return isString(value) && (value.startsWith("=") || /{{/.test(value));
	}
	evaluate(template) {
		return template;
	}
};
EditorTemplating.$inject = [];
var EditorExpressionLanguageModule = {
	__init__: ["expressionLanguage", "templating"],
	expressionLanguage: ["type", FeelExpressionLanguage],
	templating: ["type", EditorTemplating]
};
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
/**
* @typedef {import('../../core/EventBus').default} EventBus
*
* @typedef {({ keyEvent: KeyboardEvent }) => any} Listener
*/
var KEYDOWN_EVENT = "keyboard.keydown", KEYUP_EVENT = "keyboard.keyup";
var DEFAULT_PRIORITY$2 = 1e3;
var compatMessage = "Keyboard binding is now implicit; explicit binding to an element got removed. For more information, see https://github.com/bpmn-io/diagram-js/issues/661";
/**
* A keyboard abstraction that may be activated and
* deactivated by users at will, consuming global key events
* and triggering diagram actions.
*
* For keys pressed down, keyboard fires `keyboard.keydown` event.
* The event context contains one field which is `KeyboardEvent` event.
*
* The implementation fires the following key events that allow
* other components to hook into key handling:
*
*  - keyboard.bind
*  - keyboard.unbind
*  - keyboard.init
*  - keyboard.destroy
*
* All events contain one field which is node.
*
* Specify the initial keyboard binding state via the
* `keyboard.bind=true|false` configuration option.
*
* @param {Object} config
* @param {boolean} [config.bind]
* @param {EventBus} eventBus
*/
function Keyboard(config, eventBus) {
	var self = this;
	this._config = config = config || {};
	this._eventBus = eventBus;
	this._keydownHandler = this._keydownHandler.bind(this);
	this._keyupHandler = this._keyupHandler.bind(this);
	eventBus.on("diagram.destroy", function() {
		self._fire("destroy");
		self.unbind();
	});
	if (config.bindTo) console.error("unsupported configuration <keyboard.bindTo>", new Error(compatMessage));
	var bind = config && config.bind !== false;
	eventBus.on("canvas.init", function(event) {
		self._target = event.svg;
		if (bind) self.bind();
		self._fire("init");
	});
}
Keyboard.$inject = ["config.keyboard", "eventBus"];
Keyboard.prototype._keydownHandler = function(event) {
	this._keyHandler(event, KEYDOWN_EVENT);
};
Keyboard.prototype._keyupHandler = function(event) {
	this._keyHandler(event, KEYUP_EVENT);
};
Keyboard.prototype._keyHandler = function(event, type) {
	var eventBusResult;
	if (this._isEventIgnored(event)) return;
	var context = { keyEvent: event };
	eventBusResult = this._eventBus.fire(type || KEYDOWN_EVENT, context);
	if (eventBusResult) event.preventDefault();
};
Keyboard.prototype._isEventIgnored = function(event) {
	return false;
};
/**
* Bind keyboard events to the given DOM node.
*
* @overlord
* @deprecated No longer in use since version 15.0.0.
*
* @param {EventTarget} node
*/
/**
* Bind keyboard events to the canvas node.
*/
Keyboard.prototype.bind = function(node) {
	if (node) console.error("unsupported argument <node>", new Error(compatMessage));
	this.unbind();
	node = this._node = this._target;
	event.bind(node, "keydown", this._keydownHandler);
	event.bind(node, "keyup", this._keyupHandler);
	this._fire("bind");
};
/**
* @return {EventTarget}
*/
Keyboard.prototype.getBinding = function() {
	return this._node;
};
Keyboard.prototype.unbind = function() {
	var node = this._node;
	if (node) {
		this._fire("unbind");
		event.unbind(node, "keydown", this._keydownHandler);
		event.unbind(node, "keyup", this._keyupHandler);
	}
	this._node = null;
};
/**
* @param {string} event
*/
Keyboard.prototype._fire = function(event) {
	this._eventBus.fire("keyboard." + event, { node: this._node });
};
/**
* Add a listener function that is notified with `KeyboardEvent` whenever
* the keyboard is bound and the user presses a key. If no priority is
* provided, the default value of 1000 is used.
*
* @param {number} [priority]
* @param {Listener} listener
* @param {string} [type='keyboard.keydown']
*/
Keyboard.prototype.addListener = function(priority, listener, type) {
	if (isFunction(priority)) {
		type = listener;
		listener = priority;
		priority = DEFAULT_PRIORITY$2;
	}
	this._eventBus.on(type || KEYDOWN_EVENT, priority, listener);
};
/**
* Remove a listener function.
*
* @param {Listener} listener
* @param {string} [type='keyboard.keydown']
*/
Keyboard.prototype.removeListener = function(listener, type) {
	this._eventBus.off(type || KEYDOWN_EVENT, listener);
};
Keyboard.prototype.hasModifier = hasModifier;
Keyboard.prototype.isCmd = isCmd;
Keyboard.prototype.isShift = isShift;
Keyboard.prototype.isKey = isKey;
var LOW_PRIORITY$1 = 500;
/**
* Adds default keyboard bindings.
*
* This does not pull in any features will bind only actions that
* have previously been registered against the editorActions component.
*
* @param {EventBus} eventBus
* @param {Keyboard} keyboard
*/
function KeyboardBindings(eventBus, keyboard) {
	var self = this;
	eventBus.on("editorActions.init", LOW_PRIORITY$1, function(event) {
		var editorActions = event.editorActions;
		self.registerBindings(keyboard, editorActions);
	});
}
KeyboardBindings.$inject = ["eventBus", "keyboard"];
/**
* Register available keyboard bindings.
*
* @param {Keyboard} keyboard
* @param {EditorActions} editorActions
*/
KeyboardBindings.prototype.registerBindings = function(keyboard, editorActions) {
	/**
	* Add keyboard binding if respective editor action
	* is registered.
	*
	* @param {string} action name
	* @param {Function} fn that implements the key binding
	*/
	function addListener(action, fn) {
		if (editorActions.isRegistered(action)) keyboard.addListener(fn);
	}
	addListener("undo", function(context) {
		var event = context.keyEvent;
		if (isUndo(event)) {
			editorActions.trigger("undo");
			return true;
		}
	});
	addListener("redo", function(context) {
		var event = context.keyEvent;
		if (isRedo(event)) {
			editorActions.trigger("redo");
			return true;
		}
	});
	addListener("copy", function(context) {
		var event = context.keyEvent;
		if (isCopy(event)) {
			editorActions.trigger("copy");
			return true;
		}
	});
	addListener("paste", function(context) {
		var event = context.keyEvent;
		if (isPaste(event)) {
			editorActions.trigger("paste");
			return true;
		}
	});
	addListener("stepZoom", function(context) {
		var event = context.keyEvent;
		if (isKey([
			"+",
			"Add",
			"="
		], event) && isCmd(event)) {
			editorActions.trigger("stepZoom", { value: 1 });
			return true;
		}
	});
	addListener("stepZoom", function(context) {
		var event = context.keyEvent;
		if (isKey(["-", "Subtract"], event) && isCmd(event)) {
			editorActions.trigger("stepZoom", { value: -1 });
			return true;
		}
	});
	addListener("zoom", function(context) {
		var event = context.keyEvent;
		if (isKey("0", event) && isCmd(event)) {
			editorActions.trigger("zoom", { value: 1 });
			return true;
		}
	});
	addListener("removeSelection", function(context) {
		var event = context.keyEvent;
		if (isKey([
			"Backspace",
			"Delete",
			"Del"
		], event)) {
			editorActions.trigger("removeSelection");
			return true;
		}
	});
};
/**
* @type { import('didi').ModuleDeclaration }
*/
var KeyboardModule = {
	__init__: ["keyboard", "keyboardBindings"],
	keyboard: ["type", Keyboard],
	keyboardBindings: ["type", KeyboardBindings]
};
var LOW_PRIORITY = 500;
var FormEditorKeyboardBindings = class {
	constructor(eventBus, keyboard) {
		eventBus.on("editorActions.init", LOW_PRIORITY, (event) => {
			const { editorActions } = event;
			this.registerBindings(keyboard, editorActions);
		});
	}
	registerBindings(keyboard, editorActions) {
		function addListener(action, fn) {
			if (editorActions.isRegistered(action)) keyboard.addListener(fn);
		}
		addListener("undo", (context) => {
			const { keyEvent } = context;
			if (isUndo(keyEvent)) {
				editorActions.trigger("undo");
				return true;
			}
		});
		addListener("redo", (context) => {
			const { keyEvent } = context;
			if (isRedo(keyEvent)) {
				editorActions.trigger("redo");
				return true;
			}
		});
	}
};
FormEditorKeyboardBindings.$inject = ["eventBus", "keyboard"];
var FormEditorKeyboardModule = {
	__depends__: [KeyboardModule],
	__init__: ["keyboardBindings"],
	keyboardBindings: ["type", FormEditorKeyboardBindings]
};
var DraggingModule = {
	__init__: ["dragging"],
	dragging: ["type", Dragging]
};
/**
* @typedef {import('didi').Injector} Injector
*
* @typedef {import('../core/Types').ElementLike} ElementLike
*
* @typedef {import('../core/EventBus').default} EventBus
* @typedef {import('./CommandHandler').default} CommandHandler
*
* @typedef { any } CommandContext
* @typedef { {
*   new (...args: any[]) : CommandHandler
* } } CommandHandlerConstructor
* @typedef { {
*   [key: string]: CommandHandler;
* } } CommandHandlerMap
* @typedef { {
*   command: string;
*   context: any;
*   id?: any;
* } } CommandStackAction
* @typedef { {
*   actions: CommandStackAction[];
*   dirty: ElementLike[];
*   trigger: 'execute' | 'undo' | 'redo' | 'clear' | null;
*   atomic?: boolean;
* } } CurrentExecution
*/
/**
* A service that offers un- and redoable execution of commands.
*
* The command stack is responsible for executing modeling actions
* in a un- and redoable manner. To do this it delegates the actual
* command execution to {@link CommandHandler}s.
*
* Command handlers provide {@link CommandHandler#execute(ctx)} and
* {@link CommandHandler#revert(ctx)} methods to un- and redo a command
* identified by a command context.
*
*
* ## Life-Cycle events
*
* In the process the command stack fires a number of life-cycle events
* that other components to participate in the command execution.
*
*    * preExecute
*    * preExecuted
*    * execute
*    * executed
*    * postExecute
*    * postExecuted
*    * revert
*    * reverted
*
* A special event is used for validating, whether a command can be
* performed prior to its execution.
*
*    * canExecute
*
* Each of the events is fired as `commandStack.{eventName}` and
* `commandStack.{commandName}.{eventName}`, respectively. This gives
* components fine grained control on where to hook into.
*
* The event object fired transports `command`, the name of the
* command and `context`, the command context.
*
*
* ## Creating Command Handlers
*
* Command handlers should provide the {@link CommandHandler#execute(ctx)}
* and {@link CommandHandler#revert(ctx)} methods to implement
* redoing and undoing of a command.
*
* A command handler _must_ ensure undo is performed properly in order
* not to break the undo chain. It must also return the shapes that
* got changed during the `execute` and `revert` operations.
*
* Command handlers may execute other modeling operations (and thus
* commands) in their `preExecute(d)` and `postExecute(d)` phases. The command
* stack will properly group all commands together into a logical unit
* that may be re- and undone atomically.
*
* Command handlers must not execute other commands from within their
* core implementation (`execute`, `revert`).
*
*
* ## Change Tracking
*
* During the execution of the CommandStack it will keep track of all
* elements that have been touched during the command's execution.
*
* At the end of the CommandStack execution it will notify interested
* components via an 'elements.changed' event with all the dirty
* elements.
*
* The event can be picked up by components that are interested in the fact
* that elements have been changed. One use case for this is updating
* their graphical representation after moving / resizing or deletion.
*
* @see CommandHandler
*
* @param {EventBus} eventBus
* @param {Injector} injector
*/
function CommandStack(eventBus, injector) {
	/**
	* A map of all registered command handlers.
	*
	* @type {CommandHandlerMap}
	*/
	this._handlerMap = {};
	/**
	* A stack containing all re/undoable actions on the diagram
	*
	* @type {CommandStackAction[]}
	*/
	this._stack = [];
	/**
	* The current index on the stack
	*
	* @type {number}
	*/
	this._stackIdx = -1;
	/**
	* Current active commandStack execution
	*
	* @type {CurrentExecution}
	*/
	this._currentExecution = {
		actions: [],
		dirty: [],
		trigger: null
	};
	/**
	* @type {Injector}
	*/
	this._injector = injector;
	/**
	* @type EventBus
	*/
	this._eventBus = eventBus;
	/**
	* @type { number }
	*/
	this._uid = 1;
	eventBus.on(["diagram.destroy", "diagram.clear"], function() {
		this.clear(false);
	}, this);
}
CommandStack.$inject = ["eventBus", "injector"];
/**
* Execute a command.
*
* @param {string} command The command to execute.
* @param {CommandContext} context The context with which to execute the command.
*/
CommandStack.prototype.execute = function(command, context) {
	if (!command) throw new Error("command required");
	this._currentExecution.trigger = "execute";
	const action = {
		command,
		context
	};
	this._pushAction(action);
	this._internalExecute(action);
	this._popAction();
};
/**
* Check whether a command can be executed.
*
* Implementors may hook into the mechanism on two ways:
*
*   * in event listeners:
*
*     Users may prevent the execution via an event listener.
*     It must prevent the default action for `commandStack.(<command>.)canExecute` events.
*
*   * in command handlers:
*
*     If the method {@link CommandHandler#canExecute} is implemented in a handler
*     it will be called to figure out whether the execution is allowed.
*
* @param {string} command The command to execute.
* @param {CommandContext} context The context with which to execute the command.
*
* @return {boolean} Whether the command can be executed with the given context.
*/
CommandStack.prototype.canExecute = function(command, context) {
	const action = {
		command,
		context
	};
	const handler = this._getHandler(command);
	let result = this._fire(command, "canExecute", action);
	if (result === void 0) {
		if (!handler) return false;
		if (handler.canExecute) result = handler.canExecute(context);
	}
	return result;
};
/**
* Clear the command stack, erasing all undo / redo history.
*
* @param {boolean} [emit=true] Whether to fire an event. Defaults to `true`.
*/
CommandStack.prototype.clear = function(emit) {
	this._stack.length = 0;
	this._stackIdx = -1;
	if (emit !== false) this._fire("changed", { trigger: "clear" });
};
/**
* Undo last command(s)
*/
CommandStack.prototype.undo = function() {
	let action = this._getUndoAction(), next;
	if (action) {
		this._currentExecution.trigger = "undo";
		this._pushAction(action);
		while (action) {
			this._internalUndo(action);
			next = this._getUndoAction();
			if (!next || next.id !== action.id) break;
			action = next;
		}
		this._popAction();
	}
};
/**
* Redo last command(s)
*/
CommandStack.prototype.redo = function() {
	let action = this._getRedoAction(), next;
	if (action) {
		this._currentExecution.trigger = "redo";
		this._pushAction(action);
		while (action) {
			this._internalExecute(action, true);
			next = this._getRedoAction();
			if (!next || next.id !== action.id) break;
			action = next;
		}
		this._popAction();
	}
};
/**
* Register a handler instance with the command stack.
*
* @param {string} command Command to be executed.
* @param {CommandHandler} handler Handler to execute the command.
*/
CommandStack.prototype.register = function(command, handler) {
	this._setHandler(command, handler);
};
/**
* Register a handler type with the command stack  by instantiating it and
* injecting its dependencies.
*
* @param {string} command Command to be executed.
* @param {CommandHandlerConstructor} handlerCls Constructor to instantiate a {@link CommandHandler}.
*/
CommandStack.prototype.registerHandler = function(command, handlerCls) {
	if (!command || !handlerCls) throw new Error("command and handlerCls must be defined");
	const handler = this._injector.instantiate(handlerCls);
	this.register(command, handler);
};
/**
* @return {boolean}
*/
CommandStack.prototype.canUndo = function() {
	return !!this._getUndoAction();
};
/**
* @return {boolean}
*/
CommandStack.prototype.canRedo = function() {
	return !!this._getRedoAction();
};
CommandStack.prototype._getRedoAction = function() {
	return this._stack[this._stackIdx + 1];
};
CommandStack.prototype._getUndoAction = function() {
	return this._stack[this._stackIdx];
};
CommandStack.prototype._internalUndo = function(action) {
	const command = action.command, context = action.context;
	const handler = this._getHandler(command);
	this._atomicDo(() => {
		this._fire(command, "revert", action);
		if (handler.revert) this._markDirty(handler.revert(context));
		this._revertedAction(action);
		this._fire(command, "reverted", action);
	});
};
CommandStack.prototype._fire = function(command, qualifier, event) {
	if (arguments.length < 3) {
		event = qualifier;
		qualifier = null;
	}
	const names = qualifier ? [command + "." + qualifier, qualifier] : [command];
	let result;
	event = this._eventBus.createEvent(event);
	for (const name of names) {
		result = this._eventBus.fire("commandStack." + name, event);
		if (event.cancelBubble) break;
	}
	return result;
};
CommandStack.prototype._createId = function() {
	return this._uid++;
};
CommandStack.prototype._atomicDo = function(fn) {
	const execution = this._currentExecution;
	execution.atomic = true;
	try {
		fn();
	} finally {
		execution.atomic = false;
	}
};
CommandStack.prototype._internalExecute = function(action, redo) {
	const command = action.command, context = action.context;
	const handler = this._getHandler(command);
	if (!handler) throw new Error("no command handler registered for <" + command + ">");
	this._pushAction(action);
	if (!redo) {
		this._fire(command, "preExecute", action);
		if (handler.preExecute) handler.preExecute(context);
		this._fire(command, "preExecuted", action);
	}
	this._atomicDo(() => {
		this._fire(command, "execute", action);
		if (handler.execute) this._markDirty(handler.execute(context));
		this._executedAction(action, redo);
		this._fire(command, "executed", action);
	});
	if (!redo) {
		this._fire(command, "postExecute", action);
		if (handler.postExecute) handler.postExecute(context);
		this._fire(command, "postExecuted", action);
	}
	this._popAction();
};
CommandStack.prototype._pushAction = function(action) {
	const execution = this._currentExecution, actions = execution.actions;
	const baseAction = actions[0];
	if (execution.atomic) throw new Error("illegal invocation in <execute> or <revert> phase (action: " + action.command + ")");
	if (!action.id) action.id = baseAction && baseAction.id || this._createId();
	actions.push(action);
};
CommandStack.prototype._popAction = function() {
	const execution = this._currentExecution, trigger = execution.trigger, actions = execution.actions, dirty = execution.dirty;
	actions.pop();
	if (!actions.length) {
		this._eventBus.fire("elements.changed", { elements: uniqueBy("id", dirty.reverse()) });
		dirty.length = 0;
		this._fire("changed", { trigger });
		execution.trigger = null;
	}
};
CommandStack.prototype._markDirty = function(elements) {
	const execution = this._currentExecution;
	if (!elements) return;
	elements = isArray(elements) ? elements : [elements];
	execution.dirty = execution.dirty.concat(elements);
};
CommandStack.prototype._executedAction = function(action, redo) {
	const stackIdx = ++this._stackIdx;
	if (!redo) this._stack.splice(stackIdx, this._stack.length, action);
};
CommandStack.prototype._revertedAction = function(action) {
	this._stackIdx--;
};
CommandStack.prototype._getHandler = function(command) {
	return this._handlerMap[command];
};
CommandStack.prototype._setHandler = function(command, handler) {
	if (!command || !handler) throw new Error("command and handler required");
	if (this._handlerMap[command]) throw new Error("overriding handler for command <" + command + ">");
	this._handlerMap[command] = handler;
};
/**
* @type { import('didi').ModuleDeclaration }
*/
var commandModule = { commandStack: ["type", CommandStack] };
/**
* @typedef {import('../core/Types').ElementLike} ElementLike
* @typedef {import('../core/EventBus').default} EventBus
* @typedef {import('./CommandStack').CommandContext} CommandContext
*
* @typedef {string|string[]} Events
* @typedef { (context: CommandContext) => ElementLike[] | void } HandlerFunction
* @typedef { (context: CommandContext) => void } ComposeHandlerFunction
*/
var DEFAULT_PRIORITY$1 = 1e3;
/**
* A utility that can be used to plug into the command execution for
* extension and/or validation.
*
* @class
* @constructor
*
* @example
*
* ```javascript
* import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';
*
* class CommandLogger extends CommandInterceptor {
*   constructor(eventBus) {
*     super(eventBus);
*
*   this.preExecute('shape.create', (event) => {
*     console.log('commandStack.shape-create.preExecute', event);
*   });
* }
* ```
*
* @param {EventBus} eventBus
*/
function CommandInterceptor(eventBus) {
	/**
	* @type {EventBus}
	*/
	this._eventBus = eventBus;
}
CommandInterceptor.$inject = ["eventBus"];
function unwrapEvent(fn, that) {
	return function(event) {
		return fn.call(that || null, event.context, event.command, event);
	};
}
/**
* Intercept a command during one of the phases.
*
* @param {Events} [events] command(s) to intercept
* @param {string} [hook] phase to intercept
* @param {number} [priority]
* @param {ComposeHandlerFunction|HandlerFunction} handlerFn
* @param {boolean} [unwrap] whether the event should be unwrapped
* @param {any} [that]
*/
CommandInterceptor.prototype.on = function(events, hook, priority, handlerFn, unwrap, that) {
	if (isFunction(hook) || isNumber(hook)) {
		that = unwrap;
		unwrap = handlerFn;
		handlerFn = priority;
		priority = hook;
		hook = null;
	}
	if (isFunction(priority)) {
		that = unwrap;
		unwrap = handlerFn;
		handlerFn = priority;
		priority = DEFAULT_PRIORITY$1;
	}
	if (isObject(unwrap)) {
		that = unwrap;
		unwrap = false;
	}
	if (!isFunction(handlerFn)) throw new Error("handlerFn must be a function");
	if (!isArray(events)) events = [events];
	var eventBus = this._eventBus;
	forEach(events, function(event) {
		var fullEvent = [
			"commandStack",
			event,
			hook
		].filter(function(e) {
			return e;
		}).join(".");
		eventBus.on(fullEvent, priority, unwrap ? unwrapEvent(handlerFn, that) : handlerFn, that);
	});
};
/**
* Add a <canExecute> phase of command interceptor.
*
* @param {Events} [events] command(s) to intercept
* @param {number} [priority]
* @param {ComposeHandlerFunction|HandlerFunction} handlerFn
* @param {boolean} [unwrap] whether the event should be unwrapped
* @param {any} [that]
*/
CommandInterceptor.prototype.canExecute = createHook("canExecute");
/**
* Add a <preExecute> phase of command interceptor.
*
* @param {Events} [events] command(s) to intercept
* @param {number} [priority]
* @param {ComposeHandlerFunction|HandlerFunction} handlerFn
* @param {boolean} [unwrap] whether the event should be unwrapped
* @param {any} [that]
*/
CommandInterceptor.prototype.preExecute = createHook("preExecute");
/**
* Add a <preExecuted> phase of command interceptor.
*
* @param {Events} [events] command(s) to intercept
* @param {number} [priority]
* @param {ComposeHandlerFunction|HandlerFunction} handlerFn
* @param {boolean} [unwrap] whether the event should be unwrapped
* @param {any} [that]
*/
CommandInterceptor.prototype.preExecuted = createHook("preExecuted");
/**
* Add a <execute> phase of command interceptor.
*
* @param {Events} [events] command(s) to intercept
* @param {number} [priority]
* @param {ComposeHandlerFunction|HandlerFunction} handlerFn
* @param {boolean} [unwrap] whether the event should be unwrapped
* @param {any} [that]
*/
CommandInterceptor.prototype.execute = createHook("execute");
/**
* Add a <executed> phase of command interceptor.
*
* @param {Events} [events] command(s) to intercept
* @param {number} [priority]
* @param {ComposeHandlerFunction|HandlerFunction} handlerFn
* @param {boolean} [unwrap] whether the event should be unwrapped
* @param {any} [that]
*/
CommandInterceptor.prototype.executed = createHook("executed");
/**
* Add a <postExecute> phase of command interceptor.
*
* @param {Events} [events] command(s) to intercept
* @param {number} [priority]
* @param {ComposeHandlerFunction|HandlerFunction} handlerFn
* @param {boolean} [unwrap] whether the event should be unwrapped
* @param {any} [that]
*/
CommandInterceptor.prototype.postExecute = createHook("postExecute");
/**
* Add a <postExecuted> phase of command interceptor.
*
* @param {Events} [events] command(s) to intercept
* @param {number} [priority]
* @param {ComposeHandlerFunction|HandlerFunction} handlerFn
* @param {boolean} [unwrap] whether the event should be unwrapped
* @param {any} [that]
*/
CommandInterceptor.prototype.postExecuted = createHook("postExecuted");
/**
* Add a <revert> phase of command interceptor.
*
* @param {Events} [events] command(s) to intercept
* @param {number} [priority]
* @param {ComposeHandlerFunction|HandlerFunction} handlerFn
* @param {boolean} [unwrap] whether the event should be unwrapped
* @param {any} [that]
*/
CommandInterceptor.prototype.revert = createHook("revert");
/**
* Add a <reverted> phase of command interceptor.
*
* @param {Events} [events] command(s) to intercept
* @param {number} [priority]
* @param {ComposeHandlerFunction|HandlerFunction} handlerFn
* @param {boolean} [unwrap] whether the event should be unwrapped
* @param {any} [that]
*/
CommandInterceptor.prototype.reverted = createHook("reverted");
function createHook(hook) {
	/**
	* @this {CommandInterceptor}
	*
	* @param {Events} [events]
	* @param {number} [priority]
	* @param {ComposeHandlerFunction|HandlerFunction} handlerFn
	* @param {boolean} [unwrap]
	* @param {any} [that]
	*/
	const hookFn = function(events, priority, handlerFn, unwrap, that) {
		if (isFunction(events) || isNumber(events)) {
			that = unwrap;
			unwrap = handlerFn;
			handlerFn = priority;
			priority = events;
			events = null;
		}
		this.on(events, hook, priority, handlerFn, unwrap, that);
	};
	return hookFn;
}
var IdBehavior = class extends CommandInterceptor {
	constructor(eventBus, modeling) {
		super(eventBus);
		this.preExecute("formField.remove", function(context) {
			const { formField } = context;
			const { id } = formField;
			modeling.unclaimId(formField, id);
		}, true);
		this.preExecute("formField.edit", function(context) {
			const { formField, properties } = context;
			if ("id" in properties) {
				modeling.unclaimId(formField, formField.id);
				modeling.claimId(formField, properties.id);
			}
		}, true);
	}
};
IdBehavior.$inject = ["eventBus", "modeling"];
var KeyBehavior = class extends CommandInterceptor {
	constructor(eventBus, modeling, formFields) {
		super(eventBus);
		this.preExecute("formField.remove", function(context) {
			const { formField } = context;
			const { key, type } = formField;
			const { config } = formFields.get(type);
			if (config.keyed) modeling.unclaimKey(formField, key);
		}, true);
		this.preExecute("formField.edit", function(context) {
			const { formField, properties } = context;
			const { key, type } = formField;
			const { config } = formFields.get(type);
			if (config.keyed && "key" in properties) {
				modeling.unclaimKey(formField, key);
				modeling.claimKey(formField, properties.key);
			}
		}, true);
	}
};
KeyBehavior.$inject = [
	"eventBus",
	"modeling",
	"formFields"
];
var PathBehavior = class extends CommandInterceptor {
	constructor(eventBus, modeling, formFields) {
		super(eventBus);
		this.preExecute("formField.remove", function(context) {
			const { formField } = context;
			const { path, type } = formField;
			const { config } = formFields.get(type);
			if (config.pathed) modeling.unclaimPath(formField, path);
		}, true);
		this.preExecute("formField.edit", function(context) {
			const { formField, properties } = context;
			const { path, type } = formField;
			const { config } = formFields.get(type);
			if (config.pathed && "path" in properties) {
				modeling.unclaimPath(formField, path);
				modeling.claimPath(formField, properties.path);
			}
		}, true);
	}
};
PathBehavior.$inject = [
	"eventBus",
	"modeling",
	"formFields"
];
var ValidateBehavior = class extends CommandInterceptor {
	constructor(eventBus) {
		super(eventBus);
		/**
		* Remove custom validation if <validationType> is about to be added.
		*/
		this.preExecute("formField.edit", function(context) {
			const { properties } = context;
			const { validate = {} } = properties;
			if (validate.validationType) {
				const newValidate = { ...validate };
				delete newValidate.minLength;
				delete newValidate.maxLength;
				delete newValidate.pattern;
				properties["validate"] = newValidate;
			}
		}, true);
	}
};
ValidateBehavior.$inject = ["eventBus"];
var OptionsSourceBehavior = class extends CommandInterceptor {
	constructor(eventBus) {
		super(eventBus);
		/**
		* Cleanup properties on changing the values source.
		*
		* 1) Remove other sources, e.g. set `values` => remove `valuesKey` and `valuesExpression`
		* 2) Remove default values for all other values sources
		*/
		this.preExecute("formField.edit", function(context) {
			const { properties } = context;
			const newProperties = {};
			if (!isValuesSourceUpdate(properties)) return;
			Object.values(OPTIONS_SOURCES).forEach((source) => {
				const path = OPTIONS_SOURCES_PATHS[source];
				if (get$1(properties, path) == void 0) newProperties[OPTIONS_SOURCES_PATHS[source]] = void 0;
			});
			if (get$1(properties, OPTIONS_SOURCES_PATHS[OPTIONS_SOURCES.EXPRESSION]) !== void 0 || get$1(properties, OPTIONS_SOURCES_PATHS[OPTIONS_SOURCES.INPUT]) !== void 0) newProperties["defaultValue"] = void 0;
			context.properties = {
				...properties,
				...newProperties
			};
		}, true);
	}
};
OptionsSourceBehavior.$inject = ["eventBus"];
function isValuesSourceUpdate(properties) {
	return Object.values(OPTIONS_SOURCES_PATHS).some((path) => {
		return get$1(properties, path) !== void 0;
	});
}
var COLUMNS_SOURCE_PROPERTIES = {
	columns: "columns",
	columnsExpression: "columnsExpression"
};
var ColumnsSourceBehavior = class extends CommandInterceptor {
	constructor(eventBus) {
		super(eventBus);
		this.preExecute("formField.edit", function(context) {
			const { properties, oldProperties } = context;
			if (!Object.values(COLUMNS_SOURCE_PROPERTIES).some((path) => {
				return get$1(properties, [path]) !== void 0;
			})) return;
			const columns = get$1(properties, [COLUMNS_SOURCE_PROPERTIES.columns]);
			const oldColumns = get$1(oldProperties, [COLUMNS_SOURCE_PROPERTIES.columns]);
			const columnsExpression = get$1(properties, [COLUMNS_SOURCE_PROPERTIES.columnsExpression]);
			const oldColumnsExpression = get$1(oldProperties, [COLUMNS_SOURCE_PROPERTIES.columnsExpression]);
			if (isArray(columns) && !isDefined(oldColumns)) {
				context.properties = {
					...properties,
					columnsExpression: void 0
				};
				return;
			}
			if (isString(columnsExpression) && !isString(oldColumnsExpression)) {
				context.properties = {
					...properties,
					columns: void 0
				};
				return;
			}
		}, true);
	}
};
ColumnsSourceBehavior.$inject = ["eventBus"];
var TableDataSourceBehavior = class extends CommandInterceptor {
	constructor(eventBus) {
		super(eventBus);
		this.preExecute("formField.add", function(context) {
			const { formField } = context;
			if (get$1(formField, ["type"]) !== "table") return;
			context.formField = {
				...formField,
				dataSource: `=${formField.id}`
			};
		}, true);
	}
};
TableDataSourceBehavior.$inject = ["eventBus"];
var BehaviorModule = {
	__init__: [
		"idBehavior",
		"keyBehavior",
		"pathBehavior",
		"validateBehavior",
		"optionsSourceBehavior",
		"columnsSourceBehavior",
		"tableDataSourceBehavior"
	],
	idBehavior: ["type", IdBehavior],
	keyBehavior: ["type", KeyBehavior],
	pathBehavior: ["type", PathBehavior],
	validateBehavior: ["type", ValidateBehavior],
	optionsSourceBehavior: ["type", OptionsSourceBehavior],
	columnsSourceBehavior: ["type", ColumnsSourceBehavior],
	tableDataSourceBehavior: ["type", TableDataSourceBehavior]
};
function arrayAdd$1(array, index, item) {
	array.splice(index, 0, item);
	return array;
}
function arrayRemove(array, index) {
	array.splice(index, 1);
	return array;
}
function updatePath(formFieldRegistry, formField, index) {
	refreshPathsRecursively(formField, [
		...formFieldRegistry.get(formField._parent)._path,
		"components",
		index
	]);
	return formField;
}
function refreshPathsRecursively(formField, path) {
	formField._path = path;
	(formField.components || []).forEach((component, index) => {
		refreshPathsRecursively(component, [
			...path,
			"components",
			index
		]);
	});
}
function updateRow(formField, rowId) {
	formField.layout = {
		...formField.layout || {},
		row: rowId
	};
	return formField;
}
var FormLayoutUpdater = class extends CommandInterceptor {
	constructor(eventBus, formLayouter, modeling, formEditor) {
		super(eventBus);
		this._eventBus = eventBus;
		this._formLayouter = formLayouter;
		this._modeling = modeling;
		this._formEditor = formEditor;
		this.preExecute([
			"formField.add",
			"formField.remove",
			"formField.move",
			"id.updateClaim"
		], (event) => this.updateRowIds(event));
		eventBus.on("changed", (context) => {
			const { schema } = context;
			this.updateLayout(schema);
		});
	}
	updateLayout(schema) {
		this._formLayouter.clear();
		this._formLayouter.calculateLayout(clone(schema));
	}
	updateRowIds(event) {
		const { schema } = this._formEditor._getState();
		const setRowIds = (parent) => {
			if (!parent.components || !parent.components.length) return;
			parent.components.forEach((formField) => {
				updateRow(formField, this._formLayouter.getRowForField(formField).id);
				setRowIds(formField);
			});
		};
		setRowIds(schema);
	}
};
FormLayoutUpdater.$inject = [
	"eventBus",
	"formLayouter",
	"modeling",
	"formEditor"
];
var AddFormFieldHandler = class {
	/**
	* @constructor
	* @param { import('../../../FormEditor').FormEditor } formEditor
	* @param { import('../../../core/FormFieldRegistry').FormFieldRegistry } formFieldRegistry
	*/
	constructor(formEditor, formFieldRegistry) {
		this._formEditor = formEditor;
		this._formFieldRegistry = formFieldRegistry;
	}
	execute(context) {
		const { formField, targetFormField, targetIndex } = context;
		const { schema } = this._formEditor._getState();
		const targetPath = [...targetFormField._path, "components"];
		formField._parent = targetFormField.id;
		arrayAdd$1(get$1(schema, targetPath), targetIndex, formField);
		get$1(schema, targetPath).forEach((formField, index) => updatePath(this._formFieldRegistry, formField, index));
		this._formFieldRegistry.add(formField);
		this._formEditor._setState({ schema });
	}
	revert(context) {
		const { formField, targetFormField, targetIndex } = context;
		const { schema } = this._formEditor._getState();
		const targetPath = [...targetFormField._path, "components"];
		arrayRemove(get$1(schema, targetPath), targetIndex);
		get$1(schema, targetPath).forEach((formField, index) => updatePath(this._formFieldRegistry, formField, index));
		this._formFieldRegistry.remove(formField);
		this._formEditor._setState({ schema });
	}
};
AddFormFieldHandler.$inject = ["formEditor", "formFieldRegistry"];
var EditFormFieldHandler = class {
	/**
	* @constructor
	* @param { import('../../../FormEditor').FormEditor } formEditor
	* @param { import('../../../core/FormFieldRegistry').FormFieldRegistry } formFieldRegistry
	*/
	constructor(formEditor, formFieldRegistry) {
		this._formEditor = formEditor;
		this._formFieldRegistry = formFieldRegistry;
	}
	execute(context) {
		const { formField, properties } = context;
		let { schema } = this._formEditor._getState();
		const oldProperties = {};
		for (let key in properties) {
			oldProperties[key] = formField[key];
			const property = properties[key];
			if (key === "id") {
				if (property !== formField.id) this._formFieldRegistry.updateId(formField, property);
			} else formField[key] = property;
		}
		context.oldProperties = oldProperties;
		this._formEditor._setState({ schema });
		return formField;
	}
	revert(context) {
		const { formField, oldProperties } = context;
		let { schema } = this._formEditor._getState();
		for (let key in oldProperties) {
			const property = oldProperties[key];
			if (key === "id") {
				if (property !== formField.id) this._formFieldRegistry.updateId(formField, property);
			} else formField[key] = property;
		}
		this._formEditor._setState({ schema });
		return formField;
	}
};
EditFormFieldHandler.$inject = ["formEditor", "formFieldRegistry"];
var MoveFormFieldHandler = class {
	/**
	* @constructor
	* @param { import('../../../FormEditor').FormEditor } formEditor
	* @param { import('../../../core/FormFieldRegistry').FormFieldRegistry } formFieldRegistry
	* @param { import('@bpmn-io/form-js-viewer').PathRegistry } pathRegistry
	* @param { import('@bpmn-io/form-js-viewer').FormLayouter } formLayouter
	*/
	constructor(formEditor, formFieldRegistry, pathRegistry, formLayouter) {
		this._formEditor = formEditor;
		this._formFieldRegistry = formFieldRegistry;
		this._pathRegistry = pathRegistry;
		this._formLayouter = formLayouter;
	}
	execute(context) {
		this.moveFormField(context);
	}
	revert(context) {
		let { sourceFormField, targetFormField, sourceIndex, targetIndex, sourceRow, targetRow } = context;
		this.moveFormField({
			sourceFormField: targetFormField,
			targetFormField: sourceFormField,
			sourceIndex: targetIndex,
			targetIndex: sourceIndex,
			sourceRow: targetRow,
			targetRow: sourceRow
		}, true);
	}
	moveFormField(context, revert) {
		let { sourceFormField, targetFormField, sourceIndex, targetIndex, targetRow } = context;
		let { schema } = this._formEditor._getState();
		const sourcePath = [...sourceFormField._path, "components"];
		if (sourceFormField.id === targetFormField.id) {
			if (revert) {
				if (sourceIndex > targetIndex) sourceIndex--;
			} else if (sourceIndex < targetIndex) targetIndex--;
			updateRow(get$1(schema, [...sourcePath, sourceIndex]), targetRow ? targetRow.id : this._formLayouter.nextRowId());
			arrayMoveMutable(get$1(schema, sourcePath), sourceIndex, targetIndex);
			get$1(schema, sourcePath).forEach((formField, index) => updatePath(this._formFieldRegistry, formField, index));
		} else {
			const formField = get$1(schema, [...sourcePath, sourceIndex]);
			this._pathRegistry.executeRecursivelyOnFields(formField, ({ field }) => {
				this._pathRegistry.unclaimPath(this._pathRegistry.getValuePath(field));
			});
			formField._parent = targetFormField.id;
			arrayRemove(get$1(schema, sourcePath), sourceIndex);
			get$1(schema, sourcePath).forEach((formField, index) => updatePath(this._formFieldRegistry, formField, index));
			const targetPath = [...targetFormField._path, "components"];
			updateRow(formField, targetRow ? targetRow.id : this._formLayouter.nextRowId());
			arrayAdd$1(get$1(schema, targetPath), targetIndex, formField);
			get$1(schema, targetPath).forEach((formField, index) => updatePath(this._formFieldRegistry, formField, index));
			this._pathRegistry.executeRecursivelyOnFields(formField, ({ field, isClosed, isRepeatable }) => {
				this._pathRegistry.claimPath(this._pathRegistry.getValuePath(field), {
					isClosed,
					isRepeatable,
					claimerId: field.id
				});
			});
		}
		this._formEditor._setState({ schema });
	}
};
MoveFormFieldHandler.$inject = [
	"formEditor",
	"formFieldRegistry",
	"pathRegistry",
	"formLayouter"
];
var RemoveFormFieldHandler = class {
	/**
	* @constructor
	* @param { import('../../../FormEditor').FormEditor } formEditor
	* @param { import('../../../core/FormFieldRegistry').FormFieldRegistry } formFieldRegistry
	*/
	constructor(formEditor, formFieldRegistry) {
		this._formEditor = formEditor;
		this._formFieldRegistry = formFieldRegistry;
	}
	execute(context) {
		const { sourceFormField, sourceIndex } = context;
		let { schema } = this._formEditor._getState();
		const sourcePath = [...sourceFormField._path, "components"];
		const formField = context.formField = get$1(schema, [...sourcePath, sourceIndex]);
		arrayRemove(get$1(schema, sourcePath), sourceIndex);
		get$1(schema, sourcePath).forEach((formField, index) => updatePath(this._formFieldRegistry, formField, index));
		runRecursively(formField, (formField) => this._formFieldRegistry.remove(formField));
		this._formEditor._setState({ schema });
	}
	revert(context) {
		const { formField, sourceFormField, sourceIndex } = context;
		let { schema } = this._formEditor._getState();
		const sourcePath = [...sourceFormField._path, "components"];
		arrayAdd$1(get$1(schema, sourcePath), sourceIndex, formField);
		get$1(schema, sourcePath).forEach((formField, index) => updatePath(this._formFieldRegistry, formField, index));
		runRecursively(formField, (formField) => this._formFieldRegistry.add(formField));
		this._formEditor._setState({ schema });
	}
};
RemoveFormFieldHandler.$inject = ["formEditor", "formFieldRegistry"];
var UpdateIdClaimHandler = class {
	/**
	* @constructor
	* @param { import('../../../core/FormFieldRegistry').FormFieldRegistry } formFieldRegistry
	*/
	constructor(formFieldRegistry) {
		this._formFieldRegistry = formFieldRegistry;
	}
	execute(context) {
		const { claiming, formField, id } = context;
		if (claiming) this._formFieldRegistry._ids.claim(id, formField);
		else this._formFieldRegistry._ids.unclaim(id);
	}
	revert(context) {
		const { claiming, formField, id } = context;
		if (claiming) this._formFieldRegistry._ids.unclaim(id);
		else this._formFieldRegistry._ids.claim(id, formField);
	}
};
UpdateIdClaimHandler.$inject = ["formFieldRegistry"];
var UpdateKeyClaimHandler = class {
	/**
	* @constructor
	* @param { import('@bpmn-io/form-js-viewer').PathRegistry } pathRegistry
	*/
	constructor(pathRegistry) {
		this._pathRegistry = pathRegistry;
	}
	execute(context) {
		const { claiming, formField, key } = context;
		const options = { replacements: { [formField.id]: key } };
		const valuePath = this._pathRegistry.getValuePath(formField, options);
		if (claiming) this._pathRegistry.claimPath(valuePath, {
			isClosed: true,
			claimerId: formField.id
		});
		else this._pathRegistry.unclaimPath(valuePath);
		context.valuePath = valuePath;
	}
	revert(context) {
		const { claiming, formField, valuePath } = context;
		if (claiming) this._pathRegistry.unclaimPath(valuePath);
		else this._pathRegistry.claimPath(valuePath, {
			isClosed: true,
			claimerId: formField.id
		});
	}
};
UpdateKeyClaimHandler.$inject = ["pathRegistry"];
var UpdatePathClaimHandler = class {
	/**
	* @constructor
	* @param { import('@bpmn-io/form-js-viewer').PathRegistry } pathRegistry
	*/
	constructor(pathRegistry) {
		this._pathRegistry = pathRegistry;
	}
	execute(context) {
		const { claiming, formField, path } = context;
		const options = { replacements: { [formField.id]: path } };
		const valuePaths = [];
		if (claiming) this._pathRegistry.executeRecursivelyOnFields(formField, ({ field, isClosed, isRepeatable }) => {
			const valuePath = this._pathRegistry.getValuePath(field, options);
			valuePaths.push({
				valuePath,
				isClosed,
				isRepeatable,
				claimerId: field.id
			});
			this._pathRegistry.claimPath(valuePath, {
				isClosed,
				isRepeatable,
				claimerId: field.id
			});
		});
		else this._pathRegistry.executeRecursivelyOnFields(formField, ({ field, isClosed, isRepeatable }) => {
			const valuePath = this._pathRegistry.getValuePath(field, options);
			valuePaths.push({
				valuePath,
				isClosed,
				isRepeatable,
				claimerId: field.id
			});
			this._pathRegistry.unclaimPath(valuePath);
		});
		context.valuePaths = valuePaths;
	}
	revert(context) {
		const { claiming, valuePaths } = context;
		if (claiming) valuePaths.forEach(({ valuePath }) => {
			this._pathRegistry.unclaimPath(valuePath);
		});
		else valuePaths.forEach(({ valuePath, isClosed, isRepeatable, claimerId }) => {
			this._pathRegistry.claimPath(valuePath, {
				isClosed,
				isRepeatable,
				claimerId
			});
		});
	}
};
UpdatePathClaimHandler.$inject = ["pathRegistry"];
var Modeling = class {
	constructor(commandStack, eventBus, formEditor, formFieldRegistry, fieldFactory) {
		this._commandStack = commandStack;
		this._formEditor = formEditor;
		this._formFieldRegistry = formFieldRegistry;
		this._fieldFactory = fieldFactory;
		eventBus.on("form.init", () => {
			this.registerHandlers();
		});
	}
	registerHandlers() {
		Object.entries(this.getHandlers()).forEach(([id, handler]) => {
			this._commandStack.registerHandler(id, handler);
		});
	}
	getHandlers() {
		return {
			"formField.add": AddFormFieldHandler,
			"formField.edit": EditFormFieldHandler,
			"formField.move": MoveFormFieldHandler,
			"formField.remove": RemoveFormFieldHandler,
			"id.updateClaim": UpdateIdClaimHandler,
			"key.updateClaim": UpdateKeyClaimHandler,
			"path.updateClaim": UpdatePathClaimHandler
		};
	}
	addFormField(attrs, targetFormField, targetIndex) {
		const formField = this._fieldFactory.create(attrs);
		const context = {
			formField,
			targetFormField,
			targetIndex
		};
		this._commandStack.execute("formField.add", context);
		return formField;
	}
	editFormField(formField, properties, value) {
		if (!isObject(properties)) properties = { [properties]: value };
		const context = {
			formField,
			properties
		};
		this._commandStack.execute("formField.edit", context);
	}
	moveFormField(formField, sourceFormField, targetFormField, sourceIndex, targetIndex, sourceRow, targetRow) {
		const context = {
			formField,
			sourceFormField,
			targetFormField,
			sourceIndex,
			targetIndex,
			sourceRow,
			targetRow
		};
		this._commandStack.execute("formField.move", context);
	}
	removeFormField(formField, sourceFormField, sourceIndex) {
		const context = {
			formField,
			sourceFormField,
			sourceIndex
		};
		this._commandStack.execute("formField.remove", context);
	}
	claimId(formField, id) {
		const context = {
			formField,
			id,
			claiming: true
		};
		this._commandStack.execute("id.updateClaim", context);
	}
	unclaimId(formField, id) {
		const context = {
			formField,
			id,
			claiming: false
		};
		this._commandStack.execute("id.updateClaim", context);
	}
	claimKey(formField, key) {
		const context = {
			formField,
			key,
			claiming: true
		};
		this._commandStack.execute("key.updateClaim", context);
	}
	unclaimKey(formField, key) {
		const context = {
			formField,
			key,
			claiming: false
		};
		this._commandStack.execute("key.updateClaim", context);
	}
	claimPath(formField, path) {
		const context = {
			formField,
			path,
			claiming: true
		};
		this._commandStack.execute("path.updateClaim", context);
	}
	unclaimPath(formField, path) {
		const context = {
			formField,
			path,
			claiming: false
		};
		this._commandStack.execute("path.updateClaim", context);
	}
};
Modeling.$inject = [
	"commandStack",
	"eventBus",
	"formEditor",
	"formFieldRegistry",
	"fieldFactory"
];
var ModelingModule = {
	__depends__: [BehaviorModule, commandModule],
	__init__: ["formLayoutUpdater", "modeling"],
	formLayoutUpdater: ["type", FormLayoutUpdater],
	modeling: ["type", Modeling]
};
var Selection = class {
	constructor(eventBus) {
		this._eventBus = eventBus;
		this._selection = null;
	}
	get() {
		return this._selection;
	}
	set(selection) {
		if (this._selection === selection) return;
		this._selection = selection;
		this._eventBus.fire("selection.changed", { selection: this._selection });
	}
	toggle(selection) {
		const newSelection = this._selection === selection ? null : selection;
		this.set(newSelection);
	}
	clear() {
		this.set(null);
	}
	isSelected(formField) {
		return this._selection === formField;
	}
};
Selection.$inject = ["eventBus"];
var SelectionBehavior = class {
	constructor(eventBus, selection) {
		eventBus.on(["commandStack.formField.add.postExecuted", "commandStack.formField.move.postExecuted"], ({ context }) => {
			const { formField } = context;
			selection.set(formField);
		});
		eventBus.on("commandStack.formField.remove.postExecuted", ({ context }) => {
			const { sourceFormField, sourceIndex } = context;
			const formField = sourceFormField.components[sourceIndex] || sourceFormField.components[sourceIndex - 1];
			if (formField) selection.set(formField);
			else selection.clear();
		});
		eventBus.on("formField.remove", ({ formField }) => {
			if (selection.isSelected(formField)) selection.clear();
		});
	}
};
SelectionBehavior.$inject = ["eventBus", "selection"];
var SelectionModule = {
	__init__: ["selection", "selectionBehavior"],
	selection: ["type", Selection],
	selectionBehavior: ["type", SelectionBehavior]
};
/**
* Base class for sectionable UI modules.
*
* @property {EventBus} _eventBus - EventBus instance used for event handling.
* @property {string} managerType - Type of the render manager. Used to form event names.
*
* @class SectionModuleBase
*/
var SectionModuleBase = class {
	/**
	* Create a SectionModuleBase instance.
	*
	* @param {any} eventBus - The EventBus instance used for event handling.
	* @param {string} sectionKey - The type of render manager. Used to form event names.
	*
	* @constructor
	*/
	constructor(eventBus, sectionKey) {
		this._eventBus = eventBus;
		this._sectionKey = sectionKey;
		this._eventBus.on(`${this._sectionKey}.section.rendered`, () => {
			this.isSectionRendered = true;
		});
		this._eventBus.on(`${this._sectionKey}.section.destroyed`, () => {
			this.isSectionRendered = false;
		});
	}
	/**
	* Attach the managed section to a parent node.
	*
	* @param {HTMLElement} container - The parent node to attach to.
	*/
	attachTo(container) {
		this._onceSectionRendered(() => this._eventBus.fire(`${this._sectionKey}.attach`, { container }));
	}
	/**
	* Detach the managed section from its parent node.
	*/
	detach() {
		this._onceSectionRendered(() => this._eventBus.fire(`${this._sectionKey}.detach`));
	}
	/**
	* Reset the managed section to its initial state.
	*/
	reset() {
		this._onceSectionRendered(() => this._eventBus.fire(`${this._sectionKey}.reset`));
	}
	/**
	* Circumvents timing issues.
	*/
	_onceSectionRendered(callback) {
		if (this.isSectionRendered) callback();
		else this._eventBus.once(`${this._sectionKey}.section.rendered`, callback);
	}
};
var PaletteRenderer = class extends SectionModuleBase {
	constructor(eventBus) {
		super(eventBus, "palette");
	}
};
PaletteRenderer.$inject = ["eventBus"];
var PaletteModule = {
	__init__: ["palette"],
	palette: ["type", PaletteRenderer]
};
var ArrowIcon = function ArrowIcon(props) {
	return u("svg", {
		...props,
		children: u("path", {
			fillRule: "evenodd",
			d: "m11.657 8-4.95 4.95a1 1 0 0 1-1.414-1.414L8.828 8 5.293 4.464A1 1 0 1 1 6.707 3.05L11.657 8Z"
		})
	});
};
ArrowIcon.defaultProps = {
	xmlns: "http://www.w3.org/2000/svg",
	width: "16",
	height: "16"
};
var CloseIcon = function CloseIcon(props) {
	return u("svg", {
		...props,
		children: u("path", {
			fillRule: "evenodd",
			d: "m12 4.7-.7-.7L8 7.3 4.7 4l-.7.7L7.3 8 4 11.3l.7.7L8 8.7l3.3 3.3.7-.7L8.7 8 12 4.7Z",
			fill: "currentColor"
		})
	});
};
CloseIcon.defaultProps = {
	xmlns: "http://www.w3.org/2000/svg",
	width: "16",
	height: "16"
};
var CreateIcon = function CreateIcon(props) {
	return u("svg", {
		...props,
		children: u("path", {
			fillRule: "evenodd",
			d: "M9 13V9h4a1 1 0 0 0 0-2H9V3a1 1 0 1 0-2 0v4H3a1 1 0 1 0 0 2h4v4a1 1 0 0 0 2 0Z"
		})
	});
};
CreateIcon.defaultProps = {
	xmlns: "http://www.w3.org/2000/svg",
	width: "16",
	height: "16"
};
var DeleteIcon = function DeleteIcon(props) {
	return u("svg", {
		...props,
		children: u("path", {
			fillRule: "evenodd",
			d: "M12 6v7c0 1.1-.4 1.55-1.5 1.55h-5C4.4 14.55 4 14.1 4 13V6h8Zm-1.5 1.5h-5v4.3c0 .66.5 1.2 1.111 1.2H9.39c.611 0 1.111-.54 1.111-1.2V7.5ZM13 3h-2l-1-1H6L5 3H3v1.5h10V3Z"
		})
	});
};
DeleteIcon.defaultProps = {
	xmlns: "http://www.w3.org/2000/svg",
	width: "16",
	height: "16"
};
var DragIcon = function DragIcon(props) {
	return u("svg", {
		...props,
		children: [
			u("path", {
				fill: "#fff",
				style: { mixBlendMode: "multiply" },
				d: "M0 0h16v16H0z"
			}),
			u("path", {
				fill: "#fff",
				style: { mixBlendMode: "multiply" },
				d: "M0 0h16v16H0z"
			}),
			u("path", {
				d: "M7 3H5v2h2V3zm4 0H9v2h2V3zM7 7H5v2h2V7zm4 0H9v2h2V7zm-4 4H5v2h2v-2zm4 0H9v2h2v-2z",
				fill: "#161616"
			})
		]
	});
};
DragIcon.defaultProps = {
	width: "16",
	height: "16",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg"
};
var ExternalLinkIcon = function ExternalLinkIcon(props) {
	return u("svg", {
		...props,
		children: u("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M12.637 12.637v-4.72h1.362v4.721c0 .36-.137.676-.411.95-.275.275-.591.412-.95.412H3.362c-.38 0-.703-.132-.967-.396A1.315 1.315 0 0 1 2 12.638V3.362c0-.38.132-.703.396-.967S2.982 2 3.363 2h4.553v1.363H3.363v9.274h9.274ZM14 2H9.28l-.001 1.362h2.408L5.065 9.984l.95.95 6.622-6.622v2.409H14V2Z",
			fill: "currentcolor"
		})
	});
};
ExternalLinkIcon.defaultProps = {
	width: "16",
	height: "16",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg"
};
var FeelIcon$1 = function FeelIcon(props) {
	return u("svg", {
		...props,
		children: u("path", {
			d: "M3.617 11.99c-.137.684-.392 1.19-.765 1.518-.362.328-.882.492-1.558.492H0l.309-1.579h1.264l1.515-7.64h-.912l.309-1.579h.911l.236-1.191c.137-.685.387-1.192.75-1.52C4.753.164 5.277 0 5.953 0h1.294L6.94 1.579H5.675l-.323 1.623h1.264l-.309 1.579H5.043l-1.426 7.208ZM5.605 11.021l3.029-4.155L7.28 3.202h2.073l.706 2.547h.176l1.691-2.547H14l-3.014 4.051 1.338 3.768H10.25l-.706-2.606H9.37L7.678 11.02H5.605Z",
			fill: "currentcolor"
		})
	});
};
FeelIcon$1.defaultProps = {
	width: "14",
	height: "14",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg"
};
var LaunchIcon = function LaunchIcon(props) {
	return u("svg", {
		...props,
		children: [u("path", { d: "M26 28H6a2.003 2.003 0 0 1-2-2V6a2.003 2.003 0 0 1 2-2h10v2H6v20h20V16h2v10a2.003 2.003 0 0 1-2 2Z" }), u("path", { d: "M20 2v2h6.586L18 12.586 19.414 14 28 5.414V12h2V2H20z" })]
	});
};
LaunchIcon.defaultProps = {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 32 32"
};
var OpenPopupIcon = function OpenPopupIcon(props) {
	return u("svg", {
		...props,
		children: u("path", { d: "M6 15v-1H2.7L7 9.7 6.3 9 2 13.3V10H1v5zm4-14v1h3.3L9 6.3l.7.7L14 2.7V6h1V1z" })
	});
};
OpenPopupIcon.defaultProps = {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 16 16"
};
function Header(props) {
	const { element, headerProvider } = props;
	const { getElementIcon, getDocumentationRef, getElementLabel, getTypeLabel } = headerProvider;
	const label = getElementLabel(element);
	const type = getTypeLabel(element);
	const documentationRef = getDocumentationRef && getDocumentationRef(element);
	const ElementIcon = getElementIcon(element);
	return u("div", {
		class: "bio-properties-panel-header",
		children: [
			u("div", {
				class: "bio-properties-panel-header-icon",
				children: ElementIcon && u(ElementIcon, {
					width: "32",
					height: "32",
					viewBox: "0 0 32 32"
				})
			}),
			u("div", {
				class: "bio-properties-panel-header-labels",
				children: [u("div", {
					title: type,
					class: "bio-properties-panel-header-type",
					children: type
				}), label ? u("div", {
					title: label,
					class: "bio-properties-panel-header-label",
					children: label
				}) : null]
			}),
			u("div", {
				class: "bio-properties-panel-header-actions",
				children: documentationRef ? u("a", {
					rel: "noreferrer",
					class: "bio-properties-panel-header-link",
					href: documentationRef,
					title: "Open documentation",
					target: "_blank",
					children: u(ExternalLinkIcon, {})
				}) : null
			})
		]
	});
}
var DescriptionContext = Q({
	description: {},
	getDescriptionForId: () => {}
});
var ErrorsContext = Q({ errors: {} });
/**
* @typedef {Function} <propertiesPanel.showEntry> callback
*
* @example
*
* useEvent('propertiesPanel.showEntry', ({ focus = false, ...rest }) => {
*   // ...
* });
*
* @param {Object} context
* @param {boolean} [context.focus]
*
* @returns void
*/
var EventContext = Q({ eventBus: null });
/**
* @typedef { {
*   parserDialect?: import('@bpmn-io/feel-editor').ParserDialect,
*   builtins?: import('@bpmn-io/feel-editor').Variable[],
*   dialect?: import('@bpmn-io/feel-editor').Dialect
* } } FeelLanguageContextType
*/
/**
* @type {import('preact').Context<FeelLanguageContextType>}
*/
var FeelLanguageContext = Q({});
var LayoutContext = Q({
	layout: {},
	setLayout: () => {},
	getLayoutForKey: () => {},
	setLayoutForKey: () => {}
});
var TooltipContext = Q({
	tooltip: {},
	getTooltipForId: () => {}
});
/**
* Accesses the global TooltipContext and returns a tooltip for a given id and element.
*
* @example
* ```jsx
* function TextField(props) {
*   const tooltip = useTooltipContext('input1', element);
* }
* ```
*
* @param {string} id
* @param {object} element
*
* @returns {string}
*/
function useTooltipContext(id, element) {
	const { getTooltipForId } = x(TooltipContext);
	return getTooltipForId(id, element);
}
function TooltipWrapper(props) {
	const { forId, element } = props;
	const contextDescription = useTooltipContext(forId, element);
	const value = props.value || contextDescription;
	if (!value) return props.children;
	return u(Tooltip, {
		...props,
		value,
		forId: `bio-properties-panel-${forId}`
	});
}
function Tooltip(props) {
	const { forId, value, parent, direction = "right", position } = props;
	const [visible, setVisible] = d(false);
	const SHOW_DELAY = 200;
	let timeout = null;
	const wrapperRef = A(null);
	const tooltipRef = A(null);
	const show = (_, delay) => {
		if (visible) return;
		if (delay) timeout = setTimeout(() => {
			setVisible(true);
		}, SHOW_DELAY);
		else setVisible(true);
	};
	const hide = () => {
		clearTimeout(timeout);
		setVisible(false);
	};
	const handleMouseLeave = ({ relatedTarget }) => {
		if (relatedTarget === wrapperRef.current || relatedTarget === tooltipRef.current || relatedTarget?.parentElement === tooltipRef.current) return;
		hide();
	};
	const handleFocusOut = (e) => {
		const { target } = e;
		const isHovered = target.matches(":hover") || tooltipRef.current?.matches(":hover");
		if (target === wrapperRef.current && isHovered) {
			e.stopPropagation();
			return;
		}
		hide();
	};
	const hideTooltipViaEscape = (e) => {
		e.code === "Escape" && hide();
	};
	const renderTooltip = () => {
		return u("div", {
			class: `bio-properties-panel-tooltip ${direction}`,
			role: "tooltip",
			id: "bio-properties-panel-tooltip",
			"aria-labelledby": forId,
			style: position || getTooltipPosition(wrapperRef.current),
			ref: tooltipRef,
			onClick: (e) => e.stopPropagation(),
			onMouseLeave: handleMouseLeave,
			children: [u("div", {
				class: "bio-properties-panel-tooltip-content",
				children: value
			}), u("div", { class: "bio-properties-panel-tooltip-arrow" })]
		});
	};
	return u("div", {
		class: "bio-properties-panel-tooltip-wrapper",
		tabIndex: "0",
		ref: wrapperRef,
		onMouseEnter: (e) => show(e, true),
		onMouseLeave: handleMouseLeave,
		onFocus: show,
		onBlur: handleFocusOut,
		onKeyDown: hideTooltipViaEscape,
		children: [props.children, visible ? parent ? $(renderTooltip(), parent.current) : renderTooltip() : null]
	});
}
function getTooltipPosition(refElement) {
	const refPosition = refElement.getBoundingClientRect();
	return `right: ${`calc(100% - ${refPosition.x}px)`}; top: ${`${refPosition.top - 10}px`};`;
}
/**
* Accesses the global DescriptionContext and returns a description for a given id and element.
*
* @example
* ```jsx
* function TextField(props) {
*   const description = useDescriptionContext('input1', element);
* }
* ```
*
* @param {string} id
* @param {object} element
*
* @returns {string}
*/
function useDescriptionContext(id, element) {
	const { getDescriptionForId } = x(DescriptionContext);
	return getDescriptionForId(id, element);
}
function useDebounce(callback, debounceFn) {
	const debouncedCallback = q(debounceFn(callback), [callback, debounceFn]);
	y(() => {
		return () => {
			debouncedCallback.cancel?.();
		};
	}, [debouncedCallback]);
	return debouncedCallback;
}
function useError(id) {
	const { errors } = x(ErrorsContext);
	return errors[id];
}
function useErrors() {
	const { errors } = x(ErrorsContext);
	return errors;
}
/**
* Subscribe to an event immediately. Update subscription after inputs changed.
*
* @param {string} event
* @param {Function} callback
*/
function useEvent(event, callback, eventBus) {
	const eventContext = x(EventContext);
	if (!eventBus) ({eventBus} = eventContext);
	const didMount = A(false);
	if (eventBus && !didMount.current) eventBus.on(event, callback);
	y(() => {
		if (eventBus && didMount.current) eventBus.on(event, callback);
		didMount.current = true;
		return () => {
			if (eventBus) eventBus.off(event, callback);
		};
	}, [
		callback,
		event,
		eventBus
	]);
}
/**
* Creates a state that persists in the global LayoutContext.
*
* @example
* ```jsx
* function Group(props) {
*   const [ open, setOpen ] = useLayoutState([ 'groups', 'foo', 'open' ], false);
* }
* ```
*
* @param {(string|number)[]} path
* @param {any} [defaultValue]
*
* @returns {[ any, Function ]}
*/
function useLayoutState(path, defaultValue) {
	const { getLayoutForKey, setLayoutForKey } = x(LayoutContext);
	return [getLayoutForKey(path, defaultValue), q((newValue) => {
		setLayoutForKey(path, newValue);
	}, [setLayoutForKey])];
}
/**
* @pinussilvestrus: we need to introduce our own hook to persist the previous
* state on updates.
*
* cf. https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
*/
function usePrevious(value) {
	const ref = A();
	y(() => {
		ref.current = value;
	});
	return ref.current;
}
/**
* Subscribe to `propertiesPanel.showEntry`.
*
* @param {string} id
*
* @returns {import('preact').Ref}
*/
function useShowEntryEvent(id) {
	const { onShow } = x(LayoutContext);
	const ref = A();
	const focus = A(false);
	const onShowEntry = q((event) => {
		if (event.id === id) {
			onShow();
			if (!focus.current) focus.current = true;
		}
	}, [id]);
	y(() => {
		if (focus.current && ref.current) {
			if (isFunction(ref.current.focus)) ref.current.focus();
			if (isFunction(ref.current.select)) ref.current.select();
			focus.current = false;
		}
	});
	useEvent("propertiesPanel.showEntry", onShowEntry);
	return ref;
}
/**
* @callback setSticky
* @param {boolean} value
*/
/**
* Use IntersectionObserver to identify when DOM element is in sticky mode.
* If sticky is observered setSticky(true) will be called.
* If sticky mode is left, setSticky(false) will be called.
*
*
* @param {Object} ref
* @param {string} scrollContainerSelector
* @param {setSticky} setSticky
*/
function useStickyIntersectionObserver(ref, scrollContainerSelector, setSticky) {
	const [scrollContainer, setScrollContainer] = d(query(scrollContainerSelector));
	const updateScrollContainer = q(() => {
		const newScrollContainer = query(scrollContainerSelector);
		if (newScrollContainer !== scrollContainer) setScrollContainer(newScrollContainer);
	}, [scrollContainerSelector, scrollContainer]);
	y(() => {
		updateScrollContainer();
	}, [updateScrollContainer]);
	useEvent("propertiesPanel.attach", updateScrollContainer);
	useEvent("propertiesPanel.detach", updateScrollContainer);
	y(() => {
		const Observer = IntersectionObserver;
		if (!Observer) return;
		if (!ref.current || !scrollContainer) return;
		const observer = new Observer((entries) => {
			if (scrollContainer.scrollHeight === 0) return;
			entries.forEach((entry) => {
				if (entry.intersectionRatio < 1) setSticky(true);
				else if (entry.intersectionRatio === 1) setSticky(false);
			});
		}, {
			root: scrollContainer,
			rootMargin: "0px 0px 999999% 0px",
			threshold: [1]
		});
		observer.observe(ref.current);
		return () => {
			observer.unobserve(ref.current);
		};
	}, [
		ref.current,
		scrollContainer,
		setSticky
	]);
}
/**
* Creates a static function reference with changing body.
* This is necessary when external libraries require a callback function
* that has references to state variables.
*
* Usage:
* const callback = useStaticCallback((val) => {val === currentState});
*
* The `callback` reference is static and can be safely used in external
* libraries or as a prop that does not cause rerendering of children.
*
* @param {Function} callback function with changing reference
* @returns {Function} static function reference
*/
function useStaticCallback(callback) {
	const callbackRef = A(callback);
	callbackRef.current = callback;
	return q((...args) => callbackRef.current(...args), []);
}
function useElementVisible(element) {
	const [visible, setVisible] = d(!!element && !!element.clientHeight);
	_$1(() => {
		if (!element) return;
		const resizeObserver = new ResizeObserver(([entry]) => {
			requestAnimationFrame(() => {
				const newVisible = !!entry.contentRect.height;
				if (newVisible !== visible) setVisible(newVisible);
			});
		});
		resizeObserver.observe(element);
		return () => resizeObserver.disconnect();
	}, [element, visible]);
	return visible;
}
function Group(props) {
	const { element, entries = [], id, label, shouldOpen = false } = props;
	const groupRef = A(null);
	const [open, setOpen] = useLayoutState([
		"groups",
		id,
		"open"
	], shouldOpen);
	const onShow = q(() => setOpen(true), [setOpen]);
	const toggleOpen = () => setOpen(!open);
	const [edited, setEdited] = d(false);
	const [sticky, setSticky] = d(false);
	y(() => {
		const scheduled = requestAnimationFrame(() => {
			setEdited(entries.find((entry) => {
				const { id, isEdited } = entry;
				const entryNode = query(`[data-entry-id="${id}"]`);
				if (!isFunction(isEdited) || !entryNode) return false;
				return isEdited(query(".bio-properties-panel-input", entryNode));
			}));
		});
		return () => cancelAnimationFrame(scheduled);
	}, [entries, setEdited]);
	const allErrors = useErrors();
	const hasErrors = entries.some((entry) => allErrors[entry.id]);
	useStickyIntersectionObserver(groupRef, "div.bio-properties-panel-scroll-container", setSticky);
	const propertiesPanelContext = {
		...x(LayoutContext),
		onShow
	};
	return u("div", {
		class: "bio-properties-panel-group",
		"data-group-id": "group-" + id,
		ref: groupRef,
		children: [u("div", {
			class: (0, import_classnames.default)("bio-properties-panel-group-header", edited ? "" : "empty", open ? "open" : "", sticky && open ? "sticky" : ""),
			onClick: toggleOpen,
			children: [u("div", {
				title: props.tooltip ? null : label,
				"data-title": label,
				class: "bio-properties-panel-group-header-title",
				children: u(TooltipWrapper, {
					value: props.tooltip,
					forId: "group-" + id,
					element,
					parent: groupRef,
					children: label
				})
			}), u("div", {
				class: "bio-properties-panel-group-header-buttons",
				children: [u(DataMarker, {
					edited,
					hasErrors
				}), u("button", {
					type: "button",
					title: "Toggle section",
					class: "bio-properties-panel-group-header-button bio-properties-panel-arrow",
					children: u(ArrowIcon, { class: open ? "bio-properties-panel-arrow-down" : "bio-properties-panel-arrow-right" })
				})]
			})]
		}), u("div", {
			class: (0, import_classnames.default)("bio-properties-panel-group-entries", open ? "open" : ""),
			children: u(LayoutContext.Provider, {
				value: propertiesPanelContext,
				children: entries.map((entry) => {
					const { component: Component, id } = entry;
					return _(Component, {
						...entry,
						element,
						key: id
					});
				})
			})
		})]
	});
}
function DataMarker(props) {
	const { edited, hasErrors } = props;
	if (hasErrors) return u("div", {
		title: "Section contains an error",
		class: "bio-properties-panel-dot bio-properties-panel-dot--error"
	});
	if (edited) return u("div", {
		title: "Section contains edits",
		class: "bio-properties-panel-dot"
	});
	return null;
}
/**
* @typedef { {
*  text: (element: object) => string,
*  icon?: (element: Object) => import('preact').Component
* } } PlaceholderDefinition
*
* @param { PlaceholderDefinition } props
*/
function Placeholder(props) {
	const { text, icon: Icon } = props;
	return u("div", {
		class: "bio-properties-panel open",
		children: u("section", {
			class: "bio-properties-panel-placeholder",
			children: [Icon && u(Icon, { class: "bio-properties-panel-placeholder-icon" }), u("p", {
				class: "bio-properties-panel-placeholder-text",
				children: text
			})]
		})
	});
}
var DEFAULT_LAYOUT = {};
var DEFAULT_DESCRIPTION = {};
var DEFAULT_TOOLTIP = {};
/**
* @typedef { {
*    component: import('preact').Component,
*    id: String,
*    isEdited?: Function
* } } EntryDefinition
*
* @typedef { {
*    autoFocusEntry: String,
*    autoOpen?: Boolean,
*    entries: Array<EntryDefinition>,
*    id: String,
*    label: String,
*    remove: (event: MouseEvent) => void
* } } ListItemDefinition
*
* @typedef { {
*    add: (event: MouseEvent) => void,
*    component: import('preact').Component,
*    element: Object,
*    id: String,
*    items: Array<ListItemDefinition>,
*    label: String,
*    shouldOpen?: Boolean
* } } ListGroupDefinition
*
* @typedef { {
*    component?: import('preact').Component,
*    entries: Array<EntryDefinition>,
*    id: String,
*    label: String,
*    shouldOpen?: Boolean
* } } GroupDefinition
*
*  @typedef { {
*    [id: String]: GetDescriptionFunction
* } } DescriptionConfig
*
*  @typedef { {
*    [id: String]: GetTooltipFunction
* } } TooltipConfig
*
* @callback { {
* @param {string} id
* @param {Object} element
* @returns {string}
* } } GetDescriptionFunction
*
* @callback { {
* @param {string} id
* @param {Object} element
* @returns {string}
* } } GetTooltipFunction
*
* @typedef { {
*  getEmpty: (element: object) => import('./components/Placeholder').PlaceholderDefinition,
*  getMultiple: (element: Object) => import('./components/Placeholder').PlaceholderDefinition
* } } PlaceholderProvider
*
*/
/**
* A basic properties panel component. Describes *how* content will be rendered, accepts
* data from implementor to describe *what* will be rendered.
*
* @param {Object} props
* @param {Object|Array} props.element
* @param {import('./components/Header').HeaderProvider} props.headerProvider
* @param {PlaceholderProvider} [props.placeholderProvider]
* @param {Array<GroupDefinition|ListGroupDefinition>} props.groups
* @param {Object} [props.layoutConfig]
* @param {Function} [props.layoutChanged]
* @param {DescriptionConfig} [props.descriptionConfig]
* @param {Function} [props.descriptionLoaded]
* @param {TooltipConfig} [props.tooltipConfig]
* @param {Function} [props.tooltipLoaded]
* @param {HTMLElement} [props.feelPopupContainer]
* @param {Function} [props.getFeelPopupLinks]
* @param {Object} [props.eventBus]
*/
function PropertiesPanel$1(props) {
	const { element, headerProvider, placeholderProvider, groups, layoutConfig, layoutChanged, descriptionConfig, descriptionLoaded, tooltipConfig, tooltipLoaded, eventBus } = props;
	const [layout, setLayout] = d(createLayout(layoutConfig));
	useUpdateLayoutEffect(() => {
		setLayout(createLayout(layoutConfig));
	}, [layoutConfig]);
	y(() => {
		if (typeof layoutChanged === "function") layoutChanged(layout);
	}, [layout, layoutChanged]);
	const getLayoutForKey = (key, defaultValue) => {
		return get$1(layout, key, defaultValue);
	};
	const setLayoutForKey = (key, config) => {
		const newLayout = assign({}, layout);
		set$1(newLayout, key, config);
		setLayout(newLayout);
	};
	const layoutContext = {
		layout,
		setLayout,
		getLayoutForKey,
		setLayoutForKey
	};
	const description = T$1(() => createDescriptionContext(descriptionConfig), [descriptionConfig]);
	y(() => {
		if (typeof descriptionLoaded === "function") descriptionLoaded(description);
	}, [description, descriptionLoaded]);
	const getDescriptionForId = (id, element) => {
		return description[id] && description[id](element);
	};
	const descriptionContext = {
		description,
		getDescriptionForId
	};
	const tooltip = T$1(() => createTooltipContext(tooltipConfig), [tooltipConfig]);
	y(() => {
		if (typeof tooltipLoaded === "function") tooltipLoaded(tooltip);
	}, [tooltip, tooltipLoaded]);
	const getTooltipForId = (id, element) => {
		return tooltip[id] && tooltip[id](element);
	};
	const tooltipContext = {
		tooltip,
		getTooltipForId
	};
	const [errors, setErrors] = d({});
	const onSetErrors = ({ errors }) => setErrors(errors);
	useEvent("propertiesPanel.setErrors", onSetErrors, eventBus);
	const errorsContext = { errors };
	const eventContext = { eventBus };
	const propertiesPanelContext = { element };
	if (placeholderProvider && !element) return u(Placeholder, { ...placeholderProvider.getEmpty() });
	if (placeholderProvider && isArray(element)) return u(Placeholder, { ...placeholderProvider.getMultiple() });
	return u(LayoutContext.Provider, {
		value: propertiesPanelContext,
		children: u(ErrorsContext.Provider, {
			value: errorsContext,
			children: u(DescriptionContext.Provider, {
				value: descriptionContext,
				children: u(TooltipContext.Provider, {
					value: tooltipContext,
					children: u(LayoutContext.Provider, {
						value: layoutContext,
						children: u(EventContext.Provider, {
							value: eventContext,
							children: u("div", {
								class: "bio-properties-panel",
								children: [u(Header, {
									element,
									headerProvider
								}), u("div", {
									class: "bio-properties-panel-scroll-container",
									children: groups.map((group) => {
										const { component: Component = Group, id } = group;
										return _(Component, {
											...group,
											key: id,
											element
										});
									})
								})]
							})
						})
					})
				})
			})
		})
	});
}
function createLayout(overrides = {}, defaults = DEFAULT_LAYOUT) {
	return {
		...defaults,
		...overrides
	};
}
function createDescriptionContext(overrides = {}) {
	return {
		...DEFAULT_DESCRIPTION,
		...overrides
	};
}
function createTooltipContext(overrides = {}) {
	return {
		...DEFAULT_TOOLTIP,
		...overrides
	};
}
/**
* This hook behaves like useLayoutEffect, but does not trigger on the first render.
*
* @param {Function} effect
* @param {Array} deps
*/
function useUpdateLayoutEffect(effect, deps) {
	const isMounted = A(false);
	_$1(() => {
		if (isMounted.current) return effect();
		else isMounted.current = true;
	}, deps);
}
/**
* @typedef { {
*   [key: string]: string;
* } } TranslateReplacements
*/
/**
* A simple translation stub to be used for multi-language support.
* Can be easily replaced with a more sophisticated solution.
*
* @param {string} template to interpolate
* @param {TranslateReplacements} [replacements] a map with substitutes
*
* @return {string} the translated string
*/
function translateFallback(template, replacements) {
	replacements = replacements || {};
	return template.replace(/{([^}]+)}/g, function(_, key) {
		return replacements[key] || "{" + key + "}";
	});
}
function CollapsibleEntry(props) {
	const { element, entries = [], id, label, open: shouldOpen, remove, translate = translateFallback } = props;
	const [open, setOpen] = d(shouldOpen);
	const toggleOpen = () => setOpen(!open);
	const { onShow } = x(LayoutContext);
	const propertiesPanelContext = {
		...x(LayoutContext),
		onShow: q(() => {
			setOpen(true);
			if (isFunction(onShow)) onShow();
		}, [onShow, setOpen])
	};
	const placeholderLabel = translate("<empty>");
	return u("div", {
		"data-entry-id": id,
		class: (0, import_classnames.default)("bio-properties-panel-collapsible-entry", open ? "open" : ""),
		children: [u("div", {
			class: "bio-properties-panel-collapsible-entry-header",
			onClick: toggleOpen,
			children: [
				u("div", {
					title: label || placeholderLabel,
					class: (0, import_classnames.default)("bio-properties-panel-collapsible-entry-header-title", !label && "empty"),
					children: label || placeholderLabel
				}),
				u("button", {
					type: "button",
					title: translate("Toggle list item"),
					class: "bio-properties-panel-arrow  bio-properties-panel-collapsible-entry-arrow",
					children: u(ArrowIcon, { class: open ? "bio-properties-panel-arrow-down" : "bio-properties-panel-arrow-right" })
				}),
				remove ? u("button", {
					type: "button",
					title: translate("Delete item"),
					class: "bio-properties-panel-remove-entry",
					onClick: remove,
					children: u(DeleteIcon, {})
				}) : null
			]
		}), u("div", {
			class: (0, import_classnames.default)("bio-properties-panel-collapsible-entry-entries", open ? "open" : ""),
			children: u(LayoutContext.Provider, {
				value: propertiesPanelContext,
				children: entries.map((entry) => {
					const { component: Component, id } = entry;
					return _(Component, {
						...entry,
						element,
						key: id
					});
				})
			})
		})]
	});
}
function ListItem(props) {
	const { autoFocusEntry, autoOpen, translate = translateFallback } = props;
	y(() => {
		if (autoOpen && autoFocusEntry) {
			const focusableInput = query(".bio-properties-panel-input", query(`[data-entry-id="${autoFocusEntry}"]`));
			if (focusableInput) {
				if (isFunction(focusableInput.select)) focusableInput.select();
				else if (isFunction(focusableInput.focus)) focusableInput.focus();
				focusableInput.scrollIntoView();
			}
		}
	}, [autoOpen, autoFocusEntry]);
	return u("div", {
		class: "bio-properties-panel-list-item",
		children: u(CollapsibleEntry, {
			...props,
			open: autoOpen,
			translate
		})
	});
}
var noop$6 = () => {};
/**
* @param {import('../PropertiesPanel').ListGroupDefinition} props
*/
function ListGroup(props) {
	const { add, element, id, items, label, shouldOpen = false, translate = translateFallback } = props;
	y(() => {
		if (props.shouldSort != void 0) console.warn("the property 'shouldSort' is no longer supported");
	}, [props.shouldSort]);
	const groupRef = A(null);
	const [open, setOpen] = useLayoutState([
		"groups",
		id,
		"open"
	], shouldOpen);
	const [sticky, setSticky] = d(false);
	const onShow = q(() => setOpen(true), [setOpen]);
	const [localItems, setLocalItems] = d([]);
	const [addTriggered, setAddTriggered] = d(false);
	const prevElement = usePrevious(element);
	const toggleOpen = q(() => setOpen(!open), [open]);
	const openItemIds = element === prevElement && open && addTriggered ? getNewItemIds(items, localItems) : [];
	y(() => {
		setLocalItems(items);
		setAddTriggered(false);
	}, [items]);
	useStickyIntersectionObserver(groupRef, "div.bio-properties-panel-scroll-container", setSticky);
	const hasItems = !!items.length;
	const propertiesPanelContext = {
		...x(LayoutContext),
		onShow
	};
	const handleAddClick = (e) => {
		setAddTriggered(true);
		setOpen(true);
		add(e);
	};
	const allErrors = useErrors();
	const hasError = items.some((item) => {
		if (allErrors[item.id]) return true;
		if (!item.entries) return;
		return item.entries.some((entry) => allErrors[entry.id]);
	});
	return u("div", {
		class: "bio-properties-panel-group",
		"data-group-id": "group-" + id,
		ref: groupRef,
		children: [u("div", {
			class: (0, import_classnames.default)("bio-properties-panel-group-header", hasItems ? "" : "empty", hasItems && open ? "open" : "", sticky && open ? "sticky" : ""),
			onClick: hasItems ? toggleOpen : noop$6,
			children: [u("div", {
				title: props.tooltip ? null : label,
				"data-title": label,
				class: "bio-properties-panel-group-header-title",
				children: u(TooltipWrapper, {
					value: props.tooltip,
					forId: "group-" + id,
					element,
					parent: groupRef,
					children: label
				})
			}), u("div", {
				class: "bio-properties-panel-group-header-buttons",
				children: [
					add ? u("button", {
						type: "button",
						title: translate("Create new list item"),
						class: "bio-properties-panel-group-header-button bio-properties-panel-add-entry",
						onClick: handleAddClick,
						children: [u(CreateIcon, {}), !hasItems ? u("span", {
							class: "bio-properties-panel-add-entry-label",
							children: translate("Create")
						}) : null]
					}) : null,
					hasItems ? u("div", {
						title: translate(`List contains {numOfItems} item${items.length != 1 ? "s" : ""}`, { numOfItems: items.length }),
						class: (0, import_classnames.default)("bio-properties-panel-list-badge", hasError ? "bio-properties-panel-list-badge--error" : ""),
						children: items.length
					}) : null,
					hasItems ? u("button", {
						type: "button",
						title: translate("Toggle section"),
						class: "bio-properties-panel-group-header-button bio-properties-panel-arrow",
						children: u(ArrowIcon, { class: open ? "bio-properties-panel-arrow-down" : "bio-properties-panel-arrow-right" })
					}) : null
				]
			})]
		}), u("div", {
			class: (0, import_classnames.default)("bio-properties-panel-list", open && hasItems ? "open" : ""),
			children: u(LayoutContext.Provider, {
				value: propertiesPanelContext,
				children: items.map((item, index) => {
					if (!item) return;
					const { id } = item;
					const autoOpen = openItemIds.includes(item.id);
					return _(ListItem, {
						...item,
						autoOpen,
						element,
						index,
						key: id,
						translate
					});
				})
			})
		})]
	});
}
function getNewItemIds(newItems, oldItems) {
	const newIds = newItems.map((item) => item.id);
	const oldIds = oldItems.map((item) => item.id);
	return newIds.filter((itemId) => !oldIds.includes(itemId));
}
function Description$1(props) {
	const { element, forId, value } = props;
	const contextDescription = useDescriptionContext(forId, element);
	const description = value || contextDescription;
	if (description) return u("div", {
		class: "bio-properties-panel-description",
		children: description
	});
}
function Checkbox(props) {
	const { id, label, onChange, disabled, value = false, onFocus, onBlur, tooltip } = props;
	const [localValue, setLocalValue] = d(value);
	const handleChangeCallback = ({ target }) => {
		onChange(target.checked);
	};
	const handleChange = (e) => {
		handleChangeCallback(e);
		setLocalValue(e.target.value);
	};
	y(() => {
		if (value === localValue) return;
		setLocalValue(value);
	}, [value]);
	return u("div", {
		class: "bio-properties-panel-checkbox",
		children: [u("input", {
			ref: useShowEntryEvent(id),
			id: prefixId$8(id),
			name: id,
			onFocus,
			onBlur,
			type: "checkbox",
			class: "bio-properties-panel-input",
			onChange: handleChange,
			checked: localValue,
			disabled
		}), u("label", {
			for: prefixId$8(id),
			class: "bio-properties-panel-label",
			children: u(TooltipWrapper, {
				value: tooltip,
				forId: id,
				element: props.element,
				children: label
			})
		})]
	});
}
/**
* @param {Object} props
* @param {Object} props.element
* @param {String} props.id
* @param {String} props.description
* @param {String} props.label
* @param {Function} props.getValue
* @param {Function} props.setValue
* @param {Function} props.onFocus
* @param {Function} props.onBlur
* @param {string|import('preact').Component} props.tooltip
* @param {boolean} [props.disabled]
*/
function CheckboxEntry(props) {
	const { element, id, description, label, getValue, setValue, disabled, onFocus, onBlur, tooltip } = props;
	const value = getValue(element);
	const error = useError(id);
	return u("div", {
		class: "bio-properties-panel-entry bio-properties-panel-checkbox-entry",
		"data-entry-id": id,
		children: [
			u(Checkbox, {
				disabled,
				id,
				label,
				onChange: setValue,
				onFocus,
				onBlur,
				value,
				tooltip,
				element
			}, element),
			error && u("div", {
				class: "bio-properties-panel-error",
				children: error
			}),
			u(Description$1, {
				forId: id,
				element,
				value: description
			})
		]
	});
}
function isEdited$8(node) {
	return node && !!node.checked;
}
function prefixId$8(id) {
	return `bio-properties-panel-${id}`;
}
function OpenPopupButton({ onClick, title = "Open pop-up editor" }) {
	return u("button", {
		type: "button",
		title,
		class: "bio-properties-panel-open-feel-popup",
		onClick,
		children: u(OpenPopupIcon, {})
	});
}
var noop$5 = () => {};
/**
* Buffer `.focus()` calls while the editor is not initialized.
* Set Focus inside when the editor is ready.
*/
var useBufferedFocus$1 = function(editor, ref) {
	const [buffer, setBuffer] = d(void 0);
	ref.current = T$1(() => ({ focus: (offset) => {
		if (editor) editor.focus(offset);
		else {
			if (typeof offset === "undefined") offset = Infinity;
			setBuffer(offset);
		}
	} }), [editor]);
	y(() => {
		if (typeof buffer !== "undefined" && editor) {
			editor.focus(buffer);
			setBuffer(false);
		}
	}, [editor, buffer]);
};
var TemplatingEditor = D((props, ref) => {
	const { onInput, disabled, tooltipContainer, enableGutters, value, onLint = noop$5, onOpenPopup = noop$5, popupOpen, contentAttributes = {}, hostLanguage = null, singleLine = false } = props;
	const inputRef = A();
	const [editor, setEditor] = d();
	const [localValue, setLocalValue] = d(value || "");
	useBufferedFocus$1(editor, ref);
	const handleInput = useStaticCallback((newValue) => {
		onInput(newValue);
		setLocalValue(newValue);
	});
	y(() => {
		let editor;
		editor = new FeelersEditor({
			container: inputRef.current,
			onChange: handleInput,
			value: localValue,
			onLint,
			contentAttributes,
			tooltipContainer,
			enableGutters,
			hostLanguage,
			singleLine,
			lineWrap: true
		});
		setEditor(editor);
		return () => {
			onLint([]);
			inputRef.current.innerHTML = "";
			setEditor(null);
		};
	}, []);
	y(() => {
		if (!editor) return;
		if (value === localValue) return;
		editor.setValue(value);
		setLocalValue(value);
	}, [value]);
	const handleClick = () => {
		ref.current.focus();
	};
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-feelers-editor-container", popupOpen ? "popupOpen" : null),
		children: [
			popupOpen && u("div", {
				class: "bio-properties-panel-feelers-editor__popup-placeholder",
				children: "Opened in popup"
			}),
			u("div", {
				name: props.name,
				class: (0, import_classnames.default)("bio-properties-panel-feelers-editor bio-properties-panel-input", localValue ? "edited" : null, disabled ? "disabled" : null),
				ref: inputRef,
				onClick: handleClick
			}),
			!disabled && u(OpenPopupButton, { onClick: () => onOpenPopup("feelers") })
		]
	});
});
var noop$4 = () => {};
/**
* Buffer `.focus()` calls while the editor is not initialized.
* Set Focus inside when the editor is ready.
*/
var useBufferedFocus = function(editor, ref) {
	const [buffer, setBuffer] = d(void 0);
	ref.current = T$1(() => ({ focus: (offset) => {
		if (editor) editor.focus(offset);
		else {
			if (typeof offset === "undefined") offset = Infinity;
			setBuffer(offset);
		}
	} }), [editor]);
	y(() => {
		if (typeof buffer !== "undefined" && editor) {
			editor.focus(buffer);
			setBuffer(false);
		}
	}, [editor, buffer]);
};
var FeelEditor = D((props, ref) => {
	const { contentAttributes, enableGutters, value, onInput, onFeelToggle = noop$4, onLint = noop$4, onOpenPopup = noop$4, placeholder, popupOpen, disabled, tooltipContainer, variables, feelLanguageContext } = props;
	const inputRef = A();
	const [editor, setEditor] = d();
	const [localValue, setLocalValue] = d(value || "");
	const { builtins, dialect, parserDialect } = feelLanguageContext || {};
	useBufferedFocus(editor, ref);
	const handleInput = useStaticCallback((newValue) => {
		onInput(newValue);
		setLocalValue(newValue);
	});
	y(() => {
		let editor;
		const onKeyDown = (e) => {
			if (e.key !== "Backspace" || !editor) return;
			const selection = editor.getSelection();
			const range = selection.ranges[selection.mainIndex];
			if (range.from === 0 && range.to === 0) onFeelToggle();
		};
		editor = new FeelEditor$1({
			container: inputRef.current,
			onChange: handleInput,
			onKeyDown,
			onLint,
			placeholder,
			tooltipContainer,
			value: localValue,
			variables,
			builtins,
			dialect,
			parserDialect,
			extensions: [...enableGutters ? [lineNumbers()] : [], EditorView.lineWrapping],
			contentAttributes
		});
		setEditor(editor);
		return () => {
			onLint([]);
			inputRef.current.innerHTML = "";
			setEditor(null);
		};
	}, []);
	y(() => {
		if (!editor) return;
		if (value === localValue) return;
		editor.setValue(value);
		setLocalValue(value);
	}, [value]);
	y(() => {
		if (!editor) return;
		editor.setVariables(variables);
	}, [variables]);
	y(() => {
		if (!editor) return;
		editor.setPlaceholder(placeholder);
	}, [placeholder]);
	const handleClick = () => {
		ref.current.focus();
	};
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-feel-editor-container", disabled ? "disabled" : null, popupOpen ? "popupOpen" : null),
		children: [
			popupOpen && u("div", {
				class: "bio-properties-panel-feel-editor__open-popup-placeholder",
				children: "Opened in editor"
			}),
			u("div", {
				name: props.name,
				class: (0, import_classnames.default)("bio-properties-panel-input", localValue ? "edited" : null),
				ref: inputRef,
				onClick: handleClick
			}),
			!disabled && u(OpenPopupButton, { onClick: () => onOpenPopup("feel") })
		]
	});
});
function FeelIndicator(props) {
	const { active } = props;
	if (!active) return null;
	return u("span", {
		class: "bio-properties-panel-feel-indicator",
		children: "="
	});
}
var noop$3 = () => {};
/**
* @param {Object} props
* @param {Object} props.label
* @param {String} props.feel
*/
function FeelIcon(props) {
	const { feel = false, active, disabled = false, onClick = noop$3 } = props;
	const feelRequiredLabel = "FEEL expression is mandatory";
	const feelOptionalLabel = `Click to ${active ? "remove" : "set a"} dynamic value with FEEL expression`;
	const handleClick = (e) => {
		onClick(e);
		if (!e.pointerType) e.stopPropagation();
	};
	return u("button", {
		type: "button",
		class: (0, import_classnames.default)("bio-properties-panel-feel-icon", active ? "active" : null, feel === "required" ? "required" : "optional"),
		onClick: handleClick,
		disabled: feel === "required" || disabled,
		title: feel === "required" ? feelRequiredLabel : feelOptionalLabel,
		children: u(FeelIcon$1, {})
	});
}
function ToggleSwitch(props) {
	const { id, label, onInput, value, switcherLabel, inline, onFocus, onBlur, inputRef, tooltip } = props;
	const [localValue, setLocalValue] = d(value);
	const handleInputCallback = async () => {
		onInput(!value);
	};
	const handleInput = (e) => {
		handleInputCallback();
		setLocalValue(e.target.value);
	};
	y(() => {
		if (value === localValue) return;
		setLocalValue(value);
	}, [value]);
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-toggle-switch", { inline }),
		children: [u("label", {
			class: "bio-properties-panel-label",
			for: prefixId$7(id),
			children: u(TooltipWrapper, {
				value: tooltip,
				forId: id,
				element: props.element,
				children: label
			})
		}), u("div", {
			class: "bio-properties-panel-field-wrapper",
			children: [u("label", {
				class: "bio-properties-panel-toggle-switch__switcher",
				children: [u("input", {
					ref: inputRef,
					id: prefixId$7(id),
					class: "bio-properties-panel-input",
					type: "checkbox",
					onFocus,
					onBlur,
					name: id,
					onInput: handleInput,
					checked: !!localValue
				}), u("span", { class: "bio-properties-panel-toggle-switch__slider" })]
			}), switcherLabel && u("p", {
				class: "bio-properties-panel-toggle-switch__label",
				children: switcherLabel
			})]
		})]
	});
}
/**
* @param {Object} props
* @param {Object} props.element
* @param {String} props.id
* @param {String} props.description
* @param {String} props.label
* @param {String} props.switcherLabel
* @param {Boolean} props.inline
* @param {Function} props.getValue
* @param {Function} props.setValue
* @param {Function} props.onFocus
* @param {Function} props.onBlur
* @param {string|import('preact').Component} props.tooltip
*/
function ToggleSwitchEntry(props) {
	const { element, id, description, label, switcherLabel, inline, getValue, setValue, onFocus, onBlur, tooltip } = props;
	return u("div", {
		class: "bio-properties-panel-entry bio-properties-panel-toggle-switch-entry",
		"data-entry-id": id,
		children: [u(ToggleSwitch, {
			id,
			label,
			value: getValue(element),
			onInput: setValue,
			onFocus,
			onBlur,
			switcherLabel,
			inline,
			tooltip,
			element
		}), u(Description$1, {
			forId: id,
			element,
			value: description
		})]
	});
}
function isEdited$7(node) {
	return node && !!node.checked;
}
function prefixId$7(id) {
	return `bio-properties-panel-${id}`;
}
function NumberField(props) {
	const { debounce, disabled, displayLabel = true, id, inputRef, label, max, min, onInput, step, value = "", onFocus, onBlur, tooltip } = props;
	const [localValue, setLocalValue] = d(value);
	const handleInputCallback = T$1(() => {
		return debounce((target) => {
			if (target.validity.valid) onInput(target.value ? parseFloat(target.value) : void 0);
		});
	}, [onInput, debounce]);
	const handleInput = (e) => {
		handleInputCallback(e.target);
		setLocalValue(e.target.value);
	};
	y(() => {
		if (value === localValue) return;
		setLocalValue(value);
	}, [value]);
	return u("div", {
		class: "bio-properties-panel-numberfield",
		children: [displayLabel && u("label", {
			for: prefixId$6(id),
			class: "bio-properties-panel-label",
			children: u(TooltipWrapper, {
				value: tooltip,
				forId: id,
				element: props.element,
				children: label
			})
		}), u("input", {
			id: prefixId$6(id),
			ref: inputRef,
			type: "number",
			name: id,
			spellCheck: "false",
			autoComplete: "off",
			disabled,
			class: "bio-properties-panel-input",
			max,
			min,
			onInput: handleInput,
			onFocus,
			onBlur,
			step,
			value: localValue
		})]
	});
}
/**
* @param {Object} props
* @param {Boolean} props.debounce
* @param {String} props.description
* @param {Boolean} props.disabled
* @param {Object} props.element
* @param {Function} props.getValue
* @param {String} props.id
* @param {String} props.label
* @param {String} props.max
* @param {String} props.min
* @param {Function} props.setValue
* @param {Function} props.onFocus
* @param {Function} props.onBlur
* @param {String} props.step
* @param {Function} props.validate
*/
function NumberFieldEntry(props) {
	const { debounce, description, disabled, element, getValue, id, label, max, min, setValue, step, onFocus, onBlur, validate, tooltip } = props;
	const globalError = useError(id);
	const [localError, setLocalError] = d(null);
	let value = getValue(element);
	y(() => {
		if (isFunction(validate)) setLocalError(validate(value) || null);
	}, [value, validate]);
	const onInput = (newValue) => {
		let newValidationError = null;
		if (isFunction(validate)) newValidationError = validate(newValue) || null;
		setValue(newValue, newValidationError);
		setLocalError(newValidationError);
	};
	const error = globalError || localError;
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-entry", error ? "has-error" : ""),
		"data-entry-id": id,
		children: [
			u(NumberField, {
				debounce,
				disabled,
				id,
				label,
				onFocus,
				onBlur,
				onInput,
				max,
				min,
				step,
				value,
				tooltip
			}, element),
			error && u("div", {
				class: "bio-properties-panel-error",
				children: error
			}),
			u(Description$1, {
				forId: id,
				element,
				value: description
			})
		]
	});
}
function isEdited$6(node) {
	return node && !!node.value;
}
function prefixId$6(id) {
	return `bio-properties-panel-${id}`;
}
var noop$2 = () => {};
/**
* @typedef {'required'|'optional'|'static'} FeelType
*/
/**
* @param {Object} props
* @param {Boolean} props.debounce
* @param {String} props.id
* @param {Object} props.element
* @param {String} props.label
* @param {String} props.hostLanguage
* @param {Function} props.onInput
* @param {Function} props.onBlur
* @param {Function} props.onError
* @param {FeelType} [props.feel]
* @param {String} props.value
* @param {Boolean} [props.singleLine]
* @param {Function} props.tooltipContainer
* @param {Function | import('preact').Component} props.OptionalComponent
* @param {Boolean} props.disabled
* @param {Array} props.variables
* @param {string} [props.placeholder]
* @param {string | import('preact').Component} props.tooltip
*/
function FeelTextfield(props) {
	const { debounce, id, element, label, hostLanguage, onInput, onBlur, onError, placeholder, feel, value = "", disabled = false, variables, singleLine, tooltipContainer, OptionalComponent = OptionalFeelInput, tooltip } = props;
	const [localValue, setLocalValue] = d(value);
	const editorRef = useShowEntryEvent(id);
	const containerRef = A();
	const feelActive = isString(localValue) && localValue.startsWith("=") || feel === "required";
	const feelOnlyValue = isString(localValue) && localValue.startsWith("=") ? localValue.substring(1) : localValue;
	const feelLanguageContext = x(FeelLanguageContext);
	const [focus, _setFocus] = d(void 0);
	const { eventBus } = x(EventContext);
	const [isPopupOpen, setIsPopupOpen] = d(false);
	const setFocus = (offset = 0) => {
		_setFocus((containerRef.current.contains(document.activeElement) ? document.activeElement.selectionStart : Infinity) + offset);
	};
	/**
	* @type { import('min-dash').DebouncedFunction }
	*/
	const handleInputCallback = useDebounce(onInput, debounce);
	const handleInput = (newValue) => {
		handleInputCallback(newValue === "" || newValue === "=" ? void 0 : newValue);
	};
	const handleFeelToggle = useStaticCallback(() => {
		if (feel === "required") return;
		if (!feelActive) {
			setLocalValue("=" + localValue);
			handleInput("=" + localValue);
		} else {
			setLocalValue(feelOnlyValue);
			handleInput(feelOnlyValue);
		}
	});
	const handleLocalInput = (newValue) => {
		if (feelActive) newValue = "=" + newValue;
		if (newValue === localValue) return;
		setLocalValue(newValue);
		handleInput(newValue);
		if (!feelActive && isString(newValue) && newValue.startsWith("=")) setFocus(-1);
	};
	const handleOnBlur = (e) => {
		if (e.target.type === "checkbox") onInput(e.target.checked);
		else onInput(e.target.value.trim());
		if (onBlur) onBlur(e);
	};
	const handleLint = useStaticCallback((lint = []) => {
		if (lint.some((report) => report.type === "Syntax Error")) onError("Unparsable FEEL expression.");
		else onError(void 0);
	});
	const handleOpenPopup = (type = "feel") => {
		const isOpen = eventBus.fire("propertiesPanel.openPopup", {
			element,
			entryId: id,
			hostLanguage,
			label,
			onInput: handleLocalInput,
			singleLine,
			sourceElement: editorRef.current,
			tooltipContainer,
			type,
			value: feelOnlyValue,
			variables,
			feelLanguageContext
		});
		if (isOpen) eventBus.once("propertiesPanelPopup.close", () => {
			setIsPopupOpen(false);
		});
		setIsPopupOpen(isOpen === true);
	};
	y(() => {
		if (typeof focus !== "undefined") {
			editorRef.current.focus(focus);
			_setFocus(void 0);
		}
	}, [focus]);
	y(() => {
		if (value === localValue) return;
		if (!value) {
			setLocalValue(feelActive ? "=" : "");
			return;
		}
		setLocalValue(value);
	}, [value]);
	y(() => {
		return () => {
			eventBus.fire("propertiesPanel.closePopup");
		};
	}, []);
	y(() => {
		const copyHandler = (event) => {
			if (!feelActive) return;
			event.clipboardData.setData("application/FEEL", event.clipboardData.getData("text"));
		};
		const pasteHandler = (event) => {
			if (feelActive || isPopupOpen) return;
			if (event.clipboardData.getData("application/FEEL")) setTimeout(() => {
				handleFeelToggle();
				setFocus();
			});
		};
		containerRef.current.addEventListener("copy", copyHandler);
		containerRef.current.addEventListener("cut", copyHandler);
		containerRef.current.addEventListener("paste", pasteHandler);
		return () => {
			containerRef.current.removeEventListener("copy", copyHandler);
			containerRef.current.removeEventListener("cut", copyHandler);
			containerRef.current.removeEventListener("paste", pasteHandler);
		};
	}, [
		containerRef,
		feelActive,
		handleFeelToggle,
		setFocus
	]);
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-feel-entry", { "feel-active": feelActive }),
		children: [u("label", {
			for: prefixId$5(id),
			class: "bio-properties-panel-label",
			onClick: () => setFocus(),
			children: [u(TooltipWrapper, {
				value: tooltip,
				forId: id,
				element: props.element,
				children: label
			}), u(FeelIcon, {
				label,
				feel,
				onClick: handleFeelToggle,
				active: feelActive
			})]
		}), u("div", {
			class: "bio-properties-panel-feel-container",
			ref: containerRef,
			children: [u(FeelIndicator, {
				active: feelActive,
				disabled: feel !== "optional" || disabled,
				onClick: handleFeelToggle
			}), feelActive ? u(FeelEditor, {
				name: id,
				onInput: handleLocalInput,
				contentAttributes: {
					"id": prefixId$5(id),
					"aria-label": label
				},
				disabled,
				popupOpen: isPopupOpen,
				onFeelToggle: () => {
					handleFeelToggle();
					setFocus(true);
				},
				onLint: handleLint,
				onOpenPopup: handleOpenPopup,
				placeholder,
				value: feelOnlyValue,
				variables,
				feelLanguageContext,
				ref: editorRef,
				tooltipContainer
			}) : u(OptionalComponent, {
				...props,
				popupOpen: isPopupOpen,
				onInput: handleLocalInput,
				onBlur: handleOnBlur,
				contentAttributes: {
					"id": prefixId$5(id),
					"aria-label": label
				},
				value: localValue,
				ref: editorRef,
				onOpenPopup: handleOpenPopup,
				containerRef
			})]
		})]
	});
}
var OptionalFeelInput = D((props, ref) => {
	const { id, disabled, onInput, value, onFocus, onBlur, placeholder } = props;
	const inputRef = A();
	ref.current = { focus: (position) => {
		const input = inputRef.current;
		if (!input) return;
		input.focus();
		if (typeof position === "number") {
			if (position > value.length) position = value.length;
			input.setSelectionRange(position, position);
		}
	} };
	return u("input", {
		id: prefixId$5(id),
		type: "text",
		ref: inputRef,
		name: id,
		spellCheck: "false",
		autoComplete: "off",
		disabled,
		class: "bio-properties-panel-input",
		onInput: (e) => onInput(e.target.value),
		onFocus,
		onBlur,
		placeholder,
		value: value || ""
	});
});
var OptionalFeelNumberField = D((props, ref) => {
	const { id, debounce, disabled, onInput, value, min, max, step, onFocus, onBlur } = props;
	const inputRef = A();
	ref.current = { focus: (position) => {
		const input = inputRef.current;
		if (!input) return;
		input.focus();
		if (typeof position === "number" && position !== Infinity) {
			if (position > value.length) position = value.length;
			input.setSelectionRange(position, position);
		}
	} };
	return u(NumberField, {
		id,
		debounce,
		disabled,
		displayLabel: false,
		inputRef,
		max,
		min,
		onInput,
		step,
		value,
		onFocus,
		onBlur
	});
});
D((props, ref) => {
	const { id, disabled, onInput, value, onFocus, onBlur, placeholder } = props;
	const inputRef = A();
	ref.current = { focus: () => {
		const input = inputRef.current;
		if (!input) return;
		input.focus();
		input.setSelectionRange(0, 0);
	} };
	return u("textarea", {
		id: prefixId$5(id),
		type: "text",
		ref: inputRef,
		name: id,
		spellCheck: "false",
		autoComplete: "off",
		disabled,
		class: "bio-properties-panel-input",
		onInput: (e) => onInput(e.target.value),
		onFocus,
		onBlur,
		placeholder,
		value: value || "",
		"data-gramm": "false"
	});
});
var OptionalFeelToggleSwitch = D((props, ref) => {
	const { id, onInput, value, onFocus, onBlur, switcherLabel } = props;
	const inputRef = A();
	ref.current = { focus: () => {
		const input = inputRef.current;
		if (!input) return;
		input.focus();
	} };
	return u(ToggleSwitch, {
		id,
		value,
		inputRef,
		onInput,
		onFocus,
		onBlur,
		switcherLabel
	});
});
D((props, ref) => {
	const { id, disabled, onInput, value, onFocus, onBlur } = props;
	const inputRef = A();
	const handleChange = ({ target }) => {
		onInput(target.checked);
	};
	ref.current = { focus: () => {
		const input = inputRef.current;
		if (!input) return;
		input.focus();
	} };
	return u("input", {
		ref: inputRef,
		id: prefixId$5(id),
		name: id,
		onFocus,
		onBlur,
		type: "checkbox",
		class: "bio-properties-panel-input",
		onChange: handleChange,
		checked: value,
		disabled
	});
});
/**
* @param {Object} props
* @param {Object} props.element
* @param {String} props.id
* @param {String} props.description
* @param {Boolean} props.debounce
* @param {Boolean} props.disabled
* @param {FeelType} [props.feel]
* @param {String} props.label
* @param {Function} props.getValue
* @param {Function} props.setValue
* @param {Function} props.tooltipContainer
* @param {Function} props.validate
* @param {Function} props.show
* @param {Function} props.example
* @param {Array} props.variables
* @param {Function} props.onFocus
* @param {Function} props.onBlur
* @param {string} [props.placeholder]
* @param {string|import('preact').Component} props.tooltip
*/
function FeelEntry(props) {
	const { element, id, description, debounce, disabled, feel, label, getValue, setValue, tooltipContainer, hostLanguage, singleLine, validate, show = noop$2, example, variables, onFocus, onBlur, placeholder, tooltip } = props;
	const [validationError, setValidationError] = d(null);
	const [localError, setLocalError] = d(null);
	let value = getValue(element);
	y(() => {
		if (isFunction(validate)) setValidationError(validate(value) || null);
	}, [value, validate]);
	const onInput = useStaticCallback((newValue) => {
		const value = getValue(element);
		let newValidationError = null;
		if (isFunction(validate)) newValidationError = validate(newValue) || null;
		if (newValue !== value) setValue(newValue, newValidationError);
		setValidationError(newValidationError);
	});
	const onError = q((err) => {
		setLocalError(err);
	}, []);
	const error = useError(id) || localError || validationError;
	return u("div", {
		class: (0, import_classnames.default)(props.class, "bio-properties-panel-entry", error ? "has-error" : ""),
		"data-entry-id": id,
		children: [
			_(FeelTextfield, {
				...props,
				debounce,
				disabled,
				feel,
				id,
				key: element,
				label,
				onInput,
				onError,
				onFocus,
				onBlur,
				placeholder,
				example,
				hostLanguage,
				singleLine,
				show,
				value,
				variables,
				tooltipContainer,
				OptionalComponent: props.OptionalComponent,
				tooltip
			}),
			error && u("div", {
				class: "bio-properties-panel-error",
				children: error
			}),
			u(Description$1, {
				forId: id,
				element,
				value: description
			})
		]
	});
}
/**
* @param {Object} props
* @param {Object} props.element
* @param {String} props.id
* @param {String} props.description
* @param {Boolean} props.debounce
* @param {Boolean} props.disabled
* @param {String} props.max
* @param {String} props.min
* @param {String} props.step
* @param {FeelType} [props.feel]
* @param {String} props.label
* @param {Function} props.getValue
* @param {Function} props.setValue
* @param {Function} props.tooltipContainer
* @param {Function} props.validate
* @param {Function} props.show
* @param {Function} props.example
* @param {Array} props.variables
* @param {Function} props.onFocus
* @param {Function} props.onBlur
*/
function FeelNumberEntry(props) {
	return u(FeelEntry, {
		class: "bio-properties-panel-feel-number",
		OptionalComponent: OptionalFeelNumberField,
		...props
	});
}
/**
* @param {Object} props
* @param {Object} props.element
* @param {String} props.id
* @param {String} props.description
* @param {Boolean} props.debounce
* @param {Boolean} props.disabled
* @param {FeelType} [props.feel]
* @param {String} props.label
* @param {Function} props.getValue
* @param {Function} props.setValue
* @param {Function} props.tooltipContainer
* @param {Function} props.validate
* @param {Function} props.show
* @param {Function} props.example
* @param {Array} props.variables
* @param {Function} props.onFocus
* @param {Function} props.onBlur
*/
function FeelToggleSwitchEntry(props) {
	return u(FeelEntry, {
		class: "bio-properties-panel-feel-toggle-switch",
		OptionalComponent: OptionalFeelToggleSwitch,
		...props
	});
}
/**
* @param {Object} props
* @param {Object} props.element
* @param {String} props.id
* @param {String} props.description
* @param {String} props.hostLanguage
* @param {Boolean} props.singleLine
* @param {Boolean} props.debounce
* @param {Boolean} props.disabled
* @param {FeelType} [props.feel]
* @param {String} props.label
* @param {Function} props.getValue
* @param {Function} props.setValue
* @param {Function} props.tooltipContainer
* @param {Function} props.validate
* @param {Function} props.show
* @param {Function} props.example
* @param {Array} props.variables
* @param {Function} props.onFocus
* @param {Function} props.onBlur
*/
function FeelTemplatingEntry(props) {
	return u(FeelEntry, {
		class: "bio-properties-panel-feel-templating",
		OptionalComponent: TemplatingEditor,
		...props
	});
}
function isEdited$5(node) {
	if (!node) return false;
	if (node.type === "checkbox") return !!node.checked || node.classList.contains("edited");
	return !!node.value || node.classList.contains("edited");
}
function prefixId$5(id) {
	return `bio-properties-panel-${id}`;
}
function Select(props) {
	const { id, label, onChange, options = [], value = "", disabled, onFocus, onBlur, tooltip } = props;
	const ref = useShowEntryEvent(id);
	const [localValue, setLocalValue] = d(value);
	const handleChangeCallback = ({ target }) => {
		onChange(target.value);
	};
	const handleChange = (e) => {
		handleChangeCallback(e);
		setLocalValue(e.target.value);
	};
	y(() => {
		if (value === localValue) return;
		setLocalValue(value);
	}, [value]);
	return u("div", {
		class: "bio-properties-panel-select",
		children: [u("label", {
			for: prefixId$4(id),
			class: "bio-properties-panel-label",
			children: u(TooltipWrapper, {
				value: tooltip,
				forId: id,
				element: props.element,
				children: label
			})
		}), u("select", {
			ref,
			id: prefixId$4(id),
			name: id,
			class: "bio-properties-panel-input",
			onInput: handleChange,
			onFocus,
			onBlur,
			value: localValue,
			disabled,
			children: options.map((option, idx) => {
				if (option.children) return u("optgroup", {
					label: option.label,
					children: option.children.map((child, idx) => u("option", {
						value: child.value,
						disabled: child.disabled,
						children: child.label
					}, idx))
				}, idx);
				return u("option", {
					value: option.value,
					disabled: option.disabled,
					children: option.label
				}, idx);
			})
		})]
	});
}
/**
* @param {object} props
* @param {object} props.element
* @param {string} props.id
* @param {string} [props.description]
* @param {string} props.label
* @param {Function} props.getValue
* @param {Function} props.setValue
* @param {Function} props.onFocus
* @param {Function} props.onBlur
* @param {Function} props.getOptions
* @param {boolean} [props.disabled]
* @param {Function} [props.validate]
* @param {string|import('preact').Component} props.tooltip
*/
function SelectEntry(props) {
	const { element, id, description, label, getValue, setValue, getOptions, disabled, onFocus, onBlur, validate, tooltip } = props;
	const options = getOptions(element);
	const globalError = useError(id);
	const [localError, setLocalError] = d(null);
	let value = getValue(element);
	y(() => {
		if (isFunction(validate)) setLocalError(validate(value) || null);
	}, [value, validate]);
	const onChange = (newValue) => {
		let newValidationError = null;
		if (isFunction(validate)) newValidationError = validate(newValue) || null;
		setValue(newValue, newValidationError);
		setLocalError(newValidationError);
	};
	const error = globalError || localError;
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-entry", error ? "has-error" : ""),
		"data-entry-id": id,
		children: [
			u(Select, {
				id,
				label,
				value,
				onChange,
				onFocus,
				onBlur,
				options,
				disabled,
				tooltip,
				element
			}, element),
			error && u("div", {
				class: "bio-properties-panel-error",
				children: error
			}),
			u(Description$1, {
				forId: id,
				element,
				value: description
			})
		]
	});
}
function isEdited$3(node) {
	return node && !!node.value;
}
function prefixId$4(id) {
	return `bio-properties-panel-${id}`;
}
function resizeToContents(element) {
	element.style.height = "auto";
	element.style.height = `${element.scrollHeight + 2}px`;
}
function TextArea(props) {
	const { id, label, debounce, onInput, value = "", disabled, monospace, onFocus, onBlur, autoResize = true, placeholder, rows = autoResize ? 1 : 2, tooltip } = props;
	const [localValue, setLocalValue] = d(value);
	const ref = useShowEntryEvent(id);
	const visible = useElementVisible(ref.current);
	/**
	* @type { import('min-dash').DebouncedFunction }
	*/
	const handleInputCallback = useDebounce(onInput, debounce);
	const handleInput = (newValue) => {
		handleInputCallback(newValue === "" ? void 0 : newValue);
	};
	const handleLocalInput = (e) => {
		autoResize && resizeToContents(e.target);
		if (e.target.value === localValue) return;
		setLocalValue(e.target.value);
		handleInput(e.target.value);
	};
	const handleOnBlur = (e) => {
		onInput(e.target.value.trim());
		if (onBlur) onBlur(e);
	};
	_$1(() => {
		autoResize && resizeToContents(ref.current);
	}, []);
	_$1(() => {
		visible && autoResize && resizeToContents(ref.current);
	}, [visible]);
	y(() => {
		if (value === localValue) return;
		setLocalValue(value);
	}, [value]);
	return u("div", {
		class: "bio-properties-panel-textarea",
		children: [u("label", {
			for: prefixId$2(id),
			class: "bio-properties-panel-label",
			children: u(TooltipWrapper, {
				value: tooltip,
				forId: id,
				element: props.element,
				children: label
			})
		}), u("textarea", {
			ref,
			id: prefixId$2(id),
			name: id,
			spellCheck: "false",
			class: (0, import_classnames.default)("bio-properties-panel-input", monospace ? "bio-properties-panel-input-monospace" : "", autoResize ? "auto-resize" : ""),
			onInput: handleLocalInput,
			onFocus,
			onBlur: handleOnBlur,
			placeholder,
			rows,
			value: localValue,
			disabled,
			"data-gramm": "false"
		})]
	});
}
/**
* @param {object} props
* @param {object} props.element
* @param {string} props.id
* @param {string} props.description
* @param {boolean} props.debounce
* @param {string} props.label
* @param {Function} props.getValue
* @param {Function} props.setValue
* @param {Function} props.onFocus
* @param {Function} props.onBlur
* @param {number} props.rows
* @param {boolean} props.monospace
* @param {Function} [props.validate]
* @param {boolean} [props.disabled]
*/
function TextAreaEntry(props) {
	const { element, id, description, debounce, label, getValue, setValue, rows, monospace, disabled, validate, onFocus, onBlur, placeholder, autoResize, tooltip } = props;
	const globalError = useError(id);
	const [localError, setLocalError] = d(null);
	let value = getValue(element);
	y(() => {
		if (isFunction(validate)) setLocalError(validate(value) || null);
	}, [value, validate]);
	const onInput = useStaticCallback((newValue) => {
		const value = getValue(element);
		let newValidationError = null;
		if (isFunction(validate)) newValidationError = validate(newValue) || null;
		if (newValue !== value) setValue(newValue, newValidationError);
		setLocalError(newValidationError);
	});
	const error = globalError || localError;
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-entry", error ? "has-error" : ""),
		"data-entry-id": id,
		children: [
			u(TextArea, {
				id,
				label,
				value,
				onInput,
				onFocus,
				onBlur,
				rows,
				debounce,
				monospace,
				disabled,
				placeholder,
				autoResize,
				tooltip,
				element
			}, element),
			error && u("div", {
				class: "bio-properties-panel-error",
				children: error
			}),
			u(Description$1, {
				forId: id,
				element,
				value: description
			})
		]
	});
}
function isEdited$1(node) {
	return node && !!node.value;
}
function prefixId$2(id) {
	return `bio-properties-panel-${id}`;
}
function Textfield(props) {
	const { debounce, disabled = false, id, label, onInput, onFocus, onBlur, placeholder, value = "", tooltip } = props;
	const [localValue, setLocalValue] = d(value || "");
	const ref = useShowEntryEvent(id);
	/**
	* @type { import('min-dash').DebouncedFunction }
	*/
	const handleInputCallback = useDebounce(onInput, debounce);
	const handleOnBlur = (e) => {
		onInput(e.target.value.trim());
		if (onBlur) onBlur(e);
	};
	const handleInput = (newValue) => {
		handleInputCallback(newValue === "" ? void 0 : newValue);
	};
	const handleLocalInput = (e) => {
		if (e.target.value === localValue) return;
		setLocalValue(e.target.value);
		handleInput(e.target.value);
	};
	y(() => {
		if (value === localValue) return;
		setLocalValue(value);
	}, [value]);
	return u("div", {
		class: "bio-properties-panel-textfield",
		children: [u("label", {
			for: prefixId$1(id),
			class: "bio-properties-panel-label",
			children: u(TooltipWrapper, {
				value: tooltip,
				forId: id,
				element: props.element,
				children: label
			})
		}), u("input", {
			ref,
			id: prefixId$1(id),
			type: "text",
			name: id,
			spellCheck: "false",
			autoComplete: "off",
			disabled,
			class: "bio-properties-panel-input",
			onInput: handleLocalInput,
			onFocus,
			onBlur: handleOnBlur,
			placeholder,
			value: localValue
		})]
	});
}
/**
* @param {Object} props
* @param {Object} props.element
* @param {String} props.id
* @param {String} props.description
* @param {Boolean} props.debounce
* @param {Boolean} props.disabled
* @param {String} props.label
* @param {Function} props.getValue
* @param {Function} props.setValue
* @param {Function} props.onFocus
* @param {Function} props.onBlur
* @param {string|import('preact').Component} props.tooltip
* @param {Function} props.validate
*/
function TextfieldEntry(props) {
	const { element, id, description, debounce, disabled, label, getValue, setValue, validate, onFocus, onBlur, placeholder, tooltip } = props;
	const globalError = useError(id);
	const [localError, setLocalError] = d(null);
	let value = getValue(element);
	y(() => {
		if (isFunction(validate)) setLocalError(validate(value) || null);
	}, [value, validate]);
	const onInput = useStaticCallback((newValue) => {
		const value = getValue(element);
		let newValidationError = null;
		if (isFunction(validate)) newValidationError = validate(newValue) || null;
		if (newValue !== value) setValue(newValue, newValidationError);
		setLocalError(newValidationError);
	});
	const error = globalError || localError;
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-entry", error ? "has-error" : ""),
		"data-entry-id": id,
		children: [
			u(Textfield, {
				debounce,
				disabled,
				id,
				label,
				onInput,
				onFocus,
				onBlur,
				placeholder,
				value,
				tooltip,
				element
			}, element),
			error && u("div", {
				class: "bio-properties-panel-error",
				children: error
			}),
			u(Description$1, {
				forId: id,
				element,
				value: description
			})
		]
	});
}
function isEdited(node) {
	return node && !!node.value;
}
function prefixId$1(id) {
	return `bio-properties-panel-${id}`;
}
/**
* Add a dragger that calls back the passed function with
* { event, delta } on drag.
*
* @example
*
* function dragMove(event, delta) {
*   // we are dragging (!!)
* }
*
* domElement.addEventListener('dragstart', dragger(dragMove));
*
* @param {Function} fn
* @param {Element} [dragPreview]
*
* @return {Function} drag start callback function
*/
function createDragger(fn, dragPreview) {
	let self;
	let startX, startY;
	/** drag start */
	function onDragStart(event) {
		self = this;
		startX = event.clientX;
		startY = event.clientY;
		if (event.dataTransfer) event.dataTransfer.setDragImage(dragPreview || emptyCanvas(), 0, 0);
		document.addEventListener("dragover", onDrag, true);
		document.addEventListener("dragenter", preventDefault, true);
		document.addEventListener("dragend", onEnd);
		document.addEventListener("drop", preventDefault);
	}
	function onDrag(event) {
		const delta = {
			x: event.clientX - startX,
			y: event.clientY - startY
		};
		return fn.call(self, event, delta);
	}
	function onEnd() {
		document.removeEventListener("dragover", onDrag, true);
		document.removeEventListener("dragenter", preventDefault, true);
		document.removeEventListener("dragend", onEnd);
		document.removeEventListener("drop", preventDefault);
	}
	return onDragStart;
}
function preventDefault(event) {
	event.preventDefault();
	event.stopPropagation();
}
function emptyCanvas() {
	return domify$1("<canvas width=\"0\" height=\"0\" />");
}
var noop = () => {};
/**
* A generic popup component.
*
* @param {Object} props
* @param {string} [props.className]
* @param {boolean} [props.delayInitialFocus]
* @param {{top: number, left: number}} [props.position]
* @param {number} [props.width]
* @param {number} [props.height]
* @param {Function} props.onClose
* @param {Function} [props.onPostActivate]
* @param {Function} [props.onPostDeactivate]
* @param {boolean} [props.returnFocus]
* @param {boolean} [props.closeOnEscape]
* @param {string} props.title
* @param {Ref} [ref]
*/
function PopupComponent(props, globalRef) {
	const { className, delayInitialFocus, position, width, height, onClose, onPostActivate = noop, onPostDeactivate = noop, returnFocus = true, closeOnEscape = true, title } = props;
	const focusTrapRef = A(null);
	const localRef = A(null);
	const popupRef = globalRef || localRef;
	const handleKeydown = (event) => {
		event.stopPropagation();
		if (closeOnEscape && event.key === "Escape") onClose();
	};
	const handleFocus = () => {
		if (focusTrapRef.current) focusTrapRef.current.activate();
	};
	let style = {};
	if (position) style = {
		...style,
		top: position.top + "px",
		left: position.left + "px"
	};
	if (width) style.width = width + "px";
	if (height) style.height = height + "px";
	y(() => {
		if (popupRef.current) popupRef.current.addEventListener("focusin", handleFocus);
		return () => {
			if (popupRef.current) popupRef.current.removeEventListener("focusin", handleFocus);
		};
	}, [popupRef]);
	y(() => {
		if (popupRef.current) {
			focusTrapRef.current = createFocusTrap(popupRef.current, {
				clickOutsideDeactivates: true,
				delayInitialFocus,
				fallbackFocus: popupRef.current,
				onPostActivate,
				onPostDeactivate,
				returnFocusOnDeactivate: returnFocus
			});
			focusTrapRef.current.activate();
		}
		return () => focusTrapRef.current && focusTrapRef.current.deactivate();
	}, [popupRef]);
	return u("div", {
		"aria-label": title,
		tabIndex: -1,
		ref: popupRef,
		onKeyDown: handleKeydown,
		role: "dialog",
		class: (0, import_classnames.default)("bio-properties-panel-popup", className),
		style,
		children: props.children
	});
}
var Popup = D(PopupComponent);
Popup.Title = Title;
Popup.Body = Body;
Popup.Footer = Footer;
function Title(props) {
	const { children, className, draggable, eventBus, title, showCloseButton = false, closeButtonTooltip = "Close popup", onClose, ...rest } = props;
	const context = A({
		startPosition: null,
		newPosition: null
	});
	const dragPreviewRef = A();
	const titleRef = A();
	const onMove = (event, delta) => {
		cancel(event);
		const { x: dx, y: dy } = delta;
		const newPosition = {
			x: context.current.startPosition.x + dx,
			y: context.current.startPosition.y + dy
		};
		const popupParent = getPopupParent(titleRef.current);
		popupParent.style.top = newPosition.y + "px";
		popupParent.style.left = newPosition.x + "px";
		eventBus?.fire("feelPopup.dragover", {
			newPosition,
			delta
		});
	};
	const onMoveStart = (event) => {
		createDragger(onMove, dragPreviewRef.current)(event);
		event.stopPropagation();
		const bounds = getPopupParent(titleRef.current).getBoundingClientRect();
		context.current.startPosition = {
			x: bounds.left,
			y: bounds.top
		};
		eventBus?.fire("feelPopup.dragstart");
	};
	const onMoveEnd = () => {
		context.current.newPosition = null;
		eventBus?.fire("feelPopup.dragend");
	};
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-popup__header", draggable && "draggable", className),
		ref: titleRef,
		draggable,
		onDragStart: onMoveStart,
		onDragEnd: onMoveEnd,
		...rest,
		children: [
			draggable && u(k, { children: [u("div", {
				ref: dragPreviewRef,
				class: "bio-properties-panel-popup__drag-preview"
			}), u("div", {
				class: "bio-properties-panel-popup__drag-handle",
				children: u(DragIcon, {})
			})] }),
			u("div", {
				class: "bio-properties-panel-popup__title",
				children: title
			}),
			children,
			showCloseButton && u("button", {
				title: closeButtonTooltip,
				class: "bio-properties-panel-popup__close",
				onClick: onClose,
				children: u(CloseIcon, {})
			})
		]
	});
}
function Body(props) {
	const { children, className, ...rest } = props;
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-popup__body", className),
		...rest,
		children
	});
}
function Footer(props) {
	const { children, className, ...rest } = props;
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-popup__footer", className),
		...rest,
		children: props.children
	});
}
function getPopupParent(node) {
	return node.closest(".bio-properties-panel-popup");
}
function cancel(event) {
	event.preventDefault();
	event.stopPropagation();
}
var FEEL_POPUP_WIDTH = 700;
var FEEL_POPUP_HEIGHT = 250;
/**
* FEEL expression editor popup component
* @param {FeelPopupProps} props
*/
function FeelPopup$1(props) {
	const { entryId, onInput, onClose, title, type, value, links, variables, position, hostLanguage, singleLine, sourceElement, tooltipContainer, eventBus, feelLanguageContext } = props;
	const editorRef = A();
	const popupRef = A();
	const isAutoCompletionOpen = A(false);
	const handleSetReturnFocus = () => {
		sourceElement && sourceElement.focus();
	};
	const onKeyDownCapture = (event) => {
		if (event.key === "Escape") isAutoCompletionOpen.current = autoCompletionOpen(event.target);
	};
	const onKeyDown = (event) => {
		if (event.key === "Escape") {
			if (!isAutoCompletionOpen.current) {
				onClose();
				isAutoCompletionOpen.current = false;
			}
		}
	};
	y(() => {
		if (editorRef.current) editorRef.current.focus();
	}, [editorRef]);
	return u(Popup, {
		className: "bio-properties-panel-feel-popup",
		position,
		title,
		returnFocus: false,
		closeOnEscape: false,
		delayInitialFocus: false,
		onPostDeactivate: handleSetReturnFocus,
		height: FEEL_POPUP_HEIGHT,
		width: FEEL_POPUP_WIDTH,
		ref: popupRef,
		children: [u(Popup.Title, {
			title,
			eventBus,
			showCloseButton: true,
			closeButtonTooltip: "Save and close",
			onClose,
			draggable: true,
			children: u(k, { children: (links || []).map((link, index) => {
				return u("a", {
					rel: "noreferrer",
					href: link.href,
					target: "_blank",
					class: "bio-properties-panel-feel-popup__title-link",
					children: [link.title, u(LaunchIcon, {})]
				}, index);
			}) })
		}), u(Popup.Body, { children: u("div", {
			onKeyDownCapture,
			onKeyDown,
			class: "bio-properties-panel-feel-popup__body",
			children: [type === "feel" && u(FeelEditor, {
				enableGutters: true,
				id: prefixId(entryId),
				name: entryId,
				onInput,
				value,
				variables,
				feelLanguageContext,
				ref: editorRef,
				tooltipContainer
			}), type === "feelers" && u(TemplatingEditor, {
				id: prefixId(entryId),
				contentAttributes: { "aria-label": title },
				enableGutters: true,
				hostLanguage,
				name: entryId,
				onInput,
				value,
				ref: editorRef,
				singleLine,
				tooltipContainer
			})]
		}) })]
	});
}
function prefixId(id) {
	return `bio-properties-panel-${id}`;
}
function autoCompletionOpen(element) {
	const editor = element.closest(".cm-editor");
	return editor ? editor.querySelector(".cm-tooltip-autocomplete") : null;
}
function getPopupTitle({ element, label }) {
	let popupTitle = "";
	if (element && element.type) popupTitle = `${element.type} / `;
	return `${popupTitle}${label}`;
}
function getPopupPosition() {
	const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
	const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
	return {
		left: Math.max(0, (viewportWidth - FEEL_POPUP_WIDTH) / 2),
		top: Math.max(0, (viewportHeight - FEEL_POPUP_HEIGHT) / 2)
	};
}
/**
* FEEL popup component, built as a singleton.
*
* In order to implement a custom replacement, handle the following events:
* - `propertiesPanel.openPopup`
* - `propertiesPanel.closePopup`
* - `propertiesPanel.detach`
*
* Within the custom renderer, make sure to emit the following events:
*  - `feelPopup.open` - fired before the popup is mounted
*  - `feelPopup.opened` - fired after the popup is mounted. Event context contains the DOM node of the popup as `domNode`
*  - `feelPopup.close` - fired before the popup is unmounted. Event context contains the DOM node of the popup as `domNode`
*  - `feelPopup.closed` - fired after the popup is unmounted
*/
var FeelPopup = class {
	constructor(eventBus, config = {}) {
		this._eventBus = eventBus;
		this._config = config;
		this._isOpen = false;
		eventBus.on("propertiesPanel.openPopup", (_, context) => {
			this.open(context.entryId, context, context.sourceElement);
			return true;
		});
		eventBus.on(["propertiesPanel.closePopup", "propertiesPanel.detach"], () => {
			this.close();
		});
	}
	/**
	* Check if the FEEL popup is open.
	* @return {Boolean}
	*/
	isOpen() {
		return this._isOpen;
	}
	/**
	* Open the FEEL popup.
	*
	* @param {String} entryId
	* @param {Object} popupConfig
	* @param {HTMLElement} sourceElement
	*/
	open(entryId, popupConfig, sourceElement) {
		this.close();
		this._openPopup({
			...popupConfig,
			entryId,
			sourceElement
		});
	}
	/**
	* Close the FEEL popup.
	*/
	close() {
		this._closePopup();
	}
	_openPopup(context) {
		const { element, label, sourceElement, type } = context;
		this._isOpen = true;
		this._eventBus.fire("propertiesPanelPopup.open", {
			container: this._config.feelPopupContainer,
			config: {
				...context,
				links: this._config.getFeelPopupLinks?.(type) || [],
				onClose: () => {
					this._closePopup();
					setTimeout(() => {
						sourceElement && sourceElement.focus();
					}, 0);
				},
				position: getPopupPosition(),
				title: getPopupTitle({
					element,
					label
				})
			}
		});
	}
	_closePopup() {
		if (this._isOpen) {
			this._isOpen = false;
			this._eventBus.fire("propertiesPanelPopup.close");
		}
	}
};
FeelPopup.$inject = ["eventBus", "config.propertiesPanel"];
var FeelPopupRenderer = class {
	constructor(eventBus) {
		this._eventBus = eventBus;
		this._container = null;
		this._element = null;
		eventBus.on("propertiesPanelPopup.open", (context) => {
			this._renderPopup(context);
		});
		eventBus.on("propertiesPanelPopup.close", () => {
			this._removePopup();
		});
	}
	_renderPopup(context) {
		let { container, config } = context;
		container = this._container = getContainer(container) || document.body;
		const element = this._element = createElement();
		container.appendChild(element);
		this._emit("feelPopup.open");
		G(u(FeelPopup$1, {
			...config,
			eventBus: this._eventBus
		}), element);
		this._emit("feelPopup.opened", { domNode: element });
	}
	_removePopup() {
		if (!this._container) return;
		this._emit("feelPopup.close", { domNode: this._element });
		G(null, this._element);
		this._container.removeChild(this._element);
		this._container = null;
		this._emit("feelPopup.closed");
	}
	_emit(event, context) {
		this._eventBus.fire(event, context);
	}
};
FeelPopupRenderer.$inject = ["eventBus"];
function createElement() {
	const element = document.createElement("div");
	element.classList.add("bio-properties-panel-popup-container");
	return element;
}
function getContainer(container) {
	if (isString(container)) return query(container);
	return container;
}
var index = {
	__init__: ["feelPopup", "feelPopupRenderer"],
	feelPopup: ["type", FeelPopup],
	feelPopupRenderer: ["type", FeelPopupRenderer]
};
/**
* @param {string} type
* @param {boolean} [strict]
*
* @returns {any}
*/
function getService(type, strict) {}
var FormPropertiesPanelContext = Q({ getService });
function getPropertiesPanelHeaderProvider(options = {}) {
	const { getDocumentationRef, formFields } = options;
	return {
		getElementLabel: (field) => {
			const { type } = field;
			const fieldDefinition = formFields.get(type).config;
			return fieldDefinition.getSubheading ? fieldDefinition.getSubheading(field) : field.label;
		},
		getElementIcon: (field) => {
			const { type } = field;
			const fieldDefinition = formFields.get(type).config;
			const Icon = fieldDefinition.icon || iconsByType(type);
			if (Icon) return function IconComponent() {
				return u(Icon, {
					width: "36",
					height: "36",
					viewBox: "0 0 54 54"
				});
			};
			else if (fieldDefinition.iconUrl) return getPaletteIcon({
				iconUrl: fieldDefinition.iconUrl,
				label: fieldDefinition.label
			});
		},
		getTypeLabel: (field) => {
			const { type } = field;
			if (type === "default") return "Form";
			const fieldDefinition = formFields.get(type).config;
			return fieldDefinition.name || fieldDefinition.label || type;
		},
		getDocumentationRef
	};
}
/**
* Provide placeholders for empty and multiple state.
*/
var PropertiesPanelPlaceholderProvider = {
	getEmpty: () => {
		return { text: "Select a form field to edit its properties." };
	},
	getMultiple: () => {
		return { text: "Multiple form fields are selected. Select a single form field to edit its properties." };
	}
};
var EMPTY = {};
function PropertiesPanel(props) {
	const { eventBus, getProviders, injector } = props;
	const formEditor = injector.get("formEditor");
	const modeling = injector.get("modeling");
	const selectionModule = injector.get("selection");
	const propertiesPanelConfig = injector.get("config.propertiesPanel") || EMPTY;
	const { feelPopupContainer } = propertiesPanelConfig;
	const [state, setState] = d({ selectedFormField: selectionModule.get() || formEditor._getState().schema });
	const selectedFormField = state.selectedFormField;
	const refresh = q((field) => {
		setState({ selectedFormField: selectionModule.get() || formEditor._getState().schema });
		eventBus.fire("propertiesPanel.updated", { formField: field });
	}, [
		eventBus,
		formEditor,
		selectionModule
	]);
	_$1(() => {
		/**
		* TODO(pinussilvestrus): update with actual updated element,
		* once we have a proper updater/change support
		*/
		eventBus.on("changed", refresh);
		eventBus.on("import.done", refresh);
		eventBus.on("selection.changed", refresh);
		return () => {
			eventBus.off("changed", refresh);
			eventBus.off("import.done", refresh);
			eventBus.off("selection.changed", refresh);
		};
	}, [eventBus, refresh]);
	const getService = (type, strict = true) => injector.get(type, strict);
	const propertiesPanelContext = { getService };
	const onFocus = () => eventBus.fire("propertiesPanel.focusin");
	const onBlur = () => eventBus.fire("propertiesPanel.focusout");
	const editField = q((formField, key, value) => modeling.editFormField(formField, key, value), [modeling]);
	const providers = getProviders(selectedFormField);
	const groups = T$1(() => {
		return reduce(providers, function(groups, provider) {
			if (isArray(selectedFormField)) return [];
			return provider.getGroups(selectedFormField, editField)(groups);
		}, []);
	}, [
		providers,
		selectedFormField,
		editField
	]);
	const formFields = getService("formFields");
	const PropertiesPanelHeaderProvider = T$1(() => getPropertiesPanelHeaderProvider({
		getDocumentationRef: propertiesPanelConfig.getDocumentationRef,
		formFields
	}), [formFields, propertiesPanelConfig]);
	return u("div", {
		class: "fjs-properties-panel",
		"data-field": selectedFormField && selectedFormField.id,
		onFocusCapture: onFocus,
		onBlurCapture: onBlur,
		children: u(FormPropertiesPanelContext.Provider, {
			value: propertiesPanelContext,
			children: u(PropertiesPanel$1, {
				element: selectedFormField,
				eventBus,
				groups,
				headerProvider: PropertiesPanelHeaderProvider,
				placeholderProvider: PropertiesPanelPlaceholderProvider,
				feelPopupContainer
			})
		})
	});
}
var DEFAULT_PRIORITY = 1e3;
/**
* @typedef { { parent: Element } } PropertiesPanelConfig
* @typedef { import('../../core/EventBus').EventBus } EventBus
* @typedef { import('../../types').Injector } Injector
* @typedef { { getGroups: ({ formField, editFormField }) => ({ groups}) => Array } } PropertiesProvider
*/
/**
* @param {PropertiesPanelConfig} propertiesPanelConfig
* @param {Injector} injector
* @param {EventBus} eventBus
*/
var PropertiesPanelRenderer = class {
	constructor(propertiesPanelConfig, injector, eventBus) {
		const { parent } = propertiesPanelConfig || {};
		this._eventBus = eventBus;
		this._injector = injector;
		this._container = domify$1("<div class=\"fjs-properties-container\" input-handle-modified-keys=\"y,z\"></div>");
		if (parent) this.attachTo(parent);
		this._eventBus.once("formEditor.rendered", 500, () => {
			this._render();
		});
	}
	/**
	* Attach the properties panel to a parent node.
	*
	* @param {HTMLElement} container
	*/
	attachTo(container) {
		if (!container) throw new Error("container required");
		if (typeof container === "string") container = query(container);
		this.detach();
		container.appendChild(this._container);
		this._eventBus.fire("propertiesPanel.attach");
	}
	/**
	* Detach the properties panel from its parent node.
	*/
	detach() {
		const parentNode = this._container.parentNode;
		if (parentNode) {
			parentNode.removeChild(this._container);
			this._eventBus.fire("propertiesPanel.detach");
		}
	}
	_render() {
		G(u(PropertiesPanel, {
			getProviders: this._getProviders.bind(this),
			eventBus: this._eventBus,
			injector: this._injector
		}), this._container);
		this._eventBus.fire("propertiesPanel.rendered");
	}
	_destroy() {
		if (this._container) {
			G(null, this._container);
			this._eventBus.fire("propertiesPanel.destroyed");
		}
	}
	/**
	* Register a new properties provider to the properties panel.
	*
	* @param {PropertiesProvider} provider
	* @param {Number} [priority]
	*/
	registerProvider(provider, priority) {
		if (!priority) priority = DEFAULT_PRIORITY;
		if (typeof provider.getGroups !== "function") {
			console.error("Properties provider does not implement #getGroups(element) API");
			return;
		}
		this._eventBus.on("propertiesPanel.getProviders", priority, function(event) {
			event.providers.push(provider);
		});
		this._eventBus.fire("propertiesPanel.providersChanged");
	}
	_getProviders() {
		const event = this._eventBus.createEvent({
			type: "propertiesPanel.getProviders",
			providers: []
		});
		this._eventBus.fire(event);
		return event.providers;
	}
};
PropertiesPanelRenderer.$inject = [
	"config.propertiesPanel",
	"injector",
	"eventBus"
];
function ActionEntry(props) {
	const { editField, field } = props;
	const entries = [];
	entries.push({
		id: "action",
		component: Action,
		editField,
		field,
		isEdited: isEdited$3,
		isDefaultVisible: (field) => field.type === "button"
	});
	return entries;
}
function Action(props) {
	const { editField, field, id } = props;
	const path = ["action"];
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value) => {
		return editField(field, path, value);
	};
	const getOptions = () => [{
		label: "Submit",
		value: "submit"
	}, {
		label: "Reset",
		value: "reset"
	}];
	return SelectEntry({
		element: field,
		getOptions,
		getValue,
		id,
		label: "Action",
		setValue
	});
}
function useService(type, strict) {
	const { getService } = x(FormPropertiesPanelContext);
	return getService(type, strict);
}
/**
* Retrieve list of variables from the form schema.
*
* @returns { string[] } list of variables used in form schema
*/
function useVariables() {
	return getSchemaVariables(useService("formEditor").getSchema());
}
function AltTextEntry(props) {
	const { editField, field } = props;
	const entries = [];
	entries.push({
		id: "alt",
		component: AltText,
		editField,
		field,
		isEdited: isEdited$5,
		isDefaultVisible: (field) => ["image"].includes(field.type)
	});
	return entries;
}
function AltText(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	const path = ["alt"];
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value) => {
		return editField(field, path, value);
	};
	return FeelTemplatingEntry({
		debounce,
		element: field,
		feel: "optional",
		getValue,
		id,
		label: "Alternative text",
		tooltip: "Descriptive text for screen reader accessibility.",
		setValue,
		singleLine: true,
		variables
	});
}
var AUTO_OPTION_VALUE = "";
function ColumnsEntry(props) {
	const { editField, field } = props;
	return [{
		id: "columns",
		component: Columns,
		field,
		editField,
		isEdited: isEdited$3
	}];
}
function Columns(props) {
	const { field, editField, id } = props;
	useService("debounce");
	const formLayoutValidator = useService("formLayoutValidator");
	const validate = q((value) => {
		return formLayoutValidator.validateField(field, value ? parseInt(value) : null);
	}, [field, formLayoutValidator]);
	const setValue = (value, error) => {
		if (error) return;
		editField(field, ["layout"], set$1(get$1(field, ["layout"], {}), ["columns"], value ? parseInt(value) : null));
	};
	const getValue = () => {
		return get$1(field, ["layout", "columns"]);
	};
	const getOptions = () => {
		return [{
			label: "Auto",
			value: AUTO_OPTION_VALUE
		}, ...asArray(16).filter((i) => i >= MIN_COLUMNS).map(asOption)];
	};
	return SelectEntry({
		element: field,
		id,
		label: "Columns",
		getOptions,
		getValue,
		setValue,
		validate
	});
}
function asOption(number) {
	return {
		value: number,
		label: number.toString()
	};
}
function asArray(length) {
	return Array.from({ length }).map((_, i) => i + 1);
}
function arrayAdd(array, index, item) {
	const copy = [...array];
	copy.splice(index, 0, item);
	return copy;
}
function countDecimals(number) {
	const num = Big(number);
	if (num.toString() === num.toFixed(0)) return 0;
	return num.toFixed().split(".")[1].length || 0;
}
/**
*
* @param {unknown} value
* @returns {boolean}
*/
function isValidNumber(value) {
	return (typeof value === "number" || typeof value === "string") && value !== "" && !isNaN(Number(value));
}
/**
* @param {string} path
*/
function isValidDotPath(path) {
	return /^\w+(\.\w+)*$/.test(path);
}
/**
* @param {string} path
*/
function isProhibitedPath(path) {
	const prohibitedSegments = [
		"__proto__",
		"prototype",
		"constructor"
	];
	return path.split(".").some((segment) => prohibitedSegments.includes(segment));
}
var LABELED_NON_INPUTS = [
	"button",
	"group",
	"dynamiclist",
	"iframe",
	"table",
	"documentPreview"
];
var INPUTS = [
	"checkbox",
	"checklist",
	"datetime",
	"number",
	"radio",
	"select",
	"taglist",
	"textfield",
	"textarea",
	"filepicker"
];
var OPTIONS_INPUTS = [
	"checklist",
	"radio",
	"select",
	"taglist"
];
function hasEntryConfigured(formFieldDefinition, entryId) {
	const { propertiesPanelEntries = [] } = formFieldDefinition;
	if (!propertiesPanelEntries.length) return false;
	return propertiesPanelEntries.some((id) => id === entryId);
}
function hasOptionsGroupsConfigured(formFieldDefinition) {
	const { propertiesPanelEntries = [] } = formFieldDefinition;
	if (!propertiesPanelEntries.length) return false;
	return propertiesPanelEntries.some((id) => id === "values");
}
/**
* @param {string} path
*/
function hasIntegerPathSegment(path) {
	return path.split(".").some((segment) => /^\d+$/.test(segment));
}
/**
* Factory for isEdited functions that check against a default.
*
* @param {string} defaultValue The default value to check against.
* @param {boolean} [includeEmptyAsDefault=true] If true, an empty value (e.g., '') is also considered a default state.
* @return {(node: HTMLElement) => boolean} A function that returns true if the node's value is edited.
*/
function isEditedFromDefaultFactory(defaultValue, includeEmptyAsDefault = true) {
	return (node) => {
		if (!node) return false;
		/**
		* @type {HTMLElement|null}
		*/
		const codeMirrorContent = node.querySelector(".cm-content");
		const value = !!codeMirrorContent ? codeMirrorContent.innerText : 		/** @type {HTMLInputElement} */ node.value;
		if (includeEmptyAsDefault && !value) return false;
		return value !== defaultValue;
	};
}
function isTrueDefaultToggleSwitchEntryEdited(node) {
	return node && !node.checked;
}
function DescriptionEntry(props) {
	const { editField, field } = props;
	const entries = [];
	entries.push({
		id: "description",
		component: Description,
		editField,
		field,
		isEdited: isEdited$5,
		isDefaultVisible: (field) => field.type !== "filepicker" && INPUTS.includes(field.type)
	});
	return entries;
}
function Description(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	const path = ["description"];
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value) => {
		return editField(field, path, value);
	};
	return FeelTemplatingEntry({
		debounce,
		element: field,
		getValue,
		id,
		label: "Field description",
		singleLine: true,
		setValue,
		variables
	});
}
var EMPTY_OPTION = "";
function DefaultValueEntry(props) {
	const { editField, field } = props;
	const { type } = field;
	const entries = [];
	function isDefaultVisible(matchers) {
		return (field) => {
			if (!INPUTS.includes(type) || OPTIONS_INPUTS.includes(type) && !field.values) return false;
			return matchers(field);
		};
	}
	const defaultValueBase = {
		editField,
		field,
		id: "defaultValue",
		label: "Default value"
	};
	entries.push({
		...defaultValueBase,
		component: DefaultValueCheckbox,
		isEdited: isEdited$3,
		isDefaultVisible: isDefaultVisible((field) => field.type === "checkbox")
	});
	entries.push({
		...defaultValueBase,
		component: DefaultValueNumber,
		isEdited,
		isDefaultVisible: isDefaultVisible((field) => field.type === "number")
	});
	entries.push({
		...defaultValueBase,
		component: DefaultValueSingleSelect,
		isEdited: isEdited$3,
		isDefaultVisible: isDefaultVisible((field) => field.type === "radio" || field.type === "select")
	});
	entries.push({
		...defaultValueBase,
		component: DefaultValueTextfield,
		isEdited,
		isDefaultVisible: isDefaultVisible((field) => field.type === "textfield")
	});
	entries.push({
		...defaultValueBase,
		component: DefaultValueTextarea,
		isEdited: isEdited$1,
		isDefaultVisible: isDefaultVisible((field) => field.type === "textarea")
	});
	return entries;
}
function DefaultValueCheckbox(props) {
	const { editField, field, id, label } = props;
	const { defaultValue } = field;
	const path = ["defaultValue"];
	const getOptions = () => {
		return [{
			label: "Checked",
			value: "true"
		}, {
			label: "Not checked",
			value: "false"
		}];
	};
	const setValue = (value) => {
		return editField(field, path, parseStringToBoolean(value));
	};
	const getValue = () => {
		return parseBooleanToString(defaultValue);
	};
	return SelectEntry({
		element: field,
		getOptions,
		getValue,
		id,
		label,
		setValue
	});
}
function DefaultValueNumber(props) {
	const { editField, field, id, label } = props;
	const { decimalDigits, serializeToString = false } = field;
	const debounce = useService("debounce");
	const path = ["defaultValue"];
	const getValue = (e) => {
		let value = get$1(field, path);
		if (!isValidNumber(value)) return;
		return serializeToString ? Big(value).toFixed() : value;
	};
	const setValue = (value, error) => {
		if (error) return;
		let newValue;
		if (isValidNumber(value)) newValue = serializeToString ? value : Number(value);
		return editField(field, path, newValue);
	};
	const decimalDigitsSet = decimalDigits || decimalDigits === 0;
	return TextfieldEntry({
		debounce,
		label,
		element: field,
		getValue,
		id,
		setValue,
		validate: q((value) => {
			if (value === void 0 || value === null) return;
			if (!isValidNumber(value)) return "Should be a valid number";
			if (decimalDigitsSet && countDecimals(value) > decimalDigits) return `Should not contain more than ${decimalDigits} decimal digits`;
		}, [decimalDigitsSet, decimalDigits])
	});
}
function DefaultValueSingleSelect(props) {
	const { editField, field, id, label } = props;
	const { defaultValue = EMPTY_OPTION, values = [] } = field;
	const path = ["defaultValue"];
	const getOptions = () => {
		return [{
			label: "<none>",
			value: EMPTY_OPTION
		}, ...values];
	};
	const setValue = (value) => {
		return editField(field, path, value.length ? value : void 0);
	};
	const getValue = () => {
		return defaultValue;
	};
	return SelectEntry({
		element: field,
		getOptions,
		getValue,
		id,
		label,
		setValue
	});
}
function DefaultValueTextfield(props) {
	const { editField, field, id, label } = props;
	const debounce = useService("debounce");
	const path = ["defaultValue"];
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value) => {
		return editField(field, path, value);
	};
	return TextfieldEntry({
		debounce,
		element: field,
		getValue,
		id,
		label,
		setValue
	});
}
function DefaultValueTextarea(props) {
	const { editField, field, id, label } = props;
	const debounce = useService("debounce");
	const path = ["defaultValue"];
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value) => {
		return editField(field, path, value);
	};
	return TextAreaEntry({
		debounce,
		element: field,
		getValue,
		id,
		label,
		setValue
	});
}
function parseStringToBoolean(value) {
	if (value === "true") return true;
	return false;
}
function parseBooleanToString(value) {
	if (value === true) return "true";
	return "false";
}
function DisabledEntry(props) {
	const { editField, field } = props;
	const entries = [];
	entries.push({
		id: "disabled",
		component: Disabled,
		editField,
		field,
		isEdited: isEdited$7,
		isDefaultVisible: (field) => INPUTS.includes(field.type)
	});
	return entries;
}
function Disabled(props) {
	const { editField, field, id } = props;
	const path = ["disabled"];
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value) => {
		return editField(field, path, value);
	};
	return ToggleSwitchEntry({
		element: field,
		getValue,
		id,
		label: "Disabled",
		tooltip: "Disable this field when it should not be interactive for end-users. Its data will not be submitted. This setting takes precedence over read-only.",
		inline: true,
		setValue
	});
}
function IdEntry(props) {
	const { editField, field } = props;
	const entries = [];
	entries.push({
		id: "id",
		component: Id,
		editField,
		field,
		isEdited,
		isDefaultVisible: (field) => field.type === "default"
	});
	return entries;
}
function Id(props) {
	const { editField, field, id } = props;
	const formFieldRegistry = useService("formFieldRegistry");
	const debounce = useService("debounce");
	const path = ["id"];
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value, error) => {
		if (error) return;
		return editField(field, path, value);
	};
	return TextfieldEntry({
		debounce,
		element: field,
		getValue,
		id,
		label: "ID",
		setValue,
		validate: q((value) => {
			if (typeof value !== "string" || value.length === 0) return "Must not be empty.";
			const assigned = formFieldRegistry._ids.assigned(value);
			if (assigned && assigned !== field) return "Must be unique.";
			return validateId(value) || null;
		}, [formFieldRegistry, field])
	});
}
var SPACE_REGEX = /\s/;
var QNAME_REGEX = /^([a-z][\w-.]*:)?[a-z_][\w-.]*$/i;
var ID_REGEX = /^[a-z_][\w-.]*$/i;
function validateId(idValue) {
	if (containsSpace(idValue)) return "Must not contain spaces.";
	if (!ID_REGEX.test(idValue)) {
		if (QNAME_REGEX.test(idValue)) return "Must not contain prefix.";
		return "Must be a valid QName.";
	}
}
function containsSpace(value) {
	return SPACE_REGEX.test(value);
}
function KeyEntry(props) {
	const { editField, field, getService } = props;
	const entries = [];
	entries.push({
		id: "key",
		component: Key$2,
		editField,
		field,
		isEdited,
		isDefaultVisible: (field) => {
			const { config } = getService("formFields").get(field.type);
			return config.keyed;
		}
	});
	return entries;
}
function Key$2(props) {
	const { editField, field, id } = props;
	const pathRegistry = useService("pathRegistry");
	const debounce = useService("debounce");
	const path = ["key"];
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value, error) => {
		if (error) return;
		return editField(field, path, value);
	};
	return TextfieldEntry({
		debounce,
		description: "Binds to a form variable",
		element: field,
		getValue,
		id,
		label: "Key",
		tooltip: "Use a unique \"key\" to link the form element and the related input/output data. When dealing with nested data, break it down in the user task's input mapping before using it.",
		setValue,
		validate: q((value) => {
			if (value === field.key) return null;
			if (!isString(value) || value.length === 0) return "Must not be empty.";
			if (!isValidDotPath(value)) return "Must be a variable or a dot separated path.";
			if (hasIntegerPathSegment(value)) return "Must not contain numerical path segments.";
			if (isProhibitedPath(value)) return "Must not be a prohibited path.";
			const replacements = { [field.id]: value.split(".") };
			const oldPath = pathRegistry.getValuePath(field);
			const newPath = pathRegistry.getValuePath(field, { replacements });
			pathRegistry.unclaimPath(oldPath);
			const canClaim = pathRegistry.canClaimPath(newPath, {
				isClosed: true,
				claimerId: field.id
			});
			pathRegistry.claimPath(oldPath, {
				isClosed: true,
				claimerId: field.id
			});
			return canClaim ? null : "Must not conflict with other key/path assignments.";
		}, [field, pathRegistry])
	});
}
function PathEntry(props) {
	const { editField, field, getService } = props;
	const { type } = field;
	const entries = [];
	const formFieldDefinition = getService("formFields").get(type);
	if (formFieldDefinition && formFieldDefinition.config.pathed) entries.push({
		id: "path",
		component: Path,
		editField,
		field,
		isEdited
	});
	return entries;
}
function Path(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const pathRegistry = useService("pathRegistry");
	const isRepeating = useService("formFields").get(field.type).config.repeatable && field.isRepeating;
	const path = ["path"];
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value, error) => {
		if (error) return;
		return editField(field, path, value);
	};
	const validate = q((value) => {
		if (!value && isRepeating) return "Must not be empty";
		if (!value && !isRepeating || value === field.path) return null;
		if (!isValidDotPath(value)) return isRepeating ? "Must be a variable or a dot-separated path" : "Must be empty, a variable or a dot-separated path";
		if (hasIntegerPathSegment(value)) return "Must not contain numerical path segments.";
		if (isProhibitedPath(value)) return "Must not be a prohibited path.";
		const options = { replacements: { [field.id]: value.split(".") } };
		if (!pathRegistry.executeRecursivelyOnFields(field, ({ field, isClosed, isRepeatable }) => {
			const path = pathRegistry.getValuePath(field, options);
			return pathRegistry.canClaimPath(path, {
				isClosed,
				isRepeatable,
				claimerId: field.id
			});
		})) return "Must not cause two binding paths to collide";
		return null;
	}, [
		field,
		isRepeating,
		pathRegistry
	]);
	return TextfieldEntry({
		debounce,
		description: "Where the child variables of this component are pathed to.",
		element: field,
		getValue,
		id,
		label: "Path",
		tooltip: isRepeating ? "Routes the children of this component into a form variable, may be left empty to route at the root level." : "Routes the children of this component into a form variable.",
		setValue,
		validate
	});
}
function simpleBoolEntryFactory(options) {
	const { id, label, description, path, props, getValue, setValue, isDefaultVisible, isTrueDefault = false } = options;
	const { editField, field } = props;
	return {
		id,
		label,
		path,
		field,
		editField,
		description,
		component: SimpleBoolComponent,
		isEdited: isTrueDefault ? isTrueDefaultToggleSwitchEntryEdited : isEdited$7,
		isDefaultVisible,
		getValue,
		setValue
	};
}
var SimpleBoolComponent = (props) => {
	const { id, label, path, field, editField, getValue = () => get$1(field, path, ""), setValue = (value) => editField(field, path, value || false), description } = props;
	return ToggleSwitchEntry({
		element: field,
		getValue,
		id,
		label,
		setValue,
		inline: true,
		description
	});
};
function simpleSelectEntryFactory(options) {
	const { id, label, path, props, optionsArray } = options;
	const { editField, field } = props;
	return {
		id,
		label,
		path,
		field,
		editField,
		optionsArray,
		component: SimpleSelectComponent,
		isEdited: isEdited$3
	};
}
var SimpleSelectComponent = (props) => {
	const { id, label, path, field, editField, optionsArray } = props;
	const getValue = () => get$1(field, path, "");
	const setValue = (value) => editField(field, path, value);
	const getOptions = () => optionsArray;
	return SelectEntry({
		label,
		element: field,
		getOptions,
		getValue,
		id,
		setValue
	});
};
function simpleRangeIntegerEntryFactory(options) {
	const { id, label, path, props, min, max } = options;
	const { editField, field } = props;
	return {
		id,
		label,
		path,
		field,
		editField,
		min,
		max,
		component: SimpleRangeIntegerEntry,
		isEdited
	};
}
var SimpleRangeIntegerEntry = (props) => {
	const { id, label, path, field, editField, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER } = props;
	const debounce = useService("debounce");
	const getValue = () => {
		const value = get$1(field, path);
		return isValidNumber(value) && Number.isInteger(value) ? value : null;
	};
	const setValue = (value, error) => {
		if (error) return;
		editField(field, path, Number(value));
	};
	return TextfieldEntry({
		debounce,
		label,
		element: field,
		getValue,
		id,
		setValue,
		validate: q((value) => {
			if (value === void 0 || value === null || value === "") return;
			if (!Number.isInteger(Number(value))) return "Should be an integer.";
			if (Big(value).cmp(min) < 0) return `Should be at least ${min}.`;
			if (Big(value).cmp(max) > 0) return `Should be at most ${max}.`;
		}, [min, max])
	});
};
function GroupAppearanceEntry(props) {
	const { field } = props;
	const { type } = field;
	if (!["group", "dynamiclist"].includes(type)) return [];
	return [simpleBoolEntryFactory({
		id: "showOutline",
		path: ["showOutline"],
		label: "Show outline",
		isTrueDefault: true,
		props
	})];
}
function LabelEntry(props) {
	const { field, editField } = props;
	const entries = [];
	entries.push({
		id: "date-label",
		component: DateLabel,
		editField,
		field,
		isEdited: isEdited$5,
		isDefaultVisible: function(field) {
			return field.type === "datetime" && (field.subtype === DATETIME_SUBTYPES.DATE || field.subtype === DATETIME_SUBTYPES.DATETIME);
		}
	});
	entries.push({
		id: "time-label",
		component: TimeLabel,
		editField,
		field,
		isEdited: isEdited$5,
		isDefaultVisible: function(field) {
			return field.type === "datetime" && (field.subtype === DATETIME_SUBTYPES.TIME || field.subtype === DATETIME_SUBTYPES.DATETIME);
		}
	});
	const isSimplyLabeled = (field) => {
		return [...INPUTS.filter((input) => input !== "datetime"), ...LABELED_NON_INPUTS].includes(field.type);
	};
	entries.push({
		id: "label",
		component: Label$2,
		editField,
		field,
		isEdited: isEdited$5,
		isDefaultVisible: isSimplyLabeled
	});
	return entries;
}
function Label$2(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	const path = ["label"];
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value) => {
		return editField(field, path, value || "");
	};
	return FeelTemplatingEntry({
		debounce,
		element: field,
		getValue,
		id,
		label: getLabelText(field.type),
		singleLine: true,
		setValue,
		variables
	});
}
function DateLabel(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	const path = DATE_LABEL_PATH;
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value) => {
		return editField(field, path, value || "");
	};
	return FeelTemplatingEntry({
		debounce,
		element: field,
		getValue,
		id,
		label: "Date label",
		singleLine: true,
		setValue,
		variables
	});
}
function TimeLabel(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	const path = TIME_LABEL_PATH;
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value) => {
		return editField(field, path, value || "");
	};
	return FeelTemplatingEntry({
		debounce,
		element: field,
		getValue,
		id,
		label: "Time label",
		singleLine: true,
		setValue,
		variables
	});
}
/**
* @param {string} type
* @returns {string}
*/
function getLabelText(type) {
	switch (type) {
		case "group":
		case "dynamiclist": return "Group label";
		case "table": return "Table label";
		case "iframe":
		case "documentPreview": return "Title";
		default: return "Field label";
	}
}
function HeightEntry(props) {
	const { editField, field, id, description, isDefaultVisible, defaultValue } = props;
	const entries = [];
	entries.push({
		id: id + "-height",
		component: Height,
		description,
		isEdited: isEdited$6,
		editField,
		field,
		defaultValue,
		isDefaultVisible: (field) => {
			if (isFunction(isDefaultVisible)) return isDefaultVisible(field);
			return field.type === "spacer";
		}
	});
	return entries;
}
function Height(props) {
	const { description, editField, field, id } = props;
	const debounce = useService("debounce");
	const getValue = (e) => get$1(field, ["height"], null);
	const setValue = (value, error) => {
		if (error) return;
		editField(field, ["height"], value);
	};
	return NumberFieldEntry({
		debounce,
		description,
		label: "Height",
		element: field,
		id,
		getValue,
		setValue,
		validate: validate$9
	});
}
/**
* @param {number|void} value
* @returns {string|null}
*/
var validate$9 = (value) => {
	if (typeof value !== "number") return "A number is required.";
	if (!Number.isInteger(value)) return "Should be an integer.";
	if (value < 1) return "Should be greater than zero.";
};
function IFrameHeightEntry(props) {
	return [...HeightEntry({
		...props,
		description: "Height of the container in pixels.",
		isDefaultVisible: (field) => field.type === "iframe"
	})];
}
var HTTPS_PATTERN = /^(https):\/\/*/i;
function IFrameUrlEntry(props) {
	const { editField, field } = props;
	const entries = [];
	entries.push({
		id: "url",
		component: Url,
		editField,
		field,
		isEdited: isEdited$5,
		isDefaultVisible: (field) => field.type === "iframe"
	});
	return entries;
}
function Url(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	const path = ["url"];
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value) => {
		return editField(field, path, value);
	};
	return FeelTemplatingEntry({
		debounce,
		element: field,
		feel: "optional",
		getValue,
		id,
		label: "URL",
		setValue,
		singleLine: true,
		tooltip: getTooltip$1(),
		validate: validate$8,
		variables
	});
}
function getTooltip$1() {
	return u(k, { children: [
		u("p", { children: "Enter a HTTPS URL to a source or populate it dynamically via a template or an expression (e.g., to pass a value from the variable)." }),
		u("p", { children: "Please make sure that the URL is safe as it might impose security risks." }),
		u("p", { children: [
			"Not all external sources can be displayed in the iFrame. Read more about it in the",
			" ",
			u("a", {
				target: "_blank",
				href: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options",
				rel: "noreferrer",
				children: "X-FRAME-OPTIONS documentation"
			}),
			"."
		] })
	] });
}
/**
* @param {string|void} value
* @returns {string|null}
*/
var validate$8 = (value) => {
	if (!value || value.startsWith("=")) return;
	if (!HTTPS_PATTERN.test(value)) return "For security reasons the URL must start with \"https\".";
};
function ImageSourceEntry(props) {
	const { editField, field } = props;
	const entries = [];
	entries.push({
		id: "source",
		component: Source$1,
		editField,
		field,
		isEdited: isEdited$5,
		isDefaultVisible: (field) => field.type === "image"
	});
	return entries;
}
function Source$1(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	const path = ["source"];
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value) => {
		return editField(field, path, value);
	};
	return FeelTemplatingEntry({
		debounce,
		description: "Expression or static value (link/data URI)",
		element: field,
		feel: "optional",
		getValue,
		id,
		label: "Image source",
		tooltip: "Link referring to a hosted image, or use a data URI directly to embed image data into the form.",
		setValue,
		singleLine: true,
		variables
	});
}
var isTextEdited = isEditedFromDefaultFactory(TEXT_VIEW_DEFAULT_TEXT, false);
function TextEntry(props) {
	const { editField, field } = props;
	return [{
		id: "text",
		component: Text,
		editField,
		field,
		isEdited: isTextEdited,
		isDefaultVisible: (field) => field.type === "text"
	}];
}
function Text(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	const path = ["text"];
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value) => {
		return editField(field, path, value || "");
	};
	return FeelTemplatingEntry({
		debounce,
		description: description$3,
		element: field,
		getValue,
		id,
		label: "Text",
		hostLanguage: "markdown",
		setValue,
		variables
	});
}
var description$3 = u(k, { children: [
	"Supports markdown and templating.",
	" ",
	u("a", {
		href: "https://docs.camunda.io/docs/components/modeler/forms/form-element-library/forms-element-library-text/",
		target: "_blank",
		rel: "noreferrer",
		children: "Learn more"
	})
] });
function HtmlEntry(props) {
	const { editField, field } = props;
	return [{
		id: "content",
		component: Content,
		editField,
		field,
		isEdited: isEdited$5,
		isDefaultVisible: (field) => field.type === "html"
	}];
}
function Content(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	const path = ["content"];
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value) => {
		return editField(field, path, value || "");
	};
	return FeelTemplatingEntry({
		debounce,
		description: description$2,
		element: field,
		getValue,
		id,
		label: "Content",
		hostLanguage: "html",
		validate: validate$7,
		setValue,
		variables
	});
}
var description$2 = u(k, { children: [
	"Supports HTML, styling, and templating. Styles are automatically scoped to the HTML component.",
	" ",
	u("a", {
		href: "https://docs.camunda.io/docs/components/modeler/forms/form-element-library/forms-element-library-html/",
		target: "_blank",
		rel: "noreferrer",
		children: "Learn more"
	})
] });
/**
* @param {string|void} value
* @returns {string|null}
*/
var validate$7 = (value) => {
	if (typeof value !== "string" || value === "") return null;
	if (value.startsWith("=")) return null;
};
function NumberEntries(props) {
	const { editField, field, id } = props;
	const entries = [];
	entries.push({
		id: id + "-decimalDigits",
		component: NumberDecimalDigits,
		isEdited: isEdited$6,
		editField,
		field,
		isDefaultVisible: (field) => field.type === "number"
	});
	entries.push({
		id: id + "-step",
		component: NumberArrowStep,
		isEdited,
		editField,
		field,
		isDefaultVisible: (field) => field.type === "number"
	});
	return entries;
}
function NumberDecimalDigits(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const getValue = (e) => get$1(field, ["decimalDigits"]);
	const setValue = (value, error) => {
		if (error) return;
		editField(field, ["decimalDigits"], value);
	};
	return NumberFieldEntry({
		debounce,
		label: "Decimal digits",
		element: field,
		step: "any",
		getValue,
		id,
		setValue,
		validate: validateNumberEntries
	});
}
function NumberArrowStep(props) {
	const { editField, field, id } = props;
	const { decimalDigits } = field;
	const debounce = useService("debounce");
	const getValue = (e) => {
		let value = get$1(field, ["increment"]);
		if (!isValidNumber(value)) return null;
		return value;
	};
	const clearLeadingZeroes = (value) => {
		if (!value) return value;
		const trimmed = value.replace(/^0+/g, "");
		return (trimmed.startsWith(".") ? "0" : "") + trimmed;
	};
	const setValue = (value, error) => {
		if (error) return;
		editField(field, ["increment"], clearLeadingZeroes(value));
	};
	const decimalDigitsSet = decimalDigits || decimalDigits === 0;
	return TextfieldEntry({
		debounce,
		label: "Increment",
		element: field,
		getValue,
		id,
		setValue,
		validate: q((value) => {
			if (value === void 0 || value === null) return;
			if (!isValidNumber(value)) return "Should be a valid number.";
			if (Big(value).cmp(0) <= 0) return "Should be greater than zero.";
			if (decimalDigitsSet) {
				const minimumValue = Big(`1e-${decimalDigits}`);
				if (Big(value).cmp(minimumValue) < 0) return `Should be at least ${minimumValue.toString()}.`;
				if (countDecimals(value) > decimalDigits) return `Should not contain more than ${decimalDigits} decimal digits.`;
			}
		}, [decimalDigitsSet, decimalDigits])
	});
}
/**
* @param {number|void} value
* @returns {string|void}
*/
var validateNumberEntries = (value) => {
	if (typeof value !== "number") return;
	if (!Number.isInteger(value)) return "Should be an integer.";
	if (value < 0) return "Should be greater than or equal to zero.";
};
function ExpressionFieldEntries(props) {
	const { editField, field, id } = props;
	const entries = [];
	entries.push({
		id: `${id}-expression`,
		component: ExpressionFieldExpression,
		isEdited: isEdited$5,
		editField,
		field,
		isDefaultVisible: (field) => field.type === "expression"
	});
	entries.push({
		id: `${id}-computeOn`,
		component: ExpressionFieldComputeOn,
		isEdited: isEdited$3,
		editField,
		field,
		isDefaultVisible: (field) => field.type === "expression"
	});
	return entries;
}
function ExpressionFieldExpression(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	const getValue = () => field.expression || "";
	const setValue = (value) => {
		editField(field, ["expression"], value);
	};
	return FeelEntry({
		debounce,
		description: "Define an expression to calculate the value of this field",
		element: field,
		feel: "required",
		getValue,
		id,
		label: "Target value",
		setValue,
		variables
	});
}
function ExpressionFieldComputeOn(props) {
	const { editField, field, id } = props;
	const getValue = () => field.computeOn || "";
	const setValue = (value) => {
		editField(field, ["computeOn"], value);
	};
	const getOptions = () => [{
		value: "change",
		label: "Value changes"
	}, {
		value: "presubmit",
		label: "Form submission"
	}];
	return SelectEntry({
		id,
		label: "Compute on",
		getValue,
		setValue,
		getOptions
	});
}
function NumberSerializationEntry(props) {
	const { editField, field } = props;
	const entries = [];
	entries.push({
		id: "serialize-to-string",
		component: SerializeToString,
		isEdited: isEdited$8,
		editField,
		field,
		isDefaultVisible: (field) => field.type === "number"
	});
	return entries;
}
function SerializeToString(props) {
	const { editField, field, id } = props;
	const { defaultValue } = field;
	const path = ["serializeToString"];
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value) => {
		if (defaultValue || defaultValue === 0) editField(field, ["defaultValue"], value ? Big(defaultValue).toFixed() : Number(defaultValue));
		return editField(field, path, value);
	};
	return CheckboxEntry({
		element: field,
		getValue,
		id,
		label: "Output as string",
		description: "Allows arbitrary precision values",
		setValue
	});
}
function DateTimeEntry(props) {
	const { editField, field } = props;
	const entries = [{
		id: "subtype",
		component: DateTimeSubtypeSelect,
		isEdited: isEdited$3,
		editField,
		field,
		isDefaultVisible: (field) => field.type === "datetime"
	}];
	entries.push({
		id: "use24h",
		component: Use24h,
		isEdited: isEdited$8,
		editField,
		field,
		isDefaultVisible: (field) => field.type === "datetime" && (field.subtype === DATETIME_SUBTYPES.TIME || field.subtype === DATETIME_SUBTYPES.DATETIME)
	});
	return entries;
}
function DateTimeSubtypeSelect(props) {
	const { editField, field, id } = props;
	const getValue = (e) => get$1(field, DATETIME_SUBTYPE_PATH);
	const clearTimeConfig = () => {
		const timeConfigPaths = [
			TIME_LABEL_PATH,
			TIME_USE24H_PATH,
			TIME_INTERVAL_PATH,
			TIME_SERIALISING_FORMAT_PATH
		];
		for (const path of timeConfigPaths) editField(field, path, void 0);
	};
	const initTimeConfig = () => {
		editField(field, TIME_LABEL_PATH, "Time");
		editField(field, TIME_SERIALISING_FORMAT_PATH, TIME_SERIALISING_FORMATS.UTC_OFFSET);
		editField(field, TIME_INTERVAL_PATH, 15);
	};
	const clearDateConfig = () => {
		const dateConfigPaths = [DATE_LABEL_PATH, DATE_DISALLOW_PAST_PATH];
		for (const path of dateConfigPaths) editField(field, path, void 0);
	};
	const initDateConfig = () => {
		editField(field, DATE_LABEL_PATH, "Date");
	};
	const setValue = (value) => {
		const oldValue = getValue();
		if (oldValue === value) return;
		if (value === DATETIME_SUBTYPES.DATE) {
			clearTimeConfig();
			oldValue === DATETIME_SUBTYPES.TIME && initDateConfig();
		} else if (value === DATETIME_SUBTYPES.TIME) {
			clearDateConfig();
			oldValue === DATETIME_SUBTYPES.DATE && initTimeConfig();
		} else if (value === DATETIME_SUBTYPES.DATETIME) {
			oldValue === DATETIME_SUBTYPES.DATE && initTimeConfig();
			oldValue === DATETIME_SUBTYPES.TIME && initDateConfig();
		}
		return editField(field, DATETIME_SUBTYPE_PATH, value);
	};
	const getDatetimeSubtypes = () => {
		return Object.values(DATETIME_SUBTYPES).map((subtype) => ({
			label: DATETIME_SUBTYPES_LABELS[subtype],
			value: subtype
		}));
	};
	return SelectEntry({
		label: "Subtype",
		element: field,
		getOptions: getDatetimeSubtypes,
		getValue,
		id,
		setValue
	});
}
function Use24h(props) {
	const { editField, field, id } = props;
	const path = TIME_USE24H_PATH;
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value) => {
		return editField(field, path, value);
	};
	return CheckboxEntry({
		element: field,
		getValue,
		id,
		label: "Use 24h",
		setValue
	});
}
var isTimeIntervalEdited = isEditedFromDefaultFactory("15");
function DateTimeConstraintsEntry(props) {
	const { editField, field, id } = props;
	function isDefaultVisible(subtypes) {
		return (field) => {
			if (field.type !== "datetime") return false;
			return subtypes.includes(field.subtype);
		};
	}
	const entries = [];
	entries.push({
		id: id + "-timeInterval",
		component: TimeIntervalSelect,
		isEdited: isTimeIntervalEdited,
		editField,
		field,
		isDefaultVisible: isDefaultVisible([DATETIME_SUBTYPES.TIME, DATETIME_SUBTYPES.DATETIME])
	});
	entries.push({
		id: id + "-disallowPassedDates",
		component: DisallowPassedDates,
		isEdited: isEdited$8,
		editField,
		field,
		isDefaultVisible: isDefaultVisible([DATETIME_SUBTYPES.DATE, DATETIME_SUBTYPES.DATETIME])
	});
	return entries;
}
function DisallowPassedDates(props) {
	const { editField, field, id } = props;
	const path = DATE_DISALLOW_PAST_PATH;
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value) => {
		return editField(field, path, value);
	};
	return CheckboxEntry({
		element: field,
		getValue,
		id,
		label: "Disallow past dates",
		setValue
	});
}
function TimeIntervalSelect(props) {
	const { editField, field, id } = props;
	const timeIntervals = [
		1,
		5,
		10,
		15,
		30,
		60
	];
	const getValue = (e) => get$1(field, TIME_INTERVAL_PATH);
	const setValue = (value) => editField(field, TIME_INTERVAL_PATH, parseInt(value));
	const getTimeIntervals = () => {
		return timeIntervals.map((timeInterval) => ({
			label: timeInterval === 60 ? "1h" : timeInterval + "m",
			value: timeInterval
		}));
	};
	return SelectEntry({
		label: "Time interval",
		element: field,
		getOptions: getTimeIntervals,
		getValue,
		id,
		setValue
	});
}
var isTimeFormatEdited = isEditedFromDefaultFactory(TIME_SERIALISING_FORMATS.UTC_OFFSET);
function DateTimeFormatEntry(props) {
	const { editField, field } = props;
	const entries = [];
	entries.push({
		id: "time-format",
		component: TimeFormatSelect,
		isEdited: isTimeFormatEdited,
		editField,
		field,
		isDefaultVisible: (field) => field.type === "datetime" && (field.subtype === DATETIME_SUBTYPES.TIME || field.subtype === DATETIME_SUBTYPES.DATETIME)
	});
	return entries;
}
function TimeFormatSelect(props) {
	const { editField, field, id } = props;
	const getValue = (e) => get$1(field, TIME_SERIALISING_FORMAT_PATH);
	const setValue = (value) => editField(field, TIME_SERIALISING_FORMAT_PATH, value);
	const getTimeSerialisingFormats = () => {
		return Object.values(TIME_SERIALISING_FORMATS).map((format) => ({
			label: TIME_SERIALISINGFORMAT_LABELS[format],
			value: format
		}));
	};
	return SelectEntry({
		label: "Time format",
		element: field,
		getOptions: getTimeSerialisingFormats,
		getValue,
		id,
		setValue
	});
}
function SelectEntries(props) {
	return [simpleBoolEntryFactory({
		id: "searchable",
		path: ["searchable"],
		label: "Searchable",
		props,
		isDefaultVisible: (field) => field.type === "select"
	})];
}
function ValueEntry(props) {
	const { editField, field, idPrefix, index, validateFactory } = props;
	return [{
		component: Label$1,
		editField,
		field,
		id: idPrefix + "-label",
		idPrefix,
		index,
		validateFactory
	}, {
		component: Value$1,
		editField,
		field,
		id: idPrefix + "-value",
		idPrefix,
		index,
		validateFactory
	}];
}
function Label$1(props) {
	const { editField, field, id, index, validateFactory } = props;
	const debounce = useService("debounce");
	const setValue = (value, error) => {
		if (error) return;
		return editField(field, "values", set$1(get$1(field, ["values"]), [index, "label"], value));
	};
	const getValue = () => {
		return get$1(field, [
			"values",
			index,
			"label"
		]);
	};
	return TextfieldEntry({
		debounce,
		element: field,
		getValue,
		id,
		label: "Label",
		setValue,
		validate: T$1(() => validateFactory(get$1(field, [
			"values",
			index,
			"label"
		]), (entry) => entry.label), [
			field,
			index,
			validateFactory
		])
	});
}
function Value$1(props) {
	const { editField, field, id, index, validateFactory } = props;
	const debounce = useService("debounce");
	const setValue = (value, error) => {
		if (error) return;
		const { defaultValue } = field;
		const values = get$1(field, ["values"]);
		const previousValue = get$1(field, [
			"values",
			index,
			"value"
		]);
		if (!isNil(defaultValue) && defaultValue === previousValue) set$1(field, ["defaultValue"], value);
		return editField(field, "values", set$1(values, [index, "value"], value));
	};
	const getValue = () => {
		return get$1(field, [
			"values",
			index,
			"value"
		]);
	};
	return TextfieldEntry({
		debounce,
		element: field,
		getValue,
		id,
		label: "Value",
		setValue,
		validate: T$1(() => validateFactory(get$1(field, [
			"values",
			index,
			"value"
		]), (entry) => entry.value), [
			field,
			index,
			validateFactory
		])
	});
}
function CustomValueEntry(props) {
	const { editField, field, idPrefix, index, validateFactory } = props;
	return [{
		component: Key$1,
		editField,
		field,
		id: idPrefix + "-key",
		idPrefix,
		index,
		validateFactory
	}, {
		component: Value,
		editField,
		field,
		id: idPrefix + "-value",
		idPrefix,
		index,
		validateFactory
	}];
}
function Key$1(props) {
	const { editField, field, id, index, validateFactory } = props;
	const debounce = useService("debounce");
	const setValue = (value, error) => {
		if (error) return;
		const properties = get$1(field, ["properties"]);
		const key = Object.keys(properties)[index];
		return editField(field, "properties", updateKey(properties, key, value));
	};
	const getValue = () => {
		return Object.keys(get$1(field, ["properties"]))[index];
	};
	return TextfieldEntry({
		debounce,
		element: field,
		getValue,
		id,
		label: "Key",
		setValue,
		validate: T$1(() => validateFactory(Object.keys(get$1(field, ["properties"]))[index]), [
			validateFactory,
			field,
			index
		])
	});
}
function Value(props) {
	const { editField, field, id, index, validateFactory } = props;
	const debounce = useService("debounce");
	const setValue = (value) => {
		const properties = get$1(field, ["properties"]);
		const key = Object.keys(properties)[index];
		editField(field, "properties", updateValue(properties, key, value));
	};
	const getValue = () => {
		const properties = get$1(field, ["properties"]);
		const key = Object.keys(properties)[index];
		return get$1(field, ["properties", key]);
	};
	return TextfieldEntry({
		debounce,
		element: field,
		getValue,
		id,
		label: "Value",
		setValue,
		validate: validateFactory(getValue())
	});
}
/**
* Returns copy of object with updated value.
*
* @param {Object} properties
* @param {string} key
* @param {string} value
*
* @returns {Object}
*/
function updateValue(properties, key, value) {
	return {
		...properties,
		[key]: value
	};
}
/**
* Returns copy of object with updated key.
*
* @param {Object} properties
* @param {string} oldKey
* @param {string} newKey
*
* @returns {Object}
*/
function updateKey(properties, oldKey, newKey) {
	return Object.entries(properties).reduce((newProperties, entry) => {
		const [key, value] = entry;
		return {
			...newProperties,
			[key === oldKey ? newKey : key]: value
		};
	}, {});
}
function AutoFocusSelectEntry(props) {
	const { autoFocusEntry, element, getValue } = props;
	const value = getValue(element);
	const prevValue = usePrevious(value);
	const eventBus = useService("eventBus");
	y(() => {
		if (autoFocusEntry && prevValue && value !== prevValue) setTimeout(() => {
			eventBus.fire("propertiesPanel.showEntry", { id: autoFocusEntry });
		});
	}, [
		value,
		autoFocusEntry,
		prevValue,
		eventBus
	]);
	return u(SelectEntry, { ...props });
}
var isOptionsSourceEdited = isEditedFromDefaultFactory(OPTIONS_SOURCES.STATIC);
function OptionsSourceSelectEntry(props) {
	const { editField, field, id } = props;
	return [{
		id: id + "-select",
		component: ValuesSourceSelect,
		isEdited: isOptionsSourceEdited,
		editField,
		field
	}];
}
function ValuesSourceSelect(props) {
	const { editField, field, id } = props;
	const getValue = getOptionsSource;
	const setValue = (value) => {
		let newField = field;
		const newProperties = {};
		newProperties[OPTIONS_SOURCES_PATHS[value]] = OPTIONS_SOURCES_DEFAULTS[value];
		newField = editField(field, newProperties);
		return newField;
	};
	const getOptionsSourceOptions = () => {
		return Object.values(OPTIONS_SOURCES).map((valueSource) => ({
			label: OPTIONS_SOURCES_LABELS[valueSource],
			value: valueSource
		}));
	};
	return AutoFocusSelectEntry({
		autoFocusEntry: getAutoFocusEntryId$1(field),
		label: "Type",
		element: field,
		getOptions: getOptionsSourceOptions,
		getValue,
		id,
		setValue
	});
}
function getAutoFocusEntryId$1(field) {
	const valuesSource = getOptionsSource(field);
	if (valuesSource === OPTIONS_SOURCES.EXPRESSION) return "optionsExpression-expression";
	else if (valuesSource === OPTIONS_SOURCES.INPUT) return "dynamicOptions-key";
	else if (valuesSource === OPTIONS_SOURCES.STATIC) return "staticOptions-0-label";
	return null;
}
function InputKeyOptionsSourceEntry(props) {
	const { editField, field, id } = props;
	return [{
		id: id + "-key",
		component: InputValuesKey,
		isEdited,
		editField,
		field
	}];
}
function InputValuesKey(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const path = OPTIONS_SOURCES_PATHS[OPTIONS_SOURCES.INPUT];
	const tooltip = u("div", { children: ["The input property may be an array of simple values or alternatively follow this schema:", u("pre", { children: u("code", { children: "[\n  {\n    \"label\": \"dollar\",\n    \"value\": \"$\"\n  }\n]" }) })] });
	const getValue = () => get$1(field, path, "");
	const setValue = (value, error) => {
		if (error) return;
		editField(field, path, value || "");
	};
	return TextfieldEntry({
		debounce,
		description: "Define which input property to populate the values from",
		tooltip,
		element: field,
		getValue,
		id,
		label: "Input values key",
		setValue,
		validate: validate$6
	});
}
/**
* @param {string|void} value
* @returns {string|null}
*/
var validate$6 = (value) => {
	if (typeof value !== "string" || value.length === 0) return "Must not be empty.";
	if (/\s/.test(value)) return "Must not contain spaces.";
	return null;
};
function StaticOptionsSourceEntry(props) {
	const { editField, field, id: idPrefix } = props;
	const { values } = field;
	const addEntry = (e) => {
		e.stopPropagation();
		const entry = getIndexedEntry(values.length + 1, values);
		editField(field, OPTIONS_SOURCES_PATHS[OPTIONS_SOURCES.STATIC], arrayAdd(values, values.length, entry));
	};
	const removeEntry = (entry) => {
		if (field.defaultValue === entry.value) editField(field, {
			values: without(values, entry),
			defaultValue: void 0
		});
		else editField(field, OPTIONS_SOURCES_PATHS[OPTIONS_SOURCES.STATIC], without(values, entry));
	};
	const validateFactory = (key, getValue) => {
		return (value) => {
			if (value === key) return;
			if (typeof value !== "string" || value.length === 0) return "Must not be empty.";
			if (values.find((entry) => getValue(entry) === value)) return "Must be unique.";
		};
	};
	return {
		items: values.map((entry, index) => {
			const id = idPrefix + "-" + index;
			return {
				id,
				label: entry.label,
				entries: ValueEntry({
					editField,
					field,
					idPrefix: id,
					index,
					validateFactory
				}),
				autoFocusEntry: id + "-label",
				remove: () => removeEntry(entry)
			};
		}),
		add: addEntry
	};
}
function getIndexedEntry(index, values) {
	const entry = {
		label: "Value",
		value: "value"
	};
	while (labelOrValueIsAlreadyAssignedForIndex(index, values)) index++;
	if (index > 1) {
		entry.label += ` ${index}`;
		entry.value += `${index}`;
	}
	return entry;
}
function labelOrValueIsAlreadyAssignedForIndex(index, values) {
	return values.some((existingEntry) => existingEntry.label === `Value ${index}` || existingEntry.value === `value${index}`);
}
function AdornerEntry(props) {
	const { editField, field } = props;
	const entries = [];
	const onChange = (key) => {
		return (value) => {
			editField(field, ["appearance"], set$1(get$1(field, ["appearance"], {}), [key], value));
		};
	};
	const getValue = (key) => {
		return () => {
			return get$1(field, ["appearance", key]);
		};
	};
	entries.push({
		id: "prefix-adorner",
		component: PrefixAdorner,
		isEdited: isEdited$5,
		editField,
		field,
		onChange,
		getValue,
		isDefaultVisible: (field) => ["number", "textfield"].includes(field.type)
	});
	entries.push({
		id: "suffix-adorner",
		component: SuffixAdorner,
		isEdited: isEdited$5,
		editField,
		field,
		onChange,
		getValue,
		isDefaultVisible: (field) => ["number", "textfield"].includes(field.type)
	});
	return entries;
}
function PrefixAdorner(props) {
	const { field, id, onChange, getValue } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	return FeelTemplatingEntry({
		debounce,
		element: field,
		feel: "optional",
		getValue: getValue("prefixAdorner"),
		id,
		label: "Prefix",
		setValue: onChange("prefixAdorner"),
		singleLine: true,
		variables
	});
}
function SuffixAdorner(props) {
	const { field, id, onChange, getValue } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	return FeelTemplatingEntry({
		debounce,
		element: field,
		getValue: getValue("suffixAdorner"),
		id,
		label: "Suffix",
		setValue: onChange("suffixAdorner"),
		singleLine: true,
		variables
	});
}
function ReadonlyEntry(props) {
	const { editField, field } = props;
	const { disabled } = field;
	const entries = [];
	if (!disabled) entries.push({
		id: "readonly",
		component: Readonly,
		editField,
		field,
		isEdited: isEdited$5,
		isDefaultVisible: (field) => INPUTS.includes(field.type)
	});
	return entries;
}
function Readonly(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	const path = ["readonly"];
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value) => {
		return editField(field, path, value || false);
	};
	return FeelToggleSwitchEntry({
		debounce,
		element: field,
		feel: "optional",
		getValue,
		id,
		label: "Read only",
		tooltip: "Make this field read-only when it cannot be edited by the end-user, but its content is important for them to see. Its data will still be submitted.",
		setValue,
		variables
	});
}
function LayouterAppearanceEntry(props) {
	const { field } = props;
	if (!["group", "dynamiclist"].includes(field.type)) return [];
	return [simpleSelectEntryFactory({
		id: "verticalAlignment",
		path: ["verticalAlignment"],
		label: "Vertical alignment",
		optionsArray: [
			{
				value: "start",
				label: "Top"
			},
			{
				value: "center",
				label: "Center"
			},
			{
				value: "end",
				label: "Bottom"
			}
		],
		props
	})];
}
function RepeatableEntry(props) {
	const { field, getService } = props;
	const { type } = field;
	const formFieldDefinition = getService("formFields").get(type);
	if (!formFieldDefinition || !formFieldDefinition.config.repeatable) return [];
	const entries = [
		simpleRangeIntegerEntryFactory({
			id: "defaultRepetitions",
			path: ["defaultRepetitions"],
			label: "Default number of items",
			min: 1,
			max: 100,
			props
		}),
		simpleBoolEntryFactory({
			id: "allowAddRemove",
			path: ["allowAddRemove"],
			label: "Allow add/delete items",
			props
		}),
		simpleBoolEntryFactory({
			id: "disableCollapse",
			path: ["disableCollapse"],
			label: "Disable collapse",
			props
		})
	];
	if (!field.disableCollapse) {
		const nonCollapseItemsEntry = simpleRangeIntegerEntryFactory({
			id: "nonCollapsedItems",
			path: ["nonCollapsedItems"],
			label: "Number of non-collapsing items",
			min: 1,
			props
		});
		entries.push(nonCollapseItemsEntry);
	}
	return entries;
}
function ConditionEntry(props) {
	const { editField, field } = props;
	return [{
		id: "conditional-hide",
		component: Condition,
		editField,
		field,
		isEdited: isEdited$5
	}];
}
function Condition(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	const path = ["conditional", "hide"];
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value) => {
		if (!value) return editField(field, "conditional", void 0);
		return editField(field, "conditional", { hide: value });
	};
	let label = "Hide if";
	let description = "Condition under which the field is hidden";
	if (field.type === "expression") {
		label = "Deactivate if";
		description = "Condition under which the field is deactivated";
	}
	return FeelEntry({
		debounce,
		description,
		element: field,
		feel: "required",
		getValue,
		id,
		label,
		setValue,
		variables
	});
}
function OptionsExpressionEntry(props) {
	const { editField, field, id } = props;
	return [{
		id: id + "-expression",
		component: OptionsExpression,
		isEdited: isEdited$5,
		editField,
		field
	}];
}
function OptionsExpression(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	const path = OPTIONS_SOURCES_PATHS[OPTIONS_SOURCES.EXPRESSION];
	const tooltip = u("div", { children: ["The expression may result in an array of simple values or alternatively follow this schema:", u("pre", { children: u("code", { children: "[\n  {\n    \"label\": \"dollar\",\n    \"value\": \"$\"\n  }\n]" }) })] });
	const getValue = () => get$1(field, path, "");
	const setValue = (value) => editField(field, path, value || "");
	return FeelEntry({
		debounce,
		description: "Define an expression to populate the options from.",
		tooltip,
		element: field,
		feel: "required",
		getValue,
		id,
		label: "Options expression",
		setValue,
		variables
	});
}
function TableDataSourceEntry(props) {
	const { editField, field } = props;
	const entries = [];
	entries.push({
		id: "dataSource",
		component: Source,
		editField,
		field,
		isEdited: isEdited$5,
		isDefaultVisible: (field) => field.type === "table"
	});
	return entries;
}
function Source(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	const path = ["dataSource"];
	const getValue = () => {
		return get$1(field, path, field.id);
	};
	const setValue = (value, error) => {
		if (error) return;
		editField(field, path, value);
	};
	return FeelTemplatingEntry({
		debounce,
		description: "Specify the source from which to populate the table",
		element: field,
		feel: "required",
		getValue,
		id,
		label: "Data source",
		tooltip: "Enter a form input variable that contains the data for the table or define an expression to populate the data dynamically.",
		setValue,
		singleLine: true,
		variables,
		validate: validate$5
	});
}
/**
* @param {string|void} value
* @returns {string|null}
*/
var validate$5 = (value) => {
	if (!isString(value) || value.length === 0) return "Must not be empty.";
	if (value.startsWith("=")) return null;
	if (!isValidDotPath(value)) return "Must be a variable or a dot separated path.";
	if (hasIntegerPathSegment(value)) return "Must not contain numerical path segments.";
	return null;
};
function PaginationEntry(props) {
	const { editField, field } = props;
	const entries = [];
	entries.push({
		id: "pagination",
		component: Pagination,
		editField,
		field,
		isEdited: isEdited$7,
		isDefaultVisible: (field) => field.type === "table"
	});
	return entries;
}
function Pagination(props) {
	const { editField, field, id } = props;
	const defaultRowCount = 10;
	const path = ["rowCount"];
	const getValue = () => {
		return isNumber(get$1(field, path));
	};
	/**
	* @param {boolean} value
	*/
	const setValue = (value) => {
		value ? editField(field, path, defaultRowCount) : editField(field, path, void 0);
	};
	return ToggleSwitchEntry({
		element: field,
		getValue,
		id,
		label: "Pagination",
		inline: true,
		setValue
	});
}
var path$2 = ["rowCount"];
function RowCountEntry(props) {
	const { editField, field } = props;
	const entries = [];
	entries.push({
		id: "rowCount",
		component: RowCount,
		isEdited: isEdited$6,
		editField,
		field,
		isDefaultVisible: (field) => field.type === "table" && isNumber(get$1(field, path$2))
	});
	return entries;
}
function RowCount(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const getValue = () => get$1(field, path$2);
	/**
	* @param {number|void} value
	* @param {string|null} error
	* @returns {void}
	*/
	const setValue = (value, error) => {
		if (error) return;
		editField(field, path$2, value);
	};
	return NumberFieldEntry({
		debounce,
		label: "Number of rows per page",
		element: field,
		id,
		getValue,
		setValue,
		validate: validate$4
	});
}
/**
* @param {string|void} value
* @returns {string|null}
*/
var validate$4 = (value) => {
	if (isNil(value)) return null;
	if (!isNumber(value)) return "Must be number";
	if (!Number.isInteger(value)) return "Should be an integer.";
	if (value < 1) return "Should be greater than zero.";
	return null;
};
var OPTIONS = {
	static: {
		label: "List of items",
		value: "static"
	},
	expression: {
		label: "Expression",
		value: "expression"
	}
};
var SELECT_OPTIONS = Object.values(OPTIONS);
var COLUMNS_PATH = ["columns"];
var COLUMNS_EXPRESSION_PATH = ["columnsExpression"];
var isHeadersSourceEdited = isEditedFromDefaultFactory(OPTIONS.static.value);
function HeadersSourceSelectEntry(props) {
	const { editField, field, id } = props;
	return [{
		id: id + "-select",
		component: HeadersSourceSelect,
		isEdited: isHeadersSourceEdited,
		editField,
		field
	}];
}
function HeadersSourceSelect(props) {
	const { editField, field, id } = props;
	/**
	* @returns {string|void}
	*/
	const getValue = () => {
		const columns = get$1(field, COLUMNS_PATH);
		if (isString(get$1(field, COLUMNS_EXPRESSION_PATH))) return OPTIONS.expression.value;
		if (isArray(columns)) return OPTIONS.static.value;
	};
	/**
	* @param {string|void} value
	*/
	const setValue = (value) => {
		switch (value) {
			case OPTIONS.static.value:
				editField(field, { columns: [{
					label: "Column",
					key: "inputVariable"
				}] });
				break;
			case OPTIONS.expression.value:
				editField(field, { columnsExpression: "=" });
				break;
		}
	};
	const getValuesSourceOptions = () => {
		return SELECT_OPTIONS;
	};
	return AutoFocusSelectEntry({
		autoFocusEntry: getAutoFocusEntryId(field),
		label: "Type",
		element: field,
		getOptions: getValuesSourceOptions,
		getValue,
		id,
		setValue
	});
}
function getAutoFocusEntryId(field) {
	const columns = get$1(field, COLUMNS_PATH);
	if (isString(get$1(field, COLUMNS_EXPRESSION_PATH))) return `${field.id}-columnsExpression`;
	if (isArray(columns)) return `${field.id}-columns-0-label`;
	return null;
}
var PATH = ["columnsExpression"];
function ColumnsExpressionEntry(props) {
	const { editField, field } = props;
	const entries = [];
	entries.push({
		id: `${field.id}-columnsExpression`,
		component: ColumnsExpression,
		editField,
		field,
		isEdited: isEdited$5,
		isDefaultVisible: (field) => field.type === "table" && isString(get$1(field, PATH))
	});
	return entries;
}
function ColumnsExpression(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	const getValue = () => {
		return get$1(field, PATH);
	};
	/**
	* @param {string|void} value
	* @param {string|void} error
	* @returns {void}
	*/
	const setValue = (value, error) => {
		if (error) return;
		editField(field, PATH, value);
	};
	return FeelTemplatingEntry({
		debounce,
		description: "Specify an expression to populate column items",
		element: field,
		feel: "required",
		getValue,
		id,
		label: "Expression",
		tooltip: u("div", { children: ["The expression may result in an array of simple values or alternatively follow this schema:", u("pre", { children: u("code", { children: "[\n  {\n    \"key\": \"column_1\",\n    \"label\": \"Column 1\"\n  }\n]" }) })] }),
		setValue,
		singleLine: true,
		variables,
		validate: validate$3
	});
}
/**
* @param {string|void} value
* @returns {string|null}
*/
var validate$3 = (value) => {
	if (!isString(value) || value.length === 0 || value === "=") return "Must not be empty.";
	return null;
};
var path$1 = "columns";
var labelPath = "label";
var keyPath = "key";
function ColumnEntry(props) {
	const { editField, field, idPrefix, index } = props;
	return [{
		component: Label,
		editField,
		field,
		id: idPrefix + "-label",
		idPrefix,
		index
	}, {
		component: Key,
		editField,
		field,
		id: idPrefix + "-key",
		idPrefix,
		index
	}];
}
function Label(props) {
	const { editField, field, id, index } = props;
	const debounce = useService("debounce");
	/**
	* @param {string|void} value
	* @param {string|void} error
	* @returns {void}
	*/
	const setValue = (value, error) => {
		if (error) return;
		editField(field, path$1, set$1(get$1(field, [path$1]), [index, labelPath], value));
	};
	const getValue = () => {
		return get$1(field, [
			path$1,
			index,
			labelPath
		]);
	};
	return TextfieldEntry({
		debounce,
		element: field,
		getValue,
		id,
		label: "Label",
		setValue
	});
}
function Key(props) {
	const { editField, field, id, index } = props;
	const debounce = useService("debounce");
	/**
	* @param {string|void} value
	* @param {string|void} error
	* @returns {void}
	*/
	const setValue = (value, error) => {
		if (error) return;
		editField(field, path$1, set$1(get$1(field, [path$1]), [index, keyPath], value));
	};
	const getValue = () => {
		return get$1(field, [
			path$1,
			index,
			keyPath
		]);
	};
	return TextfieldEntry({
		debounce,
		element: field,
		getValue,
		id,
		label: "Key",
		setValue,
		validate: validate$2
	});
}
/**
* @param {string|void} value
* @returns {string|null}
*/
function validate$2(value) {
	if (!isString(value) || value.length === 0) return "Must not be empty.";
	return null;
}
var path = ["columns"];
function StaticColumnsSourceEntry(props) {
	const { editField, field, id: idPrefix } = props;
	const { columns } = field;
	const addEntry = (event) => {
		event.stopPropagation();
		editField(field, path, arrayAdd(columns, columns.length, {
			label: "Column",
			key: "inputVariable"
		}));
	};
	const removeEntry = (entry) => {
		editField(field, path, without(columns, entry));
	};
	return {
		items: columns.map((entry, index) => {
			const id = `${idPrefix}-${index}`;
			return {
				id,
				label: entry.label || entry.key,
				entries: ColumnEntry({
					editField,
					field,
					idPrefix: id,
					index
				}),
				autoFocusEntry: `${id}-label`,
				remove: () => removeEntry(entry)
			};
		}),
		add: addEntry
	};
}
function VersionTagEntry(props) {
	const { editField, field } = props;
	const entries = [];
	entries.push({
		id: "versionTag",
		component: VersionTag,
		editField,
		field,
		isEdited,
		isDefaultVisible: (field) => field.type === "default"
	});
	return entries;
}
function VersionTag(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const path = ["versionTag"];
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value, error) => {
		if (error) return;
		return editField(field, path, value);
	};
	return TextfieldEntry({
		debounce,
		element: field,
		getValue,
		id,
		label: "Version tag",
		setValue,
		tooltip: u("div", { children: "Version tag by which this form can be referenced." })
	});
}
function AcceptEntry(props) {
	const { editField, field } = props;
	const entries = [];
	entries.push({
		id: "accept",
		component: Accept,
		editField,
		field,
		isEdited: isEdited$5,
		isDefaultVisible: (field) => field.type === "filepicker"
	});
	return entries;
}
function Accept(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	const path = ["accept"];
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value) => {
		return editField(field, path, value);
	};
	return FeelTemplatingEntry({
		debounce,
		element: field,
		getValue,
		id,
		label: "Supported file formats",
		singleLine: true,
		setValue,
		variables,
		description: description$1
	});
}
var description$1 = u(k, { children: [
	"A comma-separated list of",
	" ",
	u("a", {
		href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers",
		target: "_blank",
		rel: "noreferrer",
		children: "file type specifiers"
	})
] });
function MultipleEntry(props) {
	const { editField, field } = props;
	const entries = [];
	entries.push({
		id: "multiple",
		component: Multiple,
		editField,
		field,
		isEdited: isEdited$5,
		isDefaultVisible: (field) => field.type === "filepicker"
	});
	return entries;
}
function Multiple(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	const path = ["multiple"];
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value) => {
		return editField(field, path, value);
	};
	return FeelToggleSwitchEntry({
		debounce,
		element: field,
		feel: "optional",
		getValue,
		id,
		label: "Upload multiple files",
		inline: true,
		setValue,
		variables
	});
}
function DocumentsDataSourceEntry(props) {
	const { editField, field } = props;
	const entries = [];
	entries.push({
		id: "dataSource",
		component: DocumentsDataSource,
		editField,
		field,
		isEdited: isEdited$5,
		isDefaultVisible: (field) => field.type === "documentPreview"
	});
	return entries;
}
function DocumentsDataSource(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	const path = ["dataSource"];
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value) => {
		return editField(field, path, value);
	};
	return FeelTemplatingEntry({
		debounce,
		element: field,
		getValue,
		id,
		label: "Document reference",
		feel: "required",
		singleLine: true,
		setValue,
		variables,
		tooltip: u("div", { children: [
			u("p", { children: "A source is a JSON object containing metadata for a document or an array of documents." }),
			u("p", { children: "Each entry must include a document ID, name, and MIME type." }),
			u("p", { children: "Additional details are optional. The expected format is as follows:" }),
			u("pre", { children: u("code", { children: `[
  {
    "documentId": "u123",
    "endpoint": "https://api.example.com/documents/u123",
    "metadata": {
      "fileName": "Document.pdf",
      "contentType": "application/pdf"
    }
  }
]` }) }),
			u("p", { children: "When using Camunda Tasklist UI, additional document reference attributes are automatically handled. Modifying the document reference may affect the document preview functionality." }),
			u("p", { children: [
				"Learn more in our",
				" ",
				u("a", {
					href: "https://docs.camunda.io/docs/components/modeler/forms/form-element-library/forms-element-library-document-preview/",
					target: "_blank",
					rel: "noopener noreferrer",
					children: "documentation"
				}),
				"."
			] })
		] }),
		validate: validate$1
	});
}
/**
* @param {string|undefined} value
* @returns {string|null}
*/
var validate$1 = (value) => {
	if (typeof value !== "string" || value.length === 0) return "The document data source is required.";
};
function MaxHeightEntry(props) {
	const { editField, field } = props;
	const entries = [];
	entries.push({
		id: "maxHeight",
		component: MaxHeight,
		editField,
		field,
		isEdited: isEdited$6,
		isDefaultVisible: (field) => field.type === "documentPreview"
	});
	return entries;
}
function MaxHeight(props) {
	const { editField, field, id } = props;
	const debounce = useService("debounce");
	const path = ["maxHeight"];
	const getValue = () => {
		return get$1(field, path, "");
	};
	const setValue = (value) => {
		return editField(field, path, value);
	};
	return NumberFieldEntry({
		debounce,
		label: "Max height of preview container",
		element: field,
		id,
		getValue,
		setValue,
		validate,
		description
	});
}
/**
* @param {string|number|undefined} value
* @returns {string|null}
*/
var validate = (value) => {
	if (value === void 0 || value === "") return null;
	if (typeof value === "string") return "Value must be a number.";
	if (!Number.isInteger(value)) return "Should be an integer.";
	if (value < 1) return "Should be greater than zero.";
};
var description = u(k, { children: "Documents with height that exceeds the defined value will be vertically scrollable" });
function GeneralGroup(field, editField, getService) {
	const entries = [
		...IdEntry({
			field,
			editField
		}),
		...VersionTagEntry({
			field,
			editField
		}),
		...LabelEntry({
			field,
			editField
		}),
		...DescriptionEntry({
			field,
			editField
		}),
		...KeyEntry({
			field,
			editField,
			getService
		}),
		...PathEntry({
			field,
			editField,
			getService
		}),
		...RepeatableEntry({
			field,
			editField,
			getService
		}),
		...DefaultValueEntry({
			field,
			editField
		}),
		...ActionEntry({
			field,
			editField
		}),
		...DateTimeEntry({
			field,
			editField
		}),
		...TextEntry({
			field,
			editField
		}),
		...HtmlEntry({
			field,
			editField
		}),
		...IFrameUrlEntry({
			field,
			editField
		}),
		...IFrameHeightEntry({
			field,
			editField
		}),
		...HeightEntry({
			field,
			editField
		}),
		...NumberEntries({
			field,
			editField
		}),
		...ExpressionFieldEntries({
			field,
			editField
		}),
		...ImageSourceEntry({
			field,
			editField
		}),
		...AltTextEntry({
			field,
			editField
		}),
		...SelectEntries({
			field,
			editField
		}),
		...AcceptEntry({
			field,
			editField
		}),
		...MultipleEntry({
			field,
			editField
		}),
		...DisabledEntry({
			field,
			editField
		}),
		...ReadonlyEntry({
			field,
			editField
		}),
		...TableDataSourceEntry({
			field,
			editField
		}),
		...PaginationEntry({
			field,
			editField
		}),
		...RowCountEntry({
			field,
			editField
		}),
		...DocumentsDataSourceEntry({
			field,
			editField
		})
	];
	if (entries.length === 0) return null;
	return {
		id: "general",
		label: "General",
		entries
	};
}
function SerializationGroup(field, editField) {
	const entries = [...NumberSerializationEntry({
		field,
		editField
	}), ...DateTimeFormatEntry({
		field,
		editField
	})];
	if (!entries.length) return null;
	return {
		id: "serialization",
		label: "Serialization",
		entries
	};
}
function ConstraintsGroup(field, editField) {
	const entries = [...DateTimeConstraintsEntry({
		field,
		editField
	})];
	if (!entries.length) return null;
	return {
		id: "constraints",
		label: "Constraints",
		entries
	};
}
var VALIDATION_TYPE_OPTIONS = {
	custom: {
		value: "",
		label: "Custom"
	},
	email: {
		value: "email",
		label: "Email"
	},
	phone: {
		value: "phone",
		label: "Phone"
	}
};
function ValidationGroup(field, editField) {
	const { type } = field;
	const validate = get$1(field, ["validate"], {});
	const isCustomValidation = [void 0, VALIDATION_TYPE_OPTIONS.custom.value].includes(validate.validationType);
	const hasPattern = !!get$1(field, ["validate", "pattern"]);
	const onChange = (key) => {
		return (value) => {
			editField(field, ["validate"], set$1(get$1(field, ["validate"], {}), [key], value));
		};
	};
	const getValue = (key) => {
		return () => {
			return get$1(field, ["validate", key]);
		};
	};
	let entries = [{
		id: "required",
		component: Required,
		getValue,
		field,
		isEdited: isEdited$8,
		onChange,
		isDefaultVisible: (field) => INPUTS.includes(field.type)
	}];
	entries.push({
		id: "validationType",
		component: ValidationType,
		getValue,
		field,
		editField,
		isEdited,
		onChange,
		isDefaultVisible: (field) => field.type === "textfield"
	});
	entries.push({
		id: "minLength",
		component: MinLength,
		getValue,
		field,
		isEdited: isEdited$5,
		onChange,
		isDefaultVisible: (field) => INPUTS.includes(field.type) && (type === "textarea" || type === "textfield" && isCustomValidation)
	}, {
		id: "maxLength",
		component: MaxLength,
		getValue,
		field,
		isEdited: isEdited$5,
		onChange,
		isDefaultVisible: (field) => INPUTS.includes(field.type) && (type === "textarea" || type === "textfield" && isCustomValidation)
	});
	entries.push({
		id: "pattern",
		component: Pattern,
		getValue,
		field,
		isEdited,
		onChange,
		isDefaultVisible: (field) => INPUTS.includes(field.type) && type === "textfield" && isCustomValidation
	});
	entries.push({
		id: "patternErrorMessage",
		component: PatternErrorMessage,
		getValue,
		field,
		isEdited,
		onChange,
		isDefaultVisible: (field) => INPUTS.includes(field.type) && type === "textfield" && isCustomValidation && hasPattern
	});
	entries.push({
		id: "min",
		component: Min,
		getValue,
		field,
		isEdited: isEdited$5,
		onChange,
		isDefaultVisible: (field) => field.type === "number"
	}, {
		id: "max",
		component: Max,
		getValue,
		field,
		isEdited: isEdited$5,
		onChange,
		isDefaultVisible: (field) => field.type === "number"
	});
	return {
		id: "validation",
		label: "Validation",
		entries
	};
}
function Required(props) {
	const { field, getValue, id, onChange } = props;
	return CheckboxEntry({
		element: field,
		getValue: getValue("required"),
		id,
		label: "Required",
		setValue: onChange("required")
	});
}
function MinLength(props) {
	const { field, getValue, id, onChange } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	return FeelNumberEntry({
		debounce,
		element: field,
		feel: "optional",
		getValue: getValue("minLength"),
		id,
		label: "Minimum length",
		min: 0,
		setValue: onChange("minLength"),
		variables
	});
}
function MaxLength(props) {
	const { field, getValue, id, onChange } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	return FeelNumberEntry({
		debounce,
		element: field,
		feel: "optional",
		getValue: getValue("maxLength"),
		id,
		label: "Maximum length",
		min: 0,
		setValue: onChange("maxLength"),
		variables
	});
}
function Pattern(props) {
	const { field, getValue, id, onChange } = props;
	return TextfieldEntry({
		debounce: useService("debounce"),
		element: field,
		getValue: getValue("pattern"),
		id,
		label: "Custom regular expression",
		setValue: onChange("pattern")
	});
}
function PatternErrorMessage(props) {
	const { field, getValue, id, onChange } = props;
	return TextfieldEntry({
		debounce: useService("debounce"),
		element: field,
		getValue: getValue("patternErrorMessage"),
		id,
		label: "Custom error message",
		tooltip: "The error message to display when the input does not match the regular expression.",
		setValue: onChange("patternErrorMessage")
	});
}
function Min(props) {
	const { field, getValue, id, onChange } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	return FeelNumberEntry({
		debounce,
		element: field,
		feel: "optional",
		id,
		label: "Minimum",
		step: "any",
		getValue: getValue("min"),
		setValue: onChange("min"),
		variables
	});
}
function Max(props) {
	const { field, getValue, id, onChange } = props;
	const debounce = useService("debounce");
	const variables = useVariables().map((name) => ({ name }));
	return FeelNumberEntry({
		debounce,
		element: field,
		feel: "optional",
		id,
		label: "Maximum",
		step: "any",
		getValue: getValue("max"),
		setValue: onChange("max"),
		variables
	});
}
function ValidationType(props) {
	const { field, getValue, id, onChange } = props;
	useService("debounce");
	const setValue = (validationType) => {
		onChange("validationType")(validationType || void 0);
	};
	return SelectEntry({
		element: field,
		getValue: getValue("validationType"),
		id,
		label: "Validation pattern",
		setValue,
		getOptions: () => Object.values(VALIDATION_TYPE_OPTIONS),
		tooltip: getValue("validationType")() === VALIDATION_TYPE_OPTIONS.phone.value ? "The built-in phone validation pattern is based on the E.164 standard with no spaces. Ex: +491234567890" : void 0
	});
}
function OptionsGroups(field, editField, getService) {
	const { type } = field;
	const fieldDefinition = getService("formFields").get(type).config;
	if (!OPTIONS_INPUTS.includes(type) && !hasOptionsGroupsConfigured(fieldDefinition)) return [];
	const context = {
		editField,
		field
	};
	const id = "valuesSource";
	/**
	* @type {Array<Group|ListGroup>}
	*/
	const groups = [{
		id,
		label: "Options source",
		tooltip: getValuesTooltip(),
		component: Group,
		entries: OptionsSourceSelectEntry({
			...context,
			id
		})
	}];
	const valuesSource = getOptionsSource(field);
	if (valuesSource === OPTIONS_SOURCES.INPUT) {
		const id = "dynamicOptions";
		groups.push({
			id,
			label: "Dynamic options",
			component: Group,
			entries: InputKeyOptionsSourceEntry({
				...context,
				id
			})
		});
	} else if (valuesSource === OPTIONS_SOURCES.STATIC) {
		const id = "staticOptions";
		groups.push({
			id,
			label: "Static options",
			component: ListGroup,
			...StaticOptionsSourceEntry({
				...context,
				id
			})
		});
	} else if (valuesSource === OPTIONS_SOURCES.EXPRESSION) {
		const id = "optionsExpression";
		groups.push({
			id,
			label: "Options expression",
			component: Group,
			entries: OptionsExpressionEntry({
				...context,
				id
			})
		});
	}
	return groups;
}
function getValuesTooltip() {
	return "\"Static\" defines a constant, predefined set of form options.\n\n\"Input data\" defines options that are populated dynamically, adjusting based on variable data for flexible responses to different conditions or inputs.\n\n\"Expression\" defines options that are populated from a FEEL expression.";
}
function CustomPropertiesGroup(field, editField) {
	const { properties = {}, type } = field;
	if (type === "default") return null;
	const addEntry = (event) => {
		event.stopPropagation();
		let index = Object.keys(properties).length + 1;
		while (`key${index}` in properties) index++;
		editField(field, ["properties"], {
			...properties,
			[`key${index}`]: "value"
		});
	};
	const validateFactory = (key) => {
		return (value) => {
			if (value === key) return;
			if (typeof value !== "string" || value.length === 0) return "Must not be empty.";
			if (has(properties, value)) return "Must be unique.";
		};
	};
	return {
		add: addEntry,
		component: ListGroup,
		id: "custom-values",
		items: Object.keys(properties).map((key, index) => {
			const removeEntry = (event) => {
				event.stopPropagation();
				return editField(field, ["properties"], removeKey(properties, key));
			};
			const id = `property-${field.id}-${index}`;
			return {
				autoFocusEntry: id + "-key",
				entries: CustomValueEntry({
					editField,
					field,
					idPrefix: id,
					index,
					validateFactory
				}),
				id,
				label: key || "",
				remove: removeEntry
			};
		}),
		label: "Custom properties",
		tooltip: "Add properties directly to the form schema, useful to configure functionality in custom-built task applications and form renderers."
	};
}
/**
* Returns copy of object without key.
*
* @param {Object} properties
* @param {string} oldKey
*
* @returns {Object}
*/
function removeKey(properties, oldKey) {
	return Object.entries(properties).reduce((newProperties, entry) => {
		const [key, value] = entry;
		if (key === oldKey) return newProperties;
		return {
			...newProperties,
			[key]: value
		};
	}, {});
}
function AppearanceGroup(field, editField, getService) {
	const entries = [
		...AdornerEntry({
			field,
			editField
		}),
		...GroupAppearanceEntry({
			field,
			editField
		}),
		...LayouterAppearanceEntry({
			field,
			editField
		}),
		...MaxHeightEntry({
			field,
			editField
		})
	];
	if (!entries.length) return null;
	return {
		id: "appearance",
		label: "Appearance",
		entries
	};
}
function LayoutGroup(field, editField) {
	const { type } = field;
	if (type === "default") return null;
	const entries = [...ColumnsEntry({
		field,
		editField
	})];
	if (entries.length === 0) return null;
	return {
		id: "layout",
		label: "Layout",
		entries
	};
}
function SecurityAttributesGroup(field, editField) {
	const { type } = field;
	if (type !== "iframe") return null;
	const entries = createEntries({
		field,
		editField
	});
	if (!entries.length) return null;
	return {
		id: "securityAttributes",
		label: "Security attributes",
		entries,
		tooltip: getTooltip()
	};
}
function createEntries(props) {
	const { editField, field } = props;
	const securityEntries = SECURITY_ATTRIBUTES_DEFINITIONS.map((definition) => {
		const { label, property } = definition;
		return simpleBoolEntryFactory({
			id: property,
			label,
			isDefaultVisible: (field) => field.type === "iframe",
			path: ["security", property],
			props,
			getValue: () => get$1(field, ["security", property]),
			setValue: (value) => {
				editField(field, ["security"], set$1(get$1(field, ["security"], {}), [property], value));
			}
		});
	});
	return [{ component: Advisory }, ...securityEntries];
}
var Advisory = (props) => {
	return u("div", {
		class: "bio-properties-panel-description fjs-properties-panel-detached-description",
		children: "These options can incur security risks, especially if used in combination with dynamic links. Ensure that you are aware of them, that you trust the source url and only enable what your use case requires."
	});
};
function getTooltip() {
	return u(k, { children: u("p", { children: [
		"Allow the iframe to access more functionality of your browser, details regarding the various options can be found in the",
		" ",
		u("a", {
			target: "_blank",
			href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe",
			rel: "noreferrer",
			children: "MDN iFrame documentation."
		})
	] }) });
}
function ConditionGroup(field, editField) {
	const { type } = field;
	if (type === "default") return null;
	return {
		id: "condition",
		label: "Condition",
		entries: [...ConditionEntry({
			field,
			editField
		})]
	};
}
function TableHeaderGroups(field, editField) {
	const { type, id: fieldId } = field;
	if (type !== "table") return [];
	const areStaticColumnsEnabled = isArray(get$1(field, ["columns"]));
	/**
	* @type {Array<Group>}
	*/
	const groups = [{
		id: `${fieldId}-columnsSource`,
		label: "Headers source",
		tooltip: TOOLTIP_TEXT,
		component: Group,
		entries: [...HeadersSourceSelectEntry({
			field,
			editField
		}), ...ColumnsExpressionEntry({
			field,
			editField
		})]
	}];
	if (areStaticColumnsEnabled) {
		const id = `${fieldId}-columns`;
		groups.push({
			id,
			label: "Header items",
			component: ListGroup,
			...StaticColumnsSourceEntry({
				field,
				editField,
				id
			})
		});
	}
	return groups;
}
var TOOLTIP_TEXT = `"List of items" defines a constant, predefined set of form options.

"Expression" defines options that are populated from a FEEL expression.
`;
var PropertiesProvider = class {
	constructor(propertiesPanel, injector) {
		this._injector = injector;
		propertiesPanel.registerProvider(this);
	}
	_filterVisibleEntries(groups, field, getService) {
		return groups.forEach((group) => {
			const { entries } = group;
			const { type } = field;
			const fieldDefinition = getService("formFields").get(type).config;
			if (!entries) return;
			group.entries = entries.filter((entry) => {
				const { isDefaultVisible } = entry;
				if (!isDefaultVisible) return true;
				return isDefaultVisible(field) || hasEntryConfigured(fieldDefinition, entry.id);
			});
		});
	}
	getGroups(field, editField) {
		return (groups) => {
			if (!field) return groups;
			const getService = (type, strict = true) => this._injector.get(type, strict);
			groups = [
				...groups,
				GeneralGroup(field, editField, getService),
				...OptionsGroups(field, editField, getService),
				...TableHeaderGroups(field, editField),
				SecurityAttributesGroup(field, editField),
				ConditionGroup(field, editField),
				LayoutGroup(field, editField),
				AppearanceGroup(field, editField),
				SerializationGroup(field, editField),
				ConstraintsGroup(field, editField),
				ValidationGroup(field, editField),
				CustomPropertiesGroup(field, editField)
			].filter((group) => group != null);
			this._filterVisibleEntries(groups, field, getService);
			return groups.filter((group) => {
				return group.items || group.entries && group.entries.length;
			});
		};
	}
};
PropertiesProvider.$inject = ["propertiesPanel", "injector"];
var PropertiesPanelModule = {
	__depends__: [index],
	__init__: ["propertiesPanel", "propertiesProvider"],
	propertiesPanel: ["type", PropertiesPanelRenderer],
	propertiesProvider: ["type", PropertiesProvider]
};
/**
* Manages the rendering of visual plugins.
* @constructor
* @param {Object} eventBus - Event bus for the application.
*/
var RenderInjector = class extends SectionModuleBase {
	constructor(eventBus) {
		super(eventBus, "renderInjector");
		this._eventBus = eventBus;
		this.registeredRenderers = [];
	}
	/**
	* Inject a new renderer into the injector.
	* @param {string} identifier - Identifier for the renderer.
	* @param {Function} Renderer - The renderer function.
	*/
	attachRenderer(identifier, Renderer) {
		this.registeredRenderers = [...this.registeredRenderers, {
			identifier,
			Renderer
		}];
	}
	/**
	* Detach a renderer from the by key injector.
	* @param {string} identifier - Identifier for the renderer.
	*/
	detachRenderer(identifier) {
		this.registeredRenderers = this.registeredRenderers.filter((r) => r.identifier !== identifier);
	}
	/**
	* Returns the registered renderers.
	* @returns {Array} Array of registered renderers.
	*/
	fetchRenderers() {
		return this.registeredRenderers;
	}
};
RenderInjector.$inject = ["eventBus"];
var RenderInjectionModule = {
	__init__: ["renderInjector"],
	renderInjector: ["type", RenderInjector]
};
var _path;
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends.apply(null, arguments);
}
var SvgRepeat = function SvgRepeat(props) {
	return /* @__PURE__ */ _("svg", _extends({
		xmlns: "http://www.w3.org/2000/svg",
		width: 16,
		height: 16,
		fill: "none"
	}, props), _path || (_path = /* @__PURE__ */ _("path", {
		fill: "currentColor",
		d: "M3 3h10.086l-1.793-1.793L12 .5l3 3-3 3-.707-.707L13.086 4H3v3.5H2V4a1 1 0 0 1 1-1M4.707 10.207 2.914 12H13V8.5h1V12a1 1 0 0 1-1 1H2.914l1.793 1.793L4 15.5l-3-3 3-3z"
	})));
};
var EditorRepeatRenderManager = class {
	constructor(formFields, formFieldRegistry) {
		this._formFields = formFields;
		this._formFieldRegistry = formFieldRegistry;
		this.RepeatFooter = this.RepeatFooter.bind(this);
	}
	/**
	* Checks whether a field should be repeatable.
	*
	* @param {string} id - The id of the field to check
	* @returns {boolean} - True if repeatable, false otherwise
	*/
	isFieldRepeating(id) {
		if (!id) return false;
		const formField = this._formFieldRegistry.get(id);
		return this._formFields.get(formField.type).config.repeatable && formField.isRepeating;
	}
	RepeatFooter() {
		return u("div", {
			className: "fjs-repeat-render-footer",
			children: [u(SvgRepeat, {}), u("span", { children: "Repeatable" })]
		});
	}
};
EditorRepeatRenderManager.$inject = ["formFields", "formFieldRegistry"];
var RepeatRenderModule = {
	__init__: ["repeatRenderManager"],
	repeatRenderManager: ["type", EditorRepeatRenderManager]
};
var ids = new Ids([
	32,
	36,
	1
]);
/**
* @typedef { import('./types').Injector } Injector
* @typedef { import('./types').Module } Module
* @typedef { import('./types').Schema } Schema
*
* @typedef { import('./types').FormEditorOptions } FormEditorOptions
* @typedef { import('./types').FormEditorProperties } FormEditorProperties
*
* @typedef { {
*   properties: FormEditorProperties,
*   schema: Schema
* } } State
*
* @typedef { (type:string, priority:number, handler:Function) => void } OnEventWithPriority
* @typedef { (type:string, handler:Function) => void } OnEventWithOutPriority
* @typedef { OnEventWithPriority & OnEventWithOutPriority } OnEventType
*/
/**
* The form editor.
*/
var FormEditor = class {
	/**
	* @constructor
	* @param {FormEditorOptions} options
	*/
	constructor(options = {}) {
		/**
		* @public
		* @type {OnEventType}
		*/
		this.on = this._onEvent;
		/**
		* @public
		* @type {String}
		*/
		this._id = ids.next();
		/**
		* @private
		* @type {Element}
		*/
		this._container = createFormContainer();
		this._container.setAttribute("tabindex", "0");
		const { container, exporter, injector = this._createInjector(options, this._container), properties = {} } = options;
		/**
		* @private
		* @type {any}
		*/
		this.exporter = exporter;
		/**
		* @private
		* @type {State}
		*/
		this._state = {
			properties,
			schema: null
		};
		this.get = injector.get;
		this.invoke = injector.invoke;
		this.get("eventBus").fire("form.init");
		if (container) this.attachTo(container);
	}
	clear() {
		this._emit("diagram.clear");
		this._emit("form.clear");
	}
	destroy() {
		this.get("eventBus").fire("form.destroy");
		this.get("eventBus").fire("diagram.destroy");
		this._detach(false);
	}
	/**
	* @param {Schema} schema
	*
	* @return {Promise<{ warnings: Array<any> }>}
	*/
	importSchema(schema) {
		return new Promise((resolve, reject) => {
			try {
				this.clear();
				const { schema: importedSchema, warnings } = this.get("importer").importSchema(schema);
				this._setState({ schema: importedSchema });
				this._emit("import.done", { warnings });
				return resolve({ warnings });
			} catch (error) {
				this._emit("import.done", {
					error,
					warnings: error.warnings || []
				});
				return reject(error);
			}
		});
	}
	/**
	* @returns {Schema}
	*/
	saveSchema() {
		return this.getSchema();
	}
	/**
	* @returns {Schema}
	*/
	getSchema() {
		const { schema } = this._getState();
		return exportSchema(schema, this.exporter, 19);
	}
	/**
	* @param {Element|string} parentNode
	*/
	attachTo(parentNode) {
		if (!parentNode) throw new Error("parentNode required");
		this.detach();
		if (isString(parentNode)) parentNode = document.querySelector(parentNode);
		const container = this._container;
		parentNode.appendChild(container);
		this._emit("attach");
	}
	detach() {
		this._detach();
	}
	/**
	* @internal
	*
	* @param {boolean} [emit]
	*/
	_detach(emit = true) {
		const container = this._container, parentNode = container.parentNode;
		if (!parentNode) return;
		if (emit) this._emit("detach");
		parentNode.removeChild(container);
	}
	/**
	* @param {any} property
	* @param {any} value
	*/
	setProperty(property, value) {
		const properties = set$1(this._getState().properties, [property], value);
		this._setState({ properties });
	}
	/**
	* @param {string} type
	* @param {Function} handler
	*/
	off(type, handler) {
		this.get("eventBus").off(type, handler);
	}
	/**
	* @internal
	*
	* @param {FormEditorOptions} options
	* @param {Element} container
	*
	* @returns {Injector}
	*/
	_createInjector(options, container) {
		const { modules = this._getModules(), additionalModules = [], renderer = {}, ...config } = options;
		return createInjector([
			{ config: ["value", {
				...config,
				renderer: {
					...renderer,
					container
				}
			}] },
			{ formEditor: ["value", this] },
			CoreModule,
			...modules,
			...additionalModules
		]);
	}
	/**
	* @internal
	*/
	_emit(type, data) {
		this.get("eventBus").fire(type, data);
	}
	/**
	* @internal
	*/
	_getState() {
		return this._state;
	}
	/**
	* @internal
	*/
	_setState(state) {
		this._state = {
			...this._state,
			...state
		};
		this._emit("changed", this._getState());
	}
	/**
	* @internal
	*/
	_getModules() {
		return [
			ModelingModule,
			EditorActionsModule,
			FormEditorKeyboardModule,
			DraggingModule,
			SelectionModule,
			PaletteModule,
			EditorExpressionLanguageModule,
			MarkdownRendererModule,
			PropertiesPanelModule,
			RenderInjectionModule,
			RepeatRenderModule
		];
	}
	/**
	* @internal
	*/
	_onEvent(type, priority, handler) {
		this.get("eventBus").on(type, priority, handler);
	}
};
function exportSchema(schema, exporter, schemaVersion) {
	const exportDetails = exporter ? { exporter } : {};
	return {
		...clone(schema, (name, value) => {
			if (["_parent", "_path"].includes(name)) return;
			return value;
		}),
		...exportDetails,
		schemaVersion
	};
}
/**
* @typedef { import('./types').CreateFormEditorOptions } CreateFormEditorOptions
*/
/**
* Create a form editor.
*
* @param {CreateFormEditorOptions} options
*
* @return {Promise<FormEditor>}
*/
function createFormEditor(options) {
	const { schema, ...rest } = options;
	const formEditor = new FormEditor(rest);
	return formEditor.importSchema(schema).then(() => {
		return formEditor;
	});
}
//#endregion
export { useService as a, usePrevious$1 as i, createFormEditor as n, useService$1 as o, useDebounce$1 as r, useVariables as s, FormEditor as t };

//# sourceMappingURL=index.es-B-weAqi4.js.map