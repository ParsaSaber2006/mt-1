<template>
  <v-layout app full-height>
    <v-locale-provider app rtl>
      <v-app-bar
        app
        scroll-behavior="elevate"
        scroll-threshold="50"
        color="primary"
        class="appbar"
      >
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          v-if="appNavDisplay"
        ></v-app-bar-nav-icon>
        <a
          href="#"
          class="ms-5 site-name"
          style="padding: 0"
          @click.stop="router.push('/')"
        >
          <img v-if="siteLogo" class="mx-5" :src="siteLogo" height="50" />
          <span v-else>{{ siteName }}</span>
        </a>

        <div class="d-none d-md-block">
          <v-menu
            :open-on-hover="menu.childs && menu.childs.length > 0"
            v-for="menu in optionsStore.get('mainMenu')"
            :key="menu.title"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                :prepend-icon="menu.icon"
                :to="menu.url"
                :append-icon="
                  menu.childs && menu.childs.length > 0 ? 'mdi-menu-down' : ''
                "
              >
                {{ menu.title }}
              </v-btn>
            </template>
            <v-list
              nav
              density="compact"
              v-if="menu.childs && menu.childs.length > 0"
            >
              <v-list-item
                color="primary"
                v-for="submenu in menu.childs"
                :key="submenu.title"
                :to="submenu.url"
                :prepend-icon="submenu.icon"
              >
                <v-list-item-title>{{ submenu.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <v-spacer></v-spacer>
        <v-btn
          color="white"
          @click="auth.showLoginForm()"
          prepend-icon="mdi-account"
          rounded
        >
          <template v-slot:append>
            <v-icon v-if="auth.isLogedIn && !auth.user.mobile_verified" color="warning"
              >mdi-alert-circle-outline</v-icon
            >
          </template>
          <template v-if="auth.isLogedIn">{{ auth.user.name }}</template>
          <template v-if="!auth.isLogedIn">ورود</template>
        </v-btn>
        <v-btn v-if="auth.isLogedIn" icon="mdi-cog" to="/userarea"></v-btn>
      </v-app-bar>
      <nav-drawer :drawer="drawer" @drawerChanged="drawerChanged" />

      <v-navigation-drawer
        v-if="false"
        v-model="publicLinksDrawer"
        class="side d-md-none"
      >
        <v-list nav dense color="primary">
          <v-list-item> Application </v-list-item>
        </v-list>

        <v-list nav density="compact">
          <v-list-group
            v-for="menu in optionsStore.get('mainMenu')"
            :key="menu.title"
          >
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
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <slot />
        <breadcrumbs-auto />
        <app-progress />
        <router-view v-slot="{ Component, route }">
          <transition name="fade">
            <component
              style="min-height: 500px"
              :is="Component"
              :key="route.path"
            />
          </transition>
        </router-view>
        <div app>
          <render-hook page_id="footer"></render-hook>
        </div>
      </v-main>
    </v-locale-provider>
  </v-layout>
</template>

<script setup>
import NavDrawer from "./default/drawer.vue";
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
const optionsStore = useOptionsStore();
const siteName = computed(() =>
  optionsStore.get("sitename", "پلتفرم مشاوره")
);
const siteLogo = computed(() => optionsStore.getMedia("siteLogo", null));

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