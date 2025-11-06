<template >
  <v-card
    :prepend-icon="icon"
    elevation="0"
    class="rounded-lg"
    :loading="loading"
  >
    <v-overlay
      :model-value="overlay"
      contained
      class="align-center justify-center"
    />
    <template v-slot:title v-if="title">
      <div class="d-flex justify-space-between py-1">
        <v-sheet>{{ title }}</v-sheet>
        <v-sheet>
          <slot name="actions" />
        </v-sheet>
      </div>
    </template>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script >
export default {
  name: 'Card',
  props: ["loading", "title", "icon", "overlay"],
};
</script>