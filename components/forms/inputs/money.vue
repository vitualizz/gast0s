<template lang='pug'>
  .money-input.is-inline-flex
    el-input(
      v-model='money.name'
      placeholder="Name Ejm: Salary"
      :disabled='pushed'
    )
    el-input(
      v-model='money.amount'
      placeholder='Amount'
      :disabled='pushed'
    )
      template(slot='prepend') {{ incomeOrExpense }}
    el-tooltip(
      :content="always ? 'Always' : 'Until'"
      placement="top"
    )
      el-switch(
        v-model='always'
        :disabled='pushed'
      )
    el-date-picker(
      v-if='!always'
      v-model='money.date'
      type='month'
      placeholder='Pick a end month'
      @change='onChangeDate'
      :disabled='pushed'
    )
    el-button(
      v-if='pushed'
      type='danger'
      icon='el-icon-delete'
      @click="remove"
      circle
    )
    el-button(
      v-else
      icon='el-icon-plus'
      @click="add"
      circle
    )
</template>

<script>
export default {
  props: {
    pushed: Boolean,
    setting: {
      type: Object,
      default: null
    },
    expense: Boolean,
    cash: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      always: true,
      money: {
        symbol: null,
        amount: null,
        name: null,
        expense: null,
        date: null
      }
    }
  },
  computed: {
    incomeOrExpense () {
      return ((this.expense ? '-' : '+') + ' ' + this.setting.symbol)
    }
  },
  watch: {
    cash () {
      this.getCash()
    }
  },
  mounted () {
    this.getCash()
  },
  methods: {
    getCash () {
      if (this.cash) {
        this.money = this.cash
        if (this.cash.date) {
          this.always = false
        }
      }
    },
    onChangeDate (data) {
      const today = this.$moment()
      if (data > today) {
        return data
      } else {
        this.money.date = null
        this.$message({
          message: 'Choose a date greater than ' + today.format('MMMM YYYY'),
          type: 'error'
        })
      }
    },
    beforeAdd () {
      const cFormat = this.setting
      this.money.amount = currency(this.money.amount,
        {
          precision: this.setting.places,
          symbol: '',
          separator: (cFormat.separator === 'none' ? ' ' : cFormat.separator),
          decimal: cFormat.decimal
        }
      ).format(true)
      this.money.expense = this.expense
      this.money.symbol = this.setting.symbol
    },
    clear () {
      this.money.amount = null
      this.money.name = null
      this.money.date = null
    },
    add () {
      if (this.money.amount && this.money.name && (this.always || this.money.date)) {
        this.beforeAdd()
        this.$emit('add', this.money)
      } else {
        this.$message({
          message: 'Complete fields',
          type: 'error'
        })
      }
    },
    remove () {
      this.clear()
      this.$emit('remove')
    }
  }
}
</script>

<style scoped lang='sass'>
.money-input
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
