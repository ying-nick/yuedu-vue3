<template>
  <div id="container">
    <home></home>
  </div>
  
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import home from "@/views/Home.vue"
export default defineComponent({
  components:{
     home
  },
  setup() {
    
  },
})
</script>

<style lang="less">

</style>
