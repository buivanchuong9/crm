import { a as createCache, i as serializeStyles, n as insertStyles, t as getRegisteredStyles$1 } from "./emotion-utils.browser.esm-bxjoTCVh.js";
//#region node_modules/@emotion/css/create-instance/dist/emotion-css-create-instance.development.esm.js
function insertWithoutScoping(cache, serialized) {
	if (cache.inserted[serialized.name] === void 0) return cache.insert("", serialized, cache.sheet, true);
}
function merge$1(registered, css, className) {
	var registeredStyles = [];
	var rawClassName = getRegisteredStyles$1(registered, registeredStyles, className);
	if (registeredStyles.length < 2) return className;
	return rawClassName + css(registeredStyles);
}
var createEmotion = function createEmotion(options) {
	var cache = createCache(options);
	cache.sheet.speedy = function(value) {
		if (this.ctr !== 0) throw new Error("speedy must be changed before any rules are inserted");
		this.isSpeedy = value;
	};
	cache.compat = true;
	var css = function css() {
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		var serialized = serializeStyles(args, cache.registered, void 0);
		insertStyles(cache, serialized, false);
		return cache.key + "-" + serialized.name;
	};
	return {
		css,
		cx: function cx() {
			for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) args[_key4] = arguments[_key4];
			return merge$1(cache.registered, css, classnames(args));
		},
		injectGlobal: function injectGlobal() {
			for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) args[_key3] = arguments[_key3];
			insertWithoutScoping(cache, serializeStyles(args, cache.registered));
		},
		keyframes: function keyframes() {
			for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
			var serialized = serializeStyles(args, cache.registered);
			var animation = "animation-" + serialized.name;
			insertWithoutScoping(cache, {
				name: serialized.name,
				styles: "@keyframes " + animation + "{" + serialized.styles + "}"
			});
			return animation;
		},
		hydrate: function hydrate(ids) {
			ids.forEach(function(key) {
				cache.inserted[key] = true;
			});
		},
		flush: function flush() {
			cache.registered = {};
			cache.inserted = {};
			cache.sheet.flush();
		},
		sheet: cache.sheet,
		cache,
		getRegisteredStyles: getRegisteredStyles$1.bind(null, cache.registered),
		merge: merge$1.bind(null, cache.registered, css)
	};
};
var classnames = function classnames(args) {
	var cls = "";
	for (var i = 0; i < args.length; i++) {
		var arg = args[i];
		if (arg == null) continue;
		var toAdd = void 0;
		switch (typeof arg) {
			case "boolean": break;
			case "object":
				if (Array.isArray(arg)) toAdd = classnames(arg);
				else {
					toAdd = "";
					for (var k in arg) if (arg[k] && k) {
						toAdd && (toAdd += " ");
						toAdd += k;
					}
				}
				break;
			default: toAdd = arg;
		}
		if (toAdd) {
			cls && (cls += " ");
			cls += toAdd;
		}
	}
	return cls;
};
//#endregion
//#region node_modules/@emotion/css/dist/emotion-css.development.esm.js
var _createEmotion = createEmotion({ key: "css" }), flush = _createEmotion.flush, hydrate = _createEmotion.hydrate, cx = _createEmotion.cx, merge = _createEmotion.merge, getRegisteredStyles = _createEmotion.getRegisteredStyles, injectGlobal = _createEmotion.injectGlobal, keyframes = _createEmotion.keyframes, css = _createEmotion.css, sheet = _createEmotion.sheet, cache = _createEmotion.cache;
//#endregion
export { cache, css, cx, flush, getRegisteredStyles, hydrate, injectGlobal, keyframes, merge, sheet };

//# sourceMappingURL=@emotion_css.js.map