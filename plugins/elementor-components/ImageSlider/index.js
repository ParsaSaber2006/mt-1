import ImageSlider from "./ImageSlider.vue";
import ImageSliderEditor from "./ImageSlider.editor.vue";

export default {
  label: 'اسلایدر عکس',
  name: 'ImageSlider',
  group: 'محتوا',
  icon: 'mdi-folder-multiple-image',
  render: ImageSlider,
  editor: ImageSliderEditor,
  $schema: {
    title: 'عنوان لیست',
    description: 'توضیح دلخواه برای لیست',
    links: [],
  }
}

