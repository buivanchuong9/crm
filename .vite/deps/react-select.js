import { o as __toESM } from "./chunk-CqwQKh_b.js";
import { t as require_react } from "./react.js";
import { t as require_react_dom } from "./react-dom-CtbBIW7I.js";
import { a as createCache } from "./emotion-utils.browser.esm-DWszUutH.js";
import { i as init_extends, r as _extends } from "./objectWithoutPropertiesLoose-D2gR1fFq.js";
import { a as components, c as CacheProvider, i as mergeStyles, l as useStateManager, n as createFilter, r as defaultTheme, t as Select } from "./Select-ef7c0426.esm-DHfi5gly.js";
//#region node_modules/react-select/dist/react-select.esm.js
init_extends();
var import_react = /* @__PURE__ */ __toESM(require_react());
require_react_dom();
var StateManagedSelect$1 = /* @__PURE__ */ (0, import_react.forwardRef)(function(props, ref) {
	var baseSelectProps = useStateManager(props);
	return /* @__PURE__ */ import_react.createElement(Select, _extends({ ref }, baseSelectProps));
});
var NonceProvider = (function(_ref) {
	var nonce = _ref.nonce, children = _ref.children, cacheKey = _ref.cacheKey;
	var emotionCache = (0, import_react.useMemo)(function() {
		return createCache({
			key: cacheKey,
			nonce
		});
	}, [cacheKey, nonce]);
	return /* @__PURE__ */ import_react.createElement(CacheProvider, { value: emotionCache }, children);
});
//#endregion
export { NonceProvider, components, createFilter, StateManagedSelect$1 as default, defaultTheme, mergeStyles, useStateManager };

//# sourceMappingURL=react-select.js.map