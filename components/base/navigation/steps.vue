<template lang='pug'>
  div
    el-steps(
      align-center
      :active='stepCurrent'
      'finish-status'='success'
    )
      el-step(
        v-for='(i, index) in total'
        :key='index'
        :title="`Step ${i}`"
      )
    .content-step(
      v-for='(i, index) in total'
      :key='index'
      v-show="stepCurrent == i - 1"
    )
      slot(
        :name="`step-${i}`"
      )
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    stepCurrent: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped lang='sass'>
.content-step
  margin: 5%
</style>
