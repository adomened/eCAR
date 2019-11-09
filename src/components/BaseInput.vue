<template>
  <div>
    <label class="d-block text-center mb-0 w-75 m-auto" :class="[{ 'bg-secondary rounded-top': bgLabel },
    {'text-warning': valid === false}, {'text-success': valid === true}]"> {{label}} </label>

    <div class="form-group"
         :class="[
       {'input-group': hasIcon},
       {'has-danger': error},
       {'focused': focused},
       {'input-group-alternative': alternative},
       {'has-success': valid === true},
       {'has-danger': valid === false},
       {'has-lock': lock === true},
       {'has-unlock': lock === false}
       ]">

      <div v-if="buttonLeft || textButtonLeft" class="input-group-prepend">
        <base-button :class="[{'input-group-text btn-input-blue text-white border-right blue': colorInput === 'blue'},
                      {'border': !alternative}]"
                      class="btn-input rounded-left input-group-text"
                      type="neutral" :icon="buttonLeft"
                      @click="clickButton">
                      <span v-if="textButtonLeft">{{textButtonLeft}}</span>
        </base-button>
      </div>

      <div v-if="addonLeftIcon || $slots.addonLeft" class="input-group-prepend">
      <span :class="[{'is-valid': valid === true}, {'form-control': valid === true},
      {'form-control': lock === true || lock === false}, {'input-group-text': colorInput === 'default'},
      {'input-group-text blue': colorInput === 'blue'}, {'input-group-text gray': colorInput === 'gray'}]">
        <slot name="addonLeft">
          <i :class="[addonLeftIcon, {'text-warning': valid === false}, {'text-success': valid === true}]"></i>
        </slot>
      </span>
      </div>

      <slot v-bind="slotData">
        <input
                :value="value"
                v-on="listeners"
                v-bind="$attrs"
                :class="[{'is-valid': valid === true}, {'is-invalid': valid === false}, inputClasses,
                {'text-warning': valid === false}, {'text-success': valid === true}, {'form-control pl-2': colorInput === 'default'},
                {'form-control blue': colorInput === 'blue'}, {'form-control gray': colorInput === 'gray'}]"
                aria-describedby="addon-right addon-left">
      </slot>
      <div v-if="addonRightIcon || $slots.addonRight" class="input-group-append">
        <span :class="[{'is-valid': valid === true}, {'form-control': valid === true},
        {'form-control': lock === true || lock === false}, {'input-group-text': colorInput === 'default'},
        {'input-group-text blue': colorInput === 'blue'}, {'input-group-text gray': colorInput === 'gray'}]">
            <slot name="addonRight">
                <i :class="addonRightIcon"></i>
            </slot>
        </span>
      </div>
      <slot name="infoBlock"></slot>
      <slot name="helpBlock">
          <div class="text-danger invalid-feedback" style="display: block;" :class="{'mt-2': hasIcon}" v-if="error">
              {{ error }}
          </div>
      </slot>
  </div>
</div>
</template>
<script>
export default {
  inheritAttrs: false,
  name: 'base-input',
  props: {
    valid: {
      type: Boolean,
      description: 'Whether is valid',
      default: undefined
    },
    lock: {
      type: Boolean,
      description: 'Si esta bloqueado',
      default: undefined
    },
    bgLabel: {
      type: Boolean,
      description: 'if the label has background color or not'
    },
    label: {
      type: String
    },
    alternative: {
      type: Boolean,
      description: 'Whether input is of alternative layout'
    },
    select: {
      type: Array,
      description: 'A input type text like a select type input',
      default: undefined
    },
    colorInput: {
      type: String,
      description: 'The colors of the inputs',
      default: 'default'
    },
    error: {
      type: String,
      description: 'Input error (below input)'
    },
    inputClasses: {
      type: String,
      description: 'Input css classes'
    },
    value: {
      type: [String, Number],
      description: 'Input value'
    },
    addonRightIcon: {
      type: String,
      description: 'Addon right icon'
    },
    addonLeftIcon: {
      type: String,
      description: 'Addont left icon'
    },
    buttonLeft: {
      type: String,
      description: 'Button left icon'
    },
    textButtonLeft: {
      type: String,
      description: 'Text button left icon'
    }
  },
  data () {
    return {
      focused: false,
      index: 0
    }
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners,
        input: this.updateValue,
        focus: this.onFocus,
        blur: this.onBlur
      }
    },
    slotData () {
      return {
        focused: this.focused,
        ...this.listeners
      }
    },
    hasIcon () {
      const { addonRight, addonLeft } = this.$slots
      return (
        addonRight !== undefined ||
        addonLeft !== undefined ||
        this.addonRightIcon !== undefined ||
        this.addonLeftIcon !== undefined
      )
    }
  },
  methods: {
    updateValue (evt) {
      let value = evt.target.value
      this.$emit('input', value)
    },
    onFocus (value) {
      this.focused = true
      this.$emit('focus', value)
    },
    onBlur (value) {
      this.focused = false
      this.$emit('blur', value)
    },
    clickButton () {
      if (this.select !== undefined) {
        if (this.select.length === this.index) {
          this.index = 0
          this.$emit('toggle', this.select[this.index])
        }
        this.$emit('toggle', this.select[this.index])
        this.index += 1
      } else {
        this.$emit('click-button')
      }
    }
  }
}
</script>
<style scoped>
label{
  font-weight: 600;
  margin-bottom: .2rem;
}
.border {
  border: 0.0625rem solid #cad1d8 !important;
  box-shadow: none !important;
}
</style>
