import { HiddenRenderer, hiddenType } from './Hidden';

/*
 * This is the module definition of the custom field. This goes
 * into the Form instance via `additionalModules`.
 */
class CustomFormHiddenFields {
  constructor(formFields) {
    formFields.register(hiddenType, HiddenRenderer);
  }
}


export default {
  __init__: [ 'hiddenField' ],
  hiddenField: [ 'type', CustomFormHiddenFields ]
};