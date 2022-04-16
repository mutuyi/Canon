<template>
  <div class="navBar">
    <logo></logo>
    <ul class="navItemContainer">
      <nav-item
        v-for="item in navItems"
        :item="item"
        :key="item.index"
        @click.native="handlerClick(item.index)" :style="item.index == activeIndex ? 'background:black;color:white;' : ''"
      >
        <img
          class="subPng"
          src="@/assets/img/triangle.png"
          alt=""
          :style="item.index == activeIndex ? 'display:block' : ''"
        />
      </nav-item>
      <div class="hotBox"> <div class="hot">HOT</div></div>
     
      <search class="srch"></search>
        <div class="test"></div>
        <button class="creatorButton">
          <a
            class="creatorBtnText"
            href="https://github.com/mutuyi"
            target="_blank"
            >创作者中心</a
          >
        </button>
        <div class="loginButton"><a class="loginBtnText" href="/">登录</a></div>
    </ul>

  </div>
</template>

<script>
import logo from "./logo.vue";
import navItem from "./nav-item.vue";
import search from "@/components/search/search.vue"
export default {
  name: "navBar",
  components: {
    logo,
    navItem,
    search
  },
  props: {},
  data() {
    return {
      navItems: [
        { index: 0, path: "/", name: "发现音乐" },
        { index: 1, path: "/", name: "我的音乐" },
        { index: 2, path: "/", name: "关注" },
        { index: 3, path: "/", name: "商城" },
        { index: 4, path: "/", name: "音乐人" },
        { index: 5, path: "/", name: "下载客户端" },
      ],
      activeIndex: 0,
    };
  },
  watch: {},
  computed: {},
  methods: {
    handlerClick(var1) {
      this.activeIndex = var1;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
.navBar {

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: 1140px;
  margin-left:-25px;

}
.navItemContainer {
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  align-items: center;
  margin: 0;
  padding: 0 15px;
}

.hot {
  position: absolute;
  color: white;
  background: #c20c0c;
  font-size: 0.1px;
  top: 21px;
  /* left: 685px; */
  border-radius: 35%;
  transform:scale(0.77,0.77)
}
.subPng {
  display: none;
  position: absolute;
  left: 50%;
  top:63px;;
   width: 12px;
  height: 11px;
  transform: translateX(-50%);
}
.subScript {
  display: block;
}
.srch{
  margin-left:100px;
}
.creatorButton{
  margin-left:15px;
  background:#242424;
  width:90px;
  height:32px;
  border-radius:45px;
  border:1px solid #4F4F4F;
  line-height:25px;
  font-size:12px;
}
.creatorButton:hover{
  border:1px solid white;
}
.creatorBtnText{
  color:#ccc;
}
.creatorBtnText:hover{
  color:white;
}
.loginButton{
  padding-left:15px;
  text-align: center;
  vertical-align: middle;
  line-height:12px;
}
.loginBtnText{
  font-size:12px;
  color:#ccc;
}
.loginBtnText:hover{
  color:white;
  text-decoration: underline;
}
</style>