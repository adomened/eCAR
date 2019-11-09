import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Argon from './plugins/argon-kit'
// import VueLazyload from 'vue-lazyload'

// import vuescroll from 'vuescroll/dist/vuescroll-native'
// import 'vuescroll/dist/vuescroll.css'

import vuescroll from 'vuescroll';
// import 'vuescroll/dist/vuescroll.css';

Vue.config.productionTip = false
Vue.use(vuescroll)
Vue.prototype.$vuescrollConfig = {
  vuescroll: {
    mode: 'native',
    detectResize: true,
    zooming: false,
    scroller: {
      preventDefaultOnMove: true,
      preventDefault: true,
      penetrationDeceleration: 0.75
    }
  },
  bar: {
    background: '#5e72e4',
    showDelay: 250,
    opacity: 0
  },
  scrollPanel: {
    scrollingX: true,
    scrollingY: false,
    padding: false
  }
}
Vue.use(Argon)
// Vue.use(VueLazyload, {
//   preLoad: 1,
//   listenEvents: [ 'scroll' ],
//   loading: 'img/theme/team-4-800x800.jpg'
// })

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
