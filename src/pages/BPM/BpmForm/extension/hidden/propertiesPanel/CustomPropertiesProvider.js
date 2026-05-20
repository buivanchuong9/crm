/*
 * This is a custom properties provider for the properties panel.
 * It adds a new group `Range` with range specific properties.
 */
export class CustomPropertiesProvider {
  constructor(propertiesPanel) {
    propertiesPanel.registerProvider(this, 500);
  }

  /**
   * Return the groups provided for the given field.
   *
   * @param {any} field
   * @param {function} editField
   *
   * @return {(Object[]) => (Object[])} groups middleware
   */
  getGroups(field, editField) {

    /**
     * We return a middleware that modifies
     * the existing groups.
     *
     * @param {Object[]} groups
     *
     * @return {Object[]} modified groups
     */
    return (groups) => {

      if (field.type !== 'hidden') {
        return groups;
      }

      const generalIdx = findGroupIdx(groups, 'general');      
      return groups;
    };
  }
}

CustomPropertiesProvider.$inject = [ 'propertiesPanel' ];

// helper //////////////////////
function findGroupIdx(groups, id) {
  return groups.findIndex(g => g.id === id);
}