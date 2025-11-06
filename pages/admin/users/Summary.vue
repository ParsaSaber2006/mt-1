<template>
  <v-row>
    <v-col cols="12">
      <card>
        <div class="pa-10"></div>
        <v-row>
          <v-col>
            <h3>حذف کاربر</h3>
            برای حذف کاربر از این بخش اقدام کنید. کاربر بعد از حذف به صورت دائمی از سیستم حذف نمی‌شود و فقط آرشیو شده و
            غیر فعال می‌گردد.
            <br><br>
            <v-btn color="warning" block rounded variant="outlined" @click="archiveUser">حذف کاربر</v-btn>
          </v-col>
        </v-row>
      </card>
    </v-col>
  </v-row>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { useUsersStore } from "@/store/users";

export default {
  name: "wallet",
  props: ["user"],
  data() {
    return {
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
  },
  methods: {
    async archiveUser() {
      this.loading = true;
      const { data } = axios.delete(`/api/users/${this.user.id}`);
      this.loading = false;
      this.$router.push({ name: 'admin.users' })
    }
  },
  mounted() { },
};
</script>