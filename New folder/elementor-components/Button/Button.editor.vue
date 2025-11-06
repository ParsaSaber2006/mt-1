<template>
  <div>
    <div class="element-control-field">
      <v-text-field
        label=" نوشته"
        rounded
        variant="outlined"
        density="compact"
        type="text"
        v-model="data.text"
      />
      <v-select
        label="نوع"
        v-model="data.align"
        :items="align"
        item-value="value"
        item-title="title"
        rounded
        variant="outlined"
        density="compact"
      >
      </v-select>
      <v-select
        label="نوع"
        v-model="data.type"
        :items="types"
        item-value="value"
        item-title="title"
        rounded
        variant="outlined"
        density="compact"
      >
      </v-select>
      <v-select
        label="گردی"
        v-model="data.rounded"
        :items="rounded"
        item-value="value"
        item-title="title"
        rounded
        variant="outlined"
        density="compact"
      >
      </v-select>

      <v-text-field
        label="رنگ"
        type="text"
        rounded
        variant="outlined"
        density="compact"
        v-model="data.color"
      />

      <v-text-field
        label=" آدرس"
        rounded
        variant="outlined"
        density="compact"
        v-model="data.action.href"
      />

      <v-select
        label="نوع آدرس"
        v-model="data.action.type"
        :items="action_type"
        item-value="value"
        item-title="title"
        rounded
        variant="outlined"
        density="compact"
      >
      </v-select>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data: () => {
    return {
      types: [
        { value: "elevated", title: "پیش فرض" },
        { value: "tonal", title: "تونال" },
        { value: "flat", title: "مسطح" },
        { value: "text", title: "نوشته" },
        { value: "outlined", title: "بیرون خط" },
        { value: "plain", title: "معمولی" },
      ],
      rounded: [
        { value: "0", title: "صفر" },
        { value: "sm", title: "خیلی کم" },
        { value: "xs", title: "کم" },
        { value: "xl", title: "زیاد" },
      ],
      action_type: [
        { value: "innerUrl", title: "داخلی" },
        { value: "bookmark", title: "بوکمارک" },
        { value: "external", title: "خارجی" },
      ],
      align: [
        { value: "right", title: "راست" },
        { value: "center", title: "وسط" },
        { value: "left", title: "چپ" },
        { value: "justify", title: "کامل" },
      ],
    };
  },
  methods: {},
  created() {},
};
</script>
