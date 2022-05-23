<template>
  <div class="wallet-connect">
    <div class="form-header-section">
      <h2 class="form-header-title">Creator Information</h2>
      <div style="font-size: 14px; z-index: 0">
        Select the wallet you would like to use to interact with the Ethereum
        network. This will be the account that your identity will be associated
        with and NFTs will be minted from
        <div class="buble" style="display: inline; margin: 0px; width: auto">
          <img
            id="question-mark"
            src="../../assets/images/question.svg"
            alt="Placeholder text"
            style="width: 13px"
          />
          <p style="width: 350px; right: 0px">
            Are you new to crypto and don't have a wallet yet? No worries! We
            are working on enabling you to use USD, where CXIP will create a
            unique wallet for you that will only work with your account (coming
            soon).
          </p>
        </div>
      </div>
    </div>
    <label
      class="form-button"
      :class="gotAccount ? 'active' : ''"
      for="ownWallet"
      @click="dialogVisible = true"
      ><span>{{ connectText }}</span>
      <img
        v-if="gotAccount"
        src="../../assets/images/close.svg"
        class="close"
        alt=""
        @click.exact.stop="disconnect"
      />
    </label>
    <ElDialog v-model="dialogVisible" width="460px" center>
      <template #title><span class="header">Select Wallet!</span></template>
      <SelectConnect
        @open="wdialogVisible = true"
        @close="
          (name) => {
            dialogVisible = false;
            accountName = name;
          }
        "
      ></SelectConnect>
      <template #footer></template>
    </ElDialog>
    <!-- <ElDialog v-model="wdialogVisible" width="460px" center>
      <WalletModal @close="wdialogVisible = false"></WalletModal>
      <template #footer></template>
    </ElDialog> -->
  </div>
</template>

<script setup>
import { watch, onMounted, ref, computed } from "vue";
import { ElDialog } from "element-plus";
import SelectConnect from "@/components/SelectConnect.vue";
import WalletModal from "./WalletModal.vue";
// import { WalletType } from "@/types/provider";

const connectType = ref("ether");
const accountName = ref("");
const dialogVisible = ref(false);
const wdialogVisible = ref(false);

const connectText = computed(() => {
  if (accountName.value === "") {
    return "CONNECT WALLET";
  }
  if (accountName.value.length > 4) {
    const prefix = accountName.value.slice(0, 4);
    const middle = "...";
    const last = accountName.value.slice(
      accountName.value.length - 4,
      accountName.value.length
    );
    return `${prefix}${middle}${last}`;
  }
  return accountName.value;
});

const gotAccount = computed(() => {
  return accountName.value !== "";
});

const getProvider = (providerType) => {
  const map = {
    ether: window.ethereum,
    // onto: window.onto,
    // "Web3.givenProvider": Web3.givenProvider,
  };
  // TODO alert if wallet not installed
  return map[providerType];
};

// const metaMaskConnect = async (provider) => {
//   if (!provider.isConnected()) {
//     // connect first
//     try {
//       const [acc] = await provider.request({ method: "eth_requestAccounts" });
//       accountName.value = acc;
//     } catch (error) {
//       if (error.code === 4001) {
//         // EIP-1193 userRejectedRequest error
//         console.log("Please connect to MetaMask.");
//       }
//     }
//   }
//   try {
//     const chainId = await provider.request({ method: "eth_chainId" });
//     if (chainId !== "0x4") {
//       // show error or swtich
//       const result = await provider.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: "0x4" }],
//       });
//     }
//     const [acc] = await provider.request({ method: "eth_requestAccounts" });
//     accountName.value = acc;
//     console.log("debug matamask provider", acc[0]);
//   } catch (error) {
//     console.log("MetaMask error.", error);
//   }
// };

const connectWallet = async () => {
  const provider = getProvider(connectType.value);
  // if (connectType.value === "ether") {
  //   await metaMaskConnect(provider);
  // }
};

const disconnect = async () => {
  accountName.value = "";
};
</script>

<style lang="scss" scoped>
.form-header-section {
  padding-bottom: 30px;
}
.form-button {
  position: relative;
  color: #15092c;
  cursor: pointer;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 260px;
  height: 50px;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 4px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-family: "Open Sans Semibold";
  &.active {
    background: #000;
    color: #fff;
  }
}

.close {
  filter: invert(100%);
  color: black;
  position: absolute;
  left: 89%;
  width: 16px;
}

.header {
  text-align: center;
  font-family: WhyteInktrapRegular;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
}
</style>
