<template>
  <div ref="editorRef" style=" height: 280px;"></div>
  <a-space :size="16" style="margin-top: 16px;">
    <a-button type="primary" style="width: 180px;" @click="doSubmit">运行</a-button>
    <a-button @click="doFormat">格式化</a-button>
    <a-button @click="doReset">重置</a-button>
  </a-space>
</template>
<script setup>
import * as monaco from 'monaco-editor';
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import { format } from 'sql-formatter';
import { initDB, runSQL } from '../utils/SQLExecutor';
import { onMounted, onUnmounted, ref, toRaw, watchEffect } from 'vue';
import { message } from 'ant-design-vue';
const editorRef = ref();
const inputEditor = ref();
const props = defineProps(['level', 'onSubmit']);
const db = ref();

self.MonacoEnvironment = {
  getWorker() {
    return new EditorWorker();
  }
};

watchEffect(async () => {
  // 初始化/更新默认SQL
  if (inputEditor.value) {
    toRaw(inputEditor.value).setValue('-- 请在此处输入 SQL 语句\n' + props.level.defaultSQL);
  }
  // 初始化/更新DB
  db.value = await initDB(props.level.initSQL);

});

// 格式化SQL
const doFormat = () => {
  if (!inputEditor.value) {
    return;
  }
  const inputStr = toRaw(inputEditor.value).getValue();
  const resultStr = format(inputStr, { language: 'sqlite' });
  toRaw(inputEditor.value).setValue(resultStr);
};

// 重置
const doReset = () => {
  if (inputEditor.value) {
    toRaw(inputEditor.value).setValue(props.level.defaultSQL);
  }
};

// 执行
const doSubmit = () => {
  if (!inputEditor.value) {
    return;
  }
  const inputStr = toRaw(inputEditor.value).getValue();
  try {
    const result = runSQL(db.value, inputStr);
    const answerResult = runSQL(db.value, props.level.answer);
    // 向外层传递结果
    props.onSubmit(inputStr, result, answerResult);
  } catch (error) {
    message.error('语句错误，' + error.message);
    // 向外层传递结果
    props.onSubmit(inputStr, [], [], error.message);
  }
};

onMounted(() => {
  // 初始化代码编辑器
  if (editorRef.value) {
    const initValue = '';
    inputEditor.value = monaco.editor.create(editorRef.value, {
      value: initValue,
      language: 'sql',
      theme: 'vs-dark',
      formatOnPaste: true,
      automaticLayout: true,
      fontSize: 16,
      minimap: {
        enabled: false,
      },
    });
  }
});

// 释放资源
onUnmounted(() => {
  if (inputEditor.value) {
    toRaw(inputEditor.value).dispose();
  }
});

</script>
<style></style>