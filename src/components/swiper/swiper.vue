<template>
  <div
    :style="{background:'no-repeat '+'url(' + imageUrl + '?imageView&blur=40x20) '+'center '+'/ 6000px'}"
    @mouseenter="stop()"
    @mouseleave="autoPlay()"
    class="main"
  >
    <div class="bannerContainer">
      <div class="btnl" @click="moveLeft()">
        <img src="@/assets/img/arrow2l.png" alt="theLeftButton" />
      </div>
      <swiper-item
        v-for="(item, index) in banners"
        :picURL="item.imageUrl + ''"
        :key="index"
        :style="
          activeIndex == index ? 'display:block;height:100%' : 'display:none'
        "
      ></swiper-item>
      <div class="sideDownload">下载客户端的广告</div>
      <div class="btnr" @click="moveRight()">
        <img src="@/assets/img/arrow2r.png" alt="theRightButton" />
      </div>
    </div>

    <div class="dots">
      <div
        v-for="(item, index) in banners"
        :key="index"
        class="dotsItem"
        :style="index == activeIndex ? 'background:red' : ''"
        @mouseover="handler(index)"
      ></div>
    </div>
  </div>
</template>

<script>
import{getBanner} from "@/network/home.js"
import swiperItem from "./swiper-item.vue";
export default {
  name: "swiper",
  components: {
    swiperItem,
  },
  props: {},
  data() {
    return {
      pageConfig: {},
      banners: [],
      activeIndex: 0,
      interval: 4000,
      isAutoPlay:true,
      imageUrl:"",
    };
  },
  watch: {
    activeIndex(newVal){
      this.imageUrl = this.banners[newVal].imageUrl
    }
  },
  computed: {
  },
  methods: {
    init(){
       getBanner("0").then(res=>{
          this.banners =res.data.banners
          this.imageUrl = this.banners[0].imageUrl
      })
    },
    // getPageConfig() {
    //   this.pageConfig = this.$store.getters.getPageConfig.data;
    //   this.banners = this.pageConfig.data.blocks[0].extInfo.banners;
    // },
    play(){
      const length = this.banners.length
      if(this.activeIndex<length-1){
        this.activeIndex++
      }else{
        this.activeIndex=0
      }
    },
    autoPlay() {
      if(this.isAutoPlay){
      this.auto = setInterval(() => {
        this.play();
      }, this.interval);
      }
    },
    
    stop() {
      clearInterval(this.auto);
    },
    controller(index) {
      const length = this.banners.length
      if (index >= length ) {
        this.activeIndex = 0;
      }
      else if (index < 0) {
        this.activeIndex = length-1;
      }
      else{this.activeIndex = index};
    },
    moveLeft() {
      this.controller(this.activeIndex-1);
    },
    moveRight() {
      this.controller(this.activeIndex+1);
    },
    handler(index) {
      this.activeIndex = index;
    },
  },
  created() {
    this.init();
  },
  beforeMount() {
    // this.getPageConfig();
  },
  mounted() {
    this.autoPlay();
  },
};
</script>
<style scoped>
.main{
  display:flex;
  flex-direction: row;
  justify-content:center;
  width:100%;
}
.bannerContainer {
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width:1105px;
  height: 284px;
}
.btnl {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 37px;
  height: 63px;
  margin-right: 25px;
}
.btnl:hover {
  cursor: pointer;
  background: rgba(0.31, 0.1, 0.1, 0.1);
}
.btnr {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 37px;
  height: 63px;
  margin-left: 21px;
}
.btnr:hover {
  cursor: pointer;
  background: rgba(0.31, 0.1, 0.1, 0.1);
}
.btnl img {
  width: 37px;
  height: 37px;
}
.btnr img {
  width: 37px;
  height: 37px;
}
.sideDownload {
  text-align: center;
  margin: 0 auto;
  width: 253px;
  height: 285px;
  color: white;
  line-height: 285px;
  background: rgba(0.1, 0.1, 0.1, 0.1);
}
.dots {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 730px;
  height: 26px;
  background: rgba(0.1, 0.1, 0.1, 0.1);
  bottom: 0px;
  margin-right: 250px;
}
.dotsItem {
  margin: 0 8px;
  width: 5px;
  height: 5px;
  background: white;
  border-radius: 2.5px;
}
.dotsItem:hover {
  cursor: pointer;
  background: red;
}
</style>