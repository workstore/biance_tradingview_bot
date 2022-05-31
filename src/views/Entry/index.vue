<template>
  <div class="email-wrapper">
    <div class="header">POD shared this document with you</div>
    <p class="sub-title">Please enter your info to continue</p>
    <ElForm
      ref="formRef"
      :rules="rules"
      :model="formLabelAlign"
      label-position="top"
      label-width="120px"
      class="email-form"
      size="large"
      @submit.native.prevent
    >
      <ElFormItem label="Email" prop="email">
        <ElInput
          v-model="formLabelAlign.email"
          placeholder="Please input your email..."
        />
      </ElFormItem>
      <div class="tip-title">
        The information will only be shared with
        <em><strong>POD 3DShuttle</strong></em>
      </div>
      <ElFormItem>
        <button
          type="button"
          class="form-button single-button email-button"
          @click="passEmail(formRef)"
        >
          Continue
        </button>
      </ElFormItem>
    </ElForm>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { useCssVar } from "@vueuse/core";

const el = ref(null);
const color = useCssVar("--el-color-primary", el);
color.value = "#071215";

const router = useRouter();

const formRef = ref<FormInstance>();
const formLabelAlign = reactive({
  email: "",
});

const validateEmail = (mail: string) => {
  const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return pattern.test(mail);
};

const rules = reactive(<FormRules>{
  email: [
    {
      required: true,
      trigger: "blur",
      validator: (rule: any, value: any, callback: any) => {
        if (!value) {
          callback(new Error("Please input your email"));
        }
        if (!validateEmail(value)) {
          callback(new Error("Please input a valid email"));
        }
        callback();
      },
    },
  ],
});

const passEmail = async (formEle: any) => {
  if (!formEle) {
    return;
  }
  await formEle.validate((valid: boolean) => {
    if (valid) {
      router.push({
        name: "NFTForm",
        query: {
          email: formLabelAlign.email,
        },
      });
    } else {
      console.log("error submit!");
    }
  });
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
  font-family: "WhyteInktrapRegular";
  font-size: 24px;
  font-weight: 500;
  color: #000;
  text-align: center;
  margin-top: 0.5rem;
}

.sub-title {
  font-size: 14px;
  color: #696c76;
  margin-top: 6px;
  text-align: center;
}

.email-form {
  width: 90%;
  margin-top: 35px;
  margin: 40px auto 0;
  max-width: 460px;
}

.tip-title {
  font-size: 14px;
  color: #696c76;
  margin-top: 6px;
  text-align: left;
  position: relative;
  top: 6px;
}

.email-button {
  margin: 30px auto 0;
}
</style>
