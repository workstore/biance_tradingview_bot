<template>
  <div class="label-input">
    <h3 class="file-desc-title">
      Upload a 3D file for your 3DShuttle NFT File
    </h3>
    <p class="file-desc-text"></p>
  </div>
  <p style="font-size: 14px; z-index: 0; padding-bottom: 20px"></p>
  <ElUpload
    v-show="!minted"
    id="3d-file"
    ref="uploadRef"
    accept=".glb,.fbx,.usd,.gltf"
    drag
    class="upload-demo"
    multiple
    :action="PINATA_UPLOAD"
    :auto-upload="true"
    :show-file-list="false"
    :headers="headers"
    :on-progress="handleProgress"
    :on-success="handleSuccess"
    :on-error="handleError"
    :before-upload="handleBefore"
    :data="options"
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
  <div v-if="minted" class="custom-file-upload">
    <div
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <div style="display: flex; align-items: center">
        <span class="file-thumbnail-title"
          ><p>{{ fileName }}</p></span
        >
      </div>
      <img
        v-if="percentage === 100"
        src="../../assets/images/clear.svg"
        alt="icon"
        @click="handleResetfile"
      />
    </div>
    <div class="upload-status-bar--container">
      <div>Uploading file...</div>
      <div class="spiner-bar-container">
        <svg
          v-if="percentage !== 100"
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
        <svg
          v-else
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="circle-check"
          class="svg-inline--fa fa-circle-check fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          style="font-size: 24px; width: 24px; height: 24px"
        >
          <path
            fill="currentColor"
            d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"
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
</template>

<script setup>
import { onMounted, toRef, ref } from "vue";
import { useFormStore } from "@/store/index";
import {
  PINATA_KEY,
  PINATA_SECRET_KEY,
  PINATA_UPLOAD,
} from "@/utils/globalConfig.json";
import { ElMessage } from "element-plus";

const { updateThreeDHash, threeDHash } = useFormStore();

const uploadRef = ref(null);
const headers = {
  pinata_api_key: PINATA_KEY,
  pinata_secret_api_key: PINATA_SECRET_KEY,
};

const fileName = ref("file name");
const percentage = ref(30);
const minted = ref(false);

const testFolder = ref("./3dShuttle");
const options = {
  wrapWithDirectory: true,
};

const updateMinted = (bool) => {
  minted.value = bool;
};

const handleProgress = (e, file) => {
  updateMinted(true);
  // const { percent, loaded, total } = e;
  const { name, percentage: per, size, raw } = file;
  fileName.value = name;
  percentage.value = per;
  // thumbnail.value = URL.createObjectURL(raw);
  //
  // const r = basePathConverter(testFolder.value, file);
  // console.log("debug handleProgress ", e, file);
};

const handleSuccess = (response, file) => {
  const { IpfsHash, PinSize, Timestamp } = response;
  const {
    name,
    percentage: per,
    size,
    raw: { type },
  } = file;
  fileName.value = name;
  percentage.value = 100;
  updateThreeDHash(`${IpfsHash}/${name}`);
  // console.log("debug handleSuccess ", threeDHash, IpfsHash, name, file);
};

const handleError = (error, files) => {
  ElMessage({
    message: "Error!",
    type: "error",
  });
};

const handleBefore = (file) => {
  const { webkitRelativePath, name } = file;
  // console.log("debug handleBefore", file);
  if (
    !name.includes(".glb") &&
    !name.includes(".fbx") &&
    !name.includes(".usd") &&
    !name.includes(".gltf")
  ) {
    return false;
  }
  return true;
};

const handleResetfile = async () => {
  // updateMinted(false);
  // updateHash("");
};

// const handleRequest = async (ops) => {
//   console.log("debug handleRequest", ops);
//   return new Promise((resolve, reject) => {
//     resolve();
//   });
// };

onMounted(() => {
  const loader = document.getElementById("3d-file");
  const input = loader.children[0].querySelector("input");
  input.webkitdirectory = true;
  // console.log("debug file", uploadRef.value, loader, input);
  // uploadRef.value.load_5.$children[0].$refs.input.webkitdirectory;
});
</script>
