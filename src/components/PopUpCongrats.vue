<template>
  <div v-show="showed" class="pop-up">
    <div class="backdrop"></div>
    <div class="content popup-parabens">
      <div class="content-popup">
        <div class="text-popup">
          VOCÊ MEDIU TODOS OS OBJETOS CORRETAMENTE E CONCLUIU A ATIVIDADE!!! BOM
          TRABALHO!!!<br /><br />
          AGORA VOCÊ JÁ SABE COMO UTILIZAR UMA RÉGUA PARA SABER A MEDIDA EXATA
          DE UM OBJETO! RECEBA ESTA MEDALHA!!!
        </div>

        <button class="btn red-btn btn-inicio" @click.prevent="close">
          <div class="text">Início</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { fadeOut, fromTop } from '../assets/animate'
export default {
  name: 'PopUpCongrats',
  props: {
    isShowed: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      showed: false
    }
  },
  computed: {},
  watch: {
    isShowed(val, old) {
      if (!old && val) {
        this.showed = true
        this.showAnimation()
      } else if (old && !val) {
        this.showed = false
      }
    }
  },
  mounted() {
    if (this.isShowed) this.showed = true
    this.showAnimation()
  },
  beforeDestroy() {
    fadeOut(this.$el)
  },
  methods: {
    showAnimation() {
      fromTop(this.$el.lastChild)
    },
    close() {
      this.$emit('inicio')
    }
  }
}
</script>

<style lang="scss" scoped>
.title-popup {
  font-size: 32px;
}
.pop-up {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  .backdrop {
    position: absolute;
    background-color: #ffffffbb;
    width: 100%;
    height: 100%;
  }
  .content {
    position: relative;
    .text-popup {
      position: absolute;
      width: 318px;
      top: 99px;
      left: 244px;
      font-size: 22px;
      line-height: 26px;
      text-align: center;
      color: #452d3f;
      font-family: FontRegular;
    }
    .btn-inicio {
      position: absolute;
      bottom: -3px;
      left: 320px;
    }
  }
}
</style>
