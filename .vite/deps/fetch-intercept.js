import { a as __toCommonJS, t as __commonJSMin } from "./chunk-CqwQKh_b.js";
import { n as init_fetch, t as fetch_exports } from "./whatwg-fetch.js";
//#region node_modules/fetch-intercept/lib/browser.js
var require_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = (function(modules) {
		var installedModules = {};
		function __webpack_require__(moduleId) {
			if (installedModules[moduleId]) return installedModules[moduleId].exports;
			var module$1 = installedModules[moduleId] = {
				exports: {},
				id: moduleId,
				loaded: false
			};
			modules[moduleId].call(module$1.exports, module$1, module$1.exports, __webpack_require__);
			module$1.loaded = true;
			return module$1.exports;
		}
		__webpack_require__.m = modules;
		__webpack_require__.c = installedModules;
		__webpack_require__.p = "";
		return __webpack_require__(0);
	})([
		(function(module$2, exports$1, __webpack_require__) {
			"use strict";
			module$2.exports = __webpack_require__(1)(typeof importScripts === "function" ? self : window);
		}),
		(function(module$3, exports$2, __webpack_require__) {
			"use strict";
			function _toConsumableArray(arr) {
				if (Array.isArray(arr)) {
					for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
					return arr2;
				} else return Array.from(arr);
			}
			var interceptors = [];
			function interceptor(fetch) {
				for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
				var reversedInterceptors = interceptors.reduce(function(array, interceptor) {
					return [interceptor].concat(array);
				}, []);
				var promise = Promise.resolve(args);
				reversedInterceptors.forEach(function(_ref) {
					var request = _ref.request, requestError = _ref.requestError;
					if (request || requestError) promise = promise.then(function(args) {
						return request.apply(void 0, _toConsumableArray(args));
					}, requestError);
				});
				promise = promise.then(function(args) {
					var request = new (Function.prototype.bind.apply(Request, [null].concat(_toConsumableArray(args))))();
					return fetch(request).then(function(response) {
						response.request = request;
						return response;
					}).catch(function(error) {
						error.request = request;
						return Promise.reject(error);
					});
				});
				reversedInterceptors.forEach(function(_ref2) {
					var response = _ref2.response, responseError = _ref2.responseError;
					if (response || responseError) promise = promise.then(response, responseError);
				});
				return promise;
			}
			module$3.exports = function attach(env) {
				if (!env.fetch) try {
					__webpack_require__(2);
				} catch (err) {
					throw Error("No fetch available. Unable to register fetch-intercept");
				}
				env.fetch = function(fetch) {
					return function() {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
						return interceptor.apply(void 0, [fetch].concat(args));
					};
				}(env.fetch);
				return {
					register: function register(interceptor) {
						interceptors.push(interceptor);
						return function() {
							var index = interceptors.indexOf(interceptor);
							if (index >= 0) interceptors.splice(index, 1);
						};
					},
					clear: function clear() {
						interceptors = [];
					}
				};
			};
		}),
		(function(module$4, exports$3) {
			module$4.exports = (init_fetch(), __toCommonJS(fetch_exports));
		})
	]);
}));
//#endregion
export default require_browser();

//# sourceMappingURL=fetch-intercept.js.map