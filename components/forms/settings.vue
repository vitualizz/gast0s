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
          v-for='currency in currencies'
          :key='currency.code'
          :value='currency.code'
        )
          span {{ currency.name }}
          span {{ currency.symbol }}
    el-form-item
      el-select(
        v-model='form.decimals'
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
        v-model='form.format.separator'
        placeholder='Separator amount'
        @change="changeFormat($event, 'decimal')"
      )
        el-option(
          v-for='separator in separators'
          :value='separator'
          :label='separator'
        )
    el-form-item
      el-select(
        v-model='form.format.decimal'
        placeholder="Separator decimal"
        @change="changeFormat($event, 'separator')"
      )
        el-option(
          v-for='separator in getFormatDecimal'
          :value='separator'
          :label='separator'
        )
</template>

<script>
import dataCurrencies from '~/static/currency_symbols.json'
export default {
  data () {
    return {
      currencies: [],
      separators: [',', '.', 'none'],
      form: {
        currency: 'USD',
        decimals: 2,
        format: {
          separator: ',',
          decimal: '.'
        }
      }
    }
  },
  computed: {
    getFormatDecimal () {
      return _.filter(this.separators, s => s !== 'none')
    }
  },
  methods: {
    changeFormat (data, format) {
      const delimiter = this.form.format
      if (![null, 'none'].includes(data)) {
        delimiter[format] = (data === ',' ? '.' : ',')
      }
    }
  },
  mounted () {
    this.currencies = dataCurrencies
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
