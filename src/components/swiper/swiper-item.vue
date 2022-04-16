<template>
  <div><img :src="picURL" alt="banner" class="swiper-item-img"></div>
</template>

<script>
export default {
  name:'swiperItem',
  components: {},
  props: {
    picURL:""
  },
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped>
.swiper-item-img{
  width:730px;
  max-height:285px;
  height:284.5px
}
</style>