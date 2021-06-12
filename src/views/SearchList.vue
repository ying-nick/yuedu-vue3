<template>
  <div class="searchcontainer">
    <div class="searchlists">

      <el-space direction="vertical" alignment="flex-start" style="width:100%">
        <el-skeleton style="width:100%" :loading="loading" animated>
          <template #template>
            <el-row style="width:100%" :gutter="10">
              <el-col :span="8">
                <el-skeleton-item variant="image" style="width: 102px; height: 136px;" />
              </el-col>
              <el-col :span="16">
                <el-skeleton :rows="4" animated />
              </el-col>
            </el-row>

          </template>
          <template #default>
            <el-card :body-style="{ padding: '0px', marginBottom: '1px' }">
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" />
            </el-card>
          </template>
        </el-skeleton>
      </el-space>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const { state, getters, dispatch, commit } = useStore()
    let lists = reactive({
      list: state.searchData.data,
      title: state.searchData.title,
      size: state.searchData.size,
      count: state.searchData.count,
      from: state.searchData.from,
      loading: true,
    })
    return { ...toRefs(lists) }
  },
})
</script>
<style lang="less" scope>
.searchcontainer {
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .searchlists {
    width: 90%;
  }
}
</style>