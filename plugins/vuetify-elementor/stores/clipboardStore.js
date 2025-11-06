import { defineStore } from "pinia";

export const useClipboardStore = defineStore('elementor_clipboard', {
  state() {
    return {
      clipboard: "",
      type: "",
    }
  },
  actions: {

    copyToClipboard(entity, type) {
      this.clipboard = entity;
      this.type = type;
    },

    copySection(section) {
      this.copyToClipboard(section, 'section')
    },

    copyRow(row) {
      this.copyToClipboard(row, 'row')
    },

    copyCol(col) {
      this.copyToClipboard(col, 'col')
    },

    copyElement(element) {
      this.copyToClipboard(element, 'element')
    },

    getFromClipboard(type) {
      if (type != this.type)
        return false;

      return JSON.parse(JSON.stringify(this.clipboard))
    },

    getSection() {
      return this.getFromClipboard('section')
    },

    getRow() {
      return this.getFromClipboard('row')
    },

    getCol() {
      return this.getFromClipboard('col');
    },

    getElement() {
      return this.getFromClipboard('element');
    },
  },
  getters: {
    getStoredEntityType(state) {
      return state.type
    },

    isSection(state) {
      return state.type == 'section';
    },

    isRow(state) {
      return state.type == 'row';
    },

    isCol(state) {
      return state.type == 'col';
    },

    isElement(state) {
      return state.type == 'element';
    },
  }
});
