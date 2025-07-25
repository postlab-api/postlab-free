import { createApp } from 'vue'
import App from './App.vue'
import ComponentRest, { registerModule } from '@postlab/component-mqtt'
import Antd, { message } from 'ant-design-vue'
import emitter from '@postlab/platform/event/bus'
import { initKernel } from '@postlab/platform/initialize/index'
import { disktopIo } from '@postlab/platform/initialize/io/tauri/_'

initKernel('desktop', disktopIo)

const app = createApp(App)

app.config.globalProperties.$emitter = emitter
app.config.globalProperties.$message = message

emitter.emit('appMounted', app)

app.use(ComponentRest)
app.use(Antd)

app.mount('#app')
