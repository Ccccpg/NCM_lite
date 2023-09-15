<template>
	<view class="scroll-container">
		<view class="scroll-text" :style="{ animationDuration: props.duration + 's' }">
			<text class="text">{{ props.text }}</text>
			<!-- <uni-title class="text" :type="props.type" :color="props.color" :title="props.text"></uni-title> -->
		</view>
		<!-- <uni-title v-else class="text" :type="props.type" :color="props.color" :title="props.text"
			align="center"></uni-title> -->
	</view>
</template>

<script setup>
	import {
		computed,
		onMounted,
		ref,
		watch,
		getCurrentInstance,
		nextTick
	} from "vue";
	let props = defineProps({
		type: {
			type: String,
			default: 'h2'
		},
		text: {
			type: String,
			default: '这是一段很长的文字，用于演示滚动效果'
		},
		duration: {
			type: Number,
			default: 10
		},
		width: {
			type: Number,
			default: 100
		},
		color: {
			type: String,
			default: "#000"
		}
	})
	let _this = getCurrentInstance()
	let textWidth = ref();
	let textHeight = ref()
	let containerWidth = computed(() => props.width + 'px')
	let isScroll = computed(() => {
		let _textWidth = parseInt(textWidth.value)
		let _containerWidth = parseInt(containerWidth.value)
		if (_textWidth > _containerWidth) {
			return true
		} else {
			return false
		}
	})
	watch(() => props.text, (newvalue) => {
		// #ifdef MP-WEIXIN
		nextTick(() => {
			wx.createSelectorQuery().in(_this).select('.text').boundingClientRect((rect) => {
				debugger
				textWidth.value = rect.width + 'px'
				textHeight.value = rect.height + 'px'
			}).exec();
		})
		// #endif
		nextTick(() => {
			uni.createSelectorQuery().select('.text').boundingClientRect((rect) => {
				debugger
				textWidth.value = rect.width + 'px'
				textHeight.value = rect.height + 'px'
			}).exec();
		})
	}, {
		deep: true
	})
</script>

<style lang="scss">
	.scroll-container {
		width: v-bind(containerWidth);
		height: auto;
		overflow: hidden;

		.scroll-text {
			animation: scroll-animation linear infinite;

			:deep(.uni-title__base) {
				white-space: nowrap;
			}

			.text {
				white-space: nowrap;
			}
		}

		.uni-title__base {
			white-space: nowrap;
		}
	}



	@keyframes scroll-animation {
		0% {
			transform: translateX(v-bind(containerWidth));
		}

		100% {
			transform: translateX(v-bind("'-'+textWidth"));
		}
	}
</style>