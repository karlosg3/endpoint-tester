import { Routes, Route } from 'react-router-dom'
import Home from './views/Home/Home'
import Header from './components/layout/header'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        {/*<Route path='/tester' element={<Tester />} />*/}
        {/*<Route path='/docs' element={<Documentation />} />*/}
      </Routes>
    </>
  )
}

export default App
