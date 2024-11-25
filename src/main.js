import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const head = createHead()

// 使用 Ant Design Vue
app.use(Antd)

// 使用路由
app.use(router)

// 使用 head
app.use(head)

app.mount('#app')
