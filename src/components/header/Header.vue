<template>
  <el-row class="header">
    <el-col :span="20" >
      <Status></Status>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Status from "@/components/header/Status.vue";

@Options({
  components: {
    Status
  }
})
export default class Header extends Vue {
};
</script>

<style scoped lang="scss">
.header {
  top: 0;
  position: absolute;
  width: 100%;
  background: #f0eeff;
  height: 30px;

  display: flex;
  align-items: center;

  * {
    height: 100%;
    display: flex;
    align-items: center;
  }
}

.status {
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.25);
  }
}

</style>