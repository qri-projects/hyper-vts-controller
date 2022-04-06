<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="导出" name="output">
      请手动选择下面配置复制后保存:
      <el-card class="configOutHolder">{{$store.state.configurationFormData.paramInvokerData}}</el-card>
    </el-tab-pane>
    <el-tab-pane label="导入" name="input">
      <el-input type="textarea" v-model="inText">

      </el-input>
      <el-button @click="importConfig">导入</el-button>
    </el-tab-pane>
  </el-tabs>

</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/store";
import VtsManager from "@/pramcontroller/VtsManager";
import { ElMessage } from "element-plus";
export default class ConfigManagerConfigurationTabView extends Vue {
  activeName ="output"
  inText = ""

  importConfig() {
    console.log(123)
    let configData;
    try {
      configData = JSON.parse(this.inText)
      console.log(configData)
    } catch (e) {
      console.error(e);
      ElMessage.error("解析配置出错!请确认配置是好好复制粘贴过来的捏!");
      return;
    }
    store.commit("importConfigurationFormData", {configurationData: configData})
  }
};
</script>

<style scoped>
.configOutHolder {
  user-select: all;
}
</style>