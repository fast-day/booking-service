import { createRoot } from 'react-dom/client'
import "@/app/styles/index.css"
import App from '@/app/app'
import { Provider } from '@/app/provider/provider'

createRoot(document.getElementById('root')!).render(
  <Provider>
    <App />
  </Provider>,
)
