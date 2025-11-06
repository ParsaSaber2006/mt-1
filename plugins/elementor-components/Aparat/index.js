import Aparat from "./Aparat.vue";
import AparatEditor from "./Aparat.editor.vue";

export default {
  label: 'aparat',
  name: 'َAparat',
  group: 'محتوا',
  icon: 'mdi-play-box',
  render: Aparat,
  editor: AparatEditor,
  $schema: {
    text: 'آدرس ویدیو را وارد کنید',
  }
}

