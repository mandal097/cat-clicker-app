import React from 'react'
import View from './Views/View'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import CatCard from './Components/Center/CatCard'

const App = () => {
  const theme = useSelector(state => state.themeReducer.currentTheme)
  return (
    <div style={{ backgroundColor: "var(--secondary)" }} data-theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<View />}>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App