
import './App.css'
// import ThemeToggle from "./components/ToggleTheme";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import NonProtectedRoute from './components/NonProtectedRoute';


function App() {

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<NonProtectedRoute><LoginPage/></NonProtectedRoute>}/>
        <Route path='/dashboard' element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
