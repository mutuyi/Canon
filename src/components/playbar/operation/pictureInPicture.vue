<template>
  <div class="wrap">
    <svg
      t="1647477116972"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1569"
      width="128"
      height="128"
      @mouseenter="light()"
      @mouseleave="gray()"
      @click="handler()"
    >
      <path
        d="M768 213.333333H256a85.333333 85.333333 0 0 0-85.333333 85.333334v426.666666a85.333333 85.333333 0 0 0 85.333333 85.333334h170.666667a42.666667 42.666667 0 1 1 0 85.333333H256a170.666667 170.666667 0 0 1-170.666667-170.666667V298.666667a170.666667 170.666667 0 0 1 170.666667-170.666667h512a170.666667 170.666667 0 0 1 170.666667 170.666667v128a42.666667 42.666667 0 1 1-85.333334 0V298.666667a85.333333 85.333333 0 0 0-85.333333-85.333334z m-128 341.333334a128 128 0 0 0-128 128v85.333333a128 128 0 0 0 128 128h170.666667a128 128 0 0 0 128-128v-85.333333a128 128 0 0 0-128-128h-170.666667z"
        p-id="1570"
        :fill="color"
      ></path>
    </svg>
    <div class="lyricBg">
      <canvas class="canvas" ref="canvas" width="350px" height="900px"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: "pictureInPicture",
  components: {},
  props: {},
  data() {
    return {
      color: "#acacac",
      lyric: this.$store.state.lyric,
    };
  },
  watch: {},
  computed: {},
  methods: {
    // init(){
    //   const canvas = this.$refs.canvas
    //   const ctx = canvas.getContext("2d")
    //   ctx.font="25px serif"
    //   ctx.textAlign="center"

    //   const text = this.lyric.lrc.lyric
    //   text.split("]"," ")
    //   console.log(text)
    // }，
    // init() {},
    light() {
      this.color = "#eee";
    },
    gray() {
      this.color = "#acacac";
    },
  },
  created() {},
  mounted() {
    // this.init();
  },
};
</script>
<style scoped>
.lyricBg {
  position: fixed;
  max-height: 600px;
  overflow-y: auto;
  bottom: 0;
  right: 0;
  display: none;
}
svg {
  width: 25px;
  height: 25px;
  cursor:pointer;
  transform: scale(0.87);
  margin-right:5px;
}
.canvas {
  border: 1px solid black;
}
</style>