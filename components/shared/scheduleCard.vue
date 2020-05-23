<template lang='pug'>
  el-card.box-card
    div(slot='header')
      span {{ title }}
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
