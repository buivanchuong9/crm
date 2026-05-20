import { CustomPropertiesProvider } from "./CustomPropertiesProvider";

export default {
  __init__: ["progressTrackerPropertiesProvider"],
  progressTrackerPropertiesProvider: ["type", CustomPropertiesProvider],
};
