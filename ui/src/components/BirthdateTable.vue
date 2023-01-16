<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Date of Birth</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.dateOfBirth }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="refreshData">Refresh</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import {url} from '../config/env_variables'

export default {
  setup() {
    const items = ref([])

    onMounted(async () => {
      await refreshData()
    })

    async function refreshData() {
      const response = await fetch(`${url}/data`)
      console.log(response)
      if(response.ok){
        const data = await response.json()
        items.value = data
      }
      
    }

    return { items, refreshData }
  }
}
</script>
