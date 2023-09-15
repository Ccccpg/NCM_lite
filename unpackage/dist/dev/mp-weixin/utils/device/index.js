"use strict";
const common_vendor = require("../../common/vendor.js");
function getDeviceInfo() {
  return new Promise((resolve, reject) => {
    common_vendor.index.getSystemInfo({
      success(deviceInfo) {
        resolve(deviceInfo);
      }
    });
  });
}
exports.getDeviceInfo = getDeviceInfo;
