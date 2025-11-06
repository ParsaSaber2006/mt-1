<template>
    <div>
        <div class="modal hide fade browserModal" ref="mediaModal" id="browserModal"
             tabindex="-1" role="dialog" aria-labelledby="browserModalLabel"
             aria-hidden="true">
            <div class="modal-dialog  modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="browserModalLabel">مرورگر عکس</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <slot/>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>

export default {
    name: "Modal",
    data: function () {
        return {}
    },
    methods: {
        select() {

        },
    },
    mounted() {
        let vm = this;
        $(this.$refs.mediaModal).on("hidden.bs.modal", () => {
            vm.$emit("hide");
        })
    }
}
</script>
<style lang="scss">
.browserModal {
    z-index: 99999;
    background-color: rgba(0,0,0,0.8);
    .modal {
        display: block !important; /* I added this to see the modal, you don't need this */
    }

    /* Important part */
    .modal-dialog {
        overflow-y: initial !important
    }

    .modal-body {
        height: 80vh;
        overflow-y: auto;
    }

    .modal-header .close, .modal-header .mailbox-attachment-close {
        padding: 1rem;
        margin: -1rem auto -1rem -1rem;
    }
}
</style>
