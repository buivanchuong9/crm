import classNames from "classnames";
import IconTreeSelect from "./tree-shape.svg?raw";
//import './style.css';
import "rc-tree-select/assets/index.less";

import * as RcTreeSelectModule from "rc-tree-select";

const TreeSelect = RcTreeSelectModule && RcTreeSelectModule.default ? RcTreeSelectModule.default : RcTreeSelectModule;

import { Errors, FormContext, Description, Label, Textfield } from "@bpmn-io/form-js";

import { html, useContext } from "diagram-js/lib/ui";

export const treeSelectorType = "treeSelector";

export function TreeSelectorRenderer(props) {
  const { disabled, errors = [], field, readonly, value, onChange } = props;
  const { formId } = useContext(FormContext);

  const { id, label, description, treeOptions = {} } = field || {};

  const {
    placeholder = "Chọn mục...",
    treeData = [
      {
        title: "Fruits",
        key: "fruits",
        children: [
          { title: "Apple", key: "apple" },
          { title: "Banana", key: "banana" },
          { title: "Orange", key: "orange" },
        ],
      },
      {
        title: "Vegetables",
        key: "vegetables",
        children: [
          { title: "Carrot", key: "carrot" },
          { title: "Broccoli", key: "broccoli" },
          { title: "Spinach", key: "spinach" },
        ],
      },
      {
        title: "Meat",
        key: "meat",
        children: [
          { title: "Beef", key: "beef" },
          { title: "Chicken", key: "chicken" },
          { title: "Pork", key: "pork" },
        ],
      },
    ],
    allowClear = true,
  } = treeOptions || {};

  const handleChange = (newValue) => {
    onChange({
      field,
      value: newValue,
    });
  };

  return html`
    <div class=${formFieldClasses(treeSelectorType, { errors, disabled, readonly })}>
      <${Label} id=${prefixId(id, formId)} label=${label} />
      <div class="tree-selector-wrapper">
      ${""}
        ${typeof TreeSelect === "function"
          ? html` <${TreeSelect}
            style=${{ width: "100%" }}
            value=${value}
            treeData=${treeData}
            placeholder=${placeholder}
            allowClear=${allowClear}
            treeDefaultExpandAll=${true}
            disabled=${disabled || readonly}
            onChange=${handleChange}
            dropdownMatchSelectWidth=${false}
          />`
          : html`<select
            style=${{ width: "100%" }}
            value=${value || ""}
            onChange=${(e) => handleChange(e.target.value)}
            disabled=${disabled || readonly}
          >
            <option value="">-- Chọn mục --</option>
            ${Array.isArray(treeData)
              ? treeData.map(
                (node) => html`
                  <optgroup label=${node.title}>
                    ${Array.isArray(node.children) ? node.children.map((child) => html` <option value=${child.key}>${child.title}</option>`) : ""}
                  </optgroup>
                `
              )
              : ""}
          </select> `}
      </div>
      <${Description} description=${description} />
      <${Errors} errors=${errors} id=${prefixId(id, formId) + "-error-message"} />
    </div>
  `;
}

TreeSelectorRenderer.config = {
  ...Textfield.config,
  type: treeSelectorType,
  label: "Tree Selector",
  name: "Tree Selector",
  iconUrl: `data:image/svg+xml,${encodeURIComponent(IconTreeSelect)}`,
  propertiesPanelEntries: ["key", "label", "description", "disabled", "readonly"],
};

function formFieldClasses(type, { errors = [], disabled = false, readonly = false } = {}) {
  return classNames("fjs-form-field", `fjs-form-field-${type}`, {
    "fjs-has-errors": errors.length > 0,
    "fjs-disabled": disabled,
    "fjs-readonly": readonly,
  });
}

function prefixId(id, formId) {
  return formId ? `fjs-form-${formId}-${id}` : `fjs-form-${id}`;
}