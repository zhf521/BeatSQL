<template>
  <div class="container">
    <a-row :gutter="90">
      <a-col :span="8">
        <a-card hoverable @click="toLearn">
          <template #cover>
            <img alt="example" src="../assets/学习.png" style="height:65vh;" />
          </template>
          <a-card-meta title="学习" description="通过闯关的方式学习SQL语法">
          </a-card-meta>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card hoverable @click="toLevels">
          <template #cover>
            <img alt="example" src="../assets/关卡.png" style="height:65vh;" />
          </template>
          <a-card-meta title="关卡" description="选择主线关卡或自定义关卡">
          </a-card-meta>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card hoverable @click="toPlayground">
          <template #cover>
            <img alt="example" src="../assets/广场.png" style="height:65vh;" />
          </template>
          <a-card-meta title="广场" description="自由练习SQL语句">
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const toLearn = () => {
  router.push('/learn');
};
const toLevels = () => {
  router.push('/levels');
};
const toPlayground = () => {
  router.push('/playground');
};
</script>
<style scoped>
.container {
  height: 100%;
  background: #f0f0f0;
  padding: 6vh;
}

.container .card {
  height: 80vh;
}
</style>