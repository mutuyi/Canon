<template>
  <router-link class="nav" :to="item.path">
    <li class="navItem">
      <span>
        <span class="navText">{{item.name}}</span>
        <slot></slot>  
      </span>
    </li>
  </router-link>
</template>

<script>
export default {
  name: "navItem",
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
.nav {
  color: #cccccc;
}
.nav:hover {
  color: white;
  background: black;
}
.navItem {
  position: relative;
  height: 70px;
  text-align: center;
  background: var();
  line-height: 70px;
  padding:0 18px;
}

.navText{
  vertical-align: middle;
  padding:0;
  margin:0;
  font-size:14px;
  font-weight:400;
}

</style>