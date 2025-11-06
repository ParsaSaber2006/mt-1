import PanelExtension from "./PanelExtension.vue";
import PanelExtensionEditor from "./PanelExtension.editor.vue";

export default {
  label: 'پانل باز شونده',
  name: 'PanelExtension',
  group: 'محتوا',
  icon: 'mdi-card-text',
  render: PanelExtension,
  editor: PanelExtensionEditor,
  $schema: {
    links: [],
    variant:"inset"
  }
}

