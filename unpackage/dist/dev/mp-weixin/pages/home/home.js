"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request_playList = require("../../utils/request/playList.js");
const stores_player = require("../../stores/player.js");
require("../../utils/request/song.js");
require("../../utils/format/time.js");
require("../../utils/handleImage.js");
require("../../stores/device.js");
require("../../utils/device/index.js");
if (!Array) {
  const _component_Player = common_vendor.resolveComponent("Player");
  _component_Player();
}
if (!Math) {
  MySwiper();
}
const MySwiper = () => "../../components/MySwiper.js";
const _sfc_main = {
  __name: "home",
  setup(__props) {
    let data = common_vendor.reactive({
      homeBlocks: []
      //首页模块数组
    });
    common_vendor.ref();
    const playStore = stores_player.usePlayerStore();
    let topBanners = common_vendor.computed(() => {
      let list = [];
      let finder = data.homeBlocks.find((block) => block.blockCode = "HOMEPAGE_BANNER");
      if (finder) {
        let {
          banners
        } = finder.extInfo;
        list.push(...banners.map((banner) => banner.pic + `?param=750y250`));
        console.log(list);
      }
      return list;
    });
    let recommendedplayLists = common_vendor.computed(() => {
      let lists = [];
      let finder = data.homeBlocks.find((block) => block.blockCode == "HOMEPAGE_BLOCK_PLAYLIST_RCMD");
      if (finder) {
        let {
          creatives
        } = finder;
        lists = creatives.map((creative) => {
          let id = creative.creativeId;
          let {
            mainTitle,
            image,
            labelTexts
          } = creative.uiElement;
          return {
            id,
            title: mainTitle.title,
            labelTexts,
            image: image.imageUrl + `?param=280y280`
          };
        });
        console.log(lists);
      }
      return lists;
    });
    let featuredSongs = common_vendor.computed(() => {
      let lists = [];
      let finder = data.homeBlocks.find((block) => block.blockCode == "HOMEPAGE_BLOCK_STYLE_RCMD");
      if (finder) {
        let {
          creatives
        } = finder;
        lists = creatives.map((creative) => creative.resources).flat().map((list) => {
          return {
            id: list.resourceId,
            title: list.uiElement.mainTitle.title,
            image: list.uiElement.image.imageUrl + `?param=280y280`,
            artists: list.resourceExtInfo.artists.map((a) => a.name)
          };
        });
      }
      return lists;
    });
    let radarplayLists = common_vendor.computed(() => {
      let lists = [];
      let finder = data.homeBlocks.find((block) => block.blockCode == "HOMEPAGE_BLOCK_MGC_PLAYLIST");
      if (finder) {
        let {
          creatives
        } = finder;
        lists = creatives.map((creative) => {
          return {
            id: creative.creativeId,
            title: creative.uiElement.mainTitle.title,
            image: creative.uiElement.image.imageUrl + `?param=280y280`
          };
        });
      }
      return lists;
    });
    let newSongs = common_vendor.computed(() => {
      let lists = [];
      let finder = data.homeBlocks.find((block) => block.blockCode == "HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG");
      if (finder) {
        let {
          creatives
        } = finder;
        let _creatives = creatives.filter((creative) => creative.creativeType == "NEW_SONG_HOMEPAGE");
        let resources = _creatives.map((_creative) => _creative.resources).flat();
        lists = resources.map((resource) => {
          return {
            id: resource.resourceId,
            image: resource.uiElement.image.imageUrl + `?param=280y280`,
            title: resource.uiElement.mainTitle.title,
            artists: resource.resourceExtInfo.artists.map((a) => a.name)
          };
        });
      }
      console.log(lists);
      return lists;
    });
    let newAlbums = common_vendor.computed(() => {
      let lists = [];
      let finder = data.homeBlocks.find((block) => block.blockCode == "HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG");
      if (finder) {
        let {
          creatives
        } = finder;
        let _creatives = creatives.filter((creative) => creative.creativeType == "NEW_ALBUM_HOMEPAGE");
        console.log(_creatives);
        let resources = _creatives.map((_creative) => _creative.resources).flat();
        lists = resources.map((resource) => {
          return {
            id: resource.resourceId,
            image: resource.uiElement.image.imageUrl + `?param=280y280`,
            title: resource.uiElement.mainTitle.title
          };
        });
      }
      return lists;
    });
    let newDigitalAlbums = common_vendor.computed(() => {
      let lists = [];
      let finder = data.homeBlocks.find((block) => block.blockCode == "HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG");
      if (finder) {
        let {
          creatives
        } = finder;
        let _creatives = creatives.filter((creative) => creative.creativeType == "DIGITAL_ALBUM_HOMEPAGE");
        console.log(_creatives);
        let resources = _creatives.map((_creative) => _creative.resources).flat();
        lists = resources.map((resource) => {
          return {
            id: resource.resourceId,
            image: resource.uiElement.image.imageUrl + `?param=280y280`,
            title: resource.uiElement.mainTitle.title
          };
        });
      }
      return lists;
    });
    function getHomeData() {
      common_vendor.index.request({
        url: "https://music.wtcccpg.asia/homepage/block/page",
        success(res) {
          console.log(res);
          let {
            blocks = []
          } = res.data.data;
          data.homeBlocks.push(...blocks);
        }
      });
    }
    async function getPlayListDetail(e) {
      let {
        id
      } = e.currentTarget.dataset;
      let songList = await utils_request_playList.getPlayListAllSongs(id);
      common_vendor.index.navigateTo({
        url: "/pages/playList/playList",
        success: function(res) {
          res.eventChannel.emit("acceptDataFromPlayListDetail", {
            id,
            //歌单id
            songList
          });
        }
      });
    }
    async function playmusic(e) {
      playStore.updateNowPlayList(e.currentTarget.dataset);
      playStore.getAudio();
      await playStore.getMusic(e.currentTarget.dataset);
      playStore.play();
    }
    common_vendor.onBeforeMount(() => {
      getHomeData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          banners: common_vendor.unref(topBanners),
          nextMargin: 0,
          swiper_it_height: 300
        }),
        b: common_vendor.p({
          banners: common_vendor.unref(recommendedplayLists),
          indicatorDots: false,
          showTitle: true,
          imageSize: 280,
          autoplay: false,
          displayMultipleItems: 2,
          circular: false,
          handleClick: getPlayListDetail
        }),
        c: common_vendor.p({
          banners: common_vendor.unref(featuredSongs),
          indicatorDots: false,
          showTitle: true,
          imageSize: 280,
          autoplay: false,
          displayMultipleItems: 2,
          circular: false,
          handleClick: playmusic
        }),
        d: common_vendor.p({
          banners: common_vendor.unref(radarplayLists),
          indicatorDots: false,
          showTitle: true,
          imageSize: 280,
          autoplay: false,
          displayMultipleItems: 2,
          circular: false,
          handleClick: getPlayListDetail
        }),
        e: common_vendor.p({
          banners: common_vendor.unref(newSongs),
          indicatorDots: false,
          showTitle: true,
          imageSize: 280,
          autoplay: false,
          displayMultipleItems: 2,
          circular: false,
          handleClick: playmusic
        }),
        f: common_vendor.p({
          banners: common_vendor.unref(newAlbums),
          indicatorDots: false,
          showTitle: true,
          imageSize: 280,
          autoplay: false,
          displayMultipleItems: 2,
          circular: false,
          handleClick: getPlayListDetail
        }),
        g: common_vendor.p({
          banners: common_vendor.unref(newDigitalAlbums),
          indicatorDots: false,
          showTitle: true,
          imageSize: 280,
          autoplay: false,
          displayMultipleItems: 2,
          circular: false,
          handleClick: getPlayListDetail
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cpg/Documents/Project/hbuilderx/NCM_lite/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
