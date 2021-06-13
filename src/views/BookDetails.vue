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
            <div class="bookright">
              <div class="booktext">
                <div class="bookhead">
                  <h1>{{list.title}}</h1>
                  <h3>{{list.author}}著</h3>
                </div>
                <div class="bookcenter">
                  <el-tag type="warning">{{list.categoryName}}</el-tag>
                  <el-divider direction="vertical"></el-divider>
                  <el-tag type="success">{{staduce(list.update.chapterStatus)}}</el-tag>
                </div>
                <div class="bookfoot">
                  <h4>
                    {{words(list.word)}}
                  </h4>
                  <el-divider direction="vertical"></el-divider>
                  <h4>
                    {{list.chapterNum}}
                    章
                  </h4>
                </div>
              </div>
              <div class="rightfoot">
                <div class="bookdetail">
                  <div class="bookadd" :style="{background:'url('+require('@/images/bookmark1.png')+') no-repeat'}">
                    <div><span>加入</span><span>书架</span></div>
                  </div>
                </div>

              </div>
            </div>
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
    const staduce = computed(() => {
      return (str) => {
        switch (str) {
          case 'END':
            return '完结'
          case 'SERIALIZE':
            return '连载中'
        }
      }
    })
    const words = computed(() => {
      return (str) => {
        if (str == '') {
          return '1万字'
        } else {
          return str
        }
      }
    })
    return {
      ...toRefs(states),
      staduce,
      words,
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
          // background-color: #fff;
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
          margin: 0 10px;
          flex: 1;
          height: 380px;
          // background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          .bookright {
            display: flex;
            flex-direction: column;
            width: 95%;
            height: 95%;
            .booktext {
              width: 100%;
              height: 100px;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              align-items: flex-start;
              .bookhead {
                width: 100%;
                height: 31px;
                display: flex;
                align-items: flex-end;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 1;
                overflow: hidden;
                /*! autoprefixer: off */
                -webkit-box-orient: vertical;
                // margin-bottom: 20px;
                h1 {
                  margin: 0;
                  height: 100%;
                }
                h3 {
                  margin: 0;
                  margin-left: 10px;
                  color: #999;
                  // height: 100%;
                }
              }
              .bookcenter {
                width: 100%;
                display: flex;
              }
              .bookfoot {
                width: 100%;
                display: flex;
                padding: 0 10px;
                h4 {
                  margin: 0;
                }
              }
            }
            .rightfoot {
              flex: 1;
              .bookdetail {
                // padding: 20px;
                margin-top: 10px;
                width: 100%;
                border-top: #cccc 1px solid;
                position: relative;
                .bookadd {
                  position: absolute;
                  top: 0;
                  right: 0;
                  color: #fff;
                  line-height: 14px;
                  height: 67px;
                  overflow: hidden;
                  width: 37px;
                }
              }
            }
          }
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