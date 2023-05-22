import Signup from './user/pages/signup/Signup'
import {Route,BrowserRouter,Routes} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import Signin from './user/pages/signin/Signin';
import UserHome from '../src/user/pages/userHome/UserHome'
import ProfilePage from './user/pages/profile/ProfilePage';
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
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
