<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="4" md="4">
          <card>
            <v-img :src="user.img_url" />
            <div class="mt-1">
              <div>
                <strong>{{ user.name }}</strong>
              </div>
              <div>
                <strong>نقش ها: </strong>
                <span v-for="role in user.roles" :key="role" class="ms-1">
                  {{
                    { advisor: "مشاور", marketer: "بازاریاب", admin: "ادمین" }[
                      role
                    ]
                  }}
                  &nbsp;،
                </span>
              </div>
            </div>
          </card>
        </v-col>
        <v-col cols="12" sm="8" md="8">
          <card title="مدیر سیستم">
            <v-list nav>
              <v-list-item-subtitle>
                مدیریت کاربران و مشاورین
              </v-list-item-subtitle>
              <v-list-item
                color="primary"
                :to="{ name: 'admin.categories' }"
                append-icon="mdi-chevron-left"
                prepend-icon="mdi-format-list-bulleted-type"
                title="مدیریت دسته بندی مشاورین"
              />
              <v-list-item
                color="primary"
                :to="{ name: 'admin.users' }"
                append-icon="mdi-chevron-left"
                prepend-icon="mdi-account-multiple"
                title="مدیریت کاربران"
              />
              <v-list-item
                color="primary"
                :to="{ name: 'admin.advisors' }"
                append-icon="mdi-chevron-left"
                prepend-icon="mdi-account-multiple-outline"
                title="مدیریت مشاورین"
              />

              <v-list-item-subtitle> تماس ها </v-list-item-subtitle>
              <v-list-item
                color="primary"
                :to="{ name: 'admin.calls' }"
                append-icon="mdi-chevron-left"
                prepend-icon="mdi-phone-log"
                title="تماس ها"
              />

              <v-list-item-subtitle>تنظیمات عمومی سیستم </v-list-item-subtitle>
              <v-list-item
                color="primary"
                :to="{ name: 'admin.options' }"
                append-icon="mdi-chevron-left"
                prepend-icon="mdi-cog"
                title=" تنظیمات سیستم"
              />

              <v-list-item-subtitle> محتوا </v-list-item-subtitle>
              <v-list-item
                color="primary"
                :to="{ name: 'admin.pages' }"
                append-icon="mdi-chevron-left"
                prepend-icon="mdi-file-multiple"
                title=" صفحات"
              />
            </v-list>
          </card>
          
          <card title="مشاور" class="mt-2">
            <v-list nav>
              <v-list-item-subtitle>
                  تماس ها و مراجعات
              </v-list-item-subtitle>
              <v-list-item
                color="primary"
                :to="{ name: 'advisor.calls' }"
                append-icon="mdi-chevron-left"
                prepend-icon="mdi-format-list-bulleted-type"
                title="تماس های من"
              />
              <v-list-item
                color="primary"
                :to="{ name: 'advisor.myContacts' }"
                append-icon="mdi-chevron-left"
                prepend-icon="mdi-format-list-bulleted-type"
                title="مخاطبین من"
              />
              <v-list-item
                color="primary"
                :to="{ name: 'advisor.callRequests' }"
                append-icon="mdi-chevron-left"
                prepend-icon="mdi-format-list-bulleted-type"
                title="درخواست های تماس"
              />
            </v-list>
          </card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { useAuthStore } from "../../store/auth";
export default {
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
.v-list > .v-list-item-subtitle {
  font-size: 1rem;
  margin-top: 20px;
  margin-bottom: 5px;
  display: none;
}
</style>