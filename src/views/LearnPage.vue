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
        <a-card style="margin-top:3vh;height: 40vh;" hoverable :tab-list="tabList" :active-tab-key="key" @tabChange="key => onTabChange(key, 'key')">
          {{ contentList[key] }}
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
});

// 执行结果
const onSubmit = (sql, res, answerRes, errorMsg) => {
  result.value = res;
  answerResult.value = answerRes;
  errorMessage.value = errorMsg;
  resultStatus.value = checkResult(res, answerRes);
  
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
const contentList = {
  result: 'content1',
  hint: 'content2',
  ddl: 'content3',
  answer: 'content4',
};
const key = ref('result');
const onTabChange = (value, type) => {
  console.log(value, type);
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