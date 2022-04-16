<template>
  <div class="wrap">
    <img :src="item.user.avatarUrl" width="50px" height="50px" alt="" />
    <div class="main">
      <div class="mainContent">
        <div>{{ item.user.nickname }}
          <img width=12px height=12px v-if="item.user.avatarDetail != undefined" :src="item.user.avatarDetail.identityIconUrl" />:<span>{{ item.content }}</span></div>
      </div>
      <div class="oper">
        <div class="timeStr">{{ item.timeStr }}</div>
        <div class="like-reply">
          <div>({{ item.likedCount }})</div>
          <div>|</div>
          <div>回复</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentItem",
  components: {},
  props: { item: {} },
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
<style scoped>
.wrap {
  display: flex;
  flex-direction: row;
  white-space: pre-wrap;
  word-break: break-word;
  width:100%;
  margin-top:15px;
  margin-bottom:15px;
  padding-bottom:15px;
  border-bottom:1px solid #e3e3e3;
}
.main {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width:100%;
}
.mainContent{
  display: flex;
  flex-direction: row;
  width:100%;
  margin-left:10px;
  font-size:12px;
  line-height:20px;
}
.contentText{
  display:block;
  width:150px;
}
.oper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left:10px;
  margin-top:20px;
  font-size:12px;
}
.timeStr{
  color:#afafaf;
}
.like-reply {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
</style>