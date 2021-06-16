<template>
  <div class="container">
    <div class="firstCo">
      <el-row :gutter="4">
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <h2 class="h2bang">最热榜</h2>
            <!-- 分割线 ---------------------------- -->
            <el-divider></el-divider>
            <div v-for="item in hotList" :key="item._id">
              <div class="everyHotList">
                <img
                  class="hotListPics"
                  :src="'https://statics.zhuishushenqi.com' + item.cover"
                  alt=""
                />
                <!-- 书名 点击跳转书详情 -->
                <span class="a1 mouseOrange" @click="toDetail(item)">{{
                  item.title
                }}</span>
                <!-- 作者名字 -->
                <span class="sp1">作者：{{ item.author }}</span>
                <!-- 简介 -->
                <div class="jianjie">
                  <p>{{ item.shortIntro }}</p>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <!-- 完结榜部分 -->
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <h2 class="wanjiebang h2bang">完结榜</h2>
            <!-- 分割线 -->
            <el-divider></el-divider>
            <div v-for="(item, index) in endList" :key="item._id">
              <div class="everyEndList mouseOrange" @click="toDetail(item)">
                <i class="endListNum">{{
                  index + 1 > 9 ? index + 1 : index + 1
                }}</i>
                {{ item.title }}
              </div>
            </div>
            <!-- 加载更多按钮 -->
            <el-button plain class="moreBtn" @click="toRanking"
              >加载更多</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 第二段********************************************************************* -->
    <div class="secondCo">
      <el-row :gutter="4">
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <h2 class="h2bang">人气榜</h2>
            <!-- 分割线 -->
            <el-divider></el-divider>
            <div v-for="item in popularityList" :key="item._id">
              <div class="everyHotList">
                <img
                  class="hotListPics"
                  :src="'https://statics.zhuishushenqi.com' + item.cover"
                  alt=""
                />
                <!-- 书名 点击跳转书详情 -->
                <span class="a1 mouseOrange" @click="toDetail(item)">{{
                  item.title
                }}</span>
                <!-- 作者名字 -->
                <span class="sp1">作者：{{ item.author }}</span>
                <!-- 简介 -->
                <div class="jianjie">
                  <p>{{ item.shortIntro }}</p>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <!-- 完结榜部分 -->
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <h2 class="h2bang">好评榜</h2>
            <!-- 分割线 -->
            <el-divider></el-divider>

            <div v-for="(item, index) in praiseList" :key="item._id">
              <div class="everyEndList mouseOrange" @click="toDetail(item)">
                <i class="endListNum">{{
                  index + 1 > 9 ? index + 1 : index + 1
                }}</i>
                {{ item.title }}
              </div>
            </div>
            <!-- 加载更多按钮 -->
            <el-button plain class="moreBtn">加载更多</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- <div v-for="item in firstPraisePic" :key="item._id">
      <img
        class="hotListPics"
        :src="'https://statics.zhuishushenqi.com' + item.cover"
        alt=""
      />
    </div> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import zgaxios from "@/tools/zgaxios";
import { useRouter } from "vue-router";
import {
  HotListsUrl,
  EndListsUrl,
  PopularityListsUrl,
  PraiseListsUrl,
} from "@/tools/api";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const router = useRouter();
    const state = reactive({
      hotList: [],
      endList: [],
      popularityList: [],
      praiseList: [],
      // firstPraisePic: [],
    });
    //获取点击榜API
    const getHotList = async () => {
      let { data } = await zgaxios("GET", `${HotListsUrl}`);
      state.hotList = data.ranking.books;
      const sixHotList = [];
      for (var i = 0; i < 6; i++) {
        sixHotList.push(state.hotList[i]);
      }
      state.hotList = sixHotList;
    };
    getHotList();

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

    //获取人气榜API
    const getPopularityListsUrlList = async () => {
      let { data } = await zgaxios("GET", `${PopularityListsUrl}`);
      state.popularityList = data.ranking.books;
      const sixPopularityList = [];
      for (var i = 0; i < 6; i++) {
        sixPopularityList.push(state.popularityList[i]);
      }
      state.popularityList = sixPopularityList;
    };
    getPopularityListsUrlList();

    //获取好评榜API
    const getPraiseListsUrlList = async () => {
      let { data } = await zgaxios("GET", `${PraiseListsUrl}`);
      state.praiseList = data.ranking.books;
      const tenPraiseList = [];
      for (var i = 0; i < 10; i++) {
        tenPraiseList.push(state.praiseList[i]);
      }
      state.praiseList = tenPraiseList;
      //为了获取第一张图片
      //   const firstPraisePic = [];
      //   for (var i = 0; i < 1; i++) {
      //     firstPraisePic.push(state.praiseList[i]);
      //     state.firstPraisePic = firstPraisePic;
      //   }
    };
    getPraiseListsUrlList();

    let toRanking = () => {
      //加载更多按钮路由跳转
      router.push(`/ranking/`);
    };

    //点击书名跳转书详情
    const toDetail = (item) => {
      console.log(item.title);
    };

    return { ...toRefs(state), toRanking, toDetail };
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
.h2bang {
  font-size: 0.6rem;
  font-weight: 600;
  margin-left: 0.2rem;
  margin-top: 0.3rem;
}

.everyHotList {
  width: 5rem;
  height: 3rem;
  display: inline-block;
  float: left;
  margin: 0 0.4rem;
  position: relative;
}
.a1 {
  text-decoration: none;
  color: #333;
  font-size: 0.3rem;
  position: absolute;
  margin-left: 0.2rem;
}
.sp1 {
  color: #a6a6a6;
  font-size: 0.2rem;
  position: absolute;
  margin-left: 0.2rem;
  margin-top: 0.5rem;
}

.jianjie {
  text-indent: 2em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  overflow: hidden;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;

  position: absolute;
  width: 2rem;
  left: 2.2rem;
  top: 1rem;
}

.hotListPics {
  width: 2rem;
  height: 2.4rem;
}

.endListNum {
  font-size: 0.3rem;
}
.everyEndList {
  display: inline-block;
  margin-left: 0.2rem;
  font-size: 0.3rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}
.mouseOrange:hover {
  color: orange;
  cursor: pointer;
}
.moreBtn {
  width: 5rem;
  margin: 0 center;
}
.secondCo {
  background-color: white;
  width: 18rem;
  height: 11rem;
  margin: 0 Auto;
  margin-top: 1rem;
}
</style>


