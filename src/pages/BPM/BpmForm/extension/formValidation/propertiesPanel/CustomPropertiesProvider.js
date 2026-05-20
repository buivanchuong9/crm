export class CustomPropertiesProvider {
  constructor(propertiesPanel) {
    propertiesPanel.registerProvider(this, 500);
  }

  getGroups(field, editField) {
    return (groups) => {
      const generalIdx = findGroupIdx(groups, "general");

      if (generalIdx === -1) {
        return groups;
      }

      const generalGroup = groups[generalIdx];

      if (!generalGroup.entries) {
        generalGroup.entries = [];
      }

      // Xử lý cho timepicker
      if (field.type === "timepicker") {
        generalGroup.entries.push({
          id: "format",
          label: "Time Format",
          component: "Textfield",
          getValue: () => field.format || "HH:mm:ss",
          setValue: (value) => editField(field, "format", value),
        });

        generalGroup.entries.push({
          id: "collectErrors",
          label: "Collect Form Errors",
          component: "Checkbox",
          getValue: () => field.collectErrors || false,
          setValue: (value) => editField(field, "collectErrors", value),
        });
      }

      // Xử lý cho formErrorsDisplay
      if (field.type === "formErrorsDisplay") {
        generalGroup.entries.push({
          id: "errorDisplayMode",
          label: "Error Display Mode",
          component: "Select",
          getValue: () => field.errorDisplayMode || "list",
          setValue: (value) => editField(field, "errorDisplayMode", value),
          options: [
            { label: "List", value: "list" },
            { label: "Summary", value: "summary" },
          ],
        });

        generalGroup.entries.push({
          id: "showFieldId",
          label: "Show Field ID",
          component: "Checkbox",
          getValue: () => field.showFieldId !== false,
          setValue: (value) => editField(field, "showFieldId", value),
        });
      }

      return groups;
    };
  }
}

CustomPropertiesProvider.$inject = ["propertiesPanel"];

function findGroupIdx(groups, id) {
  return groups.findIndex((g) => g && g.id === id);
}