import App from './App'
import Player from "./components/Player"
//mixin
import flushPlayer from "./mixin/flushPlayer.js"
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue( {
	...App
} )
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import * as Pinia from 'pinia';
export function createApp() {
	const app = createSSRApp( App )
	app.use( Pinia.createPinia() );
	app.component( 'Player', Player )
	app.mixin( flushPlayer )
	return {
		app,
		Pinia
	}
}
// #endif