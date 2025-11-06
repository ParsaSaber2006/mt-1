import Icon from "./Icon.vue";
import IconEditor from "./Icon.editor.vue";

export default {
  label: 'آیکن',
  tag: 'div',
  name: 'Icon',
  group: 'محتوا',
  icon: 'mdi-page-layout-body',
  render: Icon,
  editor: IconEditor,
  $schema: {
    icon: null,
    color: 'primary',
    size: 'primary',
  }
}

