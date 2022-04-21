import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import LandingPage from './pages/Home/LandingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchResults from './pages/SearchResults/SearchResults';
import Profile from './pages/Profile/Profile';
import MyAccount from './pages/MyAccount/MyAccount';
import Messages from './pages/Messages/Messages';
import Contacts from './pages/Contacts/Contacts';
import { auth } from './firebase';
// redux shit
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/slices/user';
import Chat from './pages/Messages/Chat/Chat';

function App() {
  // redux shit
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserAuth = () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          dispatch(setUser(user))
        }
      })
    }

    getUserAuth();
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search-results/:searchParams" element={<SearchResults />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/my-account/" element={<MyAccount />} />
          <Route path="/messages/" element={<Messages />} />
          <Route path="/chat/" element={<Chat />} />
          <Route path="/contacts/" element={<Contacts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
