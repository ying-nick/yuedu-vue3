<template>
  <div class="fl">
    <div class="ca-container">
      <!-- 导航部分 -->
      <div class="ca-up">
        <ul class="list">
          <li class="ca_pd" id="workDirection">
            <span class="tit">作品频道：</span>
            <!-- <span class="on"  :style="{color:(number==1?'#f80':'#303133')}" @click="toChoose">男频</span>
            <span class="on" :style="{color:(number==2?'#f80':'#303133')}" @click="toChoose">女频</span>-->
            <el-tabs v-model="defaultName" @tab-click="toChoose">
              <el-tab-pane label="男频" name="male"></el-tab-pane>
              <el-tab-pane label="女频" name="female"></el-tab-pane>
            </el-tabs>
          </li>
          <li class="ca_class">
            <span class="tit">作品分类：</span>
            <!-- <span class="on" v-for="(item,index) in MaleBookCategories" :key="index">
            {{item}}
            </span>-->
            <el-tabs v-model="activeName" v-show="seen" @tab-click="getMaleCategoryList">
              <el-tab-pane
                :label="item.categoryName"
                :name="index==0?'first':''"
                v-for="(item,index) in MaleBookCategories"
                :key="item"
              ></el-tab-pane>
            </el-tabs>
            <el-tabs v-model="activeName" v-show="!seen" @tab-click="getFemaleCategoryList">
              <el-tab-pane
                :label="item.categoryName"
                :name="index==0?'first':''"
                v-for="(item,index) in FemaleBookCategories"
                :key="item"
              ></el-tab-pane>
            </el-tabs>
          </li>
        </ul>
      </div>
      <!-- 表格部分 -->
      <div class="ca-down">
        <el-table
          stripe
          v-loading="loading"
          :data="bookListTable.slice((currentPage - 1) * pageSize, currentPage*pageSize)"
          style="width: 100%"
          @row-click="handleCurrentChange"
        >
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="categoryName" label="类别" width="120"></el-table-column>
          <el-table-column prop="title" label="书名" width="220"></el-table-column>
          <el-table-column prop="desc" label="描述"></el-table-column>
          <el-table-column prop="author" label="作者" width="150"></el-table-column>
          <el-table-column prop="word" label="字数" width="120"></el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :key="elementui_page_component_key"
          :total="total"
          @current-change="toChangePage"
          :current-page="currentPage"
          :page-size="pageSize"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import zgaxios from "@/tools/zgaxios";
import { ElMessage } from "element-plus";
import router from "../router";
import { useStore } from "vuex";

export default defineComponent({
  name: "category",
  components: {},
  setup() {
    const { getters, dispatch, commit } = useStore();
    const state = reactive({
      bookListTable: [],
      defaultName: "male",
      loading: true,
      activeName: "first",
      seen: true,
      pageSize: 10,
      currentPage: 1,
      bookCategoryM: 1,
      bookCategoryF: 3,
      total: 10,
      elementui_page_component_key: 1,
      MaleBookCategories: [
        { categoryId: 1, categoryName: "玄幻小说" },
        { categoryId: 2, categoryName: "修真小说" },
        { categoryId: 3, categoryName: "都市小说" },
        { categoryId: 5, categoryName: "网游小说" },
        { categoryId: 6, categoryName: "科幻灵异" },
        { categoryId: 7, categoryName: "历史小说" },
        { categoryId: 9, categoryName: "其他小说" }
      ],
      FemaleBookCategories: [
        { categoryId: 3, categoryName: "都市小说" },
        { categoryId: 6, categoryName: "科幻灵异" },
        { categoryId: 8, categoryName: "言情小说" },
        { categoryId: 9, categoryName: "其他小说" },
        { categoryId: 10, categoryName: "女生小说" }
      ]
    });
    // 获取男频小说分类列表
    // const getMaleDefaultTable = async () => {
    //   let { data } = await zgaxios(
    //     "GET",
    //     "http://yuenov.com:15555/app/open/api/category/getCategoryChannel"
    //   );
    //   console.log(data, "11111111111111");
    //   if (data.result.code == 0) {
    //     state.MaleBookCategories = data.data.channels[0].categories;
    //     state.FemaleBookCategories = data.data.channels[1].categories;
    //     console.log("222222222222",state.FemaleBookCategories)
    //     //     let bookCategoriesTitle = bookCategoriesArr.map(item => {
    //     //       if (item.categoryName) {
    //     //         return item.categoryName;
    //     //       }
    //     //     });
    //     //     state.bookCategories = bookCategoriesTitle;
    //   }
    // };
    // getMaleDefaultTable();

    // 强制刷新分页组件
    function autoIncrasePageComKey() {
      state.elementui_page_component_key++;
      // console.log(state.elementui_page_component_key)
    }

    // 封装获取第一页小说列表的函数
    const getBookList = async url => {
      state.bookListTable = [];
      let { data } = await zgaxios("GET", url);
      // console.log(data,"22222222222222222222")
      // let bookListTable :any= [];
      if (data.result.code == 0) {
        // bookListTable = [...state.bookListTable,...data.data.list]
        // console.log(1111111)
        state.bookListTable = data.data.list;
        state.loading = false;
        state.total = data.data.total;
      } else if (data.result.code == 1009) {
        state.loading = false;
        ElMessage.error("操作频繁，请10s后再试");
      }
    };
    // 调用函数获取默认列表
    getBookList(
      "/ynv/app/open/api/book/getCategoryId?pageNum=1&pageSize=10&categoryId=1&channelId=1"
    );

    // 男女频道切换的点击事件
    const toChoose = (tab, e) => {
      if (e.target.innerText == "男频") {
        state.seen = true;
        getBookList(
          "/ynv/app/open/api/book/getCategoryId?pageNum=1&pageSize=10&categoryId=1&channelId=1"
        );
        autoIncrasePageComKey();
        // console.log(state.bookListTable, 222222222222);
      } else if (e.target.innerText == "女频") {
        // state.currentPage = 1
        state.seen = false;
        getBookList(
          "/ynv/app/open/api/book/getCategoryId?pageNum=1&pageSize=10&categoryId=3&channelId=2"
        );
        autoIncrasePageComKey();
      }
    };

    // 男频小说分类列表的点击事件
    function getMaleCategoryList(event) {
      autoIncrasePageComKey();
      // console.log(event.index)
      let bookCategoryM = state.MaleBookCategories.filter(item => {
        return state.MaleBookCategories.indexOf(item) == event.index;
      });
      // console.log(bookCategoryM);
      state.bookCategoryM = bookCategoryM[0].categoryId;
      getBookList(
        `/ynv/app/open/api/book/getCategoryId?pageNum=1&pageSize=10&categoryId=${state.bookCategoryM}&channelId=1`
      );
    }
    // 女频小说的分类列表的点击事件
    const getFemaleCategoryList = e => {
      autoIncrasePageComKey();
      let bookCategoryF = state.FemaleBookCategories.filter(item => {
        return state.FemaleBookCategories.indexOf(item) == e.index;
      });
      // console.log(bookCategoryF);
      state.bookCategoryF = bookCategoryF[0].categoryId;
      getBookList(
        `/ynv/app/open/api/book/getCategoryId?pageNum=1&pageSize=10&categoryId=${state.bookCategoryF}&channelId=2`
      );
    };

    // 分页
    const toChangePage = e => {
      // console.log(`当前页: ${e}`);
      if (state.seen) {
        setTimeout(() => {
          getBookList(
            `/ynv/app/open/api/book/getCategoryId?pageNum=${e}&pageSize=10&categoryId=${state.bookCategoryM}&channelId=1`
          );
        }, 10000);
      } else {
        setTimeout(() => {
          getBookList(
            `/ynv/app/open/api/book/getCategoryId?pageNum=${e}&pageSize=10&categoryId=${state.bookCategoryF}&channelId=2`
          );
        }, 10000);
      }
    };

    // 点击跳转详情页
    const handleCurrentChange = async (row, column) => {
      // console.log(row.bookId, row.title);
      let { data } = await zgaxios(
        "GET",
        `/ynv/app/open/api/book/getDetail?bookId=${row.bookId}`
      );
      // console.log(data.data, 2222222);
      if (data.result.code == 1009) {
        state.loading = false;
        ElMessage.error("操作频繁，请10s后再试");
        return;
      }
      data.result.code == 0 &&
        data.data !== undefined &&
        commit("getBookDetails", data.data);
      router.push(`/bookdetails/${row.title}`);
    };

    return {
      ...toRefs(state),
      getMaleCategoryList,
      toChoose,
      toChangePage,
      getFemaleCategoryList,
      handleCurrentChange,
      autoIncrasePageComKey
    };
  }
});
</script>
<style lang="less" scoped>
.fl {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .ca-container {
    width: 90%;
    color: #333;
    display: flex;
    flex-direction: column;
    .ca-up {
      margin-top: 20px;
      font-size: 14px;
      background: #fff;
      border-radius: 6px;
      padding: 20px;
      margin-bottom: 20px;
      .list li {
        list-style-type: none;
        height: 21px;
        line-height: 21px;
        padding-bottom: 20px;
        .tit {
          color: #999;
          margin-right: 20px;
        }
        .on {
          cursor: pointer;
          margin-right: 30px;
        }
      }
    }
    .el-tabs {
      margin-left: 90px;
      margin-top: -30px;
    }
    /deep/.el-tabs__active-bar {
      color: #fff;
      background-color: #fff;
    }
    /deep/.el-tabs__item.is-active {
      color: #f80;
    }
    /deep/.el-tabs__nav-wrap::after {
      background-color: #fff;
    }
    /deep/.el-tabs__item:hover {
      color: #f80;
    }
    .ca-down {
      font-size: 14px;
      background: #fff;
      border-radius: 6px;
      padding: 20px;
      /deep/.el-table__body .el-table_1_column_1 .cell div {
        width: 20px;
        height: 20px;
        background-color: rgb(151, 150, 150);
        color: #fff;
        border-radius: 4px;
        line-height: 20px;
        text-align: center;
      }
      /deep/.el-table__body .cell:hover {
        color: #f80;
        cursor: pointer;
      }
      /deep/.el-pagination.is-background .el-pager li:not(.disabled):hover {
        color: #f80;
      }
      /deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #f80;
        color: #fff;
      }
      /deep/.number {
        font-weight: 500;
        font-size: 3px;
        border-radius: 3px;
      }
      .el-pagination {
        text-align: center;
        margin-top: 20px;
      }
    }
    .active {
      color: #f80;
    }
  }
}
</style>
