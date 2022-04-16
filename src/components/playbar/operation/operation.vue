<template>
  <div class="operation">
    <pictureInPicture></pictureInPicture>
    <collect></collect>
    <share></share>
    <!-- 画中画歌词太难了，做不出来。拿div歌词糊弄糊弄算了  -->
  </div>
</template>

<script>

import pictureInPicture from "./pictureInPicture.vue"
import collect from "./collect.vue"
import share from "./share.vue"

export default {
  name:'operation',
  components: {
    pictureInPicture,
    collect,
    share
  },
  props: {},
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
.operation{
  display:flex;
  flex-direction: row;
  align-items: center;
  margin-top:9px;
  margin-left:30px;
  box-shadow:2px 0 rgba(0,0,0,0.2)
}
</style>