<template>
	<div class="content">
		<MySwiper :banners="topBanners" :nextMargin="0" :swiper_it_height="300"></MySwiper>

		<text class="title">歌单推荐</text>
		<MySwiper :banners="recommendedplayLists" :indicatorDots="false" :showTitle="true" :imageSize="280"
			:autoplay="false" :displayMultipleItems="2" :circular="false" :handleClick="getPlayListDetail"></MySwiper>


		<text class="title">精选歌曲</text>
		<MySwiper :banners="featuredSongs" :indicatorDots="false" :showTitle="true" :imageSize="280" :autoplay="false"
			:displayMultipleItems="2" :circular="false" :handleClick="playmusic"></MySwiper>


		<text class="title">雷达歌单</text>
		<MySwiper :banners="radarplayLists" :indicatorDots="false" :showTitle="true" :imageSize="280" :autoplay="false"
			:displayMultipleItems="2" :circular="false" :handleClick="getPlayListDetail"></MySwiper>


		<text class="title">新歌速递</text>
		<MySwiper :banners="newSongs" :indicatorDots="false" :showTitle="true" :imageSize="280" :autoplay="false"
			:displayMultipleItems="2" :circular="false" :handleClick="playmusic"></MySwiper>


		<text class="title">新专速递</text>
		<MySwiper :banners="newAlbums" :indicatorDots="false" :showTitle="true" :imageSize="280" :autoplay="false"
			:displayMultipleItems="2" :circular="false" :handleClick="getPlayListDetail"></MySwiper>


		<text class="title">最新数字专辑</text>
		<MySwiper :banners="newDigitalAlbums" :indicatorDots="false" :showTitle="true" :imageSize="280"
			:autoplay="false" :displayMultipleItems="2" :circular="false" :handleClick="getPlayListDetail"></MySwiper>
	</div>
	<Player></Player>
</template>

<script setup>
	import MySwiper from '../../components/MySwiper.vue'
	import {
		computed,
		onBeforeMount,
		reactive,
		ref
	} from "vue";
	import {
		getPlayListAllSongs
	} from "../../utils/request/playList.js"
	import {
		usePlayerStore
	} from "../../stores/player.js"

	//主页数据
	let data = reactive({
		homeBlocks: [] //首页模块数组
	})
	let message = ref()
	//store
	const playStore = usePlayerStore()
	//首页置顶轮播图
	let topBanners = computed(() => {
		let list = []
		let finder = data.homeBlocks.find(block => block.blockCode = "HOMEPAGE_BANNER")

		if (finder) {
			let {
				banners
			} = finder.extInfo
			list.push(...banners.map(banner => banner.pic + `?param=750y250`))
			console.log(list);
		}

		return list

	})
	//推荐歌单
	let recommendedplayLists = computed(() => {
		let lists = []
		let finder = data.homeBlocks.find(block => block.blockCode == "HOMEPAGE_BLOCK_PLAYLIST_RCMD")
		if (finder) {
			let {
				creatives
			} = finder
			lists = creatives.map(creative => {
				let id = creative.creativeId //歌单id
				let {
					mainTitle,
					image,
					labelTexts
				} = creative.uiElement
				return {
					id,
					title: mainTitle.title,
					labelTexts,
					image: image.imageUrl + `?param=280y280`
				}
			})
			console.log(lists);
		}
		return lists
	})

	//精选歌曲
	let featuredSongs = computed(() => {
		let lists = []
		let finder = data.homeBlocks.find(block => block.blockCode == 'HOMEPAGE_BLOCK_STYLE_RCMD')
		if (finder) {
			let {
				creatives
			} = finder
			lists = creatives.map(creative => creative.resources)
				.flat()
				.map(list => {
					return {
						id: list.resourceId,
						title: list.uiElement.mainTitle.title,
						image: list.uiElement.image.imageUrl + `?param=280y280`,
						artists: list.resourceExtInfo.artists.map(a => a.name)
					}
				})
		}
		return lists
	})
	//雷达歌单
	let radarplayLists = computed(() => {
		let lists = []
		let finder = data.homeBlocks.find(block => block.blockCode == 'HOMEPAGE_BLOCK_MGC_PLAYLIST')
		if (finder) {
			let {
				creatives
			} = finder
			lists = creatives.map(creative => {
				return {
					id: creative.creativeId,
					title: creative.uiElement.mainTitle.title,
					image: creative.uiElement.image.imageUrl + `?param=280y280`
				}
			})
		}
		return lists
	})
	//新歌
	let newSongs = computed(() => {
		let lists = []
		let finder = data.homeBlocks.find(block => block.blockCode == 'HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG')
		if (finder) {
			let {
				creatives
			} = finder
			let _creatives = creatives.filter(creative => creative.creativeType == 'NEW_SONG_HOMEPAGE')
			let resources = _creatives.map(_creative => _creative.resources)
				.flat()
			lists = resources.map(resource => {
				return {
					id: resource.resourceId,
					image: resource.uiElement.image.imageUrl + `?param=280y280`,
					title: resource.uiElement.mainTitle.title,
					artists: resource.resourceExtInfo.artists.map(a => a.name)
				}
			})
		}
		console.log(lists);
		return lists
	})
	//新专辑
	let newAlbums = computed(() => {
		let lists = []
		let finder = data.homeBlocks.find(block => block.blockCode == 'HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG')
		if (finder) {
			let {
				creatives
			} = finder
			let _creatives = creatives.filter(creative => creative.creativeType == 'NEW_ALBUM_HOMEPAGE')
			console.log(_creatives);
			let resources = _creatives.map(_creative => _creative.resources)
				.flat()
			lists = resources.map(resource => {
				return {
					id: resource.resourceId,
					image: resource.uiElement.image.imageUrl + `?param=280y280`,
					title: resource.uiElement.mainTitle.title
				}
			})
		}

		return lists
	})
	//新数字专辑
	let newDigitalAlbums = computed(() => {
		let lists = []
		let finder = data.homeBlocks.find(block => block.blockCode == 'HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG')
		if (finder) {
			let {
				creatives
			} = finder
			let _creatives = creatives.filter(creative => creative.creativeType == 'DIGITAL_ALBUM_HOMEPAGE')
			console.log(_creatives);
			let resources = _creatives.map(_creative => _creative.resources)
				.flat()
			lists = resources.map(resource => {
				return {
					id: resource.resourceId,
					image: resource.uiElement.image.imageUrl + `?param=280y280`,
					title: resource.uiElement.mainTitle.title
				}
			})
		}

		return lists
	})

	function getHomeData() {
		uni.request({
			url: 'https://music.wtcccpg.asia/homepage/block/page',
			success(res) {
				console.log(res);
				let {
					blocks = []
				} = res.data.data
				data.homeBlocks.push(...blocks)
			}
		})
	}

	async function getPlayListDetail(e) {
		let {
			id
		} = e.currentTarget.dataset
		let songList = await getPlayListAllSongs(id)
		uni.navigateTo({
			url: '/pages/playList/playList',
			success: function(res) {
				// 通过eventChannel向被打开页面传送数据
				res.eventChannel.emit('acceptDataFromPlayListDetail', {
					id, //歌单id
					songList
				})
			}
		});
	}

	async function playmusic(e) {
		playStore.updateNowPlayList(e.currentTarget.dataset)
		playStore.getAudio()
		await playStore.getMusic(e.currentTarget.dataset)
		playStore.play()


	}

	onBeforeMount(() => {
		getHomeData()
	})
</script>

<style>
	.player {
		position: fixed;
		bottom: 100rpx
	}
</style>