<template>
  <div class="container">
    <div class="form">
      <el-tabs :tab-position="data.tabPosition" style="height: 500px;">
        <el-tab-pane label="个人中心">
          <div class="peersonal">
            <div class="avatar">
              <el-avatar :size="60">
                <img
                  :src="
                    data.avatar
                      ? data.avatar
                      : 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
                  "
                />
              </el-avatar>
            </div>
            <div class="nickname">主人您好：{{ data.nickname }}</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的书架">
          <div class="head">
            我的书架
          </div>
          <div class="bookshelf">
            <el-table
              :data="
                data.tableData.slice(
                  (data.currentPage - 1) * data.pageSize,
                  data.currentPage * data.pageSize
                )
              "
              style="width: 100%"
              height="300"
            >
              <el-table-column prop="type" label="类别" width="200">
              </el-table-column>
              <el-table-column prop="picture" label="" width="200">
                <template #default="scope">
                  <img
                    src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="name" label="书名" width="200">
              </el-table-column>
              <el-table-column prop="newpage" label="最新章节" width="200">
              </el-table-column>
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    >继续阅读</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page="data.currentPage"
              :page-size="data.pageSize"
              :total="data.tableData.length"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const { state, getters, dispatch, commit } = useStore();
    let data = reactive({
      tabPosition: "left",
      nickname: state.user.nickname,
      avatar: state.user.avatar,

      pageSize: 5,
      currentPage: 1,
      tableData: [
        {
          type: "玄幻",
          picture: "",
          name: "斗破苍穹1",
          newpage: "一千一百章"
        },
        {
          type: "玄幻",
          picture: "",
          name: "斗破苍穹2",
          newpage: "一千一百章"
        },
        {
          type: "玄幻",
          picture: "",
          name: "斗破苍穹3",
          newpage: "一千一百章"
        },
        {
          type: "玄幻",
          picture: "",
          name: "斗破苍穹4",
          newpage: "一千一百章"
        },
        {
          type: "玄幻",
          picture: "",
          name: "斗破苍穹5",
          newpage: "一千一百章"
        },
        {
          type: "玄幻",
          picture: "",
          name: "斗破苍穹6",
          newpage: "一千一百章"
        },
        {
          type: "玄幻",
          picture: "",
          name: "斗破苍穹7",
          newpage: "一千一百章"
        },
        {
          type: "玄幻",
          picture: "",
          name: "斗破苍穹8",
          newpage: "一千一百章"
        },
        {
          type: "玄幻",
          picture: "",
          name: "斗破苍穹9",
          newpage: "一千一百章"
        },
        {
          type: "玄幻",
          picture: "",
          name: "斗破苍穹10",
          newpage: "一千一百章"
        },
        {
          type: "玄幻",
          picture: "",
          name: "斗破苍穹11",
          newpage: "一千一百章"
        },
        {
          type: "玄幻",
          picture: "",
          name: "斗破苍穹12",
          newpage: "一千一百章"
        },
        {
          type: "玄幻",
          picture: "",
          name: "斗破苍穹13",
          newpage: "一千一百章"
        },
        {
          type: "玄幻",
          picture: "",
          name: "斗破苍穹14",
          newpage: "一千一百章"
        },
        {
          type: "玄幻",
          picture: "",
          name: "斗破苍穹15",
          newpage: "一千一百章"
        }
      ]
    });

    function handleEdit(index, row) {
      console.log(index, row);
    }
    function handleCurrentChange(val) {
        data.currentPage=val
    }
    return { data, handleEdit,handleCurrentChange };
  }
});
</script>

<style lang="less" scoped>
.form {
  width: 50%;
  min-width: 1050px;
  height: 500px;
  background-color: #fff;
  margin: 50px auto;
}

.peersonal {
  margin-left: 20px;
  margin-top: 20px;
  .nickname {
    padding-top: 20px;
  }
}
.head {
  font-size: 20px;
}
.bookshelf {
  img {
    width: 100px;
    height: 50px;
  }
}
</style>
