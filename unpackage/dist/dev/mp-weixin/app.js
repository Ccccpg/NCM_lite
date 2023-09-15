"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const mixin_flushPlayer = require("./mixin/flushPlayer.js");
require("./stores/device.js");
require("./utils/device/index.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/playList/playList.js";
  "./pages/search/search.js";
  "./pages/searchList/searchList.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cpg/Documents/Project/hbuilderx/NCM_lite/App.vue"]]);
const Player = () => "./components/Player.js";
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(common_vendor.createPinia());
  app.component("Player", Player);
  app.mixin(mixin_flushPlayer.flushPlayer);
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
