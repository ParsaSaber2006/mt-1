<template>
  <v-layout app full-height>
    <v-locale-provider app rtl>
      <v-app-bar app scroll-behavior="elevate" scroll-threshold="50" color="grey-darken-2" class="appbar">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="appNavDisplay"></v-app-bar-nav-icon>
        <a href="#" class="ms-5 site-name" style="padding: 0" @click.prevent="router.push('/')">
          <span>{{ siteName }}</span>
        </a>

        <div class="d-none d-md-block">
          <v-menu :open-on-hover="menu.childs && menu.childs.length > 0" v-for="menu in optionsStore.get('mainMenu')"
            :key="menu.title">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" :prepend-icon="menu.icon" :to="menu.url" :append-icon="menu.childs && menu.childs.length > 0 ? 'mdi-menu-down' : ''
                ">
                {{ menu.title }}
              </v-btn>
            </template>
            <v-list nav density="compact" v-if="menu.childs && menu.childs.length > 0">
              <v-list-item color="primary" v-for="submenu in menu.childs" :key="submenu.title" :to="submenu.url"
                :prepend-icon="submenu.icon">
                <v-list-item-title>{{ submenu.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <v-spacer></v-spacer>
        <v-btn color="white" @click="auth.showLoginForm()" prepend-icon="mdi-account" rounded>
          <template v-slot:append>
            <v-icon v-if="auth.isLogedIn && !auth.user.mobile_verified"
              color="warning">mdi-alert-circle-outline</v-icon>
          </template>
          <template v-if="auth.isLogedIn">{{ auth.user.name }}</template>
          <template v-if="!auth.isLogedIn">ورود/ثبت‌نام</template>
        </v-btn>
      </v-app-bar>
      <nav-drawer :drawer="drawer" @drawerChanged="drawerChanged" />
      <v-main class="bg-grey-lighten-2" style="min-height: 900px;">
        <slot />
        <breadcrumbs-auto />
        <app-progress />
        <router-view v-slot="{ Component, route }">
          <transition name="fade">
            <component style="min-height: 500px" :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </v-main>
    </v-locale-provider>
  </v-layout>
</template>

<script setup>
import NavDrawer from "./admin/drawer.vue";
import { computed, ref, defineCustomElement, inject } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useOptionsStore } from "@/stores/options";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify";

const drawer = ref(false),
  publicLinksDrawer = ref(false),
  auth = useAuthStore(),
  display = useDisplay(),
  options = useOptionsStore(),
  loading = false,
  route = useRoute(),
  router = useRouter(),
  isLogedIn = computed(() => auth.isLogedIn);

const appNavDisplay = computed(() => {
  return true; //display.smAndDown.value || auth.isLogedIn ;
});

const user = computed(() => {
  if (auth.user !== null) {
    return auth.user;
  }
});

const optionsStore = inject("optionsStore");

const siteName = computed(() =>
  optionsStore.value.get("sitename", "پلتفرم مشاوره")
);
const siteLogo = computed(() => optionsStore.value.getMedia("siteLogo", null));

async function logout() {
  await auth.logout();
  if (route.meta.requireAuth) router.push("/");
}

function drawerChanged(drawerVal) {
  drawer.value = drawerVal;
}
</script>
<style scoped>
.appbar a.site-name {
  text-decoration: none;
  color: white;
  margin-left: 30px;
}

.v-layout--full-height {
  position: relative;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>