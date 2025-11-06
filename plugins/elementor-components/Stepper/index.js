import StepperList from "./Stepper.vue";
import StepperListEditor from "./Stepper.editor.vue";

export default {
  label: 'مرحله ساز',
  name: 'Stepper',
  group: 'محتوا',
  icon: 'mdi-view-gallery',
  render: StepperList,
  editor: StepperListEditor,
  $schema: {
    links: [],
    card:[],
    image:[],
    title:[],
    
  }
}

