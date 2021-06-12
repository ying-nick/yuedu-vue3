<template>
  <div class="searchcontainer">
    <div class="searchlists">
      <div class="bookdtl" v-for="item in  list" :key="item.bookId">
        <el-card shadow="hover" class="bookcard" :body-style="{ padding: '0px',  backgroundColor: '#fff',
        border: 'none',
        width: '100%',
        height: '150px',
        display: 'flex',
        justifyContent: 'space-between',
        'align-items': 'center' }">
          <div class="bookimg">
            <img :src="'http://pt.yuenov.com:18888'+item.coverImg" alt="图片丢失" style="width:102px;height:136px;cursor: pointer;"
              @click="bookdetail(item.bookId)">
          </div>
          <div class="bookcenter">
            <h3 @click="bookdetail(item.bookId)">{{item.title}}</h3>
            <div>{{item.desc}}</div>
            <p>{{item.author}}</p>
          </div>
          <div class="bookright">
            <div>
              <p>{{words(item.word)}}</p>
              <div><span>{{item.categoryName}}</span>
                <el-divider direction="vertical"></el-divider>
                <span>{{staduce(item.chapterStatus)}}</span>
              </div>
            </div>
            <el-row style="width:100%" :gutter="10">
              <el-col :span="12">
                <el-button type="danger" style="width:90%" @click="bookdetail(item.bookId)">书籍详情</el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="success" style="width:90%">加入书架</el-button>
              </el-col>

            </el-row>
          </div>
        </el-card>
      </div>
      <div class="pages">
        <el-pagination background layout="prev, pager, next" :total="count" @current-change="handleCurrentChange">
        </el-pagination>
      </div>

    </div>
  </div>

</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const { state, getters, dispatch, commit } = useStore()
    let list = state.searchData.list
    let lists = reactive({
      list: booklist(list),
      title: state.searchData.title,
      size: state.searchData.size,
      count: state.searchData.count,
      from: state.searchData.from,
    })
    function booklist(arr, start = 0, end = 9) {
      return arr.filter((item, index) => {
        return start <= index && index <= end
      })
    }
    //计算属性
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
    //页码切换
    function handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      let start = (val - 1) * 10
      let end = start + 9
      lists.list = booklist(list, start, end)
    }
    function bookdetail(id) {
      console.log(id)
    }
    return { ...toRefs(lists), staduce, words, handleCurrentChange, bookdetail }
  },
})
</script>
<style lang="less" scope>
.searchcontainer {
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .searchlists {
    // padding: 10px;
    width: 90%;
    .bookdtl {
      height: 170px;
      // background-color: red;
      width: 100%;
      border-bottom: 1px solid #cccc;
      display: flex;
      justify-content: center;
      align-items: center;
      .bookcard {
        width: 96%;
        height: 150px;
        .bookimg {
          width: 120px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .bookcenter {
          padding-left: 20px;
          height: 130px;
          flex: 3;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          h3:hover {
            color: #f80;
            cursor: pointer;
          }
          div {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            overflow: hidden;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            width: 95%;
          }
        }
        .bookright {
          height: 130px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }
    }
    .pages {
      width: 100%;
      height: 105px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>