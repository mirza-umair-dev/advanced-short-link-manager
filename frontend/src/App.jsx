import {Routes,Route} from 'react-router-dom'
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'
import Home from './pages/Home'
import AuthLayout from './layouts/AuthLayout'
import VerifyOtp from './pages/auth/VerifyOtp'
import RequestResetPassword from './pages/auth/RequestResetPassword'
import ResetPassword from './pages/auth/ResetPassword'
import TokenSuccess from './pages/auth/TokenSuccess'
import PasswordChangedSuccess from './pages/auth/PasswordChangedSuccess'
function App() {

  return (
    <div>
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/auth/register' element={<SignUp />} />
        <Route path='/auth/login' element={<SignIn />} />
        <Route path='/authlayout' element={<AuthLayout />} />
        <Route path='/auth/verify-otp' element={<VerifyOtp />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/auth/request-reset-password' element={<RequestResetPassword />} />
        <Route path='/auth/token-sent' element={<TokenSuccess />} />
        <Route path='/auth/password-changed' element={<PasswordChangedSuccess />} />

      </Routes>
    </div>
  )
}

export default App
