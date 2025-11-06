<template>
  <draggable
    v-model="row.cols"
    item-key="id"
    :component-data="{
      name: !drag ? 'flip-list' : null,
    }"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
    class="v-row"
    :id="row.layout.id"
    :class="row.layout.classes"
    :style="row.layout.styles"
  >
    <template #item="{ element, index }">
      <v-col
        :cols="element.layout.width.cols"
        :sm="element.layout.width.sm"
        :md="element.layout.width.md"
        :lg="element.layout.width.lg"
        :xl="element.layout.width.xl"
        :class="element.layout.classes"
      >
        <div class="elementor-col">
          <div class="elementor-actions">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  class="pa-0 px-4"
                  size="xx-small"
                  elevation="0"
                  variant="text"
                >
                  <strong>...</strong>
                </v-btn>
              </template>
              <v-list density="compact">
                <v-list-item @click="editCol(element)">
                  <v-list-item-title>ویرایش ستون</v-list-item-title>
                </v-list-item>
                <v-list-item @click="removeCol(row, index)">
                  <v-list-item-title>حذف ستون</v-list-item-title>
                </v-list-item>
                <v-list-item @click="copyCol(element)">
                  <v-list-item-title>کپی</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="clipboardHasCol" @click="pasteCol(index)">
                  <v-list-item-title>چسباندن</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <elementor-col :col="element" :row="row" :section="section" />
        </div>
      </v-col>
    </template>
  </draggable>
</template>

<script>
import ElementorCol from "./Col.vue";
import draggable from "vuedraggable";
import { useClipboardStore } from "../../../stores/clipboardStore";

export default {
  props: ["section", "row"],
  components: { ElementorCol, draggable },
  data(){
    return {
      drag: false,
    };
  },
  methods: {
    removeCol(row, colIndex) {
      row.cols.splice(colIndex, 1);
    },
    editCol(col) {
      emitter.emit("elementor.editCol", { col });
    },
    
    copyCol(col) {
      this.clipboard.copyCol(col);
    },
    pasteCol(currenColIndex) {
      let clb = this.clipboard.getCol();
      if (clb) {
        this.row.cols.splice(currenColIndex, 0, clb);
      }

    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "cols",
        ghostClass: "ghost",
        direction: "horizontal",
        scrollSensitivity: 200,
        forceFallback: true,
      };
    },
    
    clipboard() {
      return useClipboardStore();
    },
    clipboardHasCol() {
      return this.clipboard.isCol;
    }
  },
};
</script>