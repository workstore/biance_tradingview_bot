import { ref } from "vue";
// import { StorageKeys } from "@/utils/storage";
import { createGlobalState, useSessionStorage } from "@vueuse/core";
import { createInjectionState } from "@vueuse/shared";

const [useProviderFormStore, useFormStore] = createInjectionState(
  (IpfsHash: string, address: string) => {
    // state
    const imageHash = ref<string>(IpfsHash || "");

    const wallet = ref<string>(address || "");

    const updateHash = (hash: string) => {
      imageHash.value = hash;
    };

    const updateWallet = (addrHex: string) => {
      wallet.value = addrHex;
    };
    return { imageHash, wallet, updateHash, updateWallet };
  }
);

export { useFormStore, useProviderFormStore };

export const useUserLang = createGlobalState(() =>
  // default as en
  useSessionStorage("node-lang", "en")
);
