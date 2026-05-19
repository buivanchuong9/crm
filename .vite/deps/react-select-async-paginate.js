import { o as __toESM, t as __commonJSMin } from "./chunk-CqwQKh_b.js";
import { t as require_react } from "./react.js";
import { t as require_jsx_runtime } from "./react_jsx-runtime.js";
import { a as components, s as index } from "./Select-ef7c0426.esm-D_70pgXc.js";
import StateManagedSelect$1 from "./react-select.js";
//#region node_modules/@seznam/compose-react-refs/composeRefs.js
var require_composeRefs = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function composeRefs() {
		var refs = [];
		for (var _i = 0; _i < arguments.length; _i++) refs[_i] = arguments[_i];
		if (refs.length === 2) return composeTwoRefs(refs[0], refs[1]) || null;
		return refs.slice(1).reduce(function(semiCombinedRef, refToInclude) {
			return composeTwoRefs(semiCombinedRef, refToInclude);
		}, refs[0]) || null;
	}
	exports.default = composeRefs;
	var composedRefCache = /* @__PURE__ */ new WeakMap();
	function composeTwoRefs(ref1, ref2) {
		if (ref1 && ref2) {
			var ref1Cache = composedRefCache.get(ref1) || /* @__PURE__ */ new WeakMap();
			composedRefCache.set(ref1, ref1Cache);
			var composedRef = ref1Cache.get(ref2) || (function(instance) {
				updateRef(ref1, instance);
				updateRef(ref2, instance);
			});
			ref1Cache.set(ref2, composedRef);
			return composedRef;
		}
		if (!ref1) return ref2;
		else return ref1;
	}
	function updateRef(ref, instance) {
		if (typeof ref === "function") ref(instance);
		else ref.current = instance;
	}
}));
//#endregion
//#region node_modules/@vtaits/use-lazy-ref/dist/index.js
var import_jsx_runtime = require_jsx_runtime();
var import_composeRefs = /* @__PURE__ */ __toESM(require_composeRefs());
var import_react = /* @__PURE__ */ __toESM(require_react());
var EMPTY_VALUE = Symbol("useLazyRef empty value");
var useLazyRef = (init) => {
	const resultRef = (0, import_react.useRef)(EMPTY_VALUE);
	if (resultRef.current === EMPTY_VALUE) resultRef.current = init();
	return resultRef;
};
//#endregion
//#region node_modules/use-is-mounted-ref/dist/use-is-mounted-ref.es.js
function useIsMountedRef() {
	var isMountedRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(function() {
		isMountedRef.current = true;
		return function() {
			isMountedRef.current = false;
		};
	}, []);
	return isMountedRef;
}
//#endregion
//#region node_modules/use-latest/dist/use-latest.esm.js
var useLatest = function useLatest(value) {
	var ref = import_react.useRef(value);
	index(function() {
		ref.current = value;
	});
	return ref;
};
//#endregion
//#region node_modules/krustykrab/dist/index.mjs
function Ok(result) {
	return {
		isOk: () => true,
		isOkAnd: (fn) => fn(result),
		isErr: () => false,
		isErrAnd: () => false,
		ok: () => Some(result),
		err: () => None(),
		map: (fn) => Ok(fn(result)),
		mapOr: (_, fn) => fn(result),
		mapOrElse: (_, fn) => fn(result),
		mapErr: () => Ok(result),
		expect: () => result,
		expectErr: (msg) => {
			throw new Error(msg);
		},
		unwrap: () => result,
		unwrapErr: () => {
			throw new Error(`${result}`);
		},
		unwrapOr: () => result,
		unwrapOrElse: () => result,
		and: (res) => res,
		andThen: (getRes) => getRes(result),
		or: () => Ok(result),
		orElse: () => Ok(result)
	};
}
function Err(err) {
	return {
		isOk: () => false,
		isOkAnd: () => false,
		isErr: () => true,
		isErrAnd: (fn) => fn(err),
		ok: () => None(),
		err: () => Some(err),
		map: () => Err(err),
		mapOr: (defaultValue) => defaultValue,
		mapOrElse: (getDefaultValue) => getDefaultValue(err),
		mapErr: (fn) => Err(fn(err)),
		expect: (msg) => {
			throw new Error(msg);
		},
		expectErr: () => err,
		unwrap: () => {
			throw new Error(`${err}`);
		},
		unwrapErr: () => err,
		unwrapOr: (defaultValue) => defaultValue,
		unwrapOrElse: (getDefaultValue) => getDefaultValue(err),
		and: () => Err(err),
		andThen: () => Err(err),
		or: (res) => res,
		orElse: (getRes) => getRes(err)
	};
}
function None() {
	const self = {
		and: () => None(),
		andThen: () => None(),
		expect: (msg) => {
			throw new Error(msg);
		},
		filter: () => self,
		isSome: () => false,
		isSomeAnd: () => false,
		isNone: () => true,
		map: () => None(),
		mapOr: (defaultValue) => defaultValue,
		mapOrElse: (getDefaultValue) => getDefaultValue(),
		okOr: (err) => Err(err),
		okOrElse: (getErr) => Err(getErr()),
		or: (opt) => opt,
		orElse: (fn) => fn(),
		unwrap: () => {
			throw new Error("panic! call `unwrap` on a `None` value");
		},
		unwrapOr: (defaultValue) => defaultValue,
		unwrapOrElse: (getDefaultValue) => getDefaultValue(),
		xor: (opt) => {
			if (opt.isSome()) return opt;
			return self;
		}
	};
	return self;
}
function Some(value) {
	const self = {
		and: (opt) => opt,
		andThen: (fn) => fn(value),
		expect: () => value,
		filter: (fn) => {
			if (fn(value)) return self;
			return None();
		},
		isSome: () => true,
		isSomeAnd: (fn) => fn(value),
		isNone: () => false,
		map: (fn) => Some(fn(value)),
		mapOr: (_, fn) => fn(value),
		mapOrElse: (_, fn) => fn(value),
		okOr: () => Ok(value),
		okOrElse: () => Ok(value),
		or: () => self,
		orElse: () => self,
		unwrap: () => value,
		unwrapOr: () => value,
		unwrapOrElse: () => value,
		xor: (opt) => {
			if (opt.isNone()) return self;
			return None();
		}
	};
	return self;
}
function getResult(promise) {
	return promise.then((response) => Ok(response), (err) => Err(err));
}
//#endregion
//#region node_modules/sleep-promise/build/esm.mjs
var e = setTimeout;
function t(t, n) {
	var u = n.useCachedSetTimeout ? e : setTimeout;
	return new Promise((function(e) {
		u(e, t);
	}));
}
function n(e) {
	var u = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).useCachedSetTimeout, r = t(e, { useCachedSetTimeout: u });
	function o(e) {
		return r.then((function() {
			return e;
		}));
	}
	return o.then = function() {
		return r.then.apply(r, arguments);
	}, o.catch = Promise.resolve().catch, o;
}
//#endregion
//#region node_modules/react-select-async-paginate/dist/esm/index.js
var CHECK_TIMEOUT = 300;
function wrapMenuList(MenuList2) {
	function WrappedMenuList(props) {
		const { selectProps, innerRef } = props;
		const { handleScrolledToBottom, shouldLoadMore } = selectProps;
		const checkTimeoutRef = (0, import_react.useRef)(null);
		const menuListRef = (0, import_react.useRef)(null);
		const shouldHandle = (0, import_react.useCallback)(() => {
			const el = menuListRef.current;
			if (!el) return false;
			const { scrollTop, scrollHeight, clientHeight } = el;
			return shouldLoadMore(scrollHeight, clientHeight, scrollTop);
		}, [shouldLoadMore]);
		const checkAndHandle = (0, import_react.useCallback)(() => {
			if (shouldHandle()) {
				if (handleScrolledToBottom) handleScrolledToBottom();
			}
		}, [shouldHandle, handleScrolledToBottom]);
		const setCheckAndHandleTimeout = (0, import_react.useMemo)(() => {
			const res = () => {
				checkAndHandle();
				checkTimeoutRef.current = setTimeout(res, CHECK_TIMEOUT);
			};
			return res;
		}, [checkAndHandle]);
		(0, import_react.useEffect)(() => {
			setCheckAndHandleTimeout();
			return () => {
				if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
			};
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuList2, {
			...props,
			innerRef: (0, import_composeRefs.default)(innerRef, menuListRef)
		});
	}
	return WrappedMenuList;
}
var MenuList = wrapMenuList(components.MenuList);
var useComponents = (components) => (0, import_react.useMemo)(() => ({
	MenuList,
	...components
}), [components]);
var defaultReduceOptions = (prevOptions, loadedOptions) => [...prevOptions, ...loadedOptions];
var AVAILABLE_DELTA = 10;
var defaultShouldLoadMore = (scrollHeight, clientHeight, scrollTop) => {
	return scrollHeight - clientHeight - AVAILABLE_DELTA < scrollTop;
};
var getInitialCache = (params) => ({
	isFirstLoad: true,
	options: [],
	hasMore: true,
	isLoading: false,
	lockedUntil: 0,
	additional: params.additional
});
var getInitialOptionsCache = ({ options, defaultOptions, additional, defaultAdditional }) => {
	const initialOptions = defaultOptions === true ? null : Array.isArray(defaultOptions) ? defaultOptions : options;
	if (initialOptions) return { "": {
		isFirstLoad: false,
		isLoading: false,
		options: initialOptions,
		hasMore: true,
		lockedUntil: 0,
		additional: defaultAdditional || additional
	} };
	return {};
};
var errorText = "[react-select-async-paginate] response of \"loadOptions\" should be an object with \"options\" prop, which contains array of options.";
var checkIsResponse = (response) => {
	if (!response) return false;
	const { options, hasMore } = response;
	if (!Array.isArray(options)) return false;
	if (typeof hasMore !== "boolean" && typeof hasMore !== "undefined") return false;
	return true;
};
var validateResponse = (response) => {
	if (!checkIsResponse(response)) {
		console.error(errorText, "Received:", response);
		throw new Error(errorText);
	}
	return true;
};
var requestOptions = async (caller, paramsRef, optionsCacheRef, debounceTimeout, setOptionsCache, reduceOptions, isMountedRef, clearCacheOnSearchChange) => {
	const currentInputValue = paramsRef.current.inputValue;
	const isCacheEmpty = !optionsCacheRef.current[currentInputValue];
	const currentOptions = isCacheEmpty ? getInitialCache(paramsRef.current) : optionsCacheRef.current[currentInputValue];
	if (currentOptions.isLoading || !currentOptions.hasMore || currentOptions.lockedUntil > Date.now()) return;
	setOptionsCache((prevOptionsCache) => {
		if (clearCacheOnSearchChange && caller === "input-change") return { [currentInputValue]: {
			...currentOptions,
			isLoading: true
		} };
		return {
			...prevOptionsCache,
			[currentInputValue]: {
				...currentOptions,
				isLoading: true
			}
		};
	});
	if (debounceTimeout > 0 && caller === "input-change") {
		await n(debounceTimeout);
		if (currentInputValue !== paramsRef.current.inputValue) {
			setOptionsCache((prevOptionsCache) => {
				if (isCacheEmpty) {
					const { [currentInputValue]: _itemForDelete, ...restCache } = prevOptionsCache;
					return restCache;
				}
				return {
					...prevOptionsCache,
					[currentInputValue]: {
						...currentOptions,
						isLoading: false
					}
				};
			});
			return;
		}
	}
	const { loadOptions, reloadOnErrorTimeout = 0 } = paramsRef.current;
	const result = await getResult(Promise.resolve().then(() => loadOptions(currentInputValue, currentOptions.options, currentOptions.additional)));
	if (!isMountedRef.current) return;
	if (result.isErr()) {
		setOptionsCache((prevOptionsCache) => ({
			...prevOptionsCache,
			[currentInputValue]: {
				...currentOptions,
				isLoading: false,
				lockedUntil: Date.now() + reloadOnErrorTimeout
			}
		}));
		return;
	}
	const response = result.unwrap();
	if (validateResponse(response)) {
		const { options, hasMore } = response;
		const newAdditional = Object.hasOwn(response, "additional") ? response.additional : currentOptions.additional;
		setOptionsCache((prevOptionsCache) => ({
			...prevOptionsCache,
			[currentInputValue]: {
				...currentOptions,
				options: reduceOptions(currentOptions.options, options, newAdditional),
				hasMore: !!hasMore,
				isLoading: false,
				isFirstLoad: false,
				additional: newAdditional
			}
		}));
	}
};
var increaseStateId = (prevStateId) => prevStateId + 1;
var useAsyncPaginateBase = (params, deps = []) => {
	const { clearCacheOnSearchChange = false, clearCacheOnMenuClose = false, defaultOptions, loadOptionsOnMenuOpen = true, debounceTimeout = 0, inputValue, menuIsOpen, filterOption = null, reduceOptions = defaultReduceOptions, shouldLoadMore = defaultShouldLoadMore, mapOptionsForMenu = void 0 } = params;
	const menuIsOpenRef = useLatest(menuIsOpen);
	const isMountedRef = useIsMountedRef();
	const reduceOptionsRef = useLatest(reduceOptions);
	const loadOptionsOnMenuOpenRef = useLatest(loadOptionsOnMenuOpen);
	const isInitRef = (0, import_react.useRef)(true);
	const paramsRef = (0, import_react.useRef)(params);
	paramsRef.current = params;
	const [_stateId, setStateId] = (0, import_react.useState)(0);
	const optionsCacheRef = useLazyRef(() => getInitialOptionsCache(params));
	const callRequestOptionsRef = useLatest((caller) => {
		requestOptions(caller, paramsRef, optionsCacheRef, debounceTimeout, (reduceState) => {
			optionsCacheRef.current = reduceState(optionsCacheRef.current);
			if (isMountedRef.current) setStateId(increaseStateId);
		}, reduceOptionsRef.current, isMountedRef, clearCacheOnSearchChange);
	});
	const handleScrolledToBottom = (0, import_react.useCallback)(() => {
		const currentInputValue = paramsRef.current.inputValue;
		if (optionsCacheRef.current[currentInputValue]) callRequestOptionsRef.current("menu-scroll");
	}, [callRequestOptionsRef, optionsCacheRef]);
	(0, import_react.useEffect)(() => {
		if (isInitRef.current) isInitRef.current = false;
		else {
			optionsCacheRef.current = {};
			setStateId(increaseStateId);
		}
		if (defaultOptions === true) callRequestOptionsRef.current("autoload");
	}, deps);
	(0, import_react.useEffect)(() => {
		if (menuIsOpenRef.current && !optionsCacheRef.current[inputValue]) callRequestOptionsRef.current("input-change");
	}, [
		callRequestOptionsRef,
		inputValue,
		menuIsOpenRef,
		optionsCacheRef
	]);
	(0, import_react.useEffect)(() => {
		if (menuIsOpen) {
			if (!optionsCacheRef.current[""] && loadOptionsOnMenuOpenRef.current) {
				callRequestOptionsRef.current("menu-toggle");
				return;
			}
			return;
		}
		if (clearCacheOnMenuClose) {
			optionsCacheRef.current = {};
			setStateId(increaseStateId);
		}
	}, [
		callRequestOptionsRef,
		loadOptionsOnMenuOpenRef,
		menuIsOpen,
		optionsCacheRef,
		clearCacheOnMenuClose
	]);
	const currentOptions = optionsCacheRef.current[inputValue] || getInitialCache(params);
	const options = (0, import_react.useMemo)(() => {
		if (!mapOptionsForMenu) return currentOptions.options;
		return mapOptionsForMenu(currentOptions.options);
	}, [currentOptions.options, mapOptionsForMenu]);
	return {
		handleScrolledToBottom,
		shouldLoadMore,
		filterOption,
		isLoading: currentOptions.isLoading || currentOptions.lockedUntil > Date.now(),
		isFirstLoad: currentOptions.isFirstLoad,
		options
	};
};
var useAsyncPaginate = (params, deps = []) => {
	const { inputValue: inputValueParam, menuIsOpen: menuIsOpenParam, defaultInputValue: defaultInputValueParam, defaultMenuIsOpen: defaultMenuIsOpenParam, onInputChange: onInputChangeParam, onMenuClose: onMenuCloseParam, onMenuOpen: onMenuOpenParam } = params;
	const [inputValueState, setInputValue] = (0, import_react.useState)(defaultInputValueParam || "");
	const [menuIsOpenState, setMenuIsOpen] = (0, import_react.useState)(!!defaultMenuIsOpenParam);
	const inputValue = typeof inputValueParam === "string" ? inputValueParam : inputValueState;
	const menuIsOpen = typeof menuIsOpenParam === "boolean" ? menuIsOpenParam : menuIsOpenState;
	const onInputChange = (0, import_react.useCallback)((nextInputValue, actionMeta) => {
		if (onInputChangeParam) onInputChangeParam(nextInputValue, actionMeta);
		setInputValue(nextInputValue);
	}, [onInputChangeParam]);
	const onMenuClose = (0, import_react.useCallback)(() => {
		if (onMenuCloseParam) onMenuCloseParam();
		setMenuIsOpen(false);
	}, [onMenuCloseParam]);
	const onMenuOpen = (0, import_react.useCallback)(() => {
		if (onMenuOpenParam) onMenuOpenParam();
		setMenuIsOpen(true);
	}, [onMenuOpenParam]);
	return {
		...useAsyncPaginateBase({
			...params,
			inputValue,
			menuIsOpen
		}, deps),
		inputValue,
		menuIsOpen,
		onInputChange,
		onMenuClose,
		onMenuOpen
	};
};
var defaultCacheUniqs = [];
var defaultComponents2 = {};
function withAsyncPaginate(SelectComponent) {
	function WithAsyncPaginate(props) {
		const { components = defaultComponents2, selectRef = void 0, isLoading: isLoadingProp, cacheUniqs = defaultCacheUniqs, menuPlacement, menuShouldScrollIntoView, ...rest } = props;
		const asyncPaginateProps = useAsyncPaginate(rest, cacheUniqs);
		const processedComponents = useComponents(components);
		const isLoading = typeof isLoadingProp === "boolean" ? isLoadingProp : asyncPaginateProps.isLoading;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectComponent, {
			...props,
			...asyncPaginateProps,
			menuPlacement,
			menuShouldScrollIntoView: menuPlacement === "auto" ? isLoading ? false : menuShouldScrollIntoView : menuShouldScrollIntoView,
			isLoading,
			components: processedComponents,
			ref: selectRef
		});
	}
	return WithAsyncPaginate;
}
var checkGroup = (group) => {
	if (!group) return false;
	const { label, options } = group;
	if (typeof label !== "string" && typeof label !== "undefined") return false;
	if (!Array.isArray(options)) return false;
	return true;
};
var reduceGroupedOptions = (prevOptions, loadedOptions) => {
	const res = prevOptions.slice();
	const mapLabelToIndex = {};
	let prevOptionsIndex = 0;
	const prevOptionsLength = prevOptions.length;
	for (const optionOrGroup of loadedOptions) {
		const group = checkGroup(optionOrGroup) ? optionOrGroup : { options: [optionOrGroup] };
		const { label = "" } = group;
		let groupIndex = mapLabelToIndex[label];
		if (typeof groupIndex !== "number") {
			for (; prevOptionsIndex < prevOptionsLength && typeof mapLabelToIndex[label] !== "number"; ++prevOptionsIndex) {
				const prevGroup = prevOptions[prevOptionsIndex];
				if (checkGroup(prevGroup)) mapLabelToIndex[prevGroup.label || ""] = prevOptionsIndex;
			}
			groupIndex = mapLabelToIndex[label];
		}
		if (typeof groupIndex !== "number") {
			mapLabelToIndex[label] = res.length;
			res.push(group);
		} else res[groupIndex] = {
			...res[groupIndex],
			options: [...res[groupIndex].options, ...group.options]
		};
	}
	return res;
};
var AsyncPaginate = withAsyncPaginate(StateManagedSelect$1);
//#endregion
export { AsyncPaginate, checkIsResponse, reduceGroupedOptions, useAsyncPaginate, useAsyncPaginateBase, useComponents, validateResponse, withAsyncPaginate, wrapMenuList };

//# sourceMappingURL=react-select-async-paginate.js.map