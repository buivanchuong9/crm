import { o as __toESM } from "./chunk-CqwQKh_b.js";
import { t as require_react } from "./react.js";
import { t as require_hoist_non_react_statics_cjs } from "./hoist-non-react-statics.cjs-BHYnXnpR.js";
import { t as es6_default } from "./es6-Dc4w8iOX.js";
//#region node_modules/react-cookie/es6/Cookies.js
var Cookies_default = es6_default;
//#endregion
//#region node_modules/react-cookie/es6/CookiesContext.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var CookiesContext = import_react.createContext(new Cookies_default());
var Provider = CookiesContext.Provider;
var Consumer = CookiesContext.Consumer;
//#endregion
//#region node_modules/react-cookie/es6/CookiesProvider.js
var __extends$1 = (function() {
	var extendStatics = function(d, b) {
		extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
			d.__proto__ = b;
		} || function(d, b) {
			for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		};
		return extendStatics(d, b);
	};
	return function(d, b) {
		extendStatics(d, b);
		function __() {
			this.constructor = d;
		}
		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
})();
var CookiesProvider = function(_super) {
	__extends$1(CookiesProvider, _super);
	function CookiesProvider(props) {
		var _this = _super.call(this, props) || this;
		if (props.cookies) _this.cookies = props.cookies;
		else _this.cookies = new es6_default();
		return _this;
	}
	CookiesProvider.prototype.render = function() {
		return import_react.createElement(Provider, { value: this.cookies }, this.props.children);
	};
	return CookiesProvider;
}(import_react.Component);
//#endregion
//#region node_modules/react-cookie/es6/withCookies.js
var import_hoist_non_react_statics_cjs = /* @__PURE__ */ __toESM(require_hoist_non_react_statics_cjs());
var __extends = (function() {
	var extendStatics = function(d, b) {
		extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
			d.__proto__ = b;
		} || function(d, b) {
			for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		};
		return extendStatics(d, b);
	};
	return function(d, b) {
		extendStatics(d, b);
		function __() {
			this.constructor = d;
		}
		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
})();
var __assign = function() {
	__assign = Object.assign || function(t) {
		for (var s, i = 1, n = arguments.length; i < n; i++) {
			s = arguments[i];
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
		}
		return t;
	};
	return __assign.apply(this, arguments);
};
var __rest = function(s, e) {
	var t = {};
	for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	if (s != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
	}
	return t;
};
function withCookies(WrappedComponent) {
	var name = WrappedComponent.displayName || WrappedComponent.name;
	var CookieWrapper = function(_super) {
		__extends(CookieWrapper, _super);
		function CookieWrapper() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.onChange = function() {
				_this.forceUpdate();
			};
			return _this;
		}
		CookieWrapper.prototype.listen = function() {
			this.props.cookies.addChangeListener(this.onChange);
		};
		CookieWrapper.prototype.unlisten = function(cookies) {
			(cookies || this.props.cookies).removeChangeListener(this.onChange);
		};
		CookieWrapper.prototype.componentDidMount = function() {
			this.listen();
		};
		CookieWrapper.prototype.componentDidUpdate = function(prevProps) {
			if (prevProps.cookies !== this.props.cookies) {
				this.unlisten(prevProps.cookies);
				this.listen();
			}
		};
		CookieWrapper.prototype.componentWillUnmount = function() {
			this.unlisten();
		};
		CookieWrapper.prototype.render = function() {
			var _a = this.props, forwardedRef = _a.forwardedRef, cookies = _a.cookies, restProps = __rest(_a, ["forwardedRef", "cookies"]);
			var allCookies = cookies.getAll();
			return import_react.createElement(WrappedComponent, __assign({}, restProps, {
				ref: forwardedRef,
				cookies,
				allCookies
			}));
		};
		CookieWrapper.displayName = "withCookies(" + name + ")";
		CookieWrapper.WrappedComponent = WrappedComponent;
		return CookieWrapper;
	}(import_react.Component);
	var ForwardedComponent = import_react.forwardRef(function(props, ref) {
		return import_react.createElement(Consumer, null, function(cookies) {
			return import_react.createElement(CookieWrapper, __assign({ cookies }, props, { forwardedRef: ref }));
		});
	});
	ForwardedComponent.displayName = CookieWrapper.displayName;
	ForwardedComponent.WrappedComponent = CookieWrapper.WrappedComponent;
	return (0, import_hoist_non_react_statics_cjs.default)(ForwardedComponent, WrappedComponent);
}
//#endregion
//#region node_modules/react-cookie/es6/utils.js
function isInBrowser() {
	return typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
}
//#endregion
//#region node_modules/react-cookie/es6/useCookies.js
function useCookies(dependencies) {
	var cookies = (0, import_react.useContext)(CookiesContext);
	if (!cookies) throw new Error("Missing <CookiesProvider>");
	var _a = (0, import_react.useState)(cookies.getAll()), allCookies = _a[0], setCookies = _a[1];
	var previousCookiesRef = (0, import_react.useRef)(allCookies);
	if (isInBrowser()) (0, import_react.useLayoutEffect)(function() {
		function onChange() {
			var newCookies = cookies.getAll();
			if (shouldUpdate(dependencies || null, newCookies, previousCookiesRef.current)) setCookies(newCookies);
			previousCookiesRef.current = newCookies;
		}
		cookies.addChangeListener(onChange);
		return function() {
			cookies.removeChangeListener(onChange);
		};
	}, [cookies]);
	return [
		allCookies,
		(0, import_react.useMemo)(function() {
			return cookies.set.bind(cookies);
		}, [cookies]),
		(0, import_react.useMemo)(function() {
			return cookies.remove.bind(cookies);
		}, [cookies])
	];
}
function shouldUpdate(dependencies, newCookies, oldCookies) {
	if (!dependencies) return true;
	for (var _i = 0, dependencies_1 = dependencies; _i < dependencies_1.length; _i++) {
		var dependency = dependencies_1[_i];
		if (newCookies[dependency] !== oldCookies[dependency]) return true;
	}
	return false;
}
//#endregion
export { Cookies_default as Cookies, CookiesProvider, useCookies, withCookies };

//# sourceMappingURL=react-cookie.js.map