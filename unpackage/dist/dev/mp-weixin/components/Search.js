"use strict";
const common_vendor = require("../common/vendor.js");
const utils_request_search = require("../utils/request/search.js");
const utils_debounce = require("../utils/debounce.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  (_easycom_uni_search_bar2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_transition2)();
}
const _easycom_uni_search_bar = () => "../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_list_item = () => "../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_transition = () => "../uni_modules/uni-transition/components/uni-transition/uni-transition.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_transition)();
}
const _sfc_main = {
  __name: "Search",
  props: {
    handleConfirm: {
      type: Function,
      default: function() {
      }
    }
  },
  setup(__props) {
    const props = __props;
    let data = common_vendor.reactive({
      keyword: "",
      searchSuggestionList: []
    });
    let _getSuggestions = utils_debounce.debounce(utils_request_search.getSearchSuggestions, 200);
    async function confirmKeyword(keyword) {
      let songList = (await utils_request_search.getSearchResult(keyword)).songs;
      console.log(props.handleConfirm);
      props.handleConfirm(songList);
    }
    common_vendor.watch(() => data.keyword, async (newvalue) => {
      let suggestionsList = await _getSuggestions(newvalue);
      data.searchSuggestionList.splice(0, data.searchSuggestionList.length, ...suggestionsList);
    }, {
      deep: true
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => confirmKeyword(common_vendor.unref(data).keyword)),
        b: common_vendor.o(($event) => common_vendor.unref(data).keyword = $event),
        c: common_vendor.p({
          radius: "0",
          placeholder: "搜索",
          clearButton: "auto",
          cancelButton: "none",
          modelValue: common_vendor.unref(data).keyword
        }),
        d: common_vendor.f(common_vendor.unref(data).searchSuggestionList, (suggestion, k0, i0) => {
          return {
            a: suggestion.keyword,
            b: common_vendor.o(($event) => confirmKeyword(suggestion.keyword), suggestion.keyword),
            c: "238685f4-3-" + i0 + ",238685f4-2",
            d: common_vendor.p({
              title: suggestion.keyword,
              border: false,
              clickable: "true"
            })
          };
        }),
        e: common_vendor.p({
          border: false
        }),
        f: common_vendor.p({
          ["mode-class"]: "fade",
          show: common_vendor.unref(data).searchSuggestionList.length != 0
        }),
        g: common_vendor.unref(data).searchSuggestionList.length != 0
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cpg/Documents/Project/hbuilderx/NCM_lite/components/Search.vue"]]);
wx.createComponent(Component);
