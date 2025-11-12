<template >
  <div>
    <v-container v-if="loading">
      <v-row justify="center" class="py-10">
        <v-col cols="4" align="center" class="py-16">
          <v-progress-linear color="primary" indeterminate></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="!loading">
      <v-row>
        <v-col> تعداد کل مخاطبین: {{ contacts.length }} </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="contact in contacts"
          :key="contact"
          cols="12"
          sm="6"
          md="4"
          class="py-1"
        >
          <v-sheet class="pa-3 pt-3" rounded="xl">
            <div class="text-h6">{{ contact.name }}</div>
            <div>تعداد تماس: {{ contact.count }}</div>
            <div>مدت تماس ها: {{ (contact.billsec / 60).toFixed() }} دقیقه</div>
            <div class="pa-3 pt-5">
              <v-btn
                block
                rounded
                class="mdi-rotate-135"
                prepend-icon="mdi-phone"
                color="primary"
                variant="tonal"
                @click="callCenter.startCall(auth.user.id, contact.contact_id, null, false)"
                >تماس</v-btn
              >
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
  
  
  <script>
import { useAuthStore } from "@/stores/auth";
import { useCallCenterStore } from "@/stores/callCenter";

export default {
  name: "advisor-calls",
  data() {
    return {
      loading: false,
      contacts: {},
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    callCenter(){
      return useCallCenterStore();
    },
    user() {
      return this.auth.user;
    },
    breadcrumbs() {
      return [
        {
          title: "صفحه اصلی",
          disabled: false,
          to: "/",
        },
        {
          title: "عملیات مشاور",
          disabled: false,
          to: "/advisor",
        },
        {
          title: "مخاطبین من",
          disabled: true,
        },
      ];
    },
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    async getContacts() {
      this.loading = true;
      const { data } = await axios.get(
        `/api/advisors/${this.user.id}/contacts`
      );
      this.contacts = data.data;
      this.loading = false;
    },
  },
  async mounted() {
    this.getContacts();
  },
};
</script>