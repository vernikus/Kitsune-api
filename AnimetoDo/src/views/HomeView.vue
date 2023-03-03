<script setup>
import { useUser } from '../stores/user';
import { useListAnime } from '../stores/listAnimeStore';


const user = useUser()
const listAnime = useListAnime()



console.log(user.data?.email)
</script>

<template>
    <section>
        <h1>Check listo to anime</h1>
    </section>
</template>
