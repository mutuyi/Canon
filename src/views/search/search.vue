<template>
  <div class="wrap-main flex-column">
    <div class="search-main">
      <div class="flex-row main-top">
        <div class="searchBg"><input
        class="search"
        type="text"
        v-model="value"
        name="search"
        autocomplete="off"
        placeholder=""
        onfocus="placeholder = ''"
        onblur="placeholder=''"
        @click="showResults()"
        @input="getSuggestion"
        /></div>
        
        <div class="btn"><img class="magnifier" src="@/assets/img/magnifier.png" alt="magnifer" @click="detailSearch()" /></div>
        <result-card :style="isShow ? 'display:block' : 'display:none'" 
        :value="value" :result="result"
        v-click-outside="closeBox"></result-card>
      </div>
      <div class="subTitle">搜索"{{value}}",找到20</div>
      <div class="titleWrap"><div :class="activeType ==item.type?'active':''" @click="handler(item.type)" class="titleItem" v-for="(item,index) in tableTitle" :key="index">{{item.name}}</div></div>
        <div v-if="activeType==1&&detailResult!=undefined" class="listMain flex-column">
          <search-list  class="listItem" v-for="item in detailResult.songs" :item="item" :key="item.id"></search-list>
        </div>
        <div v-else-if="activeType==100&&detailResult!=undefined" class="artistlistMain flex-row">
          <artist-list-item  class="artistListItem" v-for="(item,index) in detailResult" :data="item" :key="index"></artist-list-item>
        </div>
        <div v-else>啥也没找到</div>
    </div>
    <div class="main-bottom"></div>

  </div>
</template>

<script>
import resultCard from '@/components/search/resultCard.vue'
import searchList from '@/components/search/search-list.vue'
import artistListItem from '@/components/artist-list/artist-list-item.vue'
import { getSearchSuggestion,getNormalSearch,getDetailSearch } from "@/network/home.js";
export default {
  name:'',
  components: {
    searchList,
    resultCard,
    artistListItem
  },
  props: {},
  data() {
    return {
      value: this.$route.query.s,
      isClicked: false,
      isShow: false,
      result: {},
      times: 0,
      timer: "",
      activeType:this.$route.query.type,
      detailResult:{},
      titleList:[{width:'50%'},{width:'20%'},{width:'20%'},{width:'10%'},{width:'0%'}],
      tableTitle:[{name:"单曲",type:1},{name:"歌手",type:100},{name:"专辑",type:10},{name:"视频",type:1014},{name:"歌词",type:1006},{name:"歌单",type:1000},{name:"声音主播",type:1009},{name:"用户",type:1002}]
    };
  },
  watch: {
    "value"(){
      if(this.value ==""){
        this.isShow = false
      }
    }
  },
  computed: {},
  methods: {
    init(){
      this.value = this.$route.query.s
      this.activeType = parseInt(this.$route.query.type)
      this.detailSearch()
    },
    showResults() {
      if(this.value){this.isShow = true;}
    },
    closeBox() {
      this.isShow = false;
    },
    getSuggestion() {
      // 加装防抖
      this.isShow = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        getSearchSuggestion(this.value).then((res) => {
          this.result = res;
        });
      },300);
      if(this.value ==""){
        this.isShow = false
      }
    },
    handler(type){
      this.activeType = parseInt(type)
      this.$router.replace({name:"search",query:{s:this.value,type:this.activeType}})
      this.detailSearch()
    },
    detailSearch(){
      switch(this.activeType){
        case 1:
          getDetailSearch(this.value,this.activeType).then(res=>{
            this.detailResult = res.data.result})
            break
        case 100:
          getNormalSearch(this.value,this.activeType).then(res=>{
            this.detailResult = res.data.result.artists})
            break
            
            }
      
    },
  },
  created() {
    this.init()
  },
  mounted() {}
};
</script>
<style scoped>
.wrap-main {
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  width: 100%;
  height:100%;
  min-width: 980px;
  background: #f5f5f5;
  margin-bottom: 50px;
  
}
.search-main{
  display: flex;
  flex-direction: column;
  align-items:center;
  /* justify-content: center; */
  padding:40px;
  width:980px;
  min-height: 700px;
  height:100%;
  min-width:980px;
  background:#ffffff;
  border-left:1px solid #d3d3d3;
  border-right:1px solid #d3d3d3;

}
.main-top{
  position:relative;
  
}
.main-bottom{
  border-top:1px solid #d3d3d3;
  width:100%;
  height: 30px;
  background: #f5f5f5;
}
.searchBg{
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items: center;
  margin-left:10px;

  border:1px solid #dbdbdb;
  box-shadow: 0 2px 5px #dbdbdb inset;
  border-radius:6px 0 0 6px;
  width:420px;

}
.search{
  outline: none;
  border:none;
  width:380px;
  height:17px;
  font-size:12px;
}
.search:hover{
  filter:brightness(103%)
}
::v-deep .searchResultCard{
  left:10px;
  top:50px;
  width:420px;
}
.btn{
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width:50px;
  height:40px;
  border:1px solid #c6c7c6;
  border-radius:0 6px 6px 0;
  background:linear-gradient(to bottom,white,#eeeeee);
  cursor:pointer;
}
.btn:hover{
  filter:brightness(103%)
}
.magnifier{
  width:25px;
  height:25px;
}
.magnifier:hover{
  filter:brightness(103%)
}
.subTitle{
  align-self:flex-start;
  font-size:12px;
  margin-top:30px;
  color:#999999;
}
.titleWrap{
  display:flex;
  flex-direction: row;
  width:100%;
  height:39px;
  margin-top:20px;
   border-right:1px solid #ccc;
   border-bottom:1px solid #ccc;
   border-left:1px solid #ccc;
   background:linear-gradient(to bottom,#f9f9f950,#f6f6f6)
}
.titleItem{
  display:flex;
  flex-direction: row;
  justify-content:center;
  align-items:center;
  width:12.5%;
  height:39px;
  border-top:2px solid #ccc;
  cursor:pointer;
  padding:0 1px 0 1px;

}
.titleItem:hover{
  border-top:2px solid #d13030;
}
.active{
  border-top:2px solid #d13030;
  background:linear-gradient(to bottom,#f6f6f6,#fff);
  border-right:1px solid #ccc;
  border-left:1px solid #ccc;
}
.listMain{
  width:100%;
  margin-top:20px;
  justify-content: flex-start;
}
.listItem{
  width:100%;
   border:1px solid #fff;
}
.listItem:hover{
  background:#f2f2f2;
  border:1px solid #e1e1e1;
}
.listItem:nth-child(even){
  background:#f7f7f7;
}
.artistlistMain{
  flex:1;
  display:flex;
  flex-direction: row;
  /* justify-content: space-between; */
  flex-wrap:wrap;

  margin-top:20px;
}

.artistListItem:not(:nth-child(6n)){
  margin-right:23.5px;
  margin-bottom:30px;
}
</style>