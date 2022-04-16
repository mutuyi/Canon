<template>
  <div class="subNavBar">
    <ul class="subNavItemContainer">
      <sub-nav-item
        v-for="item in navItems"
        :item="item"
        :key="item.index"
        @click.native="handlerClick(item.index)" :style="item.index == activeIndex ? 'background:#9b0909;color:white;border-radius:20px;' : ''"
      >
      </sub-nav-item>
    </ul>
  </div>
</template>

<script>
import subNavItem from "./sub-nav-item.vue";

export default {
  name: "sub-nav",
  components: {
    subNavItem,
  },
  props: {},
  data() {
    return {
      navItems: [
        { index: 0, path: "/", name: "推荐" },
        { index: 1, path: "/", name: "排行榜" },
        { index: 2, path: "/", name: "歌单" },
        { index: 3, path: "/", name: "主播电台" },
        { index: 4, path: "/", name: "歌手" },
        { index: 5, path: "/", name: "新碟上架" },
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
.subNavBar {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left:185px;
  min-width: 1120px;
  height:35px;
}
.subNavItemContainer {
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding:0px;
}
.subNavItemContainer::before{
  content:"\00AE";
  position:absolute;
  left:416px;
  top:5px;
  color:#efd6d6;
  transform:scale(0.77,0.77);
  font-size:12px;
}
</style>