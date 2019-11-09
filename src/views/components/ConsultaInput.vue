<template lang="html">
  <div class="row">
    <div :class="{'col-lg-6 col-md-10 col-12': size === 'lg', 'col-12': size === 'sm',
    'bg-primary shadow-lg': color === 'primary', 'bg-white': color === 'white', 'bg-secondary': color === 'secondary' }" class="rounded-bottom mx-auto px-0">
      <div v-if="!admin && !modal" class="rounded-top bg-primary text-center p-2 mb-2">
        <span class="text-secondary">
          <i class="fa fa-envelope-open-o mr-2"></i>
          Mensaje nuevo
        </span>
      </div>
      <div v-if="label" class="col-12 px-2">
        <badge type="info">{{label}}</badge>
      </div>
      <form class="p-2">
        <div class="row">
          <div v-if="admin" class="col-12">
            <div class="row align-items-center mb-3">
              <div class="col pr-0">
                <base-input :alternative="alternative"
                            :disabled="disabled"
                            v-model="nickname"
                            placeholder="Buscar nickname"
                            addon-left-icon="fa fa-search">
                </base-input>
              </div>
              <div class="col-auto">
                <base-button iconOnly :type="type" class="border-0 no-translate-y radius mr-0 mb-3" @click.prevent="handleClick">
                  <i class="fa fa-search"></i>
                </base-button>
              </div>
              <div class="col-12">
                <slot name="search-user"></slot>
              </div>
            </div>
          </div>
          <div v-if="!titulo" class="col-12">
            <base-input :alternative="alternative"
                        maxlength="50"
                        :disabled="disabled"
                        v-model="consulta.titulo"
                        placeholder="Asunto de la consulta"
                        addon-left-icon="fa fa-commenting-o">
            </base-input>
          </div>
          <div class="col-12">
            <textarea maxlength="250" v-model="consulta.contenido" class="form-control" :class="{'form-control-alternative': alternative}" rows="3" placeholder="Escriba aqui el contenido de la consulta"></textarea>
          </div>
        </div>
      </form>
      <span class="text-right px-2" :class="{'text-secondary': color === 'primary', 'text-muted': color === 'white'}" v-if="consulta.contenido">
        <small>{{consulta.contenido.length}}/250</small>
      </span>
      <div class="row justify-content-between p-2">
        <div class="col-auto">
          <div class="icon icon-shape d-flex align-items-center rounded-circle"
          :class="{'bg-white text-primary': type === 'neutral', 'bg-default text-secondary': type === 'default', 'bg-white text-default': type === 'secondary'}">
            <i class="ni ni-send" aria-hidden="true"></i>
          </div>
        </div>
        <div class="col-auto">
          <base-button size="lg" :type="type" :class="{'bg-white': type === 'secondary'}" class="border-0 no-translate-y mr-0" @click.prevent="emit">
            enviar
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsultaInput',
  data () {
    return {
      consulta: {},
      nickname: undefined
    }
  },
  props: {
    titulo: {
      type: String,
      description: 'el contenido para el titulo cuando adjuntemos un nuevo mensaje a una consulta "abierta".'
    },
    size: {
      type: String,
      description: 'tamaño de la caja de la consulta (lg|sm)',
      default: 'lg'
    },
    color: {
      type: String,
      description: 'color de la caja de la consulta (primary|white|secondary)',
      default: 'primary'
    },
    alternative: {
      type: Boolean,
      description: 'diseño alternative',
      default: true
    },
    type: {
      type: String,
      description: 'el tipo de boton y elemento decorativo',
      default: 'neutral'
    },
    admin: {
      type: Boolean,
      description: 'si el componente aparece en las secciones admin'
    },
    label: {
      type: String,
      description: 'etiqueta anexa a la consulta'
    },
    modal: {
      type: Boolean,
      description: 'si ConsultaInput está contenido en un componente modal'
    }
  },
  computed: {
    disabled () {
      if (this.titulo) return true
      else return false
    }
  },
  methods: {
    emit () {
      if (this.titulo) {
        this.$emit('interaction', {titulo: this.titulo, contenido: this.consulta.contenido})
      } else {
        this.consulta = {...this.consulta, label: this.label}
        this.$emit('query', this.consulta)
      }
    },
    handleClick (evt) {
      this.$emit('click-search', this.nickname)
    }
  }
}
</script>

<style lang="scss">
.search-input{
  padding: .7em 3.5em !important;
  font-size: .975rem !important;
}
.dropdown{
  font-size: .875rem !important;
}
.search-input:focus {
  border-color: rgba(50,151,211,.25) !important;
}
.search-input::placeholder {
  color: #adb5bc;
}
.single-select-wrapper {
    position: relative;
    margin-bottom: 0em !important;
    &:after {
        width: 19px;
        height: 19px;
        line-height: 19px;
        text-align: center;
        font-family: 'FontAwesome';
        display: inline-block;
        position: absolute;
        left: 10px;
        top: 4px;
        transform: translateY(50%);
        opacity: 1;
    }
}
.single-select-wrapper {
    &:after {
        content: "\f2c0";
        color: #525f7f;
    }
}
:focus {
  outline: inherit;
}
</style>
