<template>
  <div>
    <v-container v-if="step == 'edit-element'">
      <v-row>
        <v-col>
          <h4 class="text-grey">ویرایش {{ element.label }}</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <component :is="element.editor" :data="element.data" />
          <v-divider></v-divider>

          <v-text-field
            dir="ltr"
            density="compact"
            id="title"
            label="id"
            type="text"
            rounded
            variant="outlined"
            v-model="element.layout.id"
          />

          <v-textarea
            v-model="element.layout.classes"
            dir="ltr"
            variant="outlined"
            label="class"
            density="compact"
            rows="2"
          ></v-textarea>
          <v-textarea
            v-model="element.layout.styles"
            dir="ltr"
            variant="outlined"
            label="styles"
            density="compact"
            rows="2"
          ></v-textarea>

          <div class="mt-2 text-end">
            <v-btn
              @click="$emit('stepChange', 'insert-new-element')"
              append-icon="mdi-arrow-left"
              >بازگشت</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { useComponentsStore } from "../../../stores/componentsStore";
import { useSelectedElementsStore } from "../../../stores/selectedElementStore";
export default {
  props: ["step"],
  data: () => {
    return {
      selectedComponent: null,
      element: null,
    };
  },
  computed: {
    componentStore() {
      return useComponentsStore();
    },
    selectedElementsStore() {
      return useSelectedElementsStore();
    },
  },
  methods: {},
  mounted() {
    let vm = this;
    emitter.on("elementor.editElement", (data) => {
      let component = this.componentStore.getElement(
        data.element.group,
        data.element.name
      );
      let cel = {
        data: data.element.data,
        layout: data.element.layout,
        ...component,
      };
      this.element = cel;
      vm.$emit("stepChange", "edit-element");
    });
  },
  components: {},
};
</script>