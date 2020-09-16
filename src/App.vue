<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view/>
   
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import CarList from './components/CarList'
export default {
  name: 'App',
  components:{
    NavBar,
    CarList
  }
}
</script>

<style>

</style>
