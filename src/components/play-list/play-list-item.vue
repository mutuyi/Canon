<template>
  <div class="playListItemWrap" style="position: relative">
    <div style="position: relative; height: 140px; width: 140px">
      <router-link :to="{name:'playlist',query:{id:itemList.id}}"
        ><img
          :src="itemList.picUrl+'?param=140y140'"
          alt="playlist photo"
          style="width: 140px; height: 140px"
      /></router-link>
      <div class="bottom">
        <div class="counts">
          <img
            src="@/assets/img/headphone.png"
            alt="photo of headphone"
            style="width: 18px; height: 18px"
          />
          <p style="color: #cacaca; font-size: 12px">{{ playCount }}</p>
        </div>
        <div class="btn">
          <play-btn
            width="18px"
            height="18px"
            color="#cacaca"
            lightColor="white"
            deepColor="#cacaca"
            typeBtn="playList"
            @click.native.stop="plusPlayList()"
          ></play-btn>
        </div>
      </div>
    </div>

    <div>
      <router-link :to="{name:'playlist',query:{id:itemList.id}}" class="playListItemTitle">{{ itemList.name}}</router-link>
    </div>
  </div>
</template>

<script>
import playBtn from "@/components/btns/playBtn.vue";
import{getPlayList} from"@/network/home.js"
export default {
  name: "",
  components: {
    playBtn,
  },
  props: {
    item: {},
  },
  data() {
    return {
      itemList: {},
    };
  },
  watch: {},
  computed: {
    playCount() {
      if (parseInt(this.itemList.playCount) > 10000) {
        return (
          Math.round(
            parseInt(this.itemList.playCount) / 10000
          ) + "万"
        );
      } else {
        return Math.round(parseInt(this.itemList.playCount));
      }
    },
    
  },
  methods: {
    itemUpdate() {
      this.itemList = this.item;
    },
    plusPlayList(){
      getPlayList(this.itemList.id).then((res)=>{
        let tempArray = res.data.playlist.tracks
        this.$store.dispatch("plusPlayList",tempArray)
        this.$store.dispatch("playMusic",tempArray[0])
      })
    },
  },
  created() {
    this.itemUpdate();
  },
  beforeMount() {},
};
</script>
<style scoped>
.playListItemWrap {
  width: 140px;
  height: 204px;
  margin-bottom: 48px;
}
.bottom {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  width: 140px;
  height: 27px;
  background-color: rgba(0, 0, 0, 0.6);
  border-top:1px solid black;
}
.counts{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left:10px;
  height: 27px;
}
.btn{
  margin-top:5px;
  margin-right:5px;
  line-height:27px;
}
.playListItemTitle {
  color:black;
  font-size: 14px;
}
.playListItemTitle:hover {
  text-decoration: underline;
}
</style>