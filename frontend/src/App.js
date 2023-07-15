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
import AdminRoutes from './admin/AdminRoutes';
import CheckOut from './user/Components/checkout/CheckOut';
import Completion from './user/Components/Stripe/Completion';
import UserNotificationPage from './user/pages/notification/UserNotificationPage';
import BookingVerifications from './owner/components/bookings/BookingVerifications';
import UserBookings from './user/Components/bookings/UserBookings';
import ChatPage from './user/pages/chat/ChatPage';
import OwnerChatPage from './owner/pages/owner-chat/OwnerChatPage';

import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";  
import OwnerSalesReport from './owner/pages/sales-report/OwnerSalesReport';
import UserErrorPage from './Error/error-pages/UserErrorPage';
import ErrorPage500 from './Error/500/ErrorPage500';
import TermsAndConditions from './user/Components/terms-conditions/TermsAndConditions';
function App() {
 
  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route exact path='/signup' element={<UserPublicRoute><Signup/> </UserPublicRoute>} />
      <Route exact  path='/login' element={<UserPublicRoute> <Signin/></UserPublicRoute>} />
      <Route exact  path='/profile' element={<UserPrivateRoute><ProfilePage/></UserPrivateRoute> } />
      <Route exact path='/' element={<UserPrivateRoute><UserHome/></UserPrivateRoute> } />
      <Route exact path='/veiw-detail/:id' element={<VehicleView/>} />
      <Route exact path='/list-all/vehicles' element={<VehicleListPage/>} />
      <Route exact path='/checkout/:vehicleId' element={<CheckOut/>} />
      <Route exact path='/completion' element={<Completion/>} />
      <Route exact path='/notifications/:role' element={<UserNotificationPage/>} />
      <Route exact path='/bookings' element={<UserBookings/>} />
      <Route exact path='/chat/:ownerId' element={<ChatPage/>} />
      <Route exact path='/SERVER-ERROR-500' element={<ErrorPage500/>} />
      <Route exact path='/terms-conditions' element={<TermsAndConditions/>} />
      <Route exact path='/*' element={<UserErrorPage link={'/'} />} />

    {/* owner routes */}

      <Route exact path='/owner-register' element={<OwnerPublicRoute><OwnerRegister/></OwnerPublicRoute> } />
      <Route exact path='/owner-login' element={<OwnerPublicRoute><OwnerLogin/></OwnerPublicRoute> }/>
      <Route exact path='/owner/home' element={<OwnerPrivateRoute><OwnerHome props={'home'}/> </OwnerPrivateRoute> } />
      <Route exact path='/owner/list-vehicle' element={<OwnerPrivateRoute> <VehiclePage props={'list-vehicle'}/></OwnerPrivateRoute> } />
      <Route exact path='/owner/add-vehicle' element={<OwnerPrivateRoute> <VehiclePage props={'add-vehicle'}/> </OwnerPrivateRoute> } />
      <Route exact path='/owner/edit-vehicle/:id' element={<OwnerPrivateRoute> <VehiclePage props={'edit-vehicle'} /> </OwnerPrivateRoute> } />
      <Route exact path='/owner/notifications' element={<OwnerPrivateRoute> <VehiclePage props={'notifications'} /> </OwnerPrivateRoute> } />
      <Route exact path='/owner/bookings' element={<OwnerPrivateRoute> <BookingVerifications /> </OwnerPrivateRoute> } />
      <Route exact path='/owner/messages' element={<OwnerPrivateRoute> <OwnerChatPage /> </OwnerPrivateRoute> } />
      <Route exact path='/owner/sales-report' element={<OwnerPrivateRoute> <OwnerSalesReport /> </OwnerPrivateRoute> } />
      <Route exact path='/owner/*' element={<UserErrorPage link={'/owner/home'} />} />
      
    {/* admin routes */}

      <Route exact path='/admin/*' element={<AdminRoutes/> } />
   


    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
