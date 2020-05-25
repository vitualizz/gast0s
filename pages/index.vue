<template lang='pug'>
  div
    .columns.is-multiline
      .column.is-half(
        v-for='schedule in schedules'
      )
        scheduleCard(
          :key='schedule.id'
          :schedule='schedule'
        )
      .column.is-half
        nuxt-link(to="/scheduled/new")
          btn.btn-new-schedule(
            color='green'
          ) New
    ConfigNewUser
</template>

<script>
import ConfigNewUser from '~/components/views/ConfigNewUser'
import scheduleCard from '~/components/shared/scheduleCard'

export default {
  components: {
    ConfigNewUser,
    scheduleCard
  },
  data () {
    return {
      schedules: []
    }
  },
  mounted () {
    this.getSchedules()
  },
  methods: {
    async getSchedules () {
      await this.$axios.get('/schedules')
        .then((res) => {
          this.schedules = res.data.schedule
        })
    }
  }
}
</script>

<style scoped lang='sass'>
.columns
  margin-top: 0px
.btn-new-schedule
  width: 100%
</style>
