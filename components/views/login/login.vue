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
      btn.submit(
        color='green'
        @click.native='signIn'
      ) Login
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
  },
  methods: {
    async signIn () {
      await this.$auth.loginWith('local', {
        data: {
          email: this.login.email,
          password: this.login.password
        }
      })
    }
  }
}
</script>

<style scoped lang='sass'>
.submit
  width: 130px
  @extend .f-size-4
</style>
