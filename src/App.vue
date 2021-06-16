<template>
  <div id="container">
    <div class="head">
      <el-row :gutter="10" class="el">
        <el-col :span="6" class="col">
          <img :src="require('@/images/book.png')" alt="">
          <span class="title">悦读</span>
        </el-col>
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
            <span @click="tobookshelf">我的书架</span>
            <div class="demo-type">
              <el-avatar :size="40" :src="src" @error="errorHandler">
                <img src="http://dl.weshineapp.com/gif/20191111/909446bd7c485cd274300e84625035d7.gif?id=909446bd7c485cd274300e84625035d7"
                  style="width:100%;height:100%" />
              </el-avatar>
            </div>
            <span v-if="!lgn" @click="tologin">登录</span>
            <span v-if="lgn" @click="nologin">退出</span>
          </div>

        </el-col>
      </el-row>
    </div>
    <div class="navsheet">
      <el-menu :default-active="route.path" router class="el-menu-demo menu" mode="horizontal">
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/">排行榜</el-menu-item>
        <el-menu-item index="/detail">分类</el-menu-item>
        <el-menu-item index="/cartoon">漫画</el-menu-item>
      </el-menu>
    </div>

    <router-view :key="key"></router-view>
  </div>

</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElLoading } from 'element-plus'
import { useStore } from 'vuex'
import zgaxios from '@/tools/zgaxios'
import { searchUrl, searchUrlYnv } from '@/tools/api'

export default defineComponent({
  setup(props, context) {
    //获取store中的信息
    const { state, getters, dispatch, commit } = useStore()
    const router = useRouter()
    const route = useRoute()
    let states = reactive({
      input2: '',
      lgn: state.user.lgn,
      src: state.user.src,
    })
    const key = computed(() => {
      return route.fullPath
    })

    function bookSeach() {
      if (!states.input2) return
      // console.log(state.input2)
      search()
    }
    const errorHandler = () => true
    const search = async () => {
      /*   try {
        let {
          data: { data },
        } = await zgaxios('GET', `${searchUrl}/${states.input2}/1/10`)
        if (!data) throw new Error('无数据')
        // console.log(data)
        data.title = states.input2
        commit('getSearchData', data)
        states.input2 = ''
        router.push('/searchList')
      } catch (error) {
        // console.log(error)
        ElMessage.error('错误，该书不存在或已被移除')
      } */
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      try {
        let { data } = await zgaxios('GET', searchUrlYnv, {
          params: {
            keyWord: states.input2,
            pageNum: 1,
            pageSize: 100,
          },
        })
        let { result } = data
        // console.log(result)
        if (result.code == 1009) {
          loading.close()
          ElMessage.error('操作太频繁，请10s后再试')
          return
        } else if (result.code == 102) {
          loading.close()
          ElMessage.error('错误，该书不存在或已被移除')
          return
        } else if (result.code == 0) {
          loading.close()
          let book = data.data
          let ynv = {
            title: states.input2,
            list: book.list,
            size: book.pageSize,
            count: book.total,
            from: book.pageNum,
          }
          // console.log(ynv)
          // console.log(book)
          commit('getSearchData', ynv)
          let url = `/searchList/${states.input2}`
          states.input2 = ''
          router.push(url)
        } else {
          loading.close()
          throw new Error('无数据')
        }
      } catch (error) {
        loading.close()
        // console.log(error)
        ElMessage.error('错误，该书不存在已被移除')
      }
    }

    function tologin() {
      router.push('/login')
      // console.log(state.user.src)
    }
    function nologin() {
      let userinfo = {
        nickname: '',
        src: '',
        lgn: false,
      }
      commit('adduserinfo', userinfo)
    }

    function tobookshelf(e) {
      router.push('/bookshelf')
    }
    return {
      ...toRefs(states),
      bookSeach,
      tologin,
      tobookshelf,
      key,
      route,
      nologin,
      errorHandler,
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
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          height: 57px;
          width: 57px;
        }
        span {
          width: 110px;
          margin-left: 10px;
          height: 100%;
          overflow: hidden;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
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
          background-color: #f80;
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
        width: 60%;
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
