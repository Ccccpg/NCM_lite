"use strict";
const common_vendor = require("../../common/vendor.js");
function getSongUrl(id) {
  return new Promise((resolve, reject) => {
    common_vendor.wx$1.request({
      method: "get",
      url: `https://music.wtcccpg.asia/song/url?id=${id}`,
      success: (res) => {
        resolve(res.data.data[0].url);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
exports.getSongUrl = getSongUrl;
