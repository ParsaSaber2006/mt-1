<template>
  <v-card
    v-if="!auth.isLogedIn"
    prepend-icon="mdi-account"
  >
    <template v-slot:title>
      <v-container>
        <v-row>
          <v-col class="d-flex pa-0">
            تغییر رمز
          </v-col>
        </v-row>
      </v-container>
    </template>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col class="text-center">
          <v-alert
            type="success"
            variant="tonal"
            title="رمز عبور با موفقیت تغییر کرد."
            text="رمز عبور شما با موفقیت تغییر کرد. جهت ورود به سیستم روی کلید زیر کلیک کنید"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn
            prepend-icon="mdi-account"
            color="primary"
            @click="goToLoginForm"
            >ورود به پنل کاربری</v-btn
          >
        </v-col>
      </v-row>
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

function goToLoginForm() {
  changeMode("login");
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