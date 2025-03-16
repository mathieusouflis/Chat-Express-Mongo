import { useState } from 'react'
import MessagePage from './pages/Message.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MessagePage/>
    </>
  )
}

export default App
