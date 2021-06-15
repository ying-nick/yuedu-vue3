<template>
  <div>这是章节内容</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import zgaxios from "../tools/zgaxios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getList } from "../tools/api"
import QS from "qs";
export default defineComponent({
  props: ["id"],
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const { state, commit } = useStore();
    // console.log(state.chapter[0][668].name)
    console.log(props.id);
    let text = reactive({
      bookId: state.bookDetails.bookId,
      chapterIdList: [props.id],
    });
    const getText = async () => {
      let result = await zgaxios("POST", getList, text);
      console.log(result);
    };
    getText();
  console.log(JSON.stringify(text))
    return {};
  }
});
</script>