<template>
  <div>
    <v-dialog v-model="modal" activator="parent" width="auto">
      <v-card>
        <v-card-text>
          <browser @select="select" v-if="isStep('browser')"></browser>
          <uploader v-if="isStep('uploader')"></uploader>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="modal = false">Close Dialog</v-btn>
          <v-btn color="primary" @click="setStep('browser')">Browser</v-btn>
          <v-btn color="primary" @click="setStep('uploader')">Uploader</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <modal @hide="close" v-if="false">
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <a
            class="nav-link active p-1 px-3 rounded-0"
            id="nav-browse-tab"
            data-toggle="tab"
            href="#nav-browse"
            role="tab"
            aria-controls="nav-browse"
            aria-selected="true"
            @click="setStep('browser')"
            >گالری</a
          >
          <a
            class="nav-link p-1 px-3 rounded-0"
            id="nav-upload-tab"
            data-toggle="tab"
            href="#nav-upload"
            role="tab"
            aria-controls="nav-upload"
            aria-selected="false"
            @click="setStep('uploader')"
            >بارگذاری</a
          >
        </div>
      </nav>

      <div class="tab-content" id="nav-tabContent">
        <div
          class="tab-pane p-2 fade show active"
          id="nav-browse"
          role="tabpanel"
          aria-labelledby="nav-browse-tab"
        >
          <browser @select="select" v-if="isStep('browser')"></browser>
        </div>
        <div
          class="tab-pane fade p-2"
          id="nav-upload"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <uploader v-if="isStep('uploader')"></uploader>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>

import Browser from "./Browser.vue";
import Uploader from "./Uploader.vue";
import Modal from "./Modal.vue";

export default {
  name: "MediaBrowser",
  components: { Browser, Uploader, Modal },
  props: ["modelValue"],
  emits: ['update:modelValue'],
  data: function () {
    return {
      modal: false,
      step: "browser",
    };
  },
  methods: {
    select(url) {
      this.$emit("select", url);
      this.$emit("update:modelValue", false);
    },
    setStep(step) {
      this.step = step;
    },
    isStep(step) {
      return step == this.step;
    },
    close() {
      this.$emit("update:modelValue", false);
    },
  },
  mounted() {},
  watch: {
    modelValue: function (newVal) {
        this.modal = newVal;
    },
    modal: function (newVal) {
      this.$emit("update:modelValue", newVal);
    },
  },
};
</script>
