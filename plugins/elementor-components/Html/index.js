import Html from "./Html.vue";
import HtmlEditor from "./Html.editor.vue";

export default {
  label: 'کد html',
  name: 'html',
  group: 'محتوا',
  icon: 'mdi-xml',
  render: Html,
  editor: HtmlEditor,
  $schema: {
    text: 'html را وارد کنید',
  }
}

