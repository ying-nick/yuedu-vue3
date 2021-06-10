<template>
   <div class="channelWrap classTable cf">
        <div class="so_tag">
            <ul class="list">
                <li class="so_pd" id="workDirection">
                    <span class="tit">作品频道：</span>
                    <a filter-value="0" href="javascript:listBookCategory();search(1,20)" class="on">男频</a>
                    <a filter-value="1" href="javascript:listBookCategory();search(1,20)">女频</a>
                </li>
                <li id="idGirl" class="so_class">
                    <span class="tit">作品分类：</span>
                    <span class="so_girl" id="girlCategoryList" style="display: none;">
                        </span>
                    <span class="so_boy" id="boyCategoryList">
                        </span>
                </li>
                <li class="so_progress">
                    <span class="tit">是否完结：</span>
                    <a  href="javascript:search(1,20)" class="on">不限</a>
                    <a filter-value="0" href="javascript:search(1,20)" class="">连载中</a>
                    <a filter-value="1" href="javascript:search(1,20)" class="">已完结</a>
                </li>
                <li class="so_words">
                    <span class="tit">作品字数：</span>
                    <a href="javascript:search(1,20)" class="on">不限</a>
                    <a filter-value-max="300000" href="javascript:search(1,20)" class="">30万字以下</a>
                    <a filter-value-min="300000" filter-value-max="500000" href="javascript:search(1,20)" class="">30-50万字</a>
                    <a filter-value-min="500000" filter-value-max="1000000" href="javascript:search(1,20)" class="">50-100万字</a>
                    <a filter-value-min="1000000" href="javascript:search(1,20)" class="">100万字以上</a>
                </li>
                <li class="so_update">
                    <span class="tit">更新时间：</span>
                    <a href="javascript:search(1,20)" class="on">不限</a>
                    <a filter-value="30" href="javascript:search(1,20)" class="">一月内</a>
                </li>
                <li class="so_sort">
                    <span class="tit">排序方式：</span>
                    <a href="javascript:search(1,20)" class="on">不限</a>
                    <a filter-value="last_index_update_time" href="javascript:search(1,20)" class="">更新时间</a>
                    <a filter-value="word_count" href="javascript:search(1,20)" class="">总字数</a>
                    <a filter-value="visit_count" href="javascript:search(1,20)" class="">点击量</a>
                </li>
            </ul>
        </div>
    </div>

</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name:'Category',
  components: {},
  setup() {},
})
</script>
<style lang="less" scoped>
    .list{
        list-sytle:none;
    }
</style>
