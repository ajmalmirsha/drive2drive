import Signup from './user/pages/signup/Signup'
import {Route,BrowserRouter,Routes} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import Signin from './user/pages/signin/Signin';
import UserHome from '../src/user/pages/userHome/UserHome'
import ProfilePage from './user/pages/profile/ProfilePage';
import OwnerRegister from './owner/pages/owner-register/OwnerRegister';
import OwnerHome from './owner/pages/owner-home/OwnerHome';
import OwnerLogin from './owner/pages/owner-login/OwnerLogin';
function App() {
  const user = localStorage.getItem('user')
  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route exact path='/signup' element={<Signup/>} />
      <Route exact  path='/login' element={<Signin/>} />
      <Route exact  path='/profile' element={<ProfilePage/>} />
      <Route exact path='/' element={<UserHome/>} />

    {/* seller routes */}

      <Route exact path='/owner-register' element={<OwnerRegister/>} />
      <Route exact path='/owner-login' element={<OwnerLogin/>} />
      <Route exact path='/owner-Home' element={<OwnerHome props={'home'}/>} />
      <Route exact path='/owner/list-vehicle' element={<OwnerHome props={'list-vehicle'}/>} />
      <Route exact path='/owner/add-vehicle' element={<OwnerHome props={'add-vehicle'}/>} />


    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
