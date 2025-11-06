<template >
  <v-dialog v-model="dialog" persistent>
    <v-container>
      <v-row justify="center">
        <v-col class="py-0 ma-0" md="8">
          <card :loading="loading" title="ایجاد پست جدید">
            <v-card-text>
              <v-container>
                <v-row class="pa-0 my-0">
                  <v-col class="py-0 ma-0" cols="12">
                    <v-text-field
                      density="compact"
                      rounded
                      variant="outlined"
                      label="عنوان"
                      required
                      v-model="post.title"
                      :error-messages="formErrors.title"
                    ></v-text-field>
                    <v-select
                      density="compact"
                      rounded
                      variant="outlined"
                      label="کد دسته بندی"
                      required
                      item-title="name"
                      item-value="id"
                      :items="categories"
                      v-model="post.category_id"
                      :error-messages="formErrors.category_id"
                    ></v-select>
                  </v-col>
                </v-row>
         
                <v-row>
                  <v-col>
                    <h4 class="text-gray">متن</h4>
                    <text-editor v-model="post.body" rows="100" />
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
  </v-dialog>
</template>


<script>
export default {
  name: "create-post",
  components: {},
  data() {
    return {
      loading: false,
      dialog: true,
      post: {},
      formErrors: {},
      categories: [],
    };
  },
  methods: {
    async create() {
      this.loading = true;
      axios
        .post(`/api/posts`, this.post)
        .then((res) => {
          this.$emit("created", this.post);
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
    async getCategories() {
      const {data} = await axios.get('/api/categories',{
            params:{
                type:'posts'
            }
        })
      this.categories = data.data;
    },
  },
  async mounted() {
    this.getCategories();
  },
};
</script>