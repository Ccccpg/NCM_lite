"use strict";
const common_vendor = require("../../../../common/vendor.js");
const stores_player = require("../../../../stores/player.js");
require("../../../../utils/request/song.js");
require("../../../../utils/format/time.js");
require("../../../../utils/handleImage.js");
require("../../../../stores/device.js");
require("../../../../utils/device/index.js");
const __default__ = {
  name: "uniList",
  "mp-weixin": {
    options: {
      multipleSlots: false
    }
  },
  props: {
    stackFromEnd: {
      type: Boolean,
      default: false
    },
    enableBackToTop: {
      type: [Boolean, String],
      default: false
    },
    scrollY: {
      type: [Boolean, String],
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    renderReverse: {
      type: Boolean,
      default: false
    }
  },
  // provide() {
  // 	return {
  // 		list: this
  // 	};
  // },
  created() {
    this.firstChildAppend = false;
  },
  methods: {
    loadMore(e) {
      this.$emit("scrolltolower");
    },
    scroll(e) {
      this.$emit("scroll", e);
    }
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "ba554446": common_vendor.unref(paddingBottom)
    }));
    let playerStore = stores_player.usePlayerStore();
    let paddingBottom = common_vendor.computed(() => {
      if (playerStore.id == 0)
        return 0;
      return "50px";
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.border
      }, __props.border ? {} : {}, {
        b: __props.border
      }, __props.border ? {} : {}, {
        c: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cpg/Documents/Project/hbuilderx/NCM_lite/uni_modules/uni-list/components/uni-list/uni-list.vue"]]);
wx.createComponent(Component);
