<template>
  <div class="container">
    <div class="form">
      <el-tabs tab-position="left" style="height: 500px;">
        <!-- 插槽1 -->
        <el-tab-pane label="个人中心">
          <div class="peersonal">
            <div class="avatar">
              <el-avatar :size="60">
                <img :src="
                    data.avatar
                      ? data.avatar
                      : 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
                  " />
              </el-avatar>
            </div>
            <div class="nickname">主人您好：{{ data.nickname }}</div>
          </div>
        </el-tab-pane>
        <!-- 插槽2 -->
        <el-tab-pane label="我的书架">
          <div class="head">
            我的书架
          </div>
          <div class="bookshelf">
            <el-table :data="
                data.tableData.slice(
                  (data.currentPage - 1) * data.pageSize,
                  data.currentPage * data.pageSize
                )
              " style="width: 100%" height="300">
              <el-table-column align="center" prop="type" label="类别" width="100">
                <template #default="scope">
                  <el-button type="warning" plain size="small">{{
                    scope.row.type
                  }}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="picture" label="" width="100">
                <template #default="scope">
                  <img :src="scope.row.picture" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="name" label="书名" width="200">
              </el-table-column>
              <el-table-column align="center" prop="newpage" label="最新章节" width="200">
              </el-table-column>
              <el-table-column align="center" label="操作" width="300">
                <template #default="scope">
                  <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">阅读</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">从书架移除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination v-if="data.tableData.length" background @current-change="handleCurrentChange" :current-page="data.currentPage"
              :page-size="data.pageSize" :total="data.tableData.length">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElLoading } from 'element-plus'
import zgaxios from '@/tools/zgaxios'
import { detailUrlYnv } from '@/tools/api'
export default defineComponent({
  setup() {
    const { state, commit } = useStore()
    const router = useRouter()
    const route = useRoute()
    function tohome() {
      if (!state.user.lgn) {
        router.push('/home')
      } else {
        return
      }
    }
    tohome()
    let data = reactive({
      nickname: state.user.nickname,
      avatar: state.user.src,

      pageSize: 5,
      currentPage: 1,
      tableData: state.tableData,
    })
    //进入阅读
    async function handleEdit(index, row) {
      if (data.tableData[index].cartoonId) {
        router.push(
          `/cartoon/detail/${data.tableData[index].cartoonId}/${data.tableData[index].chapterid}/${data.tableData[index].title}`
        )
      } else {
        let id = data.tableData[index].bookId
        const loading = ElLoading.service({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        })
        try {
          let { data } = await zgaxios('GET', detailUrlYnv, {
            params: {
              bookId: id,
            },
          })
          let { result } = data
          if (result.code == 1009) {
            loading.close()
            ElMessage.error('操作太频繁，请10s后再试')
            return
          } else if (result.code == 0) {
            loading.close()
            commit('getBookDetails', data.data)
            router.push('/content')
          } else {
            throw new Error('无数据')
          }
        } catch (error) {
          loading.close()
          ElMessage.error('错误，该书不存在已被移除')
        }
        router.push('/content')
      }

      console.log(state.tableData)
    }
    //分页
    function handleCurrentChange(val) {
      data.currentPage = val
    }
    //从书架删除
    function handleDelete(index, row) {
      //    console.log(index, row);
      commit('delete', row.name)
    }
    return { data, handleEdit, handleCurrentChange, handleDelete }
  },
})
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
