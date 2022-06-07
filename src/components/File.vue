<template>
  <DynamicScroller
    :items="list"
    :min-item-size="54"
    :pageMode="true"
    :class="[isLayout ? 'layout' : 'detail']"
  >
    <template v-slot="{ item, index, active }">
      <DynamicScrollerItem
        :item="item"
        :active="active"
        :data-index="index"
        class="file-item"
        v-if="isLayout"
      >
        <div v-for="(data, key) in item.data" :key="index * key">{{ data.name }}</div>
      </DynamicScrollerItem>
      <DynamicScrollerItem
        :item="item"
        :active="active"
        :data-index="index"
        class="file-item"
        v-if="!isLayout"
      >
        <div>{{ item.name }}</div>
        <div>{{ sizeFormat(item.size) }}</div>
        <div>{{ item.date_modified }}</div>
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
  },
  methods: {
    /**
     * 格式化日期(Y:年m:月d:日 H:时M:分S:秒)
     * @param {String} fmt 格式化样式，例如"YYYY:mm:dd HH:MM:SS"
     * @param {Date} date 被格式化的时间
     * @returns 格式化后的日期字符串
     */
    dateFormat(fmt, date) {
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
      console.log(size);
      return (size / 1024).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style lang="scss" scoped>
.scroller {
  height: 100%;
}
.detail {
  .file-item {
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    &:hover {
      background-color: var(--color-primary-light6);
    }
    > div {
      border-right: 1px solid var(--color-primary-light6);
      flex: 1;
    }
  }
}
.layout {
  .file-item {
    height: 200px;
    display: flex;
  }
}
</style>
