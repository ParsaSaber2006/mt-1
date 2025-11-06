<template>
  <div>
    <v-container>
      <v-row class="justify-center">
        <v-col cols="6" sm="4" md="4" lg="3">
          <v-card elevation="4" class="rounded-xl">
            <v-card-text>
              <v-img :src="user.img_url" class="rounded-circle border" cover aspect-ratio="1" />
              <div class="mt-3">
                <div class="mb-2">
                  <strong>{{ user.name }}</strong>
                </div>
                <div class="mb-2">
                  <strong>نقش ها: </strong>

                  <v-chip size="x-small">کاربر</v-chip>

                  <span v-for="role in user.roles" :key="role" class="ms-1">
                    <v-chip size="x-small">
                      {{
                {
                  advisor: "مشاور",
                  marketer: "بازاریاب",
                  admin: "ادمین",
                }[role]
              }}
                    </v-chip>
                  </span>
                </div>
                <div>
                  <strong>تاریخ عضویت: </strong>
                  {{ user.created_at_fa_f }}
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="8" md="8" lg="9">
          <template v-for="(operation, opTitle) in operations" :key="opTitle">
            <v-row v-if="operation.role == 'user' || auth.hasRole(operation.role)" class="mb-10">
              <v-col cols="12">
                <v-sheet class="text-center pa-5 rounded-xl" elevation="5">
                  {{ operation.title }}
                </v-sheet>
              </v-col>
              <v-col cols="6" sm="6" md="4" lg="3" v-for="action in operation.actions" :key="action">
                <v-hover>
                  <template v-slot:default="{ isHovering, props }">
                    <v-sheet v-bind="props" class="rounded-xl pa-5 h-100" elevation="2"
                      :color="isHovering ? 'primary' : undefined">
                      <div class="text-center mb-1">
                        <v-icon size="xx-large">{{ action.icon }}</v-icon>
                      </div>
                      <div>
                        <v-btn block variant="text" :to="action.to" class="py-10 rounded-xl">
                          {{ action.title }}
                        </v-btn>
                      </div>
                    </v-sheet>
                  </template>
                </v-hover>
              </v-col>
            </v-row>
          </template>

          <div v-for="(operation, opTitle) in operations" :key="opTitle" v-if="false">
            <card :title="operation.title" class="mb-4">
              <v-list nav>
                <v-list-item v-for="action in operation.actions" :key="action" color="primary" :to="action.to"
                  append-icon="mdi-chevron-left" :prepend-icon="action.icon" :title="action.title"></v-list-item>
              </v-list>
            </card>
          </div>
          <div v-if="false">
            <card title="مدیر سیستم" v-if="auth.isAdmin">
              <v-list nav>
                <v-list-item-subtitle>
                  مدیریت کاربران و مشاورین
                </v-list-item-subtitle>
                <v-list-item color="primary" :to="{ name: 'admin.categories' }" append-icon="mdi-chevron-left"
                  prepend-icon="mdi-format-list-bulleted-type" title="مدیریت دسته بندی مشاورین" />
                <v-list-item color="primary" :to="{ name: 'admin.users' }" append-icon="mdi-chevron-left"
                  prepend-icon="mdi-account-multiple" title="مدیریت کاربران" />
                <v-list-item color="primary" :to="{ name: 'admin.advisors' }" append-icon="mdi-chevron-left"
                  prepend-icon="mdi-account-multiple-outline" title="مدیریت مشاورین" />

                <v-list-item-subtitle> تماس ها </v-list-item-subtitle>
                <v-list-item color="primary" :to="{ name: 'admin.calls' }" append-icon="mdi-chevron-left"
                  prepend-icon="mdi-phone-log" title="تماس ها" />

                <v-list-item-subtitle>تنظیمات عمومی سیستم
                </v-list-item-subtitle>
                <v-list-item color="primary" :to="{ name: 'admin.options' }" append-icon="mdi-chevron-left"
                  prepend-icon="mdi-cog" title=" تنظیمات سیستم" />

                <v-list-item-subtitle> محتوا </v-list-item-subtitle>
                <v-list-item color="primary" :to="{ name: 'admin.pages' }" append-icon="mdi-chevron-left"
                  prepend-icon="mdi-file-multiple" title=" صفحات" />
              </v-list>
            </card>

            <card title="مشاور" class="mt-4" v-if="auth.isAdvisor">
              <v-list nav>
                <v-list-item-subtitle> تماس ها و مراجعات </v-list-item-subtitle>
                <v-list-item color="primary" :to="{ name: 'advisor.calls' }" append-icon="mdi-chevron-left"
                  prepend-icon="mdi-format-list-bulleted-type" title="تماس های من" />
                <v-list-item color="primary" :to="{ name: '' }" append-icon="mdi-chevron-left" prepend-icon=""
                  title="" />
                <v-list-item color="primary" :to="{ name: 'advisor.callRequests' }" append-icon="mdi-chevron-left"
                  prepend-icon="mdi-clock-in" title="تماس های رزرو شده" />
              </v-list>
            </card>

            <card title="بازاریاب" class="mt-4" v-if="auth.isMarketer">
              <v-list nav>
                <v-list-item color="primary" :to="{ name: 'marketer.affiliatedUsers' }" append-icon="mdi-chevron-left"
                  prepend-icon="mdi-account-multiple-plus-outline" title="کاربران ثبت نام شده" />
              </v-list>
            </card>

            <card title="کاربر" class="mt-4" v-if="auth.isMarketer">
              <v-list nav>
                <v-list-item color="primary" :to="{ name: 'profile' }" append-icon="mdi-chevron-left"
                  prepend-icon="mdi-account-edit" title="نمایه کاربری" />
              </v-list>
            </card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { useAuthStore } from "../../store/auth";
export default {
  data() {
    return {
      operations: {
        admin: {
          title: "مدیر سیستم",
          role: "admin",
          actions: [
            {
              to: { name: "admin.categories" },
              icon: "mdi-format-list-bulleted-type",
              title: "دسته بندی مشاورین",
            },
            {
              to: { name: "admin.users" },
              icon: "mdi-account-multiple",
              title: " کاربران",
            },
            {
              to: { name: "admin.advisors" },
              icon: "mdi-account-multiple-outline",
              title: " مشاورین",
            },
            {
              to: { name: "admin.calls" },
              icon: "mdi-phone-log",
              title: "تماس ها",
            },
            {
              to: { name: "admin.options.template" },
              icon: "mdi-cog",
              title: "تنظیمات سیستم",
            },
            {
              to: { name: "admin.pages" },
              icon: "mdi-file-multiple",
              title: "صفحه ها",
            },
            {
              to: { name: "admin.posts" },
              icon: "mdi-file-multiple",
              title: " مقالات",
            },
            {
              to: { name: "admin.posts.categories" },
              icon: "mdi-file-multiple",
              title: "دسته بندی مقالات",
            },
            {
              to: { name: "admin.applyAsAdvisorRequests" },
              icon: "mdi-file-multiple",
              title: "درخواست های همکاری مشاورین",
            },
            // {
            //   to: { name: "admin.discounts.all" },
            //   icon: "mdi-sale",
            //   title: "کدهای تخفیف",
            // },
          ],
        },
        advisor: {
          title: "مشاور",
          role: "advisor",
          actions: [
            {
              to: { name: "advisor.calls" },
              icon: "mdi-format-list-bulleted-type",
              title: "تماس های من",
            },
            {
              to: { name: "advisor.myContacts" },
              icon: "mdi-account-group",
              title: "مخاطبین من",
            },
            {
              to: { name: "advisor.callRequests" },
              icon: "mdi-clock-in",
              title: "تماس های رزرو شده",
            },
            {
              to: { name: "advisor.schedules" },
              icon: "mdi-account-convert",
              title: "برنامه زمان بند ی من",
            },
          ],
        },
        marketer: {
          title: "بازاریاب",
          role: "marketer",
          actions: [
            {
              to: "",
              icon: "mdi-chart-line",
              title: "آمار و اطلاعات",
            },
            {
              to: { name: "marketer.affiliatedUsers" },
              icon: "mdi-account-multiple-plus-outline",
              title: "کاربران ثبت نام شده",
            },
          ],
        },
        user: {
          title: "کاربر",
          role: 'user',
          actions: [
            {
              to: { name: "profile" },
              icon: "mdi-account-edit",
              title: "پروفایل کاربری",
            },
            {
              to: { name: "wallet" },
              icon: "mdi-wallet",
              title: "کیف پول",
            },
            {
              to: { name: "history" },
              icon: "mdi-phone-log",
              title: "تاریخچه تماس",
            },
            {
              to: "",
              icon: "mdi-clock-out",
              title: "تماس های رزرو شده",
            },
            {
              to: "",
              icon: "mdi-folder-account",
              title: "پرونده های من",
            },
          ],
        },
      },
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    user() {
      return this.auth.user;
    },
  },
};
</script>

<style scope>
.v-list>.v-list-item-subtitle {
  font-size: 1rem;
  margin-top: 20px;
  margin-bottom: 5px;
  display: none;
}
</style>