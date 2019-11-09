<template lang="html">
  <div class="border-top pb-3 px-3">
    <div class="row justify-content-center text-center">
      <!-- <div class="col border-superior ml-lg-5 ml-md-5 ml-0"></div> -->
      <h4 class="col-auto text-primary py-2 mb-0">
        Cambiar contraseña
      </h4>
      <!-- <div class="col border-superior mr-lg-5 mr-md-5 mr-0"></div> -->
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <p>Para una edición rapida, pulse <kbd>Tab</kbd> seguido por el valor para el campo dado.
            seguidamente pulse el boton <kbd class="bg-primary">CAMBIAR</kbd></p>
      </div>
    </div>

    <form role="form">
      <div class="row justify-content-left text-left">
        <div class="col-lg-4">
          <base-input type="text"
                      name="email"
                      v-model.trim="perfil.userEmail"
                      autocomplete="username email"
                      style="display: none;">
          </base-input>
          <base-input alternative class="mb-3"
                      label="Contraseña actual"
                      bg-label
                      :color-input="color"
                      type="password"
                      autocomplete="current-password"
                      minlength="6"
                      maxlength="20"
                      v-model.trim="password.passActual"
                      placeholder="contraseña actual" addon-left-icon="ni ni-lock-circle-open">
          </base-input>
        </div>
        <div class="col-lg-4">
          <!-- color-input="gray" y  color-input="blue" -->
          <base-input alternative
                      label="Nueva contraseña"
                      bg-label
                      :color-input="color"
                      class="mb-3"
                      type="password"
                      autocomplete="new-password"
                      minlength="6"
                      maxlength="20"
                      v-model="password.passNuevo"
                      placeholder="nueva contraseña"
                      addon-left-icon="ni ni-lock-circle-open">
          </base-input>
        </div>
        <div class="col-lg-4">
          <base-input alternative
                      label="Repita la nueva contraseña"
                      bg-label
                      :color-input="color"
                      class="mb-3"
                      type="password"
                      autocomplete="new-password"
                      minlength="6"
                      maxlength="20"
                      v-model="password.confirmPassNuevo"
                      placeholder="nueva contraseña"
                      addon-left-icon="ni ni-lock-circle-open">
          </base-input>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-auto">
          <base-button size="lg" type="primary" nativeType="submit" class="my-2 mr-0 bg-gradient-primary radius" @click.prevent="emitCambiar">
            <i class="fa fa-check mr-2" aria-hidden="true"></i>Cambiar
          </base-button>
        </div>
      </div>
    </form>

    <div class="row border bg-secondary rounded no-gutters align-items-center mt-3">
      <div class="col-auto px-2">
        <h5 class="text-monospace text-muted mb-0">N-03</h5>
      </div>
      <div class="col border-left pl-3 py-2 pr-1">
        <p class="font-weight-normal text-muted mb-0">En cualquier momento puedes modificar tu contraseña, por una mas segura, quizas. O tal vez,
        por una mas facil de recordar. Desde eCAR te recomendamos usar un <strong>gestor de contraseñas</strong>, el que
        tu prefieras.</p>
      </div>
    </div>

    <!-- <div class="row justify-content-center">
      <div class="col-9 text-center">
        <p class="font-weight-normal text-center mb-0">En cualquier momento puedes modificar tu contraseña, por una mas segura, quizas. O tal vez,
        por una mas facil de recordar. Desde eCAR te recomendamos usar un <strong>gestor de contraseñas</strong>, el que
        tu prefieras.</p>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'CambiarContrasena',
  data () {
    return {
      password: {}
    }
  },
  props: {
    perfil: {
      type: Object,
      description: 'datos registrados del perfil de usuario',
      default: undefined
    },
    color: {
      type: String,
      description: 'El color de la entrada de texto (default | blue | gray)',
      default: 'default'
    }
  },
  methods: {
    emitCambiar (evt) {
      this.$emit('cambiar', this.password)
    }
  }
}
</script>

<style lang="css">
</style>
