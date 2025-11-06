import SliderList from "./Slider.vue";
import SliderListEditor from "./Slider.editor.vue";

export default {
  label: 'اسلایدر باکس',
  name: 'Slider',
  group: 'محتوا',
  icon: 'mdi-view-gallery',
  render: SliderList,
  editor: SliderListEditor,
  $schema: {
    links: [],
    card:[],
    image:[],
    title:[],
    
  }
}

