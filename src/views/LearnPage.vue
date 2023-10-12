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
import { computed, ref, watch, onMounted } from 'vue';
import { useSaveLevelStore } from '../store/saveLevelStore';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

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
const router = useRouter();
const saveLevelStore = useSaveLevelStore();

// 加载缓存的关卡（实现学习记录）
const loadSaveLevel = () => {
  const saveLevelKey = saveLevelStore.level;
  if (!saveLevelKey) {
    return;
  }
  router.push(`/learn/${saveLevelKey}`);
  message.info('已为您跳转到上次学习位置！');
};

// 页面启动时（挂载时)，加载保存的关卡 
onMounted(() => {
  if (props.levelKey) {
    // 有levelKey说明url本身具有，用户可能是从关卡页面跳转过来的，不用跳转，保存起来即可
    // 页面刚刚挂载时不会触发watch里的事件，只能在这里解决
    saveLevelStore.level = props.levelKey;
  } else {
    // 没有levelKey说明用户可能是在别的页面点击学习按钮或从index跳转过来的，加载之前的关卡
    // 如果用户已经在学习页面了，再次点击学习按钮，不会触发mounted事件，会触发下面的watch事件
    loadSaveLevel();
  }
});

// 切换关卡时，重置状态
watch(level, () => {
  // 保存关卡
  if (props.levelKey) {
    saveLevelStore.level = props.levelKey;
  }
  //如果用户已经在学习页面了，再次点击学习按钮，会跳转到/learn，会触发这个的watch事件
  //（因为上面computed中的props.levelKey发生改变，而且页面没有重载不会触发onMounted）
  //但是如果用户在level1，再次点击学习按钮，会跳转到/learn，不会触发这个的watch事件，不过反正都是level1，没影响
  //（因为虽然上面computed中的props.levelKey发生改变，computed重新运行，但是运行结果level的值并未改变，所以不会触发此watch事件）
  //所以如果props.levelKey变成了空的话，需要加载之前的关卡
  if (props.levelKey == "") {
    loadSaveLevel();
  }
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
  key.value = 'result';//切换到执行结果
  if (resultStatus.value === 1) {
    message.success('结果正确！');
  } else {
    message.error('结果错误！');
  }
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