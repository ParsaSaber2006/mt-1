<template>
    <div>
        <div v-if="preview">
            <img :src="url" alt="" class="w-100" >
        </div>
        <label for="">فایل را انتخاب کنید</label>
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="" aria-label="" :name="name"
                   aria-describedby="basic-addon2" v-model="url" readonly>
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="showModalDialog">انتخاب فایل</button>
            </div>
        </div>
        <media-browser :showModal="showModal" @select="selected" @close="closeModal"></media-browser>
    </div>
</template>
<script>

export default {
    name: "SelectMedia",
    props: ["value", "id","name","preview"],
    data: function () {
        return {
            showModal: false,
            url: this.initUrl(),
        }
    },
    methods: {
        showModalDialog() {
            this.showModal = true;
        },
        selected(value) {
            this.$emit("input", value)
            this.$emit("change", value)
            let evt = new CustomEvent("media-selected", {detail: {url: value, id: this.id}});
            window.dispatchEvent(evt);
            this.url = value;
        },
        closeModal() {
            this.showModal = false;
        },
        initUrl() {
            return this.value;
        },
    },
    watch: {
        value: function (newVal) {
            this.url = newVal;
        }
    }
}
</script>
