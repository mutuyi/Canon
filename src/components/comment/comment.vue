<template>
  <div class="commentWrap">
    <div class=" flex-row commentTitle">
      <p style="margin:0;">评论</p>
      <p  class="subcommentTitle">共{{ commentList.total}}条评论</p>
    </div>
    <div class="flex-row createComment">
      <img
        src="http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50"
        alt=""
        width="50px"
        height="50px"
      />
      <div class="flex-column typeComment">
        <textarea name="textComment" id="textComment" cols="30" rows="3"></textarea>
        <div class="oper">
          <div>
            <div></div>
            <div>@</div>
          </div>
          <div class="flex-row oper-right">
            <div>140</div>
            <div class="commentBtn">评论</div>
          </div>
        </div>
      </div>
    </div>
    <div class="hotComment" v-if="(hotCommentList != undefined)&&(isNeedHotComment)">
      <div class="hotCommentTitle">精彩评论</div>
      <comment-item
        v-for="item in hotCommentList"
        :item="item"
        :key="item.commentId"
      ></comment-item>
    </div>

    <div class="newComment">
      <div class="newCommentTitle"  id="comment">最新评论({{commentList.total}})</div>
      <comment-item
        v-for="item in commentList.comments"
        :item="item"
        :key="item.commentId"
      ></comment-item>
    </div>
    <div><slot></slot></div>
  </div>
</template>

<script>
import commentItem from "./comment-item.vue";

export default {
  name: "comment",
  components: {
    commentItem,
  },
  props: { comment: {}, hotComment: {},isNeedHotComment:Boolean},
  data() {
    return {
      commentList: {},
      hotCommentList: {},
    };
  },
  watch: {
    comment(newVal) {
      this.commentList = this.comment;
    },
    hotComment(newVal) {
      this.hotCommentList = this.hotComment;
    },
  },
  computed: {},
  methods: {
    init() {
      this.commentList = this.comment;
      this.hotCommentList = this.hotComment;
    },
  },
  created() {
    this.init();
  },
  mounted() {},
};
</script>
<style scoped>
.commentWrap{
  margin-top:20px;
}
.commentTitle {
  align-items:center;
  font-size:20px;
  margin:0;
  padding:0 0 5px 0;
  border-bottom: 2px solid #c20c0c;
}
.subcommentTitle{

  margin: 0 0 0 25px;
  font-size:12px;
  color:rgb(129, 129, 129);
}
.createComment {
  margin-top: 20px;
}
.typeComment {
  margin-left: 15px;
  width: 100%;
}
.textComment {
  width: 100%;
  border: 1px solid #e3e3e3;
}
.oper {
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
}
.oper-right {
  align-items: center;
  color: #c3c3c3;
  font-size: 12px;
}
.commentBtn {
  background: linear-gradient(to bottom, #4a9cde, #1e6fbf);
  width: 46px;
  height: 25px;
  color: white;

  text-align: center;
  line-height: 25px;
  margin-left: 10px;
}
.hotComment {
  margin-top: 30px;
  margin-bottom: 30px;
}
.hotCommentTitle {
  font-size:12px;
  font-weight:bold;
  padding-bottom:4px;
  border-bottom: 2px solid #cfcfcf;
}
.newCommentTitle{
  padding-bottom:4px;
  border-bottom: 2px solid #cfcfcf;
}
.newComment{
  margin-top:30px;
}
</style>