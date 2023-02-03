<script setup>
import {ref} from 'vue'

const textToApi = ref()
console.log(textToApi.value)

const list = ref([])
const getData = (api) =>{
    try{
    fetch(api)
        .then((res) => res.json())
        .then((data => {
            for(let anime in data.data){
                list.value.push(data.data[anime].attributes)
                // console.log(data.data[anime].attributes)
            }
            console.log(data)
        }))
    }catch(err){
        console.log(err)
    }
}
const getText = () =>{
    console.log(textToApi.value)
    if(textToApi.value.length > 0){
        getData(`https://kitsu.io/api/edge/anime?filter[text]=${textToApi.value}`)
        list.value = []
    }
}



</script>

<template>
    <main class="d-flex flex-column justify-content-center align-items-center ">
        <h1>Check List Anime</h1>
        <form action="">
            <input type="text" @keyup="getText" v-model="textToApi" >
        </form>
        <ul class="list-group w-75 " >
            <li v-for="anime of list"
            :key="anime"
            class="list-group-item d-flex justify-content-between"
            >
            <p>{{ anime.canonicalTitle }}</p>
            <div class="d-flex gap-2">
                <button class="btn btn-primary">Add</button>
                <button class="btn btn-danger">Deleted</button>
            </div>
            </li>
        </ul>
    </main>
</template>