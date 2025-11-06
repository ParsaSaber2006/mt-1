import {defineStore} from "pinia";
import {Element} from "../Element";

export const useSelectedElementsStore = defineStore('selectedElements', {
  state() {
    return {
      selectedElements2: []
    }
  },
  actions: {
    addElement2(el, initialData) {
      const reactiveData = {};
      for (const data in el.$schema) {
        if (initialData && initialData[data])
          reactiveData[data] = initialData[data];
        else
          reactiveData[data] = el.$schema[data] || null;
      }

      const element = new Element(
        el.label,
        el.name,
        el.group,
        el.icon,
        el.render,
        el.editor,
        reactiveData);

      this.selectedElements.push(element);
    },
    updateSelectedList(list){
      this.selectedElements = list
    },
    deleteElement(index) {
      this.selectedElements.splice(index, 1);
    },
    $reset() {
      this.selectedElements = [];
    }
  },
  getters: {
    getSelectedElements2(state) {
      return state.selectedElements;
    },
    prepareDataForSave2(state) {
      const result = [];

      for (const element of state.selectedElements) {
        result.push({
          group: element.group,
          name: element.name,
          label: element.label,
          data: element.data
        });
      }

      return result;
    },
    getSelectedItemLength2(state) {
      return state.selectedElements.length;
    }
  }
});