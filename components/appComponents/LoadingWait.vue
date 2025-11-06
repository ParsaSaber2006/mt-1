<template >
    <v-fade-transition leave-absolute>
      <v-container v-if="loading">
        <v-row justify="center" class="py-10">
          <v-col cols="4" align="center" class="py-16">
            لطفا چند لحظه منتظر بمانید ...
            <v-progress-linear
              color="primary"
              indeterminate
            ></v-progress-linear>
          </v-col>
        </v-row>
      </v-container>
    </v-fade-transition>
</template>

<script >
export default {
  props: ["loading"],
  name: "LoadingWait",
};
</script>