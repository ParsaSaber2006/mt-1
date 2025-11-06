<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <card title="ویرایش صفحه">
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
                  <v-col class="py-0 ma-0 " cols="12" sm="6" >
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
                <v-row>
                  <v-col class="text-end">
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="save" :loading="loading">
                      ثبت
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["page_slug"],
  data: () => {
    return { loading: true, page: {}, elements: [], formErrors: {} };
  },
  methods: {
    async save(elements) {
      this.loading = true;
      try {
        const { data } = await axios.put(
          `/api/pages/${this.page_slug}`,
          this.page
        );
        
        emitter.emit("notif");
      } catch {}
      this.loading = false;
    },
    async getPage() {
      this.loading = true;
      const { data } = await axios.get(`/api/pages/${this.page_slug}`);
      this.page = data.data;
      this.elements = JSON.parse(this.page.content);
      this.loading = false;
    },
  },
  mounted() {
    this.getPage();
  },
};
</script>