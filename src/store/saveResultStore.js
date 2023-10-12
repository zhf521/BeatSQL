import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSaveResultStore = defineStore(
    'saveResultStore',
    () => {
        const resultArray = ref([]);
        return {
            resultArray,
        };
    },
    {
        persist: true,
    }
);
