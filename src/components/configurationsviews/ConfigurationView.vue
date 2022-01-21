<template>
  <div class="configurationPanel">
    <ElCard class="configurationCard">
      <el-form class="configurationForm">
        <el-form-item label="VTS ip&端口号">
          <el-input v-model="this.$store.state.configurationFormData.vtsAddress">
            <template v-slot:append>
              <el-button>变更</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="VTS自定义参数">
          <el-tabs v-model="paramTab">
            <el-tab-pane label="参数列表" name="list">
              <el-table
                :data="this.$store.state.customParams"
                style="width: 100%">
                <el-table-column
                  prop="parameterName"
                  label="参数名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="explanation"
                  label="描述"
                  width="180">
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
            </el-tab-pane>
            <el-tab-pane label="新建自定义参数" name="new">
              <ElRow justify="center">
                <ElCol :span="18">
                  <CustomParamView></CustomParamView>
                </ElCol>
              </ElRow>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
        <el-form-item label="VTS自定义操作">
          <el-tabs v-model="opTab">
          <el-tab-pane label="操作列表" name="list"></el-tab-pane>
          <el-tab-pane label="新建操作" name="new"></el-tab-pane>
          </el-tabs>
        </el-form-item>
      </el-form>
    </ElCard>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CustomParamView from "@/components/customparamviews/CustomParamView.vue";

@Options({
  components: {
    CustomParamView
  }
})
export default class ConfigurationView extends Vue {
  paramTab = "list"
  opTab = "list"
}
</script>

<style scoped>
.configurationPanel {
  position: fixed;
  background: rgba(0, 0, 0, 0.25);
  width: 100vw;
  height: 100vh;
  z-index: 100;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.configurationCard {
  width: 80%;
}
</style>