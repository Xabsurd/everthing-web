<template>
  <div id="everthing" class="light" ref="everthing">
    <div class="search-box">
      <button @click="prev">上一步</button>
      <button @click="next">下一步</button>
      <input v-model="searchValue" @keydown="handleKeydown" />
      <button @click="submit"><i class="iconfont icon-search"></i></button>
      <!-- <checkbox v-model="autoCell">自动列</checkbox> -->
      <checkbox v-model="isLayout">Layout</checkbox>
    </div>
    <File
      ref="file"
      :list="list"
      :isLayout="isLayout"
      :cellSize="cellSize"
      class="file"
      @itmeclick="handleItemClick"
    ></File>
    <div class="image-viewer" ref="image-viewer">
      <img v-for="(item, index) in imgs" :key="index" :src="item" />
    </div>
  </div>
</template>

<script>
import File from "./components/File.vue";
import Checkbox from "./components/Checkbox.vue";
import axios from "axios";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
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
      searchHistory: [],
      historyIndex: 0,
      maxCount: 10000,
      results: [],
      totalResults: 0,
      cellCount: 5,
      list: [],
      cellSize: 180,
      isLayout: true,
      imageExt: ["jpg", "jpeg", "png", "gif", "bmp", "webp"],
      imgs: [],
      baseUrl: "/api",
    };
  },
  methods: {
    request() {
      return axios.get(this.baseUrl, {
        params: {
          s: this.searchValue,
          json: 1,
          count: this.maxCount,
          size_column: 1,
          date_modified_column: 1,
          path_column: 1,
        },
      });
    },
    handleKeydown(e) {
      //回车
      if (e.keyCode === 13) {
        this.submit();
      }
    },
    submit(his) {
      if (!his) {
        this.searchHistory.push(this.searchValue);
        this.historyIndex = this.searchHistory.length - 1;
      }

      this.request().then((res) => {
        this.results = res.data.results;
        this.changeCell(this.cellCount);
      });
    },
    resize() {
      const cell = Math.floor((this.$refs.everthing.clientWidth - 50) / this.cellSize);
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
      }
    },
    handleItemClick(item) {
      if (item.type === "folder") {
        this.searchValue = `parent:"${
          item.path.length < 1 ? item.name : item.path + "\\" + item.name
        }"`;
        this.submit();
      } else {
        const ext = item.name.split(".").pop();
        if (this.imageExt.includes(ext)) {
          this.initImage(item);
        }else{
          window.open(this.baseUrl+item.path+"/"+item.name);
        }
      }
    },
    prev() {
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.searchValue = this.searchHistory[this.historyIndex];
        this.submit(true);
      }
    },
    next() {
      if (this.historyIndex < this.searchHistory.length - 1) {
        this.historyIndex++;
        this.searchValue = this.searchHistory[this.historyIndex];
        this.submit(true);
      }
    },
    initImage(item) {
      this.imgs = [];
      let showindex = 0;
      for (let i = 0; i < this.results.length; i++) {
        const element = this.results[i];
        const ext = element.name.split(".").pop();

        if (this.imageExt.includes(ext) && element.size > 10) {
          this.imgs.push(
            this.baseUrl +
              encodeURIComponent(`${element.path.replace("/\\/g", "/")}/${element.name}`)
          );
          if (item.name === element.name) {
            showindex = this.imgs.length - 1;
          }
        }
      }

      this.$nextTick(() => {
        this.imgv.update();
        this.imgv.view(showindex);
        this.imgv.show();
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.submit();
      const obs = new ResizeObserver(this.resize);
      obs.observe(this.$refs.everthing);
    });
    // const _this = this;
    this.imgv = new Viewer(this.$refs["image-viewer"], {
      viewed() {
        // _this.imgv.zoomTo(1);
      },
    });
  },
  beforeUnmount() {
    this.imgv.destroy();
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
