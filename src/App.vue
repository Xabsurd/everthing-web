<template>
  <div id="everthing" class="light" ref="everthing">
    <div class="search-box">
      <input v-model="searchValue" @keydown="handleKeydown" />
      <button @click="submit"><i class="iconfont icon-search"></i></button>
      <!-- <checkbox v-model="autoCell">自动列</checkbox> -->
      <checkbox v-model="isLayout">Layout</checkbox>
    </div>
    <File ref="file" :list="list" :isLayout="isLayout" class="file"></File>
  </div>
</template>

<script>
import File from "./components/File.vue";
import Checkbox from "./components/Checkbox.vue";
import axios from "axios";
export default {
  name: "App",

  components: {
    // eslint-disable-next-line vue/no-unused-components
    File,
    // eslint-disable-next-line vue/no-unused-components
    Checkbox,
  },
  data() {
    return {
      autoCell: true,
      searchValue: "parent:",
      maxCount: 10000,
      results: [],
      totalResults: 0,
      cellCount: 5,
      list: [],
      itemSize: 200,
      isLayout: false,
    };
  },
  methods: {
    request() {
      return axios.get("/api", {
        params: {
          s: this.searchValue,
          json: 1,
          count: this.maxCount,
          size_column: 1,
          date_modified_column: 1,
          date_created_column: 1,
          attributes_column: 1,
        },
      });
    },
    handleKeydown(e) {
      //回车
      if (e.keyCode === 13) {
        this.submit();
      }
    },
    submit() {
      this.request().then((res) => {
        this.results = res.data.results;
        this.changeCell(this.cellCount);
      });
    },
    resize() {
      const cell = Math.floor(this.$refs.everthing.clientWidth / this.itemSize);
      if (cell > 0 && cell != this.cellCount) {
        this.changeCell(cell);
      }
    },
    changeCell(num) {
      if (num > 0) {
        this.cellCount = num;
        if (this.isLayout) {
          this.list = [];
          for (let i = 0; i < this.results.length; i += this.cellCount) {
            this.list.push({ id: i, data: this.results.slice(i, i + this.cellCount) });
          }
        } else {
          this.list = [];
          for (let i = 0; i < this.results.length; i++) {
            this.list.push({ id: i, ...this.results[i] });
          }
        }

        console.log(this.list);
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.submit();
      const obs = new ResizeObserver(this.resize);
      obs.observe(this.$refs.everthing);
    });
  },
  watch: {
    isLayout() {
      this.changeCell(this.cellCount);
    },
  },
};
</script>

<style lang="scss">
@import "./styles/app.scss";
@import "./styles/iconfont.css";
</style>
