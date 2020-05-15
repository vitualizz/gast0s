<template lang='pug'>
  el-form(:model="login")
    el-form-item
      el-input(
        type='email'
        placeholder='Email'
        v-model='login.email'
      )
    el-form-item
      el-input(
        type='password'
        placeholder='Contraseña'
        v-model='login.password'
      )
    el-form-item
      btn.submit(color='green') Login
</template>

<script>

export default {
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
