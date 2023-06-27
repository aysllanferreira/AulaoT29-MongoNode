import React, { useEffect } from 'react'
import axios from 'axios';

const url = 'http://localhost:4000'

const Home = () => {
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${url}/auth/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(response.data);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>Home</div>
  )
}

export default Home