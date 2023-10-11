<template>
  <div class="container">
    <a-row :gutter="[16, 16]">
      <!-- 左半部分区域 -->
      <a-col :lg="11" :xs="24">
        <!-- 问题面板 -->
        <QuestionBoard :level="level" :resultStatus="resultStatus"></QuestionBoard>
      </a-col>
      <!-- 右半部分区域 -->
      <a-col :lg="13" :xs="24">
        <!-- SQL编辑区 -->
        <a-card hoverable>
          <SQLEditor :level="level" :editorStyle="{ height: '30vh' }" :onSubmit="onSubmit"></SQLEditor>
        </a-card>
        <!-- 结果区域 -->
        <a-card style="margin-top:3vh;height: 40vh;" hoverable :tab-list="tabList" :active-tab-key="key"
          @tabChange="key => onTabChange(key, 'key')">
          <div v-if="key === 'result'">
            <SQLResult :result="result" :answerResult="answerResult" :errorMessage="errorMessage"
              :resultStatus="resultStatus"></SQLResult>
          </div>
          <div v-if="key === 'hint'">
            <p>{{ level.hint }}</p>
          </div>
          <div v-if="key === 'ddl'">
            <CodeEditor :initValue="level.initSQL" :readOnly="true"></CodeEditor>
          </div>
          <div v-if="key === 'answer'">
            <pre v-html="highlightCode(format(level.answer))" style="height: 28vh; overflow-y: auto;"></pre>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script  setup>
import QuestionBoard from '../components/QuestionBoard.vue';
import SQLEditor from '../components/SQLEditor.vue';
import SQLResult from '../components/SQLResult.vue';
import CodeEditor from '../components/CodeEditor.vue';
import { getLevelByKey, allLevels } from '../levels';
import { checkResult } from '../utils/SQLResult';
import { format } from 'sql-formatter';
import hlgs from 'highlight.js';
import { computed, ref, watch } from 'vue';

// 结果面板中的key
const key = ref('result');

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

// 切换关卡时，重置状态
watch(level, () => {
  result.value = null;
  answerResult.value = null;
  errorMessage.value = null;
  resultStatus.value = -1;
  key.value = 'result';
});

// 执行结果
const onSubmit = (sql, res, answerRes, errorMsg) => {
  result.value = res;
  answerResult.value = answerRes;
  errorMessage.value = errorMsg;
  resultStatus.value = checkResult(res, answerRes);
  key.value = 'result';
};

// 高亮代码
const highlightCode = (code) => {
  return hlgs.highlightAuto(code).value;
};

// tab列表
const tabList = [
  {
    key: 'result',
    tab: '执行结果',
  },
  {
    key: 'hint',
    tab: '提示',
  },
  {
    key: 'ddl',
    tab: '建表语句',
  },
  {
    key: 'answer',
    tab: '答案',
  },
];
const onTabChange = (value, type) => {
  // console.log(value, type);
  if (type === 'key') {
    key.value = value;
  }
};
</script>
<style scoped>
.container {
  padding: 24px;
}
</style>