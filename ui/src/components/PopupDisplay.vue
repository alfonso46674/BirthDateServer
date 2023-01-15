<template>
  <div>
    <div v-if="message" class="popup-wrapper">
      <div class="popup-content">
        <p>{{ message }}</p>
        <button @click="$emit('close')">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>