<template>
  <div
    class="absurd-image"
    :style="{ 'font-size': fontSize }"
    :class="[error ? (hideError ? 'hide' : errorIcon) : '']"
  >
    <img :src="src" @error="handleError" @load="handleLoad" :class="[error ? 'error' : '']" />
  </div>
</template>

<script>
export default {
  name: "absurd-image",
  props: {
    src: {
      type: String,
      default: "",
    },
    fontSize: {
      type: String,
      default: "32px",
    },
    errorIcon: {
      type: String,
      default: "iconfont icon-file-unknown",
    },
    hideError: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      error: false,
    };
  },
  methods: {
    handleError() {
      this.error = true;
    },
    handleLoad() {
      this.error = false;
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.absurd-image {
  display: flex;
  align-items: center;
  justify-content: center;
  &:hide {
    display: none;
  }
  img {
    object-position: center;
    object-fit: cover;
    width: 100%;
    height: 100%;
    &.error {
      display: none;
    }
  }
}
</style>
