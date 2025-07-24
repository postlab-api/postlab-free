import { createApp } from 'vue'
import App from './App.vue'
import ComponentRest, { registerModule } from '@postlab/component-mqtt'
import Antd, { message } from 'ant-design-vue'

import { initKernel, getKernel } from '@postlab/platform/initialize/index'
import { disktopIo } from '@postlab/platform/initialize/io/tauri/_'
import { browserIo } from '@postlab/platform/initialize/io/browser/_'
import { setPlatformDef } from '~/platform/index'
import emitter from '@postlab/platform/event/bus'

window.__KERNEL__ = getKernel()
const def = initKernel('desktop', disktopIo)
// 浏览器和桌面应用使用不同的 TKernelAPI
setPlatformDef(def)

const app = createApp(App)

app.config.globalProperties.$emitter = emitter
app.config.globalProperties.$message = message

emitter.emit('appMounted', app)

app.use(ComponentRest)
app.use(Antd)

app.mount('#app')
