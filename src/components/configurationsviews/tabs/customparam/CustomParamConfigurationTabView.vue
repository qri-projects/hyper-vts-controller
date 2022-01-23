<template>
  <el-row justify="center">
    <ElCol :span="18">
      <CustomParamView></CustomParamView>
    </ElCol>
  </el-row>
  <el-table
    :data="this.$store.state.vtsStatus.customParams"
    style="width: 100%">
    <el-table-column
      prop="name"
      label="参数名">
    </el-table-column>
    <el-table-column
      prop="explanation"
      label="描述">
    </el-table-column>
    <el-table-column
      prop="min"
      label="最小值">
    </el-table-column>
    <el-table-column
      prop="max"
      label="最大值">
    </el-table-column>
    <el-table-column
      prop="defaultValue"
      label="默认值">
    </el-table-column>
    <el-table-column label="操作">
      <el-button type="danger">删除</el-button>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CustomParamView from "@/components/configurationsviews/tabs/customparam/CustomParamView.vue";

@Options({
  components: {
    CustomParamView
  }
})
export default class CustomParamConfigurationTabView extends Vue {
};
</script>

<style scoped>

</style>