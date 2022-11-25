import { createApp } from 'vue'
import App from './App.vue'
import ricochet from '../../index';

import './assets/main.css'

const app = createApp(App);
app.use(ricochet, {
    fps: 120
});

app.mount('#app');
