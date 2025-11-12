<template >
  <v-container>
    <v-row justify="center">
      <v-col title="py-0 ma-0" md="12">
        <card :loading="loading">
          <v-card-text>
            <v-container>
              <v-row class="mb-2">
                <v-col>
                  <h4 class="text-h6 text-primary">
                    محتوای صفحه نخست و منو ها
                  </h4>
                  <v-divider class="mt-1" />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  برای مدیریت محتوای صفحه نخست روی کلید زیر کلیک کنید:
                  <br />
                  <div class="text-center pa-10">
                    <v-btn
                      :to="{ name: 'admin.elementor' }"
                      color="primary"
                      prepend-icon="mdi-pencil"
                      >مدیریت محتوای صفحه اول</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  تنظیم منو اصلی سایت:
                  <br />
                  <div class="text-center pa-10">
                    <v-btn
                      to="/admin/options/menuBuilder/mainMenu"
                      color="primary"
                      prepend-icon="mdi-pencil"
                      >منو اصلی سایت</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
              <v-row class="mb-2">
                <v-col>
                  <h4 class="text-h6 text-primary">هویت وب سایت</h4>
                  <v-divider class="mt-1" />
                </v-col>
              </v-row>

              <v-row class="pa-0 my-0">
                <v-col class="py-0 ma-0" cols="12" sm="6">
                  <v-text-field
                    density="compact"
                    label="عنوان سایت"
                    v-model="siteOptions.sitename"
                  />
                </v-col>
              </v-row>
              <v-row class="pa-0 my-0">
                <v-col class="py-0 ma-0" cols="12" sm="12">
                  <v-text-field
                    density="compact"
                    label="توضیح درباره سایت"
                    v-model="siteOptions.site_description"
                  />
                </v-col>
              </v-row>

              <v-row class="mb-2">
                <v-col>
                  <h4 class="text-h6 text-primary">عملیات شارژ و کیف پول</h4>

                  <v-divider class="mt-1" />
                </v-col>
              </v-row>
              <v-row class="pa-0 my-0">
                <v-col class="py-0 ma-0" cols="12" sm="6">
                  <v-text-field
                    density="compact"
                    label="مرچنت زرین پال"
                    v-model="siteOptions.merchantId"
                  />
                </v-col>
              </v-row>
              <v-row class="pa-0 my-0">
                <v-col class="py-0 ma-0" cols="12" sm="6">
                  <v-text-field
                    density="compact"
                    label="حداقل مبغ قابل پرداخت"
                    v-model="siteOptions.wallet_increase_min"
                  />
                </v-col>
                <v-col class="py-0 ma-0" cols="12" sm="6">
                  <v-text-field
                    density="compact"
                    label="حداکثر مبغ قابل پرداخت"
                    v-model="siteOptions.wallet_increase_max"
                  />
                </v-col>
                <v-col class="py-0 ma-0" cols="12" sm="6">
                  <v-text-field
                    density="compact"
                    label="گام مبلغ قابل پرداخت"
                    v-model="siteOptions.wallet_increase_step"
                  />
                </v-col>
              </v-row>
              <v-row class="mb-2">
                <v-col>
                  <h4 class="text-h6 text-primary">تنظیمات شبکه</h4>

                  <v-divider class="mt-1" />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0 ma-0" cols="12" sm="6">
                  <v-text-field
                    density="compact"
                    label="آدرس سرور سیموتل"
                    v-model="siteOptions.simotelUrl"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0 ma-0" cols="12" sm="6">
                  <v-text-field
                    density="compact"
                    label="کلید دسترسی سیموتل"
                    v-model="siteOptions.simotelToken"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0 ma-0" cols="12" sm="6">
                  <v-text-field
                    density="compact"
                    label="نام ترانک"
                    v-model="siteOptions.simotelTrunkName"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0 ma-0" cols="12" sm="6">
                  <v-text-field
                    density="compact"
                    label="هزینه تماس ها در دقیقه"
                    v-model="siteOptions.net_cost_ratio"
                  />
                </v-col>
              </v-row>
              <v-row class="mb-2">
                <v-col>
                  <h4 class="text-h6 text-primary">همکاری در فروش</h4>

                  <v-divider class="mt-1" />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0 ma-0" cols="12" sm="6">
                  <v-text-field
                    density="compact"
                    label="عنوان همکاری در فروش"
                    v-model="siteOptions.affiliateTitle"
                  />
                </v-col>
                <v-col class="py-0 ma-0" cols="12" sm="6">
                  <v-text-field
                    density="compact"
                    label="لینک ارجاع"
                    v-model="siteOptions.afterAffiliateLink"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0 ma-0" cols="12" sm="6">
                  <v-textarea
                    density="compact"
                    label="متن همکاری در فروش"
                    v-model="siteOptions.affiliateText"
                  />
                </v-col>
              </v-row>
              <v-row class="mb-2">
                <v-col>
                  <h4 class="text-h6 text-primary">انتخاب رنگ پنل</h4>

                  <v-divider class="mt-1" />
                </v-col>
              </v-row>
              <v-radio-group v-model="siteOptions.themeName">
                <v-row class="mt-2">
                  <v-col
                    v-for="({ colors }, themeName) in themes"
                    :key="themeName"
                    cols="8"
                    sm="3"
                    md="2"
                  >
                    <template v-for="(color, cName) in colors" :key="color">
                      <v-sheet
                        :color="color"
                        v-if="['primary'].includes(cName)"
                        min-height="20"
                        @click="
                          siteOptions.themeName = themeName;
                          setTheme(themeName);
                        "
                        style="cursor: pointer"
                      >
                      </v-sheet>
                    </template>
                    <v-radio
                      :label="themeName"
                      :value="themeName"
                      @click="setTheme(themeName)"
                    ></v-radio>
                  </v-col>
                </v-row>
              </v-radio-group>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="flat"
              @click="updateOptions"
              :loading="loading"
            >
              ثبت
            </v-btn>
          </v-card-actions>
        </card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <card title="لوگو اصلی سایت">
          <media-uploader
            name="siteLogo"
            :thumb_url="medias.siteLogo"
            @uploaded="mediaUploaded"
          />
        </card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { useAuthStore } from "@/stores/auth";
import { useOptionsStore } from "@/stores/options";
import MediaUploader from "./MediaUploader.vue";
import { useTheme } from "vuetify/lib/framework.mjs";

export default {
  name: "options",
  components: { MediaUploader },

  data() {
    return {
      loading: false,
      siteOptions: {},
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
    medias() {
      let obj = JSON.parse(JSON.stringify(this.optionsStore.options));
      return obj.medias;
    },
    theme() {
      return useTheme();
    },
    themes() {
      return this.theme.themes.value;
    },
  },
  methods: {
    async updateOptions() {
      this.loading = true;
      try {
        await this.optionsStore.update(this.siteOptions);
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
    mediaUploaded() {},
    setTheme(theme) {
      this.theme.global.name.value = theme;
    },
  },
  mounted() {
    this.getOptions();
  },
};
</script>