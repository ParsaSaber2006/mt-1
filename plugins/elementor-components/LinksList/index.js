import LinksList from "./LinksList.vue";
import LinksListEditor from "./LinksList.editor.vue";

export default {
  label: 'لینک لیست',
  name: 'LinksList',
  group: 'محتوا',
  icon: 'mdi-view-list',
  render: LinksList,
  editor: LinksListEditor,
  $schema: {
    links: [],
  }
}

