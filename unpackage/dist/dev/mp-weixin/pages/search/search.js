"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request_search = require("../../utils/request/search.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _component_Player = common_vendor.resolveComponent("Player");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _component_Player)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (Search + _easycom_uni_list_item + _easycom_uni_list)();
}
const Search = () => "../../components/Search.js";
const _sfc_main = {
  __name: "search",
  setup(__props) {
    let data = common_vendor.reactive({
      hotSearch: []
    });
    async function _getHotSearch() {
      data.hotSearch.splice(0, data.hotSearch.length, ...await utils_request_search.getHotSearch());
    }
    _getHotSearch();
    function navigateTo() {
      let args = arguments;
      console.log(args);
      common_vendor.index.navigateTo({
        url: "/pages/searchList/searchList",
        success: function(res) {
          res.eventChannel.emit("acceptDataFromSearch", args);
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          handleConfirm: navigateTo
        }),
        b: common_vendor.f(common_vendor.unref(data).hotSearch, (item, k0, i0) => {
          return {
            a: item.iconUrl,
            b: item.searchWord,
            c: "36d70fb7-2-" + i0 + ",36d70fb7-1",
            d: common_vendor.p({
              title: item.searchWord,
              border: false,
              note: item.content
            })
          };
        }),
        c: common_vendor.p({
          border: false
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cpg/Documents/Project/hbuilderx/NCM_lite/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
