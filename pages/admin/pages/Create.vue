<template >
  <v-container>
    <v-row>
      <v-col>
        <v-dialog v-model="dialog" persistent scrollable>
          <card :loading="loading" title="ایجاد صفحه جدید">
            <v-card-text>
              <v-container>
                <v-row class="pa-0 my-0">
                  <v-col class="py-0 ma-0" cols="12" sm="6">
                    <v-text-field
                      density="compact"
                      label="عنوان"
                      required
                      v-model="page.title"
                      :error-messages="formErrors.title"
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0 ma-0" cols="12" sm="6">
                    <v-text-field
                      density="compact"
                      label="اسلاگ"
                      required
                      v-model="page.slug"
                      :error-messages="formErrors.slug"
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0 ma-0" cols="12" sm="6">
                    <v-select
                      :items="['page','hook']"
                      label="نوع محتوا"
                      required
                      v-model="page.type"
                      :error-messages="formErrors.type"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="createPage"
                :loading="loading"
              >
                ثبت
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="cancel">
                انصراف
              </v-btn>
            </v-card-actions>
          </card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  name: "create-page",
  data() {
    return {
      loading: false,
      dialog: true,
      page: {},
      formErrors: {},
    };
  },
  methods: {
    async createPage() {
      this.loading = true;
      axios
        .post(`/api/pages`, this.page)
        .then((res) => {
          this.$emit("created", this.page);
          emitter.emit("notif");
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.formErrors = error.response.data.errors;
          }
        })
        .then(() => {
          this.loading = false;
        });
    },
    cancel() {
      this.$emit("cancel");
    },
  },
  async mounted() {},
};
</script>