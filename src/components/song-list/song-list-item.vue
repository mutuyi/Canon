<template>
  <div class="flex-row song-list-item-wrap">
    <div class="flex-row first" :style="{width:titleList[0].width}">
      <div v-if="isNeedIndex">{{index+1}}</div>
        <play-btn :songConfig="songConfig" width="17px" height="17px" :color="color" :deepColor="color" lightColor="#666666"></play-btn>
      
    </div>
    <div class="songName" @click="goTo(songConfig.id)" :style="{width:titleList[1].width}">{{songConfig.name}}</div>
    <div class="time" :style="{width:titleList[2].width}">{{durationTime}}</div>
    <div  :style="{width:titleList[3].width,maxWidth:titleList[3].width}" class="artistInfo">
            <span :class="index==(arList.length-1)?'artistText':'artisttext'" v-for="(item, index) in arList" :key="index">
              <span :style="index == 0 ? 'display:none' : ''"
                >/&nbsp;
              </span>{{ item.name }}
            </span>
          </div>
    <div  class="alName" :style="{width:titleList[4].width}">{{songConfig.al.name}}</div>
  </div>
</template>

<script>
import playBtn from "@/components/btns/playBtn.vue"

export default {
  name:'',
  components: {
    playBtn,
  },
  props: {
    titleList:[],
    item:{},
    isNeedIndex:Boolean,
    index:Number,
  },
  data() {
    return {
      songConfig:{},
      color:"#b3b3b3",
    };
  },
  watch: {
    item(){
      this.songConfig = this.item
    },
    // "$store.state.currentTime"(){
    //   this.color = "#cc1111"
    // }
  },
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
.song-list-item-wrap{
  min-height:30px;
  align-items:center;
  font-size:12px;
}
.first{
  justify-content: space-around;
  align-items:center;
  color:#999999;
}
.artistInfo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-left: 8px;
  font-size: 12px;
  
}
.songName{
  padding-left:8px;

  cursor:pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.songName:hover{
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