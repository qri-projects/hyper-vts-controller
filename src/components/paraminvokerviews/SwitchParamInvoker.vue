<template>
  <ElSwitch v-model="value" inactive-color="#13ce66"></ElSwitch>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ElSwitch } from 'element-plus'
import {ParamInvoker} from "@/pramcontroller/ParamInvoker";
import {Watch} from "vue-property-decorator";

@Options({
  components: {ElSwitch},
  props: {
    paramInvoker: ParamInvoker
  }
})
export default class SwitchParamInvoker extends Vue {
  value: boolean

  @Watch("count", {
    immediate: true,
  })
  watchValue(val: number, oldVal: number) {
    const cmds: [string] = this.paramInvoker.paramChanges.map(paramChange => {
      paramChange.changeValue(paramChange.changeWithUpper(val));
      return paramChange.genApplyValueCommand()
    })

  }
}
</script>

<style scoped>

</style>