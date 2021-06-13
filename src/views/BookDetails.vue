<template>
  <div class="datailcontainer">
    <div class="dataillists">
      <div class="contain">
        <div class="main">
          <div class="left">
            <div class="mask">
              <img :src="'http://pt.yuenov.com:18888'+list.coverImg" alt="">
            </div>

            <div class="btn">
              <el-button type="primary" icon="el-icon-s-unfold">全部目录</el-button>
              <el-button type="primary" icon="el-icon-s-management">立即阅读</el-button>
            </div>
          </div>
          <div class="right">
            <div></div>
            <div></div>
          </div>
        </div>
        <div class="aside">
          <h2>为你推荐</h2>
        </div>
      </div>
    </div>
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
  setup() {
    const { state, getters, dispatch, commit } = useStore()
    const router = useRouter()
    const route = useRoute()
    let states = reactive({
      list: state.bookDetails,
      like: state.bookDetails.recommend,
    })

    return {
      ...toRefs(states),
    }
  },
})
</script>
<style lang="less" scope>
.datailcontainer {
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .dataillists {
    width: 90%;
    .contain {
      width: 100%;
      display: flex;
      justify-content: space-around;
      .main {
        flex: 1;
        display: flex;
        justify-content: space-around;
        padding: 0;
        .left {
          width: 220px;
          height: 380px;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          .mask {
            width: 80%;
            height: 70%;
            overflow: hidden;
            img {
              width: 110%;
              height: 110%;
            }
          }
          .btn {
            width: 90%;
            height: 20%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .el-button--primary {
              background-color: #fb6b84;
              border-color: #fb6b84;
              padding: 0 5px;
            }
          }
        }
        .right {
          margin: 0 20px;
          flex: 1;
          height: 380px;
          background-color: #fff;
        }
      }
      .aside {
        width: 200px;
        h2 {
          margin: 0;
        }
      }
    }
  }
}
</style>