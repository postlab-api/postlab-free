import { createApp } from 'vue'
import App from './App.vue'
import ComponentRest from '@postlab/component-sse'
import Antd, { message } from 'ant-design-vue'

const app = createApp(App)

app.use(ComponentRest)
app.use(Antd)

app.mount('#app')
