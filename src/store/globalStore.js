import { defineStore } from 'pinia';
import { allLevels } from '../levels';
import { ref } from 'vue';

export const useGlobalStore = defineStore(
    'global',
    () => {
        // 学习记录
        const studyHistoryList = ref([]);
        const currentLevel = ref({ ...allLevels[0] });
        return {
            studyHistoryList,
            currentLevel,
        };
    },
    {
        persist: true,
    }
);
