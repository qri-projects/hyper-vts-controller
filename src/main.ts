import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/store";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";


createApp(App)
  .use(store)
  .use(ElementPlus, {
    locale: zhCn
  })
  .mount("#app");
