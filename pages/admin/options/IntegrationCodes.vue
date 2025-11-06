integrationCodes<template >
  <div>
    <card :loading="loading" class="rounded">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col class="bordered">
              <v-sheet>
                <v-text-field
                  density="compact"
                  rounded
                  variant="outlined"
                  v-model="codeTitle"
                  label="عنوان کد - توضیحات"
                />
                <v-textarea
                  rounded="lg"
                  variant="outlined"
                  rows="5"
                  v-model="newCode"
                ></v-textarea>
                <v-select
                  density="compact"
                  rounded
                  variant="outlined"
                  label="افزودن به"
                  :items="['head', 'body']"
                  v-model="codePosition"
                />
                <div>
                  <v-btn @click="addNewCode" color="primary" rounded=""
                    >افزودن</v-btn
                  >
                </div>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </card>
    <card :loading="loading" class="mt-2 rounded">
      <v-card-text>
        <v-container>
          <v-row  class="border-b" v-for="(code, n) in options.integrationCodes" :key="code">
            <v-col>
              <div class="text-grey">{{ code.title }}</div>
              <div class="text-grey">{{ code.position }}</div>
              <v-textarea
                class="small"
                :style="'font-size: 5px !important'"
                rounded="lg"
                variant="outlined"
                rows="2"
                v-model="code.content"
              >
              </v-textarea>
              <div>
                <v-btn
                  @click="options.integrationCodes.splice(n, 1)"
                  color="red"
                  rounded
                  variant="outlined"
                  >حذف</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          variant="flat"
          @click="updateOptions"
          :loading="loading"
          rounded
        >
          ثبت
        </v-btn>
      </v-card-actions>
    </card>
  </div>
</template>


<script>
import { useAuthStore } from "@/store/auth";
import { useOptionsStore } from "@/store/options";
import MediaUploader from "./MediaUploader.vue";

export default {
  name: "options",
  components: { MediaUploader },

  data() {
    return {
      loading: false,
      siteOptions: {},
      newCode: "",
      codePosition: "",
      codeTitle: "",
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    user() {
      return this.auth.user;
    },
    optionsStore() {
      return useOptionsStore();
    },
    options() {
      let obj = this.optionsStore.options;
      return obj;
    },
  },
  methods: {
    async updateOptions() {
      this.loading = true;
      try {
        await this.optionsStore.update(this.options);
        emitter.emit("notif");
      } catch (err) {
        console.log(err);
      }
      this.loading = false;
    },
    getOptions() {
      this.loading = true;
      let obj = JSON.parse(JSON.stringify(this.optionsStore.options));
      this.siteOptions = obj;
      this.medias = obj.medias;
      this.loading = false;
    },
    addNewCode() {
      if (this.options.integrationCodes == "") {
        this.options["integrationCodes"] = [];
      }
      this.options.integrationCodes.push({
        content: this.newCode,
        title: this.codeTitle,
        position: this.codePosition,
      });
    },
  },
  mounted() {
    this.getOptions();
  },
};
</script>