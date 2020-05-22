<template lang='pug'>
  el-dialog(
    :visible='visible'
  )
    Steps(
      :total='3'
      :stepCurrent='this.stepCurrent'
    )
      template(slot='step-1')
        p.title.is-4 General
        Settings(
          @setData='getSettings'
        )
      template(slot='step-2')
        Income(
          ref='income'
          :setting='setting'
        )
      template(slot='step-3')
        h5 Page
    span(slot="footer")
      btn(
        color='red'
        blank-to-color
      ) Skip
      btn(
        v-if='stepCurrent > 0'
        color='yellow'
        @click.native='stepPrev'
        blank-to-color
      ) Back
      btn(
        color='green'
        @click.native='stepCurrent++'
      ) Next
</template>

<script>
import Steps from '~/components/base/navigation/steps'
import Settings from '~/components/forms/settings'
import Income from '~/components/forms/income'

export default {
  components: {
    Steps,
    Settings,
    Income
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      stepCurrent: 1, // set 0
      setting: {}
    }
  },
  methods: {
    stepPrev () {
      this.$confirm('This data will be delete. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        if ([1, 2].includes(this.stepCurrent)) {
          this.$refs[this.stepCurrent === 1 ? 'income' : 'expense'].clear()
          this.stepCurrent--
        }
      })
    },
    getSettings (data) {
      this.setting = data
    }
  }
}
</script>
