<template lang='pug'>
  div
    btn.is-block.is-pulled-right(
      v-if='save'
      color='green'
      @click.native='createMoney'
    ) Save
    Money(
      ref='money'
      v-for="(income, index) in cash"
      :cash='income'
      :key='index'
      @remove='removeMoney(index)'
      :setting='setting'
      :expense='expense'
      pushed
    )
    Money(
      ref='add'
      @add='addMoney'
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
    expense: Boolean,
    save: Boolean,
    cashes: Array
  },
  data () {
    return {
      cash: []
    }
  },
  watch: {
    cashes () {
      this.cash = this.cashes
    }
  },
  methods: {
    clear () {
      this.cash = []
      this.$refs.money[0].clear()
    },
    addMoney (data) {
      this.cash.push(_.clone(data))
      this.$refs.add.clear()
      this.$emit('dataMoney', data)
    },
    removeMoney (index) {
      this.cash.splice(index, 1)
    },
    async createMoney () {
      await this.$axios
        .post('/settings/cash', this.cash)
        .then((data) => {
          console.log(data)
        })
    }
  }
}
</script>
