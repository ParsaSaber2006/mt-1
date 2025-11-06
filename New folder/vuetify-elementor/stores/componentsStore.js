import { defineStore } from "pinia";


export const useComponentsStore = defineStore('components', {
  state() {
    return {
      components: {},
      groups: [],
    }
  },
  actions: {
    addComponent(component) {

      this.components[component.name] = component;
      if (!this.groups.includes(component.group))
        this.groups.push(component.group)
    },
  },
  getters: {
    getElement(state) {
      return (group, name) => {
        return this.components[name];
      }
    },
    getComponentGroups(state) {
      return state.groups;
    },
    groupElements(state) {
      return (groupName) => {
        return Object.fromEntries(
          Object.entries(state.components).filter(([key, component]) => component.group === groupName))
      }
    },
  }
});
