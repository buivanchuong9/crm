import React from "react";
import classNames from "classnames";
import IconValidation from "./icon-formValidation.svg?raw";

import { Errors, FormContext, Textfield, Description, Label } from "@bpmn-io/form-js";
import { html, useContext } from "diagram-js/lib/ui";

import "./styles.css";

export const formValidationType = "formvalidation";
export const formErrorsDisplayType = "formErrorsDisplay";

// Component FormValidationRenderer
export function FormValidationRenderer(props) {
  const { disabled, errors = [], field, readonly, value = [] } = props;
  const { description, id, label, steps = [], completedSteps = [] } = field || {};
  const { formId } = useContext(FormContext) || {};

  const errorMessageId = errors.length === 0 ? undefined : `${prefixId(id, formId)}-error-message`;

  const onChange = (index) => {
    if (disabled || readonly || !field || !steps[index]) return;

    // Kiểm tra tính hợp lệ: chỉ cho phép hoàn thành bước nếu bước trước đó đã hoàn thành
    if (index > 0 && !completedSteps.includes(index - 1)) {
      props.onChange({
        field,
        errors: [{ message: `Vui lòng hoàn thành bước ${steps[index - 1]} trước.` }],
      });
      return;
    }

    const newCompletedSteps = completedSteps.includes(index)
      ? completedSteps.filter((i) => i !== index)
      : [...completedSteps, index].sort((a, b) => a - b);

    props.onChange({
      field,
      value: newCompletedSteps,
      errors: [], // Xóa lỗi nếu hợp lệ
    });
  };

  const validation = steps.length > 0 ? (completedSteps.length / steps.length) * 100 : 0;

  return html`<div class=${formFieldClasses(formValidationType, { errors, disabled, readonly })}>
    <${Label} id=${prefixId(id, formId)} label=${label} />
    
    <div class="fjs-validation-validation-bar">
      <div class="fjs-validation-validation-bar-fill" style=${{ width: `${validation}%` }}></div>
    </div>
    
    <div class="fjs-validation-timeline">
      ${steps.map((step, index) => html`
        <div class="fjs-validation-timeline-item ${completedSteps.includes(index) ? 'completed' : ''}">
          <input
            type="checkbox"
            checked=${completedSteps.includes(index)}
            value=${index}
            disabled=${disabled || readonly}
            onChange=${() => onChange(index)}
            id=${prefixId(`${id}-${index}`, formId)}
            aria-describedby=${errorMessageId}
          />
          <span>${step}</span>
        </div>
      `)}
    </div>
    
    <${Description} description=${description} />
    <${Errors} errors=${errors} id=${errorMessageId} />
  </div>`;
}

FormValidationRenderer.config = {
  ...Textfield.config,
  type: formValidationType,
  label: "Validation",
  name: "Validation",
  iconUrl: `data:image/svg+xml,${encodeURIComponent(IconValidation)}`,
  propertiesPanelEntries: ["key", "label", "description", "disabled", "readonly", "steps", "completedSteps"],
};

// Component FormErrorsDisplay
export function FormErrorsDisplay(props) {
  const { disabled, readonly, field } = props;
  const { id, label = 'Form Errors', description } = field || {};
  const { formId, errors: formErrors } = useContext(FormContext) || {};

  // Thu thập tất cả lỗi từ các trường trong form
  const allErrors = Object.entries(formErrors || {}).reduce((acc, [fieldId, fieldErrors]) => {
    if (fieldErrors && fieldErrors.length > 0) {
      fieldErrors.forEach((error) => {
        acc.push({
          fieldId,
          message: error.message,
        });
      });
    }
    return acc;
  }, []);

  const errorMessageId = allErrors.length > 0 ? `${prefixId(id, formId)}-error-message` : undefined;

  return html`
    <div class=${formFieldClasses(formErrorsDisplayType, { errors: allErrors, disabled, readonly })}>
      <div class="fjs-form-field-label">${label}</div>
      ${description ? html`<div class="fjs-form-field-description">${description}</div>` : null}
      ${allErrors.length > 0 ? html`
        <div class="fjs-form-errors-display-container" id=${errorMessageId}>
          <ul class="fjs-form-errors-list">
            ${allErrors.map((error, index) => html`
              <li key=${index} class="fjs-form-error-item">
                <span class="fjs-form-error-field">${error.fieldId}:</span> ${error.message}
              </li>
            `)}
          </ul>
        </div>
      ` : html`<div class="fjs-form-no-errors">Không có lỗi trong biểu mẫu.</div>`}
    </div>
  `;
}

FormErrorsDisplay.config = {
  type: formErrorsDisplayType,
  label: 'Form Errors Display',
  name: 'Form Errors Display',
  propertiesPanelEntries: ['key', 'label', 'description', 'disabled', 'readonly'],
};

// Helper functions
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