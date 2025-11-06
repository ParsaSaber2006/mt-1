<template>
  <div>
    <div class="element-control-field">
      <label for="Description">html </label>

      <v-textarea v-model="data.text" type="text" dir="ltr" />
      <label for="Description">تراز</label>
    </div>
  </div>
  
</template>

<script>
export default {
  props: ["data"],
  data: () => {
    return {
    };
  },
  methods: {
  },
  created() { },
};
</script>
