<template>
  <a-card title="执行结果" :extra="RESULT_STATUS_INFO_MAP[props.resultStatus]" style="max-height: 420px;overflow-y: auto;">
    <a-table v-if="!props.errorMessage" :columns="columns" :data-source="resultData" size="middle"
      :pagination="{ hideOnSinglePage: true, pageSize: 20 }">
    </a-table>
    <div v-else>❌ 语句错误：{{ props.errorMessage }}</div>
  </a-card>
</template>
<script setup>
import { computed } from 'vue';
import { RESULT_STATUS_INFO_MAP } from '../utils/SQLResult';
const props = defineProps(['result', 'answerResult', 'errorMessage', 'resultStatus']);

// 结果表格表头
const columns = computed(() => {
  if (props.result?.[0]?.columns) {
    return props.result[0].columns.map((column) => {
      return {
        title: column,
        dataIndex: column,
      };
    });
  }
  return [];
});

// 结果表格数据
const resultData = computed(() => {
  if (!props.result?.[0]?.values) {
    return [];
  }
  const tempColumns = props.result[0].columns;
  return props.result[0].values.map((originRow) => {
    const rowData = {};
    originRow.forEach((col, index) => {
      rowData[tempColumns[index]] = col;
    });
    return rowData;
  });
});
</script>
<style></style>