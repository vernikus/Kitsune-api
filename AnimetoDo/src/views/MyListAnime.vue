<script setup>
import { useListAnime } from '../stores/listAnimeStore';

const listAnime = useListAnime()
listAnime.getAnime()

</script>

<template>
    <section class="d-flex flex-column justify-content-center align-items-center ">
        <h1>Edis list Anime</h1>
        <ul v-if="!listAnime.loadinDoc" class="list-group w-75">
            <li v-for="anime of listAnime.documents" class="list-group-item d-flex justify-content-between" 
            :key="anime.id"           
            >
            {{ anime.name }}
            <div class="d-flex gap-2">
                <button class="btn btn-danger" @click="listAnime.deletedAnime(anime.id)">Deleted</button>
                <button class="btn btn-success ml-2">More</button>
            </div>
            </li>
        </ul>
        <div class="d-flex mt-5 justify-content-center " v-else>
            <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status" >
                <p class="visually-hidden " >Loading...</p>
            </div>
        </div>
    </section>
</template>