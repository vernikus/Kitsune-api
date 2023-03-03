<script setup>
import {ref} from 'vue'
import { useListAnime } from '../stores/listAnimeStore';


const textToApi = ref();
const list = ref([]);
const linkPrev = ref();
const linkNext = ref();
const linkFlagPrev = ref(true);
const linkFlagNext = ref(true);
const spinnerFlag = ref()
const listAnime = useListAnime()
const getData = async (api) =>{
    try{
        spinnerFlag.value = true
        const res = await fetch(api)
        const data = await res.json()        
        for(let anime in data.data){
            list.value.push(data.data[anime].attributes)
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
            <p>{{ anime.canonicalTitle }}</p>
            <div class="d-flex gap-2">
                <button class="btn btn-primary" @click="listAnime.addAnime(anime.canonicalTitle)">Add</button>
                <button class="btn btn-danger">Deleted</button>
            </div>
            </li>
        </ul>
       
        <div class=" d-flex justify-content-between w-75 mt-5">
            <button class="btn btn-primary btn-lg" :disabled='linkFlagPrev'  @click="pagination(linkPrev)" >Previos</button>
            <button class="btn btn-primary btn-lg" :disabled='linkFlagNext' @click="pagination(linkNext)">Next</button>
        </div>
    </section>
</template>