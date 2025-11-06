import AdvisorsSliderGroup from "./AdvisorsSlides.vue";
import AdvisorsSliderGroupEditor from "./AdvisorsSlides.editor.vue";

export default {
  label: 'اسلایدر مشاورین2 ',
  name: 'AdvisorsSlides',
  group: 'مشاورین',
  icon: 'mdi-format-list-checks',
  render: AdvisorsSliderGroup,
  editor: AdvisorsSliderGroupEditor,
  $schema: {
    categoreisIds: '',
    transition_speed: 500,
    duration: 3000,
    slides_count: {
      mobile: 2,
      tablet: 3,
      desktop: 4,
      above: 6,
    },
    autoplay: true,
    size: 'small',
    show_title: true,
    show_job_title: true,
    show_stars: true,
    show_image: true,
    height: 300,
    show_online_status: true,
    advisor_container_class: "border",
    selected_advisor_container_class: "elevation-5 border",
  }
}

