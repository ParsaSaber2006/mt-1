<template>
  <v-navigation-drawer
    v-model="drawer"
    class="side"
    disable-resize-watcher
    temporary
  >
    <template v-slot:prepend>
      <v-list nav dense v-if="isLogedIn" color="primary">
        <v-list-item :prepend-avatar="user.img_url">
          <v-list-item-title class="text-h6">{{ user.name }}</v-list-item-title>
          <v-list-item-subtitle class="mt-2">
            <strong>اعتبار شما: {{ user.balance.toLocaleString() }} تومان</strong>
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </template>

    <v-list nav density="compact" :class="{'d-md-none':auth.isLogedIn}" color="primary" >
      <template v-for="menu in options.get('mainMenu')" :key="menu.title">
        <v-list-item
          v-if="!menu.childs || menu.childs.length == 0"
          color="primary"
          :to="menu.url"
          :title="menu.title"
          :prepend-icon="menu.icon"
        >
        </v-list-item>
        <v-list-group v-else>
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="menu.icon"
              :title="menu.title"
            >
            </v-list-item>
          </template>
          <v-list-item
            color="primary"
            v-for="submenu in menu.childs"
            :key="submenu.title"
            :to="submenu.url"
            :title="submenu.title"
            :prepend-icon="submenu.icon"
          >
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
   
    <v-list nav density="compact" v-if="isLogedIn">
      <v-list-item color="primary" :to="{ name: 'wallet' }">
        <template v-slot:prepend>
          <v-icon icon="mdi-wallet"></v-icon>
        </template>
        <v-list-item-title>کیف پول</v-list-item-title>
      </v-list-item>
      <v-list-item color="primary" :to="{ name: 'history' }">
        <template v-slot:prepend>
          <v-icon icon="mdi-phone-log"></v-icon>
        </template>
        <v-list-item-title>تاریخچه تماس ها</v-list-item-title>
      </v-list-item>
      <!-- <v-list-item color="primary" :to="{ name: 'collaborate' }">
        <template v-slot:prepend>
          <v-icon icon="mdi-coffee"></v-icon>
        </template>
        <v-list-item-title>همکاری با ما</v-list-item-title>
      </v-list-item> -->
      <v-list-item color="primary" >
        <div class="pa-2 px-5"  v-if="isLogedIn && (auth.isAdvisor || auth.isAdmin || auth.isMarketer)">
        <v-btn color="primary" prepend-icon="mdi-account" :to="{ name: 'userarea' }" block rounded>
          ناحیه کاربری
        </v-btn>
      </div>
      </v-list-item>

    </v-list>

    <template v-slot:append>
      <div class="pa-2 px-5" v-if="auth.isLogedIn">
        <v-btn color="grey-lighten-2" rounded prepend-icon="mdi-power" @click="logout" block>
          خروج
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, ref, onMounted, watch, defineEmits } from "vue";
import { useAuthStore } from "@/store/auth";
import { useOptionsStore } from "@/store/options";
import { useRoute, useRouter } from "vue-router";

const emit = defineEmits(["drawerChanged"]);

const props = defineProps(["drawer"]);

const drawer = ref(false),
  auth = useAuthStore(),
  options = useOptionsStore(),
  route = useRoute(),
  router = useRouter(),
  isLogedIn = computed(() => auth.isLogedIn);

const user = computed(() => {
  if (auth.user !== null) {
    return auth.user;
  }
});

async function logout() {
  await auth.logout();
  if (route.meta.requireAuth) router.push("/");
}

watch(
  () => props.drawer,
  (first) => {
    drawer.value = first;
  }
);
watch(
  () => drawer.value,
  (first) => {
    emit("drawerChanged", first);
  }
);

onMounted(() => {
  drawer.value = props.drawer;
});
</script>

<style scoped>
.v-list-item--nav .v-list-item-title {
  line-height: inherit;
}
</style>