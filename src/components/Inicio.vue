<template>
  <section class="container">
    <div class="image-inicio bg-inicio">
      <button
        class="btn red-btn btn-inico"
        @click.prevent="clickIniciar"
        @mouseenter="hover"
      >
        <div class="text">Iniciar</div>
      </button>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Inicio',
  methods: {
    clickIniciar() {
      this.$emit('iniciar')
    },
    hover() {
      this.$emit('hover')
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 500;

  .image-inicio {
    position: absolute;
    top: 0;
    left: 0;

    .btn-inico {
      position: absolute;
      left: 844px;
      top: 664px;
    }
  }
}
</style>
