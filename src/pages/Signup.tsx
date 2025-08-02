import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Card from "../components/card";
import Button from "../components/button";
import Input from "../components/input";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("https://backend-2-bnn9.onrender.com/api/v1/register", { email, username, password });
      alert("Signed up successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <div >
      <Card className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <p className="text-center mt-4 text-gray-900">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Signup;
