import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import MessagePage from './pages/Message.jsx'
import LogsPage from './pages/LogsPage.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<MessagePage/>}/>
    <Route path='/la-fameuse-page-des-supers-logs-fait-par-laurent' element={<LogsPage/>}/>
  </Routes>
  </BrowserRouter>
)
