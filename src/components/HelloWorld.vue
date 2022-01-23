<template>
  <Header></Header>
  <ConfigurationView />
  <ParamInvokersHolder></ParamInvokersHolder>
  <!--  <ParamInvokerView :param-invoker="paramInvoker">123</ParamInvokerView>-->
  <!--  <ParamInvokerView :param-invoker="paramInvoker2">456</ParamInvokerView>-->
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ParamInvoker } from "@/pramcontroller/ParamInvoker";
import ParamInvokerView from "./paraminvokerviews/ParamInvokerView.vue";
import { ChangeControlType, ParamInvokerData, ParamInvokerViewInfo } from "@/pramcontroller/createreq/CreateReq";
import CustomParamView from "@/components/configurationsviews/tabs/customparam/CustomParamView.vue";
import Header from "@/components/header/Header.vue";
import store from "@/store/store";
import ParamInvokersHolder from "@/components/paraminvokerviews/ParamInvokersHolder.vue";

@Options({
  components: {
    ParamInvokerView,
    ParamInvokersHolder,
    Header
  }
})
export default class HelloWorld extends Vue {
  paramInvoker111: ParamInvoker = new ParamInvoker(new ParamInvokerData("name", "desc", ChangeControlType.METHOD_STRING,
    ParamInvokerViewInfo.genRadio(["睡裙", "水手服", "法师服", "default"]), `{
  let bodyAngleX0 = 0
  let mouthOpen = 0
  let mouthSmile = 1
  let paramOvO = 0
  let paramVV = 0
  let paramFuFu = 0

  let de = false;

  if (value === "睡裙") {
    bodyAngleX0 = -30;
    paramFuFu = 1
  } else if(value === "法师服") {
    bodyAngleX0 = 30;
    paramOvO = 1
  } else if(value === "水手服") {
    bodyAngleX0 = 0
    paramVV = 1
  } else {
    de = true;
  }

  if (!de) {
    apply('ParamAngleX0', bodyAngleX0);
    apply('MouthSmile', mouthSmile)
    apply('MouthOpen', mouthOpen)
    apply('ParamOvO', paramOvO)
    apply('ParamVV', paramVV)
    apply('ParamFuFu', paramFuFu)
  }
}`));

  paramInvoker2: ParamInvoker = new ParamInvoker(new ParamInvokerData("name", "desc", ChangeControlType.METHOD_STRING,
    ParamInvokerViewInfo.genRadio(["睡裙", "水手服", "法师服", "default"]),
    `{
  let bodyAngleX0 = 0

  if (value === "睡裙") {
    bodyAngleX0 = -30;
  } else if(value === "法师服") {
    bodyAngleX0 = 30;
  } else if(value === "水手服") {
    bodyAngleX0 = 0
  }

  if (bodyAngleX0 !== 0) {
    apply('ParamAngleX0', bodyAngleX0);
  }
}`));
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
