<template>
  <div class="configurationPanel" v-show="switchOpen">
    <div class="configurationBg" @click="() => this.$store.commit('switchConfigurationOpen')"></div>

    <ElCard class="configurationCard" v-show="switchOpen">
      <el-tabs v-model="activeTab" class="configurationTabs">
        <el-tab-pane class="configurationTabPane" label="连接VTS" name="connectVts">
          <el-input v-model="vtsAddress">
          </el-input>
          <el-button @click="changeVtsAddress">连接</el-button>
          <el-tooltip class="item" effect="dark" :content="authButtonNoticeMessage" placement="top-start">
            <el-button @click="vtsAuth">验证</el-button>
          </el-tooltip>
        </el-tab-pane>
        <el-tab-pane class="configurationTabPane" label="自定义参数" name="customParam">
          <CustomParamConfigurationTabView />
        </el-tab-pane>
        <el-tab-pane class="configurationTabPane" label="自定义操作" name="customOp">
          <CustomOpConfiturationTabView/>
        </el-tab-pane>
      </el-tabs>
    </ElCard>
  </div>
  <div class="configurationPanelSwitch" @click="() => this.$store.commit('switchConfigurationOpen')">设置</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CustomParamConfigurationTabView
  from "@/components/configurationsviews/tabs/customparam/CustomParamConfigurationTabView.vue";
import CustomOpConfiturationTabView
  from "@/components/configurationsviews/tabs/customop/CustomOpConfiturationTabView.vue";
import VtsManager from "@/pramcontroller/VtsManager";
import store from "@/store/store";
import { ElMessage } from "element-plus";


@Options({
  components: {
    CustomParamConfigurationTabView,
    CustomOpConfiturationTabView
  }
})
export default class ConfigurationView extends Vue {
  vtsAddress = store.state.configurationFormData.vtsAddress
  authButtonNoticeMessage = "左上角状态为已连接未验证时, 需要点击验证. 点击验证之后, 你有5秒钟时间在VtubeStudio中点击确认按钮来加载本插件"

  get switchOpen() {
    return store.state.configurationPanel?.open
  }

  get activeTab() {
    return store.state.configurationPanel?.tab
  }

  opTab = "list";

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
      await VtsManager.vtsAuth()
    } catch (e) {
      ElMessage.error({
        message: e.message
      });
    }
  }
}
</script>


<style lang="scss">
.configurationPanel {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.configurationBg {
  background: rgba(0, 0, 0, 0.25);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 10;
}

.configurationCard {
  width: 80%;
  z-index: 100;
  height: 80vh;

  .el-card__body {
    height: 100%;
  }
}

.configurationTabs {
  height: 100%;

  .el-tabs__content {
    height: calc(100% - 60px) !important;
  }
}

$switchSize: 80px;

$switchBorder: 3px solid #3f5fff;

.configurationPanelSwitch {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  float: right;
  right: 0px;
  border-left: $switchBorder;
  border-bottom: $switchBorder;
  border-radius: 0 0 0 15px;
  width: 100px;
  height: 60px;
  background: #b4afff;
  color: white;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
}

.configurationTabPane {
  overflow: auto;
  height: 100%;
}
</style>