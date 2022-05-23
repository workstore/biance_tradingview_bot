<template>
  <div class="sc-bdnxRM jvCTkj">
    <div id="metamask" class="sc-gtsrHT gfuSqG" @click="handleMask">
      <span
        class="sc-dlnjwi dJXsSm"
        style="position: absolute; font-size: 10px; color: red"
        >{{ errorMsg }}</span
      ><span style="padding-left: 20px">Metamask</span
      ><img
        src="../assets/images/metamask.svg"
        alt="metamask"
        style="width: 43px; padding-right: 20px"
      />
    </div>
    <div id="connectWallet" class="sc-gtsrHT gfuSqG" @click="handleWallet">
      <span
        class="sc-dlnjwi dJXsSm"
        style="position: absolute; font-size: 10px; color: red"
        >{{ errorMsgw }}</span
      ><span style="padding-left: 20px">WalletConnect</span
      ><img
        src="../assets/images/wallet_connect.jpeg"
        alt="walletconnect"
        style="width: 43px; margin-right: 10px"
      />
    </div>
    <!-- <div id="ledger" class="sc-gtsrHT gfuSqG" @click="handleLedger">
      <span
        class="sc-dlnjwi dJXsSm"
        style="
          position: absolute;
          font-size: 10px;
          color: red;
          left: 0%;
          margin-top: 0.5rem;
        "
        >{{ errorMsgl }}</span
      ><span style="padding-left: 20px">Ledger</span
      ><img
        src="../assets/images/ledger_wallet.svg"
        alt="ledgerwallet"
        style="width: 133px"
      />
    </div> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
// import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {
  Wallet_Connect_Bridge,
  Wallet_Connect_InfuraId,
} from "@/utils/globalConfig.json";

const { t } = useI18n();
const emit = defineEmits(["open", "close"]);

const isMetamaskInstalled = Boolean(window.ethereum);
const isConnecting = ref(false);
const errorMsg = ref("");
const errorMsgw = ref("");
const errorMsgl = ref("");
const accountName = ref("");
const chanidMsg = "Unsupported chain id: 1. Supported chain ids are: 4.";

const isEqRinbeky = (value) => {
  return Number(value) === 4;
};

const clearMsg = () => {
  errorMsg.value = "";
  errorMsgw.value = "";
  errorMsgl.value = "";
};

const handleMask = async () => {
  errorMsg.value = "";
  if (!isMetamaskInstalled) {
    errorMsg.value = "No Ethereum provider was found on window.ethereum.";
  }
  const cnc = window.ethereum.isConnected();
  // errorMsg.value = "No Ethereum provider was found on window.ethereum.";
  if (!cnc) {
    // connect first
    try {
      const [acc] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      accountName.value = acc;
    } catch (error) {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log("Please connect to MetaMask.");
      }
    }
  }
  try {
    // accountName.value = acc;
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (!isEqRinbeky(chainId)) {
      // show error or swtich
      // const result = await window.ethereum.request({
      //   method: "wallet_switchEthereumChain",
      //   params: [{ chainId: "0x4" }],
      // });
      errorMsg.value = chanidMsg;
      return;
    }
    const [acc] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    accountName.value = acc;
    emit("close", accountName.value);
    // console.log("debug connect", cnc, isMetamaskInstalled, accountName.value);
  } catch (error) {
    errorMsg.value = error.message;
    console.log("MetaMask error.", error);
  }
};

const handleWallet = async () => {
  clearMsg();
  // bridge url
  const bridge = Wallet_Connect_Bridge;
  try {
    // create new connector
    const connector = new WalletConnect({
      infuraId: Wallet_Connect_InfuraId,
      bridge,
      qrcodeModal: QRCodeModal,
    });
    // check if already connected
    if (!connector.connected) {
      // create new session
      await connector.createSession();
    }
    console.log(
      "debug conne",
      connector,
      connector.connected,
      connector.chainId,
      connector.accounts,
      isEqRinbeky(connector.chainId)
    );
    if (!isEqRinbeky(connector.chainId)) {
      errorMsgw.value = chanidMsg;
      return;
    }
    const [acc] = connector.accounts;
    accountName.value = acc;
    emit("close", accountName.value);
    //
    // connector.on("display_uri", (err, payload) => {
    //   const uri = payload.params[0];
    //   console.log("test uri", uri);
    // });
  } catch (error) {
    errorMsgw.value = error.message;
  }
};

// const handleLedger = async () => {
//   clearMsg();
//   errorMsgl.value =
//     "U2F browser support is needed for Ledger. Please use Chrome, Opera or Firefox with a U2F extension. Also make sure you're on an HTTPS connection";
// };
</script>

<style lang="scss" scoped>
.jvCTkj {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: column;
  height: 2rem;
  gap: 0.3rem;
  margin: 0.41rem 0 0.8rem;
}

.gfuSqG {
  color: #15092c;
  text-align: center;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  width: 80%;
  margin: 0px auto;
  -webkit-box-align: center;
  align-items: center;
  border: 1px solid lightblue;
  border-radius: 5px;
  cursor: pointer;
  height: 48px;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  position: relative;
}

.dJXsSm {
  position: absolute;
  font-size: 10px;
  color: red;
  top: 64%;
  left: 10%;
}
</style>
