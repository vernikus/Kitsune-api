import { defineStore } from "pinia";
import {ref} from 'vue'
import {useRouter} from 'vue-router'

export const useGetAnime = defineStore("getAnime", () => {
    const anime = ref()
    const router = useRouter()
    const moreInfo = async (animeData) =>{
        try{
            anime.value = {...animeData}
            await router.push(`/more-info/${animeData.title}`)
        }catch(err){
            console.log(err)
        }
    }
 
    return{
        moreInfo,
        anime
 }
});
