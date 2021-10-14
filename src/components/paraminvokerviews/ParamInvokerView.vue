<template>
  <ElSwitch v-if="paramInvoker.viewInfo.buttonType === 0" @change="onChange" v-model="value"></ElSwitch>
  <ElRadioGroup v-if="paramInvoker.viewInfo.buttonType === 1" v-model="value" @change="onChange">
    <elRadio v-for="option in paramInvoker.viewInfo.options" :label="option">{{ option }}</elRadio>
  </ElRadioGroup>
  <ElOption v-if="paramInvoker.viewInfo.buttonType === 2"></ElOption>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ElSwitch, ElRadio, ElOption, ElSelect } from "element-plus";
import { ParamInvoker } from "@/pramcontroller/ParamInvoker";
import { ParamInvokerButtonType } from '@/pramcontroller/createreq/CreateReq';
import { initVtsPlugin, LockParamLoopManager } from "@/pramcontroller/VtsManager";
import { WebSocketBus, ApiClient, Plugin } from "vtubestudio";
import { ref } from 'vue'
import { Ref, UnwrapRef } from "@vue/reactivity";

@Options({
  components: {
    ElSwitch,
    ElRadio,
    ElOption,
    ElSelect
  },
  props: {
    "paramInvoker": ParamInvoker
  }
})
export default class ParamInvokerView extends Vue {
  paramInvoker!: ParamInvoker
  value:Ref<UnwrapRef<string|boolean|number>> = ref(1)
  vts?: Plugin

  async created() {
    this.vts = await initVtsPlugin()
    LockParamLoopManager.startSetParamLoop()
  }

  onChange(value: number|boolean|string) {
    console.log(value);
    let req = this.paramInvoker.genInject2VtsReq(value);
    LockParamLoopManager.setLockParam(this.paramInvoker, req)
    this.vts?.apiClient.injectParameterData({ parameterValues: req })
  }
}
</script>

<style scoped>

</style>