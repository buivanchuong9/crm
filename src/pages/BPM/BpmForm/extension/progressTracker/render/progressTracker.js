import React from "react";
import classNames from "classnames";
import IconProgress from "./icon-progress.svg?raw";

import { Errors, FormContext, Textfield, Description, Label } from "@bpmn-io/form-js";
import { html, useContext } from "diagram-js/lib/ui";

import "./styles.css";

export const progressTrackerType = "progresstracker";

export function ProgressTrackerRenderer(props) {
  const { disabled, errors = [], field, readonly, value = [] } = props;

  const { description, id, label, steps = [], completedSteps = [] } = field || {};

  const { formId } = useContext(FormContext) || {};

  const errorMessageId = errors.length === 0 ? undefined : `${prefixId(id, formId)}-error-message`;

  const onChange = (index) => {
    if (disabled || readonly || !field) return;

    const newCompletedSteps = completedSteps.includes(index)
      ? completedSteps.filter(i => i !== index)
      : [...completedSteps, index];

    props.onChange({
      field,
      value: newCompletedSteps,
    });
  };

  const progress = steps.length > 0 ? (completedSteps.length / steps.length) * 100 : 0;

  return html`<div class=${formFieldClasses(progressTrackerType, { errors, disabled, readonly })}>
    <${Label} id=${prefixId(id, formId)} label=${label} />
    
    <div class="fjs-progress-tracker-progress-bar">
      <div class="fjs-progress-tracker-progress-bar-fill" style=${{ width: `${progress}%` }}></div>
    </div>
    
    <div class="fjs-progress-tracker-timeline">
      ${steps.map((step, index) => html`
        <div class="fjs-progress-tracker-timeline-item ${completedSteps.includes(index) ? 'completed' : ''}">
          <input
            type="checkbox"
            checked=${completedSteps.includes(index)}
            value=${index}
            disabled=${disabled}
            readonly=${readonly}
            onChange=${() => onChange(index)}
            id=${prefixId(`${id}-${index}`, formId)}
          />
          <span>${step}</span>
        </div>
      `)}
    </div>
    
    <${Description} description=${description} />
    <${Errors} errors=${errors} id=${errorMessageId} />
  </div>`;
}

ProgressTrackerRenderer.config = {
  ...Textfield.config,
  type: progressTrackerType,
  label: "Progress",
  name: "Progress",
  iconUrl: `data:image/svg+xml,${encodeURIComponent(IconProgress)}`,
  propertiesPanelEntries: ["key", "label", "description", "disabled", "readonly", "steps", "completedSteps"],
};

// helper
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