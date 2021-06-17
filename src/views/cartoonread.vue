<template>
  <div class="container">
    <div class="headsheet">
      <el-row>
        <el-col :span="4">
          <div class="name">{{ cartoondata.comic.name }}</div>
        </el-col>
        <el-col :span="4">
          <div class="current">
            本章一共{{cartoondata.imagelist.length}}页
          </div>
        </el-col>
        <el-col :span="4">
          <div class="chapter">
            {{$route.params.title}}
          </div>
        </el-col>
        <!-- <el-col :span="3">
          <div class="author">{{ cartoondata.comic.author.name}}</div>
        </el-col> -->
        <el-col :span="12">
          <el-row>
            <el-col :span="10">
              <div class="line">阅读顺序：从左至右</div>
            </el-col>
            <el-col :span="5">
              <div class="up" @click="pre">上一页</div>
            </el-col>
            <el-col :span="4">
              <div class="chapter">当前第{{ cartoondata.start + 1 }}页</div>
            </el-col>
            <el-col :span="5">
              <div class="down" @click="next">下一页</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div
      class="backpicture"
      v-for="item in cartoondata.imagelist.slice(
        cartoondata.start,
        cartoondata.start + 1
      )"
      :key="item"
    >
      <img :src="item.img50" alt="" />
      <div class="foot">
        <el-row>
          <el-col :span="8">
            <div class="up" @click="pre">上一页</div>
          </el-col>
          <el-col :span="8">
            <div class="chapter">当前第{{ cartoondata.start + 1 }}页</div>
          </el-col>
          <el-col :span="8">
            <div class="down" @click="next">下一页</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import zgaxios from "@/tools/zgaxios";
import { useStore } from "vuex";
export default defineComponent({
  props: ["id","chapterid",'title'],
  setup(props) {
    const { state } = useStore();
    let cartoondata = reactive({
      chapterid: "",
      index: 0,
      imagelist: [],
      start: 0,
      chapterlist: "",
      comic: "",
      pageSize: 1,
      currentPage: 1
    });

    //获取当前漫画
    let getcomic = async() => {
        let { data } = await zgaxios(
        "GET",
        `/yyq/comic/detail_static_new?comicid=${props.id}`
      );
      console.log(data.data.returnData.comic)
      cartoondata.comic = data.data.returnData.comic;
    };
    getcomic();
    //获取当前章节id
    let getchapterid = () => {
      cartoondata.chapterlist = state.chapterlist;
      cartoondata.chapterid = props.chapterid
    };
    getchapterid();
    //获取漫画
    let getcartoon = async () => {
      let { data } = await zgaxios(
        "GET",
        `/yyq/comic/chapterNew?chapter_id=${cartoondata.chapterid}`
      );
      cartoondata.imagelist = data.data.returnData.image_list;
    };

    //上一页
    getcartoon();
    let pre = () => {
      if (cartoondata.start <= 0) return;
      cartoondata.start--;
    };
    //下一页
    let next = () => {
      if (cartoondata.start >= cartoondata.imagelist.length - 1) return;
      cartoondata.start++;
    };

    return {
      getcartoon,
      reactive,
      cartoondata,
      getchapterid,
      next,
      pre,
      getcomic
    };
  }
});
</script>

<style lang="less" scoped>
.container {
  width: 95%;
  min-width: 50%;
  height: auto;
  margin: 0 auto;
  background-color: #1e1e1e;
}
.headsheet {
  width: 100%;
  margin: 0 auto;
  height: 100px;
  line-height: 100px;
  color: white;
  text-align: center;
  .name {
    font-size: 30px;
    min-width: 100px;
    margin-left: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .chapter {
    font-size: 15px;
    width: 100px;
    white-space: nowrap;
    text-overflow: ellipsis;
    min-width: 80px;
    overflow: hidden;
    color: #aaa59c;
  }
  .author {
    color: #a0a0a0;
    min-width: 100px;
  }
  .line {
    color: #a0a0a0;
    min-width: 200px;
  }
  .up {
    color: white;
    width: 100px;
    min-width: 80px;
    font-size: 15px;
    cursor: pointer;
  }
  .down {
    color: white;
    width: 100px;
    min-width: 80px;
    font-size: 15px;
    cursor: pointer;
  }
}
.backpicture {
  width: 800px;
  height: 1422px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 95%;
  }
}
.foot{
    width: 100%;
    margin-top: 20px;
   .up {
    color: white;
    width: 100px;
    min-width: 80px;
    font-size: 15px;
    cursor: pointer;
   
  }
  .down {
    color: white;
    width: 100px;
    min-width: 80px;
    font-size: 15px;
    cursor: pointer;
     margin-left: 200px;
  }
  .chapter{
    color: white;
    width: 100px;
    min-width: 80px;
    font-size: 15px;
    cursor: pointer;
    margin-left:30%;
  }
}
</style>
