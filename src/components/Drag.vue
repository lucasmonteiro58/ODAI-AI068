<template>
  <div class="drag-wrap">
    <div ref="elDrag" :class="classname" class="slot drag-el" draggable="false">
      <div
        ref="imageRotate"
        class="regua"
        :class="regua"
        :style="{ transform: 'rotate(' + angulo + 'deg)' }"
      >
        <div
          class="button-rotate giraresq"
          @click.prevent="rotate"
          @mouseenter="hover"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import interact from 'interactjs'
export default {
  props: {
    dropped: {
      type: Boolean,
      required: false,
      default: false
    },
    classname: {
      type: [String, Array],
      required: false,
      default: 'idle'
    },
    regua: {
      type: String,
      default: 'regua015'
    },
    onendEvent: {
      type: Function,
      required: false,
      default() {
        return undefined
      }
    },
    onstartEvent: {
      type: Function,
      required: false,
      default() {
        return undefined
      }
    },
    isSigmoid: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      dragging: false,
      initialSnapTarget: {
        targets: [{ x: 0, y: 0, range: Infinity }],
        relativePoints: [{ x: 0, y: 0 }],
        enabled: true,
        endOnly: true,
        offset: 'self'
      },
      sigmoidInterval: '',
      rotation: 0,
      translation: '',
      angulo: 0
    }
  },
  computed: {},
  mounted() {
    interact(this.$el.firstChild).draggable({
      inertia: true,
      restrict: {
        restriction: '.restrition-place'
      },
      onmove: (event) => this.onMove(event),
      onstart: (event) => this.onStart(event),
      onend: (event) => this.onEnd(event)
    })
    // console.log(
    //   Number(this.$refs.imageRotate.style.transform.replace(/([^\d])+/gim, ""))
    // );
    // this.angulo = this.$refs.
  },
  methods: {
    rotate() {
      this.$emit('rotate')
      if (this.angulo === 0) {
        this.angulo = -90
      } else {
        this.angulo = 0
      }
    },
    hover() {
      this.$emit('hover')
    },
    resetPosition() {
      this.$emit('audioapagar')
      const target = this.$refs.elDrag
      target.style.transform = `translate(0px, 0px)`
      target.setAttribute('data-x', 0)
      target.setAttribute('data-y', 0)
      target.classList.remove('can-drop')
      this.angulo = 0
      target.parentElement.parentElement.style.zIndex = '110'
    },

    onMove(event) {
      const target = event.target
      const dataX = target.getAttribute('data-x')
      const dataY = target.getAttribute('data-y')
      const initialX = parseFloat(dataX) || 0
      const initialY = parseFloat(dataY) || 0
      const deltaX = event.dx
      const deltaY = event.dy
      // width height fixed
      const widthRatio = window.innerWidth / 980
      const heightRatio = window.innerHeight / 720
      const min = Math.min(widthRatio, heightRatio)
      const newX = initialX + deltaX / min
      const newY = initialY + deltaY / min
      target.style.transform = `translate(${newX}px, ${newY}px)`
      target.setAttribute('data-x', newX)
      target.setAttribute('data-y', newY)
    },
    onStart(event) {
      this.$emit('startdrag')
      const target = event.target
      target.parentElement.classList.add('parent-start-drag')
      target.classList.add('start-drag')
    },
    onEnd(event) {
      this.$emit('stopdrag')
      this.$emit('end')
      event.target.classList.remove('start-drag')
      event.target.parentElement.classList.remove('parent-start-drag')
    }
  }
}
</script>
<style lang="scss" scoped>
[draggable='false'] > * {
  pointer-events: none;
  pointer-events: visible;
}
.slot {
  z-index: 100;
  touch-action: none;
  user-select: none;
  pointer-events: visible;
}

.regua {
  @include flex-center;
}

.button-rotate {
  position: absolute;
  bottom: -20px;
  cursor: pointer;
}

.btn-apagar-forma {
  display: none;
  position: absolute;
  cursor: pointer;
  transform: scale(0.9);
}
.drag-wrap {
  display: flex;
  align-items: center;
  justify-items: center;
  z-index: 102;
  pointer-events: visible;
  .can-drop {
    display: flex;
    align-items: center;
    justify-content: center;
    &:not(.dragging) {
      &:hover {
        .btn-apagar-forma {
          display: block;
        }
      }
    }
    .button-rotate {
      display: block;
      opacity: 0.28;
      transform: scale(0.8);
      position: absolute;
      top: -8px;
      right: -32px;
      cursor: pointer !important;
    }
  }
  .dragging {
    &.can-drop {
      filter: hue-rotate(74deg);
    }
    &.cannot-drop {
      filter: saturate(0%);
    }
  }
}
.empty-space {
  position: absolute;
  z-index: 10;
}
.class-can-drop {
  filter: brightness(350%) drop-shadow(0px 0px 5px rgb(255, 255, 62));
}

.parent-start-drag {
  transform: scale(1.02);
  z-index: 502;
}
</style>
