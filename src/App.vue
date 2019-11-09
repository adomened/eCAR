<template>
    <div id="app">
        <router-view name="header"></router-view>
        <main>
            <slide-y-up-transition origin="center" mode="out-in" :duration="400">
                <router-view/>
            </slide-y-up-transition>
        </main>
        <router-view name="footer"></router-view>
    </div>
</template>
<script>
import { SlideYUpTransition } from 'vue2-transitions'

export default {
  components: {
    SlideYUpTransition
  }
}
</script>
<style>
/*
ESTILOS ESPECIFICOS PARA LA APP eCAR
*/

/*Boton para subir archivos*/
.file-upload-icon {
  content: "\f09c";
  color: #8c6bd2;
}

/*Añade o quita un deplazamiento vertical a un elemento del DOM*/
.no-translate-y{
  transform: translateY(-0px) !important;
}
.translate-y-dos:hover{
  transform: translateY(-2px) !important;
}

/*Fondos personalizados*/
.bg-gradient-fire {
  background: linear-gradient(60deg,#172b4d,#8e2781,#f5365c)!important;
}
.bg-gradient-pordefecto {
  /* background-image: url(../assets/img/highway-2025863_1920.jpg); */
  /* background-image: url(../../assets/img/highway-2025863_1920.jpg); */
  background-image: url(./assets/img/highway-2025863_1920.jpg);
  background-repeat: no-repeat;
  background-position:center;
  background-size:cover;
  /* background: linear-gradient(90deg, #0f2956 0,#1c2a79 40%, #5e72e4 100%) !important;  */
}
.bg-secundario{
  background-repeat: repeat;
  /* background: radial-gradient(#171616, rgb(244, 245, 247)); */
  background-blend-mode: color-burn;
  background-color: #f4f5f778;
  background-position-x: right;
  background-position-y: bottom;
  background-image:url(./assets/img/icono.svg);
}

/*Un padding mas reducido en elementos donde se requiere mas espacio para el contenido*/
.less-padding {
  padding-top: 2px !important;
  padding-left: 4px !important;
  padding-right: 4px !important;
  padding-bottom: 2px !important;
}

/*Bordes*/
.border-superior {
  border-top: 1px solid #5e72e4 !important;
  margin-top: 25px;
}
.border-top-success{
  border-top: 1rem solid #2dce89;
}
.border-top-default{
  border-top: 1rem solid #172b4d;
}

/*Sombras especiales*/
.shadow-itinerario{
  box-shadow: -1px 4px 4px rgba(50,50,93,.1), 0px -1px 1px rgba(50,50,93,.1);
}

/*Efectos avanzados para imagenes*/
.mi-imagen {
  -webkit-filter: saturate(180%);
  filter: saturate(180%);
}

/*Transiciones avanzadas (pero muy mejorables) con Vue*/
.list-complete-item {
  transition: all .6s ease;
  display: block;
}
.list-complete-enter {
  opacity: 0;
  transform: translate3d(-15px,0px,0px);
}
.list-complete-leave, .list-complete-leave-to, .list-complete-leave-active  {
  opacity: 0;
  transform: translate3d(30px,0px,0px);
  position: absolute;
}

/*Icono SVG responsive; css media queries*/
@media (min-width: 992px) {
  .icon-size{
    width: 21rem !important;
    height: 21rem !important;
  }
  .text--xl{
    font-size: 12rem !important;
  }
}
@media (max-width: 991.98px) {
  .icon-size{
    width: 18rem !important;
    height: 18rem !important;
  }
  .text--xl{
    font-size: 10rem !important;
  }
}
@media (max-width: 575.98px) {
  .icon-size{
    width: 15rem !important;
    height: 15rem !important;
  }
  .text--xl{
    font-size: 8rem !important;
  }
}

/*Breadcumb en forma de puntos de color para representar el progreso en una
tarea que desarrolla el usuario*/
.point {
  border-radius: 20px;
  background-color: #adb5bd;
  min-width: 8px;
  min-height: 8px;
}
.active-point {
  background-color: #17214e;
}

/*Quitar padding izquierdo y derecho a elementos. El preestablecido
elimina los margenes*/
.no-gutters {
  padding-left: 0px !important;
  padding-right: 0px !important;
}

/*decoracion del elemento button presente en las input*/
.btn-input {
  color: #525f7f !important;
  border: 0px solid transparent !important;
  padding-top: 0;
  padding-bottom: 0;
}

/*redondeo de las esquinas de los bocadillos en los mensajes*/
.radius-left {
  border-radius: 0rem 2rem 2rem 2rem !important;
}
.radius-right {
  border-radius: 2rem 0rem 2rem 2rem !important;
}
</style>
