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
          this.incomeCash = res.data.cash
        })
    },
    getSetting (setting) {
      this.setting = setting
    }
  }
}
</script>
