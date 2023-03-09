<script setup>
import {ref} from 'vue'
import { useListAnime } from '../stores/listAnimeStore';
import {useRouter} from 'vue-router'
import { useGetAnime } from '../stores/getAnime';


const getAnime = useGetAnime()
const textToApi = ref();
const list = ref([]);
const linkPrev = ref();
const linkNext = ref();
const linkFlagPrev = ref(true);
const linkFlagNext = ref(true);
const spinnerFlag = ref()
const listAnime = useListAnime()
// const router = useRouter()
// const animeMoreInfo = ref()
const getData = async (api) =>{
    try{
        spinnerFlag.value = true
        const res = await fetch(api)
        const data = await res.json()        
        for(let anime in data.data){
            // list.value.push(data.data[anime].attributes)
            list.value.push({
                title : data.data[anime].attributes.canonicalTitle,
                link : data.data[anime].links.self,
                id : data.data[anime].id
            })
        }
        linkNext.value = data.links.next
        linkPrev.value = data.links.prev
        linkPrev.value ? linkFlagPrev.value = false : linkFlagPrev.value = true
        linkNext.value ? linkFlagNext.value = false : linkFlagNext.value = true 
    }catch(err){
        console.log(err)
    }finally{
        spinnerFlag.value = false
    }
}

const getText = async() =>{
    try{
        list.value = []
        if(textToApi.value.length > 0){
            await getData(`https://kitsu.io/api/edge/anime?filter[text]=${textToApi.value}`)
    }
}catch(err){
    console.log(err)
}
}

const pagination = async (link) =>{
    list.value = []
    await getData(link)
}

const hadelSubmit = () =>{
    listAnime.addAnime()
}

// const moreInfo = async (animeData) =>{
//     try{
//         await router.push(`/more-info/${animeData.title}`)
//         const res = await fetch(animeData.link)
//         const anime = await res.json()
//         animeMoreInfo.value = {...animeData}
//         console.log(animeMoreInfo.value)
//     }catch(err){
//         console.log(err)
//     }
// }




</script>

<template>
    <section class="d-flex flex-column justify-content-center align-items-center ">
        <h1>Check List Anime</h1>
        <form action="">
            <input type="text" @keyup="getText" v-model="textToApi" class="form-control mb-5 mt-5">
        </form>
        <div class="d-flex flex-column justify-content-center mt-5" style="height: 523px;" v-if="spinnerFlag">
            <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status" >
                <p class="visually-hidden " >Loading...</p>
            </div>
        </div>
        <ul class="list-group w-75 " v-else>
            <li v-for="anime of list"
            :key="anime"
            class="list-group-item d-flex justify-content-between"
            >
            <p>{{ anime.title }}</p>
            <div class="d-flex gap-2">
                <button class="btn btn-primary" @click="listAnime.addAnime(anime.title)">Add</button>
                <button class="btn btn-success ml-2" @click="getAnime.moreInfo(anime)">More</button>
            </div>
            </li>
        </ul>
       
        <div class=" d-flex justify-content-between w-75 mt-5">
            <button class="btn btn-primary btn-lg" :disabled='linkFlagPrev'  @click="pagination(linkPrev)" >Previos</button>
            <button class="btn btn-primary btn-lg" :disabled='linkFlagNext' @click="pagination(linkNext)">Next</button>
        </div>
    </section>
</template>