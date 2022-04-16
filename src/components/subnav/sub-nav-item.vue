<template>
  <router-link class="subNav" :to="item.path">
    <li class="subNavItem">
        <span class="subNavText">{{item.name}}</span>
    </li>
  </router-link>
</template>

<script>
export default {
  name: "subNavItem",
  components: {},
  props: {
    item:{},
  },
  data(){
    return{
      clicked:0,
    }
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
.subNav {
  color: white;
  margin: 0 17px;
  padding-bottom:4px;
}
.subNav:hover{
  background:#9b0909;
  border-radius:20px;
}
.subNavItem {
  position: relative;
  height:18px;
  text-align: center;
  background: var();
  line-height: 18px;
  padding:0 13px;
}
.subNavText{
  padding:0;
  margin:0;
  font-size:12px;
}
</style>