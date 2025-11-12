<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useNotifStore } from '@/stores/notif'
import { useOptionsStore } from '@/stores/options'
import { useHead } from '#app'
import axios from 'axios'

definePageMeta({
  layout: 'default'
})

// Meta page
useHead({
  title: 'خانه'
})

// Stores
const auth = useAuthStore()
const notif = useNotifStore()
const optionsStore = useOptionsStore()

// Reactive state
const dialog = ref(false)
const advisors = ref({})
const loading = ref(false)
const elements = ref({})

// Breadcrumbs
const breadcrumbs = [
  { title: 'صفحه اصلی', to: '/' },
]

// Methods
async function getHomePageContents() {
  loading.value = true
  console.log(optionsStore.homepage)
  const { data } = await axios.get('http://127.0.0.1:8000/api/pages/homepage')
  elements.value = JSON.parse(data.data.content)
  loading.value = false
}

// Mounted
onMounted(() => {
  getHomePageContents()
})
</script>
<template>
<NuxtLayout>
  <div>
    <v-container>
      <v-fade-transition leave-absolute>
        <v-skeleton-loader
          v-if="loading"
          type="ossein"
          height="1000"
          class="mb-5"
        />
      </v-fade-transition>

      <render :contents="elements" v-if="!loading" />
    </v-container>
  </div>
  </NuxtLayout>
</template>
