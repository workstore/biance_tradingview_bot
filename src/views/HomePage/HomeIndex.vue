<template>
  <div class="common-layout">
    <div class="subnav"></div>
    <div class="form-section">
      <div class="form-container">
        <WalletConnect></WalletConnect>
        <div
          class="line-devider line-devider--big-gutter"
          style="margin-bottom: 20px"
        ></div>
        <NFTForm></NFTForm>
        <div
          class="line-devider line-devider--big-gutter"
          style="margin-bottom: 20px"
        ></div>
        <Progress></Progress>
        <div
          class="line-devider line-devider--big-gutter"
          style="margin-bottom: 20px"
        ></div>
        <Operation></Operation>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { ref, onMounted, computed, watch } from "vue";
import WalletConnect from "@/views/HomePage/WalletConnect.vue";
import NFTForm from "@/views/HomePage/NFTForm.vue";
import Progress from "@/views/HomePage/Progress.vue";
import Operation from "@/views/HomePage/Operation.vue";

const { t } = useI18n();

onMounted(() => {});
</script>
