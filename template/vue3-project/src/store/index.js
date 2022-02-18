import { createStore } from "vuex";

const store = createStore({
  state: {
    userInfo: {},
    authority: [],
  },
  mutations: {
    setState(state, payload = {}) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
  },
  actions: {
    noUserInfo({ commit }) {
      return new Promise((resolve) => {
        const res = {
          code: 1,
          message: null,
          data: {
            userName: "admin",
          },
        };
        commit("setState", {
          userInfo: res.data,
          authority: [
            // 用户只能访问数组中的路由
            "main",
            "main.device",
            "main.device.deviceManage",
            "main.device.createDevice",
          ],
        });
        resolve(res);
      });
    },
  },
  modules: {},
});

export default store;
