import {Routes,Route} from 'react-router-dom'
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'
import Home from './pages/Home'
import AuthLayout from './layouts/AuthLayout'
function App() {

  return (
    <div>
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/auth/register' element={<SignUp />} />
        <Route path='/auth/login' element={<SignIn />} />
        <Route path='/authlayout' element={<AuthLayout />} />

      </Routes>
    </div>
  )
}

export default App
