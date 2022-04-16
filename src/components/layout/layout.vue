<template>
  <div>
    <header class="header">
      <slot name="header"></slot>
    </header>
    <div class="subHeader">
      <slot name="subnav"></slot>
    </div>
    <section class="main">
      <slot name="lSection" class="lSection"></slot>
        <slot></slot>
      <slot name="rSection" class="rSection"></slot>
    </section>
    
    <footer class="footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Layout",
  components: {},
  props: {},
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
.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  min-width: 1140px;
  height: 70px;
  background: #242424;
  overflow-x: hidden;
  overflow-y: hidden;
}
.subHeader {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  min-width: 1120px;
  background: #c20c0c;
  overflow-x: hidden;
}
.main {
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-width:1120px;
  margin-bottom: 0px;
}

.playerContainer {
  position: fixed;
  width: 100%;
  height: 53px;
  bottom: 0px;
  background: rgba(1, 1, 1, 0.8);
}
</style>