<template>
  <div v-show="showed" class="pop-up">
    <div class="backdrop"></div>
    <div v-if="isCorrect" class="content" :class="objeto.popupCorrect">
      <div class="text-popup">
        {{ objeto.textCorrect }}
      </div>
      <button
        class="btn red-btn"
        @click.prevent="clickContinuar"
        @mouseenter="hover"
      >
        <div class="text">Continuar</div>
      </button>
    </div>
    <div v-else class="content popup-quase">
      <div class="text-popup">
        CALMA, NÃO ESTÁ CERTO AINDA! OBSERVE COM ATENÇÃO E TENTE NOVAMENTE !
      </div>
      <button
        class="btn red-btn"
        @click.prevent="clickVoltar"
        @mouseenter="hover"
      >
        <div class="text">Voltar</div>
      </button>
    </div>
  </div>
</template>

<script>
import { fadeOut, fromTop } from '../assets/animate'
export default {
  name: 'PopUpFeedback',
  props: {
    isShowed: {
      type: Boolean,
      required: false,
      default: true
    },
    isCorrect: {
      type: Boolean,
      required: false,
      default: true
    },
    objeto: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showed: false
    }
  },
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
    hover() {
      this.$emit('hover')
    },
    clickContinuar() {
      this.$emit('continuar')
    },
    clickVoltar() {
      this.$emit('voltar')
    },
    clickClose() {
      this.$emit('close')
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  .backdrop {
    position: absolute;
    background-color: #00000090;
    width: 100%;
    height: 100%;
  }
  .content {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    .text-popup {
      width: 318px;
      height: 83px;
      font-size: 22px;
      font-family: FontRegular;
      font-style: normal;
      font-weight: normal;
      line-height: 26px;
      text-align: center;
      color: #452d3f;
      margin-top: 82px;
    }
    .red-btn {
      position: absolute;
      bottom: -5px;
      height: 46px;
    }
  }
}
</style>
