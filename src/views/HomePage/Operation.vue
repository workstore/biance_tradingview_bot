<template>
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
      style="color: black; background: white; opacity: 0.3"
    >
      Continue
    </button>
  </div>
</template>
