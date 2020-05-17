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
    },
    blankToColor: Boolean
  },
  computed: {
    colorClass () {
      if (!this.color.length) { return '' }
      let classes = [`btn-${this.color}`]
      if (this.blankToColor) { classes = classes.concat('inversed') }
      return classes
    }
  }
}
</script>

<style scoped lang='sass'>
$btnColors: "green" $btnGreenColor $btnGreenColorHover, "yellow" $btnYellowColor $btnYellowColorHover, "red" $btnRedColor $btnRedColorHover

.el-button
  border: none
  border-radius: 100px
  padding: 20px
  color: $textGrayDark

@each $name, $color, $hover in $btnColors
  .btn-#{$name}
    background-color: $color
    &:hover
      background-color: $hover
    &.inversed
      background-color: inherit
      &:hover
        background-color: $hover
</style>
