<template>
  <draggable
    v-model="col.elements"
    item-key="id"
    :component-data="{
      name: !drag ? 'flip-list' : null,
    }"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
    tag="span"
  >
    <template #item="{ element, index }">
      <component
        :is="element.layout.tag ?? 'div'"
        class="elementor-element"
        :id="element.layout.id"
        :class="element.layout.classes"
        :style="element.layout.styles"
        @click="clickOnComponent(element)"
      >
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
              <v-list-item @click="removeElement(col, index)">
                <v-list-item-title>حذف عنصر</v-list-item-title>
              </v-list-item>
              <v-list-item @click="clickOnComponent(element)">
                <v-list-item-title>ویرایش عنصر</v-list-item-title>
              </v-list-item>
              <v-list-item @click="copyElement(element)">
                <v-list-item-title>کپی</v-list-item-title>
              </v-list-item>
              <v-list-item v-if="clipboardHasElement" @click="pasteElement(index)">
                <v-list-item-title>چسباندن</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <span class="elementor-element-overlay"> </span>
        <component
          :class="element.layout.classes"
          :is="{ ...fetchElement(element).render }"
          :data="element.data"
          @click="clickOnComponent(element)"
        />
      </component>
    </template>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import { useSelectedElementsStore } from "../../../stores/selectedElementStore";
import { useComponentsStore } from "../../../stores/componentsStore";
import { useClipboardStore } from "../../../stores/clipboardStore";

export default {
  props: ["section", "row", "col"],
  components: { draggable },
  data: () => {
    return {
      drag: false,
    };
  },
  methods: {
    removeCol(row, colIndex) {
      row.cols.splice(colIndex, 1);
    },
    fetchElement(element) {
      const el = this.componentsStore.getElement(element.group, element.name);
      return el;
    },
    removeElement(col, elementIndex) {
      col.elements.splice(elementIndex, 1);
    },
    clickOnComponent(element) {
      emitter.emit("elementor.editElement", { element });
    },
    copyElement(element) {
      this.clipboard.copyElement(element);
    },
    pasteElement(currenElementIndex) {
      let clb = this.clipboard.getElement();
      if (clb) {
        this.col.elements.splice(currenElementIndex, 0, clb);
      }

    }
  },
  computed: {
    selectedElementsStore() {
      return useSelectedElementsStore();
    },
    componentsStore() {
      return useComponentsStore();
    },
    dragOptions() {
      return {
        className: "hsy",
        animation: 200,
        group: "elements",
        ghostClass: "ghost",
        direction: "horizontal",
        scrollSensitivity: 200,
        forceFallback: true,
      };
    },
    clipboard() {
      return useClipboardStore();
    },
    clipboardHasElement() {
      return this.clipboard.isElement;
    }
  },
};
</script>