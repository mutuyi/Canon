 <template>
  <div class="closeBtnMain flex-row">
    <svg
      t="1648044329292"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1113"
      :width="width"
      :height="height"
      @mouseenter="light()"
      @mouseleave="gray()"
    >
     <path
        d="M1007.603202 929.818395L592.684241 514.699473 1007.603202 99.780512c10.797891-10.797891 16.196837-24.795157 16.196837-38.992385 0-13.997266-5.398946-28.194493-16.196837-38.992384-21.595782-21.595782-56.388987-21.595782-77.984768 0L514.699473 436.914665 99.780512 21.795743C78.18473 0.199961 43.391525 0.199961 21.795743 21.795743s-21.595782 56.388987 0 77.984769l415.118922 414.918961L21.795743 929.818395c-21.595782 21.595782-21.595782 56.388987 0 77.984768s56.388987 21.595782 77.984769 0l414.918961-415.118922L929.818395 1007.603202c10.797891 10.797891 24.795157 16.196837 38.992384 16.196837 13.997266 0 28.194493-5.398946 38.992384-16.196837 21.395821-21.395821 21.395821-56.388987-0.199961-77.784807z"
        :fill="btnColor"
        p-id="2264"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: "closeBtn",
  components: {},
  props: {
    color: "",
    width: "",
    height: "",
    lightColor: "",
    deepColor: "",
  },
  data() {
    return {
      btnColor: "#666666",
      lightC: "",
      deepC: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    light() {
      this.btnColor = this.lightC;
    },
    gray() {
      this.btnColor = this.deepC;
    },
    init() {
      this.btnColor = this.color;
      this.lightC = this.lightColor;
      this.deepC = this.deepColor;
    },
  },
  created() {
    this.init();
  },
  mounted() {},
};
</script>
<style scoped>
.closeBtnMain {
  align-items: center;
}
</style>