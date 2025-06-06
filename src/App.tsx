import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { SignUpForm_page } from './pages/SignUpForm_page';
import { SignInForm_page } from './pages/SignInForm_page';

const App = () => {
  return (
    // <p> HEllo </p>
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpForm_page />} />
        <Route path="/signin" element={<SignInForm_page />} />
        {/* <Route path="*" element={<NotFound />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  )
}

export default App