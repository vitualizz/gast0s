<template lang='pug'>
  el-form(:model="login")
    el-form-item
      el-input(type='email')
    el-form-item
      el-input(type='password')
    el-form-item
      btn.submit(color='green') Login
</template>

<script>
import btn from '~/components/base/inputs/btn'

export default {
  components: {
    btn
  },
  data () {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  }
}
</script>

<style scoped lang='sass'>
.submit
  width: 130px
  @extend .f-size-4
</style>
