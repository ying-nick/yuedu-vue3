<template>
  <div class="container">
    <div class="firstCo">
      <el-row :gutter="4">
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <span>点击榜</span>
            <!-- 分割线 -->
            <el-divider></el-divider>
            <div v-for="item in clickList"  :key="item._id">{{item.title}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>哈哈</span>
            <!-- 分割线 -->
            <el-divider></el-divider>
            <span>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive ,toRefs} from "vue";
import zgaxios from "@/tools/zgaxios";
import { ClickListsUrl } from "@/tools/api";



export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const state = reactive({
     clickList:[]

    });
    const getClickList = async () => {
      let { data } = await zgaxios("GET", `${ClickListsUrl}`);
         
          state.clickList = data.ranking.books
          console.log(state.clickList);
      
      // console.log(data.ranking.books);
    };
     
    getClickList();

    
    return { ...toRefs(state)  };
  },
    
      
});
</script>

<style lang="less" scoped>
.firstCo {
  background-color: white;
  width: 18rem;
  height: 10rem;
  margin: 0 Auto;
}
</style>
