<template>
  <div class="container">
    <el-tabs :tab-position="tabPosition" class="el-tabs" >
      <el-tab-pane label="完结榜" >
        <!-- <div class="container-1"> -->
        <!-- <h1 class="Hwanjiebang">完结榜</h1> -->
        <!-- 分割线 -->
        <!-- <el-divider></el-divider> -->




     <el-table :data="endList"  @row-click="todetail" style="width: 100%" class="mouseChange">
          <el-table-column
            label="排名"
            width="80"
            type="index"
            :index="indexMethod"
          ></el-table-column>
          <el-table-column
            label="类别"
            width="100"
            prop="majorCate"
          ></el-table-column>
          <el-table-column label="书名" width="280" prop="title">
          </el-table-column>
          <el-table-column label="作者" prop="author"> </el-table-column>
        </el-table>


<!-- 
<div class="block">
  <el-pagination background layout="prev, pager, next" :total="count" @current-change="handleCurrentChange">
  </el-pagination>
</div> -->
  
      </el-tab-pane>
      <!-- --------------------------------------------------------------------- -->
      <el-tab-pane label="好评榜">
        <!-- <h1 class="Hwanjiebang">好评榜</h1> -->
        <!-- 分割线 -->
        <!-- <el-divider></el-divider> -->
        <el-table :data="praiseList" @row-click="todetail" style="width: 100%" class="mouseChange">
          <el-table-column
            label="排名"
            width="80"
            type="index"
            :index="indexMethod"
          ></el-table-column>
          <el-table-column
            label="类别"
            width="100"
            prop="majorCate"
          ></el-table-column>
          <el-table-column label="书名" width="280" prop="title">
          </el-table-column>
          <el-table-column label="作者" prop="author"> </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- --------------------------------------------------------------------- -->
      <el-tab-pane label="热搜榜">
        <!-- <h1 class="Hwanjiebang">热搜榜</h1> -->
        <!-- 分割线 -->
        <!-- <el-divider></el-divider> -->
        <el-table :data="hotsearchList" @row-click="todetail" style="width: 100%" class="mouseChange">
          <el-table-column
            label="排名"
            width="80"
            type="index"
            :index="indexMethod"
          ></el-table-column>
          <el-table-column
            label="类别"
            width="100"
            prop="majorCate"
          ></el-table-column>
          <el-table-column label="书名" width="280" prop="title">
          </el-table-column>
          <el-table-column label="作者" prop="author"> </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- --------------------------------------------------------------------- -->
      <el-tab-pane label="百度榜">
        <el-table :data="baiduList" @row-click="todetail" style="width: 100%" class="mouseChange">
          <el-table-column
            label="排名"
            width="80"
            type="index"
            :index="indexMethod"
          ></el-table-column>
          <el-table-column
            label="类别"
            width="100"
            prop="majorCate"
          ></el-table-column>
          <el-table-column label="书名" width="280" prop="title">
          </el-table-column>
          <el-table-column label="作者" prop="author"> </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import zgaxios from "@/tools/zgaxios";
import {
  EndListsUrl,
  PraiseListsUrl,
  HotsearchListsUrl,
  BaiduListsUrl,
} from "@/tools/api";

export default defineComponent({
  setup() {

 

    const state = reactive({
      endList: [],
      praiseList: [],
      hotsearchList: [],
      baiduList: [],
      tabPosition: "right",
    });
    // const list = state.endList

    //获取完结榜API
    const getEndList = async () => {
      let { data } = await zgaxios("GET", `${EndListsUrl}`);
      state.endList = data.ranking.books;
      //   console.log(state.endList, 123123123);
    };
    getEndList();

    //获取好评榜API
    const getPraiseListsUrl = async () => {
      let { data } = await zgaxios("GET", `${PraiseListsUrl}`);
      state.praiseList = data.ranking.books;
    };
    getPraiseListsUrl();

    //获取热搜榜API
    const getHotsearchListsUrl = async () => {
      let { data } = await zgaxios("GET", `${HotsearchListsUrl}`);
      state.hotsearchList = data.ranking.books;
    };
    getHotsearchListsUrl();

    //获取百度热搜榜API
    const getBaiduListsUrl = async () => {
      let { data } = await zgaxios("GET", `${BaiduListsUrl}`);
      state.baiduList = data.ranking.books;
    };
    getBaiduListsUrl();

    //跳转书本详情
    const todetail=(endList)=>{ 
       console.log("书的id是：",endList._id,"书的名字是：",endList.title)
    }
    //页码切换
function booklist(arr, start = 0, end = 9) {
      return arr.filter((item, index) => {
        return start <= index && index <= end
      })
    }

    function handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      let start = (val - 1) * 10
      let end = start + 9
      state.endList = booklist(list, start, end)
    }
 
    return { ...toRefs(state) ,todetail};

  },

});
</script>

<style lang="less" scoped>
.container {
  background-color: #f5f5f5;
  position: relative;
}
.container-ranking {
  background-color: white;
  width: 4rem;
  height: 5.8rem;
  display: inline-block;
  position: absolute;
  margin-top: 0.8rem;
  left: 17.5rem;
}
.container-1 {
  background-color: white;
  width: 10rem;
  margin-left: 6.5rem;
  display: inline-block;
  position: absolute;
  margin-top: 0.8rem;
}

.el-tabs {
  width: 15rem;
  margin: 0 auto;
 }

.mouseChange{
   cursor:pointer;
}
</style>