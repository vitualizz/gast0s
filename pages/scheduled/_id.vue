<template lang='pug'>
  el-table(
    :data='dataTable'
  )
    el-table-column(
      prop='date'
      label='Date'
    )
    el-table-column(
      prop='start_amount'
      label='Start Amount'
    )
    el-table-column(
      prop='incomes'
      label='Incomes'
    )
    el-table-column(
      prop='expenses'
      label='Expenses'
    )
    el-table-column(
      prop='end_amount'
      label='End Amount'
    )
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      schedule: {},
      money: {}
    }
  },
  computed: {
    dataTable () {
      const schedule = this.schedule
      const endDate = this.$moment(schedule.date)
      const today = this.$moment()

      const incomeAlways = _.filter(this.money, (money) => { return !money.expense && money.date === null })
        .map( money => { return money.amount })
      const expenseAlways = _.filter(this.money, (money) => { return money.expense && money.date === null })
        .map( money => { return money.amount })

      let data = []
      let startMoney
      let endMoney

      let i = 0

      for (let iDate = this.$moment().startOf('month'); iDate <= endDate;) {

        let incomeByDate = _.filter(this.money, (money) => {
            return iDate <= this.$moment(money.date).endOf('month') && !money.expense
          })
          .map( money => { return money.amount })
        let incomeCashes = incomeAlways.concat(incomeByDate)

        let expenseByDate = _.filter(this.money, (money) => {
            return iDate <= this.$moment(money.date).endOf('month') && money.expense
          }).map( money => { return money.amount })
        let expenseCashes = expenseAlways.concat(expenseByDate)

        let income = (_.reduce(incomeCashes, (sum, n) => { return currency(sum).add(n) }, 0))
        let expense = (_.reduce(expenseCashes, (sum, n) => { return currency(sum).add(n) }, 0))

        startMoney = (i === 0 ? schedule.amount : endMoney )

        endMoney = currency(startMoney).add(income).subtract(expense).format()
        
        data = data.concat({
          date: iDate.format('MMMM YYYY'),
          incomes: incomeCashes.map((money) => { return currency(money).format() }).join(','),
          expenses: expenseCashes.map((money) => { return currency(money).format() }).join(','),
          start_amount: startMoney,
          end_amount: endMoney
        })
        i++
        iDate.add(1, 'month')
      }
      return data
    }
  },
  mounted () {
    this.getSchedule()
  },
  methods: {
    async getSchedule () {
      await this.$axios.get(this.$route.path)
        .then((req) => {
          const { name, amount, date, money } = req.data.schedule
          this.schedule = { name, amount, date }
          this.money = money
        })
    }
  }
}
</script>
