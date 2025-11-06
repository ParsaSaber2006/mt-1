<template >
    <v-container>
      <v-row justify="center">
        <v-col class="py-0 ma-0" md="8">
          <card :loading="loading" title="ایجاد دسته بندی جدید">
            <v-card-text>
              <v-container>
                <v-row class="pa-0 my-0">
                  <v-col class="py-0 ma-0" cols="12">
                    <v-text-field
                      density="compact"
                      rounded
                      variant="outlined"
                      label="نام"
                      required
                      v-model="category.name"
                      :error-messages="formErrors.name"
                    ></v-text-field>
                    <v-text-
                      density="compact"
                      rounded
                      variant="outlined"
                      label="توضیح مختصر"
                      required
                      v-model="category.short_description"
                      :error-messages="formErrors.short_description"
                    ></v-text->
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <h4 class="text-gray">توضیحات بیشتر</h4>
                    <text-editor v-model="category.description"></text-editor>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="create"
                :loading="loading"
              >
                ثبت
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="cancel">
                انصراف
              </v-btn>
            </v-card-actions>
          </card>
        </v-col>
      </v-row>
    </v-container>
</template>


<script>
import TextEditor from "@/components/appComponents/TextEditor.vue";

export default {
  name: "create-category",
  components: {},
  data() {
    return {
      loading: false,
      dialog: true,
      category: {},
      formErrors: {},
    };
  },
  methods: {
    async create() {
      this.loading = true;
      
      this.category.type = 'advisors',
      axios
        .post(`/api/categories`, this.category)
        .then((res) => {
          this.$emit("created", this.category);

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