<template>
  <el-container
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="目录加载中"
    element-loading-background="rgba(0, 0, 0, 0.85)"
  >
    <el-main>
      <div class="content">
        <div class="chapterHead">{{ chapterHead }}</div>
        <div class="main">
          <p v-for="item in content" :key="item" class="text">
            &nbsp; &nbsp; &nbsp; &nbsp;{{ item }}
          </p>
        </div>
        <div class="footer">
          <div class="btnDIv">
            <el-button class="btn" @click="upper" native-type="button"
              >上一章</el-button
            >
            <el-button class="btn" @click="gotoContent" native-type="button"
              >目录</el-button
            >
            <el-button class="btn" @click="lower" native-type="button"
              >下一章</el-button
            >
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
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
      console.log(result)
      
       if (result.data.result.code == 0) {
        content.value = result.data.data.list[0].content.split("\n");
        chapterHead.value = result.data.data.list[0].name;
        fullscreenLoading.value = false;
      }else{
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
    return {
      content,
      fullscreenLoading,
      chapterHead,
      upper,
      gotoContent,
      lower
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