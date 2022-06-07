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
import { ElMessage } from "element-plus";
import { pinJSONToIPFS } from "@/api/ipfs";

const { query } = useRoute();

const { imageHash, wallet, updateMinted, royalty, threeDHash } = useFormStore();

const checked = ref(false);

const mintPayload = (name, gltfHash, gltfName = "") => {
  const p = {
    name,
    description: "generate by 3dx",
    image: `ipfs://${imageHash.value}`,
    // animation_url: `ipfs://${gltfHash}/${gltfName}`,
    animation_url: `ipfs://${gltfHash}`,
    royalty: royalty.value,
    model: "xxx",
  };
  // console.log("debug mintPayload ", gltfHash, p);
  return p;
};

// TODO
const mint = async (jsonHash) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const threeDXContact = new ethers.Contract(
      ThreeDX_Contract_Address,
      threeDXAbi.abi,
      provider
    ).connect(signer);
    const tx = await threeDXContact.mint(jsonHash);
    tx.wait();
  } catch (error) {
    console.log("debug mint error", error);
  }
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
      const name = "3dx";
      // const hash = "QmZeqUcuMcPeZjL8PzLvVeBXjEWxmCPRLQWXhjoB48xGus";
      // const fname = "skeleton-knight.gltf";
      // const hash = "QmavZioXik2rdjz7z4bBkj1cWjKVwxBPcNwsK3i3WaMbRz";
      // const fname = "t2.gltf";
      const hash = threeDHash.value;
      const p = mintPayload(name, hash);
      const h = await pinJSONToIPFS(p);
      const res = await mint(h);
      // console.log(threeDHash.value, hash, p);
      // save
      const { email } = query;
      const body = {
        address: decodeURIComponent(email),
        imageHash: imageHash.value,
      };
      const code = await saveEmail(body);
      ElMessage({
        message: "Success!",
        type: "success",
      });
      updateMinted(false);
      // setTimeout(() => {
      //   window.location.href = "/gltf";
      // }, 3500);
    } catch (error) {
      console.log("debug error", error);
    }
  }
};
</script>
<style lang="scss" scoped>
.disable {
  color: black;
  background: white;
  opacity: 0.3;
}
</style>
