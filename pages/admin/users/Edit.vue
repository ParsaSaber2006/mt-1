<template>
  <v-row justify="center">
    <v-col cols="12">
      <card :loading="loading">
        <v-card-title>
          <span class="text-h5">ویرایش کاربر</span>
        </v-card-title>
        <v-card-text v-if="user">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field label="نام" rounded variant="outlined" density="compact" required
                  v-model="user.firstname"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="نام خانوادگی" required rounded variant="outlined" density="compact"
                  v-model="user.lastname"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="شماره مویایل" required rounded variant="outlined" density="compact"
                  v-model="user.mobile"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="رمز عبور" required rounded variant="outlined" density="compact"
                  v-model="user.password"
                  hint="فقط در صورتی که میخواهید رمز عبور را تغییر بدهید این فیلد را پر کنید:"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn color="primary" @click="updateUser" :loading="loading" rounded>
                  ثبت
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </card>
    </v-col>
  </v-row>
</template>


<script>
import { useAuthStore } from "@/stores/auth";

export default {
  name: "edit-user",
  components: {},
  props: ["user"],
  data() {
    return {
      loading: false,
      imageUrl: null,
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
  },
  methods: {
    async updateUser() {
      this.loading = true;
      const { data } = await axios.post(
        `/api/users/${this.user.id}`,
        this.user
      );
      this.loading = false;

      emitter.emit("notif");
      this.$emit("edited", this.user);
      this.dialog = false;
    },
    cancel() {
      this.$emit("cancel");
    },
  },
  async mounted() {
  },
};
</script>