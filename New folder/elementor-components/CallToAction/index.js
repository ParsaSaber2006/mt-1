import CallToAction from "./CallToAction.vue";
import CallToActionEditor from "./CallToAction.editor.vue";

export default {
  label: 'کال تو اکشن',
  name: 'CallToAction',
  group: 'محتوا',
  icon: 'mdi-cursor-pointer',
  render: CallToAction,
  editor: CallToActionEditor,
  $schema: {
    title: 'عنوان لیست',
    description: 'توضیح دلخواه برای لیست',
    links: [],
  }
}

