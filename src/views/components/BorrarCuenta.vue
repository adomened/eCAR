<template lang="html">
  <div class="border-top pb-3 px-3">
    <div class="row justify-content-center text-center">
      <!-- <div class="col border-superior ml-lg-5 ml-md-5 ml-0"></div> -->
      <h4 class="col-auto text-primary py-2 mb-0">
        Borrar su cuenta
      </h4>
      <!-- <div class="col border-superior mr-lg-5 mr-md-5 mr-0"></div> -->
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <p class="mb-1">pulse el boton <kbd class="bg-danger">ELIMINAR CUENTA</kbd> para borrar su cuenta.
          Se implementa un paso extra para evitar que se dispare accidentalmente.</p>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-auto">
        <base-button size="lg" type="danger" nativeType="button" class="my-2 mr-0 bg-gradient-danger radius" @click="modalDelete = true">
          <i class="fa fa-trash-o mr-2" aria-hidden="true"></i>Eliminar cuenta
        </base-button>

        <modal :show.sync="modalDelete"
               gradient="danger"
               modal-classes="modal-danger modal-dialog-centered">
            <h6 slot="header" class="modal-title" id="modal-title-notification">Su cuenta va a ser borrada</h6>

            <div class="py-3 text-center">
                <i class="ni ni-bell-55 ni-3x"></i>
                <h4 class="heading mt-4">Sentimos que tengas que partir</h4>
                <p>Esperamos que este esta despedida sea solo un hasta luego, y puedas volver.</p>
            </div>

            <template slot="footer">
                <base-button type="white" @click.prevent="emitBorrar">Borrar cuenta</base-button>
                <base-button type="link"
                             text-color="white"
                             class="ml-auto"
                             @click="modalDelete = false">
                    Cerrar
                </base-button>
            </template>
        </modal>
      </div>
    </div>

    <div class="row border bg-secondary rounded no-gutters align-items-center mt-3">
      <div class="col-auto px-2">
        <h5 class="text-monospace text-muted mb-0">N-04</h5>
      </div>
      <div class="col border-left pl-3 py-2 pr-1">
        <p class="font-weight-normal text-muted mb-0">Recuerde, esta es una operación que <strong>no se puede deshacer</strong>, y por tanto, no se puede recuperar el
          estado anterior a esta si decide eliminar su cuenta.</p>
      </div>
    </div>

    <!-- <div class="row justify-content-center">
      <div class="col-9 text-center">
        <p class="font-weight-normal text-center">Recuerde que esta es una operación que <strong>no se puede deshacer</strong>, y por tanto, no se puede recuperar el
          estado anterior a esta operación si decide eliminar su cuenta.</p>
      </div>
    </div> -->
  </div>
</template>

<script>
import modal from './Modal'

export default {
  name: 'BorrarCuenta',
  components: {
    modal
  },
  data () {
    return {
      modalDelete: false
    }
  },
  methods: {
    emitBorrar (evt) {
      this.$emit('borrar-perfil')
    }
  }
}
</script>

<style lang="css">
</style>
