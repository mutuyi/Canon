<template>
  <div class="rankListItemWrap">
    <p class="itemIndex" :style="index <= 2 ? 'color:red;' : ''">
      {{ index + 1 }}
    </p>
    <router-link :to="{name:'song',query:{id:item.id}}" class="item">{{ item.name }}</router-link>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ranklist-item",
  components: {},
  props: {
    index: "",
    item: [],
  },
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
.itemIndex {
  /* position:relative; */
  /* float:left; */
  width: 35px;
  height: 32px;
  line-height: 32px;

  font-size: 16px;
  text-align: center;

  padding: 0;
  margin: 0 0 0 30px;
}
.item {
  width: 230px;
  margin-left: 15px;
  color:black;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item:hover{
  text-decoration: underline;
}
.rankListItemBtnWrap{
  position:absolute;
  display:flex;
  flex-direction: row;
  justify-content: center;;
  align-items: center;
  right:0;
  top:0;
  width:64px;
  height:32px;
  z-index:2;
  background:inherit;

}

</style>