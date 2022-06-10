<template>
  <svg viewBox="0 0 1024 1024" class="file-svg">
    <g>
      <title>Layer 1</title>
      <path
        d="m308,33c-41,0 -73,38 -75,77c0,0 0,0 0,0l0,790c0,60 35,90 90,90l540,0c63,0 90,-35 90,-90l0,-688l-180,-180l-465,1z"
        class="path1"
      />
      <path d="m771,32l0,180l180,0l-180,-180z" class="path2" />
      <path d="m351,174c-27,0 -27,39 0,39l160,0c27,0 27,-39 0,-39l-160,0z" class="path3" />
      <path d="m351,254c-27,0 -27,39 0,39l320,0c27,0 27,-39 0,-39l-160,0l-160,0z" class="path3" />
      <path d="m351,334c-27,0 -27,39 0,39l320,0c27,0 27,-39 0,-39l-160,0l-160,0z" class="path3" />
      <path
        d="m131,472c-38,-1 -55.24138,-27.68966 -58,-52.93103l0,327.93103c0,57 50,106 109,107l588,0c57,0 87,-33 84,-84l0,-220c2,-40 -26,-77 -71,-78l-652,0z"
        class="path4"
      />
      <path d="m234,353l-111,0c-67,0 -68,117 0,121l111,0z" class="path5" />
      <text y="690" x="460" fill="#000000" class="text"><slot></slot></text>
    </g>
  </svg>
</template>

<script>
export default {
  name: "file-svg",
};
</script>

<style lang="scss" scoped>
.file-svg {
  .path1 {
    fill: #fff5f5;
  }
  .path2 {
    fill: #ece6f2;
  }
  .path3 {
    fill: #d3cbe4;
  }
  .path4 {
    fill: #80aaff;
  }
  .path5 {
    fill: #6680ff;
  }
  .text {
    display: block;
    fill: #fff;
    font-size: 256px;
    text-anchor: middle;
    /* 文本水平居中 */
    dominant-baseline: middle;
    /* 文本垂直居中 */
  }
}
</style>
