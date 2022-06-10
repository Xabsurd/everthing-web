<template>
  <div class="checkbox" @click="handleClick">
    <div class="rect" :class="modelValue ? 'checked' : ''"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "checkbox",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  methods: {
    handleClick() {
      this.$emit("update:modelValue", !this.modelValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  --checkbox-size: 14px;
  --checkbox-color: #409eff;
  --checkbox-icon-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  .rect {
    display: inline-block;
    width: var(--checkbox-size);
    height: var(--checkbox-size);
    border-radius: 4px;
    border: 1px solid var(--checkbox-color);
    position: relative;
    &.checked {
      background-color: var(--checkbox-color);
      &::before {
        content: "";
        width: calc(var(--checkbox-size) * 0.5);
        border: 2px solid #fff;
        height: calc(var(--checkbox-size) * 0.25);
        border-top: none;
        border-right: none;
        transform: rotate(-45deg);
        top: calc(var(--checkbox-size) * 0.25);
        left: calc(var(--checkbox-size) * 0.175);
        position: absolute;
      }
    }
  }
}
</style>
