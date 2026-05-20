import { get, set } from 'min-dash';
import { html } from 'diagram-js/lib/ui';

export class CustomPropertiesProvider {
  constructor(propertiesPanel) {
    propertiesPanel.registerProvider(this, 500);
  }

  getGroups(field, editField) {
    return (groups) => {
      if (field.type !== 'treeSelector') {
        return groups;
      }

      const generalIdx = findGroupIdx(groups, 'general');
      const insertAt = generalIdx > -1 ? generalIdx + 1 : groups.length;

      groups.splice(insertAt, 0, {
        id: 'treeSelectorOptions',
        label: 'Tree Selector Options',
        entries: TreeSelectorEntries(field, editField)
      });

      return groups;
    };
  }
}

CustomPropertiesProvider.$inject = [ 'propertiesPanel' ];

/**
 * Tạo entries cho group 'treeSelectorOptions'
 */
function TreeSelectorEntries(field, editField) {

  const onChange = (key) => {
    return (value) => {
      const treeOptions = get(field, [ 'treeOptions' ], {});
      editField(field, [ 'treeOptions' ], set({ ...treeOptions }, [ key ], value));
    };
  };

  const getValue = (key) => {
    return () => get(field, [ 'treeOptions', key ]);
  };

  return [
    {
      id: 'treeSelector-data',
      component: TreeSelectEntry,
      field,
      getValue,
      onChange,
      isEdited: (node) => !!getValue('selected')(node)
    }
  ];
}

/**
 * Component entry cho select box
 */
function TreeSelectEntry(props) {
  const {
    field,
    getValue,
    onChange,
    id
  } = props;

  const value = getValue('selected')(field) || '';

  const options = [
    { value: '0-0', label: 'Parent 1' },
    { value: '0-0-1', label: 'Child 1' },
    { value: '0-0-2', label: 'Child 2' },
    { value: '0-1', label: 'Parent 2' }
  ];

  const handleChange = (event) => {
    onChange('selected')(event.target.value);
  };

  return html`
    <label for=${id}>Select Node</label>
    <select id=${id} name=${id} value=${value} onChange=${handleChange}>
      <option value="">-- Chọn mục --</option>
      ${options.map(opt =>
    html`<option value=${opt.value}>${opt.label}</option>`
  )}
    </select>
  `;
}

// helper
function findGroupIdx(groups, id) {
  return groups.findIndex((g) => g.id === id);
}
