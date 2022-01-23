<template>
      <span class="status">状态: {{ connectStatusDisplay.displayWord }}
      <i :class="connectStatusDisplay.icon"></i>
      </span>
</template>

<script lang="ts">
import VtsManager from "@/pramcontroller/VtsManager";
import { Options, Vue } from "vue-class-component";
import store from "@/store/store";

class ConnectStatusDisplay {
  icon: string;
  displayWord: string;


  constructor(icon: string, displayWord: string) {
    this.icon = icon;
    this.displayWord = displayWord;
  }
}

const connectStatusDisplays = new Map<string, ConnectStatusDisplay>(
  [
    ["notInit", new ConnectStatusDisplay("el-icon-circle-close", "未初始化")],
    ["notStart", new ConnectStatusDisplay("el-icon-circle-close", "未开始连接")],
    ["connecting", new ConnectStatusDisplay("el-icon-loading", "连接中")],
    ["connectedAuthed", new ConnectStatusDisplay("el-icon-success", "已连接已验证")],
    ["connectedNoAuth", new ConnectStatusDisplay("el-icon-circle-close", "已连接未验证")],
    ["failed", new ConnectStatusDisplay("el-icon-error", "连接失败")]
  ]
);

@Options({
  components: {}
})
export default class Status extends Vue {
  get connectStatusDisplay(): ConnectStatusDisplay {
    if (store.state.vtsStatus.connectStatus && connectStatusDisplays.has(store.state.vtsStatus.connectStatus)) {
      return connectStatusDisplays.get(store.state.vtsStatus.connectStatus)!;
    }

    if (!store.state.vtsAuthToken) {
      return connectStatusDisplays.get("notInit")!;
    }

    return connectStatusDisplays.get("notInit")!;
  }

  async created() {
    let vtsToken = store.state.vtsAuthToken;
    if (vtsToken) {
      store.commit("setVtsConnectStatus", "connecting");
      let vts = await VtsManager.getInstance();
      await VtsManager.LockParamLoopManager.startSetParamLoop();
    } else {
      store.commit("setVtsConnectStatus", "notInit");
      store.commit("switchConfigurationOpen", true);
    }
  }
};
</script>

<style scoped>

</style>