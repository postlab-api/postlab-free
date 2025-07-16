<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { theme, message } from 'ant-design-vue'
import { MqttModule } from '@postlab/component-mqtt'
import { InputModule } from '@postlab/codemirror-input'
import { invoke } from '@tauri-apps/api/core'

const [messageApi, contextHolder] = message.useMessage()
const name = ref('')

const handleUpdateModelValue = (v: string) => console.log('handleUpdateModelValue', v)
const handleChangeKey = (v: string) => console.log('handleChangeKey', v)
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
    <MqttModule  />
    <!-- <InputModule
      class="codemirror-input"
      :modelValue="name"
      placeholder="count.key"
      :auto-complete-environment="true"
      :aggregate-environments="[]"
      :request-variables="[]"
      @update:modelValue="handleUpdateModelValue"
      @change="handleChangeKey"
      style="width: 30%"
    /> -->
    <context-holder />
  </a-config-provider>
</template>

<style>
#app {
  background: black;
}
</style>
