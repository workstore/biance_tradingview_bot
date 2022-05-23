import { ref } from "vue";
// import { StorageKeys } from "@/utils/storage";
import { createGlobalState, useSessionStorage } from "@vueuse/core";
import { createInjectionState } from "@vueuse/shared";

const [useProviderFormStore, useFormStore] = createInjectionState(
  (IpfsHash: string, address?: string) => {
    // state
    const imageHash = ref<string>(IpfsHash);

    const updateHash = (hash: string) => {
      imageHash.value = hash;
    };
    return { imageHash, address, updateHash };
  }
);

export { useFormStore, useProviderFormStore };

export const useUserLang = createGlobalState(() =>
  // default as en
  useSessionStorage("node-lang", "en")
);
