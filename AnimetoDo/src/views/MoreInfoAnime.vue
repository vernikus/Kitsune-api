<script setup>
import { useGetAnime } from '../stores/getAnime';
import {ref} from 'vue'


const getAnime = useGetAnime()
const anime = ref()

const moreInfo = async (animeData) =>{
    try{
        const res = await fetch(animeData)
        const data = await res.json()
        anime.value = ({...data.data.attributes})
        // console.log(anime.value.posterImage.medium)
    }catch(err){
        console.log(err)
    }
}
moreInfo(getAnime.anime.link)


</script>

<template>
    <section>
        <div>
            <h1>{{ anime?.canonicalTitle}}</h1>
            <img :src="anime?.posterImage.medium" alt="">
        </div>
    </section>
        
    
</template>