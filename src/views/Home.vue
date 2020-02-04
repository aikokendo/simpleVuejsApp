<template>
  <div class="home">
    <h1>Welcome to the Simplest App!</h1>

     <template>
      ...
        <div v-if="!loggedIn">
          To use this app you'll need to
          <router-link to="/login">
            Login
          </router-link>
        </div>
      ...
    </template>


  </div>
</template>

<script>
export default {}
</script>
