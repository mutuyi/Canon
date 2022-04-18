<template>
  <div class="flex-row play-lists-item-wrap">
    <div class="flex-row first" :style="{ width: '20px' }">
      <img
        src="@/assets/img/playBtnRed.png"
        alt=""
        width="17px"
        height="17px"
        v-show="songConfig.id==playingSong.id"
      />
    </div>
    <div class="songName" :style="{ width: '354px' }">
      {{ songConfig.name }}
      <div class="toolBar"><slot></slot></div>
    </div>
    <div :style="{ width: '110px', maxWidth: '110px' }" class="artistInfo">
      <span
        :class="index == arList.length - 1 ? 'artistText' : 'artisttext'"
        v-for="(item, index) in arList"
        :key="index"
      >
        <span :style="index == 0 ? 'display:none' : ''">/&nbsp; </span
        >{{ item.name }}
      </span>
    </div>
    <div class="time" :style="{ width: '55px' }">{{ durationTime }}</div>
  </div>
</template>

<script>
import deleteBtn from '@/components/btns/deleteBtn.vue'

export default {
  name: "playListsItem",
  components: {
    deleteBtn
  },
  props: {
    data: {},
  },
  data() {
    return {
      songConfig: {},
      playingSong:this.$store.state.songConfig,
      color: "#b3b3b3",
      btnColor:'#9b9b9b',
      lightColor:'#ffffff',
    };
  },
  watch: {
    item() {
      this.songConfig = this.data;
    },
    "$store.state.songConfig"(newVal){
      this.playingSong = newVal;
    }
    // "$store.state.currentTime"(){
    //   this.color = "#cc1111"
    // }
  },
  computed: {
    durationTime() {
      return this.format(this.songConfig.dt / 1000);
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
    init() {
      this.songConfig = this.data;
    },

    format(var1) {
      let minute = Math.floor(var1 / 60);
      let second = Math.round(var1 % 60);
      if (second < 10) {
        second = "0" + second;
      }
      return "0" + minute + ":" + second;
    },
  },
  created() {
    this.init();
  },
  mounted() {},
};
</script>
<style scoped>
.play-lists-item-wrap {
  min-height: 30px;
  align-items: center;
  font-size: 12px;
}
.first {
  justify-content: space-around;
  align-items: center;

}
.artistInfo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-left: 8px;
  font-size: 12px;
    overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

}
.songName {
  position:relative;
  display:flex;
  flex-direction: row;
  align-items: center;
  padding-left: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height:30px;


}
.toolBar{
  position:absolute;
  display:flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height:30px;
  top:0;
  right:0;

}
.time {

  padding-left: 8px;
}
.artistText {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

}
.artisttext {
  font-size: 12px;

  white-space: nowrap;
}
.alName {
  padding-left: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>