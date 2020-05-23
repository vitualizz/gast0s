<template lang='pug'>
  nav.navbar
    .navbar-start
      .navbar-item
        nuxt-link(to='/')
          p Home
    .navbar-end
      .navbar-item
        p {{ this.$auth.user.fname }} {{ this.$auth.user.lname }}
      .navbar-item
        nuxt-link(to='/setting/edit')
          i.el-icon-s-tools
      .navbar-item
        btn(
          color='red'
          @click.native='logOut'
        ).logout LogOut
</template>

<script>
export default {
  methods: {
    async logOut () {
      await this.$auth.logout()
        .then(() => {
          this.$message({
            message: 'Sesión cerrada correctamente.',
            type: 'success'
          })
        })
    }
  }
}
</script>

<style scoped lang='sass'>
.logout
  color: $textBlank
</style>
