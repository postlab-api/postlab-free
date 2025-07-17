import { createApp } from 'vue'
import App from './App.vue'
// @ts-ignore
import ComponentRest from '@postlab/component-mqtt'
import Antd from 'ant-design-vue'

const app = createApp(App)

app.use(ComponentRest)
app.use(Antd)

app.mount('#app')
