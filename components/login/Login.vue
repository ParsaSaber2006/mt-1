<template>
  <v-dialog v-model="dialog" persistent scrollable class="d-flex" fullscreen>
    <v-sheet style="background-color: #fafafa">
      <v-container>
        <v-row>
          <v-col>
            <v-btn
              color="gray"
              @click="auth.hideLoginform()"
              fab
              elevation="0"
              icon="mdi-window-close"
              class="ma-0 pa-0"
              density="compact"
            >
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="align-center justify-center">
          <v-col cols="12" sm="7" md="5" lg="4" class="">
            <div class="mb-2">
              <h2 class="text-center">{{ siteName }}</h2>
              <h4 class="text-center">{{ siteDescription }}</h4>
            </div>
            <v-scroll-x-transition hide-on-leave leave-absolute>
              <login-form
                v-if="!auth.isLogedIn && data.mode == 'login'"
                v-model:user="data.user"
                @changeMode="changeMode"
                :formErrors="data.formErrors"
                :loading="data.loading"
                @login="login"
              />

              <register-form
                v-if="!auth.isLogedIn && data.mode == 'register'"
                v-model:user="data.user"
                :formErrors="data.formErrors"
                :loading="data.loading"
                @changeMode="changeMode"
                @register="register"
              />

              <reset-password
                v-if="!auth.isLogedIn && data.mode == 'resetPassword'"
                v-model:user="data.user"
                @changeMode="changeMode"
                :formErrors="data.formErrors"
                :loading="data.loading"
                @requestResetPassToken="requestResetPassToken"
              />

              <try-with-token
                v-if="!auth.isLogedIn && data.mode == 'tokenTry'"
                v-model:user="data.user"
                @changeMode="changeMode"
                @verifyToken="changePasswordVerifyMobileToken"
                @requestToken="requestResetPassToken"
                :formErrors="data.formErrors"
                :loading="data.loading"
              />

              <change-pass
                v-if="!auth.isLogedIn && data.mode == 'changePassword'"
                v-model:user="data.user"
                @changeMode="changeMode"
                @changePassword="changePassword"
                :formErrors="data.formErrors"
                :loading="data.loading"
              />

              <password-changed
                v-if="!auth.isLogedIn && data.mode == 'passwordChanged'"
                v-model:user="data.user"
                @changeMode="changeMode"
                :loading="data.loading"
              />

              <mobile-verification
                v-if="auth.isLogedIn && data.mode == 'mobileVerification'"
                v-model:user="data.user"
                @verifyToken="verifyMobileNumberToken"
                :loading="data.loading"
                :formErrors="data.formErrors"
              />

              <user-info
                v-if="auth.isLogedIn && data.mode != 'mobileVerification'"
                @changeMode="sendMobileVerifyToken"
                v-model:user="data.user"
              />
            </v-scroll-x-transition>
          </v-col>

          <v-col class="" cols="12" sm="7" md="7" lg="8">
            <render-hook page_id="login"></render-hook>
            <!-- <v-img src="/images/category-holder.jpg" class="rounded-xl" /> -->
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-dialog>
</template>
<script>
export default {
  name: "Login",
};
</script>
<script setup>
import { reactive, computed, onMounted, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import LoginForm from "./LoginForm.vue";
import ResetPassword from "./ResetPassword.vue";
import TryWithToken from "./TryWithToken.vue";
import RegisterForm from "./RegisterForm.vue";
import ChangePass from "./ChangePassword.vue";
import PasswordChanged from "./PasswordChanged.vue";
import MobileVerification from "./MobileVerification.vue";
import UserInfo from "./UserInfo.vue";

const auth = useAuthStore();
const route = useRoute();
const dialog = computed(() => {
  return auth.loginFormDisplay;
});

const optionsStore = inject("optionsStore");
const siteName = computed(() =>
  optionsStore.value.get("sitename", "پلتفرم مشاوره")
);
const siteDescription = computed(() =>
  optionsStore.value.get("site_description", "پلتفرم مشاوره")
);

const router = useRouter();

const data = reactive({
  mode: "login",
  loading: false,
  loginForm: null,
  formErrors: {},
  user: {
    mobile: "",
    national_code: "",
    firstname: "",
    lastname: "",
    helloMessage: null,
    token: "",
  },
});

const intendedUrl = auth.intendedUrl;
auth.setIntendedUrl("");

function sendMobileVerifyToken() {
  if(!data.user.mobile)
    data.user.mobile = auth.user.mobile;

  data.mode = "mobileVerification";
  auth
    .requestMobileToken(data.user.mobile)
    .then(async (res) => {})
    .catch(function (error) {
      if (error.response) {
        data.formErrors = error.response.data.errors;
        if (error.response.status == 422) {
          data.formErrors = error.response.data.errors;
          if (
            data.formErrors.mobile ==
            "کاربری با این شماره موبایل وجود ندارد، لطفا ثبت نام کنید."
          )
            changeMode("register");
        }
      }
    })
    .then(() => {
      data.loading = false;
    });
}

function register() {
  data.formErrors = {};
  data.loading = true;
  auth
    .register(data.user)
    .then(async (res) => {
      const user = await auth.fetchUser();
      if (!user.mobile_verified) {
        sendMobileVerifyToken();
      } else {
        if (intendedUrl !== "") {
          router.push({ path: intendedUrl });
        }
        emitter.emit("notif", { text: "با موفقیت وارد شدید." });
        auth.hideLoginform();
      }
    })
    .catch((error) => {
      console.log("errrrrrr", error);
      if (error.response.status == 422) {
        data.formErrors = error.response.data.errors;
      }
    })
    .then(() => {
      data.loading = false;
    });
}

function login() {
  data.loading = true;
  data.formErrors = {};
  auth
    .login(data.user.mobile, data.user.password)
    .then(async (res) => {
      const user = await auth.fetchUser();
      if (!user.mobile_verified) {
        sendMobileVerifyToken();
      } else {
        if (intendedUrl !== "") {
          router.push({ path: intendedUrl });
        }
        emitter.emit("notif", { text: "با موفقیت وارد شدید." });
        auth.hideLoginform();
      }
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.status == 422) {
          data.formErrors = error.response.data.errors;
        }
        if (error.response.status == 401) {
          data.formErrors = {
            mobile: "شماره موبایل یا رمز عبور اشتباه است",
          };
        }
      }
    })
    .then(() => {
      data.loading = false;
    });
}

function requestResetPassToken() {
  data.loading = true;
  data.formErrors = {};
  auth
    .requestMobileToken(data.user.mobile)
    .then(async (res) => {
      data.mode = "tokenTry";
    })
    .catch(function (error) {
      if (error.response) {
        data.formErrors = error.response.data.errors;
        if (error.response.status == 422) {
          data.formErrors = error.response.data.errors;
          if (
            data.formErrors.mobile ==
            "کاربری با این شماره موبایل وجود ندارد، لطفا ثبت نام کنید."
          )
            changeMode("register");
        }
      }
    })
    .then(() => {
      data.loading = false;
    });
}

async function changePasswordVerifyMobileToken() {
  data.loading = true;
  data.formErrors = {};
  await auth
    .verifyMobileToken(data.user.mobile, data.user.token)
    .then(async (res) => {
      changeMode("changePassword");
    })
    .catch(function (error) {
      if (error.response) {
        data.formErrors = error.response.data.errors;
        if (error.response.status == 422) {
          data.formErrors = error.response.data.errors;
        }
      }
    })
    .then(() => {
      data.loading = false;
    });
}

async function verifyMobileNumberToken() {
  data.loading = true;
  data.formErrors = {};
  await auth
    .verifyMobileToken(data.user.mobile, data.user.token)
    .then(async (res) => {
      const user = await auth.fetchUser();
      auth.hideLoginform();
      emitter.emit("notif", { text: "با موفقیت وارد شدید." });
    })
    .catch(function (error) {
      if (error.response) {
        data.formErrors = error.response.data.errors;
        if (error.response.status == 422) {
          data.formErrors = error.response.data.errors;
        }
      }
    })
    .then(() => {
      data.loading = false;
    });
}

function changePassword() {
  data.loading = true;
  data.formErrors = {};
  const changePassData = [
    data.user.mobile,
    data.user.token,
    data.user.password,
    data.user.password_confirmation,
  ];

  auth
    .changePasswordByMobileToken(...changePassData)
    .then(async (res) => {
      data.mode = "passwordChanged";
      emitter.emit("notif");
    })
    .catch(function (error) {
      if (error.response) {
        data.formErrors = error.response.data.errors;
        if (error.response.status == 422) {
          data.formErrors = error.response.data.errors;
        }
      }
    })
    .then(() => {
      data.loading = false;
    });
}

async function logout() {
  emitter.emit("notif", { text: "exit" });
  data.loading = true;
  await auth.logout();
  data.loading = false;
  auth.hideLoginform();
  if (route.meta.requireAuth) router.push("/");
}

function changeMode(newMode) {
  (data.formErrors = {}), (data.mode = newMode);
}
</script>