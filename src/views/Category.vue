<template>
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
          <!-- <span class="so_girl on" v-for="(item,index) in bookCategories" :key="index">
            {{item}}
          </span>-->
          <el-tabs v-model="activeName" @tab-click="handleClickForMale" v-if="seen">
            <el-tab-pane label="玄幻小说" name="first"></el-tab-pane>
            <el-tab-pane label="修真小说" name="second"></el-tab-pane>
            <el-tab-pane label="都市小说" name="third"></el-tab-pane>
            <el-tab-pane label="科幻灵异" name="fourth"></el-tab-pane>
            <el-tab-pane label="历史小说" name="fifth"></el-tab-pane>
            <el-tab-pane label="其他小说" name="sixth"></el-tab-pane>
          </el-tabs>
          <el-tabs v-model="activeName" @tab-click="handleClickForFemale" v-if="!seen">
            <el-tab-pane label="都市小说" name="first"></el-tab-pane>
            <el-tab-pane label="科幻灵异" name="second"></el-tab-pane>
            <el-tab-pane label="言情小说" name="third"></el-tab-pane>
            <el-tab-pane label="女生小说" name="fourth"></el-tab-pane>
            <el-tab-pane label="其他小说" name="fifth"></el-tab-pane>
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
        <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
        <el-table-column prop="categoryName" label="类别" width="150"></el-table-column>
        <el-table-column prop="title" label="书名" width="180"></el-table-column>
        <el-table-column prop="desc" label="描述"></el-table-column>
        <el-table-column prop="author" label="作者" width="150"></el-table-column>
        <el-table-column prop="word" label="字数" width="100"></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="100"
        @current-change="toChangePage"
        :current-page.sync="currentPage"
        :page-size="pageSize"
      ></el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import zgaxios from "@/tools/zgaxios";
export default defineComponent({
  name: "category",
  components: {},
  setup(context) {
    const state = reactive({
      bookListTable: [],
      defaultName: "male",
      loading: true,
      activeName: "first",
      seen: true,
      channelId: 1,
      categoryId: 1,
      pageSize: 10,
      currentPage: 1
    });
    // 获取男频小说分类列表
    // const getDefaultTable = async () => {
    //   let { data } = await zgaxios(
    //     "GET",
    //     "http://yuenov.com:15555/app/open/api/category/getCategoryChannel"
    //   );
    //   // console.log(data,"11111111111111")
    //   if (data.result.code == 0) {
    //     let bookCategoriesArr = data.data.channels[0].categories;
    //     //  console.log("222222222222",bookCategoriesArr)
    //     let bookCategoriesTitle = bookCategoriesArr.map(item => {
    //       if (item.categoryName) {
    //         return item.categoryName;
    //       }
    //     });
    //     state.bookCategories = bookCategoriesTitle;
    //   }
    // };
    // getDefaultTable();

    // 封装获取第一页小说列表的函数
    const getBookList = async url => {
      let { data } = await zgaxios("GET", url);
      // console.log(data,"22222222222222222222")
      // let bookListTable :any= [];
      if (data.result.code == 0) {
        // bookListTable = [...state.bookListTable,...data.data.list]
        state.bookListTable = data.data.list;
        state.loading = false;
      }
    };
    // 调用函数获取默认列表
    getBookList(
      "http://yuenov.com:15555/app/open/api/book/getCategoryId?pageNum=1&pageSize=10&categoryId=1&channelId=1"
    );

    // 男女频道切换的点击事件
    const toChoose = (tab, e) => {
      if (e.target.innerText == "男频") {
        state.seen = true;
        getBookList(
          "http://yuenov.com:15555/app/open/api/book/getCategoryId?pageNum=1&pageSize=10&categoryId=1&channelId=1"
        );
        // console.log(state.bookListTable, 222222222222);
      } else if (e.target.innerText == "女频") {
        state.seen = false;
        getBookList(
          "http://yuenov.com:15555/app/open/api/book/getCategoryId?pageNum=1&pageSize=10&categoryId=3&channelId=2"
        );
      }
    };

    // 小说分类的点击事件(男频)
    const handleClickForMale = (tab, e) => {
      // console.log(e, "555555555");
      if (e.target.innerText == "修真小说") {
        getBookList(
          "http://yuenov.com:15555/app/open/api/book/getCategoryId?pageNum=1&pageSize=10&categoryId=2&channelId=1"
        );
      } else if (e.target.innerText == "都市小说") {
        getBookList(
          "http://yuenov.com:15555/app/open/api/book/getCategoryId?pageNum=1&pageSize=10&categoryId=3&channelId=1"
        );
      } else if (e.target.innerText == "网游小说") {
        getBookList(
          "http://yuenov.com:15555/app/open/api/book/getCategoryId?pageNum=1&pageSize=10&categoryId=5&channelId=1"
        );
      } else if (e.target.innerText == "科幻灵异") {
        getBookList(
          "http://yuenov.com:15555/app/open/api/book/getCategoryId?pageNum=1&pageSize=10&categoryId=6&channelId=1"
        );
      } else if (e.target.innerText == "历史小说") {
        getBookList(
          "http://yuenov.com:15555/app/open/api/book/getCategoryId?pageNum=1&pageSize=10&categoryId=7&channelId=1"
        );
      } else if (e.target.innerText == "其他小说") {
        getBookList(
          "http://yuenov.com:15555/app/open/api/book/getCategoryId?pageNum=1&pageSize=10&categoryId=9&channelId=1"
        );
      } else {
        getBookList(
          "http://yuenov.com:15555/app/open/api/book/getCategoryId?pageNum=1&pageSize=10&categoryId=1&channelId=1"
        );
      }
    };
    // 女频
    const handleClickForFemale = (tab, e) => {
      if (e.target.innerText == "科幻灵异") {
        getBookList(
          "http://yuenov.com:15555/app/open/api/book/getCategoryId?pageNum=1&pageSize=10&categoryId=6&channelId=2"
        );
      } else if (e.target.innerText == "言情小说") {
        getBookList(
          "http://yuenov.com:15555/app/open/api/book/getCategoryId?pageNum=1&pageSize=10&categoryId=8&channelId=2"
        );
      } else if (e.target.innerText == "其他小说") {
        getBookList(
          "http://yuenov.com:15555/app/open/api/book/getCategoryId?pageNum=1&pageSize=10&categoryId=9&channelId=2"
        );
      } else if (e.target.innerText == "女生小说") {
        getBookList(
          "http://yuenov.com:15555/app/open/api/book/getCategoryId?pageNum=1&pageSize=10&categoryId=10&channelId=2"
        );
      } else {
        getBookList(
          "http://yuenov.com:15555/app/open/api/book/getCategoryId?pageNum=1&pageSize=10&categoryId=3&channelId=2"
        );
      }
    };

    // 分页
    const toChangePage = e => {
      console.log(`当前页: ${e}`);
      // getBookList(
      //   `http://yuenov.com:15555/app/open/api/book/getCategoryId?pageNum=${e}&pageSize=10&categoryId=1&channelId=1`
      // );
    };

    // 点击跳转阅读页
    const handleCurrentChange = (row, column)=>{
      console.log(row,"--------",column, "xxxxxxxxxxxxx")
      
    }

    return {
      ...toRefs(state),
      handleClickForMale,
      toChoose,
      toChangePage,
      handleClickForFemale,
      handleCurrentChange
    };
  }
});
</script>
<style lang="less" scoped>
.ca-container {
  width: 1500px;
  margin: 0 200px;
  color: #333;
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
        // &:hover{
        //   color: #f80;
        // }
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
    /deep/.el-pagination.is-background {
      margin: 30px 500px;
    }
  }
  .active {
    color: #f80;
  }
}
</style>
