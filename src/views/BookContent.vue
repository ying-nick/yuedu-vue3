<template>
  <el-container>
    <el-main>
      <div class="head">
        悦读 > {{ list.fictionType }} > {{ list.title }} > 作品目录
      </div>
      <div class="content">
        <div class="CountHead">
          <h1>{{ list.title }}</h1>
          <div class="Countmain">
            <a class="gra">作者：</a>
            <a class="blac">{{ list.author }}</a>
            <a class="gra">类别：</a>
            <a class="blac">{{ list.categoryName }}</a>
            <a class="gra">状态：</a>
            <a class="blac">{{ list.title }}</a>
            <a class="gra">字数：</a>
            <a class="blac">{{
              list.word 
            }}</a>
          </div>
        </div>
        <div class="Countfoot">正文({{ totalList.length + 1 }})</div>
        <el-row :gutter="20">
          <el-col :span="8" v-for="item in count" :key="item" class="flow">
            <div class="grid-content bg-purple now" id="now">
              {{ item.name }}
              <span style="color:red">[免费]</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="footer">
        <el-pagination
          layout="prev, pager, next"
          :total="totalList.length"
          page-size="100"
          hide-on-single-page
          @current-change="sizechange"
        ></el-pagination>
      </div>
    </el-main>
  </el-container>
</template>
<script lang='ts'>
import Pagination from "../components/Pagination/index.vue";
import { defineComponent, toRefs, ref, reactive } from "vue";
import { detailUrl, detailList } from "../tools/api";
import zgaxios from "../tools/zgaxios";
export default defineComponent({
  setup(props, context) {
    const text: any = reactive({
      list: [],
      count: [],//根据page来获取
      totalList:[]//总数据
    });
    // const getList = async () => {
    //   let {data} = await zgaxios("GET", `${detailUrl}?keyWord=斗罗大陆&pageNum=1&pageSize=1`);
    //   console.log(data.result);
    //   if (data.result.code == 0) {
    //     text.list = data.data.list[0]
        
    //     console.log(text.list);
    //   }
    // };
    // getList();
    const getcatalogue = async () => {
      let { data } = await zgaxios("GET", `${detailList}?bookId=35707`);
      // console.log(data.data);
      if (data.result.code == 0) {
        text.list = data.data
        text.totalList = data.data.chapters;
        text.count = text.totalList.slice(0,99)
      }
    };
    getcatalogue();
    const sizechange = function(page) {
      console.log(page);
      let first = (page-1)*100
      let last = page*100
      text.count = text.totalList.slice(first,last)
    };

    return {
      ...toRefs(text),
      sizechange,
    };
  }
});
</script>
<style scoped lang="less">
.head {
  margin: auto;
  width: 53%;
  margin-bottom: 16px;
}
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