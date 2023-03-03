<script setup>
import { useListAnime } from '../stores/listAnimeStore';

const listAnime = useListAnime()
listAnime.getAnime()

</script>

<template>
    <section>
        <h1>Edis list Anime</h1>
        <ul v-if="!listAnime.loadinDoc" class="list-group">
            <li v-for="anime of listAnime.documents" class="list-group-item"
            :key="anime.id"           
            >
            {{ anime.name }}
            <button class="btn btn-danger" @click="listAnime.deletedAnime(anime.id)">Deleted</button>
            </li>
        </ul>
        <div class="d-flex mt-5 justify-content-center " v-else>
            <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status" >
                <p class="visually-hidden " >Loading...</p>
            </div>
        </div>
    </section>
</template>