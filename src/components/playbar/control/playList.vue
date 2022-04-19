<template>
  <div class="wrap" v-click-outside="closePlayList">
    <svg
      t="1647528016615"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4073"
      width="128"
      height="128"
      @mouseover="light()"
      @mouseleave="gray()"
      @click="showList()"
    >
      <path
        d="M608.9 288H225.6c-17.6 0-31.9-14.3-31.9-32s14.3-32 31.9-32H609c17.6 0 31.9 14.3 31.9 32s-14.3 32-32 32zM608.9 480H225.6c-17.6 0-31.9-14.3-31.9-32s14.3-32 31.9-32H609c17.6 0 31.9 14.3 31.9 32s-14.3 32-32 32zM417.3 672H225.6c-17.6 0-31.9-14.3-31.9-32s14.3-32 31.9-32h191.7c17.6 0 31.9 14.3 31.9 32s-14.3 32-31.9 32zM736.6 576c42.6 0 82.7 16.6 112.8 46.9 30.1 30.2 46.7 70.4 46.7 113.1s-16.6 82.9-46.7 113.1c-30.1 30.2-70.2 46.9-112.8 46.9-42.6 0-82.7-16.6-112.8-46.9-30.1-30.2-46.7-70.4-46.7-113.1s16.6-82.9 46.7-113.1C653.9 592.6 694 576 736.6 576m0-64c-123.4 0-223.4 100.3-223.4 224s100 224 223.4 224S960 859.7 960 736 860 512 736.6 512z"
        p-id="4074"
        :fill="color"
      ></path>
      <path
        d="M159.7 832c-17.6 0-31.9-14.3-31.9-32V160c0-17.7 14.3-32 31.9-32h513.6c17.6 0 31.9 14.3 31.9 32v256c0 17.7 14.3 32 31.9 32 17.6 0 31.9-14.3 31.9-32V128c0-35.3-28.6-64-63.8-64H127.8C92.6 64 64 92.7 64 128v704c0 35.3 28.6 64 63.8 64h353.5c17.6 0 31.9-14.3 31.9-32s-14.3-32-31.9-32H159.7zM812.9 719l-100.1-57.8c-13.2-7.6-29.6 1.9-29.6 17.1v115.6c0 15.2 16.5 24.7 29.6 17.1l100.1-57.8c13.1-7.6 13.1-26.6 0-34.2z"
        p-id="4075"
        :fill="color"
      ></path>
    </svg>
    <div class="listCount">
      <p class="listCountText">{{ playList.length }}</p>
    </div>
    <div v-if="isShowList" class="playListWrap flex-column" >
      <img :src="imgUrl" alt="" class="playListWrapBg">
      <div class="title flex-row">
        <div class="title-left flex-row">
          <div>播放列表({{playList.length}})</div>
          <div class="title-left-right flex-row">
            <div>收藏全部</div>
            <div class="deleteBtnWrap flex-row">
              <deleteBtn @click.native="clearPlayList()" width="18" height="18" :color="btnColor" :lightColor="lightColor" :deepColor="btnColor">清除</deleteBtn>
            </div>
          </div>
        </div>
        <div class="title-right flex-row">{{songConfig.name}}</div>
        <closeBtn class="closeBtn" @click.native="closePlayList()" width="18" height="18" color="#666666" lightColor="#7c7c7c" deepColor="#666666"></closeBtn>
      </div>
      <div class="flex-row">
        <div class="playLists">
          <play-lists-item @mouseenter.native="showBtn(item.id)" @mouseleave.native="hideBtn(item.id)" :style="(activeId == item.id)||(item.id==touchId)?'background:rgba(10,10,10,0.6);color:white;z-index:1;':'color:#cccccc'" v-for="item in playList" :key="item.id" @click.native="play(item)" class="playListsItem" :data="item">
            <div  :style="item.id==touchId?'display:block;z-index:9999':'display:none'" >
              <deleteBtn  @click.native.stop="clearThisSong(item.id)" width="18" height="18" :color="btnColor" :lightColor="lightColor" :deepColor="btnColor"></deleteBtn>
              </div>
            
            </play-lists-item></div>
        <div class="lyricWrap"><div class="lyric">歌词</div><div>可以去歌曲页面看</div></div>
      </div>
    </div>
  </div>
</template>

<script>
import playListsItem from './playListsItem.vue'
import deleteBtn from '@/components/btns/deleteBtn.vue'
import closeBtn from '@/components/btns/closeBtn.vue'

export default {
  name: "playList",
  components: {
    playListsItem,
    deleteBtn,
    closeBtn
  },
  props: {},
  data() {
    return {
      color: "#acacac",
      listCount: 0,
      isShowList: false,
      playList:this.$store.state.playList,
      songConfig:this.$store.state.songConfig,
      activeId:this.$store.state.songConfig.id,
      btnColor:'#9b9b9b',
      lightColor:'#ffffff',
      touchId:"",
    };
  },
  watch: {
    "$store.state.playList"(newVal){
      this.playList = newVal
    },
    "$store.state.songConfig"(newVal){
      this.songConfig = newVal
      this.activeId = newVal.id
    },
    deep:true,

  },
  computed: {
    imgUrl(){
      const head ="https://music.163.com/api/img/blur/"
      return  this.songConfig.al.picUrl
    }
  },
  methods: {
    light() {
      this.color = "#eee";
    },
    gray() {
      this.color = "#acacac";
    },
    showList() {
      this.isShowList = !this.isShowList;
    },
    play(item){
      this.$store.dispatch("updateMusic",item)
    },
    clearPlayList(){
      this.$store.dispatch("clearPlayList")
    },
    clearThisSong(songId){
      this.$store.dispatch("clearThisSong",songId)
    },
    showBtn(id){
      console.log(id)
      this.touchId = id
    },
    hideBtn(){
      this.touchId = ""
    },
    closePlayList(){
      this.isShowList=false
    },

  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
.wrap {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
}
svg {
  width: 25px;
  height: 25px;
  cursor: pointer;
  transform: scale(0.87);
  margin-right: 5px;
  z-index: 1;
}
.listCount {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 18px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.3);
  box-shadow: -1px -1px 1px rgb(1, 1, 1) inset, 0px 1px rgb(1, 1, 1) inset;

  transform: translateX(-45%);
}
.listCountText {
  margin-left: 3px;
  font-size: 12px;
  color: #797979;
  transform: scale(0.9);
}
.playListWrap {
  position: fixed;
  width: 986px;
  height: 301px;
  bottom: 53px;
  left: 50%;
  transform:translateX(-50%);
  border-radius: 5px 5px 0 0;
  color:white;
  overflow: hidden;
  background:black;
}
.playListWrapBg{
  position:absolute;
  width:986px;
  height:986px;
  z-index:-9999;
  opacity: 0.2;
  top:-360px;
  background:rgba(0, 0, 0, 0.2);
  filter:blur(15px)
}
.title{
  position:relative;
  align-items: center;
  width:100%;
  height:40px;
  background:black;
  border-radius: 5px 5px 0 0;
  
}
.title-left{
  width:56%;
  height:100%;
  justify-content: space-between;
  align-items:center;
  padding:0 25px;
}
.title-left-right{
  height:100%;
  font-size:12px;
  align-items:center;
}
.title-right{
  position:relative;
  width:44%;
  justify-content:center;
}
.closeBtn{
  position:absolute;
  right:10px;
  top:10px;
}
.closeBtn:hover{
  cursor:pointer;
}
.deleteBtnWrap{
  box-shadow:-2px 0 #2c2c2c;
  padding-left:10px;
  margin-left:10px;
  height:50%;
  align-items: center;
  cursor:pointer;

}
.btnText{
  cursor:pointer;
}
.btnText:hover{
  text-decoration:underline;
}
.playLists{
  width:56%;
  height:260px;
  max-height:260px;
  background:rgba(0, 0, 0, 0.2);
  overflow:auto;
}
.playListsItem{
  flex:1;
  width:100%;
  height:28px;
  color:white;
  cursor:pointer;
}
.lyricWrap{
  width:44%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>