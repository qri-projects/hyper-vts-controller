<template>
  <CustomOpList />
  <CustomOpEditor></CustomOpEditor>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CustomOpEditor from "@/components/configurationsviews/tabs/customop/CustomOpEditor.vue";
import CustomOpList from "@/components/configurationsviews/tabs/customop/CustomOpList.vue"

@Options({
  components: {
    CustomOpEditor,
    CustomOpList
  }
})
export default class CustomOpConfigurationTabView extends Vue {
};
</script>

<style scoped>

</style>