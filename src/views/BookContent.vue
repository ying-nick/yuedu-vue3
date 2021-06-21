<template>
  <el-container v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="目录加载中" element-loading-background="rgba(0, 0, 0, 0.85)">
    <el-main>
      <div class="content">
        <div class="CountHead">
          <h1>{{ list.title }}</h1>
          <div class="Countmain">
            <a class="gra">作者：</a>
            <a class="blac">{{ list.author }}</a>
            <a class="gra">类别：</a>
            <a class="blac">{{ categoryName }}</a>
            <a class="gra">状态：</a>
            <a class="blac">{{ staduce }}</a>
            <a class="gra">字数：</a>
            <a class="blac">{{
              list.word 
            }}</a>
          </div>
        </div>
        <div class="Countfoot">正文({{ totalList.length + 1 }})</div>
        <el-row :gutter="20">
          <el-col :span="8" v-for="item in count" :key="item" class="flow">
            <div class="grid-content bg-purple now" id="now" @click="goToChap(item.id)">
              {{ item.name }}
              <span style="color:red">[免费]</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="footer">
        <el-pagination layout="prev, pager, next" :total="totalList.length" page-size="100" hide-on-single-page @current-change="sizechange"></el-pagination>
      </div>
    </el-main>
  </el-container>
</template>
<script lang='ts'>
import Pagination from '../components/Pagination/index.vue'
import { defineComponent, toRefs, ref, reactive, computed } from 'vue'
import { detailUrl, detailList } from '../tools/api'
import { useStore } from 'vuex'
import zgaxios from '../tools/zgaxios'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
var JSONbigString = require('json-bigint')({ storeAsString: true })
export default defineComponent({
  setup(props, context) {
    const store = useStore()
    const { state, commit } = useStore()
    let fullscreenLoading = ref(true)
    const router = useRouter()
    const text: any = reactive({
      list: [],
      count: [], //根据page来获取
      totalList: [], //总数据
      categoryName: state.bookDetails.categoryName, //类名
      chapterStatus: state.bookDetails.update.chapterStatus, //书本的状态
      bookId: state.bookDetails.bookId,
    })
    const staduce = computed(() => {
      return text.chapterStatus == 'END' ? '完本' : '连载'
    })
    const getcatalogue = async () => {
      let { data } = await axios(
        `http://yuenov.com/app/open/api/chapter/getByBookId?bookId=${text.bookId}`,
        {
          // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
          transformResponse: [
            function (data) {
              // 对 data 进行任意转换处理
              return JSONbigString.parse(data)
            },
          ],
        }
      )
      if (data.result.code == 0) {
        text.list = data.data
        text.totalList = data.data.chapters
        text.count = text.totalList.slice(0, 99)
        fullscreenLoading.value = false
        addList()
      } else if (data.result.code == 1009) {
        fullscreenLoading.value = false
        ElMessage.error('请稍候重新加载页面')
      }
    }
    getcatalogue()
    function addList() {
      store.commit('pushList', text.totalList)
    }
    const sizechange = function (page) {
      let first = (page - 1) * 99
      let last = page * 99y
      text.count = text.totalList.slice(first, last)
    }
    function goToChap(id) {
      store.commit('pushChapterId', id)
      router.push('/chapter')
    }
    return {
      ...toRefs(text),
      sizechange,
      staduce,
      fullscreenLoading,
      goToChap,
    }
  },
})
</script>
<style scoped lang="less">
.footer {
  text-align: center;
}
.content {
  margin: auto;
  width: 50%;
  background: white;
  padding: 20px 60px 60px 60px;
  .Countfoot {
    padding-left: 6px;
    font-size: 16px;
    background: #f9f9f9;
    height: 40px;
    line-height: 40px;
    font-weight: normal;
    margin: 0 0 5px;
    border-radius: 3px;
  }
  .CountHead {
    .Countmain {
      height: 30px;
      text-align: center;
      .gra {
        color: #999;
        margin-left: 50px;
        font-size: 15px;
        text-decoration: none;
      }
      .blac {
        font-size: 15px;
        color: #333;
        text-decoration: none;
      }
    }
    h1 {
      font-size: 30px;
      text-align: center;
    }
  }
  .flow {
    border-bottom: 1px dotted #ddd;
    padding: 10px;
    .now {
      width: 100%;
      margin: 10px;
      font-size: 14px;
      text-decoration: none;
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>