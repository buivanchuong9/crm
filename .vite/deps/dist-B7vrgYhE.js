//#region node_modules/ids/dist/index.esm.js
function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}
var hat_1 = createCommonjsModule(function(module) {
	var hat = module.exports = function(bits, base) {
		if (!base) base = 16;
		if (bits === void 0) bits = 128;
		if (bits <= 0) return "0";
		var digits = Math.log(Math.pow(2, bits)) / Math.log(base);
		for (var i = 2; digits === Infinity; i *= 2) digits = Math.log(Math.pow(2, bits / i)) / Math.log(base) * i;
		var rem = digits - Math.floor(digits);
		var res = "";
		for (var i = 0; i < Math.floor(digits); i++) {
			var x = Math.floor(Math.random() * base).toString(base);
			res = x + res;
		}
		if (rem) {
			var x = Math.floor(Math.random() * Math.pow(base, rem)).toString(base);
			res = x + res;
		}
		var parsed = parseInt(res, base);
		if (parsed !== Infinity && parsed >= Math.pow(2, bits)) return hat(bits, base);
		else return res;
	};
	hat.rack = function(bits, base, expandBy) {
		var fn = function(data) {
			var iters = 0;
			do {
				if (iters++ > 10) if (expandBy) bits += expandBy;
				else throw new Error("too many ID collisions, use more bits");
				var id = hat(bits, base);
			} while (Object.hasOwnProperty.call(hats, id));
			hats[id] = data;
			return id;
		};
		var hats = fn.hats = {};
		fn.get = function(id) {
			return fn.hats[id];
		};
		fn.set = function(id, value) {
			fn.hats[id] = value;
			return fn;
		};
		fn.bits = bits || 128;
		fn.base = base || 16;
		return fn;
	};
});
/**
* Create a new id generator / cache instance.
*
* You may optionally provide a seed that is used internally.
*
* @param {Seed} seed
*/
function Ids(seed) {
	if (!(this instanceof Ids)) return new Ids(seed);
	seed = seed || [
		128,
		36,
		1
	];
	this._seed = seed.length ? hat_1.rack(seed[0], seed[1], seed[2]) : seed;
}
/**
* Generate a next id.
*
* @param {Object} [element] element to bind the id to
*
* @return {String} id
*/
Ids.prototype.next = function(element) {
	return this._seed(element || true);
};
/**
* Generate a next id with a given prefix.
*
* @param {Object} [element] element to bind the id to
*
* @return {String} id
*/
Ids.prototype.nextPrefixed = function(prefix, element) {
	var id;
	do
		id = prefix + this.next(true);
	while (this.assigned(id));
	this.claim(id, element);
	return id;
};
/**
* Manually claim an existing id.
*
* @param {String} id
* @param {String} [element] element the id is claimed by
*/
Ids.prototype.claim = function(id, element) {
	this._seed.set(id, element || true);
};
/**
* Returns true if the given id has already been assigned.
*
* @param  {String} id
* @return {Boolean}
*/
Ids.prototype.assigned = function(id) {
	return this._seed.get(id) || false;
};
/**
* Unclaim an id.
*
* @param  {String} id the id to unclaim
*/
Ids.prototype.unclaim = function(id) {
	delete this._seed.hats[id];
};
/**
* Clear all claimed ids.
*/
Ids.prototype.clear = function() {
	var hats = this._seed.hats, id;
	for (id in hats) this.unclaim(id);
};
//#endregion
//#region node_modules/didi/dist/index.js
var CLASS_PATTERN = /^class[ {]/;
/**
* @param {function} fn
*
* @return {boolean}
*/
function isClass(fn) {
	return CLASS_PATTERN.test(fn.toString());
}
/**
* @param {any} obj
*
* @return {boolean}
*/
function isArray(obj) {
	return Array.isArray(obj);
}
/**
* @param {any} obj
* @param {string} prop
*
* @return {boolean}
*/
function hasOwnProp(obj, prop) {
	return Object.prototype.hasOwnProperty.call(obj, prop);
}
/**
* @typedef {import('./index.js').InjectAnnotated } InjectAnnotated
*/
/**
* @template T
*
* @params {[...string[], T] | ...string[], T} args
*
* @return {T & InjectAnnotated}
*/
function annotate(...args) {
	if (args.length === 1 && isArray(args[0])) args = args[0];
	args = [...args];
	const fn = args.pop();
	fn.$inject = args;
	return fn;
}
var CONSTRUCTOR_ARGS = /constructor\s*[^(]*\(\s*([^)]*)\)/m;
var FN_ARGS = /^(?:async\s+)?(?:function\s*[^(]*)?(?:\(\s*([^)]*)\)|(\w+))/m;
var FN_ARG = /\/\*([^*]*)\*\//m;
/**
* @param {unknown} fn
*
* @return {string[]}
*/
function parseAnnotations(fn) {
	if (typeof fn !== "function") throw new Error(`Cannot annotate "${fn}". Expected a function!`);
	const match = fn.toString().match(isClass(fn) ? CONSTRUCTOR_ARGS : FN_ARGS);
	if (!match) return [];
	const args = match[1] || match[2];
	return args && args.split(",").map((arg) => {
		const argMatch = arg.match(FN_ARG);
		return (argMatch && argMatch[1] || arg).trim();
	}) || [];
}
/**
* @typedef { import('./index.js').ModuleDeclaration } ModuleDeclaration
* @typedef { import('./index.js').ModuleDefinition } ModuleDefinition
* @typedef { import('./index.js').InjectorContext } InjectorContext
*
* @typedef { import('./index.js').TypedDeclaration<any, any> } TypedDeclaration
*/
/**
* Create a new injector with the given modules.
*
* @param {ModuleDefinition[]} modules
* @param {InjectorContext} [_parent]
*/
function Injector(modules, _parent) {
	const parent = _parent || { get: function(name, strict) {
		currentlyResolving.push(name);
		if (strict === false) return null;
		else throw error(`No provider for "${name}"!`);
	} };
	const currentlyResolving = [];
	const providers = this._providers = Object.create(parent._providers || null);
	const instances = this._instances = Object.create(null);
	const self = instances.injector = this;
	const error = function(msg) {
		const stack = currentlyResolving.join(" -> ");
		currentlyResolving.length = 0;
		return new Error(stack ? `${msg} (Resolving: ${stack})` : msg);
	};
	/**
	* Return a named service.
	*
	* @param {string} name
	* @param {boolean} [strict=true] if false, resolve missing services to null
	*
	* @return {any}
	*/
	function get(name, strict) {
		if (!providers[name] && name.includes(".")) {
			const parts = name.split(".");
			let pivot = get(parts.shift());
			while (parts.length) pivot = pivot[parts.shift()];
			return pivot;
		}
		if (hasOwnProp(instances, name)) return instances[name];
		if (hasOwnProp(providers, name)) {
			if (currentlyResolving.indexOf(name) !== -1) {
				currentlyResolving.push(name);
				throw error("Cannot resolve circular dependency!");
			}
			currentlyResolving.push(name);
			instances[name] = providers[name][0](providers[name][1]);
			currentlyResolving.pop();
			return instances[name];
		}
		return parent.get(name, strict);
	}
	function fnDef(fn, locals) {
		if (typeof locals === "undefined") locals = {};
		if (typeof fn !== "function") if (isArray(fn)) fn = annotate(fn.slice());
		else throw error(`Cannot invoke "${fn}". Expected a function!`);
		const dependencies = (fn.$inject || parseAnnotations(fn)).map((dep) => {
			if (hasOwnProp(locals, dep)) return locals[dep];
			else return get(dep);
		});
		return {
			fn,
			dependencies
		};
	}
	/**
	* Instantiate the given type, injecting dependencies.
	*
	* @template T
	*
	* @param { Function | [...string[], Function ]} type
	*
	* @return T
	*/
	function instantiate(type) {
		const { fn, dependencies } = fnDef(type);
		return new (Function.prototype.bind.call(fn, null, ...dependencies))();
	}
	/**
	* Invoke the given function, injecting dependencies. Return the result.
	*
	* @template T
	*
	* @param { Function | [...string[], Function ]} func
	* @param { Object } [context]
	* @param { Object } [locals]
	*
	* @return {T} invocation result
	*/
	function invoke(func, context, locals) {
		const { fn, dependencies } = fnDef(func, locals);
		return fn.apply(context, dependencies);
	}
	/**
	* @param {Injector} childInjector
	*
	* @return {Function}
	*/
	function createPrivateInjectorFactory(childInjector) {
		return annotate((key) => childInjector.get(key));
	}
	/**
	* @param {ModuleDefinition[]} modules
	* @param {string[]} [forceNewInstances]
	*
	* @return {Injector}
	*/
	function createChild(modules, forceNewInstances) {
		if (forceNewInstances && forceNewInstances.length) {
			const fromParentModule = Object.create(null);
			const matchedScopes = Object.create(null);
			const privateInjectorsCache = [];
			const privateChildInjectors = [];
			const privateChildFactories = [];
			let provider;
			let cacheIdx;
			let privateChildInjector;
			let privateChildInjectorFactory;
			for (let name in providers) {
				provider = providers[name];
				if (forceNewInstances.indexOf(name) !== -1) {
					if (provider[2] === "private") {
						cacheIdx = privateInjectorsCache.indexOf(provider[3]);
						if (cacheIdx === -1) {
							privateChildInjector = provider[3].createChild([], forceNewInstances);
							privateChildInjectorFactory = createPrivateInjectorFactory(privateChildInjector);
							privateInjectorsCache.push(provider[3]);
							privateChildInjectors.push(privateChildInjector);
							privateChildFactories.push(privateChildInjectorFactory);
							fromParentModule[name] = [
								privateChildInjectorFactory,
								name,
								"private",
								privateChildInjector
							];
						} else fromParentModule[name] = [
							privateChildFactories[cacheIdx],
							name,
							"private",
							privateChildInjectors[cacheIdx]
						];
					} else fromParentModule[name] = [provider[2], provider[1]];
					matchedScopes[name] = true;
				}
				if ((provider[2] === "factory" || provider[2] === "type") && provider[1].$scope) forceNewInstances.forEach((scope) => {
					if (provider[1].$scope.indexOf(scope) !== -1) {
						fromParentModule[name] = [provider[2], provider[1]];
						matchedScopes[scope] = true;
					}
				});
			}
			forceNewInstances.forEach((scope) => {
				if (!matchedScopes[scope]) throw new Error("No provider for \"" + scope + "\". Cannot use provider from the parent!");
			});
			modules.unshift(fromParentModule);
		}
		return new Injector(modules, self);
	}
	const factoryMap = {
		factory: invoke,
		type: instantiate,
		value: function(value) {
			return value;
		}
	};
	/**
	* @param {ModuleDefinition} moduleDefinition
	* @param {Injector} injector
	*/
	function createInitializer(moduleDefinition, injector) {
		const initializers = moduleDefinition.__init__ || [];
		return function() {
			initializers.forEach((initializer) => {
				if (typeof initializer === "string") injector.get(initializer);
				else injector.invoke(initializer);
			});
		};
	}
	/**
	* @param {ModuleDefinition} moduleDefinition
	*/
	function loadModule(moduleDefinition) {
		const moduleExports = moduleDefinition.__exports__;
		if (moduleExports) {
			const nestedModules = moduleDefinition.__modules__;
			const clonedModule = Object.keys(moduleDefinition).reduce((clonedModule, key) => {
				if (key !== "__exports__" && key !== "__modules__" && key !== "__init__" && key !== "__depends__") clonedModule[key] = moduleDefinition[key];
				return clonedModule;
			}, Object.create(null));
			const privateInjector = createChild((nestedModules || []).concat(clonedModule));
			const getFromPrivateInjector = annotate(function(key) {
				return privateInjector.get(key);
			});
			moduleExports.forEach(function(key) {
				providers[key] = [
					getFromPrivateInjector,
					key,
					"private",
					privateInjector
				];
			});
			const initializers = (moduleDefinition.__init__ || []).slice();
			initializers.unshift(function() {
				privateInjector.init();
			});
			moduleDefinition = Object.assign({}, moduleDefinition, { __init__: initializers });
			return createInitializer(moduleDefinition, privateInjector);
		}
		Object.keys(moduleDefinition).forEach(function(key) {
			if (key === "__init__" || key === "__depends__") return;
			const typeDeclaration = moduleDefinition[key];
			if (typeDeclaration[2] === "private") {
				providers[key] = typeDeclaration;
				return;
			}
			const type = typeDeclaration[0];
			const value = typeDeclaration[1];
			providers[key] = [
				factoryMap[type],
				arrayUnwrap(type, value),
				type
			];
		});
		return createInitializer(moduleDefinition, self);
	}
	/**
	* @param {ModuleDefinition[]} moduleDefinitions
	* @param {ModuleDefinition} moduleDefinition
	*
	* @return {ModuleDefinition[]}
	*/
	function resolveDependencies(moduleDefinitions, moduleDefinition) {
		if (moduleDefinitions.indexOf(moduleDefinition) !== -1) return moduleDefinitions;
		moduleDefinitions = (moduleDefinition.__depends__ || []).reduce(resolveDependencies, moduleDefinitions);
		if (moduleDefinitions.indexOf(moduleDefinition) !== -1) return moduleDefinitions;
		return moduleDefinitions.concat(moduleDefinition);
	}
	/**
	* @param {ModuleDefinition[]} moduleDefinitions
	*
	* @return { () => void } initializerFn
	*/
	function bootstrap(moduleDefinitions) {
		const initializers = moduleDefinitions.reduce(resolveDependencies, []).map(loadModule);
		let initialized = false;
		return function() {
			if (initialized) return;
			initialized = true;
			initializers.forEach((initializer) => initializer());
		};
	}
	this.get = get;
	this.invoke = invoke;
	this.instantiate = instantiate;
	this.createChild = createChild;
	this.init = bootstrap(modules);
}
function arrayUnwrap(type, value) {
	if (type !== "value" && isArray(value)) value = annotate(value.slice());
	return value;
}
//#endregion
export { Ids as n, Injector as t };

//# sourceMappingURL=dist-B7vrgYhE.js.map