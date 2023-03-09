<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUser } from './stores/user';

const user = useUser()

</script>

<template>
  <nav class="navbar  bg-light" v-if="!user.loadingSesion">
    <div class="container d-flex justify-content-end gap-4">
      <router-link class="btn btn-primary" to="/" v-if="user.data">Home</router-link>
      <router-link class="btn btn-primary" to="/list" v-if="user.data" >Add anime</router-link>
      <router-link class="btn btn-primary" to="/list-edit" v-if="user.data">My list</router-link>
      <router-link class="btn btn-primary" to="/register" v-if="!user.data">Register user</router-link>
      <router-link class="btn btn-primary" to="/login" v-if="!user.data">Login</router-link>
      <button class="btn btn-primary" @click="user.logoutUser" v-if="user.data">Logout</button>
    </div>
  </nav>
  <div class="d-flex flex-column justify-content-center mt-5" style="height: 523px;" v-else>
    <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status" >
      <p class="visually-hidden " >Loading...</p>
    </div>
  </div> 
  <main >
  <router-view class="" ></router-view>
  </main>
</template>

