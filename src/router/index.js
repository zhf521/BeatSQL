import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import LearnPage from '../views/LearnPage.vue';
import LevelsPage from '../views/LevelsPage.vue';
import PlaygroundPage from '../views/PlaygroundPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: HomePage,
            children: [
                {
                    path: '/learn/:levelKey?',
                    component: LearnPage,
                    props: true,
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
        },
        {
            path: '/login',
            component: LoginPage,
        },
    ],
});

export default router;
