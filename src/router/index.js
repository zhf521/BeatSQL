import { createRouter, createWebHistory } from 'vue-router';
import LearnPage from '../views/LearnPage.vue';
import LevelsPage from '../views/LevelsPage.vue';
import PlaygroundPage from '../views/PlaygroundPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/learn',
    },
    {
      path: '/learn',
      component: LearnPage,
    },
    {
      path: '/levels',
      component: LevelsPage,
    },
    {
      path: '/playground',
      component: PlaygroundPage,
    },
  ],
});

export default router;
