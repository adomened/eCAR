<template lang="html">
  <div class="register-page bg-gradient-default">
    <section>
      <div class="container">
        <div class="row justify-content-center align-items-center" :style="getViewporHeight">
          <template v-if="noBody">
            <slot name="acceder"></slot>
          </template>

          <template v-if="!noBody">
            <div class="col-lg-7 col-md-10 col-12 mt-5">
              <slot v-if="show.inicio" name="inicio"></slot>
              <card type="secondary" shadow
                    header-classes="bg-white pb-5"
                    body-classes="px-3 py-md-2 py-1"
                    class="border-0">
                  <div v-if="showButtonOption" class="btn-wrapper text-center my-2 mb-2 col-12">
                    <div class="text-muted text-center mb-1">
                        <small class="font-weight-bold d-block">Puede utilizar una red social</small>
                    </div>
                    <base-button block type="neutral" class="my-2 border-0" @click="toggle">
                      <i class="fa fa-ravelry pr-2" aria-hidden="true"></i>Redes sociales
                    </base-button>
                    <div class="text-muted text-center mb-1">
                        <small class="font-weight-bold d-block">O, a través de email y contraseña</small>
                    </div>
                    <base-button block type="neutral" class="my-2 border-0" @click="toggle">
                      <i class="fa fa-user pr-2" aria-hidden="true"></i>Credenciales
                    </base-button>
                  </div>
                  <template v-if="show.redesSociales">
                    <slot name="redes-sociales"></slot>
                  </template>
                  <template v-if="show.credenciales">
                    <slot name="credenciales"></slot>
                  </template>
              </card>
              <div v-show="showAtras" class="text-muted text-center mb-1">
                <base-button block type="neutral" @click="atrasMethod" class="no-translate-y bg-secondary my-2">
                  <i class="fa fa-angle-left mr-2" aria-hidden="true"></i>
                  atrás
                </base-button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: {
        redesSociales: false,
        credenciales: true, // MODIFICADO A TRUE
        inicio: true // MODIFICADOR A TRUE
      },
      showButtonOption: false, // MODIFICADO A FALSE
      showAtras: false,
      viewportHeight: window.innerHeight
    }
  },
  props: {
    noBody: {
      type: Boolean,
      description: 'show body content or not',
      default: false
    },
    height: {
      type: Number,
      description: 'height',
      default: 775
    }
  },
  mounted: function () {
    window.addEventListener('resize', () => {
      this.viewportHeight = window.innerHeight
    })
  },
  destroyed: function () {
    window.removeEventListener('resize', () => {
      this.viewportHeight = window.innerHeight
    })
  },
  computed: {
    // Las propiedades calculadas sólo se actualizan cuando sus dependencias
    // cambian (window.innerHeight no lo es)
    getViewporHeight () {
      if (this.viewportHeight > this.height)
        return 'height: ' + this.viewportHeight + 'px;'
      else return 'height: ' + this.height + 'px;'
    }
  },
  methods: {
    atrasMethod () {
      this.$set(this.show, 'credenciales', false)
      this.$set(this.show, 'inicio', false)
      this.$set(this.show, 'redesSociales', false)
      this.showButton = true
      this.showAtras = false
    },
    toggle (evt) {
      let innerText = evt.toElement.innerText.trim()
      if (innerText === "CREDENCIALES") {
        this.$set(this.show, 'credenciales', true)
        this.$set(this.show, 'inicio', true)
        this.$set(this.show, 'redesSociales', false)
        this.showButton = false
        this.showAtras = true
      }
      else {
        this.$set(this.show, 'credenciales', false)
        this.$set(this.show, 'inicio', false)
        this.$set(this.show, 'redesSociales', true)
        this.showButton = false
        this.showAtras = true
      }
    }
  }
}
</script>

<style lang="css">
</style>
