<template>
  <h5>hash {{ imageHash }} address: {{ wallet }}</h5>
  <div class="checkbox-section" style="cursor: default">
    <label class="checkbox-container" style="position: relative"
      >Enable
      <a
        href="https://infiniteobjects.com/"
        target="_blank"
        style="color: rgb(0, 72, 255)"
        >Infinite Objects</a
      >
      for this NFT<input name="infiniteObjects" type="checkbox" /><span
        class="checkmark check-area"
      ></span
    ></label>
  </div>
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
          name="rigthsVerifiaction"
          type="checkbox" /><span class="checkmark check-area"></span
      ></label>
    </div>
  </div>
  <div>
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
      indemnify and hold harmless CXIP from and against any claim, demand,
      damage, debt, liability, account, reckoning, obligation, cost, expense,
      lien, action, or cause of action based on, in connection with or arising
      out of any breach of the representation and warranty contained herein.
    </p>
  </div>
  <div class="button-container button-container--left-placed">
    <button
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
import { onMounted } from "vue";
import { ThreeDX_Contract_Address } from "@/utils/globalConfig.json";

const { imageHash, wallet } = useFormStore();

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const mint = async () => {
  const threeDXContact = new ethers.Contract(
    ThreeDX_Contract_Address,
    threeDXAbi.abi,
    provider
  ).connect(signer);
  const image = imageHash;
  // const image = "ipfs_cid";
  console.log(
    "debug call contract",
    signer,
    threeDXContact.address,
    threeDXContact.signer,
    threeDXContact.provider
    // ThreeDX_Contract_Address,
    // threeDXAbi.abi,
    // provider,
    // signer
  );
  const tx = await threeDXContact.mint(image);
  tx.wait();
};

const validateForm = () => {
  let r = false;
  if (!imageHash.value || !wallet.value) {
    return r;
  }
  r = true;
  return r;
};

const handleCallContract = async () => {
  console.log(
    "debug env",
    ThreeDX_Contract_Address,
    imageHash,
    wallet,
    validateForm()
  );
  if (validateForm()) {
    try {
      await mint();
    } catch (error) {
      console.log("debug error", error);
    }
  }
};

onMounted(() => {});
</script>
