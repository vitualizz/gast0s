<template lang='pug'>
  .schedule
    .columns
      .column
        .title.is-4 {{ schedule.name }}
      .column
        ul.info
          li Start amount: {{ schedule.amount }}
          li End Month: {{ schedule.date }}
      .column.has-text-right
        nuxt-link(
          :to='link'
        )
          btn(
            color='green'
          )
            i.el-icon-right
</template>

<script>
export default {
  props: {
    schedule: {
      type: Object,
      required: true
    }
  },
  computed: {
    link () {
      return '/scheduled/' + this.schedule.id
    }
  }
}
</script>

<style scoped lang='sass'>
.schedule
  border: 1px solid $borderGray
  border-radius: 10px
  padding: 10px 5px
.column
  align-self: center
</style>
