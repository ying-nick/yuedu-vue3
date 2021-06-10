<template>
  <div id="container">
    <div class="head">
      <el-row :gutter="10" class="el">
        <el-col :span="6" class="col"><span class="title">悦读</span></el-col>
        <el-col :span="12" class="col">
          <div class="seach">
            <el-input placeholder="请输入书名，关键字" v-model="input2" class="inp" @keyup.enter="bookSeach">
              <template #append>
                <el-button icon="el-icon-search" @click="bookSeach"></el-button>
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

</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import zgaxios from '@/tools/zgaxios'
import { searchUrl } from '@/tools/api'

export default defineComponent({
  setup(props, context) {
    const router = useRouter()
    let state = reactive({
      input2: '',
    })
    function bookSeach() {
      if (!state.input2) return
      // console.log(state.input2)
      search()
    }
    const search = async () => {
      try {
        let {
          data: {
            data: { data },
          },
        } = await zgaxios('GET', `${searchUrl}/${state.input2}/1/10`)
        console.log(data)
      } catch (error) {
        // console.log(error)
        ElMessage.error('错误，该书不存在或已被移除')
      }
    }
    function tologin() {
      router.push('/login')
    }
    function tohome() {}
    return {
      ...toRefs(state),
      bookSeach,
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
          outline: none;
          .el-input-group__append {
            background-color: #f80;
            // border: 1px solid #f80;
            color: white;
            cursor: pointer;
            height: 100%;
          }
          input {
            height: 100%;
            outline: none;
            border: none;
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
  // background-color: #f80;
  .menu {
    width: 95%;
    background-color: #f80;
    li {
      color: #fff;
      margin-left: 50px;
    }
  }
}
</style>
