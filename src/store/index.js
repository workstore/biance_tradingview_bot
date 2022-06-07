import { ref } from "vue";
// import { StorageKeys } from "@/utils/storage";
import { createGlobalState, useSessionStorage } from "@vueuse/core";
import { createInjectionState } from "@vueuse/shared";

const [useProviderFormStore, useFormStore] = createInjectionState(
  (IpfsHash, address, progress, gltfHash) => {
    // state
    const imageHash = ref(IpfsHash || "");

    const wallet = ref(address || "");

    const royalty = ref(progress || 20);

    const threeDHash = ref(gltfHash || "");

    // loading
    const minted = ref(false);

    const updateHash = (hash) => {
      imageHash.value = hash;
    };

    const updateWallet = (addrHex) => {
      wallet.value = addrHex;
    };

    const updateMinted = (bool) => {
      minted.value = bool;
    };

    const updateRoyalty = (num) => {
      royalty.value = num;
    };

    const updateThreeDHash = (hash) => {
      threeDHash.value = hash;
    };

    return {
      imageHash,
      wallet,
      updateHash,
      updateWallet,
      minted,
      threeDHash,
      updateMinted,
      royalty,
      updateRoyalty,
      updateThreeDHash,
    };
  }
);

export { useFormStore, useProviderFormStore };

export const useUserLang = createGlobalState(() =>
  // default as en
  useSessionStorage("node-lang", "en")
);
