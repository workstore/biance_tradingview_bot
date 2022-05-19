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
    <label class="form-button" for="ownWallet" style="position: relative"
      ><span>CONNECT WALLET</span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.form-header-section {
  padding-bottom: 30px;
}
.form-button {
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
}
</style>
