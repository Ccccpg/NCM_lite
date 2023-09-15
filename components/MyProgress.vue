<template>
	<view class="my-progress">
		<movable-area class="movable-area">
			<movable-view :x="x"
				direction="horizontal"
				class="movable-view"
				@change="getBallX"
				@touchend="touchBallEnd"
				:damping="100">
			</movable-view>
			<view class="sub-line">
				<view class="gone"
					@touchstart="jumpTo"></view>
				<view class="remain"
					@touchstart="jumpTo"></view>
			</view>
		</movable-area>
	</view>


</template>

<script setup>
	import {
		usePlayerStore
	} from "../stores/player.js"
	import {
		computed,
		watch,
		ref
	} from "vue";
	import debounce from "../utils/debounce.js"
	import {
		useDeviceStore
	} from "../stores/device.js"
	let props = defineProps( {
		background: {
			type: String,
			default: 'rgba(255,255,255,0.7)'
		},

		width: {
			type: Number,
			default: 710
		},
		ballSize: {
			type: Number,
			default: 32
		}
	} )
	let timer
	let playerStore = usePlayerStore()
	let deviceStore = useDeviceStore()
	let moving = ref( false ) //判断是不是正在拖拽进度条
	let goneLine = computed( () => ( ( props.width - props.ballSize ) * playerStore.percent ) + 'rpx' ) //进度已过的值
	let width = computed( () => props.width + 'rpx' ) //movable-area的总宽
	let ballSize = computed( () => props.ballSize + 'rpx' ) //控制器的宽度
	let subLineWidth = computed( () => ( props.width - props.ballSize ) + 'rpx' ) //副线的宽度
	let pxToSecond = computed( () => {
		let allsecondes = playerStore.dt / 1000
		let goneLinePx = ( props.width - props.ballSize ) * deviceStore.pxTorpx
		return allsecondes / goneLinePx
	} ) //1px等价多少秒
	let x = computed( () => {
		if ( !moving.value ) {
			return ( ( props.width - props.ballSize ) * deviceStore.pxTorpx ) * playerStore.percent
		} else {
			return _x.value
		}
	} ) //真正的进度
	let _x = ref( 0 ) //拖拽的进度
	//进度条移动时（可能是自动前进/拖拽）
	function getBallX( e ) {
		let {
			x,
			source
		} = e.detail
		if ( source == 'touch' ) {
			moving.value = true
			_x.value = x
		}

	}
	//进度条拖拽结束
	function touchBallEnd() {
		let newTime = _x.value * pxToSecond.value * 1000
		moving.value = false
		playerStore.updateCurrentTime( newTime )

	}
	//进度条点击跳转
	function jumpTo( e ) {
		let clientTosubLineMargin = ( ( 750 - props.width ) + ( props.ballSize ) ) / 2 //客户端相对于subline的距离
		let {
			clientX
		} = e.changedTouches[ 0 ]
		let touchX = clientX - clientTosubLineMargin * deviceStore.pxTorpx //触碰点相对于subline的x值
		let newTime = touchX * pxToSecond.value * 1000
		playerStore.updateCurrentTime( newTime )
	}
</script>

<style lang="scss">
	.touch-area {
		height: 40px;
	}

	.my-progress {
		width: v-bind(width);
		margin-bottom: 10rpx;

		.movable-area {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: v-bind(ballSize);

			.movable-view {
				width: v-bind(ballSize);
				height: v-bind(ballSize);
				border-radius: 50%;
				background-color: rgba(0, 0, 0, .5);
			}

			.sub-line {
				display: flex;
				width: v-bind(subLineWidth);

				.gone {
					width: v-bind(goneLine);
					height: 5px;
					background-color: black;
				}

				.remain {
					flex: 1;
					height: 5px;
					background-color: white;
				}
			}

		}


	}
</style>