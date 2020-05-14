<template lang='pug'>
  .login-main.has-text-centered
    p.title GAST0S
    el-row
      btn(color='green').btn Login
      btn(color='yellow').btn Register
</template>

<script>
import btn from '~/components/base/inputs/btn'

export default {
  components: {
    btn
  }
}
</script>

<style scoped lang='sass'>
.login-main
  height: stretch
  display: grid
  align-content: center

.title
  font-size: 15vw

.btn
  @extend .f-size-5
</style>
