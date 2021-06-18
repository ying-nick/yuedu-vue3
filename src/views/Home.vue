<template>
  <div class="container">
    <div class="firstCo">
      <el-row :gutter="4">
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <h2 class="h2bang">最热书籍</h2>
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
        <el-col  :span="8">
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
          </div>
                <!-- 加载更多按钮 -->
            <el-button plain class="moreBtn" @click="toRanking"
              >加载更多</el-button
            >
        </el-col>
      </el-row>
    </div>
    <!-- 第二段********************************************************************* -->
    <div class="secondCo">
      <el-row :gutter="4">
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <h2 class="h2bang">人气书籍</h2>
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

          </div>
                      <!-- 加载更多按钮 -->
            <el-button plain class="moreBtn">加载更多</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 第三段********************************************************************* -->
    <div class="thirdCo">
      <h2 class="h2ticket h2bang">大家都在看</h2>

      <el-collapse v-model="activeNames" @change="handleChange" accordion>
        <el-collapse-item
          class="chouti"
          v-for="(item,index) in ticketList"
          :key="item._id"
          :title="item.title"
          :name="index"
        >
         <template #title>
      <i class="iconfont icon-redu"></i>{{item.title}}
    </template>
          <div >
            <img :src="'https://statics.zhuishushenqi.com' + item.cover" />
            <span class="zuozhe">作者：{{ item.author }}</span>
            <span class="minorCate">类型：{{ item.minorCate }}</span>
            <span class="latelyFollower">近期阅读量：{{ item.latelyFollower }}</span>
            <div class="shortIntro">{{ item.shortIntro }}</div>
             <el-button class="clickYuedu" @click="toDetail(item)">点击阅读</el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import zgaxios from "@/tools/zgaxios";
import { ElMessage, ElLoading } from "element-plus";
import { useRouter } from "vue-router";
import { searchUrl, searchUrlYnv, detailUrlYnv } from "@/tools/api";
import { useStore } from "vuex";
import {
  HotListsUrl,
  EndListsUrl,
  PopularityListsUrl,
  PraiseListsUrl,
  TicketListUrl,
} from "@/tools/api";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const { state, getters, dispatch, commit } = useStore();
    const router = useRouter();
    const state1 = reactive({
      hotList: [],
      endList: [],
      popularityList: [],
      praiseList: [],
      ticketList: [],
      activeNames:0
      // firstPraisePic: [],
    });
    //获取点击榜API
    const getHotList = async () => {
      let { data } = await zgaxios("GET", `${HotListsUrl}`);
      state1.hotList = data.ranking.books;
      const sixHotList = [];
      for (var i = 0; i < 6; i++) {
        sixHotList.push(state1.hotList[i]);
      }
      state1.hotList = sixHotList;
    };
    getHotList();

    //获取完结榜API
    const getEndList = async () => {
      let { data } = await zgaxios("GET", `${EndListsUrl}`);
      state1.endList = data.ranking.books;
      const tenEndList = [];
      for (var i = 0; i < 10; i++) {
        tenEndList.push(state1.endList[i]);
      }
      state1.endList = tenEndList;

      //console.log(state1.endList, "xxxxxxxxxxxxxxx");
    };
    getEndList();

    //获取人气榜API
    const getPopularityListsUrlList = async () => {
      let { data } = await zgaxios("GET", `${PopularityListsUrl}`);
      state1.popularityList = data.ranking.books;
      const sixPopularityList = [];
      for (var i = 0; i < 6; i++) {
        sixPopularityList.push(state1.popularityList[i]);
      }
      state1.popularityList = sixPopularityList;
    };
    getPopularityListsUrlList();

    //获取好评榜API
    const getPraiseListsUrlList = async () => {
      let { data } = await zgaxios("GET", `${PraiseListsUrl}`);
      state1.praiseList = data.ranking.books;
      const tenPraiseList = [];
      for (var i = 0; i < 10; i++) {
        tenPraiseList.push(state1.praiseList[i]);
      }
      state1.praiseList = tenPraiseList;
    };
    getPraiseListsUrlList();

    //获取点击榜API
    const getTicketListsUrlList = async () => {
      let { data } = await zgaxios("GET", `${TicketListUrl}`);
      state1.ticketList = data.ranking.books;
      const fiveTicketList = [];
      for (var i = 0; i < 5; i++) {
        fiveTicketList.push(state1.ticketList[i]);
      }
      state1.ticketList = fiveTicketList;
    };
    getTicketListsUrlList();

    let toRanking = () => {
      //加载更多按钮路由跳转
      router.push(`/ranking/`);
    };

    //点击书名跳转书详情
    const toDetail = (item) => {
      // console.log(item.title);

      search(item);
    };
    const errorHandler = () => true;
    const search = async (item) => {
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      try {
        let { data } = await zgaxios("GET", searchUrlYnv, {
          params: {
            keyWord: item.title,
            pageNum: 1,
            pageSize: 100,
          },
        });
        let { result } = data;
        // console.log(result)
        if (result.code == 1009) {
          loading.close();
          ElMessage.error("操作太频繁，请10s后再试");
          return;
        } else if (result.code == 102) {
          loading.close();
          ElMessage.error("错误，该书不存在或已被移除");
          return;
        } else if (result.code == 0) {
          // loading.close()
          let book = data.data;
          let ynv = {
            title: item.title,
            list: book.list,
            size: book.pageSize,
            count: book.total,
            from: book.pageNum,
          };
          // console.log(ynv)
          const id = ynv.list[0].bookId;

          console.log(id, "点击名字所返回的书的bookId");
          commit("getSearchData", ynv);
          console.log(id, 44444444444444);
          setTimeout(async () => {
            let { data } = await zgaxios("GET", detailUrlYnv, {
              params: {
                bookId: id,
              },
            });
            let { result } = data;
            if (result.code == 0) {
              loading.close();
              commit("getBookDetails", data.data);
              let url = `/bookdetails/${data.data.title}`;
              router.push(url);
            } else {
              loading.close();
              throw new Error("无数据");
            }
          }, 10000);
        } else {
          loading.close();
          throw new Error("无数据");
        }
      } catch (error) {
        loading.close();
        // console.log(error)
        ElMessage.error("错误，该书不存在已被移除");
      }
    };

    return {
      ...toRefs(state1),
      toRanking,
      toDetail,
      errorHandler,
      search,
    };
  },
});
</script>

<style lang="less" scoped>
@font-face {
  font-family: "iconfont"; /* Project id 2617959 */
  src: url("//at.alicdn.com/t/font_2617959_gr38gyksm8h.woff2?t=1623979995392")
      format("woff2"),
    url("//at.alicdn.com/t/font_2617959_gr38gyksm8h.woff?t=1623979995392")
      format("woff"),
    url("//at.alicdn.com/t/font_2617959_gr38gyksm8h.ttf?t=1623979995392")
      format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: red;
  margin-left: 0.3rem;
}

.icon-redu:before {
  content: "\e61a";
}

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
  // display: inline-block;
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
  color: #858585;
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


.grid-content {
  position: relative;
}
 .moreBtn {
  width:5rem;
  top: 800px;
 }
.secondCo {
  background-color: white;
  width: 18rem;
  height: 11rem;
  margin: 0 Auto;
  margin-top: 1rem;
}
.thirdCo {
  background-color: white;
  width: 18rem;
  margin: 1rem Auto;
}
.h2ticket {
  padding-top: 0.3rem;
}
/deep/.el-collapse-item__header {
  color: #333;
  font-size: 0.3rem;
  margin-left: 0.3rem;
}

/deep/.el-collapse-item__header:hover {
  color: orange;
  cursor: pointer;
}

.chouti {
  position: relative;
 
}
.zuozhe {
  position: absolute;
  left: 3.6rem;
  font-size: 0.35rem;
}
.minorCate {
  position: absolute;
  left: 3.6rem;
  top: 2rem;
  font-size: 0.28rem;
  color: rgb(172, 172, 172);
}
.latelyFollower {
  position: absolute;
  top: 2.5rem;
  left: 3.6rem;
  font-size: 0.28rem;
  color: rgb(172, 172, 172);
}
.shortIntro {
  position: absolute;
  top: 3.2rem;
  left: 3.6rem;
  font-size: 0.25rem;
  text-indent: 2em;
  color: rgb(172, 172, 172);
}
.clickYuedu{
  position: absolute;
  left: 3.6rem;
  top: 4.8rem;
}

</style>


