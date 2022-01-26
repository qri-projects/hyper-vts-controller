<template>
  <el-collapse v-model="activeOpName" @change="handleChange">
    <el-collapse-item
      v-for="paramInvoker in $store.state.configurationFormData.paramInvokerData"
      :title="paramInvoker.name"
      :name="paramInvoker.name"
      :key="paramInvoker.name">
      <CustomOpEditor :new-init="false" :paramInvokerProp="paramInvoker"></CustomOpEditor>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CustomOpEditor from "@/components/configurationsviews/tabs/customop/CustomOpEditor.vue";

@Options({
  components: {
    CustomOpEditor
  }
})
export default class CustomOpList extends Vue {
  activeOpName = "";

  handleChange(v: any) {
    this.activeOpName = v;
  }

};
</script>

<style scoped>

</style>