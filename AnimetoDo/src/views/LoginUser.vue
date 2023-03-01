<script setup>
import {ref} from 'vue'
import {useUser} from '@/stores/user.js'


const user = useUser()
const email = ref('jonathan@test.com')
const password = ref('123456')

const handerSbmit = async() =>{
    if(!email.value || password.value.length < 5){
        return alert('completed the documents')
    }
    await user.loginUser(email.value,password.value)
}

</script>

<template>
    <section class="">
        <h1>Login</h1>
        <form @submit.prevent="handerSbmit"> 
            <input type="email" v-model.trim="email">
            <input type="password" v-model.trim="password">
            <button class="btn btn-primary" type="submit" :disabled="user.loadingUser">Acces</button>
        </form>
    </section>
</template>