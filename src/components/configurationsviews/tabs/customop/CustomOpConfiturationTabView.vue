<template>
  <CustomOpEditor></CustomOpEditor>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CustomOpEditor from "@/components/configurationsviews/tabs/customop/CustomOpEditor.vue";

@Options({
  components: {
    CustomOpEditor
  }
})
export default class CustomOpConfigurationTabView extends Vue {
};
</script>

<style scoped>

</style>