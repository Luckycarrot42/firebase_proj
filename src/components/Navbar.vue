<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">0048 CRUD with Firebase</a>
      <div id="navbarNav" class="ml-auto">
        <ul class="navbar-nav">
          <li><router-link class="nav-link" to="/login">Login</router-link></li>
          <li><router-link v-if="currentUser" class="nav-link" to="/home">Home</router-link></li>
          <li v-if="currentUser"><a href="#" @click.prevent="logout" class="nav-link">Logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>


<script>
import firebase from 'firebase'
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['currentUser']),
  },
  methods: {
    ...mapActions(['setUser']),
    logout(){
      firebase.auth().signOut().then( () => {
        this.$router.push('/')
        this.setUser( undefined)
      })
    }
  }
}
</script>

<style>

</style>