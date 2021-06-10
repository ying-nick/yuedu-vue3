<template>
  <div class="container">
    <div class="head">
      <el-row :gutter="20">
        <el-col :span="8"><span class="title">悦读</span></el-col>
        <el-col :span="8">
          <el-input v-model="state.input" placeholder="书名、作者、关键字" size="medium" suffix-icon="el-icon-search">
            <template #append><span @click="search">搜索</span></template>
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
      <el-tabs v-model="state.activeName" @tab-click="handleClick">
        <el-tab-pane label="首页" name="0">首页</el-tab-pane>
        <el-tab-pane label="分类" name="1">
          <detail></detail>
        </el-tab-pane>
        <el-tab-pane label="排行榜" name="2">排行榜</el-tab-pane>
        <el-tab-pane label="漫画" name="3">漫画</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import detail from '@/views/Detail.vue'
export default defineComponent({
  components: {
    detail,
  },
  setup(props, context) {
    const router = useRouter()
    let state = reactive({
      activeName: '0',
      input: '',
    })
    function handleClick(row: any, event: any) {
      // console.log(row,event)
      router.push('/detail')
    }
    function search() {
      //  console.log(state.input)
    }
    function tologin() {
      router.push('/login')
    }
    function tohome() {}
    return {
      state,
      handleClick,
      search,
      tologin,
      tohome,
    }
  },
})
</script>

<style lang="less" scoped>
.head {
  width: auto;
  height: 100px;
  line-height: 100px;
  text-align: center;
  /deep/.el-input__inner {
    border-color: rgb(255, 136, 0);
  }
  .dv {
    span {
      margin: 0 20px;
      cursor: pointer;
    }
    span:hover {
      color: #f80;
    }
  }
  .title {
    font-size: 30px;
    font-style: italic;
  }
  /deep/.el-input-group__append,
  .el-input-group__prepend {
    background-color: #f80;
    border: 1px solid #f80;
    color: white;
    cursor: pointer;
  }
}
.navsheet {
  /deep/.el-tabs__nav-wrap {
    background-color: #f80;
    .el-tabs__nav {
      margin-left: 300px;
    }
    .el-tabs__active-bar {
      background-color: white;
      height: 4px;
      //  margin-left: 300px;
    }
    .el-tabs__item {
      color: white;
      font: 'Helvetica Neue Light', 'Microsoft YaHei', sans-serif, '宋体';
    }
  }
}
</style>
