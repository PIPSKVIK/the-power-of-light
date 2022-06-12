<template>
  <div class="wrapper">
    <BaseButton v-if="!showModal" @click="showModal = true"
      >Добавить группу</BaseButton
    >
    <transition name="fade">
      <ModalCreateForm v-if="showModal" />
    </transition>
  </div>
</template>

<script>
import { BaseButton, ModalCreateForm } from '@/components/ui'

export default {
  name: 'IndexPage',

  components: {
    BaseButton,
    ModalCreateForm,
  },

  data() {
    return {
      showModal: false,
    }
  },
}
</script>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
