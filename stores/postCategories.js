import { defineStore } from "pinia";
import axios from "axios";
import {ref , computed} from 'vue';

export const usePostCategoriesStore = defineStore('postCategories',() =>{

    //state
    const storedCategories =ref([]),
    onLoading = ref(false);

    //getters
    const postCategories = computed(() =>{
        console.log(storedCategories.value.length)
        if(storedCategories.value.length <1){

        
            getCategoiresFromServer();
        }
            console.log(storedCategories.value)
            return storedCategories.value;
        

    }),

    listedCategories = computed(()=>{
        return postCategories.value.map((item)=>{
            return {value:item.id,name:item.name,shor_desc:item.short_description};
        });
    }),
    loading = computed(()=>onLoading.value)

    //actions
    async function getCategoiresFromServer(){
        onLoading.value=true;

        const {data} = await axios.get('/api/categories',{
            params:{
                type:'posts'
            }
        })

        storedCategories.value = data.data;

        onLoading.value =false;
    }
return {
    postCategories,
    loading,
    getCategoiresFromServer,
    listedCategories
}

})