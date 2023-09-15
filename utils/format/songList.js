function formatSongList( data ) {
	let list
	list = data.map( ( song ) => {
		let {
			al, //专辑
			ar, //艺人
			id, //歌曲id
			fee, //是否会员
			mv, //是否有mv
			dt, //歌曲时长
			name //歌曲名称
		} = song
		let {
			picUrl //专辑图片
		} = al
		let artists = ar.map( a => a.name ) //艺人
		return {
			id,
			image: picUrl + '?param=100y100',
			fee,
			mv,
			dt,
			name,
			artists
		}
	} )
	return list
}
export default formatSongList