<template>
    <nav class="navbar"
         :class="[
            {'navbar-expand-lg': expand},
            {[`navbar-${effect}`]: effect},
            {'navbar-transparent': transparent},
            {[`bg-${type}`]: type},
            {'rounded': round}
         ]">
        <div class="container">
          <div class="row align-items-center w-100">
            <!-- <div class="col-12 d-inline-flex"> -->
              <div class="order-lg-1 order-1">
                <slot name="container-pre"></slot>
              </div>
              <div class="order-lg-2 order-2 mr-2">
                <slot name="brand"></slot>
              </div>
              <div class="order-lg-4 order-3 ml-auto">
                <slot name="login-logout"></slot>
              </div>
              <div class="order-lg-3 order-4">
                <div class="collapse navbar-collapse rounded-0 w-100 pt-0 px-3" :class="{show: toggled}" :id="contentId" v-click-outside="closeMenu">
                    <div class="navbar-collapse-header bg-white pt-3 px-3 mb-0">
                        <slot name="content-header" :close-menu="closeMenu"></slot>
                    </div>
                    <slot :close-menu="closeMenu"></slot>
                </div>
                <navbar-toggle-button :toggled="toggled"
                                      :target="contentId"
                                      @click.native.stop="toggled = !toggled"
                                      class="pl-1 pr-0">
                </navbar-toggle-button>
              </div>
            </div>
        </div>
    </nav>
</template>
<script>
//import { FadeTransition } from 'vue2-transitions'
import NavbarToggleButton from './NavbarToggleButton'

export default {
  name: 'base-nav',
  components: {
    //FadeTransition,
    NavbarToggleButton
  },
  props: {
    type: {
      type: String,
      default: 'primary',
      description: 'Navbar type (e.g default, primary etc)'
    },
    title: {
      type: String,
      default: '',
      description: 'Title of navbar'
    },
    contentId: {
      type: [String, Number],
      default: Math.random().toString(),
      description:
        "Explicit id for the menu. By default it's a generated random number"
    },
    effect: {
      type: String,
      default: 'dark',
      description: 'Effect of the navbar (light|dark)'
    },
    round: {
      type: Boolean,
      default: false,
      description: 'Whether nav has rounded corners'
    },
    transparent: {
      type: Boolean,
      default: false,
      description: 'Whether navbar is transparent'
    },
    expand: {
      type: Boolean,
      default: false,
      description: 'Whether navbar should contain `navbar-expand-lg` class'
    }
  },
  data () {
    return {
      toggled: false
    }
  },
  methods: {
    onTitleClick (evt) {
      this.$emit('title-click', evt)
    },
    closeMenu () {
      this.toggled = false
    }
  }
}
</script>
<style>
</style>
