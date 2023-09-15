<template>
	<view class="search">
		<uni-search-bar radius="0"
			placeholder="搜索"
			clearButton="auto"
			cancelButton="none"
			@confirm="confirmKeyword(data.keyword)"
			v-model="data.keyword" />
		<!-- 搜索建议弹出层 -->
		<uni-transition mode-class="fade"
			:show="data.searchSuggestionList.length!=0">
			<view class="search-suggestion">
				<uni-list :border="false"
					class="_search-suggestion">
					<uni-list-item v-for="suggestion in data.searchSuggestionList"
						:key="suggestion.keyword"
						:title="suggestion.keyword"
						:border="false"
						clickable="true"
						@click="confirmKeyword(suggestion.keyword)"></uni-list-item>
				</uni-list>
			</view>
		</uni-transition>

	</view>
	<view class="magisk"
		v-show="data.searchSuggestionList.length!=0"></view>
</template>

<script setup>
	import {
		reactive,
		ref,
		watch
	} from "vue";
	import {
		getSearchResult,
		getSearchSuggestions
	} from "../utils/request/search.js"
	import debounce from "../utils/debounce.js"
	let props = defineProps( {
		handleConfirm: {
			type: Function,
			default: function () {}
		}
	} )
	let data = reactive( {
		keyword: "",
		searchSuggestionList: []
	} )
	let _getSuggestions = debounce( getSearchSuggestions, 200 )
	//方法
	//确认关键字并进行搜索
	async function confirmKeyword( keyword ) {
		// data.keyword = keyword
		let songList = ( await getSearchResult( keyword ) )
			.songs
		console.log( props.handleConfirm );
		props.handleConfirm( songList )
	}

	//监听
	watch( () => data.keyword, async ( newvalue ) => {
		let suggestionsList = await _getSuggestions( newvalue )
		data.searchSuggestionList.splice( 0, data.searchSuggestionList.length, ...suggestionsList )
	}, {
		deep: true
	} )
</script>

<style lang="scss">
	.search {
		position: fixed;
		width: 750rpx;
		z-index: 100;

		.search-suggestion {
			padding: 0 10px;

			._search-suggestion {
				padding-bottom: 0 !important;
			}
		}

	}


	.magisk {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		width: 750rpx;
		height: 100vh;
		background-color: #3a3a3a;
		opacity: 0.5;
	}
</style>