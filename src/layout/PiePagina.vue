<template lang="html">
  <footer class="container-fluid bg-default pt-4 pb-5 pt-md-5">
    <div class="row">
      <div class="col-12 col-md text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="mb-2" width="40%" height="40%" viewBox="0 0 160 160"><path d="M73.956 157.433c-26.266-1.809-49.127-15.911-62.358-38.469-1.62-2.762-4.85-9.416-4.845-9.984 0-.063.177-.217.391-.342.215-.126 1.287-.804 2.382-1.507 1.095-.703 4.967-3.166 8.605-5.474 57.956-36.774 99.532-63.197 99.703-63.363.188-.184.123-.291-.57-.932-6.578-6.092-15.598-10.901-24.747-13.193-4.894-1.226-8.468-1.637-14.152-1.629-4.633.007-6.666.184-10.667.93-17.063 3.178-32.12 14.333-40.188 29.773-4.211 8.058-6.39 16.486-6.615 25.597l-.067 2.687-9.205 5.67c-5.062 3.117-9.249 5.668-9.303 5.668-.146 0-.224-.334-.464-1.99-.544-3.762-.707-6.302-.703-10.953.004-5.936.404-10.047 1.492-15.36 3.575-17.456 12.78-32.849 26.481-44.285 7.096-5.924 15.656-10.703 24.64-13.757 24.001-8.16 50.602-4.01 71.037 11.08 7.013 5.178 13.48 11.954 18.353 19.227 1.005 1.5 2.962 4.747 3.62 6.007l.427.815-.354.251c-.357.254-5.118 3.283-36.838 23.435-58.277 37.024-64.123 40.737-70.973 45.081-2.933 1.86-5.39 3.436-5.46 3.5-.187.172.093.543 2.116 2.81 12.146 13.615 30.556 20.661 48.923 18.726 16.821-1.772 32.055-10.887 41.595-24.888 4.378-6.425 7.561-14.104 8.962-21.619.738-3.964.92-6.04.928-10.596.008-4.615-.114-6.275-.726-9.814a183.368 183.368 0 0 1-.38-2.248c-.014-.106 3.712-2.422 8.645-5.373 4.768-2.853 8.783-5.29 8.922-5.415.234-.213.263-.2.41.181.339.881 1.563 5.988 1.978 8.257 3.924 21.425-1.289 43.457-14.38 60.779-12.283 16.254-30.508 27.07-50.543 29.995-4.901.716-11.715 1.022-16.072.722z" fill="#f4f5f7" stroke-miterlimit="5" stroke-dasharray="0,1.56452271"/></svg>
        <small class="d-block mb-3 text-secondary">©2017-2018 eCAR</small>
      </div>
      <div class="col-lg col border-secondary">
        <h5 class="text-secondary font-weight-bold">Funcionalidades</h5>
        <ul class="list-unstyled text-small">
          <li><router-link class="text-secondary" :to="{ name: 'busqueda' }">Busqueda de vehiculo</router-link></li>
          <li><router-link class="text-secondary" :to="{ name: 'inicio-sesion' }">Inicio sesion</router-link></li>
          <li><router-link class="text-secondary" :to="{ name: 'registro' }">Registro</router-link></li>
          <li><router-link class="text-secondary" :to="{ name: 'precios' }">Precios</router-link></li>
          <li><router-link class="text-secondary" :to="{ name: 'perfil' }">Perfil</router-link></li>

        </ul>
      </div>
      <div class="col-lg col border-secondary">
        <h5 class="text-secondary font-weight-bold">Información</h5>
        <ul class="list-unstyled text-small">
          <li><router-link class="text-secondary" :to="{ name: 'acerca-de' }">Acerca de mi</router-link></li>
          <li><router-link class="text-secondary" :to="{ name: 'politicas', params: { politica: 'privacidad' } }">Privacidad</router-link></li>
          <li><router-link class="text-secondary" :to="{ name: 'ayuda', params: { topic: 'FAQS' } }">Ayuda</router-link></li>
        </ul>
      </div>
      <div class="col-lg col-md col-12">
        <h5 class="text-secondary font-weight-bold">Almería</h5>
        <span class="text-secondary">
          <span>Pol. Ind. San Gines, 44<br></span>
          <span>04003 Almeria (Almeria)</span>
        </span>
        <h5 class="text-secondary font-weight-bold mt-3">Galicia</h5>
        <span class="text-secondary">
          <span>Avd. Alfonso Castelao, 1<br></span>
          <span>15010 La Coruña (Galicia)</span>
        </span>
        <h5 class="text-secondary font-weight-bold mt-3">Madrid</h5>
        <span class="text-secondary">
          <span>Avd. Francisco de Quevedo, 21<br></span>
          <span>28001 Madrid (Madrid)</span>
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
}
</script>

<style>
</style>
