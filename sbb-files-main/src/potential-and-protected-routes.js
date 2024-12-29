import './App.css';
import Header from './components/header/header.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/welcome/welcome.js';
import Home from './pages/home/home.js';
import AddDocument from './pages/add-document/add-document.js';
import RequestDocumentChange from './pages/request-document-change/request-document-change.js';
import RequestAppointment from './pages/request-appointment/request-appointment.js';
import ReviewAppointment from './pages/review-appointment/review-appointment.js';
import SBRegistration from './pages/sb-registration/sb-registration.js';
import ClientReviewApp from './pages/review-application/client/client-review-app.js';
import AdminReviewApp from './pages/review-application/admin/admin-review-app.js';

// Mock authentication function for demonstration
const isAuthenticated = (role) => {
  // Replace this with actual authentication and role-check logic
  const userRole = localStorage.getItem('role'); // Example: store role in localStorage
  return userRole === role;
};

const ProtectedRoute = ({ element, role }) => {
  return isAuthenticated(role) ? element : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
          <Header />
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/home" element={<ProtectedRoute element={<Home />} role="client" />} />
                <Route path="/add-document" element={<ProtectedRoute element={<AddDocument />} role="client" />} />
                <Route path="/change-document" element={<ProtectedRoute element={<RequestDocumentChange />} role="client" />} />
                <Route path="/request-appointment" element={<ProtectedRoute element={<RequestAppointment />} role="client" />} />
                <Route path="/review-appointment" element={<ProtectedRoute element={<ReviewAppointment />} role="admin" />} />
                <Route path="/sb-registration" element={<ProtectedRoute element={<SBRegistration />} role="client" />} />
                <Route path="/client-review-app" element={<ProtectedRoute element={<ClientReviewApp />} role="client" />} />
                <Route path="/admin-review-app" element={<ProtectedRoute element={<AdminReviewApp />} role="admin" />} />
                {/* Catch-all route for undefined paths */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
  );
}

export default App;
