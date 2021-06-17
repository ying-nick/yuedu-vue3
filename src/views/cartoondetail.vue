<template>
  <div class="container">
    <div class="content">
      <el-row>
        <el-col :span="18">
          <div class="head">
            <div class="title">{{ cartoondata.comic.name }}</div>
          </div>
          <div class="introduce">
            <el-row>
              <el-col :span="6" class="bookpicture">
                <img :src="cartoondata.comic.cover" />
              </el-col>
              <el-col :span="18" class="bookintroduce">
                <div class="tag">
                  <el-button type="success" round plain size="small" v-for="item in cartoondata.comic.classifyTags" :key="item">{{ item.name }}</el-button>
                </div>
                <div class="status">
                  <el-row>
                    <el-col :span="6">
                      <div>状态：连载中</div>
                    </el-col>
                    <el-col :span="6">
                      <div>总点击：50.94亿</div>
                    </el-col>
                    <el-col :span="6">
                      <div>总月票：2758114</div>
                    </el-col>
                    <el-col :span="6">
                      <div>最后更新:{{cartoondata.updatetime}}</div>
                    </el-col>
                  </el-row>
                </div>
                <div class="introducecontent">
                  {{ cartoondata.comic.description }}
                </div>
                <div class="button">
                  <el-row>
                    <el-col :span="8">
                      <div class="startread" @click="
                          toread(
                            cartoondata.chapterlist[0].chapter_id,
                            cartoondata.chapterlist[0].name
                          )
                        ">
                        开始阅读
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="addtobookshelf" @click="addtobookshelf">
                        加入书架
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="vote">投月票</div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="author">
            <div class="info">
              <el-row>
                <el-col :span="8" class="avatar">
                  <img :src="cartoondata.author.avatar" alt="" />
                </el-col>
                <el-col :span="16">
                  <div class="name">
                    {{ cartoondata.author.name }}
                  </div>
                  <div class="count">
                    作品：5部
                  </div>
                </el-col>
              </el-row>
              <div class="tip">
                每月1号,11号,21号上传新章节，或于隔日早晨更新。谢谢大家支持!!
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="middle">
        <el-row>
          <el-col :span="24">
            <div class="rightcontent">
              <ul>
                <li v-for="item in cartoondata.chapterlist.slice(0, 16)" :key="item" @click="tochapter(item.chapter_id, item.name,item.type)">
                  <span class="vip">{{item.type==0?'':'vip'}}</span>
                  {{ item.name }}
                  <span class="totalpicture">({{item.image_total}}p)</span>

                </li>

                <div class="more" v-if="cartoondata.chapterlist.length>50">
                  <el-collapse v-model="cartoondata.activeNames" @change="handleChange">
                    <el-collapse-item title="展开全部章节" name="1" class="text">
                      <ul>
                        <li @click="tochapter(item.chapter_id, item.name,item.type)" v-for="item in cartoondata.chapterlist.slice(
                            16,
                            cartoondata.chapterlist.length-16
                          )" :key="item">
                          <span class="vip">{{item.type==0?'':'vip'}}</span>
                          {{ item.name }}
                          <span class="totalpicture">({{item.image_total}}p)</span>
                        </li>
                      </ul>
                    </el-collapse-item>
                  </el-collapse>
                </div>

                <li v-for="item in cartoondata.chapterlist.slice(
                    cartoondata.chapterlist.length-16,
                    cartoondata.chapterlist.length
                  )" :key="item" @click="tochapter(item.chapter_id, item.name,item.type)">
                  <span class="vip">{{item.type==0?'':'vip'}}</span>
                  {{ item.name }}
                  <span class="totalpicture">({{item.image_total}}p)</span>

                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
        <div class="bottomsheet">
          <img src="https://image.mylife.u17t.com/2017/03/22/1490160740_xJ66l9X56n65.gif" />
        </div>
        <div class="comment">
          <div class="commenthead">
            所有评论
          </div>
          <div class="commentcontent">
            <div class="commentinput">

            </div>
            <div class="commentlist" v-for="item in cartoondata.commentList" :key="item">
              <el-row>
                <el-col :span="4">
                  <div class="avatar">
                    <img :src="item.face" alt="" />
                  </div>
                </el-col>
                <el-col :span="20">
                  <div class="name">
                    {{ item.nickname }}
                    <span>10-03-17 15:19</span>
                  </div>
                  <div class="commentitem" v-html="item.content"></div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import zgaxios from '@/tools/zgaxios'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
export default defineComponent({
  props: ['id'],
  setup(props) {
    const { commit, state, dispatch } = useStore()
    const router = useRouter()
    let cartoondata = reactive({
      activeNames: ['0'],
      comic: '',
      author: '',
      chapterlist: [],
      commentList: [],
      updatetime: '',
    })
    //获取最后更新时间戳
    function gettime(timestr) {
      let now = new Date().getTime()
      let time = now - timestr
      let dat = new Date(time)
      let year = dat.getFullYear()
      let month = dat.getMonth() + 1
      let date = dat.getDate()
      cartoondata.updatetime = year + '年' + month + '月' + date + '日'
      console.log(year + '年' + month + '月' + date + '日')
    }
    // gettime(1623364321)

    //展开更多
    let handleChange = () => {}
    //获取详情信息
    let getcotagory = async () => {
      let { data } = await zgaxios(
        'GET',
        `/yyq/comic/detail_static_new?comicid=${props.id}`
      )
      gettime(data.data.returnData.comic.last_update_time)
      console.log(data.data.returnData)
      cartoondata.comic = data.data.returnData.comic
      cartoondata.chapterlist = data.data.returnData.chapter_list
      cartoondata.author = data.data.returnData.comic.author
      cartoondata.commentList = data.data.returnData.commentList
      commit('addchapterlist', data.data.returnData.chapter_list)
      commit('addcomic', cartoondata.comic)
    }
    getcotagory()
    //开始阅读
    let toread = (id, name) => {
      commit('addcomic', cartoondata.comic)
      router.push(`/cartoon/detail/${props.id}/${id}/${name}`)
    }
    //进入指定章节
    let tochapter = (id, name, type) => {
      if (type == 3) {
        ElMessage({
          showClose: true,
          message: '您访问的是vip章节哦',
          type: 'warning',
        })
        return
      }
      commit('addcomic', cartoondata.comic)
      router.push(`/cartoon/detail/${props.id}/${id}/${name}`)
    }
    //添加到书架
    let addtobookshelf = async () => {
      if (!state.user.lgn) {
        ElMessage.error('请先登录')
        return
      }
      let { data } = await zgaxios(
        'GET',
        `/yyq/comic/detail_static_new?comicid=${props.id}`
      )
      console.log(data.data.returnData)
      let bookobj = {
        type: state.comic.classifyTags[0].name,
        picture: state.comic.cover,
        name: state.comic.name,
        title: data.data.returnData.chapter_list[0].name,
        chapterid: data.data.returnData.chapter_list[0].chapter_id,
        newpage: '第' + cartoondata.chapterlist.length + '章',
        cartoonId: props.id,
      }
      try {
        dispatch('asysetCartoon', bookobj)
        ElMessage({
          showClose: true,
          message: '添加成功',
          type: 'success',
        })
      } catch (error) {
        ElMessage({
          showClose: true,
          message: '已在书架中,请勿重复添加',
          type: 'warning',
        })
      }
    }
    return {
      gettime,
      tochapter,
      cartoondata,
      reactive,
      handleChange,
      getcotagory,
      toread,
      addtobookshelf,
    }
  },
})
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: auto;
  background: url('https://static.u17i.com/v4/www/images/comicinfo/zhenhunjie_bg_donghua.jpg')
    no-repeat;
}
.content {
  width: 70%;
  height: 1000px;
  min-width: 1050px;
  background-color: #fff;
  margin: 0 auto;
  position: relative;
  top: 500px;
}
.head {
  border-bottom: 1px solid red;
  .title {
    font-size: 30px;
    font-weight: bolder;
    margin-left: 30px;
  }
}
.introduce {
  width: 90%;
  margin: 10px auto;
  height: 300px;
  .bookpicture {
    img {
      width: 160px;
      height: 210px;
    }
  }
}
.status {
  margin-top: 10px;
}
.introducecontent {
  margin-top: 10px;
  color: #999;
}
.button {
  height: 100px;
  line-height: 100px;
  text-align: center;

  .startread {
    background-color: #ff444f;
    color: white;
    font-size: 20px;
    width: 163px;
    height: 49px;
    line-height: 49px;
    margin-top: 45px;
    border-bottom: 4px solid #e76971;
    border-radius: 5px;
    cursor: pointer;
  }
  .startread:hover {
    background-color: rgb(224, 125, 125);
  }
  .addtobookshelf {
    cursor: pointer;
    width: 163px;
    color: white;
    font-size: 20px;
    height: 49px;
    line-height: 49px;
    background-color: #6ed8db;
    margin-top: 45px;
    border-radius: 5px;
    border-bottom: 4px solid #2eb0a2;
  }
  .addtobookshelf:hover {
    background-color: #5ad0d4;
  }
  .vote {
    cursor: pointer;
    width: 163px;
    height: 49px;
    color: white;
    font-size: 20px;
    line-height: 49px;
    background-color: #c150e6;
    margin-top: 45px;
    border-radius: 5px;
    border-bottom: 4px solid #ac2a90;
  }
  .vote:hover {
    background-color: #c770e4;
  }
}
.info {
  margin-top: 50px;
  .avatar {
    img {
      width: 94px;
      height: 94px;
    }
  }
  .name {
    margin-left: 20px;
    margin-bottom: 10px;
  }
  .count {
    margin-left: 20px;
  }
  .tip {
    margin-top: 40px;
    padding-top: 30px;
    padding-left: 10px;
    width: 200px;
    height: 100px;
    border: 1px dashed #999;
  }
}
.middle {
  .leftsheet {
    height: 100%;
    border: 1px solid #e3e3e3;
  }
  .rightcontent {
    background-color: #fff;
    border-radius: 10px;
    width: 99%;
    height: 100%;
    border: 5px solid #e3e3e3;
    ul {
      list-style: none;
      display: block;
      li {
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #09d;
        font: 14px/46px '宋体';
        border-bottom: 1px dashed #999;
        width: 22%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        padding: 5px 14px 10px 0;
      }
    }
    .more {
      clear: both;
      /deep/.el-collapse-item__header {
        color: #09d;
        margin-left: 45%;
      }
    }
  }
}
.vip {
  color: purple;
  font-weight: bolder;
  text-shadow: 0 0 10px azure, 0 0 20px purple;
  filter: saturate(60%);
  animation: flicker 1s linear infinite;
}
.totalpicture {
  color: red;
}
.bottomsheet {
  height: 100%;
  width: 100%;
  margin-top: 20px;
  img {
    width: 100%;
  }
}
.comment {
  clear: both;
  width: 100%;
  background-color: white;
  .commenthead {
    border: 1px solid #cecece;
    border-bottom: 2px solid #534942;
    height: 35px;
    line-height: 35px;
    background: #eee;
    padding-left: 20px;
  }
  .commentlist {
    margin-top: 20px;
    border-top: 1px solid grey;
    .avatar {
      margin-top: 20px;
      margin-left: 20px;

      img {
        border-radius: 50%;
        border: 1px solid #999;
      }
    }
    .name {
      margin-top: 20px;
      color: #379be9;
      span {
        color: black;
      }
    }
    .commentitem {
      margin-top: 20px;
      margin-right: 40px;
    }
  }
}
@keyframes flicker {
  0% {
    color: red;
    filter: saturate(100%) hue-rotate(0deg);
  }
  50% {
    color: white;
    filter: saturate(200%) hue-rotate(20deg);
  }
}
</style>
