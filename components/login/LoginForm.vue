<template>
  <div v-if="!auth.isLogedIn">

    <div class="pa-5 bordesr rounded-xl" elevation="0">
      <v-form @submit.prevent="login">
        <div class="text-subtitle-1 text-medium-emphasis">شماره تلفن همراه</div>
        <v-text-field rounded color="primary" variant="outlined" prepend-inner-icon="mdi-cellphone"
          :error-messages="formErrors.mobile" density="compact" required v-model="data.user.mobile" maxlength="11"
          hint="09XXXXXXXXX" autocomplete="off" placeholder="شماره تلفن همراه خود را وارد نمایید"></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          رمز عبور

          <a class="text-caption text-decoration-none text-blue" href="#" @click.prevent="changeMode('resetPassword')"
            rel="noopener noreferrer" target="_blank">
            رمز عبور خود را فراموش کرده اید؟</a>
        </div>

        <v-text-field rounded :error-messages="formErrors.password" density="compact" required color="primary"
          autocomplete="new-password" v-model="data.user.password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
          placeholder="رمز عبور خود را وارد نمایید" prepend-inner-icon="mdi-lock-outline" variant="outlined"
          @click:append-inner="visible = !visible"></v-text-field>

        <v-btn rounded block class="mb-8" color="primary" size="large" variant="tonal" type="submit" :loading="loading">
          ورود
        </v-btn>

        <v-card-text class="text-center">
          <v-btn variant="text" class="text-blue text-decoration-none" @click="changeMode('register')"
            rel="noopener noreferrer" prepend-icon="mdi-chevron-right" target="_blank" rounded>
            ثبت نام کنید
          </v-btn>
        </v-card-text>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
  defineEmits,
  watch,
  defineProps,
  inject,
  computed,
} from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
const emit = defineEmits(["login", "update:user", "changeMode"]);

const resender = ref(null);
const visible = ref(null);


const auth = useAuthStore();
const intendedUrl = auth.intendedUrl;

auth.setIntendedUrl("");

const route = useRoute();
const router = useRouter();

const props = defineProps(["user", "formErrors", "loading"]);

const data = reactive({
  mode: "enterMobile",
  user: {
    mobile: "",
    token: "",
  },
});

function login() {
  emit("login");
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