// 事务总线
import mitt, { type Emitter } from 'mitt'
import { App } from 'vue'

declare type MittType<T = any> = {
  eq?: T
  //事件类型
  messageApi: { t: 'info' | 'success' | 'error' | 'warning'; m: string; isT?: boolean }
  appMounted: App<Element>
}

const emitter: Emitter<MittType> = mitt<MittType>()
export const useBus = () => ({ bus: emitter })

// 取消所有的 mitt 事件
// emitter.all.clear()
// 注册并监听自定义事件
// emitter.on(eventType,callback)
// 触发自定义事件
// emitter.emit(eventType,params)
// 取消事件
// emitter.off(eventType,callback)

// 监听所有事件
emitter.on('*', (e, o) => {
  console.log(`* 监听到的事件类型是: ${e}, 接收的参数为: `, o)
})

export default emitter
