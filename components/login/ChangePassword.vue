<template>
  <v-card v-if="!auth.isLogedIn" prepend-icon="mdi-account">
    <template v-slot:title>
      <v-container>
        <v-row>
          <v-col class="d-flex pa-0">
            تغییر رمز
            <v-spacer> </v-spacer>
            <v-btn
              color="gray"
              @click="auth.hideLoginform()"
              fab
              elevation="0"
              icon="mdi-window-close"
              class="ma-0 pa-0"
              size="x-small"
            >
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <v-divider></v-divider>
    <v-card-text>
      <v-form @submit.prevent="changePassword">
        <v-container>
          <v-row>
            <v-col>
              <v-alert
                type="info"
                variant="tonal"
                title="اطلاعات شما تایید شد"
                text="لطفا رمز عبور جدید و تکرار آن را وارد نمایید. پس از این مرحله می‌توانید با رمز عبور جدید خود وارد سیستم شوید."
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="10" class="pa-0">
              <v-text-field
                :error-messages="formErrors.password"
                density="compact"
                label="رمز جدید"
                required
                :name="'a' + Math.random()"
                type="password"
                v-model="data.user.password"
                variant="outlined"
                rounded
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="10" class="pa-0">
              <v-text-field
                :error-messages="formErrors.password_confirmation"
                density="compact"
                :name="'a' + Math.random()"
                label="تکرار رمز جدید"
                required
                type="password"
                v-model="data.user.password_confirmation"
                variant="outlined"
                rounded
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="10" class="pa-0">
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                variant="tonal"
                @click="changePassword"
                :loading="loading"
                :disabled="loading"
                rounded
              >
                تغییر رمز عبور
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="gray" variant="text" @click="auth.hideLoginform()">
        انصراف
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, reactive, onMounted, defineEmits, watch, defineProps } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
const emit = defineEmits(["changePassword", "update:user", "changeMode"]);

const resender = ref(null);

const auth = useAuthStore();
const intendedUrl = auth.intendedUrl;
auth.setIntendedUrl("");

const route = useRoute();
const router = useRouter();

const props = defineProps(["user", "loading", "formErrors"]);

const data = reactive({
  user: {
    mobile: "",
    token: "",
  },
  helloMessage: null,
  disableRenewToken: true,
  resendTimer: 10,
});

function changePassword() {
  emit("changePassword");
}

watch(data.user, (val) => {
  emit("update:user", val);
});

onMounted(() => {
  data.user = props.user;
});

function changeMode(mode) {
  emit("changeMode", mode);
}

async function logout() {
  data.loading = true;
  await auth.logout();
  data.loading = false;
  auth.hideLoginform();
  if (route.meta.requireAuth) router.push("/");
}
</script>