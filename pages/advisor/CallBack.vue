<template >
  <v-dialog>
    <v-container>
      <v-row>
        <v-col>
          <card>
            <v-btn>تماس با مراجع</v-btn>
          </card>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>


<script>
import { useAuthStore } from "@/store/auth";

export default {
  name: "call-back",
  components: {},
  props:['user'],
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    user() {
      return this.auth.user;
    },
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
  },
  async mounted() {
  },
};
</script>