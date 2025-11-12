<template >
  <div>
    <v-container>
      <v-row>
        <v-col>
          <card title="اطلاعات کاربری من">
            <v-row>
              <v-col>
                <strong>نام و نام خانوادگی: </strong>{{ user.name }}
              </v-col>
            </v-row>
            <v-row>
              <v-col> <strong>شماره موبایل: </strong>{{ user.mobile }} </v-col>
            </v-row>
          </card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <card title="تغییر رمز ورود">
            <v-form @submit.prevent="changePassword">
              <v-row>
                <v-col>
                  <v-text-field
                    density="compact"
                    label="رمز عبور فعلی"
                    v-model="password.current"
                    type="password"
                    :error-messages="changepasswordErrors.current_password"
                  />
                  <v-text-field
                    density="compact"
                    label="رمز عبور جدید"
                    v-model="password.first"
                    type="password"
                    :error-messages="changepasswordErrors.password"
                  />
                  <v-text-field
                    density="compact"
                    label="تکرار رمز عبور"
                    v-model="password.confirm"
                    type="password"
                    :error-messages="changepasswordErrors.password_confirmation"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-end">
                  <v-btn
                    type="submit"
                    color="primary"
                    :loading="changePasswordLoading"
                    >تغییر رمز</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";

export default {
  name: "wallet",
  components: {},

  data() {
    return {
      loading: false,
      changePasswordLoading: false,
      imageUrl: null,
      file: null,
      password: {},
      changepasswordErrors: {},
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
    imageSelected(files) {
      this.imageUrl = URL.createObjectURL(files[0]);
      this.file = files[0];
    },
    upload() {
      this.loading = true;
      let formData = new FormData();
      formData.append("file", this.file);
      axios.post(`/api/users/${this.auth.user.id}/profileImage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      this.loading = false;
    },
    changePassword() {
      this.changePasswordLoading = true;
      axios
        .post(`/api/auth/changeMyPassword`, {
          current_password: this.password.current,
          password: this.password.first,
          password_confirmation: this.password.confirm,
        })
        .then((res) => {
          this.password = {};
          this.changepasswordErrors = {};
          emitter.emit("notif");
        })
        .catch((err) => {
          if (err.response.status == 422) {
            this.changepasswordErrors = err.response.data.errors;
          }
        })
        .then(() => {
          this.changePasswordLoading = false;
        });
    },
  },
  mounted() {},
};
</script>