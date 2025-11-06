import CollaborateTool from "./CollaborateTool.vue";
import CollaborateToolEditor from "./CollaborateTool.editor.vue";

export default {
  label: 'اشتراک گذاری',
  name: 'Collaborate',
  group: 'دسته بندی ها',
  icon: 'mdi-share-all',
  render: CollaborateTool,
  editor: CollaborateToolEditor,
  $schema: {
    title: 'کد پولساز',
    description: 'جهت همکاری با ما لینک زیر را کپی کنید و در شبکه های اجتماعی یا از هر طریق دیگر به اشتراک بگذارید.',
    
  }
}

