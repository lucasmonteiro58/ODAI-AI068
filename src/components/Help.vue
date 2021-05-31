<template>
  <section class="container">
    <div class="bg-ajuda"></div>
    <div class="backdrop"></div>
    <div class="content" :class="computedHelp[index].class">
      <div
        v-if="isInitial && computedHelp[index].id === 0"
        class="image-help arraste-logo"
      ></div>
      <div class="text-help" v-html="computedHelp[index].text"></div>
      <div class="button-section">
        <button
          v-if="index !== 0"
          class="btn blue-btn "
          @mouseenter="hover"
          @click="voltarClick"
        >
          <div class="text">Voltar</div>
        </button>
        <button class="btn blue-btn " @mouseenter="hover" @click="avancarClick">
          <div class="text">{{ nxtBtn }}</div>
        </button>
      </div>
    </div>
    <button
      class="btn red-btn btn-fechar"
      @click.prevent="clickClose"
      @mouseenter="hover"
    >
      <div class="text">Sair da ajuda</div>
    </button>
    <div class="pergunta" :class="computedHelp[index].class">
      Qual é a <b>altura</b> do tubo de cola?
    </div>
    <div class="gcola" :class="computedHelp[index].class"></div>
    <div class="btn-ajuda-animation" :class="computedHelp[index].class"></div>
    <!-- animation -->
    <div v-if="computedHelp[index].id === 1" class="regua-com-seta"></div>

    <div v-if="computedHelp[index].id === 2" class="escala"></div>
    <div v-if="computedHelp[index].id === 2" class="regua-sem-seta"></div>
    <div v-if="computedHelp[index].id === 2" class="icon-seta seta2regua"></div>
    <div v-if="computedHelp[index].id === 2" class="icon-seta seta2nome"></div>

    <div v-if="computedHelp[index].id === 3" class="icon-seta seta3nome"></div>
    <div v-if="computedHelp[index].id === 3" class="xx">XX</div>
  </section>
</template>
<script>
import { helps, initialHelps } from '../consts/help'
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    isInitial: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      helps,
      initialHelps
    }
  },
  computed: {
    nxtBtn() {
      if (this.index === this.computedHelp.length - 1) return 'Iniciar'
      else return 'Avançar'
    },
    computedHelp() {
      if (this.isInitial) return initialHelps
      else return helps
    }
  },
  mounted() {},
  methods: {
    voltarClick() {
      this.$emit('voltar')
    },
    clickClose() {
      this.$emit('close')
    },
    avancarClick() {
      this.$emit('avancar')
    },
    hover() {
      this.$emit('hover')
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  @include flex-center;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .backdrop {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.7);
    top: 0;
    left: 0;
    z-index: 650;
    width: 100%;
    height: 100%;
  }

  .bg-ajuda {
    position: absolute;
    background-color: #fff;
    top: 0;
    left: 0;
    z-index: 650;
  }
  .content {
    justify-content: center;
    background-color: #fff;
    position: absolute;
    z-index: 701;
    border-radius: 20px;
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.25));
    padding: 40px 23px;
    display: flex;
    justify-content: center;

    .image-help {
      position: absolute;
      top: 79px;
    }

    .text-help {
      font-size: 25px;
      line-height: 40px;
      color: #452d3f;
    }

    &.help-0 {
      width: 593px;
      height: 380px;
      left: 227px;
      top: 186px;
    }

    &.help-1 {
      width: 599px;
      height: 242px;
      left: 384px;
      top: 143px;
    }

    &.help-2 {
      width: 599px;
      height: 337px;
      left: 384px;
      top: 371px;
    }

    &.help-3 {
      width: 599px;
      height: 288px;
      left: 384px;
      top: 302px;
    }
  }
}

.button-section {
  position: absolute;
  bottom: -28px;
  display: flex;
  width: 353px;
  gap: 75px;
  justify-content: center;
}

.btn-fechar {
  position: absolute;
  top: 40px;
  right: 40px;
  z-index: 700;
  .text {
    color: white;
    font-size: 16px;
  }
}

.pergunta {
  position: absolute;
  left: 204px;
  top: 134px;
  font-size: 25px;
  width: 552px;
  height: 42px;
  text-align: center;
  color: #503849;
  z-index: 700;
  opacity: 0.3;
  &.help-2 {
    opacity: 1;
  }
}

.gcola {
  position: absolute;
  z-index: 700;
  left: 121px;
  top: 270px;
  opacity: 0.3;

  &.help-1 {
    opacity: 1;
  }

  &.help-2 {
    opacity: 1;
  }
}

.btn-ajuda-animation {
  position: absolute;
  z-index: 700;
  left: 361px;
  top: 663px;
  opacity: 0.3;
  &.help-3 {
    opacity: 1;
  }
}

.regua-com-seta {
  position: absolute;
  z-index: 700;
  bottom: 111px;
  left: 300px;
  animation: reguaTranslate linear 2s;
  animation-iteration-count: infinite;
  transform-origin: 50% 50%;
}

.regua-sem-seta {
  position: absolute;
  z-index: 700;
  bottom: 389px;
  left: 48px;
  animation: reguaRotate linear 4s;
  animation-iteration-count: infinite;
  transform-origin: 50% 50%;
}

.seta2regua {
  position: absolute;
  z-index: 700;
  bottom: 369px;
  left: 246px;
}

.seta2nome {
  position: absolute;
  z-index: 700;
  bottom: 523px;
  left: 443px;
  animation: translateSeta linear 4s;
  animation-iteration-count: infinite;
  transform-origin: 50% 50%;
}

.seta3nome {
  position: absolute;
  z-index: 700;
  bottom: 40px;
  left: 527px;
  animation: translateSeta3 linear 4s;
  animation-iteration-count: infinite;
  transform-origin: 50% 50%;
}

.escala {
  position: absolute;
  z-index: 700;
  bottom: 321px;
  left: 182px;
  animation: aparecerEscala linear 4s;
  animation-iteration-count: infinite;
  transform-origin: 50% 50%;
}

.xx {
  position: absolute;
  z-index: 700;
  bottom: 61px;
  left: 533px;
  font-size: 25px;
  animation: aparecer linear 4s;
  animation-iteration-count: infinite;
  transform-origin: 50% 50%;
}

@keyframes reguaTranslate {
  0% {
    transform: translate(0px, 0px);
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translate(-158px, -143px);
    opacity: 0;
  }
}

@keyframes reguaRotate {
  0% {
    transform: rotate(0deg);
  }
  40% {
    transform: rotate(-90deg);
  }
  100% {
    transform: rotate(-90deg);
  }
}

@keyframes translateSeta {
  0% {
    transform: translate(0px, 0px);
  }
  40% {
    transform: translate(-44px, -37px);
  }
  100% {
    transform: translate(-44px, -37px);
  }
}

@keyframes translateSeta3 {
  0% {
    transform: translate(0px, 0px);
  }
  40% {
    transform: translate(124px, 30px);
  }
  100% {
    transform: translate(124px, 30px);
  }
}

@keyframes aparecer {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0;
  }
  11% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

@keyframes aparecerEscala {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
</style>
