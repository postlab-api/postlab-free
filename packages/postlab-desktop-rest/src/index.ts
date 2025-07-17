// import { HOPP_MODULES } from '@modules/.'
import { createApp } from 'vue'
// import { PlatformDef, setPlatformDef } from '~/platform/index'
// import { initKernel, getKernelMode } from '@hoppscotch/kernel'
import Antdv, { message } from 'ant-design-vue'
import ComponentRest from '@postlab/component-rest'

// import emitter from './event/bus'

import 'ant-design-vue/dist/reset.css'

import App from './App.vue'
import { getService } from '@postlab/service/vue-init'
// import { InitializationService } from '@postlab/services/initialization.service'

export async function createHoppApp(el: string | Element, platformDef: PlatformDef) {
  // initKernel(getKernelMode())
  // setPlatformDef(platformDef)

  const app = createApp(App)
  app.use(Antdv)
  app.use(ComponentRest)
  // app.config.globalProperties.$emitter = emitter
  // app.config.globalProperties.$message = message
  // emitter.emit('appMounted', app)

  // Initialize core services before app mounting
  // const initService = getService(InitializationService)
  // await initService.initPre()

  // try {
  //   await initService.initAuthAndSync()
  // } catch {
  //   console.error(
  //     "Failed connecting to the backend, make sure the service is running and accessible on the network"
  //   )
  // }

  // HOPP_MODULES.forEach((mod) => mod.onVueAppInit?.(app))
  // platformDef.addedHoppModules?.forEach((mod) => mod.onVueAppInit?.(app))

  app.mount('#app')

  // await initService.initPost()
}
