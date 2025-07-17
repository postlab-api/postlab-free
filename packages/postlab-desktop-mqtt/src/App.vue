<script setup lang="ts">
import { theme, message } from 'ant-design-vue'
// @ts-ignore
import { MqttModule } from '@postlab/component-mqtt'

const [contextHolder] = message.useMessage()
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
    <MqttModule />
    <context-holder />
  </a-config-provider>
</template>

<style>
#app {
  background: black;
}
</style>
