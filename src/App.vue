<template>
  <div id="container">
    <headx></headx>
  </div>
<CK></CK>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import headx from '@/components/header.vue'

import CK from '@/views/Home.vue'
export default defineComponent({
  components: {
    headx,
    CK
  },
  setup() {},
})
</script>

<style lang="less">
</style>
