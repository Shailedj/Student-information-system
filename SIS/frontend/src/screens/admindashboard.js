import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from '../components/admin-nav';
import '../styles/styles.css'

const AdminDashboard = () => {
  const [token, setToken] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.post('/auth/fetch-admin', { token });
        const user = res.data.user;
        setName(user.name);
      } catch (error) {
        console.error('fetch data error', error);
      }
    };

    const getToken = Cookies.get('token');
    if (getToken) {
      setToken(getToken);
    }
    fetchAdmin();
  }, [token]);
  
  return (
    <>
      <AdminNavbar />
      <div className='admin-dash'>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title" >Welcome, {name}</h5>
            <p className="card-text">This is your admin dashboard. You can manage your tasks here.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
