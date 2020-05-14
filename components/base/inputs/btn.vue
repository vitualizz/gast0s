<template lang='pug'>
  el-button(:class="colorClass")
    slot
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    colorClass () {
      return (this.color.length ? `btn-${this.color}` : '')
    }
  }
}
</script>

<style scoped lang='sass'>
.el-button
  border: none
  border-radius: 100px

.btn
  color: $textGrayDark

.btn-green
  background-color: $btnGreenColor
  &:hover
    background-color: $btnGreenColorHover
  @extend .btn

.btn-yellow
  background-color: $btnYellowColor
  &:hover
    background-color: $btnYellowColorHover
  @extend .btn
</style>
