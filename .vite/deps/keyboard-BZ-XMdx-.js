import { I as event, L as matches, N as closest, a as isPaste, c as isUndo, i as isKey, n as isCmd, o as isRedo, r as isCopy, s as isShift, t as hasModifier, y as isFunction } from "./KeyboardUtil-D6QcCBvb.js";
//#region node_modules/diagram-js/lib/features/keyboard/Keyboard.js
/**
* @typedef {import('../../core/EventBus').default} EventBus
*
* @typedef {({ keyEvent: KeyboardEvent }) => any} Listener
*/
var KEYDOWN_EVENT = "keyboard.keydown", KEYUP_EVENT = "keyboard.keyup";
var HANDLE_MODIFIER_ATTRIBUTE = "input-handle-modified-keys";
var DEFAULT_PRIORITY = 1e3;
/**
* A keyboard abstraction that may be activated and
* deactivated by users at will, consuming global key events
* and triggering diagram actions.
*
* For keys pressed down, keyboard fires `keyboard.keydown` event.
* The event context contains one field which is `KeyboardEvent` event.
*
* The implementation fires the following key events that allow
* other components to hook into key handling:
*
*  - keyboard.bind
*  - keyboard.unbind
*  - keyboard.init
*  - keyboard.destroy
*
* All events contain one field which is node.
*
* A default binding for the keyboard may be specified via the
* `keyboard.bindTo` configuration option.
*
* @param {Object} config
* @param {EventTarget} [config.bindTo]
* @param {EventBus} eventBus
*/
function Keyboard(config, eventBus) {
	var self = this;
	this._config = config || {};
	this._eventBus = eventBus;
	this._keydownHandler = this._keydownHandler.bind(this);
	this._keyupHandler = this._keyupHandler.bind(this);
	eventBus.on("diagram.destroy", function() {
		self._fire("destroy");
		self.unbind();
	});
	eventBus.on("diagram.init", function() {
		self._fire("init");
	});
	eventBus.on("attach", function() {
		if (config && config.bindTo) self.bind(config.bindTo);
	});
	eventBus.on("detach", function() {
		self.unbind();
	});
}
Keyboard.$inject = ["config.keyboard", "eventBus"];
Keyboard.prototype._keydownHandler = function(event) {
	this._keyHandler(event, KEYDOWN_EVENT);
};
Keyboard.prototype._keyupHandler = function(event) {
	this._keyHandler(event, KEYUP_EVENT);
};
Keyboard.prototype._keyHandler = function(event, type) {
	var eventBusResult;
	if (this._isEventIgnored(event)) return;
	var context = { keyEvent: event };
	eventBusResult = this._eventBus.fire(type || KEYDOWN_EVENT, context);
	if (eventBusResult) event.preventDefault();
};
Keyboard.prototype._isEventIgnored = function(event) {
	if (event.defaultPrevented) return true;
	return (isInput(event.target) || isButton(event.target) && isKey([" ", "Enter"], event)) && this._isModifiedKeyIgnored(event);
};
Keyboard.prototype._isModifiedKeyIgnored = function(event) {
	if (!isCmd(event)) return true;
	return this._getAllowedModifiers(event.target).indexOf(event.key) === -1;
};
Keyboard.prototype._getAllowedModifiers = function(element) {
	var modifierContainer = closest(element, "[" + HANDLE_MODIFIER_ATTRIBUTE + "]", true);
	if (!modifierContainer || this._node && !this._node.contains(modifierContainer)) return [];
	return modifierContainer.getAttribute(HANDLE_MODIFIER_ATTRIBUTE).split(",");
};
/**
* Bind keyboard events to the given DOM node.
*
* @param {EventTarget} node
*/
Keyboard.prototype.bind = function(node) {
	this.unbind();
	this._node = node;
	event.bind(node, "keydown", this._keydownHandler);
	event.bind(node, "keyup", this._keyupHandler);
	this._fire("bind");
};
/**
* @return {EventTarget}
*/
Keyboard.prototype.getBinding = function() {
	return this._node;
};
Keyboard.prototype.unbind = function() {
	var node = this._node;
	if (node) {
		this._fire("unbind");
		event.unbind(node, "keydown", this._keydownHandler);
		event.unbind(node, "keyup", this._keyupHandler);
	}
	this._node = null;
};
/**
* @param {string} event
*/
Keyboard.prototype._fire = function(event) {
	this._eventBus.fire("keyboard." + event, { node: this._node });
};
/**
* Add a listener function that is notified with `KeyboardEvent` whenever
* the keyboard is bound and the user presses a key. If no priority is
* provided, the default value of 1000 is used.
*
* @param {number} [priority]
* @param {Listener} listener
* @param {string} [type='keyboard.keydown']
*/
Keyboard.prototype.addListener = function(priority, listener, type) {
	if (isFunction(priority)) {
		type = listener;
		listener = priority;
		priority = DEFAULT_PRIORITY;
	}
	this._eventBus.on(type || KEYDOWN_EVENT, priority, listener);
};
/**
* Remove a listener function.
*
* @param {Listener} listener
* @param {string} [type='keyboard.keydown']
*/
Keyboard.prototype.removeListener = function(listener, type) {
	this._eventBus.off(type || KEYDOWN_EVENT, listener);
};
Keyboard.prototype.hasModifier = hasModifier;
Keyboard.prototype.isCmd = isCmd;
Keyboard.prototype.isShift = isShift;
Keyboard.prototype.isKey = isKey;
function isInput(target) {
	return target && (matches(target, "input, textarea") || target.contentEditable === "true");
}
function isButton(target) {
	return target && matches(target, "button, input[type=submit], input[type=button], a[href], [aria-role=button]");
}
//#endregion
//#region node_modules/diagram-js/lib/features/keyboard/KeyboardBindings.js
var LOW_PRIORITY = 500;
/**
* Adds default keyboard bindings.
*
* This does not pull in any features will bind only actions that
* have previously been registered against the editorActions component.
*
* @param {EventBus} eventBus
* @param {Keyboard} keyboard
*/
function KeyboardBindings(eventBus, keyboard) {
	var self = this;
	eventBus.on("editorActions.init", LOW_PRIORITY, function(event) {
		var editorActions = event.editorActions;
		self.registerBindings(keyboard, editorActions);
	});
}
KeyboardBindings.$inject = ["eventBus", "keyboard"];
/**
* Register available keyboard bindings.
*
* @param {Keyboard} keyboard
* @param {EditorActions} editorActions
*/
KeyboardBindings.prototype.registerBindings = function(keyboard, editorActions) {
	/**
	* Add keyboard binding if respective editor action
	* is registered.
	*
	* @param {string} action name
	* @param {Function} fn that implements the key binding
	*/
	function addListener(action, fn) {
		if (editorActions.isRegistered(action)) keyboard.addListener(fn);
	}
	addListener("undo", function(context) {
		var event = context.keyEvent;
		if (isUndo(event)) {
			editorActions.trigger("undo");
			return true;
		}
	});
	addListener("redo", function(context) {
		var event = context.keyEvent;
		if (isRedo(event)) {
			editorActions.trigger("redo");
			return true;
		}
	});
	addListener("copy", function(context) {
		var event = context.keyEvent;
		if (isCopy(event)) {
			editorActions.trigger("copy");
			return true;
		}
	});
	addListener("paste", function(context) {
		var event = context.keyEvent;
		if (isPaste(event)) {
			editorActions.trigger("paste");
			return true;
		}
	});
	addListener("stepZoom", function(context) {
		var event = context.keyEvent;
		if (isKey([
			"+",
			"Add",
			"="
		], event) && isCmd(event)) {
			editorActions.trigger("stepZoom", { value: 1 });
			return true;
		}
	});
	addListener("stepZoom", function(context) {
		var event = context.keyEvent;
		if (isKey(["-", "Subtract"], event) && isCmd(event)) {
			editorActions.trigger("stepZoom", { value: -1 });
			return true;
		}
	});
	addListener("zoom", function(context) {
		var event = context.keyEvent;
		if (isKey("0", event) && isCmd(event)) {
			editorActions.trigger("zoom", { value: 1 });
			return true;
		}
	});
	addListener("removeSelection", function(context) {
		var event = context.keyEvent;
		if (isKey([
			"Backspace",
			"Delete",
			"Del"
		], event)) {
			editorActions.trigger("removeSelection");
			return true;
		}
	});
};
//#endregion
//#region node_modules/diagram-js/lib/features/keyboard/index.js
/**
* @type { import('didi').ModuleDeclaration }
*/
var keyboard_default = {
	__init__: ["keyboard", "keyboardBindings"],
	keyboard: ["type", Keyboard],
	keyboardBindings: ["type", KeyboardBindings]
};
//#endregion
export { keyboard_default as t };

//# sourceMappingURL=keyboard-BZ-XMdx-.js.map