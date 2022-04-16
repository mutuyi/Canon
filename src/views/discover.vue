<template>
  <div>
    <swiper class="swiper"></swiper>
    <div class="wrap-main">
      <div class="wrap-left">
        <card :title="title">
          <template #subCardHeader
            ><div id="subCardHeader">
              <div class="subCardHeaderItem">华语</div>
              <span>|</span>
              <div class="subCardHeaderItem">流行</div>
              <span>|</span>
              <div class="subCardHeaderItem">摇滚</div>
              <span>|</span>
              <div class="subCardHeaderItem">民谣</div>
              <span>|</span>
              <div class="subCardHeaderItem">电子</div>
            </div></template
          >
          <template>
            <div class="playListWrap">
              <play-list-item
                class="playerListItem"
                v-for="item in rcml"
                :key="item.id"
                :item="item"
              ></play-list-item>
            </div>
          </template>
        </card>
        <card :title="title1">
          <template #subCardHeader></template>
          <template>
            <div class="rollerWrap">
              <div>
                <svg
                  t="1647972922343"
                  class="icon rollerBtn"
                  viewBox="0 0 700 700"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="943"
                  width="128"
                  height="128"
                  @click="roll()"
                >
                  <path
                    d="M503.466667 490.666667l174.933333 174.933333-59.733333 59.733333L384 490.666667 618.666667 256l59.733333 59.733333-174.933333 174.933334z"
                    p-id="944"
                    :fill="svgColor"
                  ></path>
                </svg>
              </div>

              <roller
                class="roller rollerA-1"
                key="0"
                :style="{ left: position[0] + 'px', transition: transition[0] }"
              >
                <template>
                  <div class="rollerInner">
                    <roller-item
                      v-for="item in typeAArray"
                      :key="item.id"
                      :item="item"
                      class="rollerItem"
                    ></roller-item>
                  </div>
                </template>
              </roller>
              <roller
                class="roller rollerB-1"
                key="1"
                :style="{ left: position[1] + 'px', transition: transition[1] }"
              >
                <template>
                  <div class="rollerInner">
                    <roller-item
                      v-for="item in typeBArray"
                      :key="item.id"
                      :item="item"
                      class="rollerItem"
                    ></roller-item>
                  </div>
                </template>
              </roller>

              <roller
                class="roller rollerA-2"
                key="2"
                :style="{ left: position[2] + 'px', transition: transition[2] }"
              >
                <template>
                  <div class="rollerInner">
                    <roller-item
                      v-for="item in typeAArray"
                      :key="item.id"
                      :item="item"
                      class="rollerItem"
                    ></roller-item>
                  </div>
                </template>
              </roller>
              <roller
                class="roller rollerB-2"
                key="3"
                :style="{ left: position[3] + 'px', transition: transition[3] }"
              >
                <template>
                  <div class="rollerInner">
                    <roller-item
                      v-for="item in typeBArray"
                      :key="item.id"
                      :item="item"
                      class="rollerItem"
                    ></roller-item>
                  </div>
                </template>
              </roller>
              <div>
                <svg
                  t="1647972985551"
                  class="icon rollerBtn"
                  viewBox="0 0 700 700"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1141"
                  width="128"
                  height="128"
                  @click="reverseRoll()"
                >
                  <path
                    d="M558.933333 490.666667L384 665.6l59.733333 59.733333 234.666667-234.666666L443.733333 256 384 315.733333l174.933333 174.933334z"
                    p-id="1142"
                    :fill="svgColor"
                  ></path>
                </svg>
              </div>
            </div>
          </template>
        </card>
        <card :title="title2">
          <template>
            <div class="ranklistWrap">
              <ranklist
                title="飙升榜"
                ranklistImgUrl="http://p3.music.126.net/pcYHpMkdC69VVvWiynNklA==/109951166952713766.jpg?param=100y100"
                playListId="19723756"
              >
                <ranklist-item
                  v-for="(item, index) in hotToplist"
                  :key="index"
                  :item="item"
                  :index="index"
                  class="ranklistItem"
                  @mouseenter.native="getTouchId(item.id,'飙升榜')"
                  @mouseleave.native="removeTouchId()"
                  >
                  <div class="btnBg" :style="item.id+'飙升榜'==touchId?'display:flex':''"><play-btn
                    :style="item.id==touchId?'display:flex':''"
                    width="17px"
                    height="17px"
                    color="#787777"
                    deepColor="#787777"
                    lightColor="#656565"
                    class="plyBtn"
                    typeBtn="playList"
                    @click.native.stop="playPlayList(item)"
                  ></play-btn></div>
                </ranklist-item>
              </ranklist>
              <ranklist
                title="新歌榜"
                ranklistImgUrl="http://p4.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg?param=100y100"
                playListId="3779629"
              >
                <ranklist-item
                  v-for="(item, index) in newToplist"
                  :key="index"
                  :item="item"
                  :index="index"
                  class="ranklistItem"
                  @mouseenter.native="getTouchId(item.id,'新歌榜')"
                  @mouseleave.native="removeTouchId()"
                >
                 <div class="btnBg" :style="(item.id+'新歌榜')==touchId?'display:flex':''"><play-btn
                    
                    width="17px"
                    height="17px"
                    color="#787777"
                    deepColor="#787777"
                    lightColor="#656565"
                    class="plyBtn"
                    @click.native.stop="playPlayList(item)"
                    typeBtn="playList"
                  ></play-btn></div></ranklist-item>
              </ranklist>
              <ranklist
                title="原创榜"
                ranklistImgUrl="http://p4.music.126.net/iFZ_nw2V86IFk90dc50kdQ==/109951166961388699.jpg?param=100y100"
                playListId="2884035"
              >
                <ranklist-item
                  v-for="(item, index) in originalToplist"
                  :key="index"
                  :item="item"
                  :index="index"
                  class="ranklistItem"
                  @mouseenter.native="getTouchId(item.id,'原创榜')"
                  @mouseleave.native="removeTouchId()"
                >
                 <div class="btnBg" :style="item.id+'原创榜'==touchId?'display:flex':''"><play-btn
                    
                    width="17px"
                    height="17px"
                    color="#787777"
                    deepColor="#787777"
                    lightColor="#656565"
                    class="plyBtn"
                    @click.native.stop="playPlayList(item)"
                    typeBtn="playList"
                  ></play-btn></div></ranklist-item>
              </ranklist>
            </div>
          </template>
        </card>
      </div>
      <div class="wrap-right">
        <div class="right-1">
          <p class="right-1-text">
            登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
          </p>
          <div class="right-1-btn"><p class="right-1-btnText">用户登录</p></div>
        </div>
        <div class="right-2">
          <div class="rightHeader">
            <div class="rightTitle">热门歌手</div>
            <router-link to="/">查看全部 ></router-link>
          </div>
          <div class="hotArtistsWrap">
            <div v-for="item in hotArtists" :key="item.id" class="hotArtists">
              <img :src="item.img1v1Url+'?param=62y62'" style="width: 62px; height: 62px" />
              <div class="hotArtistsText">
                <p>{{ item.name }}</p>
                <p>{{ item.alias[0] }}</p>
              </div>
            </div>
          </div>
          <div class="applyBtn">申请成为网易音乐人</div>
        </div>
        <div class="right-2">
          <div class="rightHeader">
            <div class="rightTitle"><p>最热主播</p></div>
          </div>
          <div class="hotDJWrap">
            <div v-for="item in hotDJ" :key="item.id" class="hotDJ">
              <img :src="item.avatarUrl +'?param=40y40'" style="width: 40px; height: 40px" />
              <div class="hotDJText">
                <p>{{ item.nickName }}</p>
                <p>粉丝数:{{ item.userFollowedCount }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import {
  getNewestAlbums,
  getHotToplist,
  getNewToplist,
  getOriginalToplist,
  getHotArtists,
  getHotDJ,
  getRecommandableList,
} from "@/network/home.js";
import swiper from "@/components/swiper/swiper.vue";
import card from "@/components/card/card.vue";
import playListItem from "@/components/play-list/play-list-item.vue";
import roller from "@/components/roller/roller.vue";
import rollerItem from "@/components/roller/roller-item.vue";
import ranklist from "@/components/ranklist/ranklist.vue";
import ranklistItem from "@/components/ranklist/ranklist-item.vue";
import playBtn from "@/components/btns/playBtn.vue";

export default {
  name: "discover",
  components: {
    swiper,
    card,
    playListItem,
    roller,
    rollerItem,
    ranklist,
    ranklistItem,
    playBtn
  },
  data() {
    return {
      title: "热门推荐",
      title1: "新碟上架",
      title2: "榜单",
      titleUrl: "",
      moreUrl: "",
      rcml: [],
      newestAlbums: {},
      typeAArray: [],
      typeBArray: [],
      svgColor: "#898989",
      rollerItemActiveIndex: 0,
      index: 0,
      position: [0, 675, 1350, -655],
      transition: [
        "left 1s ease-out 0s",
        "left 1s ease-out 0s",
        "none 0s ease-out 0s",
        "none 0s ease-out 0s",
      ],
      isClick: false,
      times: 0,
      page: {},
      hotToplist: [],
      newToplist: [],
      originalToplist: [],
      hotArtists: [],
      hotDJ: [],
      isShowPlayBtn:false,
      touchId:"",
    };
  },
  methods: {
    init() {
      // this.page = this.$store.getters.getPageConfig
      document.title="(伪)网易云音乐"
      getRecommandableList().then((res) => {
        this.rcml = res.data.result;
      });
      getNewestAlbums().then((res) => {
        this.newestAlbums = res.data.albums;
        this.typeAArray = this.newestAlbums.slice(0, 5);
        this.typeBArray = this.newestAlbums.slice(5, 10);
        // console.log(this.typeAArray, this.typeBArray);
      });
      getHotToplist("10").then((res) => {
        this.hotToplist = res.data.songs;
      });
      getNewToplist("10").then((res) => {
        this.newToplist = res.data.songs;
      });
      getOriginalToplist("10").then((res) => {
        this.originalToplist = res.data.songs;
      });
      getHotArtists("5").then((res) => {
        this.hotArtists = res.data.artists;
      });
      getHotDJ("5").then((res) => {
        this.hotDJ = res.data.data.list;
      });
    },
    roll() {
      if (this.times > 0) {
        let first = this.position.shift();
        this.position.push(first);
        this.times--;
      } else {
        let first = this.position.shift();
        this.position.push(first);
        let first1 = this.transition.shift();
        this.transition.push(first1);
      }
    },
    reverseRoll() {
      if (this.times == 0) {
        let final = this.position.pop();
        this.position.unshift(final);
        this.times++;
      } else {
        let final1 = this.transition.pop();
        this.transition.unshift(final1);
        let final = this.position.pop();
        this.position.unshift(final);
      }
    },
    playPlayList(item){
      this.$store.dispatch("updateMusic",item)
    },
    getTouchId(id,rank){
      console.log(id)
      console.log(rank)
      this.touchId = id+rank
    },
    removeTouchId(){
      this.touchId = ""
    },
  },
  created() {
    this.init();
  },
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
.swiper {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 1105px;
  max-height: 285px;
  height: 285px;
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
#subCardHeader {
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  width: 240px;
  justify-content: space-between;
}
.subCardHeaderItem {
  cursor: pointer;
}
.subCardHeaderItem:hover {
  text-decoration: underline;
}
.playListWrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 689px;
}
.right-1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 126px;
  background: linear-gradient(to bottom, white, #e2e2e2);
  font-size: 12px;
  color: #666;
}
.right-1-text {
  width: 205px;
  line-height: 22px;
  margin: 18px 0;
}
.right-1-btn {
  color: white;
  background: linear-gradient(to bottom, #ea1e27, #be080d);
  width: 90px;
  height: 31px;
  text-align: center;
}
.right-1-btnText {
  margin: 8px 0;
}
.rollerWrap {
  display: flex;
  position: relative;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  width: 687px;
  height: 186px;
  overflow: hidden;
  background: #f5f5f5;
}
.transitionWrap {
  margin-top: 30px;
  width: 687px;
  height: 186px;
}
.rollerInner {
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  flex-wrap: nowrap;

  width: 645px;
  margin-top: 20px;
}
.rollerBtn {
  margin-bottom: 15px;
  width: 17px;
  height: 17px;
  transform: scale(1.25);
  margin-right: 10px;
  cursor: pointer;
}
.rollerItem {
  width: 100px;
  margin-right: 18px;
  margin-left: 13px;
}
.rollerA-1 {
  margin-left: 18px;
  position: absolute;
  left: 0;
}
.rollerB-1 {
  margin-left: 18px;
  position: absolute;
  left: 675px;
}
.rollerA-2 {
  margin-left: 18px;
  position: absolute;
  left: 675px;
}
.rollerB-2 {
  margin-left: 18px;
  position: absolute;
  left: -650px;
}
.ranklistWrap {
  display: flex;
  flex-direction: row;
}
.ranklistItem {
  position:relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 32px;
  width: 228px;
  font-size: 12px;
  background:#f4f4f4;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
   z-index:1;
}
.ranklistItem:nth-child(odd) {
  background: #e8e8e8;
}
.btnBg{
  position:absolute;
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width:64px;
  height:32px;
  right:0;
  top:0;
  background:inherit;
  display:none;
  z-index:2;
}
.right-2 {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 250px;
  border: 1px solid #cccccc;
  border-bottom: none;
  border-top: none;
}
.rightHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
  padding-bottom: 4px;

  width: 210px;
  height: 24px;
  border-bottom: 1px solid #cccccc;
}
.rightTitle {
  font-size: 12px;
}
.hotArtistsWrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
}
.hotArtists {
  display: flex;
  flex-direction: row;
  margin-top: 7px;
  margin-bottom: 7px;
  width: 210px;
  background: #fafafa;
  border: 1px solid #e3e3e3;
}
.hotArtistsText {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 10px;
  width: 138px;
}
.hotArtists p {
  padding: 0;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.applyBtn {
  width: 210px;
  height: 31px;
  margin: 7px 0 auto;
  text-align: center;
  line-height: 31px;
  font-size: 12px;
  border: 1px solid #f1f1f1;
  background: linear-gradient(to bottom, #ffffff, #f1f1f1);
  margin-bottom: 5px;
}
/* .hotDJWrap{

} */
.hotDJ {
  display: flex;
  flex-direction: row;
  width: 210px;
  margin: 8px 0;
}
.hotDJText {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 160px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 10px;
}
.hotDJText p {
  font-size: 12px;
  margin: 0px;
}
a {
  font-size: 12px;
}
</style>