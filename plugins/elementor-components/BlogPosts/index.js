import BlogPosts from "./BlogPosts.vue";
import BlogPostsEditor from "./BlogPosts.editor.vue";

export default {
  label: 'پست‌های وبلاگ',
  name: 'Blog Posts',
  group: 'بلاگ',
  icon: 'mdi-view-module',
  render: BlogPosts,
  editor: BlogPostsEditor,
  $schema: {
    title: 'عنوان را وارد کنید',
    description: 'توضیحات را وارد کنید',
    image_url: "/images/image-holder.png",
    selectedCategories: [],
  }
}

