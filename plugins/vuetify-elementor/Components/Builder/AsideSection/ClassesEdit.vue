<template>
  <div>
    <v-container>
      <v-autocomplete v-model="selected" :items="classes" chips closable-chips color="blue-grey-lighten-2" label="کلاس ها"
        multiple />
    </v-container>
  </div>
</template>
<script>

import { useComponentsStore } from "../../../stores/componentsStore";
import { useSelectedElementsStore } from "../../../stores/selectedElementStore";
export default {
  props: ["step"],
  data: () => {
    return {
      selected: null,
    };
  },
  computed: {
    classes() {
      let classes = [];
      for (let c of ['p', 'm']) {
        for (let j of ['t', 'l', 'b', 'l', 's', 'e', 'x', 'y', 'a']) {
          for (let w of ['', '-sm', '-md', '-lg', '-xl']) {
            for (let v of [...Array(17).keys()]) {
              classes.push(c + j + w + '-' + v)
            }
          }
        }
      }
      return classes;
    },
    componentStore() {
      return useComponentsStore();
    },
    selectedElementsStore() {
      return useSelectedElementsStore();
    },
  },
  methods: {

  },
  mounted() {
  },
};
</script>