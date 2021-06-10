
<template>
  <div>
    <button @click="btn">跳转</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import zgaxios from '@/tools/zgaxios'
import { detailUrl } from '@/tools/api'
export default defineComponent({
  setup() {
    const btn = async () => {
      let {
        data: {
          data: { data },
        },
      } = await zgaxios('GET', detailUrl)
      console.log(data[0])
    }
    return { btn }
  },
})
</script>