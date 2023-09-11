// App.jsx
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setFilterContact} from '../redux';
import Navigation from './Navigation/Navigation';
import {BrowserRouter as Router, Navigate, Outlet, Route, Routes, useNavigate} from 'react-router-dom';

import RegisterPage from './RegisterPage/RegisterPage';
import LoginPage from './LoginPage/LoginPage';
import ContactsPage from './ContactsPage/ContactsPage';

const PrivateRoutes = ({isAuth, redirectPath = '/login'}) => {
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <Outlet />
  );
};

const App = () => {
  return (
    <Router basename="goit-react-hw-08-phonebook">
      <div>
        <Navigation />
        <Routes>
          <Route path="*" element={<MainApplication />} />
        </Routes>
      </div>
    </Router>
  );
};

const MainApplication = () => {
  const dispatch = useDispatch();
  const {contacts, filter} = useSelector(state => state.phonebook);
  const {isAuth} = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/contacts');
    }
  }, [isAuth, navigate]);

  const handleFilterChange = e => {
    dispatch(setFilterContact(e.target.value));
  };

  const filteredContacts = contacts.items.filter(contact => {
      return contact?.name.toLowerCase().includes(filter.toLowerCase());
    },
  );

  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoutes isAuth={isAuth} />}>
        <Route
          path="/contacts"
          element={<ContactsPage filteredContacts={filteredContacts} handleFilterChange={handleFilterChange} />}
        />
      </Route>
      <Route path="/" element={<Navigate to={isAuth ? '/contacts' : '/login'} />} />
    </Routes>
  );
};

export default App;
