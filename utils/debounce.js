//防抖
function debounce( callback, delay ) {
	var timer = null
	return function ( ...args ) {
		clearTimeout( timer )
		return new Promise( resolve => {
			timer = setTimeout( async () => {
				let result = await callback( ...args )
				resolve( result )
			}, delay )
		} )

	}
}
export default debounce