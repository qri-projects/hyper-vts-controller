import { WebSocketBus, ApiClient, Plugin } from "vtubestudio";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const WebSocket = require("websocket").w3cwebsocket;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("ws");
import { icon } from "@/pramcontroller/Tmp";
import { ParamInvoker } from "@/pramcontroller/ParamInvoker";

export let plugin: Plugin;


export async function initVtsPlugin(): Promise<Plugin> {
  if (plugin != undefined) {
    return new Promise((resolve, reject) => {
      resolve(plugin)
    })
  }
  return new Promise<Plugin>((resolve, reject) => {
    const webSocket = new WebSocket("ws://localhost:8001");

    webSocket.onopen = function(ev: Event) {
      const bus = new WebSocketBus(webSocket);
      const apiClient = new ApiClient(bus);
      plugin = new Plugin(apiClient, "Vts超级驾驶舱", "B站vup: 空包糖", icon);
      resolve(plugin);
    };
  });
}

export class LockParamLoopManager {
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
    }, 100);
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

