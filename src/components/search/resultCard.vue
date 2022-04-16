<template>
  <div v-if="!isloading" class="searchResultCard">
    <div class="searchUser">搜"{{ search }}" 相关用户 ></div>
    <div style="  border-top:1px solid #d6d6d6;">
      <result-card-item class="wrapwrap" v-if="isShowSongs" :resultList="result1.songs" :cls="'songs'" :search="search">
        <template class="wrapside"
          ><img
            src="@/assets/img/search-song.png"
            style="width: 18px; height: 18px"
            alt=""
          />
          <p class="resultTitle">单曲</p></template
        >
      </result-card-item>
      <result-card-item  class="wrapwrap"  v-if="isShowArtists" :resultList="result1.artists" :cls="'artists'" :search="search">
        <template
          ><img
            src="@/assets/img/search-artist.png"
            style="width: 18px; height: 18px"
            alt=""
          />
          <p class="resultTitle">歌手</p></template
        >
      </result-card-item>
      <result-card-item class="wrapwrap"  v-if="isShowAlbums" :resultList="result1.albums" :cls="'albums'" :search="search">
        <template
          ><img
            src="@/assets/img/search-album.png"
            style="width: 18px; height: 18px"
            alt=""
          />
          <p class="resultTitle">专辑</p></template
        >
      </result-card-item>
      <result-card-item class="wrapwrap"  v-if="isShowPLaylists" :resultList="result1.playlists" :cls="'playlists'" :search="search">
        <template
          ><img
            src="@/assets/img/search-playlist.png"
            style="width: 18px; height: 18px"
            alt=""
          />
          <p class="resultTitle">歌单</p></template
        >
      </result-card-item>
    </div>
  </div>
</template>

<script>
import resultCardItem from "./resultCardItem.vue";
export default {
  name: "resultCard",
  components: {
    resultCardItem,
  },
  props: {
    value: "",
    result: {},
  },
  data() {
    return {
      isloading:true,
      search: "",
      result1: {},
      isShowSongs: false,
      isShowArtists: false,
      isShowAlbums: false,
      isShowPLaylists: false,
    };
  },
  watch: {
    value() {
      this.search = this.value;
    },
    result() {
      this.result1 = this.result.data.result;
    },
    result1() {
      this.isShowSongs = this.result1.hasOwnProperty("songs");
      this.isShowArtists = this.result1.hasOwnProperty("artists");
      this.isShowAlbums = this.result1.hasOwnProperty("albums");
      this.isShowPLaylists = this.result1.hasOwnProperty("playlists");
      this.isloading=false
    },
  },
  computed: {},
  methods: {
    init() {
      this.search = this.value;
      // if(this.result != undefined){
      //   console.log('jieguo')
      //   this.result1 = this.result.data.result;
      //   }
      this.isShowSongs = this.result1.hasOwnProperty("songs");
      this.isShowArtists = this.result1.hasOwnProperty("artists");
      this.isShowAlbums = this.result1.hasOwnProperty("albums");
      this.isShowPLaylists = this.result1.hasOwnProperty("playlists");
    },
  },
  created() {
    this.init();
  },
  beforeMount() {
    
  },
  mounted() {},
};
</script>
<style scoped>
.searchResultCard {
  position: absolute;
  top: 65px;
  width: 240px;
  background: white;
  z-index: 9999;
  border-radius:4px;
  box-shadow: 0px 4px 8px  #505050;
}
.searchUser{
  margin:10px 5px 10px 10px;
  font-size:13px;
  color:#7a7b7b
}
.wrapwrap{
  width:100%;
}
.wrapwrap:nth-child(even){
  background:#f9f8f8;
}

.resultTitle {
  margin:0px;
  margin-left:8px;
  font-size: 14px;
  color: #505050;
}
</style>