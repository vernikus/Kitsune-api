<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar  bg-light">
    <div class="container d-flex justify-content-end gap-4">
      <router-link class="btn btn-primary" to="/">home</router-link>
      <router-link class="btn btn-primary" to="/list">Check List</router-link>
      <router-link class="btn btn-primary" to="/list-edit">Edit List</router-link>
    </div>
  </nav>
  <main>
  <router-view class="" ></router-view>
  </main>
</template>

