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
$btnColors: "green" $btnGreenColor $btnGreenColorHover $textGrayDark, "yellow" $btnYellowColor $btnYellowColorHover $textGrayDark, "red" $btnRedColor $btnRedColorHover $textBlank

.el-button
  border: none
  border-radius: 100px

.btn
  padding: 20px

@each $name, $color, $hover, $colorText in $btnColors
  .btn-#{$name}
    color: $colorText
    background-color: $color
    &:hover
      background-color: $hover
    @extend .btn
</style>
