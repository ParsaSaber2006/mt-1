<template>
  <div>
    <v-container v-if="step == 'edit-section'">
      <v-row>
        <v-col>
          <h4 class="text-grey">ویرایش بخش</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          fluid:
          <input type="checkbox" v-model="section.layout.fluid" />
          <br />

          <v-text-field
            dir="ltr"
            density="compact"
            id="title"
            label="id"
            type="text"
            rounded
            variant="outlined"
            v-model="section.layout.id"
          />

          <v-textarea
            v-model="section.layout.classes"
            dir="ltr"
            variant="outlined"
            rows="2"
            density="compact"
            label="class"
          ></v-textarea>

          <v-textarea
            v-model="section.layout.styles"
            dir="ltr"
            variant="outlined"
            rows="2"
            density="compact"
            label="styles"
          ></v-textarea>

          <br />
          <v-divider></v-divider>
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
      section: null,
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
    emitter.on("elementor.editSection", (data) => {
      this.section = data.section;
      vm.$emit("stepChange", "edit-section");
    });
  },
};
</script>