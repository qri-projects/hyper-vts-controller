import { WebSocketBus, ApiClient, Plugin, VTubeStudioError } from "vtubestudio";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const WebSocket = require("websocket").w3cwebsocket;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("ws");
import { icon } from "@/pramcontroller/Tmp";
import { ParamInvoker } from "@/pramcontroller/ParamInvoker";
import store, { save } from "@/store/store";
import { CustomParam } from "@/components/configurationsviews/tabs/customparam/CustomParamView.vue";

let plugin: Plugin;

let loading = false;

async function getInstance(): Promise<Plugin> {
  if (plugin != undefined) {
    return new Promise((resolve, reject) => {
      resolve(plugin);
    });
  }
  plugin = await connect(store.state.configurationFormData.vtsAddress);
  return plugin;
}

async function connect(addressRaw: string): Promise<Plugin> {
  if (loading) {
    return new Promise((resolve, reject) => {
      reject("正在创建中! 请勿重复创建");
    });
  }
  store.commit("setVtsConnectStatus", "connecting");
  console.log("connect", addressRaw);
  loading = true;
  let address: string;
  if (addressRaw) {
    if (/^wss?:\/\//g.test(addressRaw)) {
      address = addressRaw;
    } else {
      address = `ws://${addressRaw}`;
    }
  }

  return new Promise<Plugin>((resolve, reject) => {
      const webSocket = new WebSocket(address);
      webSocket.onopen = function(ev: Event) {
        const bus = new WebSocketBus(webSocket);
        const apiClient = new ApiClient(bus);
        plugin = new Plugin(apiClient, "Vts超级驾驶舱dev", "B站vup: 空包糖", icon, store.state.vtsAuthToken ?? undefined);
        loading = false;
        store.commit("setVtsConnectStatus", store.state.vtsAuthToken ? "connectedAuthed" : "connectedNoAuth");
        if (store.state.vtsAuthToken) {
          handleAuthed();
        }
        resolve(plugin);
      };
      webSocket.onclose = function(ev: Event) {
        loading = false
        console.log("connectFailed, change status to notstart");
        store.commit("setVtsConnectStatus", "notStart");
      }
  });
}

async function vtsAuth() {
  if (store.state.vtsStatus.connectStatus !== "connectedNoAuth") {
    throw new Error("状态不为[已连接未认证], 无法进行认证");
  }

  const authRes = await plugin.apiClient.authenticationToken({
      pluginName: plugin.name,
      pluginDeveloper: plugin.author,
      pluginIcon: plugin.icon
    }
  );
  store.commit("setVtsToken", authRes.authenticationToken);
  store.commit("setVtsConnectStatus", "connectedAuthed");
  handleAuthed()
}

async function handleAuthed() {
  const vtsParams = await plugin.apiClient.inputParameterList();
  console.log("vtsParams", vtsParams);
  const vtsParamsByHyperVtsController = vtsParams.customParameters
    .filter((param) => param.addedBy === plugin.name)
    .map(vtsParam => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return {...vtsParam} as CustomParam
    })
  console.log("vtsParamsByHyperVtsController, ", vtsParamsByHyperVtsController);
  store.commit("initCustomParams", vtsParamsByHyperVtsController)
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
        plugin.apiClient.injectParameterData({ parameterValues: req });
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
  vtsAuth: vtsAuth
};

export default VtsManager;

