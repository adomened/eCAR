<template lang="html">
  <div v-if="showComponent" class="border-top pb-3 px-3">
    <div class="row text-center">
      <h4 class="col-12 text-primary py-2 mb-0">
        Validación del conductor
      </h4>
    </div>
    <div class="row mb-3">
      <div class="col-12 text-center">
        <p class="mb-0">Necesitamos corroborar que cuentas con la documentación necesaria para conducir un vehiculo.
        Hazle una foto a ambas caras y pulse el boton <kbd class="bg-success">SELECCIONÉ LOS ARCHIVOS</kbd> para enviárnoslas.</p>
      </div>
    </div>

    <!-- <div class="row align-items-center my-3">
      <div class="col-auto">
        <h2 class="text-primary text-monospace">VLT</h2>
      </div>
      <div class="col">
        <div class="row border-left border-primary mr-0">
          <h4 class="col-12 border-bottom border-primary text-primary text-center py-2 mb-0">
            Validación del conductor
          </h4>
          <div class="col-12 py-2">
            <p class="mb-0">Necesitamos corroborar que cuentas con la documentación necesaria para conducir un vehiculo.
            Hazle una foto a ambas caras y pulse el boton <kbd class="bg-success">SELECCIONÉ LOS ARCHIVOS</kbd> para enviárnoslas.</p>
          </div>
        </div>
      </div>
    </div> -->

    <mensaje-flash :dismissible="messageAlert.dismissible"
                  :messageStrong="messageAlert.messageStrong"
                  :typeAlert="messageAlert.typeAlert"
                  :error="messageAlert.error"
                  :icono="messageAlert.icono"></mensaje-flash>

    <card shadow class="col-12 border border-success translate-y-dos mb-2 px-0" no-body>
      <div class="row no-gutters bg-default">
        <div v-if="subidoUno === true" class="col-12 py-2 text-center">
          <span class="text-secondary font-weight-bold">
            <i class="fa fa-check mr-2" aria-hidden="true"></i>
            Archivo subido satisfactoriamente
          </span>
        </div>
        <div v-if="subidoDos === true" class="col-12 py-2 text-center">
          <span  class="text-secondary font-weight-bold">
            <i class="fa fa-check mr-2" aria-hidden="true"></i>
            Archivo subido satisfactoriamente
          </span>
        </div>
        <div class="col-12">
          <file-upload :headers="authToken"
              @success="onFileSuccess($event)"
              @error="onFileError($event)"
              :max-size="maxsize"
              :url='url'
              @change="onFileChange"
              btn-label="SELECCIONÉ LOS ARCHIVOS"></file-upload>
        </div>
      </div>
    </card>

    <span class="row text-center mb-3">
      <small class="col-12 text-muted">Los formatos aceptados para las imagenes serán .jpg y .png. Tamaño máximo menor a 5 MB.</small>
    </span>

    <div class="row border bg-secondary rounded no-gutters align-items-center mt-3">
      <div class="col-auto px-2">
        <h5 class="text-monospace text-muted mb-0">N-01</h5>
      </div>
      <div class="col border-left pl-3 py-2 pr-1">
        <p class="font-weight-normal text-muted mb-0">Este tramite es indispensable para poder realizar la
          reserva de un vehiculo y su duracion no debe ser superior a 48h desde el momento de recibir la documentacion.</p>
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from 'v-file-upload'
import MensajeFlash from './MensajeFlash'
import axios from 'axios'
import Vue from 'vue'
Vue.use(FileUpload)

export default {
  name: 'ValidacionConductor',
  components: {
    MensajeFlash
  },
  props: {
    authToken: {
      type: String,
      description: 'Token que irá en la cabecera Authorization',
      default: 'none'
    }
  },
  data () {
    return {
      messageAlert:{
        typeAlert: 'default',
        messageStrong: 'Default!',
        dismissible: true,
        icono: 'ni ni-like-2',
        errors : undefined,
        error : undefined
      },
      url: '/api/files/add',
      maxsize: 5 * 1024 * 1024,
      filesUploaded: [],
      subidoUno: false,
      subidoDos: false
    }
  },
  methods: {
    showMessage (dismissible, messageStrong, typeAlert, errorMessages, errorMessage, icono) {
      this.messageAlert = Object.assign({}, this.messageAlert, {
        typeAlert: typeAlert,
        messageStrong: messageStrong,
        dismissible: dismissible,
        icono: icono,
        errors : errorMessages,
        error: errorMessage
      })
    },
    onFileSuccess (e) {
      this.showSuccessUpload(e.step)
      console.log('sucedido: ' + JSON.stringify(e));
      // this.showMessage(true, 'Exito ', 'success', undefined, e.msg)
    },
    onFileError (e) {
      console.log('errodido: ' + JSON.stringify(e));
      this.showMessage(true, 'Atención ', 'danger', undefined, e.msg, 'ni ni-notification-70')
    },
    onFileChange (file) {
      // Handle files like:
      this.filesUploaded.push(file)
      console.log('filesUploaded: ' + JSON.stringify(this.filesUploaded));
    },
    showSuccessUpload (step) {
      if (step === 1) {
        this.subidoUno = true
      } else {
        this.subidoDos = true
        this.subidoUno = true
      }
    }
  },
  computed: {
    showComponent () {
      return !(this.$store.state.perfil.enProcesoDeValidacion || this.$store.state.perfil.validado)
    }
  }
}
</script>

<style lang="css">
</style>
