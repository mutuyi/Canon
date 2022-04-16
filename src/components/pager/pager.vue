<template>
  <div class="wrap flex-row" v-if="!(pager == 1)"  >
    <div class="btn margin" @click="prev()" style="background:linear-gradient(to bottom,white,#e8e8e8)">&#65308;上一页</div>
    <div :class="[{'clicked':current==1},'btn','margin']" @click="jumpTo(1)"  >1</div>
    <div class=" more">
      <span
        @mouseenter="showToEnd()"
        class="showMore"
        v-show="(!(pageCount<=9))&&(current>5)"
        >···</span
      ><span @mouseleave="hideToEnd()" v-show="showPrev" >&laquo;</span>
    </div>
    <div @click="jumpTo(item)" :class="[{'clicked':current==item},'btn','margin']" v-for="(item, index) in pagerList" :key="index">
      {{ item }}
    </div>
    <div class="more">
      <span
        @mouseenter="showToEnd()"
        class="showMore"
        v-show="(!(pageCount<=9)&&(current<(pageCount-4)))"
        >···</span
      ><span @mouseleave="hideToEnd()" v-show="showNext" >&raquo;</span>
    </div>
    <div :class="[{'clicked':current==pageCount},'btn','margin']" @click="jumpTo(pageCount)">{{ pageCount }}</div>
    <div class="btn margin" @click="next()" style="background:linear-gradient(to bottom,white,#e8e8e8)" >下一页&#65310;</div>
  </div>
</template>

<script>
export default {
  name: "pager",
  components: {},
  props: {
    total: {
      type: Number,
      default: 9,
    },
  },
  data() {
    return {
      number: 1,
      //pager指这个页面显示的按钮数
      //total是指一共有多少分页
      pageCount: 0,
      pager: 9,
      current: 1,
      showPrev:false,
      showNext:false,
      pagerList:[],
    };
  },
  watch: {
    total(newVal) {
      this.pageCount = newVal;
      this.pagers()
    },
    // current(newVal){
    // }
  },
  computed: {

  },
  methods: {
    init() {
      this.pageCount = this.total;
      this.pagers()
    },
    showToEnd() {
      this.isToEnd = true;
    },
    hideToEnd() {
      this.isToEnd = false;
    },
    prev(){
      if(this.current<=1){
        return
      }else{
        this.current -=1
      }
    },
    next(){
      if(this.current>=this.pageCount){
        return
      }else{
        this.current +=1
        this.jumpTo(this.current)
      }
    },
    pagers(){
      let array = [];
      // let current = index
      let total = this.pageCount
      let pager = this.pager
      let half = Math.ceil(((this.pager)/2)+1)
      //当总页数大于等于分页按钮数
      if (total > pager) {
        if((this.current>=half)&&(this.current<total-4)){
          for(let i = this.current-3;i<this.current+4;i++){
          array.push(i)
          this.pagerList = array
          }
          return
        }else if(this.current>=(total-4)){
          for(let i = (total-8);i<total;i++){
            array.push(i)

            this.pagerList = array
          }
          return
        }
        for (let i = 0; i < pager - 2; i++) {
          array.push(i + 2);
        }
        this.pagerList = array;
      }
      //当总页数小于分页按钮数
      if(total <= pager){
        pager = total
        for (let i = 0; i < pager-2; i++) {
          array.push(i + 2);
        }
        this.pagerList = array;
      }
    },

    jumpTo(index){
      this.current = index
      this.pagers()
      this.$emit('jumpTo',index)
    }
  },
  created() {
    this.init();

  },
  mounted() {},
};
</script>
<style scoped>
.wrap {
  justify-content: center;
  align-items: center;
}

.more {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

}

.btn{
  border:1px solid #cccccc;
  padding:3px 7px;
  font-size:12px;
}
.margin {
  margin: 0 2px 0 1px;
  cursor: pointer;
}
.clicked{
  color:white;
  background:linear-gradient(to bottom,#ed1f29,#bd0a0d)
}
</style>