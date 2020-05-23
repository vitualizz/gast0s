<template lang='pug'>
  div
    nuxt-link(to="/scheduled/new")
      btn.new-scheduled(
        color='green'
      ) New
    ConfigNewUser
</template>

<script>
import ConfigNewUser from '~/components/views/ConfigNewUser'
// import scheduleCard from '~/components/shared/scheduleCard'

export default {
  components: {
    ConfigNewUser
    // scheduleCard
  }
}
</script>

<style scoped lang='sass'>
.new-scheduled
  width: 50%
</style>
