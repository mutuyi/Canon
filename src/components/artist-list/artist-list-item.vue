<template>
  <div class="wrap flex-column">
    <div ><img  class="img" :src="artist.img1v1Url" /></div>
    <div class="title flex-row">
      <div>{{artist.name}}</div>
      <img v-if="artist.identityIconUrl" class="identity" :src="artist.identityIconUrl" alt="">
      </div>
  </div>
</template>

<script>
export default {
  name:'artistListItem',
  components: {},
  props: {
    data:{},
  },
  data() {
    return {
      artist:{},
    };
  },
  watch: {
    data(newVal){
     this.artist = newVal 
    }
  },
  computed: {},
  methods: {
    init(){
      this.artist = this.data
    }
  },
  created() {
    this.init()
  },
  mounted() {}
};
</script>
<style scoped>
.wrap{
  width:130px;

}
.img{
  width:130px;
  height:130px;
}
.title{
  justify-content: space-between;
  font-size:12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.identity{
  width:17px;
  height:18px;
}
</style>