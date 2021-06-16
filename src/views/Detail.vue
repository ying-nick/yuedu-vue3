<template>
  <div class="ca-container">
    <!-- 导航部分 -->
    <div class="ca-up">
      <ul class="list">
        <li class="ca_pd" id="workDirection">
          <span class="tit">作品频道：</span>
           <el-tabs @click="toChoose">
            <el-tab-pane label="男频" name="first" />
            <el-tab-pane label="女频" name="second"/>
           </el-tabs>

        </li>
        <li id="idGirl" class="ca_class">
          <span class="tit">作品分类：</span>
          <!-- <span class="so_girl on" id="girlCategoryList" v-for="(item,index) in bookCategories" :key="index">
            {{item}}
          </span>-->
          <el-tabs v-model="activeName" @tab-click="handleClick" v-if="seen">
            <el-tab-pane label="玄幻小说" name="first"></el-tab-pane>
            <el-tab-pane label="修真小说" name="second"></el-tab-pane>
            <el-tab-pane label="都市小说" name="third"></el-tab-pane>
            <el-tab-pane label="科幻灵异" name="fourth"></el-tab-pane>
            <el-tab-pane label="历史小说" name="fifth"></el-tab-pane>
            <el-tab-pane label="其他小说" name="sixth"></el-tab-pane>
          </el-tabs>
          <el-tabs v-model="activeName" @tab-click="handleClick" v-if="!seen">
            <el-tab-pane label="都市小说" name="first"></el-tab-pane>
            <el-tab-pane label="科幻灵异" name="second"></el-tab-pane>
            <el-tab-pane label="言情小说" name="third"></el-tab-pane>
            <el-tab-pane label="女生小说" name="fourth"></el-tab-pane>
            <el-tab-pane label="其他小说" name="fifth"></el-tab-pane>
          </el-tabs>
        </li>
        <!-- <li class="ca_progress">
          <span class="tit">是否完结：</span>
          <span class="on active">不限</span>
          <span class="on">连载中</span>
          <span class="on">已完结</span>
        </li>-->
        <!-- <li class="ca_words">
          <span class="tit">作品字数：</span>
          <span class="on active">不限</span>
          <span class="on">30万字以下</span>
          <span class="on">30-50万字</span>
          <span class="on">50-100万字</span>
          <span class="on">100万字以上</span>
        </li>
        <li class="ca_update">
          <span class="tit">更新时间：</span>
          <span class="on active">不限</span>
          <span class="on">一月内</span>
        </li>-->
        <!-- <li class="ca_sort">
          <span class="tit">排序方式：</span>
          <span class="on active">不限</span>
          <span class="on">更新时间</span>
          <span class="on">总字数</span>
          <span class="on">点击量</span>
        </li>-->
      </ul>
    </div>
    <!-- 表格部分 -->
    <div class="ca-down">
      <el-table stripe v-loading="loading" :data="bookListTable.slice((currentPage - 1) * pageSize, currentPage*pageSize)" style="width: 100%">
        <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
        <el-table-column prop="categoryName" label="类别" width="150"></el-table-column>
        <el-table-column prop="title" label="书名"></el-table-column>
        <el-table-column prop="desc" label="描述"></el-table-column>
        <el-table-column prop="author" label="作者" width="150"></el-table-column>
        <el-table-column prop="word" label="字数" width="100"></el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="100" @current-change = "toChangePage" :current-page.sync="currentPage"
        :page-size="pageSize"></el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs,ref } from "vue";
import zgaxios from "@/tools/zgaxios";
export default defineComponent({
  name: "category",
  components: {},
  setup(context) {
    const state = reactive({
      bookListTable: [],
      number : 1,
      loading: true,
      activeName: 'first',
      seen: true,
      channelId : 1,
      categoryId:1,
      pageSize : 10,
      currentPage:1,
      
    });
    // let color=ref()
    // let color1=ref()
    // 获取男频分类列表
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

    // 男女频道的点击事件
    const toChoose = (e)=>{
      if(e.target.innerText == '女频'){
        state.number = 2
       
       
      }else{
        state.number = 1
       
      }
    }
  
    // 获取男频第一页小说列表
    const getBookList = async () => {
      let { data } = await zgaxios(
        "GET",
        "http://yuenov.com:15555/app/open/api/book/getCategoryId?pageNum=1&pageSize=15&categoryId=1&channelId=1"
      );
      // console.log(data,"22222222222222222222")
      if (data.result.code == 0) {
        let tempArr = data.data.list
        state.bookListTable = tempArr
        
        state.loading = false
      }
      // console.log(data)
    };
    getBookList();

    // 小说分类的点击事件
    const handleClick = (e)=>{
      console.log(e,"555555555")
    }

    const toChangePage = (e)=>{
      // console.log(11111111111111,e)
       console.log(`当前页: ${e}`);
    }
    
    return { ...toRefs(state),handleClick,toChoose,toChangePage};
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
        &:hover{
          color: #f80;
        }
      }
    }

  }
  .el-tabs{
    margin-left: 90px;
    margin-top: -30px;
  }
  /deep/.el-tabs__active-bar{
    color:#fff;
    background-color:#fff;
  }
  /deep/.el-tabs__item.is-active{
    color: #f80;
  }
  /deep/.el-tabs__nav-wrap::after{
    background-color: #fff;
  }
  /deep/.el-tabs__item:hover{
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


