<template>
  <div>
    <div class="element-control-field">
      <label for="Description">نوشته</label>

      <text-editor v-model="data.text" />
      <label for="Description">تراز</label>

      <select v-model="data.align">
        <option value="right">راست</option>
        <option value="center">وسط</option>
        <option value="left">چپ</option>
        <option value="justify">کامل</option>
      </select>
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
