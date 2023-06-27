import { useState } from 'react';
import axios from 'axios';

const url = 'http://localhost:4000'

const  Register = () => {

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    message: '',
    status: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
    setError({
      message: '',
      status: false,
    });
  }

  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try{
      const response = await axios.post(`${url}/auth/signup`, userData);
      console.log(response.data);
    } catch (error: any) {
      setError({
        message: error.response.data.message,
        status: true,
      });
      console.log(error.response.data.message);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Register</h1>

      <form onSubmit={handleClick} className="flex flex-col items-center justify-center">
        <input
          className="w-64 p-3 my-2 text-center border border-gray-400 rounded-md"
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />

        <input
          className="w-64 p-3 my-2 text-center border border-gray-400 rounded-md"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />

        <button className="w-64 p-3 my-2 text-white bg-blue-500 rounded-md" type="submit">
          Register
        </button>
      </form>
      {error.status && <p>{error.message}</p>}
    </div>
  );
};

export default Register;
