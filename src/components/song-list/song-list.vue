<template>
  <div class="wrap">
    <div class="title flex-row">
      <div class="flex-row mainTitle">
        <div class="tableTitle">歌曲列表</div>
        <div class="songCount">{{playList.trackIds.length}}首歌</div>
      </div>
      <div class="flex-row count">
        <div>外链</div>
        <div class="flex-row ">播放：<div style="color:#c20c0c">{{playList.playCount}}</div>次</div>
      </div> 
      
    </div>
    <div class="listTitle flex-row">
      <div class="listTitleItem" v-for="(item,index) in titleList" :key="index" :style="{width:item.width}">{{item.title}}</div>
    </div>
    <div class="listMain flex-column">
        <song-list-item  class="listItem" v-for="(item,index) in playList.tracks" :isNeedIndex="true" :titleList="titleList" :item="item" :index="index" :key="index"></song-list-item>
    </div>
  </div>
</template>

<script>
import songListItem from "./song-list-item.vue"

export default {
  name:'',
  components: {
    songListItem
  },
  props: {titleList:[],
  playList:[]},
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped>
.wrap{
  display:flex;
  flex-direction:column;
  margin-top:30px;
  width:100%;
  
}
.title{
  justify-content: space-between;
  align-items:center;
  padding-bottom:8px;
  border-bottom:2px solid #c20c0c;
}
.mainTitle{
  align-items:center;
  
}
.tableTitle{
  font-size:20px;
}
.songCount{
  margin-left:20px;
  font-size:12px;
  color:#666666;
}
.count{
  font-size:12px;
}
/* .listTitle{

} */
.listMain{
  border:1px solid #d9d9d9;
}
.listTitleItem{
  height:34px;
  line-height:34px;
  background:linear-gradient(to bottom,white,#f0f0f0);
  border:1px solid #cdcdcd;
  color:#666666;
  font-size:12px;
  padding-left:8px
}
.listItem:nth-child(odd){
  background:#f7f7f7;
}
</style>