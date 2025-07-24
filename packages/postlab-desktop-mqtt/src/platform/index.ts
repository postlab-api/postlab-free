import type { TKernelAPI } from '@postlab/types'

export let platform: TKernelAPI

export function setPlatformDef(def: TKernelAPI) {
  platform = def
}
