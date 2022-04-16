<template>
  <div>
    <div>
      <img :src="songImg" @click="goTo()" class="songImg" alt="img of song" />
    </div>
    <div class="player">
      <div class="songInfo">
        <div class="songName" @click="goTo()">{{ songConfig.name }}</div>
        <div class="flex-row nameWrap"><span v-for="(item, index) in arList" :key="index" class="artist" >
              <span class="artistName">{{ item.name }}</span>
              <span class="spilt" :style="index == arList.length - 1 ? 'display:none' : ''"
                >&nbsp;/&nbsp;
              </span>
        </span></div>
        
      </div>
      <slider class="slider" :currentTime="currentTime"></slider>
    </div>
    <div class="musicTimeText" style="color: #a1a1a1">
      {{ formatCurrentTime}}<span style="color: #797979">/{{ formatDuration }}</span>
    </div>
  </div>
</template>

<script>
import slider from "./slider.vue";
export default {
  name: "",
  components: {
    slider,
  },
  props: {
    currentTime: Number,
    duration: Number,
  },
  data() {
    return {
      songConfig:{},
      width: 0,
      isPlay: true,
    };
  },
  watch: {
    "$store.state.songConfig"(newVal){
      this.songConfig = newVal
    }
  },
  computed: {
    formatCurrentTime() {
      if (!this.currentTime) {
        return "00:00";
      } else {
        return this.format(this.currentTime);
      }
    },
    formatDuration() {
      return this.format(this.duration);
    },
    arList() {
      let arList = [];
      for (let ele of this.songConfig.ar) {
        arList.push(ele);
      }
      return arList;
    },
    songImg(){
      return this.songConfig.al.picUrl+'?param=34y34'
    }
  },
  methods: {
    init(){
      this.songConfig = this.$store.getters.getSongConfig
    },
    format(var1) {
      let minute = Math.floor(var1 / 60);
      let second = Math.round(var1 % 60);
      if (second < 10) {
        second = "0" + second;
      }
      return "0" + minute + ":" + second;
    },
    goTo(){
      this.$router.push({name:'song',query:{id:this.songConfig.id}})
    }
  },
  created() {
    this.init()
  },
  mounted() {},
};
</script>
<style scoped>
.songImg {
  width: 34px;
  height: 35px;
  border: 1px solid black;
  cursor:pointer;
}
.player {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 15px;
}
.songInfo {
  display:flex;
  flex-direction: row;
  color: #acacac;
}
.songName{
  margin-right:20px;
  font-size:12px;
  color:white;
  cursor:pointer;
}
.songName:hover{
  text-decoration: underline white;
}
.nameWrap{
  width:220px;
  max-width:220px;
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.artist{
  font-size:12px;
  max-width:220px;
}
.artistName{
  font-size:12px;
  cursor:pointer;
}
.artistName:hover{
  text-decoration: underline;

}
.spilt{
  text-decoration: none;
}
.spilt:hover{
  text-decoration: none !important;
}
.slider {
  position: relative;
  max-width: 466px;
  height: 9px;
}
.musicTimeText {
  display:flex;
  flex-direction: row;
  align-items: flex-end;
  margin-left:15px;
  margin-bottom:1px;
  font-size: 12px;
}
</style>