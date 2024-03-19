import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import Mailpage from './components/mailpage'
import Home from './components/Home'
import FileUpload from './components/FileUpload'
import FakeText from './components/FakeText'
import Product from './components/Product'
import ProfilePage from './components/ProfilePage'
import ChangePassword from './components/ChangePassword'
import LicenseAgreement from './components/LicenseAgreement'
import Progress from './components/Progress';
import Order from './components/Order';
import Otp from './Appp';
import Rating from './components/Rating';
import FLicense from './components/FLicense';
import Payment from './components/PaymentPage'
import Empty from './components/Empty'

function App() {
  return (
    <>
      <div className=''>
        <HashRouter basename=''>
          <Routes>
            <Route index exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route exact path='/mailpage' element={<Mailpage />} />
            <Route exact path='/fileupload' element={<FileUpload />} />
            <Route exact path='/faketext' element={<FakeText />} />
            <Route exact path='/product' element={<Product />} />
            <Route exact path='/profile' element={<ProfilePage />} />
            <Route exact path='/changepassword' element={<ChangePassword />} />
            <Route exact path='/license' element={<LicenseAgreement />} />
            <Route exact path='/checkout' element={<Progress/>} />
            <Route exact path='/order' element={<Order/>} />
            <Route exact path='/otp' element={<Otp/>} />
            <Route exact path='/rating' element={<Rating/>} />
            <Route exact path='/license-details' element={<FLicense/>} />
            <Route exact path='/payment' element={<Payment/>} />
            <Route  path='/processing' element={<Empty/>} />
          </Routes>
        </HashRouter>
      </div>
    </>
  )
}

export default App
