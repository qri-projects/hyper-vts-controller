import { createStore } from "vuex";
import { CustomParam } from "@/components/customparamviews/CustomParamView.vue";

const store = createStore({
  state: {
    configurationFormData: {
      vtsAddress: "localhost:8001",
      customParams: new Map<string, CustomParam>()
    }
  },
  mutations: {
    insertCustomParam(state, payload: { customParam: CustomParam }) {
      state.configurationFormData.customParams.set(
        payload.customParam.parameterName,
        payload.customParam
      );
    }
  },
  actions: {},
  modules: {}
});

export default store;