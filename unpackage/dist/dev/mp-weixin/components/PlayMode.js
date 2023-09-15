"use strict";
const common_vendor = require("../common/vendor.js");
const stores_player = require("../stores/player.js");
const utils_debounce = require("../utils/debounce.js");
require("../utils/request/song.js");
require("../utils/format/time.js");
require("../utils/handleImage.js");
require("../stores/device.js");
require("../utils/device/index.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = {
  __name: "PlayMode",
  props: {
    size: {
      type: Number,
      default: 50
    }
  },
  setup(__props) {
    const props = __props;
    common_vendor.useCssVars((_ctx) => ({
      "88da35a8": common_vendor.unref(size)
    }));
    let playerStore = stores_player.usePlayerStore();
    let modeRef = common_vendor.ref();
    let size = common_vendor.computed(() => props.size + "rpx");
    let d_switchMode = utils_debounce.debounce(() => {
      modeRef.value.open();
      setTimeout(() => {
        modeRef.value.close();
      }, 500);
    }, 500);
    function switchMode() {
      playerStore.switchMode();
      d_switchMode();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(playerStore).mode
      }, !common_vendor.unref(playerStore).mode ? {} : common_vendor.unref(playerStore).mode == 1 ? {} : {}, {
        b: common_vendor.unref(playerStore).mode == 1,
        c: common_vendor.sr(modeRef, "450fc2c3-0", {
          "k": "modeRef"
        }),
        d: common_vendor.s(_ctx.__cssVars()),
        e: common_vendor.p({
          type: "center",
          ["background-color"]: "rgba(0,0,0,.7)",
          ["mask-background-color"]: "rgba(0,0,0,0)",
          animation: true
        }),
        f: !common_vendor.unref(playerStore).mode,
        g: common_vendor.o(switchMode),
        h: common_vendor.unref(playerStore).mode == 1,
        i: common_vendor.o(switchMode),
        j: common_vendor.unref(playerStore).mode == 2,
        k: common_vendor.o(switchMode),
        l: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cpg/Documents/Project/hbuilderx/NCM_lite/components/PlayMode.vue"]]);
wx.createComponent(Component);
