import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

const [username,setUsername] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")



const navigate = useNavigate()

const handleSignUp = async (e)=>{
  e.preventDefault();
  try{
 const response = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
const data = await response.json();
if(response.ok){
  localStorage.setItem("token", data.token); // ✅ save JWT
  localStorage.setItem("email", email); 

  alert("Registered successfully");
  console.log('Response:', data);
  setTimeout(()=> navigate('/'),2000);
}

  }catch(error){
    console.error('Error:', error);
      alert('Something went wrong');
     
    }
  }
 



  return (
    <>
     
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-gray-200">
     
      <div className="bg-white shadow-2xl rounded-xl p-8 lg:w-96 w-70">
        {/* Title */}
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Sign up to get started
        </p>



<form onSubmit={handleSignUp}>
        {/* Name Input */}
        <input
          type="text"
          placeholder="Full Name"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
       required
       />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
       required
       />

        {/* Sign Up Button */}
        <button 
        type='submit'
        className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-200">
          Sign Up
        </button>
</form>
        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

    

        {/* Back to Login */}
        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}

