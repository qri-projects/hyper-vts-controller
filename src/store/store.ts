import { createStore } from "vuex";
import { CustomParam } from "@/components/configurationsviews/tabs/customparam/CustomParamView.vue";
import { ParamInvokerData } from "@/pramcontroller/createreq/CreateReq";


class State {
  configurationFormData: {
    vtsAddress: string;
    paramInvokerData: Map<string, ParamInvokerData>;
  }
  vtsAuthToken: string;

  configurationPanel: {
    open: boolean
    tab: string
  }

  vtsStatus: {
    connected: boolean,
    customParams: Array<CustomParam>,
    connectStatus: "connecting" | "connectedNoAuth" | "connectedAuthed" | "notStart" | "failed" | "notInit"
  }


  constructor() {
    this.configurationFormData = {
      vtsAddress: "localhost:8001",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      paramInvokerData: {}
    };
    this.vtsAuthToken = ""
    this.configurationPanel = {
      open: false,
      tab: "connectVts"
    }
    this.vtsStatus = {
      connected: false,
      customParams: new Array<CustomParam>(),
      connectStatus: "notStart"
    }
  }
}

function jsSetMap<K, V>(m: Map<K, V>, k: K, v: V) {
  console.log("setMap, k: ", k);
  console.log("setMap, v: ", v);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  m[k] = v
}

function jsRemoveMapK<K>(m: Map<K, any>, k: K) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  delete m[k]
}

function jsPushArray<V>(array: Array<V>, ...v: [V]) {
  (array as [V]).push(...v)
}

const noPersistentProps = ["vtsStatus", "configurationPanel"]

const initState = new State();



const store = createStore({
  state: load(),
  mutations: {
    initCustomParams(state, customParams: [CustomParam]) {
      jsPushArray(state.vtsStatus.customParams, ...customParams)
    },
    insertCustomParam(state, payload: { customParam: CustomParam }) {
      jsPushArray(state.vtsStatus.customParams, payload.customParam)
      save()
    },
    setVtsToken(state, token: string) {
      state.vtsAuthToken = token
      save()
    },
    switchConfigurationOpen(state, open?: boolean) {
      if (open === undefined || open === null) {
        state.configurationPanel.open = !state.configurationPanel.open
      } else {
        state.configurationPanel.open = open
      }
    },
    vtsConnected(state, vtsAddress) {
      state.vtsStatus.connected = true
      state.configurationFormData.vtsAddress = vtsAddress
      save()
    },
    setParamInvokerData(state, payLoad: {
      name: string,
      paramInvokerData: ParamInvokerData
    }) {
      console.log("setParamInvokerData, ", payLoad);
      jsSetMap(
        state.configurationFormData.paramInvokerData,
        payLoad.paramInvokerData.name,
        payLoad.paramInvokerData
      )
      console.log("setParamInvokerData vuex, ", state);
      if (payLoad.name !== payLoad.paramInvokerData.name) {
        console.log("name confict! del!");
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete state.configurationFormData.paramInvokerData[payLoad.name];
      }
      save()
    },
    delParamInvokerData(state, name) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete state.configurationFormData.paramInvokerData[name]
      save()
    },
    setParamInvokerValue(state, paramInvokerValueData: {key: string, value: string|number|boolean}) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.configurationFormData.paramInvokerData[paramInvokerValueData.key].value = paramInvokerValueData.value;

      save()
    },
    setVtsConnectStatus(state, connectStatus: "connecting" | "connectedNoAuth" | "connectedAuthed" | "notStart" | "failed" | "notInit") {
      state.vtsStatus.connectStatus = connectStatus
    },
    importConfigurationFormData(state, payload: {configurationData: Map<string, ParamInvokerData>}) {
        state.configurationFormData.paramInvokerData = payload.configurationData;
        save()
    }
  },
  actions: {},
  modules: {}
});

export function save() {
  const saveProxy: State = JSON.parse(JSON.stringify(store.state))
  const saveProxy2 = {...store.state}
  console.log("saveProxy2", saveProxy2);

  // 不持久化的字段
  for (const k in saveProxy) {
    if (noPersistentProps.indexOf(k) >= 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      saveProxy[k] = undefined
    }
  }
  console.log("saveProxy", saveProxy);
  localStorage.setItem("vuex", JSON.stringify(saveProxy))
}

function load(): State {
  const stateRaw = localStorage.getItem("vuex");
  let res;
  console.log("stateRaw, ", stateRaw);
  if (!stateRaw || stateRaw == "{}") {
    res = new State();
  } else {
    res = JSON.parse(stateRaw) as State
  }

  // 不持久化的字段
  for (const k of noPersistentProps) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      res[k] = initState[k]
  }

  console.log("load vuex, ", res);
  return res;
}

export default store;