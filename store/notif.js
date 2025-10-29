import axios from 'axios'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
import { useToast } from "vue-toastification";
const toast = useToast()

export const useNotifStore = defineStore('notification', () => {

    function success(text, timeout = 2000) {
        alert(text, 'success', timeout)
    }

    function error(text, timeout = 2000) {
        alert(text, 'error', timeout)
    }

    function info(text, timeout = 2000) {
        alert(text, 'info', timeout)
    }

    function info(text, timeout = 2000) {
        alert(text, 'info', timeout)
    }

    function warning(text, timeout = 2000) {
        alert(text, 'warning', timeout)
    }

    function alert(text = "", type = "success", timeout = 2000,) {
        toast(text, {
            type: type
        })
    }

    return {
        alert,
        success,
        info,
        warning,
        error
    }
})