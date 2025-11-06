<template>
  <div>soal این کجاست؟
    <component :is="component.editor" :data="component.$schema" ></component>
    <v-btn>save</v-btn>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      data: "data"
    };
  },
  props: ["component"],
};
</script>