import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TodoApp from "./pages/TodoApp";

const App: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center bg-black-900">
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/todos" element={<TodoApp />} />
      </Routes>
    </div>
  );
};

export default App;
