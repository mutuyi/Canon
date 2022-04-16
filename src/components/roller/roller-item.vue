<template>
  <div >
    <div class="rollerItemCover" @mouseenter="showBtn"
        @mouseleave="hideBtn">
      <img
        :src="item.picUrl + '?param=100y100'"
        alt=""
        width="100"
        height="100"
      />
      <img
        v-show="isShow"
        class="rollerBtn"
        src="@/assets/img/playBtn1.png"
        alt=""
      />
    </div>
    <div class="rollerItemText"><p class="rollerItemTextTitle">{{ item.name }}</p>
    <p class="rollerItemTextArtist" v-html="$options.filters.title(item.artists)"></p></div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    item: {},
  },
  data() {
    return {
      isShow: false,
    };
  },
  filters:{
    title(artists){
      let title = ""
      for(let i=0;i<artists.length;i++){
        if(i>0){
          title = title +" / "+artists[i].name
        }else{title+=artists[i].name}
      }
      return "<p class='rollerItemTextArtist' style='width:100px;margin:0;display:inline-block;font-size:12px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;'>"+title+"</p>"
    }

  },
  watch: {},
  computed: {},
  methods: {
    showBtn() {
      this.isShow = true;
    },
    hideBtn() {
      this.isShow = false;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>

.rollerItemCover {
  cursor: pointer;
  position: relative;
  width: 100px;
  height: 100px;
}
.rollerBtn {
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: 0px;
  right: 0px;
  background:rgba(0,0,0,0.5);
  border-radius:18px;
}
.rollerBtn:hover{
  background:rgba(0,0,0,0.8);
}

.rollerItemTextTitle{
  margin:0;
  margin-top:10px;
  font-size:12px;
    overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width:100px;
}

.rollerItemTextTitle:hover {
  cursor: pointer;
  text-decoration: underline;
}
.rollerItemTextArtist{
  margin:0;
  display:inline-block;
  font-size:12px;
    overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/deep/ .rollerItemTextArtist:hover{
    cursor: pointer;
  text-decoration: underline;
}

</style>