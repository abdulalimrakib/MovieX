
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store';
import { StyledEngineProvider } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </Provider>,
)
