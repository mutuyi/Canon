<template>
  <div class="wrap">
    <div class="top">
      <img :src="ranklistImgUrl" alt="" />
      <div class="top-inner">
        <p class="title">{{title}}</p>
        <div class="btnWrap">
          <playBtn @click.native.stop="plusPlayList()" typeBtn="playList" width="25" height="25" :color="color" lightColor="#9b9b9b" :deepColor="color"></playBtn>
          <collect :color="color" lightColor="#9b9b9b" :deepColor="color"></collect>
        </div>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
    <div class="bottom">
      <router-link class="linkText" to="/">查看全部></router-link>
    </div>
  </div>
</template>

<script>
import playBtn from "@/components/btns/playBtn.vue"
import collect from "@/components/playbar/operation/collect.vue"
import{getPlayList} from"@/network/home.js"
export default {
  name: "ranklist",
  components: {
    playBtn,
    collect
  },
  props: {
    ranklistImgUrl:"",
    title: "",
    playListId:"",
  },
  data() {
    return {
      color:"#c0c0c0"
    };
  },
  watch: {},
  computed: {},
  methods: {
    plusPlayList(){
      getPlayList(this.playListId).then((res)=>{
        let tempArray = res.data.playlist.tracks
        this.$store.dispatch("plusPlayList",tempArray)
        this.$store.dispatch("playMusic",tempArray[0])
      })
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
.wrap{
  display:flex;
  flex-direction: column;
  width:230px;
  height:472px;
  background:#f4f4f4;
  border:1px solid rgb(211, 211, 211);
}
.top{

  display:flex;
  flex-direction: row;
  margin:20px 0 0 20px;
  width:230px;
  height:120px;
}
.top-inner{
  width:116px;
  margin:6px 0 0 10px;
  height:51px;
}
.title{
  margin:0;
}
.title:hover{
  text-decoration:underline;
}
.btnWrap{
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top:10px;
  width:66px;
}
.bottom{
  text-align:right;
  height:32px;
  line-height:32px;
  background:#e8e8e8;
  
}
.linkText{
  font-size:12px;
  color:black;
  margin-right:30px;
  margin-top:0;
  margin-bottom:0;
}
.linkText:hover{
  text-decoration:underline;
}
img{
  width:80px;
  height:80px;
}
svg{
  width:30px;
  height:30px;
}
</style>