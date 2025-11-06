<script>
export default {
  props: ["data"],
  computed: {
    links() {
      return this.data.links;
    },
  },
  created() { },
};
</script>

<template>
  <div>
    <v-expansion-panels :variant="data.variant">
    <v-expansion-panel v-for="(link, index) in links" :key="index" class="">
        <template v-slot:title>
            <v-row>
                <v-col cols="10">
                    {{ link.title }}
                </v-col>
                <v-col cols="2">
                    <v-icon>{{ link.icon }}</v-icon>
                </v-col>
            </v-row>
        </template>
        <template v-slot:text>
            {{ link.text }}
        </template>
    </v-expansion-panel>
    <template v-if="links.length === 0">
        <v-expansion-panel disabled>
            <template v-slot:title>
                <v-row>
                    <v-col cols="12">
                        <p style="color: grey;">متنی اضافه نشده </p>
                    </v-col>
                </v-row>
            </template>
        </v-expansion-panel>
    </template>
</v-expansion-panels>
  
  
  </div>
</template>

<style scoped></style>