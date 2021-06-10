<template>
  <div id="container">
     <headx></headx>
    <router-view/>
  </div>
  
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import headx from "@/components/header.vue"
export default defineComponent({
   components:{
      headx
   },
  setup() {
    
  },
})
</script>

<style lang="less">

</style>
