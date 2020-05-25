<template lang='pug'>
  .schedule-form.is-flex
    el-input(
      v-model='schedule.name'
      placeholder="Name Ejm: Schedule 1"
    )
    el-input(
      v-model='schedule.amount'
      placeholder='Start amount'
      @change='changeAmount'
    )
      template(slot='prepend') {{ setting.symbol }}
    el-date-picker(
      v-model='schedule.date'
      type='month'
      placeholder='Schedule end'
      @change='onChangeDate'
    )
    btn(
      color='green'
      @click.native='save'
    ) Save Schedule
</template>

<script>
export default {
  props: {
    setting: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      schedule: {
        name: '',
        amount: '',
        date: null
      }
    }
  },
  methods: {
    save () {
      const schedule = this.schedule
      if (schedule.name.length && schedule.amount.length && schedule.date) {
        this.$emit('saveSchedule', schedule)
      } else {
        this.$message({
          message: 'Complete all fields.',
          type: 'error'
        })
      }
    },
    changeAmount () {
      const setting = this.setting
      const schedule = this.schedule
      schedule.amount = currency(schedule.amount,
        {
          precision: setting.places,
          symbol: '',
          separator: (setting.separator === 'none' ? ' ' : setting.separator),
          decimal: setting.decimal
        }
      ).format(true)
    },
    onChangeDate (date) {
      date = this.$moment(date)
      const today = this.$moment()
      const limit = this.$moment().add(3, 'years')
      if (date.isBetween(this.$moment(), limit)) {
        return date
      } else {
        this.schedule.date = null
        this.$message({
          message: 'Choose a date between ' + today.format('MMMM YYYY') + ' and ' + limit.format('MMMM YYYY'),
          type: 'error'
        })
      }
    }
  }
}
</script>

<style scoped lang='sass'>
.schedule-form
  margin: 10px
  .el-input
    margin-right: 10px
  .el-date-editor
    width: 100%
  .el-switch
    margin: 0 10px
    height: inherit
    display: inherit
</style>
