<template>
  <div class="wrap">
    <div class="wrap-1">
      <img src="@/assets/img/recommand.png" alt="a png for recommand" style="width:14px;height:14px;" />
      <router-link :to="titleUrl" style="fontSize:20px;color:black;margin-left:8px;" >{{ title }}</router-link>
      <slot></slot>
    </div>
    <div class="wrap-2">
      <router-link :to="moreUrl" class="moreUrl" style="font-size:12px;margin-right:5px;">更多</router-link>
      <img src="@/assets/img/arrow_more.png" alt="arrow for more" style="width:8px;height:12px;" />
    </div>
  </div>
</template>

<script>
export default {
  name: "cardHeader",
  components: {},
  props: {
    title:"",
    titleUrl: "",
    moreUrl: "",
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style  scoped>
.wrap{
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width:689px;
  margin:20px 0px 20px 0px;
  padding:0px 10px 7px;
  border-bottom: 2px solid #c10d0c;
}
.wrap-1{
  display:flex;
  flex-direction: row;
  align-items:center; 
}
.wrap-2{
  display:flex;
  flex-direction: row;
  align-items:center;
  /* margin-right:22px; */
}
.moreUrl:hover{
  text-decoration:underline;
}
</style>