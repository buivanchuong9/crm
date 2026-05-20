import { CustomPropertiesProvider } from "./CustomPropertiesProvider";

export default {
  __init__: ["formValidationPropertiesProvider"],
  formValidationPropertiesProvider: ["type", CustomPropertiesProvider],
};
