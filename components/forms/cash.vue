<template lang='pug'>
  div
    Money(
      ref='money'
      v-for="(income, index) in (cash.length + 1)"
      :key='index'
      @add='addMoney'
      @remove='removeMoney(index)'
      :pushed='cash.length !== index'
      :setting='setting'
      :expense='expense'
    )
</template>

<script>
import Money from '~/components/forms/inputs/money'

export default {
  components: {
    Money
  },
  props: {
    setting: {
      type: Object,
      default: null
    },
    expense: Boolean
  },
  data () {
    return {
      cash: []
    }
  },
  methods: {
    clear () {
      this.cash = []
      this.$refs.money[0].clear()
    },
    addMoney (data) {
      this.cash.push(data)
      this.$emit('dataMoney', this.cash)
    },
    removeMoney (index) {
      this.cash.splice(index, 1)
    }
  }
}
</script>
