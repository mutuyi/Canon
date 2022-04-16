<template>
  <div class="wrap-main">
    <div class="wrap-left">
      <div class="flex-row">
        <div>
          <img
            width="208px"
            height="208px"
            :src="playListConfig.coverImgUrl"
            alt=""
          />
        </div>
        <div class="listInfo">
          <div class="title flex-row">
            <div class="listPngBox">
              <img src="@/assets/img/playlist.png" alt="" />
              <div class="symbol"></div>
            </div>
            <div class="titleText">{{ playListConfig.name }}</div>
          </div>
          <div class="creator flex-row">
            <img
              style="margin-right: 10px"
              width="35px"
              height="35px"
              :src="playListConfig.creator.avatarUrl"
              alt=""
            />
            <div style="margin-right: 20px">
              {{ playListConfig.creator.nickname }}
            </div>
            <div style="color: #999999">{{ createTime }} 创建</div>
          </div>
          <div class="operation">
            <div class="playBtn">
              <div class="btn play" @click="playPlayList()">
                <img
                  src="@/assets/img/playBtnWhite.png"
                  style="width: 20px; height: 20px"
                  alt=""
                />
                <div>播放</div>
              </div>
              <div class="btn add" @click="plusPlayList()">+</div>
            </div>
            <div class="btn btn-1">
              <img
                src="@/assets/img/collect.png"
                style="width: 14px; height: 14px"
                alt=""
              />
              <div>({{ playListConfig.subscribedCount }})</div>
            </div>
            <div class="btn btn-1">
              <img
                src="@/assets/img/share.png"
                style="width: 14px; height: 14px"
                alt=""
              />
              <div>({{ playListConfig.shareCount }})</div>
            </div>
            <div class="btn btn-1">
              <img
                src="@/assets/img/download.png"
                style="width: 14px; height: 14px"
                alt=""
              />
              <div>下载</div>
            </div>
            <a class="btn commentCount" href="#comment">
              <img
                src="@/assets/img/comment.png"
                style="width: 14px; height: 14px"
                alt=""
              />
              <div>({{ playListConfig.commentCount }})</div>
            </a>
          </div>
          <div class="tag">
            标签：
            <div
              class="tagItem"
              v-for="(item, index) in playListConfig.tags"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
          <div v-show="isCollapse" class="subDescription">
            介绍:&nbsp;&nbsp; {{ playListConfig.description }}
          </div>
          <div  v-show="!isCollapse" class="description">
            介绍:&nbsp;&nbsp; {{ playListConfig.description }}
          </div>
          <div v-show="isCollapse" @click="unfold()" class="collapse">展开</div>
          <div v-show="!isCollapse" @click="unfold()" class="collapse">收起</div>
        </div>
        <div>
          
        </div>
      </div>
      <song-list :titleList="titleList" :playList="playListConfig"></song-list>
      <div class="adv">查看更多内容，请下载客户端</div>
      <comment  :comment="comment" :hotComment="hotComment" :isNeedHotComment="isNeedHot">
        <pager :total="pager" @jumpTo="update"></pager> 
      </comment>
    </div>
    <div class="wrap-right"></div>
  </div>
</template>

<script>
import { getPlayList, getComment } from "@/network/home.js";
import comment from "@/components/comment/comment.vue";
import songList from "@/components/song-list/song-list.vue"
import pager from "@/components/pager/pager.vue"

export default {
  name: "",
  components: {
    comment,
    songList,
    pager
  },
  props: {},
  data() {
    return {
      id: this.$route.query.id,
      playListConfig: {},
      comment: {},
      cursor:"",
      isNeedHot:true,
      hotComment: {},
      isCollapse:true,
      titleList:[{
        title:" ",
        width:"74.5px",
      },
      {
        title:"歌曲标题",
        width:"236px",
      },{
        title:"时长",
        width:"111px",
      },{
        title:"歌手",
        width:"89.5px",
      },{
        title:"专辑",
        width:"128px",
      },]
    };
  },
  watch: {
    $route(to, from) {
      if (to.query.id != from.query.id) {
        this.id = to.query.id;
        this.init();
      }
    },
  },
  computed: {
    createTime() {
      let timeStamp = new Date(this.playListConfig.createTime);
      let year = timeStamp.getFullYear();
      let month = timeStamp.getMonth() + 1;
      let date = timeStamp.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (date < 10) {
        date = "0" + date;
      }
      return year + "-" + month + "-" + date;
    },
    pager(){
      return Math.ceil(parseInt(this.comment.totalCount)/20)
    }
  },
  methods: {
    init() {
      getPlayList(this.id).then((res) => {
        this.playListConfig = res.data.playlist;
      });
      getComment("2", this.id, "3").then((res) => {
        this.comment = res.data.data;
        this.cursor = res.data.data.cursor
      });
      getComment("2",this.id,"2").then((res) => {
        this.hotComment = res.data.data;
      });
    },
    playPlayList(){
      this.$store.dispatch("plusPlayList",this.playListConfig.tracks)
      this.$store.dispatch("playMusic",this.playListConfig.tracks[0])
    },
    plusPlayList(){
      this.$store.dispatch("insertPlayList",this.playListConfig.tracks)
    },
    update(index){
      
        getComment("2",this.id,"3",index,this.cursor).then((res) => {
          this.comment = res.data.data;
          this.cursor = res.data.data.cursor
        });
        if(parseInt(index)>1){
          this.isNeedHot = false
      }else(this.isNeedHot = true)
      
    },
    unfold(){
      this.isCollapse = !this.isCollapse
    }
  },
  created() {
    this.init();
  },
  mounted() {},
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
  padding-right: 8px;
  margin-bottom: 50px;
}
.wrap-left {
  display: flex;
  flex-direction: column;
  background: white;
  width: 709px;
  margin-bottom: 50px;
  padding: 40px 30px 30px 39px;
}
.wrap-right {
  display: flex;
  flex-direction: column;
  background: white;
  width: 271px;
  margin-bottom: 50px;
}
.listInfo {
  position:relative;
  display:flex;
  flex-direction: column;
  margin-left: 25px;
  margin-top: 2px;
}
.listPngBox {
  position: relative;
  margin-right: 10px;
}
.symbol::before {
  position: absolute;
  content: "\00AE";
  left: 33px;
  top: 1px;
  color: #efd6d6;
  transform: scale(0.77, 0.77);
  font-size: 12px;
}
.title {
  align-items: flex-start;
  font-size: 20px;
}
.creator {
  margin-top: 15px;
  align-items: center;
  font-size: 12px;
}
.operation {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
}
.playBtn {
  display: flex;
  flex-direction: row;
}
.btn {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 31px;
  line-height: 31px;
  text-align: center;
  color: black;
  font-size: 12px;
  border-radius: 4px;
}
.play {
  width: 66px;
  background: linear-gradient(to bottom, #4a9cdf, #2172c1);
  color: white;
  z-index: 2;
  border-radius:4px 0 0 4px;
  border-right: 1px solid #2172c1;
  cursor: pointer;
}
.add {
  width: 31px;
  color: white;
  background: linear-gradient(to bottom, #4a9cdf, #2172c1);
  font-size: 18px;
  border-radius:0 4px 4px 0;
  padding-bottom: 3px;
  z-index: 1;
  cursor: pointer;
}
.play:hover {
  border: 1px solid rgba(255, 255, 255, 0.3);
  filter: brightness(108%);
}

.add:hover {
  border: 1px solid rgba(255, 255, 255, 0.3);
  filter: brightness(108%);
}
.btn-1 {
  margin-left: 10px;
  border: 1px solid #ccc;
  padding:0 5px;
  background: linear-gradient(to bottom, white, #f1f1f1);
  cursor: pointer;
}
.commentCount {
  margin-left: 10px;
  border: 1px solid #ccc;
  width: 71px;
  background: linear-gradient(to bottom, white, #f1f1f1);
  cursor: pointer;
}
.btn-1:hover {
  border: 1px solid rgba(1, 1, 1, 0.8);
  filter: brightness(108%);
}
.commentCount:hover {
  border: 1px solid rgba(1, 1, 1, 0.8);
  filter: brightness(108%);
}
.tag {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  text-align: center;
  align-items: center;
  color: #666666;
}
.tagItem {
  text-align: center;
  background: linear-gradient(to bottom, white, #f3f3f3);
  border: 1px solid #ccc;
  border-radius: 11px;
  width: 50px;
  height: 22px;
  color: #666666;
  margin-right: 15px;
}
.subDescription {
  position:relative;
  margin-top: 15px;
  font-size:12px;
  /* height:50px; */
  max-height:50px;
  width:410px;
  overflow: hidden;
  line-height:16px;
  color: #666666;
  text-overflow: ellipsis;
  white-space:pre-wrap;
  display:-webkit-box;
   -webkit-line-clamp: 3;
   -webkit-box-orient:vertical;
}
/* .subDescription::after{
  content:'...';
  position:absolute;
  right:0;
  bottom:0;
 color: #666666;
} */
.description{
  position:relative;
  margin-top: 15px;
  font-size:12px;

  width:410px;
  line-height:16px;
  color: #666666;
  text-overflow: ellipsis;
  white-space:pre-wrap;
}
.collapse{
  text-align: end;
  font-size:12px;
  color:#0c73c2;
  cursor:pointer;
}
.adv{
  margin-top:50px;
  margin-bottom:30px;
}
</style>