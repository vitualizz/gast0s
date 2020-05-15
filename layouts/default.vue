<template lang='pug'>
  div
    Menu(v-if='$auth.loggedIn')
    .container
      nuxt
</template>

<script>
import Menu from '~/components/shared/menu'

export default {
  components: {
    Menu
  }
}
</script>
