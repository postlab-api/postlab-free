import { createHoppApp } from './index'
// import { def as authDef } from './platform/auth'
// import { def as environmentsDef } from './platform/environments/environments.platform'
import { nextTick, ref, watch } from 'vue'
import { emit, listen } from '@tauri-apps/api/event'
import { type } from '@tauri-apps/plugin-os'
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow'
import { ioDef } from './platform/io'
import { interopModule } from './interop'
import { handleIsTauri } from './utils/index'

const isTauri = handleIsTauri()

const headerPaddingLeft = ref('0px')
const headerPaddingTop = ref('0px')

;(async () => {
  const platform = isTauri ? await type() : 'Browser'
  const appWindow = isTauri
    ? getCurrentWebviewWindow()
    : {
        startDragging: () => {},
      }

  createHoppApp(
    '#app',
    //    {
    //   ui: {
    //     appHeader: {
    //       paddingLeft: headerPaddingLeft,
    //       paddingTop: headerPaddingTop,
    //       onHeaderAreaClick() {
    //         // if (platform === 'Darwin') {
    //         //   // Drag the window when the user drags the header area
    //         //   // TODO: Ignore click on headers and fields
    //         //   appWindow.startDragging()
    //         // }
    //       },
    //     },
    //   },
    //   io: ioDef,
    //   // auth: authDef,
    //   // sync: {
    //   //   environments: environmentsDef,
    //   // },
    //   addedHoppModules: [interopModule],
    //   interceptors: {
    //     default: 'native',
    //     interceptors: [
    //       // { type: 'service', service: NativeInterceptorService },
    //       {
    //         type: 'standalone',
    //         interceptor: {
    //           // ...proxyInterceptor,
    //           supportsDigestAuth: true,
    //         },
    //       },
    //     ],
    //   },
    //   platformFeatureFlags: {
    //     exportAsGIST: false,
    //     hasTelemetry: false,
    //     cookiesEnabled: true,
    //     promptAsUsingCookies: false,
    //   },
    // }
  )

  // if (platform === 'Darwin') {
  //   listen('will-enter-fullscreen', () => {
  //     headerPaddingTop.value = '0px'
  //     headerPaddingLeft.value = '0px'
  //   })

  //   listen('will-exit-fullscreen', () => {
  //     headerPaddingTop.value = '2px'
  //     headerPaddingLeft.value = '70px'
  //   })

  //   headerPaddingTop.value = '2px'
  //   headerPaddingLeft.value = '70px'
  // }
})()

function isTextInput(target: EventTarget | null) {
  if (target instanceof HTMLInputElement) {
    return (
      target.type === 'text' ||
      target.type === 'email' ||
      target.type === 'password' ||
      target.type === 'number' ||
      target.type === 'search' ||
      target.type === 'tel' ||
      target.type === 'url' ||
      target.type === 'textarea'
    )
  } else if (target instanceof HTMLTextAreaElement) {
    return true
  } else if (target instanceof HTMLElement && target.isContentEditable) {
    return true
  }

  return false
}

window.addEventListener(
  'keydown',
  function (e) {
    if (e.key === 'Backspace' && !isTextInput(e.target)) {
      e.preventDefault()
    }
  },
  true,
)
