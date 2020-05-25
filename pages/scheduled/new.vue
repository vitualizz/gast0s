<template lang='pug'>
  div
    ScheduleForm(
      :setting='setting'
      @saveSchedule='saveSchedule'
    )
    el-collapse(v-model='collapse')
      el-collapse-item(name='income')
        template(slot='title')
          p.title.is-4 Income
        Cash(
          ref='income'
          :setting='setting'
          :cashes='incomeCash'
        )
      el-collapse-item(name='expense')
        template(slot='title')
          p.title.is-4 Expense
        Cash(
          ref='expensive'
          :setting='setting'
          :cashes='expenseCash'
          expense
        )
</template>

<script>
import ScheduleForm from '~/components/forms/schedule'
import Cash from '~/components/forms/cash'

export default {
  components: {
    ScheduleForm,
    Cash
  },
  data () {
    return {
      collapse: ['income', 'expense'],
      cash: [],
      schedule: {},
      setting: {}
    }
  },
  computed: {
    incomeCash () {
      return _.filter(this.cash, { expense: false })
    },
    expenseCash () {
      return _.filter(this.cash, { expense: true })
    }
  },
  mounted () {
    this.getSetting()
    this.getCash()
  },
  methods: {
    async saveSchedule (data) {
      const cash = { cash: _.concat(this.incomeCash, this.expenseCash) }
      const schedule = _.merge(data, cash)
      await this.$axios.post('/schedules', schedule)
        .then((res) => {
          console.log(res)
          this.$router.push('/')
        })
    },
    async getCash () {
      await this.$axios.get('/cash')
        .then((res) => {
          const cash = res.data.cash
          this.cash = cash
        })
    },
    async getSetting () {
      await this.$axios.get('/settings')
        .then((req) => {
          this.setting = req.data.setting
        })
    }
  }
}
</script>

<style scoped lang='sass'>
.title
  margin: 5px 0px
</style>
