<template>
  <div>
    <add-birthday></add-birthday>
    <birthdate-table></birthdate-table>
  </div>
</template>

<script>
import AddBirthday from './components/AddBirthday.vue'
import BirthdateTable from './components/BirthdateTable.vue'

export default {
  name: 'App',
  components: {
    AddBirthday,
    BirthdateTable
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
