<template>
  <div class="container">
    <div class="firstCo">
      <el-row :gutter="4">
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <h2 class="dianjibang">点击榜</h2>
            <!-- 分割线 -->
            <el-divider></el-divider>
            <div class="clickLists" v-for="item in clickList" :key="item._id">
              <div class="everyClickList">
                <img
                  class="clickListPics"
                  src="https://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1521972%2F1521972_8b0f07ab3f0e4021b3f8281d2274fa1c.jpg%2F"
                  alt=""
                />
                {{ item.title }}
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <h2 class="wanjiebang">完结榜</h2>
            <!-- 分割线 -->
            <el-divider></el-divider>
            <div class="clickLists" v-for="(item,index) in endList" :key="item._id">
              <i class="endListNum">{{ index+1>9?index+1:(index+1)}}</i>
              <div class="everyEndList">
                {{ item.title }}
              </div>
            </div>
              <!-- 加载更多按钮 -->
               <el-button plain  class="moreBtn">加载更多</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div></div>

    <div>
      <button @click="btn">跳转</button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import zgaxios from "@/tools/zgaxios";
import { ClickListsUrl, EndListsUrl } from "@/tools/api";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const state = reactive({
      clickList: [],
      endList: [],
      // clickListPic：
    });
    //获取点击榜API
    const getClickList = async () => {
      let { data } = await zgaxios("GET", `${ClickListsUrl}`);
      state.clickList = data.ranking.books;
      const sixClickList = [];
      for (var i = 0; i < 6; i++) {
        sixClickList.push(state.clickList[i]);
      }
      state.clickList = sixClickList;

      console.log(state.clickList);
      console.log(sixClickList);
    };
    getClickList();

    //   const getClickListPic = async () => {
    //   let { data } = await zgaxios("GET", `${ClickListsPicUrl}/${}`);
    //   state.clickListPic = data
    //  //console.log(state.clickListPic);

    // };
    // getClickListPic();

    //获取完结榜API
    const getEndList = async () => {
      let { data } = await zgaxios("GET", `${EndListsUrl}`);
      state.endList = data.ranking.books;
      const tenEndList = [];
      for (var i = 0; i < 10; i++) {
        tenEndList.push(state.endList[i]);
      }
      state.endList = tenEndList;

      console.log(state.endList, "xxxxxxxxxxxxxxx");
    };
    getEndList();

    return { ...toRefs(state) };
  },
});
</script>

<style lang="less" scoped>
.container {
  background-color: #f5f5f5;
}
.firstCo {
  background-color: white;
  width: 18rem;
  height: 11rem;
  margin: 0 Auto;
}
.dianjibang {
  font-size: 0.6rem;
  font-weight: 600;
  margin-left: 0.2rem;
  margin-top: 0.3rem;
}
.wanjiebang {
  font-size: 0.6rem;
  font-weight: 600;
  margin-left: 0.2rem;
  margin-top: 0.3rem;
}
.clickLists {
  padding: center;
}
.everyClickList {
  width: 5rem;
  height: 3rem;
  display: inline-block;
  float: left;
  margin: 0 0.4rem;
}
.clickListPics {
  width: 2rem;
  height: 2.4rem;
}

.endListNum{
 font-size: 0.3rem;
}
.everyEndList{
  display: inline-block;
  margin-left: 0.2rem;
  font-size: 0.3rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}
.moreBtn{
  width: 5rem;
  margin: 0 center;
}
</style>


