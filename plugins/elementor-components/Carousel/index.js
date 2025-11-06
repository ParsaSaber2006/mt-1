import CarouselList from "./Carousel.vue";
import CarouselListEditor from "./Carousel.editor.vue";

export default {
  label: 'اسلایدر عکس',
  name: 'Carousel',
  group: 'محتوا',
  icon: 'mdi-view-gallery',
  render: CarouselList,
  editor: CarouselListEditor,
  $schema: {
    links: [],
    show_arrow:""
  }
}

