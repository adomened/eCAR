<template lang="html">
  <div id="checkout">
    <div ref="sticky" data-sticky data-anchor="checkout" data-margin-top="0" data-sticky-on="large"></div>
  </div>
</template>

<script>
import PayPal from 'vue-paypal-checkout'
import Vue from 'vue'

export default {
  name: 'MyPaypalButton',
  updated() {
    console.log('--> component updated');
  },
  activated() {
    console.log('--> component activated');
  },
  deactivated() {
    console.log('--> component deactivated');
  },
  destroyed() {
    console.log('--> component destroyed');
  },
  mounted() {
    console.log('--> component mounted');
		const button = new (Vue.extend(PayPal))({
			propsData: {
				amount: this.cuantia,
				currency: 'EUR',
        locale: "es_ES",
				client: this.credentials,
				env: 'sandbox',
        buttonStyle: this.myStyle
			}
		}).$mount(this.$refs.sticky);

		button.$on('payment-authorized', this.payAuthorized)
    button.$on('payment-completed', this.payCompleted)
    button.$on('payment-cancelled', this.payCancelled)
	},
  data(){
    return{
      credentials: {
        sandbox: 'ARZCOGI1Ik_nXxgtI8fvcxvJT7O_agDeJ3uK38S8H0df0WzkXozyI3Bhp6YH-rN6Rq6i28X_Po9WBz6u',
        production: ''
      },
      myStyle: {
        label: 'checkout',
        size:  'responsive',
        shape: 'pill',
        color: 'silver'
      },
    }
  },
  props: {
    cuantia: {
      type: Number,
      description: 'cantidad a pagar en paypal'
    }
  },
  components: {
    PayPal
  },
  methods: {
    payAuthorized (payload) {
      this.eventPayAuth = payload
      console.log('event payment-authorized: ' + JSON.stringify(payload))
    },
    payCompleted (payload) {
      this.eventPayCompleted = payload
      console.log('event payment-completed: ' + JSON.stringify(payload))
    },
    payCancelled (payload) {
      this.eventPayCancelled = payload
      console.log('event payment-cancelled: ' + JSON.stringify(payload))
    }
  }
}
</script>

<style lang="css" scoped>
</style>
