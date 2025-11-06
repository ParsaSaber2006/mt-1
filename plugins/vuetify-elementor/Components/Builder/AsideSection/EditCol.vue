<template>
  <div>
    <v-container v-if="step == 'edit-col'">
      <v-row>
        <v-col>
          <h4 class="text-grey">ویرایش ستون</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          >cols:
          <input
            type="number"
            min="0"
            max="12"
            v-model="col.layout.width.cols"
          />
          <br />
          sm:
          <input type="number" min="0" max="12" v-model="col.layout.width.sm" />
          <br />
          md:
          <input type="number" min="0" max="12" v-model="col.layout.width.md" />
          <br />
          lg:
          <input type="number" min="0" max="12" v-model="col.layout.width.lg" />
          <br />
          xl:
          <input type="number" min="0" max="12" v-model="col.layout.width.xl" />
          <br />
          
          <v-text-field
            dir="ltr"
            density="compact"
            id="title"
            label="id"
            type="text"
            rounded
            variant="outlined"
            v-model="col.layout.id"
          />


          <v-textarea
            v-model="col.layout.classes"
            dir="ltr"
            variant="outlined"
            density="compact"
            label="class"
            rows="2"
          ></v-textarea>

          <v-textarea
            v-model="col.layout.styles"
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
import ClassesEditVue from "./ClassesEdit.vue";
export default {
  props: ["step"],
  components: { ClassesEditVue },
  data: () => {
    return {
      selectedComponent: null,
      col: null,
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
    emitter.on("elementor.editCol", (data) => {
      this.col = data.col;
      vm.$emit("stepChange", "edit-col");
    });
  },
};
</script>