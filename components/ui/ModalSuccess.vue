<template>
  <div v-if="show" class="modal-success">
    <h2 class="text-center mb-5">File upload completed</h2>
    <BaseButton class="w-full" @click="$emit('closeModal')">Close modal</BaseButton>
  </div>
</template>

<script>
  import { BaseButton } from '@/components/ui'

  export default {
    name: 'ModalSuccess',

    components: {
      BaseButton
    },

    props: {
      show: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
.modal-success {
  @apply rounded overflow-hidden shadow-lg p-5;
  width: 500px;
  position: fixed;
  margin:auto;
  left:0;
  right:0;
}
</style>
