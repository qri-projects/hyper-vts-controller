<template>
    <el-row class="paramInvokerView">
      <el-col :span="3">
        <span>{{paramInvoker.name}}</span>
      </el-col>
      <el-col :span="21">
        <span></span>
        <ElRadioGroup v-if="paramInvoker.paramInvokerViewInfo.buttonType === paramInvokerButtonTypes.RADIO" v-model="value" @change="onChange">
          <ElRadio v-for="(option, key) in paramInvoker.paramInvokerViewInfo.options" :key="`${paramInvoker.name}-${key}`" :label="option">{{ option }}</ElRadio>
        </ElRadioGroup>
        <ElOption v-if="paramInvoker.paramInvokerViewInfo.buttonType === paramInvokerButtonTypes.SLIDER"></ElOption>
      </el-col>
    </el-row>

</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ElSwitch, ElRadio, ElOption, ElSelect } from "element-plus";
import { InjectParamValue, ParamInvoker } from "@/pramcontroller/ParamInvoker";
import { ParamInvokerButtonType } from '@/pramcontroller/createreq/CreateReq';
import VtsManager from "@/pramcontroller/VtsManager";
import { WebSocketBus, ApiClient, Plugin } from "vtubestudio";
import { ref } from 'vue'
import { Ref, UnwrapRef } from "@vue/reactivity";
import store from "@/store/store";

@Options({
  components: {
    ElSwitch,
    ElRadio,
    ElOption,
    ElSelect
  },
  props: {
    "paramInvoker": ParamInvoker,
  }
})
export default class ParamInvokerView extends Vue {
  paramInvoker!: ParamInvoker
  value: Ref<UnwrapRef<string|boolean|number>> = ref(
    1
  )
  vts?: Plugin
  paramInvokerButtonTypes = ParamInvokerButtonType

  onChange(value: number | boolean | string) {
    this.setValue(value)

    store.commit("setParamInvokerValue", {key: this.paramInvoker.name, value: value})
  }

  setValue(value: number | boolean | string) {
    let req: Array<InjectParamValue> = this.paramInvoker.genInject2VtsReq(value);
    VtsManager.LockParamLoopManager.setLockParam(this.paramInvoker, req)
    if (req != null && req.length > 0) {
      this.vts?.apiClient.injectParameterData({ parameterValues: req })
    }
  }

  created() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const initValue = store.state.configurationFormData.paramInvokerData[this.paramInvoker.name].value
    this.setValue(initValue)
    this.value = initValue
  }
}
</script>

<style scoped>
.paramInvokerView {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
}
</style>