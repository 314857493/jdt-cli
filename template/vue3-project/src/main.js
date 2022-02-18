import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import * as ElIcons from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
// import "./assets/scss/var.scss";
import router from "./router";
import store from "./store";
import _axios from "./plugins/axios";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const app = createApp(App).use(router).use(store);

app.config.globalProperties.$axios = _axios; //全局配置axios
// app.config.devtools = true;

app.use(ElementPlus, {
  locale: zhCn,
  size: "small",
});

// 注册全部ElIcons
for (let iconName in ElIcons) {
  app.component(iconName, ElIcons[iconName]);
}

app.mount("#app");
