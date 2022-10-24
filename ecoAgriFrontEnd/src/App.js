import logo from './logo.svg';
import { Routes, Route, Navigate } from "react-router-dom";
import Registration from './components/pages/Registration';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { red } from '@mui/material/colors';
import Login from './components/pages/Login';
import DashBoard from './components/pages/farmer/DashBoard';
import Buy from './components/pages/Buy';
import Sell from './components/pages/farmer/Sell';
import PendingDonations from './components/farmer/dashboard/PendingDonations';
import AddBank from './components/pages/farmer/AddBank';
import Test from './components/ui/Test';
import AddSaleProduct from './components/pages/farmer/AddSaleProduct';
import Donate from './components/pages/farmer/Donate';
import AddDonateProduct from './components/pages/farmer/AddDonateProduct';
import FarmerProfile from './components/pages/farmer/Profile';
import Articals from './components/pages/farmer/Articals';
import BuyProduct from './components/pages/BuyProduct';
import AdminDashboard from './components/pages/admin/AdminDashboard';
import ManageUsers from './components/pages/admin/ManageUsers';
import CreateUsers from './components/pages/admin/CreateUsers';
import ConfirmArticals from './components/pages/moderator/ConfirmArticals';
import ModeratorProfile from './components/pages/moderator/Profile';
import Landing from './components/pages/Landing';

import BuyerDashboard from './components/pages/buyer/Dashboard';
import BuyDetails from './components/pages/buyer/BuyDetails';
import BuyerProfile from './components/pages/buyer/Profile';
import ForgetPassword from './components/pages/ForgetPassword';
import OtpVerify from './components/pages/OtpVerify';
import Checkout from './components/checkout/Checkout';
import StripePaymentForm from './components/checkout/Payments/StripePaymentForm';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#007A31",
      },
      secondary: {
        main: "#52b202"
      }
    },
    typography: {
      fontFamily: "Poppins",
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    },
  });
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />

          <Route path="/test" element={<Test />} />
          <Route path="/farmer/dashboard" element={<DashBoard />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/farmer/profile" element={<FarmerProfile />} />
          <Route path="/articals" element={<Articals />} />
          <Route path="/donate/pending" element={<PendingDonations />} />
          <Route path="/sell/add-bankAccount" element={<AddBank />} />
          <Route path="/sell/add-sell-product" element={<AddSaleProduct />} />
          <Route path="/donate/add-donate-product" element={<AddDonateProduct />} />

          {/* buyer */}
          <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
          <Route path="/buyer/buy-details" element={<BuyDetails />} />
          <Route path="/buyer/profile" element={<BuyerProfile />} />
          <Route path="/buyer/payment" element={<StripePaymentForm />} />

          {/* admin */}
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/manage-users' element={<ManageUsers />} />
          <Route path='/admin/create-user/:userType' element={<CreateUsers />} />


          {/* moderator */}
          <Route path='/moderator/dashboard' element={<AdminDashboard />} />
          <Route path='/moderator/articals' element={<ConfirmArticals />} />
          <Route path='/moderator/profile' element={<ModeratorProfile />} />
          {/* <Route path="/buy-product/" element={<BuyProduct />} /> */}
          <Route path="/buy-product/:productId" element={<BuyProduct />} />
          <Route path="/testing" element={<Test />} />


          <Route path="/otp-verify" element={<OtpVerify />} />
          {/* <Route path="/checkout" element={<Checkout />} /> */}
        </Routes>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
