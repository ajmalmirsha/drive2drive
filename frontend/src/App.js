import Signup from './user/pages/signup/Signup'
import {Route,BrowserRouter,Routes} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import Signin from './user/pages/signin/Signin';
import UserHome from '../src/user/pages/userHome/UserHome'
function App() {
  const user = localStorage.getItem('user')
  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Signin/>} />
      <Route path='/' element={<UserHome/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
