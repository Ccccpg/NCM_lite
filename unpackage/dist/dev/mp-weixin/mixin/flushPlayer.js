"use strict";
const stores_device = require("../stores/device.js");
const flushPlayer = {
  onShow() {
    setTimeout(() => {
      let deviceStore = stores_device.useDeviceStore();
      deviceStore.getDeciveInfo();
    });
  }
};
exports.flushPlayer = flushPlayer;
