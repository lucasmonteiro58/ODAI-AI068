<template>
  <section class="container">
    <Backdrop :obj="actualObj.bg"></Backdrop>
    <div class="left-content">
      <button
        class="btn primary btn-inicio z200"
        @click.prevent="clickOpenInicio"
        @mouseenter="playAudioHover"
      >
        <div class="icon iconehome"></div>
        <div class="text">Início</div>
      </button>
      <button
        class="btn primary btn-ajuda z200"
        @click.prevent="clickOpenAjuda"
        @mouseenter="playAudioHover"
      >
        <div class="icon iconeajuda"></div>
        <div class="text">Ajuda</div>
      </button>
      <button
        class="btn primary btn-som z501"
        @click.prevent="toogleSound"
        @mouseenter="playAudioHover"
      >
        <div class="ico" :class="soundClass"></div>
        <div class="text">Som</div>
      </button>
      <button
        class="btn primary btn-creditos z501"
        @click.prevent="clickOpenCreditos"
        @mouseenter="playAudioHover"
      >
        <div class="icon iconecredito"></div>
        <div class="text t11">Créditos</div>
      </button>
    </div>
    <div class="center-content">
      <Drag
        v-if="showRegua"
        class="drag-position"
        :regua="actualObj.regua"
        @rotate="playAudioClick"
        @startdrag="playAudioGrab"
        @stopdrag="playAudioDrop"
        @hover="playAudioHover"
      ></Drag>
      <div class="titulo"></div>
      <div class="pergunta" v-html="perguntaText"></div>
      <div class="objeto-medir" :class="actualObj.imageG"></div>
      <div class="resposta z200">
        <div class="resposta-text">{{ respostaText }}</div>
        <input v-model="inputResposta" type="number" name="number" />
        <div class="text-cm">CM</div>
        <button
          class="btn red-btn btn-confirmar"
          :disabled="!inputResposta"
          @click.prevent="clickVerificarResposta"
          @mouseenter="playAudioHover"
        >
          <div class="text">confirmar</div>
        </button>
      </div>
    </div>
    <div class="right-content">
      <div
        v-for="i in listObj"
        :key="i.id"
        class="item-obj z200"
        :class="{ 'is-completed': i.isCompleted, 'is-selected': i.isSelected }"
        @click.prevent="clickChangeObj(i)"
        @mouseenter="playAudioHover"
      >
        <div class="image" :class="i.imageP"></div>
      </div>
    </div>
    <PopUpFeedback
      v-if="showFeedback"
      :is-showed="showFeedback"
      :objeto="actualObj"
      :is-correct="isCorrect"
      @voltar="clickCloseFeedback"
      @continuar="clickContinuarFeedback"
      @hover="playAudioHover"
    ></PopUpFeedback>
    <PopUpCongrats
      v-if="showCongrats"
      :is-showed="showCongrats"
      @inicio="clickInicioCongrats"
      @hover="playAudioHover"
    ></PopUpCongrats>
    <Inicio
      v-if="showIniciar"
      @iniciar="clickIniciar"
      @hover="playAudioHover"
    ></Inicio>
    <Help
      v-if="showHelp && !showIniciar"
      :index="indexHelp"
      :is-initial="isInitialHelp"
      @avancar="clickAvancarHelp"
      @voltar="clickVoltarHelp"
      @close="clickCloseHelp"
      @hover="playAudioHover"
    ></Help>
    <PopUpCreditos
      v-if="showCreditos"
      :is-showed="showCreditos"
      @close="clickCloseCreditos"
      @hover="playAudioHover"
    ></PopUpCreditos>
  </section>
</template>
<script>
import { listObj } from '../consts/home'
import Backdrop from '../components/Backdrop'
import Drag from '../components/Drag.vue'
import PopUpFeedback from '../components/PopUpFeedback.vue'
import PopUpCongrats from '../components/PopUpCongrats.vue'
import Inicio from '../components/Inicio.vue'
import audios from '../mixins/audios'
import PopUpCreditos from '../components/PopUpCreditos.vue'

export default {
  components: {
    Backdrop,
    Drag,
    PopUpFeedback,
    PopUpCongrats,
    Inicio,
    PopUpCreditos
  },
  mixins: [audios],
  data() {
    return {
      listObj,
      index: 0,
      inputResposta: null,
      showRegua: true,
      isCorrect: true,
      showFeedback: false,
      showCongrats: false,
      showIniciar: true,
      showHelp: true,
      showCreditos: false,
      indexHelp: 0,
      isInitialHelp: true
    }
  },
  computed: {
    actualObj() {
      return this.listObj[this.index]
    },
    soundClass() {
      if (this.soundState) return 'iconesomon'
      else return 'iconesompff'
    },
    soundState() {
      return this.$store.state.soundState
    },
    perguntaText() {
      return `Qual é
       ${this.actualObj.medidaArtigo}
      <b>${this.actualObj.medida}</b>
      ${this.actualObj.artigo}
      ${this.actualObj.nomeEx}?`
    },
    respostaText() {
      return `${this.actualObj.medidaArtigo}
      ${this.actualObj.medida}
      ${this.actualObj.artigo}
      ${this.actualObj.nomeEx} é?`
    }
  },
  watch: {
    inputResposta(newValue, oldValue) {
      if (parseInt(newValue) === 0) {
        this.inputResposta = 0
      } else if (newValue % 1 !== 0) {
        this.inputResposta = parseInt(oldValue)
      } else if (parseInt(newValue) > 99) {
        this.inputResposta = oldValue
      }
    }
  },
  mounted() {},
  methods: {
    clickChangeObj(el) {
      this.playAudioClick()
      this.deselectAll()
      this.inputResposta = null
      this.resetarRegua()
      this.index = el.id
      el.isSelected = true
    },
    // ------ help
    clickAvancarHelp() {
      this.playAudioClick()
      if (this.isInitialHelp) {
        if (this.indexHelp === 3) {
          this.showHelp = false
          this.isInitialHelp = false
          this.indexHelp = 0
        } else {
          this.indexHelp++
        }
      } else if (this.indexHelp === 2) {
        this.showHelp = false
        this.indexHelp = 0
      } else {
        this.indexHelp++
      }
    },
    clickCloseHelp() {
      this.playAudioClick()
      this.indexHelp = 0
      this.showHelp = false
      this.isInitialHelp = false
    },
    clickVoltarHelp() {
      this.playAudioClick()
      this.indexHelp--
    }, // -------------------
    clickOpenAjuda() {
      this.playAudioClick()
      this.showHelp = true
    },
    clickCloseAjuda() {
      this.playAudioClick()
      this.showHelp = false
    },
    clickOpenCreditos() {
      this.playAudioClick()
      this.showCreditos = true
    },
    clickCloseCreditos() {
      this.playAudioClick()
      this.showCreditos = false
    },
    clickIniciar() {
      this.playAudioClick()
      this.showIniciar = false
      this.resetarAll()
    },
    clickOpenInicio() {
      this.playAudioClick()
      this.showIniciar = true
    },
    clickCloseInicio() {
      this.playAudioClick()
      this.showIniciar = false
    },
    toogleSound() {
      this.$store.commit('changeSoundState', !this.soundState)
      this.playAudioClick()
    },
    clickInicioCongrats() {
      this.stopAudioFinal()
      this.playAudioClick()
      this.showCongrats = false
      this.resetarAll()
      this.showIniciar = true
    },
    resetarAll() {
      this.listObj.map((el) => {
        el.isSelected = false
        el.isCompleted = false
        return el
      })
      this.resetarRegua()
      this.listObj[0].isSelected = true
      this.inputResposta = null
      this.indexHelp = 0
      this.index = 0
      this.isInitialHelp = true
    },
    openCongrats() {
      this.showCongrats = true
      this.playAudioFinal()
    },
    clickCloseFeedback() {
      this.playAudioClick()
      this.showFeedback = false
    },
    clickContinuarFeedback() {
      // nao por som
      this.showFeedback = false
      this.getNextObjeto()
      this.playAudioClick()
    },
    clickVerificarResposta() {
      this.playAudioClick()
      if (parseFloat(this.inputResposta) === this.actualObj.resposta) {
        this.isCorrect = true
        this.showFeedback = true
        this.listObj[this.index].isCompleted = true
        this.playAudioCorreto()
      } else {
        this.isCorrect = false
        this.showFeedback = true
        this.playAudioErrado()
      }
    },
    resetarRegua() {
      this.showRegua = false
      setTimeout(() => {
        this.showRegua = true
      }, 5)
    },
    deselectAll() {
      this.listObj.map((i) => {
        i.isSelected = false
        return i
      })
    },
    getNextObjeto() {
      // nao colocar som aqui
      const next = this.listObj.filter((el) => el.isCompleted === false)
      if (next[0]) {
        this.clickChangeObj(next[0])
      } else {
        this.openCongrats()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  @include flex-center;
  flex-direction: column;

  .left-content {
    .btn-inicio {
      position: absolute;
      left: 40px;
      top: 40px;
    }

    .btn-ajuda {
      position: absolute;
      left: 40px;
      top: 127px;
    }

    .btn-som {
      position: absolute;
      left: 40px;
      top: 570px;
    }

    .btn-creditos {
      position: absolute;
      left: 40px;
      top: 660px;
    }
  }

  .center-content {
    width: 710px;
    @include flex-center;

    .drag-position {
      position: absolute;
      bottom: 130px;
    }
    .titulo {
      position: absolute;
      left: 121px;
      top: 22px;
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
    }

    .objeto-medir {
      position: absolute;
      &.gcola {
        left: 121px;
        top: 282px;
      }
      &.gestojo {
        left: 301px;
        top: 189px;
      }
      &.gcaneta {
        left: 341px;
        top: 222px;
      }
      &.gboneco {
        left: 115px;
        top: 302px;
      }
      &.glivro {
        left: 121px;
        top: 199px;
      }
    }

    .resposta {
      .resposta-text {
        position: absolute;
        width: 141px;
        height: 48px;
        left: 361px;
        top: 663px;
        text-align: right;
        color: #5c94b7;
        font-size: 17px;
        line-height: 28px;
      }

      .text-cm {
        position: absolute;
        width: 70px;
        height: 22px;
        left: 512px;
        top: 706px;
        font-size: 17px;
        line-height: 28px;

        text-align: center;
        text-transform: uppercase;
        color: #5c94b7;
      }

      input {
        position: absolute;
        width: 70px;
        height: 40px;
        left: 512px;
        top: 666px;
        padding-left: 8px;
        padding-right: 8px;
        font-size: 25px;
        color: #452d3f;
        text-align: center;
      }

      .btn-confirmar {
        position: absolute;
        left: 602px;
        top: 665px;
      }
    }
  }

  .right-content {
    position: absolute;
    width: 140px;
    left: 843px;
    top: 41px;
    display: flex;
    flex-direction: column;

    .item-obj {
      width: 140px;
      height: 120px;
      border: 7px solid #5c94b7;
      box-sizing: border-box;
      border-radius: 10px;
      @include flex-center;
      cursor: pointer;
      margin-bottom: 21px;

      &:hover {
        background-color: #a3c3d7;
      }

      &.is-selected {
        background-color: #5c94b7;
      }

      &.is-completed {
        border: 7px solid #60dc92;
      }
    }
  }
}
</style>
