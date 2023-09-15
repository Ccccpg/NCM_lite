"use strict";
const common_vendor = require("../common/vendor.js");
const stores_player = require("../stores/player.js");
require("../utils/request/song.js");
require("../utils/format/time.js");
require("../utils/handleImage.js");
require("../stores/device.js");
require("../utils/device/index.js");
const _sfc_main = {
  __name: "Play",
  props: {
    size: {
      type: Number,
      default: 50
    }
  },
  setup(__props) {
    const props = __props;
    common_vendor.useCssVars((_ctx) => ({
      "9967b21a": common_vendor.unref(size)
    }));
    let playerStore = stores_player.usePlayerStore();
    let size = common_vendor.computed(() => props.size + "rpx");
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(playerStore).playing
      }, !common_vendor.unref(playerStore).playing ? {
        b: common_vendor.o((...args) => common_vendor.unref(playerStore).play && common_vendor.unref(playerStore).play(...args))
      } : {
        c: common_vendor.o((...args) => common_vendor.unref(playerStore).pauseAudio && common_vendor.unref(playerStore).pauseAudio(...args))
      }, {
        d: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cpg/Documents/Project/hbuilderx/NCM_lite/components/Play.vue"]]);
wx.createComponent(Component);
