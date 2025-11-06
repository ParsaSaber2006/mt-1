<template>
  <div>

    فاصله داخلی
    <br />
    بالا:
    <input type="number" min="0" max="1000" v-model="element.layout.padding.top" />
    <br />
    راست:
    <input type="number" min="0" max="1000" v-model="element.layout.padding.right" />
    <br />
    پایین:
    <input type="number" min="0" max="1000" v-model="element.layout.padding.bottom" />
    <br />
    چپ:
    <input type="number" min="0" max="1000" v-model="element.layout.padding.left" />
    <br />
    فاصله خارجی
    <br />
    بالا:
    <input type="number" min="-1000" max="1000" v-model="element.layout.margin.top" />
    <br />
    راست:
    <input type="number" min="-1000" max="1000" v-model="element.layout.margin.right" />
    <br />
    پایین:
    <input type="number" min="-1000" max="1000" v-model="element.layout.margin.bottom" />
    <br />
    چپ:
    <input type="number" min="-1000" max="1000" v-model="element.layout.margin.left" />
    <br />
  </div>
</template>
<script>
export default {
  props: ["element"],
  data: () => {
    return {
      element: null,
    };
  },
  computed: {
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