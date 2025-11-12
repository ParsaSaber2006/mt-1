<template>
  <div v-if="!auth.isLogedIn">
    <v-form @submit.prevent="$emit('register')">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="10" class="pa-0">
            <div class="text-subtitle-1 text-medium-emphasis">
              شماره تلفن همراه
            </div>
            <v-text-field
              :error-messages="formErrors.mobile"
              density="compact"
              variant="outlined"
              rounded
              required
              v-model="data.user.mobile"
              maxlength="11"
              hint="09xxxxxxxxx"
              autocomplete="off"
            />
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12" sm="10" class="pa-0">
            <div class="text-subtitle-1 text-medium-emphasis">نام</div>
            <v-text-field
              :error-messages="formErrors.firstname"
              density="compact"
              variant="outlined"
              rounded
              required
              v-model="data.user.firstname"
              autocomplete="off"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" sm="10" class="pa-0">
            <div class="text-subtitle-1 text-medium-emphasis">نام خانوادگی</div>
            <v-text-field
              :error-messages="formErrors.lastname"
              density="compact"
              variant="outlined"
              rounded
              required
              v-model="data.user.lastname"
              autocomplete="off"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" sm="10" class="pa-0" hide-details>
            <div class="text-subtitle-1 text-medium-emphasis">رمز عبور</div>
            <v-text-field
              type="password"
              :error-messages="formErrors.password"
              density="compact"
              variant="outlined"
              rounded
              multiple
              v-model="data.user.password"
              autocomplete="off"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" sm="10" class="pa-0" hide-details>
            <div class="text-subtitle-1 text-medium-emphasis">
              تکرار رمز عبور
            </div>
            <v-text-field
              type="password"
              :error-messages="formErrors.password_confirmation"
              density="compact"
              variant="outlined"
              rounded
              multiple
              v-model="data.user.password_confirmation"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="10" class="pa-0 ps-5" hide-details>
            <v-checkbox
              v-model="data.user.rules_aggree"
              :error-messages="formErrors.rules_aggree"
            >
              <template v-slot:label>
                <div>
                  <v-dialog close-on-content-click>
                    <template v-slot:default="{ isActive }">
                      <v-card rounded>
                        <v-card-title>قوانین سامانه</v-card-title>
                        <v-card-text>
                          <v-textarea
                            rounded="xl"
                            rows="10"
                            readonly
                            variant="outlined"
                            :value="registeration_rules"
                          />
                          <div class="text-end">
                            <v-btn
                              class=""
                              rounded
                              color="primary"
                              @click="isActive = false"
                              >بستن</v-btn
                            >
                          </div>
                        </v-card-text>
                      </v-card>
                    </template>
                    <template v-slot:activator="{ props }">
                      <a href="/" target="_blank" v-bind="props" @click.prevent>
                        قوانین
                      </a>
                    </template>
                  </v-dialog>
                  سامانه را می‌پذیرم
                </div>
              </template>
            </v-checkbox>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" sm="10" class="pa-0 pt-2" hide-details>
            <v-btn
              block
              variant="tonal"
              color="primary"
              type="submit"
              :loading="loading"
              :disabled="loading"
              size="large"
              rounded
            >
              ثبت نام
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <div class="text-center">
      <v-btn
        variant="text"
        class="text-blue text-decoration-none"
        @click="changeMode('login')"
        rel="noopener noreferrer"
        prepend-icon="mdi-chevron-right"
        target="_blank"
      >
        اگر قبلا ثبت نام کرده‌اید اینجا کلیک کنید
      </v-btn>
    </div>
  </div>
</template>
<script setup>
import {
  reactive,
  onMounted,
  defineEmits,
  watch,
  defineProps,
  inject,
  computed,
} from "vue";
import { useAuthStore } from "@/stores/auth";

const optionsStore = inject("optionsStore");
const registeration_rules = computed(() =>
  optionsStore.value.get(
    "registration_rules",
    "قوانین سامانه را از تنظیمات فعال نمایید"
  )
);

const emit = defineEmits(["changeMode", "register"]);
const auth = useAuthStore();

const data = reactive({
  mode: "enterData",
  user: {
    mobile: "",
    national_code: "",
    token: "",
  },
});

const props = defineProps(["user", "loading", "formErrors"]);

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