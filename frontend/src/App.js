import Signup from './user/pages/signup/Signup'
import {Route,BrowserRouter,Routes} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import Signin from './user/pages/signin/Signin';
import UserHome from '../src/user/pages/userHome/UserHome'
import ProfilePage from './user/pages/profile/ProfilePage';
import OwnerRegister from './owner/pages/owner-register/OwnerRegister';
import OwnerHome from './owner/pages/owner-home/OwnerHome';
import OwnerLogin from './owner/pages/owner-login/OwnerLogin';
import AdminHome from './admin/pages/admin-home/AdminHome';
import AdminLogin from './admin/pages/admin-login/AdminLogin';
import VehicleView from './user/pages/vehicle-detail-page/VehicleView';
import VehicleList from './owner/components/vehicleList/VehicleList';
import VehicleListPage from './user/pages/vehicleList/VehicleListPage';
import VehiclePage from './owner/pages/vehiclePage/VehiclePage';
import UserPublicRoute from './user/AuthRoutes/UserPublicRoute';
import UserPrivateRoute from './user/AuthRoutes/UserPrivateRoute';
import OwnerPrivateRoute from './owner/middlewares/OwnerPrivateRoute';
import OwnerPublicRoute from './owner/middlewares/OwnerPublicRoute';
import AdminPublicRoute from './admin/middlewares/AdminPublicRoutes';
import AdminPrivateRoute from './admin/middlewares/AdminPrivateRoutes';


function App() {
  const user = localStorage.getItem('user')
  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route exact path='/signup' element={<UserPublicRoute><Signup/> </UserPublicRoute>} />
      <Route exact  path='/login' element={<UserPublicRoute> <Signin/></UserPublicRoute>} />
      <Route exact  path='/profile' element={<UserPrivateRoute><ProfilePage/></UserPrivateRoute> } />
      <Route exact path='/' element={<UserPrivateRoute><UserHome/></UserPrivateRoute> } />
      <Route exact path='/veiw-detail/:id' element={<VehicleView/>} />
      <Route exact path='/list-all/:vehicle' element={<VehicleListPage/>} />

    {/* owner routes */}

      <Route exact path='/owner-register' element={<OwnerPublicRoute><OwnerRegister/></OwnerPublicRoute> } />
      <Route exact path='/owner-login' element={<OwnerPublicRoute><OwnerLogin/></OwnerPublicRoute> }/>
      <Route exact path='/owner-Home' element={<OwnerPrivateRoute><OwnerHome props={'home'}/> </OwnerPrivateRoute> } />
      <Route exact path='/owner/list-vehicle' element={<OwnerPrivateRoute> <VehiclePage props={'list-vehicle'}/></OwnerPrivateRoute> } />
      <Route exact path='/owner/add-vehicle' element={<OwnerPrivateRoute> <VehiclePage props={'add-vehicle'}/> </OwnerPrivateRoute> } />
      <Route exact path='/owner/edit-vehicle/:id' element={<OwnerPrivateRoute> <VehiclePage props={'edit-vehicle'} /> </OwnerPrivateRoute> } />
      
    {/* admin routes */}

      <Route exact path='/admin/home' element={<AdminPrivateRoute><AdminHome/></AdminPrivateRoute> } />
      <Route exact path='/admin/login' element={<AdminPublicRoute><AdminLogin/></AdminPublicRoute> } />


    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
