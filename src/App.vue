<template>
  <div id="app">
    <header class="header">
      <nav-bar></nav-bar>
    </header>
    <div class="subHeader">
      <sub-nav></sub-nav>
    </div>
    <section class="main">
      <router-view :key="$route.fullPath" />
    </section>
    <section class="playerContainer">
      <keep-alive><play-bar style="z-index:1001;"></play-bar></keep-alive>
    </section>
    <back-top class="backTop"></back-top>
  </div>
</template>

<script>
import navBar from "@/components/navbar/nav-bar.vue";
import subNav from "@/components/subnav/sub-nav.vue";
import playBar from "@/components/playbar/play-bar.vue";
import search from "@/components/search/search.vue";
import backTop from "@/components/backTop/backTop.vue"

export default {
  name: "",
  components: {
    navBar,
    playBar,
    subNav,
    search,
    backTop
  },
  props: {},
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {

  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 1140px;
  height: 70px;
  background: #242424;
  overflow-x: hidden;
  overflow-y: hidden;
  z-index: 9999;
}
.subHeader {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  min-width: 1140px;
  background: #c20c0c;
  overflow-x: hidden;
  z-index: 9;
}
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-width: 1140px;
  margin-bottom: 0px;
  z-index: 9;
}
.playerContainer {
  position: fixed;
  width: 100%;
  height: 53px;
  bottom: 0px;
  background: rgba(1, 1, 1, 0.8);
  z-index:1001;
}
.backTop{
  position:fixed;
  right:22%;
  bottom:16%;
}
/* .oper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 80px;
}
.creatorButton {
  margin-left: 15px;
  background: #242424;
  width: 90px;
  height: 32px;
  border-radius: 45px;
  border: 1px solid #4f4f4f;
  line-height: 25px;
  font-size: 12px;
}
.creatorButton:hover {
  border: 1px solid white;
}
.creatorBtnText {
  color: #ccc;
}
.creatorBtnText:hover {
  color: white;
}
.loginButton {
  padding-left: 15px;
  text-align: center;
  vertical-align: middle;
  line-height: 12px;
}
.loginBtnText {
  font-size: 12px;
  color: #ccc;
}
.loginBtnText:hover {
  color: white;
  text-decoration: underline;
} */

</style>