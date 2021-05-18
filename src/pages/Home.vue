<template>
  <section class="container">
    <Backdrop :obj="actualObj.bg"></Backdrop>
    <div class="left-content">
      <button class="btn primary btn-inicio">
        <div class="icon iconehome"></div>
        <div class="text">Início</div>
      </button>
      <button class="btn primary btn-ajuda">
        <div class="icon iconeajuda"></div>
        <div class="text">Ajuda</div>
      </button>
      <button class="btn primary btn-som">
        <div class="icon iconesomon"></div>
        <div class="text">Som</div>
      </button>
      <button class="btn primary btn-creditos">
        <div class="icon iconecredito"></div>
        <div class="text t11">Créditos</div>
      </button>
    </div>
    <div class="center-content">
      <Drag
        v-if="showRegua"
        class="drag-position"
        :regua="actualObj.regua"
      ></Drag>
      <div class="titulo"></div>
      <div class="pergunta" v-html="perguntaText"></div>
      <div class="objeto-medir" :class="actualObj.imageG"></div>
      <div class="resposta">
        <div class="resposta-text">{{ respostaText }}</div>
        <input v-model="inputResposta" type="number" name="number" />
        <div class="text-cm">CM</div>
        <button class="btn red-btn btn-confirmar">
          <div class="text">confirmar</div>
        </button>
      </div>
    </div>
    <div class="right-content">
      <div
        v-for="i in listObj"
        :key="i.id"
        class="item-obj"
        :class="{ 'is-completed': i.isCompleted, 'is-selected': i.isSelected }"
        @click.prevent="clickChangeObj(i)"
      >
        <div class="image" :class="i.imageP"></div>
      </div>
    </div>
  </section>
</template>
<script>
import { listObj } from '../consts/home'
import Backdrop from '../components/Backdrop'
import Drag from '../components/Drag.vue'
export default {
  components: { Backdrop, Drag },
  data() {
    return {
      listObj,
      index: 0,
      inputResposta: null,
      showRegua: true
    }
  },
  computed: {
    actualObj() {
      return this.listObj[this.index]
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
      } else if (parseInt(newValue) > 99) {
        this.inputResposta = oldValue
      }
    }
  },
  methods: {
    clickChangeObj(el) {
      this.deselectAll()
      this.inputResposta = null
      this.resetarRegua()
      this.index = el.id
      el.isSelected = true
    },
    deselectAll() {
      this.listObj.map((i) => {
        i.isSelected = false
        return i
      })
    },
    resetarRegua() {
      this.showRegua = false
      setTimeout(() => {
        this.showRegua = true
      }, 5)
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
        background-color: #5c94b7;
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
