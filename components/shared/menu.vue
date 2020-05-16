<template lang='pug'>
  nav.navbar
    .navbar-end
      .navbar-item
        p {{ this.$auth.user.fname }} {{ this.$auth.user.lname }}
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
    }
  }
}
</script>

<style scoped lang='sass'>
.logout
  color: $textBlank
</style>
