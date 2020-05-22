<template lang='pug'>
  el-form.has-text-centered(
    :model='form'
    :inline='true'
  )
    el-form-item
      el-select(
        placeholder="Select currency"
        v-model='form.currency'
      )
        el-option.option-currency(
          v-for='currency in $store.state.allCurrencies'
          :key='currency.code'
          :value='currency.code'
        )
          span {{ currency.name }}
          span {{ currency.symbol }}
    el-form-item
      el-select(
        v-model='form.places'
        placeholder='Select decimal places'
      )
        el-option(
          v-for='place in 3'
          :key='place'
          :value='place'
          :label='place'
        )
    br
    el-form-item
      el-select(
        v-model='form.separator'
        placeholder='Separator amount'
        @change="changeFormat($event, 'decimal')"
      )
        el-option(
          v-for='(separator, index) in separators'
          :key='index'
          :value='separator'
          :label='separator'
        )
    el-form-item
      el-select(
        v-model='form.decimal'
        placeholder='Separator decimal'
        @change="changeFormat($event, 'separator')"
      )
        el-option(
          v-for='(separator, index) in getFormatDecimal'
          :key='index'
          :value='separator'
          :label='separator'
        )
    p.title.is-2 {{ currencyTitle }}
</template>

<script>

export default {
  data () {
    return {
      separators: [',', '.', 'none'],
      form: {
        currency: 'USD',
        symbol: '$',
        places: 2,
        separator: ',',
        decimal: '.'
      }
    }
  },
  computed: {
    getFormatDecimal () {
      return _.filter(this.separators, s => s !== 'none')
    },
    currencyTitle () {
      const cFormat = this.form
      const cTitle = cFormat.decimal === ',' ? '1234,56' : '1234.56'
      return currency(cTitle,
        {
          precision: this.form.places,
          symbol: this.form.symbol,
          separator: (cFormat.separator === 'none' ? ' ' : cFormat.separator),
          decimal: cFormat.decimal
        }
      ).format(true)
    }
  },
  watch: {
    form: {
      handler () {
        this.setData()
      },
      deep: true
    },
    'form.currency' (newVal, oldVal) {
      this.form.symbol = this.$store.state.allCurrencies[newVal].symbol
    }
  },
  mounted () {
    this.setData()
  },
  methods: {
    setData () {
      this.$emit('setData', this.form)
    },
    changeFormat (data, format) {
      const delimiter = this.form
      if (![null, 'none'].includes(data) && delimiter.separator !== 'none') {
        delimiter[format] = (data === ',' ? '.' : ',')
      }
    }
  }
}
</script>

<style scoped lang='sass'>
.option-currency span:first-child
  float: left

.option-currency span:last-child
  float: right
  color: #8492a6
  font-size: 13px
</style>
