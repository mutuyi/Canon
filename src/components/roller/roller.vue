<template>
  <div >
    <div >
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name:'roller',
  components: {},
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
.rollerMain{
  display:flex;
  flex-direction: row;
}
</style>