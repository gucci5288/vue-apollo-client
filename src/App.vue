<template>
  <div id="app">
    <h1>聞人雅士 Vue - Apollo 實戰去</h1>
    <img alt="Vue logo" src="./assets/logo.png">
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <User/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import User from './components/User'
export default {
  name: 'app',
  components: {
    // HelloWorld,
    User
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
