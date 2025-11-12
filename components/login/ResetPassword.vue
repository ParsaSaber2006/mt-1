<template>
  <v-card
    v-if="!auth.isLogedIn"
  >
    <template v-slot:title>
      <v-container>
        <v-row>
          <v-col class="d-flex pa-0">
            بازنشانی رمز عبور
          </v-col>
        </v-row>
      </v-container>
    </template>
    <v-divider></v-divider>
    <v-card-text>
      <v-form @submit.prevent="requestResetPassToken">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="10" class="pa-0">
              <v-alert type="info" class="mb-5" variant="tonal"
                >جهت بازنشانی رمز عبور شماره موبایل خود که قبلا با آن ثبت نام
                کرده اید را جهت دریافت کد تایید پیامکی وارد کنید:</v-alert
              >
              <v-text-field
                :error-messages="formErrors.mobile"
                density="compact"
                label="شماره موبایل"
                variant="outlined"
                rounded
                required
                v-model="data.user.mobile"
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="10" class="pa-0">
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                variant="tonal"
                @click="requestResetPassToken"
                :loading="loading"
                rounded
                :disabled="loading"
              >
                درخواست کد تایید
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
import ResendTokenButton from "./ResendTokenButton.vue";
const emit = defineEmits([
  "requestResetPassToken",
  "update:user",
  "changeMode",
]);

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
  resendTimer: 90,
});

function requestResetPassToken() {
  emit("requestResetPassToken");
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