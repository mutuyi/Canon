<template>
  <div class="search-list-main">
    <div class="first flex-row">
      <play-btn :songConfig="songConfig" width="17px" height="17px" :color="color" :deepColor="color" lightColor="#666666"></play-btn>
      <div class="songName" @click="goTo(songConfig.id)">{{songConfig.name}}</div>
    </div>
    <div class="second flex-row">
      <div   class="artistInfo">
            <span  v-for="(item, index) in arList" :class="index==(arList.length-1)?'artistText':'artisttext'" :key="index">
              <span :style="index == 0 ? 'display:none' : ''"
                >/</span>{{ item.name }}
            </span>
          </div>
    </div>
    <div class="third flex-row">
      <div  class="alName" >《{{songConfig.al.name}}》</div>
    </div>
    <div class="forth flex-row"><div class="time" >{{durationTime}}</div></div>
  </div>
</template>

<script>
import playBtn from "@/components/btns/playBtn.vue"
export default {
  name:'',
  components: {
    playBtn
  },
  props: {item:{},},
  data() {
    return {
      color:"#b3b3b3",
    };
  },
  watch: {},
  computed: {
    durationTime(){
      return this.format(this.songConfig.dt/1000)
    },
    arList() {
      let arList = [];
      for (let ele of this.songConfig.ar) {
        arList.push(ele);
      }
      return arList;
    },
  },
  methods: {
    init(){
      this.songConfig = this.item
    },
    
    format(var1) {
      let minute = Math.floor(var1 / 60);
      let second = Math.round(var1 % 60);
      if (second < 10) {
        second = "0" + second;
      }
      return "0" + minute + ":" + second;
    },
    goTo(id){
      this.$router.push({name:"song",query:{id:id}})
    }
  },
  created() {
    this.init()
  },
  mounted() {}
};
</script>
<style scoped>
.search-list-main{
  display: flex;
  flex-direction: row;
  justify-content:flex-start;
  align-items:center;
  width:100%;
  font-size:12px;
  height:43px;
}
.first{
  width:56%;
}
.second{
  width:17%;
}
.third{
  width:22%;
}
.forth{
  width:5%;
}
.artistInfo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-left: 8px;
  font-size: 12px;
  width:100%;
  
}
.songName{
  padding-left:8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.songName:hover{
  cursor:pointer;
  text-decoration:underline;
}
.time{
  color:#999999;
  padding-left:8px;
}
.artistText{

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.artisttext{
  font-size:12px;
  color:#333;
  white-space: nowrap;
}
.alName{
  padding-left:8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>