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
$btnColors: "green" $btnGreenColor $btnGreenColorHover, "yellow" $btnYellowColor $btnYellowColorHover

.el-button
  border: none
  border-radius: 100px

.btn
  color: $textGrayDark

@each $name, $color, $hover in $btnColors
  .btn-#{$name}
    background-color: $color
    &:hover
      background-color: $hover
    @extend .btn
</style>
