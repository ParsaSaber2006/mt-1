<template>
  <div>
    salamasd as
  </div>
</template>


<script>
import { useAuthStore } from "@/stores/auth";

export default {
  components: {  },
  data() {
    return {
      loading: false,
      dialog: true,
      advisor: {},
      currentComponent: "NotApprovedComments",
      componentsList: [
        {
          name: 'NoApprovedComments',
          title: 'کامنت های تایید نشده',
          icon: 'mdi-chart-line-stacked',
        },
        {
          name: 'ArchivedComments',
          title: 'کامنت های بایگانی شده',
          icon: 'mdi-account-box',
        },
      ],
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
  },
  methods: {
  },
};
</script>