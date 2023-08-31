<template>
  <a-row :gutter="[16, 16]">
    <!-- 左半部分区域 -->
    <a-col :lg="11" :xs="24">
      <!-- 问题面板 -->
      <!-- todo -->
    </a-col>
    <!-- 右半部分区域 -->
    <a-col :lg="13" :xs="24">
      <!-- SQL编辑区 -->
      <!-- todo -->
      <!-- 可折叠区域 -->
      <a-collapse v-model:activeKey="activeKey" style="margin-top: 16px;">
        <a-collapse-panel key="result" header="查看执行结果">
        </a-collapse-panel>
        <a-collapse-panel key="hint" header="查看提示">
        </a-collapse-panel>
        <a-collapse-panel key="ddl" header="查看建表语句">
        </a-collapse-panel>
        <a-collapse-panel key="answer" header="查看答案">
        </a-collapse-panel>
      </a-collapse>
    </a-col>
  </a-row>
</template>
<script  setup>
import { ref } from 'vue';
const activeKey = ref(['result']);
</script>
<style></style>