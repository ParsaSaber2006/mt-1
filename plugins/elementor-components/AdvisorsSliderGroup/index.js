import AdvisorsSliderGroup from "./AdvisorsSliderGroup.vue";
import AdvisorsSliderGroupEditor from "./AdvisorsSliderGroup.editor.vue";

export default {
  label: 'اسلایدر مشاورین ',
  name: 'AdvisorsSliderGroup',
  group: 'مشاورین',
  icon: 'mdi-format-list-checks',
  render: AdvisorsSliderGroup,
  editor: AdvisorsSliderGroupEditor,
  $schema: {
    categoreisIds: '',
    speed: 3,
    autoplay: true,
    size: 'small',
    show_title: true,
    show_job_title: true,
    show_stars: true,
    show_image: true,
    show_online_status: true,
    advisor_container_class: "border",
    selected_advisor_container_class: "elevation-5 border",
  }
}

