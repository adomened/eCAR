import Vue from 'vue'
import Router from 'vue-router'
import Cabecera from './layout/Cabecera'
import PiePagina from './layout/PiePagina'
import Principal from './views/Principal.vue'
import Registro from './views/Registro.vue'
import InicioSesion from './views/InicioSesion.vue'
import AccederCuenta from './views/AccederCuenta.vue'
import AboutContact from './views/components/AboutContact.vue'
import AboutFood from './views/components/AboutFood.vue'
import PageNotFound404 from './views/PageNotFound404'
import Politicas from './views/Politicas'
import Ayuda from './views/Ayuda'
import AcercaDe from './views/AcercaDe'
import Vehiculo from './views/Vehiculo'
import Test from './views/Test'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'principal',
      components: {
        header: Cabecera,
        default: Principal,
        footer: PiePagina
      },
      alias: '/_=_'
    },
    {
      path: '/admin',
      name: 'admin',
      components: {
        default: () => import('./views/AdminMain.vue')
      },
      meta: {requireAuth: true}
      //meta: {requireAuth: true, roles: ['administrador','tecnico'] }
    },
    {
      path: '/admin/:tab',
      components: {
        default: () => import('./views/AdminMain.vue')
      },
      props: {header: false, default: true, footer: false},
      meta: {requireAuth: true}
      //meta: {requireAuth: true, roles: ['cliente'] }
    },
    {
      path: '/test',
      name: 'test',
      components: {
        header: Cabecera,
        default: Test,
        footer: PiePagina
      }
    },
    {
      path: '/precios',
      alias: '/prices',
      name: 'precios',
      components: {
        header: Cabecera,
        default: () => import('./views/Precios.vue'),
        footer: PiePagina
      },
      children: [
        {
          name: 'contact',
          path: 'contact',
          component: AboutContact
        },
        {
          path: 'food',
          component: AboutFood
        }
      ]
    },
    {
      path: '/inicio-sesion',
      name: 'inicio-sesion',
      components: {
        header: Cabecera,
        default: InicioSesion
      }
    },
    {
      path: '/registro',
      name: 'registro',
      components: {
        header: Cabecera,
        default: Registro
      }
    },
    {
      path: '/busqueda-vehiculo',
      name: 'busqueda',
      components: {
        header: Cabecera,
        default: () => import('./views/BusquedaVehiculo.vue'),
        footer: PiePagina
      },
      meta: {requireAuth: true}
    },
    {
      path: '/perfil',
      name: 'perfil',
      components: {
        header: Cabecera,
        default: () => import('./views/Perfil.vue'),
        footer: PiePagina
      },
      meta: {requireAuth: true, roles: ['636c69656e7465'] }
    },
    {
      path: '/perfil/:tab',
      name: 'perfil-tab',
      components: {
        header: Cabecera,
        default: () => import('./views/Perfil.vue'),
        footer: PiePagina
      },
      props: {header: false, default: true, footer: false},
      meta: {requireAuth: true, roles: ['636c69656e7465'] }
    },
    {
      name: 'activar',
      path: '/activar/:slug',
      components: {
        header: Cabecera,
        default: () => import('./views/ActivarCuentaUsuario.vue'),
        footer: PiePagina
      },
      props: {header: false, default: true, footer: false},
      //meta: {requireAuth: true, roles: ['cliente'] }
    },
    {
      name: 'resetear',
      path: '/resetear/:token',
      components: {
        header: Cabecera,
        default: AccederCuenta
      },
      props: {header: false, default: true, footer: false},
      //meta: {requireAuth: true, roles: ['cliente'] }
    },
    {
      name: 'vehiculo',
      path: '/vehiculo/:id',
      components: {
        header: Cabecera,
        default: Vehiculo,
        footer: PiePagina
      },
      props: {header: false, default: true, footer: false},
      //meta: {requireAuth: true, roles: ['cliente'] }
    },
    {
      name: 'politicas',
      path: '/politicas/:politica',
      components: {
        header: Cabecera,
        default: Politicas,
        footer: PiePagina
      },
      props: {header: false, default: true, footer: false},
    },
    {
      name: 'ayuda',
      path: '/ayuda/:topic',
      components: {
        header: Cabecera,
        default: Ayuda,
        footer: PiePagina
      },
      props: {header: false, default: true, footer: false, hash: undefined},
    },
    {
      name: 'acerca-de',
      path: '/acerca-de',
      alias: '/about',
      components: {
        header: Cabecera,
        default: AcercaDe,
        footer: PiePagina
      }
    },
    {
      path: '*',
      name: 'PageNotFound404',
      component: PageNotFound404
    }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'current',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
    return savedPosition
    } else if (to.hash) {
      return { selector: to.hash, offset: { x: 0, y: 6 } } // y: 22
    } else {
      return { x: 0, y: 0 }
    }
  }
})

/*
  Lo ideal seria tener dos aplicaciones independientes en frontend para el cliente
  y los usuarios de roles como tecnico y administrador con priviligeios elevados
  para que el cliente no tenga ningun conocimiento de estos roles. No obstante,
  es una simplificacion que vamos asumir.

  Debido a la relativa facilidad con la cual un usuario mal intencionado tiene la
  posibilidad de cambiar e inyectar su propio codigo en el lado del cliente, el
  presente codigo no tiene la funcion de ofrecer la seguridad necesaria para asegurar
  que un usuario es quien dice ser y puede hacer lo que dice poder hacer (dicha Funcion
  pertenece a la API del backend)
*/

router.beforeEach((to, from, next) => {
  if (!to.meta.requireAuth) {
    return next()
  }
  let authUser = JSON.parse(window.localStorage.getItem('authUser'))
  if(!authUser || !authUser.jwtToken) {
    return next({name: 'inicio-sesion'})
  }
  if (!to.meta.roles) {
    return next()
  }
  if (to.meta.roles.includes(authUser.role_id)) {
    return next()
  }
  next({name: 'PageNotFound404'})
})

export default router
