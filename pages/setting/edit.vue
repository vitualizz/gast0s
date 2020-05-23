<template lang='pug'>
  el-tabs
    el-tab-pane(label='General')
      btn(
        color='green'
      ) Save
      Settings(
        @setData='getSetting'
      )
    el-tab-pane(label='Incomes')
      Cash(
        ref='income'
        :setting='setting'
        :cashes='incomeCash'
        save
      )
    el-tab-pane(label='Expenses')
      Cash(
        ref='expense'
        :setting='setting'
        :cashes='expenseCash'
        expense
        save
      )
</template>

<script>
import Settings from '~/components/forms/settings'
import Cash from '~/components/forms/cash'

export default {
  components: {
    Settings,
    Cash
  },
  data () {
    return {
      incomeCash: [],
      expenseCash: [],
      setting: {}
    }
  },
  mounted () {
    this.getCash()
  },
  methods: {
    async getCash () {
      await this.$axios.get('/cash')
        .then((res) => {
          const cash = res.data.cash
          this.incomeCash = _.filter(cash, { expense: false })
          this.expenseCash = _.filter(cash, { expense: true })
        })
    },
    getSetting (setting) {
      this.setting = setting
    }
  }
}
</script>
