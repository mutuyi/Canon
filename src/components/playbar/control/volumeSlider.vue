<template>
  <div class="progressBar">
    <div class="bgBar"></div>
    <div class="runBar" @mousedown="onButtonDown">
      <img
        src="@/assets/img/cd.png"
        style="width: 10px; height: 10px; z-index: 3"
        alt=""
        class="progressIMG"
      />
      <div class="progress" :style="{ height: height + '%' }"></div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "volumeSlider",
  components: {},
  props: {
    oldVolume:0,
  },
  data() {
    return {
      volume:0,
      duration: 100,
      startY: 0,
      currentY: 0,
      startPosition:0,
      newPosition:null,
      isHovering:false
    };
  },
  watch: {
    oldVolume(){
      this.volume = this.oldVolume * 100
    }
  },
  computed: {
    height() {
      let percentage = this.volume
      return percentage;
    },
  },
  methods: {
    onButtonDown(evt) {
      evt.preventDefault();
      const rect = evt.currentTarget.getBoundingClientRect();
      this.volume = (((evt.clientY)-(rect.bottom-9.5)) / 94) * this.duration *(-1);
      this.startPosition = this.volume
      // this.$store.dispatch("updateCurrentTime",this.volume)
      // this.$store.dispatch("updateAudio",this.volume)
      this.startY = evt.clientY;
      if(this.volume<0){
        this.volume = 0
      }else if(this.volume>100){
        this.volume=100
      }
      this.$store.dispatch("updateVolume",this.volume / 100)
       this.$store.dispatch("updateAudioVolume",this.volume / 100)
      window.addEventListener("mousemove", this.onmousemove);
      window.addEventListener("mouseup", this.onmouseup);
    },
    onmousemove(evt) {
      this.isHovering = true
      this.currentY = evt.clientY;
      if (this.currentY != this.startY) {
        let diff = (this.currentY - this.startY)*-1;
        this.volume = this.startPosition + (diff / 94) * this.duration;
        if(this.volume<0){
        this.volume = 0
      }else if(this.volume>100){
        this.volume=100
      }
        this.$store.dispatch("updateVolume",this.volume / 100)
        this.$store.dispatch("updateAudioVolume",this.volume / 100)
      }
    },
    onmouseup() {
      if(this.volume<0){
        this.volume = 0
      }else if(this.volume>100){
        this.volume=100
      }
      window.removeEventListener("mousemove", this.onmousemove);
      window.removeEventListener("mouseup", this.onmouseup);
      this.$store.dispatch("updateVolume",this.volume / 100)
       this.$store.dispatch("updateAudioVolume",this.volume / 100)
      this.isHovering = false
    },
    init(){
      this.volume = this.oldVolume*100
    }
  },
  created() {
    this.init()
  },
  mounted() {},
};
</script>
<style scoped>
.progressBar {
  position: relative;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height:113px;
}
.bgBar {
  width: 4px;
  height: 94px;
  border-radius: 2px;
  background: #535353;
  z-index: 1;
}
.runBar {
  position: absolute;
  height: 94px;
  width: 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  cursor:auto;
  z-index:2
}
.progress {
  height: 0%;
  width: 4px;
  border-radius: 2px;
  background: red;
  z-index: 3;
}
.progressIMG {
  bottom: -2px;
  cursor:pointer;
}
.progressIMG:hover{
  box-shadow: 0 0 4px white;
  background:rgba(255,255,255,0.4);
}
</style>