<template >
  <v-card elevation="5" class="" :loading="loading" height="100%">
    <v-card-text>
      <v-slide-y-reverse-transition
        :hide-on-leave="true"
        :leave-absolute="true"
      >
        <v-container v-if="!prepareToCall">
          <v-row justify="center">
            <v-col cols="6">
              <v-sheet color="" width="100%">
                <v-img
                  :src="advisor.img_url"
                  :aspect-ratio="1"
                  cover
                  :class="{ filtered: !advisor.online }"
                >
                </v-img>
              </v-sheet>
            </v-col>
            <v-col cols="12">
              <v-sheet
                class="d-flex flex-wrap"
                style="height: 100%"
                min-height="100px"
              >
                <v-sheet width="100%">
                  <h3 class="">
                    <small class="text-grey">{{ advisor.title }}</small>
                    {{ advisor.name }}
                  </h3>
                  <h4 class="text-grey">{{ advisor.job_title }}</h4>
                  <div class="pa-2 text-grey text-justify">
                    {{ advisor.description }}
                  </div>
                </v-sheet>
                <v-sheet class="align-self-end" align="left" width="100%">
                  <v-btn
                    :loading="loading"
                    color="primary"
                    variant="tonal"
                    append-icon="mdi-phone"
                    class="me-1"
                    @click="prepare"
                    :disabled="callCenter.isBusy"
                    >ارتباط</v-btn
                  >
                  <v-btn
                    :to="{
                      name: 'advisor',
                      params: { advisorId: +advisor.id },
                    }"
                    color="green"
                    variant="tonal"
                    >مشاهده</v-btn
                  >
                </v-sheet>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-slide-y-reverse-transition>

      <v-slide-y-transition :hide-on-leave="true" :leave-absolute="true">
        <v-container v-if="prepareToCall">
          <v-row justify="center">
            <v-col cols="6">
              <v-sheet color="" width="100%">
                <v-img :src="advisor.img_url" :aspect-ratio="1" cover></v-img>
              </v-sheet>
            </v-col>
            <v-col cols="12">
              <v-sheet
                class="d-flex flex-wrap"
                style="height: 100%"
                min-height="100px"
                color="transparent"
              >
                <v-sheet width="100%" color="transparent">
                  <h3 class="text-primary text-center">
                    <small class="text-grey">{{ advisor.title }}</small>
                    {{ advisor.name }}
                  </h3>
                  <h4 class="text-center">{{ advisor.job_title }}</h4>
                  <div class="pa-2 details" v-if="false">
                    <div class="">
                      <strong class="text-black">حداقل زمان مکالمه:</strong>
                      {{ advisor.min_call_time }}
                      دقیقه -
                      {{ minTimeAmount.toLocaleString() }}
                      تومان
                    </div>
                    <div class="">
                      <strong>حداکثر زمان مکالمه:</strong>
                      {{ advisor.max_call_time }}
                      دقیقه -
                      {{ maxTimeAmount.toLocaleString() }}
                      تومان
                    </div>
                  </div>
                </v-sheet>
                <v-sheet
                  class="py-10"
                  align="center"
                  width="100%"
                  color="transparent"
                >
                  <v-btn
                    :loading="loading"
                    color="green-darken-1"
                    :disabled="callCenter.isBusy"
                    append-icon="mdi-phone"
                    @click="call(advisor.id)"
                    >شروع تماس</v-btn
                  >
                  <v-btn
                    color="red-lighten-1"
                    style="min-width: 40px"
                    class="ms-1 px-0"
                    :disabled="callCenter.isBusy || loading"
                    @click="cancelPrepare"
                    ><v-icon class="px-0 mx-0">mdi-close</v-icon></v-btn
                  >
                </v-sheet>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-slide-y-transition>
    </v-card-text>
    <v-snackbar
      v-model="snackbar.enable"
      :color="snackbar.color"
      height="100px"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn
          icon="mdi-window-close"
          color="white"
          variant="text"
          @click="snackbar.enable = false"
        >
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script >
import { useAuthStore } from "@/store/auth";
import { useCallCenterStore } from "@/store/callCenter";

export default {
  props: ["advisor", "selected_advisor"],
  data: () => {
    return {
      loading: false,
      overlay: false,
      calling: false,
      snackbar: {
        enable: false,
        text: "",
        color: "red",
        timeout: 2000,
      },
    };
  },
  computed: {
    auth: () => {
      return useAuthStore();
    },
    callCenter: () => {
      return useCallCenterStore();
    },
    prepareToCall() {
      return this.selected_advisor == this.advisor.id;
    },
    minTimeAmount() {
      return (
        this.advisor.entrance_fee +
        this.advisor.credit_ratio * this.advisor.min_call_time
      );
    },
    maxTimeAmount() {
      return (
        this.advisor.entrance_fee +
        this.advisor.credit_ratio * this.advisor.max_call_time
      );
    },
  },

  methods: {
    prepare() {
      this.$emit("selected", this.advisor.id);
    },
    cancelPrepare() {
      this.$emit("cancelSelect", this.advisor.id);
    },
    showError(message) {
      this.snackbar.text = message;
      this.snackbar.enable = true;
      this.snackbar.color = "red";
      this.snackbar.timeout = 3000;
    },
    showSuccess(message) {
      this.snackbar.text = message;
      this.snackbar.enable = true;
      this.snackbar.color = "green";
      this.snackbar.timeout = 5000;
    },
    async call(advisorId) {
      if (!this.auth.isLogedIn) {
        this.showError("ابتدا باید وارد شوید");
        return false;
      }

      this.loading = true;
      const { success, message } = await this.callCenter.startCall(advisorId);
      if (success) this.showSuccess(message);
      else this.showError(message);
      this.loading = false;
    },
  },
  mounted() {},
};
</script>

<style scope>
.details {
  font-size: 0.6rem;
}

.filtered {
  filter: grayscale(80%);
}
</style>