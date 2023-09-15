"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_Player = common_vendor.resolveComponent("Player");
  _component_Player();
}
if (!Math) {
  SongList();
}
const SongList = () => "../../components/SongList.js";
const _sfc_main = {
  __name: "playList",
  setup(__props) {
    let data = common_vendor.reactive({
      playListId: -1,
      songList: []
    });
    common_vendor.onBeforeMount(() => {
      const instance = common_vendor.getCurrentInstance().proxy;
      const eventChannel = instance.getOpenerEventChannel();
      eventChannel.on("acceptDataFromPlayListDetail", function(_data) {
        let {
          id,
          //歌单id
          songList
          //歌单歌曲数组
        } = _data;
        data.playListId = Number(id);
        data.songList.push(...songList);
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          data: common_vendor.unref(data).songList,
          playListId: common_vendor.unref(data).playListId
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cpg/Documents/Project/hbuilderx/NCM_lite/pages/playList/playList.vue"]]);
wx.createPage(MiniProgramPage);
