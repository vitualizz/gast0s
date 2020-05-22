<template lang='pug'>
  el-dialog(
    :visible.sync='visible'
    :before-close='skip'
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
        Cash(
          ref='income'
          :setting='setting'
        )
      template(slot='step-3')
        Cash(
          ref='expense'
          :setting='setting'
          expense
        )
    span(slot='footer')
      btn(
        color='red'
        blank-to-color
        @click.native='skip'
      ) Skip
      btn(
        v-if='stepCurrent > 0'
        color='yellow'
        @click.native='stepPrev'
        blank-to-color
      ) Back
      btn(
        color='green'
        @click.native='stepNext'
      ) Next
</template>

<script>
import Steps from '~/components/base/navigation/steps'
import Settings from '~/components/forms/settings'
import Cash from '~/components/forms/cash'

export default {
  components: {
    Steps,
    Settings,
    Cash
  },
  data () {
    return {
      visible: false,
      stepCurrent: 0,
      setting: {}
    }
  },
  mounted () {
    this.visible = this.$store.state.firstConfiguration
  },
  methods: {
    async createSetting () {
      const self = this
      await this.$axios.post('/settings', this.setting)
        .then((data) => {
          self.$store.commit('setSetting', data.setting)
          this.$store.commit('disableFirstConfiguration')
          this.visible = false
        })
    },
    stepNext () {
      this.stepCurrent++
      if (this.stepCurrent === 2) {
        this.createSetting()
      }
    },
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
    skip () {
      this.$confirm('Skip configuration. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.createSetting()
      })
    },
    getSettings (data) {
      this.setting = data
    }
  }
}
</script>
