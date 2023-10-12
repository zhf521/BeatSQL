import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSaveLevelStore = defineStore(
    'saveLevel',
    () => {
        // 学习记录
        const level = ref('');
        return {
            level,
        };
    },
    {
        persist: true,
    }
);
