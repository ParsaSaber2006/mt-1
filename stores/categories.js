import axios from 'axios'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue';

export const useCategoriesStore = defineStore('categories', () => {

    // states
    const
        storedCategories = ref([]),
        onLoading = ref(false);

    // getters
    const
        categories = computed(() => {
            if (storedCategories.value.length < 1){
                // console.log(onLoading.value)
                getCategoriesFromServer();
            }
            
            return storedCategories.value;
        }),
        listedCategories = computed(() => {
            return categories.value.map((item) => {
                return { value: item.id, title: item.name, tags: item.tags };
            });
        }),
        loading = computed(() => onLoading.value);

    //actions
    async function getCategoriesFromServer() {
        onLoading.value = true;
        const { data } = await axios.get("/api/categories",{
            params:{
                type:'advisors'
            }
        })
        storedCategories.value = data.data
        
        if(data.data.length == 0){
            storedCategories.value = [{ name: 'asd' ,id:2}];
        }
        
        onLoading.value = false;
    }

    return {
        categories,
        loading,
        getCategoriesFromServer,
        listedCategories,
    }
})