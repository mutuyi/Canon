<template>
  <div class="progressBar">
    <div class="bgBar"></div>
    <div class="runBar" @mousedown="onButtonDown">
      <div class="progress" :style="{ width: width + '%' }"></div>
      <img
        src="@/assets/img/cd.png"
        style="width: 14px; height: 14px; margin-left: -5px; z-index: 3"
        alt=""
        class="progressIMG"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      isPlay: this.$store.state.isPlay,
      duration: this.$store.state.duration,
      currentTime:this.$store.state.currentTime,
      startX: 0,
      currentX: 0,
      startPosition:0,
      newPosition:null,
      isHovering:false
    };
  },
  watch: {
    "$store.state.isPlay"(newVal) {
      this.isPlay = newVal;
    },
    "$store.state.currentTime"(newVal,oldVal){
      if(!this.isHovering){this.currentTime = newVal}
      
    },
    "$store.state.duration"(newVal) {
      this.duration = newVal;
    },
  },
  computed: {
    width() {
      let percentage = (this.currentTime / this.duration) * 100;
      return percentage;
    },
  },
  methods: {
    onButtonDown(evt) {
      evt.preventDefault();
      const rect = evt.currentTarget.getBoundingClientRect();
      this.currentTime = ((evt.clientX - rect.left) / 466) * this.duration;
      this.startPosition = this.currentTime
      this.$store.dispatch("updateCurrentTime",this.currentTime)
      this.$store.dispatch("updateAudio",this.currentTime)
      this.startX = evt.clientX;
      window.addEventListener("mousemove", this.onmousemove);
      window.addEventListener("mouseup", this.onmouseup);
    },
    onmousemove(evt) {
      this.isHovering = true
      this.currentX = evt.clientX;
      if (this.currentX != this.startX) {
        let diff = this.currentX - this.startX;
        this.currentTime = this.startPosition + (diff / 466) * this.duration;
        
      }
    },
    onmouseup(evt) {
      
      window.removeEventListener("mousemove", this.onmousemove);
      window.removeEventListener("mouseup", this.onmouseup);
      this.$store.dispatch("updateCurrentTime",this.currentTime)
      this.$store.dispatch("updateAudio",this.currentTime)
      this.isHovering = false
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
.progressBar {
  position: relative;
}
.bgBar {
  width: 466px;
  height: 9px;
  border-radius: 4.5px;
  background: #535353;
  z-index: 1;
}
.runBar {
  position: absolute;
  height: 9px;
  width: 466px;
  bottom: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor:auto;
}
.progress {
  height: 9px;
  width: 0%;
  border-radius: 4.5px;
  background: red;
  z-index: 2;
}
.progressIMG {
  bottom: -2px;
}
.progressIMG:hover{
  border-radius:4px;
    box-shadow: 0 0 4px white;
  background:rgba(255,255,255,0.4);
}

</style>