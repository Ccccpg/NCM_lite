"use strict";
const common_vendor = require("../../common/vendor.js");
function getSearchResult(keyword, type = 1) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      method: "get",
      url: `https://music.wtcccpg.asia/cloudsearch?keywords=${keyword}&type=${type}`,
      success: (res) => {
        resolve(res.data.result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
function getHotSearch() {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      method: "get",
      url: "https://music.wtcccpg.asia/search/hot/detail",
      success(res) {
        resolve(res.data.data);
      },
      fail(err) {
        reject(err);
      }
    });
  });
}
function getSearchSuggestions(keyword) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      method: "get",
      url: `https://music.wtcccpg.asia/search/suggest?keywords=${keyword}&type=mobile`,
      success(res) {
        let keywordList;
        if (res && res.data && res.data.result && res.data.result.allMatch) {
          keywordList = res.data.result.allMatch;
        } else {
          keywordList = [];
        }
        resolve(keywordList);
      },
      fail(err) {
        reject(err);
      }
    });
  });
}
exports.getHotSearch = getHotSearch;
exports.getSearchResult = getSearchResult;
exports.getSearchSuggestions = getSearchSuggestions;
