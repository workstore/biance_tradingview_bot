import { ref } from "vue";
// import { StorageKeys } from "@/utils/storage";
import { createGlobalState, useSessionStorage } from "@vueuse/core";
import { createInjectionState } from "@vueuse/shared";

const [useProviderFormStore, useFormStore] = createInjectionState(
  (IpfsHash, address) => {
    // state
    const imageHash = ref(IpfsHash || "");

    const wallet = ref(address || "");

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

    return {
      imageHash,
      wallet,
      updateHash,
      updateWallet,
      minted,
      updateMinted,
    };
  }
);

export { useFormStore, useProviderFormStore };

export const useUserLang = createGlobalState(() =>
  // default as en
  useSessionStorage("node-lang", "en")
);
