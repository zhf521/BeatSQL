<template>
  <div id="questionBoard">
    <a-card v-if="props.level" id="questionCard" hoverable>
      <!-- md展示区 -->
      <MDViewer :value="props.level.content"></MDViewer>
      <a-divider></a-divider>
      <div>
        <a-button v-if="levelNum > 0" style="float: left;" @click="toPrevLevel">上一关</a-button>
        <a-button v-if="levelNum < mainLevels.length - 1" type="primary" style="float: right;" @click="toNextLevel"
          :disabled="props.resultStatus !== RESULT_STATUS_ENUM.SUCCEED">下一关</a-button>
        <a-button v-if="isWin" type="primary" style="float: right; " @click="doWin">恭喜过关</a-button>
      </div>
    </a-card>
    <a-card v-else hoverable>关卡加载失败</a-card>
  </div>
</template>
<script setup>
import { computed, watch } from 'vue';
import MDViewer from './MDViewer.vue';
import { getCurrentLevelNum, getNextLevel, getPrevLevel } from '../levels';
import mainLevels from '../levels/mainLevels';
import { useRouter } from 'vue-router';
import { RESULT_STATUS_ENUM } from '../utils/SQLResult';
import { useSaveResultStore } from '../store/saveResultStore';
// 引入store中的数据
const saveResultStore = useSaveResultStore();
let isWin = saveResultStore.resultArray.slice(0, 30).every(item => item === 1);
// 接收LearnPage传过来的数据
const props = defineProps(['level', 'resultStatus']);
// 关卡在关卡数组中的索引数
const levelNum = computed(() => {
  return getCurrentLevelNum(props.level);
});
// router实例
const router = useRouter();
// 进入上一关
const toPrevLevel = () => {
  const toLevel = getPrevLevel(props.level);
  if (toLevel) {
    router.push(`/learn/${toLevel.key}`);
  };
};
// 进入下一关
const toNextLevel = () => {
  const toLevel = getNextLevel(props.level);
  if (toLevel) {
    router.push(`/learn/${toLevel.key}`);
  };
};
// 通关
const doWin = () => {
  alert('恭喜通关，有收获的话，欢迎给本项目一个 star 哦~');
  window.open('https://github.com/zhf521/BeatSQL');
};
// 切换关卡时，回到顶部
watch([levelNum], () => {
  scrollTo({
    top: 0,
  });
  const questionCardDom = document.getElementById('questionCard');
  if (questionCardDom) {
    questionCardDom.scrollTop = 0;
  };
});
</script>
<style scoped>
#questionBoard #questionCard {
  max-height: 85vh;
  min-height: 600px;
  overflow-y: auto;
}

#questionBoard #questionCard::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}
</style>