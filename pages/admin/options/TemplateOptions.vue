<template>
  <div>
    <card :loading="loading" class="rounded">
      <v-card-text>
        <v-container>
          <v-row class="mb-2">
            <v-col>
              <h4 class="text-h6 text-primary">محتوای صفحه نخست</h4>
              <v-divider class="mt-1" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="text-caption">
                صفحه مورد نظر خود برای نمایش در صفحه خانه را از لیست زیر انتخاب
                کنید:
              </div>
              <br />

              <v-select
                v-model="siteOptions.homepage"
                :items="pages"
                item-title="title"
                item-value="slug"
                label="صفحه نخست"
                persistent-hint
                single-line
                :loading="pagesLoading"
                density="compact"
                variant="outlined"
                hint="برای مدیریت محتوا و تعریف صفحه جدید به بخش 'صفحه ها' مراجعه کنید"
                rounded
              ></v-select>
              <div v-if="false" class="text-center pa-10">
                <v-btn
                  :to="{ name: 'admin.elementor' }"
                  color="primary"
                  prepend-icon="mdi-pencil"
                  >مدیریت محتوای صفحه اول</v-btn
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
                label="عنوان سایت"
                v-model="siteOptions.sitename"
                density="compact"
                variant="outlined"
                rounded
              />
            </v-col>
          </v-row>
          <v-row class="pa-0 my-0">
            <v-col class="py-0 ma-0" cols="12" sm="12">
              <v-text-field
                density="compact"
                label="توضیح درباره سایت"
                v-model="siteOptions.site_description"
                variant="outlined"
                rounded
              />
            </v-col>
          </v-row>
          <v-row class="mb-2">
            <v-col>
              <h4 class="text-h6 text-primary">انتخاب فونت</h4>
              <v-divider class="mt-1" />
            </v-col>
          </v-row>
          <v-row class="pa-0 my-0">
            <v-col class="py-0 ma-0" cols="12" sm="6">
              <v-select
                :items="[
                  'font-vazir',
                  'font-iransans',
                  'font-yekan',
                  'font-iranyekan',
                  'font-kalameh',
                  'font-morabba',
                  'font-yekanbakh',
                ]"
                v-model="siteOptions.fontname"
                density="compact"
                variant="outlined"
                rounded
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
                    rounded="xl"
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

          <v-row class="mb-2">
            <v-col>
              <h4 class="text-h6 text-primary">تنظیمات متفرقه</h4>
              <v-divider class="mt-1" />
            </v-col>
          </v-row>

          <v-row class="pa-0 my-0">
            <v-col class="py-0 ma-0" cols="12" sm="6">
              <v-checkbox
                label="فعال بودن رزرو مشاوره"
                v-model="siteOptions.enable_reservation"
                density="compact"
                variant="outlined"
                rounded
              />
            </v-col>
          </v-row>
          <v-row class="pa-0 my-0">
            <v-col class="py-0 ma-0" cols="12">
              <v-textarea
                label="قوانین ثبت نام"
                v-model="siteOptions.registration_rules"
                density="compact"
                variant="outlined"
                rounded="xl"
              />
            </v-col>
          </v-row>
          <v-row class="pa-0 my-0">
            <v-col class="py-0 ma-0" cols="12">
              <v-textarea
                label="قوانین همکاری مشاورین"
                v-model="siteOptions.apply_advisor_rules"
                density="compact"
                variant="outlined"
                rounded="xl"
              />
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
        >
          ثبت
        </v-btn>
      </v-card-actions>
    </card>
    <card title="لوگو اصلی سایت" class="mt-2">
      <media-uploader
        name="siteLogo"
        :thumb_url="medias.siteLogo"
        @uploaded="mediaUploaded"
      />
    </card>
    <card title="آیکن وب سایت (favicon) " class="mt-2">
      <media-uploader
        name="favicon"
        :thumb_url="medias.favicon"
        @uploaded="mediaUploaded"
      />
    </card>
  </div>
</template>


<script>
import { useAuthStore } from "@/store/auth";
import { useOptionsStore } from "@/store/options";
import MediaUploader from "./MediaUploader.vue";
import { useTheme } from "vuetify/lib/framework.mjs";

export default {
  name: "options",
  components: { MediaUploader },

  data() {
    return {
      pagesLoading: false,
      loading: false,
      siteOptions: {},
      pages: [],
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
    async getPages() {
      this.pagesLoading = true;
      const { data } = await axios.get("/api/pages");
      this.pages = data.data;
      this.pagesLoading = false;
    },
    mediaUploaded() {},
    setTheme(theme) {
      this.theme.global.name.value = theme;
    },
  },
  mounted() {
    this.getOptions();
    this.getPages();
  },
};
</script>