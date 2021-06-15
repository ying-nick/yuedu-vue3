<template>
  <div class="container">
    <div class="head">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            
            v-model="state.input"
            placeholder="书名、作者、关键字"
            size="medium"
            suffix-icon="el-icon-search"
          >
            <template #append ><span @click="search">搜索</span></template>
          </el-input>
        </el-col>
        <el-col :span="8">
              <div class="dv">
                  <span>我的书架</span>
                  <span @click="tologin">登录</span>
                  <span>注册</span>
              </div>
       
        </el-col>
      </el-row>
    </div>
    <div class="navsheet">
      <el-menu :default-active="state.activeIndex" router class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/charts">排行榜</el-menu-item>
        <el-menu-item index="/catagory">分类</el-menu-item>
        <el-menu-item index="/cartoons">漫画</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { useRouter  } from "vue-router"
export default defineComponent({
  setup(props,context) {
    const router=useRouter()
    let state = reactive({
      activeIndex: "0",
      input:''
      
    });
   
    function search(){
      //  console.log(state.input)
    }
    function tologin(){
       router.push('/login')
    }
    function tohome(){
      
    }
    function handleSelect(){

    }
    return {
      state,
      search,
      tologin,
      handleSelect
    };
  }
});
</script>

<style lang="less" scoped>
.head {
  width: auto;
  height: 100px;
  line-height: 100px;
  text-align: center;
  /deep/.el-input__inner{
    border-color: rgb(255, 136, 0);
    
  }
  .dv{
    span{
        margin: 0 20px;
        cursor: pointer;
    }
    span:hover{
        color:#f80 ;
        
    }
   
  }
  .title{
    font-size: 30px;
    font-style:italic;
  }
  /deep/.el-input-group__append, .el-input-group__prepend{
       background-color: #f80;
       border: 1px solid #f80;
       color: white;
       cursor: pointer;
  }
  
}
.navsheet {
  
  
}
</style>
