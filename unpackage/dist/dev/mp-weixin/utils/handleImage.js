"use strict";
const common_vendor = require("../common/vendor.js");
const stores_device = require("../stores/device.js");
function isImageDark(imageUrl, canvasId, _compt = null, width = 100, height = 100) {
  let deviceStore = stores_device.useDeviceStore();
  width = deviceStore.pxTorpx * width * 2;
  height = deviceStore.pxTorpx * height * 2;
  let path = imageUrl.replace(/\d+y\d+/, `${width}y${height}`);
  return new Promise((resolve, reject) => {
    common_vendor.index.getImageInfo({
      src: path,
      success: () => {
        const ctx = common_vendor.index.createCanvasContext(canvasId, _compt);
        ctx.drawImage(path, 0, 0, width, height);
        ctx.draw(false, () => {
          common_vendor.index.canvasGetImageData({
            canvasId,
            x: 0,
            y: 0,
            width,
            height,
            success: (res) => {
              const {
                data
              } = res;
              let totalBrightness = 0;
              for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
                totalBrightness += brightness;
              }
              const averageBrightness = totalBrightness / (data.length / 4);
              if (averageBrightness >= 180) {
                resolve("light");
              } else {
                resolve("dark");
              }
            },
            fail: (err) => {
              console.log(err);
              reject(err);
            }
          }, _compt);
        });
      }
    });
  });
}
exports.isImageDark = isImageDark;
