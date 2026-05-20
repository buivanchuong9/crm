// extension/range/propertiesPanel/CustomPropertiesProvider.js
import { get } from "min-dash";
import { h } from "preact"; // create VNode, properties-panel can render this
import { useState, useEffect } from "preact/hooks";

/**
 * Provider class (export default so DI can instantiate it)
 */
export default function CustomPropertiesProvider(propertiesPanel) {
  this.propertiesPanel = propertiesPanel;

  // register provider with a priority (500)
  propertiesPanel.registerProvider(this, 500);
}

CustomPropertiesProvider.$inject = ["propertiesPanel"];

/**
 * getGroups - middleware that modifies groups array
 */
CustomPropertiesProvider.prototype.getGroups = function (field, editField) {
  return (groups) => {
    // only care about our custom field type
    if (!field || field.type !== "range") {
      return groups;
    }

    // find or create validation group
    let validationIdx = findGroupIdx(groups, "validation");

    if (validationIdx === -1) {
      groups.push({ id: "validation", label: "Validation", entries: [] });
      validationIdx = findGroupIdx(groups, "validation");
    }

    const validationGroup = groups[validationIdx];

    // remove possible conflicting default entries (min/max)
    validationGroup.entries = validationGroup.entries.filter((e) => !["min", "max", "range-min", "range-max", "range-step"].includes(e.id));

    // append our custom entries (using simple preact components)
    validationGroup.entries.push(
      createCustomEntry(field, editField, "range-min", "min", "Minimum"),
      createCustomEntry(field, editField, "range-max", "max", "Maximum"),
      createCustomEntry(field, editField, "range-step", "step", "Step")
    );

    return groups;
  };
};

/**
 * Helper to create an entry descriptor that uses a small custom component
 * component uses preact h() to create VNode and does not rely on PropertiesPanelContext/hooks
 */
function createCustomEntry(field, editField, id, key, label) {
  // Inline Preact functional component — no hooks, no context
  const SimpleTextEntry = (props) => {
    const { setValue } = props;
    const [inputValue, setInputValue] = useState();

    const currentValue = get(field, [key]);

    useEffect(() => {
      setInputValue(currentValue);
    }, [currentValue]);

    return h("div", { className: "bio-properties-panel-entry", "data-entry-id": id }, [
      h("label", { className: "bio-properties-panel-label", htmlFor: id }, label),
      h("input", {
        id,
        type: "number",
        className: "bio-properties-panel-input",
        value: inputValue,
        onInput: (evt) => setInputValue(evt.target.value),
        onBlur: (evt) => setValue(evt.target.value === "" ? undefined : evt.target.value),
      }),
    ]);
  };

  // Return entry descriptor for properties panel
  return {
    id,
    component: SimpleTextEntry,
    getValue: () => get(field, key),
    setValue: (val) => {
      editField(field, [key], val === "" ? undefined : val);
    },
    element: field,
    path: [key],
    label,
  };
}

/* helper */
function findGroupIdx(groups, id) {
  return groups.findIndex((g) => g.id === id);
}
