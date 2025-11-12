<template>
  <v-navigation-drawer
    v-model="drawer"
    class="side"
    disable-resize-watcher
    temporary
    color="grey-darken-3"
  >
    <!-- User Info -->
    <template v-slot:prepend>
      <v-list nav dense v-if="isLogedIn" color="primary">
        <v-list-item
          :prepend-avatar="user.img_url"
          class="rounded-xl"
          density="compact"
        >
          <v-list-item-title class="text-subtitle-1">
            {{ user.name }} 
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </template>

    <template v-for="(menu, menuIndex) in menuItems" :key="menu">
  <v-list
    nav
    v-if="menu.role === 'user' || auth.hasRole(menu.role)"
    color="primary"
  >
    <v-list-subheader class="text-truncate">{{menu.title}} </v-list-subheader>

    <template v-for="(item, index) in menu.actions" :key="index">
      <!-- Group Item -->
      <v-list-group
        v-if="item?.subs && item.subs.length > 0"
        v-model="groupOpen[item.title]"
        :prepend-icon="item.icon"
        color="green"
      >
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            :title="item.title"
            @click="toggleGroup(item.title)"
          />
        </template>

        <v-list-item
          v-for="sub in item.subs"
          :key="sub.to"
          :title="sub.title"
          :to="sub.to"
          density="compact"
          class="ps-8"
        />
      </v-list-group>

      <!-- Single Item -->
      <v-list-item
        v-else
        :title="item.title"
        :to="item.to"
        density="compact"
        :prepend-icon="item.icon"
      />
    </template>
    
          <v-divider
        v-if="menuIndex !== 'user'"
        class="my-2"
        color="grey-lighten-1"
      ></v-divider>
  </v-list>
</template>



    <!-- Footer Button -->
    <template v-slot:append>
      <div class="pa-2 px-5" v-if="auth.isLogedIn">
        <v-btn
          color="red-lighten-2"
          rounded
          prepend-icon="mdi-power"
          @click="logout"
          block
        >
          خروج
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, ref, onMounted, watch, defineEmits } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useOptionsStore } from "@/stores/options";
import { useRoute, useRouter } from "vue-router";
import menuItems from "./menu";

const emit = defineEmits(["drawerChanged"]);
const props = defineProps(["drawer"]);

const drawer = ref(false);
const auth = useAuthStore();
const options = useOptionsStore();
const route = useRoute();
const router = useRouter();

const isLogedIn = computed(() => auth.isLogedIn);
const user = computed(() => auth.user || {});

const groupOpen = ref({}); // وضعیت باز بودن گروه‌ها

const toggleGroup = (title) => {
  groupOpen.value[title] = !groupOpen.value[title];
};

const logout = async () => {
  await auth.logout();
  if (route.meta.requireAuth) {
    router.push("/");
  }
};

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

.v-list-subheader {
  font-weight: bold;
  font-size: 14px;
  color: #ffffff88;
}
</style>
