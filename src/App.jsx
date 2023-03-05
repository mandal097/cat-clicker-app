import React from 'react'
import View from './Views/View'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import CatCard from './Components/Center/CatCard'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<View/>}>
        </Route>
      </Routes>
    </Router>
  )
}

export default App