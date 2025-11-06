import { defineStore } from "pinia";

export const useBuilderStore = defineStore('builder', {
  state() {
    return {

    }
  },
  actions: {

    createSection() {
      return {
        rows: [
          this.createRow()
        ],

        layout: { ...this.layout, fluid: false }
      };

    },

    createRow() {
      return {
        cols: [
          this.safeObjectCopy(this.createCol()),
          this.safeObjectCopy(this.createCol())
        ],
        layout: { ...this.layout, }
      }
    },

    safeObjectCopy(obj) {
      return JSON.parse(JSON.stringify(obj))
    },

    createCol() {
      return {
        elements: [],
        layout: { ...this.layout, width: {}, },

      }
    },

    createElement() {

    },

  },
  getters: {
    layout() {
      return {
        style: {
          bgImage: {
            url: null,
            attachment: null,
            size: null,
            position: null,
          },
        },
        tag: 'div',
        classes: '',
        styles: '',
        id: '',
      }
    }
  }
});
