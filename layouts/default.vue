<script setup>
import NavDrawer from "./default/drawer.vue";
import { computed, ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { useOptionsStore } from "@/store/options";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify";

const drawer = ref(false);
const publicLinksDrawer = ref(false);
const auth = useAuthStore();
const display = useDisplay();
const optionsStore = useOptionsStore(); // ✅ اصلاح شد
const loading = ref(false);
const route = useRoute();
const router = useRouter();

const appNavDisplay = computed(() => {
  return true; //display.smAndDown.value || auth.isLogedIn ;
});

const user = computed(() => auth.user);

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
