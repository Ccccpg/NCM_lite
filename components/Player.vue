<template>
	<!-- 播放底部组件 -->
	<view class="player" v-if="playerStore.name">
		<image :src="playerStore.image" mode="aspectFill" lazy-load="true" @click="openPlayerDetail"></image>
		<view class="songMsg">
			<text class="songName">{{playerStore.name}}</text>
			<text class="artists">{{playerStore.artistsFormated}}</text>
		</view>
		<view class="operation">
			<!-- 播放模式 -->
			<PlayMode></PlayMode>
			<!-- 加入我的喜欢 -->

			<!-- 播放暂停 -->
			<Play></Play>

		</view>
	</view>


	<!-- 播放组件的弹窗详情 -->
	<uni-popup ref="playerDetailPopup" type="bottom">
		<view :class="[playerStore.brightness=='dark'?fontLight:fontDark,ccc]">
			<view class="playerDetail"
				:style="{ backgroundImage: `url(${playerStore.image})`, backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center'}">
			</view>
			<view class="magisk"></view>
			<view class="main">
				<text @click="closePlayerDetail"
					:class="[playerStore.brightness=='dark'?fontLight:fontDark,downClass]"></text>

				<view class="songMsg">
					<!-- <canvas canvas-id="image" class="image"></canvas> -->
					<image :src="imagePlayerDetail" class="image"></image>
					<uni-title class="songName" type="h1" :title="playerStore.name" :color="uniTitleColor"></uni-title>
					<MyTitle type="h3" :text="artists"></MyTitle>
				</view>
				<view class="operation">
					<view class="musicplayer">
						<Play :size="100"></Play>
						<PlayMode :size="60"></PlayMode>
					</view>
					<view class="progress-time">
						<uni-title type="h3" :title="playerStore.currentTimeFormated"
							:color="uniTitleColor"></uni-title>
					</view>
					<MyProgress></MyProgress>
				</view>

			</view>
		</view>
	</uni-popup>

</template>

<script setup>
	import {
		useDeviceStore
	} from "../stores/device.js"
	import {
		usePlayerStore
	} from "../stores/player"
	import {
		computed,
		nextTick,
		onUpdated,
		ref,
		getCurrentInstance
	} from "vue"

	import PlayMode from "../components/PlayMode.vue"
	import Play from "../components/Play.vue"
	import MyProgress from "../components/MyProgress.vue"
	import MyTitle from "../components/MyTitle.vue"
	let _this = getCurrentInstance()
	let fontLight = ref('font-light')
	let fontDark = ref('font-dark')
	let ccc = ref('ccc')
	let downClass = ref('iconfont icon-pulldown')
	let showPlayerDetail = ref(false)
	//store
	const deviceStore = useDeviceStore()
	const playerStore = usePlayerStore()


	//计算属性
	let artists = computed(() => playerStore.artists.join('、'))
	let windowBottom = computed(() => deviceStore.windowBottom + 'px')
	let windowHeight = computed(() => deviceStore.windowHeight + 'px')
	let imagePlayerDetail = computed(() => {
		if (playerStore.image != '') {
			return playerStore.image.replace(/\d+y\d+/, '600y600')
		}
		return ''

	})
	let uniTitleColor = computed(() => {
		if (playerStore.brightness == 'dark') {
			return 'white'
		} else {
			return '#333'
		}
	})
	let playerDetailPopup = ref()


	function openPlayerDetail() {
		// playerStore.updateImageBrightness('image', _this, 600, 600)
		playerDetailPopup.value.open()


	}

	function closePlayerDetail() {
		playerDetailPopup.value.close()

	}
</script>

<style lang="scss">
	.player {
		position: fixed;
		bottom: v-bind(windowBottom);
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 100rpx;
		background-color: white;
		box-sizing: border-box;
		box-shadow: rgba(100, 100, 111, 0.2) 0px -7px 29px 0px;


		image {
			width: 100rpx;
			height: 100rpx;
		}

		.songMsg {
			width: 400rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 0 10rpx;

			.songName {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-weight: bold;
				font-size: 28rpx;
			}

			.artists {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 24rpx
			}
		}

		.operation {
			display: flex;
			width: 200rpx;
			justify-content: space-evenly;
			align-items: center;
		}

	}

	.ccc {
		height: v-bind(windowHeight);

		.playerDetail {
			position: fixed;
			z-index: 0;
			bottom: v-bind(windowBottom);
			width: 750rpx;
			height: v-bind(windowHeight);


		}

		.magisk {
			position: fixed;
			z-index: 1;
			bottom: v-bind(windowBottom);
			width: 750rpx;
			height: v-bind(windowHeight);
			backdrop-filter: blur(80px);
		}

		.main {
			position: fixed;
			z-index: 2;
			bottom: v-bind(windowBottom);
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			align-items: center;
			width: 750rpx;
			height: v-bind(windowHeight);

			.songMsg {
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				align-items: center;
				width: 100%;
				height: 800rpx;

				.image {
					// visibility: hidden;
					width: 600rpx;
					height: 600rpx;
					box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
				}
			}


			.icon-pulldown {
				font-size: 100rpx;
			}

			.operation {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				height: 300rpx;

				.musicplayer {
					display: flex;
					justify-content: space-evenly;
					align-items: center;
					width: 100%;


				}

				.progress-time {
					width: 80%;
				}

			}

		}
	}

	.font-light {
		color: white;
		text-shadow: rgba(17, 17, 26, 0.1) 5px 3px 10px, rgba(17, 17, 26, 0.1) 5px 3px 10px, rgba(17, 17, 26, 0.1) 0px 5px 10px;
	}

	.font-dark {
		color: '#333';
		text-shadow: rgba(17, 17, 26, 0.1) 5px 3px 10px, rgba(17, 17, 26, 0.1) 5px 3px 10px, rgba(17, 17, 26, 0.1) 0px 5px 10px;
	}
</style>