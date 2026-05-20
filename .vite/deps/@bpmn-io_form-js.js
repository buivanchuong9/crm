import { o as __toESM, t as __commonJSMin } from "./chunk-CqwQKh_b.js";
import { $ as RepeatRenderModule, $n as Facet, A as FormFields, An as Decoration, At as getSchemaVariables, B as MINUTES_IN_DAY, Bn as keymap, Bt as runUnaryTestEvaluation, C as FieldFactory, Cn as foldInside, Ct as createInjector, D as FormContext, Dn as indentOnInput, Dt as generateIndexForType, E as FormComponent, En as indentNodeProp, Et as generateIdForType, F as IFrame, Fn as dropCursor, Ft as pathParse, G as OPTIONS_SOURCES_DEFAULTS, Gn as showDialog, Gt as sanitizeMultiSelectValue, H as MarkdownRendererModule, Hn as placeholder, Ht as sanitizeHTML, I as Image, In as getPanel, It as pathsEqual, J as OPTIONS_SOURCE_DEFAULT, Jn as crelt, Jt as useExpressionEvaluation, K as OPTIONS_SOURCES_LABELS, Kn as showPanel, Kt as sanitizeSingleSelectValue, L as Importer, Ln as highlightActiveLine, Lt as pruneAt, M as FormRenderContext, Mn as ViewPlugin, Mt as hasEqualValue, N as Group, Nn as crosshairCursor, Nt as iconsByType, O as FormField, On as syntaxHighlighting, Ot as getAncestryList, P as Html, Pn as drawSelection, Pt as isRequired, Q as RepeatRenderManager, Qn as EditorState, Qt as wrapObjectKeysWithUnderscores, R as Label, Rn as highlightActiveLineGutter, Rt as runExpressionEvaluation, S as FeelersTemplating, Sn as foldGutter, St as createFormContainer, T as Form, Tn as foldNodeProp, Tt as formFields, U as Numberfield, Un as rectangularSelection, Ut as sanitizeIFrameSource, V as MarkdownRenderer, Vn as lineNumbers, Vt as sanitizeDateTimePickerValue, W as OPTIONS_SOURCES, Wn as runScopeHandlers, Wt as sanitizeImageSource, X as Radio, Xn as Compartment, Xt as useTemplateEvaluation, Y as PathRegistry, Yn as CharCategory, Yt as useSingleLineTemplateEvaluation, Z as RenderModule, Zn as EditorSelection, Zt as wrapCSSStyles, _ as ExpressionField, _n as LanguageSupport, _t as ViewerCommands, a as ConditionChecker, an as defaultKeymap, ar as codePointSize, at as TEXT_VIEW_DEFAULT_TEXT, b as ExpressionLoopPreventer, bn as defaultHighlightStyle, bt as clone, c as DATETIME_SUBTYPE_PATH, cn as indentWithTab, cr as fromCodePoint, ct as TIME_SERIALISINGFORMAT_LABELS, d as Datetime, dn as closeBracketsKeymap, dr as styleTags, dt as TIME_USE24H_PATH, er as Prec, et as SANDBOX_ATTRIBUTE, f as Default, fr as tags, ft as Table, g as Errors, gn as LRLanguage, gr as o, gt as Textfield, h as DynamicList, ht as Textarea, i as Checklist, ir as codePointAt, it as Spacer, j as FormLayouter, jn as EditorView, jt as getScrollContainer, k as FormFieldRegistry, kn as syntaxTree, kt as getOptionsSource, l as DATE_DISALLOW_PAST_PATH, ln as autocompletion, lt as TIME_SERIALISING_FORMATS, m as DocumentPreview, mt as Text, n as Button, nn as lintKeymap, nr as StateEffect, nt as Select, o as DATETIME_SUBTYPES, on as history, or as combineConfig, ot as TIME_INTERVAL_PATH, p as Description, pn as completionKeymap, pr as LRParser, pt as Taglist, q as OPTIONS_SOURCES_PATHS, qt as schemaVersion, r as Checkbox, rn as linter, rr as StateField, rt as Separator, s as DATETIME_SUBTYPES_LABELS, sn as historyKeymap, sr as findClusterBreak, st as TIME_LABEL_PATH, t as ALLOW_ATTRIBUTE, tn as lintGutter, tr as RangeSetBuilder, tt as SECURITY_ATTRIBUTES_DEFINITIONS, u as DATE_LABEL_PATH, un as closeBrackets, ut as TIME_SERIALISING_FORMAT_PATH, v as ExpressionFieldModule, vn as bracketMatching, vt as ViewerCommandsModule, w as FilePicker, wn as foldKeymap, wt as escapeHTML, x as FeelExpressionLanguage, xt as createForm, y as ExpressionLanguageModule, yn as continuedIndent, yt as buildExpressionContext, z as LocalExpressionContext, zn as highlightSpecialChars, zt as runRecursively } from "./index.es-CMvMby7r.js";
import { isFunction } from "./min-dash.js";
import { t as require_classnames } from "./classnames.js";
import { render as D } from "./preact.js";
import { useCallback as T, useEffect as p, useRef as _, useState as h } from "./preact_hooks.js";
import { a as useService, c as mitt_default, i as usePrevious$1, l as classes, n as createFormEditor, o as useService$1, r as useDebounce$1, s as useVariables, t as FormEditor, u as domify } from "./index.es-DHRx7E7T.js";
//#region node_modules/file-drops/dist/index.js
var OVERLAY_HTML = "<div class=\"drop-overlay\"><div class=\"box\"><div class=\"label\">{label}</div></div></div>";
/**
* @typedef { {
*   name: string,
*   path: string | undefined,
*   contents: string
* } } File
*/
/**
* Add file drop functionality to the given element,
* calling fn(files...) on drop.
*
* @example
*
* var node = document.querySelector('#container');
*
* var dragOverHandler = fileDrop(handleFiles);
*
* node.addEventListener('dragover', dragOverHandler);
*
* @param { string } [label='Drop files here']
* @param { (files: File[], dropEvent: DragEvent) => void } fn
*
* @return { (event: DragEvent) => any } drag over handler
*/
function fileDrop(label, fn) {
	if (typeof label === "function") {
		fn = label;
		label = "Drop files here";
	}
	var self;
	var extraArgs;
	var overlay;
	/**
	* @param { DragEvent } event
	*/
	function onDrop(event) {
		event.preventDefault();
		asyncMap(event.dataTransfer.files, readFile, function(err, files) {
			if (err) console.warn("file drop failed", err);
			else {
				var args = extraArgs.concat([files, event]);
				fn.apply(self, args);
			}
		});
	}
	function isDragAllowed(dataTransfer) {
		return dataTransfer && dataTransfer.types && dataTransfer.types.includes("Files");
	}
	/**
	* Drag over event to be registered by clients in respective contexts
	*
	* @param { DragEvent } _event
	*/
	function onDragover(_event) {
		var args = slice(arguments);
		/**
		* @type {DragEvent}
		*/
		var event = args.pop();
		var dataTransfer = event.dataTransfer, target = event.currentTarget || event.target;
		if (!isDragAllowed(dataTransfer)) return;
		event.preventDefault();
		dataTransfer.dropEffect = "copy";
		if (overlay) return;
		overlay = createOverlay(label);
		target.appendChild(overlay);
		self = this;
		extraArgs = args;
		if (!target) return;
		function onLeave(event) {
			var relatedTarget = event.relatedTarget;
			if (target.contains(relatedTarget)) return;
			onEnd();
		}
		function onEnd(event) {
			document.removeEventListener("drop", onDrop);
			document.removeEventListener("drop", onEnd);
			document.removeEventListener("dragleave", onLeave);
			document.removeEventListener("dragend", onEnd);
			document.removeEventListener("dragover", preventDrop);
			if (overlay) {
				target.removeChild(overlay);
				overlay = null;
			}
		}
		document.addEventListener("drop", onDrop);
		document.addEventListener("drop", onEnd);
		document.addEventListener("dragleave", onLeave);
		document.addEventListener("dragend", onEnd);
		document.addEventListener("dragover", preventDrop);
	}
	onDragover.onDrop = onDrop;
	return onDragover;
}
function readFile(dropFile, done) {
	if (!window.FileReader) return done();
	var reader = new FileReader();
	reader.onload = function(e) {
		done(null, {
			name: dropFile.name,
			path: dropFile.path,
			contents: e.target.result
		});
	};
	reader.onerror = function(event) {
		done(event.target.error);
	};
	reader.readAsText(dropFile);
}
function asyncMap(elements, iterator, done) {
	var idx = 0, results = [];
	function next() {
		if (idx === elements.length) done(null, results);
		else iterator(elements[idx], function(err, result) {
			if (err) return done(err);
			else {
				results[idx] = result;
				idx++;
				next();
			}
		});
	}
	next();
}
function slice(arr) {
	return Array.prototype.slice.call(arr);
}
function createOverlay(label) {
	const overlay = domify(OVERLAY_HTML.replace("{label}", label));
	overlay.style.pointerEvents = "none";
	return overlay;
}
function preventDrop(event) {
	event.preventDefault();
}
//#endregion
//#region node_modules/downloadjs/download.js
var require_download = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory) {
		if (typeof define === "function" && define.amd) define([], factory);
		else if (typeof exports === "object") module.exports = factory();
		else root.download = factory();
	})(exports, function() {
		return function download(data, strFileName, strMimeType) {
			var self = window, defaultMime = "application/octet-stream", mimeType = strMimeType || defaultMime, payload = data, url = !strFileName && !strMimeType && payload, anchor = document.createElement("a"), toString = function(a) {
				return String(a);
			}, myBlob = self.Blob || self.MozBlob || self.WebKitBlob || toString, fileName = strFileName || "download", blob, reader;
			myBlob = myBlob.call ? myBlob.bind(self) : Blob;
			if (String(this) === "true") {
				payload = [payload, mimeType];
				mimeType = payload[0];
				payload = payload[1];
			}
			if (url && url.length < 2048) {
				fileName = url.split("/").pop().split("?")[0];
				anchor.href = url;
				if (anchor.href.indexOf(url) !== -1) {
					var ajax = new XMLHttpRequest();
					ajax.open("GET", url, true);
					ajax.responseType = "blob";
					ajax.onload = function(e) {
						download(e.target.response, fileName, defaultMime);
					};
					setTimeout(function() {
						ajax.send();
					}, 0);
					return ajax;
				}
			}
			if (/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(payload)) if (payload.length > 1024 * 1024 * 1.999 && myBlob !== toString) {
				payload = dataUrlToBlob(payload);
				mimeType = payload.type || defaultMime;
			} else return navigator.msSaveBlob ? navigator.msSaveBlob(dataUrlToBlob(payload), fileName) : saver(payload);
			else if (/([\x80-\xff])/.test(payload)) {
				var i = 0, tempUiArr = new Uint8Array(payload.length), mx = tempUiArr.length;
				for (; i < mx; ++i) tempUiArr[i] = payload.charCodeAt(i);
				payload = new myBlob([tempUiArr], { type: mimeType });
			}
			blob = payload instanceof myBlob ? payload : new myBlob([payload], { type: mimeType });
			function dataUrlToBlob(strUrl) {
				var parts = strUrl.split(/[:;,]/), type = parts[1], binData = (parts[2] == "base64" ? atob : decodeURIComponent)(parts.pop()), mx = binData.length, i = 0, uiArr = new Uint8Array(mx);
				for (; i < mx; ++i) uiArr[i] = binData.charCodeAt(i);
				return new myBlob([uiArr], { type });
			}
			function saver(url, winMode) {
				if ("download" in anchor) {
					anchor.href = url;
					anchor.setAttribute("download", fileName);
					anchor.className = "download-js-link";
					anchor.innerHTML = "downloading...";
					anchor.style.display = "none";
					document.body.appendChild(anchor);
					setTimeout(function() {
						anchor.click();
						document.body.removeChild(anchor);
						if (winMode === true) setTimeout(function() {
							self.URL.revokeObjectURL(anchor.href);
						}, 250);
					}, 66);
					return true;
				}
				if (/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
					if (/^data:/.test(url)) url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
					if (!window.open(url)) {
						if (confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")) location.href = url;
					}
					return true;
				}
				var f = document.createElement("iframe");
				document.body.appendChild(f);
				if (!winMode && /^data:/.test(url)) url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
				f.src = url;
				setTimeout(function() {
					document.body.removeChild(f);
				}, 333);
			}
			if (navigator.msSaveBlob) return navigator.msSaveBlob(blob, fileName);
			if (self.URL) saver(self.URL.createObjectURL(blob), true);
			else {
				if (typeof blob === "string" || blob.constructor === toString) try {
					return saver("data:" + mimeType + ";base64," + self.btoa(blob));
				} catch (y) {
					return saver("data:" + mimeType + "," + encodeURIComponent(blob));
				}
				reader = new FileReader();
				reader.onload = function(e) {
					saver(this.result);
				};
				reader.readAsDataURL(blob);
			}
			return true;
		};
	});
}));
//#endregion
//#region node_modules/@codemirror/search/dist/index.js
var import_classnames = /* @__PURE__ */ __toESM(require_classnames());
var import_download = /* @__PURE__ */ __toESM(require_download());
var basicNormalize = typeof String.prototype.normalize == "function" ? (x) => x.normalize("NFKD") : (x) => x;
/**
A search cursor provides an iterator over text matches in a
document.
*/
var SearchCursor = class {
	/**
	Create a text cursor. The query is the search string, `from` to
	`to` provides the region to search.
	
	When `normalize` is given, it will be called, on both the query
	string and the content it is matched against, before comparing.
	You can, for example, create a case-insensitive search by
	passing `s => s.toLowerCase()`.
	
	Text is always normalized with
	[`.normalize("NFKD")`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
	(when supported).
	*/
	constructor(text, query, from = 0, to = text.length, normalize, test) {
		this.test = test;
		/**
		The current match (only holds a meaningful value after
		[`next`](https://codemirror.net/6/docs/ref/#search.SearchCursor.next) has been called and when
		`done` is false).
		
		The `precise` flag will be set to false if the match starts or
		ends _inside_ a character that, when normalized, expands to
		multiple characters. It indicates that the `from`-`to` range
		covers content that isn't part of the actual match.
		*/
		this.value = {
			from: 0,
			to: 0,
			precise: false
		};
		/**
		Whether the end of the iterated region has been reached.
		*/
		this.done = false;
		this.matches = [];
		this.buffer = "";
		this.bufferPos = 0;
		this.iter = text.iterRange(from, to);
		this.bufferStart = from;
		this.normalize = normalize ? (x) => normalize(basicNormalize(x)) : basicNormalize;
		this.query = this.normalize(query);
	}
	peek() {
		if (this.bufferPos == this.buffer.length) {
			this.bufferStart += this.buffer.length;
			this.iter.next();
			if (this.iter.done) return -1;
			this.bufferPos = 0;
			this.buffer = this.iter.value;
		}
		return codePointAt(this.buffer, this.bufferPos);
	}
	/**
	Look for the next match. Updates the iterator's
	[`value`](https://codemirror.net/6/docs/ref/#search.SearchCursor.value) and
	[`done`](https://codemirror.net/6/docs/ref/#search.SearchCursor.done) properties. Should be called
	at least once before using the cursor.
	*/
	next() {
		while (this.matches.length) this.matches.pop();
		return this.nextOverlapping();
	}
	/**
	The `next` method will ignore matches that partially overlap a
	previous match. This method behaves like `next`, but includes
	such matches.
	*/
	nextOverlapping() {
		for (;;) {
			let next = this.peek();
			if (next < 0) {
				this.done = true;
				return this;
			}
			let str = fromCodePoint(next), start = this.bufferStart + this.bufferPos;
			this.bufferPos += codePointSize(next);
			let norm = this.normalize(str);
			if (norm.length) for (let i = 0, pos = start, posPrecise = true;; i++) {
				let code = norm.charCodeAt(i);
				let match = this.match(code, pos, posPrecise, this.bufferPos + this.bufferStart, i == norm.length - 1);
				if (match) {
					this.value = match;
					return this;
				}
				if (i == norm.length - 1) break;
				if (posPrecise && i < str.length && str.charCodeAt(i) == code) pos++;
				else posPrecise = false;
			}
		}
	}
	match(code, pos, posPrecise, end, endPrecise) {
		let match = null;
		for (let i = 0; i < this.matches.length;) {
			let partial = this.matches[i], keep = false;
			if (this.query.charCodeAt(partial.index) == code) if (partial.index == this.query.length - 1) match = {
				from: partial.from,
				to: end,
				precise: endPrecise && partial.precise
			};
			else {
				partial.index++;
				keep = true;
			}
			if (keep) i++;
			else this.matches.splice(i, 1);
		}
		if (this.query.charCodeAt(0) == code) if (this.query.length == 1) match = {
			from: pos,
			to: end,
			precise: posPrecise && endPrecise
		};
		else this.matches.push({
			from: pos,
			index: 1,
			precise: posPrecise
		});
		if (match && this.test && !this.test(match.from, match.to, this.buffer, this.bufferStart)) match = null;
		return match;
	}
};
if (typeof Symbol != "undefined") SearchCursor.prototype[Symbol.iterator] = function() {
	return this;
};
var empty = {
	from: -1,
	to: -1,
	match: /* @__PURE__ */ /.*/.exec(""),
	precise: true
};
var baseFlags = "gm" + (/x/.unicode == null ? "" : "u");
/**
This class is similar to [`SearchCursor`](https://codemirror.net/6/docs/ref/#search.SearchCursor)
but searches for a regular expression pattern instead of a plain
string.
*/
var RegExpCursor = class {
	/**
	Create a cursor that will search the given range in the given
	document. `query` should be the raw pattern (as you'd pass it to
	`new RegExp`).
	*/
	constructor(text, query, options, from = 0, to = text.length) {
		this.text = text;
		this.to = to;
		this.curLine = "";
		/**
		Set to `true` when the cursor has reached the end of the search
		range.
		*/
		this.done = false;
		/**
		Will contain an object with the extent of the match and the
		match object when [`next`](https://codemirror.net/6/docs/ref/#search.RegExpCursor.next)
		sucessfully finds a match. The `precise` flag is always true for
		this type of cursor, and only there to make sure this cursor is
		a subtype of `SearchCursor`.
		*/
		this.value = empty;
		if (/\\[sWDnr]|\n|\r|\[\^/.test(query)) return new MultilineRegExpCursor(text, query, options, from, to);
		this.re = new RegExp(query, baseFlags + ((options === null || options === void 0 ? void 0 : options.ignoreCase) ? "i" : ""));
		this.test = options === null || options === void 0 ? void 0 : options.test;
		this.iter = text.iter();
		let startLine = text.lineAt(from);
		this.curLineStart = startLine.from;
		this.matchPos = toCharEnd(text, from);
		this.getLine(this.curLineStart);
	}
	getLine(skip) {
		this.iter.next(skip);
		if (this.iter.lineBreak) this.curLine = "";
		else {
			this.curLine = this.iter.value;
			if (this.curLineStart + this.curLine.length > this.to) this.curLine = this.curLine.slice(0, this.to - this.curLineStart);
			this.iter.next();
		}
	}
	nextLine() {
		this.curLineStart = this.curLineStart + this.curLine.length + 1;
		if (this.curLineStart > this.to) this.curLine = "";
		else this.getLine(0);
	}
	/**
	Move to the next match, if there is one.
	*/
	next() {
		for (let off = this.matchPos - this.curLineStart;;) {
			this.re.lastIndex = off;
			let match = this.matchPos <= this.to && this.re.exec(this.curLine);
			if (match) {
				let from = this.curLineStart + match.index, to = from + match[0].length;
				this.matchPos = toCharEnd(this.text, to + (from == to ? 1 : 0));
				if (from == this.curLineStart + this.curLine.length) this.nextLine();
				if ((from < to || from > this.value.to) && (!this.test || this.test(from, to, match))) {
					this.value = {
						from,
						to,
						precise: true,
						match
					};
					return this;
				}
				off = this.matchPos - this.curLineStart;
			} else if (this.curLineStart + this.curLine.length < this.to) {
				this.nextLine();
				off = 0;
			} else {
				this.done = true;
				return this;
			}
		}
	}
};
var flattened = /* @__PURE__ */ new WeakMap();
var FlattenedDoc = class FlattenedDoc {
	constructor(from, text) {
		this.from = from;
		this.text = text;
	}
	get to() {
		return this.from + this.text.length;
	}
	static get(doc, from, to) {
		let cached = flattened.get(doc);
		if (!cached || cached.from >= to || cached.to <= from) {
			let flat = new FlattenedDoc(from, doc.sliceString(from, to));
			flattened.set(doc, flat);
			return flat;
		}
		if (cached.from == from && cached.to == to) return cached;
		let { text, from: cachedFrom } = cached;
		if (cachedFrom > from) {
			text = doc.sliceString(from, cachedFrom) + text;
			cachedFrom = from;
		}
		if (cached.to < to) text += doc.sliceString(cached.to, to);
		flattened.set(doc, new FlattenedDoc(cachedFrom, text));
		return new FlattenedDoc(from, text.slice(from - cachedFrom, to - cachedFrom));
	}
};
var MultilineRegExpCursor = class {
	constructor(text, query, options, from, to) {
		this.text = text;
		this.to = to;
		this.done = false;
		this.value = empty;
		this.matchPos = toCharEnd(text, from);
		this.re = new RegExp(query, baseFlags + ((options === null || options === void 0 ? void 0 : options.ignoreCase) ? "i" : ""));
		this.test = options === null || options === void 0 ? void 0 : options.test;
		this.flat = FlattenedDoc.get(text, from, this.chunkEnd(from + 5e3));
	}
	chunkEnd(pos) {
		return pos >= this.to ? this.to : this.text.lineAt(pos).to;
	}
	next() {
		for (;;) {
			let off = this.re.lastIndex = this.matchPos - this.flat.from;
			let match = this.re.exec(this.flat.text);
			if (match && !match[0] && match.index == off) {
				this.re.lastIndex = off + 1;
				match = this.re.exec(this.flat.text);
			}
			if (match) {
				let from = this.flat.from + match.index, to = from + match[0].length;
				if ((this.flat.to >= this.to || match.index + match[0].length <= this.flat.text.length - 10) && (!this.test || this.test(from, to, match))) {
					this.value = {
						from,
						to,
						precise: true,
						match
					};
					this.matchPos = toCharEnd(this.text, to + (from == to ? 1 : 0));
					return this;
				}
			}
			if (this.flat.to == this.to) {
				this.done = true;
				return this;
			}
			this.flat = FlattenedDoc.get(this.text, this.flat.from, this.chunkEnd(this.flat.from + this.flat.text.length * 2));
		}
	}
};
if (typeof Symbol != "undefined") RegExpCursor.prototype[Symbol.iterator] = MultilineRegExpCursor.prototype[Symbol.iterator] = function() {
	return this;
};
function validRegExp(source) {
	try {
		new RegExp(source, baseFlags);
		return true;
	} catch (_a) {
		return false;
	}
}
function toCharEnd(text, pos) {
	if (pos >= text.length) return pos;
	let line = text.lineAt(pos), next;
	while (pos < line.to && (next = line.text.charCodeAt(pos - line.from)) >= 56320 && next < 57344) pos++;
	return pos;
}
/**
Command that shows a dialog asking the user for a line number, and
when a valid position is provided, moves the cursor to that line.

Supports line numbers, relative line offsets prefixed with `+` or
`-`, document percentages suffixed with `%`, and an optional
column position by adding `:` and a second number after the line
number.
*/
var gotoLine = (view) => {
	let { state } = view;
	let line = String(state.doc.lineAt(view.state.selection.main.head).number);
	let { close, result } = showDialog(view, {
		label: state.phrase("Go to line"),
		input: {
			type: "text",
			name: "line",
			value: line
		},
		focus: true,
		submitLabel: state.phrase("go")
	});
	result.then((form) => {
		let match = form && /^([+-])?(\d+)?(:\d+)?(%)?$/.exec(form.elements["line"].value);
		if (!match) {
			view.dispatch({ effects: close });
			return;
		}
		let startLine = state.doc.lineAt(state.selection.main.head);
		let [, sign, ln, cl, percent] = match;
		let col = cl ? +cl.slice(1) : 0;
		let line = ln ? +ln : startLine.number;
		if (ln && percent) {
			let pc = line / 100;
			if (sign) pc = pc * (sign == "-" ? -1 : 1) + startLine.number / state.doc.lines;
			line = Math.round(state.doc.lines * pc);
		} else if (ln && sign) line = line * (sign == "-" ? -1 : 1) + startLine.number;
		let docLine = state.doc.line(Math.max(1, Math.min(state.doc.lines, line)));
		let selection = EditorSelection.cursor(docLine.from + Math.max(0, Math.min(col, docLine.length)));
		view.dispatch({
			effects: [close, EditorView.scrollIntoView(selection.from, { y: "center" })],
			selection
		});
	});
	return true;
};
var defaultHighlightOptions = {
	highlightWordAroundCursor: false,
	minSelectionLength: 1,
	maxMatches: 100,
	wholeWords: false
};
var highlightConfig = /* @__PURE__ */ Facet.define({ combine(options) {
	return combineConfig(options, defaultHighlightOptions, {
		highlightWordAroundCursor: (a, b) => a || b,
		minSelectionLength: Math.min,
		maxMatches: Math.min
	});
} });
/**
This extension highlights text that matches the selection. It uses
the `"cm-selectionMatch"` class for the highlighting. When
`highlightWordAroundCursor` is enabled, the word at the cursor
itself will be highlighted with `"cm-selectionMatch-main"`.
*/
function highlightSelectionMatches(options) {
	let ext = [defaultTheme, matchHighlighter];
	if (options) ext.push(highlightConfig.of(options));
	return ext;
}
var matchDeco = /* @__PURE__ */ Decoration.mark({ class: "cm-selectionMatch" });
var mainMatchDeco = /* @__PURE__ */ Decoration.mark({ class: "cm-selectionMatch cm-selectionMatch-main" });
function insideWordBoundaries(check, state, from, to) {
	return (from == 0 || check(state.sliceDoc(from - 1, from)) != CharCategory.Word) && (to == state.doc.length || check(state.sliceDoc(to, to + 1)) != CharCategory.Word);
}
function insideWord(check, state, from, to) {
	return check(state.sliceDoc(from, from + 1)) == CharCategory.Word && check(state.sliceDoc(to - 1, to)) == CharCategory.Word;
}
var matchHighlighter = /* @__PURE__ */ ViewPlugin.fromClass(class {
	constructor(view) {
		this.decorations = this.getDeco(view);
	}
	update(update) {
		if (update.selectionSet || update.docChanged || update.viewportChanged) this.decorations = this.getDeco(update.view);
	}
	getDeco(view) {
		let conf = view.state.facet(highlightConfig);
		let { state } = view, sel = state.selection;
		if (sel.ranges.length > 1) return Decoration.none;
		let range = sel.main, query, check = null;
		if (range.empty) {
			if (!conf.highlightWordAroundCursor) return Decoration.none;
			let word = state.wordAt(range.head);
			if (!word) return Decoration.none;
			check = state.charCategorizer(range.head);
			query = state.sliceDoc(word.from, word.to);
		} else {
			let len = range.to - range.from;
			if (len < conf.minSelectionLength || len > 200) return Decoration.none;
			if (conf.wholeWords) {
				query = state.sliceDoc(range.from, range.to);
				check = state.charCategorizer(range.head);
				if (!(insideWordBoundaries(check, state, range.from, range.to) && insideWord(check, state, range.from, range.to))) return Decoration.none;
			} else {
				query = state.sliceDoc(range.from, range.to);
				if (!query) return Decoration.none;
			}
		}
		let deco = [];
		for (let part of view.visibleRanges) {
			let cursor = new SearchCursor(state.doc, query, part.from, part.to);
			while (!cursor.next().done) {
				let { from, to } = cursor.value;
				if (!check || insideWordBoundaries(check, state, from, to)) {
					if (range.empty && from <= range.from && to >= range.to) deco.push(mainMatchDeco.range(from, to));
					else if (from >= range.to || to <= range.from) deco.push(matchDeco.range(from, to));
					if (deco.length > conf.maxMatches) return Decoration.none;
				}
			}
		}
		return Decoration.set(deco);
	}
}, { decorations: (v) => v.decorations });
var defaultTheme = /* @__PURE__ */ EditorView.baseTheme({
	".cm-selectionMatch": { backgroundColor: "#99ff7780" },
	".cm-searchMatch .cm-selectionMatch": { backgroundColor: "transparent" }
});
var selectWord = ({ state, dispatch }) => {
	let { selection } = state;
	let newSel = EditorSelection.create(selection.ranges.map((range) => state.wordAt(range.head) || EditorSelection.cursor(range.head)), selection.mainIndex);
	if (newSel.eq(selection)) return false;
	dispatch(state.update({ selection: newSel }));
	return true;
};
function findNextOccurrence(state, query) {
	let { main, ranges } = state.selection;
	let word = state.wordAt(main.head), fullWord = word && word.from == main.from && word.to == main.to;
	for (let cycled = false, cursor = new SearchCursor(state.doc, query, ranges[ranges.length - 1].to);;) {
		cursor.next();
		if (cursor.done) {
			if (cycled) return null;
			cursor = new SearchCursor(state.doc, query, 0, Math.max(0, ranges[ranges.length - 1].from - 1));
			cycled = true;
		} else {
			if (cycled && ranges.some((r) => r.from == cursor.value.from)) continue;
			if (fullWord) {
				let word = state.wordAt(cursor.value.from);
				if (!word || word.from != cursor.value.from || word.to != cursor.value.to) continue;
			}
			return cursor.value;
		}
	}
}
/**
Select next occurrence of the current selection. Expand selection
to the surrounding word when the selection is empty.
*/
var selectNextOccurrence = ({ state, dispatch }) => {
	let { ranges } = state.selection;
	if (ranges.some((sel) => sel.from === sel.to)) return selectWord({
		state,
		dispatch
	});
	let searchedText = state.sliceDoc(ranges[0].from, ranges[0].to);
	if (state.selection.ranges.some((r) => state.sliceDoc(r.from, r.to) != searchedText)) return false;
	let range = findNextOccurrence(state, searchedText);
	if (!range) return false;
	dispatch(state.update({
		selection: state.selection.addRange(EditorSelection.range(range.from, range.to), false),
		effects: EditorView.scrollIntoView(range.to)
	}));
	return true;
};
var searchConfigFacet = /* @__PURE__ */ Facet.define({ combine(configs) {
	return combineConfig(configs, {
		top: false,
		caseSensitive: false,
		literal: false,
		regexp: false,
		wholeWord: false,
		createPanel: (view) => new SearchPanel(view),
		scrollToMatch: (range) => EditorView.scrollIntoView(range)
	});
} });
/**
A search query. Part of the editor's search state.
*/
var SearchQuery = class {
	/**
	Create a query object.
	*/
	constructor(config) {
		this.search = config.search;
		this.caseSensitive = !!config.caseSensitive;
		this.literal = !!config.literal;
		this.regexp = !!config.regexp;
		this.replace = config.replace || "";
		this.valid = !!this.search && (!this.regexp || validRegExp(this.search));
		this.unquoted = this.unquote(this.search);
		this.wholeWord = !!config.wholeWord;
		this.test = config.test;
	}
	/**
	@internal
	*/
	unquote(text) {
		return this.literal ? text : text.replace(/\\([nrt\\])/g, (_, ch) => ch == "n" ? "\n" : ch == "r" ? "\r" : ch == "t" ? "	" : "\\");
	}
	/**
	Compare this query to another query.
	*/
	eq(other) {
		return this.search == other.search && this.replace == other.replace && this.caseSensitive == other.caseSensitive && this.regexp == other.regexp && this.wholeWord == other.wholeWord && this.test == other.test;
	}
	/**
	@internal
	*/
	create() {
		return this.regexp ? new RegExpQuery(this) : new StringQuery(this);
	}
	/**
	Get a search cursor for this query, searching through the given
	range in the given state.
	*/
	getCursor(state, from = 0, to) {
		let st = state.doc ? state : EditorState.create({ doc: state });
		if (to == null) to = st.doc.length;
		return this.regexp ? regexpCursor(this, st, from, to) : stringCursor(this, st, from, to);
	}
};
var QueryType = class {
	constructor(spec) {
		this.spec = spec;
	}
};
function wrapStringTest(test, state, inner) {
	return (from, to, buffer, bufferPos) => {
		if (inner && !inner(from, to, buffer, bufferPos)) return false;
		return test(from >= bufferPos && to <= bufferPos + buffer.length ? buffer.slice(from - bufferPos, to - bufferPos) : state.doc.sliceString(from, to), state, from, to);
	};
}
function stringCursor(spec, state, from, to) {
	let test;
	if (spec.wholeWord) test = stringWordTest(state.doc, state.charCategorizer(state.selection.main.head));
	if (spec.test) test = wrapStringTest(spec.test, state, test);
	return new SearchCursor(state.doc, spec.unquoted, from, to, spec.caseSensitive ? void 0 : (x) => x.toLowerCase(), test);
}
function stringWordTest(doc, categorizer) {
	return (from, to, buf, bufPos) => {
		if (bufPos > from || bufPos + buf.length < to) {
			bufPos = Math.max(0, from - 2);
			buf = doc.sliceString(bufPos, Math.min(doc.length, to + 2));
		}
		return (categorizer(charBefore(buf, from - bufPos)) != CharCategory.Word || categorizer(charAfter(buf, from - bufPos)) != CharCategory.Word) && (categorizer(charAfter(buf, to - bufPos)) != CharCategory.Word || categorizer(charBefore(buf, to - bufPos)) != CharCategory.Word);
	};
}
var StringQuery = class extends QueryType {
	constructor(spec) {
		super(spec);
	}
	nextMatch(state, curFrom, curTo) {
		let cursor = stringCursor(this.spec, state, curTo, state.doc.length).nextOverlapping();
		if (cursor.done) {
			let end = Math.min(state.doc.length, curFrom + this.spec.unquoted.length);
			cursor = stringCursor(this.spec, state, 0, end).nextOverlapping();
		}
		return cursor.done || cursor.value.from == curFrom && cursor.value.to == curTo ? null : cursor.value;
	}
	prevMatchInRange(state, from, to) {
		for (let pos = to;;) {
			let start = Math.max(from, pos - 1e4 - this.spec.unquoted.length);
			let cursor = stringCursor(this.spec, state, start, pos), range = null;
			while (!cursor.nextOverlapping().done) range = cursor.value;
			if (range) return range;
			if (start == from) return null;
			pos -= 1e4;
		}
	}
	prevMatch(state, curFrom, curTo) {
		let found = this.prevMatchInRange(state, 0, curFrom);
		if (!found) found = this.prevMatchInRange(state, Math.max(0, curTo - this.spec.unquoted.length), state.doc.length);
		return found && (found.from != curFrom || found.to != curTo) ? found : null;
	}
	getReplacement(_result) {
		return this.spec.unquote(this.spec.replace);
	}
	matchAll(state, limit) {
		let cursor = stringCursor(this.spec, state, 0, state.doc.length), ranges = [];
		while (!cursor.next().done) {
			if (ranges.length >= limit) return null;
			ranges.push(cursor.value);
		}
		return ranges;
	}
	highlight(state, from, to, add) {
		let cursor = stringCursor(this.spec, state, Math.max(0, from - this.spec.unquoted.length), Math.min(to + this.spec.unquoted.length, state.doc.length));
		while (!cursor.next().done) add(cursor.value.from, cursor.value.to);
	}
};
function wrapRegexpTest(test, state, inner) {
	return (from, to, match) => {
		return (!inner || inner(from, to, match)) && test(match[0], state, from, to);
	};
}
function regexpCursor(spec, state, from, to) {
	let test;
	if (spec.wholeWord) test = regexpWordTest(state.charCategorizer(state.selection.main.head));
	if (spec.test) test = wrapRegexpTest(spec.test, state, test);
	return new RegExpCursor(state.doc, spec.search, {
		ignoreCase: !spec.caseSensitive,
		test
	}, from, to);
}
function charBefore(str, index) {
	return str.slice(findClusterBreak(str, index, false), index);
}
function charAfter(str, index) {
	return str.slice(index, findClusterBreak(str, index));
}
function regexpWordTest(categorizer) {
	return (_from, _to, match) => !match[0].length || (categorizer(charBefore(match.input, match.index)) != CharCategory.Word || categorizer(charAfter(match.input, match.index)) != CharCategory.Word) && (categorizer(charAfter(match.input, match.index + match[0].length)) != CharCategory.Word || categorizer(charBefore(match.input, match.index + match[0].length)) != CharCategory.Word);
}
var RegExpQuery = class extends QueryType {
	nextMatch(state, curFrom, curTo) {
		let cursor = regexpCursor(this.spec, state, curTo, state.doc.length).next();
		if (cursor.done) cursor = regexpCursor(this.spec, state, 0, curFrom).next();
		return cursor.done ? null : cursor.value;
	}
	prevMatchInRange(state, from, to) {
		for (let size = 1;; size++) {
			let start = Math.max(from, to - size * 1e4);
			let cursor = regexpCursor(this.spec, state, start, to), range = null;
			while (!cursor.next().done) range = cursor.value;
			if (range && (start == from || range.from > start + 10)) return range;
			if (start == from) return null;
		}
	}
	prevMatch(state, curFrom, curTo) {
		return this.prevMatchInRange(state, 0, curFrom) || this.prevMatchInRange(state, curTo, state.doc.length);
	}
	getReplacement(result) {
		return this.spec.unquote(this.spec.replace).replace(/\$([$&]|\d+)/g, (m, i) => {
			if (i == "&") return result.match[0];
			if (i == "$") return "$";
			for (let l = i.length; l > 0; l--) {
				let n = +i.slice(0, l);
				if (n > 0 && n < result.match.length) return result.match[n] + i.slice(l);
			}
			return m;
		});
	}
	matchAll(state, limit) {
		let cursor = regexpCursor(this.spec, state, 0, state.doc.length), ranges = [];
		while (!cursor.next().done) {
			if (ranges.length >= limit) return null;
			ranges.push(cursor.value);
		}
		return ranges;
	}
	highlight(state, from, to, add) {
		let cursor = regexpCursor(this.spec, state, Math.max(0, from - 250), Math.min(to + 250, state.doc.length));
		while (!cursor.next().done) add(cursor.value.from, cursor.value.to);
	}
};
/**
A state effect that updates the current search query. Note that
this only has an effect if the search state has been initialized
(by including [`search`](https://codemirror.net/6/docs/ref/#search.search) in your configuration or
by running [`openSearchPanel`](https://codemirror.net/6/docs/ref/#search.openSearchPanel) at least
once).
*/
var setSearchQuery = /* @__PURE__ */ StateEffect.define();
var togglePanel = /* @__PURE__ */ StateEffect.define();
var searchState = /* @__PURE__ */ StateField.define({
	create(state) {
		return new SearchState(defaultQuery(state).create(), null);
	},
	update(value, tr) {
		for (let effect of tr.effects) if (effect.is(setSearchQuery)) value = new SearchState(effect.value.create(), value.panel);
		else if (effect.is(togglePanel)) value = new SearchState(value.query, effect.value ? createSearchPanel : null);
		return value;
	},
	provide: (f) => showPanel.from(f, (val) => val.panel)
});
var SearchState = class {
	constructor(query, panel) {
		this.query = query;
		this.panel = panel;
	}
};
var matchMark = /* @__PURE__ */ Decoration.mark({ class: "cm-searchMatch" }), selectedMatchMark = /* @__PURE__ */ Decoration.mark({ class: "cm-searchMatch cm-searchMatch-selected" });
var searchHighlighter = /* @__PURE__ */ ViewPlugin.fromClass(class {
	constructor(view) {
		this.view = view;
		this.decorations = this.highlight(view.state.field(searchState));
	}
	update(update) {
		let state = update.state.field(searchState);
		if (state != update.startState.field(searchState) || update.docChanged || update.selectionSet || update.viewportChanged) this.decorations = this.highlight(state);
	}
	highlight({ query, panel }) {
		if (!panel || !query.spec.valid) return Decoration.none;
		let { view } = this;
		let builder = new RangeSetBuilder();
		for (let i = 0, ranges = view.visibleRanges, l = ranges.length; i < l; i++) {
			let { from, to } = ranges[i];
			while (i < l - 1 && to > ranges[i + 1].from - 500) to = ranges[++i].to;
			query.highlight(view.state, from, to, (from, to) => {
				let selected = view.state.selection.ranges.some((r) => r.from == from && r.to == to);
				builder.add(from, to, selected ? selectedMatchMark : matchMark);
			});
		}
		return builder.finish();
	}
}, { decorations: (v) => v.decorations });
function searchCommand(f) {
	return (view) => {
		let state = view.state.field(searchState, false);
		return state && state.query.spec.valid ? f(view, state) : openSearchPanel(view);
	};
}
/**
Open the search panel if it isn't already open, and move the
selection to the first match after the current main selection.
Will wrap around to the start of the document when it reaches the
end.
*/
var findNext = /* @__PURE__ */ searchCommand((view, { query }) => {
	let { to } = view.state.selection.main;
	let next = query.nextMatch(view.state, to, to);
	if (!next) return false;
	let selection = EditorSelection.single(next.from, next.to);
	let config = view.state.facet(searchConfigFacet);
	view.dispatch({
		selection,
		effects: [announceMatch(view, next), config.scrollToMatch(selection.main, view)],
		userEvent: "select.search"
	});
	selectSearchInput(view);
	return true;
});
/**
Move the selection to the previous instance of the search query,
before the current main selection. Will wrap past the start
of the document to start searching at the end again.
*/
var findPrevious = /* @__PURE__ */ searchCommand((view, { query }) => {
	let { state } = view, { from } = state.selection.main;
	let prev = query.prevMatch(state, from, from);
	if (!prev) return false;
	let selection = EditorSelection.single(prev.from, prev.to);
	let config = view.state.facet(searchConfigFacet);
	view.dispatch({
		selection,
		effects: [announceMatch(view, prev), config.scrollToMatch(selection.main, view)],
		userEvent: "select.search"
	});
	selectSearchInput(view);
	return true;
});
/**
Select all instances of the search query.
*/
var selectMatches = /* @__PURE__ */ searchCommand((view, { query }) => {
	let ranges = query.matchAll(view.state, 1e3);
	if (!ranges || !ranges.length) return false;
	view.dispatch({
		selection: EditorSelection.create(ranges.map((r) => EditorSelection.range(r.from, r.to))),
		userEvent: "select.search.matches"
	});
	return true;
});
/**
Select all instances of the currently selected text.
*/
var selectSelectionMatches = ({ state, dispatch }) => {
	let sel = state.selection;
	if (sel.ranges.length > 1 || sel.main.empty) return false;
	let { from, to } = sel.main;
	let ranges = [], main = 0;
	for (let cur = new SearchCursor(state.doc, state.sliceDoc(from, to)); !cur.next().done;) {
		if (ranges.length > 1e3) return false;
		if (cur.value.from == from) main = ranges.length;
		ranges.push(EditorSelection.range(cur.value.from, cur.value.to));
	}
	dispatch(state.update({
		selection: EditorSelection.create(ranges, main),
		userEvent: "select.search.matches"
	}));
	return true;
};
/**
Replace the current match of the search query.
*/
var replaceNext = /* @__PURE__ */ searchCommand((view, { query }) => {
	let { state } = view, { from, to } = state.selection.main;
	if (state.readOnly) return false;
	let match = query.nextMatch(state, from, from);
	if (!match) return false;
	let next = match;
	let changes = [], selection, replacement;
	let effects = [];
	if (!next.precise) next = query.nextMatch(state, next.from, next.to);
	else if (next.from == from && next.to == to) {
		replacement = state.toText(query.getReplacement(next));
		changes.push({
			from: next.from,
			to: next.to,
			insert: replacement
		});
		effects.push(EditorView.announce.of(state.phrase("replaced match on line $", state.doc.lineAt(from).number) + "."));
	}
	let changeSet = view.state.changes(changes);
	if (next) {
		selection = EditorSelection.single(next.from, next.to).map(changeSet);
		effects.push(announceMatch(view, next));
		effects.push(state.facet(searchConfigFacet).scrollToMatch(selection.main, view));
	}
	view.dispatch({
		changes: changeSet,
		selection,
		effects,
		userEvent: "input.replace"
	});
	return true;
});
/**
Replace all instances of the search query with the given
replacement.
*/
var replaceAll = /* @__PURE__ */ searchCommand((view, { query }) => {
	if (view.state.readOnly) return false;
	let changes = [];
	for (let match of query.matchAll(view.state, 1e9)) {
		let { from, to, precise } = match;
		if (precise) changes.push({
			from,
			to,
			insert: query.getReplacement(match)
		});
	}
	if (!changes.length) return false;
	let announceText = view.state.phrase("replaced $ matches", changes.length) + ".";
	view.dispatch({
		changes,
		effects: EditorView.announce.of(announceText),
		userEvent: "input.replace.all"
	});
	return true;
});
function createSearchPanel(view) {
	return view.state.facet(searchConfigFacet).createPanel(view);
}
function defaultQuery(state, fallback) {
	var _a, _b, _c, _d, _e;
	let sel = state.selection.main;
	let selText = sel.empty || sel.to > sel.from + 100 ? "" : state.sliceDoc(sel.from, sel.to);
	if (fallback && !selText) return fallback;
	let config = state.facet(searchConfigFacet);
	return new SearchQuery({
		search: ((_a = fallback === null || fallback === void 0 ? void 0 : fallback.literal) !== null && _a !== void 0 ? _a : config.literal) ? selText : selText.replace(/\n/g, "\\n"),
		caseSensitive: (_b = fallback === null || fallback === void 0 ? void 0 : fallback.caseSensitive) !== null && _b !== void 0 ? _b : config.caseSensitive,
		literal: (_c = fallback === null || fallback === void 0 ? void 0 : fallback.literal) !== null && _c !== void 0 ? _c : config.literal,
		regexp: (_d = fallback === null || fallback === void 0 ? void 0 : fallback.regexp) !== null && _d !== void 0 ? _d : config.regexp,
		wholeWord: (_e = fallback === null || fallback === void 0 ? void 0 : fallback.wholeWord) !== null && _e !== void 0 ? _e : config.wholeWord
	});
}
function getSearchInput(view) {
	let panel = getPanel(view, createSearchPanel);
	return panel && panel.dom.querySelector("[main-field]");
}
function selectSearchInput(view) {
	let input = getSearchInput(view);
	if (input && input == view.root.activeElement) input.select();
}
/**
Make sure the search panel is open and focused.
*/
var openSearchPanel = (view) => {
	let state = view.state.field(searchState, false);
	if (state && state.panel) {
		let searchInput = getSearchInput(view);
		if (searchInput && searchInput != view.root.activeElement) {
			let query = defaultQuery(view.state, state.query.spec);
			if (query.valid) view.dispatch({ effects: setSearchQuery.of(query) });
			searchInput.focus();
			searchInput.select();
		}
	} else view.dispatch({ effects: [togglePanel.of(true), state ? setSearchQuery.of(defaultQuery(view.state, state.query.spec)) : StateEffect.appendConfig.of(searchExtensions)] });
	return true;
};
/**
Close the search panel.
*/
var closeSearchPanel = (view) => {
	let state = view.state.field(searchState, false);
	if (!state || !state.panel) return false;
	let panel = getPanel(view, createSearchPanel);
	if (panel && panel.dom.contains(view.root.activeElement)) view.focus();
	view.dispatch({ effects: togglePanel.of(false) });
	return true;
};
/**
Default search-related key bindings.

- Mod-f: [`openSearchPanel`](https://codemirror.net/6/docs/ref/#search.openSearchPanel)
- F3, Mod-g: [`findNext`](https://codemirror.net/6/docs/ref/#search.findNext)
- Shift-F3, Shift-Mod-g: [`findPrevious`](https://codemirror.net/6/docs/ref/#search.findPrevious)
- Mod-Alt-g: [`gotoLine`](https://codemirror.net/6/docs/ref/#search.gotoLine)
- Mod-d: [`selectNextOccurrence`](https://codemirror.net/6/docs/ref/#search.selectNextOccurrence)
*/
var searchKeymap = [
	{
		key: "Mod-f",
		run: openSearchPanel,
		scope: "editor search-panel"
	},
	{
		key: "F3",
		run: findNext,
		shift: findPrevious,
		scope: "editor search-panel",
		preventDefault: true
	},
	{
		key: "Mod-g",
		run: findNext,
		shift: findPrevious,
		scope: "editor search-panel",
		preventDefault: true
	},
	{
		key: "Escape",
		run: closeSearchPanel,
		scope: "editor search-panel"
	},
	{
		key: "Mod-Shift-l",
		run: selectSelectionMatches
	},
	{
		key: "Mod-Alt-g",
		run: gotoLine
	},
	{
		key: "Mod-d",
		run: selectNextOccurrence,
		preventDefault: true
	}
];
var SearchPanel = class {
	constructor(view) {
		this.view = view;
		let query = this.query = view.state.field(searchState).query.spec;
		this.commit = this.commit.bind(this);
		this.searchField = crelt("input", {
			value: query.search,
			placeholder: phrase(view, "Find"),
			"aria-label": phrase(view, "Find"),
			class: "cm-textfield",
			name: "search",
			form: "",
			"main-field": "true",
			onchange: this.commit,
			onkeyup: this.commit
		});
		this.replaceField = crelt("input", {
			value: query.replace,
			placeholder: phrase(view, "Replace"),
			"aria-label": phrase(view, "Replace"),
			class: "cm-textfield",
			name: "replace",
			form: "",
			onchange: this.commit,
			onkeyup: this.commit
		});
		this.caseField = crelt("input", {
			type: "checkbox",
			name: "case",
			form: "",
			checked: query.caseSensitive,
			onchange: this.commit
		});
		this.reField = crelt("input", {
			type: "checkbox",
			name: "re",
			form: "",
			checked: query.regexp,
			onchange: this.commit
		});
		this.wordField = crelt("input", {
			type: "checkbox",
			name: "word",
			form: "",
			checked: query.wholeWord,
			onchange: this.commit
		});
		function button(name, onclick, content) {
			return crelt("button", {
				class: "cm-button",
				name,
				onclick,
				type: "button"
			}, content);
		}
		this.dom = crelt("div", {
			onkeydown: (e) => this.keydown(e),
			class: "cm-search"
		}, [
			this.searchField,
			button("next", () => findNext(view), [phrase(view, "next")]),
			button("prev", () => findPrevious(view), [phrase(view, "previous")]),
			button("select", () => selectMatches(view), [phrase(view, "all")]),
			crelt("label", null, [this.caseField, phrase(view, "match case")]),
			crelt("label", null, [this.reField, phrase(view, "regexp")]),
			crelt("label", null, [this.wordField, phrase(view, "by word")]),
			...view.state.readOnly ? [] : [
				crelt("br"),
				this.replaceField,
				button("replace", () => replaceNext(view), [phrase(view, "replace")]),
				button("replaceAll", () => replaceAll(view), [phrase(view, "replace all")])
			],
			crelt("button", {
				name: "close",
				onclick: () => closeSearchPanel(view),
				"aria-label": phrase(view, "close"),
				type: "button"
			}, ["×"])
		]);
	}
	commit() {
		let query = new SearchQuery({
			search: this.searchField.value,
			caseSensitive: this.caseField.checked,
			regexp: this.reField.checked,
			wholeWord: this.wordField.checked,
			replace: this.replaceField.value
		});
		if (!query.eq(this.query)) {
			this.query = query;
			this.view.dispatch({ effects: setSearchQuery.of(query) });
		}
	}
	keydown(e) {
		if (runScopeHandlers(this.view, e, "search-panel")) e.preventDefault();
		else if (e.keyCode == 13 && e.target == this.searchField) {
			e.preventDefault();
			(e.shiftKey ? findPrevious : findNext)(this.view);
		} else if (e.keyCode == 13 && e.target == this.replaceField) {
			e.preventDefault();
			replaceNext(this.view);
		}
	}
	update(update) {
		for (let tr of update.transactions) for (let effect of tr.effects) if (effect.is(setSearchQuery) && !effect.value.eq(this.query)) this.setQuery(effect.value);
	}
	setQuery(query) {
		this.query = query;
		this.searchField.value = query.search;
		this.replaceField.value = query.replace;
		this.caseField.checked = query.caseSensitive;
		this.reField.checked = query.regexp;
		this.wordField.checked = query.wholeWord;
	}
	mount() {
		this.searchField.select();
	}
	get pos() {
		return 80;
	}
	get top() {
		return this.view.state.facet(searchConfigFacet).top;
	}
};
function phrase(view, phrase) {
	return view.state.phrase(phrase);
}
var AnnounceMargin = 30;
var Break = /[\s\.,:;?!]/;
function announceMatch(view, { from, to }) {
	let line = view.state.doc.lineAt(from), lineEnd = view.state.doc.lineAt(to).to;
	let start = Math.max(line.from, from - AnnounceMargin), end = Math.min(lineEnd, to + AnnounceMargin);
	let text = view.state.sliceDoc(start, end);
	if (start != line.from) {
		for (let i = 0; i < AnnounceMargin; i++) if (!Break.test(text[i + 1]) && Break.test(text[i])) {
			text = text.slice(i);
			break;
		}
	}
	if (end != lineEnd) {
		for (let i = text.length - 1; i > text.length - AnnounceMargin; i--) if (!Break.test(text[i - 1]) && Break.test(text[i])) {
			text = text.slice(0, i);
			break;
		}
	}
	return EditorView.announce.of(`${view.state.phrase("current match")}. ${text} ${view.state.phrase("on line")} ${line.number}.`);
}
var baseTheme = /* @__PURE__ */ EditorView.baseTheme({
	".cm-panel.cm-search": {
		padding: "2px 6px 4px",
		position: "relative",
		"& [name=close]": {
			position: "absolute",
			top: "0",
			right: "4px",
			backgroundColor: "inherit",
			border: "none",
			font: "inherit",
			padding: 0,
			margin: 0
		},
		"& input, & button, & label": { margin: ".2em .6em .2em 0" },
		"& input[type=checkbox]": { marginRight: ".2em" },
		"& label": {
			fontSize: "80%",
			whiteSpace: "pre"
		}
	},
	"&light .cm-searchMatch": { backgroundColor: "#ffff0054" },
	"&dark .cm-searchMatch": { backgroundColor: "#00ffff8a" },
	"&light .cm-searchMatch-selected": { backgroundColor: "#ff6a0054" },
	"&dark .cm-searchMatch-selected": { backgroundColor: "#ff00ff8a" }
});
var searchExtensions = [
	searchState,
	/* @__PURE__ */ Prec.low(searchHighlighter),
	baseTheme
];
//#endregion
//#region node_modules/codemirror/dist/index.js
/**
This is an extension value that just pulls together a number of
extensions that you might want in a basic editor. It is meant as a
convenient helper to quickly set up CodeMirror without installing
and importing a lot of separate packages.

Specifically, it includes...

- [the default command bindings](https://codemirror.net/6/docs/ref/#commands.defaultKeymap)
- [line numbers](https://codemirror.net/6/docs/ref/#view.lineNumbers)
- [special character highlighting](https://codemirror.net/6/docs/ref/#view.highlightSpecialChars)
- [the undo history](https://codemirror.net/6/docs/ref/#commands.history)
- [a fold gutter](https://codemirror.net/6/docs/ref/#language.foldGutter)
- [custom selection drawing](https://codemirror.net/6/docs/ref/#view.drawSelection)
- [drop cursor](https://codemirror.net/6/docs/ref/#view.dropCursor)
- [multiple selections](https://codemirror.net/6/docs/ref/#state.EditorState^allowMultipleSelections)
- [reindentation on input](https://codemirror.net/6/docs/ref/#language.indentOnInput)
- [the default highlight style](https://codemirror.net/6/docs/ref/#language.defaultHighlightStyle) (as fallback)
- [bracket matching](https://codemirror.net/6/docs/ref/#language.bracketMatching)
- [bracket closing](https://codemirror.net/6/docs/ref/#autocomplete.closeBrackets)
- [autocompletion](https://codemirror.net/6/docs/ref/#autocomplete.autocompletion)
- [rectangular selection](https://codemirror.net/6/docs/ref/#view.rectangularSelection) and [crosshair cursor](https://codemirror.net/6/docs/ref/#view.crosshairCursor)
- [active line highlighting](https://codemirror.net/6/docs/ref/#view.highlightActiveLine)
- [active line gutter highlighting](https://codemirror.net/6/docs/ref/#view.highlightActiveLineGutter)
- [selection match highlighting](https://codemirror.net/6/docs/ref/#search.highlightSelectionMatches)
- [search](https://codemirror.net/6/docs/ref/#search.searchKeymap)
- [linting](https://codemirror.net/6/docs/ref/#lint.lintKeymap)

(You'll probably want to add some language package to your setup
too.)

This extension does not allow customization. The idea is that,
once you decide you want to configure your editor more precisely,
you take this package's source (which is just a bunch of imports
and an array literal), copy it into your own code, and adjust it
as desired.
*/
var basicSetup = [
	lineNumbers(),
	highlightActiveLineGutter(),
	highlightSpecialChars(),
	history(),
	foldGutter(),
	drawSelection(),
	dropCursor(),
	EditorState.allowMultipleSelections.of(true),
	indentOnInput(),
	syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
	bracketMatching(),
	closeBrackets(),
	autocompletion(),
	rectangularSelection(),
	crosshairCursor(),
	highlightActiveLine(),
	highlightSelectionMatches(),
	keymap.of([
		...closeBracketsKeymap,
		...defaultKeymap,
		...searchKeymap,
		...historyKeymap,
		...foldKeymap,
		...completionKeymap,
		...lintKeymap
	])
];
highlightSpecialChars(), history(), drawSelection(), syntaxHighlighting(defaultHighlightStyle, { fallback: true }), keymap.of([...defaultKeymap, ...historyKeymap]);
//#endregion
//#region node_modules/@lezer/json/dist/index.js
var jsonHighlighting = styleTags({
	String: tags.string,
	Number: tags.number,
	"True False": tags.bool,
	PropertyName: tags.propertyName,
	Null: tags.null,
	", :": tags.separator,
	"[ ]": tags.squareBracket,
	"{ }": tags.brace
});
var parser = LRParser.deserialize({
	version: 14,
	states: "$bOVQPOOOOQO'#Cb'#CbOnQPO'#CeOvQPO'#ClOOQO'#Cr'#CrQOQPOOOOQO'#Cg'#CgO}QPO'#CfO!SQPO'#CtOOQO,59P,59PO![QPO,59PO!aQPO'#CuOOQO,59W,59WO!iQPO,59WOVQPO,59QOqQPO'#CmO!nQPO,59`OOQO1G.k1G.kOVQPO'#CnO!vQPO,59aOOQO1G.r1G.rOOQO1G.l1G.lOOQO,59X,59XOOQO-E6k-E6kOOQO,59Y,59YOOQO-E6l-E6l",
	stateData: "#O~OeOS~OQSORSOSSOTSOWQO_ROgPO~OVXOgUO~O^[O~PVO[^O~O]_OVhX~OVaO~O]bO^iX~O^dO~O]_OVha~O]bO^ia~O",
	goto: "!kjPPPPPPkPPkqwPPPPk{!RPPP!XP!e!hXSOR^bQWQRf_TVQ_Q`WRg`QcZRicQTOQZRQe^RhbRYQR]R",
	nodeNames: "⚠ JsonText True False Null Number String } { Object Property PropertyName : , ] [ Array",
	maxTerm: 25,
	nodeProps: [
		[
			"isolate",
			-2,
			6,
			11,
			""
		],
		[
			"openedBy",
			7,
			"{",
			14,
			"["
		],
		[
			"closedBy",
			8,
			"}",
			15,
			"]"
		]
	],
	propSources: [jsonHighlighting],
	skippedNodes: [0],
	repeatNodeCount: 2,
	tokenData: "(|~RaXY!WYZ!W]^!Wpq!Wrs!]|}$u}!O$z!Q!R%T!R![&c![!]&t!}#O&y#P#Q'O#Y#Z'T#b#c'r#h#i(Z#o#p(r#q#r(w~!]Oe~~!`Wpq!]qr!]rs!xs#O!]#O#P!}#P;'S!];'S;=`$o<%lO!]~!}Og~~#QXrs!]!P!Q!]#O#P!]#U#V!]#Y#Z!]#b#c!]#f#g!]#h#i!]#i#j#m~#pR!Q![#y!c!i#y#T#Z#y~#|R!Q![$V!c!i$V#T#Z$V~$YR!Q![$c!c!i$c#T#Z$c~$fR!Q![!]!c!i!]#T#Z!]~$rP;=`<%l!]~$zO]~~$}Q!Q!R%T!R![&c~%YRT~!O!P%c!g!h%w#X#Y%w~%fP!Q![%i~%nRT~!Q![%i!g!h%w#X#Y%w~%zR{|&T}!O&T!Q![&Z~&WP!Q![&Z~&`PT~!Q![&Z~&hST~!O!P%c!Q![&c!g!h%w#X#Y%w~&yO[~~'OO_~~'TO^~~'WP#T#U'Z~'^P#`#a'a~'dP#g#h'g~'jP#X#Y'm~'rOR~~'uP#i#j'x~'{P#`#a(O~(RP#`#a(U~(ZOS~~(^P#f#g(a~(dP#i#j(g~(jP#X#Y(m~(rOQ~~(wOW~~(|OV~",
	tokenizers: [0],
	topRules: { "JsonText": [0, 1] },
	tokenPrec: 0
});
//#endregion
//#region node_modules/@codemirror/lang-json/dist/index.js
/**
Calls
[`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
on the document and, if that throws an error, reports it as a
single diagnostic.
*/
var jsonParseLinter = () => (view) => {
	try {
		JSON.parse(view.state.doc.toString());
	} catch (e) {
		if (!(e instanceof SyntaxError)) throw e;
		const pos = getErrorPosition(e, view.state.doc);
		return [{
			from: pos,
			message: e.message,
			severity: "error",
			to: pos
		}];
	}
	return [];
};
function getErrorPosition(error, doc) {
	let m;
	if (m = error.message.match(/at position (\d+)/)) return Math.min(+m[1], doc.length);
	if (m = error.message.match(/at line (\d+) column (\d+)/)) return Math.min(doc.line(+m[1]).from + +m[2] - 1, doc.length);
	return 0;
}
/**
A language provider that provides JSON parsing.
*/
var jsonLanguage = /* @__PURE__ */ LRLanguage.define({
	name: "json",
	parser: /* @__PURE__ */ parser.configure({ props: [/* @__PURE__ */ indentNodeProp.add({
		Object: /* @__PURE__ */ continuedIndent({ except: /^\s*\}/ }),
		Array: /* @__PURE__ */ continuedIndent({ except: /^\s*\]/ })
	}), /* @__PURE__ */ foldNodeProp.add({ "Object Array": foldInside })] }),
	languageData: {
		closeBrackets: { brackets: [
			"[",
			"{",
			"\""
		] },
		indentOnInput: /^\s*[\}\]]$/
	}
});
/**
JSON language support.
*/
function json() {
	return new LanguageSupport(jsonLanguage);
}
//#endregion
//#region node_modules/@bpmn-io/form-js-playground/dist/index.es.js
function Modal(props) {
	p(() => {
		function handleKey(event) {
			if (event.key === "Escape") {
				event.stopPropagation();
				props.onClose();
			}
		}
		document.addEventListener("keydown", handleKey);
		return () => {
			document.removeEventListener("keydown", handleKey);
		};
	});
	return o("div", {
		class: "fjs-pgl-modal",
		children: [o("div", {
			class: "fjs-pgl-modal-backdrop",
			onClick: props.onClose
		}), o("div", {
			class: "fjs-pgl-modal-content",
			children: [
				o("h1", {
					class: "fjs-pgl-modal-header",
					children: props.name
				}),
				o("div", {
					class: "fjs-pgl-modal-body",
					children: props.children
				}),
				o("div", {
					class: "fjs-pgl-modal-footer",
					children: o("button", {
						type: "button",
						class: "fjs-pgl-button fjs-pgl-button-default",
						onClick: props.onClose,
						children: "Close"
					})
				})
			]
		})]
	});
}
function EmbedModal(props) {
	const schema = serializeValue(props.schema);
	const data = serializeValue(props.data || {});
	const fieldRef = _();
	const snippet = `<!-- styles needed for rendering -->
<link rel="stylesheet" href="https://unpkg.com/@bpmn-io/form-js@0.2.4/dist/assets/form-js.css">

<!-- container to render the form into -->
<div class="fjs-pgl-form-container"></div>

<!-- scripts needed for embedding -->
<script src="https://unpkg.com/@bpmn-io/form-js@0.2.4/dist/form-viewer.umd.js"><\/script>

<!-- actual script to instantiate the form and load form schema + data -->
<script>
  const data = JSON.parse(${data});
  const schema = JSON.parse(${schema});

  const form = new FormViewer.Form({
    container: document.querySelector(".fjs-pgl-form-container")
  });

  form.on("submit", (event) => {
    console.log(event.data, event.errors);
  });

  form.importSchema(schema, data).catch(err => {
    console.error("Failed to render form", err);
  });
<\/script>
  `.trim();
	p(() => {
		fieldRef.current.select();
	});
	return o(Modal, {
		name: "Embed form",
		onClose: props.onClose,
		children: [o("p", { children: [
			"Use the following HTML snippet to embed your form with ",
			o("a", {
				href: "https://github.com/bpmn-io/form-js",
				children: "form-js"
			}),
			":"
		] }), o("textarea", {
			spellCheck: "false",
			ref: fieldRef,
			children: snippet
		})]
	});
}
function serializeValue(obj) {
	return JSON.stringify(JSON.stringify(obj)).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
/**
* @type {Facet<import('..').Variables>} Variables
*/
var variablesFacet = Facet.define();
function autocompletionExtension() {
	return [autocompletion({ override: [completions] })];
}
/**
* @param {import('@codemirror/autocomplete').CompletionContext} context
*/
function completions(context) {
	const variables = context.state.facet(variablesFacet)[0];
	/** @type {import('@codemirror/autocomplete').Completion[]} */
	const objectOptions = variables.map((label) => ({
		displayLabel: `"${label}"`,
		label: `"${label}": `,
		type: "variable",
		apply: (view, completion, from, to) => {
			const doc = view.state.doc;
			const beforeChar = doc.sliceString(from - 1, from);
			const line = doc.lineAt(from);
			const indentation = /^\s*/.exec(line.text)[0];
			const baseInsert = completion.label;
			if (beforeChar === "{") {
				const insert = `\n  ${indentation}${baseInsert},\n`;
				view.dispatch({
					changes: {
						from,
						to,
						insert
					},
					selection: { anchor: from + insert.length - 2 }
				});
			} else if (beforeChar === ",") {
				const insert = `\n${indentation}${baseInsert},`;
				view.dispatch({
					changes: {
						from,
						to,
						insert
					},
					selection: { anchor: from + insert.length - 1 }
				});
			} else {
				const insert = `${baseInsert},`;
				view.dispatch({
					changes: {
						from,
						to,
						insert
					},
					selection: { anchor: from + insert.length - 1 }
				});
			}
		}
	}));
	/** @type {import('@codemirror/autocomplete').Completion[]} */
	const propertyNameOptions = variables.map((label) => ({
		label,
		type: "variable"
	}));
	/** @type {import('@codemirror/autocomplete').Completion[]} */
	const propertyValueOptions = [
		{
			label: "true",
			type: "constant keyword",
			boost: 3
		},
		{
			label: "false",
			type: "constant keyword",
			boost: 2
		},
		{
			label: "null",
			type: "constant keyword",
			boost: 1
		},
		{
			displayLabel: "[ .. ]",
			label: "[  ]",
			apply: (view, completion, from, to) => {
				view.dispatch({
					changes: {
						from,
						to,
						insert: completion.label
					},
					selection: { anchor: from + 2 }
				});
			}
		},
		{
			displayLabel: "{ .. }",
			label: "{  }",
			apply: (view, completion, from, to) => {
				view.dispatch({
					changes: {
						from,
						to,
						insert: completion.label
					},
					selection: { anchor: from + 2 }
				});
			}
		}
	];
	let finalOptions = [];
	let nodeBefore = syntaxTree(context.state).resolve(context.pos, -1);
	let word = context.matchBefore(/\w*/);
	if (["Object", "{"].includes(nodeBefore.type.name)) finalOptions = objectOptions;
	if (nodeBefore.type.name === "," && nodeBefore.parent?.type.name === "Object") finalOptions = objectOptions;
	if (nodeBefore.type.name === "PropertyName") {
		context.explicit = true;
		finalOptions = propertyNameOptions;
	}
	if ([
		"Property",
		"[",
		"Array"
	].includes(nodeBefore.type.name)) finalOptions = propertyValueOptions;
	if (nodeBefore.type.name === ":" && nodeBefore.parent?.type.name === "Property") finalOptions = propertyValueOptions;
	if (word.from == word.to && !context.explicit) return null;
	return {
		from: word.from,
		options: finalOptions
	};
}
var NO_LINT_CLS = "fjs-cm-no-lint";
/**
* @param {object} options
* @param {boolean} [options.readonly]
* @param {object} [options.contentAttributes]
* @param {string | HTMLElement} [options.placeholder]
*/
function JSONEditor(options = {}) {
	const { contentAttributes = {}, placeholder: editorPlaceholder, readonly = false } = options;
	const emitter = mitt_default();
	const languageCompartment = new Compartment().of(json());
	const tabSizeCompartment = new Compartment().of(EditorState.tabSize.of(2));
	const autocompletionConfCompartment = new Compartment();
	const placeholderLinterExtension = createPlaceholderLinterExtension();
	let container = null;
	function createState(doc, variables = []) {
		const extensions = [
			basicSetup,
			languageCompartment,
			tabSizeCompartment,
			lintGutter(),
			linter(jsonParseLinter()),
			placeholderLinterExtension,
			autocompletionConfCompartment.of(variablesFacet.of(variables)),
			autocompletionExtension(),
			keymap.of([indentWithTab]),
			editorPlaceholder ? placeholder(editorPlaceholder) : [],
			EditorState.readOnly.of(readonly),
			EditorView.updateListener.of((update) => {
				if (update.docChanged) emitter.emit("changed", { value: update.state.doc.toString() });
			}),
			EditorView.contentAttributes.of(contentAttributes)
		];
		return EditorState.create({
			doc,
			extensions
		});
	}
	const view = new EditorView({ state: createState("") });
	this.setValue = function(newValue) {
		const diff = findDiff(view.state.doc.toString(), newValue);
		if (diff) view.dispatch({
			changes: {
				from: diff.start,
				to: diff.end,
				insert: diff.text
			},
			selection: { anchor: diff.start + diff.text.length }
		});
	};
	this.getValue = function() {
		return view.state.doc.toString();
	};
	this.setVariables = function(variables) {
		view.dispatch({ effects: autocompletionConfCompartment.reconfigure(variablesFacet.of(variables)) });
	};
	this.getView = function() {
		return view;
	};
	this.on = emitter.on;
	this.off = emitter.off;
	this.emit = emitter.emit;
	this.attachTo = function(_container) {
		container = _container;
		container.appendChild(view.dom);
		classes(container, document.body).add("fjs-json-editor");
	};
	this.destroy = function() {
		if (container && view.dom) {
			container.removeChild(view.dom);
			classes(container, document.body).remove("fjs-json-editor");
		}
		view.destroy();
	};
	function createPlaceholderLinterExtension() {
		return linter((view) => {
			if (!container) return [];
			if (view.dom.querySelectorAll(".cm-placeholder").length > 0) classes(container, document.body).add(NO_LINT_CLS);
			else classes(container, document.body).remove(NO_LINT_CLS);
			return [];
		});
	}
}
function findDiff(oldStr, newStr) {
	if (oldStr === newStr) return null;
	oldStr = oldStr || "";
	newStr = newStr || "";
	let minLength = Math.min(oldStr.length, newStr.length);
	let start = 0;
	while (start < minLength && oldStr[start] === newStr[start]) start++;
	if (start === minLength) return {
		start,
		text: newStr.slice(start),
		end: oldStr.length
	};
	let endOld = oldStr.length;
	let endNew = newStr.length;
	while (endOld > start && endNew > start && oldStr[endOld - 1] === newStr[endNew - 1]) {
		endOld--;
		endNew--;
	}
	return {
		start,
		text: newStr.slice(start, endNew),
		end: endOld
	};
}
function Section(props) {
	const { headerItems, children } = (Array.isArray(props.children) ? props.children : [props.children]).reduce((_, child) => {
		(child.type === Section.HeaderItem ? _.headerItems : _.children).push(child);
		return _;
	}, {
		headerItems: [],
		children: []
	});
	return o("div", {
		class: "fjs-pgl-section",
		children: [o("h1", {
			class: "header",
			children: [
				props.name,
				" ",
				headerItems.length ? o("span", {
					class: "header-items",
					children: headerItems
				}) : null
			]
		}), o("div", {
			class: "body",
			children
		})]
	});
}
Section.HeaderItem = function(props) {
	return props.children;
};
function PlaygroundRoot(config) {
	const { additionalModules, actions: actionsConfig, emit, exporter: exporterConfig, viewerProperties, editorProperties, viewerAdditionalModules, editorAdditionalModules, editorSlots, propertiesPanel: propertiesPanelConfig, apiLinkTarget, onInit } = config;
	const { display: displayActions = true } = actionsConfig || {};
	const editorContainerRef = _();
	const paletteContainerRef = _();
	const propertiesPanelContainerRef = _();
	const viewerContainerRef = _();
	const inputDataContainerRef = _();
	const outputDataContainerRef = _();
	const formEditorRef = _();
	const formViewerRef = _();
	const inputDataRef = _();
	const outputDataRef = _();
	const [showEmbed, setShowEmbed] = h(false);
	const [schema, setSchema] = h();
	const [data, setData] = h();
	const load = T((schema, data) => {
		formEditorRef.current.importSchema(schema, data);
		inputDataRef.current.setValue(toString(data));
		setData(data);
	}, []);
	p(() => {
		const inputDataEditor = inputDataRef.current = new JSONEditor({
			contentAttributes: {
				"aria-label": "Form Input",
				tabIndex: 0
			},
			placeholder: createDataEditorPlaceholder()
		});
		const outputDataEditor = outputDataRef.current = new JSONEditor({
			readonly: true,
			contentAttributes: {
				"aria-label": "Form Output",
				tabIndex: 0
			}
		});
		const formViewer = formViewerRef.current = new Form({
			container: viewerContainerRef.current,
			additionalModules: [...additionalModules || [], ...viewerAdditionalModules || []],
			properties: {
				...viewerProperties || {},
				ariaLabel: "Form Preview"
			}
		});
		const formEditor = formEditorRef.current = new FormEditor({
			container: editorContainerRef.current,
			renderer: { compact: true },
			palette: { parent: paletteContainerRef.current },
			propertiesPanel: {
				parent: propertiesPanelContainerRef.current,
				...propertiesPanelConfig || {}
			},
			exporter: exporterConfig,
			properties: {
				...editorProperties || {},
				ariaLabel: "Form Definition"
			},
			additionalModules: [...additionalModules || [], ...editorAdditionalModules || []],
			...editorSlots ? { slots: editorSlots } : {}
		});
		formEditor.on("formField.add", ({ formField }) => {
			const { config } = formEditor.get("formFields").get(formField.type);
			const { generateInitialDemoData } = config;
			const { id } = formField;
			if (!isFunction(generateInitialDemoData)) return;
			const initialDemoData = generateInitialDemoData(formField);
			if ([initialDemoData, id].includes(void 0)) return;
			setData((currentData) => {
				const newData = {
					...currentData,
					[id]: initialDemoData
				};
				inputDataRef.current.setValue(toString(newData));
				return newData;
			});
		});
		formEditor.on("changed", () => {
			setSchema(formEditor.getSchema());
		});
		formEditor.on("formEditor.rendered", () => {
			emit("formPlayground.rendered");
		});
		const updateOutputData = () => {
			const submitData = formViewer._getSubmitData();
			outputDataEditor.setValue(toString(submitData));
		};
		formViewer.on("changed", updateOutputData);
		formViewer.on("formFieldInstance.added", updateOutputData);
		formViewer.on("formFieldInstance.removed", updateOutputData);
		inputDataEditor.on("changed", (event) => {
			try {
				setData(JSON.parse(event.value));
			} catch (error) {
				emit("formPlayground.inputDataError", error);
			}
		});
		inputDataEditor.attachTo(inputDataContainerRef.current);
		outputDataEditor.attachTo(outputDataContainerRef.current);
		return () => {
			inputDataEditor.destroy();
			outputDataEditor.destroy();
			formViewer.destroy();
			formEditor.destroy();
		};
	}, [
		additionalModules,
		editorAdditionalModules,
		editorProperties,
		editorSlots,
		emit,
		exporterConfig,
		propertiesPanelConfig,
		viewerAdditionalModules,
		viewerProperties
	]);
	p(() => {
		if (!config.initialSchema) return;
		load(config.initialSchema, config.initialData || {});
	}, [
		config.initialSchema,
		config.initialData,
		load
	]);
	p(() => {
		schema && formViewerRef.current.importSchema(schema, data);
	}, [schema, data]);
	p(() => {
		if (schema && inputDataContainerRef.current) {
			const variables = getSchemaVariables(schema);
			inputDataRef.current.setVariables(variables);
		}
	}, [schema]);
	p(() => {
		if (!apiLinkTarget) return;
		apiLinkTarget.api = {
			attachDataContainer: (node) => inputDataRef.current.attachTo(node),
			attachResultContainer: (node) => outputDataRef.current.attachTo(node),
			attachFormContainer: (node) => formViewerRef.current.attachTo(node),
			attachEditorContainer: (node) => formEditorRef.current.attachTo(node),
			attachPaletteContainer: (node) => formEditorRef.current.get("palette").attachTo(node),
			attachPropertiesPanelContainer: (node) => formEditorRef.current.get("propertiesPanel").attachTo(node),
			get: (name, strict) => formEditorRef.current.get(name, strict),
			getDataEditor: () => inputDataRef.current,
			getEditor: () => formEditorRef.current,
			getForm: () => formViewerRef.current,
			getResultView: () => outputDataRef.current,
			getSchema: () => formEditorRef.current.getSchema(),
			saveSchema: () => formEditorRef.current.saveSchema(),
			setSchema: (newSchema) => {
				return formEditorRef.current.importSchema(newSchema);
			},
			setData
		};
		onInit();
	}, [apiLinkTarget, onInit]);
	p(() => {
		if (!apiLinkTarget) return;
		apiLinkTarget.api.getState = () => ({
			schema,
			data
		});
		apiLinkTarget.api.load = load;
	}, [
		apiLinkTarget,
		schema,
		data,
		load
	]);
	const handleDownload = T(() => {
		(0, import_download.default)(JSON.stringify(schema, null, "  "), "form.json", "text/json");
	}, [schema]);
	const hideEmbedModal = T(() => {
		setShowEmbed(false);
	}, []);
	const showEmbedModal = T(() => {
		setShowEmbed(true);
	}, []);
	return o("div", {
		class: (0, import_classnames.default)("fjs-container", "fjs-pgl-root"),
		children: [
			o("div", {
				class: "fjs-pgl-modals",
				children: showEmbed ? o(EmbedModal, {
					schema,
					data,
					onClose: hideEmbedModal
				}) : null
			}),
			o("div", {
				class: "fjs-pgl-palette-container",
				ref: paletteContainerRef
			}),
			o("div", {
				class: "fjs-pgl-main",
				children: [
					o(Section, {
						name: "Form Definition",
						children: [
							displayActions && o(Section.HeaderItem, { children: o("button", {
								type: "button",
								class: "fjs-pgl-button",
								title: "Download form definition",
								onClick: handleDownload,
								children: "Download"
							}) }),
							displayActions && o(Section.HeaderItem, { children: o("button", {
								type: "button",
								class: "fjs-pgl-button",
								onClick: showEmbedModal,
								children: "Embed"
							}) }),
							o("div", {
								ref: editorContainerRef,
								class: "fjs-pgl-form-container"
							})
						]
					}),
					o(Section, {
						name: "Form Preview",
						children: o("div", {
							ref: viewerContainerRef,
							class: "fjs-pgl-form-container"
						})
					}),
					o(Section, {
						name: "Form Input",
						children: o("div", {
							ref: inputDataContainerRef,
							class: "fjs-pgl-text-container"
						})
					}),
					o(Section, {
						name: "Form Output",
						children: o("div", {
							ref: outputDataContainerRef,
							class: "fjs-pgl-text-container"
						})
					})
				]
			}),
			o("div", {
				class: "fjs-pgl-properties-container",
				ref: propertiesPanelContainerRef
			})
		]
	});
}
function toString(obj) {
	return JSON.stringify(obj, null, "  ");
}
function createDataEditorPlaceholder() {
	const element = document.createElement("p");
	element.innerHTML = "Use this panel to simulate the form input, such as process variables.\nThis helps to test the form by populating the preview.\n\nFollow the JSON format like this:\n\n{\n  \"variable\": \"value\"\n}";
	return element;
}
function Playground(options) {
	const { container: parent, schema: initialSchema, data: initialData, ...rest } = options;
	const emitter = mitt_default();
	const container = document.createElement("div");
	container.classList.add("fjs-pgl-parent");
	if (parent) parent.appendChild(container);
	const handleDrop = fileDrop("Drop a form file", function(files) {
		const file = files[0];
		if (file) try {
			this.api.setSchema(JSON.parse(file.contents));
		} catch (err) {}
	});
	const safe = function(fn) {
		return function(...args) {
			if (!this.api) throw new Error("Playground is not initialized.");
			return fn(...args);
		};
	};
	const onInit = function() {
		emitter.emit("formPlayground.init");
	};
	container.addEventListener("dragover", handleDrop);
	D(o(PlaygroundRoot, {
		initialSchema,
		initialData,
		emit: emitter.emit,
		apiLinkTarget: this,
		onInit,
		...rest
	}), container);
	this.on = emitter.on;
	this.off = emitter.off;
	this.emit = emitter.emit;
	this.on("destroy", () => {
		D(null, container);
		parent.removeChild(container);
	});
	this.destroy = () => this.emit("destroy");
	this.getState = safe(() => this.api.getState());
	this.getSchema = safe(() => this.api.getSchema());
	this.setSchema = safe((schema) => this.api.setSchema(schema));
	this.saveSchema = safe(() => this.api.saveSchema());
	this.get = safe((name, strict) => this.api.get(name, strict));
	this.getDataEditor = safe(() => this.api.getDataEditor());
	this.getEditor = safe(() => this.api.getEditor());
	this.getForm = safe((name, strict) => this.api.getForm(name, strict));
	this.getResultView = safe(() => this.api.getResultView());
	this.attachEditorContainer = safe((node) => this.api.attachEditorContainer(node));
	this.attachPreviewContainer = safe((node) => this.api.attachFormContainer(node));
	this.attachDataContainer = safe((node) => this.api.attachDataContainer(node));
	this.attachResultContainer = safe((node) => this.api.attachResultContainer(node));
	this.attachPaletteContainer = safe((node) => this.api.attachPaletteContainer(node));
	this.attachPropertiesPanelContainer = safe((node) => this.api.attachPropertiesPanelContainer(node));
}
//#endregion
export { ALLOW_ATTRIBUTE, Button, Checkbox, Checklist, ConditionChecker, DATETIME_SUBTYPES, DATETIME_SUBTYPES_LABELS, DATETIME_SUBTYPE_PATH, DATE_DISALLOW_PAST_PATH, DATE_LABEL_PATH, Datetime, Default, Description, DocumentPreview, DynamicList, Errors, ExpressionField, ExpressionFieldModule, ExpressionLanguageModule, ExpressionLoopPreventer, FeelExpressionLanguage, FeelersTemplating, FieldFactory, FilePicker, Form, FormComponent, FormContext, FormEditor, FormField, FormFieldRegistry, FormFields, FormLayouter, Playground as FormPlayground, FormRenderContext, Group, Html, IFrame, Image, Importer, Label, LocalExpressionContext, MINUTES_IN_DAY, MarkdownRenderer, MarkdownRendererModule, Numberfield, OPTIONS_SOURCES, OPTIONS_SOURCES_DEFAULTS, OPTIONS_SOURCES_LABELS, OPTIONS_SOURCES_PATHS, OPTIONS_SOURCE_DEFAULT, PathRegistry, Radio, RenderModule, RepeatRenderManager, RepeatRenderModule, SANDBOX_ATTRIBUTE, SECURITY_ATTRIBUTES_DEFINITIONS, Select, Separator, Spacer, TEXT_VIEW_DEFAULT_TEXT, TIME_INTERVAL_PATH, TIME_LABEL_PATH, TIME_SERIALISINGFORMAT_LABELS, TIME_SERIALISING_FORMATS, TIME_SERIALISING_FORMAT_PATH, TIME_USE24H_PATH, Table, Taglist, Text, Textarea, Textfield, ViewerCommands, ViewerCommandsModule, buildExpressionContext, clone, createForm, createFormContainer, createFormEditor, createInjector, escapeHTML, formFields, generateIdForType, generateIndexForType, getAncestryList, getOptionsSource, getSchemaVariables, getScrollContainer, hasEqualValue, iconsByType, isRequired, pathParse, pathsEqual, pruneAt, runExpressionEvaluation, runRecursively, runUnaryTestEvaluation, sanitizeDateTimePickerValue, sanitizeHTML, sanitizeIFrameSource, sanitizeImageSource, sanitizeMultiSelectValue, sanitizeSingleSelectValue, schemaVersion, useDebounce$1 as useDebounce, useExpressionEvaluation, usePrevious$1 as usePrevious, useService as usePropertiesPanelService, useService$1 as useService, useSingleLineTemplateEvaluation, useTemplateEvaluation, useVariables, wrapCSSStyles, wrapObjectKeysWithUnderscores };

//# sourceMappingURL=@bpmn-io_form-js.js.map