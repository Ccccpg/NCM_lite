//获取歌单所有歌曲
function getPlayListAllSongs( id, offset ) {
	return new Promise( ( resolve, reject ) => {
		uni.request( {
			method: 'get',
			url: `https://music.wtcccpg.asia/playlist/track/all?id=${id}`,
			success: ( res ) => {
				resolve( res.data.songs )
				// appData.playList.id = id
			},
			fail: ( err ) => {
				reject( err )
			}
		} )
	} )
}
export {
	getPlayListAllSongs
}