import { o as __toESM } from "./chunk-CqwQKh_b.js";
import { t as require_react } from "./react.js";
import { t as require_react_dom } from "./react-dom-CtbBIW7I.js";
import { a as createCache, i as serializeStyles, n as insertStyles, r as registerStyles, t as getRegisteredStyles } from "./emotion-utils.browser.esm-Cf2rgDmY.js";
import { i as init_extends, r as _extends } from "./objectWithoutPropertiesLoose-DIZvbRmR.js";
import { a as _typeof, n as init_defineProperty, o as init_typeof, t as _defineProperty } from "./defineProperty--TBnxa1j.js";
import { t as _objectSpread2 } from "./objectSpread2-Dj8Npl81.js";
import { t as require_hoist_non_react_statics_cjs } from "./hoist-non-react-statics.cjs-CDFyE_i4.js";
import { C as _classCallCheck, E as init_objectWithoutProperties, S as init_createClass, T as _objectWithoutProperties, a as _slicedToArray, b as init_getPrototypeOf, g as init_possibleConstructorReturn, h as _possibleConstructorReturn, m as init_inherits, n as init_toConsumableArray, o as init_slicedToArray, p as _inherits, t as _toConsumableArray, w as init_classCallCheck, x as _createClass, y as _getPrototypeOf } from "./toConsumableArray-DtzTVcfW.js";
import { t as _isNativeReflectConstruct } from "./isNativeReflectConstruct-CRhBaFEB.js";
import { n as autoUpdate } from "./floating-ui.dom-DFXcWg3U.js";
//#region node_modules/react-select/dist/useStateManager-7e1e8489.esm.js
init_slicedToArray();
init_objectWithoutProperties();
var import_react = /* @__PURE__ */ __toESM(require_react());
var _excluded$6 = [
	"defaultInputValue",
	"defaultMenuIsOpen",
	"defaultValue",
	"inputValue",
	"menuIsOpen",
	"onChange",
	"onInputChange",
	"onMenuClose",
	"onMenuOpen",
	"value"
];
function useStateManager(_ref) {
	var _ref$defaultInputValu = _ref.defaultInputValue, defaultInputValue = _ref$defaultInputValu === void 0 ? "" : _ref$defaultInputValu, _ref$defaultMenuIsOpe = _ref.defaultMenuIsOpen, defaultMenuIsOpen = _ref$defaultMenuIsOpe === void 0 ? false : _ref$defaultMenuIsOpe, _ref$defaultValue = _ref.defaultValue, defaultValue = _ref$defaultValue === void 0 ? null : _ref$defaultValue, propsInputValue = _ref.inputValue, propsMenuIsOpen = _ref.menuIsOpen, propsOnChange = _ref.onChange, propsOnInputChange = _ref.onInputChange, propsOnMenuClose = _ref.onMenuClose, propsOnMenuOpen = _ref.onMenuOpen, propsValue = _ref.value, restSelectProps = _objectWithoutProperties(_ref, _excluded$6);
	var _useState2 = _slicedToArray((0, import_react.useState)(propsInputValue !== void 0 ? propsInputValue : defaultInputValue), 2), stateInputValue = _useState2[0], setStateInputValue = _useState2[1];
	var _useState4 = _slicedToArray((0, import_react.useState)(propsMenuIsOpen !== void 0 ? propsMenuIsOpen : defaultMenuIsOpen), 2), stateMenuIsOpen = _useState4[0], setStateMenuIsOpen = _useState4[1];
	var _useState6 = _slicedToArray((0, import_react.useState)(propsValue !== void 0 ? propsValue : defaultValue), 2), stateValue = _useState6[0], setStateValue = _useState6[1];
	var onChange = (0, import_react.useCallback)(function(value, actionMeta) {
		if (typeof propsOnChange === "function") propsOnChange(value, actionMeta);
		setStateValue(value);
	}, [propsOnChange]);
	var onInputChange = (0, import_react.useCallback)(function(value, actionMeta) {
		var newValue;
		if (typeof propsOnInputChange === "function") newValue = propsOnInputChange(value, actionMeta);
		setStateInputValue(newValue !== void 0 ? newValue : value);
	}, [propsOnInputChange]);
	var onMenuOpen = (0, import_react.useCallback)(function() {
		if (typeof propsOnMenuOpen === "function") propsOnMenuOpen();
		setStateMenuIsOpen(true);
	}, [propsOnMenuOpen]);
	var onMenuClose = (0, import_react.useCallback)(function() {
		if (typeof propsOnMenuClose === "function") propsOnMenuClose();
		setStateMenuIsOpen(false);
	}, [propsOnMenuClose]);
	var inputValue = propsInputValue !== void 0 ? propsInputValue : stateInputValue;
	var menuIsOpen = propsMenuIsOpen !== void 0 ? propsMenuIsOpen : stateMenuIsOpen;
	var value = propsValue !== void 0 ? propsValue : stateValue;
	return _objectSpread2(_objectSpread2({}, restSelectProps), {}, {
		inputValue,
		menuIsOpen,
		onChange,
		onInputChange,
		onMenuClose,
		onMenuOpen,
		value
	});
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/createSuper.js
init_classCallCheck();
init_createClass();
init_inherits();
init_getPrototypeOf();
init_possibleConstructorReturn();
function _createSuper(t) {
	var r = _isNativeReflectConstruct();
	return function() {
		var e, o = _getPrototypeOf(t);
		if (r) {
			var s = _getPrototypeOf(this).constructor;
			e = Reflect.construct(o, arguments, s);
		} else e = o.apply(this, arguments);
		return _possibleConstructorReturn(this, e);
	};
}
//#endregion
//#region node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js
init_typeof();
init_toConsumableArray();
var syncFallback = function syncFallback(create) {
	return create();
};
var useInsertionEffect = import_react["useInsertionEffect"] ? import_react["useInsertionEffect"] : false;
var useInsertionEffectAlwaysWithSyncFallback = useInsertionEffect || syncFallback;
var useInsertionEffectWithLayoutFallback = useInsertionEffect || import_react.useLayoutEffect;
//#endregion
//#region node_modules/@emotion/react/dist/emotion-element-489459f2.browser.development.esm.js
var EmotionCacheContext = /* @__PURE__ */ import_react.createContext(typeof HTMLElement !== "undefined" ? /* @__PURE__ */ createCache({ key: "css" }) : null);
EmotionCacheContext.displayName = "EmotionCacheContext";
var CacheProvider = EmotionCacheContext.Provider;
var withEmotionCache = function withEmotionCache(func) {
	return /* @__PURE__ */ (0, import_react.forwardRef)(function(props, ref) {
		return func(props, (0, import_react.useContext)(EmotionCacheContext), ref);
	});
};
var ThemeContext = /* @__PURE__ */ import_react.createContext({});
ThemeContext.displayName = "EmotionThemeContext";
var hasOwn = {}.hasOwnProperty;
var getLastPart = function getLastPart(functionName) {
	var parts = functionName.split(".");
	return parts[parts.length - 1];
};
var getFunctionNameFromStackTraceLine = function getFunctionNameFromStackTraceLine(line) {
	var match = /^\s+at\s+([A-Za-z0-9$.]+)\s/.exec(line);
	if (match) return getLastPart(match[1]);
	match = /^([A-Za-z0-9$.]+)@/.exec(line);
	if (match) return getLastPart(match[1]);
};
var internalReactFunctionNames = /* @__PURE__ */ new Set([
	"renderWithHooks",
	"processChild",
	"finishClassComponent",
	"renderToString"
]);
var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
	return identifier.replace(/\$/g, "-");
};
var getLabelFromStackTrace = function getLabelFromStackTrace(stackTrace) {
	if (!stackTrace) return void 0;
	var lines = stackTrace.split("\n");
	for (var i = 0; i < lines.length; i++) {
		var functionName = getFunctionNameFromStackTraceLine(lines[i]);
		if (!functionName) continue;
		if (internalReactFunctionNames.has(functionName)) break;
		if (/^[A-Z]/.test(functionName)) return sanitizeIdentifier(functionName);
	}
};
var typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__";
var labelPropName = "__EMOTION_LABEL_PLEASE_DO_NOT_USE__";
var createEmotionProps = function createEmotionProps(type, props) {
	if (typeof props.css === "string" && props.css.indexOf(":") !== -1) throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" + props.css + "`");
	var newProps = {};
	for (var _key in props) if (hasOwn.call(props, _key)) newProps[_key] = props[_key];
	newProps[typePropName] = type;
	if (typeof globalThis !== "undefined" && !!globalThis.EMOTION_RUNTIME_AUTO_LABEL && !!props.css && (typeof props.css !== "object" || !("name" in props.css) || typeof props.css.name !== "string" || props.css.name.indexOf("-") === -1)) {
		var label = getLabelFromStackTrace((/* @__PURE__ */ new Error()).stack);
		if (label) newProps[labelPropName] = label;
	}
	return newProps;
};
var Insertion$1 = function Insertion(_ref) {
	var cache = _ref.cache, serialized = _ref.serialized, isStringTag = _ref.isStringTag;
	registerStyles(cache, serialized, isStringTag);
	useInsertionEffectAlwaysWithSyncFallback(function() {
		return insertStyles(cache, serialized, isStringTag);
	});
	return null;
};
var Emotion = /* @__PURE__ */ withEmotionCache(function(props, cache, ref) {
	var cssProp = props.css;
	if (typeof cssProp === "string" && cache.registered[cssProp] !== void 0) cssProp = cache.registered[cssProp];
	var WrappedComponent = props[typePropName];
	var registeredStyles = [cssProp];
	var className = "";
	if (typeof props.className === "string") className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
	else if (props.className != null) className = props.className + " ";
	var serialized = serializeStyles(registeredStyles, void 0, import_react.useContext(ThemeContext));
	if (serialized.name.indexOf("-") === -1) {
		var labelFromStack = props[labelPropName];
		if (labelFromStack) serialized = serializeStyles([serialized, "label:" + labelFromStack + ";"]);
	}
	className += cache.key + "-" + serialized.name;
	var newProps = {};
	for (var _key2 in props) if (hasOwn.call(props, _key2) && _key2 !== "css" && _key2 !== typePropName && _key2 !== labelPropName) newProps[_key2] = props[_key2];
	newProps.className = className;
	if (ref) newProps.ref = ref;
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement(Insertion$1, {
		cache,
		serialized,
		isStringTag: typeof WrappedComponent === "string"
	}), /* @__PURE__ */ import_react.createElement(WrappedComponent, newProps));
});
Emotion.displayName = "EmotionCssPropInternal";
var Emotion$1 = Emotion;
require_hoist_non_react_statics_cjs();
var isDevelopment = true;
var pkg = {
	name: "@emotion/react",
	version: "11.14.0",
	main: "dist/emotion-react.cjs.js",
	module: "dist/emotion-react.esm.js",
	types: "dist/emotion-react.cjs.d.ts",
	exports: {
		".": {
			types: {
				"import": "./dist/emotion-react.cjs.mjs",
				"default": "./dist/emotion-react.cjs.js"
			},
			development: {
				"edge-light": {
					module: "./dist/emotion-react.development.edge-light.esm.js",
					"import": "./dist/emotion-react.development.edge-light.cjs.mjs",
					"default": "./dist/emotion-react.development.edge-light.cjs.js"
				},
				worker: {
					module: "./dist/emotion-react.development.edge-light.esm.js",
					"import": "./dist/emotion-react.development.edge-light.cjs.mjs",
					"default": "./dist/emotion-react.development.edge-light.cjs.js"
				},
				workerd: {
					module: "./dist/emotion-react.development.edge-light.esm.js",
					"import": "./dist/emotion-react.development.edge-light.cjs.mjs",
					"default": "./dist/emotion-react.development.edge-light.cjs.js"
				},
				browser: {
					module: "./dist/emotion-react.browser.development.esm.js",
					"import": "./dist/emotion-react.browser.development.cjs.mjs",
					"default": "./dist/emotion-react.browser.development.cjs.js"
				},
				module: "./dist/emotion-react.development.esm.js",
				"import": "./dist/emotion-react.development.cjs.mjs",
				"default": "./dist/emotion-react.development.cjs.js"
			},
			"edge-light": {
				module: "./dist/emotion-react.edge-light.esm.js",
				"import": "./dist/emotion-react.edge-light.cjs.mjs",
				"default": "./dist/emotion-react.edge-light.cjs.js"
			},
			worker: {
				module: "./dist/emotion-react.edge-light.esm.js",
				"import": "./dist/emotion-react.edge-light.cjs.mjs",
				"default": "./dist/emotion-react.edge-light.cjs.js"
			},
			workerd: {
				module: "./dist/emotion-react.edge-light.esm.js",
				"import": "./dist/emotion-react.edge-light.cjs.mjs",
				"default": "./dist/emotion-react.edge-light.cjs.js"
			},
			browser: {
				module: "./dist/emotion-react.browser.esm.js",
				"import": "./dist/emotion-react.browser.cjs.mjs",
				"default": "./dist/emotion-react.browser.cjs.js"
			},
			module: "./dist/emotion-react.esm.js",
			"import": "./dist/emotion-react.cjs.mjs",
			"default": "./dist/emotion-react.cjs.js"
		},
		"./jsx-runtime": {
			types: {
				"import": "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.mjs",
				"default": "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"
			},
			development: {
				"edge-light": {
					module: "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.esm.js",
					"import": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.cjs.mjs",
					"default": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.cjs.js"
				},
				worker: {
					module: "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.esm.js",
					"import": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.cjs.mjs",
					"default": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.cjs.js"
				},
				workerd: {
					module: "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.esm.js",
					"import": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.cjs.mjs",
					"default": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.cjs.js"
				},
				browser: {
					module: "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.development.esm.js",
					"import": "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.development.cjs.mjs",
					"default": "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.development.cjs.js"
				},
				module: "./jsx-runtime/dist/emotion-react-jsx-runtime.development.esm.js",
				"import": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.cjs.mjs",
				"default": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.cjs.js"
			},
			"edge-light": {
				module: "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.esm.js",
				"import": "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.cjs.mjs",
				"default": "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.cjs.js"
			},
			worker: {
				module: "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.esm.js",
				"import": "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.cjs.mjs",
				"default": "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.cjs.js"
			},
			workerd: {
				module: "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.esm.js",
				"import": "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.cjs.mjs",
				"default": "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.cjs.js"
			},
			browser: {
				module: "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js",
				"import": "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.cjs.mjs",
				"default": "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.cjs.js"
			},
			module: "./jsx-runtime/dist/emotion-react-jsx-runtime.esm.js",
			"import": "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.mjs",
			"default": "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"
		},
		"./_isolated-hnrs": {
			types: {
				"import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.mjs",
				"default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js"
			},
			development: {
				"edge-light": {
					module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.esm.js",
					"import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.cjs.mjs",
					"default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.cjs.js"
				},
				worker: {
					module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.esm.js",
					"import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.cjs.mjs",
					"default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.cjs.js"
				},
				workerd: {
					module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.esm.js",
					"import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.cjs.mjs",
					"default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.cjs.js"
				},
				browser: {
					module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.development.esm.js",
					"import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.development.cjs.mjs",
					"default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.development.cjs.js"
				},
				module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.esm.js",
				"import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.cjs.mjs",
				"default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.cjs.js"
			},
			"edge-light": {
				module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.esm.js",
				"import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.cjs.mjs",
				"default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.cjs.js"
			},
			worker: {
				module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.esm.js",
				"import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.cjs.mjs",
				"default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.cjs.js"
			},
			workerd: {
				module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.esm.js",
				"import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.cjs.mjs",
				"default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.cjs.js"
			},
			browser: {
				module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js",
				"import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.cjs.mjs",
				"default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.cjs.js"
			},
			module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.esm.js",
			"import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.mjs",
			"default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js"
		},
		"./jsx-dev-runtime": {
			types: {
				"import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.mjs",
				"default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js"
			},
			development: {
				"edge-light": {
					module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.esm.js",
					"import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.cjs.mjs",
					"default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.cjs.js"
				},
				worker: {
					module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.esm.js",
					"import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.cjs.mjs",
					"default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.cjs.js"
				},
				workerd: {
					module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.esm.js",
					"import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.cjs.mjs",
					"default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.cjs.js"
				},
				browser: {
					module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.development.esm.js",
					"import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.development.cjs.mjs",
					"default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.development.cjs.js"
				},
				module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.esm.js",
				"import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.cjs.mjs",
				"default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.cjs.js"
			},
			"edge-light": {
				module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.esm.js",
				"import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.cjs.mjs",
				"default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.cjs.js"
			},
			worker: {
				module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.esm.js",
				"import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.cjs.mjs",
				"default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.cjs.js"
			},
			workerd: {
				module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.esm.js",
				"import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.cjs.mjs",
				"default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.cjs.js"
			},
			browser: {
				module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js",
				"import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.cjs.mjs",
				"default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.cjs.js"
			},
			module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.esm.js",
			"import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.mjs",
			"default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js"
		},
		"./package.json": "./package.json",
		"./types/css-prop": "./types/css-prop.d.ts",
		"./macro": {
			types: {
				"import": "./macro.d.mts",
				"default": "./macro.d.ts"
			},
			"default": "./macro.js"
		}
	},
	imports: {
		"#is-development": {
			development: "./src/conditions/true.ts",
			"default": "./src/conditions/false.ts"
		},
		"#is-browser": {
			"edge-light": "./src/conditions/false.ts",
			workerd: "./src/conditions/false.ts",
			worker: "./src/conditions/false.ts",
			browser: "./src/conditions/true.ts",
			"default": "./src/conditions/is-browser.ts"
		}
	},
	files: [
		"src",
		"dist",
		"jsx-runtime",
		"jsx-dev-runtime",
		"_isolated-hnrs",
		"types/css-prop.d.ts",
		"macro.*"
	],
	sideEffects: false,
	author: "Emotion Contributors",
	license: "MIT",
	scripts: { "test:typescript": "dtslint types" },
	dependencies: {
		"@babel/runtime": "^7.18.3",
		"@emotion/babel-plugin": "^11.13.5",
		"@emotion/cache": "^11.14.0",
		"@emotion/serialize": "^1.3.3",
		"@emotion/use-insertion-effect-with-fallbacks": "^1.2.0",
		"@emotion/utils": "^1.4.2",
		"@emotion/weak-memoize": "^0.4.0",
		"hoist-non-react-statics": "^3.3.1"
	},
	peerDependencies: { react: ">=16.8.0" },
	peerDependenciesMeta: { "@types/react": { optional: true } },
	devDependencies: {
		"@definitelytyped/dtslint": "0.0.112",
		"@emotion/css": "11.13.5",
		"@emotion/css-prettifier": "1.2.0",
		"@emotion/server": "11.11.0",
		"@emotion/styled": "11.14.0",
		"@types/hoist-non-react-statics": "^3.3.5",
		"html-tag-names": "^1.1.2",
		react: "16.14.0",
		"svg-tag-names": "^1.1.1",
		typescript: "^5.4.5"
	},
	repository: "https://github.com/emotion-js/emotion/tree/main/packages/react",
	publishConfig: { access: "public" },
	"umd:main": "dist/emotion-react.umd.min.js",
	preconstruct: {
		entrypoints: [
			"./index.ts",
			"./jsx-runtime.ts",
			"./jsx-dev-runtime.ts",
			"./_isolated-hnrs.ts"
		],
		umdName: "emotionReact",
		exports: { extra: {
			"./types/css-prop": "./types/css-prop.d.ts",
			"./macro": {
				types: {
					"import": "./macro.d.mts",
					"default": "./macro.d.ts"
				},
				"default": "./macro.js"
			}
		} }
	}
};
var jsx = function jsx(type, props) {
	var args = arguments;
	if (props == null || !hasOwn.call(props, "css")) return import_react.createElement.apply(void 0, args);
	var argsLength = args.length;
	var createElementArgArray = new Array(argsLength);
	createElementArgArray[0] = Emotion$1;
	createElementArgArray[1] = createEmotionProps(type, props);
	for (var i = 2; i < argsLength; i++) createElementArgArray[i] = args[i];
	return import_react.createElement.apply(null, createElementArgArray);
};
(function(_jsx) {
	var JSX;
	(function(_JSX) {})(JSX || (JSX = _jsx.JSX || (_jsx.JSX = {})));
})(jsx || (jsx = {}));
var warnedAboutCssPropForGlobal = false;
var Global = /* @__PURE__ */ withEmotionCache(function(props, cache) {
	if (!warnedAboutCssPropForGlobal && ("className" in props && props.className || "css" in props && props.css)) {
		console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
		warnedAboutCssPropForGlobal = true;
	}
	var styles = props.styles;
	var serialized = serializeStyles([styles], void 0, import_react.useContext(ThemeContext));
	var sheetRef = import_react.useRef();
	useInsertionEffectWithLayoutFallback(function() {
		var key = cache.key + "-global";
		var sheet = new cache.sheet.constructor({
			key,
			nonce: cache.sheet.nonce,
			container: cache.sheet.container,
			speedy: cache.sheet.isSpeedy
		});
		var rehydrating = false;
		var node = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");
		if (cache.sheet.tags.length) sheet.before = cache.sheet.tags[0];
		if (node !== null) {
			rehydrating = true;
			node.setAttribute("data-emotion", key);
			sheet.hydrate([node]);
		}
		sheetRef.current = [sheet, rehydrating];
		return function() {
			sheet.flush();
		};
	}, [cache]);
	useInsertionEffectWithLayoutFallback(function() {
		var sheetRefCurrent = sheetRef.current;
		var sheet = sheetRefCurrent[0];
		if (sheetRefCurrent[1]) {
			sheetRefCurrent[1] = false;
			return;
		}
		if (serialized.next !== void 0) insertStyles(cache, serialized.next, true);
		if (sheet.tags.length) {
			sheet.before = sheet.tags[sheet.tags.length - 1].nextElementSibling;
			sheet.flush();
		}
		cache.insert("", serialized, sheet, false);
	}, [cache, serialized.name]);
	return null;
});
Global.displayName = "EmotionGlobal";
function css$2() {
	for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	return serializeStyles(args);
}
function keyframes() {
	var insertable = css$2.apply(void 0, arguments);
	var name = "animation-" + insertable.name;
	return {
		name,
		styles: "@keyframes " + name + "{" + insertable.styles + "}",
		anim: 1,
		toString: function toString() {
			return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
		}
	};
}
var classnames = function classnames(args) {
	var len = args.length;
	var i = 0;
	var cls = "";
	for (; i < len; i++) {
		var arg = args[i];
		if (arg == null) continue;
		var toAdd = void 0;
		switch (typeof arg) {
			case "boolean": break;
			case "object":
				if (Array.isArray(arg)) toAdd = classnames(arg);
				else {
					if (arg.styles !== void 0 && arg.name !== void 0) console.error("You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.");
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
function merge(registered, css, className) {
	var registeredStyles = [];
	var rawClassName = getRegisteredStyles(registered, registeredStyles, className);
	if (registeredStyles.length < 2) return className;
	return rawClassName + css(registeredStyles);
}
var Insertion = function Insertion(_ref) {
	var cache = _ref.cache, serializedArr = _ref.serializedArr;
	useInsertionEffectAlwaysWithSyncFallback(function() {
		for (var i = 0; i < serializedArr.length; i++) insertStyles(cache, serializedArr[i], false);
	});
	return null;
};
var ClassNames = /* @__PURE__ */ withEmotionCache(function(props, cache) {
	var hasRendered = false;
	var serializedArr = [];
	var css = function css() {
		if (hasRendered && isDevelopment) throw new Error("css can only be used during render");
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		var serialized = serializeStyles(args, cache.registered);
		serializedArr.push(serialized);
		registerStyles(cache, serialized, false);
		return cache.key + "-" + serialized.name;
	};
	var content = {
		css,
		cx: function cx() {
			if (hasRendered && isDevelopment) throw new Error("cx can only be used during render");
			for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
			return merge(cache.registered, css, classnames(args));
		},
		theme: import_react.useContext(ThemeContext)
	};
	var ele = props.children(content);
	hasRendered = true;
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement(Insertion, {
		cache,
		serializedArr
	}), ele);
});
ClassNames.displayName = "EmotionClassNames";
var isBrowser = typeof document !== "undefined";
if (isBrowser && !(typeof jest !== "undefined" || typeof vi !== "undefined")) {
	var globalContext = typeof globalThis !== "undefined" ? globalThis : isBrowser ? window : global;
	var globalKey = "__EMOTION_REACT_" + pkg.version.split(".")[0] + "__";
	if (globalContext[globalKey]) console.warn("You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.");
	globalContext[globalKey] = true;
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js
function _taggedTemplateLiteral(e, t) {
	return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
//#endregion
//#region node_modules/use-isomorphic-layout-effect/dist/use-isomorphic-layout-effect.browser.esm.js
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
init_defineProperty();
var index = import_react.useLayoutEffect;
//#endregion
//#region node_modules/react-select/dist/index-641ee5b8.esm.js
init_extends();
init_slicedToArray();
init_objectWithoutProperties();
var _excluded$4 = [
	"className",
	"clearValue",
	"cx",
	"getStyles",
	"getClassNames",
	"getValue",
	"hasValue",
	"isMulti",
	"isRtl",
	"options",
	"selectOption",
	"selectProps",
	"setValue",
	"theme"
];
var noop = function noop() {};
/**
String representation of component state for styling with class names.

Expects an array of strings OR a string/object pair:
- className(['comp', 'comp-arg', 'comp-arg-2'])
@returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
- className('comp', { some: true, state: false })
@returns 'react-select__comp react-select__comp--some'
*/
function applyPrefixToName(prefix, name) {
	if (!name) return prefix;
	else if (name[0] === "-") return prefix + name;
	else return prefix + "__" + name;
}
function classNames(prefix, state) {
	for (var _len = arguments.length, classNameList = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) classNameList[_key - 2] = arguments[_key];
	var arr = [].concat(classNameList);
	if (state && prefix) {
		for (var key in state) if (state.hasOwnProperty(key) && state[key]) arr.push("".concat(applyPrefixToName(prefix, key)));
	}
	return arr.filter(function(i) {
		return i;
	}).map(function(i) {
		return String(i).trim();
	}).join(" ");
}
var cleanValue = function cleanValue(value) {
	if (isArray(value)) return value.filter(Boolean);
	if (_typeof(value) === "object" && value !== null) return [value];
	return [];
};
var cleanCommonProps = function cleanCommonProps(props) {
	props.className;
	props.clearValue;
	props.cx;
	props.getStyles;
	props.getClassNames;
	props.getValue;
	props.hasValue;
	props.isMulti;
	props.isRtl;
	props.options;
	props.selectOption;
	props.selectProps;
	props.setValue;
	props.theme;
	return _objectSpread2({}, _objectWithoutProperties(props, _excluded$4));
};
var getStyleProps = function getStyleProps(props, name, classNamesState) {
	var cx = props.cx, getStyles = props.getStyles, getClassNames = props.getClassNames, className = props.className;
	return {
		css: getStyles(name, props),
		className: cx(classNamesState !== null && classNamesState !== void 0 ? classNamesState : {}, getClassNames(name, props), className)
	};
};
function handleInputChange(inputValue, actionMeta, onInputChange) {
	if (onInputChange) {
		var _newValue = onInputChange(inputValue, actionMeta);
		if (typeof _newValue === "string") return _newValue;
	}
	return inputValue;
}
function isDocumentElement(el) {
	return [
		document.documentElement,
		document.body,
		window
	].indexOf(el) > -1;
}
function normalizedHeight(el) {
	if (isDocumentElement(el)) return window.innerHeight;
	return el.clientHeight;
}
function getScrollTop(el) {
	if (isDocumentElement(el)) return window.pageYOffset;
	return el.scrollTop;
}
function scrollTo(el, top) {
	if (isDocumentElement(el)) {
		window.scrollTo(0, top);
		return;
	}
	el.scrollTop = top;
}
function getScrollParent(element) {
	var style = getComputedStyle(element);
	var excludeStaticParent = style.position === "absolute";
	var overflowRx = /(auto|scroll)/;
	if (style.position === "fixed") return document.documentElement;
	for (var parent = element; parent = parent.parentElement;) {
		style = getComputedStyle(parent);
		if (excludeStaticParent && style.position === "static") continue;
		if (overflowRx.test(style.overflow + style.overflowY + style.overflowX)) return parent;
	}
	return document.documentElement;
}
/**
@param t: time (elapsed)
@param b: initial value
@param c: amount of change
@param d: duration
*/
function easeOutCubic(t, b, c, d) {
	return c * ((t = t / d - 1) * t * t + 1) + b;
}
function animatedScrollTo(element, to) {
	var duration = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 200;
	var callback = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : noop;
	var start = getScrollTop(element);
	var change = to - start;
	var increment = 10;
	var currentTime = 0;
	function animateScroll() {
		currentTime += increment;
		scrollTo(element, easeOutCubic(currentTime, start, change, duration));
		if (currentTime < duration) window.requestAnimationFrame(animateScroll);
		else callback(element);
	}
	animateScroll();
}
function scrollIntoView(menuEl, focusedEl) {
	var menuRect = menuEl.getBoundingClientRect();
	var focusedRect = focusedEl.getBoundingClientRect();
	var overScroll = focusedEl.offsetHeight / 3;
	if (focusedRect.bottom + overScroll > menuRect.bottom) scrollTo(menuEl, Math.min(focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll, menuEl.scrollHeight));
	else if (focusedRect.top - overScroll < menuRect.top) scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
}
function getBoundingClientObj(element) {
	var rect = element.getBoundingClientRect();
	return {
		bottom: rect.bottom,
		height: rect.height,
		left: rect.left,
		right: rect.right,
		top: rect.top,
		width: rect.width
	};
}
function isTouchCapable() {
	try {
		document.createEvent("TouchEvent");
		return true;
	} catch (e) {
		return false;
	}
}
function isMobileDevice() {
	try {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	} catch (e) {
		return false;
	}
}
var passiveOptionAccessed = false;
var options = { get passive() {
	return passiveOptionAccessed = true;
} };
var w = typeof window !== "undefined" ? window : {};
if (w.addEventListener && w.removeEventListener) {
	w.addEventListener("p", noop, options);
	w.removeEventListener("p", noop, false);
}
var supportsPassiveEvents = passiveOptionAccessed;
function notNullish(item) {
	return item != null;
}
function isArray(arg) {
	return Array.isArray(arg);
}
function valueTernary(isMulti, multiValue, singleValue) {
	return isMulti ? multiValue : singleValue;
}
function singleValueAsValue(singleValue) {
	return singleValue;
}
function multiValueAsValue(multiValue) {
	return multiValue;
}
var removeProps = function removeProps(propsObj) {
	for (var _len2 = arguments.length, properties = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) properties[_key2 - 1] = arguments[_key2];
	return Object.entries(propsObj).filter(function(_ref) {
		var key = _slicedToArray(_ref, 1)[0];
		return !properties.includes(key);
	}).reduce(function(newProps, _ref3) {
		var _ref4 = _slicedToArray(_ref3, 2), key = _ref4[0];
		newProps[key] = _ref4[1];
		return newProps;
	}, {});
};
var _excluded$3 = ["children", "innerProps"], _excluded2$1 = ["children", "innerProps"];
function getMenuPlacement(_ref) {
	var preferredMaxHeight = _ref.maxHeight, menuEl = _ref.menuEl, minHeight = _ref.minHeight, preferredPlacement = _ref.placement, shouldScroll = _ref.shouldScroll, isFixedPosition = _ref.isFixedPosition, controlHeight = _ref.controlHeight;
	var scrollParent = getScrollParent(menuEl);
	var defaultState = {
		placement: "bottom",
		maxHeight: preferredMaxHeight
	};
	if (!menuEl || !menuEl.offsetParent) return defaultState;
	var scrollHeight = scrollParent.getBoundingClientRect().height;
	var _menuEl$getBoundingCl = menuEl.getBoundingClientRect(), menuBottom = _menuEl$getBoundingCl.bottom, menuHeight = _menuEl$getBoundingCl.height, menuTop = _menuEl$getBoundingCl.top;
	var containerTop = menuEl.offsetParent.getBoundingClientRect().top;
	var viewHeight = isFixedPosition ? window.innerHeight : normalizedHeight(scrollParent);
	var scrollTop = getScrollTop(scrollParent);
	var marginBottom = parseInt(getComputedStyle(menuEl).marginBottom, 10);
	var marginTop = parseInt(getComputedStyle(menuEl).marginTop, 10);
	var viewSpaceAbove = containerTop - marginTop;
	var viewSpaceBelow = viewHeight - menuTop;
	var scrollSpaceAbove = viewSpaceAbove + scrollTop;
	var scrollSpaceBelow = scrollHeight - scrollTop - menuTop;
	var scrollDown = menuBottom - viewHeight + scrollTop + marginBottom;
	var scrollUp = scrollTop + menuTop - marginTop;
	var scrollDuration = 160;
	switch (preferredPlacement) {
		case "auto":
		case "bottom":
			if (viewSpaceBelow >= menuHeight) return {
				placement: "bottom",
				maxHeight: preferredMaxHeight
			};
			if (scrollSpaceBelow >= menuHeight && !isFixedPosition) {
				if (shouldScroll) animatedScrollTo(scrollParent, scrollDown, scrollDuration);
				return {
					placement: "bottom",
					maxHeight: preferredMaxHeight
				};
			}
			if (!isFixedPosition && scrollSpaceBelow >= minHeight || isFixedPosition && viewSpaceBelow >= minHeight) {
				if (shouldScroll) animatedScrollTo(scrollParent, scrollDown, scrollDuration);
				return {
					placement: "bottom",
					maxHeight: isFixedPosition ? viewSpaceBelow - marginBottom : scrollSpaceBelow - marginBottom
				};
			}
			if (preferredPlacement === "auto" || isFixedPosition) {
				var _constrainedHeight = preferredMaxHeight;
				var spaceAbove = isFixedPosition ? viewSpaceAbove : scrollSpaceAbove;
				if (spaceAbove >= minHeight) _constrainedHeight = Math.min(spaceAbove - marginBottom - controlHeight, preferredMaxHeight);
				return {
					placement: "top",
					maxHeight: _constrainedHeight
				};
			}
			if (preferredPlacement === "bottom") {
				if (shouldScroll) scrollTo(scrollParent, scrollDown);
				return {
					placement: "bottom",
					maxHeight: preferredMaxHeight
				};
			}
			break;
		case "top":
			if (viewSpaceAbove >= menuHeight) return {
				placement: "top",
				maxHeight: preferredMaxHeight
			};
			if (scrollSpaceAbove >= menuHeight && !isFixedPosition) {
				if (shouldScroll) animatedScrollTo(scrollParent, scrollUp, scrollDuration);
				return {
					placement: "top",
					maxHeight: preferredMaxHeight
				};
			}
			if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
				var _constrainedHeight2 = preferredMaxHeight;
				if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) _constrainedHeight2 = isFixedPosition ? viewSpaceAbove - marginTop : scrollSpaceAbove - marginTop;
				if (shouldScroll) animatedScrollTo(scrollParent, scrollUp, scrollDuration);
				return {
					placement: "top",
					maxHeight: _constrainedHeight2
				};
			}
			return {
				placement: "bottom",
				maxHeight: preferredMaxHeight
			};
		default: throw new Error("Invalid placement provided \"".concat(preferredPlacement, "\"."));
	}
	return defaultState;
}
function alignToControl(placement) {
	return placement ? {
		bottom: "top",
		top: "bottom"
	}[placement] : "bottom";
}
var coercePlacement = function coercePlacement(p) {
	return p === "auto" ? "bottom" : p;
};
var menuCSS = function menuCSS(_ref2, unstyled) {
	var _objectSpread2$1;
	var placement = _ref2.placement, _ref2$theme = _ref2.theme, borderRadius = _ref2$theme.borderRadius, spacing = _ref2$theme.spacing, colors = _ref2$theme.colors;
	return _objectSpread2((_objectSpread2$1 = { label: "menu" }, _defineProperty(_objectSpread2$1, alignToControl(placement), "100%"), _defineProperty(_objectSpread2$1, "position", "absolute"), _defineProperty(_objectSpread2$1, "width", "100%"), _defineProperty(_objectSpread2$1, "zIndex", 1), _objectSpread2$1), unstyled ? {} : {
		backgroundColor: colors.neutral0,
		borderRadius,
		boxShadow: "0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)",
		marginBottom: spacing.menuGutter,
		marginTop: spacing.menuGutter
	});
};
var PortalPlacementContext = /* @__PURE__ */ (0, import_react.createContext)(null);
var MenuPlacer = function MenuPlacer(props) {
	var children = props.children, minMenuHeight = props.minMenuHeight, maxMenuHeight = props.maxMenuHeight, menuPlacement = props.menuPlacement, menuPosition = props.menuPosition, menuShouldScrollIntoView = props.menuShouldScrollIntoView, theme = props.theme;
	var setPortalPlacement = ((0, import_react.useContext)(PortalPlacementContext) || {}).setPortalPlacement;
	var ref = (0, import_react.useRef)(null);
	var _useState2 = _slicedToArray((0, import_react.useState)(maxMenuHeight), 2), maxHeight = _useState2[0], setMaxHeight = _useState2[1];
	var _useState4 = _slicedToArray((0, import_react.useState)(null), 2), placement = _useState4[0], setPlacement = _useState4[1];
	var controlHeight = theme.spacing.controlHeight;
	index(function() {
		var menuEl = ref.current;
		if (!menuEl) return;
		var isFixedPosition = menuPosition === "fixed";
		var state = getMenuPlacement({
			maxHeight: maxMenuHeight,
			menuEl,
			minHeight: minMenuHeight,
			placement: menuPlacement,
			shouldScroll: menuShouldScrollIntoView && !isFixedPosition,
			isFixedPosition,
			controlHeight
		});
		setMaxHeight(state.maxHeight);
		setPlacement(state.placement);
		setPortalPlacement === null || setPortalPlacement === void 0 || setPortalPlacement(state.placement);
	}, [
		maxMenuHeight,
		menuPlacement,
		menuPosition,
		menuShouldScrollIntoView,
		minMenuHeight,
		setPortalPlacement,
		controlHeight
	]);
	return children({
		ref,
		placerProps: _objectSpread2(_objectSpread2({}, props), {}, {
			placement: placement || coercePlacement(menuPlacement),
			maxHeight
		})
	});
};
var Menu$1 = function Menu(props) {
	var children = props.children, innerRef = props.innerRef, innerProps = props.innerProps;
	return jsx("div", _extends({}, getStyleProps(props, "menu", { menu: true }), { ref: innerRef }, innerProps), children);
};
var menuListCSS = function menuListCSS(_ref4, unstyled) {
	var maxHeight = _ref4.maxHeight, baseUnit = _ref4.theme.spacing.baseUnit;
	return _objectSpread2({
		maxHeight,
		overflowY: "auto",
		position: "relative",
		WebkitOverflowScrolling: "touch"
	}, unstyled ? {} : {
		paddingBottom: baseUnit,
		paddingTop: baseUnit
	});
};
var MenuList = function MenuList(props) {
	var children = props.children, innerProps = props.innerProps, innerRef = props.innerRef, isMulti = props.isMulti;
	return jsx("div", _extends({}, getStyleProps(props, "menuList", {
		"menu-list": true,
		"menu-list--is-multi": isMulti
	}), { ref: innerRef }, innerProps), children);
};
var noticeCSS = function noticeCSS(_ref5, unstyled) {
	var _ref5$theme = _ref5.theme, baseUnit = _ref5$theme.spacing.baseUnit, colors = _ref5$theme.colors;
	return _objectSpread2({ textAlign: "center" }, unstyled ? {} : {
		color: colors.neutral40,
		padding: "".concat(baseUnit * 2, "px ").concat(baseUnit * 3, "px")
	});
};
var noOptionsMessageCSS = noticeCSS;
var loadingMessageCSS = noticeCSS;
var NoOptionsMessage = function NoOptionsMessage(_ref6) {
	var _ref6$children = _ref6.children, children = _ref6$children === void 0 ? "No options" : _ref6$children, innerProps = _ref6.innerProps;
	return jsx("div", _extends({}, getStyleProps(_objectSpread2(_objectSpread2({}, _objectWithoutProperties(_ref6, _excluded$3)), {}, {
		children,
		innerProps
	}), "noOptionsMessage", {
		"menu-notice": true,
		"menu-notice--no-options": true
	}), innerProps), children);
};
var LoadingMessage = function LoadingMessage(_ref7) {
	var _ref7$children = _ref7.children, children = _ref7$children === void 0 ? "Loading..." : _ref7$children, innerProps = _ref7.innerProps;
	return jsx("div", _extends({}, getStyleProps(_objectSpread2(_objectSpread2({}, _objectWithoutProperties(_ref7, _excluded2$1)), {}, {
		children,
		innerProps
	}), "loadingMessage", {
		"menu-notice": true,
		"menu-notice--loading": true
	}), innerProps), children);
};
var menuPortalCSS = function menuPortalCSS(_ref8) {
	var rect = _ref8.rect, offset = _ref8.offset, position = _ref8.position;
	return {
		left: rect.left,
		position,
		top: offset,
		width: rect.width,
		zIndex: 1
	};
};
var MenuPortal = function MenuPortal(props) {
	var appendTo = props.appendTo, children = props.children, controlElement = props.controlElement, innerProps = props.innerProps, menuPlacement = props.menuPlacement, menuPosition = props.menuPosition;
	var menuPortalRef = (0, import_react.useRef)(null);
	var cleanupRef = (0, import_react.useRef)(null);
	var _useState6 = _slicedToArray((0, import_react.useState)(coercePlacement(menuPlacement)), 2), placement = _useState6[0], setPortalPlacement = _useState6[1];
	var portalPlacementContext = (0, import_react.useMemo)(function() {
		return { setPortalPlacement };
	}, []);
	var _useState8 = _slicedToArray((0, import_react.useState)(null), 2), computedPosition = _useState8[0], setComputedPosition = _useState8[1];
	var updateComputedPosition = (0, import_react.useCallback)(function() {
		if (!controlElement) return;
		var rect = getBoundingClientObj(controlElement);
		var scrollDistance = menuPosition === "fixed" ? 0 : window.pageYOffset;
		var offset = rect[placement] + scrollDistance;
		if (offset !== (computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.offset) || rect.left !== (computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.left) || rect.width !== (computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.width)) setComputedPosition({
			offset,
			rect
		});
	}, [
		controlElement,
		menuPosition,
		placement,
		computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.offset,
		computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.left,
		computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.width
	]);
	index(function() {
		updateComputedPosition();
	}, [updateComputedPosition]);
	var runAutoUpdate = (0, import_react.useCallback)(function() {
		if (typeof cleanupRef.current === "function") {
			cleanupRef.current();
			cleanupRef.current = null;
		}
		if (controlElement && menuPortalRef.current) cleanupRef.current = autoUpdate(controlElement, menuPortalRef.current, updateComputedPosition, { elementResize: "ResizeObserver" in window });
	}, [controlElement, updateComputedPosition]);
	index(function() {
		runAutoUpdate();
	}, [runAutoUpdate]);
	var setMenuPortalElement = (0, import_react.useCallback)(function(menuPortalElement) {
		menuPortalRef.current = menuPortalElement;
		runAutoUpdate();
	}, [runAutoUpdate]);
	if (!appendTo && menuPosition !== "fixed" || !computedPosition) return null;
	var menuWrapper = jsx("div", _extends({ ref: setMenuPortalElement }, getStyleProps(_objectSpread2(_objectSpread2({}, props), {}, {
		offset: computedPosition.offset,
		position: menuPosition,
		rect: computedPosition.rect
	}), "menuPortal", { "menu-portal": true }), innerProps), children);
	return jsx(PortalPlacementContext.Provider, { value: portalPlacementContext }, appendTo ? /* @__PURE__ */ (0, import_react_dom.createPortal)(menuWrapper, appendTo) : menuWrapper);
};
var containerCSS = function containerCSS(_ref) {
	var isDisabled = _ref.isDisabled;
	return {
		label: "container",
		direction: _ref.isRtl ? "rtl" : void 0,
		pointerEvents: isDisabled ? "none" : void 0,
		position: "relative"
	};
};
var SelectContainer = function SelectContainer(props) {
	var children = props.children, innerProps = props.innerProps, isDisabled = props.isDisabled, isRtl = props.isRtl;
	return jsx("div", _extends({}, getStyleProps(props, "container", {
		"--is-disabled": isDisabled,
		"--is-rtl": isRtl
	}), innerProps), children);
};
var valueContainerCSS = function valueContainerCSS(_ref2, unstyled) {
	var spacing = _ref2.theme.spacing, isMulti = _ref2.isMulti, hasValue = _ref2.hasValue, controlShouldRenderValue = _ref2.selectProps.controlShouldRenderValue;
	return _objectSpread2({
		alignItems: "center",
		display: isMulti && hasValue && controlShouldRenderValue ? "flex" : "grid",
		flex: 1,
		flexWrap: "wrap",
		WebkitOverflowScrolling: "touch",
		position: "relative",
		overflow: "hidden"
	}, unstyled ? {} : { padding: "".concat(spacing.baseUnit / 2, "px ").concat(spacing.baseUnit * 2, "px") });
};
var ValueContainer = function ValueContainer(props) {
	var children = props.children, innerProps = props.innerProps, isMulti = props.isMulti, hasValue = props.hasValue;
	return jsx("div", _extends({}, getStyleProps(props, "valueContainer", {
		"value-container": true,
		"value-container--is-multi": isMulti,
		"value-container--has-value": hasValue
	}), innerProps), children);
};
var indicatorsContainerCSS = function indicatorsContainerCSS() {
	return {
		alignItems: "center",
		alignSelf: "stretch",
		display: "flex",
		flexShrink: 0
	};
};
var IndicatorsContainer = function IndicatorsContainer(props) {
	var children = props.children, innerProps = props.innerProps;
	return jsx("div", _extends({}, getStyleProps(props, "indicatorsContainer", { indicators: true }), innerProps), children);
};
var _templateObject;
var _excluded$2 = ["size"], _excluded2 = [
	"innerProps",
	"isRtl",
	"size"
];
function _EMOTION_STRINGIFIED_CSS_ERROR__$3() {
	return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var _ref2$2 = {
	name: "tj5bde-Svg",
	styles: "display:inline-block;fill:currentColor;line-height:1;stroke:currentColor;stroke-width:0;label:Svg;",
	map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCSSIsImZpbGUiOiJpbmRpY2F0b3JzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgSlNYLCBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3gsIGtleWZyYW1lcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuaW1wb3J0IHtcbiAgQ29tbW9uUHJvcHNBbmRDbGFzc05hbWUsXG4gIENTU09iamVjdFdpdGhMYWJlbCxcbiAgR3JvdXBCYXNlLFxufSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBnZXRTdHlsZVByb3BzIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgSWNvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBTdmcgPSAoe1xuICBzaXplLFxuICAuLi5wcm9wc1xufTogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzdmcnXSAmIHsgc2l6ZTogbnVtYmVyIH0pID0+IChcbiAgPHN2Z1xuICAgIGhlaWdodD17c2l6ZX1cbiAgICB3aWR0aD17c2l6ZX1cbiAgICB2aWV3Qm94PVwiMCAwIDIwIDIwXCJcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgIGZvY3VzYWJsZT1cImZhbHNlXCJcbiAgICBjc3M9e3tcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgZmlsbDogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgc3Ryb2tlOiAnY3VycmVudENvbG9yJyxcbiAgICAgIHN0cm9rZVdpZHRoOiAwLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IHR5cGUgQ3Jvc3NJY29uUHJvcHMgPSBKU1guSW50cmluc2ljRWxlbWVudHNbJ3N2ZyddICYgeyBzaXplPzogbnVtYmVyIH07XG5leHBvcnQgY29uc3QgQ3Jvc3NJY29uID0gKHByb3BzOiBDcm9zc0ljb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNMTQuMzQ4IDE0Ljg0OWMtMC40NjkgMC40NjktMS4yMjkgMC40NjktMS42OTcgMGwtMi42NTEtMy4wMzAtMi42NTEgMy4wMjljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDAtMC40NjktMC40NjktMC40NjktMS4yMjkgMC0xLjY5N2wyLjc1OC0zLjE1LTIuNzU5LTMuMTUyYy0wLjQ2OS0wLjQ2OS0wLjQ2OS0xLjIyOCAwLTEuNjk3czEuMjI4LTAuNDY5IDEuNjk3IDBsMi42NTIgMy4wMzEgMi42NTEtMy4wMzFjMC40NjktMC40NjkgMS4yMjgtMC40NjkgMS42OTcgMHMwLjQ2OSAxLjIyOSAwIDEuNjk3bC0yLjc1OCAzLjE1MiAyLjc1OCAzLjE1YzAuNDY5IDAuNDY5IDAuNDY5IDEuMjI5IDAgMS42OTh6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuZXhwb3J0IHR5cGUgRG93bkNoZXZyb25Qcm9wcyA9IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3ZnJ10gJiB7IHNpemU/OiBudW1iZXIgfTtcbmV4cG9ydCBjb25zdCBEb3duQ2hldnJvbiA9IChwcm9wczogRG93bkNoZXZyb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNNC41MTYgNy41NDhjMC40MzYtMC40NDYgMS4wNDMtMC40ODEgMS41NzYgMGwzLjkwOCAzLjc0NyAzLjkwOC0zLjc0N2MwLjUzMy0wLjQ4MSAxLjE0MS0wLjQ0NiAxLjU3NCAwIDAuNDM2IDAuNDQ1IDAuNDA4IDEuMTk3IDAgMS42MTUtMC40MDYgMC40MTgtNC42OTUgNC41MDItNC42OTUgNC41MDItMC4yMTcgMC4yMjMtMC41MDIgMC4zMzUtMC43ODcgMC4zMzVzLTAuNTctMC4xMTItMC43ODktMC4zMzVjMCAwLTQuMjg3LTQuMDg0LTQuNjk1LTQuNTAycy0wLjQzNi0xLjE3IDAtMS42MTV6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgQnV0dG9uc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIC8qKiBUaGUgY2hpbGRyZW4gdG8gYmUgcmVuZGVyZWQgaW5zaWRlIHRoZSBpbmRpY2F0b3IuICovXG4gIGNoaWxkcmVuPzogUmVhY3ROb2RlO1xuICAvKiogUHJvcHMgdGhhdCB3aWxsIGJlIHBhc3NlZCBvbiB0byB0aGUgY2hpbGRyZW4uICovXG4gIGlubmVyUHJvcHM6IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snZGl2J107XG4gIC8qKiBUaGUgZm9jdXNlZCBzdGF0ZSBvZiB0aGUgc2VsZWN0LiAqL1xuICBpc0ZvY3VzZWQ6IGJvb2xlYW47XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG59XG5cbmNvbnN0IGJhc2VDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0ZvY3VzZWQsXG4gICAgdGhlbWU6IHtcbiAgICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICAgIGNvbG9ycyxcbiAgICB9LFxuICB9OlxuICAgIHwgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuICAgIHwgQ2xlYXJJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPixcbiAgdW5zdHlsZWQ6IGJvb2xlYW5cbik6IENTU09iamVjdFdpdGhMYWJlbCA9PiAoe1xuICBsYWJlbDogJ2luZGljYXRvckNvbnRhaW5lcicsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgdHJhbnNpdGlvbjogJ2NvbG9yIDE1MG1zJyxcbiAgLi4uKHVuc3R5bGVkXG4gICAgPyB7fVxuICAgIDoge1xuICAgICAgICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw2MCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gICAgICAgIHBhZGRpbmc6IGJhc2VVbml0ICogMixcbiAgICAgICAgJzpob3Zlcic6IHtcbiAgICAgICAgICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw4MCA6IGNvbG9ycy5uZXV0cmFsNDAsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbn0pO1xuXG5leHBvcnQgY29uc3QgZHJvcGRvd25JbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xuZXhwb3J0IGNvbnN0IERyb3Bkb3duSW5kaWNhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogRHJvcGRvd25JbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgY2hpbGRyZW4sIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKHByb3BzLCAnZHJvcGRvd25JbmRpY2F0b3InLCB7XG4gICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgJ2Ryb3Bkb3duLWluZGljYXRvcic6IHRydWUsXG4gICAgICB9KX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8RG93bkNoZXZyb24gLz59XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIENsZWFySW5kaWNhdG9yUHJvcHM8XG4gIE9wdGlvbiA9IHVua25vd24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuID0gYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPiA9IEdyb3VwQmFzZTxPcHRpb24+XG4+IGV4dGVuZHMgQ29tbW9uUHJvcHNBbmRDbGFzc05hbWU8T3B0aW9uLCBJc011bHRpLCBHcm91cD4ge1xuICAvKiogVGhlIGNoaWxkcmVuIHRvIGJlIHJlbmRlcmVkIGluc2lkZSB0aGUgaW5kaWNhdG9yLiAqL1xuICBjaGlsZHJlbj86IFJlYWN0Tm9kZTtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgY2xlYXJJbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xuZXhwb3J0IGNvbnN0IENsZWFySW5kaWNhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogQ2xlYXJJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgY2hpbGRyZW4sIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKHByb3BzLCAnY2xlYXJJbmRpY2F0b3InLCB7XG4gICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgJ2NsZWFyLWluZGljYXRvcic6IHRydWUsXG4gICAgICB9KX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8Q3Jvc3NJY29uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTZXBhcmF0b3Jcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgaW50ZXJmYWNlIEluZGljYXRvclNlcGFyYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgaXNEaXNhYmxlZDogYm9vbGVhbjtcbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpbm5lclByb3BzPzogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ107XG59XG5cbmV4cG9ydCBjb25zdCBpbmRpY2F0b3JTZXBhcmF0b3JDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0Rpc2FibGVkLFxuICAgIHRoZW1lOiB7XG4gICAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gICAgICBjb2xvcnMsXG4gICAgfSxcbiAgfTogSW5kaWNhdG9yU2VwYXJhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4sXG4gIHVuc3R5bGVkOiBib29sZWFuXG4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdpbmRpY2F0b3JTZXBhcmF0b3InLFxuICBhbGlnblNlbGY6ICdzdHJldGNoJyxcbiAgd2lkdGg6IDEsXG4gIC4uLih1bnN0eWxlZFxuICAgID8ge31cbiAgICA6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpc0Rpc2FibGVkID8gY29sb3JzLm5ldXRyYWwxMCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gICAgICAgIG1hcmdpbkJvdHRvbTogYmFzZVVuaXQgKiAyLFxuICAgICAgICBtYXJnaW5Ub3A6IGJhc2VVbml0ICogMixcbiAgICAgIH0pLFxufSk7XG5cbmV4cG9ydCBjb25zdCBJbmRpY2F0b3JTZXBhcmF0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHByb3BzOiBJbmRpY2F0b3JTZXBhcmF0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgaW5uZXJQcm9wcyB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPHNwYW5cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgey4uLmdldFN0eWxlUHJvcHMocHJvcHMsICdpbmRpY2F0b3JTZXBhcmF0b3InLCB7XG4gICAgICAgICdpbmRpY2F0b3Itc2VwYXJhdG9yJzogdHJ1ZSxcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59O1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIExvYWRpbmdcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBsb2FkaW5nRG90QW5pbWF0aW9ucyA9IGtleWZyYW1lc2BcbiAgMCUsIDgwJSwgMTAwJSB7IG9wYWNpdHk6IDA7IH1cbiAgNDAlIHsgb3BhY2l0eTogMTsgfVxuYDtcblxuZXhwb3J0IGNvbnN0IGxvYWRpbmdJbmRpY2F0b3JDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0ZvY3VzZWQsXG4gICAgc2l6ZSxcbiAgICB0aGVtZToge1xuICAgICAgY29sb3JzLFxuICAgICAgc3BhY2luZzogeyBiYXNlVW5pdCB9LFxuICAgIH0sXG4gIH06IExvYWRpbmdJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPixcbiAgdW5zdHlsZWQ6IGJvb2xlYW5cbik6IENTU09iamVjdFdpdGhMYWJlbCA9PiAoe1xuICBsYWJlbDogJ2xvYWRpbmdJbmRpY2F0b3InLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHRyYW5zaXRpb246ICdjb2xvciAxNTBtcycsXG4gIGFsaWduU2VsZjogJ2NlbnRlcicsXG4gIGZvbnRTaXplOiBzaXplLFxuICBsaW5lSGVpZ2h0OiAxLFxuICBtYXJnaW5SaWdodDogc2l6ZSxcbiAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgdmVydGljYWxBbGlnbjogJ21pZGRsZScsXG4gIC4uLih1bnN0eWxlZFxuICAgID8ge31cbiAgICA6IHtcbiAgICAgICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgICAgICBwYWRkaW5nOiBiYXNlVW5pdCAqIDIsXG4gICAgICB9KSxcbn0pO1xuXG5pbnRlcmZhY2UgTG9hZGluZ0RvdFByb3BzIHtcbiAgZGVsYXk6IG51bWJlcjtcbiAgb2Zmc2V0OiBib29sZWFuO1xufVxuY29uc3QgTG9hZGluZ0RvdCA9ICh7IGRlbGF5LCBvZmZzZXQgfTogTG9hZGluZ0RvdFByb3BzKSA9PiAoXG4gIDxzcGFuXG4gICAgY3NzPXt7XG4gICAgICBhbmltYXRpb246IGAke2xvYWRpbmdEb3RBbmltYXRpb25zfSAxcyBlYXNlLWluLW91dCAke2RlbGF5fW1zIGluZmluaXRlO2AsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjdXJyZW50Q29sb3InLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMWVtJyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgbWFyZ2luTGVmdDogb2Zmc2V0ID8gJzFlbScgOiB1bmRlZmluZWQsXG4gICAgICBoZWlnaHQ6ICcxZW0nLFxuICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICB3aWR0aDogJzFlbScsXG4gICAgfX1cbiAgLz5cbik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGluZ0luZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xuICAvKiogU2V0IHNpemUgb2YgdGhlIGNvbnRhaW5lci4gKi9cbiAgc2l6ZTogbnVtYmVyO1xufVxuZXhwb3J0IGNvbnN0IExvYWRpbmdJbmRpY2F0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oe1xuICBpbm5lclByb3BzLFxuICBpc1J0bCxcbiAgc2l6ZSA9IDQsXG4gIC4uLnJlc3RQcm9wc1xufTogTG9hZGluZ0luZGljYXRvclByb3BzPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgey4uLmdldFN0eWxlUHJvcHMoXG4gICAgICAgIHsgLi4ucmVzdFByb3BzLCBpbm5lclByb3BzLCBpc1J0bCwgc2l6ZSB9LFxuICAgICAgICAnbG9hZGluZ0luZGljYXRvcicsXG4gICAgICAgIHtcbiAgICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICAgJ2xvYWRpbmctaW5kaWNhdG9yJzogdHJ1ZSxcbiAgICAgICAgfVxuICAgICAgKX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXswfSBvZmZzZXQ9e2lzUnRsfSAvPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezE2MH0gb2Zmc2V0IC8+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MzIwfSBvZmZzZXQ9eyFpc1J0bH0gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0= */",
	toString: _EMOTION_STRINGIFIED_CSS_ERROR__$3
};
var Svg = function Svg(_ref) {
	var size = _ref.size, props = _objectWithoutProperties(_ref, _excluded$2);
	return jsx("svg", _extends({
		height: size,
		width: size,
		viewBox: "0 0 20 20",
		"aria-hidden": "true",
		focusable: "false",
		css: _ref2$2
	}, props));
};
var CrossIcon = function CrossIcon(props) {
	return jsx(Svg, _extends({ size: 20 }, props), jsx("path", { d: "M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" }));
};
var DownChevron = function DownChevron(props) {
	return jsx(Svg, _extends({ size: 20 }, props), jsx("path", { d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" }));
};
var baseCSS = function baseCSS(_ref3, unstyled) {
	var isFocused = _ref3.isFocused, _ref3$theme = _ref3.theme, baseUnit = _ref3$theme.spacing.baseUnit, colors = _ref3$theme.colors;
	return _objectSpread2({
		label: "indicatorContainer",
		display: "flex",
		transition: "color 150ms"
	}, unstyled ? {} : {
		color: isFocused ? colors.neutral60 : colors.neutral20,
		padding: baseUnit * 2,
		":hover": { color: isFocused ? colors.neutral80 : colors.neutral40 }
	});
};
var dropdownIndicatorCSS = baseCSS;
var DropdownIndicator = function DropdownIndicator(props) {
	var children = props.children, innerProps = props.innerProps;
	return jsx("div", _extends({}, getStyleProps(props, "dropdownIndicator", {
		indicator: true,
		"dropdown-indicator": true
	}), innerProps), children || jsx(DownChevron, null));
};
var clearIndicatorCSS = baseCSS;
var ClearIndicator = function ClearIndicator(props) {
	var children = props.children, innerProps = props.innerProps;
	return jsx("div", _extends({}, getStyleProps(props, "clearIndicator", {
		indicator: true,
		"clear-indicator": true
	}), innerProps), children || jsx(CrossIcon, null));
};
var indicatorSeparatorCSS = function indicatorSeparatorCSS(_ref4, unstyled) {
	var isDisabled = _ref4.isDisabled, _ref4$theme = _ref4.theme, baseUnit = _ref4$theme.spacing.baseUnit, colors = _ref4$theme.colors;
	return _objectSpread2({
		label: "indicatorSeparator",
		alignSelf: "stretch",
		width: 1
	}, unstyled ? {} : {
		backgroundColor: isDisabled ? colors.neutral10 : colors.neutral20,
		marginBottom: baseUnit * 2,
		marginTop: baseUnit * 2
	});
};
var IndicatorSeparator = function IndicatorSeparator(props) {
	var innerProps = props.innerProps;
	return jsx("span", _extends({}, innerProps, getStyleProps(props, "indicatorSeparator", { "indicator-separator": true })));
};
var loadingDotAnimations = keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  0%, 80%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n"])));
var loadingIndicatorCSS = function loadingIndicatorCSS(_ref5, unstyled) {
	var isFocused = _ref5.isFocused, size = _ref5.size, _ref5$theme = _ref5.theme, colors = _ref5$theme.colors, baseUnit = _ref5$theme.spacing.baseUnit;
	return _objectSpread2({
		label: "loadingIndicator",
		display: "flex",
		transition: "color 150ms",
		alignSelf: "center",
		fontSize: size,
		lineHeight: 1,
		marginRight: size,
		textAlign: "center",
		verticalAlign: "middle"
	}, unstyled ? {} : {
		color: isFocused ? colors.neutral60 : colors.neutral20,
		padding: baseUnit * 2
	});
};
var LoadingDot = function LoadingDot(_ref6) {
	var delay = _ref6.delay, offset = _ref6.offset;
	return jsx("span", { css: /* @__PURE__ */ css$2({
		animation: "".concat(loadingDotAnimations, " 1s ease-in-out ").concat(delay, "ms infinite;"),
		backgroundColor: "currentColor",
		borderRadius: "1em",
		display: "inline-block",
		marginLeft: offset ? "1em" : void 0,
		height: "1em",
		verticalAlign: "top",
		width: "1em"
	}, ";label:LoadingDot;", "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1RSSIsImZpbGUiOiJpbmRpY2F0b3JzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgSlNYLCBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3gsIGtleWZyYW1lcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuaW1wb3J0IHtcbiAgQ29tbW9uUHJvcHNBbmRDbGFzc05hbWUsXG4gIENTU09iamVjdFdpdGhMYWJlbCxcbiAgR3JvdXBCYXNlLFxufSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBnZXRTdHlsZVByb3BzIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgSWNvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBTdmcgPSAoe1xuICBzaXplLFxuICAuLi5wcm9wc1xufTogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzdmcnXSAmIHsgc2l6ZTogbnVtYmVyIH0pID0+IChcbiAgPHN2Z1xuICAgIGhlaWdodD17c2l6ZX1cbiAgICB3aWR0aD17c2l6ZX1cbiAgICB2aWV3Qm94PVwiMCAwIDIwIDIwXCJcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgIGZvY3VzYWJsZT1cImZhbHNlXCJcbiAgICBjc3M9e3tcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgZmlsbDogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgc3Ryb2tlOiAnY3VycmVudENvbG9yJyxcbiAgICAgIHN0cm9rZVdpZHRoOiAwLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IHR5cGUgQ3Jvc3NJY29uUHJvcHMgPSBKU1guSW50cmluc2ljRWxlbWVudHNbJ3N2ZyddICYgeyBzaXplPzogbnVtYmVyIH07XG5leHBvcnQgY29uc3QgQ3Jvc3NJY29uID0gKHByb3BzOiBDcm9zc0ljb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNMTQuMzQ4IDE0Ljg0OWMtMC40NjkgMC40NjktMS4yMjkgMC40NjktMS42OTcgMGwtMi42NTEtMy4wMzAtMi42NTEgMy4wMjljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDAtMC40NjktMC40NjktMC40NjktMS4yMjkgMC0xLjY5N2wyLjc1OC0zLjE1LTIuNzU5LTMuMTUyYy0wLjQ2OS0wLjQ2OS0wLjQ2OS0xLjIyOCAwLTEuNjk3czEuMjI4LTAuNDY5IDEuNjk3IDBsMi42NTIgMy4wMzEgMi42NTEtMy4wMzFjMC40NjktMC40NjkgMS4yMjgtMC40NjkgMS42OTcgMHMwLjQ2OSAxLjIyOSAwIDEuNjk3bC0yLjc1OCAzLjE1MiAyLjc1OCAzLjE1YzAuNDY5IDAuNDY5IDAuNDY5IDEuMjI5IDAgMS42OTh6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuZXhwb3J0IHR5cGUgRG93bkNoZXZyb25Qcm9wcyA9IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3ZnJ10gJiB7IHNpemU/OiBudW1iZXIgfTtcbmV4cG9ydCBjb25zdCBEb3duQ2hldnJvbiA9IChwcm9wczogRG93bkNoZXZyb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNNC41MTYgNy41NDhjMC40MzYtMC40NDYgMS4wNDMtMC40ODEgMS41NzYgMGwzLjkwOCAzLjc0NyAzLjkwOC0zLjc0N2MwLjUzMy0wLjQ4MSAxLjE0MS0wLjQ0NiAxLjU3NCAwIDAuNDM2IDAuNDQ1IDAuNDA4IDEuMTk3IDAgMS42MTUtMC40MDYgMC40MTgtNC42OTUgNC41MDItNC42OTUgNC41MDItMC4yMTcgMC4yMjMtMC41MDIgMC4zMzUtMC43ODcgMC4zMzVzLTAuNTctMC4xMTItMC43ODktMC4zMzVjMCAwLTQuMjg3LTQuMDg0LTQuNjk1LTQuNTAycy0wLjQzNi0xLjE3IDAtMS42MTV6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgQnV0dG9uc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIC8qKiBUaGUgY2hpbGRyZW4gdG8gYmUgcmVuZGVyZWQgaW5zaWRlIHRoZSBpbmRpY2F0b3IuICovXG4gIGNoaWxkcmVuPzogUmVhY3ROb2RlO1xuICAvKiogUHJvcHMgdGhhdCB3aWxsIGJlIHBhc3NlZCBvbiB0byB0aGUgY2hpbGRyZW4uICovXG4gIGlubmVyUHJvcHM6IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snZGl2J107XG4gIC8qKiBUaGUgZm9jdXNlZCBzdGF0ZSBvZiB0aGUgc2VsZWN0LiAqL1xuICBpc0ZvY3VzZWQ6IGJvb2xlYW47XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG59XG5cbmNvbnN0IGJhc2VDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0ZvY3VzZWQsXG4gICAgdGhlbWU6IHtcbiAgICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICAgIGNvbG9ycyxcbiAgICB9LFxuICB9OlxuICAgIHwgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuICAgIHwgQ2xlYXJJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPixcbiAgdW5zdHlsZWQ6IGJvb2xlYW5cbik6IENTU09iamVjdFdpdGhMYWJlbCA9PiAoe1xuICBsYWJlbDogJ2luZGljYXRvckNvbnRhaW5lcicsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgdHJhbnNpdGlvbjogJ2NvbG9yIDE1MG1zJyxcbiAgLi4uKHVuc3R5bGVkXG4gICAgPyB7fVxuICAgIDoge1xuICAgICAgICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw2MCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gICAgICAgIHBhZGRpbmc6IGJhc2VVbml0ICogMixcbiAgICAgICAgJzpob3Zlcic6IHtcbiAgICAgICAgICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw4MCA6IGNvbG9ycy5uZXV0cmFsNDAsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbn0pO1xuXG5leHBvcnQgY29uc3QgZHJvcGRvd25JbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xuZXhwb3J0IGNvbnN0IERyb3Bkb3duSW5kaWNhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogRHJvcGRvd25JbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgY2hpbGRyZW4sIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKHByb3BzLCAnZHJvcGRvd25JbmRpY2F0b3InLCB7XG4gICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgJ2Ryb3Bkb3duLWluZGljYXRvcic6IHRydWUsXG4gICAgICB9KX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8RG93bkNoZXZyb24gLz59XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIENsZWFySW5kaWNhdG9yUHJvcHM8XG4gIE9wdGlvbiA9IHVua25vd24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuID0gYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPiA9IEdyb3VwQmFzZTxPcHRpb24+XG4+IGV4dGVuZHMgQ29tbW9uUHJvcHNBbmRDbGFzc05hbWU8T3B0aW9uLCBJc011bHRpLCBHcm91cD4ge1xuICAvKiogVGhlIGNoaWxkcmVuIHRvIGJlIHJlbmRlcmVkIGluc2lkZSB0aGUgaW5kaWNhdG9yLiAqL1xuICBjaGlsZHJlbj86IFJlYWN0Tm9kZTtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgY2xlYXJJbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xuZXhwb3J0IGNvbnN0IENsZWFySW5kaWNhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogQ2xlYXJJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgY2hpbGRyZW4sIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKHByb3BzLCAnY2xlYXJJbmRpY2F0b3InLCB7XG4gICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgJ2NsZWFyLWluZGljYXRvcic6IHRydWUsXG4gICAgICB9KX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8Q3Jvc3NJY29uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTZXBhcmF0b3Jcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgaW50ZXJmYWNlIEluZGljYXRvclNlcGFyYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgaXNEaXNhYmxlZDogYm9vbGVhbjtcbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpbm5lclByb3BzPzogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ107XG59XG5cbmV4cG9ydCBjb25zdCBpbmRpY2F0b3JTZXBhcmF0b3JDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0Rpc2FibGVkLFxuICAgIHRoZW1lOiB7XG4gICAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gICAgICBjb2xvcnMsXG4gICAgfSxcbiAgfTogSW5kaWNhdG9yU2VwYXJhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4sXG4gIHVuc3R5bGVkOiBib29sZWFuXG4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdpbmRpY2F0b3JTZXBhcmF0b3InLFxuICBhbGlnblNlbGY6ICdzdHJldGNoJyxcbiAgd2lkdGg6IDEsXG4gIC4uLih1bnN0eWxlZFxuICAgID8ge31cbiAgICA6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpc0Rpc2FibGVkID8gY29sb3JzLm5ldXRyYWwxMCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gICAgICAgIG1hcmdpbkJvdHRvbTogYmFzZVVuaXQgKiAyLFxuICAgICAgICBtYXJnaW5Ub3A6IGJhc2VVbml0ICogMixcbiAgICAgIH0pLFxufSk7XG5cbmV4cG9ydCBjb25zdCBJbmRpY2F0b3JTZXBhcmF0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHByb3BzOiBJbmRpY2F0b3JTZXBhcmF0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgaW5uZXJQcm9wcyB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPHNwYW5cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgey4uLmdldFN0eWxlUHJvcHMocHJvcHMsICdpbmRpY2F0b3JTZXBhcmF0b3InLCB7XG4gICAgICAgICdpbmRpY2F0b3Itc2VwYXJhdG9yJzogdHJ1ZSxcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59O1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIExvYWRpbmdcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBsb2FkaW5nRG90QW5pbWF0aW9ucyA9IGtleWZyYW1lc2BcbiAgMCUsIDgwJSwgMTAwJSB7IG9wYWNpdHk6IDA7IH1cbiAgNDAlIHsgb3BhY2l0eTogMTsgfVxuYDtcblxuZXhwb3J0IGNvbnN0IGxvYWRpbmdJbmRpY2F0b3JDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0ZvY3VzZWQsXG4gICAgc2l6ZSxcbiAgICB0aGVtZToge1xuICAgICAgY29sb3JzLFxuICAgICAgc3BhY2luZzogeyBiYXNlVW5pdCB9LFxuICAgIH0sXG4gIH06IExvYWRpbmdJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPixcbiAgdW5zdHlsZWQ6IGJvb2xlYW5cbik6IENTU09iamVjdFdpdGhMYWJlbCA9PiAoe1xuICBsYWJlbDogJ2xvYWRpbmdJbmRpY2F0b3InLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHRyYW5zaXRpb246ICdjb2xvciAxNTBtcycsXG4gIGFsaWduU2VsZjogJ2NlbnRlcicsXG4gIGZvbnRTaXplOiBzaXplLFxuICBsaW5lSGVpZ2h0OiAxLFxuICBtYXJnaW5SaWdodDogc2l6ZSxcbiAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgdmVydGljYWxBbGlnbjogJ21pZGRsZScsXG4gIC4uLih1bnN0eWxlZFxuICAgID8ge31cbiAgICA6IHtcbiAgICAgICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgICAgICBwYWRkaW5nOiBiYXNlVW5pdCAqIDIsXG4gICAgICB9KSxcbn0pO1xuXG5pbnRlcmZhY2UgTG9hZGluZ0RvdFByb3BzIHtcbiAgZGVsYXk6IG51bWJlcjtcbiAgb2Zmc2V0OiBib29sZWFuO1xufVxuY29uc3QgTG9hZGluZ0RvdCA9ICh7IGRlbGF5LCBvZmZzZXQgfTogTG9hZGluZ0RvdFByb3BzKSA9PiAoXG4gIDxzcGFuXG4gICAgY3NzPXt7XG4gICAgICBhbmltYXRpb246IGAke2xvYWRpbmdEb3RBbmltYXRpb25zfSAxcyBlYXNlLWluLW91dCAke2RlbGF5fW1zIGluZmluaXRlO2AsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjdXJyZW50Q29sb3InLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMWVtJyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgbWFyZ2luTGVmdDogb2Zmc2V0ID8gJzFlbScgOiB1bmRlZmluZWQsXG4gICAgICBoZWlnaHQ6ICcxZW0nLFxuICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICB3aWR0aDogJzFlbScsXG4gICAgfX1cbiAgLz5cbik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGluZ0luZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xuICAvKiogU2V0IHNpemUgb2YgdGhlIGNvbnRhaW5lci4gKi9cbiAgc2l6ZTogbnVtYmVyO1xufVxuZXhwb3J0IGNvbnN0IExvYWRpbmdJbmRpY2F0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oe1xuICBpbm5lclByb3BzLFxuICBpc1J0bCxcbiAgc2l6ZSA9IDQsXG4gIC4uLnJlc3RQcm9wc1xufTogTG9hZGluZ0luZGljYXRvclByb3BzPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgey4uLmdldFN0eWxlUHJvcHMoXG4gICAgICAgIHsgLi4ucmVzdFByb3BzLCBpbm5lclByb3BzLCBpc1J0bCwgc2l6ZSB9LFxuICAgICAgICAnbG9hZGluZ0luZGljYXRvcicsXG4gICAgICAgIHtcbiAgICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICAgJ2xvYWRpbmctaW5kaWNhdG9yJzogdHJ1ZSxcbiAgICAgICAgfVxuICAgICAgKX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXswfSBvZmZzZXQ9e2lzUnRsfSAvPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezE2MH0gb2Zmc2V0IC8+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MzIwfSBvZmZzZXQ9eyFpc1J0bH0gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0= */") });
};
var LoadingIndicator = function LoadingIndicator(_ref7) {
	var innerProps = _ref7.innerProps, isRtl = _ref7.isRtl, _ref7$size = _ref7.size, size = _ref7$size === void 0 ? 4 : _ref7$size;
	return jsx("div", _extends({}, getStyleProps(_objectSpread2(_objectSpread2({}, _objectWithoutProperties(_ref7, _excluded2)), {}, {
		innerProps,
		isRtl,
		size
	}), "loadingIndicator", {
		indicator: true,
		"loading-indicator": true
	}), innerProps), jsx(LoadingDot, {
		delay: 0,
		offset: isRtl
	}), jsx(LoadingDot, {
		delay: 160,
		offset: true
	}), jsx(LoadingDot, {
		delay: 320,
		offset: !isRtl
	}));
};
var css$1 = function css(_ref, unstyled) {
	var isDisabled = _ref.isDisabled, isFocused = _ref.isFocused, _ref$theme = _ref.theme, colors = _ref$theme.colors, borderRadius = _ref$theme.borderRadius, spacing = _ref$theme.spacing;
	return _objectSpread2({
		label: "control",
		alignItems: "center",
		cursor: "default",
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-between",
		minHeight: spacing.controlHeight,
		outline: "0 !important",
		position: "relative",
		transition: "all 100ms"
	}, unstyled ? {} : {
		backgroundColor: isDisabled ? colors.neutral5 : colors.neutral0,
		borderColor: isDisabled ? colors.neutral10 : isFocused ? colors.primary : colors.neutral20,
		borderRadius,
		borderStyle: "solid",
		borderWidth: 1,
		boxShadow: isFocused ? "0 0 0 1px ".concat(colors.primary) : void 0,
		"&:hover": { borderColor: isFocused ? colors.primary : colors.neutral30 }
	});
};
var Control$1 = function Control(props) {
	var children = props.children, isDisabled = props.isDisabled, isFocused = props.isFocused, innerRef = props.innerRef, innerProps = props.innerProps, menuIsOpen = props.menuIsOpen;
	return jsx("div", _extends({ ref: innerRef }, getStyleProps(props, "control", {
		control: true,
		"control--is-disabled": isDisabled,
		"control--is-focused": isFocused,
		"control--menu-is-open": menuIsOpen
	}), innerProps, { "aria-disabled": isDisabled || void 0 }), children);
};
var _excluded$1 = ["data"];
var groupCSS = function groupCSS(_ref, unstyled) {
	var spacing = _ref.theme.spacing;
	return unstyled ? {} : {
		paddingBottom: spacing.baseUnit * 2,
		paddingTop: spacing.baseUnit * 2
	};
};
var Group = function Group(props) {
	var children = props.children, cx = props.cx, getStyles = props.getStyles, getClassNames = props.getClassNames, Heading = props.Heading, headingProps = props.headingProps, innerProps = props.innerProps, label = props.label, theme = props.theme, selectProps = props.selectProps;
	return jsx("div", _extends({}, getStyleProps(props, "group", { group: true }), innerProps), jsx(Heading, _extends({}, headingProps, {
		selectProps,
		theme,
		getStyles,
		getClassNames,
		cx
	}), label), jsx("div", null, children));
};
var groupHeadingCSS = function groupHeadingCSS(_ref2, unstyled) {
	var _ref2$theme = _ref2.theme, colors = _ref2$theme.colors, spacing = _ref2$theme.spacing;
	return _objectSpread2({
		label: "group",
		cursor: "default",
		display: "block"
	}, unstyled ? {} : {
		color: colors.neutral40,
		fontSize: "75%",
		fontWeight: 500,
		marginBottom: "0.25em",
		paddingLeft: spacing.baseUnit * 3,
		paddingRight: spacing.baseUnit * 3,
		textTransform: "uppercase"
	});
};
var GroupHeading = function GroupHeading(props) {
	var _cleanCommonProps = cleanCommonProps(props);
	_cleanCommonProps.data;
	var innerProps = _objectWithoutProperties(_cleanCommonProps, _excluded$1);
	return jsx("div", _extends({}, getStyleProps(props, "groupHeading", { "group-heading": true }), innerProps));
};
var Group$1 = Group;
var _excluded$5 = [
	"innerRef",
	"isDisabled",
	"isHidden",
	"inputClassName"
];
var inputCSS = function inputCSS(_ref, unstyled) {
	var isDisabled = _ref.isDisabled, value = _ref.value, _ref$theme = _ref.theme, spacing = _ref$theme.spacing, colors = _ref$theme.colors;
	return _objectSpread2(_objectSpread2({
		visibility: isDisabled ? "hidden" : "visible",
		transform: value ? "translateZ(0)" : ""
	}, containerStyle), unstyled ? {} : {
		margin: spacing.baseUnit / 2,
		paddingBottom: spacing.baseUnit / 2,
		paddingTop: spacing.baseUnit / 2,
		color: colors.neutral80
	});
};
var spacingStyle = {
	gridArea: "1 / 2",
	font: "inherit",
	minWidth: "2px",
	border: 0,
	margin: 0,
	outline: 0,
	padding: 0
};
var containerStyle = {
	flex: "1 1 auto",
	display: "inline-grid",
	gridArea: "1 / 1 / 2 / 3",
	gridTemplateColumns: "0 min-content",
	"&:after": _objectSpread2({
		content: "attr(data-value) \" \"",
		visibility: "hidden",
		whiteSpace: "pre"
	}, spacingStyle)
};
var inputStyle = function inputStyle(isHidden) {
	return _objectSpread2({
		label: "input",
		color: "inherit",
		background: 0,
		opacity: isHidden ? 0 : 1,
		width: "100%"
	}, spacingStyle);
};
var Input$1 = function Input(props) {
	var cx = props.cx, value = props.value;
	var _cleanCommonProps = cleanCommonProps(props), innerRef = _cleanCommonProps.innerRef, isDisabled = _cleanCommonProps.isDisabled, isHidden = _cleanCommonProps.isHidden, inputClassName = _cleanCommonProps.inputClassName, innerProps = _objectWithoutProperties(_cleanCommonProps, _excluded$5);
	return jsx("div", _extends({}, getStyleProps(props, "input", { "input-container": true }), { "data-value": value || "" }), jsx("input", _extends({
		className: cx({ input: true }, inputClassName),
		ref: innerRef,
		style: inputStyle(isHidden),
		disabled: isDisabled
	}, innerProps)));
};
var multiValueCSS = function multiValueCSS(_ref, unstyled) {
	var _ref$theme = _ref.theme, spacing = _ref$theme.spacing, borderRadius = _ref$theme.borderRadius, colors = _ref$theme.colors;
	return _objectSpread2({
		label: "multiValue",
		display: "flex",
		minWidth: 0
	}, unstyled ? {} : {
		backgroundColor: colors.neutral10,
		borderRadius: borderRadius / 2,
		margin: spacing.baseUnit / 2
	});
};
var multiValueLabelCSS = function multiValueLabelCSS(_ref2, unstyled) {
	var _ref2$theme = _ref2.theme, borderRadius = _ref2$theme.borderRadius, colors = _ref2$theme.colors, cropWithEllipsis = _ref2.cropWithEllipsis;
	return _objectSpread2({
		overflow: "hidden",
		textOverflow: cropWithEllipsis || cropWithEllipsis === void 0 ? "ellipsis" : void 0,
		whiteSpace: "nowrap"
	}, unstyled ? {} : {
		borderRadius: borderRadius / 2,
		color: colors.neutral80,
		fontSize: "85%",
		padding: 3,
		paddingLeft: 6
	});
};
var multiValueRemoveCSS = function multiValueRemoveCSS(_ref3, unstyled) {
	var _ref3$theme = _ref3.theme, spacing = _ref3$theme.spacing, borderRadius = _ref3$theme.borderRadius, colors = _ref3$theme.colors, isFocused = _ref3.isFocused;
	return _objectSpread2({
		alignItems: "center",
		display: "flex"
	}, unstyled ? {} : {
		borderRadius: borderRadius / 2,
		backgroundColor: isFocused ? colors.dangerLight : void 0,
		paddingLeft: spacing.baseUnit,
		paddingRight: spacing.baseUnit,
		":hover": {
			backgroundColor: colors.dangerLight,
			color: colors.danger
		}
	});
};
var MultiValueGeneric = function MultiValueGeneric(_ref4) {
	var children = _ref4.children, innerProps = _ref4.innerProps;
	return jsx("div", innerProps, children);
};
var MultiValueContainer = MultiValueGeneric;
var MultiValueLabel = MultiValueGeneric;
function MultiValueRemove(_ref5) {
	var children = _ref5.children, innerProps = _ref5.innerProps;
	return jsx("div", _extends({ role: "button" }, innerProps), children || jsx(CrossIcon, { size: 14 }));
}
var MultiValue$1 = function MultiValue(props) {
	var children = props.children, components = props.components, data = props.data, innerProps = props.innerProps, isDisabled = props.isDisabled, removeProps = props.removeProps, selectProps = props.selectProps;
	var Container = components.Container, Label = components.Label, Remove = components.Remove;
	return jsx(Container, {
		data,
		innerProps: _objectSpread2(_objectSpread2({}, getStyleProps(props, "multiValue", {
			"multi-value": true,
			"multi-value--is-disabled": isDisabled
		})), innerProps),
		selectProps
	}, jsx(Label, {
		data,
		innerProps: _objectSpread2({}, getStyleProps(props, "multiValueLabel", { "multi-value__label": true })),
		selectProps
	}, children), jsx(Remove, {
		data,
		innerProps: _objectSpread2(_objectSpread2({}, getStyleProps(props, "multiValueRemove", { "multi-value__remove": true })), {}, { "aria-label": "Remove ".concat(children || "option") }, removeProps),
		selectProps
	}));
};
var optionCSS = function optionCSS(_ref, unstyled) {
	var isDisabled = _ref.isDisabled, isFocused = _ref.isFocused, isSelected = _ref.isSelected, _ref$theme = _ref.theme, spacing = _ref$theme.spacing, colors = _ref$theme.colors;
	return _objectSpread2({
		label: "option",
		cursor: "default",
		display: "block",
		fontSize: "inherit",
		width: "100%",
		userSelect: "none",
		WebkitTapHighlightColor: "rgba(0, 0, 0, 0)"
	}, unstyled ? {} : {
		backgroundColor: isSelected ? colors.primary : isFocused ? colors.primary25 : "transparent",
		color: isDisabled ? colors.neutral20 : isSelected ? colors.neutral0 : "inherit",
		padding: "".concat(spacing.baseUnit * 2, "px ").concat(spacing.baseUnit * 3, "px"),
		":active": { backgroundColor: !isDisabled ? isSelected ? colors.primary : colors.primary50 : void 0 }
	});
};
var Option$1 = function Option(props) {
	var children = props.children, isDisabled = props.isDisabled, isFocused = props.isFocused, isSelected = props.isSelected, innerRef = props.innerRef, innerProps = props.innerProps;
	return jsx("div", _extends({}, getStyleProps(props, "option", {
		option: true,
		"option--is-disabled": isDisabled,
		"option--is-focused": isFocused,
		"option--is-selected": isSelected
	}), {
		ref: innerRef,
		"aria-disabled": isDisabled
	}, innerProps), children);
};
var placeholderCSS = function placeholderCSS(_ref, unstyled) {
	var _ref$theme = _ref.theme, spacing = _ref$theme.spacing, colors = _ref$theme.colors;
	return _objectSpread2({
		label: "placeholder",
		gridArea: "1 / 1 / 2 / 3"
	}, unstyled ? {} : {
		color: colors.neutral50,
		marginLeft: spacing.baseUnit / 2,
		marginRight: spacing.baseUnit / 2
	});
};
var Placeholder$1 = function Placeholder(props) {
	var children = props.children, innerProps = props.innerProps;
	return jsx("div", _extends({}, getStyleProps(props, "placeholder", { placeholder: true }), innerProps), children);
};
var css = function css(_ref, unstyled) {
	var isDisabled = _ref.isDisabled, _ref$theme = _ref.theme, spacing = _ref$theme.spacing, colors = _ref$theme.colors;
	return _objectSpread2({
		label: "singleValue",
		gridArea: "1 / 1 / 2 / 3",
		maxWidth: "100%",
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap"
	}, unstyled ? {} : {
		color: isDisabled ? colors.neutral40 : colors.neutral80,
		marginLeft: spacing.baseUnit / 2,
		marginRight: spacing.baseUnit / 2
	});
};
var components = {
	ClearIndicator,
	Control: Control$1,
	DropdownIndicator,
	DownChevron,
	CrossIcon,
	Group: Group$1,
	GroupHeading,
	IndicatorsContainer,
	IndicatorSeparator,
	Input: Input$1,
	LoadingIndicator,
	Menu: Menu$1,
	MenuList,
	MenuPortal,
	LoadingMessage,
	NoOptionsMessage,
	MultiValue: MultiValue$1,
	MultiValueContainer,
	MultiValueLabel,
	MultiValueRemove,
	Option: Option$1,
	Placeholder: Placeholder$1,
	SelectContainer,
	SingleValue: function SingleValue(props) {
		var children = props.children, isDisabled = props.isDisabled, innerProps = props.innerProps;
		return jsx("div", _extends({}, getStyleProps(props, "singleValue", {
			"single-value": true,
			"single-value--is-disabled": isDisabled
		}), innerProps), children);
	},
	ValueContainer
};
var defaultComponents = function defaultComponents(props) {
	return _objectSpread2(_objectSpread2({}, components), props.components);
};
//#endregion
//#region node_modules/react-select/node_modules/memoize-one/dist/memoize-one.esm.js
var safeIsNaN = Number.isNaN || function ponyfill(value) {
	return typeof value === "number" && value !== value;
};
function isEqual(first, second) {
	if (first === second) return true;
	if (safeIsNaN(first) && safeIsNaN(second)) return true;
	return false;
}
function areInputsEqual(newInputs, lastInputs) {
	if (newInputs.length !== lastInputs.length) return false;
	for (var i = 0; i < newInputs.length; i++) if (!isEqual(newInputs[i], lastInputs[i])) return false;
	return true;
}
function memoizeOne(resultFn, isEqual) {
	if (isEqual === void 0) isEqual = areInputsEqual;
	var cache = null;
	function memoized() {
		var newArgs = [];
		for (var _i = 0; _i < arguments.length; _i++) newArgs[_i] = arguments[_i];
		if (cache && cache.lastThis === this && isEqual(newArgs, cache.lastArgs)) return cache.lastResult;
		var lastResult = resultFn.apply(this, newArgs);
		cache = {
			lastResult,
			lastArgs: newArgs,
			lastThis: this
		};
		return lastResult;
	}
	memoized.clear = function clear() {
		cache = null;
	};
	return memoized;
}
//#endregion
//#region node_modules/react-select/dist/Select-ef7c0426.esm.js
init_extends();
init_objectWithoutProperties();
function _EMOTION_STRINGIFIED_CSS_ERROR__$2() {
	return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var _ref = {
	name: "1f43avz-a11yText-A11yText",
	styles: "label:a11yText;z-index:9999;border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0;white-space:nowrap;label:A11yText;",
	map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkExMXlUZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPSSIsImZpbGUiOiJBMTF5VGV4dC50c3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IEpTWCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGpzeCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLy8gQXNzaXN0aXZlIHRleHQgdG8gZGVzY3JpYmUgdmlzdWFsIGVsZW1lbnRzLiBIaWRkZW4gZm9yIHNpZ2h0ZWQgdXNlcnMuXG5jb25zdCBBMTF5VGV4dCA9IChwcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ10pID0+IChcbiAgPHNwYW5cbiAgICBjc3M9e3tcbiAgICAgIGxhYmVsOiAnYTExeVRleHQnLFxuICAgICAgekluZGV4OiA5OTk5LFxuICAgICAgYm9yZGVyOiAwLFxuICAgICAgY2xpcDogJ3JlY3QoMXB4LCAxcHgsIDFweCwgMXB4KScsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICB3aWR0aDogMSxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgcGFkZGluZzogMCxcbiAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgQTExeVRleHQ7XG4iXX0= */",
	toString: _EMOTION_STRINGIFIED_CSS_ERROR__$2
};
var A11yText$1 = function A11yText(props) {
	return jsx("span", _extends({ css: _ref }, props));
};
var defaultAriaLiveMessages = {
	guidance: function guidance(props) {
		var isSearchable = props.isSearchable, isMulti = props.isMulti, tabSelectsValue = props.tabSelectsValue, context = props.context, isInitialFocus = props.isInitialFocus;
		switch (context) {
			case "menu": return "Use Up and Down to choose options, press Enter to select the currently focused option, press Escape to exit the menu".concat(tabSelectsValue ? ", press Tab to select the option and exit the menu" : "", ".");
			case "input": return isInitialFocus ? "".concat(props["aria-label"] || "Select", " is focused ").concat(isSearchable ? ",type to refine list" : "", ", press Down to open the menu, ").concat(isMulti ? " press left to focus selected values" : "") : "";
			case "value": return "Use left and right to toggle between focused values, press Backspace to remove the currently focused value";
			default: return "";
		}
	},
	onChange: function onChange(props) {
		var action = props.action, _props$label = props.label, label = _props$label === void 0 ? "" : _props$label, labels = props.labels, isDisabled = props.isDisabled;
		switch (action) {
			case "deselect-option":
			case "pop-value":
			case "remove-value": return "option ".concat(label, ", deselected.");
			case "clear": return "All selected options have been cleared.";
			case "initial-input-focus": return "option".concat(labels.length > 1 ? "s" : "", " ").concat(labels.join(","), ", selected.");
			case "select-option": return isDisabled ? "option ".concat(label, " is disabled. Select another option.") : "option ".concat(label, ", selected.");
			default: return "";
		}
	},
	onFocus: function onFocus(props) {
		var context = props.context, focused = props.focused, options = props.options, _props$label2 = props.label, label = _props$label2 === void 0 ? "" : _props$label2, selectValue = props.selectValue, isDisabled = props.isDisabled, isSelected = props.isSelected, isAppleDevice = props.isAppleDevice;
		var getArrayIndex = function getArrayIndex(arr, item) {
			return arr && arr.length ? "".concat(arr.indexOf(item) + 1, " of ").concat(arr.length) : "";
		};
		if (context === "value" && selectValue) return "value ".concat(label, " focused, ").concat(getArrayIndex(selectValue, focused), ".");
		if (context === "menu" && isAppleDevice) {
			var disabled = isDisabled ? " disabled" : "";
			var status = "".concat(isSelected ? " selected" : "").concat(disabled);
			return "".concat(label).concat(status, ", ").concat(getArrayIndex(options, focused), ".");
		}
		return "";
	},
	onFilter: function onFilter(props) {
		var inputValue = props.inputValue, resultsMessage = props.resultsMessage;
		return "".concat(resultsMessage).concat(inputValue ? " for search term " + inputValue : "", ".");
	}
};
var LiveRegion$1 = function LiveRegion(props) {
	var ariaSelection = props.ariaSelection, focusedOption = props.focusedOption, focusedValue = props.focusedValue, focusableOptions = props.focusableOptions, isFocused = props.isFocused, selectValue = props.selectValue, selectProps = props.selectProps, id = props.id, isAppleDevice = props.isAppleDevice;
	var ariaLiveMessages = selectProps.ariaLiveMessages, getOptionLabel = selectProps.getOptionLabel, inputValue = selectProps.inputValue, isMulti = selectProps.isMulti, isOptionDisabled = selectProps.isOptionDisabled, isSearchable = selectProps.isSearchable, menuIsOpen = selectProps.menuIsOpen, options = selectProps.options, screenReaderStatus = selectProps.screenReaderStatus, tabSelectsValue = selectProps.tabSelectsValue, isLoading = selectProps.isLoading;
	var ariaLabel = selectProps["aria-label"];
	var ariaLive = selectProps["aria-live"];
	var messages = (0, import_react.useMemo)(function() {
		return _objectSpread2(_objectSpread2({}, defaultAriaLiveMessages), ariaLiveMessages || {});
	}, [ariaLiveMessages]);
	var ariaSelected = (0, import_react.useMemo)(function() {
		var message = "";
		if (ariaSelection && messages.onChange) {
			var option = ariaSelection.option, selectedOptions = ariaSelection.options, removedValue = ariaSelection.removedValue, removedValues = ariaSelection.removedValues, value = ariaSelection.value;
			var selected = removedValue || option || function asOption(val) {
				return !Array.isArray(val) ? val : null;
			}(value);
			var label = selected ? getOptionLabel(selected) : "";
			var multiSelected = selectedOptions || removedValues || void 0;
			var labels = multiSelected ? multiSelected.map(getOptionLabel) : [];
			var onChangeProps = _objectSpread2({
				isDisabled: selected && isOptionDisabled(selected, selectValue),
				label,
				labels
			}, ariaSelection);
			message = messages.onChange(onChangeProps);
		}
		return message;
	}, [
		ariaSelection,
		messages,
		isOptionDisabled,
		selectValue,
		getOptionLabel
	]);
	var ariaFocused = (0, import_react.useMemo)(function() {
		var focusMsg = "";
		var focused = focusedOption || focusedValue;
		var isSelected = !!(focusedOption && selectValue && selectValue.includes(focusedOption));
		if (focused && messages.onFocus) {
			var onFocusProps = {
				focused,
				label: getOptionLabel(focused),
				isDisabled: isOptionDisabled(focused, selectValue),
				isSelected,
				options: focusableOptions,
				context: focused === focusedOption ? "menu" : "value",
				selectValue,
				isAppleDevice
			};
			focusMsg = messages.onFocus(onFocusProps);
		}
		return focusMsg;
	}, [
		focusedOption,
		focusedValue,
		getOptionLabel,
		isOptionDisabled,
		messages,
		focusableOptions,
		selectValue,
		isAppleDevice
	]);
	var ariaResults = (0, import_react.useMemo)(function() {
		var resultsMsg = "";
		if (menuIsOpen && options.length && !isLoading && messages.onFilter) {
			var resultsMessage = screenReaderStatus({ count: focusableOptions.length });
			resultsMsg = messages.onFilter({
				inputValue,
				resultsMessage
			});
		}
		return resultsMsg;
	}, [
		focusableOptions,
		inputValue,
		menuIsOpen,
		messages,
		options,
		screenReaderStatus,
		isLoading
	]);
	var isInitialFocus = (ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === "initial-input-focus";
	var ariaGuidance = (0, import_react.useMemo)(function() {
		var guidanceMsg = "";
		if (messages.guidance) {
			var context = focusedValue ? "value" : menuIsOpen ? "menu" : "input";
			guidanceMsg = messages.guidance({
				"aria-label": ariaLabel,
				context,
				isDisabled: focusedOption && isOptionDisabled(focusedOption, selectValue),
				isMulti,
				isSearchable,
				tabSelectsValue,
				isInitialFocus
			});
		}
		return guidanceMsg;
	}, [
		ariaLabel,
		focusedOption,
		focusedValue,
		isMulti,
		isOptionDisabled,
		isSearchable,
		menuIsOpen,
		messages,
		selectValue,
		tabSelectsValue,
		isInitialFocus
	]);
	var ScreenReaderText = jsx(import_react.Fragment, null, jsx("span", { id: "aria-selection" }, ariaSelected), jsx("span", { id: "aria-focused" }, ariaFocused), jsx("span", { id: "aria-results" }, ariaResults), jsx("span", { id: "aria-guidance" }, ariaGuidance));
	return jsx(import_react.Fragment, null, jsx(A11yText$1, { id }, isInitialFocus && ScreenReaderText), jsx(A11yText$1, {
		"aria-live": ariaLive,
		"aria-atomic": "false",
		"aria-relevant": "additions text",
		role: "log"
	}, isFocused && !isInitialFocus && ScreenReaderText));
};
var diacritics = [
	{
		base: "A",
		letters: "AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ"
	},
	{
		base: "AA",
		letters: "Ꜳ"
	},
	{
		base: "AE",
		letters: "ÆǼǢ"
	},
	{
		base: "AO",
		letters: "Ꜵ"
	},
	{
		base: "AU",
		letters: "Ꜷ"
	},
	{
		base: "AV",
		letters: "ꜸꜺ"
	},
	{
		base: "AY",
		letters: "Ꜽ"
	},
	{
		base: "B",
		letters: "BⒷＢḂḄḆɃƂƁ"
	},
	{
		base: "C",
		letters: "CⒸＣĆĈĊČÇḈƇȻꜾ"
	},
	{
		base: "D",
		letters: "DⒹＤḊĎḌḐḒḎĐƋƊƉꝹ"
	},
	{
		base: "DZ",
		letters: "ǱǄ"
	},
	{
		base: "Dz",
		letters: "ǲǅ"
	},
	{
		base: "E",
		letters: "EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎ"
	},
	{
		base: "F",
		letters: "FⒻＦḞƑꝻ"
	},
	{
		base: "G",
		letters: "GⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾ"
	},
	{
		base: "H",
		letters: "HⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ"
	},
	{
		base: "I",
		letters: "IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ"
	},
	{
		base: "J",
		letters: "JⒿＪĴɈ"
	},
	{
		base: "K",
		letters: "KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ"
	},
	{
		base: "L",
		letters: "LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ"
	},
	{
		base: "LJ",
		letters: "Ǉ"
	},
	{
		base: "Lj",
		letters: "ǈ"
	},
	{
		base: "M",
		letters: "MⓂＭḾṀṂⱮƜ"
	},
	{
		base: "N",
		letters: "NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤ"
	},
	{
		base: "NJ",
		letters: "Ǌ"
	},
	{
		base: "Nj",
		letters: "ǋ"
	},
	{
		base: "O",
		letters: "OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ"
	},
	{
		base: "OI",
		letters: "Ƣ"
	},
	{
		base: "OO",
		letters: "Ꝏ"
	},
	{
		base: "OU",
		letters: "Ȣ"
	},
	{
		base: "P",
		letters: "PⓅＰṔṖƤⱣꝐꝒꝔ"
	},
	{
		base: "Q",
		letters: "QⓆＱꝖꝘɊ"
	},
	{
		base: "R",
		letters: "RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ"
	},
	{
		base: "S",
		letters: "SⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ"
	},
	{
		base: "T",
		letters: "TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ"
	},
	{
		base: "TZ",
		letters: "Ꜩ"
	},
	{
		base: "U",
		letters: "UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ"
	},
	{
		base: "V",
		letters: "VⓋＶṼṾƲꝞɅ"
	},
	{
		base: "VY",
		letters: "Ꝡ"
	},
	{
		base: "W",
		letters: "WⓌＷẀẂŴẆẄẈⱲ"
	},
	{
		base: "X",
		letters: "XⓍＸẊẌ"
	},
	{
		base: "Y",
		letters: "YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ"
	},
	{
		base: "Z",
		letters: "ZⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ"
	},
	{
		base: "a",
		letters: "aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ"
	},
	{
		base: "aa",
		letters: "ꜳ"
	},
	{
		base: "ae",
		letters: "æǽǣ"
	},
	{
		base: "ao",
		letters: "ꜵ"
	},
	{
		base: "au",
		letters: "ꜷ"
	},
	{
		base: "av",
		letters: "ꜹꜻ"
	},
	{
		base: "ay",
		letters: "ꜽ"
	},
	{
		base: "b",
		letters: "bⓑｂḃḅḇƀƃɓ"
	},
	{
		base: "c",
		letters: "cⓒｃćĉċčçḉƈȼꜿↄ"
	},
	{
		base: "d",
		letters: "dⓓｄḋďḍḑḓḏđƌɖɗꝺ"
	},
	{
		base: "dz",
		letters: "ǳǆ"
	},
	{
		base: "e",
		letters: "eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ"
	},
	{
		base: "f",
		letters: "fⓕｆḟƒꝼ"
	},
	{
		base: "g",
		letters: "gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ"
	},
	{
		base: "h",
		letters: "hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ"
	},
	{
		base: "hv",
		letters: "ƕ"
	},
	{
		base: "i",
		letters: "iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı"
	},
	{
		base: "j",
		letters: "jⓙｊĵǰɉ"
	},
	{
		base: "k",
		letters: "kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ"
	},
	{
		base: "l",
		letters: "lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ"
	},
	{
		base: "lj",
		letters: "ǉ"
	},
	{
		base: "m",
		letters: "mⓜｍḿṁṃɱɯ"
	},
	{
		base: "n",
		letters: "nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ"
	},
	{
		base: "nj",
		letters: "ǌ"
	},
	{
		base: "o",
		letters: "oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ"
	},
	{
		base: "oi",
		letters: "ƣ"
	},
	{
		base: "ou",
		letters: "ȣ"
	},
	{
		base: "oo",
		letters: "ꝏ"
	},
	{
		base: "p",
		letters: "pⓟｐṕṗƥᵽꝑꝓꝕ"
	},
	{
		base: "q",
		letters: "qⓠｑɋꝗꝙ"
	},
	{
		base: "r",
		letters: "rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ"
	},
	{
		base: "s",
		letters: "sⓢｓßśṥŝṡšṧṣṩșşȿꞩꞅẛ"
	},
	{
		base: "t",
		letters: "tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ"
	},
	{
		base: "tz",
		letters: "ꜩ"
	},
	{
		base: "u",
		letters: "uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ"
	},
	{
		base: "v",
		letters: "vⓥｖṽṿʋꝟʌ"
	},
	{
		base: "vy",
		letters: "ꝡ"
	},
	{
		base: "w",
		letters: "wⓦｗẁẃŵẇẅẘẉⱳ"
	},
	{
		base: "x",
		letters: "xⓧｘẋẍ"
	},
	{
		base: "y",
		letters: "yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ"
	},
	{
		base: "z",
		letters: "zⓩｚźẑżžẓẕƶȥɀⱬꝣ"
	}
];
var anyDiacritic = new RegExp("[" + diacritics.map(function(d) {
	return d.letters;
}).join("") + "]", "g");
var diacriticToBase = {};
for (var i = 0; i < diacritics.length; i++) {
	var diacritic = diacritics[i];
	for (var j = 0; j < diacritic.letters.length; j++) diacriticToBase[diacritic.letters[j]] = diacritic.base;
}
var stripDiacritics = function stripDiacritics(str) {
	return str.replace(anyDiacritic, function(match) {
		return diacriticToBase[match];
	});
};
var memoizedStripDiacriticsForInput = memoizeOne(stripDiacritics);
var trimString = function trimString(str) {
	return str.replace(/^\s+|\s+$/g, "");
};
var defaultStringify = function defaultStringify(option) {
	return "".concat(option.label, " ").concat(option.value);
};
var createFilter = function createFilter(config) {
	return function(option, rawInput) {
		if (option.data.__isNew__) return true;
		var _ignoreCase$ignoreAcc = _objectSpread2({
			ignoreCase: true,
			ignoreAccents: true,
			stringify: defaultStringify,
			trim: true,
			matchFrom: "any"
		}, config), ignoreCase = _ignoreCase$ignoreAcc.ignoreCase, ignoreAccents = _ignoreCase$ignoreAcc.ignoreAccents, stringify = _ignoreCase$ignoreAcc.stringify, trim = _ignoreCase$ignoreAcc.trim, matchFrom = _ignoreCase$ignoreAcc.matchFrom;
		var input = trim ? trimString(rawInput) : rawInput;
		var candidate = trim ? trimString(stringify(option)) : stringify(option);
		if (ignoreCase) {
			input = input.toLowerCase();
			candidate = candidate.toLowerCase();
		}
		if (ignoreAccents) {
			input = memoizedStripDiacriticsForInput(input);
			candidate = stripDiacritics(candidate);
		}
		return matchFrom === "start" ? candidate.substr(0, input.length) === input : candidate.indexOf(input) > -1;
	};
};
var _excluded = ["innerRef"];
function DummyInput(_ref) {
	var innerRef = _ref.innerRef;
	var filteredProps = removeProps(_objectWithoutProperties(_ref, _excluded), "onExited", "in", "enter", "exit", "appear");
	return jsx("input", _extends({ ref: innerRef }, filteredProps, { css: /* @__PURE__ */ css$2({
		label: "dummyInput",
		background: 0,
		border: 0,
		caretColor: "transparent",
		fontSize: "inherit",
		gridArea: "1 / 1 / 2 / 3",
		outline: 0,
		padding: 0,
		width: 1,
		color: "transparent",
		left: -100,
		opacity: 0,
		position: "relative",
		transform: "scale(.01)"
	}, ";label:DummyInput;", "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkR1bW15SW5wdXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCTSIsImZpbGUiOiJEdW1teUlucHV0LnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgSlNYLCBSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3ggfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgeyByZW1vdmVQcm9wcyB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRHVtbXlJbnB1dCh7XG4gIGlubmVyUmVmLFxuICAuLi5wcm9wc1xufTogSlNYLkludHJpbnNpY0VsZW1lbnRzWydpbnB1dCddICYge1xuICByZWFkb25seSBpbm5lclJlZjogUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xufSkge1xuICAvLyBSZW1vdmUgYW5pbWF0aW9uIHByb3BzIG5vdCBtZWFudCBmb3IgSFRNTCBlbGVtZW50c1xuICBjb25zdCBmaWx0ZXJlZFByb3BzID0gcmVtb3ZlUHJvcHMoXG4gICAgcHJvcHMsXG4gICAgJ29uRXhpdGVkJyxcbiAgICAnaW4nLFxuICAgICdlbnRlcicsXG4gICAgJ2V4aXQnLFxuICAgICdhcHBlYXInXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8aW5wdXRcbiAgICAgIHJlZj17aW5uZXJSZWZ9XG4gICAgICB7Li4uZmlsdGVyZWRQcm9wc31cbiAgICAgIGNzcz17e1xuICAgICAgICBsYWJlbDogJ2R1bW15SW5wdXQnLFxuICAgICAgICAvLyBnZXQgcmlkIG9mIGFueSBkZWZhdWx0IHN0eWxlc1xuICAgICAgICBiYWNrZ3JvdW5kOiAwLFxuICAgICAgICBib3JkZXI6IDAsXG4gICAgICAgIC8vIGltcG9ydGFudCEgdGhpcyBoaWRlcyB0aGUgZmxhc2hpbmcgY3Vyc29yXG4gICAgICAgIGNhcmV0Q29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgIGZvbnRTaXplOiAnaW5oZXJpdCcsXG4gICAgICAgIGdyaWRBcmVhOiAnMSAvIDEgLyAyIC8gMycsXG4gICAgICAgIG91dGxpbmU6IDAsXG4gICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgIC8vIGltcG9ydGFudCEgd2l0aG91dCBgd2lkdGhgIGJyb3dzZXJzIHdvbid0IGFsbG93IGZvY3VzXG4gICAgICAgIHdpZHRoOiAxLFxuXG4gICAgICAgIC8vIHJlbW92ZSBjdXJzb3Igb24gZGVza3RvcFxuICAgICAgICBjb2xvcjogJ3RyYW5zcGFyZW50JyxcblxuICAgICAgICAvLyByZW1vdmUgY3Vyc29yIG9uIG1vYmlsZSB3aGlsc3QgbWFpbnRhaW5pbmcgXCJzY3JvbGwgaW50byB2aWV3XCIgYmVoYXZpb3VyXG4gICAgICAgIGxlZnQ6IC0xMDAsXG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSguMDEpJyxcbiAgICAgIH19XG4gICAgLz5cbiAgKTtcbn1cbiJdfQ== */") }));
}
var cancelScroll = function cancelScroll(event) {
	if (event.cancelable) event.preventDefault();
	event.stopPropagation();
};
function useScrollCapture(_ref) {
	var isEnabled = _ref.isEnabled, onBottomArrive = _ref.onBottomArrive, onBottomLeave = _ref.onBottomLeave, onTopArrive = _ref.onTopArrive, onTopLeave = _ref.onTopLeave;
	var isBottom = (0, import_react.useRef)(false);
	var isTop = (0, import_react.useRef)(false);
	var touchStart = (0, import_react.useRef)(0);
	var scrollTarget = (0, import_react.useRef)(null);
	var handleEventDelta = (0, import_react.useCallback)(function(event, delta) {
		if (scrollTarget.current === null) return;
		var _scrollTarget$current = scrollTarget.current, scrollTop = _scrollTarget$current.scrollTop, scrollHeight = _scrollTarget$current.scrollHeight, clientHeight = _scrollTarget$current.clientHeight;
		var target = scrollTarget.current;
		var isDeltaPositive = delta > 0;
		var availableScroll = scrollHeight - clientHeight - scrollTop;
		var shouldCancelScroll = false;
		if (availableScroll > delta && isBottom.current) {
			if (onBottomLeave) onBottomLeave(event);
			isBottom.current = false;
		}
		if (isDeltaPositive && isTop.current) {
			if (onTopLeave) onTopLeave(event);
			isTop.current = false;
		}
		if (isDeltaPositive && delta > availableScroll) {
			if (onBottomArrive && !isBottom.current) onBottomArrive(event);
			target.scrollTop = scrollHeight;
			shouldCancelScroll = true;
			isBottom.current = true;
		} else if (!isDeltaPositive && -delta > scrollTop) {
			if (onTopArrive && !isTop.current) onTopArrive(event);
			target.scrollTop = 0;
			shouldCancelScroll = true;
			isTop.current = true;
		}
		if (shouldCancelScroll) cancelScroll(event);
	}, [
		onBottomArrive,
		onBottomLeave,
		onTopArrive,
		onTopLeave
	]);
	var onWheel = (0, import_react.useCallback)(function(event) {
		handleEventDelta(event, event.deltaY);
	}, [handleEventDelta]);
	var onTouchStart = (0, import_react.useCallback)(function(event) {
		touchStart.current = event.changedTouches[0].clientY;
	}, []);
	var onTouchMove = (0, import_react.useCallback)(function(event) {
		handleEventDelta(event, touchStart.current - event.changedTouches[0].clientY);
	}, [handleEventDelta]);
	var startListening = (0, import_react.useCallback)(function(el) {
		if (!el) return;
		var notPassive = supportsPassiveEvents ? { passive: false } : false;
		el.addEventListener("wheel", onWheel, notPassive);
		el.addEventListener("touchstart", onTouchStart, notPassive);
		el.addEventListener("touchmove", onTouchMove, notPassive);
	}, [
		onTouchMove,
		onTouchStart,
		onWheel
	]);
	var stopListening = (0, import_react.useCallback)(function(el) {
		if (!el) return;
		el.removeEventListener("wheel", onWheel, false);
		el.removeEventListener("touchstart", onTouchStart, false);
		el.removeEventListener("touchmove", onTouchMove, false);
	}, [
		onTouchMove,
		onTouchStart,
		onWheel
	]);
	(0, import_react.useEffect)(function() {
		if (!isEnabled) return;
		var element = scrollTarget.current;
		startListening(element);
		return function() {
			stopListening(element);
		};
	}, [
		isEnabled,
		startListening,
		stopListening
	]);
	return function(element) {
		scrollTarget.current = element;
	};
}
var STYLE_KEYS = [
	"boxSizing",
	"height",
	"overflow",
	"paddingRight",
	"position"
];
var LOCK_STYLES = {
	boxSizing: "border-box",
	overflow: "hidden",
	position: "relative",
	height: "100%"
};
function preventTouchMove(e) {
	if (e.cancelable) e.preventDefault();
}
function allowTouchMove(e) {
	e.stopPropagation();
}
function preventInertiaScroll() {
	var top = this.scrollTop;
	var totalScroll = this.scrollHeight;
	var currentScroll = top + this.offsetHeight;
	if (top === 0) this.scrollTop = 1;
	else if (currentScroll === totalScroll) this.scrollTop = top - 1;
}
function isTouchDevice() {
	return "ontouchstart" in window || navigator.maxTouchPoints;
}
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var activeScrollLocks = 0;
var listenerOptions = {
	capture: false,
	passive: false
};
function useScrollLock(_ref) {
	var isEnabled = _ref.isEnabled, _ref$accountForScroll = _ref.accountForScrollbars, accountForScrollbars = _ref$accountForScroll === void 0 ? true : _ref$accountForScroll;
	var originalStyles = (0, import_react.useRef)({});
	var scrollTarget = (0, import_react.useRef)(null);
	var addScrollLock = (0, import_react.useCallback)(function(touchScrollTarget) {
		if (!canUseDOM) return;
		var target = document.body;
		var targetStyle = target && target.style;
		if (accountForScrollbars) STYLE_KEYS.forEach(function(key) {
			var val = targetStyle && targetStyle[key];
			originalStyles.current[key] = val;
		});
		if (accountForScrollbars && activeScrollLocks < 1) {
			var currentPadding = parseInt(originalStyles.current.paddingRight, 10) || 0;
			var clientWidth = document.body ? document.body.clientWidth : 0;
			var adjustedPadding = window.innerWidth - clientWidth + currentPadding || 0;
			Object.keys(LOCK_STYLES).forEach(function(key) {
				var val = LOCK_STYLES[key];
				if (targetStyle) targetStyle[key] = val;
			});
			if (targetStyle) targetStyle.paddingRight = "".concat(adjustedPadding, "px");
		}
		if (target && isTouchDevice()) {
			target.addEventListener("touchmove", preventTouchMove, listenerOptions);
			if (touchScrollTarget) {
				touchScrollTarget.addEventListener("touchstart", preventInertiaScroll, listenerOptions);
				touchScrollTarget.addEventListener("touchmove", allowTouchMove, listenerOptions);
			}
		}
		activeScrollLocks += 1;
	}, [accountForScrollbars]);
	var removeScrollLock = (0, import_react.useCallback)(function(touchScrollTarget) {
		if (!canUseDOM) return;
		var target = document.body;
		var targetStyle = target && target.style;
		activeScrollLocks = Math.max(activeScrollLocks - 1, 0);
		if (accountForScrollbars && activeScrollLocks < 1) STYLE_KEYS.forEach(function(key) {
			var val = originalStyles.current[key];
			if (targetStyle) targetStyle[key] = val;
		});
		if (target && isTouchDevice()) {
			target.removeEventListener("touchmove", preventTouchMove, listenerOptions);
			if (touchScrollTarget) {
				touchScrollTarget.removeEventListener("touchstart", preventInertiaScroll, listenerOptions);
				touchScrollTarget.removeEventListener("touchmove", allowTouchMove, listenerOptions);
			}
		}
	}, [accountForScrollbars]);
	(0, import_react.useEffect)(function() {
		if (!isEnabled) return;
		var element = scrollTarget.current;
		addScrollLock(element);
		return function() {
			removeScrollLock(element);
		};
	}, [
		isEnabled,
		addScrollLock,
		removeScrollLock
	]);
	return function(element) {
		scrollTarget.current = element;
	};
}
function _EMOTION_STRINGIFIED_CSS_ERROR__$1() {
	return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var blurSelectInput = function blurSelectInput(event) {
	var element = event.target;
	return element.ownerDocument.activeElement && element.ownerDocument.activeElement.blur();
};
var _ref2$1 = {
	name: "bp8cua-ScrollManager",
	styles: "position:fixed;left:0;bottom:0;right:0;top:0;label:ScrollManager;",
	map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcm9sbE1hbmFnZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW9EVSIsImZpbGUiOiJTY3JvbGxNYW5hZ2VyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgRnJhZ21lbnQsIFJlYWN0RWxlbWVudCwgUmVmQ2FsbGJhY2ssIE1vdXNlRXZlbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdXNlU2Nyb2xsQ2FwdHVyZSBmcm9tICcuL3VzZVNjcm9sbENhcHR1cmUnO1xuaW1wb3J0IHVzZVNjcm9sbExvY2sgZnJvbSAnLi91c2VTY3JvbGxMb2NrJztcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgcmVhZG9ubHkgY2hpbGRyZW46IChyZWY6IFJlZkNhbGxiYWNrPEhUTUxFbGVtZW50PikgPT4gUmVhY3RFbGVtZW50O1xuICByZWFkb25seSBsb2NrRW5hYmxlZDogYm9vbGVhbjtcbiAgcmVhZG9ubHkgY2FwdHVyZUVuYWJsZWQ6IGJvb2xlYW47XG4gIHJlYWRvbmx5IG9uQm90dG9tQXJyaXZlPzogKGV2ZW50OiBXaGVlbEV2ZW50IHwgVG91Y2hFdmVudCkgPT4gdm9pZDtcbiAgcmVhZG9ubHkgb25Cb3R0b21MZWF2ZT86IChldmVudDogV2hlZWxFdmVudCB8IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG4gIHJlYWRvbmx5IG9uVG9wQXJyaXZlPzogKGV2ZW50OiBXaGVlbEV2ZW50IHwgVG91Y2hFdmVudCkgPT4gdm9pZDtcbiAgcmVhZG9ubHkgb25Ub3BMZWF2ZT86IChldmVudDogV2hlZWxFdmVudCB8IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG59XG5cbmNvbnN0IGJsdXJTZWxlY3RJbnB1dCA9IChldmVudDogTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgcmV0dXJuIChcbiAgICBlbGVtZW50Lm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJlxuICAgIChlbGVtZW50Lm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuYmx1cigpXG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTY3JvbGxNYW5hZ2VyKHtcbiAgY2hpbGRyZW4sXG4gIGxvY2tFbmFibGVkLFxuICBjYXB0dXJlRW5hYmxlZCA9IHRydWUsXG4gIG9uQm90dG9tQXJyaXZlLFxuICBvbkJvdHRvbUxlYXZlLFxuICBvblRvcEFycml2ZSxcbiAgb25Ub3BMZWF2ZSxcbn06IFByb3BzKSB7XG4gIGNvbnN0IHNldFNjcm9sbENhcHR1cmVUYXJnZXQgPSB1c2VTY3JvbGxDYXB0dXJlKHtcbiAgICBpc0VuYWJsZWQ6IGNhcHR1cmVFbmFibGVkLFxuICAgIG9uQm90dG9tQXJyaXZlLFxuICAgIG9uQm90dG9tTGVhdmUsXG4gICAgb25Ub3BBcnJpdmUsXG4gICAgb25Ub3BMZWF2ZSxcbiAgfSk7XG4gIGNvbnN0IHNldFNjcm9sbExvY2tUYXJnZXQgPSB1c2VTY3JvbGxMb2NrKHsgaXNFbmFibGVkOiBsb2NrRW5hYmxlZCB9KTtcblxuICBjb25zdCB0YXJnZXRSZWY6IFJlZkNhbGxiYWNrPEhUTUxFbGVtZW50PiA9IChlbGVtZW50KSA9PiB7XG4gICAgc2V0U2Nyb2xsQ2FwdHVyZVRhcmdldChlbGVtZW50KTtcbiAgICBzZXRTY3JvbGxMb2NrVGFyZ2V0KGVsZW1lbnQpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEZyYWdtZW50PlxuICAgICAge2xvY2tFbmFibGVkICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIG9uQ2xpY2s9e2JsdXJTZWxlY3RJbnB1dH1cbiAgICAgICAgICBjc3M9e3sgcG9zaXRpb246ICdmaXhlZCcsIGxlZnQ6IDAsIGJvdHRvbTogMCwgcmlnaHQ6IDAsIHRvcDogMCB9fVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICAgIHtjaGlsZHJlbih0YXJnZXRSZWYpfVxuICAgIDwvRnJhZ21lbnQ+XG4gICk7XG59XG4iXX0= */",
	toString: _EMOTION_STRINGIFIED_CSS_ERROR__$1
};
function ScrollManager(_ref) {
	var children = _ref.children, lockEnabled = _ref.lockEnabled, _ref$captureEnabled = _ref.captureEnabled, captureEnabled = _ref$captureEnabled === void 0 ? true : _ref$captureEnabled, onBottomArrive = _ref.onBottomArrive, onBottomLeave = _ref.onBottomLeave, onTopArrive = _ref.onTopArrive, onTopLeave = _ref.onTopLeave;
	var setScrollCaptureTarget = useScrollCapture({
		isEnabled: captureEnabled,
		onBottomArrive,
		onBottomLeave,
		onTopArrive,
		onTopLeave
	});
	var setScrollLockTarget = useScrollLock({ isEnabled: lockEnabled });
	return jsx(import_react.Fragment, null, lockEnabled && jsx("div", {
		onClick: blurSelectInput,
		css: _ref2$1
	}), children(function targetRef(element) {
		setScrollCaptureTarget(element);
		setScrollLockTarget(element);
	}));
}
function _EMOTION_STRINGIFIED_CSS_ERROR__() {
	return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var _ref2 = {
	name: "5kkxb2-requiredInput-RequiredInput",
	styles: "label:requiredInput;opacity:0;pointer-events:none;position:absolute;bottom:0;left:0;right:0;width:100%;label:RequiredInput;",
	map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlcXVpcmVkSW5wdXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWNJIiwiZmlsZSI6IlJlcXVpcmVkSW5wdXQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBGb2N1c0V2ZW50SGFuZGxlciwgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3ggfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmNvbnN0IFJlcXVpcmVkSW5wdXQ6IEZ1bmN0aW9uQ29tcG9uZW50PHtcbiAgcmVhZG9ubHkgbmFtZT86IHN0cmluZztcbiAgcmVhZG9ubHkgb25Gb2N1czogRm9jdXNFdmVudEhhbmRsZXI8SFRNTElucHV0RWxlbWVudD47XG59PiA9ICh7IG5hbWUsIG9uRm9jdXMgfSkgPT4gKFxuICA8aW5wdXRcbiAgICByZXF1aXJlZFxuICAgIG5hbWU9e25hbWV9XG4gICAgdGFiSW5kZXg9ey0xfVxuICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICBjc3M9e3tcbiAgICAgIGxhYmVsOiAncmVxdWlyZWRJbnB1dCcsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBib3R0b206IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgcmlnaHQ6IDAsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgIH19XG4gICAgLy8gUHJldmVudCBgU3dpdGNoaW5nIGZyb20gdW5jb250cm9sbGVkIHRvIGNvbnRyb2xsZWRgIGVycm9yXG4gICAgdmFsdWU9XCJcIlxuICAgIG9uQ2hhbmdlPXsoKSA9PiB7fX1cbiAgLz5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IFJlcXVpcmVkSW5wdXQ7XG4iXX0= */",
	toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
var RequiredInput$1 = function RequiredInput(_ref) {
	var name = _ref.name, onFocus = _ref.onFocus;
	return jsx("input", {
		required: true,
		name,
		tabIndex: -1,
		"aria-hidden": "true",
		onFocus,
		css: _ref2,
		value: "",
		onChange: function onChange() {}
	});
};
function testPlatform(re) {
	var _window$navigator$use;
	return typeof window !== "undefined" && window.navigator != null ? re.test(((_window$navigator$use = window.navigator["userAgentData"]) === null || _window$navigator$use === void 0 ? void 0 : _window$navigator$use.platform) || window.navigator.platform) : false;
}
function isIPhone() {
	return testPlatform(/^iPhone/i);
}
function isMac() {
	return testPlatform(/^Mac/i);
}
function isIPad() {
	return testPlatform(/^iPad/i) || isMac() && navigator.maxTouchPoints > 1;
}
function isIOS() {
	return isIPhone() || isIPad();
}
function isAppleDevice() {
	return isMac() || isIOS();
}
var formatGroupLabel = function formatGroupLabel(group) {
	return group.label;
};
var getOptionLabel$1 = function getOptionLabel(option) {
	return option.label;
};
var getOptionValue$1 = function getOptionValue(option) {
	return option.value;
};
var isOptionDisabled = function isOptionDisabled(option) {
	return !!option.isDisabled;
};
var defaultStyles = {
	clearIndicator: clearIndicatorCSS,
	container: containerCSS,
	control: css$1,
	dropdownIndicator: dropdownIndicatorCSS,
	group: groupCSS,
	groupHeading: groupHeadingCSS,
	indicatorsContainer: indicatorsContainerCSS,
	indicatorSeparator: indicatorSeparatorCSS,
	input: inputCSS,
	loadingIndicator: loadingIndicatorCSS,
	loadingMessage: loadingMessageCSS,
	menu: menuCSS,
	menuList: menuListCSS,
	menuPortal: menuPortalCSS,
	multiValue: multiValueCSS,
	multiValueLabel: multiValueLabelCSS,
	multiValueRemove: multiValueRemoveCSS,
	noOptionsMessage: noOptionsMessageCSS,
	option: optionCSS,
	placeholder: placeholderCSS,
	singleValue: css,
	valueContainer: valueContainerCSS
};
function mergeStyles(source) {
	var target = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
	var styles = _objectSpread2({}, source);
	Object.keys(target).forEach(function(keyAsString) {
		var key = keyAsString;
		if (source[key]) styles[key] = function(rsCss, props) {
			return target[key](source[key](rsCss, props), props);
		};
		else styles[key] = target[key];
	});
	return styles;
}
var colors = {
	primary: "#2684FF",
	primary75: "#4C9AFF",
	primary50: "#B2D4FF",
	primary25: "#DEEBFF",
	danger: "#DE350B",
	dangerLight: "#FFBDAD",
	neutral0: "hsl(0, 0%, 100%)",
	neutral5: "hsl(0, 0%, 95%)",
	neutral10: "hsl(0, 0%, 90%)",
	neutral20: "hsl(0, 0%, 80%)",
	neutral30: "hsl(0, 0%, 70%)",
	neutral40: "hsl(0, 0%, 60%)",
	neutral50: "hsl(0, 0%, 50%)",
	neutral60: "hsl(0, 0%, 40%)",
	neutral70: "hsl(0, 0%, 30%)",
	neutral80: "hsl(0, 0%, 20%)",
	neutral90: "hsl(0, 0%, 10%)"
};
var borderRadius = 4;
var baseUnit = 4;
var defaultTheme = {
	borderRadius,
	colors,
	spacing: {
		baseUnit,
		controlHeight: 38,
		menuGutter: baseUnit * 2
	}
};
var defaultProps = {
	"aria-live": "polite",
	backspaceRemovesValue: true,
	blurInputOnSelect: isTouchCapable(),
	captureMenuScroll: !isTouchCapable(),
	classNames: {},
	closeMenuOnSelect: true,
	closeMenuOnScroll: false,
	components: {},
	controlShouldRenderValue: true,
	escapeClearsValue: false,
	filterOption: createFilter(),
	formatGroupLabel,
	getOptionLabel: getOptionLabel$1,
	getOptionValue: getOptionValue$1,
	isDisabled: false,
	isLoading: false,
	isMulti: false,
	isRtl: false,
	isSearchable: true,
	isOptionDisabled,
	loadingMessage: function loadingMessage() {
		return "Loading...";
	},
	maxMenuHeight: 300,
	minMenuHeight: 140,
	menuIsOpen: false,
	menuPlacement: "bottom",
	menuPosition: "absolute",
	menuShouldBlockScroll: false,
	menuShouldScrollIntoView: !isMobileDevice(),
	noOptionsMessage: function noOptionsMessage() {
		return "No options";
	},
	openMenuOnFocus: false,
	openMenuOnClick: true,
	options: [],
	pageSize: 5,
	placeholder: "Select...",
	screenReaderStatus: function screenReaderStatus(_ref) {
		var count = _ref.count;
		return "".concat(count, " result").concat(count !== 1 ? "s" : "", " available");
	},
	styles: {},
	tabIndex: 0,
	tabSelectsValue: true,
	unstyled: false
};
function toCategorizedOption(props, option, selectValue, index) {
	return {
		type: "option",
		data: option,
		isDisabled: _isOptionDisabled(props, option, selectValue),
		isSelected: _isOptionSelected(props, option, selectValue),
		label: getOptionLabel(props, option),
		value: getOptionValue(props, option),
		index
	};
}
function buildCategorizedOptions(props, selectValue) {
	return props.options.map(function(groupOrOption, groupOrOptionIndex) {
		if ("options" in groupOrOption) {
			var categorizedOptions = groupOrOption.options.map(function(option, optionIndex) {
				return toCategorizedOption(props, option, selectValue, optionIndex);
			}).filter(function(categorizedOption) {
				return isFocusable(props, categorizedOption);
			});
			return categorizedOptions.length > 0 ? {
				type: "group",
				data: groupOrOption,
				options: categorizedOptions,
				index: groupOrOptionIndex
			} : void 0;
		}
		var categorizedOption = toCategorizedOption(props, groupOrOption, selectValue, groupOrOptionIndex);
		return isFocusable(props, categorizedOption) ? categorizedOption : void 0;
	}).filter(notNullish);
}
function buildFocusableOptionsFromCategorizedOptions(categorizedOptions) {
	return categorizedOptions.reduce(function(optionsAccumulator, categorizedOption) {
		if (categorizedOption.type === "group") optionsAccumulator.push.apply(optionsAccumulator, _toConsumableArray(categorizedOption.options.map(function(option) {
			return option.data;
		})));
		else optionsAccumulator.push(categorizedOption.data);
		return optionsAccumulator;
	}, []);
}
function buildFocusableOptionsWithIds(categorizedOptions, optionId) {
	return categorizedOptions.reduce(function(optionsAccumulator, categorizedOption) {
		if (categorizedOption.type === "group") optionsAccumulator.push.apply(optionsAccumulator, _toConsumableArray(categorizedOption.options.map(function(option) {
			return {
				data: option.data,
				id: "".concat(optionId, "-").concat(categorizedOption.index, "-").concat(option.index)
			};
		})));
		else optionsAccumulator.push({
			data: categorizedOption.data,
			id: "".concat(optionId, "-").concat(categorizedOption.index)
		});
		return optionsAccumulator;
	}, []);
}
function buildFocusableOptions(props, selectValue) {
	return buildFocusableOptionsFromCategorizedOptions(buildCategorizedOptions(props, selectValue));
}
function isFocusable(props, categorizedOption) {
	var _props$inputValue = props.inputValue, inputValue = _props$inputValue === void 0 ? "" : _props$inputValue;
	var data = categorizedOption.data, isSelected = categorizedOption.isSelected, label = categorizedOption.label, value = categorizedOption.value;
	return (!shouldHideSelectedOptions(props) || !isSelected) && _filterOption(props, {
		label,
		value,
		data
	}, inputValue);
}
function getNextFocusedValue(state, nextSelectValue) {
	var focusedValue = state.focusedValue;
	var lastFocusedIndex = state.selectValue.indexOf(focusedValue);
	if (lastFocusedIndex > -1) {
		if (nextSelectValue.indexOf(focusedValue) > -1) return focusedValue;
		else if (lastFocusedIndex < nextSelectValue.length) return nextSelectValue[lastFocusedIndex];
	}
	return null;
}
function getNextFocusedOption(state, options) {
	var lastFocusedOption = state.focusedOption;
	return lastFocusedOption && options.indexOf(lastFocusedOption) > -1 ? lastFocusedOption : options[0];
}
var getFocusedOptionId = function getFocusedOptionId(focusableOptionsWithIds, focusedOption) {
	var _focusableOptionsWith;
	return ((_focusableOptionsWith = focusableOptionsWithIds.find(function(option) {
		return option.data === focusedOption;
	})) === null || _focusableOptionsWith === void 0 ? void 0 : _focusableOptionsWith.id) || null;
};
var getOptionLabel = function getOptionLabel(props, data) {
	return props.getOptionLabel(data);
};
var getOptionValue = function getOptionValue(props, data) {
	return props.getOptionValue(data);
};
function _isOptionDisabled(props, option, selectValue) {
	return typeof props.isOptionDisabled === "function" ? props.isOptionDisabled(option, selectValue) : false;
}
function _isOptionSelected(props, option, selectValue) {
	if (selectValue.indexOf(option) > -1) return true;
	if (typeof props.isOptionSelected === "function") return props.isOptionSelected(option, selectValue);
	var candidate = getOptionValue(props, option);
	return selectValue.some(function(i) {
		return getOptionValue(props, i) === candidate;
	});
}
function _filterOption(props, option, inputValue) {
	return props.filterOption ? props.filterOption(option, inputValue) : true;
}
var shouldHideSelectedOptions = function shouldHideSelectedOptions(props) {
	var hideSelectedOptions = props.hideSelectedOptions, isMulti = props.isMulti;
	if (hideSelectedOptions === void 0) return isMulti;
	return hideSelectedOptions;
};
var instanceId = 1;
var Select = /* @__PURE__ */ function(_Component) {
	_inherits(Select, _Component);
	var _super = _createSuper(Select);
	function Select(_props) {
		var _this;
		_classCallCheck(this, Select);
		_this = _super.call(this, _props);
		_this.state = {
			ariaSelection: null,
			focusedOption: null,
			focusedOptionId: null,
			focusableOptionsWithIds: [],
			focusedValue: null,
			inputIsHidden: false,
			isFocused: false,
			selectValue: [],
			clearFocusValueOnUpdate: false,
			prevWasFocused: false,
			inputIsHiddenAfterUpdate: void 0,
			prevProps: void 0,
			instancePrefix: "",
			isAppleDevice: false
		};
		_this.blockOptionHover = false;
		_this.isComposing = false;
		_this.commonProps = void 0;
		_this.initialTouchX = 0;
		_this.initialTouchY = 0;
		_this.openAfterFocus = false;
		_this.scrollToFocusedOptionOnUpdate = false;
		_this.userIsDragging = void 0;
		_this.controlRef = null;
		_this.getControlRef = function(ref) {
			_this.controlRef = ref;
		};
		_this.focusedOptionRef = null;
		_this.getFocusedOptionRef = function(ref) {
			_this.focusedOptionRef = ref;
		};
		_this.menuListRef = null;
		_this.getMenuListRef = function(ref) {
			_this.menuListRef = ref;
		};
		_this.inputRef = null;
		_this.getInputRef = function(ref) {
			_this.inputRef = ref;
		};
		_this.focus = _this.focusInput;
		_this.blur = _this.blurInput;
		_this.onChange = function(newValue, actionMeta) {
			var _this$props = _this.props, onChange = _this$props.onChange;
			actionMeta.name = _this$props.name;
			_this.ariaOnChange(newValue, actionMeta);
			onChange(newValue, actionMeta);
		};
		_this.setValue = function(newValue, action, option) {
			var _this$props2 = _this.props, closeMenuOnSelect = _this$props2.closeMenuOnSelect, isMulti = _this$props2.isMulti, inputValue = _this$props2.inputValue;
			_this.onInputChange("", {
				action: "set-value",
				prevInputValue: inputValue
			});
			if (closeMenuOnSelect) {
				_this.setState({ inputIsHiddenAfterUpdate: !isMulti });
				_this.onMenuClose();
			}
			_this.setState({ clearFocusValueOnUpdate: true });
			_this.onChange(newValue, {
				action,
				option
			});
		};
		_this.selectOption = function(newValue) {
			var _this$props3 = _this.props, blurInputOnSelect = _this$props3.blurInputOnSelect, isMulti = _this$props3.isMulti, name = _this$props3.name;
			var selectValue = _this.state.selectValue;
			var deselected = isMulti && _this.isOptionSelected(newValue, selectValue);
			var isDisabled = _this.isOptionDisabled(newValue, selectValue);
			if (deselected) {
				var candidate = _this.getOptionValue(newValue);
				_this.setValue(multiValueAsValue(selectValue.filter(function(i) {
					return _this.getOptionValue(i) !== candidate;
				})), "deselect-option", newValue);
			} else if (!isDisabled) if (isMulti) _this.setValue(multiValueAsValue([].concat(_toConsumableArray(selectValue), [newValue])), "select-option", newValue);
			else _this.setValue(singleValueAsValue(newValue), "select-option");
			else {
				_this.ariaOnChange(singleValueAsValue(newValue), {
					action: "select-option",
					option: newValue,
					name
				});
				return;
			}
			if (blurInputOnSelect) _this.blurInput();
		};
		_this.removeValue = function(removedValue) {
			var isMulti = _this.props.isMulti;
			var selectValue = _this.state.selectValue;
			var candidate = _this.getOptionValue(removedValue);
			var newValueArray = selectValue.filter(function(i) {
				return _this.getOptionValue(i) !== candidate;
			});
			var newValue = valueTernary(isMulti, newValueArray, newValueArray[0] || null);
			_this.onChange(newValue, {
				action: "remove-value",
				removedValue
			});
			_this.focusInput();
		};
		_this.clearValue = function() {
			var selectValue = _this.state.selectValue;
			_this.onChange(valueTernary(_this.props.isMulti, [], null), {
				action: "clear",
				removedValues: selectValue
			});
		};
		_this.popValue = function() {
			var isMulti = _this.props.isMulti;
			var selectValue = _this.state.selectValue;
			var lastSelectedValue = selectValue[selectValue.length - 1];
			var newValueArray = selectValue.slice(0, selectValue.length - 1);
			var newValue = valueTernary(isMulti, newValueArray, newValueArray[0] || null);
			if (lastSelectedValue) _this.onChange(newValue, {
				action: "pop-value",
				removedValue: lastSelectedValue
			});
		};
		_this.getFocusedOptionId = function(focusedOption) {
			return getFocusedOptionId(_this.state.focusableOptionsWithIds, focusedOption);
		};
		_this.getFocusableOptionsWithIds = function() {
			return buildFocusableOptionsWithIds(buildCategorizedOptions(_this.props, _this.state.selectValue), _this.getElementId("option"));
		};
		_this.getValue = function() {
			return _this.state.selectValue;
		};
		_this.cx = function() {
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
			return classNames.apply(void 0, [_this.props.classNamePrefix].concat(args));
		};
		_this.getOptionLabel = function(data) {
			return getOptionLabel(_this.props, data);
		};
		_this.getOptionValue = function(data) {
			return getOptionValue(_this.props, data);
		};
		_this.getStyles = function(key, props) {
			var unstyled = _this.props.unstyled;
			var base = defaultStyles[key](props, unstyled);
			base.boxSizing = "border-box";
			var custom = _this.props.styles[key];
			return custom ? custom(base, props) : base;
		};
		_this.getClassNames = function(key, props) {
			var _this$props$className, _this$props$className2;
			return (_this$props$className = (_this$props$className2 = _this.props.classNames)[key]) === null || _this$props$className === void 0 ? void 0 : _this$props$className.call(_this$props$className2, props);
		};
		_this.getElementId = function(element) {
			return "".concat(_this.state.instancePrefix, "-").concat(element);
		};
		_this.getComponents = function() {
			return defaultComponents(_this.props);
		};
		_this.buildCategorizedOptions = function() {
			return buildCategorizedOptions(_this.props, _this.state.selectValue);
		};
		_this.getCategorizedOptions = function() {
			return _this.props.menuIsOpen ? _this.buildCategorizedOptions() : [];
		};
		_this.buildFocusableOptions = function() {
			return buildFocusableOptionsFromCategorizedOptions(_this.buildCategorizedOptions());
		};
		_this.getFocusableOptions = function() {
			return _this.props.menuIsOpen ? _this.buildFocusableOptions() : [];
		};
		_this.ariaOnChange = function(value, actionMeta) {
			_this.setState({ ariaSelection: _objectSpread2({ value }, actionMeta) });
		};
		_this.onMenuMouseDown = function(event) {
			if (event.button !== 0) return;
			event.stopPropagation();
			event.preventDefault();
			_this.focusInput();
		};
		_this.onMenuMouseMove = function(event) {
			_this.blockOptionHover = false;
		};
		_this.onControlMouseDown = function(event) {
			if (event.defaultPrevented) return;
			var openMenuOnClick = _this.props.openMenuOnClick;
			if (!_this.state.isFocused) {
				if (openMenuOnClick) _this.openAfterFocus = true;
				_this.focusInput();
			} else if (!_this.props.menuIsOpen) {
				if (openMenuOnClick) _this.openMenu("first");
			} else if (event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA") _this.onMenuClose();
			if (event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA") event.preventDefault();
		};
		_this.onDropdownIndicatorMouseDown = function(event) {
			if (event && event.type === "mousedown" && event.button !== 0) return;
			if (_this.props.isDisabled) return;
			var _this$props4 = _this.props, isMulti = _this$props4.isMulti, menuIsOpen = _this$props4.menuIsOpen;
			_this.focusInput();
			if (menuIsOpen) {
				_this.setState({ inputIsHiddenAfterUpdate: !isMulti });
				_this.onMenuClose();
			} else _this.openMenu("first");
			event.preventDefault();
		};
		_this.onClearIndicatorMouseDown = function(event) {
			if (event && event.type === "mousedown" && event.button !== 0) return;
			_this.clearValue();
			event.preventDefault();
			_this.openAfterFocus = false;
			if (event.type === "touchend") _this.focusInput();
			else setTimeout(function() {
				return _this.focusInput();
			});
		};
		_this.onScroll = function(event) {
			if (typeof _this.props.closeMenuOnScroll === "boolean") {
				if (event.target instanceof HTMLElement && isDocumentElement(event.target)) _this.props.onMenuClose();
			} else if (typeof _this.props.closeMenuOnScroll === "function") {
				if (_this.props.closeMenuOnScroll(event)) _this.props.onMenuClose();
			}
		};
		_this.onCompositionStart = function() {
			_this.isComposing = true;
		};
		_this.onCompositionEnd = function() {
			_this.isComposing = false;
		};
		_this.onTouchStart = function(_ref2) {
			var touches = _ref2.touches;
			var touch = touches && touches.item(0);
			if (!touch) return;
			_this.initialTouchX = touch.clientX;
			_this.initialTouchY = touch.clientY;
			_this.userIsDragging = false;
		};
		_this.onTouchMove = function(_ref3) {
			var touches = _ref3.touches;
			var touch = touches && touches.item(0);
			if (!touch) return;
			var deltaX = Math.abs(touch.clientX - _this.initialTouchX);
			var deltaY = Math.abs(touch.clientY - _this.initialTouchY);
			var moveThreshold = 5;
			_this.userIsDragging = deltaX > moveThreshold || deltaY > moveThreshold;
		};
		_this.onTouchEnd = function(event) {
			if (_this.userIsDragging) return;
			if (_this.controlRef && !_this.controlRef.contains(event.target) && _this.menuListRef && !_this.menuListRef.contains(event.target)) _this.blurInput();
			_this.initialTouchX = 0;
			_this.initialTouchY = 0;
		};
		_this.onControlTouchEnd = function(event) {
			if (_this.userIsDragging) return;
			_this.onControlMouseDown(event);
		};
		_this.onClearIndicatorTouchEnd = function(event) {
			if (_this.userIsDragging) return;
			_this.onClearIndicatorMouseDown(event);
		};
		_this.onDropdownIndicatorTouchEnd = function(event) {
			if (_this.userIsDragging) return;
			_this.onDropdownIndicatorMouseDown(event);
		};
		_this.handleInputChange = function(event) {
			var prevInputValue = _this.props.inputValue;
			var inputValue = event.currentTarget.value;
			_this.setState({ inputIsHiddenAfterUpdate: false });
			_this.onInputChange(inputValue, {
				action: "input-change",
				prevInputValue
			});
			if (!_this.props.menuIsOpen) _this.onMenuOpen();
		};
		_this.onInputFocus = function(event) {
			if (_this.props.onFocus) _this.props.onFocus(event);
			_this.setState({
				inputIsHiddenAfterUpdate: false,
				isFocused: true
			});
			if (_this.openAfterFocus || _this.props.openMenuOnFocus) _this.openMenu("first");
			_this.openAfterFocus = false;
		};
		_this.onInputBlur = function(event) {
			var prevInputValue = _this.props.inputValue;
			if (_this.menuListRef && _this.menuListRef.contains(document.activeElement)) {
				_this.inputRef.focus();
				return;
			}
			if (_this.props.onBlur) _this.props.onBlur(event);
			_this.onInputChange("", {
				action: "input-blur",
				prevInputValue
			});
			_this.onMenuClose();
			_this.setState({
				focusedValue: null,
				isFocused: false
			});
		};
		_this.onOptionHover = function(focusedOption) {
			if (_this.blockOptionHover || _this.state.focusedOption === focusedOption) return;
			var focusedOptionIndex = _this.getFocusableOptions().indexOf(focusedOption);
			_this.setState({
				focusedOption,
				focusedOptionId: focusedOptionIndex > -1 ? _this.getFocusedOptionId(focusedOption) : null
			});
		};
		_this.shouldHideSelectedOptions = function() {
			return shouldHideSelectedOptions(_this.props);
		};
		_this.onValueInputFocus = function(e) {
			e.preventDefault();
			e.stopPropagation();
			_this.focus();
		};
		_this.onKeyDown = function(event) {
			var _this$props5 = _this.props, isMulti = _this$props5.isMulti, backspaceRemovesValue = _this$props5.backspaceRemovesValue, escapeClearsValue = _this$props5.escapeClearsValue, inputValue = _this$props5.inputValue, isClearable = _this$props5.isClearable, isDisabled = _this$props5.isDisabled, menuIsOpen = _this$props5.menuIsOpen, onKeyDown = _this$props5.onKeyDown, tabSelectsValue = _this$props5.tabSelectsValue, openMenuOnFocus = _this$props5.openMenuOnFocus;
			var _this$state = _this.state, focusedOption = _this$state.focusedOption, focusedValue = _this$state.focusedValue, selectValue = _this$state.selectValue;
			if (isDisabled) return;
			if (typeof onKeyDown === "function") {
				onKeyDown(event);
				if (event.defaultPrevented) return;
			}
			_this.blockOptionHover = true;
			switch (event.key) {
				case "ArrowLeft":
					if (!isMulti || inputValue) return;
					_this.focusValue("previous");
					break;
				case "ArrowRight":
					if (!isMulti || inputValue) return;
					_this.focusValue("next");
					break;
				case "Delete":
				case "Backspace":
					if (inputValue) return;
					if (focusedValue) _this.removeValue(focusedValue);
					else {
						if (!backspaceRemovesValue) return;
						if (isMulti) _this.popValue();
						else if (isClearable) _this.clearValue();
					}
					break;
				case "Tab":
					if (_this.isComposing) return;
					if (event.shiftKey || !menuIsOpen || !tabSelectsValue || !focusedOption || openMenuOnFocus && _this.isOptionSelected(focusedOption, selectValue)) return;
					_this.selectOption(focusedOption);
					break;
				case "Enter":
					if (event.keyCode === 229) break;
					if (menuIsOpen) {
						if (!focusedOption) return;
						if (_this.isComposing) return;
						_this.selectOption(focusedOption);
						break;
					}
					return;
				case "Escape":
					if (menuIsOpen) {
						_this.setState({ inputIsHiddenAfterUpdate: false });
						_this.onInputChange("", {
							action: "menu-close",
							prevInputValue: inputValue
						});
						_this.onMenuClose();
					} else if (isClearable && escapeClearsValue) _this.clearValue();
					break;
				case " ":
					if (inputValue) return;
					if (!menuIsOpen) {
						_this.openMenu("first");
						break;
					}
					if (!focusedOption) return;
					_this.selectOption(focusedOption);
					break;
				case "ArrowUp":
					if (menuIsOpen) _this.focusOption("up");
					else _this.openMenu("last");
					break;
				case "ArrowDown":
					if (menuIsOpen) _this.focusOption("down");
					else _this.openMenu("first");
					break;
				case "PageUp":
					if (!menuIsOpen) return;
					_this.focusOption("pageup");
					break;
				case "PageDown":
					if (!menuIsOpen) return;
					_this.focusOption("pagedown");
					break;
				case "Home":
					if (!menuIsOpen) return;
					_this.focusOption("first");
					break;
				case "End":
					if (!menuIsOpen) return;
					_this.focusOption("last");
					break;
				default: return;
			}
			event.preventDefault();
		};
		_this.state.instancePrefix = "react-select-" + (_this.props.instanceId || ++instanceId);
		_this.state.selectValue = cleanValue(_props.value);
		if (_props.menuIsOpen && _this.state.selectValue.length) {
			var focusableOptionsWithIds = _this.getFocusableOptionsWithIds();
			var focusableOptions = _this.buildFocusableOptions();
			var optionIndex = focusableOptions.indexOf(_this.state.selectValue[0]);
			_this.state.focusableOptionsWithIds = focusableOptionsWithIds;
			_this.state.focusedOption = focusableOptions[optionIndex];
			_this.state.focusedOptionId = getFocusedOptionId(focusableOptionsWithIds, focusableOptions[optionIndex]);
		}
		return _this;
	}
	_createClass(Select, [
		{
			key: "componentDidMount",
			value: function componentDidMount() {
				this.startListeningComposition();
				this.startListeningToTouch();
				if (this.props.closeMenuOnScroll && document && document.addEventListener) document.addEventListener("scroll", this.onScroll, true);
				if (this.props.autoFocus) this.focusInput();
				if (this.props.menuIsOpen && this.state.focusedOption && this.menuListRef && this.focusedOptionRef) scrollIntoView(this.menuListRef, this.focusedOptionRef);
				if (isAppleDevice()) this.setState({ isAppleDevice: true });
			}
		},
		{
			key: "componentDidUpdate",
			value: function componentDidUpdate(prevProps) {
				var _this$props6 = this.props, isDisabled = _this$props6.isDisabled, menuIsOpen = _this$props6.menuIsOpen;
				var isFocused = this.state.isFocused;
				if (isFocused && !isDisabled && prevProps.isDisabled || isFocused && menuIsOpen && !prevProps.menuIsOpen) this.focusInput();
				if (isFocused && isDisabled && !prevProps.isDisabled) this.setState({ isFocused: false }, this.onMenuClose);
				else if (!isFocused && !isDisabled && prevProps.isDisabled && this.inputRef === document.activeElement) this.setState({ isFocused: true });
				if (this.menuListRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate) {
					scrollIntoView(this.menuListRef, this.focusedOptionRef);
					this.scrollToFocusedOptionOnUpdate = false;
				}
			}
		},
		{
			key: "componentWillUnmount",
			value: function componentWillUnmount() {
				this.stopListeningComposition();
				this.stopListeningToTouch();
				document.removeEventListener("scroll", this.onScroll, true);
			}
		},
		{
			key: "onMenuOpen",
			value: function onMenuOpen() {
				this.props.onMenuOpen();
			}
		},
		{
			key: "onMenuClose",
			value: function onMenuClose() {
				this.onInputChange("", {
					action: "menu-close",
					prevInputValue: this.props.inputValue
				});
				this.props.onMenuClose();
			}
		},
		{
			key: "onInputChange",
			value: function onInputChange(newValue, actionMeta) {
				this.props.onInputChange(newValue, actionMeta);
			}
		},
		{
			key: "focusInput",
			value: function focusInput() {
				if (!this.inputRef) return;
				this.inputRef.focus();
			}
		},
		{
			key: "blurInput",
			value: function blurInput() {
				if (!this.inputRef) return;
				this.inputRef.blur();
			}
		},
		{
			key: "openMenu",
			value: function openMenu(focusOption) {
				var _this2 = this;
				var _this$state2 = this.state, selectValue = _this$state2.selectValue, isFocused = _this$state2.isFocused;
				var focusableOptions = this.buildFocusableOptions();
				var openAtIndex = focusOption === "first" ? 0 : focusableOptions.length - 1;
				if (!this.props.isMulti) {
					var selectedIndex = focusableOptions.indexOf(selectValue[0]);
					if (selectedIndex > -1) openAtIndex = selectedIndex;
				}
				this.scrollToFocusedOptionOnUpdate = !(isFocused && this.menuListRef);
				this.setState({
					inputIsHiddenAfterUpdate: false,
					focusedValue: null,
					focusedOption: focusableOptions[openAtIndex],
					focusedOptionId: this.getFocusedOptionId(focusableOptions[openAtIndex])
				}, function() {
					return _this2.onMenuOpen();
				});
			}
		},
		{
			key: "focusValue",
			value: function focusValue(direction) {
				var _this$state3 = this.state, selectValue = _this$state3.selectValue, focusedValue = _this$state3.focusedValue;
				if (!this.props.isMulti) return;
				this.setState({ focusedOption: null });
				var focusedIndex = selectValue.indexOf(focusedValue);
				if (!focusedValue) focusedIndex = -1;
				var lastIndex = selectValue.length - 1;
				var nextFocus = -1;
				if (!selectValue.length) return;
				switch (direction) {
					case "previous":
						if (focusedIndex === 0) nextFocus = 0;
						else if (focusedIndex === -1) nextFocus = lastIndex;
						else nextFocus = focusedIndex - 1;
						break;
					case "next":
						if (focusedIndex > -1 && focusedIndex < lastIndex) nextFocus = focusedIndex + 1;
						break;
				}
				this.setState({
					inputIsHidden: nextFocus !== -1,
					focusedValue: selectValue[nextFocus]
				});
			}
		},
		{
			key: "focusOption",
			value: function focusOption() {
				var direction = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "first";
				var pageSize = this.props.pageSize;
				var focusedOption = this.state.focusedOption;
				var options = this.getFocusableOptions();
				if (!options.length) return;
				var nextFocus = 0;
				var focusedIndex = options.indexOf(focusedOption);
				if (!focusedOption) focusedIndex = -1;
				if (direction === "up") nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
				else if (direction === "down") nextFocus = (focusedIndex + 1) % options.length;
				else if (direction === "pageup") {
					nextFocus = focusedIndex - pageSize;
					if (nextFocus < 0) nextFocus = 0;
				} else if (direction === "pagedown") {
					nextFocus = focusedIndex + pageSize;
					if (nextFocus > options.length - 1) nextFocus = options.length - 1;
				} else if (direction === "last") nextFocus = options.length - 1;
				this.scrollToFocusedOptionOnUpdate = true;
				this.setState({
					focusedOption: options[nextFocus],
					focusedValue: null,
					focusedOptionId: this.getFocusedOptionId(options[nextFocus])
				});
			}
		},
		{
			key: "getTheme",
			value: function getTheme() {
				if (!this.props.theme) return defaultTheme;
				if (typeof this.props.theme === "function") return this.props.theme(defaultTheme);
				return _objectSpread2(_objectSpread2({}, defaultTheme), this.props.theme);
			}
		},
		{
			key: "getCommonProps",
			value: function getCommonProps() {
				var clearValue = this.clearValue, cx = this.cx, getStyles = this.getStyles, getClassNames = this.getClassNames, getValue = this.getValue, selectOption = this.selectOption, setValue = this.setValue, props = this.props;
				var isMulti = props.isMulti, isRtl = props.isRtl, options = props.options;
				return {
					clearValue,
					cx,
					getStyles,
					getClassNames,
					getValue,
					hasValue: this.hasValue(),
					isMulti,
					isRtl,
					options,
					selectOption,
					selectProps: props,
					setValue,
					theme: this.getTheme()
				};
			}
		},
		{
			key: "hasValue",
			value: function hasValue() {
				return this.state.selectValue.length > 0;
			}
		},
		{
			key: "hasOptions",
			value: function hasOptions() {
				return !!this.getFocusableOptions().length;
			}
		},
		{
			key: "isClearable",
			value: function isClearable() {
				var _this$props7 = this.props, isClearable = _this$props7.isClearable, isMulti = _this$props7.isMulti;
				if (isClearable === void 0) return isMulti;
				return isClearable;
			}
		},
		{
			key: "isOptionDisabled",
			value: function isOptionDisabled(option, selectValue) {
				return _isOptionDisabled(this.props, option, selectValue);
			}
		},
		{
			key: "isOptionSelected",
			value: function isOptionSelected(option, selectValue) {
				return _isOptionSelected(this.props, option, selectValue);
			}
		},
		{
			key: "filterOption",
			value: function filterOption(option, inputValue) {
				return _filterOption(this.props, option, inputValue);
			}
		},
		{
			key: "formatOptionLabel",
			value: function formatOptionLabel(data, context) {
				if (typeof this.props.formatOptionLabel === "function") {
					var _inputValue = this.props.inputValue;
					var _selectValue = this.state.selectValue;
					return this.props.formatOptionLabel(data, {
						context,
						inputValue: _inputValue,
						selectValue: _selectValue
					});
				} else return this.getOptionLabel(data);
			}
		},
		{
			key: "formatGroupLabel",
			value: function formatGroupLabel(data) {
				return this.props.formatGroupLabel(data);
			}
		},
		{
			key: "startListeningComposition",
			value: function startListeningComposition() {
				if (document && document.addEventListener) {
					document.addEventListener("compositionstart", this.onCompositionStart, false);
					document.addEventListener("compositionend", this.onCompositionEnd, false);
				}
			}
		},
		{
			key: "stopListeningComposition",
			value: function stopListeningComposition() {
				if (document && document.removeEventListener) {
					document.removeEventListener("compositionstart", this.onCompositionStart);
					document.removeEventListener("compositionend", this.onCompositionEnd);
				}
			}
		},
		{
			key: "startListeningToTouch",
			value: function startListeningToTouch() {
				if (document && document.addEventListener) {
					document.addEventListener("touchstart", this.onTouchStart, false);
					document.addEventListener("touchmove", this.onTouchMove, false);
					document.addEventListener("touchend", this.onTouchEnd, false);
				}
			}
		},
		{
			key: "stopListeningToTouch",
			value: function stopListeningToTouch() {
				if (document && document.removeEventListener) {
					document.removeEventListener("touchstart", this.onTouchStart);
					document.removeEventListener("touchmove", this.onTouchMove);
					document.removeEventListener("touchend", this.onTouchEnd);
				}
			}
		},
		{
			key: "renderInput",
			value: function renderInput() {
				var _this$props8 = this.props, isDisabled = _this$props8.isDisabled, isSearchable = _this$props8.isSearchable, inputId = _this$props8.inputId, inputValue = _this$props8.inputValue, tabIndex = _this$props8.tabIndex, form = _this$props8.form, menuIsOpen = _this$props8.menuIsOpen, required = _this$props8.required;
				var Input = this.getComponents().Input;
				var _this$state4 = this.state, inputIsHidden = _this$state4.inputIsHidden, ariaSelection = _this$state4.ariaSelection;
				var commonProps = this.commonProps;
				var id = inputId || this.getElementId("input");
				var ariaAttributes = _objectSpread2(_objectSpread2(_objectSpread2({
					"aria-autocomplete": "list",
					"aria-expanded": menuIsOpen,
					"aria-haspopup": true,
					"aria-errormessage": this.props["aria-errormessage"],
					"aria-invalid": this.props["aria-invalid"],
					"aria-label": this.props["aria-label"],
					"aria-labelledby": this.props["aria-labelledby"],
					"aria-required": required,
					role: "combobox",
					"aria-activedescendant": this.state.isAppleDevice ? void 0 : this.state.focusedOptionId || ""
				}, menuIsOpen && { "aria-controls": this.getElementId("listbox") }), !isSearchable && { "aria-readonly": true }), this.hasValue() ? (ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === "initial-input-focus" && { "aria-describedby": this.getElementId("live-region") } : { "aria-describedby": this.getElementId("placeholder") });
				if (!isSearchable) return /* @__PURE__ */ import_react.createElement(DummyInput, _extends({
					id,
					innerRef: this.getInputRef,
					onBlur: this.onInputBlur,
					onChange: noop,
					onFocus: this.onInputFocus,
					disabled: isDisabled,
					tabIndex,
					inputMode: "none",
					form,
					value: ""
				}, ariaAttributes));
				return /* @__PURE__ */ import_react.createElement(Input, _extends({}, commonProps, {
					autoCapitalize: "none",
					autoComplete: "off",
					autoCorrect: "off",
					id,
					innerRef: this.getInputRef,
					isDisabled,
					isHidden: inputIsHidden,
					onBlur: this.onInputBlur,
					onChange: this.handleInputChange,
					onFocus: this.onInputFocus,
					spellCheck: "false",
					tabIndex,
					form,
					type: "text",
					value: inputValue
				}, ariaAttributes));
			}
		},
		{
			key: "renderPlaceholderOrValue",
			value: function renderPlaceholderOrValue() {
				var _this3 = this;
				var _this$getComponents2 = this.getComponents(), MultiValue = _this$getComponents2.MultiValue, MultiValueContainer = _this$getComponents2.MultiValueContainer, MultiValueLabel = _this$getComponents2.MultiValueLabel, MultiValueRemove = _this$getComponents2.MultiValueRemove, SingleValue = _this$getComponents2.SingleValue, Placeholder = _this$getComponents2.Placeholder;
				var commonProps = this.commonProps;
				var _this$props9 = this.props, controlShouldRenderValue = _this$props9.controlShouldRenderValue, isDisabled = _this$props9.isDisabled, isMulti = _this$props9.isMulti, inputValue = _this$props9.inputValue, placeholder = _this$props9.placeholder;
				var _this$state5 = this.state, selectValue = _this$state5.selectValue, focusedValue = _this$state5.focusedValue, isFocused = _this$state5.isFocused;
				if (!this.hasValue() || !controlShouldRenderValue) return inputValue ? null : /* @__PURE__ */ import_react.createElement(Placeholder, _extends({}, commonProps, {
					key: "placeholder",
					isDisabled,
					isFocused,
					innerProps: { id: this.getElementId("placeholder") }
				}), placeholder);
				if (isMulti) return selectValue.map(function(opt, index) {
					var isOptionFocused = opt === focusedValue;
					var key = "".concat(_this3.getOptionLabel(opt), "-").concat(_this3.getOptionValue(opt));
					return /* @__PURE__ */ import_react.createElement(MultiValue, _extends({}, commonProps, {
						components: {
							Container: MultiValueContainer,
							Label: MultiValueLabel,
							Remove: MultiValueRemove
						},
						isFocused: isOptionFocused,
						isDisabled,
						key,
						index,
						removeProps: {
							onClick: function onClick() {
								return _this3.removeValue(opt);
							},
							onTouchEnd: function onTouchEnd() {
								return _this3.removeValue(opt);
							},
							onMouseDown: function onMouseDown(e) {
								e.preventDefault();
							}
						},
						data: opt
					}), _this3.formatOptionLabel(opt, "value"));
				});
				if (inputValue) return null;
				var singleValue = selectValue[0];
				return /* @__PURE__ */ import_react.createElement(SingleValue, _extends({}, commonProps, {
					data: singleValue,
					isDisabled
				}), this.formatOptionLabel(singleValue, "value"));
			}
		},
		{
			key: "renderClearIndicator",
			value: function renderClearIndicator() {
				var ClearIndicator = this.getComponents().ClearIndicator;
				var commonProps = this.commonProps;
				var _this$props10 = this.props, isDisabled = _this$props10.isDisabled, isLoading = _this$props10.isLoading;
				var isFocused = this.state.isFocused;
				if (!this.isClearable() || !ClearIndicator || isDisabled || !this.hasValue() || isLoading) return null;
				var innerProps = {
					onMouseDown: this.onClearIndicatorMouseDown,
					onTouchEnd: this.onClearIndicatorTouchEnd,
					"aria-hidden": "true"
				};
				return /* @__PURE__ */ import_react.createElement(ClearIndicator, _extends({}, commonProps, {
					innerProps,
					isFocused
				}));
			}
		},
		{
			key: "renderLoadingIndicator",
			value: function renderLoadingIndicator() {
				var LoadingIndicator = this.getComponents().LoadingIndicator;
				var commonProps = this.commonProps;
				var _this$props11 = this.props, isDisabled = _this$props11.isDisabled, isLoading = _this$props11.isLoading;
				var isFocused = this.state.isFocused;
				if (!LoadingIndicator || !isLoading) return null;
				return /* @__PURE__ */ import_react.createElement(LoadingIndicator, _extends({}, commonProps, {
					innerProps: { "aria-hidden": "true" },
					isDisabled,
					isFocused
				}));
			}
		},
		{
			key: "renderIndicatorSeparator",
			value: function renderIndicatorSeparator() {
				var _this$getComponents5 = this.getComponents(), DropdownIndicator = _this$getComponents5.DropdownIndicator, IndicatorSeparator = _this$getComponents5.IndicatorSeparator;
				if (!DropdownIndicator || !IndicatorSeparator) return null;
				var commonProps = this.commonProps;
				var isDisabled = this.props.isDisabled;
				var isFocused = this.state.isFocused;
				return /* @__PURE__ */ import_react.createElement(IndicatorSeparator, _extends({}, commonProps, {
					isDisabled,
					isFocused
				}));
			}
		},
		{
			key: "renderDropdownIndicator",
			value: function renderDropdownIndicator() {
				var DropdownIndicator = this.getComponents().DropdownIndicator;
				if (!DropdownIndicator) return null;
				var commonProps = this.commonProps;
				var isDisabled = this.props.isDisabled;
				var isFocused = this.state.isFocused;
				var innerProps = {
					onMouseDown: this.onDropdownIndicatorMouseDown,
					onTouchEnd: this.onDropdownIndicatorTouchEnd,
					"aria-hidden": "true"
				};
				return /* @__PURE__ */ import_react.createElement(DropdownIndicator, _extends({}, commonProps, {
					innerProps,
					isDisabled,
					isFocused
				}));
			}
		},
		{
			key: "renderMenu",
			value: function renderMenu() {
				var _this4 = this;
				var _this$getComponents7 = this.getComponents(), Group = _this$getComponents7.Group, GroupHeading = _this$getComponents7.GroupHeading, Menu = _this$getComponents7.Menu, MenuList = _this$getComponents7.MenuList, MenuPortal = _this$getComponents7.MenuPortal, LoadingMessage = _this$getComponents7.LoadingMessage, NoOptionsMessage = _this$getComponents7.NoOptionsMessage, Option = _this$getComponents7.Option;
				var commonProps = this.commonProps;
				var focusedOption = this.state.focusedOption;
				var _this$props12 = this.props, captureMenuScroll = _this$props12.captureMenuScroll, inputValue = _this$props12.inputValue, isLoading = _this$props12.isLoading, loadingMessage = _this$props12.loadingMessage, minMenuHeight = _this$props12.minMenuHeight, maxMenuHeight = _this$props12.maxMenuHeight, menuIsOpen = _this$props12.menuIsOpen, menuPlacement = _this$props12.menuPlacement, menuPosition = _this$props12.menuPosition, menuPortalTarget = _this$props12.menuPortalTarget, menuShouldBlockScroll = _this$props12.menuShouldBlockScroll, menuShouldScrollIntoView = _this$props12.menuShouldScrollIntoView, noOptionsMessage = _this$props12.noOptionsMessage, onMenuScrollToTop = _this$props12.onMenuScrollToTop, onMenuScrollToBottom = _this$props12.onMenuScrollToBottom;
				if (!menuIsOpen) return null;
				var render = function render(props, id) {
					var type = props.type, data = props.data, isDisabled = props.isDisabled, isSelected = props.isSelected, label = props.label, value = props.value;
					var isFocused = focusedOption === data;
					var onHover = isDisabled ? void 0 : function() {
						return _this4.onOptionHover(data);
					};
					var onSelect = isDisabled ? void 0 : function() {
						return _this4.selectOption(data);
					};
					var optionId = "".concat(_this4.getElementId("option"), "-").concat(id);
					var innerProps = {
						id: optionId,
						onClick: onSelect,
						onMouseMove: onHover,
						onMouseOver: onHover,
						tabIndex: -1,
						role: "option",
						"aria-selected": _this4.state.isAppleDevice ? void 0 : isSelected
					};
					return /* @__PURE__ */ import_react.createElement(Option, _extends({}, commonProps, {
						innerProps,
						data,
						isDisabled,
						isSelected,
						key: optionId,
						label,
						type,
						value,
						isFocused,
						innerRef: isFocused ? _this4.getFocusedOptionRef : void 0
					}), _this4.formatOptionLabel(props.data, "menu"));
				};
				var menuUI;
				if (this.hasOptions()) menuUI = this.getCategorizedOptions().map(function(item) {
					if (item.type === "group") {
						var _data = item.data, options = item.options, groupIndex = item.index;
						var groupId = "".concat(_this4.getElementId("group"), "-").concat(groupIndex);
						var headingId = "".concat(groupId, "-heading");
						return /* @__PURE__ */ import_react.createElement(Group, _extends({}, commonProps, {
							key: groupId,
							data: _data,
							options,
							Heading: GroupHeading,
							headingProps: {
								id: headingId,
								data: item.data
							},
							label: _this4.formatGroupLabel(item.data)
						}), item.options.map(function(option) {
							return render(option, "".concat(groupIndex, "-").concat(option.index));
						}));
					} else if (item.type === "option") return render(item, "".concat(item.index));
				});
				else if (isLoading) {
					var message = loadingMessage({ inputValue });
					if (message === null) return null;
					menuUI = /* @__PURE__ */ import_react.createElement(LoadingMessage, commonProps, message);
				} else {
					var _message = noOptionsMessage({ inputValue });
					if (_message === null) return null;
					menuUI = /* @__PURE__ */ import_react.createElement(NoOptionsMessage, commonProps, _message);
				}
				var menuPlacementProps = {
					minMenuHeight,
					maxMenuHeight,
					menuPlacement,
					menuPosition,
					menuShouldScrollIntoView
				};
				var menuElement = /* @__PURE__ */ import_react.createElement(MenuPlacer, _extends({}, commonProps, menuPlacementProps), function(_ref4) {
					var ref = _ref4.ref, _ref4$placerProps = _ref4.placerProps, placement = _ref4$placerProps.placement, maxHeight = _ref4$placerProps.maxHeight;
					return /* @__PURE__ */ import_react.createElement(Menu, _extends({}, commonProps, menuPlacementProps, {
						innerRef: ref,
						innerProps: {
							onMouseDown: _this4.onMenuMouseDown,
							onMouseMove: _this4.onMenuMouseMove
						},
						isLoading,
						placement
					}), /* @__PURE__ */ import_react.createElement(ScrollManager, {
						captureEnabled: captureMenuScroll,
						onTopArrive: onMenuScrollToTop,
						onBottomArrive: onMenuScrollToBottom,
						lockEnabled: menuShouldBlockScroll
					}, function(scrollTargetRef) {
						return /* @__PURE__ */ import_react.createElement(MenuList, _extends({}, commonProps, {
							innerRef: function innerRef(instance) {
								_this4.getMenuListRef(instance);
								scrollTargetRef(instance);
							},
							innerProps: {
								role: "listbox",
								"aria-multiselectable": commonProps.isMulti,
								id: _this4.getElementId("listbox")
							},
							isLoading,
							maxHeight,
							focusedOption
						}), menuUI);
					}));
				});
				return menuPortalTarget || menuPosition === "fixed" ? /* @__PURE__ */ import_react.createElement(MenuPortal, _extends({}, commonProps, {
					appendTo: menuPortalTarget,
					controlElement: this.controlRef,
					menuPlacement,
					menuPosition
				}), menuElement) : menuElement;
			}
		},
		{
			key: "renderFormField",
			value: function renderFormField() {
				var _this5 = this;
				var _this$props13 = this.props, delimiter = _this$props13.delimiter, isDisabled = _this$props13.isDisabled, isMulti = _this$props13.isMulti, name = _this$props13.name, required = _this$props13.required;
				var selectValue = this.state.selectValue;
				if (required && !this.hasValue() && !isDisabled) return /* @__PURE__ */ import_react.createElement(RequiredInput$1, {
					name,
					onFocus: this.onValueInputFocus
				});
				if (!name || isDisabled) return;
				if (isMulti) if (delimiter) {
					var value = selectValue.map(function(opt) {
						return _this5.getOptionValue(opt);
					}).join(delimiter);
					return /* @__PURE__ */ import_react.createElement("input", {
						name,
						type: "hidden",
						value
					});
				} else {
					var input = selectValue.length > 0 ? selectValue.map(function(opt, i) {
						return /* @__PURE__ */ import_react.createElement("input", {
							key: "i-".concat(i),
							name,
							type: "hidden",
							value: _this5.getOptionValue(opt)
						});
					}) : /* @__PURE__ */ import_react.createElement("input", {
						name,
						type: "hidden",
						value: ""
					});
					return /* @__PURE__ */ import_react.createElement("div", null, input);
				}
				else {
					var _value = selectValue[0] ? this.getOptionValue(selectValue[0]) : "";
					return /* @__PURE__ */ import_react.createElement("input", {
						name,
						type: "hidden",
						value: _value
					});
				}
			}
		},
		{
			key: "renderLiveRegion",
			value: function renderLiveRegion() {
				var commonProps = this.commonProps;
				var _this$state6 = this.state, ariaSelection = _this$state6.ariaSelection, focusedOption = _this$state6.focusedOption, focusedValue = _this$state6.focusedValue, isFocused = _this$state6.isFocused, selectValue = _this$state6.selectValue;
				var focusableOptions = this.getFocusableOptions();
				return /* @__PURE__ */ import_react.createElement(LiveRegion$1, _extends({}, commonProps, {
					id: this.getElementId("live-region"),
					ariaSelection,
					focusedOption,
					focusedValue,
					isFocused,
					selectValue,
					focusableOptions,
					isAppleDevice: this.state.isAppleDevice
				}));
			}
		},
		{
			key: "render",
			value: function render() {
				var _this$getComponents8 = this.getComponents(), Control = _this$getComponents8.Control, IndicatorsContainer = _this$getComponents8.IndicatorsContainer, SelectContainer = _this$getComponents8.SelectContainer, ValueContainer = _this$getComponents8.ValueContainer;
				var _this$props14 = this.props, className = _this$props14.className, id = _this$props14.id, isDisabled = _this$props14.isDisabled, menuIsOpen = _this$props14.menuIsOpen;
				var isFocused = this.state.isFocused;
				var commonProps = this.commonProps = this.getCommonProps();
				return /* @__PURE__ */ import_react.createElement(SelectContainer, _extends({}, commonProps, {
					className,
					innerProps: {
						id,
						onKeyDown: this.onKeyDown
					},
					isDisabled,
					isFocused
				}), this.renderLiveRegion(), /* @__PURE__ */ import_react.createElement(Control, _extends({}, commonProps, {
					innerRef: this.getControlRef,
					innerProps: {
						onMouseDown: this.onControlMouseDown,
						onTouchEnd: this.onControlTouchEnd
					},
					isDisabled,
					isFocused,
					menuIsOpen
				}), /* @__PURE__ */ import_react.createElement(ValueContainer, _extends({}, commonProps, { isDisabled }), this.renderPlaceholderOrValue(), this.renderInput()), /* @__PURE__ */ import_react.createElement(IndicatorsContainer, _extends({}, commonProps, { isDisabled }), this.renderClearIndicator(), this.renderLoadingIndicator(), this.renderIndicatorSeparator(), this.renderDropdownIndicator())), this.renderMenu(), this.renderFormField());
			}
		}
	], [{
		key: "getDerivedStateFromProps",
		value: function getDerivedStateFromProps(props, state) {
			var prevProps = state.prevProps, clearFocusValueOnUpdate = state.clearFocusValueOnUpdate, inputIsHiddenAfterUpdate = state.inputIsHiddenAfterUpdate, ariaSelection = state.ariaSelection, isFocused = state.isFocused, prevWasFocused = state.prevWasFocused, instancePrefix = state.instancePrefix;
			var options = props.options, value = props.value, menuIsOpen = props.menuIsOpen, inputValue = props.inputValue, isMulti = props.isMulti;
			var selectValue = cleanValue(value);
			var newMenuOptionsState = {};
			if (prevProps && (value !== prevProps.value || options !== prevProps.options || menuIsOpen !== prevProps.menuIsOpen || inputValue !== prevProps.inputValue)) {
				var focusableOptions = menuIsOpen ? buildFocusableOptions(props, selectValue) : [];
				var focusableOptionsWithIds = menuIsOpen ? buildFocusableOptionsWithIds(buildCategorizedOptions(props, selectValue), "".concat(instancePrefix, "-option")) : [];
				var focusedValue = clearFocusValueOnUpdate ? getNextFocusedValue(state, selectValue) : null;
				var focusedOption = getNextFocusedOption(state, focusableOptions);
				newMenuOptionsState = {
					selectValue,
					focusedOption,
					focusedOptionId: getFocusedOptionId(focusableOptionsWithIds, focusedOption),
					focusableOptionsWithIds,
					focusedValue,
					clearFocusValueOnUpdate: false
				};
			}
			var newInputIsHiddenState = inputIsHiddenAfterUpdate != null && props !== prevProps ? {
				inputIsHidden: inputIsHiddenAfterUpdate,
				inputIsHiddenAfterUpdate: void 0
			} : {};
			var newAriaSelection = ariaSelection;
			var hasKeptFocus = isFocused && prevWasFocused;
			if (isFocused && !hasKeptFocus) {
				newAriaSelection = {
					value: valueTernary(isMulti, selectValue, selectValue[0] || null),
					options: selectValue,
					action: "initial-input-focus"
				};
				hasKeptFocus = !prevWasFocused;
			}
			if ((ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === "initial-input-focus") newAriaSelection = null;
			return _objectSpread2(_objectSpread2(_objectSpread2({}, newMenuOptionsState), newInputIsHiddenState), {}, {
				prevProps: props,
				ariaSelection: newAriaSelection,
				prevWasFocused: hasKeptFocus
			});
		}
	}]);
	return Select;
}(import_react.Component);
Select.defaultProps = defaultProps;
//#endregion
export { components as a, CacheProvider as c, mergeStyles as i, useStateManager as l, createFilter as n, handleInputChange as o, defaultTheme as r, index as s, Select as t };

//# sourceMappingURL=Select-ef7c0426.esm-BqgWmG2f.js.map