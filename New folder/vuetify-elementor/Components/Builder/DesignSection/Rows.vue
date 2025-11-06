<template>
  <draggable v-model="section.rows" :item-key="(key) => key" :component-data="{
    tag: 'div',
    name: !drag ? 'flip-list' : null,
  }" v-bind="dragOptions" @start="drag = true" @end="drag = false">
    <template #item="{ element, index }">
      <div class="elementor-row">
        <div class="elementor-actions">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" class="pa-0 px-4" size="xx-small" elevation="0" variant="text" >
                <strong>...</strong>
              </v-btn>
            </template>
            <v-list density="compact">
              <v-list-item @click="editRow(element)">
                <v-list-item-title>ویرایش سطر</v-list-item-title>
              </v-list-item>
              <v-list-item @click="addCol(element)">
                <v-list-item-title>افزودن ستون</v-list-item-title>
              </v-list-item>
              <v-list-item @click="removeRow(section, index)">
                <v-list-item-title>حذف سطر</v-list-item-title>
              </v-list-item>
              <v-list-item @click="copyRow(element)">
                <v-list-item-title>کپی</v-list-item-title>
              </v-list-item>
              <v-list-item v-if="clipboardHasRow" @click="pasteRow(index)">
                <v-list-item-title>چسباندن</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <elementor-row :row="element" :row-index="index" :section="section" />
      </div>
    </template>
  </draggable>
</template>

<script>
import ElementorRow from "./Row.vue";
import draggable from "vuedraggable";
import { useBuilderStore } from "../../../stores/builderStore";
import { useClipboardStore } from "../../../stores/clipboardStore";

export default {
  props: ["section"],
  components: { ElementorRow, draggable },
  data: () => {
    return {
      drag: false,
    };
  },
  methods: {
    addCol(row) {
      row.cols.push(this.builderStore.createCol());
    },
    removeRow(section, rowIndex) {
      section.rows.splice(rowIndex, 1);
    },
    editRow(row) {
      emitter.emit("elementor.editRow", { row });
    },
    copyRow(row) {
      this.clipboard.copyRow(row);
    },
    pasteRow(currenRowIndex) {
      let clb = this.clipboard.getRow();
      if (clb) {
        this.section.rows.splice(currenRowIndex, 0, clb);
      }
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "rows",
        ghostClass: "ghost",
        invertSwap: true,
        swapThreshold: 0.5,
        scrollSensitivity: 200,
        forceFallback: true,
      };
    },
    builderStore() {
      return useBuilderStore();
    },
    clipboard() {
      return useClipboardStore();
    },
    clipboardHasRow() {
      return this.clipboard.isRow;
    }
  },
};
</script>