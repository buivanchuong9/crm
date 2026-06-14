import { a as _possibleConstructorReturn, l as _getPrototypeOf, o as init_possibleConstructorReturn, u as init_getPrototypeOf } from "./toConsumableArray-ES8cyR8Y.js";
import { t as _isNativeReflectConstruct } from "./isNativeReflectConstruct-O601XLfQ.js";
//#region node_modules/@babel/runtime/helpers/esm/createSuper.js
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
export { _createSuper as t };

//# sourceMappingURL=createSuper-DSg_QlnO.js.map