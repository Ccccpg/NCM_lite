import {
	defineStore
} from 'pinia';
import formatSongList from '../utils/format/songList.js';
import {
	getSongUrl
} from "../utils/request/song.js"
import formatTime from "../utils/format/time.js"
import isImageDark from "../utils/handleImage.js"
//音频对象
let audio
export const usePlayerStore = defineStore( 'player', {

	state: () => {
		return {
			al: "", //专辑
			ar: [], //艺人
			id: 0, //歌曲id
			fee: -1, //是否会员
			mv: 0, //是否有mv
			dt: 0, //歌曲时长
			name: "", //歌曲名称
			playing: false,
			songUrl: "", //歌曲url
			image: "", //专辑封面
			artists: [], //艺人数组
			mode: 0, //播放模式:0：单曲循环、1：顺序播放、2：随机播放,
			nowPlayList: [], //当前播放列表
			index: 0, //当前播放列表的歌曲下标
			playListId: -1, //当前歌单id
			currentTime: 0, //当前已播放的秒数
			brightness: 'dark' //专辑封面暗亮
		}

	},

	getters: {
		//艺人格式化
		artistsFormated( state ) {
			if ( Array.isArray( state.artists ) ) {
				return state.artists.join( ',' )
			} else {
				return state.artists
			}
		},
		//进度百分比
		percent( state ) {
			return Number( ( state.currentTime / state.dt )
				.toFixed( 4 ) )
		},
		//总时长
		durationFormated( state ) {
			if ( state.dt ) {
				return formatTime( state.dt )
			}
			return '00:00'
		},
		//当前播放时长
		currentTimeFormated( state ) {
			if ( state.currentTime ) {
				return formatTime( state.currentTime )
			}
			return '00:00'
		}

	},
	actions: {
		//1、获取播放列表
		//2、创建audio
		//3、获取指定歌曲信息
		//4、根据模式播放

		getAudio() {
			if ( audio ) {
				audio.destroy()
			}
			audio = uni.createInnerAudioContext()
			audio.onTimeUpdate( () => {
				this.currentTime = audio.currentTime * 1000
			} )

			audio.onCanplay( () => {
				//解决垃圾微信在onCanPlay获取不到audio时长的bug
				setTimeout( () => {
					this.dt = audio.duration * 1000
				}, 1000 )
			} )
			audio.autoplay = true
		},
		playAudio() {
			// debugger
			if ( audio && !this.playing ) {
				audio.play()
				this.playing = true
			}
		},
		pauseAudio() {
			audio.pause()
			this.playing = false
		},
		async getMusic( data ) {
			let {
				id,
				image,
				name,
				artists
			} = data
			let songUrl = await getSongUrl( id )
			this.songUrl = songUrl
			this.image = image
			this.name = name
			this.id = id
			this.artists.splice( 0, this.artists.length, ...artists )
			audio.src = this.songUrl
		},
		//单曲循环
		playLoop() {

			console.log( "重播" );
			audio.currentTime = 0
			this.playing = false
			this.play()


		},
		//顺序播放
		playInOrder() {
			let findIndex = this.nowPlayList.findIndex( song => song.id == this.id )
			this.index = findIndex + 1

			if ( this.index == this.nowPlayList.length ) {
				audio = null
				return console.log( "播放结束" );
			}
			this.getAudio()
			this.getMusic( this.nowPlayList[ this.index ] )
			this.playing = false
			this.play()


		},
		//随机播放
		playRandom() {

		},
		switchMode() {
			if ( this.mode == 2 ) {
				this.mode = 0
			} else {
				this.mode += 1
			}
		},
		updateNowPlayList( songList ) {
			if ( !Array.isArray( songList ) ) {
				songList = [ songList ]
			}
			this.nowPlayList.splice( 0, this.nowPlayList.length, ...songList )
		},
		//根据模式进行播放
		playNext() {

			switch ( this.mode ) {
				case 0:
					this.playLoop()
					break
				case 1:
					this.playInOrder()
					break
				case 2:
					this.playRandom()
				default:
					break

			}

			this.playAudio()
		},
		play() {
			this.playAudio()
			audio.onEnded( () => {
				this.playing = false
				this.playNext()
			} )
		},
		//更新播放进度
		updateCurrentTime( time ) {
			this.currentTime = time
			audio.seek( time / 1000 )
		},
		async updateImageBrightness() {
			this.brightness = await isImageDark( this.image, ...arguments )
		}

	}
} )