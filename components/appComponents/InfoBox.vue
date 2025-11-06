<template >
  <v-sheet border class="pa-5 h-100" rounded="xl">
    <div class="text-center">
      <v-icon
        :color="color"
        size="xxx-large"
        :class="{ 'mdi-flip-h': icon_flip }"
        >{{ icon }}</v-icon
      >
    </div>
    <div class="text-h6 text-grey text-center my-1">{{ title }}</div>
    <slot name="amount" v-if="$slots.amount">{{ $slots.amount }}</slot>
    <div v-else class="text-grey-darken-4 text-h6 text-center">
      {{ amount }}
    </div>
  </v-sheet>
</template>

<script >

export default {
  name: "InfoBox",
  props: ["title", "amount", "icon", "color", "icon_flip"],
  data: () => {
    return {};
  },
  computed: {},
};
</script>