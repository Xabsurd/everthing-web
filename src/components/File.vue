<template>
  <DynamicScroller
    :items="list"
    :min-item-size="54"
    :pageMode="true"
    :class="[isLayout ? 'layout' : 'detail']"
    :style="{ '--cellSize': cellSize + 'px' }"
  >
    <template v-slot="{ item, index, active }">
      <DynamicScrollerItem
        :item="item"
        :active="active"
        :data-index="index"
        class="file-item"
        v-if="isLayout"
      >
        <div
          v-for="(data, dindex) in item.data"
          :key="index * dindex"
          @click="handleItmeClick(data)"
        >
          <absurd-image
            :src="
              data.type === 'folder'
                ? './assets/filetype/' + iconSize + '/folder.png'
                : getIcon(data.name)
            "
          ></absurd-image>
          {{ data.name }}
        </div>
      </DynamicScrollerItem>
      <DynamicScrollerItem
        :item="item"
        :active="active"
        :data-index="index"
        class="file-item"
        v-if="!isLayout"
        @click="handleItmeClick(item)"
      >
        <div>
          <absurd-image
            :src="
              item.type === 'folder'
                ? './assets/filetype/' + iconSize + '/folder.png'
                : getIcon(item.name)
            "
          ></absurd-image>
          {{ item.name }}
        </div>
        <div>{{ sizeFormat(item.size) }}</div>
        <div>{{ dateFormat(item.date_modified) }}</div>
        <div>{{ item.path }}</div>
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>

<script>
export default {
  name: "file-box",
  props: {
    list: Array,
    isLayout: Boolean,
    cellSize: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      iconSize: 512,
    };
  },
  methods: {
    handleItmeClick(item) {
      this.$emit("itmeclick", item);
    },
    //获取扩展名
    getIcon(name) {
      let ext = name.split(".").pop();
      return "./assets/filetype/" + this.iconSize + "/" + ext + ".png";
    },
    dateFormat(date) {
      const d = new Date(date / 10 / 1000);
      d.setFullYear(d.getFullYear() - 369);
      return this._dateFormat("YYYY-mm-dd HH:MM:SS", d);
    },
    /**
     * 格式化日期(Y:年m:月d:日 H:时M:分S:秒)
     * @param {String} fmt 格式化样式，例如"YYYY:mm:dd HH:MM:SS"
     * @param {Date} date 被格式化的时间
     * @returns 格式化后的日期字符串
     */
    _dateFormat(fmt, date) {
      var ret;
      var opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (var k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },
    sizeFormat(size) {
      //格式化为KB
      //每隔3位数加一个逗号
      return (size / 1024).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "KB";
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.scroller {
  height: 100%;
}
.detail {
  border-top: 1px solid var(--border-color);
  border-left: 1px solid var(--border-color);
  .file-item {
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    &:hover {
      background-color: var(--color-primary-light6);
    }
    > div {
      height: 100%;
      padding: 0 15px;
      box-sizing: border-box;
      border-right: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color);
      flex: 1;
      display: flex;
      align-items: center;
      z-index: 1000;
    }
    .absurd-image {
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }
  }
}
.layout {
  .file-item {
    height: var(--cellSize);
    display: flex;
    justify-content: space-evenly;
    > div {
      width: var(--cellSize);
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 5px;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      .absurd-image {
        width: calc(var(--cellSize) - 50px);
        height: calc(var(--cellSize) - 50px);
        font-size: calc(var(--cellSize) - 50px) !important;
      }
      &:hover {
        background-color: var(--color-primary-light6);
      }
    }
  }
}
</style>
