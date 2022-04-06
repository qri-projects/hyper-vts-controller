import { WebSocketBus, ApiClient, Plugin, VTubeStudioError } from "vtubestudio";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const WebSocket = require("websocket").w3cwebsocket;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("ws");
import {
  pluginIcon, pluginName, authorName
} from "@/pramcontroller/ConstConfig";
import { ParamInvoker } from "@/pramcontroller/ParamInvoker";
import store, { save } from "@/store/store";
import { CustomParam } from "@/components/configurationsviews/tabs/customparam/CustomParamView.vue";
import { ElMessage } from "element-plus";

let apiClient: ApiClient;

let loading = false;

async function getInstance(): Promise<ApiClient> {
  if (apiClient != undefined) {
    return new Promise((resolve, reject) => {
      resolve(apiClient);
    });
  }
  apiClient = await connect(store.state.configurationFormData.vtsAddress);
  return apiClient;
}

async function connect(addressRaw: string): Promise<ApiClient> {
  if (loading) {
    return new Promise((resolve, reject) => {
      reject("正在创建中! 请勿重复创建");
    });
  }
  store.commit("setVtsConnectStatus", "connecting");
  loading = true;
  let address: string;
  if (addressRaw) {
    if (/^wss?:\/\//g.test(addressRaw)) {
      address = addressRaw;
    } else {
      address = `ws://${addressRaw}`;
    }
  }

  return new Promise<ApiClient>((resolve, reject) => {
    const webSocket = new WebSocket(address);
    webSocket.onopen = function(ev: Event) {
      const bus = new WebSocketBus(webSocket);
      apiClient = new ApiClient(bus);
      loading = false;
      store.commit("setVtsConnectStatus", "connectedNoAuth");
      if (store.state.vtsAuthToken) {
        vtsAuthWithToken(store.state.vtsAuthToken);
      }
      resolve(apiClient);
    };
    webSocket.onclose = function(ev: Event) {
      loading = false;
      console.log("connectFailed, change status to notstart");
      store.commit("setVtsConnectStatus", "notStart");
    };
  });
}

async function userVtsAuth() {
  if (store.state.vtsStatus.connectStatus !== "connectedNoAuth") {
    throw new Error("状态不为[已连接未认证], 无法进行认证");
  }
  await vtsAuth();
}

async function vtsAuth() {
  const authRes = await apiClient.authenticationToken({
      pluginName: pluginName,
      pluginDeveloper: authorName,
      pluginIcon: pluginIcon
    }
  );
  if (authRes && authRes.authenticationToken) {
    store.commit("setVtsToken", authRes.authenticationToken);
    handleAuthed();
  }
}

async function vtsAuthWithToken(token: string): Promise<boolean> {
  const authRes = await apiClient.authentication({
      pluginName: pluginName,
      pluginDeveloper: authorName,
      authenticationToken: token
    }
  );

  if (!authRes.authenticated) {
    console.error(`authRes.authenticated false!`, { reason: authRes.reason, token });
    ElMessage.error({ message: "验证失败! 请手动在设置中点击验证按钮\n并在5s内前往vts进行确认" });
    store.commit("setVtsConnectStatus", "connectedNoAuth");
  } else {
    handleAuthed();
  }

  return authRes.authenticated;
}

async function handleAuthed() {
  store.commit("setVtsConnectStatus", "connectedAuthed");
  const vtsParams = await apiClient.inputParameterList();
  console.log("vtsParams", vtsParams);
  const vtsParamsByHyperVtsController = vtsParams.customParameters
    .filter((param) => param.addedBy === pluginName || param.addedBy === `${pluginName}dev`)
    .map(vtsParam => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return { ...vtsParam } as CustomParam;
    });
  console.log("vtsParamsByHyperVtsController, ", vtsParamsByHyperVtsController);
  store.commit("initCustomParams", vtsParamsByHyperVtsController);
}

class LockParamLoopManager {
  static setParamLoopHolder: Map<ParamInvoker,
    Array<{
      id: string;
      weight?: number | undefined;
      value: number;
    }>> = new Map();

  static startSetParamLoop() {
    setInterval(() => {
      const req: Array<{
        id: string;
        weight?: number | undefined;
        value: number;
      }> = [];

      this.setParamLoopHolder.forEach(params => {
        req.push(...params);
      });

      if (req.length > 0) {
        apiClient.injectParameterData({ parameterValues: req });
      }
    }, 666);
  }

  static setLockParam(
    paramInvoker: ParamInvoker,
    req: Array<{
      id: string;
      weight?: number | undefined;
      value: number;
    }>) {
    this.setParamLoopHolder.set(paramInvoker, req);
  }

  static removeLockParam(paramInvoker: ParamInvoker) {
    this.setParamLoopHolder.delete(paramInvoker);
  }
}

const VtsManager = {
  getInstance: getInstance,
  LockParamLoopManager: LockParamLoopManager,
  connect: connect,
  userVtsAuth: userVtsAuth
};

export default VtsManager;

