<template>
  <div class="Sidebar">
    <div class="logo"></div>
    <el-menu
      :default-active="defaultActive"
      background-color="#2C2C2D"
      text-color="#fff"
      active-text-color="#fff"
      @select="onSelect"
    >
      <template v-for="(menu, m) in parseMenu(smenu)">
        <el-sub-menu v-if="menu.children" :key="menu" :index="menu.meta.title">
          <template #title>
            <el-icon>
              <component :is="menu.meta.icon" />
            </el-icon>
            <span>{{ menu.meta ? menu.meta.title : "" }}</span>
          </template>
          <!-- <div v-for="item in parseMenu"></div> -->
          <el-menu-item
            v-for="(sub, n) in parseMenu(menu.children)"
            :key="n"
            :index="sub.name"
          >
            {{ sub.meta ? sub.meta.title : "" }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :key="m" :index="menu.name">
          <template #title>
            <el-icon>
              <component :is="menu.meta.icon" />
            </el-icon>
            <span>{{ menu.meta ? menu.meta.title : "" }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import routes from "../../router/routes";

export default {
  name: "Sidebar",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const defaultActive = computed(() => {
      return parseIndex(route.name);
    });
    const authority = computed(() => {
      return store.state.authority;
    });
    const smenu = ref(routes.children);
    function parseMenu(routeItem) {
      const parsedMenu = routeItem.filter((x) => {
        const name = x.name || x.meta.shadowName;
        const nameArr = name.split(".");
        let flag = false;
        if (x.meta.exclude) return false;
        for (let m = 0; m < authority.value.length; m++) {
          const el = authority.value[m];
          const elArr = el.split(".");
          if (
            el === name ||
            (elArr.length > nameArr.length && el.startsWith(`${name}.`))
          ) {
            flag = true;
            break;
          }
        }
        return flag;
      });
      return parsedMenu;
    }
    function parseIndex(name) {
      const arr = name.split(".");
      return arr.slice(0, 3).join(".");
    }
    function onSelect(name) {
      router.push({ name });
    }

    return {
      smenu,
      parseMenu,
      parseIndex,
      onSelect,
      defaultActive,
      authority,
    };
  },
};
</script>

<style lang="scss">
.Sidebar {
  // .logo {
  //   height: 40px;
  //   border-right: 1px solid #e6e6e6;
  //   background-color: #2C2C2D;
  // }
  width: 200px;
  min-width: 200px;
  // height: fle;
  // height: calc(100vh - 40px);
  // height: 100vh;
  border-right: 1px solid #eaecef;
  overflow-y: auto;
  overflow-x: hidden;
  .el-menu {
    // height: calc(100% - 40px);
    width: 200px;
    height: 100%;
    .iconfont {
      position: relative;
      left: -5px;
    }
    .is-active {
      background: #4762fe !important;
    }
  }
}
</style>
