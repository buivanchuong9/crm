import { ProgressTrackerRenderer, progressTrackerType } from "./progressTracker";

class CustomFormProgressTrackerFields {
  constructor(formFields) {
    formFields.register(progressTrackerType, ProgressTrackerRenderer);
  }
}

export default {
  __init__: ["progressTrackerField"],
  progressTrackerField: ["type", CustomFormProgressTrackerFields],
};
