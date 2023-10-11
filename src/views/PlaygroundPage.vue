<template>
  <div class="container">
    <h2>请输入任意 SQL 语句，尽情玩耍吧~</h2>
    <a-row :gutter="[16, 16]">
      <a-col :md="12" :xs="24">
        <a-card hoverable style="height: 80vh;">
          <SQLEditor :level="allLevels[0]" :editorStyle="{ height: '65vh' }" :onSubmit="onSubmit"></SQLEditor>
        </a-card>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-card hoverable style="height: 40vh;">
          <SQLResult :result="result"></SQLResult>
        </a-card>
        <a-card title="执行历史" style="height: 38vh; margin-top: 2vh; overflow-y: auto;" hoverable>
          <a-collapse v-if="sqlHistoryList.length > 0">
            <a-collapse-panel v-for="(data, index) in sqlHistoryList" :key="index" :header="data.sql">
              <SQLResult :result="data.result" :errorMessage="data.errorMessage"></SQLResult>
            </a-collapse-panel>
          </a-collapse>
          <div v-else>暂无执行历史</div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import SQLEditor from '../components/SQLEditor.vue';
import SQLResult from '../components/SQLResult.vue';
import { allLevels } from '../levels';


const result = ref();
const sqlHistoryList = ref([]);
// 执行
const onSubmit = (sql, res, answerRes, errorMsg) => {
  result.value = res;
  sqlHistoryList.value.push({ sql, result: res, errorMessage: errorMsg });
  // console.log(sqlHistoryList.value);
  // console.log(result.value);
};
</script>
<style scoped>
h2 {
  text-align: center;
}

.container {
  padding: 24px;
}
</style>