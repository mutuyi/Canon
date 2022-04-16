<template>
  <div class="wrapCard">
    <card-header :title="cardTitle" :titleUrl="cardTitleUrl" :moreUrl="cardMoreUrl"><slot name="subCardHeader"></slot></card-header>
    <slot></slot>
  </div>
</template>

<script>
import cardHeader from "./card-header.vue"
export default {
  name:'card',
  components: {cardHeader},
  props: {
    title:"",
    titleUrl:"",
    moreUrl:"",
  },
  data() {
    return {
      cardTitle:"",
      cardTitleUrl:"/",
      cardMoreUrl:"/"
    };
  },
  watch: {
  },
  computed: {},
  methods: {
    init(){
      this.cardTitle = this.title
    }
  },
  created() {
    this.init()
  },
  mounted() {}
};
</script>
<style scoped>
.wrapCard{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>