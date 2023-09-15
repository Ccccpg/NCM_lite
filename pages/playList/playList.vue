<template>
	<SongList :data="data.songList"
		:playListId="data.playListId">
	</SongList>
	<Player></Player>

</template>

<script setup>
	import {
		computed,
		onBeforeMount,
		getCurrentInstance,
		reactive,
		onBeforeUnmount
	} from "vue"
	import SongList from "../../components/SongList.vue"
	let data = reactive( {
		playListId: -1,
		songList: []
	} )

	onBeforeMount( () => {
		const instance = getCurrentInstance()
			.proxy
		const eventChannel = instance.getOpenerEventChannel();
		//获取歌单值
		eventChannel.on( 'acceptDataFromPlayListDetail', function ( _data ) {
			let {
				id, //歌单id
				songList //歌单歌曲数组
			} = _data
			data.playListId = Number( id )
			data.songList.push( ...songList )
		} )
	} )
</script>

<style lang="scss">
</style>