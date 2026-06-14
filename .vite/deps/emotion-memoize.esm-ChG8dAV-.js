import { n as __esmMin } from "./chunk-CqwQKh_b.js";
//#region node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function memoize(fn) {
	var cache = Object.create(null);
	return function(arg) {
		if (cache[arg] === void 0) cache[arg] = fn(arg);
		return cache[arg];
	};
}
var init_emotion_memoize_esm = __esmMin((() => {}));
//#endregion
export { memoize as n, init_emotion_memoize_esm as t };

//# sourceMappingURL=emotion-memoize.esm-ChG8dAV-.js.map