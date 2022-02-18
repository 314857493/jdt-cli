import ViewBox from "../components/ViewBox.vue";

export default {
  path: "/",
  meta: { requiresAuth: true },
  component: () => import("@/views/Main"),
  name: "main",
  children: [
    {
      path: "/device",
      name: "main.device",
      meta: {
        title: "设备管理",
        icon: "menu",
        shadowName: "main.device",
      },
      component: ViewBox,
      children: [
        {
          path: "deviceManage",
          name: "main.device.deviceManage",
          meta: {
            title: "设备列表",
          },
          component: () => import("@/views/Main/Device"),
        },
      ],
    },
  ],
};
