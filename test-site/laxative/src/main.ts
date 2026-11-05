import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './styles/themes.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/navigation.css'
import './styles/table.css'
import './styles/wcag-guidlines.css'

createApp(App)
  .use(router)
  .mount('#app')