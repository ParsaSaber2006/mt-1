<template>
  <div>
    <v-sheet v-for="( comment, i) in comments" class="mb-2 rounded pa-2" elevation="5" :loading="loading">
      <div><strong>مشاور: </strong>{{ comment.advisor.name }}</div>
      <div><strong>کاربر: </strong>{{ comment.user.name }}</div>
      <div>{{ comment.created_ago }}</div>
      <div class="pa-1"><strong>متن کامنت: </strong>{{ comment.body }}</div>
      <div class="text-end">
        <v-btn color="success" :disabled="loading" variant="tonal" size="small" class="me-1" @click="approve(i)">تایید</v-btn>
        <v-btn color="error" :disabled="loading" variant="tonal" size="small" @click="decline(i)"> عدم تایید</v-btn>
      </div>
    </v-sheet>
  </div>
</template>


<script>
import { useAuthStore } from "@/stores/auth";

export default {
  components: {},
  data() {
    return {
      loading: false,
      comments: [],
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
  },
  methods: {
    async approve(i) {

      this.loading = true;
      const { data } = await axios.put(`/api/comments/${this.comments[i].id}/approve`)
      if (data.success) {
        alert("تایید شد.")
        this.comments.splice(i, 1);
        this.loading = false; 
      }
      this.loading = false;
    },
    async decline(i) {

      this.loading = true;
      const { data } = await axios.put(`/api/comments/${this.comments[i].id}/decline`)
      if (data.success) {
        alert("به بایگانی منتقل شد.")
        this.comments.splice(i, 1);
      }
      this.loading = false;
    },
    async getComments() {
      this.loading = true;
      const { data } = await axios.get("/api/comments/notApprovedComments")
      this.comments = data.data;
      this.loading = false;
    }
  },
  mounted() {
    setTimeout(this.getComments, 1000)
  }
};
</script>