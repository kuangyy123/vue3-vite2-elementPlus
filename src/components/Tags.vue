<template>
  <div class="tags-view-container">
    <el-scrollbar>
      <div class="scrollbar-flex-content ">
        <el-tag
                    v-for="(tag,index) in tags"
                    :key="tag.name"
                    :closable="tag.name !== 'dashboard'"
                    :effect="route.fullPath == tag.path ? 'dark': 'plain' "
                    :type="tag.type"
                    @close="handleClose(index)"
                >
                    <router-link :to="tag.path" class="tags-li-title">{{tag.title}}</router-link>
              </el-tag>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute,onBeforeRouteUpdate } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const tags = computed(() => store.state.tagsList);
    console.log(tags.value);

    function handleClose(index) {
      const delItem = tags.value[index];
      console.log(tags.value[index]);
      store.commit("delTagsItem", { index });
      const item = tags.value[index]
        ? tags.value[index]
        : tags.value[index - 1];
      if (item) {
        delItem.path === route.fullPath && router.push(item.path);
        store.commit("getmenuActive", item.path);
      }
    }

        // 设置标签
        const setTags = (route) => {
            const isExist = tags.value.some((item) => {
                return item.path === route.fullPath;
            });
            if (!isExist) {
                if (tags.value.length >= 8) {
                    store.commit("delTagsItem", { index: 0 });
                }
                store.commit("setTagsItem", {
                    name: route.name,
                    title: route.meta.title,
                    path: route.fullPath,
                });
            }
        };
        setTags(route);
        onBeforeRouteUpdate((to) => {
            setTags(to);
        });

       
    return {
      tags,
      router,
      handleClose,
      route,
      store,
    };
  },
};
</script>
<style scoped>
.el-tag {
  margin: 0 5px;
}

.scrollbar-flex-content {
  height: 34px;
  display: flex;
  align-items: center;
}
.el-scrollbar {
  display: flex;
  align-items: center;
  overflow: auto;
  height: 34px;
}
.tags-view-container {
  display: flex;
  align-items: center;
  height: 34px;
  width: 99%;
  background: #fff;
  padding: 0 10px;
  white-space: nowrap;
  /* position: relative; */
  overflow: hidden;
  border-bottom: 1px solid #d8dce5;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}

</style>