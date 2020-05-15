<template lang='pug'>
  nav.navbar
    .navbar-end
      .navbar-item
        p {{ this.$auth.user.fname }} {{ this.$auth.user.lname }}
      .navbar-item
        btn(
          color='yellow'
          @click.native='logOut'
        ) LogOut
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
