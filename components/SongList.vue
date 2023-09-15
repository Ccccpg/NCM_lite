<template>
	<!-- <view class="songList-header">
		<view class="playAll">
			<text v-if="props.playListId!=playerStore.playListId"
				class="iconfont icon-playfill"
				@click="playAll"></text>
			<text v-else-if="props.playListId==playerStore.playListId"
				class="iconfont icon-stop"></text>
		</view>
	</view> -->
	<uni-list :border="false">
		<uni-list-item v-for="(song, index) in dataFormated"
			:key="song.id"
			clickable
			@click="playmusic(song)"
			:title="song.name"
			:note="artists(song)"
			:thumb="song.image"
			thumb-size="lg"
			:border="false"
			ellipsis="2"></uni-list-item>
	</uni-list>
</template>

<script setup>
	import {
		usePlayerStore
	} from "../stores/player"
	import {
		computed,
		onBeforeUnmount
	} from "vue";
	import {
		useDeviceStore
	} from "../stores/device.js"
	import formatSongList from "../utils/format/songList";
	const props = defineProps( {
		data: {
			type: Array,
			default: []
		},
		playListId: {
			type: Number,
			default: -1
		}


	} )
	//store
	const playerStore = usePlayerStore()
	const deviceStore = useDeviceStore()
	let dataFormated = computed( () => {
		let list
		//对歌曲列表进行数据格式化
		list = formatSongList( props.data )
		return list
	} )
	//计算属性
	let windowBottom = computed( () => {
		return deviceStore.windowBottom + 'px'
	} )
	let artists = computed( () =>
		( song ) => {
			let artistArr = song.artists
			return artistArr.join( "," )

		} )
	//点击歌曲播放
	async function playmusic( song ) {
		playerStore.updateNowPlayList( dataFormated.value )
		playerStore.getAudio()
		await playerStore.getMusic( song )
		playerStore.play()

	}

	// function playAll() {
	// 	playerStore.getAudio()
	// 	playerStore.getMusic()
	// 	playerStore.play()
	// }
</script>

<style lang="scss"
	scoped>
	.songList-header {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100rpx;
		padding: 12px 15px;

		.playAll {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100rpx;
			height: 100rpx;
			border-radius: 70rpx;
			background-color: red;
			font-size: 24rpx;
			color: white;
			box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;

			.icon-playfill,
			.icon-stop {
				font-size: 50rpx;
				font-weight: bold;
			}
		}
	}
</style>