import Category from "./Category.vue";
import CategoryEditor from "./Category.editor.vue";

export default {
  label: 'دسته بندی ',
  name: 'category',
  group: 'دسته بندی ها',
  icon: 'mdi-format-list-bulleted',
  render: Category,
  editor: CategoryEditor,
  $schema: {
    categoryId: 1,
  }
}

