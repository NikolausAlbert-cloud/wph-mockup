import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { SignUpForm_page } from './pages/SignUpForm_page';
import { SignInForm_page } from './pages/SignInForm_page';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/auth/register" element={<SignUpForm_page />} />
          <Route path="/auth/login" element={<SignInForm_page />} />
          {/* <Route path="*" element={<NotFound />} /> */}
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </Provider>
  )
}

export default App