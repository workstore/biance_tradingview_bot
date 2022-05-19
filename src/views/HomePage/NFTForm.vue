<template>
  <div>
    <div>
      <div style="display: flex">
        <label class="label-input">Creator</label>
      </div>
      <input
        name="creator"
        aria-invalid="false"
        class="input-field"
        placeholder="Enter the name or pseudonym of the creator"
      /><span style="color: red"></span>
    </div>
    <div
      class="line-devider line-devider--big-gutter"
      style="margin-bottom: 20px"
    ></div>
    <div class="form-header-section">
      <h2 class="form-header-title">NFT Details</h2>
      <p style="font-size: 14px; z-index: 0">
        This information will be visible on marketplaces.
      </p>
    </div>
    <div style="padding-bottom: 20px">
      <div style="display: flex"><label class="label-input">Title</label></div>
      <input
        name="title"
        aria-invalid="false"
        class="input-field"
        placeholder="Enter the NFT title"
      /><span style="color: red"></span>
    </div>
    <div style="padding-bottom: 20px">
      <div>
        <div style="display: flex">
          <label class="label-input">Description</label>
        </div>
        <textarea
          name="description"
          aria-invalid="false"
          class="text-area-field"
          placeholder="Enter the NFT description"
          type="textfield"
        ></textarea
        ><span style="color: red"></span>
      </div>
    </div>
    <div class="label-input">
      <h3 class="file-desc-title">Upload the NFT File</h3>
      <p class="file-desc-text"></p>
    </div>
    <p style="font-size: 14px; z-index: 0; padding-bottom: 20px"></p>
  </div>
  <label class="custom-file-upload" tabindex="0"
    ><input
      multiple="true"
      type="file"
      autocomplete="off"
      tabindex="-1"
      name="file"
      style="display: none"
    />
    <div class="custom-fiile-content-container">
      <img
        class="custom-file-icon"
        src="../../assets/images/cloud_upload_24px.svg"
        alt="icon"
      />
      <p class="custom-file-title">
        Drag and drop or
        <span class="custom-file-title--accent">select from drive</span>
      </p>
    </div></label
  >
  <div
    class="line-devider line-devider--big-gutter"
    style="margin-bottom: 20px"
  ></div>
  <div style="padding-bottom: 20px">
    <div style="display: flex">
      <label class="label-input">Smart Contract Name</label>
      <div class="buble">
        <img
          id="question-mark"
          src="../../assets/images/question.svg"
          alt="Placeholder text"
        />
        <p>The smart contract name will be the name of your collection</p>
      </div>
    </div>
    <input
      name="collectionName"
      aria-invalid="false"
      class="input-field"
      placeholder="Enter the smart contract name for your NFT"
    /><span style="color: red"></span>
  </div>
  <div>
    <div style="display: flex">
      <label class="label-input">Smart contract symbol</label>
      <div class="buble">
        <img
          id="question-mark"
          src="../../assets/images/question.svg"
          alt="Placeholder text"
        />
        <p>
          Use a custom symbol on your smart contract for Token Trackers to
          display on transaction
        </p>
      </div>
    </div>
    <input
      name="collectionSymbol"
      aria-invalid="false"
      class="input-field"
      placeholder="Enter the smart contract symbol for your NFT"
    /><span style="color: red"></span>
  </div>
</template>
