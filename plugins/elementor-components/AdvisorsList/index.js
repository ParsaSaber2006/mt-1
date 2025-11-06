import AdvisorsList from "./AdvisorsList.vue";
import AdvisorsListEditor from "./AdvisorsList.editor.vue";

export default {
  label: 'لیست مشاورین',
  name: 'AdvisorsList',
  group: 'مشاورین',
  icon: 'mdi-account-multiple',
  render: AdvisorsList,
  editor: AdvisorsListEditor,
  $schema: {
    title: 'عنوان لیست',
    description: 'توضیح دلخواه برای لیست',
    links: [],
  }
}

