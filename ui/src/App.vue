<template>
  <add-birthday></add-birthday>
</template>

<script>
import AddBirthday from './components/AddBirthday.vue'

export default {
  name: 'App',
  components: {
    AddBirthday
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
