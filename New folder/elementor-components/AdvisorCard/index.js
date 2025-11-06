import AdvisorCard from "./AdvisorCard.vue";
import AdvisorCardEditor from "./AdvisorCard.editor.vue";

export default {
  label: 'نمایش مشاور',
  name: 'AdvisorCard',
  group: 'مشاورین',
  icon: 'mdi-account',
  render: AdvisorCard,
  editor: AdvisorCardEditor,
  $schema: {
    title: 'عنوان لیست',
    description: 'توضیح دلخواه برای لیست',
    links: [],
  }
}

