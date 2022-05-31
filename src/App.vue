<template>
  <div class="main-container">
    <RouterView />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.main-container {
  overflow: hidden;
}
</style>

<style lang="scss">
@import "element-plus/theme-chalk/src/dark/css-vars.scss";
@import "element-plus/dist/index.css";
// @import "./styles/dark/css-vars.css";
</style>
