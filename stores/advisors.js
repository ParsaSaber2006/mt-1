import axios from 'axios'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
import { _ } from "lodash"
import { useCategoriesStore } from "./categories"

export const useAdvisorsStore = defineStore('advisors', () => {
    const categoriesStore = useCategoriesStore();
    // states
    const
        storedAdvisors = ref(null),
        onLoading = ref(false);

    // getters
    const
        advisors = computed(() => {
            if (storedAdvisors.value == null)
                getAdvisorsFromServer();

            return storedAdvisors.value;
        }),
        categorized = computed(() => {
            let initAdvs = (advisors.value);
            let categorized = {};
            categorized = _.keyBy(categories.value, 'id')
/* 
            let cats = categories.value.map(item=>{
                item.advisors = categorized[item.id];
                return item;
            }) */

            return categorized;
        }),
        categories = computed(() => categoriesStore.categories),
        loading = computed(() => onLoading.value);

    //actions
    async function getAdvisorsFromServer() {
        onLoading.value = true;
        const { data } = await axios.get("/api/advisors")
        storedAdvisors.value = data.data
        onLoading.value = false;
    }

    return {
        advisors,
        loading,
        categorized,
        getAdvisorsFromServer,
    }
})