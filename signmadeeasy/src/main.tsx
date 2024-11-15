import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import { GoogleOAuthProvider } from "@react-oauth/google"

import { Provider } from 'react-redux'
import store from './redux/store.ts'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='735904161492-a74bmqsou7o7nulff8f5amd32mhp00rv.apps.googleusercontent.com'>
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>,
)
