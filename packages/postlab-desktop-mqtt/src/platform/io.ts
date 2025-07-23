// 动态获取 io，以获取对应 io 下的方法
import { Io } from '@postlab/platform/kernel/io'
import type { TDisktopBaseIo } from '@postlab/types'

export const kernelIO: TDisktopBaseIo = {
  saveFileWithDialog(opts) {
    return Io.saveFileWithDialog(opts)
  },
  openExternalLink(url) {
    return Io.openExternalLink(url)
  },
}
