<template lang='pug'>
  el-tabs
    el-tab-pane(label='General')
      btn(
        color='green'
      ) Save
      Settings(
        @setData='getSetting'
      )
    el-tab-pane(label='Saaad')
      Cash(
        ref='income'
        :setting='setting'
      )
    el-tab-pane(label='Feed') Sad
      Cash(
        ref='expense'
        :setting='setting'
        expense
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
      cash: [],
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
          this.cash = res.data.cash
        })
    },
    getSetting (setting) {
      this.setting = setting
    }
  }
}
</script>
