<template >
  <div>
    <card class="rounded">
      <list-maker v-model="siteOptions[menu]"></list-maker>
      <v-row>
        <v-col class="text-end">
          <v-btn @click="updateOptions" color="primary" :loading="loading"
            >ذخیره منو</v-btn
          >
        </v-col>
      </v-row>
    </card>
  </div>
</template>


<script>
import { useAuthStore } from "@/stores/auth";
import { useOptionsStore } from "@/stores/options";
import ListMaker from "./_menuBuilder/ListMaker.vue";

export default {
  name: "options",
  props: ["menu"],
  components: { ListMaker },
  data() {
    return {
      loading: false,
      siteOptions: {},
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    user() {
      return this.auth.user;
    },
    optionsStore() {
      return useOptionsStore();
    },
    breadcrumbs() {
      return [
        {
          title: "صفحه اصلی",
          disabled: false,
          to: "/",
        },
        {
          title: "تنظیمات",
          disabled: false,
          to: { name: "admin.options" },
        },
        {
          title: this.menu == "mainMenu" ? "منو اصلی" : "منو فوتر",
          disabled: true,
        },
      ];
    },
  },
  methods: {
    async updateOptions() {
      this.loading = true;
      try {
        await this.optionsStore.update(this.siteOptions);
        emitter.emit("notif");
      } catch (err) {
        console.log(err);
      }
      this.loading = false;
    },
    getOptions() {
      this.loading = true;
      let obj = JSON.parse(JSON.stringify(this.optionsStore.options));
      this.siteOptions = obj;
      this.medias = obj.medias;
      this.loading = false;
    },
  },
  mounted() {
    this.getOptions();
  },
};
</script>