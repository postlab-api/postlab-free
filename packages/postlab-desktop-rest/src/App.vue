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
    <CompactModule />
    <context-holder />
  </a-config-provider>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { theme, message } from 'ant-design-vue'
import { CompactModule } from '@postlab/component-rest'
const [messageApi, contextHolder] = message.useMessage()
</script>
