<template lang='pug'>
  div
    ScheduleForm(
      :setting='setting'
    )
</template>

<script>
import ScheduleForm from '~/components/forms/schedule'

export default {
  components: {
    ScheduleForm
  },
  data () {
    return {
      setting: {}
    }
  },
  mounted () {
    this.getSetting()
  },
  methods: {
    async getSetting () {
      await this.$axios.get('/settings')
        .then((req) => {
          this.setting = req.data.setting
        })
    }
  }
}
</script>
