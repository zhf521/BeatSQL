<template>
  <div class="container">
    <a-row :gutter="[16, 16]">
      <a-col :md="12" :xs="24">
        <a-card title="主线关卡" class="card" hoverable>
          <a-list item-layout="horizontal" :data-source="mainLevels">
            <template #renderItem="{ item, index }">
              <router-link :to="`/learn/${item.key}`">
                <a-list-item>
                  <a-list-item-meta :title="`${index + 1}、${item.title}`" />
                  <a-list-item-meta v-if="saveResultStore.resultArray[index] === 1">
                    <template #avatar>
                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                    </template>
                  </a-list-item-meta>
                  <a-list-item-meta v-else-if="saveResultStore.resultArray[index] === 0">
                    <template #avatar>
                      <CloseCircleTwoTone twoToneColor="#eb2f96" />
                    </template>
                  </a-list-item-meta>
                  <a-list-item-meta v-else>
                    <template #avatar>
                      <MinusCircleTwoTone />
                    </template>
                  </a-list-item-meta>
                </a-list-item>
              </router-link>
            </template>
          </a-list>
        </a-card>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-card title="自定义关卡" class="card" hoverable>
          <a-list item-layout="horizontal" :data-source="customLevels">
            <template #renderItem="{ item, index }">
              <router-link :to="`/learn/${item.key}`">
                <a-list-item>
                  <a-list-item-meta :title="`${index + 1}、${item.title}`" />
                  <a-list-item-meta v-if="saveResultStore.resultArray[index + 30] === 1">
                    <template #avatar>
                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                    </template>
                  </a-list-item-meta>
                  <a-list-item-meta v-else-if="saveResultStore.resultArray[index + 30] === 0">
                    <template #avatar>
                      <CloseCircleTwoTone twoToneColor="#eb2f96" />
                    </template>
                  </a-list-item-meta>
                  <a-list-item-meta v-else>
                    <template #avatar>
                      <MinusCircleTwoTone />
                    </template>
                  </a-list-item-meta>
                </a-list-item>
              </router-link>
            </template>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script  setup>
import mainLevels from '../levels/mainLevels';
import customLevels from '../levels/customLevels';
import { CheckCircleTwoTone, CloseCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons-vue';
import { useSaveResultStore } from '../store/saveResultStore';
const saveResultStore = useSaveResultStore();
// console.log(saveResultStore.resultArray);
</script>
<style scoped>
.container {
  padding: 24px;
}

.card {
  max-height: 85vh;
  overflow-y: auto;
}

.card::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}
</style>