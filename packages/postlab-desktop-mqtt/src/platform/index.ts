// import { Observable } from 'rxjs'

import type { TMqttDisktopBasePlatform } from '@postlab/types'

import { Io } from '@postlab/platform/kernel/io'

export let platform: TMqttDisktopBasePlatform = {
  io: Io,
  mode: 'native',
}

export function setPlatformDef(def: TMqttDisktopBasePlatform) {
  platform = def
}

/**
 * 使用方法，不管是浏览器还是桌面应用，都在 main 中引
 * 用 @postlab-platform 中的 platform，并缓存在此页面
 *
 * 在其他文件中直接使用 ~/platform/index 此文件
 */
