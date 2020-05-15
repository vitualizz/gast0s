<template lang='pug'>
  .login-main.has-text-centered
    p.title GAST0S
    el-row
      btn(
        @click.native="loginVisible = true"
        color='green'
      ) Login
      btn(
        @click.native="registerVisible = true"
        color='yellow'
      ) Register
    el-dialog(
      title='Login'
      :visible.sync='loginVisible'
      width='20%'
    )
      Login
    el-dialog(
      title='Register'
      :visible.sync='registerVisible'
      width='20%'
    )
      Register
</template>

<script>
import Login from '~/components/views/login/login'
import Register from '~/components/views/login/register'

export default {
  components: {
    Login,
    Register
  },
  data () {
    return {
      loginVisible: false,
      registerVisible: false
    }
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

.el-row
  &::v-deep button
    width: 250px
    margin: 0px 20px
    @extend .f-size-5
</style>
