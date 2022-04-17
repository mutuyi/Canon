<template>
  <div class="wrap-main main">
    <div class="wrap-left">
      <div class="wrap-left-top">
        <div class="singlecover">
            <img class="msk" src="@/assets/img/singlecover.png" :style="{transform:'rotate('+rotateDeg+'deg)'}" alt="" />
            <img
            :src="picUrl"
            class="singleImg"
            style="width: 135px; height: 135px"
            alt=""
            :style="{transform:'rotate('+rotateDeg+'deg)'}"
            />
          <p class="outChain">生成外链播放器</p>
        </div>
        <div class="songInfo">
          <div class="infoTop">
            <img
              src="@/assets/img/single.png"
              style="width: 54px; height: 24px"
              alt=""
            />
            <p class="songName">{{ songConfig.name }}</p>
          </div>
          <div class="artistInfo">
            <div>歌手：</div>
            <div v-for="(item, index) in arList" :key="index">
              {{ item.name }}
              <span :style="index == arList.length - 1 ? 'display:none' : ''"
                >/&nbsp;
              </span>
            </div>
          </div>
          <div class="album">
            <div>所属专辑:</div>
            <div>{{ name }}</div>
          </div>
          <div class="operation">
            <div class="playBtn">
              <div class="play btn" @click="updateMusic()">
                <img
                  src="@/assets/img/playBtnWhite.png"
                  style="width: 20px; height: 20px"
                  alt=""
                />
                <div>播放</div>
              </div>
              <div class="btn add" @click="plusPlayList()">+</div>
            </div>
            <div class="btn btn-1">
              <img
                src="@/assets/img/collect.png"
                style="width: 20px; height: 20px"
                alt=""
              />
              <div>收藏</div>
            </div>
            <div class="btn btn-1">
              <img
                src="@/assets/img/share.png"
                style="width: 20px; height: 20px"
                alt=""
              />
              <div>分享</div>
            </div>
            <div class="btn btn-1">
              <img
                src="@/assets/img/download.png"
                style="width: 20px; height: 20px"
                alt=""
              />
              <div>下载</div>
            </div>
            <a class="btn commentCount">
              <img
                src="@/assets/img/comment.png"
                style="width: 20px; height: 20px"
                alt=""
              />
              <div>({{ comment.total }})</div>
            </a>
          </div>
          <div class="lyric" :key="songId">
              <div class="box" ref="box">
                <div
                  v-for="(item, index) in lyricText.lrc"
                  :key="index"
                  :class="
                    (lyricText.timer[index] <= currentTime &&
                    currentTime <= lyricText.timer[index + 1])&&check
                      ? 'active'
                      : 'normal'
                  "
                >
                  {{ item }}
                </div>
              </div>
              <div class="dot"></div></div
          >
        </div>
        
      </div>
      <comment  :comment="comment" :hotComment="hotComment" :isNeedHotComment="isNeedHot">
        <pager :total="pager" @jumpTo="update"></pager> 
      </comment>
    </div>
    <div class="wrap-right"></div>
  </div>
</template>

<script>
import { getSong, getLyric, getComment } from "@/network/home.js";
import {getSongComment} from "@/network/song.js";
import comment from "@/components/comment/comment.vue";
import pager from "@/components/pager/pager.vue";

export default {
  name: "",
  components: {
    comment,
    pager,
  },
  props: {},
  data() {
    return {
      songId: this.$route.query.id,
      songConfig:{},
      picUrl:" ",
      name:"",
      oldSong:this.$store.state.songConfig,
      lyric: "",
      currentTime: 0,
      isChange: false,
      hotComment: {},
      comment:{},
      rotateDeg:0,
      isplay:this.$store.state.isPlay,
      check:false,
      cursor:"",
      isNeedHot:true,
    };
  },
  watch: {
    "$route"(to, from) {
      if (to.query.id != from.query.id) {
        
        this.songId = to.query.id;
        this.isChange = true;
        this.init();
      }
    },
    "$store.state.songConfig.id"(){

      this.oldSong = this.$store.getters.getSongConfig
    },
    
    "$store.state.currentTime"(newVal) {
      this.isplay = this.$store.getters.getIsPlay
      this.currentTime = this.format(newVal);
      let lyricBox = document.querySelector(".box");
      this.check = (this.oldSong.id ==this.songId)
      if(this.check){
        this.lyricText.timer.forEach((value, index) => {
          if (value <= this.currentTime) {
            let height = 125 + -(index * 18.39);
            if (height < 0) {
              lyricBox.style.top = height + "px";
              
            }
          }
        });
      }
      if(this.currentTime=="00:00"){
          lyricBox.style.top =0;
          // this.rotateDeg=0
        }
    },
    "$store.state.isPlay"(newVal){
      this.isplay = this.$store.getters.getIsPlay
      console.log("触发isPlay检查了吗")
      if(this.isplay == false){
        clearInterval(this.auto)
        let lyricBox = document.querySelector(".box");
        if(this.currentTime=="00:00"){
          lyricBox.style.top =0;
          this.rotateDeg=0
        }
      }else{
        this.rotate()
      }
      if(newVal == false){
         document.title = this.name
        }
    },
    deep:true,
    immediate:true
  },
  computed: {
    arList() {
      let arList = [];
      if(this.songConfig.ar){
        for (let ele of this.songConfig.ar) {
        arList.push(ele);
        }
        return arList;
      }
      
    },
    lyricText() {
      let newLyric = this.lyric.replace("\n", "\n");
      newLyric = this.lyric.replace(/\]/g, "] ");
      let tempArray = newLyric.split("\n");
      let timer = [];
      let lrc = [];
      let regRule = /\[(\d{2}:\d{2}\.\d{2,3})\](.+)/;
      tempArray.forEach((value, index) => {
        if (regRule.exec(value) != null) {
          timer.push(regRule.exec(value)[1]);
          lrc.push(regRule.exec(value)[2]);
        }
      });

      return { timer, lrc };
    },
    pager(){
      console.log(Math.ceil(parseInt(this.comment.total)/20))
      return Math.ceil(parseInt(this.comment.total)/20)
    }
  },
  methods: {
    init() {
      getSong(this.songId).then((res) => {
        this.songConfig = res.data.songs[0];
        this.picUrl = this.songConfig.al.picUrl
        this.name = this.songConfig.name
        document.title=this.name
      });
      getLyric(this.songId).then((res) => {
        this.lyric = res.data.lrc.lyric;
      });
      getSongComment(this.songId,20).then((res) => {
        this.hotComment = res.data.hotComments;
        this.comment = res.data
      });
      if(this.auto){clearInterval(this.auto)}else{ 
        this.rotate()}
      
     
    },
    updateMusic() {
      this.$store.dispatch("updateIsPlay", false);
      this.$store.dispatch("updateMusic", this.songConfig)
      this.oldSong.id = this.songConfig.id
      this.$store.dispatch("updateIsPlay", true);
      this.rotate()
      let lyricBox = document.querySelector(".box");
      lyricBox.style.top = 0;
    },
    format(var1) {
      let minute = Math.floor(var1 / 60);
      let second = Math.round(var1 % 60);
      if (second < 10) {
        second = "0" + second;
      }
      // let miniSecond = var1-(Math.floor(var1*1))
      // let smallSecond = '\.'+(miniSecond * 1000)
      // console.log(miniSecond)'.'(miniSecond*1000)+ smallSecond
      return "0" + minute + ":" + second;
    },
    // panTo(){
    //   window.location.hash="#comment"
    // },
    rotate(){
      if(this.isplay&&(this.songId==this.oldSong.id)){
         this.auto=setInterval(()=>{
          this.rotateDeg +=1
        },100)
      }
    },
    handleVisibilityChange(){
      if(document.visibilityState=="visible"){
        clearInterval(this.auto)
        this.rotate()
      }else if(document.visibilityState=="hidden"){
        clearInterval(this.auto)
      }
    },
    plusPlayList(){
      this.$store.dispatch("insertPlayList",[this.songConfig])
    },
    update(index){
        getSongComment(this.songId,20,(parseInt(index)-1)*20).then((res) => {
          this.comment = res.data;
        });
        if(parseInt(index)>1){
          this.isNeedHot = false
      }else(this.isNeedHot = true)
      
    }
  },
  created() {
    this.init();
  },
  mounted() {
    // let lyricBox = this.$refs.box;
    // lyricBox.style.top = 0;
    document.addEventListener("visibilitychange",this.handleVisibilityChange)
  },
  beforeDestroy(){
    document.removeEventListener("visibilitychange",this.handleVisibilityChange)
    clearInterval(this.auto)
  },
};
</script>
<style scoped>
.wrap-main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  min-width: 980px;
  background: #f5f5f5;
  padding-right: 8px;
  margin-bottom: 50px;
  
}
.wrap-left {
  display: flex;
  flex-direction: column;
  background: white;
  width: 730px;
  padding-top: 33px;
  padding-left: 33px;
  margin-bottom: 50px;
  padding-bottom: 30px;
  padding-right: 33px;
  border-left:2px solid #d5d5d5;
}
.wrap-left-top {
  display: flex;
  flex-direction: row;
}
.wrap-right {
  display: flex;
  flex-direction: column;
border-right:2px solid #d5d5d5;
  background: white;
  width: 250px;
  margin-bottom: 50px;
}
.singlecover {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 206px;
  height: 234px;
}
.msk {
  position: relative;
  z-index: 3;
  transition:1s  ease;
}
.singleImg {
  position: absolute;
  top: 36px;
  left: 37px;
  z-index: 1;
  transition:0.5s  ease;
}
.outChain {
  font-size: 12px;
  cursor: pointer;
  text-align: center;
  color: #0c73c2;
  text-decoration: underline;
}
.songInfo {
  display: flex;
  flex-direction: column;
  margin-left: 22px;
}
.infoTop {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.songName {
  vertical-align: middle;
  line-height: 24px;
  font-size: 24px;
  padding: 0;
  margin: 0 0 3px 16px;
}
.artistInfo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 14px;
  font-size: 12px;
}
.album {
  display: flex;
  flex-direction: row;
  font-size: 12px;
  margin-top: 14px;
}
.operation {
  display: flex;
  flex-direction: row;
  margin-top: 14px;
}
.playBtn {
  display: flex;
  flex-direction: row;
}
.btn {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 31px;
  line-height: 31px;
  text-align: center;
  color:black;
  font-size: 12px;
  border-radius: 4px;
}
.play {
  width: 66px;
  background: linear-gradient(to bottom, #4a9cdf, #2172c1);
  color: white;
  z-index: 2;
  border-radius:4px 0 0 4px;
  border-right: 1px solid #2172c1;
  cursor: pointer;
}
.add {
  width: 31px;
  color: white;
  background: linear-gradient(to bottom, #4a9cdf, #2172c1);
  font-size: 18px;
  border-radius:0 4px 4px 0;
  padding-bottom: 3px;
  z-index: 1;
  cursor: pointer;
}
.play:hover {
  border: 1px solid rgba(255, 255, 255, 0.3);
  filter: brightness(108%);
}

.add:hover {
  border: 1px solid rgba(255, 255, 255, 0.3);
  filter: brightness(108%);
}
.btn-1 {
  margin-left: 10px;
  border: 1px solid #ccc;
  width: 59px;
  background: linear-gradient(to bottom, white, #f1f1f1);
  cursor: pointer;
}
.commentCount {
  margin-left: 10px;
  border: 1px solid #ccc;
  width: 71px;
  background: linear-gradient(to bottom, white, #f1f1f1);
  cursor: pointer;
}
.btn-1:hover {
  border: 1px solid rgba(1, 1, 1, 0.8);
  filter: brightness(108%);
}
.commentCount:hover {
  border: 1px solid rgba(1, 1, 1, 0.8);
  filter: brightness(108%);
}
.lyric {
  position: relative;
  margin-top: 16px;
  max-height: 300px;
  height: 300px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.active {
  font-size: 24px;
  color: red;
  transition: color 0.5s ease-in-out, font-size 0.5s ease-in-out;
}
.normal {
  color: black;
  transition: color 0.5s ease-in-out, font-size 0.5s ease-in-out;
}
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0px;
  width: 381px;
  height: 300px;
  transition: top 2s ease-in-out;
  white-space: pre-wrap;
}
.dot {
  width: 380.98px;
  height: 2px;
  background: #ccc;
  margin-bottom: 3 px;
}

</style>