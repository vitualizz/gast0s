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
      btn.submit(
        color='green'
        @click.native='signUp'
      ) Crear
</template>

<script>
export default {
  data () {
    return {
      register: {
        fname: '',
        lname: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async signUp () {
      const self = this
      await this.$axios.post('/register', this.register)
        .then(() => {
          this.$auth.loginWith('local', {
            data: {
              email: self.register.email,
              password: self.register.password
            }
          })
            .then(() => {
              this.$message({
                message: 'Cuenta creada correctamente.',
                type: 'success'
              })
              this.$store.commit('isNewUser')
            })
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
