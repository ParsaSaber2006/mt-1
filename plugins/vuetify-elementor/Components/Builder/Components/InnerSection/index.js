import InnerSection from "./InnerSection.vue";
import InnerSectionEditor from "./InnerSection.editor.vue";

export default {
  label: 'بخش داخلی',
  name: 'InnerSection',
  group: 'محتوا',
  icon: 'mdi-page-layout-header',
  render: InnerSection,
  editor: InnerSectionEditor,
  $schema: {
    rows: null
  }
}

