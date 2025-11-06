<template>
  <v-container>
    <v-row v-for="componentGroup in componentsStore.getComponentGroups" :key="componentGroup" class="pb-5">
      <v-col cols="12" class="pa-0">
        <h4>{{ componentGroup }}</h4>
      </v-col>
      <v-col style="overflow: hidden" cols="6" class="pa-1"
        v-for="component in componentsStore.groupElements(componentGroup)" :key="component">
        <v-sheet draggable="true" @dragstart="startDragComponent($event, component)" elevation="0"
          class="elementor-component pa-1 text-center" border @cslick.stop="selectComponent(component)">
          <v-icon class="my-2">
            {{ component.icon }}
          </v-icon>
          <v-btn :text="component.label" block variant="text" @click.stop="selectComponent(component)">
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { useComponentsStore } from "./../../../stores/componentsStore";
import { Element } from "../../../Element";
export default {
  props: ["elements"],
  computed: {
    componentsStore() {
      return useComponentsStore();
    },
  },
  data: () => {
    return {};
  },
  methods: {
    selectComponent(component) {
      // this.$emit("selected", component);
    },
    startDragComponent(ev, component) {
      let element = this.translateComponent(component);
      ev.dataTransfer.setData("element2", JSON.stringify(element));
      // ev.target.setData(JSON.stringify(element));
    },
    translateComponent(component) {
      const reactiveData = {};
      for (const data in component.$schema) {
        reactiveData[data] = component.$schema[data] || null;
      }
      const element = new Element(
        component.label,
        component.name,
        component.group,
        component.icon,
        component.render,
        component.editor,
        reactiveData,
        //layout
        {
          classes: '',
          tag: component.tag,
        }
      );
      return element;
    },
  },
};
</script>


<style scoped>
.elementor-component {
  cursor: pointer;
}
</style>