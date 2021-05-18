<template>
  <div v-show="showed" class="pop-up">
    <div class="backdrop"></div>
    <div class="content">
      <div class="list-creditos">
        <div class="title">Créditos</div>
        <br /><br />
        <b class="title-strong">IMAGENS VETORIAIS</b>
        <p>Restart por Jejen Juliansyah Nur Agung do Noun Project</p>
        <p>Sound por Adrien Coquet do Noun Project</p>
        <p>Home por icongeek do Noun Project</p>
        <p>Cursor por Zaff Studio do Noun Project</p>
        <p>Bitten Half Eaten Pink Donuts... por pch.vector do Freepik.com</p>
        <p>Flat Back School Label Collection por Freepik.com</p>
        <br /><br />

        <b class="title-strong">IMAGENS RASTERIZADAS</b>
        <p>Cola por Dayane Raven</p>
        <p>Caneta por Editoria de arte</p>
        <br /><br />

        <b class="title-strong">ÁUDIOS </b>
        <p>Error 003 por Kenney Vleugels (Kenney.nl)</p>
        <p>Switch 007 por Kenney Vleugels (Kenney.nl)</p>
        <p>
          Click 2 por Kenney Vleugels (Kenney.nl)
        </p>
        <p>Click 4 por Kenney Vleugels (Kenney.nl)</p>
        <p>mouth pops por chestnutjam do Freesound.org</p>
        <p>instant win 2021 por Mixkit</p>
        <p>Snippet por xythe do Freesound.org</p>
      </div>
      <button
        class="btn red-btn btn-voltar"
        @click.prevent="close"
        @mouseenter="mouseOverSong"
      >
        <div class="text">Voltar</div>
      </button>
    </div>
  </div>
</template>

<script>
import { fadeOut, scaleIn } from '../assets/animate'
export default {
  name: 'PopUpCreditos',
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
      scaleIn(this.$el.lastChild)
    },
    close() {
      this.$emit('close')
    },
    mouseOverSong() {
      this.$emit('hover')
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
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  .backdrop {
    position: absolute;
    background-color: #ffffff97;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .content {
    width: 694px;
    height: 659px;
    margin-top: -10px;
    filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.25));
    background: #5dc5de;
    border-radius: 25px;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    .btn-voltar {
      position: absolute;
      bottom: -24px;
    }
    .list-creditos {
      width: 80%;
      text-align: center;
      line-height: 18px;
      .title {
        font-size: 48px;
        margin-top: -9px;
        margin-bottom: 23px;
        text-transform: uppercase;
        color: #452d3f;
      }
      p {
        text-transform: initial;
        font-size: 16px;
        color: #452d3f;
      }
      .subtitle {
        font-size: 15px;
      }
    }
  }
}
.title-strong {
  font-size: 28px;
  height: 50px;
  color: #452d3f;
}
</style>
