<template>
  <el-container
    :style="{ background: back.contoiner }"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="目录加载中"
    element-loading-background="rgba(0, 0, 0, 0.85)"
  >
    <el-main>
      <el-dialog title="设置" v-model="dialogVisible" width="25%" top="30vh">
        <div style="margin-bottom: 10px;">
          <el-row>
            <span style="    text-align: center;
    line-height: 40px; margin-right:20px;">背景色：</span>
            <el-button
              icon="el-icon-check"
              :style="{ background: item.color }"
              circle
              v-for="(item, index) in number"
              :key="item"
              @click="getColor(index)"
            ></el-button>
          </el-row>
        </div>
        <el-row class="row">
          <span style="    text-align: center;
    line-height: 40px; margin-right:20px;">文字大小：</span>
          <el-input-number
            v-model="textNumber"
            @change="handleChange"
            :min="10"
            :max="20"
            label="描述文字"
          ></el-input-number>
        </el-row>
        <template #footer></template>
      </el-dialog>
      <div class="content" :style="{ background: back.content }">
        <div class="chapterHead">{{ chapterHead }}</div>
        <div class="main">
          <p
            v-for="item in content"
            :key="item"
            class="text"
            :style="{ fontSize: textSize.size }"
          >&nbsp; &nbsp; &nbsp; &nbsp;{{ item }}</p>
        </div>
        <div class="footer">
          <div class="btnDIv">
            <el-button
              class="btn"
              @click="upper"
              native-type="button"
              :style="{ background: back.content }"
            >上一章</el-button>
            <el-button
              class="btn"
              @click="gotoContent"
              native-type="button"
              :style="{ background: back.content }"
            >目录</el-button>
            <el-button
              class="btn"
              @click="lower"
              native-type="button"
              :style="{ background: back.content }"
            >下一章</el-button>
          </div>
        </div>
        <div class="backtop" :style="{ left: sum+'px',top:middheight+'px'}">
          <div class="top1" @click="gotoCont">
            <span class="el-icon-s-order ic"></span>
            <div>目录</div>
          </div>
          <div class="top1" @click="gotobook">
            <span class="el-icon-s-management ic"></span>
            <div>书架</div>
          </div>
          <div class="top1" @click="dialogVisible = true">
            <span class="el-icon-s-tools ic"></span>
            <div>设置</div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import zgaxios from "../tools/zgaxios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getList } from "../tools/api";
import { ElMessage, ElLoading } from "element-plus";
export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const { state, commit } = useStore();
    let fullscreenLoading = ref(true);
    // console.log(state.chapterId)
    let text = reactive({
      bookId: state.bookDetails.bookId,
      chapterIdList: [state.chapterId]
    });
    let chapterList = ref(state.chapter);
    let content = ref("");
    let chapterHead = ref("暂无内容");
    const getText = async () => {
      let result = await zgaxios("POST", getList, text);
      console.log(result);

      if (result.data.result.code == 0) {
        content.value = result.data.data.list[0].content.split("\n");
        chapterHead.value = result.data.data.list[0].name;
        fullscreenLoading.value = false;
      } else {
        fullscreenLoading.value = false;
        ElMessage.error("服务器出错，请稍候刷新网页");
      }
    };
    getText();
    let chapterItem = ref("");
    function upper() {
      chapterList.value.findIndex(item => {
        if (item.id == state.chapterId) {
          let lenght = chapterList.value.indexOf(item);
          if (lenght == 0 || lenght == chapterList.value.length) {
            ElMessage.error("没有更多内容了");
            return item;
          } else {
            store.commit("pushChapterId", chapterList.value[lenght - 1].id);
            location.reload();
            return item;
          }
        }
      });
    }
    function gotoContent() {
      router.push("/content");
    }
    function lower() {
      chapterList.value.findIndex(item => {
        if (item.id == state.chapterId) {
          let lenght = chapterList.value.indexOf(item);
          // console.log(lenght);
          if (lenght == 0 || lenght == chapterList.value.length - 1) {
            ElMessage.error("没有更多内容了");
            return item;
          } else {
            store.commit("pushChapterId", chapterList.value[lenght + 1].id);
            location.reload();
            return item;
          }
        }
      });
    }
    function gotoCont() {
      router.push("/content");
    }
    let number = reactive([
      {
        color: "#F9F6ED",
        contoiner: "#EAE5D8",
        content: "#F4F1EA"
      },
      {
        color: "#E3EFE2",
        contoiner: "#CDDEC9",
        content: "#E1EBDF"
      },
      {
        color: "#F9D9D9",
        contoiner: "#EAD4D4",
        content: "#F2E5E5"
      },
      {
        color: "#EFDEBD",
        contoiner: "#DECEA3",
        content: "#EBE2C8"
      },
      {
        color: "#EEEEEE",
        contoiner: "#D3D3D3",
        content: "#E5E5E5"
      }
    ]);
    let back = reactive({
      color: "",
      contoiner: "",
      content: ""
    });
    let classObj = reactive({
      red: false,
      green: false,
      black: false
    });
    let num = ref(1);
    let dialogVisible = ref(false);
    function getColor(length) {
      let obj = number.filter(item => {
        return number.indexOf(item) == length;
      });
      back.color = obj[0].color;
      back.contoiner = obj[0].contoiner;
      back.content = obj[0].content;
    }
    let textNumber = ref(16);
    let textSize = reactive({
      size: ""
    });
    function handleChange() {
      textSize.size = textNumber.value + "px";
    }
    let all = window.screen.width;
    let middle = all - (all * 0.45 + 140);
    let sum = middle / 2 - 100;

    let allheight = window.screen.availHeight;
    let middheight = allheight / 2 - 100;
    return {
      content,
      fullscreenLoading,
      chapterHead,
      upper,
      gotoContent,
      lower,
      gotoCont,
      classObj,
      dialogVisible,
      number,
      getColor,
      back,
      textNumber,
      handleChange,
      textSize,
      sum,
      middheight
    };
  }
});
</script>
<style scoped lang="less">
.content {
  width: 45%;
  margin: auto;
  background: white;
  padding: 20px 70px 70px 70px;
  .chapterHead {
    margin: auto;
    height: 50px;
    font-size: 26px;
    text-align: center;
  }
  .main {
    .text {
      font-size: 16px;
      margin: 30px 0px;
    }
  }
  .backtop {
    position: fixed;

    .top1 {
      width: 60px;
      height: 60px;
      border: solid 1px gray;
      margin-top: 5px;
      cursor: pointer;
      /deep/ .ic {
        font-size: 25px;
        margin-left: 17px;
        margin-top: 10px;
      }
      div {
        text-align: center;
      }
    }
  }
}
.footer {
  .btnDIv {
    width: 450px;
    margin: auto;
    /deep/.btn {
      margin: 0px 30px;
    }
  }
}
</style>