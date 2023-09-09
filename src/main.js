import { createApp } from 'vue';
import App from './App.vue';
import 'normalize.css';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import router from './router/index';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(Antd).use(router).use(pinia).mount('#app');
