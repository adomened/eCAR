<template>
  <div class="page">
    <section class="section-cover section-shaped my-0 bg-gradient-default">
      <div class="container px-0 py-5">
        <div class="row">
          <div class="col-12 pt-md-4 pt-0 mb-4 mb-md-0">
            <div class="profiling-header px-2 pt-5 text-center">
              <h1 class="font-weight-light text-center text-secondary">
                Ayuda
              </h1>
              <p class="lead text-secondary text-center">Este documento intentará resolver sus
                dudas en relacion al uso de nuestro servicio, ademas de otros topics que consideramos
                de interes para el usuario de esta app.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-secundario border-top-success">
      <div class="container px-0 pb-0 pb-sm-5 mt-5 mt-sm-0">
        <card shadow class="card-page-regular border-0">
          <div class="row">
            <div class="col-12 mb-3">
              <base-alert type="secondary" class="mb-0" style="background-color:#ffe839a6;border-left: 6px solid rgb(119, 109, 27);;border-radius: 0rem .25rem .25rem 0rem;">
                <span class="alert-inner--icon text-center d-block">
                  <i class="fa fa-bolt" style="font-size:1.5rem; color:rgb(119, 109, 27);"></i>
                </span>
                <span class="alert-inner--text" style="color:rgb(119, 109, 27);">
                  Esta pagina <strong>no tiene un fin comercial</strong>. Es el resultado del trabajo personal de un
                  alumno de la <strong>UNED</strong> (Universidad Nacional de Educación a Distancia) como <strong>TFG</strong>
                  (Trabajo Final de Grado).
                </span>
              </base-alert>
            </div>

            <div class="col-12">
              <h3 class="font-weight-light mb-4">Preguntas frecuentes (FAQs)</h3>
              <p>En esta sección presentamos las preguntas que sospechamos que nuestros clientes pueden plantearse.
              Ademas, existe la posibilidad de ampliar este conocimiento preguntando a través de la consultoria
              telematica disponible, via correo electronico, telefonicamente y presencialmente en nuestras instalaciones.</p>
              <p>Esta sección irá creciendo y ampliandose a medida que la app y nuestro conocimiento sobre la misma lo haga.</p>
            </div>

            <div class="col-12 mb-3">
              <h4 class="mb-0"><router-link :to="{ hash: 'p-01' }"><i class="fa fa-caret-right mr-2" aria-hidden="true"></i>¿ En que consiste el concepto de 'viaje' ?</router-link></h4>
            </div>

            <div class="col-12 mb-3">
              <h4 class="mb-0"><router-link :to="{ hash: 'p-02' }"><i class="fa fa-caret-right mr-2" aria-hidden="true"></i>¿ Cuando podré hacer el pago de los distintos viajes ?</router-link></h4>
            </div>

            <div class="col-12 mb-3">
              <h4 class="mb-0"><router-link :to="{ hash: 'p-03' }"><i class="fa fa-caret-right mr-2" aria-hidden="true"></i>¿ Cual es el precio de alquilar un vehiculo ?</router-link></h4>
            </div>

            <div class="col-12 mb-3">
              <h4 class="mb-0"><router-link :to="{ hash: 'p-04' }"><i class="fa fa-caret-right mr-2" aria-hidden="true"></i>¿ Podré ser penalizado si los datos recogidos en uso del
                servicio no coninciden con los datos recogidos en el analisis del vehiculo ?</router-link></h4>
            </div>

            <div class="col-12 mb-3">
              <h4 class="mb-0"><router-link :to="{ hash: 'p-05' }"><i class="fa fa-caret-right mr-2" aria-hidden="true"></i>¿ Seré penalizado por tener atrasos en mis pagos ?</router-link></h4>
            </div>

            <div class="col-12 mb-3">
              <h4 class="mb-0"><router-link :to="{ hash: 'p-06' }"><i class="fa fa-caret-right mr-2" aria-hidden="true"></i>¿ Exite algun plan de descuentos ?</router-link></h4>
            </div>

            <div class="col-12 mb-3">
              <h4 class="mb-0"><router-link :to="{ hash: 'p-07' }"><i class="fa fa-caret-right mr-2" aria-hidden="true"></i>¿ Exite algun plan de bonificación ?</router-link></h4>
            </div>

            <hr>

            <div id="p-01" class="col-12">
              <p><span class="text-muted">FAQ-01 <i class="fa fa-angle-double-right" aria-hidden="true"></i></span>
                El concepto de viaje no es otro que otra forma de llamar al
                tiempo que harás uso del vehiculo. Una vez que dispongas en posesión del vehiculo podrás uno de
                estos viajes. Los datos o metadatos que se almacenan del mismo son: </p>
                <ul class="font-weight-light">
                  <li>Punto geolocalizado en el que inciaste el viaje. Politica de privacidad.</li>
                  <li>Fecha y hora de inicio del mismo.</li>
                  <li>Referencia al vehiculo utilizado.</li>
                  <li>Distancia recorrida expresada en kilometros.</li>
                  <li>Punto geolocalizado en el que finalizaste el viaje.</li>
                  <li>Fecha y hora en el que se da finaliza el viaje.</li>
                  <li>Se almacenará tambien las geocodificaciones a partir de las coordenadas producto de la geolocaliazacion.</li>
                </ul>
                <p>El precio se le repercutirá será los distintos viajes que haya realizado atendiendo a la duración de los
                  mismos. Se hará un chequeo al vehiculo al momento de entregarlo, junto con una comprobaciñon de los
                  kilometros realizados para comprobar que se corresponden, dentro de un margen, a los valores registrados.</p>
            </div>

            <div id="p-02" class="col-12">
              <p><span class="text-muted">FAQ-02 <i class="fa fa-angle-double-right" aria-hidden="true"></i></span>
                El pago de los respectivos puede realizarla en cualquier momento a través
                de la plataforma de PayPal®. Tambien puede realizar el pago en el momento en que deposite el vehiculo en
                nuestras instalaciones. Recuerde que tendrá que estar al corriente de pagos en el momento en que deposite
                el vehiculo en nuestras instalaciones (No se le permitirá hacer mas reservas).</p>
            </div>

            <div id="p-03" class="col-12">
              <p><span class="text-muted">FAQ-03 <i class="fa fa-angle-double-right" aria-hidden="true"></i></span>
                El precio del alquiler de un vehiculo depende del plan en que se incluya el vehiculo en cuestion. Los
                distintos planes que exiten y a los que te puedes acoger, puedes cosultarlos
                <router-link :to="{ name: 'precios' }">aqui</router-link></p>
            </div>

            <div id="p-04" class="col-12">
              <p><span class="text-muted">FAQ-04 <i class="fa fa-angle-double-right" aria-hidden="true"></i></span>
                El vehiculo será sometido a un analisis por nuestros empleados en el momento en que lo deposites en
                nuestras instalaciones. El resultado del mismo puede arrojar alguna diferencia marginal en cuento
                a los datos recogidos en el sistema durante el alquiler del mismo. Si se detecta diferencias (un uso
                no honesto) mayores; las medidas pueden ir desde un pago en compensación hasta la anulacion de la
                cuenta de usuario, una vez saldado el importe.</p>
            </div>

            <div id="p-05" class="col-12">
              <p><span class="text-muted">FAQ-05 <i class="fa fa-angle-double-right" aria-hidden="true"></i></span>
                En principio no se aplicará ninguna penalización por tener pagos atrasados. Una vez efectuados los
                pagos atrasados podrá volver hacer uso de nuestro servicio, ya que esto si, teniendo pagos pendientes
                no podrá reservar ningun vehiculo.</p>
            </div>

            <div id="p-06" class="col-12">
              <p><span class="text-muted">FAQ-06 <i class="fa fa-angle-double-right" aria-hidden="true"></i></span>
                En estos momentos no se dispone de ningun plan de descuentos activo.</p>
            </div>

            <div id="p-07" class="col-12">
              <p><span class="text-muted">FAQ-07 <i class="fa fa-angle-double-right" aria-hidden="true"></i></span>
                En estos momentos no se dispone de ningun plan de bonificación activo. Se encuentra en estudio
                implementar alguno.</p>
            </div>

            <div id="title-n" class="col-12">
              <h2>Notas al pie</h2>
              <p>Esta sección es una recopilación de las notas al pie o aclaraciones adjuntas a las distintas secciones
                presentes en el perfil de usuario. Aqui se intenta ampliar/ser mas preciso/extender, en la medida de lo
                posible (siendo generalistas), las anotaciones que allí se reflejan.</p>
            </div>

            <div id="n-01" class="col-12">
              <h4>Validación del conductor <small class="text-muted">nota al pie 1</small></h4>
              <p>Este tramite es indispensable para poder realizar la
                reserva de un vehiculo y su duracion no debe ser superior a 48h desde el momento de recibir la documentacion.</p>
            </div>

            <div id="n-02" class="col-12">
              <h4>Imformación del perfil <small class="text-muted">nota al pie 2</small></h4>
              <p>En eCAR creemos que tus datos solo te pertenecen a ti. Por eso mismo <strong>no</strong> realizamos un
                tratamiento comercial de los mismos y en cualquier momento puedes modificarlos.</p>
            </div>

            <div id="n-03" class="col-12">
              <h4>Cambiar contraseña <small class="text-muted">nota al pie 3</small></h4>
              <p>En cualquier momento puedes modificar tu contraseña, por una mas segura, quizas. O tal vez,
              por una mas facil de recordar. Desde eCAR te recomendamos usar un <strong>gestor de contraseñas</strong>, el que
              tu prefieras.</p>
            </div>

            <div id="n-04" class="col-12">
              <h4>Borrar su cuenta <small class="text-muted">nota al pie 4</small></h4>
              <p>En cualquier momento puedes modificar tu contraseña, por una mas segura, quizas. O tal vez,
              por una mas facil de recordar. Desde eCAR te recomendamos usar un <strong>gestor de contraseñas</strong>, el que
              tu prefieras.</p>
            </div>

            <div id="n-05" class="col-12">
              <h4>Vehiculo <small class="text-muted">nota al pie 5</small></h4>
              <p>El resultado que aparece es el documento referenciado dentro del esquema
                del usuario. Este documento no es otro que una instancia del modelo Vehiculo, que contiene la información
                relacionada a este (su estado). El estado del vehiculo almacenado en el documento (vehiculo) podrá reflejar
                que está en estado de <strong>reserva</strong> o <strong>alquilado</strong> (cuando la reserva se formaliza).
                Por otra parte, se le facilita un acceso a la sección de busqueda cuando no ha iniciado ningun tramite de
                reserva de un vehiculo.</p>
                <p>Estados en los que se puede encontrar un vehiculo:</p>
                <ul class="font-weight-light">
                  <li><strong>Reservado: </strong>Un usuario ha reservado este vehiculo. Las reservas expiran una vez
                  pasados 30 minutos desde el momento en que consta la reserva y no habiendose confirmado su reserva.</li>
                  <li><strong>Alquilado: </strong>La reserva se ha formalizado.</li>
                  <li><strong>Disponible: </strong>El vehiculo se encuentra disponible para su reserva.</li>
                  <li><strong>Incidencia: </strong>El vehiculo no se encuentra disponible debido a diferentes factores.</li>
                </ul>
                <p><small>El estado del vehiculo se puede almacenar en 2 bit de información (4 estados).</small></p>
            </div>

            <div id="n-06" class="col-12">
              <h4>Nuevo viaje <small class="text-muted">nota al pie 6</small></h4>
              <p>Desde esta sección podrás ver el viaje que has iniciado recientemente, junto a el figura
                diferentes acciónes como detenerlo. Asi como algunos meta datos sobre el viaje mismo. Solo podrá tener un
                viaje en curso por cuenta. <strong>Podrá inciar un nuevo viaje siempre y cuando este en posesión de un
                vehiculo y no tenga ninguno en curso</strong>.</p>
            </div>

            <div id="n-07" class="col-12">
              <h4>Resumen de viajes y Pagos <small class="text-muted">nota al pie 7</small></h4>
              <p>Aqui podrás ver los viajes que has realizado recientemente, junto a su importe y metadatos que
                almacenamos de el. Puedes ver el vehiculo utilizado y añadir el viaje a tus rutas o viajes preferidos.
                O quizas quieras llevar un registro de determinados viajes que hayas hecho. Como siempre decimos en eCAR,
                una herramienta se puede utilizar de multiples formas, la correcta es la que te sea mas util.</p>
            </div>

            <div id="n-08" class="col-12">
              <h4>Consultoria telemática <small class="text-muted">nota al pie 8</small></h4>
              <p>Desde esta sección podrás ponerte en contacto con el equipo de eCAR y formular sus
                cuestiones. Tambien existe la posibilidad de contactar con nosotros via telefonicamente o via correo electronico
                a la siguiente dirección: <i>info@ecar-uned.com</i>. Esperamos resolver sus dudas en las distintos recursos que
                ofrecemos, gracias por confiar en nosotros.</p>
            </div>

            <div class="col-12">
              <p class="font-weight-bold text-primary">Última actualización: 10 de marzo de 2019</p>
            </div>
          </div>
        </card>
      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Ayuda',
  components: {

  },
  data () {
    return {

    }

  },
  props: {
    topic: String,
    hash: String
  },
  created () {
    this.$router.push({ hash: this.hash })
  },
  computed: {

  },
  methods: {

  }
}
</script>
<style>
</style>
