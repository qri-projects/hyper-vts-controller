<template>
  <ElSwitch v-if="isSwitch(paramInvoker.viewInfo.buttonType)" @change="onChange" v-model="value"></ElSwitch>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ElSwitch } from "element-plus";
import { ParamInvoker } from "@/pramcontroller/ParamInvoker";
import { ParamInvokerButtonType } from '@/pramcontroller/createreq/CreateReq';
import { VtsPlugin } from "@/vtssdk/VtsPlugin";
import { InjectParamReq } from "@/vtssdk/VtsDto";

@Options({
  components: {
    ElSwitch,
  },
  props: {
    "paramInvoker": ParamInvoker
  }
})
export default class ParamInvokerView extends Vue {
  paramInvoker!: ParamInvoker
  value: boolean = false
  vts?: VtsPlugin

  async created() {

    this.vts = await VtsPlugin.connect("ws://localhost:8001", "111", "qri", undefined, undefined)
  }

  onChange(value: boolean): boolean {
    console.log(this.value)
    const numberValue: number = value as unknown as number;
    let reqStr = this.paramInvoker.genInject2VtsReq(numberValue);
    console.log(reqStr);
    this.vts?.injectParam(new InjectParamReq(reqStr))
    return value;
  }

  isSwitch(v: ParamInvokerButtonType) {
    return v === ParamInvokerButtonType.SWITCH
  }

}
</script>

<style scoped>

</style>