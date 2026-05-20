import React from 'react';
import classNames from 'classnames';
import IconNumber from './icon-range.svg?raw';

/*
 * Import components and utilities from our extension API. Warning: for demo experiments only.
 */
import {
  Errors,
  FormContext,
  Numberfield,
  Description,
  Label
} from '@bpmn-io/form-js';

import {
  html,
  useContext
} from 'diagram-js/lib/ui';

import './styles.css';

export const numberType = 'Number';

/*
 * This is the rendering part of the custom field. We use `htm` to
 * to render our components without the need of extra JSX transpilation.
 */
export function NumberRenderer(props) {
  const {
    disabled,
    errors = [],
    field,
    readonly,
    value: rawValue
  } = props;

  const {
    description,
    Number = {},
    id,
    label
  } = field;

  const {
    min,
    max
  } = Number;

  const { formId } = useContext(FormContext);

  const errorMessageId = errors.length === 0 ? undefined : `${prefixId(id, formId)}-error-message`;

  // Hàm định dạng giá trị hiển thị
  const formatValue = (rawValue) => {

    // Kiểm tra nếu rawValue là số, chuyển thành chuỗi
    const stringValue = typeof rawValue === 'number' && window.Number.isFinite(rawValue) ? rawValue.toString() : rawValue;

    if (!stringValue) return '';

    // Tách phần nguyên và phần thập phân
    const [integerPartRaw, decimalPartRaw] = stringValue.split('.');

    // Loại bỏ tất cả ký tự không phải số ở phần nguyên
    const cleanInteger = integerPartRaw.replace(/\D/g, '');

    // Format phần nguyên với dấu phẩy
    const formattedInteger = cleanInteger.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    let formattedValue = formattedInteger;

    // Xử lý phần thập phân nếu có
    if (decimalPartRaw !== undefined) {
      const cleanDecimal = decimalPartRaw.replace(/\D/g, '');
      if (cleanDecimal) {
        formattedValue += '.' + cleanDecimal;
      }
    }

    if (!decimalPartRaw && rawValue.endsWith('.')) {
      formattedValue = formattedValue + '.';
    }

    return formattedValue;
  };

  // Hàm chuyển đổi giá trị hiển thị về giá trị gốc
  const parseRawValue = (displayValue) => {
    // Kiểm tra nếu displayValue là số, chuyển thành chuỗi
    const stringValue = typeof displayValue === 'number' && window.Number.isFinite(displayValue) ? displayValue.toString() : displayValue;

    if (!stringValue) return '';

    // Loại bỏ dấu phẩy và giữ nguyên phần thập phân
    const [integerPart, decimalPart] = stringValue.split('.');
    const cleanInteger = integerPart.replace(/,/g, '');
    let rawValue = cleanInteger;

    if (decimalPart !== undefined && decimalPart !== '') {
      rawValue += '.' + decimalPart.replace(/\D/g, '');
    }

    return rawValue;
  };

  // Định dạng giá trị hiển thị trước khi truyền vào input
  const displayValue = rawValue && !parseRawValue(rawValue).includes(',') ? formatValue(rawValue) : rawValue;

  const onChange = ({ target }) => {
    let raw = target.value;

    // Ngăn nhiều hơn 1 dấu chấm
    if ((raw.match(/\./g) || []).length > 1) {
      return;
    }

    // Tách phần nguyên và phần thập phân
    const [integerPartRaw, decimalPartRaw] = raw.split('.');

    const cleanInteger = integerPartRaw.replace(/[^0-9]/g, '');
    const formattedInteger = cleanInteger.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    let formattedValue = formattedInteger;

    // Nếu có dấu '.' được nhập
    if (raw.includes('.')) {
      formattedValue += '.';

      // Nếu có phần thập phân, xử lý phần này
      if (typeof decimalPartRaw === 'string') {
        const cleanDecimal = decimalPartRaw.replace(/[^0-9]/g, '');
        formattedValue += cleanDecimal;
      }
    }

    props.onChange({
      field,
      value: formattedValue,
      rawValue: parseRawValue(formattedValue)
    });
  };

  // Hàm xử lý khi mất focus
  const onBlur = ({ target }) => {
    let rawValue = target.value;

    // Tách phần nguyên và phần thập phân
    const [integerPart, decimalPart] = rawValue.split('.');

    // Loại bỏ dấu phẩy ở phần nguyên
    const cleanInteger = integerPart.replace(/,/g, '');
    let finalValue = cleanInteger;

    // Xử lý phần thập phân
    if (decimalPart !== undefined && decimalPart !== '') {
      // Lọc chỉ giữ chữ số
      const cleanDecimal = decimalPart.replace(/[^0-9]/g, '');
      if (cleanDecimal) {
        finalValue += '.' + cleanDecimal;
      }
    }

    props.onChange({
      field,
      value: finalValue,
      rawValue: parseRawValue(finalValue)
    });
  };

  return html`<div class=${formFieldClasses(numberType)}>
    <${Label}
      id=${prefixId(id, formId)}
      label=${label} />
    <div class="number-group">
      <input
        type="text"
        disabled=${disabled}
        id=${prefixId(id, formId)}
        max=${max}
        min=${min}
        onInput=${onChange}
        onBlur=${onBlur}
        readonly=${readonly}
        value=${displayValue} />      
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
NumberRenderer.config = {
  /* we can extend the default configuration of existing fields */
  ...Numberfield.config,
  type: numberType,
  label: 'Number',
  iconUrl: `data:image/svg+xml,${encodeURIComponent(IconNumber)}`,
  propertiesPanelEntries: [
    'key',
    'label',
    'description',
    'min',
    'max',
    'disabled',
    'readonly'
  ],
  // Ghi đè getValue để trả về giá trị gốc khi submit
  getValue: (field, data) => {
    const displayValue = data[field.key];
    if (!displayValue) return '';

    // Chuyển đổi giá trị hiển thị về giá trị gốc
    const [integerPart, decimalPart] = displayValue.toString().split('.');
    const cleanInteger = integerPart.replace(/,/g, '');
    let rawValue = cleanInteger;

    if (decimalPart !== undefined && decimalPart !== '') {
      rawValue += '.' + decimalPart.replace(/\D/g, '');
    }

    if (rawValue) {
      return window.Number(rawValue);
    }

    return rawValue;
  }
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