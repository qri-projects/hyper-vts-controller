<template>
  <ConfigurationView />
  <ParamInvokerView :param-invoker="paramInvoker">123</ParamInvokerView>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ParamInvoker } from "@/pramcontroller/ParamInvoker";
import ParamInvokerView from "./paraminvokerviews/ParamInvokerView.vue";
import { ChangeControlType, ParamInvokerCreateReq, ParamInvokerViewInfo } from "@/pramcontroller/createreq/CreateReq";
import CustomParamView from "@/components/customparamviews/CustomParamView.vue";

@Options({
  components: {
    ParamInvokerView
  }
})
export default class HelloWorld extends Vue {
  paramInvoker: ParamInvoker = new ParamInvoker(new ParamInvokerCreateReq("name", "desc", ChangeControlType.METHOD_STRING, `{
  let bodyAngleX0 = 0
  let mouthOpen = 0
  let mouthSmile = 1
  let paramOvO = 0
  let paramVV = 0
  let paramFuFu = 0

  if (value === "睡裙") {
    bodyAngleX0 = -30;
    paramFuFu = 1
  } else if(value === "法师服") {
    bodyAngleX0 = 30;
    paramOvO = 1
  } else {
    bodyAngleX0 = 0
    paramVV = 1
  }
  apply('BodyAngleX0', bodyAngleX0);
  apply('MouthSmile', mouthSmile)
  apply('MouthOpen', mouthOpen)
  apply('ParamOvO', paramOvO)
  apply('ParamVV', paramVV)
  apply('ParamFuFu', paramFuFu)
  }`),
  ParamInvokerViewInfo.genRadio(["睡裙", "水手服", "法师服"]))
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
