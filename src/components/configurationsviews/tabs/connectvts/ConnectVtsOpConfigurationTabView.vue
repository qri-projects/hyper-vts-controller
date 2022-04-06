<template>
  <el-input v-model="vtsAddress">
  </el-input>
  <div>
    <p>连接步骤:</p>
    <p>1. 在上方输入框中, 输入VtubeStudio插件Api的地址</p>
    <p>2. 点击连接开始连接, 左上角状态变为已连接未校验</p>
    <p>3. 点击验证, 并在5秒内在VtubeStudio中允许本插件连接</p>
<!--    <p>如果还有疑问的话, 请前往视频版教程: <a href="https://www.bilibili.com/video/BV1yq4y1v7tJ" target="_blank">BV1yq4y1v7tJ</a></p>-->
  </div>
  <el-button @click="changeVtsAddress">连接</el-button>
  <el-button @click="vtsAuth">验证</el-button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/store";
import VtsManager from "@/pramcontroller/VtsManager";
import { ElMessage } from "element-plus";

export default class ConnectVtsOpConfigurationTabView extends Vue {
  vtsAddress = store.state.configurationFormData.vtsAddress

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