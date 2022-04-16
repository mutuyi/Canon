<template>
  <div class="wrap">
    <div class="searchBackground">
      <img class="magnifier" src="@/assets/img/magnifier.png" alt="magnifer" />
      <input
        class="search"
        type="text"
        v-model="value"
        name="search"
        autocomplete="off"
        placeholder="音乐/视频/电台/用户"
        onfocus="placeholder = ''"
        onblur="placeholder='音乐/视频/电台/用户'"
        @click="showResults()"
        @input="getSuggestion"
        @keydown.enter="redirect()"
      />
    </div>
    <result-card :style="isShow ? 'display:block' : 'display:none'" 
      :value="value" :result="result"
      v-click-outside="closeBox"></result-card>
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/network/home.js";
import resultCard from './resultCard.vue'

export default {
  name: "search",
  components: {
    resultCard
  },
  props: {},
  data() {
    return {
      value: "",
      isClicked: false,
      isShow: false,
      result: {},
      times: 0,
      timer: "",
    };
  },
  watch: {
    "value"(){
      if(this.value ==""){
        this.isShow = false
      }
    }
  },
  computed: {},
  methods: {
    showResults() {
      if(this.value){this.isShow = true;}
    },
    closeBox() {
      this.isShow = false;
    },
    getSuggestion() {
      // 加装防抖
      this.isShow = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        getSearchSuggestion(this.value).then((res) => {
          this.result = res;
          console.log(res)
        });
      },300);
      if(this.value ==""){
        this.isShow = false
      }
    },
    redirect(){
      if(this.value!=""){
        this.$router.push({name:"search",query:{s:this.value,type:1}})
      }
    }
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
.searchBackground {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: white;
  border-radius: 16px;
  width: 158px;
  height: 32px;
  z-index:9999;
}
.magnifier {
  margin-left: 8px;
  width: 18px;
  height: 18px;
  z-index:9999;
}
.search {
  border: none;
  outline: none;
  width: 121px;
  height: 32px;
  font-size: 12px;
}

</style>