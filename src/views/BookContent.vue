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
            <a class="blac">{{ list.fictionType }}</a>
            <a class="gra">状态：</a>
            <a class="blac">{{ list.title }}</a>
            <a class="gra">字数：</a>
            <a class="blac">{{
              count.length > 1000 ? "10万以上" : "10万以下"
            }}</a>
          </div>
        </div>
        <div class="Countfoot">正文({{ count.length + 1 }})</div>
        <el-row :gutter="20">
          <el-col :span="8" v-for="item in count" :key="item" class="flow">
            <div class="grid-content bg-purple now" id="now">
              {{ item.title }}
              <span style="color:red">[免费]</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="footer">
       <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>
<script lang='ts'>
import { defineComponent, toRefs, ref, reactive } from "vue";
import { detailUrl, detailList } from "../tools/api";
import zgaxios from "../tools/zgaxios";
export default defineComponent({
  setup(props, context) {
    const text: any = reactive({
      list: [],
      count: []
    });
    const getList = async () => {
      let { data } = await zgaxios("GET", `${detailUrl}斗罗大陆`);
      // console.log(data.data.data[0].fictionId);
      if (data.code == 0) {
        text.list = data.data.data[0];
        // console.log(text.list.fictionId);
      }
    };
    getList();
    const getcatalogue = async () => {
      // console.log(text.list.fictionId);
      let { data } = await zgaxios("GET", `${detailList}11710`);
      // console.log(data);
      if (data.code == 0) {
        text.count = data.data.data;
        console.log(data.data.data);
      }
    };
    getcatalogue();
    return {
      ...toRefs(text)
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