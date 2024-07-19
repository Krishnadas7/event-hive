import { Route, Routes } from 'react-router-dom';
import CompanySignupPage from '../pages/companyPages/CompanySignupPage';
import CompanyLoginPage from '../pages/companyPages/CompanyLoginPage';
import CompanyPrivateRoute from './PrivateRoutes/CompanyPrivateRoute';
import CompanyProfilePage from '../pages/companyPages/CompanyProfilePage';
import CompanyHomePage from '../pages/companyPages/CompanyHomePage';
import LiveStreaming from '../components/company/CompanyHomepage/LiveStreaming';
import CompanyNotFoundPage from '../pages/companyPages/CompanyNotFoundPage';

function CompanyRoute() {
  return (
    <Routes>
      <Route path="/" element={<CompanyLoginPage />} />
      <Route path="signup" element={<CompanySignupPage />} />
      
      <Route element={<CompanyPrivateRoute />}>
        <Route path="homepage" element={<CompanyHomePage />} />
        <Route path="profile" element={<CompanyProfilePage />} />
        <Route path="live-streaming/:eventId" element={<LiveStreaming />} />
        
        {/* Catch-all for private routes */}
        <Route path="*" element={<CompanyNotFoundPage />} />
      </Route> 
      
      {/* 404 Route for public routes */}
      <Route path="*" element={<CompanyNotFoundPage />} />
    </Routes>
  );
}

export default CompanyRoute;
