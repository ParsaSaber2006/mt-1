import axios from 'axios'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue';

export const useCallCenterStore = defineStore('callcenter', () => {

    // states
    const
        busy = ref(false),
        currentCall = ref(null);


    // getters
    const
        isBusy = computed(() => busy.value === true);

    //actions
    async function startCall(advisorId, userId, category_id = null, startCallByUser = true) {
        
        if (isBusy.value == true) {
            return {
                success: false,
                message: "در حال حاضر امکان برقراری تماس وجود ندارد"
            }
        }
        busy.value = true;

        let reqData = { startCallByUser: startCallByUser, category_id };

        try {
            const { data } = await axios.post(
                "/api/calling/user/" + userId + "/advisor/" + advisorId + "",
                reqData
            );

            if (!data.success) {

                busy.value = false;

                return {
                    success: false,
                    message: data.message,
                }

            }

            setTimeout(() => {
                busy.value = false;
            }, 10000)

            return {
                success: true,
                message: "درخواست تماس صادر شده است."
            }

        } catch (err) {

            busy.value = false;


            return {
                success: false,
                message: err.response.data.message
            }

        }

    }

    return {
        isBusy,
        startCall,
    }
})