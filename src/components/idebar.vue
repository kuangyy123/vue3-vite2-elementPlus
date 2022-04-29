<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    :default-active="onRoutes"
    :collapse="collapse"
    text-color="#fff"
    unique-opened
    class="el-menu-vertical-demo"
    router
  >
    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in noChildren"
      :index="item.path"
      :key="item.name"
    >
      <i class="iconfont" :class="item.icon"></i>

      <span style="padding: 0 20px 0 10px">{{ item.title }}</span>
    </el-menu-item>
    <el-sub-menu
      v-for="item in hasChildren"
      :index="item.path"
      :key="item.name"
    >
      <template #title>
        <i class="iconfont" :class="item.icon"></i>
        <span style="padding: 0 20px 0 10px">{{ item.title }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          v-for="subitem in item.subs"
          :index="subitem.path"
          :key="subitem.name"
          @click="clickMenu(subitem)"
         
        >
          <template #title>
            <i class="iconfont" :class="subitem.icon"></i>
            <span style="margin-left: 10px">{{ subitem.title }}</span>
          </template>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <!-- <el-sub-menu v-for="item in hasChildren" :index="item.name" :key="item.name">
      <template #title>
        <el-icon><location /></el-icon>
        <span style="padding: 0  20px 0 10px">{{ item.title }}</span>
      </template>
      <el-menu-item-group >
        <el-menu-item v-for="subitem in item.subs" :index="subitem.name" :key="subitem.name">{{ subitem.title }}</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <template v-for="item in items">
                <template v-if="item.subs">
                    <el-sub-menu :index="item.index" :key="item.index">
                        <template #title>
                            <el-icon :size="20"> <edit /></el-icon>
                            <span style="padding: 0  20px 0 10px">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-sub-menu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template #title>
                                    <el-icon :size="20"> <edit /></el-icon>
                                    <span style="padding: 0  20px 0 10px">{{ subItem.title }}</span>
                                    </template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}</el-menu-item>
                            </el-sub-menu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                       <el-icon :size="20"> <edit /></el-icon>
                        <template #title>
                            <span style="padding: 0  20px 0 10px">   {{ item.title }}</span>
                         
                        </template>
                    </el-menu-item>
                    
                </template>
            </template> -->
  </el-menu>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { Edit } from "@element-plus/icons-vue";
export default {
  components: {
    Edit,
  },
  setup(props) {
    const items = [
     
      {
        icon: "icon-yuyue",
        name: "dashboard",
        path: "/dashboard",
        title: "系统数据",
      },
      {
        icon: "icon-anquansuo",
        name: "table",
        path: "/table",
        title: "基础表格",
      },
      
      {
        icon: "icon-baobiaoxiazai",
        name: "tabs",
        path: "/tabs",
        title: "文件上传",
      },

      {
        icon: "icon-baobiao",
        name: "7",
        path: "/7",
        title: "错误处理",
        subs: [
         
          {
            icon: "icon-chuchashenqing",
            name: "404",
            path: "/404",
            title: "404页面",
          },
        ],
      },
      {
        icon: "icon-daka",
        name: "donate",
        path: "/donate",
        title: "支持作者",
      },
    ];
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const onRoutes = computed(() => {
      return route.path;
    });
    const taglist = computed(() => store.state.tagsList);
    const menuActive = computed(() => store.state.menuActive);
    console.log(menuActive.value);
    function clickMenu(item) {
      console.log(item);
      router.push(item.path);
      store.commit("selectMenu", item);
      store.commit("getmenuActive", item.path);
    }

    const collapse = computed(() => store.state.collapse);
    const noChildren = computed(() => items.filter((item) => !item.subs));
    const hasChildren = computed(() => items.filter((item) => item.subs));

    return {
      items,
      route,
      onRoutes,
      collapse,
      noChildren,
      hasChildren,
      clickMenu,
      taglist,
      menuActive,
    };
  },
};
</script>
<style scoped>
.el-menu {
  height: 100%;
}
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  /* min-height: 400px; */
}
</style>