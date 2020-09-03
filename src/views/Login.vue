<template>
  <div class="home">
    <h3>Formulario de Acceso</h3>
    <div class="container">
      <form id="firebaseForm" v-on:submit.prevent="login">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <button type="submit" class="btn btn-primary">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['setUser']),
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then( () => {
        this.setUser({
          email: this.email,
        })
        console.log (this.email)
        console.log(this.password)
        this.$router.push('/home')
      })
      .catch(() => {
        alert("Usuario no válido")
      })
    }
  }
}
</script>
