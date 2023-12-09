<template>
    <div class="bot-admin-wrapper">
        <div class="header">Biance Bot Admin</div>
        <ElForm ref="formRef" :model="adminConfig" label-position="top" label-width="120px" class="email-form" size="large"
            @submit.native.prevent>
            <ElFormItem label="下单种类" prop="type">
                <ElInput v-model="adminConfig.type" placeholder="下单种类 默认现货" />
            </ElFormItem>
            <ElFormItem label="杠杆倍数" prop="leverage">
                <ElInput v-model="adminConfig.leverage" placeholder="杠杆倍数 1-10倍 整数" />
            </ElFormItem>
            <ElFormItem>
                <button type="button" class="form-button single-button email-button" @click="handleSave()">
                    Save Config
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
const adminConfig = reactive({
    email: "",
    // 
    type: 'spot',
    leverage: 3,
});

const handleSave = () => {
    // 保存配置
}
</script>
<style lang="scss" scoped>
.bot-admin-wrapper {
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
