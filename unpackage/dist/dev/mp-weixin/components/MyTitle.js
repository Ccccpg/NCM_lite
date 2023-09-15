"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "MyTitle",
  props: {
    type: {
      type: String,
      default: "h2"
    },
    text: {
      type: String,
      default: "这是一段很长的文字，用于演示滚动效果"
    },
    duration: {
      type: Number,
      default: 10
    },
    width: {
      type: Number,
      default: 100
    },
    color: {
      type: String,
      default: "#000"
    }
  },
  setup(__props) {
    const props = __props;
    common_vendor.useCssVars((_ctx) => ({
      "48539b85": common_vendor.unref(containerWidth),
      "193f3dcf": "-" + common_vendor.unref(textWidth)
    }));
    let _this = common_vendor.getCurrentInstance();
    let textWidth = common_vendor.ref();
    let textHeight = common_vendor.ref();
    let containerWidth = common_vendor.computed(() => props.width + "px");
    common_vendor.computed(() => {
      let _textWidth = parseInt(textWidth.value);
      let _containerWidth = parseInt(containerWidth.value);
      if (_textWidth > _containerWidth) {
        return true;
      } else {
        return false;
      }
    });
    common_vendor.watch(() => props.text, (newvalue) => {
      common_vendor.nextTick$1(() => {
        common_vendor.wx$1.createSelectorQuery().in(_this).select(".text").boundingClientRect((rect) => {
          debugger;
          textWidth.value = rect.width + "px";
          textHeight.value = rect.height + "px";
        }).exec();
      });
      common_vendor.nextTick$1(() => {
        common_vendor.index.createSelectorQuery().select(".text").boundingClientRect((rect) => {
          debugger;
          textWidth.value = rect.width + "px";
          textHeight.value = rect.height + "px";
        }).exec();
      });
    }, {
      deep: true
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(props).text),
        b: common_vendor.unref(props).duration + "s",
        c: common_vendor.s(_ctx.__cssVars())
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cpg/Documents/Project/hbuilderx/NCM_lite/components/MyTitle.vue"]]);
wx.createComponent(Component);
