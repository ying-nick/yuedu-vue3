<template>
  <div class="container">
    <el-tabs :tab-position="tabPosition" class="el-tabs">
      <el-tab-pane label="完结榜">
        <!-- <div class="container-1"> -->
        <!-- <h1 class="Hwanjiebang">完结榜</h1> -->
        <!-- 分割线 -->
        <!-- <el-divider></el-divider> -->
        <el-table
          :data="endList"
          @row-click="todetail"
          style="width: 100%"
          class="mouseChange"
        >
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
      <el-tab-pane label="好评榜">
        <!-- <h1 class="Hwanjiebang">好评榜</h1> -->
        <!-- 分割线 -->
        <!-- <el-divider></el-divider> -->
        <el-table
          :data="praiseList"
          @row-click="todetail"
          style="width: 100%"
          class="mouseChange"
        >
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
        <el-table
          :data="hotsearchList"
          @row-click="todetail"
          style="width: 100%"
          class="mouseChange"
        >
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
        <el-table
          :data="baiduList"
          @row-click="todetail"
          style="width: 100%"
          class="mouseChange"
        >
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
import { ElMessage, ElLoading } from "element-plus";
import { useRouter } from "vue-router";
import { searchUrl, searchUrlYnv, detailUrlYnv } from "@/tools/api";
import { useStore } from "vuex";
import {
  EndListsUrl,
  PraiseListsUrl,
  HotsearchListsUrl,
  BaiduListsUrl,
} from "@/tools/api";

export default defineComponent({
  setup() {
    const { state, getters, dispatch, commit } = useStore();
    const router = useRouter();
    const state1 = reactive({
      endList: [],
      praiseList: [],
      hotsearchList: [],
      baiduList: [],
      tabPosition: "right",
    });
    //const list = state1.endList

    //获取完结榜API
    const getEndList = async () => {
      let { data } = await zgaxios("GET", `${EndListsUrl}`);
      state1.endList = data.ranking.books;
      //   console.log(state1.endList, 123123123);
    };
    getEndList();

    //获取好评榜API
    const getPraiseListsUrl = async () => {
      let { data } = await zgaxios("GET", `${PraiseListsUrl}`);
      state1.praiseList = data.ranking.books;
    };
    getPraiseListsUrl();

    //获取热搜榜API
    const getHotsearchListsUrl = async () => {
      let { data } = await zgaxios("GET", `${HotsearchListsUrl}`);
      state1.hotsearchList = data.ranking.books;
    };
    getHotsearchListsUrl();

    //获取百度热搜榜API
    const getBaiduListsUrl = async () => {
      let { data } = await zgaxios("GET", `${BaiduListsUrl}`);
      state1.baiduList = data.ranking.books;
    };
    getBaiduListsUrl();

    //跳转书本详情
    const todetail = (endList) => {
      //  console.log("书的id是：",endList._id,"书的名字是：",endList.title)

      search(endList);
    };

    const errorHandler = () => true;
    const search = async (endList) => {
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      try {
        let { data } = await zgaxios("GET", searchUrlYnv, {
          params: {
            keyWord: endList.title,
            pageNum: 1,
            pageSize: 100,
          },
        });
        let { result } = data;
        // console.log(result)
        if (result.code == 1009) {
          loading.close();
          ElMessage.error("操作太频繁，请10s后再试");
          return;
        } else if (result.code == 102) {
          loading.close();
          ElMessage.error("错误，该书不存在或已被移除");
          return;
        } else if (result.code == 0) {
          // loading.close()
          let book = data.data;
          let ynv = {
            title: endList.title,
            list: book.list,
            size: book.pageSize,
            count: book.total,
            from: book.pageNum,
          };
          // console.log(ynv)
          const id = ynv.list[0].bookId;

          console.log(id, "点击名字所返回的书的bookId");
          commit("getSearchData", ynv);

          console.log(id, 555555555555555);
          setTimeout(async () => {
            let { data } = await zgaxios("GET", detailUrlYnv, {
              params: {
                bookId: id,
              },
            });
            let { result } = data;
            if (result.code == 0) {
              loading.close();
              commit("getBookDetails", data.data);
              let url = `/bookdetails/${data.data.title}`;
              router.push(url);
            } else {
              loading.close();
              throw new Error("无数据");
            }
          }, 10000);
        } else {
          loading.close();
          throw new Error("无数据");
        }
      } catch (error) {
        loading.close();
        // console.log(error)
        ElMessage.error("错误，该书不存在已被移除");
      }
    };

    return { ...toRefs(state1), todetail, errorHandler, search };
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
/deep/.el-table_1_column_1 .cell div {
  width: 20px;
  height: 20px;
  background-color: rgb(173, 173, 173);
  color: #fff;
  border-radius: 4px;
  line-height: 20px;
  text-align: center;
}


/deep/.el-table_2_column_5 .cell div {
  width: 20px;
  height: 20px;
  background-color: rgb(173, 173, 173);
  color: #fff;
  border-radius: 4px;
  line-height: 20px;
  text-align: center;
}
/deep/.el-table_3_column_9 .cell div {
  width: 20px;
  height: 20px;
  background-color: rgb(173, 173, 173);
  color: #fff;
  border-radius: 4px;
  line-height: 20px;
  text-align: center;
}
/deep/.el-table_4_column_13 .cell div {
  width: 20px;
  height: 20px;
  background-color: rgb(173, 173, 173);
  color: #fff;
  border-radius: 4px;
  line-height: 20px;
  text-align: center;
}


.mouseChange {
  cursor: pointer;
}
</style>