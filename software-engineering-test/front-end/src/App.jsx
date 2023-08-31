import { Route, Routes } from 'react-router-dom'
import Historic from './pages/Historic'
import Home from './pages/Home'

function App() {


  return (
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/historic' element={<Historic />} />
      <Route path= '*' element={<h1>Not Found</h1>} />
    </Routes>

  )
}

export default App
