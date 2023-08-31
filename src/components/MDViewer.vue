<template>
  <Viewer :value="value" :plugins="plugins" />
</template>
<script setup>
import { Viewer } from '@bytemd/vue-next';
// 插件：支持 GFM（自动链接文字、删除线、表格、任务列表）
import gfm from '@bytemd/plugin-gfm';
// 插件：支持代码高亮
import heighlight from '@bytemd/plugin-highlight';
import 'highlight.js/styles/default.css';
// 引入github-markdown-css主题
import 'github-markdown-css/github-markdown.css';
import 'bytemd/dist/index.css';

const plugins = [gfm(), heighlight()];
const props = defineProps(['value']);

</script>