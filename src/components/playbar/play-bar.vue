<template>
  <div class="playBar">
    <div class="btns">
      <prev class="prev" @click.native="playPrevOne()"></prev>
      <play-pause class="playPause"></play-pause>
      <next class="next" @click.native="playNextOne()"></next>
    </div>
    <audio id="audio" @ended="ended()" @timeupdate="getCurrentTime" @canplay="canplay" controls src="https://music.163.com/song/media/outer/url?id=26731532.mp3" ></audio>
    <player class="playerContainer" :currentTime="currentTime" :duration="duration"></player>
    <operation></operation>
    <control></control>

  </div>
</template>

<script>
import prev from "./btns/prev.vue";
import next from "./btns/next.vue";
import playPause from "./btns/play-pause.vue";
import player from "./player/player.vue"
import operation from "./operation/operation.vue"
import control from "./control/control.vue"

export default {
  name: "playBar",
  components: {
    prev,
    next,
    playPause,
    player,
    operation,
    control
  },
  props: {},
  data() {
    return {
      isPlay:this.$store.state.isPlay,
      audio:"",
      currentTime:0,
      duration:0,
      playMode:this.$store.state.playMode,
      songConfig:this.$store.state.songConfig,
      playList:this.$store.state.playList,
      nextSong:this.$store.state.nextSong,
      randomPlayList:[],
      prevSong:this.$store.state.prevSong,
    };
  },
  watch: {
    "$store.state.playMode"(newVal){
      this.playMode = newVal
    },
    "$store.state.songConfig"(newVal){
      this.songConfig = newVal
      document.title="\u25b6 "+this.songConfig.name
    },
    "$store.state.playList"(newVal){
      this.playList = newVal
      this.randomPlayList = this.shuffle(this.playList)
      this.$store.dispatch("updateRandomPlayList",this.randomPlayList)
    },
    "$store.state.nextSong"(newVal){
      this.nextSong = newVal
    },
    "$store.state.prevSong"(newVal){
      this.prevSong = newVal
    },
    "$store.state.isPlay"(newVal){
      document.title="\u25b6 "+this.songConfig.name
      if(newVal == false){
         document.title = '(伪)网易云音乐'
      }
      
    }
  },
  computed: {
  },
  methods: {
    init(){
      this.audio = document.getElementById("audio")
      this.$store.dispatch("setAudio",this.audio)
    },
    ended(){
      if(typeof(this.playList)!=undefined){
        switch(this.playMode){
          case "single":
            this.$store.dispatch("updateMusic",this.songConfig)
            break
          case "circle":
            if(this.playList.length>1){
              this.$store.dispatch("nextSong",this.songConfig).then(()=>{
                this.$store.dispatch("updateMusic",this.nextSong)
              }
              )
              break
            }else{
              this.$store.dispatch("updateMusic",this.songConfig)
              break
            }
            
          case "random":
            if(this.playList.length>1)
            {
              this.playNextOne()
              break
            }else{
              this.$store.dispatch("playMusic",this.songConfig)
              break
            }
            
        }
        
      }else{this.$store.dispatch("updateIsPlay",false)
      this.audio.load()
      document.title='(伪)网易云音乐'}
      
    },
    getCurrentTime(e){
      this.currentTime = e.target.currentTime
      this.$store.dispatch("updateCurrentTime",this.currentTime)
    },
    canplay(e){
      this.duration = e.target.duration
      this.audio.volume = this.$store.getters.getVolume
      this.$store.dispatch("updateVolume",this.audio.volume)
      this.$store.dispatch("updateDuration",this.duration)
    },
    playNextOne(){
      if(this.playList.length>1){
              this.$store.dispatch("nextSong",this.songConfig).then(()=>{
                this.$store.dispatch("playMusic",this.nextSong)
              }
              )
            }else{
              this.$store.dispatch("playMusic",this.songConfig)
            }
    },
    playPrevOne(){
      if(this.playList.length>1){
              this.$store.dispatch("prevSong",this.songConfig).then(()=>{
                this.$store.dispatch("playMusic",this.prevSong)
              }
              )
            }else{
              this.$store.dispatch("playMusic",this.songConfig)
            }
    },
    shuffle(var1){
      let result = JSON.parse(JSON.stringify(var1))
      let index=-1
      let lastIndex = result.length -1
      while(++index<result.length){
        //从0-99中取出个随机数，例如，39
        const rand = Math.floor(Math.random()*(lastIndex-index+1))
        console.log(rand)
        const value = result[rand]
        result[rand] = result[index]
        result[index] = value
        
      }
      return result
    }

  },
  created() {},
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.playBar {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: 1156px;
  height: 53px;
  z-index:1001;
}
.btns {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 53px;
}
.prev {
  height: 28px;
  width: 28px;
  margin-right:10px;
}
.next {
  height: 28px;
  width: 28px;
  margin-left:10px;
}
.playPause {
  height: 36px;
  width: 36px;
}
.playerContainer{

  display:flex;
  flex-direction: row;
  margin-left:30px;
}
#audio{
  display:none;
}
</style>