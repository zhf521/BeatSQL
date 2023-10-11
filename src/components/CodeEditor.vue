<template>
  <div ref="editorRef" style="min-height: 28vh;"></div>
</template>
<script setup>
import * as monaco from "monaco-editor";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import { onMounted, onUnmounted, ref, toRaw, watch } from "vue";

const inputEditor = ref();
const editorRef = ref();
const props = defineProps(['initValue', 'readOnly']);

(self).MonacoEnvironment = {
  getWorker() {
    return new EditorWorker();
  },
};

onMounted(() => {
  // 初始化代码编辑器
  if (editorRef.value) {
    inputEditor.value = monaco.editor.create(editorRef.value, {
      value: props.initValue,
      language: "sql",
      theme: "vs-dark",
      readOnly: props.readOnly,
      formatOnPaste: true,
      automaticLayout: true,
      fontSize: 15,
      roundedSelection: true,// 选区是否有圆角
      minimap: {
        enabled: false,
      },
    });
  }
});

watch(
  () => props.initValue,
  () => {
    if (editorRef.value && inputEditor.value) {
      toRaw(inputEditor.value).setValue(props.initValue);
    }
  }
);

onUnmounted(() => {
  if (inputEditor.value) {
    toRaw(inputEditor.value).dispose();
  }
});

</script>
<style></style>