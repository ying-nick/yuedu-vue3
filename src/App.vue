<template>
  <div id="container">
     <headx></headx>
<<<<<<< HEAD
    <router-view/>
=======
     <router-view></router-view>
>>>>>>> cc94ea17ddfc6dd93c615fb7087824668721f132
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
