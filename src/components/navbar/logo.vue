<template>
  <div class="logo">
    <router-link to="/">
      <img class="logoPNG" height="37" width="auto" src="@/assets/img/logo.png" alt="logo" />
      <h2 class="logoText">网易云音乐</h2>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "logo",
  components: {},
  props: {},
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
<style>
.logo {
  display: inline-block;
  height: 70px;
  line-height: 70px;
  margin: 0;
}
.logoText{
  display:inline-block;
  vertical-align: middle;
  margin:0;
  color:white;
  font-weight: 400;
}
.logoPNG {
  vertical-align: middle;
  height: 37px;
  width: auto;
  padding-right:8.5px;
}
</style>