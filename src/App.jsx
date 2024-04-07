import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import './App.css'
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Header } from './components';

function App() {
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentuser()
      .then( (userData)=>{
        if (userData) {
          dispatch(login({userData}));
        } else {
          dispatch(logout({userData}))
        }
      })
      .catch(error => {
        // setError('Failed to fetch current user data.');
        console.error('Error fetching current user:', error);
      })
      .finally(()=>setLoading(false))
  },[])
  return !loading ? (
    <div>
      <div>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : (
    <div>Loading ...</div>
  )
}

export default App
