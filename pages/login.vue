<template lang='pug'>
  .has-text-centered
    p.title.is-2 GAST0S
    el-row
      btn(color='green') Login
      btn(color='yellow') Register
</template>

<script>
import btn from '~/components/base/inputs/btn'

export default {
  components: {
    btn
  }
}
</script>
