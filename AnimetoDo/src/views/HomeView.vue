<script setup>
import { useUser } from '../stores/user';
const user = useUser()

console.log(user.data?.email)
</script>

<template>
    <section>
        <h1>Check listo to anime</h1>
    </section>
</template>
