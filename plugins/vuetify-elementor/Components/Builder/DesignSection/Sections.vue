<template>
  <div>
    <draggable v-model="contents.sections" item-key="id" :component-data="{
      tag: 'ul',
      name: !drag ? 'flip-list' : null,
    }" v-bind="dragOptions" @start="drag = true" @end="drag = false">
      <template #item="{ element, index }">
        <div class="elementor-section">
          <div class="elementor-actions">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" class="pa-0 px-2" size="xx-small" elevation="0" variant="text">
                  <strong>...</strong>
                </v-btn>
              </template>
              <v-list density="compact">
                <v-list-item @click="editSection(element)">
                  <v-list-item-title>ویرایش بخش</v-list-item-title>
                </v-list-item>
                <v-list-item @click="addRow(element)">
                  <v-list-item-title>افزودن سطر جدید</v-list-item-title>
                </v-list-item>
                <v-list-item @click="removeSection(index)">
                  <v-list-item-title>حذف بخش</v-list-item-title>
                </v-list-item>
                <v-list-item @click="copySection(element)">
                  <v-list-item-title>کپی</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="clipboardHasSection" @click="pasteSection(index)">
                  <v-list-item-title>چسباندن</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <elementor-section :section="element" />
        </div>
      </template>
    </draggable>

    <div class="py-10 text-center">
      <v-btn prepend-icon="mdi-plus" @click="addSection">ایجاد بخش جدید</v-btn>
    </div>
  </div>
</template>

<script>
import ElementorSection from "./Section.vue";
import draggable from "vuedraggable";
import { useBuilderStore } from "../../../stores/builderStore";
import { useClipboardStore } from "../../../stores/clipboardStore";

export default {
  props: ["contents"],
  components: { ElementorSection, draggable },
  data() {
    return {
      drag: false,
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
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
    clipboardHasSection() {
      return this.clipboard.isSection;
    },
  },
  methods: {
    removeSection(sectionIndex) {
      this.contents.sections.splice(sectionIndex, 1);
    },

    editSection(section) {
      emitter.emit("elementor.editSection", { section });
    },

    addRow(section) {
      section.rows.push(this.builderStore.createRow(section));
    },

    addSection() {
      this.contents.sections.push(this.builderStore.createSection());
    },
    copySection(section) {
      this.clipboard.copySection(section);
    },
    pasteSection(currenSectionIndex) {
      let clb = this.clipboard.getSection();
      if (clb) {
        this.contents.sections.splice(currenSectionIndex, 0, clb);
      }
    },
  },
};
</script>