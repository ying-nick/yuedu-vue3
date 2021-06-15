<template>
  <div class="container">
    <el-tabs :tab-position="tabPosition" class="el-tabs">
      <el-tab-pane label="完结榜">
        <!-- <div class="container-1"> -->
        <!-- <h1 class="Hwanjiebang">完结榜</h1> -->
        <!-- 分割线 -->
        <!-- <el-divider></el-divider> -->
        <el-table :data="endList" style="width: 100%">
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
        <!-- </div> -->
      </el-tab-pane>
      <!-- --------------------------------------------------------------------- -->
      <el-tab-pane label="好评榜">
        <!-- <h1 class="Hwanjiebang">好评榜</h1> -->
        <!-- 分割线 -->
        <!-- <el-divider></el-divider> -->
        <el-table :data="praiseList" style="width: 100%">
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
        <el-table :data="hotsearchList" style="width: 100%">
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
        <!-- --------------------------------------------------------------------- -->
      </el-tab-pane>
      <el-tab-pane label="排行榜4">排行榜4</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import zgaxios from "@/tools/zgaxios";
import { EndListsUrl, PraiseListsUrl, HotsearchListsUrl } from "@/tools/api";

export default defineComponent({
  setup() {
    const state = reactive({
      endList: [],
      praiseList: [],
      hotsearchList: [],

      tabPosition: "right",
    });
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

    return { ...toRefs(state) };
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
// .Hwanjiebang {
//   margin-left: 0.5rem;
//   padding-top: 0.3rem;
// }
.el-tabs {
  width: 15rem;
  margin: 0 auto;
}
</style>