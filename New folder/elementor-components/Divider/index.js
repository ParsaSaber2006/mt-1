import Divider from "./Divider.vue";
import DividerEditor from "./Divider.editor.vue";

export default {
  label: 'تقسیم کننده',
  name: 'Divider',
  group: 'دسته بندی ها',
  icon: 'mdi-arrow-split-vertical',
  render: Divider,
  editor: DividerEditor,
  $schema: { 
    thickness:'14',
    color:'green-darken-3'
  }
}

