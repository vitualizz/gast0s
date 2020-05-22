<template lang='pug'>
  .container
    h5 Text
    ConfigNewUser(:visible='isNew')
</template>

<script>
import ConfigNewUser from '~/components/views/ConfigNewUser'

export default {
  components: {
    ConfigNewUser
  },
  data () {
    return {
      isNew: false
    }
  },
  mounted () {
    this.isNew = this.$store.state.newUser
  }
}
</script>
