<template>
  <div class="control">
    <volume ></volume>
    <play-mode></play-mode>
    <play-list></play-list>
  </div>
</template>

<script>
import volume from "./volume.vue"
import playMode from "./playMode.vue"
import playList from "./playList.vue"
export default {
  name:'control',
  components: {
    volume,
    playMode,
    playList
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
.control{
  display:flex;
  flex-direction: row;
  align-items: center;
  vertical-align: middle;
  margin-top:9px;
  margin-left:15px;
  
}
</style>