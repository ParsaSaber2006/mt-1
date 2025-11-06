<template>
  <v-card elevation="0" class="pt-2 mt-3 rounded-xl" style="">
    <v-card-text>
      <v-container>
        <div v-if="auth.isLogedIn" class="mb-10">
          <v-fade-transition leave-absolute>
            <v-row justify="center" v-if="!commentStored">
              <v-col md="12">
                <v-textarea rounded="xl" color="primary" label="نظر شما:" variant="outlined" rows="6"
                  v-model="commentBody" class="mb-n18 border- " />
                <div class="text-end px-5">
                  <v-btn color="primary" :disabled="!commentBody" :loading="loading" rounded variant="outlined"
                    @click="storeComment">ثبت نظر</v-btn>
                </div>
              </v-col>
            </v-row>

          </v-fade-transition>
          <v-fade-transition>
            <v-row justify="center" v-if="commentStored">
              <v-col md="12">
                <v-alert type="success" rounded="xl">
                  کاربر گرامی؛ نظر شما با موفقیت ثبت شد و پس از تایید توسط مدیر
                  سیستم نمایش داده خواهد شد.
                </v-alert>
              </v-col>
            </v-row>
          </v-fade-transition>
        </div>
        <div v-if="!auth.isLogedIn" class="mb-10">
          <v-alert type="info" variant="tonal" :icon="false" class="text-center">
            <span class="text-h6 d-block"> برای ثبت نظر ابتدا باید وارد شوید.</span>
            <br>
            <v-btn variant="outlined" @click="auth.showLoginForm()">
              ورود به سامانه
            </v-btn>
          </v-alert>
        </div>
        <v-row>
          <v-col>
            <div>سایر نظرات: </div>
          </v-col>
        </v-row>
        <v-row v-if="comments.length == 0">
          <v-col>
            هنوز هیچ نظری ثبت نشده است.
          </v-col>
        </v-row>
        <v-row v-for="comment in comments">
          <v-col cols="2">
            <v-img src="/images/profile-holder.png" cover class="rounded-circle" />
          </v-col>
          <v-col cols="10">
            <div class="text-primary">
              {{ comment.user.name }}
              <span class="pa-2 text-grey-lighten-1">{{ comment.created_ago }}</span>
            </div>
            <div style="white-space: pre-line;" class="pa-2 pre-formatted text-justify">{{ comment.body }}</div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>


<script>
import persianDate from "persian-date";
import { useAuthStore } from "@/store/auth";

export default {
  metaInfo() {
  },
  name: "advisor-comments",
  props: ["advisor"],
  inject: ["optionsStore"],
  data() {
    return {
      loading: false,
      commentBody: "",
      comments: [],
      commentStored: false,
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

  methods: {
    async storeComment() {
      this.loading = true;
      const formData = {
        user_id: this.user.id,
        comment_body: this.commentBody,
      }
      const { data } = await axios.post(`/api/comments/advisor/${this.advisor.id}`, formData)
      if (data.success) {
        alert("نظر شما ثبت شد، بعد از تایید مدیر نمایش داده خواهد شد.")
        this.commentBody = ""
        this.commentStored = true;
      }
      this.loading = false;

    },
    async getComments() {
      this.loading = true;
      const { data } = await axios.get(`/api/comments/advisor/${this.advisor.id}`);
      this.comments = data.data;
      this.loading = false;
      // this.analysOnline(this.advisor.schedule);
    },
  },
  mounted() {
    this.getComments();
  }

};
</script>

<style scoped></style>