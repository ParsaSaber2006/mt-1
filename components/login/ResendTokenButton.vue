<template>
  <v-btn :variant="data.time > 0 ? 'text' : 'tonal'" @click="requestToken" rounded>{{
    btnText
  }}</v-btn>
</template>

<script setup>
import {
  reactive,
  onMounted,
  defineEmits,
  watch,
  defineProps,
  computed,
} from "vue";
const emit = defineEmits(["requestToken"]);

const props = defineProps(["time"]);

const data = reactive({
  disableRenewToken: true,
  time: 0,
});

function resetTimer(time) {
  data.time = time;
  timer();
}
defineExpose({
  resetTimer,
});

function timer() {
  if (data.time > 0)
    setTimeout(() => {
      data.time--;
      timer();
    }, 1000);
}

function requestToken() {
  if (data.time > 0) return;
  emit("requestToken");
}

const btnText = computed(() => {
  if (data.time > 0) {
    return "ارسال مجدد: " + data.time + " ثانیه ";
  }
  return "ارسال مجدد کد";
});

onMounted(() => {
  data.time = props.time;
  timer();
});
</script>