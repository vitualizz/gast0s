<template lang='pug'>
  .container
    h5 Text
    el-dialog(
      :visible='this.configNewUser.isNew'
    )
      Steps(
        :total='3'
        :stepCurrent='this.configNewUser.stepCurrent'
      )
        template(slot='step-1')
          p.title.is-4 General
          Settings
        template(slot='step-2')
          h5 Page
        template(slot='step-3')
          h5 Page
      span(slot="footer")
        btn(
          color='red'
          blank-to-color
        ) Skip
        btn(
          color='green'
          @click.native='configNewUser.stepCurrent++'
        ) Next
</template>

<script>
import Steps from '~/components/base/navigation/steps'
import Settings from '~/components/forms/settings'

export default {
  components: {
    Steps,
    Settings
  },
  data () {
    return {
      configNewUser: {
        isNew: false,
        stepCurrent: 0
      }
    }
  },
  mounted () {
    this.configNewUser.isNew = this.$store.state.newUser
  }
}
</script>
