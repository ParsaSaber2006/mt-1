<template>
  <v-layout>
    <v-locale-provider rtl>
      <v-app-bar color="grey-darken-3">
        <v-btn>صفحه ساز</v-btn>
        <v-spacer></v-spacer>
        <v-btn :to="{name:'admin.pages'}" color="white" variant="tonal"> بازگشت</v-btn>
      </v-app-bar>
      <v-main >
      <slot />
        <router-view></router-view>
      </v-main>
    </v-locale-provider>
  </v-layout>
</template>

<script>
export default {
  name: "BasicLayout",
  data: () => ({
  }),
  methods: {
  },
};
</script>
