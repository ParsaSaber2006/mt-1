<template>
  <v-card
    v-if="auth.isLogedIn"
  >
    <template v-slot:title>
      <v-container>
        <v-row>
          <v-col class="d-flex pa-0">
            تایید شماره موبایل
          </v-col>
        </v-row>
      </v-container>
    </template>
    <v-divider></v-divider>
    <v-card-text>
      <v-form @submit.prevent="verifyToken">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="10" class="pa-0">
              <div class="mb-3 text-green font-weight-bold">
                لطفا کد تایید ارسال شده به شماره موبایل
                {{ data.user.mobile }} را وارد کنید:
              </div>
              <v-otp-input
                :error="!!formErrors.token"
                density="compact"
                label="کد تایید"
                required
                length="5"
                dir="ltr"
                v-model="data.user.token"
              />
              <div class="text-red"></div>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="10" class="pa-0">
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                variant="tonal"
                @click="verifyToken"
                :loading="loading"
                :disabled="loading"
                rounded
              >
                تایید
              </v-btn>
              <resend-token-button
                class="ms-1"
                :time="data.resendTimer"
                @requestToken="requestToken"
                ref="resender"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="gray" rounded variant="text" @click="auth.hideLoginform()">
        انصراف
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, reactive, onMounted, defineEmits, watch, defineProps } from "vue";
import { useAuthStore } from "@/store/auth";
import { useRouter, useRoute } from "vue-router";
import ResendTokenButton from "./ResendTokenButton.vue";
const emit = defineEmits([
  "requestToken",
  "verifyToken",
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
  resendTimer: 120,
});

function requestToken() {
  resender.value.resetTimer(data.resendTimer);
  emit("requestToken");
}

function verifyToken() {
  emit("verifyToken");
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
</script>