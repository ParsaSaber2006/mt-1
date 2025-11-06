import Categories from "./Categories.vue";
import CategoriesEditor from "./Categories.editor.vue";

export default {
  label: 'زیرمجموعه ',
  name: 'CategoriesSubset',
  group: 'دسته بندی ها',
  icon: 'mdi-format-list-checks',
  render: Categories,
  editor: CategoriesEditor,
  $schema: {
    ids: '',
    title: 'دسته بندی مشاورین',
    description: 'برای تماس با مشاور دلخواه روی لینک های زیر کلیک کنید.',
    class_box:'v-col-12 v-col-md-4',
  }
}

