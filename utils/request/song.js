//获取歌曲详情
function getSongUrl( id ) {
	return new Promise( ( resolve, reject ) => {
		wx.request( {
			method: 'get',
			url: `https://music.wtcccpg.asia/song/url?id=${id}`,
			success: ( res ) => {
				resolve( res.data.data[ 0 ].url )
			},
			fail: ( err ) => {
				reject( err )
			}
		} )
	} )
}
export {
	getSongUrl
}