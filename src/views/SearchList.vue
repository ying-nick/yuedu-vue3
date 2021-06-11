<template>
  <div>{{title}}</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const { state, getters, dispatch, commit } = useStore()
    let lists = reactive({
      list: state.searchData.data,
      title: state.searchData.title,
      size: state.searchData.size,
      count: state.searchData.count,
      from: state.searchData.from,
    })
    return { ...toRefs(lists) }
  },
})
</script>
<style lang="less" scope>
div {
  width: 100px;
  height: 100px;
}
</style>