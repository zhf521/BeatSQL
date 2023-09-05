<template>
  <a-row :gutter="[16, 16]">
    <!-- 左半部分区域 -->
    <a-col :lg="11" :xs="24">
      <!-- 问题面板 -->
      <QuestionBoard :level="level" :resultStatus="resultStatus"></QuestionBoard>
    </a-col>
    <!-- 右半部分区域 -->
    <a-col :lg="13" :xs="24">
      <!-- SQL编辑区 -->
      <SQLEditor :level="level" :onSubmit="onSubmit"></SQLEditor>
      <!-- 可折叠区域 -->
      <a-collapse v-model:activeKey="activeKey" style="margin-top: 16px;">
        <a-collapse-panel key="result" header="查看执行结果">
          <SQLResult :result="result" :answerResult="answerResult" :errorMessage="errorMessage"
          :resultStatus="resultStatus"></SQLResult>
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
import QuestionBoard from '../components/QuestionBoard.vue';
import SQLEditor from '../components/SQLEditor.vue';
import SQLResult from '../components/SQLResult.vue';
import { getLevelByKey, allLevels } from '../levels';
import { checkResult } from '../utils/SQLResult';
import { computed, ref } from 'vue';
// 结果部分默认展开
const activeKey = ref(['result']);
// 根据传入的levelKey属性值获取对应的关卡对象，并将其存储在计算属性level中
const props = defineProps(['levelKey']);
const level = computed(() => {
  if (props.levelKey) {
    return getLevelByKey(props.levelKey);
  } else {
    return allLevels[0];
  }
});
const result = ref();
const answerResult = ref();
const errorMessage = ref();
const resultStatus = ref(-1);
// 执行结果
const onSubmit = (sql, res, answerRes, errorMsg) => {
  result.value = res;
  answerResult.value = answerRes;
  errorMessage.value = errorMsg;
  resultStatus.value = checkResult(res, answerRes);
};

</script>
<style></style>