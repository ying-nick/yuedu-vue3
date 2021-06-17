<template>
  <div>
    <div class="cartooncontainer">
      <el-row>
        <el-col :span="18" class="rightcontent">
          <div >
            <div class="search">
              <el-input
                placeholder="请输入漫画名，关键字"
                v-model="cartoondata.input"
              >
                <template #append>
                  <el-button
                    icon="el-icon-search"
                    @click="searchcartoon"
                  ></el-button>
                </template>
              </el-input>
            </div>
            <div class="cartoonlist">
              <ul
                v-loading="cartoondata.loading"
                element-loading-text="别急哦,我超快的！"
                element-loading-spinner="el-icon-loading"
              >
               <el-button v-if="null" :plain="true" @click="warn"></el-button>
                <li
                  v-for="item in cartoondata.cartoonlist.slice(
                    (cartoondata.currentPage - 1) * cartoondata.pageSize,
                    cartoondata.currentPage * cartoondata.pageSize
                  )"
                  :key="item.comic_id"
                >
                  <div class="todetail" @click="todetail(item.comic_id)">
                    <img :src="item.cover" alt="" />
                    <div class="name">{{ item.name }}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <el-pagination
            class="page"
            v-if="cartoondata.cartoonlist.length"
            background
            @current-change="handleCurrentChange"
            :current-page="cartoondata.currentPage"
            :page-size="cartoondata.pageSize"
            :total="cartoondata.total"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import zgaxios from "@/tools/zgaxios";
import { useStore } from "vuex";
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const { commit, state, dispatch } = useStore();
    let cartoondata = reactive({
      input: "",
      cartoonlist: [],
      pageSize: 30,
      currentPage: 1,
      page: 1,
      searlist: [],
      loading: true,
      total:19150
    });
    var list: any = [];
    let  warn=()=>{
          ElMessage.error('没找到哦！');
    }
    //获取全部漫画列表
    let getlist = async () => {
      cartoondata.total=19150
      let { data } = await zgaxios(
        "GET",
        `/yyq/list/conditionScreenlists?v=5300100&page=${cartoondata.page}`
      );
      cartoondata.cartoonlist = data.data.returnData.comics;
      cartoondata.loading = false;
    };
    getlist();
    //  搜索漫画
    let searchcartoon = async () => {
      cartoondata.loading = true;
      if (!cartoondata.input) {
        cartoondata.loading = false;
        getlist();
      }
      cartoondata.cartoonlist = [];
      list = [];
      let { data } = await zgaxios(
        "GET",
        `/yyq/search/relative?inputText=${cartoondata.input}`
      );
      if (data.data.message != "未找到") {
        data.data.returnData.map((item) => {
          cartoondata.searlist = item.comic_id;
          getcartoondetail(item.comic_id).then(() => {
            setTimeout(() => {
              cartoondata.cartoonlist = list;
              cartoondata.total=list.length
              cartoondata.loading = false;
            }, 1000);
          });
        });
      } else {
        warn()
      }
    };
    //获取搜索漫画详情
    let getcartoondetail = async id => {
      let { data } = await zgaxios(
        "GET",
        `/yyq/comic/detail_static_new?comicid=${id}`
      );
      list.push(data.data.returnData.comic);
    };

    let handleCurrentChange = val => {
      cartoondata.page = val;
      getlist();
    };
    let todetail = async id => {
     
     
      router.push(`/cartoon/detail/${id}`);
    };
    return {
      warn,
      list,
      getcartoondetail,
      searchcartoon,
      getlist,
      reactive,
      cartoondata,
      handleCurrentChange,
      todetail
    };
  }
});
</script>

<style lang="less" scoped>
.cartooncontainer {
  width:100%;
  height: 1700px;
  min-width: 1050px;
  margin: 20px auto;
}
.rightcontent {
  width: 95%;
  height: auto;
  background-color: #fff;
   margin: 20px auto;
   position: relative;
 
}
.search {
  text-align: center;
}
.el-input-group {
  padding-top: 20px;
  padding-bottom: 10px;
  width: 50%;
}
/deep/.el-input-group > .el-input__inner {
  border-color: #f80;
  border-radius: 20px 0 0 20px;
}
/deep/.el-button {
  background-color: #f80;
}
.el-input-group__append button.el-button {
  border-radius: 0 20px 20px 0;
  background-color: #f80;
}
/deep/.el-input-group__append,
.el-input-group__prepend {
  border: white;
  color: white;
}
.cartoonlist {
  width: 100%;
  height: 100%;
  margin-right: 25px;
  ul {
    list-style: none;
    display: block;
    

    li {
      float: left;
      width: 15%;
      height: 200px;
      line-height: 200px;
      text-align: center;
      cursor: pointer;
      padding: 0 14px 100px 0;
      
      .todetail {
        position: relative;
        img {
          width: 100%;
          height: 200px;
          border-radius: 10px;
        }
        .name {
          position: absolute;
          bottom: 160px;
          white-space: nowrap;
          height: 20px;
          font-size: 15px;
          font-weight: bolder;
        }
      }

      .type {
        position: absolute;
        bottom: 150px;
        height: 20px;
      }
    }
  }
}
.page {
  position: absolute;
  bottom: 10px;
}
/deep/.el-tabs__item.is-active {
  color: #f80;
}
/deep/.el-tabs__active-bar {
  background-color: #f80;
}
/deep/.el-tabs__item:hover {
  color: #f80;
}
/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #f80;
}
/deep/.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: white;
  background-color: #f80;
}
</style>
