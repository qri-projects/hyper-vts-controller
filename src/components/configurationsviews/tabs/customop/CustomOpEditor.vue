<template>
  <ElForm label-width="70px" :model="paramInvokerData">
    <el-form-item label="名称">
      <el-input v-model="paramInvokerData.name" placeholder="名称"></el-input>
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="paramInvokerData.desc"></el-input>
    </el-form-item>
    <el-form-item label="">
      <el-input
        type="textarea"
        :autosize="{ minRows: 7 }"
        placeholder="在此输入脚本"
        v-model="paramInvokerData.genApplyValueCommandString"
        show-word-limit
      >
      </el-input>
    </el-form-item>

    <el-form-item label="输入定义">
      <ElForm label-width="100px" :model="paramInvokerData.paramInvokerViewInfo">
        <el-form-item label="参数输入方式">
          <el-radio v-model="paramInvokerData.paramInvokerViewInfo.buttonType" :label="paramInvokerInputTypes.RADIO">单选框</el-radio>
          <el-radio v-model="paramInvokerData.paramInvokerViewInfo.buttonType" :label="paramInvokerInputTypes.SLIDER">滑条</el-radio>
          <el-radio v-model="paramInvokerData.paramInvokerViewInfo.buttonType" :label="paramInvokerInputTypes.INPUT">文本输入</el-radio>
        </el-form-item>

        <el-form-item label="候选项" v-show="paramInvokerData.paramInvokerViewInfo.buttonType === paramInvokerInputTypes.RADIO">
          <el-select
            v-model="paramInvokerData.paramInvokerViewInfo.options"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="在此输入候选项按回车">
            <el-option
              v-for="item in paramInvokerData.paramInvokerViewInfo.options"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="滑块最小值" v-show="paramInvokerData.paramInvokerViewInfo.buttonType === paramInvokerInputTypes.SLIDER">
          <el-input-number v-model="paramInvokerData.paramInvokerViewInfo.valueRangeStart"></el-input-number>
        </el-form-item>
        <el-form-item label="滑块最大值" v-show="paramInvokerData.paramInvokerViewInfo.buttonType === paramInvokerInputTypes.SLIDER">
          <el-input-number v-model="paramInvokerData.paramInvokerViewInfo.valueRangeEnd"></el-input-number>
        </el-form-item>
        <el-form-item label="默认值">
          <el-input v-model="paramInvokerData.paramInvokerViewInfo.defaultValue"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button-group>
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button >清空</el-button>
          </el-button-group>
        </el-form-item>
      </ElForm>
    </el-form-item>

  </ElForm>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { ParamInvokerButtonType, ParamInvokerData } from "@/pramcontroller/createreq/CreateReq";
import store from "@/store/store";
@Options({
  components: {}
})
export default class CustomOpEditor extends Vue {
  paramInvokerData: ParamInvokerData = ParamInvokerData.newEmpty();

  paramInvokerInputTypes = ParamInvokerButtonType

  @Prop({ default: ParamInvokerData.newEmpty() })
  paramInvokerProp?: ParamInvokerData;

  @Prop({ default: true })
  newInit?: boolean;

  created() {
    console.log("init", this.newInit);
    if (!this.newInit) {
      this.paramInvokerData = { ...this.paramInvokerProp } as ParamInvokerData;
    }
  }

  submit() {
    console.log("setParamInvokerData, ", this.paramInvokerData);
    store.commit("setParamInvokerData", this.paramInvokerData)
  }
};
</script>

<style scoped>

</style>