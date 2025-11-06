import ContactForm from "./ContactForm.vue";
import ContactFormEditor from "./ContactForm.editor.vue";

export default {
  label: 'فرم تماس',
  name: 'ContactForm',
  group: 'محتوا',
  icon: 'mdi-contacts',
  render: ContactForm,
  editor: ContactFormEditor,
  $schema: {
    title: 'عنوان لیست',
    description: 'توضیح دلخواه برای لیست',
    links: [],
  }
}

