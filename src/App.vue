<template>
  <div id="everthing">
    <div class="search-box">
      <input v-model="searchValue">
    </div>
    <File ref="file"></File>
  </div>
</template>

<script>
import File from "./components/File.vue"
export default {
  name: "App",
  data() {
    return {
      searchValue: "",
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    File
  },
};
</script>

<style lang="scss" scoped>
@import url("./styles/app.scss");
#everthing{
  display: flex;
  flex-direction: column;
  .search-box{
    display: flex;
  }
}
</style>