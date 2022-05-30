<template>
  <div
    style="
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    "
  >
    <div class="checkbox-section" style="cursor: default">
      <label class="checkbox-container" style="position: relative"
        >I verify that I have the legal rights to mint this NFT<input
          v-model="checked"
          name="rigthsVerifiaction"
          type="checkbox" /><span class="checkmark check-area"></span
      ></label>
    </div>
  </div>
  <div v-if="checked">
    <p
      style="
        font-size: 12px;
        font-family: 'Open Sans Regular';
        margin-left: 37px;
      "
    >
      By checking this box, you agree, represent, and warrant that you are the
      lawful owner of the underlying intellectual property rights of the asset
      and have the legal rights to create an NFT with the asset. You agree to
      indemnify and hold harmless anyone from and against any claim, demand,
      damage, debt, liability, account, reckoning, obligation, cost, expense,
      lien, action, or cause of action based on, in connection with, or arising
      out of any breach of the representation and warranty contained herein.
    </p>
  </div>
  <div class="button-container button-container--left-placed">
    <button
      :disabled="!validateForm()"
      :class="!validateForm() ? 'disable' : ''"
      type="submit"
      class="form-button single-button"
      @click="handleCallContract"
    >
      Continue
    </button>
  </div>
</template>
<script setup>
import { ethers } from "ethers";
import threeDXAbi from "@/api/ThreeDX.json";
import { useFormStore } from "@/store/index";
import { onMounted, ref } from "vue";
import { ThreeDX_Contract_Address } from "@/utils/globalConfig.json";
import { saveEmail } from "@/api/form";
import { useRoute } from "vue-router";

const { query } = useRoute();

const { imageHash, wallet, updateMinted } = useFormStore();

const checked = ref(false);

// TODO
const mint = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const threeDXContact = new ethers.Contract(
    ThreeDX_Contract_Address,
    threeDXAbi.abi,
    provider
  ).connect(signer);
  const image = imageHash.value;
  const tx = await threeDXContact.mint(image);
  tx.wait();
};

const validateForm = () => {
  let r = false;
  if (!imageHash.value || !wallet.value || !window.ethereum) {
    return r;
  }
  r = true;
  return r;
};

const handleCallContract = async () => {
  if (validateForm()) {
    try {
      const res = await mint();
      // save
      const { email } = query;
      const body = {
        address: email,
        imageHash: imageHash.value,
      };
      const code = await saveEmail(body);
      console.log("debug mmmm", useRoute(), body, code);
      ElMessage({
        message: "Success!",
        type: "success",
      });
      updateMinted(false);
    } catch (error) {
      console.log("debug error", error);
    }
  }
};

onMounted(() => {});
</script>
<style lang="scss" scoped>
.disable {
  color: black;
  background: white;
  opacity: 0.3;
}
</style>
