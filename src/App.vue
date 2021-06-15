<template>
  <div id="container">
    <div class="head">
      <el-row :gutter="10" class="el">
        <el-col :span="6" class="col"><span class="title">悦读</span></el-col>
        <el-col :span="12" class="col">
          <div class="seach">
            <el-input placeholder="请输入书名，关键字" v-model="input2" class="inp">
              <template #append>
                <el-button icon="el-icon-search"></el-button>
              </template>
            </el-input>
          </div>

        </el-col>
        <el-col :span="6" class="col">
          <div class="dv">
            <span>我的书架</span>
            <span @click="tologin">登录</span>
            <span>注册</span>
          </div>

        </el-col>
      </el-row>
    </div>
    <div class="navsheet">
      <el-menu :default-active="activeIndex" router class="el-menu-demo menu" mode="horizontal" @select="handleSelect">
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/">排行榜</el-menu-item>
        <el-menu-item index="/detail">分类</el-menu-item>
        <el-menu-item index="/">漫画</el-menu-item>
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
<CK></CK>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import detail from '@/views/Detail.vue'
export default defineComponent({
  components: {
    detail,
  },
  setup(props, context) {
    const router = useRouter()
    let state = reactive({
      input2: '',
    })
    function search() {
      //  console.log(state.input)
    }
    function tologin() {
      router.push('/login')
    }
    function tohome() {}
    return {
      ...toRefs(state),
      search,
      tologin,
      tohome,
    }
  },
})
</script>

<style lang="less">
#container {
  width: 100%;
  .head {
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    display: flex;
    align-items: center;
    .el {
      width: 100%;
      height: 95%;
      .col {
        height: 100%;
      }
      .seach {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .inp {
          height: 50%;
          width: 80%;
          border: 1px solid #f80;
          .el-input-group__append {
            background-color: #f80;
            // border: 1px solid #f80;
            color: white;
            cursor: pointer;
          }
          input {
            height: 100%;
          }
        }
      }
      .dv {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        span {
          cursor: pointer;
          overflow: hidden;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          height: 100%;
        }
        span:hover {
          color: #f80;
        }
      }
      .title {
        font-size: 50px;
        font-style: italic;
      }
    }
  }
}
.navsheet {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f80;
  .menu {
    width: 80%;
    background-color: #f80;
    li {
      color: #fff;
    }
  }
}
</style>
