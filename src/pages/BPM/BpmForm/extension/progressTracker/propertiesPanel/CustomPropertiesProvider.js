export class CustomPropertiesProvider {
  constructor(propertiesPanel) {
    propertiesPanel.registerProvider(this, 500);
  }

  getGroups(field, editField) {
    return (groups) => {
      if (!groups || !Array.isArray(groups)) {
        return [];
      }

      if (field.type !== "progresstracker") {
        return groups;
      }

      const generalIdx = findGroupIdx(groups, "general");

      if (generalIdx === -1) {
        return groups;
      }

      const generalGroup = groups[generalIdx];

      if (!generalGroup.entries) {
        generalGroup.entries = [];
      }

      generalGroup.entries.push({
        id: "steps",
        label: "Steps",
        component: "Textfield",
        getValue: () => field.steps ? field.steps.join(",") : "",
        setValue: (value) => {
          const steps = value.split(",").map(s => s.trim()).filter(s => s);
          if (steps.length === 0) {
            console.warn("Steps cannot be empty");
            return;
          }
          editField(field, "steps", steps);
        },
      });

      generalGroup.entries.push({
        id: "completedSteps",
        label: "Completed Steps (indices)",
        component: "Textfield",
        getValue: () => field.completedSteps ? field.completedSteps.join(",") : "",
        setValue: (value) => {
          const completedSteps = value.split(",")
            .map(s => parseInt(s.trim()))
            .filter(n => !isNaN(n) && n >= 0 && n < (field.steps?.length || 0));
          editField(field, "completedSteps", completedSteps);
        },
      });

      return groups;
    };
  }
}

CustomPropertiesProvider.$inject = ["propertiesPanel"];

function findGroupIdx(groups, id) {
  return groups ? groups.findIndex((g) => g && g.id === id) : -1;
}