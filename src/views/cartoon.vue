<template>
  <div>
    <div class="cartooncontainer">
      <el-row>
        <el-col :span="6" style="height:1000px;">
          <div class="leftnav">
            <ul>
              <li v-for="item in cartoondata.menuItemList" :key="item">
                {{ item }}
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="18" style="height:1700px;">
          <div class="rightcontent">
            <div class="search">
              <el-input
                placeholder="请输入漫画名，关键字"
                v-model="cartoondata.input"
              >
                <template #append>
                  <el-button icon="el-icon-search"></el-button>
                </template>
              </el-input>
            </div>
            <div class="cartoonlist">
              <ul>
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

                  <div class="type">{{ item.tags }}</div>
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
            :total="19150"
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
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
     const router = useRouter();
    let cartoondata = reactive({
      menuItemList: ['全部','搞笑','魔幻','生活','恋爱','动作','科幻','战争','体育','推理','惊奇','同人'],
      input: "",
      cartoonlist: [],
      pageSize:30,
      currentPage: 1,
      page: 1
    });
    
    let getlist = async () => {
      let { data } = await zgaxios(
        "GET",
        `/yyq/list/conditionScreenlists?v=5300100&page=${cartoondata.page}`
      );
      cartoondata.cartoonlist = data.data.returnData.comics;
      console.log(data);
    };
    getlist();
    let handleCurrentChange = val => {
      cartoondata.page=val,
      getlist();
    };
    let todetail=(id)=>{
        router.push(`/cartoon/detail/${id}`)
    }
    return { getlist, reactive, cartoondata, handleCurrentChange,todetail };
  }
});
</script>

<style lang="less" scoped>
.cartooncontainer {
  width: 80%;
  height: 1700px;
  min-width: 1050px;
  background-color: #fff;
  margin: 20px auto;
}
.leftnav {
  width: 90%;
  height: 100%;
  max-width:296px ;
  border: 1px solid #f80;
  display: flex;
  flex-wrap: wrap;
  ul {
    list-style: none;
    display: block;
    li {
      float: left;
      height: 32px;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
      padding: 0 14px;
      margin: 0 3px 3px 0;
    }
  }
}
.rightcontent {
  width: 100%;
  height: 100%;
//   margin-right: 200px;
  border: 1px solid #f80;
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
  height: 720px;
//   margin-left: 10px;
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
      position: relative;
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
  bottom: 50px;
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
