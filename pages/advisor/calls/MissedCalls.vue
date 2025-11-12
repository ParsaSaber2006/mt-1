<template >
  <div>
    <breadcrumbs :items="breadcrumbs" />
    <v-container v-if="loading">
      <v-row justify="center" class="py-10">
        <v-col cols="4" align="center" class="py-16">
          <v-progress-linear color="primary" indeterminate></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="!loading">
      <v-row>
        <v-col cols="8" sm="3" md="3">
          <v-img :src="user.img_url"></v-img>
        </v-col>
        <v-col cols="12" sm="9" md="9">
          <div>
            <span class="text-h5">{{ user.name }}</span> &nbsp;
            <div>{{ user.title }}</div>
            <div>{{ user.job_title }}</div>
            <div>{{ user.short_description }}</div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <card title="تماس های بی پاسخ" :loading="loading">
            <calls-report :advisor_id="user.id" call-back-option>
              <template v-slot:action="{ call }">
                <v-btn

                  @click="callBack(call.user.id)"
                  density="compact"
                  elevation="0"
                  prepend-icon="mdi-phone"
                  class="mdi-flip-h"
                  color="grey-lighten-2"
                >
                  تماس با مراجع
                </v-btn>
              </template>
            </calls-report>
          </card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import { useAuthStore } from "@/stores/auth";

export default {
  name: "advisor-calls",
  data() {
    return {
      loading: false,
      dialog: true,
      advisor: {},
      callBackUser: null,
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    user() {
      return this.auth.user;
    },
    breadcrumbs() {
      return [
        {
          title: "صفحه اصلی",
          disabled: false,
          to: "/",
        },
        {
          title: "لیست تماس ها",
          disabled: true,
        },
      ];
    },
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    async callBack(userId) {
      alert(userId)
      const { data } = await axios.post(
        `/api/advisors/callBack/user/${userId}`
      );
    },
  },
  async mounted() {},
};
</script>