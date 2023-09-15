function getDeviceInfo() {
	return new Promise( ( resolve, reject ) => {
		uni.getSystemInfo( {
			success( deviceInfo ) {
				resolve( deviceInfo )
			}
		} )
	} )

}
export {
	getDeviceInfo
}