import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import Card from "../components/card";
import Button from "../components/button";
import Input from "../components/input";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setEmail: setUserEmail } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert("Please fill in both email and password fields.");
      return;
    }

    try {
      // Replace with your actual API endpoint
      await axios.post("https://backend-2-bnn9.onrender.com/api/v1/sign", { email, password });
      
      // Save email in UserContext
      setUserEmail(email);

      alert("Logged in successfully!");
      navigate("/dashboard"); // Navigate to the dashboard or another page after login
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <Card className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Login Button */}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        {/* Link to Sign Up */}
        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
