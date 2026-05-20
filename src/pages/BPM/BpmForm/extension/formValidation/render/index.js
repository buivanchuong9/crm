import { FormValidationRenderer, formValidationType } from "./formValidation";

class CustomFormFormValidationFields {
  constructor(formFields) {
    formFields.register(formValidationType, FormValidationRenderer);
  }
}

export default {
  __init__: ["formValidationField"],
  formValidationField: ["type", CustomFormFormValidationFields],
};
