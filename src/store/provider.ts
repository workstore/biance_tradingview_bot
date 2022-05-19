import { createGlobalState } from "@vueuse/core";

import { ref } from "vue";
// import { DApi } from "@ont-dev/ontology-dapi";

export const useOntologyClient = createGlobalState(() => ref<any | null>(null));
