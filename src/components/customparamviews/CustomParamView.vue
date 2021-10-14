<template>
  <ElRow justify="center">
    <ElCol :span="12">
      <ElCard class="box-card" >
        <ElForm :model="model" label-width="120px">
          <elFormItem label="参数名">
            <ElInput v-model="model.parameterName" placeholder="参数名"></ElInput>
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
            <el-button type="primary" @click="submit">Create</el-button>
            <el-button @click="clean">Cancel</el-button>
          </el-form-item>
        </ElForm>
      </ElCard>
    </ElCol>
  </ElRow>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ElButton, ElInput, ElRow } from "element-plus";
import { plugin } from "@/pramcontroller/VtsManager";

@Options({
  components: { ElInput, ElButton }
})
export default class CustomParamView extends Vue {
  model = { parameterName: "", explanation: "Custom Param", min: 0, max: 1, defaultValue: 0 };

  submit() {
    console.log(this.model);
    plugin.apiClient.parameterCreation(this.model);
  }

  clean() {
    this.model = { parameterName: "", explanation: "Custom Param", min: 0, max: 1, defaultValue: 0 };
  }
}
</script>

<style scoped>

</style>