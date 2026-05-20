import { NumberRenderer, numberType } from './Number';

/*
 * This is the module definition of the custom field. This goes
 * into the Form instance via `additionalModules`.
 */
class CustomFormNumberFields {
  constructor(formFields) {
    formFields.register(numberType, NumberRenderer);
  }
}


export default {
  __init__: [ 'numberField' ],
  numberField: [ 'type', CustomFormNumberFields ]
};