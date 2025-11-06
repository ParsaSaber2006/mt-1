import Image from "./Image.vue";
import ImageEditor from "./Image.editor.vue";

export default {
  label: 'تصویر',
  name: 'Image',
  group: 'محتوا',
  icon: 'mdi-image',
  render: Image,
  editor: ImageEditor,
  $schema: {
    image_url: '/images/image-holder.png',
  }
}

