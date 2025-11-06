import Heading from "./Heading.vue";
import HeadingEditor from "./Heading.editor.vue";

export default {
  label: 'عنوان بخش',
  name: 'Heading',
  group: 'محتوا',
  icon: 'mdi-page-layout-header',
  render: Heading,
  editor: HeadingEditor,
  $schema: {
    title: 'lorem ipsum dollar site'
  }
}

