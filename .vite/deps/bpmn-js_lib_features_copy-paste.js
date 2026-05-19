import { assign, filter, find, forEach, has, isArray, isDefined, isFunction, isNumber, isObject, isUndefined, map, matchPattern, omit, reduce, sortBy } from "./min-dash.js";
import { d as query, l as event, o as closest } from "./index.esm-E5VQvuu4.js";
import { A as attr, B as stopPropagation, C as getBBox, I as remove, M as clone, N as create, S as eachElement, V as toPoint, _ as install, a as getDi, b as selection_default, d as isConnection, f as isLabel, g as delta, h as getVisual, i as getBusinessObject, j as classes, k as append, o as is$1, p as IdGenerator, u as translate, v as set, w as getParents, y as unset, z as getOriginal } from "./LabelUtil-ClWHG_I1.js";
import { i as isKey } from "./KeyboardUtil-BgsbI_dl.js";
//#region node_modules/diagram-js/lib/features/clipboard/Clipboard.js
/**
* A clip board stub
*/
function Clipboard() {}
Clipboard.prototype.get = function() {
	return this._data;
};
Clipboard.prototype.set = function(data) {
	this._data = data;
};
Clipboard.prototype.clear = function() {
	var data = this._data;
	delete this._data;
	return data;
};
Clipboard.prototype.isEmpty = function() {
	return !this._data;
};
//#endregion
//#region node_modules/diagram-js/lib/features/clipboard/index.js
/**
* @type { import('didi').ModuleDeclaration }
*/
var clipboard_default = { clipboard: ["type", Clipboard] };
//#endregion
//#region node_modules/diagram-js/lib/features/hover-fix/HoverFix.js
/**
* @typedef {import('didi').Injector} Injector
*
* @typedef {import('../../core/ElementRegistry').default} ElementRegistry
* @typedef {import('../../core/EventBus').default} EventBus
*/
var HIGH_PRIORITY$1 = 1500;
/**
* Browsers may swallow certain events (hover, out ...) if users are to
* fast with the mouse.
*
* @see http://stackoverflow.com/questions/7448468/why-cant-i-reliably-capture-a-mouseout-event
*
* The fix implemented in this component ensure that we
*
* 1) have a hover state after a successful drag.move event
* 2) have an out event when dragging leaves an element
*
* @param {ElementRegistry} elementRegistry
* @param {EventBus} eventBus
* @param {Injector} injector
*/
function HoverFix(elementRegistry, eventBus, injector) {
	var self = this;
	var dragging = injector.get("dragging", false);
	/**
	* Make sure we are god damn hovering!
	*
	* @param {Event} dragging event
	*/
	function ensureHover(event) {
		if (event.hover) return;
		var originalEvent = event.originalEvent;
		var gfx = self._findTargetGfx(originalEvent);
		var element = gfx && elementRegistry.get(gfx);
		if (gfx && element) {
			event.stopPropagation();
			dragging.hover({
				element,
				gfx
			});
			dragging.move(originalEvent);
		}
	}
	if (dragging)
 /**
	* We wait for a specific sequence of events before
	* emitting a fake drag.hover event.
	*
	* Event Sequence:
	*
	* drag.start
	* drag.move >> ensure we are hovering
	*/
	eventBus.on("drag.start", function(event) {
		eventBus.once("drag.move", HIGH_PRIORITY$1, function(event) {
			ensureHover(event);
		});
	});
	/**
	* We make sure that element.out is always fired, even if the
	* browser swallows an element.out event.
	*
	* Event sequence:
	*
	* element.hover
	* (element.out >> sometimes swallowed)
	* element.hover >> ensure we fired element.out
	*/
	(function() {
		var hoverGfx;
		var hover;
		eventBus.on("element.hover", function(event) {
			hoverGfx = event.gfx;
			hover = event.element;
		});
		eventBus.on("element.hover", HIGH_PRIORITY$1, function(event) {
			if (hover) eventBus.fire("element.out", {
				element: hover,
				gfx: hoverGfx
			});
		});
		eventBus.on("element.out", function() {
			hoverGfx = null;
			hover = null;
		});
	})();
	this._findTargetGfx = function(event) {
		var position, target;
		if (!(event instanceof MouseEvent)) return;
		position = toPoint(event);
		target = document.elementFromPoint(position.x, position.y);
		return getGfx(target);
	};
}
HoverFix.$inject = [
	"elementRegistry",
	"eventBus",
	"injector"
];
function getGfx(target) {
	return closest(target, "svg, .djs-element", true);
}
//#endregion
//#region node_modules/diagram-js/lib/features/hover-fix/index.js
/**
* @type { import('didi').ModuleDeclaration }
*/
var hover_fix_default = {
	__init__: ["hoverFix"],
	hoverFix: ["type", HoverFix]
};
//#endregion
//#region node_modules/diagram-js/lib/features/dragging/Dragging.js
var round = Math.round;
/**
* @typedef {import('../../util/Types').Point} Point
*
* @typedef {import('../../core/Canvas').default} Canvas
* @typedef {import('../../core/ElementRegistry').default} ElementRegistry
* @typedef {import('../../core/EventBus').default} EventBus
* @typedef {import('../selection/Selection').default} Selection
*/
var DRAG_ACTIVE_CLS = "djs-drag-active";
function preventDefault(event) {
	event.preventDefault();
}
function isTouchEvent(event) {
	return typeof TouchEvent !== "undefined" && event instanceof TouchEvent;
}
function getLength(point) {
	return Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));
}
/**
* A helper that fires canvas localized drag events and realizes
* the general "drag-and-drop" look and feel.
*
* Calling {@link Dragging#activate} activates dragging on a canvas.
*
* It provides the following:
*
*   * emits life cycle events, namespaced with a prefix assigned
*     during dragging activation
*   * sets and restores the cursor
*   * sets and restores the selection if elements still exist
*   * ensures there can be only one drag operation active at a time
*
* Dragging may be canceled manually by calling {@link Dragging#cancel}
* or by pressing ESC.
*
*
* ## Life-cycle events
*
* Dragging can be in three different states, off, initialized
* and active.
*
* (1) off: no dragging operation is in progress
* (2) initialized: a new drag operation got initialized but not yet
*                  started (i.e. because of no initial move)
* (3) started: dragging is in progress
*
* Eventually dragging will be off again after a drag operation has
* been ended or canceled via user click or ESC key press.
*
* To indicate transitions between these states dragging emits generic
* life-cycle events with the `drag.` prefix _and_ events namespaced
* to a prefix choosen by a user during drag initialization.
*
* The following events are emitted (appropriately prefixed) via
* the {@link EventBus}.
*
* * `init`
* * `start`
* * `move`
* * `end`
* * `ended` (dragging already in off state)
* * `cancel` (only if previously started)
* * `canceled` (dragging already in off state, only if previously started)
* * `cleanup`
*
*
* @example
*
* ```javascript
* function MyDragComponent(eventBus, dragging) {
*
*   eventBus.on('mydrag.start', function(event) {
*     console.log('yes, we start dragging');
*   });
*
*   eventBus.on('mydrag.move', function(event) {
*     console.log('canvas local coordinates', event.x, event.y, event.dx, event.dy);
*
*     // local drag data is passed with the event
*     event.context.foo; // "BAR"
*
*     // the original mouse event, too
*     event.originalEvent; // MouseEvent(...)
*   });
*
*   eventBus.on('element.click', function(event) {
*     dragging.init(event, 'mydrag', {
*       cursor: 'grabbing',
*       data: {
*         context: {
*           foo: "BAR"
*         }
*       }
*     });
*   });
* }
* ```
*
* @param {EventBus} eventBus
* @param {Canvas} canvas
* @param {Selection} selection
* @param {ElementRegistry} elementRegistry
*/
function Dragging(eventBus, canvas, selection, elementRegistry) {
	var defaultOptions = {
		threshold: 5,
		trapClick: true
	};
	var context;
	function toLocalPoint(globalPosition) {
		var viewbox = canvas.viewbox();
		var clientRect = canvas._container.getBoundingClientRect();
		return {
			x: viewbox.x + (globalPosition.x - clientRect.left) / viewbox.scale,
			y: viewbox.y + (globalPosition.y - clientRect.top) / viewbox.scale
		};
	}
	function fire(type, dragContext) {
		dragContext = dragContext || context;
		var event = eventBus.createEvent(assign({}, dragContext.payload, dragContext.data, { isTouch: dragContext.isTouch }));
		if (eventBus.fire("drag." + type, event) === false) return false;
		return eventBus.fire(dragContext.prefix + "." + type, event);
	}
	function restoreSelection(previousSelection) {
		var existingSelection = previousSelection.filter(function(element) {
			return elementRegistry.get(element.id);
		});
		existingSelection.length && selection.select(existingSelection);
	}
	function move(event, activate) {
		var payload = context.payload, displacement = context.displacement;
		var globalStart = context.globalStart, globalCurrent = toPoint(event), globalDelta = delta(globalCurrent, globalStart);
		var localStart = context.localStart, localCurrent = toLocalPoint(globalCurrent), localDelta = delta(localCurrent, localStart);
		if (!context.active && (activate || getLength(globalDelta) > context.threshold)) {
			assign(payload, {
				x: round(localStart.x + displacement.x),
				y: round(localStart.y + displacement.y),
				dx: 0,
				dy: 0
			}, { originalEvent: event });
			if (false === fire("start")) return cancel();
			context.active = true;
			if (!context.keepSelection) {
				payload.previousSelection = selection.get();
				selection.select(null);
			}
			if (context.cursor) set(context.cursor);
			canvas.addMarker(canvas.getRootElement(), DRAG_ACTIVE_CLS);
		}
		stopPropagation(event);
		if (context.active) {
			assign(payload, {
				x: round(localCurrent.x + displacement.x),
				y: round(localCurrent.y + displacement.y),
				dx: round(localDelta.x),
				dy: round(localDelta.y)
			}, { originalEvent: event });
			fire("move");
		}
	}
	function end(event) {
		var previousContext, returnValue = true;
		if (context.active) {
			if (event) {
				context.payload.originalEvent = event;
				stopPropagation(event);
			}
			returnValue = fire("end");
		}
		if (returnValue === false) fire("rejected");
		previousContext = cleanup(returnValue !== true);
		fire("ended", previousContext);
	}
	function checkCancel(event) {
		if (isKey("Escape", event)) {
			preventDefault(event);
			cancel();
		}
	}
	function trapClickAndEnd(event) {
		var untrap;
		if (context.active) {
			untrap = install(eventBus);
			setTimeout(untrap, 400);
			preventDefault(event);
		}
		end(event);
	}
	function trapTouch(event) {
		move(event);
	}
	function hover(event) {
		var payload = context.payload;
		payload.hoverGfx = event.gfx;
		payload.hover = event.element;
		fire("hover");
	}
	function out(event) {
		fire("out");
		var payload = context.payload;
		payload.hoverGfx = null;
		payload.hover = null;
	}
	function cancel(restore) {
		var previousContext;
		if (!context) return;
		var wasActive = context.active;
		if (wasActive) fire("cancel");
		previousContext = cleanup(restore);
		if (wasActive) fire("canceled", previousContext);
	}
	function cleanup(restore) {
		var previousContext, endDrag;
		fire("cleanup");
		unset();
		if (context.trapClick) endDrag = trapClickAndEnd;
		else endDrag = end;
		event.unbind(document, "mousemove", move);
		event.unbind(document, "dragstart", preventDefault);
		event.unbind(document, "selectstart", preventDefault);
		event.unbind(document, "mousedown", endDrag, true);
		event.unbind(document, "mouseup", endDrag, true);
		event.unbind(document, "keyup", checkCancel);
		event.unbind(document, "touchstart", trapTouch, true);
		event.unbind(document, "touchcancel", cancel, true);
		event.unbind(document, "touchmove", move, true);
		event.unbind(document, "touchend", end, true);
		eventBus.off("element.hover", hover);
		eventBus.off("element.out", out);
		canvas.removeMarker(canvas.getRootElement(), DRAG_ACTIVE_CLS);
		var previousSelection = context.payload.previousSelection;
		if (restore !== false && previousSelection && !selection.get().length) restoreSelection(previousSelection);
		previousContext = context;
		context = null;
		return previousContext;
	}
	/**
	* Initialize a drag operation.
	*
	* If `localPosition` is given, drag events will be emitted
	* relative to it.
	*
	* @param {MouseEvent|TouchEvent} [event]
	* @param {Point} [relativeTo] actual diagram local position this drag operation should start at
	* @param {string} prefix
	* @param {Object} [options]
	*/
	function init(event$1, relativeTo, prefix, options) {
		if (context) cancel(false);
		if (typeof relativeTo === "string") {
			options = prefix;
			prefix = relativeTo;
			relativeTo = null;
		}
		options = assign({}, defaultOptions, options || {});
		var data = options.data || {}, originalEvent, globalStart, localStart, endDrag, isTouch;
		if (options.trapClick) endDrag = trapClickAndEnd;
		else endDrag = end;
		if (event$1) {
			originalEvent = getOriginal(event$1) || event$1;
			globalStart = toPoint(event$1);
			stopPropagation(event$1);
			if (originalEvent.type === "dragstart") preventDefault(originalEvent);
		} else {
			originalEvent = null;
			globalStart = {
				x: 0,
				y: 0
			};
		}
		localStart = toLocalPoint(globalStart);
		if (!relativeTo) relativeTo = localStart;
		isTouch = isTouchEvent(originalEvent);
		context = assign({
			prefix,
			data,
			payload: {},
			globalStart,
			displacement: delta(relativeTo, localStart),
			localStart,
			isTouch
		}, options);
		if (!options.manual) {
			if (isTouch) {
				event.bind(document, "touchstart", trapTouch, true);
				event.bind(document, "touchcancel", cancel, true);
				event.bind(document, "touchmove", move, true);
				event.bind(document, "touchend", end, true);
			} else {
				event.bind(document, "mousemove", move);
				event.bind(document, "dragstart", preventDefault);
				event.bind(document, "selectstart", preventDefault);
				event.bind(document, "mousedown", endDrag, true);
				event.bind(document, "mouseup", endDrag, true);
			}
			event.bind(document, "keyup", checkCancel);
			eventBus.on("element.hover", hover);
			eventBus.on("element.out", out);
		}
		fire("init");
		if (options.autoActivate) move(event$1, true);
	}
	eventBus.on("diagram.destroy", cancel);
	this.init = init;
	this.move = move;
	this.hover = hover;
	this.out = out;
	this.end = end;
	this.cancel = cancel;
	this.context = function() {
		return context;
	};
	this.setOptions = function(options) {
		assign(defaultOptions, options);
	};
}
Dragging.$inject = [
	"eventBus",
	"canvas",
	"selection",
	"elementRegistry"
];
//#endregion
//#region node_modules/diagram-js/lib/features/dragging/index.js
/**
* @type { import('didi').ModuleDeclaration }
*/
var dragging_default = {
	__depends__: [hover_fix_default, selection_default],
	dragging: ["type", Dragging]
};
//#endregion
//#region node_modules/diagram-js/lib/features/preview-support/PreviewSupport.js
/**
* @typedef {import('../../core/Types').ElementLike} Element
* @typedef {import('../../core/Types').ShapeLike} Shape
*
* @typedef {import('../../core/Canvas').default} Canvas
* @typedef {import('../../core/ElementRegistry').default} ElementRegistry
* @typedef {import('../../core/EventBus').default} EventBus
* @typedef {import('../../draw/Styles').default} Styles
*/
var cloneIds = new IdGenerator("ps");
var MARKER_TYPES = [
	"marker-start",
	"marker-mid",
	"marker-end"
];
var NODES_CAN_HAVE_MARKER = [
	"circle",
	"ellipse",
	"line",
	"path",
	"polygon",
	"polyline",
	"path",
	"rect"
];
/**
* Adds support for previews of moving/resizing elements.
*
* @param {ElementRegistry} elementRegistry
* @param {EventBus} eventBus
* @param {Canvas} canvas
* @param {Styles} styles
*/
function PreviewSupport(elementRegistry, eventBus, canvas, styles) {
	this._elementRegistry = elementRegistry;
	this._canvas = canvas;
	this._styles = styles;
}
PreviewSupport.$inject = [
	"elementRegistry",
	"eventBus",
	"canvas",
	"styles"
];
PreviewSupport.prototype.cleanUp = function() {
	console.warn("PreviewSupport#cleanUp is deprecated and will be removed in future versions. You do not need to manually clean up previews anymore. cf. https://github.com/bpmn-io/diagram-js/pull/906");
};
/**
* Returns graphics of an element.
*
* @param {Element} element
*
* @return {SVGElement}
*/
PreviewSupport.prototype.getGfx = function(element) {
	return this._elementRegistry.getGraphics(element);
};
/**
* Adds a move preview of a given shape to a given SVG group.
*
* @param {Element} element The element to be moved.
* @param {SVGElement} group The SVG group to add the preview to.
* @param {SVGElement} [gfx] The optional graphical element of the element.
* @param {string} [className="djs-dragger"] The optional class name to add to the preview.
*
* @return {SVGElement} The preview.
*/
PreviewSupport.prototype.addDragger = function(element, group, gfx, className = "djs-dragger") {
	gfx = gfx || this.getGfx(element);
	var dragger = clone(gfx);
	var bbox = gfx.getBoundingClientRect();
	this._cloneMarkers(getVisual(dragger), className);
	attr(dragger, this._styles.cls(className, [], {
		x: bbox.top,
		y: bbox.left
	}));
	append(group, dragger);
	attr(dragger, "data-preview-support-element-id", element.id);
	return dragger;
};
/**
* Adds a resize preview of a given shape to a given SVG group.
*
* @param {Shape} shape The element to be resized.
* @param {SVGElement} group The SVG group to add the preview to.
*
* @return {SVGElement} The preview.
*/
PreviewSupport.prototype.addFrame = function(shape, group) {
	var frame = create("rect", {
		class: "djs-resize-overlay",
		width: shape.width,
		height: shape.height,
		x: shape.x,
		y: shape.y
	});
	append(group, frame);
	attr(frame, "data-preview-support-element-id", shape.id);
	return frame;
};
/**
* Clone all markers referenced by a node and its child nodes.
*
* @param {SVGElement} gfx
* @param {string} [className="djs-dragger"]
*/
PreviewSupport.prototype._cloneMarkers = function(gfx, className = "djs-dragger", rootGfx = gfx) {
	var self = this;
	if (gfx.childNodes) for (var i = 0; i < gfx.childNodes.length; i++) self._cloneMarkers(gfx.childNodes[i], className, rootGfx);
	if (!canHaveMarker(gfx)) return;
	MARKER_TYPES.forEach(function(markerType) {
		if (attr(gfx, markerType)) {
			var marker = getMarker(gfx, markerType, self._canvas.getContainer());
			marker && self._cloneMarker(rootGfx, gfx, marker, markerType, className);
		}
	});
};
/**
* Clone marker referenced by an element.
*
* @param {SVGElement} gfx
* @param {SVGElement} marker
* @param {string} markerType
* @param {string} [className="djs-dragger"]
*/
PreviewSupport.prototype._cloneMarker = function(parentGfx, gfx, marker, markerType, className = "djs-dragger") {
	var clonedMarkerId = [
		marker.id,
		className,
		cloneIds.next()
	].join("-");
	var copiedMarker = query("marker#" + marker.id, parentGfx);
	parentGfx = parentGfx || this._canvas._svg;
	var clonedMarker = copiedMarker || clone(marker);
	clonedMarker.id = clonedMarkerId;
	classes(clonedMarker).add(className);
	var defs = query(":scope > defs", parentGfx);
	if (!defs) {
		defs = create("defs");
		append(parentGfx, defs);
	}
	append(defs, clonedMarker);
	attr(gfx, markerType, idToReference(clonedMarker.id));
};
/**
* Get marker of given type referenced by node.
*
* @param {HTMLElement} node
* @param {string} markerType
* @param {HTMLElement} [parentNode]
*
* @param {HTMLElement}
*/
function getMarker(node, markerType, parentNode) {
	return query("marker#" + referenceToId(attr(node, markerType)), parentNode || document);
}
/**
* Get ID of fragment within current document from its functional IRI reference.
* References may use single or double quotes.
*
* @param {string} reference
*
* @return {string}
*/
function referenceToId(reference) {
	return reference.match(/url\(['"]?#([^'"]*)['"]?\)/)[1];
}
/**
* Get functional IRI reference for given ID of fragment within current document.
*
* @param {string} id
*
* @return {string}
*/
function idToReference(id) {
	return "url(#" + id + ")";
}
/**
* Check wether node type can have marker attributes.
*
* @param {HTMLElement} node
*
* @return {boolean}
*/
function canHaveMarker(node) {
	return NODES_CAN_HAVE_MARKER.indexOf(node.nodeName) !== -1;
}
//#endregion
//#region node_modules/diagram-js/lib/features/preview-support/index.js
/**
* @type { import('didi').ModuleDeclaration }
*/
var preview_support_default = {
	__init__: ["previewSupport"],
	previewSupport: ["type", PreviewSupport]
};
//#endregion
//#region node_modules/diagram-js/lib/features/rules/Rules.js
/**
* @typedef {import('didi').Injector} Injector
*/
/**
* A service that provides rules for certain diagram actions.
*
* The default implementation will hook into the {@link CommandStack}
* to perform the actual rule evaluation. Make sure to provide the
* `commandStack` service with this module if you plan to use it.
*
* Together with this implementation you may use the {@link import('./RuleProvider').default}
* to implement your own rule checkers.
*
* This module is ment to be easily replaced, thus the tiny foot print.
*
* @param {Injector} injector
*/
function Rules(injector) {
	this._commandStack = injector.get("commandStack", false);
}
Rules.$inject = ["injector"];
/**
* Returns whether or not a given modeling action can be executed
* in the specified context.
*
* This implementation will respond with allow unless anyone
* objects.
*
* @param {string} action The action to be allowed or disallowed.
* @param {Object} [context] The context for allowing or disallowing the action.
*
* @return {boolean|null} Wether the action is allowed. Returns `null` if the action
* is to be ignored.
*/
Rules.prototype.allowed = function(action, context) {
	var allowed = true;
	var commandStack = this._commandStack;
	if (commandStack) allowed = commandStack.canExecute(action, context);
	return allowed === void 0 ? true : allowed;
};
//#endregion
//#region node_modules/diagram-js/lib/features/rules/index.js
/**
* @type { import('didi').ModuleDeclaration }
*/
var rules_default = {
	__init__: ["rules"],
	rules: ["type", Rules]
};
//#endregion
//#region node_modules/diagram-js/lib/features/create/Create.js
var MARKER_OK = "drop-ok", MARKER_NOT_OK = "drop-not-ok", MARKER_ATTACH = "attach-ok", MARKER_NEW_PARENT = "new-parent";
/**
* @typedef {import('../../core/Types').ElementLike} Element
* @typedef {import('../../core/Types').ShapeLike} Shape
*
* @typedef {import('../../util/Types').Point} Point
*
* @typedef {import('../../core/Canvas').default} Canvas
* @typedef {import('../dragging/Dragging').default} Dragging
* @typedef {import('../../core/EventBus').default} EventBus
* @typedef {import('../modeling/Modeling').default} Modeling
* @typedef {import('../rules/Rules').default} Rules
*/
var PREFIX = "create";
var HIGH_PRIORITY = 2e3;
/**
* Create new elements through drag and drop.
*
* @param {Canvas} canvas
* @param {Dragging} dragging
* @param {EventBus} eventBus
* @param {Modeling} modeling
* @param {Rules} rules
*/
function Create(canvas, dragging, eventBus, modeling, rules) {
	/**
	* Check wether elements can be created.
	*
	* @param {Element[]} elements
	* @param {Shape} target
	* @param {Point} position
	* @param {Element} [source]
	*
	* @return {boolean|null|Object}
	*/
	function canCreate(elements, target, position, source, hints) {
		if (!target) return false;
		elements = filter(elements, function(element) {
			var labelTarget = element.labelTarget;
			return !element.parent && !(isLabel(element) && elements.indexOf(labelTarget) !== -1);
		});
		var shape = find(elements, function(element) {
			return !isConnection(element);
		});
		var attach = false, connect = false, create = false;
		if (isSingleShape(elements)) attach = rules.allowed("shape.attach", {
			position,
			shape,
			target
		});
		if (!attach) if (isSingleShape(elements)) create = rules.allowed("shape.create", {
			position,
			shape,
			source,
			target
		});
		else create = rules.allowed("elements.create", {
			elements,
			position,
			target
		});
		var connectionTarget = hints.connectionTarget;
		if (create || attach) {
			if (shape && source) connect = rules.allowed("connection.create", {
				source: connectionTarget === source ? shape : source,
				target: connectionTarget === source ? source : shape,
				hints: {
					targetParent: target,
					targetAttach: attach
				}
			});
			return {
				attach,
				connect
			};
		}
		if (create === null || attach === null) return null;
		return false;
	}
	function setMarker(element, marker) {
		[
			MARKER_ATTACH,
			MARKER_OK,
			MARKER_NOT_OK,
			MARKER_NEW_PARENT
		].forEach(function(m) {
			if (m === marker) canvas.addMarker(element, m);
			else canvas.removeMarker(element, m);
		});
	}
	eventBus.on(["create.move", "create.hover"], function(event) {
		var context = event.context, elements = context.elements, hover = event.hover, source = context.source, hints = context.hints || {};
		if (!hover) {
			context.canExecute = false;
			context.target = null;
			return;
		}
		ensureConstraints(event);
		var position = {
			x: event.x,
			y: event.y
		};
		var canExecute = context.canExecute = hover && canCreate(elements, hover, position, source, hints);
		if (hover && canExecute !== null) {
			context.target = hover;
			if (canExecute && canExecute.attach) setMarker(hover, MARKER_ATTACH);
			else setMarker(hover, canExecute ? MARKER_NEW_PARENT : MARKER_NOT_OK);
		}
	});
	eventBus.on([
		"create.end",
		"create.out",
		"create.cleanup"
	], function(event) {
		var hover = event.hover;
		if (hover) setMarker(hover, null);
	});
	eventBus.on("create.end", function(event) {
		var context = event.context, source = context.source, shape = context.shape, elements = context.elements, target = context.target, canExecute = context.canExecute, attach = canExecute && canExecute.attach, connect = canExecute && canExecute.connect, hints = context.hints || {};
		if (canExecute === false || !target) return false;
		ensureConstraints(event);
		var position = {
			x: event.x,
			y: event.y
		};
		if (connect) shape = modeling.appendShape(source, shape, position, target, {
			attach,
			connection: connect === true ? {} : connect,
			connectionTarget: hints.connectionTarget
		});
		else {
			elements = modeling.createElements(elements, position, target, assign({}, hints, { attach }));
			shape = find(elements, function(element) {
				return !isConnection(element);
			});
		}
		assign(context, {
			elements,
			shape
		});
		assign(event, {
			elements,
			shape
		});
	});
	function cancel() {
		var context = dragging.context();
		if (context && context.prefix === PREFIX) dragging.cancel();
	}
	eventBus.on("create.init", function() {
		eventBus.on("elements.changed", cancel);
		eventBus.once(["create.cancel", "create.end"], HIGH_PRIORITY, function() {
			eventBus.off("elements.changed", cancel);
		});
	});
	/**
	* @param event
	* @param elements
	* @param {any} [context={}]
	*/
	this.start = function(event, elements, context) {
		if (!isArray(elements)) elements = [elements];
		var shape = find(elements, function(element) {
			return !isConnection(element);
		});
		if (!shape) return;
		context = assign({
			elements,
			hints: {},
			shape
		}, context || {});
		forEach(elements, function(element) {
			if (!isNumber(element.x)) element.x = 0;
			if (!isNumber(element.y)) element.y = 0;
		});
		var bbox = getBBox(filter(elements, function(element) {
			return !element.hidden;
		}));
		forEach(elements, function(element) {
			if (isConnection(element)) element.waypoints = map(element.waypoints, function(waypoint) {
				return {
					x: waypoint.x - bbox.x - bbox.width / 2,
					y: waypoint.y - bbox.y - bbox.height / 2
				};
			});
			assign(element, {
				x: element.x - bbox.x - bbox.width / 2,
				y: element.y - bbox.y - bbox.height / 2
			});
		});
		dragging.init(event, PREFIX, {
			cursor: "grabbing",
			autoActivate: true,
			data: {
				shape,
				elements,
				context
			}
		});
	};
}
Create.$inject = [
	"canvas",
	"dragging",
	"eventBus",
	"modeling",
	"rules"
];
function ensureConstraints(event) {
	var createConstraints = event.context.createConstraints;
	if (!createConstraints) return;
	if (createConstraints.left) event.x = Math.max(event.x, createConstraints.left);
	if (createConstraints.right) event.x = Math.min(event.x, createConstraints.right);
	if (createConstraints.top) event.y = Math.max(event.y, createConstraints.top);
	if (createConstraints.bottom) event.y = Math.min(event.y, createConstraints.bottom);
}
function isSingleShape(elements) {
	return elements && elements.length === 1 && !isConnection(elements[0]);
}
//#endregion
//#region node_modules/diagram-js/lib/features/create/CreatePreview.js
/**
* @typedef {import('../../core/Canvas').default} Canvas
* @typedef {import('../../core/EventBus').default} EventBus
* @typedef {import('../../core/GraphicsFactory').default} GraphicsFactory
* @typedef {import('../preview-support/PreviewSupport').default} PreviewSupport
* @typedef {import('../../draw/Styles').default} Styles
*/
var LOW_PRIORITY$1 = 750;
/**
* @param {Canvas} canvas
* @param {EventBus} eventBus
* @param {GraphicsFactory} graphicsFactory
* @param {PreviewSupport} previewSupport
* @param {Styles} styles
*/
function CreatePreview(canvas, eventBus, graphicsFactory, previewSupport, styles) {
	function createDragGroup(elements) {
		var dragGroup = create("g");
		attr(dragGroup, styles.cls("djs-drag-group", ["no-events"]));
		var childrenGfx = create("g");
		elements.forEach(function(element) {
			var gfx;
			if (element.hidden) return;
			if (element.waypoints) {
				gfx = graphicsFactory._createContainer("connection", childrenGfx);
				graphicsFactory.drawConnection(getVisual(gfx), element);
			} else {
				gfx = graphicsFactory._createContainer("shape", childrenGfx);
				graphicsFactory.drawShape(getVisual(gfx), element);
				translate(gfx, element.x, element.y);
			}
			previewSupport.addDragger(element, dragGroup, gfx);
		});
		return dragGroup;
	}
	eventBus.on("create.move", LOW_PRIORITY$1, function(event) {
		var hover = event.hover, context = event.context, elements = context.elements, dragGroup = context.dragGroup;
		if (!dragGroup) dragGroup = context.dragGroup = createDragGroup(elements);
		var activeLayer;
		if (hover) {
			if (!dragGroup.parentNode) {
				activeLayer = canvas.getActiveLayer();
				append(activeLayer, dragGroup);
			}
			translate(dragGroup, event.x, event.y);
		} else remove(dragGroup);
	});
	eventBus.on("create.cleanup", function(event) {
		var dragGroup = event.context.dragGroup;
		if (dragGroup) remove(dragGroup);
	});
}
CreatePreview.$inject = [
	"canvas",
	"eventBus",
	"graphicsFactory",
	"previewSupport",
	"styles"
];
//#endregion
//#region node_modules/diagram-js/lib/features/create/index.js
/**
* @type { import('didi').ModuleDeclaration }
*/
var create_default = {
	__depends__: [
		dragging_default,
		preview_support_default,
		rules_default,
		selection_default
	],
	__init__: ["create", "createPreview"],
	create: ["type", Create],
	createPreview: ["type", CreatePreview]
};
//#endregion
//#region node_modules/diagram-js/lib/features/mouse/Mouse.js
/**
* @typedef {import('../../core/EventBus').default} EventBus
*/
/**
* @param {EventBus} eventBus
*/
function Mouse(eventBus) {
	var self = this;
	this._lastMoveEvent = null;
	function setLastMoveEvent(mousemoveEvent) {
		self._lastMoveEvent = mousemoveEvent;
	}
	eventBus.on("canvas.init", function(context) {
		(self._svg = context.svg).addEventListener("mousemove", setLastMoveEvent);
	});
	eventBus.on("canvas.destroy", function() {
		self._lastMouseEvent = null;
		self._svg.removeEventListener("mousemove", setLastMoveEvent);
	});
}
Mouse.$inject = ["eventBus"];
Mouse.prototype.getLastMoveEvent = function() {
	return this._lastMoveEvent || createMoveEvent(0, 0);
};
function createMoveEvent(x, y) {
	var event = document.createEvent("MouseEvent");
	var screenX = x, screenY = y, clientX = x, clientY = y;
	if (event.initMouseEvent) event.initMouseEvent("mousemove", true, true, window, 0, screenX, screenY, clientX, clientY, false, false, false, false, 0, null);
	return event;
}
//#endregion
//#region node_modules/diagram-js/lib/features/mouse/index.js
/**
* @type { import('didi').ModuleDeclaration }
*/
var mouse_default = {
	__init__: ["mouse"],
	mouse: ["type", Mouse]
};
//#endregion
//#region node_modules/diagram-js/lib/features/copy-paste/CopyPaste.js
/**
* @typedef {import('../../core/Types').ElementLike} Element
* @typedef {import('../../core/Types').ShapeLike} Shape
*
* @typedef {import('../../util/Types').Point} Point
*
* @typedef {import('../../core/Canvas').default} Canvas
* @typedef {import('../clipboard/Clipboard').default} Clipboard
* @typedef {import('../create/Create').default} Create
* @typedef {import('../../core/ElementFactory').default} ElementFactory
* @typedef {import('../../core/EventBus').default} EventBus
* @typedef {import('../modeling/Modeling').default} Modeling
* @typedef {import('../mouse/Mouse').default} Mouse
* @typedef {import('../rules/Rules').default} Rules
*/
/**
* @typedef { (event: { elements: Element[] }) => Element[]|boolean } CopyPasteCanCopyElementsListener
*/
/**
* @typedef { (event: { descriptor: any, element: Element, elements: Element[] }) => void } CopyPasteCopyElementListener
*/
/**
* @typedef { (event: { element: Element, children: Element[] }) => void } CopyPasteCreateTreeListener
*/
/**
* @typedef { (event: { elements: any, tree: any }) => void } CopyPasteElementsCopiedListener
*/
/**
* @typedef { (event: { cache: any, descriptor: any }) => void } CopyPastePasteElementListener
*/
/**
* @typedef { (event: { hints: any }) => void } CopyPastePasteElementsListener
*/
/**
* Copy and paste elements.
*
* @param {Canvas} canvas
* @param {Create} create
* @param {Clipboard} clipboard
* @param {ElementFactory} elementFactory
* @param {EventBus} eventBus
* @param {Modeling} modeling
* @param {Mouse} mouse
* @param {Rules} rules
*/
function CopyPaste(canvas, create, clipboard, elementFactory, eventBus, modeling, mouse, rules) {
	this._canvas = canvas;
	this._create = create;
	this._clipboard = clipboard;
	this._elementFactory = elementFactory;
	this._eventBus = eventBus;
	this._modeling = modeling;
	this._mouse = mouse;
	this._rules = rules;
	eventBus.on("copyPaste.copyElement", function(context) {
		var descriptor = context.descriptor, element = context.element, elements = context.elements;
		descriptor.priority = 1;
		descriptor.id = element.id;
		if (find(elements, function(e) {
			return e === element.parent;
		})) descriptor.parent = element.parent.id;
		if (isAttacher(element)) {
			descriptor.priority = 2;
			descriptor.host = element.host.id;
		}
		if (isConnection(element)) {
			descriptor.priority = 3;
			descriptor.source = element.source.id;
			descriptor.target = element.target.id;
			descriptor.waypoints = copyWaypoints(element);
		}
		if (isLabel(element)) {
			descriptor.priority = 4;
			descriptor.labelTarget = element.labelTarget.id;
		}
		forEach([
			"x",
			"y",
			"width",
			"height"
		], function(property) {
			if (isNumber(element[property])) descriptor[property] = element[property];
		});
		descriptor.hidden = element.hidden;
		descriptor.collapsed = element.collapsed;
	});
	eventBus.on("copyPaste.pasteElements", function(context) {
		var hints = context.hints;
		assign(hints, { createElementsBehavior: false });
	});
}
CopyPaste.$inject = [
	"canvas",
	"create",
	"clipboard",
	"elementFactory",
	"eventBus",
	"modeling",
	"mouse",
	"rules"
];
/**
* Copy elements.
*
* @param {Element[]} elements
*
* @return {Object}
*/
CopyPaste.prototype.copy = function(elements) {
	var allowed, tree;
	if (!isArray(elements)) elements = elements ? [elements] : [];
	allowed = this._eventBus.fire("copyPaste.canCopyElements", { elements });
	if (allowed === false) tree = {};
	else tree = this.createTree(isArray(allowed) ? allowed : elements);
	this._clipboard.set(tree);
	this._eventBus.fire("copyPaste.elementsCopied", {
		elements,
		tree
	});
	return tree;
};
/**
* Paste elements.
*
* @param {Object} [context]
* @param {Shape} [context.element] The optional parent.
* @param {Point} [context.point] The optional position.
* @param {Object} [context.hints] The optional hints.
*/
CopyPaste.prototype.paste = function(context) {
	var tree = this._clipboard.get();
	if (this._clipboard.isEmpty()) return;
	var hints = context && context.hints || {};
	this._eventBus.fire("copyPaste.pasteElements", { hints });
	var elements = this._createElements(tree);
	if (context && context.element && context.point) return this._paste(elements, context.element, context.point, hints);
	this._create.start(this._mouse.getLastMoveEvent(), elements, { hints: hints || {} });
};
/**
* Paste elements directly.
*
* @param {Element[]} elements
* @param {Shape} target
* @param {Point} position
* @param {Object} [hints]
*/
CopyPaste.prototype._paste = function(elements, target, position, hints) {
	forEach(elements, function(element) {
		if (!isNumber(element.x)) element.x = 0;
		if (!isNumber(element.y)) element.y = 0;
	});
	var bbox = getBBox(elements);
	forEach(elements, function(element) {
		if (isConnection(element)) element.waypoints = map(element.waypoints, function(waypoint) {
			return {
				x: waypoint.x - bbox.x - bbox.width / 2,
				y: waypoint.y - bbox.y - bbox.height / 2
			};
		});
		assign(element, {
			x: element.x - bbox.x - bbox.width / 2,
			y: element.y - bbox.y - bbox.height / 2
		});
	});
	return this._modeling.createElements(elements, position, target, assign({}, hints));
};
/**
* Create elements from tree.
*/
CopyPaste.prototype._createElements = function(tree) {
	var self = this;
	var eventBus = this._eventBus;
	var cache = {};
	var elements = [];
	forEach(tree, function(branch, depth) {
		depth = parseInt(depth, 10);
		branch = sortBy(branch, "priority");
		forEach(branch, function(descriptor) {
			var attrs = assign({}, omit(descriptor, ["priority"]));
			if (cache[descriptor.parent]) attrs.parent = cache[descriptor.parent];
			else delete attrs.parent;
			eventBus.fire("copyPaste.pasteElement", {
				cache,
				descriptor: attrs
			});
			var element;
			if (isConnection(attrs)) {
				attrs.source = cache[descriptor.source];
				attrs.target = cache[descriptor.target];
				element = cache[descriptor.id] = self.createConnection(attrs);
				elements.push(element);
				return;
			}
			if (isLabel(attrs)) {
				attrs.labelTarget = cache[attrs.labelTarget];
				element = cache[descriptor.id] = self.createLabel(attrs);
				elements.push(element);
				return;
			}
			if (attrs.host) attrs.host = cache[attrs.host];
			element = cache[descriptor.id] = self.createShape(attrs);
			elements.push(element);
		});
	});
	return elements;
};
CopyPaste.prototype.createConnection = function(attrs) {
	return this._elementFactory.createConnection(omit(attrs, ["id"]));
};
CopyPaste.prototype.createLabel = function(attrs) {
	return this._elementFactory.createLabel(omit(attrs, ["id"]));
};
CopyPaste.prototype.createShape = function(attrs) {
	return this._elementFactory.createShape(omit(attrs, ["id"]));
};
/**
* Check wether element has relations to other elements e.g. attachers, labels and connections.
*
* @param {Object} element
* @param {Element[]} elements
*
* @return {boolean}
*/
CopyPaste.prototype.hasRelations = function(element, elements) {
	var labelTarget, source, target;
	if (isConnection(element)) {
		source = find(elements, matchPattern({ id: element.source.id }));
		target = find(elements, matchPattern({ id: element.target.id }));
		if (!source || !target) return false;
	}
	if (isLabel(element)) {
		labelTarget = find(elements, matchPattern({ id: element.labelTarget.id }));
		if (!labelTarget) return false;
	}
	return true;
};
/**
* Create a tree-like structure from elements.
*
* @example
*
* ```javascript
* tree: {
*  0: [
*    { id: 'Shape_1', priority: 1, ... },
*    { id: 'Shape_2', priority: 1, ... },
*    { id: 'Connection_1', source: 'Shape_1', target: 'Shape_2', priority: 3, ... },
*    ...
*  ],
*  1: [
*    { id: 'Shape_3', parent: 'Shape1', priority: 1, ... },
*    ...
*  ]
* };
* ```
*
* @param {Element[]} elements
*
* @return {Object}
*/
CopyPaste.prototype.createTree = function(elements) {
	var rules = this._rules, self = this;
	var tree = {}, elementsData = [];
	var parents = getParents(elements);
	function canCopy(element, elements) {
		return rules.allowed("element.copy", {
			element,
			elements
		});
	}
	function addElementData(element, depth) {
		var foundElementData = find(elementsData, function(elementsData) {
			return element === elementsData.element;
		});
		if (!foundElementData) {
			elementsData.push({
				element,
				depth
			});
			return;
		}
		if (foundElementData.depth < depth) {
			elementsData = removeElementData(foundElementData, elementsData);
			elementsData.push({
				element: foundElementData.element,
				depth
			});
		}
	}
	function removeElementData(elementData, elementsData) {
		var index = elementsData.indexOf(elementData);
		if (index !== -1) elementsData.splice(index, 1);
		return elementsData;
	}
	eachElement(parents, function(element, _index, depth) {
		if (isLabel(element)) return;
		forEach(element.labels, function(label) {
			addElementData(label, depth);
		});
		function addRelatedElements(elements) {
			elements && elements.length && forEach(elements, function(element) {
				forEach(element.labels, function(label) {
					addElementData(label, depth);
				});
				addElementData(element, depth);
			});
		}
		forEach([
			element.attachers,
			element.incoming,
			element.outgoing
		], addRelatedElements);
		addElementData(element, depth);
		var children = [];
		if (element.children) children = element.children.slice();
		self._eventBus.fire("copyPaste.createTree", {
			element,
			children
		});
		return children;
	});
	elements = map(elementsData, function(elementData) {
		return elementData.element;
	});
	elementsData = map(elementsData, function(elementData) {
		elementData.descriptor = {};
		self._eventBus.fire("copyPaste.copyElement", {
			descriptor: elementData.descriptor,
			element: elementData.element,
			elements
		});
		return elementData;
	});
	elementsData = sortBy(elementsData, function(elementData) {
		return elementData.descriptor.priority;
	});
	elements = map(elementsData, function(elementData) {
		return elementData.element;
	});
	forEach(elementsData, function(elementData) {
		var depth = elementData.depth;
		if (!self.hasRelations(elementData.element, elements)) {
			removeElement(elementData.element, elements);
			return;
		}
		if (!canCopy(elementData.element, elements)) {
			removeElement(elementData.element, elements);
			return;
		}
		if (!tree[depth]) tree[depth] = [];
		tree[depth].push(elementData.descriptor);
	});
	return tree;
};
function isAttacher(element) {
	return !!element.host;
}
function copyWaypoints(element) {
	return map(element.waypoints, function(waypoint) {
		waypoint = copyWaypoint(waypoint);
		if (waypoint.original) waypoint.original = copyWaypoint(waypoint.original);
		return waypoint;
	});
}
function copyWaypoint(waypoint) {
	return assign({}, waypoint);
}
function removeElement(element, elements) {
	var index = elements.indexOf(element);
	if (index === -1) return elements;
	return elements.splice(index, 1);
}
//#endregion
//#region node_modules/diagram-js/lib/features/copy-paste/index.js
/**
* @type { import('didi').ModuleDeclaration }
*/
var copy_paste_default$1 = {
	__depends__: [
		clipboard_default,
		create_default,
		mouse_default,
		rules_default
	],
	__init__: ["copyPaste"],
	copyPaste: ["type", CopyPaste]
};
//#endregion
//#region node_modules/bpmn-js/lib/features/copy-paste/BpmnCopyPaste.js
/**
* @typedef {import('../modeling/BpmnFactory').default} BpmnFactory
* @typedef {import('diagram-js/lib/core/EventBus').default} EventBus
* @typedef {import('./ModdleCopy').default} ModdleCopy
*/
function copyProperties(source, target, properties) {
	if (!isArray(properties)) properties = [properties];
	forEach(properties, function(property) {
		if (!isUndefined(source[property])) target[property] = source[property];
	});
}
var LOW_PRIORITY = 750;
/**
* BPMN-specific copy & paste.
*
* @param {BpmnFactory} bpmnFactory
* @param {EventBus} eventBus
* @param {ModdleCopy} moddleCopy
*/
function BpmnCopyPaste(bpmnFactory, eventBus, moddleCopy) {
	function copy(bo, clone) {
		var targetBo = bpmnFactory.create(bo.$type);
		return moddleCopy.copyElement(bo, targetBo, null, clone);
	}
	eventBus.on("copyPaste.copyElement", LOW_PRIORITY, function(context) {
		var descriptor = context.descriptor, element = context.element, businessObject = getBusinessObject(element);
		if (isLabel(element)) return descriptor;
		var businessObjectCopy = descriptor.businessObject = copy(businessObject, true);
		var diCopy = descriptor.di = copy(getDi(element), true);
		diCopy.bpmnElement = businessObjectCopy;
		copyProperties(businessObjectCopy, descriptor, "name");
		copyProperties(diCopy, descriptor, "isExpanded");
		if (businessObject.default) descriptor.default = businessObject.default.id;
	});
	var referencesKey = "-bpmn-js-refs";
	function getReferences(cache) {
		return cache[referencesKey] = cache[referencesKey] || {};
	}
	function setReferences(cache, references) {
		cache[referencesKey] = references;
	}
	function resolveReferences(descriptor, cache, references) {
		var businessObject = getBusinessObject(descriptor);
		if (descriptor.default) references[descriptor.default] = {
			element: businessObject,
			property: "default"
		};
		if (descriptor.host) getBusinessObject(descriptor).attachedToRef = getBusinessObject(cache[descriptor.host]);
		return omit(references, reduce(references, function(array, reference, key) {
			var element = reference.element, property = reference.property;
			if (key === descriptor.id) {
				element.set(property, businessObject);
				array.push(descriptor.id);
			}
			return array;
		}, []));
	}
	eventBus.on("copyPaste.pasteElement", function(context) {
		var cache = context.cache, descriptor = context.descriptor, businessObject = descriptor.businessObject, di = descriptor.di;
		if (isLabel(descriptor)) {
			descriptor.businessObject = getBusinessObject(cache[descriptor.labelTarget]);
			descriptor.di = getDi(cache[descriptor.labelTarget]);
			return;
		}
		businessObject = descriptor.businessObject = copy(businessObject);
		di = descriptor.di = copy(di);
		di.bpmnElement = businessObject;
		copyProperties(descriptor, businessObject, ["isExpanded", "name"]);
		descriptor.type = businessObject.$type;
	});
	eventBus.on("copyPaste.copyElement", LOW_PRIORITY, function(context) {
		var descriptor = context.descriptor, element = context.element;
		if (!is$1(element, "bpmn:Participant")) return;
		var participantBo = getBusinessObject(element);
		if (participantBo.processRef) descriptor.processRef = copy(participantBo.processRef, true);
	});
	eventBus.on("copyPaste.pasteElement", function(context) {
		var descriptor = context.descriptor, processRef = descriptor.processRef;
		if (processRef) descriptor.processRef = copy(processRef);
	});
	eventBus.on("copyPaste.pasteElement", LOW_PRIORITY, function(context) {
		var cache = context.cache, descriptor = context.descriptor;
		setReferences(cache, resolveReferences(descriptor, cache, getReferences(cache)));
	});
}
BpmnCopyPaste.$inject = [
	"bpmnFactory",
	"eventBus",
	"moddleCopy"
];
//#endregion
//#region node_modules/bpmn-js/lib/features/copy-paste/ModdleCopy.js
var DISALLOWED_PROPERTIES = [
	"artifacts",
	"dataInputAssociations",
	"dataOutputAssociations",
	"default",
	"flowElements",
	"lanes",
	"incoming",
	"outgoing",
	"categoryValue"
];
/**
* @typedef {import('diagram-js/lib/core/EventBus').default} EventBus
* @typedef {import('../modeling/BpmnFactory').default} BpmnFactory
* @typedef {import('../../model/Types').Moddle} Moddle
*
* @typedef {import('../../model/Types').ModdleElement} ModdleElement
*/
/**
* Utility for copying model properties from source element to target element.
*
* @param {EventBus} eventBus
* @param {BpmnFactory} bpmnFactory
* @param {Moddle} moddle
*/
function ModdleCopy(eventBus, bpmnFactory, moddle) {
	this._bpmnFactory = bpmnFactory;
	this._eventBus = eventBus;
	this._moddle = moddle;
	eventBus.on("moddleCopy.canCopyProperties", function(context) {
		var propertyNames = context.propertyNames;
		if (!propertyNames || !propertyNames.length) return;
		return sortBy(propertyNames, function(propertyName) {
			return propertyName === "extensionElements";
		});
	});
	eventBus.on("moddleCopy.canCopyProperty", function(context) {
		var parent = context.parent, parentDescriptor = isObject(parent) && parent.$descriptor, propertyName = context.propertyName;
		if (propertyName && DISALLOWED_PROPERTIES.indexOf(propertyName) !== -1) return false;
		if (propertyName && parentDescriptor && !find(parentDescriptor.properties, matchPattern({ name: propertyName }))) return false;
	});
	eventBus.on("moddleCopy.canSetCopiedProperty", function(context) {
		var property = context.property;
		if (is(property, "bpmn:ExtensionElements") && (!property.values || !property.values.length)) return false;
	});
}
ModdleCopy.$inject = [
	"eventBus",
	"bpmnFactory",
	"moddle"
];
/**
* Copy model properties of source element to target element.
*
* @param {ModdleElement} sourceElement
* @param {ModdleElement} targetElement
* @param {string[]} [propertyNames]
* @param {boolean} [clone=false]
*
* @return {ModdleElement}
*/
ModdleCopy.prototype.copyElement = function(sourceElement, targetElement, propertyNames, clone = false) {
	var self = this;
	if (propertyNames && !isArray(propertyNames)) propertyNames = [propertyNames];
	propertyNames = propertyNames || getPropertyNames(sourceElement.$descriptor);
	var canCopyProperties = this._eventBus.fire("moddleCopy.canCopyProperties", {
		propertyNames,
		sourceElement,
		targetElement,
		clone
	});
	if (canCopyProperties === false) return targetElement;
	if (isArray(canCopyProperties)) propertyNames = canCopyProperties;
	forEach(propertyNames, function(propertyName) {
		var sourceProperty;
		if (has(sourceElement, propertyName)) sourceProperty = sourceElement.get(propertyName);
		var copiedProperty = self.copyProperty(sourceProperty, targetElement, propertyName, clone);
		if (!isDefined(copiedProperty)) return;
		if (self._eventBus.fire("moddleCopy.canSetCopiedProperty", {
			parent: targetElement,
			property: copiedProperty,
			propertyName
		}) === false) return;
		targetElement.set(propertyName, copiedProperty);
	});
	return targetElement;
};
/**
* Copy model property.
*
* @param {any} property
* @param {ModdleElement} parent
* @param {string} propertyName
* @param {boolean} [clone=false]
*
* @return {any}
*/
ModdleCopy.prototype.copyProperty = function(property, parent, propertyName, clone = false) {
	var self = this;
	var copiedProperty = this._eventBus.fire("moddleCopy.canCopyProperty", {
		parent,
		property,
		propertyName,
		clone
	});
	if (copiedProperty === false) return;
	if (copiedProperty) {
		if (isObject(copiedProperty) && copiedProperty.$type && !copiedProperty.$parent) copiedProperty.$parent = parent;
		return copiedProperty;
	}
	var propertyDescriptor = this._moddle.getPropertyDescriptor(parent, propertyName);
	if (propertyDescriptor.isReference) return;
	if (propertyDescriptor.isId) return property && this._copyId(property, parent, clone);
	if (isArray(property)) return reduce(property, function(childProperties, childProperty) {
		copiedProperty = self.copyProperty(childProperty, parent, propertyName, clone);
		if (copiedProperty) return childProperties.concat(copiedProperty);
		return childProperties;
	}, []);
	if (isObject(property) && property.$type) {
		if (this._moddle.getElementDescriptor(property).isGeneric) return;
		copiedProperty = self._bpmnFactory.create(property.$type);
		copiedProperty.$parent = parent;
		copiedProperty = self.copyElement(property, copiedProperty, null, clone);
		return copiedProperty;
	}
	return property;
};
ModdleCopy.prototype._copyId = function(id, element, clone = false) {
	if (clone) return id;
	if (this._moddle.ids.assigned(id)) return;
	else {
		this._moddle.ids.claim(id, element);
		return id;
	}
};
function getPropertyNames(descriptor, keepDefaultProperties) {
	return reduce(descriptor.properties, function(properties, property) {
		if (keepDefaultProperties && property.default) return properties;
		return properties.concat(property.name);
	}, []);
}
function is(element, type) {
	return element && isFunction(element.$instanceOf) && element.$instanceOf(type);
}
//#endregion
//#region node_modules/bpmn-js/lib/features/copy-paste/index.js
var copy_paste_default = {
	__depends__: [copy_paste_default$1],
	__init__: ["bpmnCopyPaste", "moddleCopy"],
	bpmnCopyPaste: ["type", BpmnCopyPaste],
	moddleCopy: ["type", ModdleCopy]
};
//#endregion
export { copy_paste_default as default };

//# sourceMappingURL=bpmn-js_lib_features_copy-paste.js.map