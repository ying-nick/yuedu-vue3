<template>
  <div class="container">
    <div class="snow"></div>
    <div class="snow"></div>
    <div class="snow"></div>
    <div class="snow"></div>
    <div class="snow"></div>
    <div class="snow"></div>
    <div class="snow"></div>
    <div class="snow"></div>
    <div class="snow"></div>
    <div class="snow"></div>

    <div class="headsheet">
      <el-row>
        <el-col :span="4">
          <div class="name">{{ cartoondata.comic.name }}</div>
        </el-col>
        <el-col :span="4">
          <div class="current">
            本章一共{{ cartoondata.imagelist.length }}页
          </div>
        </el-col>
        <el-col :span="4">
          <div class="chapter">
            {{ $route.params.title }}
          </div>
        </el-col>
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
import { ElMessage } from "element-plus";
export default defineComponent({
  props: ["id", "chapterid", "title"],
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
    let getcomic = async () => {
      let { data } = await zgaxios(
        "GET",
        `/yyq/comic/detail_static_new?comicid=${props.id}`
      );
      console.log(data.data.returnData.comic);
      cartoondata.comic = data.data.returnData.comic;
    };
    getcomic();
    //获取当前章节id
    let getchapterid = () => {
      cartoondata.chapterlist = state.chapterlist;
      cartoondata.chapterid = props.chapterid;
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
      if (cartoondata.start <= 0) {
        ElMessage({
          showClose: true,
          message: "顶到头了-_-|||",
          type: "warning"
        });
        return;
      }
      cartoondata.start--;
    };
    //下一页
    let next = () => {
      if (cartoondata.start >= cartoondata.imagelist.length - 1) {
        ElMessage({
          showClose: true,
          message: "最后一页了哦",
          type: "warning"
        });
        return;
      }
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
  height: auto;
  background: black;
  width: 95%;
  margin: 0 auto;
  filter: drop-shadow(0 0 10px white);
  .snow {
    position: absolute;
    width: 10px;
    height: 10px;
    background: white;
    border-radius: 50%;
  }

  .snow:nth-child(1) {
    opacity: 0.3708;
    transform: translate(76.8951vw, -10px) scale(0.0653);
    animation: fall-1 25s -14s linear infinite;
  }

  @keyframes fall-1 {
    34.91% {
      transform: translate(67.0893vw, 34.91vh) scale(0.0653);
    }
    to {
      transform: translate(71.9922vw, 100vh) scale(0.0653);
    }
  }

  .snow:nth-child(2) {
    opacity: 0.3603;
    transform: translate(29.324vw, -10px) scale(0.102);
    animation: fall-2 15s -26s linear infinite;
  }

  @keyframes fall-2 {
    76.621% {
      transform: translate(22.9122vw, 76.621vh) scale(0.102);
    }
    to {
      transform: translate(26.1181vw, 100vh) scale(0.102);
    }
  }

  .snow:nth-child(3) {
    opacity: 0.3575;
    transform: translate(57.5144vw, -10px) scale(0.9942);
    animation: fall-3 15s -28s linear infinite;
  }

  @keyframes fall-3 {
    68.962% {
      transform: translate(61.933vw, 68.962vh) scale(0.9942);
    }
    to {
      transform: translate(59.7237vw, 100vh) scale(0.9942);
    }
  }

  .snow:nth-child(4) {
    opacity: 0.114;
    transform: translate(13.202vw, -10px) scale(0.1279);
    animation: fall-4 17s -10s linear infinite;
  }

  @keyframes fall-4 {
    63.324% {
      transform: translate(5.9994vw, 63.324vh) scale(0.1279);
    }
    to {
      transform: translate(9.6007vw, 100vh) scale(0.1279);
    }
  }

  .snow:nth-child(5) {
    opacity: 0.9668;
    transform: translate(59.4826vw, -10px) scale(0.5755);
    animation: fall-5 20s -30s linear infinite;
  }

  @keyframes fall-5 {
    72.127% {
      transform: translate(49.8472vw, 72.127vh) scale(0.5755);
    }
    to {
      transform: translate(54.6649vw, 100vh) scale(0.5755);
    }
  }

  .snow:nth-child(6) {
    opacity: 0.9488;
    transform: translate(64.5914vw, -10px) scale(0.5694);
    animation: fall-6 26s -14s linear infinite;
  }

  @keyframes fall-6 {
    57.406% {
      transform: translate(64.5846vw, 57.406vh) scale(0.5694);
    }
    to {
      transform: translate(64.588vw, 100vh) scale(0.5694);
    }
  }

  .snow:nth-child(7) {
    opacity: 0.6348;
    transform: translate(54.098vw, -10px) scale(0.4778);
    animation: fall-7 11s -9s linear infinite;
  }

  @keyframes fall-7 {
    56.89% {
      transform: translate(52.736vw, 56.89vh) scale(0.4778);
    }
    to {
      transform: translate(53.417vw, 100vh) scale(0.4778);
    }
  }

  .snow:nth-child(8) {
    opacity: 0.0692;
    transform: translate(47.1487vw, -10px) scale(0.2109);
    animation: fall-8 26s -4s linear infinite;
  }

  @keyframes fall-8 {
    75.665% {
      transform: translate(45.7391vw, 75.665vh) scale(0.2109);
    }
    to {
      transform: translate(46.4439vw, 100vh) scale(0.2109);
    }
  }

  .snow:nth-child(9) {
    opacity: 0.8748;
    transform: translate(8.6578vw, -10px) scale(0.674);
    animation: fall-9 17s -17s linear infinite;
  }

  @keyframes fall-9 {
    34.745% {
      transform: translate(17.5887vw, 34.745vh) scale(0.674);
    }
    to {
      transform: translate(13.12325vw, 100vh) scale(0.674);
    }
  }

  .snow:nth-child(10) {
    opacity: 0.6427;
    transform: translate(82.5963vw, -10px) scale(0.9339);
    animation: fall-10 20s -10s linear infinite;
  }

  @keyframes fall-10 {
    65.28% {
      transform: translate(72.8646vw, 65.28vh) scale(0.9339);
    }
    to {
      transform: translate(77.73045vw, 100vh) scale(0.9339);
    }
  }
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
.foot {
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
  .chapter {
    color: white;
    width: 100px;
    min-width: 80px;
    font-size: 15px;
    cursor: pointer;
    margin-left: 30%;
  }
}
</style>
