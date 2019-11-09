<template lang="html">
  <div :class="{'border-top px-3': borderTop}">
    <template v-if="standardHeader">
      <div class="row text-center">
        <h4 class="col-12 text-primary py-2 mb-0">
          Información del perfil
        </h4>
      </div>
      <div class="row">
        <div class="col-12 text-center">
          <p>Para una edición rapida, pulse <kbd>Tab</kbd> seguido por el valor para el campo dado.
              Para editar los campos pulse el boton <kbd class="bg-primary">EDITAR</kbd></p>
        </div>
      </div>
    </template>

    <form role="form">
      <slot name="first_row"></slot>
      <div class="row justify-content-left">
        <slot name="before"></slot>
        <div class="col-lg">
          <base-input :alternative="alternative"
                      label="Nombre"
                      :bg-label="bgLabel"
                      :color-input="color"
                      class="mb-3"
                      :disabled="!edit"
                      :lock="!edit"
                      v-model="payload.userName"
                      placeholder="Nombre"
                      addon-left-icon="fa fa-address-card">
          </base-input>
        </div>
        <div class="col-lg">
          <base-input :alternative="alternative"
                      label="Apellidos"
                      :bg-label="bgLabel"
                      :color-input="color"
                      class="mb-3"
                      :disabled="!edit"
                      :lock="!edit"
                      v-model="payload.userSurname"
                      placeholder="Apellidos"
                      addon-left-icon="fa fa-address-card">
          </base-input>
        </div>
      </div>
      <div class="row justify-content-left text-left">
        <div class="col-lg-3 col-md-6">
          <base-input :alternative="alternative"
                      label="Genero"
                      :bg-label="bgLabel"
                      :select="['Femenino', 'Masculino']"
                      :color-input="color"
                      v-on:toggle="toggleValue(payload, 'userGender', $event)"
                      class="mb-3"
                      :lock="!edit"
                      :disabled="true"
                      buttonLeft="fa fa-angle-down"
                      v-model.trim="payload.userGender"
                      placeholder="Genero"
                      addon-left-icon="fa fa-venus-mars">
          </base-input>
        </div>
        <div class="col-lg-3 col-md-6">
          <base-input :alternative="alternative"
                      class="mb-3"
                      :bg-label="bgLabel"
                      :color-input="color"
                      :disabled="!edit"
                      type="date"
                      label="F. de nacimiento"
                      v-model="userBirth"
                      addon-left-icon="fa fa-calendar">
          </base-input>
        </div>
        <div class="col-auto d-flex align-items-center pr-0 pt-2">
          <base-button size="sm" type="transparent" class="btn-tooltip no-translate-y bg-white mr-0" style="box-shadow:none;"
                       id="userEmail">
                       <i class="fa fa-info text-body" aria-hidden="true"></i>
          </base-button>
          <bPopover target="userEmail"
                    placement="top"
                    boundary="viewport"
                    title="El campo email esta bloqueado"
                    triggers="hover"
                    content="El correo electronico esta fijado a la cuenta con esparadrapo, y por tanto, es inmutable. Existe la posibilidad de crear una nueva cuenta.">
          </bPopover>
        </div>
        <div class="col pl-1">
          <base-input :alternative="alternative"
                      label="Correo electronico"
                      :bg-label="bgLabel"
                      :color-input="color"
                      class="mb-3"
                      :disabled="true"
                      :lock="true"
                      v-model="payload.userEmail"
                      placeholder="Correo electronico"
                      addon-left-icon="fa fa-envelope-open">
          </base-input>
        </div>
      </div>
      <div class="row justify-content-left text-left">
        <div class="col-lg-6 col-12">
          <base-input :alternative="alternative"
                      class="mb-3"
                      :bg-label="bgLabel"
                      label="Domicilio"
                      :color-input="color"
                      :disabled="!edit"
                      :lock="!edit"
                      v-model.trim="payload.userDomicilio"
                      placeholder="Ejemplo: Calle venia, 33"
                      addon-left-icon="fa fa-map-marker">
          </base-input>
        </div>
        <div class="col-lg-3 col">
          <base-input :alternative="alternative"
                      class="mb-3"
                      :bg-label="bgLabel"
                      label="Planta"
                      :color-input="color"
                      v-model="payload.planta"
                      placeholder="Ejemplo: 3º"
                      addon-left-icon="fa fa-map-marker">
          </base-input>
        </div>
        <div class="col-lg-3 col">
          <base-input :alternative="alternative"
                      class="mb-3"
                      :bg-label="bgLabel"
                      label="Puerta"
                      :color-input="color"
                      v-model.trim="payload.puerta"
                      placeholder="Ejemplo: A"
                      addon-left-icon="fa fa-map-marker">
          </base-input>
        </div>
      </div>
      <div class="row justify-content-left text-left">
        <div class="col-lg-4">
          <base-input :alternative="alternative"
                      label="Localidad"
                      :bg-label="bgLabel"
                      :color-input="color"
                      class="mb-3"
                      :disabled="!edit"
                      :lock="!edit"
                      v-model.trim="payload.userLocalidad"
                      placeholder="Ejemplo: Fines"
                      addon-left-icon="fa fa-location-arrow">
          </base-input>
        </div>
        <div class="col-lg-4">
          <base-input :alternative="alternative"
                      label="Provincia"
                      :bg-label="bgLabel"
                      :color-input="color"
                      class="mb-3"
                      :disabled="!edit"
                      :lock="!edit"
                      v-model.trim="payload.userProvincia"
                      placeholder="Ejemplo: Almeria"
                      addon-left-icon="fa fa-location-arrow">
          </base-input>
        </div>
        <div class="col-lg-4">
          <base-input :alternative="alternative"
                      label="Codigo postal"
                      :bg-label="bgLabel"
                      :color-input="color"
                      class="mb-3"
                      :disabled="!edit"
                      :lock="!edit"
                      v-model.trim="payload.userCP"
                      placeholder="Ejemplo: 04007"
                      addon-left-icon="fa fa-location-arrow">
          </base-input>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-auto">
          <base-button v-if="edit" size="lg" type="primary" nativeType="submit" class="my-2 bg-gradient-primary radius" @click.prevent="emitActualizarDatosPerfil">
            <i class="fa fa-check mr-2" aria-hidden="true"></i>
            Cambiar
          </base-button>
          <slot name="button"></slot>
        </div>
      </div>
      <slot name="after"></slot>
    </form>

    <div v-if="standardFooter" class="row border bg-secondary rounded no-gutters align-items-center mt-3">
      <div class="col-auto px-2">
        <h5 class="text-monospace text-muted mb-0">N-02</h5>
      </div>
      <div class="col border-left pl-3 py-2 pr-1">
        <p class="font-weight-normal text-muted mb-0">En eCAR creemos que tus datos solo te pertenecen a ti. Por eso mismo <strong>no</strong> realizamos un
          tratamiento comercial de los mismos y en cualquier momento puedes modificarlos.</p>
      </div>
    </div>

    <!-- <div class="row justify-content-center">
      <div class="col-9 text-center">
        <p class="font-weight-normal mb-0">En eCAR creemos que tus datos solo te pertenecen a ti. Por eso mismo <strong>no</strong> realizamos un
          tratamiento comercial de los mismos y en cualquier momento puedes modificarlos.</p>
      </div>
    </div> -->
  </div>
</template>

<script>
import bPopover from 'bootstrap-vue/es/components/popover/popover';

export default {
  name: 'InformacionPerfil',
  components: {
    bPopover
  },
  props: {
    payload: {
      type: Object,
      description: 'datos registrados del perfil de usuario',
      default: undefined
    },
    field: {
      type: String,
      description: 'nombre de la propiedad a la que se accede para formatear la fecha de nacimiento',
      default: 'perfil'
    },
    edit: {
      type: Boolean,
      description: 'editar la informacion del perfil',
      default: false
    },
    borderTop: {
      type: Boolean,
      description: 'colocar un borde superior o no'
    },
    standardHeader: {
      type: Boolean,
      description: 'mostrar o no la cabecera estandar del componente',
      default: true
    },
    standardFooter: {
      type: Boolean,
      description: 'mostrar o no el pie estandar del componente',
      default: true
    },
    color: {
      type: String,
      description: 'El color de la entrada de texto (default | blue | gray)',
      default: 'default'
    },
    alternative: {
      type: Boolean,
      description: 'usar el diseño alternative',
      default: true
    },
    bgLabel: {
      type: Boolean,
      description: 'Fondo a la etiqueta de la entrada de texto'
    }
  },
  computed: {
    userBirth: {
      get: function () {
        return this.$store.getters.user_birth(this.field)
      },
      set: function (value) {
        this.$store.commit('userBirth', { value, field: this.field })
      }
    }
  },
  methods: {
    toggleValue (obj, field, e) {
      if (this.edit) {
        if (obj === null) this.$set(this, field, e)
        this.$set(obj, field, e)
      }
    },
    emitActualizarDatosPerfil(evt) {
      this.$emit('actulizar-perfil', this.payload)
    }
  }
}
</script>

<style lang="css">

</style>
