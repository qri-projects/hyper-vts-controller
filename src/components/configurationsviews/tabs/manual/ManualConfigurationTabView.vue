<template>
  <div>
    <p>Made by
      <a href="https://space.bilibili.com/13578650">
        <span>
          <span>空包糖</span>
          <img style="height: 17px" src="../../../../assets/bili.png" alt="" />
        </span>
      </a>
      <span>
        <img style="width: 128px; height: 128px; border-radius: 64px" src="../../../../assets/qriheadimg.jpg" alt="">
      </span>
    </p>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="使用说明" name="1">
        <p>Notice: 如果是使用本地html的方式运行该程序, 请注意在移动html文件的前, 先在配置管理页面进行导出配置, 移动文件后再将其导入</p>
        <!--        <p>视频版教程: <a href="https://www.bilibili.com/video/BV1yq4y1v7tJ" target="_blank">BV1yq4y1v7tJ</a></p>-->
        <h2>自定义参数</h2>
        <p>在这里创建了自定义参数之后, 将自定义参数与live2d模型参数绑定起来, 用于之后自定义操作使用</p>
        <h2>自定义操作</h2>
        <p>可以选择单选框/滑条/文本输入等输入方式. 可以在脚本框中编辑脚本. 编辑提交之后, 会在页面上生成一个组件, 包含一个标题和一系列候选项</p>
        <h2>自定义操作脚本编辑</h2>
        <p>本质是一个入参是value的函数的js函数体, 以花括号开头和结尾. 下面举例一个脚本: </p>
        <p><code>{if (value == "&gt;_&lt;") {apply("emoVV", 1)}}</code></p>
        <p>此处的value, 为组件选中的值; 此处的"emoVV", 为一个自定义参数的参数名, 它应该被在VtubeStudio里与一个打开"VV"表情的开关关联上.
          此处的apply是设定自定义的参数的值的函数, 上面的代码中, 就是将"emoVV"的值设为1. 整串脚本表示, 当用户输入值为"&gt;_&lt;"时,
          将自定义参数"emoVV"的值设为1
        </p>
      </el-collapse-item>
      <el-collapse-item title="发布说明" name="2">
        <p>本项目已在Github上以MIT协议开源</p>
        <p>项目地址:
          <a href="https://github.com/qri-projects/hyper-vts-controller" target="_blank">
            https://github.com/qri-projects/hyper-vts-controller
          </a>
        </p>
        <p>可使用在线版或离线版的方式使用该插件</p>
        <p>离线版地址: </p>
        <p>在线版地址: <a href="https://s.ggemo.com/pages/hypervtscontroller/index.html">https://s.ggemo.com/pages/hypervtscontroller/index.html</a></p>
      </el-collapse-item>

    </el-collapse>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class ManualConfigurationTabView extends Vue {
  activeNames = ["1"];
}
</script>

<style scoped>

</style>