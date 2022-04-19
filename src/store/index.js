import Vue from 'vue'
import Vuex from 'vuex'

// import pageConfig from '@/page.json'
import songConfig from '@/song.json'
// import lyric from '@/lyric.json'
import { insertPlayList, deleteASongOfPlayList, getNextSong, getPrevSong, concatPlayList } from './util.js'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        audio: {},
        isPlay: false,
        currentTime: Number,
        duration: Number,
        lyric: "",
        volume: 0.6,
        playMode: "",
        songConfig: songConfig,
        nextSong: {},
        prevSong: {},
        playList: [songConfig],
        randomPlayList: [],
        isShowList: false,

    },
    getters: {
        getPageConfig(state) {
            return state.pageConfig
        },
        getPlayList(state) {
            return state.playList
        },
        getIsPlay(state) {
            return state.isPlay
        },
        getSongConfig(state) {
            return state.songConfig
        },
        getVolume(state) {
            return state.volume
        },
        getPlayMode(state) {
            return state.playMode
        }
    },
    mutations: {
        SETAUDIO(state, audio) {
            state.audio = audio
        },
        PLAY(state) {
            state.audio.play()
        },
        PAUSE(state) {
            state.audio.pause()
        },
        UPDATEISPLAY(state, isDoing) {
            state.isPlay = isDoing
        },
        UPDATECURRENTTIME(state, currentTime) {
            state.currentTime = currentTime
        },
        UPDATEDURATION(state, duration) {
            state.duration = duration
        },
        UPDATEAUDIO(state, currentTime) {
            state.audio.currentTime = currentTime
        },
        UPDATEVOLUME(state, volume) {
            state.volume = volume
        },
        UPDATEAUDIOVOLUME(state, volume) {
            state.audio.volume = volume
        },
        UPDATEMUSIC(state, songConfig) {
            state.audio.src = 'https://music.163.com/song/media/outer/url?id=' + songConfig.id + '.mp3 '
            state.audio.load()
            state.songConfig = songConfig
            state.audio.play()
            state.isPlay = true
            state.playList = insertPlayList(state.playList, songConfig)
        },
        UPDATEPLAYMODE(state, newMode) {
            state.playMode = newMode
        },
        UPDATERANDOMPLAYLIST(state, randomPL) {
            state.randomPlayList = randomPL
        },
        GETNEXTSONG(state, oldSong) {
            if (state.playMode != "random") {
                state.nextSong = getNextSong(state.playList, oldSong)
            } else {
                state.nextSong = getNextSong(state.randomPlayList, oldSong)

            }
        },
        GETPREVSONG(state, oldSong) {
            if (state.playMode != "random") {
                state.prevSong = getPrevSong(state.playList, oldSong)
            } else {
                state.prevSong = getPrevSong(state.randomPlayList, oldSong)
            }
        },
        PLAYMUSIC(state, songConfig) {
            state.audio.src = 'https://music.163.com/song/media/outer/url?id=' + songConfig.id + '.mp3 '
            state.audio.load()
            state.songConfig = songConfig
            state.audio.play()
            state.isPlay = true
        },
        CLEARPLAYLIST(state) {
            state.playList = []
        },
        CLEARTHISSONG(state, songId) {
            state.playList = deleteASongOfPlayList(state.playList, songId)
        },
        PLUSPLAYLIST(state, playList) {
            state.playList = playList
        },
        INSERTPLAYLIST(state, playList) {
            let tempArray = concatPlayList(state.playList, playList)
            state.playList = tempArray
        }
    },
    actions: {
        setAudio(context, audio) {
            context.commit("SETAUDIO", audio)
        },
        play(context, isPlay) {
            context.commit("PLAY")
            context.commit("UPDATEISPLAY", isPlay)
        },
        pause(context, isPlay) {
            context.commit("PAUSE")
            context.commit("UPDATEISPLAY", isPlay)
        },
        updateIsPlay(context, isDoing) {
            context.commit("UPDATEISPLAY", isDoing)
        },
        updateCurrentTime(context, currentTime) {
            context.commit("UPDATECURRENTTIME", currentTime)
        },
        updateDuration(context, duration) {
            context.commit("UPDATEDURATION", duration)
        },
        updateAudio(context, currentTime) {
            context.commit("UPDATEAUDIO", currentTime)
        },
        updateVolume(context, volume) {
            context.commit("UPDATEVOLUME", volume)
        },
        updateAudioVolume(context, volume) {
            context.commit("UPDATEAUDIOVOLUME", volume)
        },
        updateMusic(context, songConfig) {
            context.commit("UPDATEMUSIC", songConfig)
        },
        clearPlayList(context) {
            context.commit("CLEARPLAYLIST")
        },
        clearThisSong(context, songId) {
            context.commit("CLEARTHISSONG", songId)
        },
        updatePlayMode(context, newMode) {
            context.commit("UPDATEPLAYMODE", newMode)
        },
        nextSong(context, oldSong) {
            context.commit("GETNEXTSONG", oldSong)
        },
        prevSong(context, oldSong) {
            context.commit("GETPREVSONG", oldSong)
        },
        randomPlay(context, playingSong) {
            context.commit("RANDOMPLAY", playingSong)
        },
        updateRandomPlayList(context, randomPL) {
            context.commit("UPDATERANDOMPLAYLIST", randomPL)
        },
        playMusic(context, songConfig) {
            context.commit("PLAYMUSIC", songConfig)
        },
        plusPlayList(context, playList) {
            context.commit("PLUSPLAYLIST", playList)
        },
        insertPlayList(context, playList) {
            context.commit("INSERTPLAYLIST", playList)
        }
    },
    modules: {},
})