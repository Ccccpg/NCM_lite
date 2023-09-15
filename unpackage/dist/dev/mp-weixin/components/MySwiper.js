"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "MySwiper",
  props: {
    //封面
    banners: {
      type: Array,
      default: []
    },
    //是否显示面板指示点
    indicatorDots: {
      type: Boolean,
      default: true
    },
    //自动播放
    autoplay: {
      type: Boolean,
      default: true
    },
    //自动切换时间间隔
    interval: {
      type: Number,
      default: 2e3
    },
    //滑动动画时长
    duration: {
      type: Number,
      default: 500
    },
    //后边距
    nextMargin: {
      type: Number,
      default: 190
    },
    //是否采用衔接滑动
    circular: {
      type: Boolean,
      default: true
    },
    //同时显示的滑块数量
    displayMultipleItems: {
      type: Number,
      default: 1
    },
    //是否展示标题
    showTitle: {
      type: Boolean,
      default: false
    },
    //图片大小
    imageSize: {
      type: Number,
      default: 750
    },
    //swiper高度
    swiperHeight: {
      type: Number,
      default: 400
    },
    handleClick: {
      type: Function,
      default: () => {
        console.log("点击了");
      }
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(props).showTitle
      }, !common_vendor.unref(props).showTitle ? {
        b: common_vendor.f(common_vendor.unref(props).banners, (item, index, i0) => {
          return {
            a: item,
            b: index,
            c: item.id,
            d: common_vendor.o((...args) => __props.handleClick && __props.handleClick(...args), index)
          };
        })
      } : {
        c: common_vendor.f(common_vendor.unref(props).banners, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.title),
            c: index,
            d: item.id,
            e: item.title,
            f: item.image,
            g: item.artists,
            h: common_vendor.o((...args) => __props.handleClick && __props.handleClick(...args), index)
          };
        }),
        d: __props.imageSize + "rpx",
        e: __props.imageSize + "rpx"
      }, {
        f: common_vendor.unref(props).indicatorDots,
        g: common_vendor.unref(props).autoplay,
        h: common_vendor.unref(props).interval,
        i: common_vendor.unref(props).duration,
        j: common_vendor.unref(props).nextMargin + "rpx",
        k: common_vendor.unref(props).circular,
        l: common_vendor.unref(props).displayMultipleItems,
        m: common_vendor.unref(props).swiperHeight + "rpx"
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-aa79b753"], ["__file", "C:/Users/cpg/Documents/Project/hbuilderx/NCM_lite/components/MySwiper.vue"]]);
wx.createComponent(Component);
