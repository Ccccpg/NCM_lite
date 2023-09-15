"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (SongList + Player)();
}
const SongList = () => "../../components/SongList.js";
const Player = () => "../../components/Player.js";
const _sfc_main = {
  __name: "searchList",
  setup(__props) {
    let data = common_vendor.reactive({
      keyword: "",
      songList: [],
      singerList: [],
      albumList: []
    });
    common_vendor.onBeforeMount(() => {
      const instance = common_vendor.getCurrentInstance().proxy;
      const eventChannel = instance.getOpenerEventChannel();
      eventChannel.on("acceptDataFromSearch", function(_data) {
        let songList = _data[0];
        data.songList.splice(0, data.songList.length, ...songList);
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          data: common_vendor.unref(data).songList
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cpg/Documents/Project/hbuilderx/NCM_lite/pages/searchList/searchList.vue"]]);
wx.createPage(MiniProgramPage);
