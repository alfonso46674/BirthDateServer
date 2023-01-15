<template>
  <div>
    <form @submit.prevent="submitForm">
      <input v-model="name" type="text" placeholder="name" required />
      <input v-model="dateOfBirth" type="date" placeholder="date of birth" required />
      <button type="submit">Add</button>
    </form>
    <Popup v-if="showPopup" :message="popupMessage" @close="showPopup = false" />
  </div>
</template>

<script>
import { ref } from 'vue'
import Popup from './PopupDisplay.vue' // import the popup component

export default {
  components: {
    Popup
  },
  setup() {
    const name = ref('')
    const dateOfBirth = ref('')
    const showPopup = ref(false)
    const popupMessage = ref('')
    async function submitForm() {
      try {
        const response = await fetch('your-server-url', {
          method: 'POST',
          body: JSON.stringify({ name: name.value, dateOfBirth: dateOfBirth.value }),
          headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
          popupMessage.value = 'Data saved successfully!'
        } else {
          popupMessage.value = 'An error occurred while saving the data. Please try again.'
        }
        showPopup.value = true
      } catch (error) {
        popupMessage.value = 'An error occurred while connecting to the server. Please check your internet connection.'
        showPopup.value = true
      }
    }
    return { name, dateOfBirth, submitForm, showPopup, popupMessage }
  },
}
</script>
