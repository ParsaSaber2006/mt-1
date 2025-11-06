<template>
  <div>
    <v-container v-if="step == 'edit-row'">
      <v-row>
        <v-col>
          <h4 class="text-grey">ویرایش سطر</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          
          <v-text-field
            dir="ltr"
            density="compact"
            id="title"
            label="id"
            type="text"
            rounded
            variant="outlined"
            v-model="row.layout.id"
          />

          <v-textarea
            v-model="row.layout.classes"
            dir="ltr"
            variant="outlined"
            density="compact"
            label="class"
            rows="2"
          ></v-textarea>

          <v-textarea
            v-model="row.layout.styles"
            dir="ltr"
            variant="outlined"
            density="compact"
            label="styles"
            rows="2"
          ></v-textarea>


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
      row: null,
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
    emitter.on("elementor.editRow", (data) => {
      console.log("editTOw");
      this.row = data.row;
      vm.$emit("stepChange", "edit-row");
    });
  },
};
</script>