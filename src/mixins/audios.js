import { useSound } from '@vueuse/sound'

// import success from '../assets/audios/success.wav'
// import error from '../assets/audios/error.wav'
// import click from '../assets/audios/click.wav'
// import apagar from '../assets/audios/apagar.wav'
// import encaixar from '../assets/audios/encaixe.wav'

import click from '../assets/audios/click.wav'
import correto from '../assets/audios/correto.wav'
import drop from '../assets/audios/drop.wav'
import errado from '../assets/audios/errado.wav'
import final from '../assets/audios/final.wav'
import grab from '../assets/audios/grab.wav'
import mouseenter from '../assets/audios/mouseenter.wav'

const audios = {
  setup() {
    const audioClick = useSound(click)
    const audioCorreto = useSound(correto)
    const audioDrop = useSound(drop)
    const audioErrado = useSound(errado)
    const audioFinal = useSound(final)
    const audioGrab = useSound(grab)
    const audioHover = useSound(mouseenter)
    return {
      audioClick,
      audioCorreto,
      audioDrop,
      audioErrado,
      audioFinal,
      audioGrab,
      audioHover
    }
  },
  methods: {
    playAudioClick() {
      if (this.soundState) this.audioClick.play()
    },
    playAudioCorreto() {
      if (this.soundState) {
        setTimeout(() => {
          this.audioCorreto.play()
        }, 300)
      }
    },
    playAudioDrop() {
      if (this.soundState) this.audioDrop.play()
    },
    playAudioErrado() {
      if (this.soundState) {
        setTimeout(() => {
          this.audioErrado.play()
        }, 300)
      }
    },
    playAudioFinal() {
      if (this.soundState) {
        setTimeout(() => {
          this.audioFinal.play()
        }, 300)
      }
    },
    stopAudioFinal() {
      if (this.soundState) this.audioFinal.stop()
    },
    playAudioGrab() {
      if (this.soundState) this.audioGrab.play()
    },
    playAudioHover() {
      if (this.soundState) this.audioHover.play()
    }
  }
}

export default audios
