<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card color="red-lighten-1">
          <v-card-text>404 . صفحه مورد نظر یافت نشد </v-card-text>
          {{ display }}
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAuthStore } from "@/stores/auth";

export default {
  metaInfo() {},
  name: "home",
  components: {},
  computed: {
    display() {
    },
  },

  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>