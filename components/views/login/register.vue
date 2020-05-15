<template lang='pug'>
  el-form(:model='register')
    el-form-item
      el-input(
        type='text'
        placeholder='Nombre'
        v-model='register.fname'
      )
    el-form-item
      el-input(
        type='text'
        placeholder='Apellido'
        v-model='register.lname'
      )
    el-form-item
      el-input(
        type='email'
        placeholder='Email'
        v-model='register.email'
      )
    el-form-item
      el-input(
        type='password'
        placeholder='Contraseña'
        v-model='register.password'
      )
    el-form-item
      el-input(
        type='password'
        placeholder='Confirmar contraseña'
        v-model='register.password_confirmation'
      )
    el-form-item
      btn.submit(color='green') Crear
</template>

<script>
export default {
  data () {
    return {
      register: {
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
