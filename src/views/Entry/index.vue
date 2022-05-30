<template>
  <div class="email-wrapper">
    <div class="header">POD shared this document with you</div>
    <div class="sub-title">Please enter your info to continue</div>
    <ElForm
      :ref="formRef"
      :model="formLabelAlign"
      label-position="top"
      label-width="100px"
      style="max-width: 460px"
    >
      <ElFormItem label="Email">
        <ElInput
          v-model="formLabelAlign.email"
          placeholder="Please input your email..."
        />
      </ElFormItem>
      <div class="sub-title">
        The information will only be shared with POD 3DShuttle
      </div>
      <ElFormItem>
        <ElButton @click="passEmail()">Continue</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
// import type { Ref } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

// interface Form {
//   email: Ref<string>;
// }

const formRef = ref<FormInstance>();

const formLabelAlign = reactive({
  email: ref(""),
});

const validateEmail = (email: string) => {
  const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return pattern.test(email);
};

const email = ref<string>("test");

const passEmail = (): void => {
  if (validateEmail(formLabelAlign.email)) {
    router.push({
      name: "NFTForm",
      query: {
        email: encodeURIComponent(formLabelAlign.email),
      },
    });
  } else {
    // TODO
    ElMessage({
      message: "Invalid Email!",
      type: "error",
    });
  }
};
</script>
<style lang="scss" scoped>
.email-wrapper {
  position: relative;
  top: 1rem;
  max-width: 5rem;
  margin: 0 auto;
  height: 4rem;
  border-radius: 0;
  background: #fff;
  border: 1px solid #ededef;
  padding: 15px 20px;
  box-shadow: 0 4px 15px rgb(0 0 0 / 20%);
  cursor: auto;
}
.header {
  font-size: 24px;
  font-weight: 500;
  color: #000;
  text-align: center;
}

.sub-title {
  font-size: 16px;
  color: #696c76;
  margin-top: 10px;
  text-align: center;
}
</style>
