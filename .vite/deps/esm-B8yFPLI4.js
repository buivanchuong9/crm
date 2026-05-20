import { o as __toESM, t as __commonJSMin } from "./chunk-CqwQKh_b.js";
import { t as require_react } from "./react.js";
import { t as require_react_dom } from "./react-dom-CtbBIW7I.js";
import { a as hide_default, c as computeStyles_default, f as placements, i as offset_default, l as arrow_default, n as preventOverflow_default, o as flip_default, r as popperOffsets_default, s as eventListeners_default, t as popperGenerator } from "./createPopper-ByueyzM-.js";
import { t as require_prop_types } from "./prop-types-DWpwruwU.js";
import { i as init_extends, n as init_objectWithoutPropertiesLoose, r as _extends, t as _objectWithoutPropertiesLoose } from "./objectWithoutPropertiesLoose-D2gR1fFq.js";
import { t as _inheritsLoose } from "./inheritsLoose-CpmUp4o_.js";
//#region node_modules/invariant/browser.js
/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Use invariant() to assert state which your program assumes to be true.
	*
	* Provide sprintf-style format (only %s is supported) and arguments
	* to provide information about what broke and what you were
	* expecting.
	*
	* The invariant message will be stripped in production, but the invariant
	* will remain to ensure logic does not differ in production.
	*/
	var invariant = function(condition, format, a, b, c, d, e, f) {
		if (format === void 0) throw new Error("invariant requires an error message argument");
		if (!condition) {
			var error;
			if (format === void 0) error = /* @__PURE__ */ new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
			else {
				var args = [
					a,
					b,
					c,
					d,
					e,
					f
				];
				var argIndex = 0;
				error = new Error(format.replace(/%s/g, function() {
					return args[argIndex++];
				}));
				error.name = "Invariant Violation";
			}
			error.framesToPop = 1;
			throw error;
		}
	};
	module.exports = invariant;
}));
//#endregion
//#region node_modules/uncontrollable/lib/esm/utils.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types());
var import_browser = /* @__PURE__ */ __toESM(require_browser());
var noop$3 = function noop() {};
function readOnlyPropType(handler, name) {
	return function(props, propName) {
		if (props[propName] !== void 0) {
			if (!props[handler]) return /* @__PURE__ */ new Error("You have provided a `" + propName + "` prop to `" + name + "` " + ("without an `" + handler + "` handler prop. This will render a read-only field. ") + ("If the field should be mutable use `" + defaultKey(propName) + "`. ") + ("Otherwise, set `" + handler + "`."));
		}
	};
}
function uncontrolledPropTypes(controlledValues, displayName) {
	var propTypes = {};
	Object.keys(controlledValues).forEach(function(prop) {
		propTypes[defaultKey(prop)] = noop$3;
		var handler = controlledValues[prop];
		!(typeof handler === "string" && handler.trim().length) && (0, import_browser.default)(false, "Uncontrollable - [%s]: the prop `%s` needs a valid handler key name in order to make it uncontrollable", displayName, prop);
		propTypes[prop] = readOnlyPropType(handler, displayName);
	});
	return propTypes;
}
function isProp(props, prop) {
	return props[prop] !== void 0;
}
function defaultKey(key) {
	return "default" + key.charAt(0).toUpperCase() + key.substr(1);
}
/**
* Copyright (c) 2013-present, Facebook, Inc.
* All rights reserved.
*
* This source code is licensed under the BSD-style license found in the
* LICENSE file in the root directory of this source tree. An additional grant
* of patent rights can be found in the PATENTS file in the same directory.
*/
function canAcceptRef(component) {
	return !!component && (typeof component !== "function" || component.prototype && component.prototype.isReactComponent);
}
//#endregion
//#region node_modules/uncontrollable/lib/esm/hook.js
function useUncontrolledProp(propValue, defaultValue, handler) {
	var wasPropRef = (0, import_react.useRef)(propValue !== void 0);
	var _useState = (0, import_react.useState)(defaultValue), stateValue = _useState[0], setState = _useState[1];
	var isProp = propValue !== void 0;
	var wasProp = wasPropRef.current;
	wasPropRef.current = isProp;
	/**
	* If a prop switches from controlled to Uncontrolled
	* reset its value to the defaultValue
	*/
	if (!isProp && wasProp && stateValue !== defaultValue) setState(defaultValue);
	return [isProp ? propValue : stateValue, (0, import_react.useCallback)(function(value) {
		for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
		if (handler) handler.apply(void 0, [value].concat(args));
		setState(value);
	}, [handler])];
}
//#endregion
//#region node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js
/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
function componentWillMount() {
	var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
	if (state !== null && state !== void 0) this.setState(state);
}
function componentWillReceiveProps(nextProps) {
	function updater(prevState) {
		var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
		return state !== null && state !== void 0 ? state : null;
	}
	this.setState(updater.bind(this));
}
function componentWillUpdate(nextProps, nextState) {
	try {
		var prevProps = this.props;
		var prevState = this.state;
		this.props = nextProps;
		this.state = nextState;
		this.__reactInternalSnapshotFlag = true;
		this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(prevProps, prevState);
	} finally {
		this.props = prevProps;
		this.state = prevState;
	}
}
componentWillMount.__suppressDeprecationWarning = true;
componentWillReceiveProps.__suppressDeprecationWarning = true;
componentWillUpdate.__suppressDeprecationWarning = true;
function polyfill(Component) {
	var prototype = Component.prototype;
	if (!prototype || !prototype.isReactComponent) throw new Error("Can only polyfill class components");
	if (typeof Component.getDerivedStateFromProps !== "function" && typeof prototype.getSnapshotBeforeUpdate !== "function") return Component;
	var foundWillMountName = null;
	var foundWillReceivePropsName = null;
	var foundWillUpdateName = null;
	if (typeof prototype.componentWillMount === "function") foundWillMountName = "componentWillMount";
	else if (typeof prototype.UNSAFE_componentWillMount === "function") foundWillMountName = "UNSAFE_componentWillMount";
	if (typeof prototype.componentWillReceiveProps === "function") foundWillReceivePropsName = "componentWillReceiveProps";
	else if (typeof prototype.UNSAFE_componentWillReceiveProps === "function") foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps";
	if (typeof prototype.componentWillUpdate === "function") foundWillUpdateName = "componentWillUpdate";
	else if (typeof prototype.UNSAFE_componentWillUpdate === "function") foundWillUpdateName = "UNSAFE_componentWillUpdate";
	if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
		var componentName = Component.displayName || Component.name;
		var newApiName = typeof Component.getDerivedStateFromProps === "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
		throw Error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n" + componentName + " uses " + newApiName + " but also contains the following legacy lifecycles:" + (foundWillMountName !== null ? "\n  " + foundWillMountName : "") + (foundWillReceivePropsName !== null ? "\n  " + foundWillReceivePropsName : "") + (foundWillUpdateName !== null ? "\n  " + foundWillUpdateName : "") + "\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks");
	}
	if (typeof Component.getDerivedStateFromProps === "function") {
		prototype.componentWillMount = componentWillMount;
		prototype.componentWillReceiveProps = componentWillReceiveProps;
	}
	if (typeof prototype.getSnapshotBeforeUpdate === "function") {
		if (typeof prototype.componentDidUpdate !== "function") throw new Error("Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype");
		prototype.componentWillUpdate = componentWillUpdate;
		var componentDidUpdate = prototype.componentDidUpdate;
		prototype.componentDidUpdate = function componentDidUpdatePolyfill(prevProps, prevState, maybeSnapshot) {
			var snapshot = this.__reactInternalSnapshotFlag ? this.__reactInternalSnapshot : maybeSnapshot;
			componentDidUpdate.call(this, prevProps, prevState, snapshot);
		};
	}
	return Component;
}
//#endregion
//#region node_modules/uncontrollable/lib/esm/uncontrollable.js
init_objectWithoutPropertiesLoose();
init_extends();
var _jsxFileName = "/Users/jquense/src/uncontrollable/src/uncontrollable.js";
function uncontrollable(Component, controlledValues, methods) {
	if (methods === void 0) methods = [];
	var displayName = Component.displayName || Component.name || "Component";
	var canAcceptRef$1 = canAcceptRef(Component);
	var controlledProps = Object.keys(controlledValues);
	var PROPS_TO_OMIT = controlledProps.map(defaultKey);
	!(canAcceptRef$1 || !methods.length) && (0, import_browser.default)(false, "[uncontrollable] stateless function components cannot pass through methods because they have no associated instances. Check component: " + displayName + ", attempting to pass through methods: " + methods.join(", "));
	var UncontrolledComponent = /* @__PURE__ */ function(_React$Component) {
		_inheritsLoose(UncontrolledComponent, _React$Component);
		function UncontrolledComponent() {
			var _this;
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
			_this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
			_this.handlers = Object.create(null);
			controlledProps.forEach(function(propName) {
				var handlerName = controlledValues[propName];
				var handleChange = function handleChange(value) {
					if (_this.props[handlerName]) {
						var _this$props;
						_this._notifying = true;
						for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
						(_this$props = _this.props)[handlerName].apply(_this$props, [value].concat(args));
						_this._notifying = false;
					}
					if (!_this.unmounted) _this.setState(function(_ref) {
						var _extends2;
						var values = _ref.values;
						return { values: _extends(Object.create(null), values, (_extends2 = {}, _extends2[propName] = value, _extends2)) };
					});
				};
				_this.handlers[handlerName] = handleChange;
			});
			if (methods.length) _this.attachRef = function(ref) {
				_this.inner = ref;
			};
			var values = Object.create(null);
			controlledProps.forEach(function(key) {
				values[key] = _this.props[defaultKey(key)];
			});
			_this.state = {
				values,
				prevProps: {}
			};
			return _this;
		}
		var _proto = UncontrolledComponent.prototype;
		_proto.shouldComponentUpdate = function shouldComponentUpdate() {
			return !this._notifying;
		};
		UncontrolledComponent.getDerivedStateFromProps = function getDerivedStateFromProps(props, _ref2) {
			var values = _ref2.values, prevProps = _ref2.prevProps;
			var nextState = {
				values: _extends(Object.create(null), values),
				prevProps: {}
			};
			controlledProps.forEach(function(key) {
				/**
				* If a prop switches from controlled to Uncontrolled
				* reset its value to the defaultValue
				*/
				nextState.prevProps[key] = props[key];
				if (!isProp(props, key) && isProp(prevProps, key)) nextState.values[key] = props[defaultKey(key)];
			});
			return nextState;
		};
		_proto.componentWillUnmount = function componentWillUnmount() {
			this.unmounted = true;
		};
		_proto.render = function render() {
			var _this2 = this;
			var _this$props2 = this.props, innerRef = _this$props2.innerRef, props = _objectWithoutPropertiesLoose(_this$props2, ["innerRef"]);
			PROPS_TO_OMIT.forEach(function(prop) {
				delete props[prop];
			});
			var newProps = {};
			controlledProps.forEach(function(propName) {
				var propValue = _this2.props[propName];
				newProps[propName] = propValue !== void 0 ? propValue : _this2.state.values[propName];
			});
			return import_react.createElement(Component, _extends({}, props, newProps, this.handlers, { ref: innerRef || this.attachRef }));
		};
		return UncontrolledComponent;
	}(import_react.Component);
	polyfill(UncontrolledComponent);
	UncontrolledComponent.displayName = "Uncontrolled(" + displayName + ")";
	UncontrolledComponent.propTypes = _extends({ innerRef: function innerRef() {} }, uncontrolledPropTypes(controlledValues, displayName));
	methods.forEach(function(method) {
		UncontrolledComponent.prototype[method] = function $proxiedMethod() {
			var _this$inner;
			return (_this$inner = this.inner)[method].apply(_this$inner, arguments);
		};
	});
	var WrappedComponent = UncontrolledComponent;
	if (import_react.forwardRef) {
		WrappedComponent = import_react.forwardRef(function(props, ref) {
			return import_react.createElement(UncontrolledComponent, _extends({}, props, {
				innerRef: ref,
				__source: {
					fileName: _jsxFileName,
					lineNumber: 128
				},
				__self: this
			}));
		});
		WrappedComponent.propTypes = UncontrolledComponent.propTypes;
	}
	WrappedComponent.ControlledComponent = Component;
	/**
	* useful when wrapping a Component and you want to control
	* everything
	*/
	WrappedComponent.deferControlTo = function(newComponent, additions, nextMethods) {
		if (additions === void 0) additions = {};
		return uncontrollable(newComponent, _extends({}, controlledValues, additions), nextMethods);
	};
	return WrappedComponent;
}
//#endregion
//#region node_modules/dom-helpers/esm/ownerDocument.js
/**
* Returns the owner document of a given element.
* 
* @param node the element
*/
function ownerDocument(node) {
	return node && node.ownerDocument || document;
}
//#endregion
//#region node_modules/dom-helpers/esm/ownerWindow.js
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
/**
* Returns the owner window of a given element.
* 
* @param node the element
*/
function ownerWindow(node) {
	var doc = ownerDocument(node);
	return doc && doc.defaultView || window;
}
//#endregion
//#region node_modules/dom-helpers/esm/getComputedStyle.js
/**
* Returns one or all computed style properties of an element.
* 
* @param node the element
* @param psuedoElement the style property
*/
function getComputedStyle(node, psuedoElement) {
	return ownerWindow(node).getComputedStyle(node, psuedoElement);
}
//#endregion
//#region node_modules/dom-helpers/esm/hyphenate.js
var rUpper = /([A-Z])/g;
function hyphenate(string) {
	return string.replace(rUpper, "-$1").toLowerCase();
}
//#endregion
//#region node_modules/dom-helpers/esm/hyphenateStyle.js
/**
* Copyright 2013-2014, Facebook, Inc.
* All rights reserved.
* https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
*/
var msPattern = /^ms-/;
function hyphenateStyleName(string) {
	return hyphenate(string).replace(msPattern, "-ms-");
}
//#endregion
//#region node_modules/dom-helpers/esm/isTransform.js
var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
function isTransform(value) {
	return !!(value && supportedTransforms.test(value));
}
//#endregion
//#region node_modules/dom-helpers/esm/css.js
function style(node, property) {
	var css = "";
	var transforms = "";
	if (typeof property === "string") return node.style.getPropertyValue(hyphenateStyleName(property)) || getComputedStyle(node).getPropertyValue(hyphenateStyleName(property));
	Object.keys(property).forEach(function(key) {
		var value = property[key];
		if (!value && value !== 0) node.style.removeProperty(hyphenateStyleName(key));
		else if (isTransform(key)) transforms += key + "(" + value + ") ";
		else css += hyphenateStyleName(key) + ": " + value + ";";
	});
	if (transforms) css += "transform: " + transforms + ";";
	node.style.cssText += ";" + css;
}
//#endregion
//#region node_modules/dom-helpers/esm/contains.js
/**
* Checks if an element contains another given element.
* 
* @param context the context element
* @param node the element to check
*/
function contains(context, node) {
	if (context.contains) return context.contains(node);
	if (context.compareDocumentPosition) return context === node || !!(context.compareDocumentPosition(node) & 16);
}
//#endregion
//#region node_modules/dom-helpers/esm/isDocument.js
function isDocument(element) {
	return "nodeType" in element && element.nodeType === document.DOCUMENT_NODE;
}
//#endregion
//#region node_modules/dom-helpers/esm/isWindow.js
function isWindow(node) {
	if ("window" in node && node.window === node) return node;
	if (isDocument(node)) return node.defaultView || false;
	return false;
}
//#endregion
//#region node_modules/dom-helpers/esm/canUseDOM.js
var canUseDOM_default = !!(typeof window !== "undefined" && window.document && window.document.createElement);
//#endregion
//#region node_modules/dom-helpers/esm/matches.js
var matchesImpl;
/**
* Checks if a given element matches a selector.
* 
* @param node the element
* @param selector the selector
*/
function matches(node, selector) {
	if (!matchesImpl) {
		var body = document.body;
		var nativeMatch = body.matches || body.matchesSelector || body.webkitMatchesSelector || body.mozMatchesSelector || body.msMatchesSelector;
		matchesImpl = function matchesImpl(n, s) {
			return nativeMatch.call(n, s);
		};
	}
	return matchesImpl(node, selector);
}
//#endregion
//#region node_modules/dom-helpers/esm/querySelectorAll.js
var toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);
/**
* Runs `querySelectorAll` on a given element.
* 
* @param element the element
* @param selector the selector
*/
function qsa(element, selector) {
	return toArray(element.querySelectorAll(selector));
}
//#endregion
//#region node_modules/dom-helpers/esm/addEventListener.js
var optionsSupported = false;
var onceSupported = false;
try {
	var options = {
		get passive() {
			return optionsSupported = true;
		},
		get once() {
			return onceSupported = optionsSupported = true;
		}
	};
	if (canUseDOM_default) {
		window.addEventListener("test", options, options);
		window.removeEventListener("test", options, true);
	}
} catch (e) {}
/**
* An `addEventListener` ponyfill, supports the `once` option
* 
* @param node the element
* @param eventName the event name
* @param handle the handler
* @param options event options
*/
function addEventListener(node, eventName, handler, options) {
	if (options && typeof options !== "boolean" && !onceSupported) {
		var once = options.once, capture = options.capture;
		var wrappedHandler = handler;
		if (!onceSupported && once) {
			wrappedHandler = handler.__once || function onceHandler(event) {
				this.removeEventListener(eventName, onceHandler, capture);
				handler.call(this, event);
			};
			handler.__once = wrappedHandler;
		}
		node.addEventListener(eventName, wrappedHandler, optionsSupported ? options : capture);
	}
	node.addEventListener(eventName, handler, options);
}
//#endregion
//#region node_modules/@restart/hooks/esm/usePrevious.js
/**
* Store the last of some value. Tracked via a `Ref` only updating it
* after the component renders.
*
* Helpful if you need to compare a prop value to it's previous value during render.
*
* ```ts
* function Component(props) {
*   const lastProps = usePrevious(props)
*
*   if (lastProps.foo !== props.foo)
*     resetValueFromProps(props.foo)
* }
* ```
*
* @param value the value to track
*/
function usePrevious(value) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		ref.current = value;
	});
	return ref.current;
}
//#endregion
//#region node_modules/@restart/hooks/esm/useForceUpdate.js
/**
* Returns a function that triggers a component update. the hook equivalent to
* `this.forceUpdate()` in a class component. In most cases using a state value directly
* is preferable but may be required in some advanced usages of refs for interop or
* when direct DOM manipulation is required.
*
* ```ts
* const forceUpdate = useForceUpdate();
*
* const updateOnClick = useCallback(() => {
*  forceUpdate()
* }, [forceUpdate])
*
* return <button type="button" onClick={updateOnClick}>Hi there</button>
* ```
*/
function useForceUpdate() {
	const [, dispatch] = (0, import_react.useReducer)((state) => !state, false);
	return dispatch;
}
//#endregion
//#region node_modules/@restart/hooks/esm/useCommittedRef.js
/**
* Creates a `Ref` whose value is updated in an effect, ensuring the most recent
* value is the one rendered with. Generally only required for Concurrent mode usage
* where previous work in `render()` may be discarded before being used.
*
* This is safe to access in an event handler.
*
* @param value The `Ref` value
*/
function useCommittedRef(value) {
	const ref = (0, import_react.useRef)(value);
	(0, import_react.useEffect)(() => {
		ref.current = value;
	}, [value]);
	return ref;
}
//#endregion
//#region node_modules/@restart/hooks/esm/useEventCallback.js
function useEventCallback(fn) {
	const ref = useCommittedRef(fn);
	return (0, import_react.useCallback)(function(...args) {
		return ref.current && ref.current(...args);
	}, [ref]);
}
//#endregion
//#region node_modules/@restart/hooks/esm/useEventListener.js
/**
* Attaches an event handler outside directly to specified DOM element
* bypassing the react synthetic event system.
*
* @param element The target to listen for events on
* @param event The DOM event name
* @param handler An event handler
* @param capture Whether or not to listen during the capture event phase
*/
function useEventListener(eventTarget, event, listener, capture = false) {
	const handler = useEventCallback(listener);
	(0, import_react.useEffect)(() => {
		const target = typeof eventTarget === "function" ? eventTarget() : eventTarget;
		target.addEventListener(event, handler, capture);
		return () => target.removeEventListener(event, handler, capture);
	}, [eventTarget]);
}
//#endregion
//#region node_modules/@restart/hooks/esm/useGlobalListener.js
/**
* Attaches an event handler outside directly to the `document`,
* bypassing the react synthetic event system.
*
* ```ts
* useGlobalListener('keydown', (event) => {
*  console.log(event.key)
* })
* ```
*
* @param event The DOM event name
* @param handler An event handler
* @param capture Whether or not to listen during the capture event phase
*/
function useGlobalListener(event, handler, capture = false) {
	return useEventListener((0, import_react.useCallback)(() => document, []), event, handler, capture);
}
//#endregion
//#region node_modules/react-overlays/esm/DropdownContext.js
var DropdownContext = /* @__PURE__ */ import_react.createContext(null);
//#endregion
//#region node_modules/@restart/hooks/esm/useCallbackRef.js
/**
* A convenience hook around `useState` designed to be paired with
* the component [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) api.
* Callback refs are useful over `useRef()` when you need to respond to the ref being set
* instead of lazily accessing it in an effect.
*
* ```ts
* const [element, attachRef] = useCallbackRef<HTMLDivElement>()
*
* useEffect(() => {
*   if (!element) return
*
*   const calendar = new FullCalendar.Calendar(element)
*
*   return () => {
*     calendar.destroy()
*   }
* }, [element])
*
* return <div ref={attachRef} />
* ```
*
* @category refs
*/
function useCallbackRef() {
	return (0, import_react.useState)(null);
}
//#endregion
//#region node_modules/@restart/hooks/esm/useMounted.js
/**
* Track whether a component is current mounted. Generally less preferable than
* properlly canceling effects so they don't run after a component is unmounted,
* but helpful in cases where that isn't feasible, such as a `Promise` resolution.
*
* @returns a function that returns the current isMounted state of the component
*
* ```ts
* const [data, setData] = useState(null)
* const isMounted = useMounted()
*
* useEffect(() => {
*   fetchdata().then((newData) => {
*      if (isMounted()) {
*        setData(newData);
*      }
*   })
* })
* ```
*/
function useMounted() {
	const mounted = (0, import_react.useRef)(true);
	const isMounted = (0, import_react.useRef)(() => mounted.current);
	(0, import_react.useEffect)(() => {
		mounted.current = true;
		return () => {
			mounted.current = false;
		};
	}, []);
	return isMounted.current;
}
//#endregion
//#region node_modules/@restart/hooks/esm/useSafeState.js
/**
* `useSafeState` takes the return value of a `useState` hook and wraps the
* setter to prevent updates onces the component has unmounted. Can used
* with `useMergeState` and `useStateAsync` as well
*
* @param state The return value of a useStateHook
*
* ```ts
* const [show, setShow] = useSafeState(useState(true));
* ```
*/
function useSafeState(state) {
	const isMounted = useMounted();
	return [state[0], (0, import_react.useCallback)((nextState) => {
		if (!isMounted()) return;
		return state[1](nextState);
	}, [isMounted, state[1]])];
}
//#endregion
//#region node_modules/react-overlays/esm/popper.js
var createPopper = popperGenerator({ defaultModifiers: [
	hide_default,
	popperOffsets_default,
	computeStyles_default,
	eventListeners_default,
	offset_default,
	flip_default,
	preventOverflow_default,
	arrow_default
] });
//#endregion
//#region node_modules/react-overlays/esm/usePopper.js
init_extends();
init_objectWithoutPropertiesLoose();
var initialPopperStyles = function initialPopperStyles(position) {
	return {
		position,
		top: "0",
		left: "0",
		opacity: "0",
		pointerEvents: "none"
	};
};
var disabledApplyStylesModifier = {
	name: "applyStyles",
	enabled: false
};
var ariaDescribedByModifier = {
	name: "ariaDescribedBy",
	enabled: true,
	phase: "afterWrite",
	effect: function effect(_ref) {
		var state = _ref.state;
		return function() {
			var _state$elements = state.elements, reference = _state$elements.reference, popper = _state$elements.popper;
			if ("removeAttribute" in reference) {
				var ids = (reference.getAttribute("aria-describedby") || "").split(",").filter(function(id) {
					return id.trim() !== popper.id;
				});
				if (!ids.length) reference.removeAttribute("aria-describedby");
				else reference.setAttribute("aria-describedby", ids.join(","));
			}
		};
	},
	fn: function fn(_ref2) {
		var _popper$getAttribute;
		var _state$elements2 = _ref2.state.elements, popper = _state$elements2.popper, reference = _state$elements2.reference;
		var role = (_popper$getAttribute = popper.getAttribute("role")) == null ? void 0 : _popper$getAttribute.toLowerCase();
		if (popper.id && role === "tooltip" && "setAttribute" in reference) {
			var ids = reference.getAttribute("aria-describedby");
			if (ids && ids.split(",").indexOf(popper.id) !== -1) return;
			reference.setAttribute("aria-describedby", ids ? ids + "," + popper.id : popper.id);
		}
	}
};
var EMPTY_MODIFIERS = [];
/**
* Position an element relative some reference element using Popper.js
*
* @param referenceElement
* @param popperElement
* @param {object}      options
* @param {object=}     options.modifiers Popper.js modifiers
* @param {boolean=}    options.enabled toggle the popper functionality on/off
* @param {string=}     options.placement The popper element placement relative to the reference element
* @param {string=}     options.strategy the positioning strategy
* @param {boolean=}    options.eventsEnabled have Popper listen on window resize events to reposition the element
* @param {function=}   options.onCreate called when the popper is created
* @param {function=}   options.onUpdate called when the popper is updated
*
* @returns {UsePopperState} The popper state
*/
function usePopper(referenceElement, popperElement, _temp) {
	var _ref3 = _temp === void 0 ? {} : _temp, _ref3$enabled = _ref3.enabled, enabled = _ref3$enabled === void 0 ? true : _ref3$enabled, _ref3$placement = _ref3.placement, placement = _ref3$placement === void 0 ? "bottom" : _ref3$placement, _ref3$strategy = _ref3.strategy, strategy = _ref3$strategy === void 0 ? "absolute" : _ref3$strategy, _ref3$modifiers = _ref3.modifiers, modifiers = _ref3$modifiers === void 0 ? EMPTY_MODIFIERS : _ref3$modifiers, config = _objectWithoutPropertiesLoose(_ref3, [
		"enabled",
		"placement",
		"strategy",
		"modifiers"
	]);
	var popperInstanceRef = (0, import_react.useRef)();
	var update = (0, import_react.useCallback)(function() {
		var _popperInstanceRef$cu;
		(_popperInstanceRef$cu = popperInstanceRef.current) == null || _popperInstanceRef$cu.update();
	}, []);
	var forceUpdate = (0, import_react.useCallback)(function() {
		var _popperInstanceRef$cu2;
		(_popperInstanceRef$cu2 = popperInstanceRef.current) == null || _popperInstanceRef$cu2.forceUpdate();
	}, []);
	var _useSafeState = useSafeState((0, import_react.useState)({
		placement,
		update,
		forceUpdate,
		attributes: {},
		styles: {
			popper: initialPopperStyles(strategy),
			arrow: {}
		}
	})), popperState = _useSafeState[0], setState = _useSafeState[1];
	var updateModifier = (0, import_react.useMemo)(function() {
		return {
			name: "updateStateModifier",
			enabled: true,
			phase: "write",
			requires: ["computeStyles"],
			fn: function fn(_ref4) {
				var state = _ref4.state;
				var styles = {};
				var attributes = {};
				Object.keys(state.elements).forEach(function(element) {
					styles[element] = state.styles[element];
					attributes[element] = state.attributes[element];
				});
				setState({
					state,
					styles,
					attributes,
					update,
					forceUpdate,
					placement: state.placement
				});
			}
		};
	}, [
		update,
		forceUpdate,
		setState
	]);
	(0, import_react.useEffect)(function() {
		if (!popperInstanceRef.current || !enabled) return;
		popperInstanceRef.current.setOptions({
			placement,
			strategy,
			modifiers: [].concat(modifiers, [updateModifier, disabledApplyStylesModifier])
		});
	}, [
		strategy,
		placement,
		updateModifier,
		enabled
	]);
	(0, import_react.useEffect)(function() {
		if (!enabled || referenceElement == null || popperElement == null) return;
		popperInstanceRef.current = createPopper(referenceElement, popperElement, _extends({}, config, {
			placement,
			strategy,
			modifiers: [].concat(modifiers, [ariaDescribedByModifier, updateModifier])
		}));
		return function() {
			if (popperInstanceRef.current != null) {
				popperInstanceRef.current.destroy();
				popperInstanceRef.current = void 0;
				setState(function(s) {
					return _extends({}, s, {
						attributes: {},
						styles: { popper: initialPopperStyles(strategy) }
					});
				});
			}
		};
	}, [
		enabled,
		referenceElement,
		popperElement
	]);
	return popperState;
}
//#endregion
//#region node_modules/dom-helpers/esm/removeEventListener.js
/**
* A `removeEventListener` ponyfill
* 
* @param node the element
* @param eventName the event name
* @param handle the handler
* @param options event options
*/
function removeEventListener(node, eventName, handler, options) {
	var capture = options && typeof options !== "boolean" ? options.capture : options;
	node.removeEventListener(eventName, handler, capture);
	if (handler.__once) node.removeEventListener(eventName, handler.__once, capture);
}
//#endregion
//#region node_modules/dom-helpers/esm/listen.js
function listen(node, eventName, handler, options) {
	addEventListener(node, eventName, handler, options);
	return function() {
		removeEventListener(node, eventName, handler, options);
	};
}
//#endregion
//#region node_modules/react-overlays/esm/safeFindDOMNode.js
var import_warning = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Similar to invariant but only logs a warning if the condition is not met.
	* This can be used to log issues in development environments in critical
	* paths. Removing the logging code for production environments will keep the
	* same logic and follow the same code paths.
	*/
	var __DEV__ = true;
	var warning = function() {};
	if (__DEV__) {
		var printWarning = function printWarning(format, args) {
			var len = arguments.length;
			args = new Array(len > 1 ? len - 1 : 0);
			for (var key = 1; key < len; key++) args[key - 1] = arguments[key];
			var argIndex = 0;
			var message = "Warning: " + format.replace(/%s/g, function() {
				return args[argIndex++];
			});
			if (typeof console !== "undefined") console.error(message);
			try {
				throw new Error(message);
			} catch (x) {}
		};
		warning = function(condition, format, args) {
			var len = arguments.length;
			args = new Array(len > 2 ? len - 2 : 0);
			for (var key = 2; key < len; key++) args[key - 2] = arguments[key];
			if (format === void 0) throw new Error("`warning(condition, format, ...args)` requires a warning message argument");
			if (!condition) printWarning.apply(null, [format].concat(args));
		};
	}
	module.exports = warning;
})))());
function safeFindDOMNode(componentOrElement) {
	if (componentOrElement && "setState" in componentOrElement) return import_react_dom.findDOMNode(componentOrElement);
	return componentOrElement != null ? componentOrElement : null;
}
//#endregion
//#region node_modules/react-overlays/esm/ownerDocument.js
var ownerDocument_default = (function(componentOrElement) {
	return ownerDocument(safeFindDOMNode(componentOrElement));
});
//#endregion
//#region node_modules/react-overlays/esm/useRootClose.js
var escapeKeyCode = 27;
var noop$2 = function noop() {};
function isLeftClickEvent(event) {
	return event.button === 0;
}
function isModifiedEvent(event) {
	return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
var getRefTarget = function getRefTarget(ref) {
	return ref && ("current" in ref ? ref.current : ref);
};
/**
* The `useRootClose` hook registers your callback on the document
* when rendered. Powers the `<Overlay/>` component. This is used achieve modal
* style behavior where your callback is triggered when the user tries to
* interact with the rest of the document or hits the `esc` key.
*
* @param {Ref<HTMLElement>| HTMLElement} ref  The element boundary
* @param {function} onRootClose
* @param {object=}  options
* @param {boolean=} options.disabled
* @param {string=}  options.clickTrigger The DOM event name (click, mousedown, etc) to attach listeners on
*/
function useRootClose(ref, onRootClose, _temp) {
	var _ref = _temp === void 0 ? {} : _temp, disabled = _ref.disabled, _ref$clickTrigger = _ref.clickTrigger, clickTrigger = _ref$clickTrigger === void 0 ? "click" : _ref$clickTrigger;
	var preventMouseRootCloseRef = (0, import_react.useRef)(false);
	var onClose = onRootClose || noop$2;
	var handleMouseCapture = (0, import_react.useCallback)(function(e) {
		var _e$composedPath$;
		var currentTarget = getRefTarget(ref);
		(0, import_warning.default)(!!currentTarget, "RootClose captured a close event but does not have a ref to compare it to. useRootClose(), should be passed a ref that resolves to a DOM node");
		preventMouseRootCloseRef.current = !currentTarget || isModifiedEvent(e) || !isLeftClickEvent(e) || !!contains(currentTarget, (_e$composedPath$ = e.composedPath == null ? void 0 : e.composedPath()[0]) != null ? _e$composedPath$ : e.target);
	}, [ref]);
	var handleMouse = useEventCallback(function(e) {
		if (!preventMouseRootCloseRef.current) onClose(e);
	});
	var handleKeyUp = useEventCallback(function(e) {
		if (e.keyCode === escapeKeyCode) onClose(e);
	});
	(0, import_react.useEffect)(function() {
		if (disabled || ref == null) return void 0;
		var currentEvent = window.event;
		var doc = ownerDocument_default(getRefTarget(ref));
		var removeMouseCaptureListener = listen(doc, clickTrigger, handleMouseCapture, true);
		var removeMouseListener = listen(doc, clickTrigger, function(e) {
			if (e === currentEvent) {
				currentEvent = void 0;
				return;
			}
			handleMouse(e);
		});
		var removeKeyupListener = listen(doc, "keyup", function(e) {
			if (e === currentEvent) {
				currentEvent = void 0;
				return;
			}
			handleKeyUp(e);
		});
		var mobileSafariHackListeners = [];
		if ("ontouchstart" in doc.documentElement) mobileSafariHackListeners = [].slice.call(doc.body.children).map(function(el) {
			return listen(el, "mousemove", noop$2);
		});
		return function() {
			removeMouseCaptureListener();
			removeMouseListener();
			removeKeyupListener();
			mobileSafariHackListeners.forEach(function(remove) {
				return remove();
			});
		};
	}, [
		ref,
		disabled,
		clickTrigger,
		handleMouseCapture,
		handleMouse,
		handleKeyUp
	]);
}
//#endregion
//#region node_modules/react-overlays/esm/mergeOptionsWithPopperConfig.js
init_extends();
function toModifierMap(modifiers) {
	var result = {};
	if (!Array.isArray(modifiers)) return modifiers || result;
	modifiers?.forEach(function(m) {
		result[m.name] = m;
	});
	return result;
}
function toModifierArray(map) {
	if (map === void 0) map = {};
	if (Array.isArray(map)) return map;
	return Object.keys(map).map(function(k) {
		map[k].name = k;
		return map[k];
	});
}
function mergeOptionsWithPopperConfig(_ref) {
	var _modifiers$preventOve, _modifiers$preventOve2, _modifiers$offset, _modifiers$arrow;
	var enabled = _ref.enabled, enableEvents = _ref.enableEvents, placement = _ref.placement, flip = _ref.flip, offset = _ref.offset, fixed = _ref.fixed, containerPadding = _ref.containerPadding, arrowElement = _ref.arrowElement, _ref$popperConfig = _ref.popperConfig, popperConfig = _ref$popperConfig === void 0 ? {} : _ref$popperConfig;
	var modifiers = toModifierMap(popperConfig.modifiers);
	return _extends({}, popperConfig, {
		placement,
		enabled,
		strategy: fixed ? "fixed" : popperConfig.strategy,
		modifiers: toModifierArray(_extends({}, modifiers, {
			eventListeners: { enabled: enableEvents },
			preventOverflow: _extends({}, modifiers.preventOverflow, { options: containerPadding ? _extends({ padding: containerPadding }, (_modifiers$preventOve = modifiers.preventOverflow) == null ? void 0 : _modifiers$preventOve.options) : (_modifiers$preventOve2 = modifiers.preventOverflow) == null ? void 0 : _modifiers$preventOve2.options }),
			offset: { options: _extends({ offset }, (_modifiers$offset = modifiers.offset) == null ? void 0 : _modifiers$offset.options) },
			arrow: _extends({}, modifiers.arrow, {
				enabled: !!arrowElement,
				options: _extends({}, (_modifiers$arrow = modifiers.arrow) == null ? void 0 : _modifiers$arrow.options, { element: arrowElement })
			}),
			flip: _extends({ enabled: !!flip }, modifiers.flip)
		}))
	});
}
//#endregion
//#region node_modules/react-overlays/esm/DropdownMenu.js
init_objectWithoutPropertiesLoose();
init_extends();
var noop$1 = function noop() {};
/**
* @memberOf Dropdown
* @param {object}  options
* @param {boolean} options.flip Automatically adjust the menu `drop` position based on viewport edge detection
* @param {[number, number]} options.offset Define an offset distance between the Menu and the Toggle
* @param {boolean} options.show Display the menu manually, ignored in the context of a `Dropdown`
* @param {boolean} options.usePopper opt in/out of using PopperJS to position menus. When disabled you must position it yourself.
* @param {string}  options.rootCloseEvent The pointer event to listen for when determining "clicks outside" the menu for triggering a close.
* @param {object}  options.popperConfig Options passed to the [`usePopper`](/api/usePopper) hook.
*/
function useDropdownMenu(options) {
	if (options === void 0) options = {};
	var context = (0, import_react.useContext)(DropdownContext);
	var _useCallbackRef = useCallbackRef(), arrowElement = _useCallbackRef[0], attachArrowRef = _useCallbackRef[1];
	var hasShownRef = (0, import_react.useRef)(false);
	var _options = options, flip = _options.flip, offset = _options.offset, rootCloseEvent = _options.rootCloseEvent, _options$fixed = _options.fixed, fixed = _options$fixed === void 0 ? false : _options$fixed, _options$popperConfig = _options.popperConfig, popperConfig = _options$popperConfig === void 0 ? {} : _options$popperConfig, _options$usePopper = _options.usePopper, shouldUsePopper = _options$usePopper === void 0 ? !!context : _options$usePopper;
	var show = (context == null ? void 0 : context.show) == null ? !!options.show : context.show;
	var alignEnd = (context == null ? void 0 : context.alignEnd) == null ? options.alignEnd : context.alignEnd;
	if (show && !hasShownRef.current) hasShownRef.current = true;
	var handleClose = function handleClose(e) {
		context?.toggle(false, e);
	};
	var _ref = context || {}, drop = _ref.drop, setMenu = _ref.setMenu, menuElement = _ref.menuElement, toggleElement = _ref.toggleElement;
	var placement = alignEnd ? "bottom-end" : "bottom-start";
	if (drop === "up") placement = alignEnd ? "top-end" : "top-start";
	else if (drop === "right") placement = alignEnd ? "right-end" : "right-start";
	else if (drop === "left") placement = alignEnd ? "left-end" : "left-start";
	var popper = usePopper(toggleElement, menuElement, mergeOptionsWithPopperConfig({
		placement,
		enabled: !!(shouldUsePopper && show),
		enableEvents: show,
		offset,
		flip,
		fixed,
		arrowElement,
		popperConfig
	}));
	var menuProps = _extends({
		ref: setMenu || noop$1,
		"aria-labelledby": toggleElement == null ? void 0 : toggleElement.id
	}, popper.attributes.popper, { style: popper.styles.popper });
	var metadata = {
		show,
		alignEnd,
		hasShown: hasShownRef.current,
		toggle: context == null ? void 0 : context.toggle,
		popper: shouldUsePopper ? popper : null,
		arrowProps: shouldUsePopper ? _extends({ ref: attachArrowRef }, popper.attributes.arrow, { style: popper.styles.arrow }) : {}
	};
	useRootClose(menuElement, handleClose, {
		clickTrigger: rootCloseEvent,
		disabled: !show
	});
	return [menuProps, metadata];
}
var propTypes$4 = {
	/**
	* A render prop that returns a Menu element. The `props`
	* argument should spread through to **a component that can accept a ref**.
	*
	* @type {Function ({
	*   show: boolean,
	*   alignEnd: boolean,
	*   close: (?SyntheticEvent) => void,
	*   placement: Placement,
	*   update: () => void,
	*   forceUpdate: () => void,
	*   props: {
	*     ref: (?HTMLElement) => void,
	*     style: { [string]: string | number },
	*     aria-labelledby: ?string
	*   },
	*   arrowProps: {
	*     ref: (?HTMLElement) => void,
	*     style: { [string]: string | number },
	*   },
	* }) => React.Element}
	*/
	children: import_prop_types.default.func.isRequired,
	/**
	* Controls the visible state of the menu, generally this is
	* provided by the parent `Dropdown` component,
	* but may also be specified as a prop directly.
	*/
	show: import_prop_types.default.bool,
	/**
	* Aligns the dropdown menu to the 'end' of it's placement position.
	* Generally this is provided by the parent `Dropdown` component,
	* but may also be specified as a prop directly.
	*/
	alignEnd: import_prop_types.default.bool,
	/**
	* Enables the Popper.js `flip` modifier, allowing the Dropdown to
	* automatically adjust it's placement in case of overlap with the viewport or toggle.
	* Refer to the [flip docs](https://popper.js.org/popper-documentation.html#modifiers..flip.enabled) for more info
	*/
	flip: import_prop_types.default.bool,
	usePopper: import_prop_types.default.oneOf([true, false]),
	/**
	* A set of popper options and props passed directly to react-popper's Popper component.
	*/
	popperConfig: import_prop_types.default.object,
	/**
	* Override the default event used by RootCloseWrapper.
	*/
	rootCloseEvent: import_prop_types.default.string
};
var defaultProps = { usePopper: true };
/**
* Also exported as `<Dropdown.Menu>` from `Dropdown`.
*
* @displayName DropdownMenu
* @memberOf Dropdown
*/
function DropdownMenu(_ref2) {
	var children = _ref2.children;
	var _useDropdownMenu = useDropdownMenu(_objectWithoutPropertiesLoose(_ref2, ["children"])), props = _useDropdownMenu[0], meta = _useDropdownMenu[1];
	return /* @__PURE__ */ import_react.createElement(import_react.default.Fragment, null, meta.hasShown ? children(props, meta) : null);
}
DropdownMenu.displayName = "ReactOverlaysDropdownMenu";
DropdownMenu.propTypes = propTypes$4;
DropdownMenu.defaultProps = defaultProps;
//#endregion
//#region node_modules/react-overlays/esm/DropdownToggle.js
var noop = function noop() {};
/**
* Wires up Dropdown toggle functionality, returning a set a props to attach
* to the element that functions as the dropdown toggle (generally a button).
*
* @memberOf Dropdown
*/
function useDropdownToggle() {
	var _ref = (0, import_react.useContext)(DropdownContext) || {}, _ref$show = _ref.show, show = _ref$show === void 0 ? false : _ref$show, _ref$toggle = _ref.toggle, toggle = _ref$toggle === void 0 ? noop : _ref$toggle, setToggle = _ref.setToggle;
	var handleClick = (0, import_react.useCallback)(function(e) {
		toggle(!show, e);
	}, [show, toggle]);
	return [{
		ref: setToggle || noop,
		onClick: handleClick,
		"aria-haspopup": true,
		"aria-expanded": !!show
	}, {
		show,
		toggle
	}];
}
var propTypes$3 = { 
/**
* A render prop that returns a Toggle element. The `props`
* argument should spread through to **a component that can accept a ref**. Use
* the `onToggle` argument to toggle the menu open or closed
*
* @type {Function ({
*   show: boolean,
*   toggle: (show: boolean) => void,
*   props: {
*     ref: (?HTMLElement) => void,
*     aria-haspopup: true
*     aria-expanded: boolean
*   },
* }) => React.Element}
*/
children: import_prop_types.default.func.isRequired };
/**
* Also exported as `<Dropdown.Toggle>` from `Dropdown`.
*
* @displayName DropdownToggle
* @memberOf Dropdown
*/
function DropdownToggle(_ref2) {
	var children = _ref2.children;
	var _useDropdownToggle = useDropdownToggle(), props = _useDropdownToggle[0], meta = _useDropdownToggle[1];
	return /* @__PURE__ */ import_react.createElement(import_react.default.Fragment, null, children(props, meta));
}
DropdownToggle.displayName = "ReactOverlaysDropdownToggle";
DropdownToggle.propTypes = propTypes$3;
//#endregion
//#region node_modules/react-overlays/esm/Dropdown.js
var propTypes$2 = {
	/**
	* A render prop that returns the root dropdown element. The `props`
	* argument should spread through to an element containing _both_ the
	* menu and toggle in order to handle keyboard events for focus management.
	*
	* @type {Function ({
	*   props: {
	*     onKeyDown: (SyntheticEvent) => void,
	*   },
	* }) => React.Element}
	*/
	children: import_prop_types.default.node,
	/**
	* Determines the direction and location of the Menu in relation to it's Toggle.
	*/
	drop: import_prop_types.default.oneOf([
		"up",
		"left",
		"right",
		"down"
	]),
	/**
	* Controls the focus behavior for when the Dropdown is opened. Set to
	* `true` to always focus the first menu item, `keyboard` to focus only when
	* navigating via the keyboard, or `false` to disable completely
	*
	* The Default behavior is `false` **unless** the Menu has a `role="menu"`
	* where it will default to `keyboard` to match the recommended [ARIA Authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton).
	*/
	focusFirstItemOnShow: import_prop_types.default.oneOf([
		false,
		true,
		"keyboard"
	]),
	/**
	* A css slector string that will return __focusable__ menu items.
	* Selectors should be relative to the menu component:
	* e.g. ` > li:not('.disabled')`
	*/
	itemSelector: import_prop_types.default.string,
	/**
	* Align the menu to the 'end' side of the placement side of the Dropdown toggle. The default placement is `top-start` or `bottom-start`.
	*/
	alignEnd: import_prop_types.default.bool,
	/**
	* Whether or not the Dropdown is visible.
	*
	* @controllable onToggle
	*/
	show: import_prop_types.default.bool,
	/**
	* Sets the initial show position of the Dropdown.
	*/
	defaultShow: import_prop_types.default.bool,
	/**
	* A callback fired when the Dropdown wishes to change visibility. Called with the requested
	* `show` value, the DOM event, and the source that fired it: `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
	*
	* ```ts static
	* function(
	*   isOpen: boolean,
	*   event: SyntheticEvent,
	* ): void
	* ```
	*
	* @controllable show
	*/
	onToggle: import_prop_types.default.func
};
function useRefWithUpdate() {
	var forceUpdate = useForceUpdate();
	var ref = (0, import_react.useRef)(null);
	return [ref, (0, import_react.useCallback)(function(element) {
		ref.current = element;
		forceUpdate();
	}, [forceUpdate])];
}
/**
* @displayName Dropdown
* @public
*/
function Dropdown(_ref) {
	var drop = _ref.drop, alignEnd = _ref.alignEnd, defaultShow = _ref.defaultShow, rawShow = _ref.show, rawOnToggle = _ref.onToggle, _ref$itemSelector = _ref.itemSelector, itemSelector = _ref$itemSelector === void 0 ? "* > *" : _ref$itemSelector, focusFirstItemOnShow = _ref.focusFirstItemOnShow, children = _ref.children;
	var _useUncontrolledProp = useUncontrolledProp(rawShow, defaultShow, rawOnToggle), show = _useUncontrolledProp[0], onToggle = _useUncontrolledProp[1];
	var _useRefWithUpdate = useRefWithUpdate(), menuRef = _useRefWithUpdate[0], setMenu = _useRefWithUpdate[1];
	var menuElement = menuRef.current;
	var _useRefWithUpdate2 = useRefWithUpdate(), toggleRef = _useRefWithUpdate2[0], setToggle = _useRefWithUpdate2[1];
	var toggleElement = toggleRef.current;
	var lastShow = usePrevious(show);
	var lastSourceEvent = (0, import_react.useRef)(null);
	var focusInDropdown = (0, import_react.useRef)(false);
	var toggle = (0, import_react.useCallback)(function(nextShow, event) {
		onToggle(nextShow, event);
	}, [onToggle]);
	var context = (0, import_react.useMemo)(function() {
		return {
			toggle,
			drop,
			show,
			alignEnd,
			menuElement,
			toggleElement,
			setMenu,
			setToggle
		};
	}, [
		toggle,
		drop,
		show,
		alignEnd,
		menuElement,
		toggleElement,
		setMenu,
		setToggle
	]);
	if (menuElement && lastShow && !show) focusInDropdown.current = menuElement.contains(document.activeElement);
	var focusToggle = useEventCallback(function() {
		if (toggleElement && toggleElement.focus) toggleElement.focus();
	});
	var maybeFocusFirst = useEventCallback(function() {
		var type = lastSourceEvent.current;
		var focusType = focusFirstItemOnShow;
		if (focusType == null) focusType = menuRef.current && matches(menuRef.current, "[role=menu]") ? "keyboard" : false;
		if (focusType === false || focusType === "keyboard" && !/^key.+$/.test(type)) return;
		var first = qsa(menuRef.current, itemSelector)[0];
		if (first && first.focus) first.focus();
	});
	(0, import_react.useEffect)(function() {
		if (show) maybeFocusFirst();
		else if (focusInDropdown.current) {
			focusInDropdown.current = false;
			focusToggle();
		}
	}, [
		show,
		focusInDropdown,
		focusToggle,
		maybeFocusFirst
	]);
	(0, import_react.useEffect)(function() {
		lastSourceEvent.current = null;
	});
	var getNextFocusedChild = function getNextFocusedChild(current, offset) {
		if (!menuRef.current) return null;
		var items = qsa(menuRef.current, itemSelector);
		var index = items.indexOf(current) + offset;
		index = Math.max(0, Math.min(index, items.length));
		return items[index];
	};
	useGlobalListener("keydown", function(event) {
		var _menuRef$current, _toggleRef$current;
		var key = event.key;
		var target = event.target;
		var fromMenu = (_menuRef$current = menuRef.current) == null ? void 0 : _menuRef$current.contains(target);
		var fromToggle = (_toggleRef$current = toggleRef.current) == null ? void 0 : _toggleRef$current.contains(target);
		if (/input|textarea/i.test(target.tagName) && (key === " " || key !== "Escape" && fromMenu)) return;
		if (!fromMenu && !fromToggle) return;
		if (!menuRef.current && key === "Tab") return;
		lastSourceEvent.current = event.type;
		switch (key) {
			case "ArrowUp":
				var next = getNextFocusedChild(target, -1);
				if (next && next.focus) next.focus();
				event.preventDefault();
				return;
			case "ArrowDown":
				event.preventDefault();
				if (!show) onToggle(true, event);
				else {
					var _next = getNextFocusedChild(target, 1);
					if (_next && _next.focus) _next.focus();
				}
				return;
			case "Tab":
				addEventListener(document, "keyup", function(e) {
					var _menuRef$current2;
					if (e.key === "Tab" && !e.target || !((_menuRef$current2 = menuRef.current) != null && _menuRef$current2.contains(e.target))) onToggle(false, event);
				}, { once: true });
				break;
			case "Escape":
				event.preventDefault();
				event.stopPropagation();
				onToggle(false, event);
				break;
			default:
		}
	});
	return /* @__PURE__ */ import_react.createElement(DropdownContext.Provider, { value: context }, children);
}
Dropdown.displayName = "ReactOverlaysDropdown";
Dropdown.propTypes = propTypes$2;
Dropdown.Menu = DropdownMenu;
Dropdown.Toggle = DropdownToggle;
//#endregion
//#region node_modules/dom-helpers/esm/activeElement.js
/**
* Returns the actively focused element safely.
*
* @param doc the document to check
*/
function activeElement(doc) {
	if (doc === void 0) doc = ownerDocument();
	try {
		var active = doc.activeElement;
		if (!active || !active.nodeName) return null;
		return active;
	} catch (e) {
		return doc.body;
	}
}
//#endregion
//#region node_modules/@restart/hooks/esm/useUpdatedRef.js
/**
* Returns a ref that is immediately updated with the new value
*
* @param value The Ref value
* @category refs
*/
function useUpdatedRef(value) {
	const valueRef = (0, import_react.useRef)(value);
	valueRef.current = value;
	return valueRef;
}
//#endregion
//#region node_modules/@restart/hooks/esm/useWillUnmount.js
/**
* Attach a callback that fires when a component unmounts
*
* @param fn Handler to run when the component unmounts
* @category effects
*/
function useWillUnmount(fn) {
	const onUnmount = useUpdatedRef(fn);
	(0, import_react.useEffect)(() => () => onUnmount.current(), []);
}
//#endregion
//#region node_modules/dom-helpers/esm/hasClass.js
/**
* Checks if a given element has a CSS class.
* 
* @param element the element
* @param className the CSS class name
*/
function hasClass(element, className) {
	if (element.classList) return !!className && element.classList.contains(className);
	return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}
//#endregion
//#region node_modules/dom-helpers/esm/addClass.js
/**
* Adds a CSS class to a given element.
* 
* @param element the element
* @param className the CSS class name
*/
function addClass(element, className) {
	if (element.classList) element.classList.add(className);
	else if (!hasClass(element, className)) if (typeof element.className === "string") element.className = element.className + " " + className;
	else element.setAttribute("class", (element.className && element.className.baseVal || "") + " " + className);
}
//#endregion
//#region node_modules/dom-helpers/esm/removeClass.js
function replaceClassName(origClass, classToRemove) {
	return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "");
}
/**
* Removes a CSS class from a given element.
* 
* @param element the element
* @param className the CSS class name
*/
function removeClass(element, className) {
	if (element.classList) element.classList.remove(className);
	else if (typeof element.className === "string") element.className = replaceClassName(element.className, className);
	else element.setAttribute("class", replaceClassName(element.className && element.className.baseVal || "", className));
}
//#endregion
//#region node_modules/dom-helpers/esm/scrollbarSize.js
var size;
function scrollbarSize(recalc) {
	if (!size && size !== 0 || recalc) {
		if (canUseDOM_default) {
			var scrollDiv = document.createElement("div");
			scrollDiv.style.position = "absolute";
			scrollDiv.style.top = "-9999px";
			scrollDiv.style.width = "50px";
			scrollDiv.style.height = "50px";
			scrollDiv.style.overflow = "scroll";
			document.body.appendChild(scrollDiv);
			size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
			document.body.removeChild(scrollDiv);
		}
	}
	return size;
}
//#endregion
//#region node_modules/react-overlays/esm/isOverflowing.js
function isBody(node) {
	return node && node.tagName.toLowerCase() === "body";
}
function bodyIsOverflowing(node) {
	var doc = isWindow(node) ? ownerDocument() : ownerDocument(node);
	var win = isWindow(node) || doc.defaultView;
	return doc.body.clientWidth < win.innerWidth;
}
function isOverflowing(container) {
	return isWindow(container) || isBody(container) ? bodyIsOverflowing(container) : container.scrollHeight > container.clientHeight;
}
//#endregion
//#region node_modules/react-overlays/esm/manageAriaHidden.js
var BLACKLIST = [
	"template",
	"script",
	"style"
];
var isHidable = function isHidable(_ref) {
	var nodeType = _ref.nodeType, tagName = _ref.tagName;
	return nodeType === 1 && BLACKLIST.indexOf(tagName.toLowerCase()) === -1;
};
var siblings = function siblings(container, exclude, cb) {
	[].forEach.call(container.children, function(node) {
		if (exclude.indexOf(node) === -1 && isHidable(node)) cb(node);
	});
};
function ariaHidden(hide, node) {
	if (!node) return;
	if (hide) node.setAttribute("aria-hidden", "true");
	else node.removeAttribute("aria-hidden");
}
function hideSiblings(container, _ref2) {
	var dialog = _ref2.dialog, backdrop = _ref2.backdrop;
	siblings(container, [dialog, backdrop], function(node) {
		return ariaHidden(true, node);
	});
}
function showSiblings(container, _ref3) {
	var dialog = _ref3.dialog, backdrop = _ref3.backdrop;
	siblings(container, [dialog, backdrop], function(node) {
		return ariaHidden(false, node);
	});
}
//#endregion
//#region node_modules/react-overlays/esm/ModalManager.js
function findIndexOf(arr, cb) {
	var idx = -1;
	arr.some(function(d, i) {
		if (cb(d, i)) {
			idx = i;
			return true;
		}
		return false;
	});
	return idx;
}
/**
* Proper state management for containers and the modals in those containers.
*
* @internal Used by the Modal to ensure proper styling of containers.
*/
var ModalManager = /* @__PURE__ */ function() {
	function ModalManager(_temp) {
		var _ref = _temp === void 0 ? {} : _temp, _ref$hideSiblingNodes = _ref.hideSiblingNodes, hideSiblingNodes = _ref$hideSiblingNodes === void 0 ? true : _ref$hideSiblingNodes, _ref$handleContainerO = _ref.handleContainerOverflow, handleContainerOverflow = _ref$handleContainerO === void 0 ? true : _ref$handleContainerO;
		this.hideSiblingNodes = void 0;
		this.handleContainerOverflow = void 0;
		this.modals = void 0;
		this.containers = void 0;
		this.data = void 0;
		this.scrollbarSize = void 0;
		this.hideSiblingNodes = hideSiblingNodes;
		this.handleContainerOverflow = handleContainerOverflow;
		this.modals = [];
		this.containers = [];
		this.data = [];
		this.scrollbarSize = scrollbarSize();
	}
	var _proto = ModalManager.prototype;
	_proto.isContainerOverflowing = function isContainerOverflowing(modal) {
		var data = this.data[this.containerIndexFromModal(modal)];
		return data && data.overflowing;
	};
	_proto.containerIndexFromModal = function containerIndexFromModal(modal) {
		return findIndexOf(this.data, function(d) {
			return d.modals.indexOf(modal) !== -1;
		});
	};
	_proto.setContainerStyle = function setContainerStyle(containerState, container) {
		var style$1 = { overflow: "hidden" };
		containerState.style = {
			overflow: container.style.overflow,
			paddingRight: container.style.paddingRight
		};
		if (containerState.overflowing) style$1.paddingRight = parseInt(style(container, "paddingRight") || "0", 10) + this.scrollbarSize + "px";
		style(container, style$1);
	};
	_proto.removeContainerStyle = function removeContainerStyle(containerState, container) {
		Object.assign(container.style, containerState.style);
	};
	_proto.add = function add(modal, container, className) {
		var modalIdx = this.modals.indexOf(modal);
		var containerIdx = this.containers.indexOf(container);
		if (modalIdx !== -1) return modalIdx;
		modalIdx = this.modals.length;
		this.modals.push(modal);
		if (this.hideSiblingNodes) hideSiblings(container, modal);
		if (containerIdx !== -1) {
			this.data[containerIdx].modals.push(modal);
			return modalIdx;
		}
		var data = {
			modals: [modal],
			classes: className ? className.split(/\s+/) : [],
			overflowing: isOverflowing(container)
		};
		if (this.handleContainerOverflow) this.setContainerStyle(data, container);
		data.classes.forEach(addClass.bind(null, container));
		this.containers.push(container);
		this.data.push(data);
		return modalIdx;
	};
	_proto.remove = function remove(modal) {
		var modalIdx = this.modals.indexOf(modal);
		if (modalIdx === -1) return;
		var containerIdx = this.containerIndexFromModal(modal);
		var data = this.data[containerIdx];
		var container = this.containers[containerIdx];
		data.modals.splice(data.modals.indexOf(modal), 1);
		this.modals.splice(modalIdx, 1);
		if (data.modals.length === 0) {
			data.classes.forEach(removeClass.bind(null, container));
			if (this.handleContainerOverflow) this.removeContainerStyle(data, container);
			if (this.hideSiblingNodes) showSiblings(container, modal);
			this.containers.splice(containerIdx, 1);
			this.data.splice(containerIdx, 1);
		} else if (this.hideSiblingNodes) {
			var _data$modals = data.modals[data.modals.length - 1], backdrop = _data$modals.backdrop, dialog = _data$modals.dialog;
			ariaHidden(false, dialog);
			ariaHidden(false, backdrop);
		}
	};
	_proto.isTopModal = function isTopModal(modal) {
		return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
	};
	return ModalManager;
}();
//#endregion
//#region node_modules/react-overlays/esm/useWaitForDOMRef.js
var resolveContainerRef = function resolveContainerRef(ref) {
	var _ref;
	if (typeof document === "undefined") return null;
	if (ref == null) return ownerDocument().body;
	if (typeof ref === "function") ref = ref();
	if (ref && "current" in ref) ref = ref.current;
	if ((_ref = ref) != null && _ref.nodeType) return ref || null;
	return null;
};
function useWaitForDOMRef(ref, onResolved) {
	var _useState = (0, import_react.useState)(function() {
		return resolveContainerRef(ref);
	}), resolvedRef = _useState[0], setRef = _useState[1];
	if (!resolvedRef) {
		var earlyRef = resolveContainerRef(ref);
		if (earlyRef) setRef(earlyRef);
	}
	(0, import_react.useEffect)(function() {
		if (onResolved && resolvedRef) onResolved(resolvedRef);
	}, [onResolved, resolvedRef]);
	(0, import_react.useEffect)(function() {
		var nextRef = resolveContainerRef(ref);
		if (nextRef !== resolvedRef) setRef(nextRef);
	}, [ref, resolvedRef]);
	return resolvedRef;
}
//#endregion
//#region node_modules/react-overlays/esm/Modal.js
init_extends();
init_objectWithoutPropertiesLoose();
var manager;
function getManager() {
	if (!manager) manager = new ModalManager();
	return manager;
}
function useModalManager(provided) {
	var modalManager = provided || getManager();
	var modal = (0, import_react.useRef)({
		dialog: null,
		backdrop: null
	});
	return Object.assign(modal.current, {
		add: function add(container, className) {
			return modalManager.add(modal.current, container, className);
		},
		remove: function remove() {
			return modalManager.remove(modal.current);
		},
		isTopModal: function isTopModal() {
			return modalManager.isTopModal(modal.current);
		},
		setDialogRef: (0, import_react.useCallback)(function(ref) {
			modal.current.dialog = ref;
		}, []),
		setBackdropRef: (0, import_react.useCallback)(function(ref) {
			modal.current.backdrop = ref;
		}, [])
	});
}
var Modal = /* @__PURE__ */ (0, import_react.forwardRef)(function(_ref, ref) {
	var _ref$show = _ref.show, show = _ref$show === void 0 ? false : _ref$show, _ref$role = _ref.role, role = _ref$role === void 0 ? "dialog" : _ref$role, className = _ref.className, style = _ref.style, children = _ref.children, _ref$backdrop = _ref.backdrop, backdrop = _ref$backdrop === void 0 ? true : _ref$backdrop, _ref$keyboard = _ref.keyboard, keyboard = _ref$keyboard === void 0 ? true : _ref$keyboard, onBackdropClick = _ref.onBackdropClick, onEscapeKeyDown = _ref.onEscapeKeyDown, transition = _ref.transition, backdropTransition = _ref.backdropTransition, _ref$autoFocus = _ref.autoFocus, autoFocus = _ref$autoFocus === void 0 ? true : _ref$autoFocus, _ref$enforceFocus = _ref.enforceFocus, enforceFocus = _ref$enforceFocus === void 0 ? true : _ref$enforceFocus, _ref$restoreFocus = _ref.restoreFocus, restoreFocus = _ref$restoreFocus === void 0 ? true : _ref$restoreFocus, restoreFocusOptions = _ref.restoreFocusOptions, renderDialog = _ref.renderDialog, _ref$renderBackdrop = _ref.renderBackdrop, renderBackdrop = _ref$renderBackdrop === void 0 ? function(props) {
		return /* @__PURE__ */ import_react.createElement("div", props);
	} : _ref$renderBackdrop, providedManager = _ref.manager, containerRef = _ref.container, containerClassName = _ref.containerClassName, onShow = _ref.onShow, _ref$onHide = _ref.onHide, onHide = _ref$onHide === void 0 ? function() {} : _ref$onHide, onExit = _ref.onExit, onExited = _ref.onExited, onExiting = _ref.onExiting, onEnter = _ref.onEnter, onEntering = _ref.onEntering, onEntered = _ref.onEntered, rest = _objectWithoutPropertiesLoose(_ref, [
		"show",
		"role",
		"className",
		"style",
		"children",
		"backdrop",
		"keyboard",
		"onBackdropClick",
		"onEscapeKeyDown",
		"transition",
		"backdropTransition",
		"autoFocus",
		"enforceFocus",
		"restoreFocus",
		"restoreFocusOptions",
		"renderDialog",
		"renderBackdrop",
		"manager",
		"container",
		"containerClassName",
		"onShow",
		"onHide",
		"onExit",
		"onExited",
		"onExiting",
		"onEnter",
		"onEntering",
		"onEntered"
	]);
	var container = useWaitForDOMRef(containerRef);
	var modal = useModalManager(providedManager);
	var isMounted = useMounted();
	var prevShow = usePrevious(show);
	var _useState = (0, import_react.useState)(!show), exited = _useState[0], setExited = _useState[1];
	var lastFocusRef = (0, import_react.useRef)(null);
	(0, import_react.useImperativeHandle)(ref, function() {
		return modal;
	}, [modal]);
	if (canUseDOM_default && !prevShow && show) lastFocusRef.current = activeElement();
	if (!transition && !show && !exited) setExited(true);
	else if (show && exited) setExited(false);
	var handleShow = useEventCallback(function() {
		modal.add(container, containerClassName);
		removeKeydownListenerRef.current = listen(document, "keydown", handleDocumentKeyDown);
		removeFocusListenerRef.current = listen(document, "focus", function() {
			return setTimeout(handleEnforceFocus);
		}, true);
		if (onShow) onShow();
		if (autoFocus) {
			var currentActiveElement = activeElement(document);
			if (modal.dialog && currentActiveElement && !contains(modal.dialog, currentActiveElement)) {
				lastFocusRef.current = currentActiveElement;
				modal.dialog.focus();
			}
		}
	});
	var handleHide = useEventCallback(function() {
		modal.remove();
		removeKeydownListenerRef.current == null || removeKeydownListenerRef.current();
		removeFocusListenerRef.current == null || removeFocusListenerRef.current();
		if (restoreFocus) {
			var _lastFocusRef$current;
			(_lastFocusRef$current = lastFocusRef.current) == null || _lastFocusRef$current.focus == null || _lastFocusRef$current.focus(restoreFocusOptions);
			lastFocusRef.current = null;
		}
	});
	(0, import_react.useEffect)(function() {
		if (!show || !container) return;
		handleShow();
	}, [
		show,
		container,
		handleShow
	]);
	(0, import_react.useEffect)(function() {
		if (!exited) return;
		handleHide();
	}, [exited, handleHide]);
	useWillUnmount(function() {
		handleHide();
	});
	var handleEnforceFocus = useEventCallback(function() {
		if (!enforceFocus || !isMounted() || !modal.isTopModal()) return;
		var currentActiveElement = activeElement();
		if (modal.dialog && currentActiveElement && !contains(modal.dialog, currentActiveElement)) modal.dialog.focus();
	});
	var handleBackdropClick = useEventCallback(function(e) {
		if (e.target !== e.currentTarget) return;
		onBackdropClick?.(e);
		if (backdrop === true) onHide();
	});
	var handleDocumentKeyDown = useEventCallback(function(e) {
		if (keyboard && e.keyCode === 27 && modal.isTopModal()) {
			onEscapeKeyDown?.(e);
			if (!e.defaultPrevented) onHide();
		}
	});
	var removeFocusListenerRef = (0, import_react.useRef)();
	var removeKeydownListenerRef = (0, import_react.useRef)();
	var handleHidden = function handleHidden() {
		setExited(true);
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		onExited?.apply(void 0, args);
	};
	var Transition = transition;
	if (!container || !(show || Transition && !exited)) return null;
	var dialogProps = _extends({
		role,
		ref: modal.setDialogRef,
		"aria-modal": role === "dialog" ? true : void 0
	}, rest, {
		style,
		className,
		tabIndex: -1
	});
	var dialog = renderDialog ? renderDialog(dialogProps) : /* @__PURE__ */ import_react.createElement("div", dialogProps, /* @__PURE__ */ import_react.cloneElement(children, { role: "document" }));
	if (Transition) dialog = /* @__PURE__ */ import_react.createElement(Transition, {
		appear: true,
		unmountOnExit: true,
		"in": !!show,
		onExit,
		onExiting,
		onExited: handleHidden,
		onEnter,
		onEntering,
		onEntered
	}, dialog);
	var backdropElement = null;
	if (backdrop) {
		var BackdropTransition = backdropTransition;
		backdropElement = renderBackdrop({
			ref: modal.setBackdropRef,
			onClick: handleBackdropClick
		});
		if (BackdropTransition) backdropElement = /* @__PURE__ */ import_react.createElement(BackdropTransition, {
			appear: true,
			"in": !!show
		}, backdropElement);
	}
	return /* @__PURE__ */ import_react.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react_dom.createPortal(/* @__PURE__ */ import_react.createElement(import_react.default.Fragment, null, backdropElement, dialog), container));
});
var propTypes$1 = {
	/**
	* Set the visibility of the Modal
	*/
	show: import_prop_types.default.bool,
	/**
	* A DOM element, a `ref` to an element, or function that returns either. The Modal is appended to it's `container` element.
	*
	* For the sake of assistive technologies, the container should usually be the document body, so that the rest of the
	* page content can be placed behind a virtual backdrop as well as a visual one.
	*/
	container: import_prop_types.default.any,
	/**
	* A callback fired when the Modal is opening.
	*/
	onShow: import_prop_types.default.func,
	/**
	* A callback fired when either the backdrop is clicked, or the escape key is pressed.
	*
	* The `onHide` callback only signals intent from the Modal,
	* you must actually set the `show` prop to `false` for the Modal to close.
	*/
	onHide: import_prop_types.default.func,
	/**
	* Include a backdrop component.
	*/
	backdrop: import_prop_types.default.oneOfType([import_prop_types.default.bool, import_prop_types.default.oneOf(["static"])]),
	/**
	* A function that returns the dialog component. Useful for custom
	* rendering. **Note:** the component should make sure to apply the provided ref.
	*
	* ```js static
	* renderDialog={props => <MyDialog {...props} />}
	* ```
	*/
	renderDialog: import_prop_types.default.func,
	/**
	* A function that returns a backdrop component. Useful for custom
	* backdrop rendering.
	*
	* ```js
	*  renderBackdrop={props => <MyBackdrop {...props} />}
	* ```
	*/
	renderBackdrop: import_prop_types.default.func,
	/**
	* A callback fired when the escape key, if specified in `keyboard`, is pressed.
	*
	* If preventDefault() is called on the keyboard event, closing the modal will be cancelled.
	*/
	onEscapeKeyDown: import_prop_types.default.func,
	/**
	* A callback fired when the backdrop, if specified, is clicked.
	*/
	onBackdropClick: import_prop_types.default.func,
	/**
	* A css class or set of classes applied to the modal container when the modal is open,
	* and removed when it is closed.
	*/
	containerClassName: import_prop_types.default.string,
	/**
	* Close the modal when escape key is pressed
	*/
	keyboard: import_prop_types.default.bool,
	/**
	* A `react-transition-group@2.0.0` `<Transition/>` component used
	* to control animations for the dialog component.
	*/
	transition: import_prop_types.default.elementType,
	/**
	* A `react-transition-group@2.0.0` `<Transition/>` component used
	* to control animations for the backdrop components.
	*/
	backdropTransition: import_prop_types.default.elementType,
	/**
	* When `true` The modal will automatically shift focus to itself when it opens, and
	* replace it to the last focused element when it closes. This also
	* works correctly with any Modal children that have the `autoFocus` prop.
	*
	* Generally this should never be set to `false` as it makes the Modal less
	* accessible to assistive technologies, like screen readers.
	*/
	autoFocus: import_prop_types.default.bool,
	/**
	* When `true` The modal will prevent focus from leaving the Modal while open.
	*
	* Generally this should never be set to `false` as it makes the Modal less
	* accessible to assistive technologies, like screen readers.
	*/
	enforceFocus: import_prop_types.default.bool,
	/**
	* When `true` The modal will restore focus to previously focused element once
	* modal is hidden
	*/
	restoreFocus: import_prop_types.default.bool,
	/**
	* Options passed to focus function when `restoreFocus` is set to `true`
	*
	* @link  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Parameters
	*/
	restoreFocusOptions: import_prop_types.default.shape({ preventScroll: import_prop_types.default.bool }),
	/**
	* Callback fired before the Modal transitions in
	*/
	onEnter: import_prop_types.default.func,
	/**
	* Callback fired as the Modal begins to transition in
	*/
	onEntering: import_prop_types.default.func,
	/**
	* Callback fired after the Modal finishes transitioning in
	*/
	onEntered: import_prop_types.default.func,
	/**
	* Callback fired right before the Modal transitions out
	*/
	onExit: import_prop_types.default.func,
	/**
	* Callback fired as the Modal begins to transition out
	*/
	onExiting: import_prop_types.default.func,
	/**
	* Callback fired after the Modal finishes transitioning out
	*/
	onExited: import_prop_types.default.func,
	/**
	* A ModalManager instance used to track and manage the state of open
	* Modals. Useful when customizing how modals interact within a container
	*/
	manager: import_prop_types.default.instanceOf(ModalManager)
};
Modal.displayName = "Modal";
Modal.propTypes = propTypes$1;
var Modal_default = Object.assign(Modal, { Manager: ModalManager });
//#endregion
//#region node_modules/@restart/hooks/esm/useMergedRefs.js
var toFnRef = (ref) => !ref || typeof ref === "function" ? ref : (value) => {
	ref.current = value;
};
function mergeRefs(refA, refB) {
	const a = toFnRef(refA);
	const b = toFnRef(refB);
	return (value) => {
		if (a) a(value);
		if (b) b(value);
	};
}
/**
* Create and returns a single callback ref composed from two other Refs.
*
* ```tsx
* const Button = React.forwardRef((props, ref) => {
*   const [element, attachRef] = useCallbackRef<HTMLButtonElement>();
*   const mergedRef = useMergedRefs(ref, attachRef);
*
*   return <button ref={mergedRef} {...props}/>
* })
* ```
*
* @param refA A Callback or mutable Ref
* @param refB A Callback or mutable Ref
* @category refs
*/
function useMergedRefs(refA, refB) {
	return (0, import_react.useMemo)(() => mergeRefs(refA, refB), [refA, refB]);
}
//#endregion
//#region node_modules/react-overlays/esm/Overlay.js
init_extends();
init_objectWithoutPropertiesLoose();
/**
* Built on top of `Popper.js`, the overlay component is
* great for custom tooltip overlays.
*/
var Overlay = /* @__PURE__ */ import_react.forwardRef(function(props, outerRef) {
	var flip = props.flip, offset = props.offset, placement = props.placement, _props$containerPaddi = props.containerPadding, containerPadding = _props$containerPaddi === void 0 ? 5 : _props$containerPaddi, _props$popperConfig = props.popperConfig, popperConfig = _props$popperConfig === void 0 ? {} : _props$popperConfig, Transition = props.transition;
	var _useCallbackRef = useCallbackRef(), rootElement = _useCallbackRef[0], attachRef = _useCallbackRef[1];
	var _useCallbackRef2 = useCallbackRef(), arrowElement = _useCallbackRef2[0], attachArrowRef = _useCallbackRef2[1];
	var mergedRef = useMergedRefs(attachRef, outerRef);
	var container = useWaitForDOMRef(props.container);
	var target = useWaitForDOMRef(props.target);
	var _useState = (0, import_react.useState)(!props.show), exited = _useState[0], setExited = _useState[1];
	var _usePopper = usePopper(target, rootElement, mergeOptionsWithPopperConfig({
		placement,
		enableEvents: !!props.show,
		containerPadding: containerPadding || 5,
		flip,
		offset,
		arrowElement,
		popperConfig
	})), styles = _usePopper.styles, attributes = _usePopper.attributes, popper = _objectWithoutPropertiesLoose(_usePopper, ["styles", "attributes"]);
	if (props.show) {
		if (exited) setExited(false);
	} else if (!props.transition && !exited) setExited(true);
	var handleHidden = function handleHidden() {
		setExited(true);
		if (props.onExited) props.onExited.apply(props, arguments);
	};
	var mountOverlay = props.show || Transition && !exited;
	useRootClose(rootElement, props.onHide, {
		disabled: !props.rootClose || props.rootCloseDisabled,
		clickTrigger: props.rootCloseEvent
	});
	if (!mountOverlay) return null;
	var child = props.children(_extends({}, popper, {
		show: !!props.show,
		props: _extends({}, attributes.popper, {
			style: styles.popper,
			ref: mergedRef
		}),
		arrowProps: _extends({}, attributes.arrow, {
			style: styles.arrow,
			ref: attachArrowRef
		})
	}));
	if (Transition) {
		var onExit = props.onExit, onExiting = props.onExiting, onEnter = props.onEnter, onEntering = props.onEntering, onEntered = props.onEntered;
		child = /* @__PURE__ */ import_react.createElement(Transition, {
			"in": props.show,
			appear: true,
			onExit,
			onExiting,
			onExited: handleHidden,
			onEnter,
			onEntering,
			onEntered
		}, child);
	}
	return container ? /* @__PURE__ */ import_react_dom.createPortal(child, container) : null;
});
Overlay.displayName = "Overlay";
Overlay.propTypes = {
	/**
	* Set the visibility of the Overlay
	*/
	show: import_prop_types.default.bool,
	/** Specify where the overlay element is positioned in relation to the target element */
	placement: import_prop_types.default.oneOf(placements),
	/**
	* A DOM Element, Ref to an element, or function that returns either. The `target` element is where
	* the overlay is positioned relative to.
	*/
	target: import_prop_types.default.any,
	/**
	* A DOM Element, Ref to an element, or function that returns either. The `container` will have the Portal children
	* appended to it.
	*/
	container: import_prop_types.default.any,
	/**
	* Enables the Popper.js `flip` modifier, allowing the Overlay to
	* automatically adjust it's placement in case of overlap with the viewport or toggle.
	* Refer to the [flip docs](https://popper.js.org/popper-documentation.html#modifiers..flip.enabled) for more info
	*/
	flip: import_prop_types.default.bool,
	/**
	* A render prop that returns an element to overlay and position. See
	* the [react-popper documentation](https://github.com/FezVrasta/react-popper#children) for more info.
	*
	* @type {Function ({
	*   show: boolean,
	*   placement: Placement,
	*   update: () => void,
	*   forceUpdate: () => void,
	*   props: {
	*     ref: (?HTMLElement) => void,
	*     style: { [string]: string | number },
	*     aria-labelledby: ?string
	*     [string]: string | number,
	*   },
	*   arrowProps: {
	*     ref: (?HTMLElement) => void,
	*     style: { [string]: string | number },
	*     [string]: string | number,
	*   },
	* }) => React.Element}
	*/
	children: import_prop_types.default.func.isRequired,
	/**
	* Control how much space there is between the edge of the boundary element and overlay.
	* A convenience shortcut to setting `popperConfig.modfiers.preventOverflow.padding`
	*/
	containerPadding: import_prop_types.default.number,
	/**
	* A set of popper options and props passed directly to react-popper's Popper component.
	*/
	popperConfig: import_prop_types.default.object,
	/**
	* Specify whether the overlay should trigger `onHide` when the user clicks outside the overlay
	*/
	rootClose: import_prop_types.default.bool,
	/**
	* Specify event for toggling overlay
	*/
	rootCloseEvent: import_prop_types.default.oneOf(["click", "mousedown"]),
	/**
	* Specify disabled for disable RootCloseWrapper
	*/
	rootCloseDisabled: import_prop_types.default.bool,
	/**
	* A Callback fired by the Overlay when it wishes to be hidden.
	*
	* __required__ when `rootClose` is `true`.
	*
	* @type func
	*/
	onHide: function onHide(props) {
		for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
		if (props.rootClose) {
			var _PropTypes$func;
			return (_PropTypes$func = import_prop_types.default.func).isRequired.apply(_PropTypes$func, [props].concat(args));
		}
		return import_prop_types.default.func.apply(import_prop_types.default, [props].concat(args));
	},
	/**
	* A `react-transition-group@2.0.0` `<Transition/>` component
	* used to animate the overlay as it changes visibility.
	*/
	transition: import_prop_types.default.elementType,
	/**
	* Callback fired before the Overlay transitions in
	*/
	onEnter: import_prop_types.default.func,
	/**
	* Callback fired as the Overlay begins to transition in
	*/
	onEntering: import_prop_types.default.func,
	/**
	* Callback fired after the Overlay finishes transitioning in
	*/
	onEntered: import_prop_types.default.func,
	/**
	* Callback fired right before the Overlay transitions out
	*/
	onExit: import_prop_types.default.func,
	/**
	* Callback fired as the Overlay begins to transition out
	*/
	onExiting: import_prop_types.default.func,
	/**
	* Callback fired after the Overlay finishes transitioning out
	*/
	onExited: import_prop_types.default.func
};
//#endregion
//#region node_modules/react-overlays/esm/Portal.js
var propTypes = {
	/**
	* A DOM element, Ref to an element, or function that returns either. The `container` will have the Portal children
	* appended to it.
	*/
	container: import_prop_types.default.any,
	onRendered: import_prop_types.default.func
};
/**
* @public
*/
var Portal = function Portal(_ref) {
	var container = _ref.container, children = _ref.children, onRendered = _ref.onRendered;
	var resolvedContainer = useWaitForDOMRef(container, onRendered);
	return resolvedContainer ? /* @__PURE__ */ import_react.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react_dom.createPortal(children, resolvedContainer)) : null;
};
Portal.displayName = "Portal";
Portal.propTypes = propTypes;
//#endregion
export { style as _, removeClass as a, require_browser as b, useDropdownToggle as c, listen as d, qsa as f, contains as g, isWindow as h, scrollbarSize as i, useDropdownMenu as l, canUseDOM_default as m, Overlay as n, addClass as o, matches as p, Modal_default as r, Dropdown as s, Portal as t, useRootClose as u, ownerDocument as v, uncontrollable as y };

//# sourceMappingURL=esm-B8yFPLI4.js.map