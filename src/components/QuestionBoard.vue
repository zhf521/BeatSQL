<template>
  <div id="questionBoard">
    <a-card v-if="props.level" id="questionCard">
      <!-- md展示区 -->
      <MDViewer></MDViewer>
      <a-divider></a-divider>
      <div>
        <a-button>上一关</a-button>
        <a-button>下一关</a-button>
        <a-button>恭喜过关</a-button>
      </div>
    </a-card>
    <a-card v-else>关卡加载失败</a-card>
  </div>
</template>
<script setup>
import MDViewer from './MDViewer.vue';
// 接收LearnPage传过来的数据
const props = defineProps(['level']);


</script>
<style></style>