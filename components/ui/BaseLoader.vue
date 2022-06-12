<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="loader-wrapper"
      :class="{ 'loader-wrapper--full': full }"
    >
      <img
        :width="size"
        src="~assets/img/loading.svg"
        alt="Loading..."
        class="loader-image"
      />
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    size: {
      type: [Number, String],
      default: 80,
    },
    full: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.loader-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.loader-wrapper--full {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
}
</style>
