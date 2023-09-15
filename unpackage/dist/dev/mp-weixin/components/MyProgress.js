"use strict";
const common_vendor = require("../common/vendor.js");
const stores_player = require("../stores/player.js");
const stores_device = require("../stores/device.js");
require("../utils/request/song.js");
require("../utils/format/time.js");
require("../utils/handleImage.js");
require("../utils/device/index.js");
const _sfc_main = {
  __name: "MyProgress",
  props: {
    background: {
      type: String,
      default: "rgba(255,255,255,0.7)"
    },
    width: {
      type: Number,
      default: 710
    },
    ballSize: {
      type: Number,
      default: 32
    }
  },
  setup(__props) {
    const props = __props;
    common_vendor.useCssVars((_ctx) => ({
      "6a89fba6": common_vendor.unref(width),
      "2081ae80": common_vendor.unref(ballSize),
      "1929a5f2": common_vendor.unref(subLineWidth),
      "427fb95a": common_vendor.unref(goneLine)
    }));
    let playerStore = stores_player.usePlayerStore();
    let deviceStore = stores_device.useDeviceStore();
    let moving = common_vendor.ref(false);
    let goneLine = common_vendor.computed(() => (props.width - props.ballSize) * playerStore.percent + "rpx");
    let width = common_vendor.computed(() => props.width + "rpx");
    let ballSize = common_vendor.computed(() => props.ballSize + "rpx");
    let subLineWidth = common_vendor.computed(() => props.width - props.ballSize + "rpx");
    let pxToSecond = common_vendor.computed(() => {
      let allsecondes = playerStore.dt / 1e3;
      let goneLinePx = (props.width - props.ballSize) * deviceStore.pxTorpx;
      return allsecondes / goneLinePx;
    });
    let x = common_vendor.computed(() => {
      if (!moving.value) {
        return (props.width - props.ballSize) * deviceStore.pxTorpx * playerStore.percent;
      } else {
        return _x.value;
      }
    });
    let _x = common_vendor.ref(0);
    function getBallX(e) {
      let {
        x: x2,
        source
      } = e.detail;
      if (source == "touch") {
        moving.value = true;
        _x.value = x2;
      }
    }
    function touchBallEnd() {
      let newTime = _x.value * pxToSecond.value * 1e3;
      moving.value = false;
      playerStore.updateCurrentTime(newTime);
    }
    function jumpTo(e) {
      let clientTosubLineMargin = (750 - props.width + props.ballSize) / 2;
      let {
        clientX
      } = e.changedTouches[0];
      let touchX = clientX - clientTosubLineMargin * deviceStore.pxTorpx;
      let newTime = touchX * pxToSecond.value * 1e3;
      playerStore.updateCurrentTime(newTime);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(x),
        b: common_vendor.o(getBallX),
        c: common_vendor.o(touchBallEnd),
        d: common_vendor.o(jumpTo),
        e: common_vendor.o(jumpTo),
        f: common_vendor.s(_ctx.__cssVars())
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cpg/Documents/Project/hbuilderx/NCM_lite/components/MyProgress.vue"]]);
wx.createComponent(Component);
