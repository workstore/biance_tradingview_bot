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
        <NFTForm :royalty="progress"></NFTForm>
        <div
          class="line-devider line-devider--big-gutter"
          style="margin-bottom: 20px"
        ></div>
        <div
          style="
            display: flex;
            align-items: center;
            padding-top: 20px;
            padding-bottom: 12px;
          "
        >
          <div style="margin-right: 15px">
            <label class="switch" style="margin: -1px"
              ><input type="checkbox" name="royalty" /><span
                class="slider round"
              ></span
            ></label>
          </div>
          <h2 style="font-family: 'Open Sans Regular'; font-size: 15px">
            Enable resale royalty
          </h2>
        </div>
        <div
          style="
            display: flex;
            align-items: center;
            padding-top: 20px;
            padding-bottom: 12px;
          "
        >
          <h2
            style="
              font-family: 'Open Sans Regular';
              font-size: 15px;
              flex: 1 1 0%;
            "
          >
            Royalties percentage:
          </h2>
          <ElSlider
            v-model="progress"
            style="flex: 2 1 0"
            tooltip-class="slider-tip"
            :format-tooltip="(val) => `${val}%`"
          />
        </div>
        <div
          class="line-devider line-devider--big-gutter"
          style="margin-bottom: 20px"
        ></div>
        <Operation></Operation>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref, watch, computed, onBeforeMount } from "vue";
import WalletConnect from "@/views/NFTForm/WalletConnect.vue";
import { useProviderFormStore } from "@/store/index";
import { useCssVar } from "@vueuse/core";
import NFTForm from "@/views/NFTForm/NFTForm.vue";
import Operation from "@/views/NFTForm/Operation.vue";

const el = ref(null);
const color = useCssVar("--el-color-primary", el);
color.value = "#071215";
const progress = ref(20);

onBeforeMount(() => {
  // const test = "QmZbL66ACWvwANBvwcyfufEhzTjg1sMYR9fY69AU253Bnv";
  useProviderFormStore("");
});
</script>
