<template >
  <v-icon :color="color" :title="title">{{ icon }}</v-icon>
</template>

<script >
export default {
  name: "CallStatusIcon",
  props: ["disposition"],
  data: () => {
    return {};
  },
  computed: {
    color() {
      switch (this.disposition) {
        case "ANSWERED":
          return "success";
        case "NOT ANSWERED":
          return "error";
      }
    },
    icon() {
      switch (this.disposition) {
        case "ANSWERED":
          return "mdi-checkbox-marked-circle";
        case "NOT ANSWERED":
          return "mdi-close-circle";
        default:
          return this.disposition;
      }
    },
    title() {
      switch (this.disposition) {
        case "ANSWERED":
          return "پاسخ داده شده";
        case "NOT ANSWERED":
          return "بدون پاسخ";
        default:
          return this.disposition;
      }
    },
  },
};
</script>