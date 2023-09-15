<template>
	<view class="play">
		<text v-if="!playerStore.playing"
			class="iconfont icon-playfill"
			@click="playerStore.play"></text>
		<text v-else
			class="iconfont icon-stop"
			@click="playerStore.pauseAudio"></text>
	</view>
</template>

<script setup>
	import {
		usePlayerStore
	} from "../stores/player.js"
	import {
		computed
	} from "vue";
	let playerStore = usePlayerStore()
	let props = defineProps( {
		size: {
			type: Number,
			default: 50
		}
	} )
	let size = computed( () => props.size + 'rpx' )
</script>

<style lang="scss">
	.play {
		display: flex;
		justify-content: center;
		align-items: center;

		.iconfont {
			font-size: v-bind(size);
		}
	}
</style>