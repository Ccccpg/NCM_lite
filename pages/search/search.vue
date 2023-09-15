<template>
	<Search :handleConfirm="navigateTo"></Search>
	<!-- 热搜列表 -->
	<uni-list class="hotSearch"
		:border="false">
		<uni-list-item v-for="item in data.hotSearch"
			:key="item.searchWord"
			:title="item.searchWord"
			:border="false"
			:note="item.content">
			<template v-slot:footer>
				<image class="right-image"
					:src="item.iconUrl"
					mode="widthFix"></image>
			</template>
		</uni-list-item>
	</uni-list>

	<Player></Player>
</template>

<script setup>
	import {
		reactive
	} from "vue";
	import {
		getHotSearch
	} from "../../utils/request/search.js"
	import Search from "../../components/Search.vue"
	let data = reactive( {
		hotSearch: []
	} )

	//方法
	//获取热搜
	async function _getHotSearch() {
		data.hotSearch.splice( 0, data.hotSearch.length, ...await getHotSearch() )
	}
	_getHotSearch()
	//跳转到搜索列表
	function navigateTo() {
		let args = arguments
		console.log( args );
		uni.navigateTo( {
			url: '/pages/searchList/searchList',
			success: function ( res ) {
				// 通过eventChannel向被打开页面传送数据
				res.eventChannel.emit( 'acceptDataFromSearch', args )
			}
		} )
	}
</script>

<style lang="scss">
	.hotSearch {
		position: relative;
		top: 100rpx;
	}

	.right-image {
		width: 30px;
		height: 30px;
	}
</style>