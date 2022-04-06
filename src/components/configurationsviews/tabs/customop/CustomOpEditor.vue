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
        <el-form-item label="输入方式">
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
            <el-button type="info" @click="clear" v-if="newInit">清除</el-button>
            <el-button type="danger" @click="del" v-if="!newInit">删除</el-button>
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
import { ElMessage } from "element-plus";

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

    if (!this.paramInvokerData.name) {
      ElMessage.error("参数调节器名字不能为空")
      return;
    }

    if (!this.paramInvokerData.genApplyValueCommandString) {
      ElMessage.error("参数调节器代码不能为空")
      return;
    }

    // Radio
    if (this.paramInvokerData.paramInvokerViewInfo.buttonType === ParamInvokerButtonType.RADIO) {
      const viewInfo = this.paramInvokerData.paramInvokerViewInfo;
      if (!viewInfo.options || viewInfo.options.length === 0) {
        ElMessage.error("候选项不能为空")
        return;
      }
      if (viewInfo.options!.indexOf(viewInfo.defaultValue as string) < 0) {
        ElMessage.error("默认值不在候选范围内")
        return;
      }
    }

    if (this.paramInvokerData.paramInvokerViewInfo.buttonType === ParamInvokerButtonType.SLIDER) {
      const viewInfo = this.paramInvokerData.paramInvokerViewInfo;
      if (!viewInfo.valueRangeStart || !viewInfo.valueRangeEnd) {
        ElMessage.error("取值范围不能为空")
        return;
      }
      if (viewInfo.valueRangeStart >= viewInfo.valueRangeEnd) {
        ElMessage.error("取值范围开始值不能大于结束值")
        return;
      }
    }


    if (this.newInit) {
      if (this.paramInvokerData.name in store.state.configurationFormData.paramInvokerData) {
        ElMessage.error("已有名字重复的参数调节器")
      }
    }

    store.commit("setParamInvokerData", {
      name: this.newInit ? this.paramInvokerData.name : this.paramInvokerProp!.name,
      paramInvokerData: this.paramInvokerData
    })
    this.clean()
  }

  clean() {
    this.paramInvokerData = ParamInvokerData.newEmpty()
  }

  del() {
    store.commit("delParamInvokerData", this.paramInvokerData.name)
  }
};
</script>

<style scoped>

</style>