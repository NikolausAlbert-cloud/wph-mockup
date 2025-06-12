import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { SignUpForm_page } from './pages/SignUpForm_page';
import { SignInForm_page } from './pages/SignInForm_page';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  )
}

const AppContent = () => {
  const noNavbarPaths = ['/auth/register', '/auth/login', 'NotFound'];
  const location = useLocation(); // Hook to get the current URL location
  const showNavbar = !noNavbarPaths.includes(location.pathname);
  
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/auth/register" element={<SignUpForm_page />} />
        <Route path="/auth/login" element={<SignInForm_page />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="*" element={<NotFound />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </>

  )
}

export default App