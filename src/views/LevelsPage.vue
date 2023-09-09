<template>
  <a-row>
    <a-col :md="12" :xs="24">
      <a-card title="主线关卡">
        <a-list item-layout="horizontal" :data-source="mainLevels">
          <template #renderItem="{ item, index }">
            <router-link :to="`/learn/${item.key}`">
              <a-list-item>
                <a-list-item-meta :title="`${index + 1}、${item.title}`" />
              </a-list-item>
            </router-link>
          </template>
        </a-list>
      </a-card>
    </a-col>
    <a-col :md="12" :xs="24">
      <a-card title="自定义关卡">
        <a-list item-layout="horizontal" :data-source="customLevels">
          <template #renderItem="{ item, index }">
            <router-link :to="`/learn/${item.key}`">
              <a-list-item>
                <a-list-item-meta :title="`${index + 1}、${item.title}`" />
              </a-list-item>
            </router-link>
          </template>
        </a-list>
      </a-card>
    </a-col>
  </a-row>
</template>
<script  setup>
import mainLevels from '../levels/mainLevels';
import customLevels from '../levels/customLevels';
</script>
<style></style>