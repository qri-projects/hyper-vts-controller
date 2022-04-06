<template>
  <el-input v-model="vtsAddress">
  </el-input>
  <el-button @click="changeVtsAddress">连接</el-button>
  <el-tooltip class="item" effect="dark" :content="authButtonNoticeMessage" placement="top-start">
    <el-button @click="vtsAuth">验证</el-button>
  </el-tooltip>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/store";
import VtsManager from "@/pramcontroller/VtsManager";
import { ElMessage } from "element-plus";

export default class ConnectVtsOpConfigurationTabView extends Vue {
  vtsAddress = store.state.configurationFormData.vtsAddress
  authButtonNoticeMessage = "左上角状态为已连接未验证时, 需要点击验证. 点击验证之后, 你有5秒钟时间在VtubeStudio中点击确认按钮来加载本插件"

  async changeVtsAddress() {
    try {
      const vtsPlugin = await VtsManager.connect(this.vtsAddress)
      store.commit("vtsConnected", this.vtsAddress)
    } catch (e) {
      console.error(e)
    } finally {
      // passed
    }
  }

  async vtsAuth() {
    try {
      await VtsManager.userVtsAuth()
    } catch (e) {
      ElMessage.error({
        message: e.message
      });
    }
  }
}
</script>

<style scoped>

</style>