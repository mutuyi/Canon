<template>
  <div class="wrap">
    <div class="titleWrap">
      <div class="title"><slot></slot></div>
    </div>
    <div class="resultWrap" style="border-bottom: 1px solid #d6d6d6">
      <div class="itemList">
        <div v-for="item in list" :key="item.id" class="item">
          <div v-if="class1 == 'songs'" class="span1">
            <router-link
              :to="{ name: 'song', query: { id: item.id } }"
              class="itemText"
              >
              <span v-html="$options.filters.highlight(item.name)"></span>
              <span v-for="(artist, index) in item.artists" :key="index">
                <span v-if="index == 0">-</span>
                <span v-else>&nbsp;</span>
                <span v-html="$options.filters.highlight(artist.name)"></span>
              </span
              ></router-link
            >
          </div>
          <!-- <div v-if="class1 == 'songs'">{{item.name | plus(item.artists[0].name)}}</div> -->
          <div v-if="class1 == 'artists'" class="span1">
            <router-link
              to="/"
              class="itemText"
              v-html="$options.filters.highlight(item.name)"
            ></router-link>
          </div>
          <div v-if="class1 == 'albums'" class="span1">
            <router-link
              to="/"
              class="itemText"
            >
            <span v-html="$options.filters.highlight(item.name)"></span>
            <span>-</span>
            <span v-html="$options.filters.highlight(item.artist.name)"></span>
            </router-link>
          </div>
          <div v-if="class1 == 'playlists'" class="span1">
            <router-link
              to="/"
              class="itemText"
              v-html="$options.filters.highlight(item.name)"
            ></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let that;
export default {
  name: "resultCardItem",
  components: {},
  props: {
    search: "",
    cls: "",
    resultList: [],
  },
  data() {
    return {
      list: [],
      class1: "",
      value123: "123",
    };
  },
  filters: {
    plus: function (value1, value2) {
      if (value2 != "") {
        return value1 + "-" + value2;
      } else {
        return value1;
      }
    },
    highlight: function (val1) {
      let str = val1
      let keywords = that.value123
      let reg = new RegExp(keywords,"gi")
      let final = str.replace(reg, (val)=>{
        return "<span style='color:#0f75c3';>" + val + "</span>"
      });
      return final;
    },
  },
  watch: {
    search() {
      this.value123 = this.search;
    },
    resultList() {
      this.list = this.resultList;
    },
    cls() {
      this.class1 = this.cls;
    },
  },
  computed: {},
  methods: {
    init() {
      this.list = this.resultList;
      this.class1 = this.cls;
      this.value123 = this.search;
      that = this;
    },
  },
  beforeCreate() {},
  created() {
    this.init();
  },
  mounted() {},
};
</script>
<style scoped>
.wrap {
  display: flex;
  flex-direction: row;
}
.titleWrap {
  width: 72px;
  background: white;
  border-right: 1px solid #d6d6d6;
}
.title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* align-items: flex-start; */
  /* margin:10px 3px 0px 5px; */
  margin-top: 10px;
  min-width: 70px;
}
.resultWrap {
  flex: 1;
  width: 70%;
}
.itemList {
  display: flex;
  flex-direction: column;
  flex: 1;
  font-size: 14px;

  width: 100%;
}
.item {
  flex: 1;
}
.item:hover {
  background: #d6d6d6;
}
.span1 {
  height: 25px;
  margin-left: 10px;
  margin-top: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.itemText {
  color: black;
}
</style >