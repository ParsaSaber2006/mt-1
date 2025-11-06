import Text from "./Text.vue";
import TextEditor from "./Text.editor.vue";

export default {
  label: 'نوشته',
  name: 'Text',
  group: 'محتوا',
  icon: 'mdi-page-layout-body',
  render: Text,
  editor: TextEditor,
  $schema: {
    text: 'متن را وارد کنید',
    align: 'right',
  }
}

