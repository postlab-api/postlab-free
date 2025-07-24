import { createApp } from 'vue'
import App from './App.vue'
import ComponentRest from '@postlab/component-mqtt'
import Antd, { message } from 'ant-design-vue'

import { browserBaseIo } from '@postlab/platform/io/browser/_'
import { disktopBaseIo } from '@postlab/platform/io/tauri/_'
import { setPlatformDef } from '~/platform/index'
import emitter from './event/bus'

setPlatformDef({
  io: browserBaseIo,
  mode: 'native',
})

const app = createApp(App)

app.config.globalProperties.$emitter = emitter
app.config.globalProperties.$message = message

emitter.emit('appMounted', app)

app.use(ComponentRest)
app.use(Antd)

app.mount('#app')
