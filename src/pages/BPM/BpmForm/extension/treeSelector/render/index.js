// render/index.js
import { TreeSelectorRenderer, treeSelectorType } from './TreeSelectorEditor';

/*
 * Module đăng ký custom field 'treeSelector' với hệ thống form-js.
 * Sử dụng Dependency Injection để tự động đăng ký qua additionalModules.
 */
class CustomFormFields {
  constructor(formFields) {
    formFields.register(treeSelectorType, TreeSelectorRenderer);
  }
}

export default {
  __init__: ['treeSelectorField'],
  treeSelectorField: ['type', CustomFormFields]
};
