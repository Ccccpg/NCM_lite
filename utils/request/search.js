function getSearchResult( keyword, type = 1 ) {
	return new Promise( ( resolve, reject ) => {
		uni.request( {
			method: 'get',
			url: `https://music.wtcccpg.asia/cloudsearch?keywords=${keyword}&type=${type}`,
			success: ( res ) => {
				resolve( res.data.result )
			},
			fail: ( err ) => {
				reject( err )
			}

		} )
	} )

}

function getHotSearch() {
	return new Promise( ( resolve, reject ) => {
		uni.request( {
			method: 'get',
			url: 'https://music.wtcccpg.asia/search/hot/detail',
			success( res ) {
				resolve( res.data.data )
			},
			fail( err ) {
				reject( err )
			}
		} )


	} )
}

function getSearchSuggestions( keyword ) {
	return new Promise( ( resolve, reject ) => {
		uni.request( {
			method: 'get',
			url: `https://music.wtcccpg.asia/search/suggest?keywords=${keyword}&type=mobile`,
			success( res ) {
				let keywordList
				if ( res && res.data && res.data.result && res.data.result.allMatch ) {
					keywordList = res.data.result.allMatch
				} else {
					keywordList = []
				}
				resolve( keywordList )
			},
			fail( err ) {
				reject( err )
			}
		} )
	} )
}
export {
	getSearchResult,
	getHotSearch,
	getSearchSuggestions
}