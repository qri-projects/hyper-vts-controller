<template>
  <ElCard>
    <ElForm :model="model" label-width="120px">
      <elFormItem label="参数名">
        <ElInput v-model="model.name" placeholder="参数名"></ElInput>
      </elFormItem>
      <elFormItem label="注释">
        <ElInput v-model="model.explanation" placeholder="注释"></ElInput>
      </elFormItem>
      <elFormItem label="最小值">
        <elInputNumber v-model="model.min" :precision="2" :step="0.1" />
      </elFormItem>
      <elFormItem label="最大值">
        <elInputNumber v-model="model.max" :precision="2" :step="0.1" />
      </elFormItem>
      <elFormItem label="默认值">
        <elInputNumber v-model="model.defaultValue" :precision="2" :step="0.1" :min="model.min" :max="model.max" />
      </elFormItem>
      <el-form-item>
        <el-button type="primary" @click="submit">创建</el-button>
        <el-button @click="clean">清空</el-button>
      </el-form-item>
    </ElForm>
  </ElCard>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ElMessage, ElButton, ElInput, ElRow, ElLoading } from "element-plus";
import VtsManager from "@/pramcontroller/VtsManager";
import store from "@/store/store";

export interface CustomParam {
  name: string;
  explanation: string;
  min: number;
  max: number;
  defaultValue: number
}

@Options({
  components: { ElInput, ElButton }
})
export default class CustomParamView extends Vue {
  model: CustomParam = { name: "", explanation: "Custom Param", min: 0, max: 1, defaultValue: 0 };

  async submit() {
    const loading = ElLoading.service({
      lock: true,
      text: "创建中",
      spinner: "el-icon-loading",
      background: "rgba(255, 255, 255, 0.7)"
    });

    try {
      let newParamRes = await (await VtsManager.getInstance()).apiClient.parameterCreation({...this.model, parameterName: this.model.name});

      ElMessage.success({
        message: `参数: ${newParamRes.parameterName} 创建成功!`
      });
      store.commit("insertCustomParam", {customParam: {...this.model}})
    } catch (e) {
      ElMessage.error(
        {
          message: `参数: ${this.model.name} 创建失败!\n ${e.message}`
        }
      );
    } finally {
      loading.close();
    }
  }

  clean() {
    this.model = { name: "", explanation: "Custom Param", min: 0, max: 1, defaultValue: 0 };
  }
}
</script>

<style scoped>

</style>