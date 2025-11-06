<template>
  <v-dialog v-model="dialog" persistent max-width="765px" >
    <card :loading="loading" title="ایجاد دسته بندی جدید"  >
      <v-card-text>
        <v-container>
          <v-row justify="center" >
            <v-col class="py-0 ma-0" md="8">
              <v-container>
                <v-row class="pa-0 my-0">
                  <v-col class="py-0 ma-0" cols="12">
                    <v-text-field density="compact" rounded variant="outlined" label="نام" required
                      v-model="category.name" :error-messages="formErrors.name"></v-text-field>
                    <v-text-field density="compact" rounded variant="outlined" label="توضیح مختصر" required
                      v-model="category.short_description"
                      :error-messages="formErrors.short_description"></v-text-field>
                    <v-select label="زیردسته ها" chips closable-chips rounded variant="outlined" density="compact"
                      :items="allTags" item-value="name" item-title="name" multiple v-model="category.tags" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <h4 class="text-gray">میزان زمان های مشاوره</h4>
                    <text-editor v-model="category.call_times"></text-editor>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <h4 class="text-gray">توضیحات بیشتر</h4>
                    <text-editor v-model="category.description"></text-editor>
                  </v-col>
                </v-row>
              </v-container>
              <div></div>

              <v-spacer></v-spacer>
              <v-btn color="primary" rounded class="me-1" @click="create" :loading="loading">
                ثبت
              </v-btn>
              <v-btn color="warning" rounded variant="outlined" @click="cancel">
                انصراف
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </card>
  </v-dialog>
</template>


<script>
import TextEditor from "@/components/appComponents/TextEditor.vue";
import { useRouter } from "vue-router";

export default {
  name: "create-category",
  components: {},
  data() {
    return {
      loading: false,
      dialog: true,
      category: {},
      formErrors: {},
      allTags: [],
    };
  },
  computed: {
    router() {
      return useRouter();
    }
  },
  methods: {
    async create() {
      this.loading = true;
      this.category.type = 'advisors',
        axios
          .post(`/api/categories`, this.category)
          .then((res) => {
            this.$emit("created", this.category);
            this.$router.push({ name: "admin.categories.edit", params: { category_id: res.data.data.id } })
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
    async getAllTags() {
      this.loading = true;
      const { data } = await axios.get("/api/tags", {
        params: {
          type: 'categories',
        }
      })
      this.allTags = data.data;
      this.loading = false;

    }
  },
  async mounted() {
    this.getAllTags();
  },
};
</script>