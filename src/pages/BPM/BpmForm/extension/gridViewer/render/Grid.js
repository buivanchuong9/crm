import classNames from "classnames";
import IconGrid from "./icon-grid.svg?raw";
import React from "react";
import ReactDOM from "react-dom";

/*
 * Import components and utilities from our extension API. Warning: for demo experiments only.
 */
import { FormContext, Textfield } from "@bpmn-io/form-js";

import { html, useContext } from "diagram-js/lib/ui";

import "./styles.css";
import GridAg from "pages/BPM/GridAg";

export const gridType = "grid";

let dataConfig = {
  // Phải khai báo bên ngoài hàm để giữ trạng thái, nếu khai báo bên trong thì sẽ bị reload liên tục
  // headerTable: JSON.stringify([]),
  // dataRow: JSON.stringify([]),
};
let configField = {};

export function GridRenderer(props) {
  const { disabled, errors = [], field, readonly, value } = props;
  const { description, id, label } = field;
  const { formId } = useContext(FormContext);

  const errorMessageId = errors.length === 0 ? undefined : `${prefixId(id, formId)}-error-message`;

  // Tạo 1 div placeholder
  const containerId = `gridag-container-${id}`;
  if (!dataConfig[id]) {
    dataConfig[id] = {};
  }

  dataConfig[id].headerTable = props?.field?.headerTable ? props?.field?.headerTable : JSON.stringify([]);
  if (!value || value === "undefined" || value === "") {
    dataConfig[id].dataRow = props?.field?.dataRow ? props?.field?.dataRow : JSON.stringify([]);
  } else {
    try {
      let _dataConfig = JSON.parse(value) ? JSON.parse(value) : {};
      // dataConfig[id].headerTable = _dataConfig.headerTable ? _dataConfig.headerTable : JSON.stringify([]);
      dataConfig[id].dataRow = _dataConfig.dataRow ? _dataConfig.dataRow : JSON.stringify([]);
    } catch (e) {
      console.error("Invalid JSON in grid value", e);
    }
  }

  // Khi GridAg thay đổi
  function handleGridChange(newValue) {
    props.onChange({
      field, // object field từ props
      value: JSON.stringify(newValue),
    });
  }

  // Khi GridAg thay đổi
  function handleOnAction(action) {
    console.log("GridAg Action:", field.label, action);
  }

  setTimeout(() => {
    const container = document.getElementById(containerId);
    console.log("Render GridAg", { container, props, field, dataConfig, value });
    console.log("dataConfig[id]:", field.label, ">>", dataConfig[id]);
    if (container && props.onChange && field) {
      // Điều kiện container và props.onChange và field quan trọng
      configField[id] = field;

      ReactDOM.render(
        <GridAg
          location={"configViewer"}
          onChange={(e) => {
            handleGridChange(e);
          }}
          onAction={(action) => {
            handleOnAction(action);
          }}
          dataConfig={dataConfig[id]}
          configField={configField[id]}
        />,
        container
      );

      // cleanup khi unmount
      container.__cleanup = () => {
        ReactDOM.unmountComponentAtNode(container);
      };
    }
  });

  return html`
    <div class=${formFieldClasses("grid", { errors, disabled, readonly })}>
      <label id=${prefixId(id, formId)}>${label || ""}</label>
      <div id=${containerId}></div>
      ${description ? html`<div class="description">${description}</div>` : null}
      ${errors.length > 0 ? html`<div class="errors" id=${errorMessageId}>${errors.join(", ")}</div>` : null}
    </div>
  `;
}

// ⚡ gắn config (chỉ meta, không setValue/getValue ở đây)
GridRenderer.config = {
  ...Textfield.config,
  type: gridType,
  label: "Grid",
  name: "Grid",
  iconUrl: `data:image/svg+xml,${encodeURIComponent(IconGrid)}`,
  propertiesPanelEntries: ["key", "label", "description", "disabled", "readonly", "headerTable"],
};

// helper //////////////////////

function formFieldClasses(type, { errors = [], disabled = false, readonly = false } = {}) {
  if (!type) {
    throw new Error("type required");
  }

  return classNames("fjs-form-field", `fjs-form-field-${type}`, {
    "fjs-has-errors": errors.length > 0,
    "fjs-disabled": disabled,
    "fjs-readonly": readonly,
  });
}

function prefixId(id, formId) {
  if (formId) {
    return `fjs-form-${formId}-${id}`;
  }

  return `fjs-form-${id}`;
}
