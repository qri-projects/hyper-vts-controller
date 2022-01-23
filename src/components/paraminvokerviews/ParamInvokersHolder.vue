<template>
  <ParamInvokerView v-for="paramInvoker of this.paramInvokers" :param-invoker="paramInvoker" :key="paramInvoker.name"/>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ParamInvoker } from "@/pramcontroller/ParamInvoker";
import store from "@/store/store";
import ParamInvokerView from "@/components/paraminvokerviews/ParamInvokerView.vue";

@Options({
  components: {
    ParamInvokerView
  }
})
export default class ParamInvokersHolder extends Vue {
  get paramInvokers(): Array<ParamInvoker> {
    let paramInvokers = new Array<ParamInvoker>();
    for (const k in store.state.configurationFormData.paramInvokerData) {
      paramInvokers.push(new ParamInvoker(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        store.state.configurationFormData.paramInvokerData[k]!
      ))
    }
    return paramInvokers;
  }
};
</script>

<style scoped>

</style>