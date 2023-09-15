<template>
	<view class="like">
		<text class="iconfont icon-like"></text>
	</view>
</template>

<script setup>
	import {
		computed
	} from "vue";
	let props = defineProps( {
		size: {
			type: Number,
			default: 44
		}
	} )
	let size = computed( () => props.size + 'rpx' )
</script>

<style lang="scss">
	.icon-like {
		font-size: v-bind(size);
		font-weight: bold;
	}
</style>