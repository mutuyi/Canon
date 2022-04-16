<template>
  <div class="wrap-main">
    <div class="wrap-left"></div>
    <div class="wrap-right"></div>
  </div>
</template>

<script>
import {getSong} from '@/network/home.js'

export default {
  name:'',
  components: {},
  props: {},
  data() {
    return {
      songId:this.$route.query.id,
      songConfig:{},
    };
  },
  watch: {},
  computed: {},
  methods: {
    init(){
      getSong(this.songId).then((res)=>{
        this.songConfig = res.data
      })
    },
  },
  created() {
    
  },
  mounted() {
    this.init()
  }
};
</script>
<style scoped>
.wrap-main {
  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 100%;
  min-width: 980px;
  background: #f5f5f5;
  margin-bottom: 50px;
}
.wrap-left {
  display: flex;
  flex-direction: column;
  background: white;
  width: 730px;
  margin-bottom: 50px;
  padding-bottom: 30px;
}
.wrap-right {
  display: flex;
  flex-direction: column;
  background: white;
  width: 250px;
  margin-bottom: 50px;
}
</style>