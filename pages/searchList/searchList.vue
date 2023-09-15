<template>
	<!-- <view class="title">
		{{data.keyword}}
	</view> -->
	<SongList :data="data.songList"></SongList>
	<Player></Player>
</template>

<script setup>
	import {
		onBeforeMount,
		getCurrentInstance,
		reactive
	} from "vue";
	import SongList from "../../components/SongList.vue"
	import Player from "../../components/Player.vue"
	let data = reactive( {
		keyword: '',
		songList: [],
		singerList: [],
		albumList: []
	} )
	onBeforeMount( () => {
		const instance = getCurrentInstance()
			.proxy
		const eventChannel = instance.getOpenerEventChannel();
		//获取歌单值
		eventChannel.on( 'acceptDataFromSearch', function ( _data ) {
			let songList = _data[ 0 ]
			data.songList.splice( 0, data.songList.length, ...
				songList )
		} )
	} )
</script>

<style lang="scss">

</style>