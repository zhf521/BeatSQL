<template>
  <a-row :gutter="[16, 16]">
    <!-- 左半部分区域 -->
    <a-col :lg="11" :xs="24">
      <!-- 问题面板 -->
      <QuestionBoard :level="level"></QuestionBoard>
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
import QuestionBoard from '../components/QuestionBoard.vue';
import { getCurrentLevelNum, getLevelByKey, allLevels } from '../levels'
import { computed, ref } from 'vue';
// 结果部分默认展开
const activeKey = ref(['result']);
// 根据传入的levelKey属性值获取对应的关卡对象，并将其存储在计算属性level中
const props = defineProps(['levelKey']);
const level = computed(() => {
  if (props.levelKey) {
    return getLevelByKey(props.levelKey)
  } else {
    return allLevels[0];
  }
})

</script>
<style></style>