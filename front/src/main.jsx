import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import MessagePage from './pages/Message.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<MessagePage/>}/>
    {/* <Route path='/logs' element={LogsPage}/> */}
  </Routes>
  </BrowserRouter>
)
