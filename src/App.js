// route
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'

// components
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>

            <Route path="/" element={<Home />}></Route>

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )

}

export default App
