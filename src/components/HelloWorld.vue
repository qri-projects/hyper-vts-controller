<template>
  <div class="hello">111</div>
  <ParamInvokerView :param-invoker="paramInvoker">123</ParamInvokerView>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ParamInvoker } from "@/pramcontroller/ParamInvoker";
import ParamInvokerView from "./paraminvokerviews/ParamInvokerView.vue";
import { ChangeControlType, ParamInvokerCreateReq, ParamInvokerViewInfo } from "@/pramcontroller/createreq/CreateReq";


@Options({
  components: {
    ParamInvokerView
  }
})
export default class HelloWorld extends Vue {
  paramInvoker: ParamInvoker = new ParamInvoker(new ParamInvokerCreateReq("name", "desc", ChangeControlType.METHOD_STRING, "{apply('BodyAngleX0', value * 30);}"),
  ParamInvokerViewInfo.genSwitch())
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
