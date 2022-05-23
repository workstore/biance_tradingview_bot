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
  <!-- <button @click="loading = !loading">change view</button> -->
  <ElUpload
    v-show="!loading"
    ref="uploadRef"
    drag
    class="upload-demo"
    action="https://api.pinata.cloud/pinning/pinFileToIPFS/"
    :auto-upload="true"
    :show-file-list="false"
    :headers="headers"
    :on-progress="handleProgress"
    :on-success="handleSuccess"
    :on-error="handleError"
  >
    <template #trigger>
      <label class="custom-file-upload" tabindex="0">
        <div class="custom-fiile-content-container">
          <img
            class="custom-file-icon"
            src="../../assets/images/cloud_upload_24px.svg"
            alt="icon"
          />
          <p class="custom-file-title" @click="open">
            Drag and drop or
            <span class="custom-file-title--accent">select from drive</span>
          </p>
        </div>
      </label>
    </template>
  </ElUpload>
  <!--  -->
  <!-- <label class="custom-file-upload" tabindex="0"
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
      <p class="custom-file-title" @click="open">
        Drag and drop or
        <span class="custom-file-title--accent">select from drive</span>
      </p>
    </div>
  </label> -->
  <div v-if="loading" class="custom-file-upload">
    <div
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <div style="display: flex; align-items: center">
        <!-- <div class="file-thumbnail-image-container">
          <img
            class="file-thumbnail-img"
            src="../../assets/images/close.svg"
            alt="img"
          />
        </div> -->
        <span class="file-thumbnail-title"
          ><p>{{ fileName }}</p></span
        >
      </div>
      <!-- <img
        src="../../assets/images/clear.svg"
        alt="icon"
        @click="handleRemovefile"
      /> -->
    </div>
    <div class="upload-status-bar--container">
      <div>Uploading file...</div>
      <div class="spiner-bar-container">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="spinner"
          class="svg-inline--fa fa-spinner fa-w-16 fa-pulse"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          style="font-size: 24px; width: 24px; height: 24px"
        >
          <path
            fill="currentColor"
            d="M96 256c0-26.5-21.5-48-48-48S0 229.5 0 256s21.5 48 48 48S96 282.5 96 256zM108.9 60.89c-26.5 0-48.01 21.49-48.01 47.99S82.39 156.9 108.9 156.9s47.99-21.51 47.99-48.01S135.4 60.89 108.9 60.89zM108.9 355.1c-26.5 0-48.01 21.51-48.01 48.01S82.39 451.1 108.9 451.1s47.99-21.49 47.99-47.99S135.4 355.1 108.9 355.1zM256 416c-26.5 0-48 21.5-48 48S229.5 512 256 512s48-21.5 48-48S282.5 416 256 416zM464 208C437.5 208 416 229.5 416 256s21.5 48 48 48S512 282.5 512 256S490.5 208 464 208zM403.1 355.1c-26.5 0-47.99 21.51-47.99 48.01S376.6 451.1 403.1 451.1s48.01-21.49 48.01-47.99S429.6 355.1 403.1 355.1zM256 0C229.5 0 208 21.5 208 48S229.5 96 256 96s48-21.5 48-48S282.5 0 256 0z"
          ></path>
        </svg>
        <div class="upload-status-bar">
          <span style="padding-right: 5px; position: absolute"
            >{{ percentage }} %</span
          >
          <div
            class="upload-status-bar-inside"
            :style="{ width: percentage + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
  <!--  -->
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
<script setup>
import { onMounted, ref, reactive, watch } from "vue";
import { useFormStore } from "@/store/index";

// const { VAIT_APP_PINATA_KEY, VAIT_APP_PINATA_SECRET_KEY } = import.meta.env;
const { updateHash } = useFormStore();

const uploadRef = ref(null);
const loading = ref(false);
const headers = reactive({
  pinata_api_key: "523a8739ae6e8c1d0dcc",
  pinata_secret_api_key:
    "c3d03fd9d4a10c5482581dc75bb6177e6fa00d3d260a11aacacd218f111a46ea",
});
// upload
const thumbnail = ref("../../assets/images/close.svg");
const fileName = ref("file name");
const percentage = ref(30);

const handleProgress = (e, file) => {
  loading.value = true;
  const { percent, loaded, total } = e;
  const { name, percentage: per, size } = file;
  fileName.value = name;
  percentage.value = per;
  console.log("debug handleProgress ", e, file);
};

const handleSuccess = (response, file) => {
  loading.value = false;
  const { IpfsHash, PinSize, Timestamp } = response;
  const {
    name,
    percentage: per,
    size,
    raw: { type },
  } = file;
  updateHash(IpfsHash);
  console.log("debug handleSuccess ", response, file);
};

const handleError = (error, files) => {
  // loading.value = false;
  console.log("debug handleError", error, files);
};

const handleBefore = (args) => {
  console.log("debug handleBefore", args);
  loading.value = true;
};

const handleRemovefile = async () => {};

onMounted(async () => {});
</script>
<style lang="scss">
.upload-status-bar--container {
  height: 60px;
}

.upload-demo .el-upload-dragger {
  border: 0 none;
  padding: 0;
}
</style>
