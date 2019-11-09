<template lang="html">
  <div class="container px-0">
    <div class="row">
      <div v-if="child[side[1]]" class="col-12 my-2" :class="[{'order-1': talkSide==='client'},{'order-2': talkSide==='admin'}]">
        <div class="row">
          <div class="col-auto">
            <div class="icon icon-shape d-flex align-items-center bg-primary rounded-circle text-white ml-2">
              <i class="ni ni-single-02"></i>
            </div>
          </div>
          <div class="col bg-secondary radius-left p-4">
            <div class="row">
              <div class="col-12 text-muted">
                <span><small>{{date(child[side[0]])}}</small></span>
              </div>
              <div v-if="talkSide === 'client'" class="col-12 text-muted">
                <span class="font-weight-bold">Para: </span>
                <span>Atención al cliente <span class="font-weight-light">info@ecar-uned.com</span></span>
              </div>
              <div class="col-12">
                <span>{{child[side[1]]}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span v-if="!child[side[3]] && talkSide === 'client' && !cerrada" class="col-12 text-center order-3">
        <small class="col-12 text-muted">Se le dará una respuesta en como maximo 48 horas.</small>
      </span>
      <div v-if="child[side[3]]" class="col-12 my-2" :class="[{'order-2': talkSide==='client'},{'order-1': talkSide==='admin'}]">
        <div class="row">
          <div class="col bg-secondary radius-right p-4">
            <div class="row">
              <div class="col-12 text-muted">
                <span><small>{{date(child[side[2]])}}</small></span>
              </div>
              <div v-if="talkSide === 'client'" class="col-12 text-muted">
                <span class="font-weight-bold">Respuesta a: </span>
                <span>@{{ this.nickname }}</span>
              </div>
              <div v-if="talkSide === 'client'" class="col-12 text-muted">
                <span>Atención al cliente <span class="font-weight-light">info@ecar-uned.com</span></span>
              </div>
              <div class="col-12">
                <span>{{child[side[3]]}}</span>
              </div>
            </div>
          </div>
          <div class="col-auto">
            <div class="icon icon-shape d-flex align-items-center bg-danger rounded-circle text-white ml-2">
              <i class="ni ni-single-02"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CuerpoConsulta',
  props: {
    child: {
      type: Object,
      description: 'Contenido del mensaje, lado emisor y receptor'
    },
    talkSide: {
      type: String,
      description: 'Intercambia el lado del iterlocutor ("admin" | "client")',
      default: 'client'
    },
    nickname: {
      type: String,
      description: 'Apodo o nickname al cual va dirigido el mensaje'
    },
    cerrada: {
      type: Boolean,
      description: 'Si la consulta en cuestion se encuentra cerrada'
    }
  },
  methods: {
    date(date) {
      date = new Date(date)
      return date.toLocaleDateString() + ' a las ' + date.toLocaleTimeString()
    }
  },
  computed: {
    side () {
      if (this.talkSide === 'client') {
        return ['fechaIN','mensajeIN','fechaOUT','mensajeOUT']
      } else {
        return ['fechaOUT','mensajeOUT','fechaIN','mensajeIN']
      }
    }
  }
}
</script>

<style lang="css">
</style>
