<template>
  <a-row class="header" type="flex" align="middle">
    <a-col flex="160px" style="margin: 0 auto;">
      <router-link to="/">
        <a-row align="middle">
          <img src="../assets/logo.png" alt="BeatSQL" class="logo">
          <span class="title">BeatSQL</span>
        </a-row>
      </router-link>
    </a-col>
    <a-col flex="auto">
      <a-menu mode="horizontal" :items="items" :style="{ lineHeight: '64px' }" @click="clickMenu"
        :selected-keys="selectedKeys" />
    </a-col>
  </a-row>
  <div class="content">
    <router-view></router-view>
  </div>
  <a-back-top :style="{ right: '24px' }"></a-back-top>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const selectedKeys = computed(() => [route.path]);
const items = ref([{
  key: '/learn',
  label: '学习',
  title: '学习',
}, {
  key: '/levels',
  label: '关卡',
  title: '关卡',
}, {
  key: '/playground',
  label: '广场',
  title: '广场',
}]);
// 点击菜单触发菜单切换
const clickMenu = ({ item, key, keyPath }) => {
  router.push(key);
};
</script>

<style scoped>
.header {
  border-bottom: 1px solid #f0f0f0;
  padding: 0 24px;
}

.ant-menu-horizontal {
  border-bottom: none !important;
}

.logo {
  width: 56px;
}

.title {
  margin-left: 8px;
  font-size: 20px;
  color: #000;
}

.content {
  background: #f0f0f0;
  height: calc(100vh - 64px);
}
</style>
