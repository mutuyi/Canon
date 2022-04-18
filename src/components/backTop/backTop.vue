<template>
    <div class="backTopMain flex-column" @click="scrollToTop" :style="distance>300?'display:flex':'display:none'">
      <div>^</div>
      <div>TOP</div>
    </div>
</template>

<script>
export default {
  name:'backTop',
  components: {},
  props: {},
  data() {
    return {
      distance:0
    };
  },
  watch: {
  },
  computed: {},
  methods: {
    scrollToTop(){
      console.log(document.documentElement.scrollTop)
      document.documentElement.scrollTop=0
    },
    handleScroll(){
      this.distance = document.documentElement.scrollTop
    }
  },
  created() {
    window.addEventListener('scroll',this.handleScroll)
  },
  mounted() {},
  destroyed(){
    window.removeEventListener('scroll',this.handleScroll)
  },
};
</script>
<style scoped>
.backTopMain{
  width:49px;
  height:44px;
  border:1px solid #ccc;
  justify-content: space-around;
  align-items: center;
  font-size:12px;
  cursor:pointer;
}
</style>