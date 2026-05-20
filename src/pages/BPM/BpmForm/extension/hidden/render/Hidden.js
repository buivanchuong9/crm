import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import IconHidden from './icon-hidden.svg?raw';

/*
 * Import components and utilities from our extension API. Warning: for demo experiments only.
 */
import {
  Errors,
  FormContext,
  Textfield,
  Description,
  Label
} from '@bpmn-io/form-js';

import {
  html,
  useContext
} from 'diagram-js/lib/ui';

import './styles.css';
export const hiddenType = 'hidden';

/*
 * This is the rendering part of the custom field. We use `htm` to
 * to render our components without the need of extra JSX transpilation.
 */
export function HiddenRenderer(props) {
  const {
    disabled,
    errors = [],
    field,
    readonly,
    value
  } = props;

  const {
    description,    
    id,
    label
  } = field;

  const { formId } = useContext(FormContext);

  const errorMessageId = errors.length === 0 ? undefined : `${prefixId(id, formId)}-error-message`;

  const onChange = ({ target }) => {
    props.onChange({
      field,
      value: target.value
    });
  };

  return html`<div class=${formFieldClasses(hiddenType)}>
    <${Label}
      id=${prefixId(id, formId)}
      label=${label} />
    <div class="hidden-group">
      <input
        type="hidden"
        disabled=${disabled}
        id=${prefixId(id, formId)}
        onInput=${onChange}
        readonly=${readonly}
        value=${value} />
      <div class="hidden-value">${value}</div>
    </div>
    <${Description} description=${description} />
    <${Errors} errors=${errors} id=${errorMessageId} />
  </div>`;
}

/*
 * This is the configuration part of the custom field. It defines
 * the schema type, UI label and icon, palette group, properties panel entries
 * and much more.
 */
HiddenRenderer.config = {

  /* we can extend the default configuration of existing fields */
  ...Textfield.config,
  type: hiddenType,
  label: 'Hidden',
  name: 'Hidden field',
  iconUrl: `data:image/svg+xml,${encodeURIComponent(IconHidden)}`,
  propertiesPanelEntries: [
    'key',
    'label',
    'description',
    'disabled',
    'readonly'
  ]
};

// helper //////////////////////
function formFieldClasses(type, { errors = [], disabled = false, readonly = false } = {}) {
  if (!type) {
    throw new Error('type required');
  }

  return classNames('fjs-form-field', `fjs-form-field-${type}`, {
    'fjs-has-errors': errors.length > 0,
    'fjs-disabled': disabled,
    'fjs-readonly': readonly
  });
}

function prefixId(id, formId) {
  if (formId) {
    return `fjs-form-${formId}-${id}`;
  }

  return `fjs-form-${id}`;
}