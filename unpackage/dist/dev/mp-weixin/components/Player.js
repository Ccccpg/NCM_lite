"use strict";
const common_vendor = require("../common/vendor.js");
const stores_device = require("../stores/device.js");
const stores_player = require("../stores/player.js");
require("../utils/device/index.js");
require("../utils/request/song.js");
require("../utils/format/time.js");
require("../utils/handleImage.js");
if (!Array) {
  const _easycom_uni_title2 = common_vendor.resolveComponent("uni-title");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_title2 + _easycom_uni_popup2)();
}
const _easycom_uni_title = () => "../uni_modules/uni-title/components/uni-title/uni-title.js";
const _easycom_uni_popup = () => "../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (PlayMode + Play + _easycom_uni_title + MyTitle + MyProgress + _easycom_uni_popup)();
}
const PlayMode = () => "./PlayMode.js";
const Play = () => "./Play.js";
const MyProgress = () => "./MyProgress.js";
const MyTitle = () => "./MyTitle.js";
const _sfc_main = {
  __name: "Player",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "eafe5dd0": common_vendor.unref(windowBottom),
      "d7a86fd8": common_vendor.unref(windowHeight)
    }));
    let fontLight = common_vendor.ref("font-light");
    let fontDark = common_vendor.ref("font-dark");
    let ccc = common_vendor.ref("ccc");
    let downClass = common_vendor.ref("iconfont icon-pulldown");
    common_vendor.ref(false);
    const deviceStore = stores_device.useDeviceStore();
    const playerStore = stores_player.usePlayerStore();
    let artists = common_vendor.computed(() => playerStore.artists.join("、"));
    let windowBottom = common_vendor.computed(() => deviceStore.windowBottom + "px");
    let windowHeight = common_vendor.computed(() => deviceStore.windowHeight + "px");
    let imagePlayerDetail = common_vendor.computed(() => {
      if (playerStore.image != "") {
        return playerStore.image.replace(/\d+y\d+/, "600y600");
      }
      return "";
    });
    let uniTitleColor = common_vendor.computed(() => {
      if (playerStore.brightness == "dark") {
        return "white";
      } else {
        return "#333";
      }
    });
    let playerDetailPopup = common_vendor.ref();
    function openPlayerDetail() {
      playerDetailPopup.value.open();
    }
    function closePlayerDetail() {
      playerDetailPopup.value.close();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(playerStore).name
      }, common_vendor.unref(playerStore).name ? {
        b: common_vendor.unref(playerStore).image,
        c: common_vendor.o(openPlayerDetail),
        d: common_vendor.t(common_vendor.unref(playerStore).name),
        e: common_vendor.t(common_vendor.unref(playerStore).artistsFormated),
        f: common_vendor.s(_ctx.__cssVars())
      } : {}, {
        g: `url(${common_vendor.unref(playerStore).image})`,
        h: common_vendor.o(closePlayerDetail),
        i: common_vendor.n(common_vendor.unref(playerStore).brightness == "dark" ? common_vendor.unref(fontLight) : common_vendor.unref(fontDark)),
        j: common_vendor.n(common_vendor.unref(downClass)),
        k: common_vendor.unref(imagePlayerDetail),
        l: common_vendor.p({
          type: "h1",
          title: common_vendor.unref(playerStore).name,
          color: common_vendor.unref(uniTitleColor)
        }),
        m: common_vendor.p({
          type: "h3",
          text: common_vendor.unref(artists)
        }),
        n: common_vendor.p({
          size: 100
        }),
        o: common_vendor.p({
          size: 60
        }),
        p: common_vendor.p({
          type: "h3",
          title: common_vendor.unref(playerStore).currentTimeFormated,
          color: common_vendor.unref(uniTitleColor)
        }),
        q: common_vendor.n(common_vendor.unref(playerStore).brightness == "dark" ? common_vendor.unref(fontLight) : common_vendor.unref(fontDark)),
        r: common_vendor.n(common_vendor.unref(ccc)),
        s: common_vendor.sr(playerDetailPopup, "6a6912a6-2", {
          "k": "playerDetailPopup"
        }),
        t: common_vendor.s(_ctx.__cssVars()),
        v: common_vendor.p({
          type: "bottom"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cpg/Documents/Project/hbuilderx/NCM_lite/components/Player.vue"]]);
wx.createComponent(Component);
