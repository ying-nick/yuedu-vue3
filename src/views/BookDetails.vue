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
                  <div class="synopsis">{{list.desc}}</div>
                  <div class="bookadd" :style="{background:'url('+require('@/images/bookmark1.png')+') no-repeat'}">
                    <div class="add">
                      <p>加入</p>
                      <p>书架</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="aside">
          <div class="recommed">
            <h2>精彩推荐</h2>
            <div class="recdal">
              <el-carousel class="recal">
                <el-carousel-item v-for="item in like" :key="item" class="recelem">

                  <div class="recimg">
                    <el-image style="width: 100%; height: 100%;transform:scale(1.2)" :src="'http://pt.yuenov.com:18888'+item.coverImg" fit="cover"></el-image>
                  </div>
                  <h2 class="medium">{{ item.title }}</h2>
                  <el-tag type="warning">{{item.categoryName}}</el-tag>
                  <div class="rectext">{{item.desc}}</div>
                  <el-button type="danger" round>书籍详情</el-button>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>

        </div>
      </div>
      <div class="detailfoot">
        <div class="footmain">
          <div class="bookupdata">
            <el-divider content-position="left">最新章节</el-divider>
            <div class="updtl">
              <span>{{list.update.chapterName}}</span>
              <span>更新时间：{{timeHandler(list.update.time)}}</span>
            </div>
          </div>
          <div class="mainbar">
            
            <el-divider content-position="left">大家都在看</el-divider>
            <div class="mainsee">
              <el-space direction="vertical">
                <el-skeleton style="width: 90%" :loading="loading" animated :count="5" class="mainlist">
                  <template #template>
                    <div class="seelist">
                      <el-skeleton-item variant="image" style="width: 140px; height: 150px;" />
                      <div style="padding: 14px;">
                        <el-skeleton-item variant="h3" style="width: 50%;" />
                      </div>
                    </div>
                  </template>
                  <template #default>
                    <div class="seelist" v-for="(item) in seelists" :key="item.title">
                      <div class="seeimg">
                        <el-image :src="'http://pt.yuenov.com:18888'+item.coverImg">
                          <template #error>
                            <div class="image-slot">
                              <i class="el-icon-picture-outline"></i>
                            </div>
                          </template>
                        </el-image>
                      </div>
                      <div>
                        <h3 style="width: 100%;">{{item.title}}</h3>
                      </div>
                    </div>
                  </template>
                </el-skeleton>
              </el-space>
            </div>
          </div>
        </div>
        <div class="footaside">
          <h2>本周热推</h2>
          <div class="asidedv">
            <el-skeleton :rows="6" :loading="loading" animated>
              <template #template>
              </template>
              <template #default>
                <el-collapse v-model="activeName" accordion>
                  <el-collapse-item v-for="(item,index) in weekread" :title="item.title" :name="index" :key="item.title">
                    <div class="img">
                      <el-image :src="'http://pt.yuenov.com:18888'+item.coverImg">
                        <template #error>
                          <div class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </template>
                      </el-image>
                    </div>
                    <div class="weektext">
                      <span>{{item.author}}</span>
                      <el-tag type="warning">{{item.categoryName}}</el-tag>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </template>
            </el-skeleton>
          </div>

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
import { searchUrl, searchUrlYnv, mostUrlYnv } from '@/tools/api'
import { timeHandler } from '@/tools/util'

export default defineComponent({
  setup() {
    const { state, getters, dispatch, commit } = useStore()
    const router = useRouter()
    const route = useRoute()
    let states = reactive({
      list: state.bookDetails,
      like: state.bookDetails.recommend,
      loading: true,
      readMost: state.readMost.list,
      weekread: [],
      activeName: 0,
      seelists: [],
    })
    //筛选器函数
    function booklist(arr, begin, last, start = 0, end = 4) {
      let li = arr.filter((item, index) => {
        return begin <= index && index <= last
      })
      return li.filter((item, index) => {
        return start <= index && index <= end
      })
    }
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
    async function getreads() {
      try {
        let { data } = await zgaxios('GET', mostUrlYnv, {
          params: {
            pageNum: 1,
            pageSize: 100,
            type: 'READ_MOST',
          },
        })
        let { result } = data
        // console.log(data)
        if (result.code == 0) {
          commit('getReadMost', data.data)
          states.weekread = booklist(data.data, 50, 99)
          states.seelists = booklist(data.data, 0, 49)
          states.loading = false
        } else {
          throw new Error('无数据')
        }
      } catch (error) {
        // console.log(error)
        ElMessage.error('获取不到推荐书单')
      }
    }
    setTimeout(() => {
      // getreads()
      // console.log(state.readMost)
      states.weekread = booklist(state.readMost.list, 50, 99)
      states.seelists = booklist(state.readMost.list, 0, 49)
      states.loading = false
    }, 10000)
    return {
      ...toRefs(states),
      staduce,
      words,
      timeHandler,
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
              width: 100%;
              height: 100%;
              transform: scale(1.2);
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
                align-items: center;
              }
              .bookfoot {
                width: 100%;
                display: flex;
                align-items: center;
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
                // height: 100%;
                border-top: #cccc 1px solid;
                position: relative;
                .synopsis {
                  width: 80%;
                  margin-top: 20px;
                  display: -webkit-box;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  // -webkit-line-clamp: 5;
                  overflow: hidden;
                  /*! autoprefixer: off */
                  -webkit-box-orient: vertical;
                }
                .bookadd {
                  position: absolute;
                  top: 0;
                  right: 0;
                  color: #fff;
                  line-height: 14px;
                  height: 67px;
                  overflow: hidden;
                  width: 37px;
                  display: flex;
                  justify-content: center;
                  align-items: flex-start;
                  .add {
                    width: 100%;
                    // height: 70%;
                    margin-top: 10px;
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                    p {
                      width: 100%;
                      margin: 0;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .aside {
        width: 300px;
        .recommed {
          width: 100%;
          height: 380px;
          display: flex;
          flex-direction: column;
          h2 {
            margin: 0;
          }
          .recdal {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            .recal {
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              .el-carousel__container {
                width: 90%;
                height: 90%;

                .recelem {
                  // width: 100%;
                  // height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-around;
                  align-items: center;
                  .medium {
                    display: -webkit-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    /*! autoprefixer: off */
                    -webkit-box-orient: vertical;
                  }
                  .recimg {
                    width: 40%;
                    height: 40%;
                    overflow: hidden;
                  }
                  .rectext {
                    width: 80%;
                    display: -webkit-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 3;
                    overflow: hidden;
                    /*! autoprefixer: off */
                    -webkit-box-orient: vertical;
                    text-align: center;
                  }
                }
              }
              ul {
                display: none;
              }
            }
          }
        }
      }
    }
    .detailfoot {
      width: 100%;
      height: 380px;
      display: flex;
      justify-content: space-around;
      .footmain {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 0;
        .bookupdata {
          width: 100%;
          .el-divider__text {
            background-color: transparent;
            font-weight: 600;
            font-size: 18px;
          }
          .updtl {
            display: flex;
            justify-content: space-between;
            span {
              padding: 20px;
            }
          }
        }
        .mainbar {
          .el-divider__text {
            background-color: transparent;
            font-weight: 600;
            font-size: 18px;
          }

          .mainsee {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .el-space {
              // width: 90%;
              display: flex;
              justify-content: center;
              align-items: center;
              .el-space__item {
                display: flex;
                justify-content: center;
                align-items: center;
                .mainlist {
                  display: flex;
                  justify-content: space-around;
                  align-items: center;
                }
                .seelist {
                  width: 140px;
                  height: 197px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  margin: 0 20px;
                  .seeimg {
                    width: 140px;
                    height: 150px;
                    overflow: hidden;
                    .el-image {
                      width: 120px;
                      height: 150px;
                      img {
                        width: 100%;
                        height: 100%;
                        transform: scale(1.2);
                      }
                    }
                  }
                  h3 {
                    display: -webkit-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    /*! autoprefixer: off */
                    -webkit-box-orient: vertical;
                    text-align: center;
                  }
                }
              }
            }
          }
        }
      }
      .footaside {
        width: 300px;
        .asidedv {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .el-collapse {
            width: 80%;
            i {
              display: none;
            }
            .el-collapse-item__header {
              background-color: transparent;
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 1;
              overflow: hidden;
              /*! autoprefixer: off */
              -webkit-box-orient: vertical;
            }
            .el-collapse-item__wrap {
              background-color: transparent;
              .el-collapse-item__content {
                display: flex;
                justify-content: space-around;
                .img {
                  width: 49px;
                  height: 68px;
                  .el-image {
                    transform: scale(1.2);
                  }
                }
                .weektext {
                  // flex: 1;
                  display: flex;
                  flex-direction: column;
                  span {
                    padding: 0 10px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>