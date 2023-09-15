import {
	useDeviceStore
} from "../stores/device.js"
export default {
	onShow() {
		setTimeout( () => {
			let deviceStore = useDeviceStore()
			deviceStore.getDeciveInfo()
		} )
	}
}