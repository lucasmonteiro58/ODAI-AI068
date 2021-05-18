<template>
  <section class="container" :class="obj"></section>
</template>
<script>
export default {
  props: {
    obj: {
      type: String,
      default: 'bg-cola'
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  @include flex-center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: -1;

  .obj {
    position: absolute;
    opacity: 0.2;
  }
}
</style>
