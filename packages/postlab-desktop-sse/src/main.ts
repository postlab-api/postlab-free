import { createApp } from 'vue'
import App from './App.vue'
import ComponentRest from '@postlab/component-sse'
import Antd, { message } from 'ant-design-vue'
import { initKernel } from '@postlab/platform/initialize/index'
import { disktopIo } from '@postlab/platform/initialize/io/tauri/_'

initKernel('desktop', disktopIo)

const app = createApp(App)

app.use(ComponentRest)
app.use(Antd)

app.mount('#app')
