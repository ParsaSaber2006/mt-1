import Button from "./Button.vue";
import ButtonEditor from "./Button.editor.vue";

export default {
  label: 'کلید',
  tag: 'span',
  name: 'Button',
  group: 'محتوا',
  icon: 'mdi-page-layout-body',
  render: Button,
  editor: ButtonEditor,
  $schema: {
    text: 'متن را وارد کنید',
    align: 'right',
    icon: null,
    iconType: 'append',
    color: 'primary',
    type: 'default',
    rounded: '',
    action: {
      type: 'innerUrl',
      href: '/'
    },
  }
}

