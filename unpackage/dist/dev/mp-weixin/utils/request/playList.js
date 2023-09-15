"use strict";
const common_vendor = require("../../common/vendor.js");
function getPlayListAllSongs(id, offset) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      method: "get",
      url: `https://music.wtcccpg.asia/playlist/track/all?id=${id}`,
      success: (res) => {
        resolve(res.data.songs);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
exports.getPlayListAllSongs = getPlayListAllSongs;
