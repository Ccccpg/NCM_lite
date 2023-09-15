"use strict";
const common_vendor = require("../common/vendor.js");
const stores_player = require("../stores/player.js");
const stores_device = require("../stores/device.js");
const utils_format_songList = require("../utils/format/songList.js");
require("../utils/request/song.js");
require("../utils/format/time.js");
require("../utils/handleImage.js");
require("../utils/device/index.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = {
  __name: "SongList",
  props: {
    data: {
      type: Array,
      default: []
    },
    playListId: {
      type: Number,
      default: -1
    }
  },
  setup(__props) {
    const props = __props;
    const playerStore = stores_player.usePlayerStore();
    const deviceStore = stores_device.useDeviceStore();
    let dataFormated = common_vendor.computed(() => {
      let list;
      list = utils_format_songList.formatSongList(props.data);
      return list;
    });
    common_vendor.computed(() => {
      return deviceStore.windowBottom + "px";
    });
    let artists = common_vendor.computed(() => (song) => {
      let artistArr = song.artists;
      return artistArr.join(",");
    });
    async function playmusic(song) {
      playerStore.updateNowPlayList(dataFormated.value);
      playerStore.getAudio();
      await playerStore.getMusic(song);
      playerStore.play();
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(dataFormated), (song, index, i0) => {
          return {
            a: song.id,
            b: common_vendor.o(($event) => playmusic(song), song.id),
            c: "02539694-1-" + i0 + ",02539694-0",
            d: common_vendor.p({
              clickable: true,
              title: song.name,
              note: common_vendor.unref(artists)(song),
              thumb: song.image,
              ["thumb-size"]: "lg",
              border: false,
              ellipsis: "2"
            })
          };
        }),
        b: common_vendor.p({
          border: false
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-02539694"], ["__file", "C:/Users/cpg/Documents/Project/hbuilderx/NCM_lite/components/SongList.vue"]]);
wx.createComponent(Component);
