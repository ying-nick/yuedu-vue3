<template>
  <div class="ca-container">
    <!-- 导航部分 -->
    <div class="ca-up">
      <ul class="list">
        <li class="ca_pd" id="workDirection">
          <span class="tit">作品频道：</span>
          <span class="on active" @click="toChoose">男频</span>
          <span class="on" @click="toChoose">女频</span>
        </li>
        <li id="idGirl" class="ca_class">
          <span class="tit">作品分类：</span>
          <span class="so_girl" id="girlCategoryList"></span>
          <span class="so_boy" id="boyCategoryList"></span>
        </li>
        <!-- <li class="ca_progress">
          <span class="tit">是否完结：</span>
          <span class="on active">不限</span>
          <span class="on">连载中</span>
          <span class="on">已完结</span>
        </li> -->
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
        </li> -->
        <!-- <li class="ca_sort">
          <span class="tit">排序方式：</span>
          <span class="on active">不限</span>
          <span class="on">更新时间</span>
          <span class="on">总字数</span>
          <span class="on">点击量</span>
        </li> -->
      </ul>
    </div>
    <!-- 表格部分 -->
    <div class="ca-down">
      <el-table border stripe :data="bookListTable" style="width: 100%">
        <el-table-column prop="no" label="序号" width="80"></el-table-column>
        <el-table-column prop="category" label="类别" width="150"></el-table-column>
        <el-table-column prop="bookName" label="书名"></el-table-column>
        <el-table-column prop="newest" label="最新章节"></el-table-column>
        <el-table-column prop="artist" label="作者" width="150"></el-table-column>
        <el-table-column prop="count" label="字数" width="100"></el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import zgaxios from "@/tools/zgaxios";
export default defineComponent({
  name: "Category",
  components: {},
  setup() {
    const state = reactive({
      bookListTable: []
    });
    const getDefaultTable = async () => {
      let {data} = await zgaxios("GET","http://yuenov.com:15555/app/open/api/category/getCategoryChannel");
      console.log(data,"11111111111111")
      if(data.result.code==0){
         let bookCategoriesArr = data.channels[0].categories
         console.log(bookCategoriesArr,"222222222222")

      }
    };
    getDefaultTable();
    const toChoose = e => {
      console.log(e);
    };
    return { ...toRefs(state), toChoose };
  }
});
</script>
<style lang="less" scoped>
.ca-container {
  width: 1020px;
  margin: 0 260px;
  color: #333;
  .ca-up {
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
      margin: 30px 300px;
    }
  }
  .active{
    color: #f80;
  }
}

</style>
