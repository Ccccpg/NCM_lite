<template>

	<swiper :indicator-dots="props.indicatorDots"
		:autoplay="props.autoplay"
		:interval="props.interval"
		:duration="props.duration"
		:next-margin="props.nextMargin+'rpx'"
		:circular="props.circular"
		:display-multiple-items="props.displayMultipleItems"
		:style="{height: props.swiperHeight+'rpx'}">
		<!-- 是否需要显示标题 -->
		<block v-if="!props.showTitle">
			<swiper-item class="swiper-item_1"
				v-for="(item,index) in props.banners"
				:key="index"
				:data-id="item.id"
				@click="handleClick">
				<image :src="item"
					mode="aspectFit"
					lazy-load="true" />
			</swiper-item>
		</block>
		<block v-else>
			<swiper-item class="swiper-item_2"
				v-for="(item,index) in props.banners"
				:key="index"
				:data-id="item.id"
				:data-name="item.title"
				:data-image="item.image"
				:data-artists="item.artists"
				@click="handleClick">
				<image :src="item.image"
					:style="{width: imageSize+'rpx',height: imageSize+'rpx'}"
					:lazy-load="true" />
				<view class="title">{{item.title}}</view>
			</swiper-item>
		</block>


	</swiper>
</template>

<script setup>
	import {
		ref,
		watch
	} from "vue";
	let props = defineProps( {

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
			default: 2000
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
				console.log( "点击了" );
			}
		}

	} )
	// watch( props, ( newvalue ) => {
	// 	console.log( newvalue );
	// } )
</script>

<style lang="scss"
	scoped>
	swiper {

		.swiper-item_1 {
			image {
				width: 100%;
				height: 100%;
			}
		}

		.swiper-item_2 {
			height: 400rpx !important;
			padding: 0 10rpx;

			image {
				width: 300rpx;
				height: 300rpx;
				box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
			}

			.title {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
		}



	}
</style>