<template>
  <div class="main-container">
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import { watch, onMounted, ref } from "vue";
</script>

<style lang="scss" scoped>
.main-container {
  overflow: hidden;
  // margin: 0 auto;
  // max-width: 1360px;
  // background-position: 100%;
  // background-repeat: repeat-y;
  // width: 100%;
  // min-height: 100vh;
  // overflow-x: hidden;
  // width: 90%;
}
</style>

<!-- <style lang="scss">
@import "./styles/index.scss";
</style> -->
