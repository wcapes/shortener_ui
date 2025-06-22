import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-white p-10 rounded shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Short.ly</h1>
        <p className="text-gray-700 mb-6">Transform your long URLs into short, powerful links.</p>
        <div className="flex flex-col gap-2">
          <Button type="primary" onClick={() => navigate("/register")} className="bg-indigo-600">
            Sign Up
          </Button>
          <Button onClick={() => navigate("/login")}>Log In</Button>
        </div>
      </div>
    </div>
  );
}