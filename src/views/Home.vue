<template>
  <div class="container">
    <div class="firstCo">
      <el-row :gutter="4">
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <h2 class="dianjibang">最热榜</h2>
            <!-- 分割线 -->
            <el-divider></el-divider>
            <div class="hotLists" v-for="item in clickList" :key="item._id">
              <div class="everyHotList">
                <img
                  class="hotListPics"
                  :src="'https://statics.zhuishushenqi.com'+item.cover"
                  alt=""
                />
                <!-- 书名 点击跳转书详情 -->
               <a class="a1"  href="">{{ item.title }}</a> 
                <!-- 作者名字 -->
               <span class="sp1">作者：{{item.author}}</span>
          <!-- 简介 -->
            <!-- <div class="jianjie">
               <span class="sp2">{{item.shortIntro}}</span>
            </div> -->
              </div>
            </div>
          </div>
        </el-col>
        <!-- 完结榜部分 -->
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <h2 class="wanjiebang">完结榜</h2>
            <!-- 分割线 -->
            <el-divider></el-divider>
            <div class="hotLists" v-for="(item,index) in endList" :key="item._id">
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
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import zgaxios from "@/tools/zgaxios";
 import { HotListsUrl, EndListsUrl } from "@/tools/api";

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
    const getHotList = async () => {
      let { data } = await zgaxios("GET", `${HotListsUrl}`);
      state.clickList = data.ranking.books;
      const sixClickList = [];
      for (var i = 0; i < 6; i++) {
        sixClickList.push(state.clickList[i]);
      }
      state.clickList = sixClickList;

      console.log(state.clickList);
      console.log(sixClickList);
    };
    getHotList();

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
.hotLists {
  padding: center;
}
.everyHotList {
  width: 5rem;
  height: 3rem;
  display: inline-block;
  float: left;
  margin: 0 0.4rem;
  position: relative;
}
.a1{
  text-decoration:none;
  color: #333;
  font-size: 0.3rem;
  position: absolute;
  margin-left: 0.2rem;
}
.sp1{
  color:#a6a6a6;
  font-size: 0.2rem;
  position: absolute;
  margin-left: 0.2rem;
  margin-top:0.5rem;
}
.jianjie{
 position: absolute;
 width: 2rem;
 height: 2rem;
 left: 2.6rem;
 top: 1rem;
}
.sp2{
//  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  // -webkit-box-orient: vertical;

}
.hotListPics {
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


