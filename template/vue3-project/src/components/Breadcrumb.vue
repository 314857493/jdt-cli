<template>
  <el-breadcrumb class="bread" separator-class="el-icon-arrow-right">
    <template v-for="(item, ind) in name">
      <el-breadcrumb-item v-if="!!item" :key="ind">
        {{ item }}
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>
<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "Breadcrumb",
  setup() {
    const route = useRoute();
    // const name = computed(() => route.meta.desc.split("."));
    const name = computed(() => route.matched.map((item) => item.meta.title));
    return {
      route,
      name,
    };
  },
};
</script>

<style lang="scss">
.bread {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 20px;
}
</style>
