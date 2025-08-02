import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/card";
import Button from "../components/button";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <Card className="w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">Dashboard</h1>
        <p className="text-center mb-4">Welcome to your Dashboard!</p>
        <div className="flex flex-col items-center gap-4">
          <Link to="/todos">
            <Button>View Todos</Button>
          </Link>
          <Link to="/login">
            <Button className="bg-red-500 hover:bg-red-600">Logout</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
