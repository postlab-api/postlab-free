<script setup lang="ts">
import { theme, message } from 'ant-design-vue'
import emitter from '@postlab/platform/event/bus'
import { SocketioModule } from '@postlab/component-socketio'
// import { invoke } from '@tauri-apps/api/core'

const [messageApi, contextHolder] = message.useMessage()

emitter.on('messageApi', ({ t, m }) => {
  if (t === 'info') messageApi.info(m)
  else if (t === 'success') messageApi.success(m)
  else if (t === 'error') messageApi.error(m)
  else if (t === 'warning') messageApi.warning(m)
})
// const handleUpdateModelValue = (v: string) => console.log('handleUpdateModelValue', v)
// const handleChangeKey = (v: string) => console.log('handleChangeKey', v)
</script>

<template>
  <a-config-provider
    :theme="{
      // 1. 单独使用暗色算法
      algorithm: theme.darkAlgorithm,
      token: {
        borderRadius: 4,
        colorPrimary: '#F5222D',
      },
    }"
  >
    <SocketioModule />

    <context-holder />
  </a-config-provider>
</template>

<style>
#app {
  background: black;
}
</style>
