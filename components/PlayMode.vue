<template>
	<!-- 播放模式弹窗 -->
	<uni-popup ref="modeRef"
		type="center"
		background-color="rgba(0,0,0,.7)"
		mask-background-color="rgba(0,0,0,0)"
		:animation="true">
		<view class="popup-content">
			<view v-if="!playerStore.mode"
				class="popup-content-item">
				<text class="iconfont icon-danquxunhuan"></text>单曲循环
			</view>
			<view v-else-if="playerStore.mode==1"
				class="popup-content-item">
				<text class="iconfont icon-shunxubofang"></text>顺序播放
			</view>
			<view v-else
				class="popup-content-item">
				<text class="iconfont icon-suijibofang"></text>随机播放
			</view>
		</view>
	</uni-popup>
	<view class="playmode">
		<text v-show="!playerStore.mode"
			class="iconfont icon-danquxunhuan"
			@click="switchMode"></text>
		<text v-show="playerStore.mode==1"
			class="iconfont icon-shunxubofang"
			@click="switchMode"></text>
		<text v-show="playerStore.mode==2"
			class="iconfont icon-suijibofang"
			@click="switchMode"></text>
	</view>
</template>

<script setup>
	import {
		usePlayerStore
	} from "../stores/player.js"
	import {
		computed,
		ref
	} from "vue";
	import debounce from "../utils/debounce.js"
	let playerStore = usePlayerStore()
	let props = defineProps( {
		size: {
			type: Number,
			default: 50
		}
	} )
	let modeRef = ref()
	let size = computed( () => props.size + 'rpx' )
	let d_switchMode = debounce( () => {
		modeRef.value.open()
		setTimeout( () => {
			modeRef.value.close()
		}, 500 )
	}, 500 ) //防抖后的弹窗显示
	//播放模式切换
	function switchMode() {
		playerStore.switchMode()
		d_switchMode()
	}
</script>

<style lang="scss">
	.popup-content {
		width: 200rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: white;
		border-radius: 100rpx;

		.popup-content-item {
			display: flex;
			justify-content: space-evenly;
			font-size: 24rpx;
		}
	}

	.playmode {
		display: flex;
		justify-content: center;
		align-items: center;

		.iconfont {
			font-size: v-bind(size);
		}
	}
</style>