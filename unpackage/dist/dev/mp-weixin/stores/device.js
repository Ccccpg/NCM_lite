"use strict";
const common_vendor = require("../common/vendor.js");
const utils_device_index = require("../utils/device/index.js");
const useDeviceStore = common_vendor.defineStore("device", {
  state: () => {
    return {
      screenWidth: 0,
      //屏幕总宽
      screenHeight: 0,
      //屏幕总高
      windowWidth: 0,
      //可使用窗口宽度
      windowHeight: 0,
      //可使用窗口高度
      windowBottom: 0,
      //可使用窗口的底部位置
      windowTop: 0
      //可使用窗口的顶部位置
    };
  },
  getters: {
    // px/rpx比率
    pxTorpx(state) {
      return state.screenWidth / 750;
    }
  },
  actions: {
    //获取设备信息
    async getDeciveInfo() {
      let {
        screenWidth,
        screenHeight,
        windowWidth,
        windowHeight,
        windowBottom,
        windowTop
      } = await utils_device_index.getDeviceInfo();
      console.log(windowBottom);
      this.screenWidth = screenWidth;
      this.screenHeight = screenHeight;
      this.windowBottom = windowBottom;
      this.windowTop = windowTop;
      this.windowWidth = windowWidth;
      this.windowHeight = windowHeight;
    },
    resetDeciveInfo() {
      this.windowBottom = 0;
    }
  }
});
exports.useDeviceStore = useDeviceStore;
